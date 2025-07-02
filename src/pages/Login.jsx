import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import CheckBox from '../components/CheckBox';
import MainButton from '../components/MainButton';
import kakaoIcon from '../assets/카카오.svg';
import errorIcon from '../assets/에러아이콘.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 에러 메시지 초기화
    setEmailError('');
    setPasswordError('');

    // 기본 유효성 검사
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      return;
    }
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
      return;
    }
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상 입력해주세요');
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const LOGIN_ENDPOINT = '/auth/login'; 

      const response = await axios.post(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
        email: email,
        password: password,
      });

      console.log('로그인 성공:', response.data);
      alert(`로그인 성공!\n이메일: ${email}`);

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

    } catch (error) {
      console.error('로그인 실패:', error);
      if (error.response) {
        console.error('응답 데이터:', error.response.data);
        console.error('응답 상태:', error.response.status);
        console.error('응답 헤더:', error.response.headers);

        if (error.response.status === 401) {
          setEmailError('존재하지 않는 계정입니다');
        } else if (error.response.status === 400) {
          if (error.response.data?.message?.includes('email')) {
            setEmailError('올바른 이메일 형식이 아닙니다');
          } else if (error.response.data?.message?.includes('password')) {
            setPasswordError('비밀번호가 일치하지 않습니다');
          } else {
            setEmailError('로그인 정보를 확인해주세요');
          }
        } else {
          alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      } else if (error.request) {
        console.error('요청:', error.request);
        alert('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
      } else {
        console.error('에러 메시지:', error.message);
        alert(`로그인 요청 설정 중 오류 발생: ${error.message}`);
      }
    }
  };

  const handleSignup = () => {
    alert('회원가입 페이지로 이동합니다.');
  };

  const handleKakaoLogin = () => {
    alert('카카오 로그인 성공!');
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-[400px] flex flex-col items-center px-4 py-25 min-h-screen">
        <Logo />
        <h1 className="text-3xl font-bold center leading-tight mb-6">환영합니다</h1>
        <form className="w-full flex flex-col flex-1" style={{minHeight: '400px'}} onSubmit={handleLogin}>
          <div className="flex flex-col gap-8 flex-1 mb-10">
            <div>
              <InputField
                label="이메일"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
              />
              {emailError && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <img src={errorIcon} alt="에러" className="w-4 h-4" />
                  <span>{emailError}</span>
                </div>
              )}
            </div>
            <div>
              <InputField
                label="비밀번호"
                placeholder="비밀번호 8자 이상 입력해주세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
              {passwordError && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <img src={errorIcon} alt="에러" className="w-4 h-4" />
                  <span>{passwordError}</span>
                </div>
              )}
            </div>
          </div>
          <CheckBox checked={remember} onChange={e => setRemember(e.target.checked)} />
          <div className="flex flex-col gap-4 mt-4 mb-10">
            <MainButton type="submit">로그인</MainButton>
            <MainButton onClick={handleSignup} color="secondary">회원가입</MainButton>
            <MainButton onClick={handleKakaoLogin} color="kakao">
              <img src={kakaoIcon} alt="카카오" className="w-6 h-6" />
              카카오 로그인
            </MainButton>
          </div>
        </form>
      </div>
    </div>
  );
}
