import React from 'react';
import { motion } from 'framer-motion';

const PixelBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[var(--pink-bg)] pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0 w-[200%] h-full opacity-30"
        style={{
          backgroundImage: 'linear-gradient(var(--pink-grid) 2px, transparent 2px), linear-gradient(90deg, var(--pink-grid) 2px, transparent 2px)',
          backgroundSize: '40px 40px',
        }}
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 20
        }}
      />
    </div>
  );
};

export default PixelBackground;
