import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

/**
 * ChatRoomWebSocket
 *
 * Props:
 * - roomId: string | number (필수)
 * - memberId: string | number (필수)
 * - subscribeTopic: string (예: `/topic/chat/${roomId}`)
 * - sendDestination: string (예: `/app/chat.send`)
 * - renderMessage: (msg, idx) => ReactNode (optional, 메시지 렌더링 커스텀)
 */
const ChatRoomWebSocket = ({
  memberId,
  showFoundOwnerMsg = false,
  showDeliveryMsg = false,
  showDeliveryCompleted = false,
  isLostOwner = false,
  isFinder = false,
  showPaymentCompleted = false,
}) => {
  // 더미 메시지 목록 (상대방)
  const dummyMessages = [
    {
      id: 1,
      memberId: "other",
      content: "네, 안녕하세요! 무엇을 도와드릴까요?",
      createdAt: "2024-06-10T10:00:05.000Z",
    },
    {
      id: 2,
      memberId: "other",
      content: "분실물의 특징을 알려주시면 도와드릴 수 있습니다.",
      createdAt: "2024-06-10T10:00:10.000Z",
    },
    {
      id: 3,
      memberId: "other",
      content: "찾으시는 물건이 어떤 건가요?",
      createdAt: "2024-06-10T10:00:15.000Z",
    },
  ];
  // 내 메시지
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [dummyIndex, setDummyIndex] = useState(0); // 다음에 보여줄 더미 메시지 인덱스
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const myMsg = {
      id: Date.now(),
      memberId: memberId,
      content: input,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, myMsg]);
    setInput("");
    // 1초 후 더미 메시지 하나 추가 (있을 때만)
    if (dummyIndex < dummyMessages.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            ...dummyMessages[dummyIndex],
            id: Date.now() + 1, // 고유 id 보장
            createdAt: new Date().toISOString(),
          },
        ]);
        setDummyIndex((idx) => idx + 1);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white" style={{ minHeight: 0, height: '100%' }}>
      <div className="flex-1 overflow-y-auto px-2 py-2" style={{ minHeight: 0, background: '#fff' }}>
        {messages.map((msg, idx) => {
          const isMine = String(msg.memberId) === String(memberId);
          const isLastOfGroup =
            idx === messages.length - 1 ||
            String(messages[idx + 2]?.memberId) !== String(msg.memberId);
          return (
            <ChatMessage
              key={msg.id || idx}
              message={msg}
              isMine={isMine}
              senderName={isMine ? "나" : "상대방"}
              showSenderName={!isMine && isLastOfGroup}
            />
          );
        })}
        {/* 안내 메시지들 */}
        {showFoundOwnerMsg && isFinder && (
          <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#06f]/[0.15] border border-[#06f] mb-2">
            <p className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                😀 주인을 찾았어요! 이제 물건을 전달해 주세요.
              </span>
              <br />
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                분실자가 수령을 확인하면 포인트가 자동 지급됩니다.
              </span>
            </p>
          </div>
        )}
        {/* 물건 전달 시작 메시지 - 습득자용 */}
        {showDeliveryMsg && isFinder && (
          <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#06f]/[0.15] border border-[#06f] mb-2">
            <p className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                📦 물건 전달이 시작되었습니다.
              </span>
              <br />
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                물건을 받으셨다면, 상단의 버튼을 눌러주세요.
              </span>
              <br />
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                버튼을 누르면 물건을 찾아준 분에게 현상금이 지급됩니다.
              </span>
            </p>
          </div>
        )}
        {/* 전달 완료 메시지 - 습득자용 */}
        {showDeliveryCompleted && isFinder && (
          <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#06f]/[0.15] border border-[#06f] mb-2">
            <p className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                🎉 전달 완료! 주인이 물건을 잘 받았어요.
              </span>
              <br />
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                약속된 500포인트가 지급되었습니다. 감사합니다!
              </span>
            </p>
          </div>
        )}
        {showFoundOwnerMsg && isLostOwner && (
          <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#06f]/[0.15] border border-[#06f] mb-2">
            <p className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                📦 물건 전달이 시작되었습니다.
              </span>
              <br />
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                물건을 받으셨다면, 상단의 버튼을 눌러주세요.
              </span>
              <br />
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                버튼을 누르면 물건을 찾아준 분에게 현상금이 지급됩니다.
              </span>
            </p>
          </div>
        )}
        {showDeliveryCompleted && isLostOwner && (
          <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#06f]/[0.15] border border-[#06f] mb-2">
            <p className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                🎉 물건을 잘 받으셨군요!
              </span>
              <br />
              <span className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
                찾아주신 분에게 현상금이 지급되었습니다.
              </span>
            </p>
          </div>
        )}
        {showPaymentCompleted && isLostOwner && (
          <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#06f]/[0.15] border border-[#06f] mb-2">
            <p className="flex-grow w-[314px] text-[12px] font-medium text-left text-[#111]">
              ✅ 습득자에게 현상금이 지급되었어요. 감사합니다!
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* 메시지 입력 바 */}
      <div
        className="flex flex-col justify-start items-center bg-white"
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 0,
          zIndex: 20,
          width: '100%',
          maxWidth: 390,
        }}
      >
        <div className="flex justify-center items-center w-full gap-2.5 px-2 py-2 bg-white">
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-2.5 px-6">
            <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative " preserveAspectRatio="none">
                <path d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M7.8523 5.34341L7.86169 5.31319C8.10539 4.52919 8.79233 4 9.56632 4L14.4337 4C15.2076 4 15.8946 4.52919 16.1383 5.31319L16.1477 5.34341C16.2695 5.7354 16.613 6 17 6L18 6C19.6569 6 21 7.34315 21 9V17C21 18.6569 19.6569 20 18 20H6C4.34315 20 3 18.6569 3 17L3 9C3 7.34315 4.34315 6 6 6L6.99999 6C7.38699 6 7.73045 5.7354 7.8523 5.34341Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="flex justify-start items-center flex-grow h-11 overflow-hidden gap-3 px-3 py-[11px] rounded-[22px] bg-[#f2f2f2]">
              <input
                type="text"
                className="flex-grow text-base font-medium text-left text-[#111] bg-[#f2f2f2] outline-none border-none"
                placeholder="메시지 보내기"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
            </div>
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
              <button onClick={sendMessage} disabled={!input.trim()}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0 w-6 h-6 relative" preserveAspectRatio="none">
                  <g clipPath="url(#clip0_652_9848)">
                    <path d="M21.2847 12.1421L4.46546 20.2403C3.64943 20.6332 2.77317 19.8256 3.0983 18.9803L5.72836 12.1421M21.2847 12.1421L4.46546 4.04397C3.64943 3.65107 2.77317 4.45864 3.0983 5.30396L5.72836 12.1421M21.2847 12.1421H5.72836" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>
                  <defs>
                    <clipPath id="clip0_652_9848">
                      <rect width={24} height={24} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatRoomWebSocket;