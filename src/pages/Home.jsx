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
  const [locationOpen, setLocationOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedFilters, setSelectedFilters] = React.useState([]); // 초기값 []
  const [mapOpen, setMapOpen] = React.useState(false);
  const navigate = useNavigate();
  const [allFilterOpen, setAllFilterOpen] = React.useState(false);
  const [allFilterValue, setAllFilterValue] = React.useState("all");

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

  // 전체 버튼 클릭
  const handleAllClick = () => {
    console.log("전체 버튼 클릭");
    setSelectedFilters(FILTERS);
    setSelectedCategory(null);
    setSelectedLocation('전체');
    fetchItems();
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(selectedCategory === cat ? null : cat);
    setCategoryOpen(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationOpen(false);
    filterItems(selectedCategory, location, selectedFilters[0]);
    console.log("위치 선택:", location);
  };

  // 지도에서 위치 선택 시
  const handleMapSelect = (pos) => {
    filterItems(selectedCategory, selectedLocation, selectedFilters[0], pos);
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
      {!categoryOpen && !locationOpen && !allFilterOpen && (
        <div className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6]">
          <div className="flex items-center w-full h-12 px-4 gap-1.5">
            {/* 필터 버튼들 */}
            {FILTERS.map((f) => {
              let label = f.label;
              if (f.key === 'all') {
                if (allFilterValue === 'lost') label = '분실';
                else if (allFilterValue === 'found') label = '주인';
                else label = '전체';
              }
              const isCategorySelected = f.key === 'category' && selectedCategory;
              const isAllSelected = f.key === 'all' && allFilterValue !== 'all';
              const isSelected = isAllSelected || selectedFilters.includes(f.key) || isCategorySelected;
              return (
                <button
                  key={f.key}
                  onClick={() => handleFilterClick(f.key)}
                  className={`flex justify-start items-center relative overflow-hidden gap-1 px-3 py-2 rounded-lg border flex-shrink-0 text-[13px] font-medium ${isSelected ? 'bg-[#06f]/[0.15] border-[#06f] text-[#06f]' : 'bg-white border-[#e6e6e6] text-[#111]'}`}
                >
                  <span>{f.key === 'category' && selectedCategory ? selectedCategory : label}</span>
                  {f.key === 'category' && <img src={categoryIcon} alt="arrow" className="w-4 h-4" />}
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

      {/* 위치 드롭다운 */}
      {locationOpen && (
        <div className="fixed inset-0 z-30 flex items-end justify-center w-full max-w-[390px] mx-auto overflow-hidden gap-2.5 bg-[#111]/50">
          <div className="px-6 py-3 text-[16px] font-semibold text-[#111] border-b border-[#F0F0F0]">
            위치
          </div>
          {LOCATION_LIST.map((location) => (
            <button
              key={location}
              className={`w-[90%] flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-[16px] font-medium transition text-left ${
                selectedLocation === location
                  ? "font-bold text-blue-600 bg-blue-50"
                  : "text-[#111]"
              }`}
              onClick={() => handleLocationSelect(location)}
            >
              {location}
            </button>
          ))}
        </div>
      )}

      {/* 전체 필터 바텀시트 */}
      <AllFilterModal
        open={allFilterOpen}
        selected={allFilterValue}
        onSelect={handleAllFilterSelect}
        onClose={() => setAllFilterOpen(false)}
      />

      <div className="flex flex-col items-center px-0 pt-[48px] pb-[88px] flex-1 w-full overflow-y-scroll">
        <div className="flex flex-col gap-4 w-[342px]">
          {/* Show location permission status */}
          {/* Show distance info if sorting by distance */}
          {selectedFilters.includes("distance") && userLocation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-blue-800 text-sm">
                현재 위치 기준으로 가까운 순으로 정렬됩니다.
              </p>
            </div>
          )}

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
    </div>
  );
};

export default Home;
