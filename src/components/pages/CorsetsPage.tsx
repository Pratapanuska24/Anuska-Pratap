import React, { useState, useEffect, useRef } from 'react';
import { PortfolioHeader } from '../PortfolioHeader';
import { ImageLightboxModal } from '../ImageLightboxModal';
import { AppMode, GalleryImage } from '../../types';
import { staticCorsetProjects, CorsetProject } from '../../data/corsetProjects';
import { 
  Maximize2, 
  Image as ImageIcon,
  Upload,
  RefreshCw,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import {
  fileToDataUrl,
  savePhotoToIdb,
  loadCorsetEditorialSectionsAsync,
  saveCorsetEditorialSections,
  uploadAndPersistAsset,
  resolveImageFallback,
} from '../../utils/portfolioStorage';

interface CorsetsPageProps {
  onBackToMenu: () => void;
  onNavigateToCategory: (mode: AppMode) => void;
  onBackToLanding: () => void;
}

export const CorsetsPage: React.FC<CorsetsPageProps> = ({
  onBackToMenu,
  onNavigateToCategory,
  onBackToLanding,
}) => {
  // Synchronously load initial projects, then hydrate from IndexedDB for zero-flicker persistence
  const [projects, setProjects] = useState<CorsetProject[]>(() => {
    try {
      const savedText = localStorage.getItem('anuska_corset_editorial_text_v3');
      if (savedText) {
        const parsed = JSON.parse(savedText);
        if (Array.isArray(parsed)) {
          return staticCorsetProjects.map((proj, idx) => {
            const item = parsed[idx];
            if (!item) return proj;
            return {
              ...proj,
              name: ['corset-01', 'corset-02', 'corset-03', 'corset-04'].includes(proj.id) ? proj.name : (item.name && item.name.trim() ? item.name : proj.name),
              title: ['corset-02', 'corset-03', 'corset-04'].includes(proj.id) ? proj.title : (item.title && item.title.trim() ? item.title : proj.title),
              description: ['corset-01', 'corset-02', 'corset-03', 'corset-04'].includes(proj.id) ? proj.description : (item.description && item.description.trim() ? item.description : proj.description),
              images: proj.images,
            };
          });
        }
      }
    } catch (e) {
      console.warn('Could not read saved corset metadata:', e);
    }
    return staticCorsetProjects;
  });

  // Lightbox viewer state for visitors to inspect photos in full resolution
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Track dragging state per slot for smooth drag & drop feedback
  const [draggingSlot, setDraggingSlot] = useState<string | null>(null);

  // Toast status when an image is saved permanently
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track any image loading errors gracefully
  const [failedSlots, setFailedSlots] = useState<Record<string, boolean>>({});

  // References to ensure synchronous state and avoid stale closures
  const projectsRef = useRef(projects);
  projectsRef.current = projects;

  // Asynchronously hydrate any custom-uploaded or persistent images from server disk and IndexedDB
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const sections = await loadCorsetEditorialSectionsAsync();
        if (!isMounted || !sections || sections.length === 0) return;
        setProjects((prev) => {
          const updated = prev.map((proj, idx) => {
            const sec = sections[idx];
            if (!sec) return proj;
            const maxLen = Math.max(proj.images.length, sec.images.length);
            const mergedImages = Array.from({ length: maxLen }, (_, sIdx) => {
              const secImg = sec.images[sIdx];
              if (secImg === '__REMOVED__') return null;
              if (secImg !== undefined && secImg !== null) return secImg;
              return proj.images[sIdx] ?? null;
            });
            return {
              ...proj,
              name: ['corset-01', 'corset-02', 'corset-03', 'corset-04'].includes(proj.id) ? proj.name : (sec.name || proj.name),
              title: ['corset-02', 'corset-03', 'corset-04'].includes(proj.id) ? proj.title : (sec.title || proj.title),
              description: ['corset-01', 'corset-02', 'corset-03', 'corset-04'].includes(proj.id) ? proj.description : (sec.description || proj.description),
              images: mergedImages,
            };
          });
          projectsRef.current = updated;
          return updated;
        });
      } catch (e) {
        console.warn('Corset async hydration warning:', e);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  // Upload or replace image for a specific slot with permanent persistence
  const handleUploadSlotImage = async (projectIdx: number, slotIdx: number, file: File) => {
    if (!file) {
      showToast('No file was selected.');
      return;
    }

    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name);
    if (!isImage) {
      showToast('Please select a JPG, JPEG, PNG, or WEBP image file.');
      return;
    }

    // 1. INSTANT DISPLAY (0ms delay): Show exact original user image immediately
    const instantUrl = URL.createObjectURL(file);
    const currentProjects = projectsRef.current;
    const instantProjects = currentProjects.map((p, pIdx) => {
      if (pIdx !== projectIdx) return p;
      const newImgs = [...p.images];
      newImgs[slotIdx] = instantUrl;
      return { ...p, images: newImgs };
    });
    projectsRef.current = instantProjects;
    setProjects(instantProjects);

    // Clear any failed state
    const failedKey = `${projectIdx}-${slotIdx}`;
    setFailedSlots((prev) => {
      const next = { ...prev };
      delete next[failedKey];
      return next;
    });

    showToast(`Slot 0${slotIdx + 1} updated. Persisting...`);

    // 2. PERMANENT DISK & IDB PERSISTENCE
    try {
      const slotKey = `corset_${projectIdx}_slot_${slotIdx}`;
      const { url: permanentUrl } = await uploadAndPersistAsset(file, slotKey);

      if (permanentUrl) {
        const nextProjects = projectsRef.current.map((p, pIdx) => {
          if (pIdx !== projectIdx) return p;
          const newImgs = [...p.images];
          newImgs[slotIdx] = permanentUrl;
          return { ...p, images: newImgs };
        });

        projectsRef.current = nextProjects;
        setProjects(nextProjects);

        const sectionsData = nextProjects.map((p) => ({
          id: p.id,
          title: p.title,
          name: p.name,
          images: p.images,
          description: p.description,
        }));
        await saveCorsetEditorialSections(sectionsData);

        showToast(`Original photo "${file.name}" saved permanently.`);
      }
    } catch (err: any) {
      console.error('Failed to permanently store corset image:', err);
      showToast(`Photo visible. Note: ${err?.message || 'Storage warning'}`);
    }
  };

  // Remove image from a specific slot
  const handleRemoveSlotImage = async (projectIdx: number, slotIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentProjects = projectsRef.current;
    const nextProjects = currentProjects.map((p, pIdx) => {
      if (pIdx !== projectIdx) return p;
      const newImgs = [...p.images];
      newImgs[slotIdx] = null;
      return { ...p, images: newImgs };
    });

    projectsRef.current = nextProjects;
    setProjects(nextProjects);

    const slotKey = `corset_${projectIdx}_slot_${slotIdx}`;
    await savePhotoToIdb(slotKey, '__REMOVED__');

    const sectionsData = nextProjects.map((p) => ({
      id: p.id,
      title: p.title,
      name: p.name,
      images: p.images,
      description: p.description,
    }));
    await saveCorsetEditorialSections(sectionsData);
    showToast('Image removed from slot.');
  };

  // Open Lightbox to inspect image in full resolution & aspect ratio
  const handleOpenLightbox = (projectIdx: number, slotIdx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const project = projects[projectIdx];
    if (!project) return;

    const validImages: { img: string; slot: number }[] = [];
    project.images.forEach((img, idx) => {
      if (img && !failedSlots[`${projectIdx}-${idx}`]) {
        validImages.push({ img, slot: idx });
      }
    });

    if (validImages.length === 0) return;

    const targetIdx = validImages.findIndex((v) => v.slot === slotIdx);
    const displayName = project.name ? `CORSET ${project.number} — ${project.name}` : `CORSET ${project.number}`;
    
    const galleryList: GalleryImage[] = validImages.map((v) => ({
      id: `${project.id}-slot-${v.slot}`,
      url: v.img,
      label: `${displayName} • Image 0${v.slot + 1}`,
      categoryFolder: '/images/corsets/',
      addedAt: Date.now(),
    }));

    setLightboxImages(galleryList);
    setLightboxIndex(targetIdx >= 0 ? targetIdx : 0);
    setIsLightboxOpen(true);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col text-zinc-900 select-none font-sans overflow-x-clip relative bg-[#FFF5F7] selection:bg-pink-500 selection:text-white"
    >


      {/* HEADER: Exact category navigation */}
      <PortfolioHeader
        currentCategory="corsets"
        categoryTitle="THE CHRONICALS OF THE CORSET"
        categorySubtitle={undefined}
        onBackToMenu={onBackToMenu}
        onNavigateToCategory={onNavigateToCategory}
        onBackToLanding={onBackToLanding}
      />

      {/* PERSISTENCE TOAST NOTIFICATION */}
      {statusMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-pink-300 text-pink-950 shadow-lg text-xs font-medium animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        
        {/* PAGE HEADING: "THE CHRONICALS OF THE CORSET" */}
        <div className="pt-2 sm:pt-4 pb-2 text-center select-none flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-[#340b0b] uppercase drop-shadow-2xs">
            THE CHRONICALS OF THE CORSET
          </h1>
        </div>

        {/* 4 CORSET PROJECT SECTIONS */}
        <div className="space-y-12 sm:space-y-16">
          {projects.map((project, projectIdx) => (
            <article
              key={project.id}
              className="bg-white/85 backdrop-blur-sm rounded-3xl border border-pink-200/90 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6 transition-all"
            >
              {/* CORSET HEADER: CORSET 0X — NAME */}
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 border-b border-pink-100 pb-5">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#340b0b] tracking-tight">
                  {`CORSET ${project.number}`}
                  {project.name && project.name.trim() !== 'Corset' && project.name.trim() !== '' 
                    ? ` — ${project.name}` 
                    : ''}
                </h2>
              </div>

              {/* FIXED IMAGE SLOTS GALLERY */}
              <div className={`grid gap-4 sm:gap-6 ${
                project.images.length === 3 
                  ? 'grid-cols-1 sm:grid-cols-3' 
                  : project.images.length === 5 
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4' 
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
                {project.images.map((image, slotIdx) => {
                  const slotKey = `${projectIdx}-${slotIdx}`;
                  const isSlotFailed = Boolean(failedSlots[slotKey]);
                  const isDragging = draggingSlot === slotKey;
                  const inputId = `file-input-${projectIdx}-${slotIdx}`;
                  const fillsFrame = ['corset-01', 'corset-02', 'corset-03', 'corset-04'].includes(project.id);

                  // UNASSIGNED / EMPTY / FAILED SLOT: INTERACTIVE UPLOAD DROPZONE
                  if (!image || isSlotFailed) {
                    return (
                      <div
                        key={slotIdx}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDraggingSlot(slotKey);
                        }}
                        onDragLeave={() => setDraggingSlot(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDraggingSlot(null);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleUploadSlotImage(projectIdx, slotIdx, e.dataTransfer.files[0]);
                          }
                        }}
                        className={`hidden relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center p-4 text-center cursor-pointer select-none group shadow-2xs ${
                          isDragging
                            ? 'border-pink-500 bg-pink-50/80 scale-[1.01]'
                            : 'border-pink-200/80 bg-[#FAF5F6]/70 hover:border-pink-400 hover:bg-[#FAF5F6]'
                        }`}
                        title={`Click to upload photo for Slot 0${slotIdx + 1}`}
                      >
                        <input
                          id={inputId}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg,.jpg,.jpeg,.png,.webp,image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                          onClick={(e) => {
                            (e.target as HTMLInputElement).value = '';
                          }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleUploadSlotImage(projectIdx, slotIdx, e.target.files[0]);
                              e.target.value = '';
                            }
                          }}
                        />

                        <div className="w-11 h-11 rounded-full bg-pink-100/80 text-pink-700 flex items-center justify-center mb-3 shadow-2xs group-hover:scale-105 transition-transform pointer-events-none">
                          <Upload className="w-5 h-5" />
                        </div>

                        <span className="text-xs font-mono font-bold tracking-wider text-pink-900/80 uppercase pointer-events-none">
                          Upload Photo
                        </span>
                        <span className="text-[11px] font-sans text-pink-800/60 mt-1 max-w-[140px] leading-tight pointer-events-none">
                          Click or drop image file
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 mt-2 px-2 py-0.5 rounded bg-white/70 border border-pink-200/40 pointer-events-none">
                          Slot 0{slotIdx + 1}
                        </span>
                      </div>
                    );
                  }

                  // POPULATED IMAGE CONTAINER
                  // Displays the exact original image, preserving 100% original aspect ratio, zero distortion, zero crop
                  return (
                    <div
                      key={slotIdx}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDraggingSlot(slotKey);
                      }}
                      onDragLeave={() => setDraggingSlot(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDraggingSlot(null);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleUploadSlotImage(projectIdx, slotIdx, e.dataTransfer.files[0]);
                        }
                      }}
                      className={`relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl border bg-[#FAF5F6] shadow-xs overflow-hidden flex items-center justify-center ${
                        fillsFrame ? 'p-0' : 'p-3'
                      } group transition-all duration-200 hover:shadow-md ${
                        isDragging ? 'border-pink-500 ring-2 ring-pink-400' : 'border-pink-200/90'
                      }`}
                    >
                      {/* Corset 1-4 images fill their cards. */}
                      <img
                        src={image}
                        alt={`${project.title} - Image 0${slotIdx + 1}`}
                        referrerPolicy="no-referrer"
                        onError={async (e) => {
                          const target = e.currentTarget;
                          const currentSrc = target.src;
                          // If current src has .jpg.jpeg, try .jpg, then .jpeg
                          if (currentSrc.includes('.jpg.jpeg')) {
                            target.src = currentSrc.replace('.jpg.jpeg', '.jpg');
                            return;
                          }
                          if (currentSrc.includes('.jpeg') && !currentSrc.includes('.jpg')) {
                            target.src = currentSrc.replace('.jpeg', '.jpg');
                            return;
                          }
                          // Attempt recovery from IndexedDB before marking slot as failed
                          const fallback = await resolveImageFallback(currentSrc, slotKey);
                          if (fallback && target.src !== fallback) {
                            target.src = fallback;
                            return;
                          }
                          setFailedSlots((prev) => ({
                            ...prev,
                            [slotKey]: true,
                          }));
                        }}
                        onClick={() => handleOpenLightbox(projectIdx, slotIdx)}
                        className={`${fillsFrame ? 'w-full h-full object-cover' : 'max-w-full max-h-full w-auto h-auto object-contain'} select-none cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]`}
                      />

                      {/* Top Action Bar on Hover: Replace & Remove */}
                      <div className="hidden absolute top-2.5 right-2.5 z-10 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <label
                          className="relative p-1.5 rounded-lg bg-white/95 hover:bg-white text-pink-900 border border-pink-200 shadow-xs transition-transform active:scale-95 cursor-pointer overflow-hidden flex items-center justify-center"
                          title="Replace with another image"
                        >
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/jpg,.jpg,.jpeg,.png,.webp,image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onClick={(e) => {
                              (e.target as HTMLInputElement).value = '';
                            }}
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleUploadSlotImage(projectIdx, slotIdx, e.target.files[0]);
                                e.target.value = '';
                              }
                            }}
                          />
                          <RefreshCw className="w-3.5 h-3.5 text-pink-800 pointer-events-none" />
                        </label>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveSlotImage(projectIdx, slotIdx, e)}
                          className="p-1.5 rounded-lg bg-white/95 hover:bg-red-50 text-red-700 border border-red-200 shadow-xs transition-transform active:scale-95 cursor-pointer"
                          title="Remove image from slot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Bottom Left: Clean Full View Zoom Button */}
                      <div className="absolute bottom-2.5 left-2.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => handleOpenLightbox(projectIdx, slotIdx, e)}
                          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-[#701a35] text-[10px] font-mono font-bold uppercase tracking-wider border border-pink-200/90 shadow-xs transition-transform active:scale-95 cursor-zoom-in"
                          title="View full image in high resolution"
                        >
                          <Maximize2 className="w-3 h-3 text-[#701a35]" />
                          <span>Full View</span>
                        </button>
                      </div>

                      {/* Bottom Right: Clean Slot Number Badge */}
                      <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
                        <span className="text-[10px] font-mono font-semibold text-pink-900/60 bg-white/90 px-2 py-0.5 rounded-md border border-pink-200/60 shadow-2xs">
                          0{slotIdx + 1}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CORSET EDITORIAL DESCRIPTION */}
              {project.description && project.description.trim() !== '' && (
                <div className="pt-2 max-w-3xl">
                  <p className="text-zinc-700 text-sm sm:text-base leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </main>

      {/* Lightbox Modal for inspecting images in full resolution and aspect ratio */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
};
