import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Search_pw from './pages/Find.jsx';
import Search_id from './pages/SearchId.jsx';
import Signup from './pages/Signup.jsx';
import KakaoCallback from './pages/KakaoCallback.jsx';

// 메인 페이지
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search-pw" element={<Search_pw />} />
        <Route path="/search-id" element={<Search_id />} />
        <Route path="/kakao/callback" element={<KakaoCallback />} />
        <Route path="/dashboard" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">환영합니다!</h1><p className="mt-4">대시보드 페이지입니다.</p></div>} />
      </Routes>
    </Router>
  );
}

export default App
