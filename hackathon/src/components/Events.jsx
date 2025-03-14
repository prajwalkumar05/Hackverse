import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      <div className="space-y-4 w-full max-w-xs">
        {/* Join Event Button */}
        <button 
          onClick={() => navigate("/events/join")}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Join Event
        </button>

        {/* Create Event Button */}
        <button 
          onClick={() => navigate("/events/create")}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default Events;
