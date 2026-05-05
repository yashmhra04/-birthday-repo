import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import PixelButton from '../components/PixelButton';
import PolaroidCard from '../components/PolaroidCard';
import { finalWishMemories } from '../data/finalWishMemories';

const FinalWishScreen = ({ onReplay }) => {
  useEffect(() => {
    // Fire confetti on load
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffd6e8', '#f2a6c8', '#d94f95', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffd6e8', '#f2a6c8', '#d94f95', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center w-full max-w-5xl px-4 py-12 z-10 min-h-screen overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="pixel-card w-full p-6 md:p-12 flex flex-col items-center"
      >
        <h1 className="text-5xl md:text-7xl font-['Jersey_25'] text-[var(--pink-dark)] mb-2 text-center drop-shadow-md">
          Happy Birthday, Lucky
        </h1>
        <p className="text-xl md:text-2xl font-['Jersey_25'] text-[var(--text-dark)] mb-8 text-center opacity-80">
          May 7, 2026
        </p>

        {/* Collage */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {finalWishMemories.map((mem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: (index % 2 === 0 ? 1 : -1) * (Math.random() * 6 + 2) }}
              transition={{ delay: 0.5 + index * 0.2 }}
            >
              <PolaroidCard 
                src={mem.src} 
                caption={mem.caption} 
                priority={true}
                className="w-64 md:w-80"
              />
            </motion.div>
          ))}
        </div>

        {/* Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="max-w-2xl text-center font-['Jersey_25'] text-xl md:text-3xl text-[var(--text-dark)] leading-relaxed space-y-6 mb-12"
        >
          <p>
            I hope this year brings you the kind of happiness that shows up in small moments: random laughs, peaceful days, good food, better memories, and people who genuinely make life feel lighter.
          </p>
          <p>
            You deserve a birthday that feels warm, fun, and a little bit magical.
          </p>
          <p>
            So here is your tiny digital birthday world, made just to remind you that you are appreciated, celebrated, and very much worth making a whole website for.
          </p>
          <p className="text-2xl md:text-4xl text-[var(--pink-dark)] mt-8">
            Happy Birthday, Lucky.<br/>
            May 7, 2026 is officially yours.
          </p>
          <p className="text-lg md:text-xl italic opacity-75 mt-8 border-t-2 border-[var(--pink-grid)] pt-6">
            P.S. This website has confirmed that you are 97% cute, 3% dramatic, and 100% birthday-worthy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <PixelButton onClick={onReplay}>
            Replay Quest
          </PixelButton>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default FinalWishScreen;
