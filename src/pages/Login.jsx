import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import kakaoIcon from '../assets/카카오.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // 프론트엔드 모의 로그인
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

  // 프론트엔드 모의 회원가입
  const handleSignup = () => {
    alert('회원가입 페이지로 이동합니다.');
  };

  // 프론트엔드 모의 카카오 로그인
  const handleKakaoLogin = () => {
    alert('카카오 로그인 성공!');
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-[400px] flex items-center justify-between px-4 py-3 border-b border-[#D9D9D9]" style={{height: '56px'}}>
        <img src={logo} alt="ReturnZone Logo" className="h-6" />
        <div className="w-8 h-8 border-2 border-dashed border-[#B197FC] rounded-md flex items-center justify-center" />
      </div>
      {/* Login Form */}
      <form className="w-full max-w-[400px] flex-1 px-6 py-8 flex flex-col" onSubmit={handleLogin}>
        <h1 className="text-3xl font-bold mb-6">로그인</h1>
        <label className="text-base font-semibold mb-1" htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          className="border border-[#D9D9D9] rounded-md px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-[#B197FC]"
          placeholder="이메일 입력해주세요."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <span className="text-xs text-[#A3A3A3] mb-3">이메일을 입력해주세요.</span>
        <label className="text-base font-semibold mb-1" htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          className="border border-[#D9D9D9] rounded-md px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-[#B197FC]"
          placeholder="8자 이상 입력해주세요."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <span className="text-xs text-[#A3A3A3] mb-3">비밀번호 입력해주세요.</span>
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2 accent-black"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            기억하기
          </label>
          <a href="#" className="text-sm text-[#2F3B8A] font-medium">비밀번호 찾기</a>
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-semibold text-lg mb-3">로그인</button>
        <button type="button" onClick={handleSignup} className="w-full border border-black text-black py-2 rounded-md font-semibold text-lg mb-3">회원가입</button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-[#FFEB00] text-black py-2 rounded-md font-semibold text-lg border border-[#FFEB00] mb-2"
          onClick={handleKakaoLogin}
        >
          <img src={kakaoIcon} alt="카카오" className="w-6 h-6" />
          카카오 로그인하기
        </button>
      </form>
    </div>
  );
}
