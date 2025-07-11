import React from 'react';

const ChatRoomItemCard = ({ data }) => {
  const title = data?.title || '소니 WH-1000XM4 헤드셋 찾아주세요';
  const location = data?.location || '역삼1동';
  const timeAgo = data?.timeAgo || '10일 전';
  const status = data?.status || '주인 찾는 중';
  const mainImageUrl = data?.mainImageUrl || '';

  return (
    <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3">
      <div className="flex-grow-0 flex-shrink-0 w-[72px] h-[72px] relative">
        {mainImageUrl ? (
          <img src={mainImageUrl} alt="분실물" className="object-cover w-[72px] h-[72px] rounded-xl" />
        ) : (
          <svg
            width={72}
            height={72}
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-[72px] h-[72px] relative"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect width={72} height={72} rx={12} fill="#F2F2F2" />
            <path
              d="M44.8534 38.9493L41.8179 35.9139C41.449 35.5451 40.9488 35.3379 40.4271 35.3379C39.9055 35.3379 39.4052 35.5451 39.0363 35.9139L30.0993 44.8509M29.1157 27.146H42.8861C43.9726 27.146 44.8534 28.0267 44.8534 29.1132V42.8837C44.8534 43.9702 43.9726 44.8509 42.8861 44.8509H29.1157C28.0292 44.8509 27.1484 43.9702 27.1484 42.8837V29.1132C27.1484 28.0267 28.0292 27.146 29.1157 27.146ZM35.0173 33.0476C35.0173 34.1341 34.1365 35.0148 33.0501 35.0148C31.9636 35.0148 31.0829 34.1341 31.0829 33.0476C31.0829 31.9612 31.9636 31.0804 33.0501 31.0804C34.1365 31.0804 35.0173 31.9612 35.0173 33.0476Z"
              stroke="#B8B8B8"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className="flex flex-col justify-start items-start flex-grow relative gap-1">
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[258px] text-base font-medium text-left text-[#111]">
          {title}
        </p>
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
          <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">{location}</p>
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
          <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#808080]">{timeAgo}</p>
        </div>
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1">
          <p className="flex-grow-0 flex-shrink-0 text-[12px] font-medium text-left text-[#06f]">
            {status}
          </p>
          <p className="flex-grow-0 flex-shrink-0 text-[12px] font-medium text-left text-[#111]">
            주인을 찾아 포인트를 받아보세요!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomItemCard; 