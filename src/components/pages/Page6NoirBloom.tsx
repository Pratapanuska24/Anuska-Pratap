import React from 'react';

export const Page6NoirBloom: React.FC = () => {
  return (
    <div className="w-full h-full bg-white text-zinc-900 p-3 sm:p-5 md:p-6 flex flex-col justify-between font-sans relative overflow-hidden select-none">
      
      {/* Pink Accent Bars */}
      <div className="absolute top-0 bottom-0 left-4 sm:left-6 w-3 sm:w-4 bg-pink-500 z-10" />
      <div className="absolute top-4 sm:top-6 left-0 right-0 h-3 sm:h-4 bg-pink-500 z-10" />

      {/* Main Grid Content */}
      <div className="relative z-20 w-full h-full pt-5 pl-5 flex flex-col justify-between space-y-3">
        
        <div className="grid grid-cols-12 gap-3 sm:gap-4 flex-1 items-stretch">
          
          {/* Left Column: 3 Photos Side-by-Side in Landscape */}
          <div className="col-span-6 grid grid-cols-3 gap-2 items-stretch">
            
            {/* Photo 1: Front view holding white roses */}
            <div className="bg-pink-50 rounded-xl overflow-hidden shadow-md relative border-2 border-pink-200">
              <svg className="w-full h-full" viewBox="0 0 160 220" fill="none" preserveAspectRatio="xMidYMid slice">
                <rect width="160" height="220" fill="#FDF2F8" />
                <ellipse cx="80" cy="45" rx="14" ry="18" fill="#FBCFE8" />
                <path d="M65 35 C55 20, 105 20, 95 35 C105 55, 95 75, 80 75 Z" fill="#4C0519" />
                <path d="M64 65 L96 65 L102 160 L58 160 Z" fill="#18181B" />
                <path d="M58 160 Q80 168 102 160 Q105 172 55 172 Z" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
                <circle cx="88" cy="90" r="4" fill="#FFFFFF" />
                <circle cx="94" cy="92" r="3" fill="#FCE7F3" />
              </svg>
            </div>

            {/* Photo 2: Side view deep open back with pearl necklace */}
            <div className="bg-pink-50 rounded-xl overflow-hidden shadow-md relative border-2 border-pink-200">
              <svg className="w-full h-full" viewBox="0 0 160 220" fill="none" preserveAspectRatio="xMidYMid slice">
                <rect width="160" height="220" fill="#FDF2F8" />
                <ellipse cx="70" cy="45" rx="14" ry="18" fill="#FBCFE8" />
                <path d="M55 35 C45 20, 95 20, 85 35 C95 55, 85 75, 70 75 Z" fill="#4C0519" />
                <path d="M60 65 C70 65, 85 80, 85 110 L55 110 Z" fill="#FBCFE8" />
                <path d="M60 70 Q80 85 60 95 M60 75 Q82 92 60 102" stroke="#DB2777" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                <path d="M85 110 L100 110 L95 170 L80 170 Z" fill="#18181B" />
                <path d="M80 170 Q90 176 100 170 L98 178 Q88 182 78 178 Z" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Photo 3: Low angle pose */}
            <div className="bg-pink-50 rounded-xl overflow-hidden shadow-md relative border-2 border-pink-200">
              <svg className="w-full h-full" viewBox="0 0 160 220" fill="none" preserveAspectRatio="xMidYMid slice">
                <rect width="160" height="220" fill="#FDF2F8" />
                <ellipse cx="80" cy="50" rx="15" ry="18" fill="#FBCFE8" />
                <path d="M65 40 C55 25, 105 25, 95 40 C105 60, 95 80, 80 80 Z" fill="#4C0519" />
                <path d="M62 70 L98 70 L105 150 L55 150 Z" fill="#18181B" />
                <path d="M55 150 Q80 160 105 150 Q108 164 52 164 Z" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
              </svg>
            </div>

          </div>

          {/* Right Column: Editorial Text Blocks */}
          <div className="col-span-6 flex flex-col justify-center space-y-3 pr-2 pl-2 sm:pl-4">
            
            <div className="space-y-3 text-zinc-900 text-[9.5px] sm:text-[11px] md:text-xs leading-relaxed tracking-wider text-justify uppercase font-sans">
              <p className="font-bold text-pink-950">
                A STRIKING BALANCE OF BOLD SOPHISTICATION AND FEMININE ELEGANCE, NOIR BLOOM IS DESIGNED TO CELEBRATE CONFIDENCE THROUGH A SLEEK SILHOUETTE AND DRAMATIC DETAILING. THE DEEP-BACK DESIGN INTRODUCES A SENSE OF ALLURE, WHILE THE SOFT WHITE FRILLS AT THE HEM CREATE CONTRAST, MOVEMENT, AND DELICATE VISUAL SOFTNESS.
              </p>

              <p className="font-light text-zinc-700 pt-2">
                THIS BLACK ONE-PIECE DRESS FEATURES A CLEAN, BODY SKIMMING SILHOUETTE ENHANCED BY AN OPEN DEEP-BACK CONSTRUCTION THAT BECOMES THE FOCAL POINT OF THE GARMENT. THE WHITE FRILLED DETAILING AT THE BOTTOM ADDS TEXTURE AND PLAYFUL FLUIDITY, CREATING A GRACEFUL CONTRAST AGAINST THE DARK MONOCHROMATIC BASE.
              </p>
            </div>

            {/* Subtle Title Accent */}
            <div className="pt-3 border-t-2 border-pink-200">
              <h2 className="text-sm sm:text-base md:text-lg font-black tracking-[0.2em] text-pink-900 uppercase">
                NOIR BLOOM
              </h2>
              <p className="text-[9px] font-mono text-pink-700 font-bold uppercase tracking-widest">
                Anuska Pratap SS26 Couture
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
