<<<<<<< HEAD
import './App.css'

// 메인 페이지
function App() {

  return (
    <div>메인 페이지 입니다.</div>
  )
}

export default App
=======
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Router 추가
import SignUp from './pages/signup';
import MainPage from './pages/main-page'; //임시 메인 페이지

// 라우터 설정 함수
function AppRoute(){
  return(
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
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
>>>>>>> 13cf750 (input-field 작성)
