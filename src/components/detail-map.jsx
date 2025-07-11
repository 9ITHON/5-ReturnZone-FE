import { useEffect, useRef, useState } from 'react';

export default function KakaoMap({ latitude, longitude }) {
    const mapRef = useRef(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    //맵 가져오기
    useEffect(() => {
        const loadKakaoMap = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => setIsMapLoaded(true));
                return;
            }

            const existingScript = document.getElementById('kakao-map-script');
            if (!existingScript) {
                const script = document.createElement('script');
                script.id = 'kakao-map-script';
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9d52e34fbb979fdd643ebcef1b43488a&autoload=false&libraries=services`;
                script.onload = () => {
                    if (window.kakao && window.kakao.maps) {
                        window.kakao.maps.load(() => setIsMapLoaded(true));
                    }
                };
                document.head.appendChild(script);
            } else {
                // 이미 추가된 경우 로드 여부 확인
                const waitUntilLoaded = setInterval(() => {
                    if (window.kakao && window.kakao.maps && typeof window.kakao.maps.load === 'function') {
                        clearInterval(waitUntilLoaded);
                        window.kakao.maps.load(() => setIsMapLoaded(true));
                    }
                }, 100);
            }
        };

        loadKakaoMap();
    }, []);
    // 맵 렌더링
    useEffect(() => {
        if (!isMapLoaded || !mapRef.current || !window.kakao || !window.kakao.maps) return;

        const container = mapRef.current;
        const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3,
            draggable: false,
            scrollwheel: false,
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
            {!isMapLoaded && (<p className="text-center text-sm text-gray-500">지도를 불러오는 중...</p>)}
        </div>
    );
}
