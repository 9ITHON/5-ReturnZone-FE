import "./index.css";
import Home from "./pages/Home.jsx";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ChatroomList from "./components/ChatroomList";

function App() {
  const location = useLocation();
  return (
    <div>
      {/* /chat 경로에서만 채팅방 목록 보이기 */}
      {location.pathname === "/chat" && <ChatroomList />}
      <Outlet />
    </div>
  );
}

export default App;
