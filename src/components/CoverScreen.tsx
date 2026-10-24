import React, { useState } from 'react';
import { motion } from 'motion/react';
import landingPageHero from '../assets/images/landing-page-hero.png';

interface CoverScreenProps {
  onFlipStart: () => void;
  onOpen: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onFlipStart, onOpen }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleClick = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    onFlipStart();
  };

  return (
    <div
      className="fixed inset-0 z-50 h-screen h-[100dvh]"
      style={{ perspective: '1800px' }}
    >
      <motion.div
        animate={{
          rotateY: isFlipping ? -180 : 0,
          boxShadow: isFlipping
            ? '-24px 0 48px rgba(55, 20, 38, 0.32)'
            : '0 0 0 rgba(55, 20, 38, 0)',
        }}
        transition={{ duration: 1.25, ease: [0.45, 0, 0.55, 1] }}
        onAnimationComplete={() => {
          if (isFlipping) onOpen();
        }}
        className="absolute inset-0 h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
        }}
      >
        <button
          type="button"
          aria-label="Open portfolio"
          onClick={handleClick}
          disabled={isFlipping}
          className="absolute inset-0 block h-full w-full cursor-pointer overflow-hidden border-0 p-0"
          style={{
            backgroundColor: '#f6c3dc',
            backfaceVisibility: 'hidden',
          }}
        >
          <img
            src={landingPageHero}
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
        </button>
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(90deg, #d7afc2 0%, #f9dbea 5%, #f6c3dc 100%)',
          }}
        >
          <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/15 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};
