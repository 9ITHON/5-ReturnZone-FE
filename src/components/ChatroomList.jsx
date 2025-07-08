import React from "react";
import { useNavigate } from "react-router-dom";

// 더미 데이터
const chatrooms = [
  {
    id: 1,
    profile: "/src/assets/user.svg",
    name: "유저1",
    lastMessage: "메시지메시지메시지메시지메시지...",
    time: "10분 전",
    unread: 22,
  },
  {
    id: 2,
    profile: "/src/assets/user.svg",
    name: "유저1",
    lastMessage: "메시지메시지메시지메시지메시지...",
    time: "10분 전",
    unread: 0,
  },
  {
    id: 3,
    profile: "/src/assets/user.svg",
    name: "유저1",
    lastMessage: "메시지메시지메시지메시지메시지...",
    time: "10분 전",
    unread: 9,
  },
  {
    id: 4,
    profile: "/src/assets/user.svg",
    name: "유저1",
    lastMessage: "메시지메시지메시지메시지메시지...",
    time: "10분 전",
    unread: 0,
  },
  {
    id: 5,
    profile: "/src/assets/user.svg",
    name: "유저1",
    lastMessage: "메시지메시지메시지메시지메시지...",
    time: "10분 전",
    unread: 0,
  },
  {
    id: 6,
    profile: "/src/assets/user.svg",
    name: "유저1",
    lastMessage: "메시지메시지메시지메시지메시지...",
    time: "10분 전",
    unread: 0,
  },
];

const ChatroomItem = ({ id, profile, name, lastMessage, time, unread, onClick }) => (
  <div className="flex items-center px-4 py-3 border-b cursor-pointer hover:bg-gray-50" onClick={() => onClick(id)}>
    <img
      src={profile}
      alt="profile"
      className="w-12 h-12 rounded-full object-cover mr-3 bg-gray-200"
    />
    <div className="flex-1 min-w-0">
      <div className="flex items-center">
        <span className="font-semibold">{name}</span>
        <span className="text-xs text-gray-400 ml-2">{time}</span>
        {unread > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {unread}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-500 truncate">{lastMessage}</div>
    </div>
  </div>
);

const ChatroomList = () => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/chat/${id}`);
  };
  return (
    <div className="flex-1 min-h-0 overflow-y-auto pb-[88px] bg-white">
      <h2 className="text-xl font-bold px-4 py-3">채팅</h2>
      <div>
        {chatrooms.map((room) => (
          <ChatroomItem key={room.id} {...room} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default ChatroomList; 