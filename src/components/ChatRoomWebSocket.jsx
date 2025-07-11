import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs.js';

/**
 * ChatRoomWebSocket
 *
 * Props:
 * - roomId: string | number (필수)
 * - userId: string | number (필수)
 * - subscribeTopic: string (예: `/topic/chat/${roomId}`)
 * - sendDestination: string (예: `/app/chat.send`)
 * - renderMessage: (msg, idx) => ReactNode (optional, 메시지 렌더링 커스텀)
 */
const WS_URL = 'https://15.164.234.32.nip.io/ws-stomp';

const ChatRoomWebSocket = ({
  roomId,
  userId,
  subscribeTopic,
  sendDestination,
  showFoundOwnerMsg,
  showDeliveryMsg,
  showDeliveryCompleted,
  isLostOwner,
  isFinder,
  showPaymentCompleted,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!roomId || !userId) return;
    connect();
    return () => disconnect();
    // eslint-disable-next-line
  }, [roomId, userId]);

  // Store subscription ref
  const subscriptionRef = useRef(null);

  const connect = () => {
    clientRef.current = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      connectHeaders: {
        'X-USER-ID': userId,
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error('STOMP Error:', frame);
      },
    });
    clientRef.current.activate();
  };

  const disconnect = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }
    if (clientRef.current) {
      clientRef.current.deactivate();
    }
  };

  const subscribe = () => {
    if (!clientRef.current || !subscribeTopic) return;
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }
    subscriptionRef.current = clientRef.current.subscribe(subscribeTopic, (message) => {
      const receivedMessage = JSON.parse(message.body);
      setMessages((prev) => {
        // 메시지 id가 있으면 중복 추가 방지
        if (prev.some(m => m.id && receivedMessage.id && m.id === receivedMessage.id)) return prev;
        // id가 없으면 content+createdAt로 임시 중복 방지
        if (prev.some(m => m.content === receivedMessage.content && m.createdAt === receivedMessage.createdAt)) return prev;
        return [...prev, receivedMessage];
      });
    });
  };

  const sendMessage = () => {
    if (input.trim() && clientRef.current && clientRef.current.connected) {
      const chatMessage = {
        roomId,
        senderId: userId,
        content: input,
        type: 'TEXT',
        createdAt: new Date().toISOString(), // UTC로 저장
      };
      clientRef.current.publish({
        destination: sendDestination,
        body: JSON.stringify(chatMessage),
      });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white" style={{height: '100%', minHeight: 400}}>
      <div className="flex-1 overflow-y-auto px-3 py-2" style={{maxHeight: 400, minHeight: 300, background: '#fff'}}>
        {messages.map((msg, idx) => {
          const isMine = String(msg.senderId) === String(userId);
          // 시간 포맷
          function getTimeStr(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            // 한국 시간대 강제 적용
            return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Seoul' });
          }
          // 마지막 메시지 그룹 판별 (내 메시지 연속 그룹의 마지막만 시간/읽음 표시)
          const isLastOfGroup =
            idx === messages.length - 1 ||
            String(messages[idx + 1]?.senderId) !== String(msg.senderId);
          return (
            <div
              key={msg.id || idx}
              className={`flex w-full mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col items-end">
                <div
                  className={
                    isMine
                      ? 'flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-4 py-2.5 rounded-[22px] bg-[#06f] w-full max-w-[310px]'
                      : 'flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 w-full max-w-[268px] px-4 py-2.5 rounded-[22px] bg-[#f2f2f2]'
                  }
                  style={isMine ? {} : {}}
                >
                  <p className={isMine ? 'self-stretch flex-grow-0 flex-shrink-0 w-full text-base text-left text-white break-words' : 'flex-grow w-full text-base text-left text-[#111] break-words'}>
                    {msg.content}
                  </p>
                </div>
                {/* 마지막 메시지 그룹에만 시간/읽음 표시 */}
                {isLastOfGroup && (
                  <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1 mt-1 mr-1">
                    <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">{getTimeStr(msg.createdAt)}</p>
                    <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#808080]">읽음</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {/* 주인을 찾았어요 메시지 - 습득자용 */}
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
      <div className="flex flex-col justify-start items-center w-[390px] bg-white" style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: '42px', zIndex: 20 }}>
        <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-2.5 px-6">
          <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0 w-6 h-6 relative "
              preserveAspectRatio="none"
            >
              <path
                d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M7.8523 5.34341L7.86169 5.31319C8.10539 4.52919 8.79233 4 9.56632 4L14.4337 4C15.2076 4 15.8946 4.52919 16.1383 5.31319L16.1477 5.34341C16.2695 5.7354 16.613 6 17 6L18 6C19.6569 6 21 7.34315 21 9V17C21 18.6569 19.6569 20 18 20H6C4.34315 20 3 18.6569 3 17L3 9C3 7.34315 4.34315 6 6 6L6.99999 6C7.38699 6 7.73045 5.7354 7.8523 5.34341Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[290px] h-11 overflow-hidden gap-3 px-3 py-[11px] rounded-[22px] bg-[#f2f2f2]">
            <input
              type="text"
              className="flex-grow w-[266px] text-base font-medium text-left text-[#111] bg-[#f2f2f2] outline-none border-none"
              placeholder="메시지 보내기"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
          </div>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-9 h-11 relative gap-2.5">
            <button onClick={sendMessage}>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                preserveAspectRatio="none"
              >
                <g clipPath="url(#clip0_652_9848)">
                  <path
                    d="M21.2847 12.1421L4.46546 20.2403C3.64943 20.6332 2.77317 19.8256 3.0983 18.9803L5.72836 12.1421M21.2847 12.1421L4.46546 4.04397C3.64943 3.65107 2.77317 4.45864 3.0983 5.30396L5.72836 12.1421M21.2847 12.1421H5.72836"
                    stroke="#111111"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
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
  );
};

export default ChatRoomWebSocket; 