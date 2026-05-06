import React from 'react';
import { motion } from 'framer-motion';
import PixelButton from '../components/PixelButton';

const EntryScreen = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 text-center z-10 max-w-2xl"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="text-5xl md:text-7xl font-['Jersey_25'] text-[var(--pink-dark)] mb-6 tracking-wide"
        style={{
          textShadow:
            '0 0 12px rgba(255,255,255,0.95), 0 0 22px rgba(255,255,255,0.85), 0 0 36px rgba(255,255,255,0.6), 2px 3px 0 rgba(92,36,64,0.25)'
        }}
      >
        Lucky's Birthday Quest
      </motion.h1>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pixel-card p-6 md:p-8 mb-8"
      >
        <p className="text-2xl font-['Jersey_25'] text-[var(--text-dark)] mb-4">
          A tiny pink pixel world has been created just for you.
        </p>
        <p className="text-xl font-['Jersey_25'] text-[var(--text-dark)] leading-relaxed">
          It contains memories, jokes, tiny tasks, and absolutely no escape button.<br />
          Your mission is simple:<br />
          smile at least once before the final screen.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <PixelButton onClick={onStart}>
          Start the Surprise
        </PixelButton>
      </motion.div>
    </motion.div>
  );
};

export default EntryScreen;
