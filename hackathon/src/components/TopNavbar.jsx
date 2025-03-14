import React from "react";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";
import logo from "../assets/logo.png"; // Import logo from assets folder

const TopNavbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md fixed top-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Eldernest Logo" className="h-8" />
      </div>

      {/* Profile Icon (Navigates to Profile Page) */}
      <NavLink to="/profile" className="p-2 rounded-full hover:bg-gray-100 transition">
        <User size={24} className="text-gray-600" />
      </NavLink>
    </div>
  );
};

export default TopNavbar;
