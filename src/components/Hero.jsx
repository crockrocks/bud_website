// src/components/Hero.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, -50]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div id='home'  className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 dark:bg-green-800/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 dark:bg-green-800/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-green-100 dark:bg-green-900/20 rounded-full blur-2xl opacity-30" />
            </div>

            <div className="relative min-h-screen container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
                    {/* Left side - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 space-y-8"
                    >
                        <motion.div
                            style={{
                                x: cursorPosition.x * -0.5,
                                y: cursorPosition.y * -0.5,
                            }}
                            className="space-y-6"
                        >
                            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-green-700 dark:text-green-400 leading-tight">
                                Welcome to <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                                    BUD
                                </span>
                            </h1>

                            <p className="text-2xl lg:text-3xl text-gray-600 dark:text-gray-300">
                                Your personal AI Friend
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        document.getElementById('characters').scrollIntoView({
                                            behavior: 'smooth'
                                        });
                                    }}
                                    className="px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Get Started
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        document.getElementById('introduction').scrollIntoView({
                                            behavior: 'smooth'
                                        });
                                    }}
                                    className="px-8 py-4 text-lg font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
                                >
                                    Learn More
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Feature Points */}
                        <div className="grid grid-cols-2 gap-6 mt-12">
                            {[
                                { title: '24/7 Support', desc: 'Always here to help' },
                                { title: 'Smart AI', desc: 'Powered by latest tech' },
                                { title: 'Personalized', desc: 'Tailored to you' },
                                { title: 'Secure', desc: 'Your data is safe' }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                                >
                                    <h3 className="font-semibold text-green-700 dark:text-green-400">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right side - Character Group Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center items-center"
                    >
                        <motion.div
                            className="relative w-full max-w-[600px]"
                            animate={{
                                y: [0, -12, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <img
                                src="/images/hero.png"
                                alt="BUD Characters Group"
                                className="w-full h-auto object-contain transform-gpu"
                            />

                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-300/10 rounded-full blur-3xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Hero;