import React from 'react';

const LocationPermission = ({ onRequestPermission, permissionStatus }) => {
  if (permissionStatus === 'granted') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl p-6 w-[320px] flex flex-col gap-4 shadow-xl">
        <div className="text-center">
          <div className="text-lg font-bold mb-2">위치 권한 필요</div>
          <p className="text-gray-600 text-sm mb-4">
            가까운 분실물을 찾기 위해 위치 정보가 필요합니다.
          </p>
        </div>
        
        {permissionStatus === 'denied' ? (
          <div className="text-center">
            <p className="text-red-600 text-sm mb-4">
              위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.
            </p>
            <button 
              onClick={onRequestPermission}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={onRequestPermission}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              허용
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm"
            >
              거부
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPermission; 