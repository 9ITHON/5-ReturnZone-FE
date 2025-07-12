import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 카카오 로그인 콜백 URL 접근 시 강제 리다이렉트 (임시 조치)
if (window.location.pathname.startsWith('/auth/login/kakao')) {
  window.location.replace('/Home');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="app-viewport">
      <App />
    </div>
  </StrictMode>,
)