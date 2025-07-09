import React from 'react';

const ItemCard = ({
  title = '소니 WH-1000XM4 헤드셋 찾아가세요',
  location = '월계1동',
  time = '10분 전',
  reward = '10,000원',
  status = '', // '분실했어요' | '주인찾아요' | ''
  imageUrl = '',
}) => (
  <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-4 w-full max-w-[342px] bg-white rounded-xl shadow-sm p-4 overflow-hidden">
    {/* 이미지/아이콘 영역 */}
    <div className="flex-grow-0 flex-shrink-0 w-[88px] h-[88px] relative">
      {imageUrl ? (
        <img src={imageUrl} alt="분실물" className="object-cover w-full h-full rounded-[12px]" />
      ) : (
        <div className="w-full h-full rounded-[12px] bg-[#F2F2F2]" />
      )}
    </div>
    {/* 텍스트/정보 영역 */}
    <div className="flex flex-col justify-start items-start flex-grow relative gap-2 min-w-0">
      <p className="self-stretch flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#111] truncate">
        {title}
      </p>
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
        {/* 뱃지 */}
        {status === '주인찾아요' && (
          <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 rounded-md bg-[#e6fbee]">
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 gap-1 px-1 py-[3px] rounded">
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1">
                <p className="flex-grow-0 flex-shrink-0 text-[11px] font-semibold text-left text-[#00d455]">
                  주인 찾아요
                </p>
              </div>
            </div>
          </div>
        )}
        {status === '분실했어요' && (
          <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 rounded-md bg-[#f9eae0]">
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 gap-1 px-1 py-[3px] rounded">
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1">
                <p className="flex-grow-0 flex-shrink-0 text-[11px] font-semibold text-left text-[#ff5900]">
                  분실했어요
                </p>
              </div>
            </div>
          </div>
        )}
        {/* 위치 */}
        <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">{location}</p>
        {/* 구분 점 */}
        <svg
          width={4}
          height={4}
          viewBox="0 0 4 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0"
          preserveAspectRatio="none"
        >
          <circle cx={2} cy={2} r={2} fill="#B8B8B8" />
        </svg>
        {/* 시간 */}
        <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">{time}</p>
      </div>
      {/* 현상금 */}
      <div className="flex flex-row items-center gap-1 mt-1">
        <span className="text-[15px] font-medium text-[#111]">현상금</span>
        <b className="text-[15px] font-bold text-[#111]">{reward}원</b>
      </div>
    </div>
  </div>
);

export default ItemCard; 