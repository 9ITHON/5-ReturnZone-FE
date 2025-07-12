import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Router 추가
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
import { AuthProvider } from "./utils/AuthContext.jsx";
import UserMessageLogin from './components/UserMessageLogin';

// 라우터 설정 함수
function AppRoute() {
  const isLoggedIn = Boolean(localStorage.getItem('userId')); // 로그인 정보 확인
  // 로그인 검사
  const loginRequired = (element) =>
    isLoggedIn ? element : (
      <UserMessageLogin
        title="로그인이 필요합니다"
        message="해당 페이지는 로그인 이후 <br /> 이용하실 수 있습니다."
        path="/Login"
        cancelPath={-1}
      />
    );
  return (
    <Routes>
      {/* 공용 라우트 */}
      <Route path='/' element={<Home />} />
      <Route path='/LogIn' element={<Login />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/Register' element={<RegisterPage />} />
      <Route path='/lost/:lostPostId' element={<DetailedPage />} />

      {/* 로그인된 사용자만 접근 가능한 라우트 */}
      <Route path='/SearchPage' element={loginRequired(<SearchPage />)} />
      <Route path='/Chat' element={loginRequired(<Chat />)} />
      <Route path='/ChatList' element={loginRequired(<ChatList />)} />
      <Route path='/RegisterLocation' element={loginRequired(<RegisterLocation />)} />
      <Route path="/lost/:lostPostId/edit" element={loginRequired(<ModifyPage />)} />
      <Route path='/MyPageExchange' element={loginRequired(<MyPageExchange />)} />
      <Route path='/MyPageModify' element={loginRequired(<MyPageModify />)} />
      <Route path='/MyPageProduct' element={loginRequired(<MyPageProduct />)} />
      <Route path='/MyPageLocation' element={loginRequired(<MyPageLocation />)} />
      <Route path='/MyPage' element={loginRequired(<MyPage />)} />
    </Routes>
  );
}
// 메인 페이지
function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoute></AppRoute>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Router 추가
// import SignUp from './pages/signup';
// import Home from './pages/Home';
// import RegisterLocation from './pages/register-location';
// import DetailedPage from './pages/detailed-page';
// import ModifyPage from './pages/modify-page';
// import RegisterPage from './pages/register-page';
// import SearchPage from './pages/search-page';
// import Login from './pages/Login'
// import Chat from './pages/Chat';
// import ChatList from './pages/ChatList';
// import MyPage from './pages/MyPage';
// import MyPageExchange from './pages/MyPageExchange';
// import MyPageModify from './pages/MyPageModify';
// import MyPageProduct from './pages/MyPageProduct';
// import MyPageLocation from './pages/MyPageLocation';
// import { AuthProvider, useAuth } from "./utils/AuthContext.jsx";
// import { useEffect } from "react";
// import { GetMyPage } from "./utils/GetMyPage";

// // 라우터 설정 함수
// function AppRoute(){
//   return(
//     <AuthProvider>
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<Home/>}></Route>
//       <Route path='/LogIn' element={<Login/>}></Route>
//       <Route path='/SignUp' element={<SignUp/>}></Route>
//       <Route path="ChatList" element={<ChatList />} />
//       <Route path="chat/:id" element={<Chat />} />
//       <Route path='/RegisterLocation' element={<RegisterLocation/>}/>
//       <Route path='/Register' element={<RegisterPage/>}></Route>
//       <Route path="/lost/:lostPostId" element={<DetailedPage />} />
//       <Route path='/SearchPage' element={<SearchPage/>}/>
//       <Route path="/lost/:lostPostId/edit" element={<ModifyPage />} />
//       <Route path='/MyPage' element={<MyPage/>}/>
//       <Route path='/MyPageExchange' element={<MyPageExchange/>}/>
//       <Route path='/MyPageModify' element={<MyPageModify/>}/>
//       <Route path='/MyPageProduct' element={<MyPageProduct/>}/>
//       <Route path='/MyPageLocation' element={<MyPageLocation/>}/>
//       <Route path="/login" element={<Login />} />
//       {/* 존재하지 않는 경로에 대한 설정 */}
//       {/* <Route path="*" element={<NotFound />} />  */}
//     </Routes>
//     </BrowserRouter>
//     </AuthProvider>
//   )
// }

// function AuthGate({ children }) {
//   const { setUser } = useAuth();
//   useEffect(() => {
//     const checkToken = async () => {
//       const token = localStorage.getItem("auth_token");
//       const userId = localStorage.getItem("userId");
//       if (token && userId) {
//         try {
//           const userInfo = await GetMyPage(userId);
//           if (userInfo) {
//             setUser(userInfo);
//           } else {
//             localStorage.removeItem("auth_token");
//             setUser(null);
//           }
//         } catch {
//           localStorage.removeItem("auth_token");
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//     };
//     checkToken();
//   }, [setUser]);
//   return children;
// }
// // 메인 페이지
// export default function App() {

//   return (
//     <AuthProvider>
//       <AuthGate>
//           <AppRoute></AppRoute>
//       </AuthGate>
//     </AuthProvider>
//   )
// }