import React from 'react';

export default function MainButton({ children, onClick, type = 'button', color = 'primary', disabled = false }) {
  const base = 'w-[354px] h-[56px] flex items-center justify-center rounded-md font-semibold text-lg transition-colors';
  
  const getColorClass = () => {
    if (disabled) {
      return 'bg-gray-400 text-gray-200 cursor-not-allowed border-gray-400';
    }
    
    switch (color) {
      case 'primary':
        return 'bg-[#0066FF] text-white hover:bg-blue-700';
      case 'kakao':
        return 'bg-[#FFEB00] text-black border border-[#FFEB00] gap-2 hover:bg-yellow-400';
      case 'secondary':
      default:
        return 'border border-black text-black bg-white hover:bg-gray-50';
    }
  };

  return (
    <button 
      type={type} 
      onClick={disabled ? undefined : onClick} 
      className={`${base} ${getColorClass()}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
} 