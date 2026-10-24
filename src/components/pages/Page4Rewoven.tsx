import React from 'react';

export const Page4Rewoven: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-50 via-white to-pink-100 text-zinc-900 p-3 sm:p-5 md:p-6 flex flex-col justify-between font-sans relative overflow-hidden select-none">
      
      {/* Outer Border / Frame */}
      <div className="absolute inset-2 sm:inset-3 border-2 border-pink-300 pointer-events-none" />

      {/* Main Grid Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between space-y-3">
        
        {/* Landscape 3-Column Grid */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 flex-1 items-stretch">
          
          {/* Column 1: Corset Back View Lacing */}
          <div className="col-span-4 bg-white border-2 border-pink-200 rounded-xl overflow-hidden shadow-md relative flex flex-col justify-between p-2">
            <div className="w-full flex-1 relative rounded-lg overflow-hidden border border-pink-100">
              <svg className="w-full h-full object-cover" viewBox="0 0 200 260" fill="none" preserveAspectRatio="xMidYMid slice">
                <rect width="200" height="260" fill="#FDF2F8" />
                <path d="M75 30 C60 50, 60 90, 80 110 C90 120, 110 120, 120 110 C140 90, 140 50, 125 30 Z" fill="#201815" />
                <path d="M60 110 C80 100, 120 100, 140 110 L150 140 L50 140 Z" fill="#FBCFE8" />
                <path d="M65 135 L135 135 L125 210 L75 210 Z" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
                <path d="M85 140 L115 155 M115 140 L85 155 M85 155 L115 170 M115 155 L85 170 M85 170 L115 185 M115 170 L85 185 M85 185 L115 200 M115 185 L85 200" stroke="#DB2777" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="85" cy="140" r="2" fill="#831843" />
                <circle cx="115" cy="140" r="2" fill="#831843" />
                <circle cx="85" cy="155" r="2" fill="#831843" />
                <circle cx="115" cy="155" r="2" fill="#831843" />
                <circle cx="85" cy="170" r="2" fill="#831843" />
                <circle cx="115" cy="170" r="2" fill="#831843" />
                <circle cx="85" cy="185" r="2" fill="#831843" />
                <circle cx="115" cy="185" r="2" fill="#831843" />
                <circle cx="85" cy="200" r="2" fill="#831843" />
                <circle cx="115" cy="200" r="2" fill="#831843" />
                <path d="M75 210 L125 210 L135 260 L65 260 Z" fill="#4B6A9B" />
              </svg>
            </div>
            <div className="pt-1.5 text-center">
              <span className="text-[9px] font-bold tracking-widest text-pink-900 uppercase font-mono">Back Lacing Detail</span>
            </div>
          </div>

          {/* Column 2: Front Pose + Close-Up Embroidery */}
          <div className="col-span-4 flex flex-col gap-2">
            {/* Front Pose */}
            <div className="flex-1 bg-white border-2 border-pink-200 rounded-xl overflow-hidden shadow-md relative p-1.5 flex flex-col">
              <svg className="w-full h-full" viewBox="0 0 220 280" fill="none" preserveAspectRatio="xMidYMid slice">
                <rect width="220" height="280" fill="#FDF2F8" />
                <ellipse cx="110" cy="80" rx="22" ry="26" fill="#FBCFE8" />
                <path d="M85 70 C75 50, 145 50, 135 70 C145 100, 140 130, 130 140 C110 130, 110 90, 85 70 Z" fill="#1C1615" />
                <path d="M60 110 Q70 60 95 65" stroke="#FBCFE8" strokeWidth="18" strokeLinecap="round" fill="none" />
                <path d="M160 110 Q150 60 125 65" stroke="#FBCFE8" strokeWidth="18" strokeLinecap="round" fill="none" />
                <path d="M80 110 C95 100, 125 100, 140 110 L135 180 C120 190, 100 190, 85 180 Z" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
                <circle cx="110" cy="140" r="4" fill="#EC4899" />
                <circle cx="105" cy="145" r="3" fill="#3B5998" />
                <circle cx="116" cy="145" r="3" fill="#F472B6" />
                <path d="M102 138 Q110 132 118 138" stroke="#DB2777" strokeWidth="2" fill="none" />
                <path d="M85 180 L135 180 L145 280 L75 280 Z" fill="#4B6A9B" />
              </svg>
            </div>

            {/* Embroidery Close-up Box */}
            <div className="h-28 sm:h-32 bg-white border-2 border-pink-200 rounded-xl overflow-hidden shadow-md relative p-1">
              <svg className="w-full h-full" viewBox="0 0 200 120" fill="none" preserveAspectRatio="xMidYMid slice">
                <rect width="200" height="120" fill="#FCE7F3" />
                <ellipse cx="100" cy="30" rx="16" ry="18" fill="#FBCFE8" />
                <path d="M70 50 L130 50 L125 110 C110 120, 90 120, 75 110 Z" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
                <circle cx="100" cy="80" r="6" fill="#DB2777" />
                <circle cx="92" cy="85" r="4" fill="#9333EA" />
                <circle cx="108" cy="85" r="4" fill="#EC4899" />
                <path d="M90 75 Q100 68 110 75 Q100 95 90 75 Z" fill="#F472B6" opacity="0.8" />
              </svg>
              <div className="absolute bottom-1 right-2 text-right">
                <p className="text-[10px] font-serif italic text-pink-900 font-bold drop-shadow-xs">
                  Hand Embroidery
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Narrative Text & Titles */}
          <div className="col-span-4 flex flex-col justify-between space-y-2">
            <div className="p-3 bg-white/90 border-2 border-pink-200 rounded-xl text-[9px] sm:text-[10px] leading-relaxed tracking-wider text-justify uppercase font-sans text-zinc-800 shadow-sm">
              CRAFTED FROM UPCYCLED DENIM, THIS CORSET TRANSFORMS DISCARDED FABRIC INTO A STATEMENT OF SUSTAINABLE FASHION. THE STRUCTURED SILHOUETTE IS BALANCED WITH INTRICATE EMBROIDERY DETAILS, ADDING SOFTNESS AND ARTISTRY TO THE RUGGED TEXTURE OF DENIM. EVERY STITCH REFLECTS THE HARMONY BETWEEN STRENGTH AND DELICACY, TURNING RECLAIMED MATERIAL INTO WEARABLE ART.
            </div>

            <div className="pt-3 border-t-2 border-pink-300">
              <h2 className="text-base sm:text-lg md:text-xl font-black tracking-wider text-pink-900 uppercase italic font-serif">
                THE REWOVEN STORY
              </h2>
              <p className="text-xs font-bold text-pink-700 tracking-widest pl-0.5 font-mono">
                Skirt to Corset
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
