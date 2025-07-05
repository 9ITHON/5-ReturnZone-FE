import React from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar.jsx';
import ItemCard from '../components/ItemCard.jsx';
import BottomNav from '../components/BottomNav.jsx';
import axios from 'axios';

// 나중에 api 연결;

const CATEGORY_LIST = ['전자기기', '지갑', '의류', '기타'];

const Home = () => {

  // 백엔드로 데이터 받아오기

  const handleFilter = (type) => {
    if (type === 'category') setCategoryOpen((prev) => !prev);
    console.log('필터 선택:', type);
  };

  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCategoryOpen(false);
    console.log('카테고리 선택:', cat);
  };

  return (
    <div className="relative w-[390px] h-[844px] bg-white flex flex-col items-center mx-auto overflow-hidden">
      <Header />
      <FilterBar onFilter={handleFilter} />
      {/* 카테고리 드롭다운 */}
      {categoryOpen && (
        <div className="absolute top-[158px] left-0 right-0 z-20 bg-white border-b border-[#E6E6E6] flex flex-col items-center shadow">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              className={`w-full px-6 py-3 text-left text-[15px] hover:bg-blue-50 ${selectedCategory === cat ? 'font-bold text-blue-600' : 'text-[#111]'}`}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-col items-center px-0 pt-[158px] pb-[88px] flex-1 w-full overflow-y-scroll">
        <div className="flex flex-col gap-4 w-[342px]">
          {/* map 키 */}
          {items.map(item => <ItemCard key={item.id} {...item} />)}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default Home; 