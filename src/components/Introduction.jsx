import { motion } from 'framer-motion';
import { ArrowDown, MessageSquare, Mail } from 'lucide-react';

function Introduction() {
  const scrollToCharacters = () => {
    document.getElementById('characters')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      {/* Introduction Section */}
      <section id='introduction' className=" pt-20 pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-green-700 dark:text-green-400 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
              Meet Your AI Companion
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
              BUD is more than just an AI – it's your personal companion designed to understand, assist, and grow with you. Using cutting-edge artificial intelligence, BUD offers a unique blend of emotional intelligence and practical problem-solving capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 text-center mb-12"
          >
            Key Features
          </motion.h2>
          

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Personal AI Companion Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 dark:border-green-900"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-green-100 dark:bg-green-900/50 rounded-full overflow-hidden">
                <img
                  src="/images/bud.png"
                  alt="BUD mascot"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4 text-center">
                Your Personal AI Companion
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                BUD is here for you, ready to assist with whatever you need. From simple 
                questions to deeper conversations, BUD is designed to be a helpful friend, 
                available whenever you need.
              </p>
            </motion.div>

            {/* Explore Characters Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 dark:border-green-900"
            >
              <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4 text-center">
                Explore Our Characters
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                Check out our characters below to see how BUD can bring your favorite 
                personalities to life, making interactions both fun and meaningful.
              </p>
              <motion.button
                onClick={scrollToCharacters}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-colors shadow-lg"
              >
                <ArrowDown size={24} />
              </motion.button>
            </motion.div>

            {/* Ongoing Research Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 dark:border-green-900"
            >
              <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4 text-center">
                Ongoing Research
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                We are continuously working to enhance BUD's capabilities. Our research 
                focuses on improving the emotional intelligence of language models and 
                developing AI that truly understands and cares about your well-being.
              </p>
              <div className="flex justify-center space-x-6">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-green-600 hover:text-green-700 transition-colors"
                  aria-label="Discord"
                >
                  <MessageSquare size={28} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-green-600 hover:text-green-700 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={28} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Introduction ;