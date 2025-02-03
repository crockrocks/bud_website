// src/pages/Signup.js
import { useState } from "react";
import { auth } from "../../../firebase/firebase";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import {useAuth} from '../../../contexts/authContext';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigate("/personality-test");
    } catch (error) {
      console.error("Signup error", error);
    }
  };

  const handleGoogleSignup = async (e) => {
    e.preventDefault()
    try {
      await doSignInWithGoogle();
      navigate("/personality-test");
    } catch (error) {
      console.error("Google signup error", error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 dark:from-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="mt-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-7 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
              required
            />
          </div>
          <div className="relative mt-2">
            <FaLock className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 mt-4"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center bg-red-500 text-white py-3 rounded-lg hover:bg-red-700 mt-2"
            onClick={handleGoogleSignup}
          >
            <FaGoogle className="mr-2" /> Continue with Google
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account? <span onClick={() => navigate("/login")} className="text-green-500 cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
