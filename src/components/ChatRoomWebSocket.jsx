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
  renderMessage,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const clientRef = useRef(null);

  useEffect(() => {
    if (!roomId || !userId) return;
    connect();
    return () => disconnect();
    // eslint-disable-next-line
  }, [roomId, userId]);

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
    if (clientRef.current) {
      clientRef.current.deactivate();
    }
  };

  const subscribe = () => {
    if (!clientRef.current || !subscribeTopic) return;
    clientRef.current.subscribe(subscribeTopic, (message) => {
      const receivedMessage = JSON.parse(message.body);
      setMessages((prev) => [...prev, receivedMessage]);
    });
  };

  const sendMessage = () => {
    if (input.trim() && clientRef.current && clientRef.current.connected) {
      const chatMessage = {
        roomId,
        senderId: userId,
        content: input,
        type: 'TEXT',
      };
      clientRef.current.publish({
        destination: sendDestination,
        body: JSON.stringify(chatMessage),
      });
      setInput('');
    }
  };

  return (
    <div>
      <div className="messages-area" style={{ border: '1px solid #ccc', height: 300, overflowY: 'scroll', padding: 10 }}>
        {messages.map((msg, idx) =>
          renderMessage ? renderMessage(msg, idx) : (
            <div key={idx}>
              <strong>{msg.senderId}:</strong> {msg.content}
            </div>
          )
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>보내기</button>
      </div>
    </div>
  );
};

export default ChatRoomWebSocket; 