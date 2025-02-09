import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./contexts/authContext/authContext";  // Ensure this is correctly imported

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);