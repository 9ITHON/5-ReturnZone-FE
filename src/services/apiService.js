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
  withCredentials: true,
});
// 자동으로 JWT 토큰 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 반드시 accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 누락되면 401
    }
    return config;
  },
  (error) => Promise.reject(error)
);
//카카오 현재 위치 가져오는 함수
export function getCurrentPositionFromKakao(callback) {
  const KAKAO_API_KEY = "9d52e34fbb979fdd643ebcef1b43488a";

  function loadKakaoSdkAndProceed() {
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      proceed(); // SDK가 이미 로드되었으면 진행
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=services`;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            proceed();
          });
        } else {
          console.error("Kakao maps 객체 접근 실패");
          callback(null);
        }
      };
      script.onerror = () => {
        console.error("Kakao SDK 로드 실패");
        callback(null);
      };
      document.head.appendChild(script);
    }
  }

  function proceed() {
    if (!navigator.geolocation) {
      alert("위치 정보 사용이 불가능합니다.");
      callback(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(lng, lat, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const address =
              result[0].address?.region_3depth_name ||
              result[0].road_address?.region_3depth_name ||
              "";
            callback({ lat, lng, address });
          } else {
            callback({ lat, lng, address: "" });
          }
        });
      },
      (err) => {
        console.error("위치 정보 가져오기 실패", err);
        callback(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  loadKakaoSdkAndProceed();
}


// 실제 로직 분리
function getCurrentPositionLogic(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(longitude, latitude, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const address = result[0].address?.address_name || "";
            callback({
              lat: latitude,
              lng: longitude,
              address: address,
            });
          } else {
            callback({
              lat: latitude,
              lng: longitude,
              address: "",
            });
          }
        });
      },
      (error) => {
        console.error("Geolocation Error:", error);
        callback(null);
      }
    );
  } else {
    console.warn("Geolocation을 지원하지 않습니다.");
    callback(null);
  }
}


let isRefreshing = false;
let refreshSubscribers = [];

function onAccessTokenRefreshed(newToken) {
  refreshSubscribers.forEach(callback => callback(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 이미 다른 요청이 refresh 중이면 기다렸다가 새 accessToken으로 재시도
      if (isRefreshing) {
        return new Promise(resolve => {
          addRefreshSubscriber(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        localStorage.removeItem('accessToken');
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_BASE_URL}/members/refresh`, {
          refreshToken,
        });

        const newAccessToken = data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        isRefreshing = false;
        onAccessTokenRefreshed(newAccessToken);

        // Authorization 헤더 갱신 후 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // TODO: 로그아웃 페이지로 이동하거나 알림 표시
        return Promise.reject(refreshError);
      }
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

export function getUserId() {
  // 로그인하지 않았으면 null 반환
  return localStorage.getItem('userId') ?? null;
}

