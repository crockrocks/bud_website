import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import CharactersPage from './components/CharactersPage';
import ChatInterface from './components/ChatInterface';
import PersonalityQuestionnaire from './components/PersonalityQuestionnaire';
import Login from './components/auth/login';
import Signup from './components/auth/register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Hero />
                  <Introduction />
                  <CharactersPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/personality-test"
            element={
              <ProtectedRoute>
                <PersonalityQuestionnaire />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:character"
            element={
              <ProtectedRoute>
                <ChatInterface />
              </ProtectedRoute>
            }
          />

          {/* Catch all other routes and redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;