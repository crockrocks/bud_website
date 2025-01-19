import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';

function Navbar({ darkMode, setDarkMode }) {
  const scrollToHome = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToIntroduction = () => {
    document.getElementById('introduction')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCharacters = () => {
    document.getElementById('characters')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">BUD</span>
          </motion.div>

          <div className="flex items-center space-x-4">
            {/* Scroll to Sections Buttons */}
            <div className="flex space-x-4">
              <motion.button
                onClick={scrollToHome}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-lg font-semibold text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
              >
                Home
              </motion.button>
              <motion.button
                onClick={scrollToIntroduction}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-lg font-semibold text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
              >
                Introduction
              </motion.button>
              <motion.button
                onClick={scrollToCharacters}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-lg font-semibold text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
              >
                Characters
              </motion.button>
            </div>

            {/* Dark Mode Switch */}
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${
                darkMode ? 'bg-green-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className={`${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
