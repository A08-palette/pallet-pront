import Navbar from "./NavBar.js";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
