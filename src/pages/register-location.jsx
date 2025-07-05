import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/button";

import LeftArrow from '../assets/좌측꺽쇠.svg'

export default function RegisterLocation() {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const geocoderRef = useRef(null);
    const placesRef = useRef(null);
    const [address, setAddress] = useState("");
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (!window.kakao) return;

        const mapContainer = mapRef.current;
        const mapOption = {
            center: new window.kakao.maps.LatLng(37.498095, 127.027610), // 강남역
            level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoderRef.current = geocoder;

        const marker = new window.kakao.maps.Marker({
            map,
            position: map.getCenter(),
        });
        markerRef.current = marker;

        // 지도 클릭 시 마커 이동 및 주소 갱신
        window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
            const latlng = mouseEvent.latLng;
            marker.setPosition(latlng);
            geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                    const addr = result[0].address?.address_name;
                    setAddress(addr || "주소 미확인");
                }
            });
        });
    }, []);
    // 🔍 검색 기능: 장소 키워드로 이동
    const handleSearch = () => {
        if (!keyword.trim() || !placesRef.current || !markerRef.current) return;

        placesRef.current.keywordSearch(keyword, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                const { y, x, place_name, address_name } = result[0];
                const latlng = new window.kakao.maps.LatLng(y, x);

                // 지도와 마커 이동
                const map = markerRef.current.getMap();
                map.setCenter(latlng);
                markerRef.current.setPosition(latlng);

                // 주소 상태 갱신
                setAddress(address_name || place_name);
            } else {
                alert("검색 결과가 없습니다.");
            }
        });
    };

    const handleConfirm = () => {
        if (!address) return;
        navigate(-1, { state: { address } }); // 이전 페이지로 주소 전달
    };

    return (
        <div className="w-full h-screen flex flex-col bg-white">
            {/* 상단 헤더 */}
            <div className="flex items-center h-[56px] px-[16px]">
                <img
                    src={LeftArrow}
                    alt="뒤로가기"
                    className="w-[24px] h-[24px] cursor-pointer"
                    onClick={() => navigate(-1)}
                />
            </div>

            {/* 안내문구 + 검색 */}
            <div className="px-[16px] mb-[8px]">
                <h2 className="text-[16px] font-semibold mb-[8px]">물품을 잃어버린 장소를 선택해주세요.</h2>
                <div className="flex gap-[8px]">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="예) 강남역 1번 출구"
                        className="flex-1 h-[40px] px-[12px] border border-[#D0D0D0] rounded-[8px] text-sm"
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="px-[12px] text-sm rounded bg-[#0066FF] text-white"
                    >
                        검색
                    </button>
                </div>
            </div>

            {/* 지도 영역 */}
            <div ref={mapRef} className="w-full flex-1" />

            {/* 선택 완료 버튼 */}
            <div className="p-[16px]">
                <Button label="선택 완료" onClick={handleConfirm} />
            </div>
        </div>
    );
}