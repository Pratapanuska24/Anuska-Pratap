import React from 'react';
import { ArrowLeft, BookOpen, Mail, UserCheck, Award, MapPin, Sparkles } from 'lucide-react';

interface ReferencesScreenProps {
  onBackToMenu: () => void;
  onOpenPdf: () => void;
}

export const ReferencesScreen: React.FC<ReferencesScreenProps> = ({ onBackToMenu, onOpenPdf }) => {
  return (
    <div 
      className="fixed inset-0 z-40 text-zinc-900 flex flex-col justify-between p-4 sm:p-8 md:p-10 font-sans overflow-y-auto select-none"
      style={{
        background: 'linear-gradient(135deg, #FFF1F2 0%, #FDF2F8 50%, #FCE7F3 100%)'
      }}
    >
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b-2 border-pink-200/80 pb-4 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-xs">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-pink-600 hover:text-white text-pink-700 text-[11px] font-bold tracking-widest uppercase transition-all rounded-lg border border-pink-300 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Menu</span>
        </button>

        <div className="text-xs font-mono tracking-widest text-pink-900 font-bold uppercase hidden sm:block">
          REFERENCES & CREDENTIALS — ANUSKA PRATAP
        </div>

        <button
          onClick={onOpenPdf}
          className="flex items-center gap-2 px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold tracking-widest uppercase transition-all rounded-lg shadow-md cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Pop PDF Portfolio</span>
        </button>
      </div>

      {/* CONTENT GRID */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full flex-1 items-stretch">
        
        {/* REFERENCE 1 */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-pink-200 hover:border-pink-400 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-700 mb-4 shadow-xs">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-1">
              Industry Recommendation
            </h3>
            <p className="text-[11px] text-pink-700 font-bold font-mono mb-3 uppercase">Senior Fashion Design Mentor</p>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              "Anuska demonstrates exceptional mastery over corset drafting, zero-waste tailoring, and technical specification sheet accuracy. Her ability to translate conceptual mood boards into runway-ready garments is outstanding."
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-pink-100 text-[10px] font-mono font-bold text-pink-800 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Available Upon Request</span>
          </div>
        </div>

        {/* REFERENCE 2 */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-pink-200 hover:border-pink-400 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-700 mb-4 shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-1">
              Design Education
            </h3>
            <p className="text-[11px] text-pink-700 font-bold font-mono mb-3 uppercase">Indus Design School, Indus University</p>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              Specialized in Garment Construction, Apparel Production Tech Packs, 3D Pattern Making, Sustainable Zero-Waste Tailoring, and Avant-Garde Runway Collections.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-pink-100 text-[10px] font-mono font-bold text-pink-800 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Academic Excellence (Sem-7)</span>
          </div>
        </div>

        {/* REFERENCE 3 */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-pink-200 hover:border-pink-400 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-700 mb-4 shadow-xs">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-1">
              Direct Inquiries
            </h3>
            <p className="text-[11px] text-pink-700 font-bold font-mono mb-3">pratapanuska24@gmail.com</p>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
              <span>Available for Fashion Design, Technical Apparel Development, Bespoke Tailoring & Studio Collaborations.</span>
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-pink-100 text-[10px] font-mono font-bold text-pink-800 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Inquiries & Internships Open</span>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center border-t-2 border-pink-200 pt-4 text-xs font-mono text-pink-800 uppercase tracking-widest">
        Click "Pop PDF Portfolio" above to view the full 7-page document.
      </div>

    </div>
  );
};
