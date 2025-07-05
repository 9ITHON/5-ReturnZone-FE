import React from 'react';

const ItemCard = ({
  title = '소니 WH-1000XM4 헤드셋 찾아가세요',
  tag = '즉시 정산 가능',
  location = '월계1동',
  time = '10분 전',
  reward = '10,000원',
  status = '',
}) => (
  <div className="flex flex-row gap-3 w-[342px] h-[122px] bg-white rounded-xl shadow-sm p-0 relative">
    <div className="relative w-[122px] h-[122px]">
      <div className="absolute w-full h-full bg-[#F2F2F2] rounded-xl" />
      {/* 이미지 들어갈 자리 */}
      {status && (
        <div className={`absolute left-2 top-2 px-2 py-0.5 rounded-md text-xs font-semibold ${status === '주인 찾아요' ? 'bg-[#E6FBEE] text-[#00D455]' : 'bg-[#F9EAE0] text-[#FF5900]'}`}>{status}</div>
      )}
    </div>
    <div className="flex flex-col justify-between py-2 h-full w-[208px]">
      <div className="text-[18px] font-medium leading-6 text-[#111] break-words max-h-[48px] overflow-hidden">{title}</div>
      <div className="flex flex-row items-center gap-1 text-xs h-5">
        <span className="flex items-center px-2 py-0.5 bg-blue-50 text-[#0066FF] font-semibold rounded-md text-[11px] h-5">{tag}</span>
        <span className="text-[#808080] text-[14px] ml-1">{location}</span>
        <span className="w-1 h-1 bg-[#B8B8B8] rounded-full mx-1 inline-block" />
        <span className="text-[#808080] text-[14px]">{time}</span>
      </div>
      <div className="flex flex-row items-center gap-1 h-6 mt-1">
        <span className="text-[18px] font-medium text-[#111]">현상금</span>
        <b className="text-[18px] font-bold text-[#111]">{reward}</b>
      </div>
    </div>
  </div>
);

export default ItemCard; 