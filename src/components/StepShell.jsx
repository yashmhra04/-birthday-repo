import React from 'react';
import { motion } from 'framer-motion';

const StepShell = ({ children, title, instruction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full max-w-4xl w-full"
    >
      <div className="pixel-card w-full max-w-2xl p-6 md:p-10 flex flex-col items-center text-center">
        {title && (
          <h2 className="text-4xl md:text-5xl font-['Jersey_25'] text-[var(--pink-dark)] mb-4 drop-shadow-sm">
            {title}
          </h2>
        )}
        {instruction && (
          <p className="text-xl md:text-2xl font-['Jersey_25'] text-[var(--text-dark)] mb-8 tracking-wide">
            {instruction}
          </p>
        )}
        
        <div className="w-full flex flex-col items-center">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default StepShell;
