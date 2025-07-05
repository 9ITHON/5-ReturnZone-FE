// Mock API service for testing
export const mockApiService = {
  // Mock items data with location coordinates
  mockItems: [
    {
      id: 1,
      title: '소니 WH-1000XM4 헤드셋 찾아가세요',
      tag: '즉시 정산 가능',
      location: '월계1동',
      time: '10분 전',
      reward: '10,000원',
      status: '주인찾아요',
      category: '전자기기',
      latitude: 37.6195,
      longitude: 127.0539
    },
    {
      id: 2,
      title: '에어팟 프로 2세대 분실했습니다',
      tag: '',
      location: '월계2동',
      time: '15분 전',
      reward: '15,000원',
      status: '분실했어요',
      category: '전자기기',
      latitude: 37.6200,
      longitude: 127.0545
    },
    {
      id: 3,
      title: '지갑을 잃어버렸습니다',
      tag: '',
      location: '상계1동',
      time: '30분 전',
      reward: '20,000원',
      status: '분실했어요',
      category: '지갑',
      latitude: 37.6180,
      longitude: 127.0520
    },
    {
      id: 4,
      title: '반려견을 찾습니다',
      tag: '즉시 정산 가능',
      location: '상계2동',
      time: '1시간 전',
      reward: '50,000원',
      status: '분실했어요',
      category: '반려동물',
      latitude: 37.6170,
      longitude: 127.0510
    },
    {
      id: 5,
      title: '노트북을 찾습니다',
      tag: '즉시 정산 가능',
      location: '월계3동',
      time: '2시간 전',
      reward: '30,000원',
      status: '분실했어요',
      category: '전자기기',
      latitude: 37.6210,
      longitude: 127.0550
    }
  ],

  delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  getItems: async (params = {}) => {
    await mockApiService.delay();
    let items = [...mockApiService.mockItems];

    if (params.category) {
      items = items.filter(item => item.category === params.category);
    }
    if (params.location && params.location !== '전체') {
      items = items.filter(item => item.location === params.location);
    }

    return items;
  },

  // Get items by category
  getItemsByCategory: async (category) => {
    await mockApiService.delay();
    return mockApiService.mockItems.filter(item => item.category === category);
  },

  // Get items by location
  getItemsByLocation: async (location) => {
    await mockApiService.delay();
    return mockApiService.mockItems.filter(item => item.location === location);
  },

  // Get items by distance (mock implementation)
  getItemsByDistance: async (userLat, userLng, radius = 5000) => {
    await mockApiService.delay();
    // Filter items within radius (simplified mock implementation)
    const items = mockApiService.mockItems.filter(item => {
      const distance = mockApiService.calculateDistance(userLat, userLng, item.latitude, item.longitude);
      return distance <= radius / 1000; // Convert radius from meters to kilometers
    });
    return items;
  },

  // Calculate distance between two points
  calculateDistance: (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  },

  // Sort items by distance
  sortItemsByDistance: (items, userLat, userLng) => {
    return items.map(item => ({
      ...item,
      distance: mockApiService.calculateDistance(
        userLat, 
        userLng, 
        item.latitude || 0, 
        item.longitude || 0
      )
    })).sort((a, b) => a.distance - b.distance);
  }
}; 