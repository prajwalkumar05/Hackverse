import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, PlusCircle, Image } from "lucide-react";


import gardenImage from "../assets/garden.jpeg";
import yogaImage from "../assets/yoga.jpeg";
// import bookClubImage from "../assets/images/bookclub.jpg";
import gamesImage from "../assets/games.jpeg";
import parkImage from "../assets/park.jpeg";
import paintingImage from "../assets/painting.jpeg";

const initialPosts = [
  {
    id: 1,
    name: "John Doe",
    age: 65,
    text: "Had a wonderful time at the community garden today! 🌱",
    image: gardenImage,
    likes: 12,
    comments: [],
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 62,
    text: "Yoga session was refreshing. Thanks to everyone who joined! 🧘‍♂️",
    image: yogaImage,
    likes: 18,
    comments: [],
  },
  // {
  //   id: 3,
  //   name: "Michael Johnson",
  //   age: 70,
  //   text: "Book club discussion was amazing! 📖 Looking forward to next time.",
  //   image: bookClubImage,
  //   likes: 25,
  //   comments: [],
  // },
  {
    id: 3,
    name: "Sarah Williams",
    age: 68,
    text: "Had a great time playing board games with the community! 🎲",
    image: gamesImage,
    likes: 15,
    comments: [],
  },
  {
    id: 4,
    name: "David Brown",
    age: 66,
    text: "Lovely evening walk and meetup at the park. 🌳",
    image: parkImage,
    likes: 20,
    comments: [],
  },
  {
    id: 5,
    name: "Emma Davis",
    age: 64,
    text: "Exploring creativity at the painting class! 🎨",
    image: paintingImage,
    likes: 30,
    comments: [],
  },
];



export default function HomePage() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({ text: "", image: null });
  const [stories, setStories] = useState(["https://via.placeholder.com/80", "https://via.placeholder.com/80"]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMorePosts = () => {
    setPosts((prev) => [
      ...prev,
      ...prev.map((post, index) => ({
        ...post,
        id: prev.length + index + 1,
      })),
    ]);
  };

  const handlePostChange = (e) => {
    setNewPost({ ...newPost, text: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewPost({ ...newPost, image: imageURL });
    }
  };

  const handleAddPost = () => {
    if (newPost.text || newPost.image) {
      setPosts([{ id: posts.length + 1, name: "You", age: "N/A", ...newPost, likes: 0, comments: 0 }, ...posts]);
      setNewPost({ text: "", image: null });
    }
  };

  return (
    <div className="bg-[#e2d89b] min-h-screen pb-20 pt-0">
      {/* 📸 Stories Section */}
      <div className="mt-16 px-4 flex space-x-3 overflow-x-auto scrollbar-hide">
        {/* Add Story Button */}
        <div className="w-20 h-20 flex flex-col items-center justify-center bg-[#f9ecde] rounded-lg shadow-md cursor-pointer">
          <PlusCircle size={28} className="text-blue-500" />
          <span className="text-xs text-gray-600">Add Story</span>
        </div>
        {/* User Stories */}
        {stories.map((story, index) => (
          <motion.div key={index} className="w-20 h-20 rounded-lg overflow-hidden border-2 border-blue-500">
            <img src={story} alt="Story" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* ✏️ Add Post Section */}
      <div className="px-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <textarea
            placeholder="What's on your mind?"
            value={newPost.text}
            onChange={handlePostChange}
            className="w-full p-2 border border-gray-300 rounded resize-none"
          />
          {newPost.image && <img src={newPost.image} alt="New Post" className="w-full mt-2 rounded" />}
          <div className="flex items-center justify-between mt-3">
            <label className="flex items-center text-blue-500 cursor-pointer">
              <Image size={24} className="mr-1" />
              <span>Add Image</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            <button onClick={handleAddPost} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Post
            </button>
          </div>
        </div>
      </div>

      {/* 🌟 Community Posts (Infinite Scroll) */}
      <div className="mt-6 px-4 space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
    </div>
  );
}