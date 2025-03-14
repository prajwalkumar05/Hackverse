import { useNavigate } from "react-router-dom";

const Login = ({ toggleForm }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication
    navigate("/"); // Redirect to Home
  };

  return (
    <div className="form-container sign-in active w-full max-w-sm">
      <form className="bg-white p-6 rounded-lg shadow-md text-center" onSubmit={handleLogin}>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h1>
        <input type="text" placeholder="Email or Phone Number" required className="w-full p-2 border border-gray-300 rounded-md mb-3" />
        <input type="password" placeholder="Password" required className="w-full p-2 border border-gray-300 rounded-md mb-3" />
        <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-md hover:opacity-90">
          Sign In
        </button>
        <p className="mt-4 text-blue-500 cursor-pointer switch" onClick={toggleForm}>
          Don't have an account? Sign Up
        </p>
      </form>
    </div>
  );
};

export default Login;
