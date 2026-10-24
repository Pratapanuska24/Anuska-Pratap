import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles,
  Play, 
  Pause,
  Compass,
  Layers,
  User,
  Leaf,
  Camera,
  Edit3,
  Check,
  X,
  Upload,
  RotateCcw,
  Scissors
} from 'lucide-react';
import { AppMode } from '../types';
import { 
  loadPersonalSpaceData, 
  loadPersonalSpaceDataAsync,
  savePersonalSpaceData, 
  defaultPersonalSpaceData,
  uploadAndPersistAsset,
  loadPhotoFromIdb,
  resolveImageFallback,
  PersonalSpaceData 
} from '../utils/portfolioStorage';

interface MenuScreenProps {
  onSelectOption: (option: AppMode) => void;
  onBackToLanding: () => void;
}

const PERSONAL_SPACE_ME1_MIGRATION_KEY = 'anuska_personal_space_me1_v1';
const PERSONAL_SPACE_INTRO_MIGRATION_KEY = 'anuska_personal_space_intro_v1';

interface ClockCategory {
  id: AppMode;
  numeral: string;
  indexNum: string;
  title: string;
  headerLabel: string;
  subtitle: string;
  accentTag: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CLOCK_CATEGORIES: ClockCategory[] = [
  {
    id: 'profile',
    numeral: 'I',
    indexNum: '01',
    title: 'ABOUT ME',
    headerLabel: 'ABOUT ME',
    subtitle: 'IDENTITY & ARCHIVE',
    accentTag: 'DOSSIER',
    icon: User,
  },
  {
    id: 'corsets',
    numeral: 'II',
    indexNum: '02',
    title: 'CORSET',
    headerLabel: 'CORSET',
    subtitle: 'STRUCTURAL COUTURE',
    accentTag: 'COUTERIE',
    icon: Layers,
  },
  {
    id: 'indian-wear',
    numeral: 'III',
    indexNum: '03',
    title: 'INDIAN WEAR',
    headerLabel: 'INDIAN WEAR',
    subtitle: 'HERITAGE EMBROIDERY',
    accentTag: 'HERITAGE',
    icon: Sparkles,
  },
  {
    id: 'pattachitra',
    numeral: 'IV',
    indexNum: '04',
    title: 'PATTACHITRA',
    headerLabel: 'PATTACHITRA',
    subtitle: 'ODISHA ART & SILK',
    accentTag: 'FOLKLORE',
    icon: Compass,
  },
  {
    id: 'sustainability',
    numeral: 'V',
    indexNum: '05',
    title: 'DIGITAL CANVAS',
    headerLabel: 'DIGITAL CANVAS',
    subtitle: 'CIRCULAR ZERO-WASTE',
    accentTag: 'CIRCULAR',
    icon: Leaf,
  },
  {
    id: 'dresses',
    numeral: 'VI',
    indexNum: '06',
    title: 'DRESSES',
    headerLabel: 'DRESSES',
    subtitle: 'SCULPTURAL DRAPERY',
    accentTag: 'SILHOUETTE',
    icon: Scissors,
  },
];

const PROJECT_CATEGORIES = ['corsets', 'dresses', 'indian-wear', 'pattachitra', 'sustainability']
  .map((id) => CLOCK_CATEGORIES.find((category) => category.id === id))
  .filter((category): category is ClockCategory => Boolean(category));

export const MenuScreen: React.FC<MenuScreenProps> = ({ onSelectOption, onBackToLanding }) => {
  const [hoveredCategory, setHoveredCategory] = useState<AppMode | null>(null);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false);

  // Dynamic responsive dimensions for Clock Container
  const clockContainerRef = useRef<HTMLDivElement>(null);
  const [orbitRadius, setOrbitRadius] = useState(215);
  const [innerExclusionRadius, setInnerExclusionRadius] = useState(72);

  // Animation angle state for the 6 category boxes
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const speedRef = useRef(0.0001); // Slow, continuous circular roaming
  const lastTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  // =========================================================================
  // TWO CLOCK HANDS:
  // 1. SMALL HAND: ALWAYS points toward ABOUT ME (Category Index 0)
  // 2. BIG HAND: Follows cursor-selected category (hovered)
  // =========================================================================
  const [smallHandAngle, setSmallHandAngle] = useState(-Math.PI / 2);
  const currentSmallHandAngleRef = useRef(-Math.PI / 2);

