import React from 'react';

const FilterBar = ({ onFilter, selectedLocation = '전체' }) => (
  <div className="flex flex-row items-center gap-2 w-full h-12 px-6 bg-white absolute top-[110px] left-0 right-0 z-10">
    <button
      className="flex items-center gap-1 px-3 py-2 bg-white border border-[#E6E6E6] rounded-lg text-[13px] font-medium text-[#111]"
      onClick={() => onFilter && onFilter('location')}
    >
      {selectedLocation === '전체' ? '위치' : selectedLocation} 
      <span className="rotate-[-90deg] text-[#808080]">▼</span>
    </button>
    <button
      className="flex items-center gap-1 px-3 py-2 bg-white border border-[#E6E6E6] rounded-lg text-[13px] font-medium text-[#111]"
      onClick={() => onFilter && onFilter('latest')}
    >
      최신순
    </button>
    <button
      className="flex items-center gap-1 px-3 py-2 bg-white border border-[#E6E6E6] rounded-lg text-[13px] font-medium text-[#111]"
      onClick={() => onFilter && onFilter('instant')}
    >
      즉시 정산 가능
    </button>
    <button
      className="flex items-center gap-1 px-3 py-2 bg-white border border-[#E6E6E6] rounded-lg text-[13px] font-medium text-[#111]"
      onClick={() => onFilter && onFilter('category')}
    >
      카테고리
    </button>
  </div>
);

export default FilterBar;