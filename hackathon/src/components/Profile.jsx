import { useState } from "react";
import { Camera, Save, X } from "lucide-react";
import pic from "../assets/p1.jpeg";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    bio: "Love reading, traveling, and meeting new people!",
    interests: [],
    dob: "",
    locality: "",
    image: pic,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [interestInput, setInterestInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const allInterests = ["Music", "Dance", "Reading", "Traveling", "Gardening", "Cooking", "Photography", "Painting", "Yoga", "Tech", "Fitness", "Coding"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const handleSave = () => {
    setProfile({ ...profile, image: selectedImage || profile.image });
    alert("Profile updated successfully!");
  };

  // Handle Interest Input and Suggestions
  const handleInterestChange = (e) => {
    const value = e.target.value;
    setInterestInput(value);

    if (value) {
      setSuggestions(allInterests.filter((interest) => interest.toLowerCase().includes(value.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  // Add Interest when clicked or Enter is pressed
  const addInterest = (interest) => {
    if (!profile.interests.includes(interest)) {
      setProfile({ ...profile, interests: [...profile.interests, interest] });
    }
    setInterestInput("");
    setSuggestions([]);
  };

  // Remove Interest
  const removeInterest = (interest) => {
    setProfile({ ...profile, interests: profile.interests.filter((i) => i !== interest) });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-16 px-4">
      {/* Profile Picture */}
      <div className="relative">
        <img
          src={selectedImage || profile.image}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
        />
        <label htmlFor="imageUpload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md cursor-pointer">
          <Camera size={20} />
        </label>
        <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </div>

      {/* Editable Fields */}
      <div className="w-full max-w-sm bg-white p-6 mt-6 rounded-lg shadow-lg">
        {/* Name */}
        <label className="block text-gray-600 text-sm">Name</label>
        <input type="text" name="name" value={profile.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mt-1" />

        {/* Bio */}
        <label className="block text-gray-600 text-sm mt-3">Bio</label>
        <textarea name="bio" value={profile.bio} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mt-1" />

        {/* Date of Birth */}
        <label className="block text-gray-600 text-sm mt-3">Date of Birth</label>
        <input type="date" name="dob" value={profile.dob} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mt-1" />

        {/* Interests with Autocomplete */}
        <label className="block text-gray-600 text-sm mt-3">Interests</label>
        <div className="relative">
          <input
            type="text"
            value={interestInput}
            onChange={handleInterestChange}
            placeholder="Type an interest..."
            className="w-full p-2 border border-gray-300 rounded mt-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && interestInput) {
                addInterest(interestInput);
                e.preventDefault();
              }
            }}
          />
          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-auto shadow-lg z-10">
              {suggestions.map((interest) => (
                <li
                  key={interest}
                  onClick={() => addInterest(interest)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {interest}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Interests */}
        <div className="flex flex-wrap gap-2 mt-3">
          {profile.interests.map((interest) => (
            <div key={interest} className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
              {interest}
              <button onClick={() => removeInterest(interest)} className="ml-2">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Locality/Address */}
        <label className="block text-gray-600 text-sm mt-3">Locality/Address</label>
        <input type="text" name="locality" value={profile.locality} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mt-1" />

        {/* Save Button */}
        <button onClick={handleSave} className="w-full bg-green-500 text-white py-2 mt-6 rounded-lg flex items-center justify-center hover:bg-green-600 transition-all">
          <Save size={20} className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
