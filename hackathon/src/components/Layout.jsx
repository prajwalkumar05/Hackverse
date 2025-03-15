import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import BottomNavBar from "./BottomNavbar";
// import BottomNavbar from "./BottomNavBar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavbar />
      <div className=" pb-20">
        <Outlet /> {/* This will render the current page content */}
      </div>
      <BottomNavbar/>
    </div>
  );
};

export default Layout;
