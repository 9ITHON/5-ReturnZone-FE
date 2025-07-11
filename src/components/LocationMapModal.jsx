import React, { useState, useRef, useEffect } from "react";

const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY || '';

const LocationMapModal = ({ open, onClose, onSelect }) => {
  const [search, setSearch] = useState("");
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapObjRef = useRef(null);
  const geocoderRef = useRef(null);

  // 카카오맵 스크립트 로드 및 지도 초기화
  useEffect(() => {
    if (!open) return;
    function initMap() {
      if (!mapRef.current) return;
      const center = new window.kakao.maps.LatLng(37.5665, 126.9780); // 서울 중심
      const map = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 5,
      });
      mapObjRef.current = map;
      geocoderRef.current = new window.kakao.maps.services.Geocoder();
      // 클릭 시 마커 표시 및 onSelect 호출
      window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        const latlng = mouseEvent.latLng;
        if (markerRef.current) markerRef.current.setMap(null);
        const marker = new window.kakao.maps.Marker({
          position: latlng,
          map,
        });
        markerRef.current = marker;
        if (onSelect) {
          onSelect({ lat: latlng.getLat(), lng: latlng.getLng() });
        }
        onClose && onClose();
      });
    }
    if (!window.kakao) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(initMap);
      };
      document.head.appendChild(script);
    } else {
      window.kakao.maps.load(initMap);
    }
    // eslint-disable-next-line
  }, [open]);

  // 장소 검색 시 지도 중심 이동
  const searchPlace = (e) => {
    e.preventDefault();
    if (!search.trim() || !geocoderRef.current || !mapObjRef.current) return;
    geocoderRef.current.addressSearch(search, function(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        mapObjRef.current.setCenter(coords);
        // 마커 이동
        if (markerRef.current) markerRef.current.setMap(null);
        const marker = new window.kakao.maps.Marker({
          position: coords,
          map: mapObjRef.current,
        });
        markerRef.current = marker;
      } else {
        alert('장소를 찾을 수 없습니다.');
      }
    });
  };

  // 내 위치 버튼 클릭 시 지도 중심 이동
  const moveToMyLocation = () => {
    if (!navigator.geolocation) {
      alert('브라우저에서 위치 정보를 지원하지 않습니다.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        if (!mapObjRef.current) return;
        const coords = new window.kakao.maps.LatLng(lat, lng);
        mapObjRef.current.setCenter(coords);
        // 마커 이동
        if (markerRef.current) markerRef.current.setMap(null);
        const marker = new window.kakao.maps.Marker({
          position: coords,
          map: mapObjRef.current,
        });
        markerRef.current = marker;
      },
      () => {
        alert('위치 정보를 가져올 수 없습니다.');
      }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center w-full max-w-[390px] mx-auto">
      {/* Dimmed background */}
      <div
        className="absolute inset-0 bg-[#111]/50"
        onClick={onClose}
      />
      {/* Bottom sheet modal */}
      <div className="relative w-full max-w-[390px] h-[336px] bg-white rounded-t-2xl z-10 flex flex-col">
        {/* Top bar */}
        <div className="flex flex-col items-center pt-2">
          <div className="w-[30px] h-1 rounded-[5px] bg-[#e6e6e6] mb-2" />
          <div className="flex justify-center items-center h-11 w-full">
            <p className="text-lg font-bold text-[#111]">위치 설정</p>
          </div>
        </div>
        {/* Search bar */}
        <form className="flex items-center gap-2 px-6 mb-4" onSubmit={searchPlace}>
          <div className="flex items-center flex-grow h-11 gap-3 px-3 rounded-lg bg-white border border-[#b8b8b8]">
            {/* Search icon - transparent inside */}
            <svg width={24} height={24} fill="none" className="w-6 h-6">
              <circle cx="10" cy="10" r="7" stroke="#111" strokeWidth="1.5" fill="none" />
              <line x1="15.3" y1="15.3" x2="21" y2="21" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              className="flex-grow text-base font-medium text-[#111] placeholder-[#b8b8b8] outline-none bg-transparent"
              placeholder="예) 역삼동"
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          {/* Location icon button */}
          <button type="button" className="w-11 h-11 flex items-center justify-center rounded-full bg-[#f2f2f2]" onClick={moveToMyLocation}>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 relative"
              preserveAspectRatio="none"
            >
              <path
                d="M19 12C19 15.866 15.866 19 12 19M19 12C19 8.13401 15.866 5 12 5M19 12H16.2M12 19C8.13401 19 5 15.866 5 12M12 19V16.2M5 12C5 8.13401 8.13401 5 12 5M5 12H7.8M12 5V7.8"
                stroke="#111111"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={12} cy={12} r={1} fill="#111111" />
            </svg>
          </button>
        </form>
        {/* Map area */}
        <div className="flex flex-col items-center w-full h-[200px] px-6">
          <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }} />
        </div>
      </div>
    </div>
  );
};

export default LocationMapModal; 