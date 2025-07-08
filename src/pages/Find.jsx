import React, { useState } from 'react';
import { authAPI } from '../services/api';
import logo from '../assets/logo.svg';
import errorIcon from '../assets/에러아이콘.svg';

export default function Search_pw() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSearchPassword = async (e) => {
    e.preventDefault();
    
    // 에러 메시지 초기화
    setUsernameError('');
    setEmailError('');
    setIsLoading(true);

    // 기본 유효성 검사
    if (!username) {
      setUsernameError('아이디를 입력해주세요');
      setIsLoading(false);
      return;
    }
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      setIsLoading(false);
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authAPI.findPassword(username, email);
      console.log('비밀번호 찾기 성공:', response);
      setIsSubmitted(true);
    } catch (error) {
      console.error('비밀번호 찾기 실패:', error);
      
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            if (data?.field === 'username' || data?.message?.includes('아이디')) {
              setUsernameError('올바른 아이디를 입력해주세요');
            } else if (data?.field === 'email' || data?.message?.includes('이메일')) {
              setEmailError('올바른 이메일을 입력해주세요');
            } else {
              setEmailError('입력 정보를 확인해주세요');
            }
            break;
          case 404:
            setUsernameError('해당 아이디와 이메일로 가입된 계정을 찾을 수 없습니다');
            break;
          case 500:
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            break;
          default:
            alert('비밀번호 찾기 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      } else if (error.request) {
        alert('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
      } else {
        alert(`요청 설정 중 오류 발생: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.history.back();
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-[400px] flex items-center justify-between px-4 py-3 border-b border-[#D9D9D9]" style={{height: '56px'}}>
        <img src={logo} alt="ReturnZone Logo" className="h-6" />
        <div className="w-8 h-8 border-2 border-dashed border-[#B197FC] rounded-md flex items-center justify-center" />
      </div>

      {/* Search Password Form */}
      <div className="w-full max-w-[400px] flex-1 px-6 py-12 flex flex-col">
        <h1 className="text-3xl font-bold mb-8 leading-tight">비밀번호 찾기</h1>
        
        {!isSubmitted ? (
          <form onSubmit={handleSearchPassword}>
            <p className="text-gray-600 mb-8 text-base leading-relaxed">
              가입하신 아이디와 이메일을 입력하시면<br />
              비밀번호 재설정 링크를 보내드립니다.
            </p>
            
            <label className="text-base font-semibold mb-2 block" htmlFor="username">아이디</label>
            <input
              id="username"
              type="text"
              className={`w-full border rounded-md px-3 py-3 mb-2 focus:outline-none focus:ring-2 text-base ${
                usernameError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-[#D9D9D9] focus:ring-[#B197FC]'
              }`}
              placeholder="아이디를 입력해주세요."
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={isLoading}
            />
            {usernameError ? (
              <div className="flex items-center gap-2 mb-2 text-red-500 text-sm">
                <img src={errorIcon} alt="에러" className="w-4 h-4" />
                <span>{usernameError}</span>
              </div>
            ) : (
              <span className="text-xs text-[#A3A3A3] mb-5 block">가입하신 아이디를 입력해주세요.</span>
            )}
            
            <label className="text-base font-semibold mb-2 block" htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              className={`w-full border rounded-md px-3 py-3 mb-2 focus:outline-none focus:ring-2 text-base ${
                emailError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-[#D9D9D9] focus:ring-[#B197FC]'
              }`}
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
            />
            {emailError ? (
              <div className="flex items-center gap-2 mb-8 text-red-500 text-sm">
                <img src={errorIcon} alt="에러" className="w-4 h-4" />
                <span>{emailError}</span>
              </div>
            ) : (
              <span className="text-xs text-[#A3A3A3] mb-8 block">가입하신 이메일을 입력해주세요.</span>
            )}
            
            <div className="flex gap-2 mb-4 mt-2">
              <button 
                type="submit" 
                className={`flex-1 py-3 rounded-md font-semibold text-lg ${
                  isLoading 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
                disabled={isLoading}
              >
                {isLoading ? '처리 중...' : '비밀번호 찾기'}
              </button>
            </div>
            
            <button 
              type="button" 
              onClick={handleBackToLogin}
              className={`w-full py-3 rounded-md font-semibold text-lg ${
                isLoading 
                  ? 'border-gray-400 text-gray-400 cursor-not-allowed' 
                  : 'border border-black text-black hover:bg-gray-50'
              }`}
              disabled={isLoading}
            >
              로그인으로 돌아가기
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-3">이메일 발송 완료</h2>
              <p className="text-gray-600 mb-4 text-base leading-relaxed">
                입력하신 이메일 주소로<br />
                비밀번호 재설정 링크를 발송했습니다.
              </p>
              <p className="text-sm text-gray-500">
                이메일을 확인하여 비밀번호를 재설정해주세요.
              </p>
            </div>
            
            <button 
              onClick={handleBackToLogin}
              className="w-full bg-black text-white py-3 rounded-md font-semibold text-lg"
            >
              로그인으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 