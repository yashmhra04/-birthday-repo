import React from 'react';
import { motion } from 'framer-motion';

const PixelButton = ({ children, onClick, className = "", ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 2 }}
      onClick={onClick}
      className={`bg-[var(--white)] text-[var(--text-dark)] font-['Jersey_25'] text-2xl tracking-wider py-3 px-6 pixel-border pixel-shadow transition-colors hover:bg-[var(--pink-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--pink-grid)] ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default PixelButton;
