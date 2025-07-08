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
    type: "info",
    text: "물건을 잘 받았어요",
  },
  {
    id: 3,
    type: "question",
    text: [
      "아래는 습득자가 등록한 분실물 본질입니다. 본실물과 비교하여 정확하게 답변해 주세요.",
      "1. 아이폰 상단에 흠집이 있나요?",
      "2. 아이폰 케이스는 어떤건가요?",
      "3. 어디서 잃어버리셨나요?",
    ],
    time: "12:40 읽음",
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
  },
];

const Chat = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        time: "12:41 읽음",
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 상단 정보 */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="font-semibold text-base">소니 WH-1000XM4 헤드셋 찾아주세요</div>
        <div className="text-xs text-gray-500">역삼1동 · 10일 전</div>
        <div className="text-xs text-blue-500 font-semibold">주인 찾는 중</div>
      </div>
      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
        {/* 안내 메시지 */}
        <div className="flex justify-center">
          <div className="bg-gray-100 text-gray-700 text-xs rounded px-3 py-1">물건을 잘 받았어요</div>
        </div>
        {/* 질문 메시지 */}
        <div className="flex flex-col items-end">
          <div className="bg-blue-500 text-white text-sm rounded-lg px-4 py-2 max-w-[80%] mb-1">
            <div>아래는 습득자가 등록한 분실물 본질입니다. 본실물과 비교하여 정확하게 답변해 주세요.</div>
            <div className="mt-2">
              <div>1. 아이폰 상단에 흠집이 있나요?</div>
              <div>2. 아이폰 케이스는 어떤건가요?</div>
              <div>3. 어디서 잃어버리셨나요?</div>
            </div>
          </div>
          <div className="text-xs text-gray-400 mr-2">12:40 읽음</div>
        </div>
        {/* 답변 메시지 */}
        <div className="flex items-start">
          <img src="/src/assets/user.svg" alt="avatar" className="w-8 h-8 rounded-full mr-2" />
          <div>
            <div className="bg-white border text-gray-800 text-sm rounded-lg px-4 py-2 max-w-[80%] mb-1">
              <div>상단에 흠집 있습니다, 케이스는 짱구 케이스에요</div>
              <div>주민센터 앞에서 잃어버렸어요</div>
            </div>
            <div className="text-xs text-gray-400 ml-1">12:40 읽음</div>
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>
      {/* 입력창 */}
      <div className="bg-white px-2 py-2 border-t flex items-center">
        <input
          className="flex-1 border rounded-full px-4 py-2 mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          type="text"
          placeholder="메시지 보내기"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          전송
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Chat;
