import React from "react";
import { NavLink } from "react-router-dom";
import { User, Mic, MapPin } from "lucide-react";
import logo from "../assets/logo.png"; // Import logo from assets folder

const TopNavbar = () => {
  return (
    <div className="flex items-center px-4 py-3 bg-white shadow-md fixed top-0 w-full z-50">
      {/* Left Side - Logo */}
      <div>
        <img src={logo} alt="Eldernest Logo" className="h-8" />
      </div>

      {/* Spacer to push right-side content as far as possible */}
      <div className="flex-grow"></div>

      {/* Right Side - Location, Mic Icon & Profile Icon */}
      <div className="flex items-center gap-0">
        {/* Location */}
        <div className="flex items-center gap-0 text-gray-600">
          <MapPin size={20} />
          <span className="text-xs font-medium underline">Bangalore</span>
        </div>

        {/* Mic Icon */}
        <NavLink to="/voice" className="p-1 rounded-full hover:bg-gray-100 transition">
          <Mic size={24} className="text-gray-600" />
        </NavLink>

        {/* Profile Icon */}
        <NavLink to="/profile" className="p-1 rounded-full hover:bg-gray-100 transition">
          <User size={24} className="text-gray-600" />
        </NavLink>
      </div>
    </div>
  );
};

export default TopNavbar;
