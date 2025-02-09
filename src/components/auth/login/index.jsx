import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { useAuth } from '../../../contexts/authContext/authContext';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../../firebase/auth";

function Login() {
  const { user, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user || userLoggedIn) {
      console.log("User detected, redirecting...");
      navigate('/', { replace: true });
    }
  }, [user, userLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage("");

    try {
      const result = await doSignInWithEmailAndPassword(formData.email, formData.password);
      console.log("Login successful", result);
      // The redirect will happen automatically through the useEffect
    } catch (error) {
      console.error("Login error", error);
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMessage("No account found with this email");
          break;
        case 'auth/wrong-password':
          setErrorMessage("Incorrect password");
          break;
        case 'auth/invalid-email':
          setErrorMessage("Invalid email address");
          break;
        case 'auth/too-many-requests':
          setErrorMessage("Too many failed attempts. Please try again later");
          break;
        default:
          setErrorMessage("An error occurred during login. Please try again");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage("");

    try {
      const result = await doSignInWithGoogle();
      console.log("Google login successful", result);
      // The redirect will happen automatically through the useEffect
    } catch (error) {
      console.error("Google login error", error);
      setErrorMessage("Failed to login with Google. Please try again");
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Login</h2>
        
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={isSigningIn}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={isSigningIn}
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-center font-medium py-2">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSigningIn}
            className={`w-full bg-green-500 text-white py-3 rounded-lg transition-all duration-200
              ${isSigningIn 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:bg-green-600 active:bg-green-700'}`}
          >
            {isSigningIn ? 'Logging in...' : 'Login'}
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-300 dark:border-gray-700 w-full"></div>
            <span className="bg-white dark:bg-gray-800 px-4 text-sm text-gray-500">or</span>
            <div className="border-t border-gray-300 dark:border-gray-700 w-full"></div>
          </div>

          <button
            type="button"
            disabled={isSigningIn}
            className={`w-full flex items-center justify-center bg-red-500 text-white py-3 rounded-lg transition-all duration-200
              ${isSigningIn 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:bg-red-600 active:bg-red-700'}`}
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="mr-2" />
            {isSigningIn ? 'Signing in...' : 'Continue with Google'}
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigate("/signup")}
            disabled={isSigningIn}
            className="text-green-500 hover:text-green-600 font-medium focus:outline-none"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;