import React from "react";

const LatestFilterModal = ({ open, selected, onSelect, onClose }) => {
  if (!open) return null;
  const BlackArrowIcon = (
    <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M13 1L7 7L1 1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="flex flex-col justify-start items-center w-[390px] h-[150px] overflow-hidden gap-2.5 pb-[34px] rounded-tl-2xl rounded-tr-2xl bg-white animate-slideup"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5">
          <div className="flex-grow-0 flex-shrink-0 w-[30px] h-1 rounded-[5px] bg-[#e6e6e6]" />
        </div>
        <button
          className={`flex justify-between items-center self-stretch h-11 gap-2 px-6 w-full rounded-lg text-base font-medium transition ${selected === "latest" ? "bg-[#f5faff] text-[#111]" : "bg-white text-[#111]"}`}
          onClick={() => onSelect("latest")}
        >
          <span className="text-base text-left">최신순</span>
          {selected === "latest" && <span className="flex items-center">{BlackArrowIcon}</span>}
        </button>
        <button
          className={`flex justify-between items-center self-stretch h-11 gap-2 px-6 w-full rounded-lg text-base font-medium transition ${selected === "distance" ? "bg-[#f5faff] text-[#111]" : "bg-white text-[#111]"}`}
          onClick={() => onSelect("distance")}
        >
          <span className="text-base text-left">현재 위치와 가까운 순</span>
          {selected === "distance" && <span className="flex items-center">{BlackArrowIcon}</span>}
        </button>
      </div>
    </div>
  );
};

export default LatestFilterModal; 