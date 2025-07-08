import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ChatRoomPage = ({ onMessageRead }) => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 채팅방에 들어왔을 때 메시지를 읽음 처리
    if (onMessageRead) {
      onMessageRead(id);
    }
  }, [id, onMessageRead]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.isMine ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg ${message.isMine ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            className="flex-1 p-2 border rounded-lg"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage; 