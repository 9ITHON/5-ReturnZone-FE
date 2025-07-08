import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          console.error('카카오 로그인 에러:', error);
          alert('카카오 로그인 중 오류가 발생했습니다.');
          navigate('/');
          return;
        }

        if (!code) {
          console.error('카카오 인증 코드가 없습니다.');
          alert('카카오 로그인에 실패했습니다.');
          navigate('/');
          return;
        }

        // 서버에 인증 코드 전송
        const response = await authAPI.kakaoCallback(code);
        
        if (response.token || response.accessToken) {
          localStorage.setItem('authToken', response.token || response.accessToken);
          localStorage.setItem('loginType', 'kakao');
          alert('카카오 로그인 성공!');
          navigate('/dashboard');
        } else {
          throw new Error('토큰을 받지 못했습니다.');
        }

      } catch (error) {
        console.error('카카오 콜백 처리 오류:', error);
        alert('카카오 로그인 처리 중 오류가 발생했습니다.');
        navigate('/');
      }
    };

    handleKakaoCallback();
  }, [navigate]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">카카오 로그인 처리 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
} 