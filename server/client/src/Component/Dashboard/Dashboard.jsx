import { useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar/Navbar";

const App = () => {
  const { username } = useSelector((state) => state.admin);
  if (!username) return <Navigate to={"/"} replace={true} relative="true" />;

  return (
    <div className="flex font-roboto bg-dash overflow-auto scroll-none h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Navbar username={username} />
        <div className="p-4 mt-24  flex-1   text-center flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
