import React from "react";
import MainHeader from "../components/main-header";
import FilterBar from "../components/FilterBar.jsx";
import ItemCard from "../components/ItemCard.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { useLocationData } from "../hooks/useLocationData";
import LocationMapModal from "../components/LocationMapModal.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import { useNavigate } from "react-router-dom";
import categoryIcon from "../assets/category.svg";
import AllFilterModal from "../components/AllFilterModal.jsx";
import LatestFilterModal from "../components/LatestFilterModal.jsx";

const CATEGORY_LIST = [
  "전자기기",
  "지갑",
  "의류",
  "가방",
  "소지품",
  "서류",
  "반려동물",
  "기타",
];

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'location', label: '위치' },
  { key: 'latest', label: '최신순' },
  { key: 'category', label: '카테고리' },
];

const Home = () => {
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [locationOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedFilters, setSelectedFilters] = React.useState([]); // 초기값 []
  const [mapOpen, setMapOpen] = React.useState(false);
  const navigate = useNavigate();
  const [allFilterOpen, setAllFilterOpen] = React.useState(false);
  const [allFilterValue, setAllFilterValue] = React.useState("all");
  const [latestFilterOpen, setLatestFilterOpen] = React.useState(false);
  const [latestFilterValue, setLatestFilterValue] = React.useState("latest");

  // Use the location data hook
  const {
    items,
    loading,
    error,
    userLocation,
    filterItems,
    fetchItems,
    refreshData,
  } = useLocationData();

  // selectedFilters, selectedCategory, selectedLocation이 바뀔 때마다 필터 적용
  React.useEffect(() => {
    if (userLocation) {
      let sortBy = selectedFilters.includes('latest') ? 'latest' : undefined;
      filterItems(
        selectedCategory,
        selectedLocation,
        sortBy
      );
    }
  }, [userLocation, selectedFilters, selectedCategory, selectedLocation, filterItems]);

  // 필터 버튼 클릭 핸들러 (중복 적용)
  const handleFilterClick = (key) => {
    if (key === "all") {
      setAllFilterOpen(true);
      return;
    }
    if (key === 'category') {
      setCategoryOpen(true);
      return;
    }
    if (key === 'location') {
      setMapOpen(true);
      return;
    }
    if (key === 'latest') {
      setLatestFilterOpen(true);
      return;
    }
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const handleAllFilterSelect = (value) => {
    setAllFilterValue(value);
    setAllFilterOpen(false);
    // value에 따라 필터 적용
    if (value === "all") {
      setSelectedCategory(null);
      setSelectedLocation("");
      setSelectedFilters([]);
      fetchItems();
    } else if (value === "lost") {
      setSelectedCategory(null);
      setSelectedLocation("");
      setSelectedFilters([]);
      filterItems("분실", "", undefined);
    } else if (value === "found") {
      setSelectedCategory(null);
      setSelectedLocation("");
      setSelectedFilters([]);
      filterItems("주인", "", undefined);
    }
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(selectedCategory === cat ? null : cat);
    setCategoryOpen(false);
  };

  // 지도에서 위치 선택 시
  const handleMapSelect = (pos) => {
    filterItems(selectedCategory, selectedLocation, selectedFilters[0], pos);
  };

  // 최신순 필터 선택 핸들러
  const handleLatestFilterSelect = (value) => {
    setLatestFilterValue(value);
    setLatestFilterOpen(false);
    // 최신순/거리순 필터 적용
    setSelectedFilters((prev) => {
      let arr = prev.filter(f => f !== 'latest' && f !== 'distance');
      return value === 'latest' ? [...arr, 'latest'] : [...arr, 'distance'];
    });
  };

  if (loading) {
    return (
      <div className="relative w-[390px] h-[844px] bg-white flex flex-col items-center mx-auto overflow-hidden">
        <MainHeader />
        <div className="flex flex-col items-center px-0 pt-[158px] pb-[88px] flex-1 w-full overflow-y-scroll">
          <div className="flex flex-col gap-4 w-[342px] items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-2">데이터를 불러오는 중...</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="relative w-[390px] h-[844px] bg-white flex flex-col items-center mx-auto overflow-hidden">
        <MainHeader />
        <div className="flex flex-col items-center px-0 pt-[158px] pb-[88px] flex-1 w-full overflow-y-scroll">
          <div className="flex flex-col gap-4 w-[342px] items-center justify-center">
            <p className="text-red-600 text-center">{error}</p>
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              다시 시도
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="relative w-[390px] h-screen bg-white flex flex-col items-center mx-auto overflow-hidden">
      <MainHeader />
      {/* 상단 바: 필터바 + 검색 아이콘 */}
      {!categoryOpen && !locationOpen && !allFilterOpen && !latestFilterOpen && (
        <div className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6]">
          <div className="flex items-center w-full h-12 px-4 gap-1.5">
            {/* 필터 라벨 버튼 */}
            <button
              type="button"
              disabled
              className="flex justify-start items-center relative overflow-hidden gap-1 px-3 py-2 rounded-lg border flex-shrink-0 text-[13px] font-medium bg-[#06f] border-[#06f] text-white cursor-default"
              tabIndex={-1}
              style={{ pointerEvents: 'none' }}
            >
              <span>필터</span>
            </button>
            {/* 필터 버튼들 */}
            {FILTERS.map((f) => {
              let label = f.label;
              if (f.key === 'all') {
                if (allFilterValue === 'lost') label = '분실';
                else if (allFilterValue === 'found') label = '주인';
                else label = '전체';
              }
              if (f.key === 'latest') {
                label = latestFilterValue === 'distance' ? '현재 위치와 가까운 순' : '최신순';
              }
              const isCategorySelected = f.key === 'category' && selectedCategory;
              const isAllSelected = f.key === 'all' && allFilterValue !== 'all';
              const isLatestSelected = f.key === 'latest' && (latestFilterValue === 'distance' || latestFilterValue === 'latest');
              const isSelected = isAllSelected || selectedFilters.includes(f.key) || isCategorySelected || isLatestSelected;
              return (
                <button
                  key={f.key}
                  onClick={() => handleFilterClick(f.key)}
                  className={`flex justify-start items-center relative overflow-hidden gap-1 px-3 py-2 rounded-lg border flex-shrink-0 text-[13px] font-medium ${isSelected ? 'bg-[#06f]/[0.15] border-[#06f] text-[#06f]' : 'bg-white border-[#e6e6e6] text-[#111]'}`}
                >
                  <span>{f.key === 'category' && selectedCategory ? selectedCategory : label}</span>
                  <img src={categoryIcon} alt="arrow" className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>
      )}
      {categoryOpen && (
        <div className="fixed inset-0 z-30 flex items-end justify-center w-full max-w-[390px] mx-auto overflow-hidden gap-2.5 bg-[#111]/50">
          <div className="w-full max-w-[390px] bg-white rounded-t-xl z-40">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategorySelect={(cat) => {
                handleCategorySelect(cat);
                setCategoryOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* 전체 필터 바텀시트 */}
      <AllFilterModal
        open={allFilterOpen}
        selected={allFilterValue}
        onSelect={handleAllFilterSelect}
        onClose={() => setAllFilterOpen(false)}
      />

      {/* 최신순 필터 모달 */}
      <LatestFilterModal
        open={latestFilterOpen}
        selected={latestFilterValue}
        onSelect={handleLatestFilterSelect}
        onClose={() => setLatestFilterOpen(false)}
      />

      <div className="flex flex-col items-center px-0 pt-[48px] pb-[88px] flex-1 w-full overflow-y-scroll">
        <div className="flex flex-col gap-4 w-[342px]">
          {/* Show location permission status */}
          {/* Show distance info if sorting by distance */}

          {/* Items list */}
          {(() => {
            let filteredItems = items;
            if (allFilterValue === "lost") {
              filteredItems = items.filter(
                (item) => item.type === "분실" || item.registrationType === "LOST" || item.status === "분실했어요"
              );
            } else if (allFilterValue === "found") {
              filteredItems = items.filter(
                (item) => item.type === "주인" || item.registrationType === "FOUND" || item.status === "주인 찾아요"
              );
            }
            return filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                let status = "";
                if (item.type === "분실" || item.registrationType === "LOST") status = "분실했어요";
                else if (item.type === "주인" || item.registrationType === "FOUND") status = "주인찾아요";
                return (
                  <div onClick={() => navigate(`/chat/${item.id}`)} className="cursor-pointer" key={item.id}>
                    <ItemCard
                      {...item}
                      status={status}
                    />
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>표시할 항목이 없습니다.</p>
              </div>
            );
          })()}
        </div>
      </div>
      <LocationMapModal
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        onSelect={handleMapSelect}
      />
      <BottomNav />
    </div>
    
  );
};

export default Home;
