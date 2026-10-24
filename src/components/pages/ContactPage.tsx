import React, { useState } from 'react';
import { PortfolioHeader } from '../PortfolioHeader';
import { ImageLightboxModal } from '../ImageLightboxModal';
import { AppMode, GalleryImage } from '../../types';
import contactImage from '../../assets/images/CONTACT.jpg';
import { Maximize2, Phone, Mail } from 'lucide-react';

interface ContactPageProps {
  onBackToMenu: () => void;
  onNavigateToCategory: (mode: AppMode) => void;
  onBackToLanding: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToMenu,
  onNavigateToCategory,
  onBackToLanding,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const contactGalleryImage: GalleryImage[] = [
    {
      id: 'contact-image-full',
      url: contactImage,
      label: 'CONTACT — ANUSKA PRATAP',
      categoryFolder: '/images/contact/',
      addedAt: Date.now(),
    },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col text-zinc-900 select-none font-sans overflow-x-clip relative bg-[#FFF5F7] selection:bg-pink-500 selection:text-white"
    >
      {/* Editorial Header Navigation */}
      <PortfolioHeader
        currentCategory="contact"
        categoryTitle="CONTACT"
        categorySubtitle="ANUSKA PRATAP"
        onBackToMenu={onBackToMenu}
        onNavigateToCategory={onNavigateToCategory}
        onBackToLanding={onBackToLanding}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center space-y-6">
        
        {/* Contact Image Container: 100% original asset, no crop, no distortion */}
        <div className="relative group w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-pink-200/90 shadow-xl bg-white transition-all hover:shadow-2xl">
          <img
            src={contactImage}
            alt="Contact Anuska Pratap"
            className="w-full h-auto object-contain block cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          />

          {/* Clean Full View Zoom Button */}
          <div className="absolute bottom-3 right-3 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-[#701a35] text-xs font-mono font-bold uppercase tracking-wider border border-pink-200/90 shadow-md transition-transform active:scale-95 cursor-zoom-in"
              title="View full image in high resolution"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#701a35]" />
              <span>Full View</span>
            </button>
          </div>
        </div>

        {/* Quick Direct Communication Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="tel:9668886970"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-pink-200 text-pink-900 hover:bg-pink-50 text-xs font-mono font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-pink-600" />
            <span>9668886970</span>
          </a>

          <a
            href="mailto:pratapanuska24@gmail.com"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-pink-200 text-pink-900 hover:bg-pink-50 text-xs font-mono font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-pink-600" />
            <span>pratapanuska24@gmail.com</span>
          </a>
        </div>
      </main>

      {/* Lightbox Modal for Full-Resolution Viewing */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        images={contactGalleryImage}
        currentIndex={0}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={() => {}}
      />
    </div>
  );
};

