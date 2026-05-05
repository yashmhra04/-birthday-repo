import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepShell from '../components/StepShell';
import PixelButton from '../components/PixelButton';
import PolaroidCard from '../components/PolaroidCard';
import step1 from '../assets/pictures/step1.jpeg';
const options = [
  { id: 'cake', label: '🎂 Cake', isCorrect: false },
  { id: 'balloon', label: '🎈 Balloon', isCorrect: false },
  { id: 'gift', label: '🎁 Gift box', isCorrect: true },
  { id: 'potato', label: '🥔 Dramatic potato', isCorrect: false },
];

const StepOneBirthdayGate = ({ onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handleSelect = (option) => {
    if (unlocked) return;

    setSelected(option.id);

    if (option.isCorrect) {
      setMessage('Gate unlocked. Lucky has entered birthday mode.');
      setTimeout(() => setUnlocked(true), 1000);
    } else {
      const wrongMessages = [
        "Incorrect, but your confidence was inspiring.",
        "Nice try, but that object is emotionally unprepared for this responsibility.",
        "That was bold. Incorrect, but bold."
      ];
      setMessage(wrongMessages[Math.floor(Math.random() * wrongMessages.length)]);
    }
  };

  return (
    <StepShell
      title="Step 1: Unlock the Birthday Gate"
      instruction={unlocked ? "" : "To enter your birthday world, choose the object with the strongest birthday energy. Only one can open the gate."}
    >
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full"
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              {options.map((opt) => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(opt)}
                  className={`p-4 pixel-border font-['Jersey_25'] text-xl md:text-2xl transition-colors ${selected === opt.id
                    ? opt.isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                    : 'bg-[var(--white)] hover:bg-[var(--pink-soft)]'
                    }`}
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>

            <div className="h-16 flex items-center justify-center">
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={message}
                  className={`font-['Jersey_25'] text-xl ${selected === 'gift' ? 'text-green-600' : 'text-[var(--pink-dark)]'}`}
                >
                  {message}
                </motion.p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <PolaroidCard
              src={step1}
              caption="Birthday Gate Approved"
              rotation={-3}
              className="w-64 md:w-80 mb-8"
            />
            <p className="font-['Jersey_25'] text-xl md:text-2xl text-[var(--text-dark)] leading-relaxed mb-8 max-w-lg">
              Lucky, today is officially your day.<br /><br />
              The world has agreed to be slightly nicer, the cake has agreed to be sweeter, and everyone has been instructed to treat you like the main character.
            </p>

            <PixelButton onClick={onComplete}>
              Continue to Memories
            </PixelButton>
          </motion.div>
        )}
      </AnimatePresence>
    </StepShell>
  );
};

export default StepOneBirthdayGate;
