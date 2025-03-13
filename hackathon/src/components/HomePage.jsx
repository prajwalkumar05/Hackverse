// import { useState } from "react";
// import { Search, Bell, QrCode, MapPin, Film, Music, Mic, Home, Video, Calendar, User } from "lucide-react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// export default function HomePage() {
//   const [activeTab, setActiveTab] = useState("home");

//   const categories = [
//     { icon: <Film size={24} />, label: "Movies" },
//     { icon: <Music size={24} />, label: "Music Shows" },
//     // { icon: <Running size={24} />, label: "Sports" },
//     { icon: <Mic size={24} />, label: "Comedy Shows" },
//   ];

//   const movies = [
//     { src: "https://via.placeholder.com/150", title: "Movie 1" },
//     { src: "https://via.placeholder.com/150", title: "Movie 2" },
//     { src: "https://via.placeholder.com/150", title: "Movie 3" },
//   ];

//   const banners = [
//     "https://via.placeholder.com/400x200",
//     "https://via.placeholder.com/400x200",
//     "https://via.placeholder.com/400x200",
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Top Navbar */}
//       <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
//         <h1 className="text-lg font-bold flex items-center">
//           It All Starts Here! 👋
//         </h1>
//         <div className="flex items-center gap-3">
//           <MapPin size={20} className="text-red-500" />
//           <span className="text-sm font-semibold text-red-500">Bengaluru ▼</span>
//           <Search size={24} />
//           <Bell size={24} />
//           <QrCode size={24} />
//         </div>
//       </div>

//       {/* Location Banner */}
//       <div className="bg-blue-500 text-white text-center p-2 text-sm">
//         Enable location to discover nearby events, movies, and more.
//       </div>

//       {/* Categories (Scrollable) */}
//       <div className="flex space-x-6 overflow-x-auto px-4 py-3 bg-white shadow-sm scrollbar-hide">
//         {categories.map((item, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <div className="bg-gray-200 p-3 rounded-full">{item.icon}</div>
//             <span className="text-xs font-medium">{item.label}</span>
//           </div>
//         ))}
//       </div>

//       {/* Banner / Carousel */}
//       <div className="relative mt-4 px-4">
//         <Slider
//           dots={true}
//           infinite={true}
//           speed={500}
//           slidesToShow={1}
//           slidesToScroll={1}
//           autoplay={true}
//           autoplaySpeed={3000}
//         >
//           {banners.map((banner, index) => (
//             <img key={index} src={banner} alt="Banner" className="w-full rounded-lg shadow-lg" />
//           ))}
//         </Slider>
//       </div>

//       {/* Recommended Movies */}
//       <div className="px-4 py-3">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Recommended Movies</h2>
//           <button className="text-red-500 text-sm">See All ›</button>
//         </div>
//         <div className="flex space-x-4 overflow-x-auto mt-3 scrollbar-hide">
//           {movies.map((movie, index) => (
//             <img key={index} src={movie.src} alt={movie.title} className="w-28 h-40 rounded-lg shadow-md" />
//           ))}
//         </div>
//       </div>

//       {/* Bottom Navbar */}
//       <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">
//         {[
//           { icon: <Home size={24} />, label: "Home" },
//           { icon: <Video size={24} />, label: "Movies" },
//           { icon: <Calendar size={24} />, label: "Live Events" },
//           { icon: <User size={24} />, label: "Profile" },
//         ].map((tab) => (
//           <button
//             key={tab.label}
//             onClick={() => setActiveTab(tab.label.toLowerCase())}
//             className={`flex flex-col items-center p-2 transition-all duration-300 rounded-md ${
//               activeTab === tab.label.toLowerCase() ? "text-red-500 scale-110 shadow-md" : "text-gray-600"
//             }`}
//           >
//             {tab.icon}
//             <span className="text-xs">{tab.label}</span>
//           </button>
//         ))}
//       </nav>
//     </div>
//     // <>hello world!
//     // </>
//   );
// }


import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, QrCode, MapPin, Home, Video, Calendar, User, Heart, MessageCircle, Send } from "lucide-react";

const posts = [
  {
    id: 1,
    name: "John Doe",
    age: 65,
    text: "Had a wonderful time at the community garden today! 🌱",
    image: "https://via.placeholder.com/400x300",
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 62,
    text: "Yoga session was refreshing. Thanks to everyone who joined! 🧘‍♂️",
    image: "https://via.placeholder.com/400x300",
    likes: 18,
    comments: 8,
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 70,
    text: "Book club discussion was amazing! 📖 Looking forward to next time.",
    image: "https://via.placeholder.com/400x300",
    likes: 25,
    comments: 10,
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 🏠 Top Navbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md fixed top-0 w-full z-50">
        <h1 className="text-lg font-bold">👥 Community Feed</h1>
        <div className="flex items-center gap-3">
          <MapPin size={20} className="text-red-500" />
          <span className="text-sm font-semibold text-red-500">Bengaluru ▼</span>
          <Search size={24} />
          <Bell size={24} />
          <QrCode size={24} />
        </div>
      </div>

      {/* 🌟 Community Posts (Instagram-Style) */}
      <div className="mt-16 pb-20 px-4 space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img src={post.image} alt="Post" className="w-full h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold">{post.name}, {post.age}</h2>
              <p className="text-gray-600">{post.text}</p>

              {/* Like & Comment Actions */}
              <div className="flex items-center justify-between mt-3">
                <button className="flex items-center text-gray-600 hover:text-red-500 transition">
                  <Heart size={20} className="mr-1" />
                  <span>{post.likes} Likes</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-500 transition">
                  <MessageCircle size={20} className="mr-1" />
                  <span>{post.comments} Comments</span>
                </button>
                <button className="text-gray-600 hover:text-green-500 transition">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔽 Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">
        {[
          { icon: <Home size={24} />, label: "Home" },
          { icon: <Video size={24} />, label: "Explore" },
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
      </nav>
    </div>
  );
}

