import React from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar.jsx';
import ItemCard from '../components/ItemCard.jsx';
import BottomNav from '../components/BottomNav.jsx';
import axios from 'axios';

// 나중에 api 연결;

const CATEGORY_LIST = ['전자기기', '지갑', '의류', '기타'];
const LOCATION_LIST = ['전체', '월계1동', '월계2동', '월계3동', '상계1동', '상계2동', '상계3동', '상계4동', '상계5동', '상계6동', '상계7동', '상계8동', '상계9동', '상계10동'];

// 임시 데이터
const MOCK_ITEMS = [
  {
    id: 1,
    title: '소니 WH-1000XM4 헤드셋 찾아가세요',
    tag: '즉시 정산 가능',
    location: '월계1동',
    time: '10분 전',
    reward: '10,000원',
    status: '주인 찾아요',
    category: '전자기기'
  },
  {
    id: 2,
    title: '에어팟 프로 2세대에어팟 프로 2세대에어팟 프로 2세대에어팟...',
    tag: '즉시 정산 가능',
    location: '월계1동',
    time: '10분 전',
    reward: '10,000원',
    status: '본 실물이요',
    category: '전자기기'
  },
  {
    id: 3,
    title: '소니 WH-1000XM4 헤드셋 찾아가세요',
    tag: '즉시 정산 가능',
    location: '월계1동',
    time: '10분 전',
    reward: '10,000원',
    status: '주인 찾아요',
    category: '전자기기'
  },
  {
    id: 4,
    title: '소니 WH-1000XM4 헤드셋 찾아가세요',
    tag: '즉시 정산 가능',
    location: '월계1동',
    time: '10분 전',
    reward: '10,000원',
    status: '',
    category: '전자기기'
  }
];

const Home = () => {
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [locationOpen, setLocationOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState('전체');
  const [items, setItems] = React.useState(MOCK_ITEMS);

  // 백엔드로 데이터 받아오기

  const handleFilter = (type) => {
    if (type === 'category') {
      setCategoryOpen((prev) => !prev);
      setLocationOpen(false);
    } else if (type === 'location') {
      setLocationOpen((prev) => !prev);
      setCategoryOpen(false);
    } else {
      setCategoryOpen(false);
      setLocationOpen(false);
    }
    console.log('필터 선택:', type);
  };

  // const [categoryOpen, setCategoryOpen] = React.useState(false);
  // const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCategoryOpen(false);
    console.log('카테고리 선택:', cat);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationOpen(false);
    console.log('위치 선택:', location);
  };

  // 필터링된 아이템들
  const filteredItems = items.filter(item => {
    let matchesCategory = true;
    let matchesLocation = true;

    if (selectedCategory && selectedCategory !== '전체') {
      matchesCategory = item.category === selectedCategory;
    }

    if (selectedLocation && selectedLocation !== '전체') {
      matchesLocation = item.location === selectedLocation;
    }

    return matchesCategory && matchesLocation;
  });

  return (
    <div className="relative w-[390px] h-[844px] bg-white flex flex-col items-center mx-auto overflow-hidden">
      <Header />
      <FilterBar onFilter={handleFilter} selectedLocation={selectedLocation} />
      
      {/* 위치 드롭다운 */}
      {locationOpen && (
        <div className="absolute bottom-[158px] left-0 right-0 z-20 bg-white border-b border-[#E6E6E6] flex flex-col shadow-lg max-h-[300px] overflow-y-auto">
          <div className="px-6 py-3 text-[16px] font-semibold text-[#111] border-b border-[#F0F0F0]">
            위치
          </div>
          {LOCATION_LIST.map((location) => (
            <button
              key={location}
              className={`w-full px-6 py-3 text-left text-[15px] hover:bg-blue-50 ${selectedLocation === location ? 'font-bold text-blue-600 bg-blue-50' : 'text-[#111]'}`}
              onClick={() => handleLocationSelect(location)}
            >
              {location}
            </button>
          ))}
        </div>
      )}

      {/* 카테고리 드롭다운 */}
      {categoryOpen && (
        <div className="absolute bottom-[158px] left-0 right-0 z-20 bg-white border-b border-[#E6E6E6] flex flex-col shadow-lg">
          <div className="px-6 py-3 text-[16px] font-semibold text-[#111] border-b border-[#F0F0F0]">
            카테고리의 상세
          </div>
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              className={`w-full px-6 py-3 text-left text-[15px] hover:bg-blue-50 ${selectedCategory === cat ? 'font-bold text-blue-600 bg-blue-50' : 'text-[#111]'}`}
              onClick={() => handleCategorySelect(cat)}
            >
              <span className="mr-2">▼</span>
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