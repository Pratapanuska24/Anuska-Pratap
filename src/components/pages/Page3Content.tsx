import React from 'react';

export const Page3Content: React.FC = () => {
  return (
    <div className="w-full h-full bg-white relative overflow-hidden select-none p-6 sm:p-10 md:p-14 flex flex-col justify-between">
      
      {/* Pink Top Accent Bar */}
      <div className="absolute top-6 left-0 right-0 h-5 bg-pink-500 z-10" />

      {/* Pink Right Accent Bar */}
      <div className="absolute top-0 bottom-0 right-6 w-5 bg-pink-500 z-10" />

      {/* Main Content Area */}
      <div className="relative z-20 mt-8 pl-4 sm:pl-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.25em] text-pink-950 uppercase font-sans">
            CONTENT
          </h1>
          <div className="w-20 h-1 bg-pink-500 mt-2" />
        </div>

        {/* Table of Contents List */}
        <div className="space-y-4 max-w-lg pt-2 font-mono">
          <div className="flex items-center justify-between border-b border-pink-100 pb-2">
            <span className="font-bold text-xs sm:text-sm text-pink-900">01. COVER & BRAND IDENTITY</span>
            <span className="text-pink-600 text-xs font-bold">PG 01</span>
          </div>

          <div className="flex items-center justify-between border-b border-pink-100 pb-2">
            <span className="font-bold text-xs sm:text-sm text-pink-900">02. RESUME & PROFILE SPECIFICATIONS</span>
            <span className="text-pink-600 text-xs font-bold">PG 02</span>
          </div>

          <div className="flex items-center justify-between border-b border-pink-100 pb-2">
            <span className="font-bold text-xs sm:text-sm text-pink-900">03. THE REWOVEN STORY (UPCYCLED CORSET)</span>
            <span className="text-pink-600 text-xs font-bold">PG 04</span>
          </div>

          <div className="flex items-center justify-between border-b border-pink-100 pb-2">
            <span className="font-bold text-xs sm:text-sm text-pink-900">04. CORSET DRAPING & BILL OF MATERIALS</span>
            <span className="text-pink-600 text-xs font-bold">PG 05</span>
          </div>

          <div className="flex items-center justify-between border-b border-pink-100 pb-2">
            <span className="font-bold text-xs sm:text-sm text-pink-900">05. NOIR BLOOM COUTURE EDITORIAL</span>
            <span className="text-pink-600 text-xs font-bold">PG 06</span>
          </div>

          <div className="flex items-center justify-between border-b border-pink-100 pb-2">
            <span className="font-bold text-xs sm:text-sm text-pink-900">06. PRODUCTION TECH PACK & ARCHITECTURAL LOOK</span>
            <span className="text-pink-600 text-xs font-bold">PG 07</span>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Accent Indicator */}
      <div className="relative z-20 pb-2 pl-4 sm:pl-8 flex justify-between items-center text-[9px] font-mono text-pink-800 uppercase">
        <div className="w-16 h-0.5 bg-pink-400" />
        <span>Anuska Pratap SS26</span>
      </div>

    </div>
  );
};
