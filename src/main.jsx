import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/signup.jsx";
import DetailedPage from "./pages/detailed-page.jsx";
import SearchPage from "./pages/search-page.jsx";
import Chat from "./pages/Chat.jsx";
import ChatList from "./pages/ChatList.jsx";
import RegisterLocation from "./pages/register-location.jsx";
import BottomNav from "./components/BottomNav.jsx";

// 임시 마이페이지 컴포넌트
const MyPage = () => <div style={{ padding: 32 }}>마이페이지 준비중</div>;

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {" "}
        {/* App에서 Outlet 사용 */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="detail/:id" element={<DetailedPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="chat" element={<ChatList />} />
        <Route path="chat/:id" element={<Chat />} />
        <Route path="register" element={<RegisterLocation />} />
        <Route path="mypage" element={<MyPage />} />
      </Route>
    </Routes>
    {/* BottomNav를 항상 하단에 노출 */}
    <BottomNav />
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
