import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [friends, setFriends] = useState([...friendsData]);

  const handleSwipe = (direction) => {
    if (friends.length > 0) {
      setTimeout(() => {
        setFriends((prev) => {
          const removedFriend = prev[0];
          return [...prev.slice(1), { ...removedFriend, id: removedFriend.id + friendsData.length }]; // Recycle card
        });
      }, 200);
    }
  };

  return (
    <div className="bg-[#F9F7F7] min-h-screen flex flex-col items-center">
      {/* 🏠 Upper Navbar */}
      {/* <div className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md fixed top-0 z-50">
        <h1 className="text-xl font-bold text-[#112D4E]">👥 Find Friends</h1>
        <Menu size={24} className="text-[#3F72AF] hover:text-[#112D4E] cursor-pointer" />
      </div> */}

      {/* 🔄 Tinder-Style Swiping Cards */}
      <div className="flex items-center justify-center flex-1 w-full mb-16 mt-20">
        {friends.length > 0 && (
          <div className="relative w-80 h-96">
            <AnimatePresence>
              {friends.slice(0, 3).map((friend, index) => (
                <motion.div
                  key={friend.id}
                  initial={{ scale: 0.9, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: index === 0 ? (friend.swipeDirection === "right" ? 300 : -300) : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(event, info) => {
                    if (info.offset.x > 100) {
                      handleSwipe("right");
                      friend.swipeDirection = "right";
                    } else if (info.offset.x < -100) {
                      handleSwipe("left");
                      friend.swipeDirection = "left";
                    }
                  }}
                  className="absolute w-full h-full bg-white rounded-lg shadow-xl p-4 flex flex-col justify-between border border-[#DBE2EF]"
                  style={{ zIndex: friends.length - index }}
                >
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className="w-full h-2/3 object-cover rounded-lg"
                  />
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-[#112D4E]">
                      {friend.name}, {friend.age}
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Interests: {friend.interests.join(", ")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 💕 Swipe Action Buttons */}
      <div className="fixed bottom-28 flex gap-6">
        <motion.button
          onClick={() => handleSwipe("left")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-all"
        >
          <X size={28} />
        </motion.button>
        <motion.button
          onClick={() => handleSwipe("right")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
        >
          <Heart size={28} />
        </motion.button>
      </div>
    </div>
  );
}