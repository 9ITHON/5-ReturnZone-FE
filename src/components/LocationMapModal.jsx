import React, { useState } from "react";

const LocationMapModal = ({ open, onClose }) => {
  const [search, setSearch] = useState("");

  // Placeholder for future place search logic
  const searchPlace = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    // TODO: Replace with actual place search and map update
    console.log("검색어:", search);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center w-full max-w-[390px] mx-auto">
      {/* Dimmed background */}
      <div
        className="absolute inset-0 bg-[#111]/50"
        onClick={onClose}
      />
      {/* Bottom sheet modal */}
      <div className="relative w-full max-w-[390px] h-[336px] bg-white rounded-t-2xl z-10 flex flex-col">
        {/* Top bar */}
        <div className="flex flex-col items-center pt-2">
          <div className="w-[30px] h-1 rounded-[5px] bg-[#e6e6e6] mb-2" />
          <div className="flex justify-center items-center h-11 w-full">
            <p className="text-lg font-bold text-[#111]">위치 설정</p>
          </div>
        </div>
        {/* Search bar */}
        <form className="flex items-center gap-2 px-6 mb-4" onSubmit={searchPlace}>
          <div className="flex items-center flex-grow h-11 gap-3 px-3 rounded-lg bg-white border border-[#b8b8b8]">
            {/* Search icon - transparent inside */}
            <svg width={24} height={24} fill="none" className="w-6 h-6">
              <circle cx="10" cy="10" r="7" stroke="#111" strokeWidth="1.5" fill="none" />
              <line x1="15.3" y1="15.3" x2="21" y2="21" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              className="flex-grow text-base font-medium text-[#111] placeholder-[#b8b8b8] outline-none bg-transparent"
              placeholder="예) 역삼동"
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          {/* Location icon button */}
          <button type="button" className="w-11 h-11 flex items-center justify-center rounded-full bg-[#f2f2f2]">
          <svg
  width={24}
  height={24}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-6 h-6 relative"
  preserveAspectRatio="none"
>
  <path
    d="M19 12C19 15.866 15.866 19 12 19M19 12C19 8.13401 15.866 5 12 5M19 12H16.2M12 19C8.13401 19 5 15.866 5 12M12 19V16.2M5 12C5 8.13401 8.13401 5 12 5M5 12H7.8M12 5V7.8"
    stroke="#111111"
    stroke-width="1.2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <circle cx={12} cy={12} r={1} fill="#111111" />
</svg>
          </button>
        </form>
        {/* Map area */}
        <div className="flex flex-col items-center w-full h-[200px] px-6">
          
        </div>
      </div>
    </div>
  );
};

export default LocationMapModal; 