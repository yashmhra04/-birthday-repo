import React from 'react';
import { motion } from 'framer-motion';

const PolaroidCard = ({ src, caption, rotation = 0, onClick, interactive = false, className = "" }) => {
  return (
    <motion.div
      whileHover={interactive ? { scale: 1.05, y: -10, rotate: 0, zIndex: 10 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
      onClick={onClick}
      initial={{ rotate: rotation }}
      className={`bg-white p-3 pb-10 pixel-border pixel-shadow inline-block relative ${interactive ? 'cursor-pointer' : ''} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="w-full aspect-square bg-[var(--pink-soft)] overflow-hidden border-2 border-[var(--pink-grid)] flex items-center justify-center">
        {src ? (
          <img 
            src={src} 
            alt={caption || "Memory"} 
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23ffeaf3'/%3E%3Ctext x='50' y='50' font-family='sans-serif' font-size='14' text-anchor='middle' alignment-baseline='middle' fill='%23d94f95'%3EMissing%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div className="text-[var(--pink-dark)] font-['Jersey_25'] text-xl">Missing</div>
        )}
      </div>
      <div className="absolute bottom-2 left-0 w-full text-center px-2">
        <p className="font-['Jersey_25'] text-[var(--text-dark)] text-lg truncate">{caption}</p>
      </div>
    </motion.div>
  );
};

export default PolaroidCard;