  const [bigHandAngle, setBigHandAngle] = useState(-Math.PI / 2);
  const currentBigHandAngleRef = useRef(-Math.PI / 2);

  const getIndiaTime = () => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(now);

    const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
    const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);
    const second = Number(parts.find((part) => part.type === 'second')?.value ?? 0);

    return { hour, minute, second };
  };

  const [indiaTime, setIndiaTime] = useState(getIndiaTime);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setIndiaTime(getIndiaTime());
    }, 1000);

    return () => window.clearInterval(tick);
  }, []);

  // =========================================================================
  // RIGHT-SIDE PERSONAL SPACE STATE (PHOTO ABOVE TEXT, PERSISTED & EDITABLE)
  // =========================================================================
  const [personalSpace, setPersonalSpace] = useState<PersonalSpaceData>(() => loadPersonalSpaceData());
  const [isEditingText, setIsEditingText] = useState(false);
  const [draftIntroText, setDraftIntroText] = useState(personalSpace.introText);
  const [isChangingPhoto, setIsChangingPhoto] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState(personalSpace.photoUrl);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Helper to count words
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Handle saving introduction text
  const handleSaveText = () => {
    const updated = { ...personalSpace, introText: draftIntroText.trim() };
    setPersonalSpace(updated);
    savePersonalSpaceData(updated);
    setIsEditingText(false);
    showToast('Introduction text saved');
  };

  const handleCancelText = () => {
    setDraftIntroText(personalSpace.introText);
    setIsEditingText(false);
  };

  // Load persisted photo from server disk & IndexedDB
  useEffect(() => {
    let isMounted = true;
    loadPersonalSpaceDataAsync().then((data) => {
      if (!data || !isMounted) return;

      let hasAppliedME1 = false;
      let hasAppliedIntro = false;
      try {
        hasAppliedME1 = localStorage.getItem(PERSONAL_SPACE_ME1_MIGRATION_KEY) === 'true';
        hasAppliedIntro = localStorage.getItem(PERSONAL_SPACE_INTRO_MIGRATION_KEY) === 'true';
      } catch {}

      const hydratedData = {
        ...data,
        photoUrl: hasAppliedME1 ? data.photoUrl : defaultPersonalSpaceData.photoUrl,
        introText: hasAppliedIntro ? data.introText : defaultPersonalSpaceData.introText,
      };

      setPersonalSpace(hydratedData);
      setPhotoUrlInput(hydratedData.photoUrl);
      setDraftIntroText(hydratedData.introText);

      if (!hasAppliedME1 || !hasAppliedIntro) {
        savePersonalSpaceData(hydratedData);
        try {
          localStorage.setItem(PERSONAL_SPACE_ME1_MIGRATION_KEY, 'true');
          localStorage.setItem(PERSONAL_SPACE_INTRO_MIGRATION_KEY, 'true');
        } catch {}
      }
    }).catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Photo upload with permanent preservation of exact original file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name);
    if (!isImage) {
      showToast('Please select a JPG, JPEG, PNG, or WEBP image.');
      e.target.value = '';
      return;
    }

    // 1. Instant display (0ms)
    const instantUrl = URL.createObjectURL(file);
    const instantUpdated = { ...personalSpace, photoUrl: instantUrl };
    setPersonalSpace(instantUpdated);
    setIsChangingPhoto(false);
    showToast('Photo loaded. Saving...');

    try {
      const { url } = await uploadAndPersistAsset(file, 'personal_space_photo');
      if (url) {
        const updated = { ...personalSpace, photoUrl: url };
        setPersonalSpace(updated);
        savePersonalSpaceData(updated);
        showToast('Photo saved permanently.');
      }
    } catch (err: any) {
      console.error('Error uploading photo:', err);
      showToast(`Photo visible. Note: ${err?.message || 'Storage error'}`);
    } finally {
      e.target.value = '';
    }
  };

  // Handle Photo URL save
  const handleSavePhotoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrlInput.trim()) return;
    const updated = { ...personalSpace, photoUrl: photoUrlInput.trim() };
    setPersonalSpace(updated);
    savePersonalSpaceData(updated);
    setIsChangingPhoto(false);
    showToast('Photo URL updated');
  };

  // Reset Personal Space to Default
  const handleResetPersonalSpace = () => {
    if (!window.confirm('Reset introduction photo and text to original portfolio defaults?')) return;
    setPersonalSpace(defaultPersonalSpaceData);
    savePersonalSpaceData(defaultPersonalSpaceData);
    setDraftIntroText(defaultPersonalSpaceData.introText);
    setPhotoUrlInput(defaultPersonalSpaceData.photoUrl);
    showToast('Reset to default introduction');
  };

  // Responsive Orbit Radius & Inner Exclusion Radius Calculation
  // 1. Clock size is increased by ~18% (orbitRadius 205-228px on desktop)
  // 2. Clear inner protected zone (innerExclusionRadius) around ANUSKA
  // 3. Hands and orbiting boxes are kept strictly outside the inner exclusion circle
  useEffect(() => {
    const updateDimensions = () => {
      if (clockContainerRef.current) {
        const w = clockContainerRef.current.clientWidth;
        const h = clockContainerRef.current.clientHeight;
        const minDim = Math.min(w, h);

        let r: number;
        let innerR: number;
        if (w < 480) {
          // Mobile:
          r = Math.min(Math.max(minDim * 0.36, 134), 152);
          innerR = 56;
        } else if (w < 768) {
          // Small tablet:
          r = Math.min(Math.max(minDim * 0.36, 168), 190);
          innerR = 64;
        } else {
          // Desktop: enlarged by ~18% (from 175px to 210-228px)
          r = Math.min(Math.max(minDim * 0.38, 205), 228);
          innerR = 72;
        }
        setOrbitRadius(r);
        setInnerExclusionRadius(innerR);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Main Animation Loop: Rotates orbit and aims both clock hands
  useEffect(() => {
    const baseSpeed = 0.0001; // ~63 seconds per complete 360-degree rotation

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = Math.min(time - lastTimeRef.current, 64);

        // Slow down orbit when hovering a category or manually paused
        const isPausedState = isManualPaused || hoveredCategory !== null;
        const targetSpeed = isPausedState ? 0 : baseSpeed;
        speedRef.current += (targetSpeed - speedRef.current) * 0.08;

        // Update continuous orbit angle
        angleRef.current += speedRef.current * delta;
        setAngle(angleRef.current);

        // ===================================================================
        // 1. SMALL HAND: shows the current hour in India Standard Time
        // ===================================================================
        const hourAngle = (((indiaTime.hour % 12) + indiaTime.minute / 60 + indiaTime.second / 3600) / 12) * Math.PI * 2 - Math.PI / 2;
        const targetSmallHandAngle = hourAngle;

        let diffSmall = targetSmallHandAngle - currentSmallHandAngleRef.current;
        while (diffSmall < -Math.PI) diffSmall += 2 * Math.PI;
        while (diffSmall > Math.PI) diffSmall -= 2 * Math.PI;
        currentSmallHandAngleRef.current += diffSmall * 0.12;
        setSmallHandAngle(currentSmallHandAngleRef.current);

        // ===================================================================
        // 2. BIG HAND: shows the current minute in India Standard Time
        // ===================================================================
        const minuteAngle = (((indiaTime.minute + indiaTime.second / 60) / 60) * Math.PI * 2) - Math.PI / 2;
        let targetBigHandAngle = minuteAngle;

        if (hoveredCategory) {
          const hoveredIdx = CLOCK_CATEGORIES.findIndex(cat => cat.id === hoveredCategory);
          if (hoveredIdx !== -1) {
            targetBigHandAngle = angleRef.current + (hoveredIdx * (2 * Math.PI)) / 6 - Math.PI / 2;
          }
        }

        let diffBig = targetBigHandAngle - currentBigHandAngleRef.current;
        while (diffBig < -Math.PI) diffBig += 2 * Math.PI;
        while (diffBig > Math.PI) diffBig -= 2 * Math.PI;
        currentBigHandAngleRef.current += diffBig * 0.10;
        setBigHandAngle(currentBigHandAngleRef.current);
      }

      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isManualPaused, hoveredCategory, indiaTime]);

  // Clock Hand Distances (Strictly respecting Outer Orbit Clearance):
  // Both hands originate radially from the central pivot (0,0) as solid, continuous straight lines.
  // Their lengths stop well inside the orbit radius so they NEVER touch or overlap the category boxes.
  const smallHandEndRadius = Math.min(orbitRadius * 0.46, 100);
  const bigHandEndRadius = Math.min(orbitRadius * 0.62, 134);

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between text-zinc-900 select-none font-sans overflow-x-hidden relative"
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
      {/* Soft Frosted White Background Overlay */}
      <div className="fixed inset-0 bg-white/60 backdrop-blur-xs pointer-events-none" />

      {/* Grid Hairline Accents */}
      <div className="fixed top-0 right-1/2 w-[1px] h-full bg-pink-700/15 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-[1px] bg-pink-700/15 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-[1px] bg-pink-700/15 pointer-events-none" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-14 right-6 z-50 bg-[#701a35] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-mono font-bold border border-pink-400">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP HEADER: THREE PRIMARY OPTIONS WITH PROJECT TITLES BELOW */}
      {/* CONTACT | ABOUT ME | PROJECTS */}
      {/* ===================================================================== */}
      <header className="relative z-50 bg-white/95 backdrop-blur-md border-b-2 border-pink-200 shadow-xs px-3 sm:px-6 py-2.5 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
          
          {/* Left: Return to Landing Page & Name */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button 
              type="button"
              onClick={onBackToLanding}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold tracking-wide transition-all shadow-2xs group cursor-pointer"
              title="Return to Cover Page"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>PAGE 01</span>
            </button>

            <div className="h-4 w-[1px] bg-pink-200" />

            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-black tracking-widest text-[#701a35] uppercase font-sans">
                ANUSKA PRATAP
              </span>
              <span className="hidden sm:inline text-[10px] text-pink-700 font-mono tracking-wider uppercase">
                • DIRECTORY
              </span>
            </div>
          </div>

          {/* Primary navigation: only three top-level labels */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-pink-50/90 p-1 rounded-xl border border-pink-200 shrink-0">
            <button
              type="button"
              onClick={() => onSelectOption('profile')}
              className="px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono tracking-wider font-bold text-pink-900 hover:text-[#701a35] hover:bg-pink-200/60 transition-all whitespace-nowrap cursor-pointer"
            >
              ABOUT ME
            </button>
            <span className="text-pink-300 text-xs font-mono select-none px-0.5">|</span>
            <div className="relative" onMouseLeave={() => setIsProjectsMenuOpen(false)}>
              <button
                type="button"
                onClick={() => {
                  const supportsHover = window.matchMedia('(hover: hover)').matches;
                  setIsProjectsMenuOpen((open) => supportsHover || !open);
                }}
                onMouseEnter={() => {
                  if (window.matchMedia('(hover: hover)').matches) {
                    setIsProjectsMenuOpen(true);
                  }
                }}
                aria-expanded={isProjectsMenuOpen}
                aria-haspopup="true"
                className="px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono tracking-wider font-bold text-pink-900 hover:text-[#701a35] hover:bg-pink-200/60 transition-all whitespace-nowrap cursor-pointer"
              >
                PROJECTS
              </button>
              {isProjectsMenuOpen && (
                <div
                  className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-xl border border-pink-200 bg-white p-2 shadow-xl"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                      setIsProjectsMenuOpen(false);
                    }
                  }}
                >
                  {PROJECT_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setIsProjectsMenuOpen(false);
                        onSelectOption(category.id);
                      }}
                      className="block w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-pink-50 focus:bg-pink-50 focus:outline-none"
                    >
                      <span className="block text-xs font-mono font-bold tracking-wide text-pink-900">
                        {category.id === 'corsets' ? 'CORSETS' : category.title}
                      </span>
                      <span className="mt-0.5 block text-[10px] font-mono uppercase tracking-wider text-pink-700">
                        {category.subtitle} · {category.accentTag}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-pink-300 text-xs font-mono select-none px-0.5">|</span>
            <button
              type="button"
              onClick={() => onSelectOption('profile')}
              className="px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono tracking-wider font-bold text-pink-900 hover:text-[#701a35] hover:bg-pink-200/60 transition-all whitespace-nowrap cursor-pointer"
            >
              CONTACT
            </button>
          </nav>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. PAGE TITLE: "WHAT DO YOU WANT TO EXPLORE" (Prominently displayed)      */}
      {/* ========================================================================= */}
      <div className="relative z-30 pt-4 pb-2 text-center select-none shrink-0">
        <h1 
          className="text-sm sm:text-base md:text-lg font-black tracking-[0.25em] uppercase drop-shadow-2xs"
          style={{
            color: '#5e152f',
            fontFamily: '"Times New Roman", Times, serif',
          }}
        >
          WHAT DO YOU WANT TO EXPLORE
        </h1>
        <div className="w-16 sm:w-24 h-[2px] bg-[#5e152f]/40 mx-auto mt-1.5" />
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT: SPLIT LAYOUT                                             */}
      {/* LEFT: CLOCK NAVIGATION WITH 6 CATEGORIES & TWO HANDS                     */}
      {/* RIGHT: EDITABLE PERSONAL SPACE (PHOTO ABOVE ~50-WORD TEXT)                */}
      {/* ========================================================================= */}
      <main className="relative z-20 flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between p-3 sm:p-4 lg:p-6 gap-6 lg:gap-8 overflow-hidden">
        
        {/* ======================================================================= */}
        {/* LEFT: THE CLOCK-LIKE CIRCULAR NAVIGATION (Arranged toward left)         */}
        {/* ======================================================================= */}
        <div 
          ref={clockContainerRef}
          className="relative w-full lg:w-[58%] h-[460px] sm:h-[510px] lg:h-[560px] flex items-center justify-center shrink-0 lg:-translate-x-2"
        >
          {/* =================================================================== */}
          {/* LAYER 3: CIRCULAR ORBIT, OUTER TICK RIM & INNER EXCLUSION BOUNDARY  */}
          {/* =================================================================== */}
          
          {/* Subtle Outer Dial Outline Ring */}
          <div 
            className="absolute rounded-full border border-pink-300/40 pointer-events-none transition-all duration-300 z-10"
            style={{
              width: orbitRadius * 2,
              height: orbitRadius * 2,
            }}
          />

          {/* Clock Outer Rim with 12 hour tick dots */}
          <div 
            className="absolute rounded-full border border-dashed border-[#701a35]/20 pointer-events-none transition-all duration-300 z-10"
            style={{
              width: orbitRadius * 2 + 36,
              height: orbitRadius * 2 + 36,
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const tickAngle = (i * 30 * Math.PI) / 180 - Math.PI / 2;
              const r = orbitRadius + 18;
              const tx = r * Math.cos(tickAngle);
              const ty = r * Math.sin(tickAngle);
              const isCardinal = i % 3 === 0;

              return (
                <div
                  key={i}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    isCardinal 
                      ? 'w-1.5 h-1.5 bg-[#701a35]/70 ring-2 ring-pink-200' 
                      : 'w-1 h-1 bg-pink-400/40'
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, 0)`,
                  }}
                />
              );
            })}
          </div>

          {/* Inner Protected Exclusion Zone - Subtle Horology Border Guide */}
          <div 
            className="absolute rounded-full border border-dashed border-[#701a35]/15 pointer-events-none z-10 transition-all duration-300"
            style={{
              width: innerExclusionRadius * 2,
              height: innerExclusionRadius * 2,
            }}
            title="Inner Protected Zone: Permanently clear around ANUSKA"
          />

          {/* =================================================================== */}
          {/* LAYER 4: SIX (6) COMPACT MOVING CATEGORY BOXES                      */}
          {/* ABOUT ME, CORSET, INDIAN WEAR, PATTACHITRA, SUSTAINABILITY, DRESSES */}
          {/* Orbiting strictly in OUTER ZONE (never enters inner exclusion zone) */}
          {/* =================================================================== */}
          {CLOCK_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const orbitStep = (Math.PI * 2) / CLOCK_CATEGORIES.length;
            const currentItemAngle = angle + idx * orbitStep - Math.PI / 2;
            const x = orbitRadius * Math.cos(currentItemAngle);
            const y = orbitRadius * Math.sin(currentItemAngle);
            const isHovered = hoveredCategory === cat.id;
            const isAboutMe = cat.id === 'profile';

            return (
              <div
                key={cat.id}
                className="absolute left-1/2 top-1/2 cursor-pointer select-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  transformOrigin: 'center center',
                  willChange: 'transform',
                  zIndex: isHovered ? 38 : 25,
                }}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onTouchStart={() => setHoveredCategory(cat.id)}
                onClick={() => onSelectOption(cat.id)}
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className={`
                    w-[94px] sm:w-[114px] md:w-[124px]
                    p-1.5 sm:p-2 md:p-2.5
                    rounded-xl
                    bg-white/95 backdrop-blur-md
                    border transition-all duration-200
                    shadow-sm hover:shadow-xl
                    flex flex-col justify-between
                    text-left
                    ${isHovered 
                      ? 'border-2 border-[#701a35] bg-pink-50/95 ring-4 ring-[#701a35]/15 shadow-[#701a35]/20' 
                      : isAboutMe 
                      ? 'border-pink-400 bg-white/95' 
                      : 'border-pink-300 hover:border-[#701a35]/80'}
                  `}
                >
                  {/* Top Row: Roman Numeral & Icon */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#701a35] tracking-wider">
                      • {cat.numeral} •
                    </span>

                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center transition-colors ${
                      isHovered ? 'bg-[#701a35] text-white' : 'bg-pink-100 text-[#701a35]'
                    }`}>
                      <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </div>
                  </div>

                  {/* Category Title & Subtitle */}
                  <div>
                    <h3 className="text-[9.5px] sm:text-[11px] md:text-xs font-black tracking-tight text-pink-950 uppercase font-sans leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-[6.5px] sm:text-[7.5px] md:text-[8px] font-mono text-pink-700 font-semibold uppercase tracking-wider mt-0.5 line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* =================================================================== */}
          {/* LAYER 5: CLOCK HANDS (STRICTLY CONFINED OUTSIDE INNER EXCLUSION)     */}
          {/* Originate radially from central pivot, but visible strokes STOP     */}
          {/* BEFORE entering inner exclusion zone (handStartRadius = R_inner+14) */}
          {/* NEITHER HAND EVER PASSES ACROSS OR COVERS THE CENTRAL ANUSKA TEXT   */}
          {/* =================================================================== */}
          <svg 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 overflow-visible"
            style={{
              width: `${(orbitRadius + 40) * 2}px`,
              height: `${(orbitRadius + 40) * 2}px`,
            }}
            viewBox={`-${orbitRadius + 40} -${orbitRadius + 40} ${(orbitRadius + 40) * 2} ${(orbitRadius + 40) * 2}`}
          >
            <defs>
              <linearGradient id="smallHandGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#701a35" />
                <stop offset="50%" stopColor="#831843" />
                <stop offset="100%" stopColor="#701a35" />
              </linearGradient>
              <linearGradient id="bigHandGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#701a35" />
                <stop offset="50%" stopColor="#9d174d" />
                <stop offset="100%" stopColor="#701a35" />
              </linearGradient>
              <filter id="handShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#701a35" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* SMALL HAND (Hour Hand): Clean, continuous, straight solid line connected to center */}
            <g 
              transform={`rotate(${(smallHandAngle * 180) / Math.PI + 90})`}
              filter="url(#handShadow)"
            >
              <line 
                x1="0" 
                y1="0" 
                x2="0" 
                y2={-smallHandEndRadius} 
                stroke="#701a35" 
                strokeWidth="3.6" 
                strokeLinecap="round" 
              />
              <polygon 
                points={`0,${-smallHandEndRadius - 6} -4,${-smallHandEndRadius + 2} 4,${-smallHandEndRadius + 2}`} 
                fill="#701a35" 
              />
            </g>

            {/* BIG HAND (Minute Hand): Clean, continuous, straight solid line connected to center */}
            <g 
              transform={`rotate(${(bigHandAngle * 180) / Math.PI + 90})`}
              filter="url(#handShadow)"
            >
              <line 
                x1="0" 
                y1="0" 
                x2="0" 
                y2={-bigHandEndRadius} 
                stroke="#701a35" 
                strokeWidth="2.4" 
                strokeLinecap="round" 
              />
              <polygon 
                points={`0,${-bigHandEndRadius - 7} -3.5,${-bigHandEndRadius + 2} 3.5,${-bigHandEndRadius + 2}`} 
                fill="#701a35" 
              />
            </g>

            {/* Central Pivot Jewel: Connects both hands seamlessly */}
            <circle cx="0" cy="0" r="4.5" fill="#701a35" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>

          {/* =================================================================== */}
          {/* HIGHEST LAYER (LAYERS 6 & 7): PROTECTED CENTRAL ANUSKA MEDALLION    */}
          {/* Topmost z-index (z-50), stationary, clear breathing room around it  */}
          {/* Central Pivot Cap jewel (Layer 6) + ANUSKA / ANUSKA PRATAP (Layer 7)*/}
          {/* =================================================================== */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none">
            <div className="w-24 h-24 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-full bg-white/98 backdrop-blur-md border-2 border-pink-300 shadow-xl flex flex-col items-center justify-center p-2 text-center ring-4 ring-pink-100/80">
              {/* Layer 6: Center Pivot Cap Jewel */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#701a35] border-2 border-white shadow-xs mb-1 shrink-0 ring-1 ring-pink-300" />

              {/* Layer 7: Project Directory */}
              <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-[0.22em] text-[#701a35] uppercase font-sans leading-none">
                PROJECTS
              </span>

              {/* Divider */}
              <div className="w-6 sm:w-8 h-[1.5px] bg-[#701a35]/40 my-1 shrink-0" />

              {/* Layer 7: Portfolio Directory */}
              <span className="text-[7px] sm:text-[8px] md:text-[8.5px] font-mono tracking-[0.22em] text-pink-900 font-bold uppercase leading-none">
                PORTFOLIO DIRECTORY
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT: EDITABLE PERSONAL SPACE (PHOTO ABOVE ~50-WORD INTRODUCTION TEXT)  */}
        {/* User can replace photo and edit text later; saved in localStorage       */}
        {/* ======================================================================= */}
        <aside className="w-full lg:w-[40%] max-w-md shrink-0 bg-white/95 backdrop-blur-md rounded-3xl border-2 border-pink-300 shadow-xl p-5 sm:p-6 space-y-4">
          
          {/* Header Bar of Personal Space */}
          <div className="flex items-center justify-between border-b border-pink-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#701a35]" />
              <h2 className="text-xs sm:text-sm font-black tracking-wider text-[#701a35] uppercase font-sans">
                DESIGNER DOSSIER
              </h2>
            </div>
            
          </div>

          {/* 1. PHOTO (ABOVE THE TEXT) - EDITABLE / UPLOADABLE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-[#701a35] tracking-wider">
                Photo
              </span>
            </div>

            {/* Photo Card Preview */}
            <div 
              className="relative group aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-pink-100 border-2 shadow-inner"
              style={{ borderColor: '#340b0b' }}
            >
              <img
                src={personalSpace.photoUrl}
                alt="Anuska Pratap Designer Portrait"
                referrerPolicy="no-referrer"
                onError={async (e) => {
                  const target = e.currentTarget;
                  const fallback = await resolveImageFallback(target.src, 'personal_space_photo');
                  if (fallback && target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
              />

            </div>

            {/* Photo Edit Panel */}
            {isChangingPhoto && (
              <div className="p-3 bg-pink-50/90 rounded-2xl border border-pink-200 space-y-2.5 animate-fadeIn">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#701a35]">
                  <span>Upload or Paste Photo URL:</span>
                  <button 
                    type="button" 
                    onClick={() => setIsChangingPhoto(false)}
                    className="text-pink-500 hover:text-pink-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Upload Local File */}
                <div>
                  <label
                    className="relative overflow-hidden w-full py-2 px-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/jpg,.jpg,.jpeg,.png,.webp,image/*"
                      onClick={(e) => {
                        (e.target as HTMLInputElement).value = '';
                      }}
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-3.5 h-3.5 pointer-events-none" />
                    <span className="pointer-events-none">Upload Image From Computer</span>
                  </label>
                </div>

                <div className="flex items-center my-1">
                  <div className="flex-1 h-[1px] bg-pink-200" />
                  <span className="px-2 text-[9px] font-mono text-pink-600 uppercase font-bold">or URL</span>
                  <div className="flex-1 h-[1px] bg-pink-200" />
                </div>

                {/* Enter Image URL */}
                <form onSubmit={handleSavePhotoUrl} className="flex space-x-1.5">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-pink-300 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-pink-500 bg-white"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#701a35] hover:bg-[#831843] text-white text-xs font-mono font-bold rounded-lg cursor-pointer"
                  >
                    Save URL
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* 2. TEXT (BELOW THE PHOTO) - EDITABLE ~50-WORD INTRODUCTION */}
          <div className="space-y-2 pt-1 border-t border-pink-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#701a35] tracking-wider">
                  Introduction
                </span>
                <span className="text-[9px] font-mono text-pink-600 font-semibold">
                  • ~50 words ({countWords(isEditingText ? draftIntroText : personalSpace.introText)} words)
                </span>
              </div>

            </div>

            {/* Intro Text Display or Inline Editor */}
            {isEditingText ? (
              <div className="space-y-2">
                <textarea
                  rows={4}
                  value={draftIntroText}
                  onChange={(e) => setDraftIntroText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border-2 border-pink-300 text-xs text-zinc-800 leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white shadow-inner"
                  placeholder="Enter approximately 50-word introduction..."
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-pink-700">
                    Word count: <strong>{countWords(draftIntroText)}</strong> words
                  </span>

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleCancelText}
                      className="px-3 py-1 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-mono font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveText}
                      className="px-3 py-1 rounded-lg bg-[#701a35] hover:bg-[#831843] text-white text-xs font-mono font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <Check className="w-3 h-3" />
                      <span>Save Text</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-pink-50/40 rounded-2xl border border-pink-100">
                <p className="text-xs text-zinc-800 leading-relaxed font-sans">
                  {personalSpace.introText}
                </p>
              </div>
            )}
          </div>

          {/* Quick link button to About Me Full Page */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onSelectOption('profile')}
              className="w-full py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-[#701a35] text-xs font-mono font-bold tracking-wider uppercase border border-pink-300 transition-all flex items-center justify-center space-x-1.5 shadow-2xs cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Explore Complete About Me Archive →</span>
            </button>
          </div>

        </aside>

      </main>

      {/* ========================================================================= */}
      {/* 4. BOTTOM STATUS & ACCESSIBILITY BAR                                      */}
      {/* ========================================================================= */}
      <footer className="relative z-30 flex flex-wrap items-center justify-between gap-2 text-[10px] text-pink-950 font-mono tracking-widest uppercase border-t-2 border-pink-300 py-2 px-4 sm:px-6 bg-white/90 backdrop-blur-md shadow-xs shrink-0">
        
        {/* Left: Motion Status & Pause Control */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsManualPaused(!isManualPaused)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-pink-100 hover:bg-pink-200 text-[#701a35] border border-pink-300 transition-colors cursor-pointer"
            title={isManualPaused ? 'Resume slow circular roaming' : 'Pause movement'}
          >
            {isManualPaused ? (
              <>
                <Play className="w-3 h-3 text-[#701a35]" />
                <span>Resume Orbit</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-[#701a35]" />
                <span>Pause Orbit</span>
              </>
            )}
          </button>

          <span className="hidden sm:inline text-pink-800">
            {hoveredCategory !== null
              ? '• BIG HAND AIMED AT HOVERED CATEGORY'
              : isManualPaused
              ? '• ORBIT PAUSED'
              : '• DUAL CLOCK HANDS ACTIVE (SMALL: ABOUT ME • BIG: HOVER)'}
          </span>
        </div>

        {/* Center: Instruction */}
        <div className="text-center hidden md:block text-pink-800">
          SMALL HAND → ABOUT ME • BIG HAND → HOVERED CATEGORY
        </div>

        {/* Right: Page Tag */}
        <div className="text-[#701a35] font-bold">
          PAGE 02 • DIRECTORY
        </div>

      </footer>

    </div>
  );
};
