import React from 'react';
import homeIcon from '../assets/home.svg';
import plusIcon from '../assets/plus-rectangle.svg';
import chatIcon from '../assets/chat.svg';
import mypageIcon from '../assets/user.svg';

const BottomNav = () => (
  <nav className="absolute left-0 right-0 bottom-0 h-[88px] flex flex-col items-center p-0 bg-white border-t border-[#B8B8B8] border-opacity-50 z-20">
    <div className="flex flex-row w-full h-full items-center justify-between">
      <button className="flex-1 flex flex-col items-center justify-center gap-0.5">
        <img src={homeIcon} alt="홈" className="w-6 h-6" />
        <div className="text-[12px] font-medium text-[#111] leading-[17px]">홈</div>
      </button>
      <button className="flex-1 flex flex-col items-center justify-center gap-0.5">
        <img src={plusIcon} alt="분실물 등록" className="w-6 h-6" />
        <div className="text-[12px] font-medium text-[#111] leading-[17px]">분실물 등록</div>
      </button>
      <button className="flex-1 flex flex-col items-center justify-center gap-0.5 relative">
        <img src={chatIcon} alt="채팅" className="w-6 h-6" />
        <span className="absolute -top-1 right-3 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">9</span>
        <div className="text-[12px] font-medium text-[#111] leading-[17px]">채팅</div>
      </button>
      <button className="flex-1 flex flex-col items-center justify-center gap-0.5">
        <img src={mypageIcon} alt="마이페이지" className="w-6 h-6" />
        <div className="text-[12px] font-medium text-[#111] leading-[17px]">마이페이지</div>
      </button>
    </div>
  </nav>
);

export default BottomNav; 