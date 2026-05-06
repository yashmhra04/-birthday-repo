import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { floatingObjects } from '../data/floatingObjects';

const PixelIconScatter = ({ count = 22 }) => {
  const icons = useMemo(() => {
    if (floatingObjects.length === 0) return [];

    return Array.from({ length: count }, (_, i) => {
      const src = floatingObjects[Math.floor(Math.random() * floatingObjects.length)];
      return {
        id: i,
        src,
        top: Math.random() * 92 + 2,
        left: Math.random() * 94 + 2,
        size: 36 + Math.floor(Math.random() * 36),
        rotate: Math.round(Math.random() * 30 - 15),
        delay: Math.random() * 2,
        duration: 1.6 + Math.random() * 1.4,
        bounce: 6 + Math.random() * 10,
        opacity: 0.7 + Math.random() * 0.3
      };
    });
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {icons.map((icon) => (
        <motion.img
          key={icon.id}
          src={icon.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute object-contain"
          style={{
            top: `${icon.top}%`,
            left: `${icon.left}%`,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
            opacity: icon.opacity,
            imageRendering: 'pixelated',
            filter: 'drop-shadow(2px 2px 0 rgba(92, 36, 64, 0.35))'
          }}
          initial={{ y: 0, rotate: icon.rotate }}
          animate={{ y: [0, -icon.bounce, 0], rotate: icon.rotate }}
          transition={{
            duration: icon.duration,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: icon.delay
          }}
        />
      ))}
    </div>
  );
};

export default PixelIconScatter;
