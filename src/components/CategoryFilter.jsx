import React from 'react';
import categoryIcon from '../assets/category.svg';

const categories = ['전자기기', '지갑', '의류', '가방', '소지품', '서류', '반려동물','기타'];

const CategoryFilter = ({ onCategorySelect, selectedCategory }) => (
  <div className="w-full flex flex-col items-center">
    {categories.map((cat) => (
      <button
        key={cat}
        className={
          "w-full flex flex-row items-center justify-between px-6 py-4 border-b border-[#F0F0F0] text-[16px] font-medium transition text-left " +
          (selectedCategory === cat
            ? "text-blue-600 font-bold bg-blue-50"
            : "text-[#111] bg-white hover:bg-blue-50")
        }
        onClick={() => onCategorySelect?.(cat)}
      >
        <span>{cat}</span>
        {selectedCategory === cat && (
          <img src={categoryIcon} alt="선택됨" className="ml-2 w-6 h-6" />
        )}
      </button>
    ))}
  </div>
);

export default CategoryFilter; 