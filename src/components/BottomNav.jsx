import React from "react";
import homeIcon from "../assets/home.svg";
import chatIcon from "../assets/chat.svg";
import userIcon from "../assets/user.svg";
import plusRectangleIcon from "../assets/plus-rectangle.svg";

const BottomNav = () => (
  <div className="flex flex-col justify-start items-center w-[390px] h-[88px] bg-white border-t-[0.5px] border-r-0 border-b-0 border-l-0 border-[#b8b8b8]">
    <div className="flex justify-center items-center self-stretch flex-grow">
      {/* 홈 */}
      <div className="flex flex-col justify-start items-center self-stretch flex-grow relative gap-0.5 py-1.5 rounded-[56px]">
        <img
          src={homeIcon}
          alt="홈"
          className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
        />
        <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-[#111]">
          홈
        </p>
      </div>
      {/* 분실물 등록 */}
      <div className="flex flex-col justify-start items-center self-stretch flex-grow relative gap-0.5 py-1.5 rounded-[56px]">
        <img src={plusRectangleIcon} alt="분실물 등록" className="w-6 h-6" />
        <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-[#111]">
          분실물 등록
        </p>
      </div>
      {/* 채팅 */}
      <div className="flex flex-col justify-start items-center self-stretch flex-grow relative gap-0.5 py-1.5 rounded-[56px]">
        <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative">
          <img
            src={chatIcon}
            alt="채팅"
            className="absolute left-[1.88px] top-[1.88px] w-[20px] h-[20px]"
          />
          <div className="flex justify-center items-center h-3.5 absolute left-[13px] top-[-3px] gap-2.5 px-[3px] rounded-xl bg-[#f00]">
            <p className="flex-grow-0 flex-shrink-0 text-xs text-center text-white">
              9
            </p>
          </div>
        </div>
        <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-[#111]">
          채팅
        </p>
      </div>
      {/* 마이페이지 */}
      <div className="flex flex-col justify-start items-center self-stretch flex-grow relative gap-0.5 py-1.5 rounded-[56px]">
        <img
          src={userIcon}
          alt="마이페이지"
          className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
        />
        <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-[#111]">
          마이페이지
        </p>
      </div>
    </div>
  </div>
);

export default BottomNav;
