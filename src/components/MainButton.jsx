import React from 'react';

export default function MainButton({ children, onClick, type = 'button', color = 'primary' }) {
  const base = 'w-[354px] h-[56px] flex items-center justify-center rounded-md font-semibold text-lg transition-colors';
  const colorClass = color === 'primary'
    ? 'bg-[#0066FF] text-white'
    : color === 'kakao'
    ? 'bg-[#FFEB00] text-black border border-[#FFEB00] gap-2'
    : 'border border-black text-black bg-white';
  return (
    <button type={type} onClick={onClick} className={`${base} ${colorClass}`}>
      {children}
    </button>
  );
} 