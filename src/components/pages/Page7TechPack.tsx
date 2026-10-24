import React from 'react';

export const Page7TechPack: React.FC = () => {
  return (
    <div className="w-full h-full bg-white text-zinc-900 p-2 sm:p-4 md:p-5 flex flex-col justify-between font-sans relative overflow-hidden select-none text-[8.5px] sm:text-[9.5px]">
      
      {/* Landscape Main Content Grid */}
      <div className="grid grid-cols-12 gap-3 flex-1 items-stretch h-full">
        
        {/* Left Side: Tech Pack Sheet Document (7 Cols) */}
        <div className="col-span-7 border-2 border-pink-300 p-2 bg-pink-50/30 rounded-xl shadow-xs flex flex-col justify-between space-y-2">
          
          {/* Header Bar */}
          <div className="grid grid-cols-3 gap-1 border-b border-pink-200 pb-1 font-mono text-[7.5px] sm:text-[8.5px]">
            <div>
              <p><span className="font-bold text-pink-900">BRAND:</span> ANUSKA</p>
              <p><span className="font-bold text-pink-900">SEASON:</span> SS 2026</p>
            </div>
            <div>
              <p><span className="font-bold text-pink-900">STYLE:</span> CORSET TOP</p>
              <p><span className="font-bold text-pink-900">NO:</span> AK-SS26-CT-01</p>
            </div>
            <div>
              <p><span className="font-bold text-pink-900">DATE:</span> MAY 2026</p>
              <p><span className="font-bold text-pink-900">BY:</span> ANUSKA P.</p>
            </div>
          </div>

          {/* Main Spec Content Grid */}
          <div className="grid grid-cols-12 gap-2 items-start flex-1">
            
            {/* Description & Fabric */}
            <div className="col-span-4 space-y-2 border-r border-pink-200 pr-1.5">
              <div>
                <h4 className="font-bold text-pink-900 uppercase text-[8px] sm:text-[9px] border-b border-pink-200 pb-0.5">DESCRIPTION</h4>
                <p className="text-zinc-700 leading-tight pt-0.5 text-[7.5px] sm:text-[8.5px]">
                  Strapless corset top with sweetheart neckline and curved dipped hem. Fitted with boning.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-pink-900 uppercase text-[8px] sm:text-[9px] border-b border-pink-200 pb-0.5">FABRIC</h4>
                <div className="space-y-1 pt-0.5">
                  <div className="flex items-center space-x-1">
                    <div className="w-2.5 h-2.5 bg-pink-600 border border-pink-300 shrink-0" />
                    <p className="text-[7.5px] text-zinc-800">Pink Silk Satin</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2.5 h-2.5 bg-zinc-900 border border-pink-300 shrink-0" />
                    <p className="text-[7.5px] text-zinc-800">Black Boning Channels</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center CAD Views */}
            <div className="col-span-8 px-1 flex flex-col justify-center">
              <div className="w-full flex justify-around items-center h-28 sm:h-32">
                {/* FRONT VIEW */}
                <div className="flex flex-col items-center">
                  <span className="font-bold text-[8px] text-pink-900 mb-0.5 font-mono">FRONT</span>
                  <svg className="w-20 h-24 sm:w-24 sm:h-28" viewBox="0 0 100 120" fill="none">
                    <path d="M20 20 Q50 10 80 20 L72 100 Q50 115 28 100 Z" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1.5" />
                    <path d="M20 20 L30 22 L26 100 L28 100 Z" fill="#F472B6" />
                    <path d="M80 20 L70 22 L74 100 L72 100 Z" fill="#F472B6" />
                    <path d="M40 18 L38 105 M50 15 L50 108 M60 18 L62 105" stroke="#DB2777" strokeWidth="1" />
                  </svg>
                </div>

                {/* BACK VIEW */}
                <div className="flex flex-col items-center">
                  <span className="font-bold text-[8px] text-pink-900 mb-0.5 font-mono">BACK</span>
                  <svg className="w-20 h-24 sm:w-24 sm:h-28" viewBox="0 0 100 120" fill="none">
                    <path d="M20 25 L80 25 L72 100 Q50 108 28 100 Z" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1.5" />
                    <path d="M20 25 L30 27 L26 100 L28 100 Z" fill="#F472B6" />
                    <path d="M80 25 L70 27 L74 100 L72 100 Z" fill="#F472B6" />
                    <path d="M50 25 L50 104" stroke="#DB2777" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Technical Strip */}
          <div className="grid grid-cols-3 gap-1 border-t border-pink-200 pt-1 text-[7.5px] sm:text-[8px]">
            <div><span className="font-bold text-pink-900">CAD:</span> Front & Back</div>
            <div><span className="font-bold text-pink-900">TRIMS:</span> Boning, Eyelets</div>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-pink-900">COLOR:</span>
              <span className="inline-block w-2 h-2 bg-pink-500 border border-pink-300" />
              <span className="inline-block w-2 h-2 bg-white border border-pink-300" />
            </div>
          </div>

        </div>

        {/* Right Side: Architectural Look Photo (5 Cols) */}
        <div className="col-span-5 bg-pink-100 rounded-xl border-2 border-pink-200 overflow-hidden shadow-sm relative flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 240 280" fill="none" preserveAspectRatio="xMidYMid slice">
            <rect width="240" height="280" fill="#FCE7F3" />
            <rect x="20" y="0" width="30" height="280" fill="#FBCFE8" />
            <rect x="190" y="0" width="40" height="280" fill="#F9A8D4" />
            <rect x="0" y="210" width="240" height="70" fill="#FDF2F8" />

            {/* Model in Pink & White Polka Dot Dress */}
            <ellipse cx="120" cy="90" rx="14" ry="18" fill="#F472B6" />
            <path d="M106 78 C98 60, 142 60, 134 78 C144 100, 138 120, 120 120 Z" fill="#4C0519" />
            <path d="M106 108 L134 108 L146 195 L94 195 Z" fill="#DB2777" />
            
            {/* Polka Dots */}
            <circle cx="115" cy="120" r="2.5" fill="#FFFFFF" />
            <circle cx="125" cy="120" r="2.5" fill="#FFFFFF" />
            <circle cx="110" cy="135" r="2.5" fill="#FFFFFF" />
            <circle cx="120" cy="135" r="2.5" fill="#FFFFFF" />
            <circle cx="130" cy="135" r="2.5" fill="#FFFFFF" />
            <circle cx="105" cy="150" r="2.5" fill="#FFFFFF" />
            <circle cx="115" cy="150" r="2.5" fill="#FFFFFF" />
            <circle cx="125" cy="150" r="2.5" fill="#FFFFFF" />
            <circle cx="135" cy="150" r="2.5" fill="#FFFFFF" />
            <circle cx="110" cy="165" r="2.5" fill="#FFFFFF" />
            <circle cx="120" cy="165" r="2.5" fill="#FFFFFF" />
            <circle cx="130" cy="165" r="2.5" fill="#FFFFFF" />
            <circle cx="115" cy="180" r="2.5" fill="#FFFFFF" />
            <circle cx="125" cy="180" r="2.5" fill="#FFFFFF" />

            {/* Legs */}
            <rect x="110" y="195" width="7" height="45" rx="3.5" fill="#F472B6" />
            <rect x="123" y="195" width="7" height="45" rx="3.5" fill="#F472B6" />
          </svg>

          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-pink-900 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase border border-pink-300 font-bold">
            ARCHITECTURAL LOOK — ANUSKA
          </div>
        </div>

      </div>

    </div>
  );
};
