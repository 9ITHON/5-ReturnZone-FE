import React, { useState } from 'react';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import CheckBox from '../components/CheckBox';
import MainButton from '../components/MainButton';
import kakaoIcon from '../assets/카카오.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    if (password.length < 8) {
      alert('비밀번호는 8자 이상 입력해주세요.');
      return;
    }
    alert(`로그인 성공!\n이메일: ${email}`);
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

            <InputField
              label="이메일"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
            <InputField
              label="비밀번호"
              placeholder="8자 이상 입력해주세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <div>
              <CheckBox label="자동 로그인" checked={remember} onChange={e => setRemember(e.target.checked)} />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-auto mb-10">
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
