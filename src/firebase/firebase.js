// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsrI8SPKQocUZwusHsYtk1XHUZ5IKyKaM",
  authDomain: "bud-chatbot.firebaseapp.com",
  projectId: "bud-chatbot",
  storageBucket: "bud-chatbot.appspot.com",  // ✅ Fixed
  messagingSenderId: "292584501186",
  appId: "1:292584501186:web:b766035a75acc83d2ef05b",
  measurementId: "G-PG6M4SVKF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
