import React from 'react';

export const Page2Resume: React.FC = () => {
  return (
    <div className="w-full h-full bg-white text-zinc-900 p-4 sm:p-6 md:p-8 flex flex-col justify-between font-sans relative overflow-hidden select-none text-[9px] sm:text-[10.5px]">
      
      {/* Pink Top Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-3 sm:h-4 bg-pink-600 z-10" />

      {/* Main Content Grid (Landscape Double-Column) */}
      <div className="grid grid-cols-12 gap-3 sm:gap-6 flex-1 items-stretch mt-3">
        
        {/* Left Column (5 cols): Photo + About + Software & Skills */}
        <div className="col-span-5 flex flex-col justify-between space-y-3 border-r border-pink-200 pr-3 sm:pr-4">
          
          {/* Top Profile Header */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-20 sm:w-20 sm:h-24 bg-pink-100 rounded-lg border-2 border-pink-300 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 120" fill="none">
                <rect width="100" height="120" fill="#FCE7F3" />
                <ellipse cx="50" cy="45" rx="18" ry="22" fill="#F472B6" />
                <path d="M25 40 C15 20, 85 20, 75 40 C85 65, 75 80, 50 80 Z" fill="#4C0519" />
                <path d="M20 110 C30 85, 70 85, 80 110 Z" fill="#BE185D" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm sm:text-base md:text-lg font-black tracking-wider text-pink-900 uppercase">
                ANUSKA PRATAP
              </h2>
              <p className="text-[9px] sm:text-[10px] text-pink-700 font-bold uppercase tracking-widest font-mono">
                Fashion Designer
              </p>
              <p className="text-[8px] sm:text-[9px] text-zinc-500 font-mono mt-0.5">
                pratapanuska24@gmail.com
              </p>
            </div>
          </div>

          {/* About Me */}
          <div className="space-y-1">
            <h3 className="font-bold text-pink-900 border-b border-pink-300 pb-0.5 uppercase tracking-wider text-[9.5px] sm:text-[11px]">
              ABOUT ME
            </h3>
            <p className="text-zinc-700 leading-relaxed text-justify text-[8.5px] sm:text-[9.5px]">
              A passionate fashion design student with a keen interest in garment construction, pattern making, and creative styling. Dedicated to exploring sustainable textiles, corsetry techniques, and avant-garde silhouettes.
            </p>
          </div>

          {/* Software Skills */}
          <div className="space-y-1">
            <h3 className="font-bold text-pink-900 border-b border-pink-300 pb-0.5 uppercase tracking-wider text-[9.5px] sm:text-[11px]">
              SOFTWARE SKILLS
            </h3>
            <div className="grid grid-cols-2 gap-1 text-[8.5px] sm:text-[9px] text-zinc-800">
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> Adobe Illustrator</div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> Adobe Photoshop</div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> CLO 3D CAD</div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> CorelDRAW</div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> Procreate</div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> Tech Pack Dev</div>
            </div>
          </div>

        </div>

        {/* Right Column (7 cols): Education + Skills + Experience */}
        <div className="col-span-7 flex flex-col justify-between space-y-3 pl-1 sm:pl-2">
          
          {/* Education */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-pink-900 border-b border-pink-300 pb-0.5 uppercase tracking-wider text-[9.5px] sm:text-[11px]">
              EDUCATION
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-zinc-900">
                <span>Indus Design School, Indus University</span>
                <span className="font-mono text-pink-700">2022 - 2026</span>
              </div>
              <p className="text-zinc-600 text-[8.5px] sm:text-[9px]">
                Bachelor of Design (B.Des) — Fashion Design (Semester 7)
              </p>
            </div>
          </div>

          {/* Core Competencies */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-pink-900 border-b border-pink-300 pb-0.5 uppercase tracking-wider text-[9.5px] sm:text-[11px]">
              PROFESSIONAL SKILLS
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[8.5px] sm:text-[9.5px] text-zinc-700">
              <p>• Draping & Pattern Drafting</p>
              <p>• Corset Tailoring & Boning</p>
              <p>• Textile Surface Ornamentation</p>
              <p>• Zero-Waste Garment Construction</p>
              <p>• Technical Spec Sheet & BOM</p>
              <p>• Fashion Runway Styling</p>
            </div>
          </div>

          {/* Highlights & Projects */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-pink-900 border-b border-pink-300 pb-0.5 uppercase tracking-wider text-[9.5px] sm:text-[11px]">
              PORTFOLIO HIGHLIGHTS
            </h3>
            <div className="space-y-1 text-[8.5px] sm:text-[9px] text-zinc-700 leading-tight">
              <p><strong className="text-pink-900 font-mono">01. THE REWOVEN STORY :</strong> Sustainable denim skirt reconstructed into an embroidered back-lacing corset.</p>
              <p><strong className="text-pink-900 font-mono">02. STRAPLESS CORSET DRAPING :</strong> Sweetheart neckline, structured boning with Bill of Materials specification sheet.</p>
              <p><strong className="text-pink-900 font-mono">03. NOIR BLOOM COUTURE :</strong> Deep-back bodycon evening wear with contrasted white organza hem frills.</p>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Accent Footer */}
      <div className="mt-2 pt-2 border-t border-pink-200 flex justify-between items-center text-[8px] sm:text-[9px] font-mono text-pink-900/70 uppercase">
        <span>Anuska Pratap Portfolio</span>
        <span>Spring / Summer 2026</span>
      </div>

    </div>
  );
};
