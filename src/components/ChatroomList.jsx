import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/apiService";

const ChatroomItem = ({ room, onClick }) => (
  <div
    className={`flex items-center gap-2.5 py-2 px-1 w-full ${room.inactive ? "opacity-50" : ""}`}
    style={{ cursor: "pointer" }}
    onClick={() => onClick(room.roomId)}
  >
    {/* 프로필 이미지 2개 겹치기 */}
    <div className="relative w-12 h-12 min-w-12">
      {room.profile1
        ? <img src={room.profile1} className="w-11 h-11 absolute left-0 top-0 rounded-full object-cover" alt="profile1" />
        : <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11 absolute left-0 top-0"><g clipPath="url(#clip0)"><rect width={44} height={44} rx={22} fill="#F2F2F2" /><circle cx={22} cy={18} r={9} fill="#B8B8B8" fillOpacity="0.5" /><ellipse cx={22} cy="38.5" rx={22} ry="8.5" fill="#B8B8B8" fillOpacity="0.5" /></g><defs><clipPath id="clip0"><rect width={44} height={44} rx={22} fill="white" /></clipPath></defs></svg>}
      {room.profile2 && (
        <img src={room.profile2} className="w-11 h-11 absolute left-5 top-5 rounded-md object-cover border border-white" alt="profile2" />
      )}
    </div>
    <div className="flex flex-col flex-1 min-w-0">
      {/* 상태 뱃지 */}
      {room.status && (
        <span className="text-xs font-medium" style={{ color: room.statusColor }}>
          {room.status}
        </span>
      )}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-base text-[#111] truncate">{room.nickname}</span>
        <span className="text-sm text-[#808080]">{room.time}</span>
        {room.unread > 0 && (
          <span className="bg-[#f00] text-white text-xs rounded-full px-2 ml-1">{room.unread}</span>
        )}
      </div>
      <span className="text-[#808080] text-base truncate">{room.message}</span>
    </div>
  </div>
);

const ChatroomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await apiService.getChatRooms();
        setRooms(res.content || []);
      } catch {
        setRooms([]);
      }
      setLoading(false);
    };
    fetchRooms();
  }, []);

  const handleClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center w-[390px] h-14 relative overflow-hidden px-6 bg-white">
        <p className="flex-grow w-[342px] text-xl font-semibold text-left text-[#111]">채팅</p>
      </div>
      <div className="flex flex-col justify-start items-center w-[390px] h-[646px]">
        <div className="flex flex-col w-[390px]">
          {loading ? (
            <div className="text-center text-gray-400">채팅방 불러오는 중...</div>
          ) : rooms.length === 0 ? (
            <div className="text-center text-gray-400">채팅방이 없습니다.</div>
          ) : (
            rooms.map((room) => (
              <ChatroomItem key={room.roomId} room={room} onClick={handleClick} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatroomList; 