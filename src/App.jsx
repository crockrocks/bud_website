import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import CharactersPage from './components/CharactersPage';
import ChatInterface from './components/ChatInterface';
import PersonalityQuestionnaire from './components/PersonalityQuestionnaire';
import Login from './components/auth/login';
import Signup from './components/auth/register';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Introduction />
                <CharactersPage />
              </>
            }
          />
          <Route 
            path="/personality-test" 
            element={<PersonalityQuestionnaire />} 
          />
          <Route 
            path="/chat/:character" 
            element={<ChatInterface />} 
          />
          <Route
            path = "/login"
            element={<Login />}
          />
          <Route
            path = "/signup"
            element={<Signup />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;