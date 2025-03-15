import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const NavigationTabs = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen pt-16">
      {/* Tab Buttons */}
      <div className="flex gap-4">
        <NavLink
          to="/navigate/chat"
          className={({ isActive }) =>
            `px-6 py-3 rounded-lg text-lg font-medium transition ${
              isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`
          }
        >
          Chat
        </NavLink>

        <NavLink
          to="/navigate/ngopage"
          className={({ isActive }) =>
            `px-6 py-3 rounded-lg text-lg font-medium transition ${
              isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`
          }
        >
          NGO Page
        </NavLink>
      </div>

      {/* Render Child Components (ChatApp / NGOPage) */}
      <div className="w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default NavigationTabs;
