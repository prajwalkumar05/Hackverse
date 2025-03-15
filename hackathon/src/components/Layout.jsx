import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";
<<<<<<< HEAD
// import BottomNavbar from "./BottomNavBar";
=======

>>>>>>> efe4983a1b0771f7100218d21503471def89ca16

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavbar />
      <div className=" pb-20">
        <Outlet /> {/* This will render the current page content */}
      </div>
<<<<<<< HEAD
      <BottomNavbar/>
=======
      <BottomNavbar />
>>>>>>> efe4983a1b0771f7100218d21503471def89ca16
    </div>
  );
};

export default Layout;
