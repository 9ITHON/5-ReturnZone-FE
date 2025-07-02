import React, { useState } from 'react';
import logo from '../assets/logo.svg';

export default function Search_id() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSearchId = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('이름과 이메일을 모두 입력해주세요.');
      return;
    }
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    setIsSubmitted(true);
    alert('입력하신 이메일로 아이디를 발송했습니다.');
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
      {/* Search ID Form */}
      <div className="w-full max-w-[400px] flex-1 px-6 py-12 flex flex-col">
        <h1 className="text-3xl font-bold mb-8 leading-tight">아이디 찾기</h1>
        {!isSubmitted ? (
          <form onSubmit={handleSearchId}>
            <p className="text-gray-600 mb-8 text-base leading-relaxed">
              가입하신 이름과 이메일을 입력하시면<br />
              아이디를 이메일로 알려드립니다다.
            </p>
            <label className="text-base font-semibold mb-2 block" htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              className="w-full border border-[#D9D9D9] rounded-md px-3 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-[#B197FC] text-base"
              placeholder="이름을 입력해주세요."
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <span className="text-xs text-[#A3A3A3] mb-5 block">가입하신 이름을 입력해주세요.</span>
            <label className="text-base font-semibold mb-2 block" htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              className="w-full border border-[#D9D9D9] rounded-md px-3 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-[#B197FC] text-base"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <span className="text-xs text-[#A3A3A3] mb-8 block">가입하신 이메일을 입력해주세요.</span>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-semibold text-lg mb-4 mt-2"
            >
              아이디 찾기
            </button>
            <button
              type="button"
              onClick={handleBackToLogin}
              className="w-full border border-black text-black py-3 rounded-md font-semibold text-lg"
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
                아이디를 발송했습니다.
              </p>
              <p className="text-sm text-gray-500">
                이메일을 확인해주세요.
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