import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Edit3, Check, X, RotateCcw } from 'lucide-react';
import { LandingPageData } from '../types';
import { loadLandingPageData, saveLandingPageData, defaultLandingPageData } from '../utils/portfolioStorage';

interface CoverScreenProps {
  onOpen: () => void;
  isOpening: boolean;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onOpen, isOpening }) => {
  const [coverData, setCoverData] = useState<LandingPageData>(() => loadLandingPageData());
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [draftData, setDraftData] = useState<LandingPageData>(coverData);
  const [savedToast, setSavedToast] = useState(false);

  const handleOpenEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftData(coverData);
    setIsEditingModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCoverData(draftData);
    saveLandingPageData(draftData);
    setIsEditingModalOpen(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleResetDefaults = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraftData(defaultLandingPageData);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center text-zinc-900 cursor-pointer overflow-hidden select-none font-sans"
      onClick={onOpen}
      style={{
        backgroundImage: `repeating-linear-gradient(
          90deg,
          #F472B6 0px,
          #F472B6 36px,
          #FFFFFF 36px,
          #FFFFFF 72px
        )`
      }}
    >
      {/* Subtle overlay for depth & softness */}
      <div className="absolute inset-0 bg-radial from-transparent via-pink-50/40 to-pink-900/20 pointer-events-none" />

      {/* Grid Hairline Accents */}
      <div className="absolute top-0 right-1/2 w-[1px] h-full bg-pink-700/20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-pink-700/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-pink-700/20 pointer-events-none" />

      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed top-6 right-6 z-60 bg-pink-950 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-mono font-bold border border-pink-400 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>First Page Content Updated</span>
        </div>
      )}

      {/* Top Header Labels */}
      <div className="absolute top-6 sm:top-10 left-6 sm:left-12 flex flex-col gap-1 z-20">
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-pink-950/70 font-mono">
          {coverData.archiveNumber}
        </div>
        <div className="text-[10px] font-black tracking-[0.3em] uppercase text-pink-950">
          {coverData.portfolioTitle}
        </div>
      </div>

      <div className="absolute top-6 sm:top-10 right-6 sm:right-12 flex items-center gap-3 z-20">
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-pink-950/80 flex items-center gap-1.5 font-mono">
          <Sparkles className="w-3 h-3 text-pink-600" />
          <span>{coverData.season}</span>
        </div>

        {/* Discreet Edit Content Trigger */}
        <button
          type="button"
          onClick={handleOpenEditModal}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-pink-900 border border-pink-300 shadow-2xs text-[10px] font-mono font-bold uppercase tracking-wider transition-all hover:scale-105"
          title="Edit first page text & subtitle"
        >
          <Edit3 className="w-3 h-3 text-pink-600" />
          <span className="hidden sm:inline">Edit First Page</span>
        </button>
      </div>

      {/* Book Container with 3D Open Motion (Landscape) */}
      <div className="relative flex items-center justify-center">
        {/* Soft Pink Glow Shadow */}
        <div className="absolute -inset-10 bg-pink-500/25 blur-3xl rounded-full pointer-events-none" />

        {/* Stacked White Pages Effect Behind Book */}
        <div className="absolute hidden sm:block w-[480px] sm:w-[720px] h-[340px] sm:h-[500px] bg-white -z-10 shadow-xl border border-pink-200 translate-x-3 translate-y-2 rotate-1" />
        <div className="absolute hidden sm:block w-[480px] sm:w-[720px] h-[340px] sm:h-[500px] bg-pink-50 -z-20 shadow-lg border border-pink-200 translate-x-6 translate-y-4 rotate-2" />

        {/* Book Cover Frame (Pink & White Stripe Editorial) */}
        <motion.div 
          className="relative w-[340px] sm:w-[700px] md:w-[780px] h-[240px] sm:h-[490px] md:h-[550px] shadow-[0_50px_100px_-20px_rgba(219,39,119,0.3)] flex flex-col items-center justify-center p-6 sm:p-12 origin-left rounded-sm border-2 border-pink-300"
          initial={{ rotateY: 0, opacity: 1 }}
          animate={isOpening ? { 
            rotateY: -110, 
            scale: 0.95,
            opacity: 0,
            filter: 'blur(2px)'
          } : { 
            rotateY: 0, 
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }}
          transition={{ duration: 1.1, ease: [0.645, 0.045, 0.355, 1] }}
          style={{ 
            transformStyle: 'preserve-3d',
            backgroundImage: `repeating-linear-gradient(
              90deg,
              #EC4899 0px,
              #EC4899 16px,
              #FFFFFF 16px,
              #FFFFFF 32px
            )`
          }}
        >
          {/* Inner Frame Box */}
          <div className="absolute inset-4 sm:inset-8 border-[3px] sm:border-4 border-white pointer-events-none z-10 shadow-md" />

          {/* Spine Highlight */}
          <div className="absolute left-0 top-0 h-full w-[6px] bg-gradient-to-r from-pink-300 via-white/80 to-transparent pointer-events-none z-20" />

          {/* Center Title Badge Overlay (Pure White with Pink Accents) */}
          <div 
            className="relative z-20 bg-white/95 backdrop-blur-md px-6 py-4 sm:px-14 sm:py-9 border-2 border-pink-300 text-center shadow-2xl rounded-sm group/badge"
          >
            <h1 className="text-pink-900 text-[52px] sm:text-[110px] md:text-[120px] font-black tracking-[-0.03em] leading-[0.85] text-center uppercase font-sans drop-shadow-xs select-none">
              {coverData.name}
            </h1>

            {/* Thin Divider Line */}
            <div className="w-24 sm:w-36 h-[2px] bg-pink-400 my-3 sm:my-5 mx-auto" />

            {/* Subtitle / Interaction Hint */}
            <div className="text-pink-800 text-[10px] sm:text-[12px] tracking-[0.6em] uppercase font-bold font-mono">
              {coverData.subtitle}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Left Cover Metadata */}
      <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 flex items-center gap-4 sm:gap-6 z-20">
        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="text-[20px] sm:text-[24px] font-light text-pink-950 font-serif italic">01</div>
          <div className="w-6 sm:w-8 h-[1px] bg-pink-700" />
        </div>
        <div className="text-[10px] tracking-[0.4em] uppercase font-bold text-pink-950 font-mono">
          {coverData.pageMetadata}
        </div>
      </div>

      {/* Bottom Right Cue */}
      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 flex items-center gap-4 sm:gap-8 z-20 font-mono">
        <div className="text-[10px] font-bold tracking-widest text-pink-950/80">
          {coverData.pageCue}
        </div>
      </div>

      {/* ==================== EDIT FIRST PAGE CONTENT MODAL ==================== */}
      {isEditingModalOpen && (
        <div 
          className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-3xl border-2 border-pink-300 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-pink-950 uppercase tracking-wide">
                  EDIT FIRST PAGE CONTENT
                </h3>
                <p className="text-xs font-mono text-pink-700">Update the name, title, and cover text</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingModalOpen(false)}
                className="p-1 rounded-lg text-zinc-500 hover:bg-pink-100 text-pink-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  Primary Name on Cover *
                </label>
                <input
                  type="text"
                  required
                  value={draftData.name}
                  onChange={(e) => setDraftData({ ...draftData, name: e.target.value })}
                  placeholder="e.g. ANUSKA"
                  className="w-full text-base font-black uppercase p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-pink-950 focus:outline-pink-500"
                />
                <p className="text-[10px] font-mono text-pink-600 mt-1">Displayed as the main central headline.</p>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  Introductory Text / Subtitle *
                </label>
                <input
                  type="text"
                  required
                  value={draftData.subtitle}
                  onChange={(e) => setDraftData({ ...draftData, subtitle: e.target.value })}
                  placeholder="e.g. PRESS TO ENTER"
                  className="w-full text-xs font-mono font-bold uppercase tracking-wider p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-pink-950 focus:outline-pink-500"
                />
                <p className="text-[10px] font-mono text-pink-600 mt-1">Subtitle displayed directly below the primary name.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                    Top Portfolio Label
                  </label>
                  <input
                    type="text"
                    value={draftData.portfolioTitle}
                    onChange={(e) => setDraftData({ ...draftData, portfolioTitle: e.target.value })}
                    placeholder="e.g. Anuska Pratap Portfolio"
                    className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 focus:outline-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                    Archive Reference No.
                  </label>
                  <input
                    type="text"
                    value={draftData.archiveNumber}
                    onChange={(e) => setDraftData({ ...draftData, archiveNumber: e.target.value })}
                    placeholder="e.g. Archive No. 71-04"
                    className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 font-mono focus:outline-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                    Season / Year Tag
                  </label>
                  <input
                    type="text"
                    value={draftData.season}
                    onChange={(e) => setDraftData({ ...draftData, season: e.target.value })}
                    placeholder="e.g. Spring / Summer 2026"
                    className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 font-mono focus:outline-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                    Bottom Page Label
                  </label>
                  <input
                    type="text"
                    value={draftData.pageMetadata}
                    onChange={(e) => setDraftData({ ...draftData, pageMetadata: e.target.value })}
                    placeholder="e.g. Landscape Landing Page"
                    className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 font-mono focus:outline-pink-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-pink-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="flex items-center space-x-1 text-pink-700 hover:text-pink-900 text-xs font-mono"
                  title="Reset to original default values"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-900 text-xs font-mono font-bold uppercase transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save First Page</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

