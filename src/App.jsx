import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="mx-auto w-[390px] min-h-screen bg-white">
      <Outlet />
    </div>
  );
}

export default App;
