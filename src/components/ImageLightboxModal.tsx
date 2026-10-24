import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Tag, Folder } from 'lucide-react';
import { GalleryImage } from '../types';

interface ImageLightboxModalProps {
  isOpen: boolean;
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-pink-950/90 backdrop-blur-md select-none font-sans">
        
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div 
          className="relative z-10 max-w-5xl w-full max-h-[92vh] bg-white rounded-2xl border-2 border-pink-200 shadow-2xl flex flex-col overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-pink-100 bg-pink-50/50">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {currentImg.label && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-pink-600 text-white text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
                  <Tag className="w-3 h-3" />
                  <span>{currentImg.label}</span>
                </span>
              )}
              {currentImg.categoryFolder && (
                <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-pink-100/70 text-pink-900 text-[10px] font-mono">
                  <Folder className="w-3 h-3 text-pink-500" />
                  <span>{currentImg.categoryFolder}</span>
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-pink-900/70">
                {currentIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-pink-200/60 text-pink-900 transition-colors focus:outline-hidden"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Stage (Preserves original natural aspect ratio, no stretching) */}
          <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] bg-zinc-950/5 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            <img
              src={currentImg.url}
              alt={currentImg.caption || currentImg.label || 'Portfolio Photograph'}
              referrerPolicy="no-referrer"
              className="max-h-[62vh] sm:max-h-[70vh] max-w-full w-auto h-auto object-contain select-none"
            />

            {/* Left Nav Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((currentIndex - 1 + images.length) % images.length);
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-pink-900 shadow-md hover:scale-105 transition-all border border-pink-200"
                title="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Right Nav Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((currentIndex + 1) % images.length);
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-pink-900 shadow-md hover:scale-105 transition-all border border-pink-200"
                title="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Caption & Metadata Footer */}
          {currentImg.caption && (
            <div className="px-4 sm:px-6 py-3 bg-white border-t border-pink-100 flex items-center justify-between text-xs sm:text-sm text-zinc-700">
              <p className="font-medium text-pink-950 italic">{currentImg.caption}</p>
              <div className="flex items-center space-x-1 text-pink-800 text-[11px] font-mono shrink-0 pl-2">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Full Aspect Preview</span>
              </div>
            </div>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center space-x-2 px-4 sm:px-6 py-2.5 bg-pink-50/70 border-t border-pink-100 overflow-x-auto scrollbar-thin">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => onNavigate(idx)}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === currentIndex
                      ? 'border-pink-600 scale-105 shadow-sm ring-2 ring-pink-300'
                      : 'border-pink-200/80 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label || `Thumb ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
