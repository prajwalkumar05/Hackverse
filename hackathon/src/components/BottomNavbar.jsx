import { useState } from "react";
import { Home, Users, Calendar, MessageCircle, Settings, Plus } from "lucide-react";
import VoiceRecorderFAB from "./VoiceRecorderFAB";


const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center p-3">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center p-3 rounded-lg bg-white/90 shadow-md transition-all duration-300 hover:shadow-lg ${
            activeTab === "home" ? "text-blue-600 scale-110" : "text-gray-700"
          }`}
        >
          <Home size={24} />
          <span className="text-xs font-semibold">Home</span>
        </button>

        {/* Friends Tab */}
        <button
          onClick={() => setActiveTab("friends")}
          className={`flex flex-col items-center p-3 rounded-lg bg-white/90 shadow-md transition-all duration-300 hover:shadow-lg ${
            activeTab === "friends" ? "text-blue-600 scale-110" : "text-gray-700"
          }`}
        >
          <Users size={24} />
          <span className="text-xs font-semibold">Friends</span>
        </button>

        {/* Floating Action Button (FAB)
        <button className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-xl -mt-10 hover:bg-blue-600 transition-all border-4 border-white">
          <Plus size={28} />
        </button> */}

<VoiceRecorderFAB />


        {/* Events Tab */}
        <button
          onClick={() => setActiveTab("events")}
          className={`flex flex-col items-center p-3 rounded-lg bg-white/90 shadow-md transition-all duration-300 hover:shadow-lg ${
            activeTab === "events" ? "text-blue-600 scale-110" : "text-gray-700"
          }`}
        >
          <Calendar size={24} />
          <span className="text-xs font-semibold">Events</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center p-3 rounded-lg bg-white/90 shadow-md transition-all duration-300 hover:shadow-lg ${
            activeTab === "profile" ? "text-blue-600 scale-110" : "text-gray-700"
          }`}
        >
          <Settings size={24} />
          <span className="text-xs font-semibold">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavbar;
