import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import PixelBackground from './components/PixelBackground';
import FloatingCornerObjects from './components/FloatingCornerObjects';
import QuestProgressBar from './components/QuestProgressBar';
import PixelLoadingScreen from './components/PixelLoadingScreen';
import EntryScreen from './screens/EntryScreen';
import StepOneBirthdayGate from './screens/StepOneBirthdayGate';
import StepTwoMemoryCollect from './screens/StepTwoMemoryCollect';
import StepThreeGiftReveal from './screens/StepThreeGiftReveal';
import FinalWishScreen from './screens/FinalWishScreen';
import OGCaptureScreen from './screens/OGCaptureScreen';
import { preloadImages } from './utils/preload';
import { floatingObjects } from './data/floatingObjects';
import { stepTwoMemories } from './data/stepTwoMemories';
import { finalWishMemories } from './data/finalWishMemories';
import step1 from './assets/pictures/step1.webp';
import og from './assets/pictures/og.webp';

const SCREENS = {
  LOADING: 'loading',
  ENTRY: 'entry',
  STEP1: 'step-1',
  STEP2: 'step-2',
  STEP3: 'step-3',
  FINAL: 'final'
};

const getProgress = (screen) => {
  switch(screen) {
    case SCREENS.LOADING: return 0;
    case SCREENS.ENTRY: return 0;
    case SCREENS.STEP1: return 0;
    case SCREENS.STEP2: return 33;
    case SCREENS.STEP3: return 66;
    case SCREENS.FINAL: return 100;
    default: return 0;
  }
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LOADING);

  useEffect(() => {
    // Passively preload all images so they are in browser cache
    const allImages = [
      step1,
      og,
      ...floatingObjects,
      ...stepTwoMemories.map(m => m.src),
      ...finalWishMemories.map(m => m.src)
    ];
    preloadImages(allImages).catch(() => {}); // ignore preload errors
  }, []);

  const handleLoadingComplete = () => setCurrentScreen(SCREENS.ENTRY);
  const handleEntryComplete = () => setCurrentScreen(SCREENS.STEP1);
  const handleStep1Complete = () => setCurrentScreen(SCREENS.STEP2);
  const handleStep2Complete = () => setCurrentScreen(SCREENS.STEP3);
  const handleStep3Complete = () => setCurrentScreen(SCREENS.FINAL);
  const handleReplay = () => setCurrentScreen(SCREENS.ENTRY);

  if (window.location.pathname === '/lucky') {
    return <OGCaptureScreen />;
  }

  const showProgress = currentScreen !== SCREENS.LOADING && currentScreen !== SCREENS.FINAL;

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <PixelBackground />
      
      <div className="flex flex-col min-h-screen w-full items-center z-10">
        {showProgress && (
          <div className="w-full flex justify-center pt-8 pb-4 shrink-0">
            <QuestProgressBar progress={getProgress(currentScreen)} />
          </div>
        )}

        <div className="flex-1 w-full flex flex-col items-center justify-center py-8 px-4">
          <AnimatePresence mode="wait">
            {currentScreen === SCREENS.LOADING && (
              <PixelLoadingScreen key="loading" onComplete={handleLoadingComplete} />
            )}
            
            {currentScreen === SCREENS.ENTRY && (
              <EntryScreen key="entry" onStart={handleEntryComplete} />
            )}
            
            {currentScreen === SCREENS.STEP1 && (
              <StepOneBirthdayGate key="step1" onComplete={handleStep1Complete} />
            )}
            
            {currentScreen === SCREENS.STEP2 && (
              <StepTwoMemoryCollect key="step2" onComplete={handleStep2Complete} />
            )}
            
            {currentScreen === SCREENS.STEP3 && (
              <StepThreeGiftReveal key="step3" onComplete={handleStep3Complete} />
            )}
            
            {currentScreen === SCREENS.FINAL && (
              <FinalWishScreen key="final" onReplay={handleReplay} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;