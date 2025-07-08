import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API 서비스 함수들
export const authAPI = {
  // 로그인
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // 카카오 로그인
  kakaoLogin: async (kakaoAccessToken, userInfo) => {
    const response = await apiClient.post('/auth/kakao/login', {
      kakaoAccessToken,
      userInfo,
    });
    return response.data;
  },

  // 회원가입
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // 아이디 찾기
  findId: async (name, email) => {
    const response = await apiClient.post('/auth/find-id', {
      name,
      email,
    });
    return response.data;
  },

  // 비밀번호 찾기/재설정
  findPassword: async (username, email) => {
    const response = await apiClient.post('/auth/find-password', {
      username,
      email,
    });
    return response.data;
  },

  // 토큰 검증
  verifyToken: async () => {
    const response = await apiClient.get('/auth/verify');
    return response.data;
  },

  // 로그아웃
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    localStorage.removeItem('authToken');
    return response.data;
  },

  // 카카오 콜백 처리
  kakaoCallback: async (code) => {
    const response = await apiClient.post('/auth/kakao/callback', {
      code,
    });
    return response.data;
  },
};

// 카카오 로그인 관련 API
export const kakaoAPI = {
  // 카카오 로그인 URL 받기
  getKakaoLoginUrl: async () => {
    const response = await apiClient.get('/auth/kakao/login-url');
    return response.data;
  },

  // 카카오 로그인 콜백 처리
  kakaoCallback: async (code) => {
    return authAPI.kakaoCallback(code);
  },
};

export default apiClient; 