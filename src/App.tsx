import React, { useState, useEffect, useCallback } from 'react';
import { CoverScreen } from './components/CoverScreen';
import { MenuScreen } from './components/MenuScreen';
import { ProfilePage } from './components/pages/ProfilePage';
import { CorsetsPage } from './components/pages/CorsetsPage';
import { IndianWearPage } from './components/pages/IndianWearPage';
import { PattachitraPage } from './components/pages/PattachitraPage';
import { SustainabilityPage } from './components/pages/SustainabilityPage';
import { DressesPage } from './components/pages/DressesPage';
import { AppMode } from './types';
import { playPageFlipSound } from './utils/audio';

const VALID_MODES: AppMode[] = [
  'landing',
  'menu',
  'profile',
  'corsets',
  'indian-wear',
  'pattachitra',
  'sustainability',
  'dresses',
];

const getInitialMode = (): AppMode => {
  if (typeof window !== 'undefined') {
    // 1. Check URL hash (e.g. #sustainability or #corsets)
    const hash = window.location.hash.replace(/^#/, '').toLowerCase() as AppMode;
    if (VALID_MODES.includes(hash)) {
      return hash;
    }

    // 2. Check search parameters (e.g. ?page=sustainability or ?category=sustainability)
    try {
      const params = new URLSearchParams(window.location.search);
      const queryParam = (params.get('page') || params.get('category') || '').toLowerCase() as AppMode;
      if (VALID_MODES.includes(queryParam)) {
        return queryParam;
      }
    } catch {}

    // 3. Check pathname (e.g. /sustainability)
    const pathname = window.location.pathname.replace(/^\//, '').toLowerCase() as AppMode;
    if (VALID_MODES.includes(pathname)) {
      return pathname;
    }

    // 4. Check localStorage for last visited page
    try {
      const stored = localStorage.getItem('anuska_active_category') as AppMode;
      if (stored && VALID_MODES.includes(stored)) {
        return stored;
      }
    } catch {}
  }

  // Default to the landing preview page when the app loads
  return 'landing';
};

export default function App() {
  const [mode, setMode] = useState<AppMode>(getInitialMode);
  const [soundEnabled] = useState<boolean>(true);
  const [isLandingOpening, setIsLandingOpening] = useState(false);

  // Sync mode changes to URL hash and localStorage
  const updateMode = useCallback((newMode: AppMode) => {
    setMode(newMode);
    try {
      localStorage.setItem('anuska_active_category', newMode);
      if (typeof window !== 'undefined') {
        const currentHash = window.location.hash.replace(/^#/, '');
        if (currentHash !== newMode) {
          window.history.replaceState(null, '', `#${newMode}`);
        }
      }
    } catch {}
  }, []);

  // Listen to browser navigation (back/forward and hash changes)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '').toLowerCase() as AppMode;
      if (VALID_MODES.includes(hash)) {
        setMode(hash);
        try {
          localStorage.setItem('anuska_active_category', hash);
        } catch {}
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    // Initial hash sync if missing
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.history.replaceState(null, '', `#${mode}`);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [mode]);

  // Handle Landing Page Click -> Open Page 2 (Portfolio Menu)
  const handleLandingFlipStart = useCallback(() => {
    setIsLandingOpening(true);
  }, []);

  const handleOpenLanding = useCallback(() => {
    playPageFlipSound(soundEnabled);
    setIsLandingOpening(false);
    updateMode('menu');
  }, [soundEnabled, updateMode]);

  // Handle Menu Selection (Profile, The Corsets, Indian Wear, Pattachitra, Sustainability, Dresses)
  const handleSelectCategory = useCallback((category: AppMode) => {
    playPageFlipSound(soundEnabled);
    updateMode(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [soundEnabled, updateMode]);

  // Return to Page 2 Menu Index
  const handleReturnToMenu = useCallback(() => {
    playPageFlipSound(soundEnabled);
    updateMode('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [soundEnabled, updateMode]);

  // Return to Page 1 Landing Page
  const handleReturnToLanding = useCallback(() => {
    playPageFlipSound(soundEnabled);
    updateMode('landing');
  }, [soundEnabled, updateMode]);

  return (
    <div className="w-full min-h-screen bg-[#FFF5F7] text-zinc-900 flex flex-col font-sans antialiased">
      
      {/* 1. LANDING PAGE (COVER) */}
      {mode === 'landing' && (
        <CoverScreen onFlipStart={handleLandingFlipStart} onOpen={handleOpenLanding} />
      )}

      {/* 2. PORTFOLIO MENU (PAGE 02: 6 LARGE CLICKABLE CATEGORIES) */}
      {(mode === 'menu' || isLandingOpening) && (
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

      {/* 8. DEDICATED CATEGORY: DRESSES */}
      {mode === 'dresses' && (
        <DressesPage 
          onBackToMenu={handleReturnToMenu}
          onNavigateToCategory={handleSelectCategory}
          onBackToLanding={handleReturnToLanding}
        />
      )}

    </div>
  );
}
