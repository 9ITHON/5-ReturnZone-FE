import "./index.css";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [unreadMessages, setUnreadMessages] = useState(new Set());

  const handleMessageRead = (chatRoomId) => {
    setUnreadMessages(prev => {
      const newSet = new Set(prev);
      newSet.delete(chatRoomId);
      return newSet;
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col mx-auto shadow-lg relative">
        <Outlet context={{ onMessageRead: handleMessageRead, unreadCount: unreadMessages.size }} />
      </div>
    </div>
  );
}

export default App;
