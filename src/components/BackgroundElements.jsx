import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BackgroundElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const elements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    baseSize: Math.random() * 30 + 10,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          initial={{
            x: `${element.initialX}%`,
            y: `${element.initialY}%`,
            opacity: 0.3,
          }}
          animate={{
            x: `${element.initialX + (mousePosition.x / window.innerWidth - 0.5) * 20}%`,
            y: `${element.initialY + (mousePosition.y / window.innerHeight - 0.5) * 20}%`,
            rotate: mousePosition.x * 0.05,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20
          }}
        >
          <div 
            className={`
              rounded-full blur-xl
              dark:bg-green-600/10 bg-green-400/20
              animate-pulse
            `}
            style={{
              width: element.baseSize,
              height: element.baseSize,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundElements;