import axios from 'axios';

// API Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://15.164.234.32.nip.io';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;
const API_RETRY_COUNT = import.meta.env.VITE_API_RETRY_COUNT || 3;

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token to requests if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      // Optionally redirect to login page
    }
    return Promise.reject(error);
  }
);

// Retry function for failed requests
const retryRequest = async (fn, retries = API_RETRY_COUNT) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.response?.status >= 500) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

export const apiService = {
  // Items API endpoints
  async getItems(params = {}) {
    return retryRequest(async () => {
      const response = await apiClient.get('/api/items', { params });
      return response.data;
    });
  },

  async getItem(id) {
    return retryRequest(async () => {
      const response = await apiClient.get(`/api/items/${id}`);
      return response.data;
    });
  },

  async createItem(itemData) {
    return retryRequest(async () => {
      const response = await apiClient.post('/api/items', itemData);
      return response.data;
    });
  },

  async updateItem(id, itemData) {
    return retryRequest(async () => {
      const response = await apiClient.put(`/api/items/${id}`, itemData);
      return response.data;
    });
  },

  async deleteItem(id) {
    return retryRequest(async () => {
      const response = await apiClient.delete(`/api/items/${id}`);
      return response.data;
    });
  },

  // Category-specific endpoints
  async getItemsByCategory(category) {
    return retryRequest(async () => {
      const response = await apiClient.get('/api/items', {
        params: { category }
      });
      return response.data;
    });
  },

  // Location-based endpoints
  async getItemsByLocation(location) {
    return retryRequest(async () => {
      const response = await apiClient.get('/api/items', {
        params: { location }
      });
      return response.data;
    });
  },

  async getItemsByDistance(latitude, longitude, radius = 5000) {
    return retryRequest(async () => {
      const response = await apiClient.get('/api/items/nearby', {
        params: { latitude, longitude, radius }
      });
      return response.data;
    });
  },

  // Search endpoints
  async searchItems(query, filters = {}) {
    return retryRequest(async () => {
      const response = await apiClient.get('/api/items/search', {
        params: { q: query, ...filters }
      });
      return response.data;
    });
  },

  // Categories endpoints
  async getCategories() {
    return retryRequest(async () => {
      const response = await apiClient.get('/api/categories');
      return response.data;
    });
  },

  // Locations endpoints
  async getLocations() {
    return retryRequest(async () => {
      const response = await apiClient.get('/api/locations');
      return response.data;
    });
  },

  // Chat endpoints
  async getChatRooms() {
    return retryRequest(async () => {
      const response = await apiClient.get('/api/chat/rooms');
      return response.data;
    });
  },

  async getChatRoom(roomId) {
    return retryRequest(async () => {
      const response = await apiClient.get(`/api/chat/rooms/${roomId}`);
      return response.data;
    });
  },

  async getChatMessages(roomId, params = {}) {
    return retryRequest(async () => {
      const response = await apiClient.get(`/api/chat/rooms/${roomId}/messages`, {
        params
      });
      return response.data;
    });
  },

  async sendChatMessage(roomId, messageData) {
    return retryRequest(async () => {
      const response = await apiClient.post(`/api/chat/rooms/${roomId}/messages`, messageData);
      return response.data;
    });
  },

  async createChatRoom(roomData) {
    return retryRequest(async () => {
      const response = await apiClient.post('/api/chat/rooms', roomData);
      return response.data;
    });
  },

  async markMessageAsRead(chatRoomId, userId) {
    return retryRequest(async () => {
      const response = await apiClient.post('/api/chat/markRead', {
        chatRoomId,
        userId
      });
      return response.data;
    });
  },

  // User endpoints
  async getProfile() {
    return retryRequest(async () => {
      const response = await apiClient.get('/api/user/profile');
      return response.data;
    });
  },

  async updateProfile(profileData) {
    return retryRequest(async () => {
      const response = await apiClient.put('/api/user/profile', profileData);
      return response.data;
    });
  },

  // Auth endpoints
  async login(credentials) {
    return retryRequest(async () => {
      const response = await apiClient.post('/api/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response.data;
    });
  },

  async logout() {
    return retryRequest(async () => {
      const response = await apiClient.post('/api/auth/logout');
      localStorage.removeItem('auth_token');
      return response.data;
    });
  },

  async register(userData) {
    return retryRequest(async () => {
      const response = await apiClient.post('/api/auth/register', userData);
      return response.data;
    });
  },

  // File upload endpoints
  async uploadFile(file, type = 'image') {
    return retryRequest(async () => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await apiClient.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    });
  },

  // Location services
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000, // Cache for 1 minute
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          let errorMessage = 'Unable to retrieve location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        options
      );
    });
  },

  // Utility methods
  calculateDistance(lat1, lng1, lat2, lng2) {
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

  sortItemsByDistance(items, userLat, userLng) {
    return items.map(item => ({
      ...item,
      distance: this.calculateDistance(
        userLat, 
        userLng, 
        item.latitude || 0, 
        item.longitude || 0
      )
    })).sort((a, b) => a.distance - b.distance);
  }
};

export default apiService; 