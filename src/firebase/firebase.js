import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsrI8SPKQocUZwusHsYtk1XHUZ5IKyKaM",
  authDomain: "bud-chatbot.firebaseapp.com",
  projectId: "bud-chatbot",
  storageBucket: "bud-chatbot.firebasestorage.app",
  messagingSenderId: "292584501186",
  appId: "1:292584501186:web:b766035a75acc83d2ef05b",
  measurementId: "G-PG6M4SVKF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)

export { app, auth};