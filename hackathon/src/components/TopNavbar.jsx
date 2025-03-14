import React from "react";
import { User } from "lucide-react";
import logo from "../assets/logo.png"; // Import logo from images folder

const TopNavbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md fixed top-0 w-full z-50">
      {/* Logo & App Name */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Eldernest Logo" className="w-35 h-8" />
       
      </div>

      {/* Profile Icon */}
      <button className="p-2 rounded-full hover:bg-gray-100 transition">
        <User size={24} className="text-gray-600" />
      </button>
    </div>
  );
};

export default TopNavbar;
