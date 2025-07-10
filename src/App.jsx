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

// 라우터 설정 함수
function AppRoute(){
  return(
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/LogIn' element={<Login/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path='/Chat' element={<Chat/>}></Route>
      <Route path='/ChatList' element={<ChatList/>}></Route>
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
      {/* 존재하지 않는 경로에 대한 설정 */}
      {/* <Route path="*" element={<NotFound />} />  */}
    </Routes>
  )
}
// 메인 페이지
