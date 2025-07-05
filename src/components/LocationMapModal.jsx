import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const LocationMapModal = ({ open, onClose, onSelect }) => {
  const [position, setPosition] = useState({
    lat: 37.5665, // 기본값: 서울
    lng: 126.9780,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-end justify-end bg-black bg-opacity-40">
      <div className="w-full max-w-md mx-auto bg-white rounded-t-xl p-4 shadow-lg">
        <div className="flex items-center mb-2">
          <span className="font-bold text-lg flex-1">위치 설정</span>
          <button onClick={onClose}>닫기</button>
        </div>
        <Map
          center={position}
          style={{ width: "100%", height: "300px" }}
          level={3}
          onClick={(_, mouseEvent) => {
            setPosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            });
          }}
        >
          <MapMarker position={position} />
        </Map>
        <button
          className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => {
            onSelect(position);
            onClose();
          }}
        >
          이 위치로 설정
        </button>
      </div>
    </div>
  );
};

export default LocationMapModal; 