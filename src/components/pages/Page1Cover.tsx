import React from 'react';

export const Page1Cover: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 text-white select-none flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans">
      {/* Pinstripe Background */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #FFFFFF,
            #FFFFFF 16px,
            transparent 16px,
            transparent 32px
          )`
        }}
      />

      {/* Inner White Frame Inset */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 border-[3px] sm:border-4 border-white pointer-events-none z-20 shadow-md" />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-8">
        {/* Top Header - PORTFOLIO */}
        <div className="w-full text-center pt-2 sm:pt-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-[0.35em] text-white uppercase font-sans drop-shadow-sm">
            PORTFOLIO
          </h1>
        </div>

        {/* Center / Body Section */}
        <div className="flex-1 my-4 grid grid-cols-12 gap-2 items-center relative">
          {/* Left Column Text Stack */}
          <div className="col-span-5 sm:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-8 pl-1 sm:pl-4 z-10">
            <div className="space-y-1">
              <span className="block text-xs sm:text-sm md:text-lg font-bold tracking-[0.2em] text-white uppercase drop-shadow-xs">
                FASHION
              </span>
            </div>
            
            <div className="space-y-1 pl-4 sm:pl-8">
              <span className="block text-xs sm:text-sm md:text-lg font-bold tracking-[0.2em] text-white uppercase drop-shadow-xs">
                RUNWAY
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-xs sm:text-sm md:text-lg font-bold tracking-[0.2em] text-white uppercase drop-shadow-xs">
                STORY TELLING
              </span>
            </div>

            <div className="space-y-1 pl-4 sm:pl-8">
              <span className="block text-xs sm:text-sm md:text-lg font-bold tracking-[0.2em] text-white uppercase drop-shadow-xs">
                COMMUNICATION
              </span>
            </div>
          </div>

          {/* Right Column Photo Illustration */}
          <div className="col-span-7 sm:col-span-6 h-full flex items-end justify-center relative">
            <div className="relative w-full h-[85%] max-h-[500px] flex items-end justify-center">
              <div className="relative w-full h-full rounded-t-full overflow-hidden border-2 border-white bg-gradient-to-b from-white/90 to-pink-100 shadow-2xl flex items-end justify-center">
                <svg className="w-full h-full" viewBox="0 0 300 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="skinPink" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FBCFE8" />
                      <stop offset="100%" stopColor="#F472B6" />
                    </linearGradient>
                    <linearGradient id="dressPink" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#BE185D" />
                      <stop offset="50%" stopColor="#9D174D" />
                      <stop offset="100%" stopColor="#831843" />
                    </linearGradient>
                    <radialGradient id="hairPink" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#4C0519" />
                      <stop offset="100%" stopColor="#1E030A" />
                    </radialGradient>
                  </defs>

                  {/* Legs */}
                  <rect x="110" y="320" width="30" height="130" rx="15" fill="url(#skinPink)" />
                  <rect x="155" y="310" width="32" height="140" rx="16" fill="url(#skinPink)" />

                  {/* Draped Pink/Ruby Bodycon Dress */}
                  <path d="M90 180 C100 160, 200 160, 210 180 C215 220, 205 280, 195 330 C150 340, 130 340, 105 330 C95 280, 85 220, 90 180 Z" fill="url(#dressPink)" />
                  <path d="M85 175 C100 155, 140 160, 160 170 C140 190, 110 200, 85 175 Z" fill="#F472B6" />
                  <path d="M100 210 Q150 230 195 210 Q185 250 110 250 Z" fill="#831843" opacity="0.6" />
                  <path d="M95 260 Q150 280 190 260 Q180 295 105 295 Z" fill="#831843" opacity="0.6" />

                  {/* Neck & Face */}
                  <path d="M135 125 L165 125 L168 165 L132 165 Z" fill="url(#skinPink)" />
                  <ellipse cx="150" cy="110" rx="28" ry="34" fill="url(#skinPink)" />
                  <path d="M120 100 C110 60, 190 60, 180 100 C195 120, 185 155, 175 160 C165 140, 170 110, 150 100 C130 110, 135 140, 125 160 C115 155, 105 120, 120 100 Z" fill="url(#hairPink)" />
                  
                  {/* Raised Arm pose */}
                  <path d="M190 175 C215 160, 225 120, 195 90 C185 80, 175 85, 170 95" stroke="url(#skinPink)" strokeWidth="18" strokeLinecap="round" />

                  {/* Smile & Eyes */}
                  <path d="M142 118 Q150 126 158 118" stroke="#831843" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <ellipse cx="140" cy="105" rx="3" ry="2" fill="#831843" />
                  <ellipse cx="160" cy="105" rx="3" ry="2" fill="#831843" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-2" />
      </div>
    </div>
  );
};
