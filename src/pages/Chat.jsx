import { useState, useRef, useEffect } from "react";
import BottomNav from "../components/BottomNav.jsx";

const dummyMessages = [
  {
    id: 1,
    type: "system",
    text: "소니 WH-1000XM4 헤드셋 찾아주세요",
    sub: "역삼1동 · 10일 전",
    status: "주인 찾는 중",
  },
  
  {
    id: 2,
    type: "question",
    text: [
      "아래는 습득자가 등록한 분실물 특징입니다. 분실물과 비교하여 정확하게 답변해 주세요.",
      "1. 아이폰 상단에 흠집이 있나요?",
      "2. 아이폰 케이스는 어떤건가요?",
      "3. 어디서 잃어버리셨나요?",
    ],
    time: "12:40 읽음",
    isMine: true,
  },
  {
    id: 3,
    type: "answer",
    avatar: "/src/assets/user.svg",
    text: [
      "상단에 흠집 있습니다, 케이스는 짱구 케이스에요",
      "주민센터 앞에서 잃어버렸어요",
    ],
    time: "12:40 읽음",
    isMine: false,
  },
];

const dummyReplies = [
  "네 맞아요!",
  "사진 보내드릴까요?",
  "감사합니다!",
  "혹시 더 궁금한 점 있으신가요?",
  "네, 맞게 확인했습니다.",
];

const Chat = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

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
            text: [dummyReplies[Math.floor(Math.random() * dummyReplies.length)]],
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 상단 정보 */}
      <div className="bg-white px-4 py-3 border-b flex items-center">
        <button className="mr-2 text-2xl">&#8592;</button>
        <div className="font-semibold text-base flex-1">유저1</div>
        <button className="ml-2 text-xl">&#8942;</button>
      </div>
      {/* 시스템 메시지 */}
      {/* <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded bg-gray-200 mr-3" />
          <div>
            <div className="font-semibold text-sm">소니 WH-1000XM4 헤드셋 찾아주세요</div>
            <div className="text-xs text-gray-500">역삼동 · 10일 전</div>
            <div className="text-xs text-blue-500 font-semibold">주인 찾는 중 <span className="text-gray-400 font-normal">주인을 찾아 포인트를 받아보세요!</span></div>
          </div>
        </div>
      </div> */}
      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
        {messages.map((msg, i) => {
          if (msg.type === "info") {
            return (
              <div key={i} className="flex justify-center">
                <div className="text-blue-600 text-sm font-semibold">{msg.text}</div>
              </div>
            );
          }
          if (msg.type === "button") {
            return (
              <div key={i} className="flex justify-center">
                <button className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold">{msg.text}</button>
              </div>
            );
          }
          if (msg.type === "question") {
            return (
              <div key={i} className="flex flex-col items-end">
                <div className="bg-blue-600 text-white text-sm rounded-lg px-4 py-2 max-w-[80%] mb-1">
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
                <div className="bg-blue-600 text-white text-sm rounded-lg px-4 py-2 max-w-[80%] mb-1">
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
                <div className="bg-white border text-gray-800 text-sm rounded-lg px-4 py-2 max-w-[80%] mb-1">
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
      {/* 입력창 */}
      <div className="bg-white px-2 py-2 border-t flex items-center">
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
      <BottomNav />
    </div>
  );
};

export default Chat;
