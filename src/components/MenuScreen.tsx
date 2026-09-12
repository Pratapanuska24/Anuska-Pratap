import React from 'react';
import { motion } from 'motion/react';
import { User, Layers, Sparkles, Compass, Leaf, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { AppMode } from '../types';

interface MenuScreenProps {
  onSelectOption: (option: AppMode) => void;
  onBackToLanding: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onSelectOption, onBackToLanding }) => {
  const menuCategories: Array<{
    id: AppMode;
    num: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentTag: string;
    bgAccent: string;
    folderHint: string;
  }> = [
    {
      id: 'profile',
      num: '01',
      title: 'PROFILE',
      subtitle: 'BIOGRAPHY & IDENTITY',
      description: 'Profile portrait, education and experience, skills matrix, design philosophy, and designer introduction.',
      icon: User,
      accentTag: 'DESIGNER DOSSIER',
      bgAccent: 'from-pink-100/80 to-white',
      folderHint: '/images/profile/',
    },
    {
      id: 'corsets',
      num: '02',
      title: 'THE CORSETS',
      subtitle: 'STRUCTURAL COUTURE CORSETRY',
      description: 'Spiral steel boned stays, sweetheart silhouettes, CAD technical flats, process draping & shoots.',
      icon: Layers,
      accentTag: 'HAUTE CORSETRY',
      bgAccent: 'from-pink-100/90 to-pink-50/40',
      folderHint: '/images/corsets/',
    },
    {
      id: 'indian-wear',
      num: '03',
      title: 'INDIAN WEAR',
      subtitle: 'HERITAGE COUTURE & EMBROIDERY',
      description: 'Zardozi brocade ensembles, pre-draped concept sarees, hand-embroidered cholis & textile swatches.',
      icon: Sparkles,
      accentTag: 'HERITAGE COUTURE',
      bgAccent: 'from-pink-50/90 to-white',
      folderHint: '/images/indian-wear/',
    },
    {
      id: 'pattachitra',
      num: '04',
      title: 'PATTACHITRA',
      subtitle: 'ODISHA FOLKLORE TEXTILE ART',
      description: 'Raghurajpur scroll inspiration, mineral pigment research, narrative silk panels & art translations.',
      icon: Compass,
      accentTag: 'ART TRANSLATION',
      bgAccent: 'from-pink-100/70 to-pink-50/30',
      folderHint: '/images/pattachitra/',
    },
    {
      id: 'sustainability',
      num: '05',
      title: 'SUSTAINABILITY',
      subtitle: 'CIRCULAR & ZERO-WASTE DESIGN',
      description: 'Post-industrial deadstock silks, denim upcycling, geometric origami folding & zero-waste markers.',
      icon: Leaf,
      accentTag: 'CIRCULAR DESIGN',
      bgAccent: 'from-pink-50/80 to-white',
      folderHint: '/images/sustainability/',
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-40 flex flex-col justify-between text-zinc-900 overflow-y-auto select-none font-sans p-4 sm:p-8 md:p-10"
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
      {/* Soft Pink/White Frosted Overlay */}
      <div className="fixed inset-0 bg-white/45 backdrop-blur-xs pointer-events-none" />

      {/* Grid Hairline Accents */}
      <div className="fixed top-0 right-1/2 w-[1px] h-full bg-pink-700/15 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-[1px] bg-pink-700/15 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-[1px] bg-pink-700/15 pointer-events-none" />

      {/* TOP BAR */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b-2 border-pink-300 pb-4 bg-white/85 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xs shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={onBackToLanding}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-[11px] font-bold tracking-widest uppercase transition-all rounded-lg shadow-xs cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Page 01 Landing</span>
          </button>
          <div className="text-xs font-mono tracking-widest text-pink-900 font-bold uppercase">
            PORTFOLIO DIRECTORY — PAGE 02
          </div>
        </div>

        <div className="text-[11px] font-black tracking-[0.3em] uppercase text-pink-950 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>ANUSKA PRATAP • ARCHIVE SS26</span>
        </div>
      </div>

      {/* MAIN 5-OPTION PORTFOLIO MENU GRID */}
      <div className="relative z-10 flex-1 my-6 flex items-center justify-center">
        <div className="w-full max-w-7xl">
          
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8">
            <span className="inline-block px-3 py-1 bg-pink-100/90 text-pink-900 text-[10px] font-mono tracking-[0.3em] uppercase font-bold rounded-full border border-pink-300 mb-2">
              Select A Collection / Category
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-pink-950 uppercase tracking-tight font-sans">
              PORTFOLIO INDEX
            </h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto mt-2 rounded-full" />
          </div>

          {/* 5 Large Clickable Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {menuCategories.map((item, idx) => {
              const Icon = item.icon;
              const isLarge = idx === 0 || idx === 1; // give first two cards extra visual prominence if desired

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectOption(item.id)}
                  className={`bg-white hover:bg-pink-50/60 border-2 border-pink-300 hover:border-pink-600 p-6 sm:p-7 rounded-2xl shadow-lg hover:shadow-xl flex flex-col justify-between cursor-pointer group transition-all relative overflow-hidden ${
                    idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {/* Subtle Corner Glow Accent */}
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-pink-400/15 rounded-full blur-xl group-hover:bg-pink-500/25 transition-all pointer-events-none" />

                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl sm:text-3xl font-black text-pink-600 font-serif">
                          {item.num}.
                        </span>
                        <span className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-pink-100/80 text-pink-800 border border-pink-200">
                          {item.accentTag}
                        </span>
                      </div>

                      <div className="w-11 h-11 rounded-xl bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-700 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Category Title */}
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-pink-950 uppercase mb-1 font-sans group-hover:text-pink-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-[10px] font-mono text-pink-700 font-bold uppercase tracking-wider mb-2.5">
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-zinc-600 leading-relaxed font-sans line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="mt-6 pt-4 border-t border-pink-200 flex items-center justify-between text-[11px] font-mono font-bold tracking-wider uppercase text-pink-700">
                    <span className="group-hover:text-pink-950 transition-colors flex items-center space-x-1">
                      <span>EXPLORE {item.title}</span>
                    </span>
                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-pink-950 font-mono tracking-widest uppercase border-t-2 border-pink-300 pt-3 bg-white/85 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xs shrink-0">
        <div>SPRING / SUMMER 2026 ARCHIVE</div>
        <div>5 CORE SPECIALIZATIONS — ANUSKA PRATAP</div>
        <div>LANDSCAPE NAVIGATION — PAGE 02</div>
      </div>
    </div>
  );
};
