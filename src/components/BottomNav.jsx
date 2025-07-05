import React from 'react';
import homeIcon from '../assets/home.svg';
import plusIcon from '../assets/plus-rectangle.svg';
import chatIcon from '../assets/chat.svg';
import mypageIcon from '../assets/유저아이콘.svg';

const BottomNav = () => (
  <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] h-[88px] bg-white border-t border-[#B8B8B8] border-opacity-50 flex flex-row items-center justify-between px-0 z-20">
    <button className="flex flex-col items-center justify-center flex-1 py-1 gap-0.5">
      <img src={homeIcon} alt="홈" className="w-6 h-6" />
      <div className="text-xs font-medium text-[#111]">홈</div>
    </button>
    <button className="flex flex-col items-center justify-center flex-1 py-1 gap-0.5">
      <img src={plusIcon} alt="분실물 등록" className="w-6 h-6" />
      <div className="text-xs font-medium text-[#111]">분실물 등록</div>
    </button>
    <button className="flex flex-col items-center justify-center flex-1 py-1 gap-0.5">
      <img src={chatIcon} alt="채팅" className="w-6 h-6" />
      <div className="text-xs font-medium text-[#111]">채팅</div>
    </button>
    <button className="flex flex-col items-center justify-center flex-1 py-1 gap-0.5">
      <img src={mypageIcon} alt="마이페이지" className="w-6 h-6" />
      <div className="text-xs font-medium text-[#111]">마이페이지</div>
    </button>
  </nav>
);

export default BottomNav; 