import React from 'react';
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
import { AuthProvider, useAuth } from "./utils/AuthContext.jsx";
import { useEffect } from "react";
import { GetMyPage } from "./utils/GetMyPage";

// 라우터 설정 함수
function AppRoute(){
  return(
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/LogIn' element={<Login/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path="ChatList" element={<ChatList />} />
//    <Route path="chat/:id" element={<Chat />} />
      <Route path='/RegisterLocation' element={<RegisterLocation/>}/>
      <Route path='/Register' element={<RegisterPage/>}></Route>
      <Route path="/lost/:lostPostId" element={<DetailedPage />} />
      <Route path='/SearchPage' element={<SearchPage/>}/>
      <Route path="/lost/:lostPostId/edit" element={<ModifyPage />} />
      <Route path='/MyPage' element={<MyPage/>}/>
      <Route path='/MyPageExchange' element={<MyPageExchange/>}/>
      <Route path='/MyPageModify' element={<MyPageModify/>}/>
      <Route path='/MyPageProduct' element={<MyPageProduct/>}/>
      <Route path='/MyPageLocation' element={<MyPageLocation/>}/>
      <Route path="/login" element={<Login />} />
      {/* 존재하지 않는 경로에 대한 설정 */}
      {/* <Route path="*" element={<NotFound />} />  */}
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

function AuthGate({ children }) {
  const { setUser } = useAuth();
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("auth_token");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        try {
          const userInfo = await GetMyPage(userId);
          if (userInfo) {
            setUser(userInfo);
          } else {
            localStorage.removeItem("auth_token");
            setUser(null);
          }
        } catch {
          localStorage.removeItem("auth_token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkToken();
  }, [setUser]);
  return children;
}
// 메인 페이지
export default function App() {

  return (
    <AuthProvider>
      <AuthGate>
          <AppRoute></AppRoute>
      </AuthGate>
    </AuthProvider>
  )
}