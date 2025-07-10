import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/apiService";

const ChatroomItem = ({ room, onClick }) => (
  <div
    className={`flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 ${room.inactive ? "opacity-50" : ""}`}
    style={{ cursor: "pointer" }}
    onClick={() => onClick(room.roomId)}
  >
    <div className="flex-grow-0 flex-shrink-0 w-16 h-16 relative rounded-xl">
      {room.profile1 ? (
        <img
          src={room.profile1}
          className="w-11 h-11 absolute left-[-1px] top-[-1px] rounded-[22px] object-cover"
          alt="profile1"
        />
      ) : (
        <svg
          width={44}
          height={44}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 h-11 absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          <g clipPath="url(#clip0)">
            <rect width={44} height={44} rx={22} fill="#F2F2F2" />
            <circle cx={22} cy={18} r={9} fill="#B8B8B8" fillOpacity="0.5" />
            <ellipse cx={22} cy="38.5" rx={22} ry="8.5" fill="#B8B8B8" fillOpacity="0.5" />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width={44} height={44} rx={22} fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      {room.profile2 && (
        <img
          src={room.profile2}
          className="w-11 h-11 absolute left-[19px] top-[19px] rounded-md object-cover border border-white"
          alt="profile2"
        />
      )}
    </div>
    <div className="flex flex-col justify-center items-start flex-grow relative gap-0.5">
      {room.status && (
        <p className="flex-grow-0 flex-shrink-0 text-[13px] font-medium text-left" style={{ color: room.statusColor }}>
          {room.status}
        </p>
      )}
      <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2">
        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-[#111]">
          {room.nickname}
        </p>
        <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">{room.time}</p>
        {room.unread > 0 && (
          <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-4 relative overflow-hidden gap-2.5 px-1 rounded-[22px] bg-[#f00]">
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-3.5 text-xs text-center text-white">
              {room.unread}
            </p>
          </div>
        )}
      </div>
      <p className="self-stretch flex-grow-0 flex-shrink-0 w-[268px] text-base text-left text-[#808080]">
        {room.message}
      </p>
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
        <div className="flex flex-col justify-start items-start self-stretch flex-grow overflow-hidden gap-2.5 px-6 py-4">
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
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
    </div>
  );
};

export default ChatroomList; 