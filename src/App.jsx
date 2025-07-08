import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Router 추가
import SignUp from './pages/signup';
import MainPage from './pages/main-page'; //임시 메인 페이지
import RegisterLocation from './pages/register-location';
import DetailedPage from './pages/detailed-page';
import ModifyPage from './pages/modify-page';

// 라우터 설정 함수
function AppRoute(){
  return(
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path='/RegisterLocation' element={<RegisterLocation/>}/>
      <Route path="/lost/:lostPostId" element={<DetailedPage />} />
      <Route path="/lost/:lostPostId/edit" element={<ModifyPage />} />
      {/* 존재하지 않는 경로에 대한 설정 */}
      {/* <Route path="*" element={<NotFound />} />  */}
    </Routes>
  )
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
