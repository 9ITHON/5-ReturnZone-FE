import { useEffect, useRef, useState } from 'react';

export default function KakaoMap({ latitude, longitude }) {
    const mapRef = useRef(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        // Kakao API 로드 상태 확인 (중복 방지용)
        const existingScript = document.getElementById('kakao-map-script');
        if (!existingScript) {
            const script = document.createElement('script');
            script.id = 'kakao-map-script';
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false`; // autoload false
            script.onload = () => {
                window.kakao.maps.load(() => {
                    setIsMapLoaded(true); // 로딩 후 상태 변경
                });
            };
            document.head.appendChild(script);
        } else {
            // 이미 로드된 경우 즉시 load
            window.kakao.maps.load(() => {
                setIsMapLoaded(true);
            });
        }
    }, []);

    useEffect(() => {
        if (!isMapLoaded || !window.kakao || !mapRef.current) return;

        const container = mapRef.current;
        const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3,
            draggable: false,
            scrollwheel: false, // 사용자 건드리기 금지
        };

        const map = new window.kakao.maps.Map(container, options);

        new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(latitude, longitude),
            map,
        });
    }, [isMapLoaded, latitude, longitude]);

    return (
        <div
            ref={mapRef}
            className="w-full h-[146px] rounded-[6px] overflow-hidden bg-gray-100"
        >
            {/* 로딩 전 placeholder */}
            {!isMapLoaded && <p className="text-center text-sm text-gray-500">지도를 불러오는 중...</p>}
        </div>
    );
}
