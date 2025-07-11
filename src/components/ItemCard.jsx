import React from 'react';
import { formatPrice } from '../utils/formatPrice';

const ItemCard = ({
  title = '소니 WH-1000XM4 헤드셋 찾아가세요',
  location = '월계1동',
  time = '10분 전',
  reward = 10000,
  status = '', // '분실했어요' | '주인찾아요' | ''
  imageUrl = '',
              </div>
            </div>
          )}
          {finalStatus === '분실했어요' && (
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