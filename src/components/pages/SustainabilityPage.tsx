import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioHeader } from '../PortfolioHeader';
import { AppMode } from '../../types';
import d2Image1 from '../../assets/images/D2.1.jpg';
import d2Image2 from '../../assets/images/D2.2.jpg';
import d2Image3 from '../../assets/images/D2.3.jpg';
import d2Image4 from '../../assets/images/D2.4.jpg';
import d2Image5 from '../../assets/images/D2.5.jpg';
import d2Image6 from '../../assets/images/D2.6.jpg';
import d2Image7 from '../../assets/images/D2.7.jpg';
import {
  defaultDigitalCanvasImages,
  loadSustainabilityProjectsAsync,
  saveSustainabilityProjects,
} from '../../utils/portfolioStorage';

const clo3dImages = [
  { label: 'D2.1', url: d2Image1 },
  { label: 'D2.2', url: d2Image2 },
  { label: 'D2.3', url: d2Image3 },
  { label: 'D2.4', url: d2Image4 },
  { label: 'D2.5', url: d2Image5 },
  { label: 'D2.6', url: d2Image6 },
  { label: 'D2.7', url: d2Image7 },
];

interface SustainabilityPageProps {
  onBackToMenu: () => void;
  onNavigateToCategory: (mode: AppMode) => void;
  onBackToLanding: () => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({
  onBackToMenu,
  onNavigateToCategory,
  onBackToLanding,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageAspectRatio, setImageAspectRatio] = useState(4 / 3);
  const activeImage = defaultDigitalCanvasImages[activeImageIndex];
  const [activeClo3dImageIndex, setActiveClo3dImageIndex] = useState(0);
  const [clo3dImageAspectRatio, setClo3dImageAspectRatio] = useState(4 / 3);
  const activeClo3dImage = clo3dImages[activeClo3dImageIndex];

  useEffect(() => {
    let isMounted = true;

    loadSustainabilityProjectsAsync().then((projects) => {
      if (!isMounted || projects.length === 0) return;

      const firstProject = projects[0];
      const featuredImages = defaultDigitalCanvasImages.map((image) => {
        const savedImage = firstProject.images?.find((saved) => saved.id === image.id);
        return savedImage ? { ...savedImage, url: image.url } : { ...image };
      });
      const featuredIds = new Set(defaultDigitalCanvasImages.map((image) => image.id));
      const otherImages = (firstProject.images || []).filter((image) => !featuredIds.has(image.id));
      const updatedProjects = [
        {
          ...firstProject,
          title: 'Drishti and Abhinay',
          images: [...featuredImages, ...otherImages],
        },
        ...projects.slice(1),
      ];

      if (
        firstProject.title !== 'Drishti and Abhinay' ||
        featuredImages.some((image, index) => firstProject.images?.[index]?.id !== image.id) ||
        featuredImages.some((image, index) => firstProject.images?.[index]?.url !== image.url)
      ) {
        saveSustainabilityProjects(updatedProjects);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const showPreviousImage = () => {
    setActiveImageIndex((index) => (index - 1 + defaultDigitalCanvasImages.length) % defaultDigitalCanvasImages.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((index) => (index + 1) % defaultDigitalCanvasImages.length);
  };

  const showPreviousClo3dImage = () => {
    setActiveClo3dImageIndex((index) => (index - 1 + clo3dImages.length) % clo3dImages.length);
  };

  const showNextClo3dImage = () => {
    setActiveClo3dImageIndex((index) => (index + 1) % clo3dImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') showPreviousImage();
      if (event.key === 'ArrowRight') showNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-zinc-900 flex flex-col font-sans">
      <PortfolioHeader
        currentCategory="sustainability"
        categoryTitle="Digital Canvas"
        onBackToMenu={onBackToMenu}
        onNavigateToCategory={onNavigateToCategory}
        onBackToLanding={onBackToLanding}
      />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-10 px-4 py-8 sm:px-8 sm:py-12">
        <div className="w-full">
          <h2 className="mb-6 text-center font-display text-2xl font-black uppercase tracking-tight text-pink-950 sm:mb-8 sm:text-4xl">
            Drishti and Abhinay
          </h2>

          <section
            aria-label="Drishti and Abhinay image carousel"
            className="relative w-full overflow-hidden rounded-2xl border-2 border-pink-200 bg-white shadow-lg"
          >
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-pink-200 bg-white/95 text-pink-950 shadow-md transition hover:bg-pink-100 sm:left-5 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={showNextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-pink-200 bg-white/95 text-pink-950 shadow-md transition hover:bg-pink-100 sm:right-5 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={showNextImage}
              aria-label={`Next image from ${activeImage.label}`}
              className="block w-full cursor-pointer bg-[#FAF5F6]"
              style={{ aspectRatio: imageAspectRatio }}
            >
              <img
                src={activeImage.url}
                alt={`Drishti and Abhinay — ${activeImage.label}`}
                className="h-full w-full object-contain"
                onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  if (naturalWidth && naturalHeight) {
                    setImageAspectRatio(naturalWidth / naturalHeight);
                  }
                }}
              />
            </button>

            <div
              className="border-t border-pink-100 px-4 py-2 text-center font-mono text-xs font-bold tracking-wider text-pink-900"
              aria-live="polite"
            >
              {activeImage.label} · {activeImageIndex + 1} / {defaultDigitalCanvasImages.length}
            </div>
          </section>
        </div>

        <section
          aria-labelledby="clo3d-gallery-title"
          className="w-full overflow-hidden rounded-2xl border-2 border-pink-200 bg-white p-4 shadow-lg sm:p-7"
        >
          <div className="mb-5 text-center sm:mb-7">
            <p className="mb-2 font-mono text-xs font-bold tracking-[0.25em] text-pink-700">
              PROJECT D2
            </p>
            <h2
              id="clo3d-gallery-title"
              className="font-display text-2xl font-black uppercase tracking-tight text-pink-950 sm:text-4xl"
            >
              CLO 3D
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-pink-100 bg-[#FAF8F2]">
            <button
              type="button"
              onClick={showPreviousClo3dImage}
              aria-label="Previous CLO 3D image"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-pink-200 bg-white/95 text-pink-950 shadow-md transition hover:bg-pink-100 sm:left-5 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={showNextClo3dImage}
              aria-label="Next CLO 3D image"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-pink-200 bg-white/95 text-pink-950 shadow-md transition hover:bg-pink-100 sm:right-5 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={showNextClo3dImage}
              aria-label={`Next image from ${activeClo3dImage.label}`}
              className="block w-full cursor-pointer bg-[#FAF8F2]"
              style={{ aspectRatio: clo3dImageAspectRatio }}
            >
              <img
                src={activeClo3dImage.url}
                alt={`${activeClo3dImage.label} — CLO 3D project`}
                className="h-full w-full object-contain"
                onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  if (naturalWidth && naturalHeight) {
                    setClo3dImageAspectRatio(naturalWidth / naturalHeight);
                  }
                }}
              />
            </button>

            <div
              className="border-t border-pink-100 px-4 py-2 text-center font-mono text-xs font-bold tracking-wider text-pink-900"
              aria-live="polite"
            >
              {activeClo3dImage.label} · {activeClo3dImageIndex + 1} / {clo3dImages.length}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
