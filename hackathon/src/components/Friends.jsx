import { useState } from "react";
import { motion } from "framer-motion";
import { X, Heart, Menu } from "lucide-react"; 

// Import images from assets
import p1 from "../assets/p1.jpeg";
import p2 from "../assets/p2.jpeg";
import p3 from "../assets/yoga.jpeg"; 

const friendsData = [
  {
    id: 1,
    name: "John Doe",
    age: 65,
    interests: ["Reading", "Gardening", "Music"],
    image: p1,
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 62,
    interests: ["Painting", "Yoga", "Travel"],
    image: p2,
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 70,
    interests: ["Chess", "Cooking", "Photography"],
    image: p3,
  },
];

export default function Friends() {
  const [friends, setFriends] = useState(friendsData);

  const handleSwipe = (direction) => {
    if (friends.length > 0) {
      setTimeout(() => {
        setFriends((prev) => prev.slice(1)); // Remove the first card instead of filtering
      }, 200); // Small delay for smoother animation
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* 🏠 Upper Navbar */}
      <div className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md fixed top-0">
        <h1 className="text-lg font-bold">👥 Find Friends</h1>
        <Menu size={24} className="text-gray-600" />
      </div>

      {/* 🔄 Tinder-Style Swiping Cards */}
      <div className="flex items-center justify-center flex-1 w-full mb-16">
        {friends.length > 0 ? (
          <div className="relative w-80 h-96">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(event, info) => {
                  if (info.offset.x > 100) handleSwipe("right");
                  if (info.offset.x < -100) handleSwipe("left");
                }}
                className="absolute w-full h-full bg-white rounded-lg shadow-xl p-4 flex flex-col justify-between"
                style={{ zIndex: friends.length - index }} // Ensure top card is removed first
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
      <div className="fixed bottom-16 flex gap-6">
        <button
          onClick={() => handleSwipe("left")}
          className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600"
        >
          <X size={28} />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
        >
          <Heart size={28} />
        </button>
      </div>
    </div>
  );
}
