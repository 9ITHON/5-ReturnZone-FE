// 카카오 SDK 초기화 및 로그인 처리 유틸리티

// 카카오 앱 키 (실제 운영에서는 환경변수로 관리해야 함)
const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY || 'YOUR_KAKAO_APP_KEY';

// 카카오 SDK 초기화
export const initKakao = () => {
  if (typeof window !== 'undefined' && window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY);
      console.log('카카오 SDK 초기화 완료');
    }
    return true;
  }
  console.error('카카오 SDK가 로드되지 않았습니다.');
  return false;
};

// 카카오 로그인
export const loginWithKakao = () => {
  return new Promise((resolve, reject) => {
    if (!initKakao()) {
      reject(new Error('카카오 SDK 초기화 실패'));
      return;
    }

    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log('카카오 로그인 성공:', authObj);
        // 사용자 정보 가져오기
        getUserInfo()
          .then(userInfo => {
            resolve({
              accessToken: authObj.access_token,
              refreshToken: authObj.refresh_token,
              userInfo: userInfo
            });
          })
          .catch(reject);
      },
      fail: (err) => {
        console.error('카카오 로그인 실패:', err);
        reject(err);
      }
    });
  });
};

// 카카오 사용자 정보 가져오기
export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    if (!window.Kakao?.Auth?.getAccessToken()) {
      reject(new Error('카카오 액세스 토큰이 없습니다.'));
      return;
    }

    window.Kakao.API.request({
      url: '/v2/user/me',
      success: (res) => {
        console.log('카카오 사용자 정보:', res);
        const userInfo = {
          id: res.id,
          email: res.kakao_account?.email,
          name: res.kakao_account?.profile?.nickname,
          profileImage: res.kakao_account?.profile?.profile_image_url
        };
        resolve(userInfo);
      },
      fail: (error) => {
        console.error('사용자 정보 가져오기 실패:', error);
        reject(error);
      }
    });
  });
};

// 카카오 로그아웃
export const logoutKakao = () => {
  return new Promise((resolve) => {
    if (!window.Kakao?.Auth?.getAccessToken()) {
      resolve(); // 이미 로그아웃 상태
      return;
    }

    window.Kakao.Auth.logout((response) => {
      console.log('카카오 로그아웃:', response);
      resolve(response);
    });
  });
};

// 카카오 연결 해제
export const unlinkKakao = () => {
  return new Promise((resolve, reject) => {
    if (!window.Kakao?.Auth?.getAccessToken()) {
      reject(new Error('카카오 액세스 토큰이 없습니다.'));
      return;
    }

    window.Kakao.API.request({
      url: '/v1/user/unlink',
      success: (response) => {
        console.log('카카오 연결 해제:', response);
        resolve(response);
      },
      fail: (error) => {
        console.error('카카오 연결 해제 실패:', error);
        reject(error);
      }
    });
  });
};

// 카카오 로그인 상태 확인
export const getKakaoLoginStatus = () => {
  if (!window.Kakao) {
    return {
      isLoggedIn: false,
      accessToken: null
    };
  }

  const accessToken = window.Kakao.Auth.getAccessToken();
  return {
    isLoggedIn: !!accessToken,
    accessToken: accessToken
  };
}; 