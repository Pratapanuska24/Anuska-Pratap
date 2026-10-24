import React from 'react';

export const Page5CorsetDraping: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-50 via-white to-pink-100 text-zinc-900 p-3 sm:p-4 md:p-5 flex flex-col justify-between font-sans relative overflow-hidden select-none">
      
      {/* Pink Top & Right Accent Bars */}
      <div className="absolute top-0 left-0 right-0 h-2 sm:h-3 bg-pink-500 z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-2 sm:w-3 bg-pink-500 z-10" />

      {/* Main Container */}
      <div className="relative z-20 w-full h-full pt-2 pr-2 flex flex-col justify-between space-y-2">
        
        {/* Top Half: Script Text + Photos */}
        <div className="grid grid-cols-12 gap-3 flex-1 items-stretch">
          
          {/* Left Column: Cursive/Script Poetry Text */}
          <div className="col-span-4 sm:col-span-3 flex flex-col justify-center space-y-1 pl-1 font-serif italic text-pink-900 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider leading-snug">
            <p>KON</p>
            <p>HAI</p>
            <p>WOH ?</p>
            <p className="pt-1">JISNE</p>
            <p>DOBARA</p>
            <p>MUD KE</p>
            <p>MUJHE</p>
            <p>NAHI</p>
            <p>DEKHAA ?</p>
            <p className="pt-2 text-[10px] sm:text-xs not-italic font-sans text-pink-700 font-bold font-mono">WHO IS HE ?</p>
          </div>

          {/* Right Column: Photography Pair */}
          <div className="col-span-8 sm:col-span-9 grid grid-cols-2 gap-2 bg-white/80 p-2 rounded-xl border-2 border-pink-200 shadow-sm">
            {/* Outdoor Photo 1: Back View */}
            <div className="bg-pink-100 rounded-lg overflow-hidden aspect-[3/4] relative shadow-sm border border-pink-200">
              <svg className="w-full h-full" viewBox="0 0 160 220" fill="none">
                <rect width="160" height="220" fill="#FCE7F3" />
                <path d="M0 80 L160 60 L160 220 L0 220 Z" fill="#FBCFE8" />
                {/* Model Back View */}
                <ellipse cx="80" cy="50" rx="14" ry="18" fill="#F472B6" />
                <path d="M65 40 C55 25, 105 25, 95 40 C105 60, 95 80, 80 80 Z" fill="#4C0519" />
                {/* Dark Corset with Criss-Cross Back Lacing */}
                <path d="M62 70 L98 70 L92 125 L68 125 Z" fill="#9D174D" stroke="#831843" strokeWidth="1" />
                <path d="M72 75 L88 85 M88 75 L72 85 M72 85 L88 95 M88 85 L72 95 M72 95 L88 105 M88 95 L72 105 M72 105 L88 115 M88 105 L72 115" stroke="#FFFFFF" strokeWidth="1.5" />
                {/* Dark Trousers */}
                <path d="M68 125 L92 125 L100 220 L60 220 Z" fill="#18181B" />
              </svg>
            </div>

            {/* Outdoor Photo 2: Front View */}
            <div className="bg-pink-100 rounded-lg overflow-hidden aspect-[3/4] relative shadow-sm border border-pink-200">
              <svg className="w-full h-full" viewBox="0 0 160 220" fill="none">
                <rect width="160" height="220" fill="#FCE7F3" />
                <path d="M0 80 L160 60 L160 220 L0 220 Z" fill="#FBCFE8" />
                {/* Model Front View */}
                <ellipse cx="80" cy="50" rx="14" ry="18" fill="#F472B6" />
                <path d="M65 40 C55 25, 105 25, 95 40 C105 60, 95 75, 80 75 Z" fill="#4C0519" />
                {/* Strapless Dark Corset Front View */}
                <path d="M62 70 Q80 62 98 70 L92 125 Q80 135 68 125 Z" fill="#9D174D" stroke="#831843" strokeWidth="1" />
                <path d="M70 70 L70 123 M80 67 L80 128 M90 70 L90 123" stroke="#F472B6" strokeWidth="1.5" />
                {/* Dark Trousers */}
                <path d="M68 125 L92 125 L100 220 L60 220 Z" fill="#18181B" />
              </svg>
            </div>
          </div>

        </div>

        {/* Bottom Half: Spec Sheet Header & Flat Sketches / BOM Table */}
        <div className="bg-white text-zinc-900 rounded-xl p-2 sm:p-3 text-[9px] sm:text-[10px] leading-tight space-y-2 shadow-md border-2 border-pink-200">
          
          {/* Spec Sheet Header Lines */}
          <div className="border border-pink-300 p-1.5 space-y-1 bg-pink-50/40 font-mono text-[8.5px] sm:text-[9.5px]">
            <div className="grid grid-cols-3 gap-2 border-b border-pink-200 pb-1">
              <p><span className="font-bold text-pink-900">BRAND :</span> ANUSKA</p>
              <p><span className="font-bold text-pink-900">SUBJECT :</span> DRAPING</p>
              <p><span className="font-bold text-pink-900">DATE :</span> 25 JANUARY 2026</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <p><span className="font-bold text-pink-900">DESIGNER :</span> ANUSKA PRATAP</p>
              <p><span className="font-bold text-pink-900">NAME :</span> STRAPLESS CORSET</p>
              <p><span className="font-bold text-pink-900">SIZE :</span> 10 ON BODY FOAM</p>
            </div>
          </div>

          {/* Lower Grid: Flat Sketches & Bill of Materials */}
          <div className="grid grid-cols-12 gap-2">
            
            {/* Flat Sketches Box */}
            <div className="col-span-6 border border-pink-200 p-1.5 flex flex-col justify-between bg-white rounded">
              <div>
                <h3 className="font-bold text-pink-900 border-b border-pink-200 pb-0.5 mb-1 uppercase tracking-wider text-[9px] sm:text-[10px]">
                  FLAT SKETCHES
                </h3>
                {/* Technical Line Drawing Vector */}
                <div className="w-full h-20 sm:h-24 my-1 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 240 100" fill="none">
                    {/* Front Flat Sketch */}
                    <path d="M20 15 Q45 5 70 15 L62 80 Q45 92 28 80 Z" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1.5" />
                    <path d="M45 10 L45 88" stroke="#DB2777" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M30 15 L32 80" stroke="#F472B6" strokeWidth="0.8" />
                    <path d="M38 13 L39 83" stroke="#F472B6" strokeWidth="0.8" />
                    <path d="M52 13 L51 83" stroke="#F472B6" strokeWidth="0.8" />
                    <path d="M60 15 L58 80" stroke="#F472B6" strokeWidth="0.8" />
                    <text x="43" y="25" fontSize="7" fill="#831843" fontWeight="bold">CF</text>

                    {/* Back Flat Sketch */}
                    <path d="M140 20 L190 20 L185 80 L145 80 Z" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1.5" />
                    <path d="M165 20 L165 80" stroke="#DB2777" strokeWidth="1" strokeDasharray="2 2" />
                    {/* Eyelets */}
                    <circle cx="160" cy="28" r="1.5" stroke="#831843" fill="#FFF" />
                    <circle cx="170" cy="28" r="1.5" stroke="#831843" fill="#FFF" />
                    <circle cx="160" cy="38" r="1.5" stroke="#831843" fill="#FFF" />
                    <circle cx="170" cy="38" r="1.5" stroke="#831843" fill="#FFF" />
                    <circle cx="160" cy="48" r="1.5" stroke="#831843" fill="#FFF" />
                    <circle cx="170" cy="48" r="1.5" stroke="#831843" fill="#FFF" />
                    <circle cx="160" cy="58" r="1.5" stroke="#831843" fill="#FFF" />
                    <circle cx="170" cy="58" r="1.5" stroke="#831843" fill="#FFF" />
                    <circle cx="160" cy="68" r="1.5" stroke="#831843" fill="#FFF" />
                    <circle cx="170" cy="68" r="1.5" stroke="#831843" fill="#FFF" />
                  </svg>
                </div>
              </div>
              <p className="text-[8px] sm:text-[9px] text-zinc-700 pt-1 border-t border-pink-200">
                <span className="font-bold text-pink-900">Description :</span> Strapless corset top with sweetheart neckline and curved dipped hem. Fitted silhouette with boning for shaping.
              </p>
            </div>

            {/* Bill of Materials Table Box */}
            <div className="col-span-6 border border-pink-200 p-1.5 bg-white flex flex-col justify-between rounded">
              <div>
                <h3 className="font-bold text-pink-900 border-b border-pink-200 pb-0.5 mb-1 uppercase tracking-wider text-[9px] sm:text-[10px]">
                  BILL OF MATERIALS
                </h3>
                <table className="w-full text-left text-[8px] sm:text-[9px] border-collapse">
                  <thead>
                    <tr className="border-b border-pink-200 font-bold bg-pink-50">
                      <th className="p-0.5 border-r border-pink-200">ITEM</th>
                      <th className="p-0.5 border-r border-pink-200">ITEM NAME</th>
                      <th className="p-0.5">DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-100">
                    <tr>
                      <td className="p-0.5 border-r border-pink-100">Fabric</td>
                      <td className="p-0.5 border-r border-pink-100 font-bold text-pink-800">Pink Silk Satin</td>
                      <td className="p-0.5">Glossy, Lustrous</td>
                    </tr>
                    <tr>
                      <td className="p-0.5 border-r border-pink-100">Fabric</td>
                      <td className="p-0.5 border-r border-pink-100 font-medium">Fine Net Overlay</td>
                      <td className="p-0.5">Porous, Open-mesh</td>
                    </tr>
                    <tr>
                      <td className="p-0.5 border-r border-pink-100">Lining</td>
                      <td className="p-0.5 border-r border-pink-100 font-medium">Cotton Voile</td>
                      <td className="p-0.5">Breathable, Soft</td>
                    </tr>
                    <tr>
                      <td className="p-0.5 border-r border-pink-100">Closure</td>
                      <td className="p-0.5 border-r border-pink-100 font-medium">Eyelets & Cord</td>
                      <td className="p-0.5">Metallic Rose Gold</td>
                    </tr>
                    <tr>
                      <td className="p-0.5 border-r border-pink-100">Boning</td>
                      <td className="p-0.5 border-r border-pink-100 font-medium">Spiral Steel Bones</td>
                      <td className="p-0.5">8mm Heavy Duty</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
