import React, { useState } from 'react';
import logo from '../assets/logo.svg';
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
      {/* Header */}
      <div className="w-full max-w-[400px] flex items-center justify-between px-4 py-3 border-b border-[#D9D9D9]" style={{height: '56px'}}>
        <img src={logo} alt="ReturnZone Logo" className="h-6" />
        <div className="w-8 h-8 border-2 border-dashed border-[#B197FC] rounded-md flex items-center justify-center" />
      </div>
      {/* Login Form */}
      <form className="w-full max-w-[400px] flex-1 px-6 py-12 flex flex-col" onSubmit={handleLogin}>
        <h1 className="text-3xl font-bold mb-8 leading-tight">로그인</h1>
        <label className="text-base font-semibold mb-2 block" htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          className="border border-[#D9D9D9] rounded-md px-3 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-[#B197FC] text-base"
          placeholder="이메일 입력해주세요."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <span className="text-xs text-[#A3A3A3] mb-5 block leading-relaxed">이메일을 입력해주세요.</span>
        <label className="text-base font-semibold mb-2 block" htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          className="border border-[#D9D9D9] rounded-md px-3 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-[#B197FC] text-base"
          placeholder="8자 이상 입력해주세요."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <span className="text-xs text-[#A3A3A3] mb-8 block leading-relaxed">비밀번호 입력해주세요.</span>
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2 accent-black"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            기억하기
          </label>
        </div>
        <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-semibold text-lg mb-4">로그인</button>
        <button type="button" onClick={handleSignup} className="w-full border border-black text-black py-3 rounded-md font-semibold text-lg mb-4">회원가입</button>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => window.location.href = '/search-id'}
            className="flex-1 border border-black text-black py-3 rounded-md font-semibold text-base bg-white"
          >
            아이디 찾기
          </button>
          <button
            type="button"
            onClick={() => window.location.href = '/search-pw'}
            className="flex-1 border border-black text-black py-3 rounded-md font-semibold text-base bg-white"
          >
            비밀번호 찾기
          </button>
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-[#FFEB00] text-black py-3 rounded-md font-semibold text-lg border border-[#FFEB00]"
          onClick={handleKakaoLogin}
        >
          <img src={kakaoIcon} alt="카카오" className="w-6 h-6" />
          카카오 로그인하기
        </button>
      </form>
    </div>
  );
}
