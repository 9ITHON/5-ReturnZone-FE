import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/apiService";

const ChatroomItem = ({ room, onClick }) => {
  // messages.content 배열에서 마지막 메시지 추출
  const lastMsgArr = room.messages && room.messages.content ? room.messages.content : [];
  const lastMsg = lastMsgArr.length > 0 ? lastMsgArr[lastMsgArr.length - 1] : null;

  // 시간 포맷 (예: '10분 전' 등)
  function getTimeAgo(dateString) {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return date.toLocaleDateString();
  }

  return (
    <div
      className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5"
      style={{ cursor: "pointer" }}
      onClick={() => onClick(room.roomId)}
    >
      <div className="flex-grow-0 flex-shrink-0 w-16 h-16 relative rounded-xl">
        {/* 프로필 이미지 (없으면 svg) */}
        {room.profile1 ? (
          <img
            src={room.profile1}
            className="w-11 h-11 absolute left-0 top-0 rounded-full object-cover"
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
            <g clipPath="url(#clip0_652_9628)">
              <rect width={44} height={44} rx={22} fill="#F2F2F2" />
              <circle cx={22} cy={18} r={9} fill="#B8B8B8" fillOpacity="0.5" />
              <ellipse cx={22} cy="38.5" rx={22} ry="8.5" fill="#B8B8B8" fillOpacity="0.5" />
            </g>
            <defs>
              <clipPath id="clip0_652_9628">
                <rect width={44} height={44} rx={22} fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
        {/* 추가 프로필 이미지 (예: 상대방) */}
        {room.profile2 && (
          <img
            src={room.profile2}
            className="w-11 h-11 absolute left-[19px] top-[19px] rounded-md object-cover border border-white"
            alt="profile2"
          />
        )}
      </div>
      <div className="flex flex-col justify-center items-start flex-grow relative gap-0.5">
        <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2">
          <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-[#111]">
            {room.nickname || '유저'}
          </p>
          <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">
            {lastMsg ? getTimeAgo(lastMsg.createdAt) : ''}
          </p>
        </div>
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[268px] text-base text-left text-[#808080] truncate">
          {lastMsg ? (
            lastMsg.imageUrl && lastMsg.imageUrl !== "string" ? (
              <>
                <span className="text-[#aaa] text-xs">[이미지]</span>
              </>
            ) : (
              lastMsg.content
            )
          ) : (
            <span>메시지가 없습니다</span>
          )}
        </p>
      </div>
    </div>
  );
};

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
        <p className="flex-grow-0 flex-shrink-0 text-[20px] font-semibold text-left text-[#111]">채팅</p>
      </div>
      <div className="flex flex-col justify-start items-center w-[390px] h-[646px]">
        <div className="flex flex-col w-[390px] px-6"> {/* 좌우 24px 여백 */}
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