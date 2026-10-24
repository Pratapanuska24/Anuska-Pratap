import React, { useRef, useEffect, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion, AnimatePresence } from 'motion/react';
import { Page1Cover } from './pages/Page1Cover';
import { Page2Resume } from './pages/Page2Resume';
import { Page3Content } from './pages/Page3Content';
import { Page4Rewoven } from './pages/Page4Rewoven';
import { Page5CorsetDraping } from './pages/Page5CorsetDraping';
import { Page6NoirBloom } from './pages/Page6NoirBloom';
import { Page7TechPack } from './pages/Page7TechPack';
import { playPageFlipSound } from '../utils/audio';

interface FlipBookProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  soundEnabled: boolean;
  pdfPages?: string[] | null;
}

// Page Wrapper Component required by react-pageflip
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; number: number }>(
  ({ children, number }, ref) => {
    return (
      <div 
        ref={ref} 
        className="w-full h-full bg-white shadow-2xl overflow-hidden relative border border-stone-200/50"
        data-density="hard"
      >
        {children}
        {/* Subtle Page Corner Gradient Shadow */}
        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
      </div>
    );
  }
);

Page.displayName = 'Page';

export const FlipBook: React.FC<FlipBookProps> = ({ currentPage, onPageChange, soundEnabled, pdfPages }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 840, height: 594 });

  // Calculate responsive dimensions to preserve A4 Landscape aspect ratio (1.414 : 1)
  useEffect(() => {
    const handleResize = () => {
      const paddingX = window.innerWidth < 640 ? 16 : 48;
      const paddingY = window.innerWidth < 640 ? 90 : 130;
      const maxWidth = Math.min(window.innerWidth - paddingX, 1050);
      const maxHeight = window.innerHeight - paddingY;
      
      // Calculate based on A4 Landscape ratio ~ 1.414 : 1 (width : height)
      let w = maxWidth;
      let h = Math.round(w / 1.414);

      if (h > maxHeight) {
        h = maxHeight;
        w = Math.round(h * 1.414);
      }

      setDimensions({
        width: Math.max(340, w),
        height: Math.max(240, h)
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Programmatically change page when state updates from controls or keyboard
  useEffect(() => {
    if (bookRef.current && typeof bookRef.current.pageFlip === 'function') {
      const pageFlipInstance = bookRef.current.pageFlip();
      if (pageFlipInstance) {
        const currentFlipIndex = pageFlipInstance.getCurrentPageIndex();
        const targetIndex = currentPage - 1; // 0-indexed
        if (currentFlipIndex !== targetIndex) {
          pageFlipInstance.flip(targetIndex);
        }
      }
    }
  }, [currentPage]);

  // Handle FlipBook Event
  const onFlip = useCallback((e: { data: number }) => {
    const newPage = e.data + 1; // Convert 0-index to 1-indexed (1 to 7)
    if (newPage !== currentPage) {
      onPageChange(newPage);
      playPageFlipSound(soundEnabled);
    }
  }, [currentPage, onPageChange, soundEnabled]);

  // Keyboard Navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        if (currentPage < 7 && bookRef.current && typeof bookRef.current.pageFlip === 'function') {
          const pageFlipInstance = bookRef.current.pageFlip();
          if (pageFlipInstance) {
            pageFlipInstance.flipNext();
          }
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentPage > 1 && bookRef.current && typeof bookRef.current.pageFlip === 'function') {
          const pageFlipInstance = bookRef.current.pageFlip();
          if (pageFlipInstance) {
            pageFlipInstance.flipPrev();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Touch & Swipe Gesture Handlers for Mobile / Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Horizontally dominant swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0 && currentPage < 7 && bookRef.current && typeof bookRef.current.pageFlip === 'function') {
        const pageFlipInstance = bookRef.current.pageFlip();
        if (pageFlipInstance) {
          pageFlipInstance.flipNext();
        }
      } else if (deltaX > 0 && currentPage > 1 && bookRef.current && typeof bookRef.current.pageFlip === 'function') {
        const pageFlipInstance = bookRef.current.pageFlip();
        if (pageFlipInstance) {
          pageFlipInstance.flipPrev();
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center p-2 sm:p-6 overflow-hidden relative select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key="flipbook-wrapper"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          {/* HTMLFlipBook Engine */}
          {/* @ts-ignore - HTMLFlipBook typing fix */}
          <HTMLFlipBook
            width={dimensions.width}
            height={dimensions.height}
            size="fixed"
            minWidth={320}
            maxWidth={1200}
            minHeight={220}
            maxHeight={850}
            maxShadowOpacity={0.6}
            showCover={false}
            mobileScrollSupport={false}
            onFlip={onFlip}
            className="portfolio-book"
            ref={bookRef}
            startPage={currentPage - 1}
            drawShadow={true}
            usePortrait={true}
            startZIndex={30}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {pdfPages && pdfPages.length > 0 ? (
              pdfPages.map((dataUrl, idx) => (
                <Page key={`pdf-page-${idx}`} number={idx + 1}>
                  <img 
                    src={dataUrl} 
                    alt={`Portfolio Page ${idx + 1}`}
                    className="w-full h-full object-contain bg-white select-none pointer-events-none"
                  />
                </Page>
              ))
            ) : (
              <>
                <Page number={1}>
                  <Page1Cover />
                </Page>
                <Page number={2}>
                  <Page2Resume />
                </Page>
                <Page number={3}>
                  <Page3Content />
                </Page>
                <Page number={4}>
                  <Page4Rewoven />
                </Page>
                <Page number={5}>
                  <Page5CorsetDraping />
                </Page>
                <Page number={6}>
                  <Page6NoirBloom />
                </Page>
                <Page number={7}>
                  <Page7TechPack />
                </Page>
              </>
            )}
          </HTMLFlipBook>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
