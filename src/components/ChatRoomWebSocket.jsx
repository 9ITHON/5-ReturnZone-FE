import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs.js";
import ChatMessage from "./ChatMessage";
import { apiService } from "../services/apiService";

const WS_URL = "https://15.164.234.32.nip.io/ws-stomp";

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
  const [input, setInput] = useState("");
  const clientRef = useRef(null);
  const subscriptionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!roomId || !userId) return;
    connect();
    return () => disconnect();
  }, [roomId, userId]);

  useEffect(() => {
    setMessages([]);
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !userId) return;
    const loadChatHistory = async () => {
      try {
        const response = await apiService.getChatMessages(roomId, 0);
        if (response && response.content) {
          setMessages(response.content);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    };
    loadChatHistory();
  }, [roomId, userId]);

  const connect = () => {
    clientRef.current = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      connectHeaders: {
        "X-USER-ID": userId,
      },
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("WebSocket connected successfully");
        subscribe();
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame);
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
    subscriptionRef.current = clientRef.current.subscribe(
      subscribeTopic,
      async (message) => {
        const receivedMessage = JSON.parse(message.body);

        setMessages((prev) => {
          const isDuplicate = prev.some(
            (m) =>
              (m.id && receivedMessage.id && m.id === receivedMessage.id) ||
              (m.content === receivedMessage.content && m.createdAt === receivedMessage.createdAt)
          );
          return isDuplicate ? prev : [...prev, receivedMessage];
        });

        if (String(receivedMessage.senderId) !== String(userId)) {
          try {
            await apiService.markMessageAsRead(roomId, userId);
          } catch (error) {
            console.error('Failed to mark message as read:', error);
          }
        }
      }
    );
  };

  const sendMessage = () => {
    if (input.trim() && clientRef.current?.connected) {
      const chatMessage = {
        roomId,
        senderId: userId,
        content: input,
        type: "TEXT",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, chatMessage]);
      clientRef.current.publish({
        destination: sendDestination,
        body: JSON.stringify(chatMessage),
      });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white" style={{ minHeight: 400 }}>
      <div className="flex-1 overflow-y-auto px-3 py-2" style={{ maxHeight: 400 }}>
        {messages.map((msg, idx) => {
          const isMine = String(msg.senderId) === String(userId);
          const isLastOfGroup =
            idx === messages.length - 1 ||
            String(messages[idx + 1]?.senderId) !== String(msg.senderId);
          return (
            <ChatMessage
              key={msg.id || idx}
              message={msg}
              isMine={isMine}
              senderName={msg.senderName || '사용자'}
              showSenderName={!isMine && isLastOfGroup}
            />
          );
        })}
        {/* 상태 메시지 */}
        {showFoundOwnerMsg && isFinder && (
          <Notice text="😀 주인을 찾았어요! 이제 물건을 전달해 주세요. 분실자가 수령을 확인하면 포인트가 자동 지급됩니다." />
        )}
        {showDeliveryMsg && isFinder && (
          <Notice text="📦 물건 전달이 시작되었습니다. 물건을 받으셨다면, 상단의 버튼을 눌러주세요. 버튼을 누르면 물건을 찾아준 분에게 현상금이 지급됩니다." />
        )}
        {showDeliveryCompleted && isFinder && (
          <Notice text="🎉 전달 완료! 주인이 물건을 잘 받았어요. 약속된 500포인트가 지급되었습니다. 감사합니다!" />
        )}
        {showFoundOwnerMsg && isLostOwner && (
          <Notice text="📦 물건 전달이 시작되었습니다. 물건을 받으셨다면, 상단의 버튼을 눌러주세요. 버튼을 누르면 물건을 찾아준 분에게 현상금이 지급됩니다." />
        )}
        {showDeliveryCompleted && isLostOwner && (
          <Notice text="🎉 물건을 잘 받으셨군요! 찾아주신 분에게 현상금이 지급되었습니다." />
        )}
        {showPaymentCompleted && isLostOwner && (
          <Notice text="✅ 습득자에게 현상금이 지급되었어요. 감사합니다!" />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[390px] bg-white z-20">
        <div className="flex items-center gap-2.5 px-6">
          <div className="flex-shrink-0 w-9 h-11" />
          <div className="flex-grow flex items-center w-[290px] h-11 px-3 bg-[#f2f2f2] rounded-[22px]">
            <input
              type="text"
              className="flex-grow bg-transparent outline-none text-base text-[#111]"
              placeholder="메시지 보내기"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
          </div>
          <div className="w-9 h-11 flex items-center">
            <button onClick={sendMessage}>
              <svg width={24} height={24} viewBox="0 0 24 24">
                <path
                  d="M21.3 12.1L4.5 20.2c-.8.4-1.7-.4-1.4-1.2L5.7 12 3.1 5.3c-.3-.8.6-1.5 1.4-1.1l16.8 8.1z"
                  stroke="#111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 알림 메시지 공통 컴포넌트
const Notice = ({ text }) => (
  <div className="flex justify-start items-start self-stretch p-2.5 mb-2 rounded-lg bg-[#06f]/[0.15] border border-[#06f]">
    <p className="text-xs font-medium text-[#111]">{text}</p>
  </div>
);

export default ChatRoomWebSocket;
