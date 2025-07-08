import React from 'react';
import logo from '../assets/logo.svg';
import searchIcon from '../assets/Search.svg';

const Header = () => {
  return (
    <header className=" w-[390px] bg-white flex flex-col items-center select-none">
      {/* Status Bar (고정) */}
      <div className="w-full h-[54px] flex items-center justify-between px-4 bg-white select-none">
        <div className="flex gap-2" />
      </div>
      {/* Main Header */}
      <div className="relative w-[390px] h-[56px] flex items-center bg-white px-6">
        <img src={logo} alt="Return Zone Logo" className="h-[42px] w-[96px] object-contain" />
        <img
          src={searchIcon}
          alt="검색"
          className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header; 
