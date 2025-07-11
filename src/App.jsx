import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Router 추가
import SignUp from './pages/signup';
import Home from './pages/Home';
import RegisterLocation from './pages/register-location';
import DetailedPage from './pages/detailed-page';
import ModifyPage from './pages/modify-page';
import RegisterPage from './pages/register-page';
import SearchPage from './pages/search-page';
import Login from './pages/Login'
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import MyPage from './pages/MyPage';
import MyPageExchange from './pages/MyPageExchange';
import MyPageModify from './pages/MyPageModify';
import MyPageProduct from './pages/MyPageProduct';
import MyPageLocation from './pages/MyPageLocation';
import Header from './components/sign-header';

// 라우터 설정 함수
function AppRoute() {
  const isLoggedIn = Boolean(localStorage.getItem('userId')); // 로그인 정보 확인

  return (
    <Routes>
      {/* 공용 라우트 */}
      <Route path='/' element={<Home />} />
      <Route path='/LogIn' element={<Login />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/Register' element={<RegisterPage />} />
      <Route path='/lost/:lostPostId' element={<DetailedPage />} />

      {/* 로그인된 사용자만 접근 가능한 라우트 */}
      {isLoggedIn && (
        <>
          <Route path='/Chat' element={<Chat />} />
          <Route path='/SearchPage' element={<SearchPage />} />
          <Route path='/ChatList' element={<ChatList />} />
          <Route path='/RegisterLocation' element={<RegisterLocation />} />
          <Route path="/lost/:lostPostId/edit" element={<ModifyPage />} />
          <Route path='/MyPageExchange' element={<MyPageExchange />} />
          <Route path='/MyPageModify' element={<MyPageModify />} />
          <Route path='/MyPageProduct' element={<MyPageProduct />} />
          <Route path='/MyPageLocation' element={<MyPageLocation />} />
          <Route path='/MyPage' element={<MyPage />} />
        </>
      )}

      {/* 로그인되지 않은 사용자가 보호 라우트에 접근했을 때 */}
      {!isLoggedIn && (
        <Route path='/*' element={<Navigate to="/LogIn" replace />} />
      )}
    </Routes>
  );
}
// 메인 페이지
function App() {

  return (
    <BrowserRouter>
      <AppRoute></AppRoute>
    </BrowserRouter>
  )
}

export default App
