import React from 'react';

const categories = ['전자기기', '지갑', '의류', '가방', '소지품', '서류', '반려동물','기타'];

const CategoryFilter = ({ onCategorySelect }) => (
  <div className="flex flex-row gap-2 w-full px-6 py-2 overflow-x-auto absolute top-[158px] left-0 right-0 z-10 bg-white">
    {categories.map((cat) => (
      <button key={cat} className="px-4 py-2 bg-[#F2F2F2] rounded-lg text-[14px] font-medium text-[#111] whitespace-nowrap" onClick={() => onCategorySelect?.(cat)}>{cat}</button>
    ))}
  </div>
);

export default CategoryFilter; 