import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WS_URL = "ws://15.164.234.32:8080/ws/chat";
const MARK_READ_URL = "http://15.164.234.32:8080/api/chat/markRead";

const chatRoomId = "1"; // TODO: 실제 채팅방 id로 대체
const userId = "user1"; // TODO: 실제 로그인 유저 id로 대체

// 더미 데이터
const initialMessages = [
  {
    id: 1,
    from: "user2",
    content: "안녕하세요! 헤드셋 정말 잃어버리신 거 맞나요?",
    time: "오후 2:30",
    avatar: "/src/assets/user.svg"
  },
  {
    id: 2,
    from: "user1", 
    content: "네 맞습니다. 혹시 찾으셨나요?",
    time: "오후 2:32"
  },
  {
    id: 3,
    from: "user2",
    content: "네! 역삼역 근처에서 발견했어요. 언제 받으실 수 있나요?",
    time: "오후 2:35",
    avatar: "/src/assets/user.svg"
  }
];

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

const ChatRoomPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState({ open: false, type: null });
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });
  const [wsError, setWsError] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const ws = useRef(null);

  // WebSocket 연결 및 fallback
  useEffect(() => {
    let didFallback = false;
    try {
      ws.current = new window.WebSocket(`${WS_URL}/${chatRoomId}`);
      ws.current.onopen = () => {
        axios.post(MARK_READ_URL, { chatRoomId, userId });
        setMessages([]); // 서버 연결 성공 시 빈 채팅(혹은 서버에서 불러오기)
      };
      ws.current.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        setMessages((prev) => [...prev, msg]);
        axios.post(MARK_READ_URL, { chatRoomId, userId });
      };
      ws.current.onerror = () => {
        setWsError(true);
        setMessages(initialMessages);
        didFallback = true;
      };
      ws.current.onclose = () => {
        if (!didFallback) {
          setWsError(true);
          setMessages(initialMessages);
        }
      };
    } catch {
      setWsError(true);
      setMessages(initialMessages);
    }
    return () => {
      ws.current && ws.current.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 메시지 전송
  const handleSend = () => {
    if (!input.trim()) return;
    if (ws.current && ws.current.readyState === 1 && !wsError) {
      ws.current.send(JSON.stringify({
        chatRoomId,
        userId,
        content: input,
      }));
    } else {
      // fallback: 더미 메시지 추가
      const newMsg = {
        id: Date.now(),
        from: userId,
        content: input,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMsg]);
      // 더미 답장
      setTimeout(() => {
        const quickReplies = ["알겠습니다!", "네네", "좋아요!", "ㅎㅎ"];
        const randomReply = quickReplies[Math.floor(Math.random() * quickReplies.length)];
        const replyMsg = {
          id: Date.now() + 1,
          from: "user2",
          content: randomReply,
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          avatar: "/src/assets/user.svg"
        };
        setMessages(prev => [...prev, replyMsg]);
      }, 1000 + Math.random() * 2000);
    }
    setInput("");
  };

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
      const exited = JSON.parse(localStorage.getItem("exitedChats") || "[]");
      if (!exited.includes(chatRoomId)) {
        exited.push(chatRoomId);
        localStorage.setItem("exitedChats", JSON.stringify(exited));
      }
      setToast({ open: true, message: "채팅방을 나갔습니다.", type: "success" });
      setTimeout(() => navigate("/chat"), 1000);
    }
    setTimeout(() => setToast({ open: false, message: "", type: "success" }), 2000);
    closeModal();
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50 flex flex-col items-center">
      <Toast open={toast.open} message={toast.message} type={toast.type} />
      <div className="w-full max-w-[390px] h-screen bg-white flex flex-col mx-auto overflow-hidden shadow-lg relative">
        {/* 상단: ← 유저명 ⋮ 메뉴 */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b bg-white" style={{minHeight:'56px'}}>
          <div className="flex items-center">
            <button className="mr-2 text-2xl" onClick={() => navigate(-1)}>&#8592;</button>
            <span className="font-bold text-lg">유저2</span>
          </div>
          <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
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
          {wsError && (
            <div className="text-center text-xs text-red-500 mb-2">서버 연결에 실패하여 더미 채팅으로 표시 중입니다.</div>
          )}
          {messages.map((msg, i) => {
            if (msg.from === userId) {
              return (
                <div key={i} className="flex flex-col items-end">
                  <div className="bg-blue-600 text-white text-sm rounded-2xl px-4 py-2 max-w-[80vw] mb-1 whitespace-pre-line break-words">
                    {msg.content}
                  </div>
                  <div className="text-xs text-gray-400 mr-2">{msg.time}</div>
                </div>
              );
            } else {
              return (
                <div key={i} className="flex items-start gap-2">
                  <img src={msg.avatar || "/src/assets/user.svg"} alt="avatar" className="w-8 h-8 rounded-full mt-1" />
                  <div>
                    <div className="bg-gray-100 text-gray-800 text-sm rounded-2xl px-4 py-2 max-w-[80vw] mb-1 whitespace-pre-line break-words">{msg.content}</div>
                    <div className="text-xs text-gray-400 ml-1">{msg.time}</div>
                  </div>
                </div>
              );
            }
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
          title={
            modal.type === "report" ? "신고하기" :
            modal.type === "block" ? "차단하기" :
            modal.type === "exit" ? "채팅방 나가기" : ""
          }
          desc={
            modal.type === "report" ? "정말 신고하시겠습니까?" :
            modal.type === "block" ? "정말 차단하시겠습니까?" :
            modal.type === "exit" ? "정말 나가시겠습니까?" : ""
          }
          confirmText={
            modal.type === "report" ? "신고하기" :
            modal.type === "block" ? "차단하기" :
            modal.type === "exit" ? "나가기" : ""
          }
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      </div>
    </div>
  );
};

export default ChatRoomPage; 