import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { AppMode } from '../types';

interface PortfolioHeaderProps {
  currentCategory: AppMode;
  categoryTitle?: string;
  categorySubtitle?: string;
  onBackToMenu: () => void;
  onNavigateToCategory: (mode: AppMode) => void;
  onBackToLanding: () => void;
  actionButton?: React.ReactNode;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  currentCategory,
  categoryTitle,
  categorySubtitle,
  onBackToMenu,
  onNavigateToCategory,
  actionButton,
}) => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const projectsMenuRef = useRef<HTMLDivElement>(null);

  const projectNavItems: Array<{ id: AppMode; label: string }> = [
    { id: 'corsets', label: 'Corsets' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'indian-wear', label: 'Indian wear' },
    { id: 'pattachitra', label: 'Pattachitra' },
    { id: 'sustainability', label: 'Digital Canvas' },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (projectsMenuRef.current && !projectsMenuRef.current.contains(e.target as Node)) {
        setIsProjectsOpen(false);
      }
    };
    if (isProjectsOpen) {
      document.addEventListener('pointerdown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [isProjectsOpen]);

  const handleSelect = (id: AppMode) => {
    setIsProjectsOpen(false);
    onNavigateToCategory(id);
  };

  const isCurrentAProject = projectNavItems.some((project) => project.id === currentCategory);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-pink-200 shadow-sm px-3 sm:px-6 py-2.5 select-none font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Back Button (Returns directly to Menu) */}
        <button
          type="button"
          onClick={onBackToMenu}
          aria-label="Back to explore page"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-700 text-white shadow-md transition-all cursor-pointer shrink-0"
          title="Back to Directory"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {categoryTitle && (
          <h1 className="min-w-0 flex-1 truncate text-sm sm:text-base font-mono font-bold tracking-wider text-pink-950">
            {categoryTitle}
          </h1>
        )}

        {/* Primary Navigation: Directly navigates to any target immediately */}
        <nav className="flex min-w-0 flex-1 flex-wrap items-center justify-end space-x-1 sm:space-x-2" aria-label="Primary navigation">
          
          {/* ABOUT ME Button: Direct 1-click navigation */}
          <button
            type="button"
            onClick={() => handleSelect('profile')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-mono tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
              currentCategory === 'profile'
                ? 'bg-pink-600 text-white shadow-2xs'
                : 'text-pink-900/80 hover:text-pink-950 hover:bg-pink-200/60'
            }`}
          >
            About Me
          </button>

          <span className="hidden px-0.5 text-xs text-pink-300 sm:inline">|</span>

          {/* PROJECTS Dropdown: Direct access to any project */}
          <div ref={projectsMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsProjectsOpen((prev) => !prev)}
              aria-expanded={isProjectsOpen}
              aria-haspopup="true"
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-mono tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                isCurrentAProject
                  ? 'bg-pink-600 text-white shadow-2xs'
                  : 'text-pink-900/80 hover:text-pink-950 hover:bg-pink-200/60'
              }`}
            >
              <span>Projects</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProjectsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProjectsOpen && (
              <div
                className="absolute right-0 top-full z-50 w-52 max-w-[calc(100vw-2rem)] pt-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
              >
                <div className="rounded-xl border border-pink-200 bg-white p-1.5 shadow-xl space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                  {projectNavItems.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => handleSelect(project.id)}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-mono font-bold tracking-wide transition-colors cursor-pointer ${
                        currentCategory === project.id
                          ? 'bg-pink-100 text-pink-900'
                          : 'text-pink-800 hover:bg-pink-50 hover:text-pink-950'
                      }`}
                    >
                      {project.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span className="hidden px-0.5 text-xs text-pink-300 sm:inline">|</span>

          {/* CONTACT Button: Direct 1-click navigation */}
          <button
            type="button"
            onClick={() => handleSelect('contact')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-mono tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
              currentCategory === 'contact'
                ? 'bg-pink-600 text-white shadow-2xs'
                : 'text-pink-900/80 hover:text-pink-950 hover:bg-pink-200/60'
            }`}
          >
            Contact
          </button>

        </nav>
      </div>
    </header>
  );
};
