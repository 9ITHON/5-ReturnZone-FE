import { useState, useEffect, useCallback } from 'react';
// import { apiService } from '../services/api';
import {mockApiService} from '../services/mockApi'

export const useLocationData = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const getUserLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const location = await apiService.getCurrentLocation();
      setUserLocation(location);
      setLocationPermission('granted');
      
      return location;
    } catch (err) {
      console.error('Error getting user location:', err);
      setError('위치 정보를 가져올 수 없습니다.');
      setLocationPermission('denied');
      
      // Fallback to default location (Seoul)
      const defaultLocation = { lat: 37.5665, lng: 126.9780 };
      setUserLocation(defaultLocation);
      return defaultLocation;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchItems = useCallback(async (filters = {}, customPos = null) => {
    try {
      setLoading(true);
      setError(null);

      let fetchedItems = [];

      // customPos가 있으면 해당 위치로 거리순 정렬
      if (customPos && filters.sortBy === 'distance') {
        fetchedItems = await apiService.getItemsByDistance(
          customPos.lat,
          customPos.lng,
          filters.radius || 5000
        );
      } else if (userLocation && filters.sortBy === 'distance') {
        fetchedItems = await apiService.getItemsByDistance(
          userLocation.lat, 
          userLocation.lng, 
          filters.radius || 5000
        );
      } else if (filters.category) {
        fetchedItems = await apiService.getItemsByCategory(filters.category);
      } else if (filters.location && filters.location !== '전체') {
        fetchedItems = await apiService.getItemsByLocation(filters.location);
      } else {
        fetchedItems = await apiService.getItems(filters);
      }

      // 거리순 정렬일 때만 거리 계산
      if ((customPos || userLocation) && filters.sortBy === 'distance' && fetchedItems.length > 0) {
        const base = customPos || userLocation;
        fetchedItems = apiService.sortItemsByDistance(
          fetchedItems, 
          base.lat, 
          base.lng
        );
      }

      setItems(fetchedItems);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [userLocation]);

  // Request location permission and fetch initial data
  const initializeLocation = useCallback(async () => {
    if (locationPermission === 'prompt') {
      await getUserLocation();
    }
  }, [getUserLocation, locationPermission]);

  // Filter items based on selected filters
  const filterItems = useCallback((selectedCategory, selectedLocation, sortBy = 'latest', customPos = null) => {
    const filters = {};
    
    if (selectedCategory && selectedCategory !== '전체') {
      filters.category = selectedCategory;
    }
    
    if (selectedLocation && selectedLocation !== '전체') {
      filters.location = selectedLocation;
    }
    
    if (sortBy === 'distance') {
      filters.sortBy = 'distance';
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
    locationPermission,
    getUserLocation,
    fetchItems,
    filterItems,
    refreshData,
    initializeLocation
  };
}; 