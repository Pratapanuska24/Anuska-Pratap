import React from 'react';
import { ArrowLeft, User, Sparkles, Compass, Leaf, Layers, Home } from 'lucide-react';
import { AppMode } from '../types';

interface PortfolioHeaderProps {
  currentCategory: AppMode;
  categoryTitle: string;
  categorySubtitle: string;
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
  onBackToLanding,
  actionButton,
}) => {
  const categoryNavItems: Array<{ id: AppMode; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'profile', label: 'PROFILE', icon: User },
    { id: 'corsets', label: 'THE CORSETS', icon: Layers },
    { id: 'indian-wear', label: 'INDIAN WEAR', icon: Sparkles },
    { id: 'pattachitra', label: 'PATTACHITRA', icon: Compass },
    { id: 'sustainability', label: 'SUSTAINABILITY', icon: Leaf },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-pink-200 shadow-xs px-3 sm:px-8 py-3 select-none font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Back Buttons & Brand Breadcrumbs */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            type="button"
            onClick={onBackToMenu}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-mono font-bold tracking-wide transition-all border border-pink-300 shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>PORTFOLIO MENU</span>
          </button>

          <button
            type="button"
            onClick={onBackToLanding}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg hover:bg-pink-50 text-pink-800 text-xs font-mono transition-colors border border-pink-200/60"
            title="Return to Cover Page"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Cover</span>
          </button>

          <div className="h-5 w-[1px] bg-pink-200 hidden sm:block" />

          {/* Current Category Info */}
          <div className="flex flex-col">
            <h1 className="text-sm sm:text-base font-black tracking-tight text-pink-950 uppercase font-sans">
              {categoryTitle}
            </h1>
            <p className="text-[10px] text-pink-700 font-mono tracking-widest uppercase">
              {categorySubtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick Category Switcher & Action Button */}
        <div className="flex items-center justify-between md:justify-end space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          
          <nav className="flex items-center space-x-1 bg-pink-50 p-1 rounded-xl border border-pink-200">
            {categoryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentCategory === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigateToCategory(item.id)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono tracking-wider font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'text-pink-900/80 hover:text-pink-950 hover:bg-pink-200/50'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {actionButton && (
            <div className="shrink-0">
              {actionButton}
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
