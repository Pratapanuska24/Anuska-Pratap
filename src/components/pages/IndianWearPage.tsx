import React from 'react';
import { PortfolioHeader } from '../PortfolioHeader';
import { AppMode } from '../../types';
import indianWearImage1 from '../../assets/images/I1.jpg';
import indianWearImage2 from '../../assets/images/I2.jpg';
import indianWearImage3 from '../../assets/images/I3.jpg';

interface IndianWearPageProps {
  onBackToMenu: () => void;
  onNavigateToCategory: (mode: AppMode) => void;
  onBackToLanding: () => void;
}

const indianWearImages = [
  { label: 'I1', src: indianWearImage1 },
  { label: 'I2', src: indianWearImage2 },
  { label: 'I3', src: indianWearImage3 },
];

export const IndianWearPage: React.FC<IndianWearPageProps> = ({
  onBackToMenu,
  onNavigateToCategory,
  onBackToLanding,
}) => (
  <div className="min-h-screen bg-[#FFF5F7] text-zinc-900 flex flex-col font-sans">
    <PortfolioHeader
      currentCategory="indian-wear"
      categoryTitle="INDIAN WEAR"
      categorySubtitle="PAGE 03 — HERITAGE TEXTILES, BROCADE & HAND EMBROIDERY"
      onBackToMenu={onBackToMenu}
      onNavigateToCategory={onNavigateToCategory}
      onBackToLanding={onBackToLanding}
    />

    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {indianWearImages.map((image) => (
        <figure
          key={image.label}
          className="w-full overflow-hidden rounded-2xl border-2 border-pink-200 bg-white p-2 shadow-lg"
        >
          <div className="flex aspect-[2000/1414] items-center justify-center overflow-hidden rounded-xl bg-pink-50">
            <img
              src={image.src}
              alt={`Indian Wear ${image.label}`}
              className="h-full w-full object-contain"
            />
          </div>
        </figure>
      ))}
    </main>
  </div>
);
