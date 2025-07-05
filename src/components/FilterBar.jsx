import React, { useState, useEffect } from 'react';
import categorySettingsIcon from '../assets/categorySettings.svg';

const FILTERS = [
  { key: 'location', label: '위치' },
  { key: 'latest', label: '최신순' },
  { key: 'instant', label: '즉시 정산 가능' },
  { key: 'category', label: '카테고리' },
];

const FilterBar = ({ onFilter, onLocationButton, selectedFilters = [], onCategoryButton, selectedCategory }) => {
  const [selected, setSelected] = useState(selectedFilters);

  useEffect(() => {
    setSelected(selectedFilters);
  }, [selectedFilters]);

  const handleClick = (key) => {
    let newSelected;
    if (selected.includes(key)) {
      newSelected = selected.filter(f => f !== key);
    } else {
      newSelected = [...selected, key];
    }
    setSelected(newSelected);
    if (key === 'location' && onLocationButton) {
      onLocationButton();
    } else if (key === 'category' && onCategoryButton) {
      onCategoryButton();
    } else {
      onFilter && onFilter(newSelected);
    }
  };

  return (
    <div className="w-full h-12 px-6 bg-white absolute top-[110px] left-0 right-0 z-10">
      <div className="inline-flex flex-row items-center gap-x-2 whitespace-nowrap overflow-x-auto scrollbar-hide relative">
        {/* 카테고리 세팅 버튼 */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F5] border border-black mr-2 flex-shrink-0"
          onClick={() => {}}
        >
          <img src={categorySettingsIcon} alt="카테고리 세팅" className="w-6 h-6" />
        </button>
        {/* 필터 버튼들 */}
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={
              selected.includes(f.key)
                ? 'box-border flex flex-row items-center px-3 py-2 gap-1 min-w-[69px] h-[34px] bg-[rgba(0,102,255,0.15)] border border-[#0066FF] rounded-lg text-[13px] font-medium text-[#0066FF] truncate'
                : 'box-border flex flex-row items-center px-3 py-2 gap-1 min-w-[69px] h-[34px] bg-white border border-[#E6E6E6] rounded-lg text-[13px] font-medium text-[#111] truncate'
            }
            onClick={() => handleClick(f.key)}
          >
            <span className="truncate w-full">
              {f.key === 'category' && selectedCategory ? selectedCategory : f.label}
            </span>
          </button>
        ))}
      </div>
      <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
};

export default FilterBar;