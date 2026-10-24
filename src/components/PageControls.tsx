import React, { useRef } from 'react';
import { Volume2, VolumeX, BookOpen, Upload, FileCheck } from 'lucide-react';

interface PageControlsProps {
  currentPage: number; // 1 to 7
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onReturnToCover: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onFileUpload?: (file: File) => void;
  isPdfLoaded?: boolean;
}

export const PageControls: React.FC<PageControlsProps> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onReturnToCover,
  soundEnabled,
  onToggleSound,
  onFileUpload,
  isPdfLoaded,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formatNum = (num: number) => num < 10 ? `0${num}` : `${num}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onFileUpload) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <>
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="application/pdf,.pdf" 
        className="hidden" 
      />

      {/* Bottom Left Status indicator */}
      <div className="fixed bottom-6 sm:bottom-10 left-6 sm:left-12 flex items-center gap-4 sm:gap-6 z-40 pointer-events-none select-none">
        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="text-[20px] sm:text-[24px] font-light text-pink-900/50 font-serif italic">
            {formatNum(currentPage)}
          </div>
          <div className="w-6 sm:w-8 h-[1px] bg-pink-700" />
        </div>
        <div className="text-[10px] tracking-[0.4em] uppercase font-bold text-pink-950 font-mono">
          {currentPage === 1 ? 'Cover / Page 1' : `Portfolio Page ${currentPage}`}
        </div>
      </div>

      {/* Bottom Right Controls Container */}
      <div className="fixed bottom-6 sm:bottom-10 right-6 sm:right-12 z-40 flex items-center gap-3 sm:gap-5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border-2 border-pink-200 shadow-xl text-zinc-900">
        {/* Upload Portfolio New.pdf button */}
        {onFileUpload && (
          <button
            onClick={() => fileInputRef.current?.click()}
            title={isPdfLoaded ? "Loaded 'Portfolio New.pdf'. Click to replace PDF" : "Upload 'Portfolio New.pdf'"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
              isPdfLoaded 
                ? 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs' 
                : 'bg-pink-600 text-white hover:bg-pink-700 shadow-xs'
            }`}
          >
            {isPdfLoaded ? (
              <>
                <FileCheck className="w-3 h-3 text-emerald-200" />
                <span>PDF Loaded</span>
              </>
            ) : (
              <>
                <Upload className="w-3 h-3 text-white" />
                <span>Upload PDF</span>
              </>
            )}
          </button>
        )}

        <div className="w-[1px] h-4 bg-pink-200" />

        {/* Return to Menu */}
        <button
          onClick={onReturnToCover}
          title="Return to Menu (Page 2)"
          className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-pink-700 hover:text-pink-900 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Menu</span>
        </button>

        <div className="w-[1px] h-4 bg-pink-200" />

        {/* Prev Button with Line Trigger */}
        <button
          onClick={onPrev}
          disabled={currentPage <= 1}
          className="group flex items-center gap-1.5 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed text-zinc-800"
        >
          <div className="w-3 h-[2px] bg-pink-600 group-hover:w-5 transition-all" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-pink-900">Prev</span>
        </button>

        {/* Next Button with Line Trigger */}
        <button
          onClick={onNext}
          disabled={currentPage >= totalPages}
          className="group flex items-center gap-1.5 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed text-zinc-800"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-pink-900">Next</span>
          <div className="w-4 h-[2px] bg-pink-600 group-hover:w-6 transition-all" />
        </button>

        <div className="w-[1px] h-4 bg-pink-200" />

        {/* Page Counter */}
        <div className="text-[10px] font-bold tracking-widest text-pink-800 font-mono">
          PAGE {formatNum(currentPage)} / {formatNum(totalPages)}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Page Flip Sound' : 'Enable Page Flip Sound'}
          className="p-1 text-zinc-600 hover:text-pink-700 transition-colors cursor-pointer"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-pink-700 stroke-[2]" />
          ) : (
            <VolumeX className="w-4 h-4 text-zinc-400 stroke-[2]" />
          )}
        </button>
      </div>
    </>
  );
};
