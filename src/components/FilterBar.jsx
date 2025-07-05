import React, { useState } from 'react';
import categorySettingsIcon from '../assets/categorySettings.svg';

const FILTERS = [
  { key: 'location', label: '위치' },
  { key: 'latest', label: '가까운순' },
  { key: 'instant', label: '즉시 정산 가능' },
  { key: 'category', label: '카테고리' },
];

const FilterBar = ({ onFilter }) => {
  const [selected, setSelected] = useState('location');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full h-12 px-6 bg-white absolute top-[110px] left-0 right-0 z-10">
      <div className="inline-flex flex-row items-center gap-x-2 whitespace-nowrap overflow-x-auto scrollbar-hide relative">
        {/* 카테고리 세팅 버튼 */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F5] border border-black mr-2 flex-shrink-0"
          onClick={() => setModalOpen(true)}
        >
          <img src={categorySettingsIcon} alt="카테고리 세팅" className="w-6 h-6" />
        </button>
        {/* 필터 버튼들 */}
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={
              selected === f.key
                ? 'box-border flex flex-row items-center px-3 py-2 gap-1 min-w-[69px] h-[34px] bg-[rgba(0,102,255,0.15)] border border-[#0066FF] rounded-lg text-[13px] font-medium text-[#0066FF] truncate'
                : 'box-border flex flex-row items-center px-3 py-2 gap-1 min-w-[69px] h-[34px] bg-white border border-[#E6E6E6] rounded-lg text-[13px] font-medium text-[#111] truncate'
            }
            onClick={() => { setSelected(f.key); onFilter && onFilter(f.key); }}
          >
            <span className="truncate w-full">{f.label}</span>
          </button>
        ))}
      </div>
      {/* 필터 항목만 모달로 표시 */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-[320px] flex flex-col gap-2 shadow-xl items-center">
            <div className="text-lg font-bold mb-2">필터 선택</div>
            {FILTERS.map(f => (
              <button
                key={f.key}
                className="w-full px-4 py-2 text-center hover:bg-blue-50 text-[16px] text-[#111] rounded-lg"
                onClick={() => {
                  setModalOpen(false);
                  setSelected(f.key);
                  onFilter && onFilter(f.key);
                }}
              >
                {f.label}
              </button>
            ))}
            <button className="mt-4 text-blue-500 font-semibold" onClick={() => setModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
      <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
};

export default FilterBar;