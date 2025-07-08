import "./index.css";
import Home from "./pages/Home.jsx";
import React from "react";
import { Outlet, Router } from "react-router-dom";
import ChatroomList from "./components/ChatroomList";

function App() {
  return (
    <div>
      <ChatroomList />
    </div>
  );
}

export default App;
