import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepShell from '../components/StepShell';
import PixelButton from '../components/PixelButton';
import dobermanImg from '../assets/pictures/doberman.png';

const StepFeedDog = ({ onComplete }) => {
  const [fed, setFed] = useState(false);
  const [dogJumping, setDogJumping] = useState(false);

  const handleFeed = () => {
    setDogJumping(true);
    setTimeout(() => {
      setFed(true);
      setDogJumping(false);
    }, 1000);
  };

  return (
    <StepShell 
      title="Step 3: A Familiar Friend" 
      instruction={fed ? "" : "Tap the treat to feed the pixel Doberman!"}
    >
      <div className="flex flex-col items-center min-h-[400px] md:min-h-[500px] justify-center relative w-full">
        
        {/* Dog Container */}
        <div className="relative flex justify-center mb-12">
          <motion.img 
            src={dobermanImg} 
            alt="Pixel Doberman" 
            animate={dogJumping ? {
              y: [0, -30, 0, -20, 0],
              transition: { duration: 0.5 }
            } : fed ? {
              y: [0, -5, 0],
              transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            } : {
              scale: [1, 1.02, 1],
              transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            className="w-48 h-48 md:w-64 md:h-64 object-contain pixelated z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Hearts after fed */}
          <AnimatePresence>
            {fed && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`heart-${i}`}
                    initial={{ opacity: 0, y: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      y: -100 - Math.random() * 50,
                      x: (Math.random() - 0.5) * 100,
                      scale: [0, 1.5, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatDelay: Math.random() * 2,
                      delay: Math.random()
                    }}
                    className="absolute top-10 text-3xl z-0"
                  >
                    ❤️
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Bone / Interaction */}
        {!fed && !dogJumping && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{ y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
            className="cursor-pointer"
            onClick={handleFeed}
          >
            <div className="text-6xl hover:scale-110 transition-transform active:scale-95 drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)]">
              🦴
            </div>
            <p className="font-['Jersey_25'] text-[var(--pink-dark)] mt-4 text-xl text-center">Feed me!</p>
          </motion.div>
        )}

        {/* Success State */}
        <AnimatePresence>
          {fed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center mt-4"
            >
              <div className="pixel-card p-6 mb-8 text-center max-w-lg">
                <p className="font-['Jersey_25'] text-xl md:text-2xl text-[var(--text-dark)] leading-relaxed">
                  To the girl who already has a Doberman-sized space in her heart<br/>
                  May this little pixel pup keep you company until the day your own four-legged Doberman comes home with your hard-earned success which you've been waiting for..
                </p>
              </div>

              <PixelButton onClick={onComplete}>
                Continue Quest
              </PixelButton>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </StepShell>
  );
};

export default StepFeedDog;
