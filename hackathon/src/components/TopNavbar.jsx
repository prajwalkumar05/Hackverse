import React from "react";
import { NavLink } from "react-router-dom";
import { User, Mic } from "lucide-react";
import logo from "../assets/logo.png"; // Import logo from assets folder

const TopNavbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md fixed top-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Eldernest Logo" className="h-8" />
      </div>

      {/* Mic Icon & Profile Icon */}
      <div className="flex items-center gap-0">
        {/* Mic Icon */}
        <NavLink to="/voice" className="p-2 rounded-full hover:bg-gray-100 transition">
          <Mic size={24} className="text-gray-600" />
        </NavLink>

        {/* Profile Icon */}
        <NavLink to="/profile" className="p-2 rounded-full hover:bg-gray-100 transition">
          <User size={24} className="text-gray-600" />
        </NavLink>
      </div>
    </div>
  );
};

export default TopNavbar;
