import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Signin = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Add authentication logic here if needed
    navigate("/"); // Redirect to HomePage after sign-in
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4]">
      <div className="w-full max-w-md bg-[#F5E1C8] p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="ElderNest Logo" className="w-60 h-20" />
        </div>

        {/* Sign In Form */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Sign In</h1>
          <input
            type="text"
            placeholder="Email or Phone Number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea]"
            required
          />
          <button
            onClick={handleSignIn}
            className="w-full p-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg hover:from-[#764ba2] hover:to-[#667eea] transition-all"
          >
            Sign In
          </button>
          <p className="text-center text-[#667eea] underline cursor-pointer">
            <NavLink to="/signup">Don't have an account? Sign Up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
