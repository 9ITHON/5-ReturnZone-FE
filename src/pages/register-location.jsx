import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useRegisterStore } from "../stores/RegisterStore";
import { UseKeyboardOpen } from "../utils/useKeyboardOpen";

import Button from "../components/button";
import LeftArrow from "../assets/좌측꺽쇠.svg";
import LocationIcon from "../assets/현재위치.svg";
import SearchIcon from "../assets/Search.svg";

export default function RegisterLocation() {
    const { setLocation } = useRegisterStore();
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const geocoderRef = useRef(null);
    const placesRef = useRef(null);
    const [address, setAddress] = useState("");
    const [latlng, setLatlng] = useState({ lat: null, lng: null });
    const [keyword, setKeyword] = useState("");
    const isKeyboardOpen = UseKeyboardOpen();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.state?.path || -1;
    const previousState = location.state || {}; // 기존 상태 백업
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=9d52e34fbb979fdd643ebcef1b43488a&autoload=false&libraries=services";
        script.async = true;
        console.log(window.kakao); // 카카오 맵 확인
        script.onload = () => {
            console.log("Kakao Maps script loaded");
            checkKakaoAndInitialize();
        };
        document.head.appendChild(script);
    }, []);
    const moveToCurrentLocation = (map, marker) => {
        if (!navigator.geolocation) {
            alert("위치 정보를 사용할 수 없습니다.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const latlng = new window.kakao.maps.LatLng(lat, lng);

                map.setCenter(latlng);
                marker.setPosition(latlng);
                setLatlng({ lat, lng });
                console.log("현재 위치 →", address, lat, lng);
                if (geocoderRef.current) {
                    geocoderRef.current.coord2Address(
                        lng,
                        lat,
                        (result, status) => {
                            if (status === window.kakao.maps.services.Status.OK) {
                                const addr = result[0].address?.address_name;
                                setAddress(addr || "주소 미확인");
                            }
                        }
                    );
                }
            },
            () => {
                alert("현재 위치를 가져올 수 없습니다.");
            }
        );
    };
    // 사용자 현재 위치 받기
    const checkKakaoAndInitialize = () => {
        if (
            window.kakao &&
            window.kakao.maps &&
            typeof window.kakao.maps.load === "function"
        ) {
            window.kakao.maps.load(() => {
                // 기존 지도 초기화 로직
                if (!mapRef.current) return;

                const mapContainer = mapRef.current;
                const mapOption = {
                    center: new window.kakao.maps.LatLng(37.498095, 127.02761),
                    level: 3,
                };

                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                const marker = new window.kakao.maps.Marker({
                    map,
                    position: map.getCenter(),
                });

                markerRef.current = marker;
                geocoderRef.current = new window.kakao.maps.services.Geocoder();
                placesRef.current = new window.kakao.maps.services.Places();

                moveToCurrentLocation(map, marker);

                window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
                    const latlng = mouseEvent.latLng;
                    marker.setPosition(latlng);
                    map.setCenter(latlng);
                    setLatlng({ lat: latlng.getLat(), lng: latlng.getLng() });

                    if (geocoderRef.current) {
                        geocoderRef.current.coord2Address(
                            latlng.getLng(),
                            latlng.getLat(),
                            function (result, status) {
                                if (status === window.kakao.maps.services.Status.OK) {
                                    const addr = result[0].address?.address_name;
                                    setAddress(addr || "주소 미확인");
                                }
                            }
                        );
                    }
                });
            });
        }
    };

    const handleSearch = () => {
        if (!keyword.trim() || !placesRef.current || !markerRef.current) return;

        placesRef.current.keywordSearch(keyword, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                const { y, x } = result[0];
                const latlng = new window.kakao.maps.LatLng(y, x);

                const map = markerRef.current.getMap();
                map.setCenter(latlng);
                markerRef.current.setPosition(latlng);
                setLatlng({ lat: parseFloat(y), lng: parseFloat(x) });

                geocoderRef.current.coord2Address(
                    parseFloat(x),
                    parseFloat(y),
                    (result, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const addr = result[0].address?.address_name;
                            setAddress(addr || "주소 미확인");
                        }
                    }
                );
            } else {
                alert("검색 결과가 없습니다.");
            }
        });
    };

    const handleCurrentLocationClick = () => {
        const map = markerRef.current?.getMap();
        const marker = markerRef.current;
        if (map && marker) {
            moveToCurrentLocation(map, marker);
        }
    };
    // 주소 넘기기
    const handleConfirm = () => {
        if (!address || latlng.lat === null || latlng.lng === null) return;

        // zustand에 저장
        setLocation(address, latlng.lat, latlng.lng);

        // 이전 상태 유지한 채 navigate
        navigate(path, {
            replace: true,
            state: {
                ...previousState,
                address,
                lat: latlng.lat,
                lng: latlng.lng,
            },
        });
    };

    return (
        <div className="relative w-full h-screen bg-white">
            {/* 상단 헤더 */}
            <div className="z-10 relative bg-white flex items-center h-[56px] px-[16px]">
                <img
                    src={LeftArrow}
                    alt="뒤로가기"
                    className="cursor-pointer"
                    onClick={() => navigate(-1)}
                />
            </div>

            {/* 검색바 */}
            <div className="z-10 relative bg-white px-[16px] mb-[8px]">
                <h2 className="text-[16px] font-semibold mb-[8px]">
                    물품을 획득한 장소를 선택해주세요.
                </h2>
                <div className="flex gap-[8px]">
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="예) 강남역 1번 출구"
                            className="flex-1 h-[40px] pl-[40px] pr-[12px] border border-[#D0D0D0] rounded-[8px] text-sm w-full"
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <img
                            src={SearchIcon}
                            alt="검색"
                            className="absolute top-[50%] translate-y-[-50%]"
                        />
                    </div>
                    <button onClick={handleCurrentLocationClick}>
                        <img src={LocationIcon} alt="위치 검색" />
                    </button>
                </div>
            </div>

            {/* 지도 */}
            <div
                ref={mapRef}
                className="absolute left-0 right-0 bottom-0 top-[140px] z-0"
            />

            {/* 버튼 */}
            <div className={` px-[24px] pt-[12px] pb-[24px] fixed bottom-0 z-10 ${isKeyboardOpen ? "!bottom-[10px]" : ""}`}>
                <Button label="선택 완료" onClick={handleConfirm} />
            </div>
        </div>
    );
}
