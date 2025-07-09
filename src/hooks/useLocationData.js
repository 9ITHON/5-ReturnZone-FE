import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';

export const useLocationData = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  // locationPermission 제거됨
  const getUserLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const location = await apiService.getCurrentLocation();
      setUserLocation(location);
      return location;
    } catch {
      setError('위치 정보를 가져올 수 없습니다.');
      // Fallback to default location (Seoul)
      const defaultLocation = { lat: 37.5665, lng: 126.9780 };
      setUserLocation(defaultLocation);
      return defaultLocation;
    } finally {
      setLoading(false);
    }
  }, []);

  // getLostPosts만 사용하도록 통일, 응답이 content 필드에 있으면 그걸로 setItems
  const fetchItems = useCallback(async (filters = {}, customPos = null) => {
    try {
      setLoading(true);
      setError(null);
      let params = { ...filters };
      if (customPos) {
        params.lat = customPos.lat;
        params.lng = customPos.lng;
      } else if (userLocation && filters.sortBy === 'distance') {
        params.lat = userLocation.lat;
        params.lng = userLocation.lng;
      }
      const fetched = await apiService.getLostPosts(params);
      setItems(fetched.content || fetched || []);
    } catch {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [userLocation]);

  const initializeLocation = useCallback(async () => {
    await getUserLocation();
  }, [getUserLocation]);

  const filterItems = useCallback((selectedCategory, selectedLocation, sortBy = 'latest', customPos = null) => {
    const filters = {};
    if (selectedCategory && selectedCategory !== '전체') {
      filters.category = selectedCategory;
    }
    if (selectedLocation && selectedLocation !== '전체') {
      filters.location = selectedLocation;
    }
    if (sortBy) {
      filters.sortBy = sortBy;
    }
    fetchItems(filters, customPos);
  }, [fetchItems]);

  const refreshData = useCallback(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    initializeLocation();
  }, [initializeLocation]);

  return {
    items,
    loading,
    error,
    userLocation,
    getUserLocation,
    fetchItems,
    filterItems,
    refreshData,
    initializeLocation
  };
}; 