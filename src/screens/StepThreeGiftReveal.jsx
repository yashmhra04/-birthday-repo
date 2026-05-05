import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepShell from '../components/StepShell';
import PixelButton from '../components/PixelButton';

const StepThreeGiftReveal = ({ onComplete }) => {
  const [taps, setTaps] = useState(0);
  const maxTaps = 4;

  const messages = [
    "",
    "The gift is thinking about it.",
    "It says you need more birthday authority.",
    "Almost there. The box is emotionally opening up.",
    "Unlocked."
  ];

  const handleTap = () => {
    if (taps < maxTaps) {
      setTaps(prev => prev + 1);
    }
  };

  return (
    <StepShell 
      title="Step 3: Open the Final Surprise" 
      instruction={taps < maxTaps ? "Tap the gift box until it gives up and reveals your surprise." : ""}
    >
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`box-${taps}`}
            onClick={handleTap}
            whileHover={taps < maxTaps ? { scale: 1.05 } : {}}
            whileTap={taps < maxTaps ? { scale: 0.95 } : {}}
            animate={
              taps === 1 ? { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } } :
              taps === 2 ? { rotate: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } } :
              taps === 3 ? { scale: [1, 1.1, 1], filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] } :
              {}
            }
            className={`relative w-48 h-48 cursor-pointer flex items-center justify-center ${taps === maxTaps ? 'cursor-default' : ''}`}
          >
            {taps < maxTaps ? (
              <div className="text-8xl">🎁</div>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl"
              >
                🎉
              </motion.div>
            )}

            {/* Sparkles on tap 3 */}
            {taps === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="absolute top-0 left-0 text-2xl">✨</span>
                <span className="absolute top-0 right-0 text-2xl">✨</span>
                <span className="absolute bottom-0 left-0 text-2xl">✨</span>
                <span className="absolute bottom-0 right-0 text-2xl">✨</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="h-16 flex items-center mt-6">
          <motion.p
            key={`msg-${taps}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-['Jersey_25'] text-2xl ${taps === maxTaps ? 'text-green-600' : 'text-[var(--pink-dark)]'}`}
          >
            {messages[taps]}
          </motion.p>
        </div>

        <AnimatePresence>
          {taps === maxTaps && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <PixelButton onClick={onComplete}>
                Reveal Birthday Wish
              </PixelButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StepShell>
  );
};

export default StepThreeGiftReveal;
