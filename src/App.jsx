import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import CharactersPage from './components/CharactersPage';
import ChatInterface from './components/ChatInterface';

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
            path="/chat/:character" 
            element={<ChatInterface />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;