import React from "react";

const AllFilterModal = ({ open, selected, onSelect, onClose }) => {
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
        className="flex flex-col justify-start items-center w-[390px] h-[202px] overflow-hidden gap-2.5 pb-[34px] rounded-tl-2xl rounded-tr-2xl bg-white animate-slideup"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col justify-start items-start self-stretch flex-grow gap-1 w-full">
          {/* 드래그 바 */}
          <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5">
            <div className="flex-grow-0 flex-shrink-0 w-[30px] h-1 rounded-[5px] bg-[#e6e6e6]" />
          </div>
          {/* 전체 */}
          <button
            className={`flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative overflow-hidden gap-2 px-6 w-full rounded-lg text-base font-medium transition
              ${selected === "all"
                ? "bg-[#f5faff] text-[#111]"
                : "bg-white text-[#111]"}
            `}
            onClick={() => onSelect("all")}
          >
            <p className="flex-grow w-[290px] text-base text-left">전체</p>
            {selected === "all" ? (
              <span className="flex-grow-0 flex-shrink-0 w-11 h-11 flex items-center justify-center">{BlackArrowIcon}</span>
            ) : (
              <span className="flex-grow-0 flex-shrink-0 w-11 h-11 relative overflow-hidden" />
            )}
          </button>
          {/* 분실 */}
          <button
            className={`flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative overflow-hidden gap-2 px-6 w-full rounded-lg text-base font-medium transition
              ${selected === "lost"
                ? "bg-[#f5faff] text-[#111]"
                : "bg-white text-[#111]"}
            `}
            onClick={() => onSelect("lost")}
          >
            <p className="flex-grow w-[290px] text-base text-left">분실했어요</p>
            {selected === "lost" ? (
              <span className="flex-grow-0 flex-shrink-0 w-11 h-11 flex items-center justify-center">{BlackArrowIcon}</span>
            ) : (
              <span className="flex-grow-0 flex-shrink-0 w-11 h-11 relative overflow-hidden" />
            )}
          </button>
          {/* 주인 */}
          <button
            className={`flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative overflow-hidden gap-2 px-6 w-full rounded-lg text-base font-medium transition
              ${selected === "found"
                ? "bg-[#f5faff] text-[#111]"
                : "bg-white text-[#111]"}
            `}
            onClick={() => onSelect("found")}
          >
            <p className="flex-grow w-[290px] text-base text-left">주인 찾아요</p>
            {selected === "found" ? (
              <span className="flex-grow-0 flex-shrink-0 w-11 h-11 flex items-center justify-center">{BlackArrowIcon}</span>
            ) : (
              <span className="flex-grow-0 flex-shrink-0 w-11 h-11 relative overflow-hidden" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllFilterModal; 