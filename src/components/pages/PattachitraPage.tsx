import React, { useState } from 'react';
import pattachitraOne from '../../assets/images/Pattachitra 1.jpg';
import p1Image from '../../assets/images/P1.jpeg';
import p2Image from '../../assets/images/P2.jpeg';
import p3Image from '../../assets/images/P3.jpeg';
import p4Image from '../../assets/images/P4.jpg';
import p5Image from '../../assets/images/P5.jpg';
import p6Image from '../../assets/images/P6.jpg';
import { ImageLightboxModal } from '../ImageLightboxModal';
import { PortfolioHeader } from '../PortfolioHeader';
import { AppMode, GalleryImage } from '../../types';
import { Expand } from 'lucide-react';

interface PattachitraPageProps {
  onBackToMenu: () => void;
  onNavigateToCategory: (mode: AppMode) => void;
  onBackToLanding: () => void;
}

export const PattachitraPage: React.FC<PattachitraPageProps> = ({
  onBackToMenu,
  onNavigateToCategory,
  onBackToLanding,
}) => {
  const handPaintingImages: GalleryImage[] = [
    { id: 'pattachitra-p1', url: p1Image, label: 'P1', caption: 'Hand painting and silhouette construction', addedAt: 1 },
    { id: 'pattachitra-p2', url: p2Image, label: 'P2', caption: 'Hand painting and silhouette construction', addedAt: 2 },
    { id: 'pattachitra-p3', url: p3Image, label: 'P3', caption: 'Hand painting and silhouette construction', addedAt: 3 },
  ];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
  <div className="min-h-screen bg-[#FFF5F7] text-zinc-900 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
    <PortfolioHeader
      currentCategory="pattachitra"
      categoryTitle="PATTACHITRA"
      categorySubtitle="PAGE 04 — FOLKLORE IN THREADS & SCROLL ART TRANSLATION"
      onBackToMenu={onBackToMenu}
      onNavigateToCategory={onNavigateToCategory}
      onBackToLanding={onBackToLanding}
    />

    <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <article className="overflow-hidden rounded-3xl border-2 border-pink-200 bg-white p-4 shadow-lg sm:p-6">
        <h1 className="mb-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-pink-950">
          Pattachitra
        </h1>
        <img
          src={pattachitraOne}
          alt="Pattachitra 1"
          className="mx-auto block h-auto max-h-[76vh] w-full object-contain"
        />
      </article>

      <section className="mt-10">
        <h2 className="mb-5 text-center text-xl font-black uppercase tracking-wide text-pink-950 sm:text-2xl">
          Hand Painting &amp; Construction of Silhouette
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {handPaintingImages.map((image, index) => (
            <article
              key={image.id}
              className="overflow-hidden rounded-2xl border-2 border-pink-200 bg-white p-3 shadow-md"
            >
              <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-pink-50">
                <img
                  src={image.url}
                  alt={image.label}
                  className="block h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="absolute bottom-3 right-3 rounded-full border border-pink-200 bg-white/95 p-2 text-pink-950 shadow-md transition hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  title={`View ${image.label} full screen`}
                  aria-label={`View ${image.label} full screen`}
                >
                  <Expand className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-5 text-center text-xl font-black uppercase tracking-wide text-pink-950 sm:text-2xl">
          Digital Motif Exploration
        </h2>
        <div className="grid grid-cols-1 gap-5">
          {[p4Image, p5Image, p6Image].map((image) => (
            <article
              key={image}
              className="overflow-hidden rounded-2xl border-2 border-pink-200 bg-white shadow-md"
            >
              <img
                src={image}
                alt="Digital motif exploration"
                className="block h-auto w-full"
              />
            </article>
          ))}
        </div>
      </section>

      <ImageLightboxModal
        isOpen={lightboxIndex !== null}
        images={handPaintingImages}
        currentIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </main>
  </div>
  );
};
