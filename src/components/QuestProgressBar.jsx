import React from 'react';
import { motion } from 'framer-motion';

const QuestProgressBar = ({ progress }) => {
  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <div className="w-full pixel-border bg-white p-1">
        <div className="h-4 w-full bg-[var(--pink-soft)] relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[var(--pink-dark)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="text-center text-sm font-['Jersey_25'] tracking-widest text-[var(--pink-dark)] mt-1 drop-shadow-sm bg-[var(--white)] pixel-border px-2 inline-block">
        QUEST PROGRESS: {Math.round(progress)}%
      </div>
    </div>
  );
};

export default QuestProgressBar;
