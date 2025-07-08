import "./index.css";
import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col mx-auto shadow-lg relative">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
