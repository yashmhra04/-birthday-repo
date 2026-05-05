import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const loadingTexts = [
  "Loading Lucky's birthday quest...",
  "Adding cake...",
  "Hiding embarrassing memories...",
  "Polishing the polaroids...",
  "Preparing birthday magic...",
  "Ready."
];

const PixelLoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + Math.floor(Math.random() * 5) + 1;
        
        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        
        return nextProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const newTextIndex = Math.floor((progress / 100) * (loadingTexts.length - 1));
    setTextIndex(newTextIndex);
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen z-50">
      <div className="w-64 md:w-96 text-center">
        <h2 className="font-['Jersey_25'] text-2xl md:text-3xl text-[var(--pink-dark)] mb-10 h-8 drop-shadow-sm">
          {loadingTexts[textIndex]}
        </h2>
        
        <div className="pixel-border bg-white mt-4 p-2">
          <div className="h-6 w-full bg-[var(--pink-soft)] relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[var(--pink-dark)]"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </div>
        
        <p className="font-['Jersey_25'] text-xl text-[var(--pink-dark)] mt-4">
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default PixelLoadingScreen;
