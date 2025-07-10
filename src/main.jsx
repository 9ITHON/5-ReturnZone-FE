
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="app-viewport">
      <App />
    </div>
  </StrictMode>,
)

// import './index.css';
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App.jsx";
// import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import SignUp from "./pages/signup.jsx";
// import DetailedPage from "./pages/detailed-page.jsx";
// import SearchPage from "./pages/search-page.jsx";
// import Chat from "./pages/Chat.jsx";
// import ChatList from "./pages/ChatList.jsx";
// import RegisterLocation from "./pages/register-location.jsx";
// import BottomNav from "./components/BottomNav.jsx";
// import RegisterPage from './pages/register-page.jsx'
// import ModifyPage from './pages/modify-page.jsx'


// // 임시 마이페이지 컴포넌트
// const MyPage = () => <div style={{ padding: 32 }}>마이페이지 준비중</div>;

// const Root = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />}>
//         {" "}
//         {/* App에서 Outlet 사용 */}
//         <Route index element={<Home />} />
//         <Route path="login" element={<Login />} />
//         <Route path='/SignUp' element={<SignUp />}></Route>
//         <Route path="detail/:id" element={<DetailedPage />} />
//         <Route path="chat" element={<ChatList />} />
//         <Route path="chat/:id" element={<Chat />} />
//         <Route path='/Register' element={<RegisterPage />}></Route>
//         <Route path='/RegisterLocation' element={<RegisterLocation/>}/>
//         <Route path="/lost/:lostPostId" element={<DetailedPage />} />
//         <Route path="/lost/:lostPostId/edit" element={<ModifyPage />} />
//         <Route path='/SearchPage' element={<SearchPage />} />
//         <Route path="mypage" element={<MyPage />} />
//       </Route>
//     </Routes>
//     {/* BottomNav를 항상 하단에 노출 */}

//   </BrowserRouter>
// );

// ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
