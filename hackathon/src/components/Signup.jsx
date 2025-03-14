import { useNavigate } from "react-router-dom";

const Signup = ({ toggleForm }) => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate user registration
    navigate("/login"); // Redirect to Login page after signup
  };

  return (
    <div className="form-container sign-up w-full max-w-sm">
      <form className="bg-white p-6 rounded-lg shadow-md text-center" onSubmit={handleSignup}>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Account</h1>
        <input type="text" placeholder="Name" required className="w-full p-2 border border-gray-300 rounded-md mb-3" />
        <input type="tel" placeholder="Phone Number" required className="w-full p-2 border border-gray-300 rounded-md mb-3" />
        <input type="email" placeholder="Email (Optional)" className="w-full p-2 border border-gray-300 rounded-md mb-3" />
        <input type="number" placeholder="Age" required className="w-full p-2 border border-gray-300 rounded-md mb-3" />
        <input type="password" placeholder="Password" required className="w-full p-2 border border-gray-300 rounded-md mb-3" />
        <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-md hover:opacity-90">
          Sign Up
        </button>
        <p className="mt-4 text-blue-500 cursor-pointer switch" onClick={toggleForm}>
          Already have an account? Sign In
        </p>
      </form>
    </div>
  );
};

export default Signup;
