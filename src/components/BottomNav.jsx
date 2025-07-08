import React from 'react';
import homeIcon from '../assets/home.svg';
import plusIcon from '../assets/plus-rectangle.svg';
import chatIcon from '../assets/chat.svg';
import mypageIcon from '../assets/user.svg';
import { useNavigate } from 'react-router-dom'



const BottomNav = () => {
  const navigate = useNavigate();
  // 홈으로 이동
  const handleHomeClick = () => {
    navigate('/');
  }
  // 등록페이지로 이동
  const handleRegisterClick = () => {
    navigate('/Register');
  }
  // 채팅페이지로 이동
  const handleChatClick = () => {
    navigate('/ChatList');
  }
  // 마이페이지로 이동
  const handleMyPageClick = () => {
    navigate('/Mypage');
  }
  return (
    <nav className="fixed left-0 right-0 bottom-0 w-full max-w-[390px] mx-auto h-[88px] bg-white border-t border-t-[#B8B8B8] border-opacity-50 z-50 flex items-center justify-center">
      <div className="mx-auto max-w-[390px] w-full h-[88px] flex flex-row justify-center items-center p-0">
        <button onClick={handleHomeClick} className="flex-1 flex flex-col items-center justify-center gap-0.5">
          <img src={homeIcon} alt="홈" className="w-6 h-6" />
          <div className="w-[55px] h-[17px] text-[12px] font-normal text-[#111] leading-[17px]">홈</div>
        </button>
        <button onClick={handleRegisterClick} className="flex-1 flex flex-col items-center justify-center gap-0.5">
          <img src={plusIcon} alt="분실물 등록" className="w-6 h-6" />
          <div className="w-[55px] h-[17px] text-[12px] font-normal text-[#111] leading-[17px]">분실물 등록</div>
        </button>
        <button onClick={handleChatClick} className="flex-1 flex flex-col items-center justify-center gap-0.5 relative">
          <img src={chatIcon} alt="채팅" className="w-6 h-6" />
          <span className="absolute -top-1 right-3 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">9</span>
          <div className="w-[55px] h-[17px] text-[12px] font-normal text-[#111] leading-[17px]">채팅</div>
        </button>
        <button onClick={handleMyPageClick} className="flex-1 flex flex-col items-center justify-center gap-0.5">
          <img src={mypageIcon} alt="마이페이지" className="w-6 h-6" />
          <div className="w-[55px] h-[17px] text-[12px] font-normal text-[#111] leading-[17px]">마이페이지</div>
        </button>
      </div>
    </nav>
  )

};

export default BottomNav; 