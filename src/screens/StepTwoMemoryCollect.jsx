import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepShell from '../components/StepShell';
import PixelButton from '../components/PixelButton';
import PolaroidCard from '../components/PolaroidCard';
import { stepTwoMemories } from '../data/stepTwoMemories';

const initialPolaroids = stepTwoMemories.map(mem => ({
  ...mem,
  collected: false
}));

const StepTwoMemoryCollect = ({ onComplete }) => {
  const [polaroids, setPolaroids] = useState(initialPolaroids);
  const [activeMessage, setActiveMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCollect = (id, message) => {
    setPolaroids(prev => prev.map(p => p.id === id ? { ...p, collected: true } : p));
    setActiveMessage(message);
  };

  const allCollected = polaroids.every(p => p.collected);

  useEffect(() => {
    if (allCollected) {
      const timer = setTimeout(() => {
        setShowSuccess(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [allCollected]);

  return (
    <StepShell 
      title="Step 2: Collect the Memories" 
      instruction={showSuccess ? "" : "Click the floating polaroids and save them in the birthday box. Each one contains proof that you are unforgettable."}
    >
      {!showSuccess ? (
        <div className="relative w-full h-[500px] md:h-[600px] flex flex-col items-center">
          {/* Box */}
          <div className="absolute bottom-0 flex flex-col items-center">
            <div className="w-32 h-24 bg-[var(--pink-dark)] pixel-border pixel-shadow flex items-center justify-center z-20">
               <span className="font-['Jersey_25'] text-white text-xl">BOX</span>
            </div>
            <p className="font-['Jersey_25'] text-[var(--text-dark)] mt-2">Drop memories here</p>
          </div>

          {/* Polaroids */}
          <AnimatePresence>
            {polaroids.map((p, i) => !p.collected && (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -15, 0],
                  x: [0, i % 2 === 0 ? 10 : -10, 0]
                }}
                exit={{ 
                  y: 300, 
                  x: 0, 
                  scale: 0.3, 
                  opacity: 0,
                  transition: { duration: 0.6 }
                }}
                transition={{ 
                  y: { repeat: Infinity, duration: 3 + (i * 0.5), ease: "easeInOut" },
                  x: { repeat: Infinity, duration: 4 + (i * 0.5), ease: "easeInOut" }
                }}
                className={`absolute z-30 ${
                  i === 0 ? 'top-10 left-2 md:left-10' : 
                  i === 1 ? 'top-4 right-2 md:right-10' : 
                  i === 2 ? 'top-1/4 left-1/2 -translate-x-1/2' :
                  i === 3 ? 'top-1/3 left-4 md:left-20' :
                  i === 4 ? 'top-1/3 right-4 md:right-20' :
                  'top-[40%] left-1/2 -translate-x-1/2'
                }`}
              >
                <PolaroidCard 
                  src={p.src} 
                  caption={p.caption} 
                  rotation={i * 7 - 14}
                  interactive={true}
                  priority={true}
                  onClick={() => handleCollect(p.id, p.caption)}
                  className="w-48 md:w-64 transform-none"
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Message Area */}
          <div className="absolute top-0 w-full h-12 flex justify-center items-center">
            <AnimatePresence mode="wait">
              {activeMessage && (
                <motion.p
                  key={activeMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-['Jersey_25'] text-xl text-[var(--pink-dark)] bg-white px-4 py-2 pixel-border z-40"
                >
                  {activeMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <h3 className="text-3xl font-['Jersey_25'] text-[var(--pink-dark)] mb-4">
            All memories collected.
          </h3>
          <p className="text-xl font-['Jersey_25'] text-[var(--text-dark)] mb-6 text-center">
            The birthday archive is now emotionally unstable.
          </p>

          <div className="pixel-card p-6 mb-8 text-center max-w-lg">
            <p className="font-['Jersey_25'] text-xl md:text-2xl text-[var(--text-dark)] leading-relaxed">
              Some people make memories.<br />
              Some people become the memory.<br /><br />
              You, Lucky, are clearly the second type.<br />
              The kind of person who somehow makes ordinary moments feel funnier, warmer, and worth remembering.
            </p>
          </div>

          <PixelButton onClick={onComplete}>
            Go to next surprise
          </PixelButton>
        </motion.div>
      )}
    </StepShell>
  );
};

export default StepTwoMemoryCollect;
