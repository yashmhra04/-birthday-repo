import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { floatingObjects } from '../data/floatingObjects';

const FloatingCornerObjects = () => {
  const [activeObjects, setActiveObjects] = useState([]);

  useEffect(() => {
    // Generate objects at random intervals
    const generateObject = () => {
      if (floatingObjects.length === 0) return;

      const randomObj = floatingObjects[Math.floor(Math.random() * floatingObjects.length)];
      const corners = [
        { x: -50, y: -50, originX: 0, originY: 0 }, // Top left
        { x: window.innerWidth + 50, y: -50, originX: 1, originY: 0 }, // Top right
        { x: -50, y: window.innerHeight + 50, originX: 0, originY: 1 }, // Bottom left
        { x: window.innerWidth + 50, y: window.innerHeight + 50, originX: 1, originY: 1 } // Bottom right
      ];
      
      const randomCorner = corners[Math.floor(Math.random() * corners.length)];
      
      const newObj = {
        id: Date.now() + Math.random(),
        src: randomObj,
        startX: randomCorner.originX === 0 ? -50 : window.innerWidth + 50,
        startY: randomCorner.originY === 0 ? -50 : window.innerHeight + 50,
        endX: randomCorner.originX === 0 ? 100 + Math.random() * 200 : window.innerWidth - 100 - Math.random() * 200,
        endY: randomCorner.originY === 0 ? 100 + Math.random() * 200 : window.innerHeight - 100 - Math.random() * 200,
        rotation: Math.random() * 180 - 90
      };

      setActiveObjects((prev) => [...prev, newObj]);

      // Remove after animation
      setTimeout(() => {
        setActiveObjects((prev) => prev.filter(obj => obj.id !== newObj.id));
      }, 7000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.1) { // 90% chance to spawn, much more frequent
        generateObject();
      }
    }, 1500); // Check every 1.5s instead of 3s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {activeObjects.map((obj) => (
          <motion.img
            key={obj.id}
            src={obj}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            initial={{ x: obj.startX, y: obj.startY, opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{ 
              x: [obj.startX, obj.endX, obj.endX + (Math.random() * 50 - 25), obj.startX],
              y: [obj.startY, obj.endY, obj.endY + (Math.random() * 50 - 25), obj.startY],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.5, 1.5, 0.5],
              rotate: [0, obj.rotation, obj.rotation + 20, obj.rotation * -1]
            }}
            transition={{ duration: 7, ease: "easeInOut" }}
            className="absolute w-24 h-24 md:w-32 md:h-32 object-contain filter drop-shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='80' text-anchor='middle' alignment-baseline='middle'%3E✨%3C/text%3E%3C/svg%3E";
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingCornerObjects;
