import React from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar.jsx';
import ItemCard from '../components/ItemCard.jsx';
import BottomNav from '../components/BottomNav.jsx';
// import axios from 'axios'; // 나중에 백엔드 연동 시 사용
import categoryIcon from '../assets/category.svg';

// 나중에 api 연결;

const CATEGORY_LIST = ['전자기기', '지갑', '의류', '가방', '소지품', '서류', '반려동물','기타'];
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
    status: '분실했어요',
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
     const [items] = React.useState(MOCK_ITEMS);

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
        <div className="absolute left-0 right-0 bottom-0 h-[490px] bg-white rounded-t-xl flex flex-col items-center pb-[34px] gap-[10px] z-20 shadow-lg">
          <div className="px-6 py-3 text-[16px] font-semibold text-[#111] border-b border-[#F0F0F0]">
            위치
          </div>
          {LOCATION_LIST.map((location) => (
            <button
              key={location}
              className={`w-[90%] flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-[16px] font-medium transition text-left ${selectedLocation === location ? 'font-bold text-blue-600 bg-blue-50' : 'text-[#111]'}`}
              onClick={() => handleLocationSelect(location)}
            >
              {location}
            </button>
          ))}
        </div>
      )}

      {/* 카테고리 드롭다운 */}
      {categoryOpen && (
        <div className="absolute left-0 right-0 bottom-0 h-[490px] bg-white rounded-t-xl flex flex-col items-center pb-[34px] gap-[10px] z-20 shadow-lg">
          {/* 헤더 */}
          <div className="w-full flex flex-col items-center pt-6 pb-4 border-b border-[#F0F0F0]">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-4" />
            <div className="text-[18px] font-semibold text-[#111]">카테고리 설정</div>
          </div>
          {/* 카테고리 리스트 */}
          <div className="flex-1 w-full flex flex-col items-center overflow-y-auto mt-2">
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat}
                className={`w-[90%] flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-[16px] font-medium transition text-left ${selectedCategory === cat ? 'bg-blue-50 text-blue-600 font-bold' : 'text-[#111] bg-white hover:bg-blue-50'}`}
                onClick={() => handleCategorySelect(cat)}
              >
                <img src={categoryIcon} alt="카테고리" className="w-5 h-5" />
                <span className="flex-1">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center px-0 pt-[158px] pb-[88px] flex-1 w-full overflow-y-scroll">
        <div className="flex flex-col gap-4 w-[342px]">
          {/* map 키 */}
          {filteredItems.map(item => <ItemCard key={item.id} {...item} />)}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default Home;