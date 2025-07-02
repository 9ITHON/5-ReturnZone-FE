import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Search_pw from './pages/Find.jsx';
import Search_id from './pages/SearchId.jsx';

// 메인 페이지
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search-pw" element={<Search_pw />} />
        <Route path="/search-id" element={<Search_id />} />
      </Routes>
    </Router>
  );
}

export default App
