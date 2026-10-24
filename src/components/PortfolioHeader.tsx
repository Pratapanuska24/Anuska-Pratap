import React, { useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
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
  const closeProjectsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const projectNavItems: Array<{ id: AppMode; label: string }> = [
    { id: 'corsets', label: 'Corsets' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'indian-wear', label: 'Indian wear' },
    { id: 'pattachitra', label: 'Pattachitra' },
    { id: 'sustainability', label: 'Digital Canvas' },
  ];

  const headerNavItems: Array<{ id: AppMode; label: string }> = [
    { id: 'profile', label: 'About Me' },
    { id: 'menu', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: AppMode) => {
    if (closeProjectsTimeout.current) clearTimeout(closeProjectsTimeout.current);
    onNavigateToCategory(id);
    setIsProjectsOpen(false);
  };

  const openProjects = () => {
    if (closeProjectsTimeout.current) clearTimeout(closeProjectsTimeout.current);
    setIsProjectsOpen(true);
  };

  const scheduleProjectsClose = () => {
    if (closeProjectsTimeout.current) clearTimeout(closeProjectsTimeout.current);
    closeProjectsTimeout.current = setTimeout(() => setIsProjectsOpen(false), 1000);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-pink-200 shadow-sm px-3 sm:px-6 py-2.5 select-none font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToMenu}
          aria-label="Back to explore page"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-700 text-white shadow-md transition-all cursor-pointer"
          title="Back to What do you want to explore"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {categoryTitle && (
          <h1 className="min-w-0 flex-1 truncate text-sm sm:text-base font-mono font-bold tracking-wider text-pink-950">
            {categoryTitle}
          </h1>
        )}

        <nav className="flex min-w-0 flex-1 flex-wrap items-center justify-end space-x-1 sm:space-x-2" aria-label="Primary navigation">
          {headerNavItems.map((item, index) => (
            <React.Fragment key={`${item.id}-${item.label}`}>
              {index > 0 && <span className="hidden px-1 text-xs text-pink-300 sm:inline">|</span>}
              {item.label === 'Projects' ? (
                <div
                  className="relative"
                  onMouseEnter={openProjects}
                  onMouseLeave={scheduleProjectsClose}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setIsProjectsOpen(false);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      if (closeProjectsTimeout.current) clearTimeout(closeProjectsTimeout.current);
                      setIsProjectsOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (isProjectsOpen) {
                        setIsProjectsOpen(false);
                      } else {
                        openProjects();
                      }
                    }}
                    onFocus={openProjects}
                    aria-expanded={isProjectsOpen}
                    aria-controls="projects-navigation-menu"
                    className={`px-2 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-mono tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
                      currentCategory === 'menu' || projectNavItems.some((project) => project.id === currentCategory)
                        ? 'bg-pink-600 text-white shadow-2xs'
                        : 'text-pink-900/80 hover:text-pink-950 hover:bg-pink-200/60'
                    }`}
                  >
                    {item.label}
                  </button>
                  {isProjectsOpen && (
                    <div
                      id="projects-navigation-menu"
                      className="absolute right-0 top-full z-50 w-48 max-w-[calc(100vw-2rem)] pt-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
                      onMouseEnter={openProjects}
                      onMouseLeave={scheduleProjectsClose}
                    >
                      <div className="rounded-xl border border-pink-200 bg-white p-1.5 shadow-xl">
                        {projectNavItems.map((project) => (
                          <button
                            key={project.id}
                            type="button"
                            onClick={() => handleNavClick(project.id)}
                            className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-mono font-bold tracking-wide transition-colors ${
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
              ) : (
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-mono tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
                    currentCategory === item.id
                      ? 'bg-pink-600 text-white shadow-2xs'
                      : 'text-pink-900/80 hover:text-pink-950 hover:bg-pink-200/60'
                  }`}
                >
                  {item.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};
