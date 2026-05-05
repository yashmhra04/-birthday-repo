import React from 'react';
import PixelBackground from '../components/PixelBackground';
import og from '../assets/pictures/og.webp';

const OGCaptureScreen = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4">
      <PixelBackground />

      <div className="pixel-card w-full max-w-3xl p-8 md:p-12 flex flex-col items-center text-center z-10 shadow-xl">
        <h1 className="text-6xl md:text-8xl font-['Jersey_25'] text-[var(--pink-dark)] mb-8 drop-shadow-sm">
          Happy Birthday Lucky
        </h1>

        <div className="w-full aspect-[16/9] bg-[var(--pink-soft)] pixel-border mb-8 overflow-hidden flex items-center justify-center">
          <img
            src={og}
            alt="Lucky"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23ffeaf3'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='14' text-anchor='middle' alignment-baseline='middle' fill='%23d94f95'%3EImage Placement%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        <p className="text-4xl md:text-5xl font-['Jersey_25'] text-[var(--text-dark)] mb-8">
          May 7, 2026
        </p>

        <div className="bg-[var(--pink-dark)] text-white px-10 py-4 pixel-border text-3xl font-['Jersey_25']">
          Click for surprise
        </div>
      </div>
    </div>
  );
};

export default OGCaptureScreen;
