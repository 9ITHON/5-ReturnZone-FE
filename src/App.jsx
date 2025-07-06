import "./index.css";
import Home from "./pages/Home.jsx";
import React from "react";
import { Outlet, Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
