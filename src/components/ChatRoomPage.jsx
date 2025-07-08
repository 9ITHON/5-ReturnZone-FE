import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import BottomNav from "./BottomNav.jsx";

// 상태: waiting(전달대기), delivering(전달중), delivered(전달완료), reward(포인트지급)
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

const dummyMessages = [
  {
    id: 1,
    type: "system",
    text: "소니 WH-1000XM4 헤드셋 찾아주세요",
    sub: "역삼1동 · 10일 전",
    reward: "10,000원",
    status: "물건 전달 중",
    info: "물건 전달 중 주인을 찾아 포인트를 받아보세요!",
  },
  {
    id: 2,
    type: "info",
    text: "물건을 잘 받았어요",
  },
  {
    id: 3,
    type: "question",
    text: [
      "분실물과 비교하여 정확하게 답변해 주세요.",
      "1. 아이폰 상단에 흠집이 있나요?",
      "2. 아이폰 케이스는 어떤건가요?",
      "3. 어디서 잃어버리셨나요?",
    ],
    time: "12:40 읽음",
    isMine: true,
  },
  {
    id: 4,
    type: "answer",
    avatar: "/src/assets/user.svg",
    text: [
      "상단에 흠집 있습니다, 케이스는 짱구 케이스에요",
      "주민센터 앞에서 잃어버렸어요",
    ],
    time: "12:40 읽음",
    isMine: false,
  },
  {
    id: 5,
    type: "info",
    text: "물건 잘 도착했어요. 찾아주셔서 감사합니다!",
  },
];

const ChatRoomPage = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const [statusIdx, setStatusIdx] = useState(0); // 상태 전환용
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const status = STATUS_FLOW[statusIdx];
  const statusInfo = STATUS_LABEL[status];
  const guide = STATUS_GUIDE[status];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 더미 웹소켓: 내가 메시지 보내면 1초 후 상대방 메시지 랜덤 도착
  useEffect(() => {
    if (messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.isMine) {
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            type: "answer",
            avatar: "/src/assets/user.svg",
            text: ["감사합니다!"],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " 읽음",
            isMine: false,
          },
        ]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        type: "answer",
        avatar: "/src/assets/user.svg",
        text: [input],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " 읽음",
        isMine: true,
      },
    ]);
    setInput("");
  };

  // 상태 전환(버튼 클릭 시)
  const handleStatusNext = () => {
    if (statusIdx < STATUS_FLOW.length - 1) setStatusIdx(statusIdx + 1);
  };

  // 상단 시스템 메시지 정보
  const system = messages.find((m) => m.type === "system");

  return (
    <div className="relative w-full min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[390px] h-screen bg-white flex flex-col mx-auto overflow-hidden shadow-lg">
        {/* 상단 정보 */}
        <div className="bg-white px-4 py-3 border-b flex items-center flex-shrink-0" style={{minHeight:'56px'}}>
          <button className="mr-2 text-2xl" onClick={() => navigate(-1)}>&#8592;</button>
          <div className="font-semibold text-base flex-1">유저1</div>
          <button className="ml-2 text-xl">&#8942;</button>
        </div>
        {/* 시스템 메시지 (현상/상태/안내/버튼) */}
        {system && (
          <div className="bg-white px-4 pt-3 pb-2 border-b flex flex-col gap-2 flex-shrink-0">
            <div className="flex items-center mb-1">
              <div className="w-10 h-10 rounded bg-gray-200 mr-3" />
              <div>
                <div className="font-semibold text-[15px] leading-tight">{system.text}</div>
                <div className="text-xs text-gray-500">{system.sub}</div>
                {system.reward && <div className="text-xs text-black font-semibold">현상금 <span className="text-blue-700">{system.reward}</span></div>}
                <div className={`text-xs font-semibold ${statusInfo.color}`}>{statusInfo.label}</div>
                {statusInfo.info && <div className="text-xs text-gray-400 font-normal">{statusInfo.info}</div>}
              </div>
            </div>
            {/* 상태별 버튼/안내 */}
            {status === "waiting" && (
              <button className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold text-[15px]" onClick={handleStatusNext}>물건을 잘 받았어요</button>
            )}
            {status === "delivering" && (
              <div className="w-full bg-gray-100 text-gray-500 rounded-lg py-2 font-semibold text-[15px] text-center">전달을 기다리고 있어요</div>
            )}
            {status === "delivered" && (
              <div className="w-full bg-gray-100 text-gray-500 rounded-lg py-2 font-semibold text-[15px] text-center">물건을 잘 받았어요</div>
            )}
            {status === "reward" && (
              <div className="w-full bg-blue-50 text-blue-600 rounded-lg py-2 font-semibold text-[15px] text-center">500포인트 지급 완료</div>
            )}
          </div>
        )}
        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => {
            if (msg.type === "info") {
              return (
                <div key={i} className="flex justify-center">
                  <div className="bg-gray-100 text-gray-700 text-sm rounded px-3 py-2 w-full text-center max-w-[80%]">{msg.text}</div>
                </div>
              );
            }
            if (msg.type === "question") {
              return (
                <div key={i} className="flex flex-col items-end">
                  <div className="bg-blue-600 text-white text-sm rounded-2xl px-4 py-2 max-w-[80%] mb-1 whitespace-pre-line break-words">
                    <div>{msg.text[0]}</div>
                    <div className="mt-2">
                      <div>{msg.text[1]}</div>
                      <div>{msg.text[2]}</div>
                      <div>{msg.text[3]}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mr-2">{msg.time}</div>
                </div>
              );
            }
            // 내 메시지
            if (msg.isMine) {
              return (
                <div key={i} className="flex flex-col items-end">
                  <div className="bg-blue-600 text-white text-sm rounded-2xl px-4 py-2 max-w-[80%] mb-1 whitespace-pre-line break-words">
                    {Array.isArray(msg.text)
                      ? msg.text.map((t, idx) => <div key={idx}>{t}</div>)
                      : msg.text}
                  </div>
                  <div className="text-xs text-gray-400 mr-2">{msg.time}</div>
                </div>
              );
            }
            // 상대 메시지
            return (
              <div key={i} className="flex items-start">
                <img src="/src/assets/user.svg" alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                <div>
                  <div className="bg-white border text-gray-800 text-sm rounded-2xl px-4 py-2 max-w-[80%] mb-1 whitespace-pre-line break-words">
                    {Array.isArray(msg.text)
                      ? msg.text.map((t, idx) => <div key={idx}>{t}</div>)
                      : msg.text}
                  </div>
                  <div className="text-xs text-gray-400 ml-1">{msg.time}</div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        {/* 상태별 안내 말풍선 */}
        <div className={`mx-2 my-2 border ${guide.color} rounded-xl px-4 py-3 text-sm flex items-start gap-2 whitespace-pre-line`}>
          <span className="text-xl mr-1">{guide.icon}</span>
          <span>{guide.text}</span>
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
        {/* BottomNav 제거됨 */}
      </div>
    </div>
  );
};

export default ChatRoomPage; 