import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiService } from "../services/apiService";
import homeIcon from "../assets/home.svg";
import chatIcon from "../assets/chat.svg";
import userIcon from "../assets/user.svg";
import plusRectangleIcon from "../assets/plus.svg";

const BottomNav = () => {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await apiService.getUnreadCount();
        setUnreadCount(response.data?.unreadCount || response.unreadCount || 0);
      } catch (err) {
        console.error('읽지 않은 메시지 수를 가져오는데 실패했습니다:', err);
        setUnreadCount(0);
      }
    };

    fetchUnreadCount();
    
    // 주기적으로 업데이트 (30초마다)
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-start items-center w-[390px] h-[88px] bg-white border-t-[0.5px] border-r-0 border-b-0 border-l-0 border-[#b8b8b8]">
      <div className="flex justify-center items-center self-stretch flex-grow">
        {/* 홈 */}
        <Link
          to="/"
          className="flex flex-col justify-start items-center self-stretch flex-grow relative gap-0.5 py-1.5 rounded-[56px]"
        >
          <img src={homeIcon} alt="홈" className="w-6 h-6" />
          <p
            className={`text-xs font-medium ${
              location.pathname === "/" ? "text-[#2D68FF]" : "text-[#111]"
            }`}
          >
            홈
          </p>
        </Link>
        {/* 분실물 등록 */}
        <Link
          to="/register"
          className="flex flex-col justify-start items-center self-stretch flex-grow relative gap-0.5 py-1.5 rounded-[56px]"
        >
          <img src={plusRectangleIcon} alt="분실물 등록" className="w-6 h-6" />
          <p
            className={`text-xs font-medium ${
              location.pathname === "/Register"
                ? "text-[#2D68FF]"
                : "text-[#111]"
            }`}
          >
            분실물 등록
          </p>
        </Link>
        {/* 채팅 */}
        <Link
          to="/chat"
          className="flex flex-col justify-start items-center self-stretch flex-grow relative gap-0.5 py-1.5 rounded-[56px]"
        >
          <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative">
            <img
              src={chatIcon}
              alt="채팅"
              className="absolute left-[1.88px] top-[1.88px] w-[20px] h-[20px]"
            />
            {unreadCount > 0 && (
              <div className="flex justify-center items-center h-3.5 absolute left-[13px] top-[-3px] gap-2.5 px-[3px] rounded-xl bg-[#f00]">
                <p className="flex-grow-0 flex-shrink-0 text-xs text-center text-white">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </p>
              </div>
            )}
          </div>
          <p
            className={`text-xs font-medium ${
              location.pathname.startsWith("/chat")
                ? "text-[#2D68FF]"
                : "text-[#111]"
            }`}
          >
            채팅
          </p>
        </Link>
        {/* 마이페이지 */}
        <Link
          to="/mypage"
          className="flex flex-col justify-start items-center self-stretch flex-grow relative gap-0.5 py-1.5 rounded-[56px]"
        >
          <img src={userIcon} alt="마이페이지" className="w-6 h-6" />
          <p
            className={`text-xs font-medium ${
              location.pathname === "/mypage" ? "text-[#2D68FF]" : "text-[#111]"
            }`}
          >
            마이페이지
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
