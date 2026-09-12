import React, { useState, useCallback } from 'react';
import { CoverScreen } from './components/CoverScreen';
import { MenuScreen } from './components/MenuScreen';
import { ProfilePage } from './components/pages/ProfilePage';
import { CorsetsPage } from './components/pages/CorsetsPage';
import { IndianWearPage } from './components/pages/IndianWearPage';
import { PattachitraPage } from './components/pages/PattachitraPage';
import { SustainabilityPage } from './components/pages/SustainabilityPage';
import { AppMode } from './types';
import { playPageFlipSound } from './utils/audio';

export default function App() {
  const [mode, setMode] = useState<AppMode>('landing');
  const [isOpeningCover, setIsOpeningCover] = useState(false);
  const [soundEnabled] = useState<boolean>(true);

  // Handle Landing Page Click -> Open Page 2 (Portfolio Menu)
  const handleOpenLanding = useCallback(() => {
    if (isOpeningCover) return;
    setIsOpeningCover(true);
    playPageFlipSound(soundEnabled);

    setTimeout(() => {
      setMode('menu');
      setIsOpeningCover(false);
    }, 700);
  }, [isOpeningCover, soundEnabled]);

  // Handle Menu Selection (Profile, The Corsets, Indian Wear, Pattachitra, Sustainability)
  const handleSelectCategory = useCallback((category: AppMode) => {
    playPageFlipSound(soundEnabled);
    setMode(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [soundEnabled]);

  // Return to Page 2 Menu Index
  const handleReturnToMenu = useCallback(() => {
    playPageFlipSound(soundEnabled);
    setMode('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [soundEnabled]);

  // Return to Page 1 Landing Page
  const handleReturnToLanding = useCallback(() => {
    playPageFlipSound(soundEnabled);
    setMode('landing');
  }, [soundEnabled]);

  return (
    <div className="w-full min-h-screen bg-[#FFF5F7] text-zinc-900 flex flex-col font-sans antialiased">
      
      {/* 1. LANDING PAGE (EXACTLY UNCHANGED VISUALLY AND FUNCTIONALLY) */}
      {mode === 'landing' && (
        <CoverScreen 
          onOpen={handleOpenLanding}
          isOpening={isOpeningCover}
        />
      )}

      {/* 2. PORTFOLIO MENU (PAGE 02: 5 LARGE CLICKABLE CATEGORIES) */}
      {mode === 'menu' && (
        <MenuScreen 
          onSelectOption={handleSelectCategory}
          onBackToLanding={handleReturnToLanding}
        />
      )}

      {/* 3. DEDICATED CATEGORY: PROFILE */}
      {mode === 'profile' && (
        <ProfilePage 
          onBackToMenu={handleReturnToMenu}
          onNavigateToCategory={handleSelectCategory}
          onBackToLanding={handleReturnToLanding}
        />
      )}

      {/* 4. DEDICATED CATEGORY: THE CORSETS */}
      {mode === 'corsets' && (
        <CorsetsPage 
          onBackToMenu={handleReturnToMenu}
          onNavigateToCategory={handleSelectCategory}
          onBackToLanding={handleReturnToLanding}
        />
      )}

      {/* 5. DEDICATED CATEGORY: INDIAN WEAR */}
      {mode === 'indian-wear' && (
        <IndianWearPage 
          onBackToMenu={handleReturnToMenu}
          onNavigateToCategory={handleSelectCategory}
          onBackToLanding={handleReturnToLanding}
        />
      )}

      {/* 6. DEDICATED CATEGORY: PATTACHITRA */}
      {mode === 'pattachitra' && (
        <PattachitraPage 
          onBackToMenu={handleReturnToMenu}
          onNavigateToCategory={handleSelectCategory}
          onBackToLanding={handleReturnToLanding}
        />
      )}

      {/* 7. DEDICATED CATEGORY: SUSTAINABILITY */}
      {mode === 'sustainability' && (
        <SustainabilityPage 
          onBackToMenu={handleReturnToMenu}
          onNavigateToCategory={handleSelectCategory}
          onBackToLanding={handleReturnToLanding}
        />
      )}

    </div>
  );
}
