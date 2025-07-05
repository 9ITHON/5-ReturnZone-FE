import React from 'react';
import logo from '../assets/logo.svg';

const Header = () => (
  <header className="flex flex-col items-center w-full bg-white absolute top-0 left-0 right-0 z-10" style={{height: '158px'}}>
    {/* Main Header */}
    <div className="flex flex-row items-center justify-between w-full px-6 h-[56px]">
      <img src={logo} alt="Return Zone Logo" className="h-[42px] w-[96px] object-contain" />
      <div className="flex flex-row gap-2 items-center">
        <button className="w-9 h-9 flex items-center justify-center bg-[#F2F2F2] rounded-full border border-[#111] border-opacity-10"><span role="img" aria-label="search" className="text-xl">🔍</span></button>
        <button className="w-9 h-9 flex items-center justify-center bg-[#F2F2F2] rounded-full border border-[#111] border-opacity-10"><span role="img" aria-label="notification" className="text-xl">🔔</span></button>
        <button className="w-9 h-9 flex items-center justify-center bg-[#F2F2F2] rounded-full border border-[#111] border-opacity-10"><span role="img" aria-label="menu" className="text-xl">☰</span></button>
      </div>
    </div>
  </header>
);

export default Header; 