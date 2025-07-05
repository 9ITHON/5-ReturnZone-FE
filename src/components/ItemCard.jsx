import React from 'react';
import imagePlaceholder from '../assets/유저아이콘.svg'; // 예시 placeholder, 실제 이미지 경로로 교체 가능

const ItemCard = ({
  title = '소니 WH-1000XM4 헤드셋 찾아가세요',
  tag = '즉시 정산 가능',
  location = '월계1동',
  time = '10분 전',
  reward = '10,000원',
  status = '', // '분실했어요' | '주인 찾아요' | ''
  imageUrl = '',
  distance = null, // Distance in kilometers
}) => (
  <div className="flex flex-row w-full max-w-[342px] h-[122px] bg-white rounded-xl shadow-sm p-0 relative overflow-hidden">
    {/* 이미지 영역 */}
    <div className="relative w-[96px] h-[96px] m-3 flex-shrink-0 flex items-center justify-center bg-[#F2F2F2] rounded-xl">
      {imageUrl ? (
        <img src={imageUrl} alt="분실물" className="object-cover w-full h-full rounded-xl" />
      ) : (
        <img src={imagePlaceholder} alt="placeholder" className="w-10 h-10 opacity-40" />
      )}
      {/* 상태 뱃지 */}
      {status && (
        <div className={`absolute left-2 top-2 px-2 py-0.5 rounded-md text-xs font-semibold ${status === '주인 찾아요' ? 'bg-[#E6FBEE] text-[#00D455]' : 'bg-[#F9EAE0] text-[#FF5900]'}`}>{status}</div>
      )}
    </div>
    {/* 텍스트 영역 */}
    <div className="flex flex-col justify-between py-3 h-full flex-1 min-w-0">
      <div className="text-[16px] font-medium leading-5 text-[#111] break-words max-h-[40px] overflow-hidden line-clamp-2">
        {title}
      </div>
      <div className="flex flex-row items-center gap-1 text-xs h-5 mt-1">
        <span className="flex items-center px-2 py-0.5 bg-blue-50 text-[#0066FF] font-semibold rounded-md text-[11px] h-5">{tag}</span>
        <span className="text-[#808080] text-[13px] ml-1">{location}</span>
        {distance !== null && (
          <>
            <span className="w-1 h-1 bg-[#B8B8B8] rounded-full mx-1 inline-block" />
            <span className="text-[#808080] text-[13px]">{distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`}</span>
          </>
        )}
        <span className="w-1 h-1 bg-[#B8B8B8] rounded-full mx-1 inline-block" />
        <span className="text-[#808080] text-[13px]">{time}</span>
      </div>
      <div className="flex flex-row items-center gap-1 h-6 mt-1">
        <span className="text-[15px] font-medium text-[#111]">현상금</span>
        <b className="text-[15px] font-bold text-[#111]">{reward}</b>
      </div>
    </div>
  </div>
);

export default ItemCard; 