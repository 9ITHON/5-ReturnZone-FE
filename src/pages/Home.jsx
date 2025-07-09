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

const Home = () => {
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [locationOpen, setLocationOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState("전체");
  const [selectedFilters, setSelectedFilters] = React.useState([""]);
  const [mapOpen, setMapOpen] = React.useState(false);
  const navigate = useNavigate();

  // Use the location data hook
  const {
    items,
    loading,
    error,
    userLocation,
    filterItems,
    refreshData,
  } = useLocationData();

  const handleFilter = (filtersArr) => {
    setSelectedFilters(filtersArr);
    let sortBy = "latest";
    if (filtersArr.includes("latest")) sortBy = "latest";
    // 기타 필터(즉시정산 등)는 필요시 추가
    filterItems(selectedCategory, selectedLocation, sortBy);
  };

  const handleCategorySelect = (cat) => {
    if (selectedCategory === cat) {
      setSelectedCategory(null);
      filterItems(null, selectedLocation, selectedFilters[0]);
    } else {
      setSelectedCategory(cat);
      filterItems(cat, selectedLocation, selectedFilters[0]);
    }
    setCategoryOpen(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationOpen(false);
    filterItems(selectedCategory, location, selectedFilters[0]);
    console.log("위치 선택:", location);
  };

  // 위치 버튼 클릭 시 지도 모달 오픈
  const handleLocationButton = () => {
    setMapOpen(true);
  };

  // 지도에서 위치 선택 시
  const handleMapSelect = (pos) => {
    filterItems(selectedCategory, selectedLocation, selectedFilters[0], pos);
  };

  if (loading) {
    return (
      <div className="relative w-[390px] h-[844px] bg-white flex flex-col items-center mx-auto overflow-hidden">
        <MainHeader />
        <FilterBar
          onFilter={handleFilter}
          selectedLocation={selectedLocation}
          onLocationButton={handleLocationButton}
          selectedFilters={selectedFilters}
        />
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
        <FilterBar
          onFilter={handleFilter}
          selectedLocation={selectedLocation}
          onLocationButton={handleLocationButton}
          selectedFilters={selectedFilters}
        />
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
    <div className="relative w-[390px] h-[844px] bg-white flex flex-col items-center mx-auto overflow-hidden">
      <MainHeader />
      {/* 상단 바: 필터바 + 검색 아이콘 */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6]">
        <div className="flex items-center w-full h-12 px-4 gap-1.5">
          <button 
            onClick={() => handleFilter([""])}
            className={`flex items-center h-[34px] gap-0.5 px-2.5 py-1.5 rounded-lg bg-white border ${selectedFilters.length === 1 && selectedFilters[0] === "" ? 'border-blue-500' : 'border-[#e6e6e6]'} flex-shrink-0`}
          >
            <p className={`text-[13px] font-medium ${selectedFilters.length === 1 && selectedFilters[0] === "" ? 'text-blue-500' : 'text-[#111]'}`}>
              전체
            </p>
            <img src={categoryIcon} alt="arrow" className="w-4 h-4" />
          </button>
          
          <button 
            onClick={handleLocationButton}
            className={`flex items-center h-[34px] gap-0.5 px-2.5 py-1.5 rounded-lg bg-white border ${selectedLocation !== "전체" ? 'border-blue-500' : 'border-[#e6e6e6]'} flex-shrink-0`}
          >
            <p className={`text-[13px] font-medium ${selectedLocation !== "전체" ? 'text-blue-500' : 'text-[#111]'}`}>
              위치
            </p>
            <img src={categoryIcon} alt="arrow" className="w-4 h-4" />
          </button>

          <button 
            onClick={() => handleFilter(["latest"])}
            className={`flex items-center h-[34px] gap-0.5 px-2.5 py-1.5 rounded-lg bg-white border ${selectedFilters.includes("latest") ? 'border-blue-500' : 'border-[#e6e6e6]'} flex-shrink-0`}
          >
            <p className={`text-[13px] font-medium ${selectedFilters.includes("latest") ? 'text-blue-500' : 'text-[#111]'}`}>
              최신순
            </p>
            <img src={categoryIcon} alt="arrow" className="w-4 h-4" />
          </button>

          <button 
            onClick={() => handleFilter(["instant"])}
            className={`flex items-center h-[34px] gap-0.5 px-2.5 py-1.5 rounded-lg bg-white border ${selectedFilters.includes("instant") ? 'border-blue-500' : 'border-[#e6e6e6]'} flex-shrink-0`}
          >
            <p className={`text-[13px] font-medium ${selectedFilters.includes("instant") ? 'text-blue-500' : 'text-[#111]'}`}>
              즉시정산
            </p>
          </button>

          <button 
            onClick={() => setCategoryOpen(true)}
            className={`flex items-center h-[34px] gap-0.5 px-2.5 py-1.5 rounded-lg bg-white border ${selectedCategory ? 'border-blue-500' : 'border-[#e6e6e6]'} flex-shrink-0`}
          >
            <p className={`text-[13px] font-medium ${selectedCategory ? 'text-blue-500' : 'text-[#111]'}`}>
              카테고리
            </p>
            <img src={categoryIcon} alt="arrow" className="w-4 h-4" />
          </button>
        </div>
      </div>
      {categoryOpen && (
        <div className="fixed inset-0 z-30 flex items-end justify-center w-full max-w-[390px] mx-auto bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-[390px] bg-white rounded-t-xl z-40">
            <div className="w-full flex flex-col items-center pt-6 pb-4 border-b border-[#F0F0F0]">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-4" />
              <div className="text-[18px] font-semibold text-[#111]">
                카테고리 설정
              </div>
            </div>
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
        <div className="absolute left-0 right-0 bottom-0 h-[490px] bg-white rounded-t-xl flex flex-col items-center pb-[34px] gap-[10px] z-20 shadow-lg">
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
          {items.length > 0 ? (
            items
              .filter(
                (item) =>
                  !selectedFilters.includes("instant") ||
                  item.tag === "즉시 정산 가능"
              ) // 즉시 정산 가능 필터
              .map((item) => (
                <div key={item.id} onClick={() => navigate(`/chat/${item.id}`)} className="cursor-pointer">
                  <ItemCard {...item} />
                </div>
              ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>표시할 항목이 없습니다.</p>
            </div>
          )}
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
