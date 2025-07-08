import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import BottomNav from "./BottomNav.jsx";

const ROLE = "loser"; // 'loser' = 분실자, 'finder' = 습득자

function ConfirmModal({ open, title, desc, confirmText, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-[390px] bg-white rounded-t-2xl p-6 pb-8 shadow-lg animate-slideup">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="text-center mb-4">
          <div className="text-base font-bold mb-2">{title}</div>
          <div className="text-lg font-semibold mb-2">{desc}</div>
        </div>
        <button
          className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold text-base"
          onClick={onConfirm}
        >
          {confirmText}
        </button>
        <button
          className="w-full mt-2 bg-gray-100 text-gray-700 rounded-lg py-3 font-semibold text-base"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
}

function Toast({ open, message, type }) {
  if (!open) return null;
  return (
    <div className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white text-sm font-semibold ${type === 'success' ? 'bg-blue-600' : 'bg-gray-800'}`}>{message}</div>
  );
}

const STATUS_FLOW = ["waiting", "delivering", "delivered", "reward"];
const STATUS_LABEL = {
  waiting: { label: "물건 전달 중", color: "text-blue-500", sub: "물건 전달 중", info: "물건을 전달 중 주인을 찾아 포인트를 받아보세요!" },
  delivering: { label: "전달을 기다리고 있어요", color: "text-blue-500", sub: "물건 전달 중", info: "전달을 기다리고 있어요" },
  delivered: { label: "거래 완료", color: "text-gray-500", sub: "거래 완료", info: "" },
  reward: { label: "500포인트 지급 완료", color: "text-blue-600", sub: "거래 완료", info: "500포인트 지급 완료" },
};
const STATUS_GUIDE = {
  waiting: { icon: "📦", text: "물건 전달이 시작되었습니다.\n물건을 받으셨다면, 상단의 버튼을 눌러주세요.\n버튼을 누르면 물건을 찾아준 분에게 현상금이 지급됩니다.", color: "border-blue-300 bg-blue-50 text-blue-800" },
  delivering: { icon: "😀", text: "주인을 찾았어요! 이제 물건을 전달해 주세요.\n분실자가 수령을 확인하면 포인트가 자동 지급됩니다.", color: "border-blue-300 bg-blue-50 text-blue-800" },
  delivered: { icon: "📦", text: "물건 전달이 시작되었습니다.\n물건을 받으셨다면, 상단의 버튼을 눌러주세요.\n버튼을 누르면 물건을 찾아준 분에게 현상금이 지급됩니다.", color: "border-blue-300 bg-blue-50 text-blue-800" },
  reward: { icon: "🎉", text: "전달 완료! 주인이 물건을 잘 받았어요.\n약속된 500포인트가 지급되었습니다. 감사합니다!", color: "border-blue-300 bg-blue-50 text-blue-800" },
};

const CHAT_ID = '1'; // 실제로는 props나 useParams 등에서 받아야 함
const STORAGE_KEY = `chat_messages_${CHAT_ID}`;

const initialMessages = [
  {
    id: 1,
    type: "question",
    from: "finder",
    text: [
      "아래는 습득자가 등록한 분실물 특징입니다.\n분실물과 비교하여 정확하게 답변해 주세요.",
      "1. 아이폰 상단에 흠집이 있나요?",
      "2. 아이폰 케이스는 어떤건가요?",
      "3. 어디서 잃어버리셨나요?",
    ],
    time: "12:40 읽음",
  },
  {
    id: 2,
    type: "answer",
    from: "loser",
    avatar: "/src/assets/user.svg",
    text: [
      "상단에 흠집 있습니다, 케이스는 짱구 케이스에요",
      "주민센터 앞에서 잃어버렸어요",
    ],
    time: "12:40 읽음",
  },
];

const ChatRoomPage = () => {
  // localStorage에서 불러오기
  const getStoredMessages = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialMessages;
    try {
      return JSON.parse(raw);
    } catch {
      return initialMessages;
    }
  };
  const [messages, setMessages] = useState(getStoredMessages);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState({ open: false, type: null });
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 메뉴/모달 핸들러
  const openModal = (type) => {
    setMenuOpen(false);
    setModal({ open: true, type });
  };
  const closeModal = () => setModal({ open: false, type: null });
  const handleConfirm = () => {
    if (modal.type === "report") {
      setToast({ open: true, message: "신고가 접수되었습니다.", type: "success" });
    } else if (modal.type === "block") {
      setToast({ open: true, message: "상대방이 차단되었습니다.", type: "success" });
    } else if (modal.type === "exit") {
      setToast({ open: true, message: "채팅방을 나갔습니다.", type: "success" });
      setTimeout(() => navigate("/chat"), 1000);
    }
    setTimeout(() => setToast({ open: false, message: "", type: "success" }), 2000);
    closeModal();
  };

  // 메시지 전송
  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [
      ...messages,
      {
        id: messages.length + 1,
        type: "question",
        from: "finder",
        text: [input],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " 읽음",
      },
    ];
    setMessages(newMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    setInput("");
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50 flex flex-col items-center">
      <Toast open={toast.open} message={toast.message} type={toast.type} />
      <div className="w-full max-w-[390px] h-screen bg-white flex flex-col mx-auto overflow-hidden shadow-lg relative">
        {/* 상단: ← 유저명 ⋮ 메뉴 */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b bg-white" style={{minHeight:'56px'}}>
          <div className="flex items-center">
            <button className="mr-2 text-2xl" onClick={() => navigate(-1)}>&#8592;</button>
            <span className="font-bold text-lg">유저1</span>
          </div>
          <div className="relative">
            <button className="text-2xl" onClick={() => setMenuOpen((v) => !v)}>
              <span className="inline-block w-6 h-6 flex items-center justify-center">⋮</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 w-44 bg-white rounded-xl shadow-lg border z-20 animate-fadein">
                <button className="flex w-full items-center px-4 py-3 text-sm hover:bg-gray-50" onClick={() => openModal('report')}>
                  <span className="mr-2">🚩</span> 신고하기
                </button>
                <button className="flex w-full items-center px-4 py-3 text-sm hover:bg-gray-50" onClick={() => openModal('block')}>
                  <span className="mr-2">⛔</span> 차단하기
                </button>
                <button className="flex w-full items-center px-4 py-3 text-sm hover:bg-gray-50" onClick={() => openModal('exit')}>
                  <span className="mr-2">🚪</span> 채팅방 나가기
                </button>
              </div>
            )}
          </div>
        </div>
        {/* 분실물 정보 카드 */}
        <div className="bg-white px-4 pt-4 pb-2 border-b flex flex-col flex-shrink-0">
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 rounded bg-gray-200 mr-3" />
            <div>
              <div className="font-semibold text-base leading-tight">소니 WH-1000XM4 헤드셋 찾아가세요</div>
              <div className="text-xs text-gray-500">역삼1동 · 10일 전</div>
              <span className="text-blue-600 font-semibold">주인 찾는 중</span>
              <span className="ml-2 text-black font-semibold">현상금 <span className="text-blue-700">10,000원</span></span>
            </div>
          </div>
        </div>
        {/* 상태 안내(회색 박스) */}
        <div className="w-full bg-gray-100 text-gray-700 rounded-lg py-3 font-semibold text-base text-center mt-2 mb-2">물건을 잘 받았어요</div>
        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4 bg-white">
          {messages.map((msg, i) => {
            if (msg.type === "question") {
              return (
                <div key={i} className="flex flex-col items-end">
                  <div className="bg-blue-600 text-white text-sm rounded-2xl px-4 py-2 max-w-[80vw] mb-1 whitespace-pre-line break-words">
                    {msg.text.map((t, idx) => <div key={idx}>{t}</div>)}
                  </div>
                  <div className="text-xs text-gray-400 mr-2">{msg.time}</div>
                </div>
              );
            }
            if (msg.type === "answer") {
              return (
                <div key={i} className="flex items-start gap-2">
                  <img src={msg.avatar} alt="avatar" className="w-8 h-8 rounded-full mt-1" />
                  <div>
                    {msg.text.map((t, idx) => (
                      <div key={idx} className="bg-gray-100 text-gray-800 text-sm rounded-2xl px-4 py-2 max-w-[80vw] mb-1 whitespace-pre-line break-words">{t}</div>
                    ))}
                    <div className="text-xs text-gray-400 ml-1">{msg.time}</div>
                  </div>
                </div>
              );
            }
            return null;
          })}
          <div ref={messagesEndRef} />
        </div>
        {/* 입력창 */}
        <div className="bg-white px-2 py-2 border-t flex items-center flex-shrink-0">
          <button className="mr-2">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-camera"><circle cx="12" cy="12" r="10"/><path d="M8 15l4-4 4 4"/></svg>
          </button>
          <input
            className="flex-1 border rounded-full px-4 py-2 mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="text"
            placeholder="메시지 보내기"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <ConfirmModal
          open={modal.open}
          title={modal.type === 'report' ? '이 사용자를 신고하시겠습니까?' : modal.type === 'block' ? '상대방을 차단하시겠습니까?' : modal.type === 'exit' ? '채팅방을 나가시겠습니까?' : ''}
          desc={modal.type === 'report' ? '신고는 운영팀에 전달되며, 허위 신고 시 제재될 수 있습니다.' : modal.type === 'block' ? '차단 시 더 이상 메시지를 주고받을 수 없습니다.' : modal.type === 'exit' ? '나가면 더 이상 대화를 주고받을 수 없습니다.' : ''}
          confirmText={modal.type === 'report' ? '신고하기' : modal.type === 'block' ? '차단하기' : modal.type === 'exit' ? '나가기' : ''}
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      </div>
    </div>
  );
};

export default ChatRoomPage; 