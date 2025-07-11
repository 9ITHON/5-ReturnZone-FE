import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://15.164.234.32.nip.io/api/v1';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;
const API_RETRY_COUNT = import.meta.env.VITE_API_RETRY_COUNT || 3;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  }
);

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
  // Auth
  async login({ email, password }) {
    return retryRequest(async () => {
      const response = await apiClient.post('/members/login', { email, password });
      if (response.data.accessToken) {
        localStorage.setItem('auth_token', response.data.accessToken);
      }
      return response.data;
    });
  },
  async register(userData) {
    return retryRequest(async () => {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    });
  },
  async logout() {
    return retryRequest(async () => {
      const response = await apiClient.post('/auth/logout');
      localStorage.removeItem('auth_token');
      return response.data;
    });
  },
  async findId({ name, email }) {
    return retryRequest(async () => {
      const response = await apiClient.post('/auth/find-id', { name, email });
      return response.data;
    });
  },
  async findPassword({ username, email }) {
    return retryRequest(async () => {
      const response = await apiClient.post('/auth/find-password', { username, email });
      return response.data;
    });
  },
  async kakaoLogin(kakaoAccessToken, userInfo) {
    return retryRequest(async () => {
      const response = await apiClient.post('/auth/kakao/login', { kakaoAccessToken, userInfo });
      if (response.data.accessToken) {
        localStorage.setItem('auth_token', response.data.accessToken);
      }
      return response.data;
    });
  },
  async kakaoCallback(code) {
    return retryRequest(async () => {
      const response = await apiClient.post('/auth/kakao/callback', { code });
      return response.data;
    });
  },

  // LostPosts (분실물)
  async getLostPosts(params = {}) {
    return retryRequest(async () => {
      const response = await apiClient.get('/lostPosts', { params });
      return response.data;
    });
  },
  async getLostPost(id) {
    return retryRequest(async () => {
      const response = await apiClient.get(`/lostPosts/${id}`);
      return response.data;
    });
  },
  async createLostPost(data) {
    return retryRequest(async () => {
      const response = await apiClient.post('/lostPosts', data);
      return response.data;
    });
  },
  async updateLostPost(id, data) {
    return retryRequest(async () => {
      const response = await apiClient.put(`/lostPosts/${id}`, data);
      return response.data;
    });
  },
  async deleteLostPost(id) {
    return retryRequest(async () => {
      const response = await apiClient.delete(`/lostPosts/${id}`);
      return response.data;
    });
  },
  // 검색
  async searchLostPosts(params = {}) {
    return retryRequest(async () => {
      const response = await apiClient.get('/lostPosts/search', { params });
      return response.data;
    });
  },
  // 채팅
  async getChatRooms() {
    return retryRequest(async () => {
      const response = await apiClient.get('/chat/rooms');
      return response.data;
    });
  },
  async getChatRoom(roomId) {
    return retryRequest(async () => {
      const response = await apiClient.get(`/chat/rooms/${roomId}`);
      return response.data;
    });
  },
  async getChatMessages(roomId, params = {}) {
    return retryRequest(async () => {
      const response = await apiClient.get(`/chat/rooms/${roomId}/messages`, { params });
      return response.data;
    });
  },
  async sendChatMessage(roomId, messageData) {
    return retryRequest(async () => {
      const response = await apiClient.post(`/chat/rooms/${roomId}/messages`, messageData);
      return response.data;
    });
  },
  async createChatRoom(roomData) {
    return retryRequest(async () => {
      const response = await apiClient.post('/chat/rooms', roomData);
      return response.data;
    });
  },
  // 파일 업로드
  async uploadFile(file) {
    return retryRequest(async () => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    });
  },
  // 유틸리티 (위치 등)
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
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
};

export default apiService; 
