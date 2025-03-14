import { NavLink } from "react-router-dom";
import { Home, Users, Calendar, Settings, Mic } from "lucide-react";

const BottomNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center p-3">
        {/* Home Tab */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center p-3 rounded-lg bg-white/90 shadow-md transition-all duration-300 hover:shadow-lg ${
              isActive ? "text-blue-600 scale-110" : "text-gray-700"
            }`
          }
        >
          <Home size={24} />
          <span className="text-xs font-semibold">Home</span>
        </NavLink>

        {/* Friends Tab */}
        <NavLink
          to="/friends"
          className={({ isActive }) =>
            `flex flex-col items-center p-3 rounded-lg bg-white/90 shadow-md transition-all duration-300 hover:shadow-lg ${
              isActive ? "text-blue-600 scale-110" : "text-gray-700"
            }`
          }
        >
          <Users size={24} />
          <span className="text-xs font-semibold">Friends</span>
        </NavLink>

        {/* Floating Action Button (Voice Recorder) */}
        <NavLink
          to="/record"
          className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-xl -mt-10 hover:bg-blue-600 transition-all border-4 border-white"
        >
          <Mic size={28} />
        </NavLink>

        {/* Events Tab */}
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `flex flex-col items-center p-3 rounded-lg bg-white/90 shadow-md transition-all duration-300 hover:shadow-lg ${
              isActive ? "text-blue-600 scale-110" : "text-gray-700"
            }`
          }
        >
          <Calendar size={24} />
          <span className="text-xs font-semibold">Events</span>
        </NavLink>

        {/* Profile Tab */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center p-3 rounded-lg bg-white/90 shadow-md transition-all duration-300 hover:shadow-lg ${
              isActive ? "text-blue-600 scale-110" : "text-gray-700"
            }`
          }
        >
          <Settings size={24} />
          <span className="text-xs font-semibold">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavbar;
