import React from 'react';
import { formatPrice } from '../utils/formatPrice';

const ItemCard = ({
  title = '소니 WH-1000XM4 헤드셋 찾아가세요',
  location = '월계1동',
  time = '10분 전',
  reward = 10000,
  status = '', // '분실했어요' | '주인찾아요' | ''
  imageUrl = '',
  data, // search-page에서 전달되는 data prop
}) => {
  // data prop이 있으면 data의 값들을 사용
  const finalTitle = data?.title || title;
  const finalLocation = data?.location || data?.lostLocationDong || location;
  const finalTime = data?.timeAgo || time;
  const finalReward = data?.reward || reward;
  const finalStatus = data?.registrationType === 'LOST' ? '분실했어요' :
    data?.registrationType === 'FOUND' ? '주인찾아요' : status;
  const finalImageUrl =
    data?.mainImageUrl || data?.imageUrls?.[0] || imageUrl || mainImageUrl;

  return (
    <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3 mb-4">
      <div className="flex-grow-0 flex-shrink-0 w-[122px] h-[122px] relative">
        {finalImageUrl ? (
          <img
            src={finalImageUrl}
            alt="분실물"
            className="object-cover w-[122px] h-[122px] absolute left-[-1px] top-[-1px] rounded-xl"
          />
        ) : (
          <div className="w-[122px] h-[122px] rounded-xl bg-[#F2F2F2]" />
        )}
      </div>
      <div className="flex flex-col justify-start items-start flex-grow relative gap-1">
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-52 text-lg font-medium text-left text-[#111]">
          {finalTitle}
        </p>
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
          {/* 상태 뱃지 */}
          {finalStatus === '주인찾아요' && (
            <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 rounded-md bg-[#E7F4EC] h-[20px] w-[57px]">
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 gap-1 px-[4px] py-[3px] rounded">
                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1">
                  <p className="flex-grow-0 flex-shrink-0 text-[11px] font-semibold text-left text-[#00C34E]">
                    주인 찾아요
                  </p>
                </div>
              </div>
            </div>
          )}
          {finalStatus === '분실했어요' && (
            <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 rounded-md bg-[#F6EEE9]h-[20px]w-[57px]">
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 gap-1 px-[4px] py-[3px] rounded">
                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1">
                  <p className="flex-grow-0 flex-shrink-0 text-[11px] font-semibold text-left text-[#FF5900]">
                    분실했어요
                  </p>
                </div>
              </div>
            </div>
          )}
          <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">{finalLocation}</p>
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
          <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">{finalTime}</p>
        </div>
        {/* 현상금 */}
        <div className="flex flex-row items-center gap-1 mt-1">
          <span className="text-[15px] font-medium text-[#111]">현상금</span>
          <b className="text-[15px] font-bold text-[#111]">{formatPrice(finalReward)}</b>
        </div>
      </div>
    </div>
  );
};

export default ItemCard; 