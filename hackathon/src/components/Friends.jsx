import { useState } from "react";
import { motion } from "framer-motion";
import { X, Heart, Home, Users, Calendar, User, Menu } from "lucide-react";

const friendsData = [
  {
    id: 1,
    name: "John Doe",
    age: 65,
    interests: ["Reading", "Gardening", "Music"],
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 62,
    interests: ["Painting", "Yoga", "Travel"],
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 70,
    interests: ["Chess", "Cooking", "Photography"],
    image: "https://via.placeholder.com/300",
  },
];

export default function Friends() {
  const [friends, setFriends] = useState(friendsData);
  const [activeTab, setActiveTab] = useState("friends");

  const handleSwipe = (direction, id) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* 🏠 Upper Navbar */}
      <div className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md fixed top-0">
        <h1 className="text-lg font-bold">👥 Find Friends</h1>
        <Menu size={24} className="text-gray-600" />
      </div>

      {/* 🔄 Tinder-Style Swiping Cards */}
      <div className="flex items-center justify-center flex-1 w-full  mb-30">
        {friends.length > 0 ? (
          <div className="relative w-80 h-96">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(event, info) => {
                  if (info.offset.x > 100) handleSwipe("right", friend.id);
                  if (info.offset.x < -100) handleSwipe("left", friend.id);
                }}
                className="absolute w-full h-full bg-white rounded-lg shadow-xl p-4 flex flex-col justify-between"
              >
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="w-full h-2/3 object-cover rounded-lg"
                />
                <div className="text-center">
                  <h2 className="text-xl font-bold">{friend.name}, {friend.age}</h2>
                  <p className="text-gray-600">Interests: {friend.interests.join(", ")}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">No more friends to show.</p>
        )}
      </div>

      {/* 💕 Swipe Action Buttons */}
      <div className="fixed bottom-30 flex gap-6">
        <button
          onClick={() => handleSwipe("left", friends[0]?.id)}
          className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600"
        >
          <X size={28} />
        </button>
        <button
          onClick={() => handleSwipe("right", friends[0]?.id)}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
        >
          <Heart size={28} />
        </button>
      </div>

      {/* 🔽 Bottom Navbar */}
      {/* <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">
        {[
          { icon: <Home size={24} />, label: "Home" },
          { icon: <Users size={24} />, label: "Friends" },
          { icon: <Calendar size={24} />, label: "Events" },
          { icon: <User size={24} />, label: "Profile" },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label.toLowerCase())}
            className={`flex flex-col items-center p-2 transition-all duration-300 rounded-md ${
              activeTab === tab.label.toLowerCase() ? "text-blue-500 scale-110 shadow-md" : "text-gray-600"
            }`}
          >
            {tab.icon}
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </nav> */}
    </div>
  );
}
