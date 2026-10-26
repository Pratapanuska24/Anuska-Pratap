import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MousePointer2, Sparkles } from 'lucide-react';
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

  // Allow pressing Enter or Space to open the portfolio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isFlipping) {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipping]);

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
          aria-label="Open portfolio — Tap to Explore"
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

          {/* Prompt beneath the title in the original cover artwork */}
          <div className="absolute left-[68%] top-[61%] z-20 -translate-x-1/2 pointer-events-none text-[#701a35]">
            <span className="block whitespace-nowrap rounded-full border border-pink-300/80 bg-white/90 px-2.5 py-1 text-[10px] sm:text-xs font-mono font-bold tracking-wide shadow-sm">
              Click Here
            </span>
            <MousePointer2
              aria-hidden="true"
              className="absolute -right-3 -bottom-4 h-5 w-5 rotate-[-18deg] fill-white text-[#701a35] drop-shadow-md animate-bounce"
            />
          </div>

          {/* Small elegant "Tap To Explore" prompt */}
          <div className="absolute bottom-6 sm:bottom-9 left-1/2 -translate-x-1/2 pointer-events-none z-20">
            <div className="flex items-center space-x-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-pink-300/90 shadow-md text-[#701a35] text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase transition-transform hover:scale-105">
              <Sparkles className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
              <span>Tap To Explore</span>
            </div>
          </div>
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