export const apiService = {
  // 로그인
  // async login({ email, password }) {
  //   return retryRequest(async () => {
  //     const response = await apiClient.post('/members/login', { email, password });
  //     const {
  //       accessToken,
  //       refreshToken,
  //       memberId,
  //       email: userEmail,
  //       username,
  //       imageUrl,
  //       accessTokenExpiresDate,
  //     } = response.data;

  //     // localStorage 저장
  //     localStorage.setItem('auth_token', accessToken);
  //     localStorage.setItem('refresh_token', refreshToken);
  //     localStorage.setItem('user_id', memberId.toString());
  //     localStorage.setItem('email', userEmail);
  //     localStorage.setItem('username', username);
  //     localStorage.setItem('image_url', imageUrl);
  //     localStorage.setItem('token_expiry', accessTokenExpiresDate);

  //     return response.data;
  //   });
  // },

  // Auth
  async login({ email, password }) {
    return retryRequest(async () => {
      const response = await apiClient.post('/members/login', { email, password });
      // localStorage 저장 코드 제거
      return response.data; // { email, username, imageUrl }
    });
  },
  //회원가입
  async register(userData) {
    return retryRequest(async () => {
      const response = await apiClient.post('/members/signup', userData);
      return response.data;
    });
  },
  //로그아웃
  async logout() {
    try {
      await retryRequest(async () => {
        const response = await apiClient.post('/members/logout');
        return response.data;
      });
    } catch {
      // ignore error, always remove token
    }
    localStorage.removeItem('accessToken');
  },
  // 아이디 찾기
  async findId({ name, email }) {
    return retryRequest(async () => {
      const response = await apiClient.post('/auth/find-id', { name, email });
      return response.data;
    });
  },
  // 패스워드
  async findPassword({ username, email }) {
    return retryRequest(async () => {
      const response = await apiClient.post('/auth/find-password', { username, email });
      return response.data;
    });
  },
  // 카카오 로그인
  async kakaoLogin(kakaoAccessToken, userInfo) {
    return retryRequest(async () => {
      const response = await apiClient.post('/auth/login/kakao', { kakaoAccessToken, userInfo });
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        console.log("로그인 응답:", response);
      }
      return response.data;
    });
  },
  // 카카오 
  async kakaoCallback(code) {
    return retryRequest(async () => {
      const response = await apiClient.post('/auth/kakao/callback', { code });
      return response.data;
    });
  },
  // 카카오 로그인 콜백
  async kakaoLoginCallback(code) {
    return retryRequest(async () => {
      const response = await apiClient.post("/auth/kakao/callback", { code });
      return response.data;
    });
  },
  // 이메일 사용가능?
  async checkEmailDuplicate(email) {
    return retryRequest(async () => {
      const response = await apiClient.get(`/members/email/${email}`);
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
  // // 분실물 조회
  // async getLostPost(id) {
  //   return retryRequest(async () => {
  //     const response = await apiClient.get(`/lostPosts/${lostPostId}`);
  //     return response.data;
  //   });
  // },
  // 분실물 생성
  async createLostPost(data) {
    return retryRequest(async () => {
      const response = await apiClient.post('/lostPosts', data);
      return response.data;
    });
  },
  // 분실물 수정
  // async updateLostPost(id, data) {
  //   return retryRequest(async () => {
  //     const response = await apiClient.put(`/lostPosts/${lostPostId}`, data);
  //     return response.data;
  //   });
  // },
  // async deleteLostPost(id) {
  //   return retryRequest(async () => {
  //     const response = await apiClient.delete(`/lostPosts/${lostPostId}`);
  //     return response.data;
  //   });
  // },
  // 검색
  async searchLostPosts(params = {}) {
    return retryRequest(async () => {
      const response = await apiClient.get('/search/posts', { params });
      return response.data;
    });
  },
  // 채팅방 목록 조회 (Swagger 기준)
  async getChatRooms(page = 0) {
    return retryRequest(async () => {
      const response = await apiClient.get(
        '/chats/rooms',
        {
          params: { page },
          // headers: { 'X-USER-ID': getUserId() }
        }
      );
      return response.data;
    });
  },
  // 룸 들어가기 (채팅 목록 조회)
  async getChatRoom(roomId) {
    return retryRequest(async () => {
      const response = await apiClient.get(`/chats/rooms/${roomId}/messages`, {
        params: { page },
      });
      return response.data;
    });

  },
  // 채팅 메시지 조회 (Swagger 기준)
  async getChatMessages(roomId, page = 0) {
    return retryRequest(async () => {
      const response = await apiClient.get(
        `/chats/rooms/${roomId}/messages`,
        {
          params: { page },
          // headers: { 'X-USER-ID': getUserId() }
        }
      );
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
      const response = await apiClient.post('/chats/rooms', roomData);
      return response.data;
    });
  },
  async markMessageAsRead(roomId, userId) {
    return retryRequest(async () => {
      const response = await apiClient.put(`/chat/rooms/${roomId}/read`, { userId });
      return response.data;
    });
  },
  // 읽지 않은 메시지 수: 모든 채팅방 unreadCount 합산
  async getUnreadCount() {
    return retryRequest(async () => {
      const rooms = await this.getChatRooms(0);
      let total = 0;
      if (rooms && rooms.content) {
        total = rooms.content.reduce((sum, room) => sum + (room.unreadCount || 0), 0);
      }
      return { unreadCount: total };
    });
  },
  async deleteChatRoom(roomId) {
    return retryRequest(async () => {
      const response = await apiClient.delete(`/chat/rooms/${roomId}`);
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
  async getMyPage() {
    return retryRequest(async () => {
      const response = await apiClient.get('/mypage');
      return response.data;
    });
  },
};

export default apiService; 
