import React, { useState, useEffect, useRef } from 'react';
import { PortfolioHeader } from '../PortfolioHeader';
import { ImageLightboxModal } from '../ImageLightboxModal';
import { AppMode, DressEditorialItem, GalleryImage } from '../../types';
import {
  loadDressEditorialItems,
  loadDressEditorialItemsAsync,
  saveDressEditorialItems,
  fileToDataUrl,
  savePhotoToIdb,
  uploadAndPersistAsset,
  resolveImageFallback,
} from '../../utils/portfolioStorage';
import {
  Upload,
  RefreshCw,
  Trash2,
  Maximize2,
  Check,
  Save,
  Plus,
  Edit3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface DressesPageProps {
  onBackToMenu: () => void;
  onNavigateToCategory: (mode: AppMode) => void;
  onBackToLanding: () => void;
}

export const DressesPage: React.FC<DressesPageProps> = ({
  onBackToMenu,
  onNavigateToCategory,
  onBackToLanding,
}) => {
  // 3 dresses: Dress 01, Dress 02, Dress 03
  const [dresses, setDresses] = useState<DressEditorialItem[]>(() =>
    loadDressEditorialItems()
  );
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<{ [dressIdx: number]: number }>({
    0: 0,
    1: 0,
    2: 0,
  });

  // Track failed slot images so they can fall back to upload dropzones without showing broken browser image icons
  const [failedSlots, setFailedSlots] = useState<Record<string, boolean>>({});

  // Drag-and-drop state
  const [draggingTarget, setDraggingTarget] = useState<{
    dressIdx: number;
    photoIdx: number;
  } | null>(null);

  // Persistence & Save status indicator
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('saved');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const dressesRef = useRef(dresses);
  dressesRef.current = dresses;
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userHasModifiedRef = useRef(false);

  // Lightbox modal state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Toast notifier
  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastMsg(null), 3500);
  };

  // Hydrate from IndexedDB / server state on mount
  useEffect(() => {
    let isMounted = true;
    const hydrateSavedData = async () => {
      try {
        const fullData = await loadDressEditorialItemsAsync();
        // Only hydrate if component is mounted and user hasn't uploaded new photos in this session
        if (isMounted && fullData && fullData.length === 3 && !userHasModifiedRef.current) {
          setDresses(fullData);
          setSaveStatus('saved');
        }
      } catch (err) {
        console.error('Error hydrating dresses editorial data:', err);
      }
    };

    hydrateSavedData();

    const handleBeforeUnload = () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveDressEditorialItems(dressesRef.current);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      isMounted = false;
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveDressEditorialItems(dressesRef.current);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Save changes with debouncing
  const persistDresses = (data: DressEditorialItem[], immediate = false) => {
    setSaveStatus('saving');
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    if (immediate) {
      saveDressEditorialItems(data).then(() => {
        setSaveStatus('saved');
      });
      return;
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveDressEditorialItems(data);
        setSaveStatus('saved');
      } catch (err) {
        console.error('Error saving dresses editorial:', err);
        setSaveStatus('idle');
      }
    }, 400);
  };

  // Manual save trigger
  const handleManualSave = async () => {
    setSaveStatus('saving');
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    try {
      await saveDressEditorialItems(dresses);
      setSaveStatus('saved');
      showToast('All dresses changes saved successfully');
    } catch {
      showToast('Error saving changes');
      setSaveStatus('idle');
    }
  };

  // Core image handler: displays EXACT user image IMMEDIATELY (0ms delay), then persists to disk & IDB
  const handleProcessFile = async (
    file: File,
    dressIdx: number,
    photoIdx: number
  ) => {
    if (!file) {
      showToast('No file was selected.');
      return;
    }

    // Validate image file type (JPG, JPEG, PNG, WEBP)
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|svg|bmp)$/i.test(file.name);
    if (!isImage) {
      showToast('Please select a JPG, JPEG, PNG, or WEBP image file.');
      return;
    }

    userHasModifiedRef.current = true;
    const currentSlotKey = `dress_${dressIdx}_slot_${photoIdx}`;
    setFailedSlots((prev) => {
      const next = { ...prev };
      delete next[currentSlotKey];
      return next;
    });

    // 1. IMMEDIATE DISPLAY: Create instant URL to display the exact user image in 0 milliseconds
    let initialUrl = '';
    try {
      initialUrl = URL.createObjectURL(file);
    } catch {
      initialUrl = '';
    }

    if (initialUrl) {
      // Apply immediate display to state so user sees their photo right away
      setDresses((prev) => {
        const updated = prev.map((dress, dIdx) => {
          if (dIdx !== dressIdx) return dress;
          const newImages = [...dress.images];
          while (newImages.length <= photoIdx) {
            newImages.push(null);
          }
          newImages[photoIdx] = initialUrl;
          return {
            ...dress,
            images: newImages,
          };
        });
        dressesRef.current = updated;
        return updated;
      });

      // Make sure active photo focus is on this slot
      setSelectedPhotoIndex((prevIdx) => ({
        ...prevIdx,
        [dressIdx]: photoIdx,
      }));
    }

    showToast(`Dress 0${dressIdx + 1} photo loaded. Saving...`);

    // 2. PERMANENT ASSET PERSISTENCE: Save to Node.js server disk (/public/uploads/) and IndexedDB
    try {
      const slotKey = `dress_${dressIdx}_slot_${photoIdx}`;
      const { url: permanentUrl } = await uploadAndPersistAsset(file, slotKey);

      if (permanentUrl) {
        // Update slot with permanent URL and save state
        setDresses((prev) => {
          const updated = prev.map((dress, dIdx) => {
            if (dIdx !== dressIdx) return dress;
            const newImages = [...dress.images];
            while (newImages.length <= photoIdx) {
              newImages.push(null);
            }
            newImages[photoIdx] = permanentUrl;
            return {
              ...dress,
              images: newImages,
            };
          });
          dressesRef.current = updated;
          persistDresses(updated, true);
          return updated;
        });

        showToast(`Dress 0${dressIdx + 1} photo saved permanently.`);
      }
    } catch (err: any) {
      console.error('Error persisting uploaded dress photo:', err);
      showToast(`Photo displayed. Storage note: ${err?.message || 'Check storage'}`);
    }
  };

  // Remove photo from slot
  const handleRemovePhoto = (
    dressIdx: number,
    photoIdx: number,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    const removedSlotKey = `dress_${dressIdx}_slot_${photoIdx}`;
    setFailedSlots((prev) => {
      const next = { ...prev };
      delete next[removedSlotKey];
      return next;
    });
    setDresses((prev) => {
      const updated = prev.map((dress, dIdx) => {
        if (dIdx !== dressIdx) return dress;
        const newImages = [...dress.images];
        newImages[photoIdx] = null;
        return {
          ...dress,
          images: newImages,
        };
      });
      persistDresses(updated, true);
      savePhotoToIdb(`dress_${dressIdx}_slot_${photoIdx}`, '__REMOVED__').catch(() => {});
      showToast(`Photo removed from Dress 0${dressIdx + 1}`);
      return updated;
    });
  };

  // Add an additional photo slot for a dress (e.g. for detail/back view)
  const handleAddPhotoSlot = (dressIdx: number) => {
    setDresses((prev) => {
      const updated = prev.map((dress, dIdx) => {
        if (dIdx !== dressIdx) return dress;
        return {
          ...dress,
          images: [...dress.images, null],
        };
      });
      persistDresses(updated, true);
      const newSlotIdx = updated[dressIdx].images.length - 1;
      setSelectedPhotoIndex((prevIdx) => ({
        ...prevIdx,
        [dressIdx]: newSlotIdx,
      }));
      return updated;
    });
  };

  // Handle dress name change
  const handleNameChange = (dressIdx: number, newName: string) => {
    setDresses((prev) => {
      const updated = prev.map((dress, dIdx) => {
        if (dIdx !== dressIdx) return dress;
        const formattedTitle = newName.trim()
          ? `DRESS 0${dIdx + 1} — ${newName.trim()}`
          : `DRESS 0${dIdx + 1}`;
        return {
          ...dress,
          name: newName,
          title: formattedTitle,
        };
      });
      persistDresses(updated, false);
      return updated;
    });
  };

  // Handle write-up text change
  const handleDescriptionChange = (dressIdx: number, newDesc: string) => {
    setDresses((prev) => {
      const updated = prev.map((dress, dIdx) => {
        if (dIdx !== dressIdx) return dress;
        return {
          ...dress,
          description: newDesc,
        };
      });
      persistDresses(updated, false);
      return updated;
    });
  };

  // Open full-screen lightbox for exact original photo inspection
  const handleOpenLightbox = (dressIdx: number, photoIdx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const dress = dresses[dressIdx];
    if (!dress) return;

    const validImages: GalleryImage[] = dress.images
      .map((img, idx) => ({
        id: `${dress.id}-photo-${idx}`,
        url: img || '',
        label: `${dress.name ? `DRESS 0${dress.number} — ${dress.name}` : `DRESS 0${dress.number}`} • Photo 0${idx + 1}`,
        caption: dress.description || `${dress.name || `Dress 0${dress.number}`} photograph`,
        categoryFolder: '/images/dresses/',
        addedAt: Date.now(),
      }))
      .filter((item) => Boolean(item.url));

    if (validImages.length === 0) return;

    const targetUrl = dress.images[photoIdx];
    const targetIdx = validImages.findIndex((item) => item.url === targetUrl);

    setLightboxImages(validImages);
    setLightboxIndex(targetIdx >= 0 ? targetIdx : 0);
    setIsLightboxOpen(true);
  };

  return (
    <div
      id="dresses-page-root"
      className="min-h-screen bg-[#FFF5F7] text-stone-900 flex flex-col relative selection:bg-pink-300 selection:text-pink-950 font-sans"
    >
      {/* Top Header */}
      <div className="relative z-20">
        <PortfolioHeader
          currentCategory="dresses"
          title="DRAPERY OF DRESSES"
          onBackToMenu={onBackToMenu}
          onNavigateToCategory={onNavigateToCategory}
          onBackToLanding={onBackToLanding}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 flex flex-col">
        {/* Page Heading & Status Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-pink-300/60">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#340b0b] font-display">
              DRAPERY OF DRESSES
            </h1>
          </div>

          {/* Save Status Indicator & Manual Save Button */}
          <div className="hidden flex items-center space-x-3 self-start sm:self-auto">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-pink-200/90 shadow-2xs text-xs font-mono">
              {saveStatus === 'saving' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-pink-600 animate-spin" />
                  <span className="text-pink-800 font-semibold">Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-pink-900/80 font-medium">Changes Saved</span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={handleManualSave}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#701a35] hover:bg-[#541227] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Save all changes now"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save All</span>
            </button>
          </div>
        </div>

        {/* 3 EQUAL COLUMNS — ONE FOR EACH OF THE THREE DRESSES */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {dresses.map((dress, dressIdx) => {
            const validPhotoIndexes = dress.images.reduce((acc: number[], img, idx) => {
              if (img && !failedSlots[`dress_${dressIdx}_slot_${idx}`]) acc.push(idx);
              return acc;
            }, [] as number[]);

            const safeSelectedIndex =
              selectedPhotoIndex[dressIdx] !== undefined &&
              selectedPhotoIndex[dressIdx] < dress.images.length
                ? selectedPhotoIndex[dressIdx]
                : 0;

            const activePhotoIdx =
              validPhotoIndexes.length > 0
                ? (validPhotoIndexes.includes(safeSelectedIndex) ? safeSelectedIndex : validPhotoIndexes[0])
                : 0;

            const currentPhoto = dress.images[activePhotoIdx] || null;
            const isCoverPhoto = activePhotoIdx === 0;
            const isDragging =
              draggingTarget?.dressIdx === dressIdx &&
              draggingTarget?.photoIdx === activePhotoIdx;

            const cyclePhoto = (direction: 'prev' | 'next') => {
              if (validPhotoIndexes.length === 0) return;
              const currentPos = validPhotoIndexes.indexOf(activePhotoIdx);
              const nextPos = direction === 'next'
                ? (currentPos + 1) % validPhotoIndexes.length
                : (currentPos - 1 + validPhotoIndexes.length) % validPhotoIndexes.length;
              setSelectedPhotoIndex((prev) => ({
                ...prev,
                [dressIdx]: validPhotoIndexes[nextPos],
              }));
            };

            return (
              <article
                key={dress.id}
                id={`dress-column-${dressIdx + 1}`}
                className={`bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-pink-200/90 shadow-md p-5 sm:p-7 flex flex-col ${
                  dressIdx === 0 ? 'self-start justify-start' : 'justify-between'
                } transition-all duration-300 hover:border-pink-300 hover:shadow-lg`}
              >
                {/* Column Header: Dress Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-pink-100/90 text-[#701a35] font-mono text-xs font-bold tracking-wider uppercase border border-pink-200 shadow-2xs">
                    DRESS 0{dress.number}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-pink-900/60">
                    Column 0{dress.number} of 03
                  </span>
                </div>

                {/* 1. LARGE SPACE TO UPLOAD PHOTOS OF THE DRESS */}
                <div className="flex flex-col space-y-3">
                  <div
                    className={`relative w-full ${
                      isCoverPhoto
                        ? 'aspect-[1000/707]'
                        : 'aspect-[3/4] sm:aspect-[4/5]'
                    } rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center overflow-hidden group select-none shadow-xs ${
                      !currentPhoto || failedSlots[`dress_${dressIdx}_slot_${activePhotoIdx}`]
                        ? `p-3 sm:p-4 border-dashed cursor-pointer ${
                            isDragging
                              ? 'border-pink-600 bg-pink-100/70 scale-[1.01]'
                              : 'border-pink-300/90 hover:border-pink-500 bg-[#FAF5F6] hover:bg-pink-50/70'
                          }`
                        : `border-pink-200 bg-[#FAF5F6] ${
                            isDragging ? 'border-pink-600 bg-pink-100/70' : ''
                            } ${isCoverPhoto ? 'p-0' : 'p-3 sm:p-4'}`
                    }`}
                    title={`Dress 0${dress.number} photo`}
                  >
                    {!currentPhoto || failedSlots[`dress_${dressIdx}_slot_${activePhotoIdx}`] ? (
                      <p className="text-sm font-medium text-stone-500">Image unavailable</p>
                    ) : (
                      <>
                        <img
                          src={currentPhoto}
                          alt={dress.name || `Dress 0${dress.number}`}
                          referrerPolicy="no-referrer"
                          onError={async (e) => {
                            const target = e.currentTarget;
                            const slotKey = `dress_${dressIdx}_slot_${activePhotoIdx}`;
                            const fallback = await resolveImageFallback(target.src, slotKey);
                            if (fallback && target.src !== fallback) {
                              target.src = fallback;
                              setDresses((prev) => {
                                const next = [...prev];
                                if (next[dressIdx]) {
                                  const imgs = [...next[dressIdx].images];
                                  imgs[activePhotoIdx] = fallback;
                                  next[dressIdx] = { ...next[dressIdx], images: imgs };
                                }
                                return next;
                              });
                              return;
                            }
                            setFailedSlots((prev) => ({ ...prev, [slotKey]: true }));
                          }}
                          className={`${isCoverPhoto ? 'w-full h-full object-contain' : 'max-w-full max-h-full w-auto h-auto object-contain'} select-none transition-transform duration-200`}
                        />

                        {validPhotoIndexes.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={() => cyclePhoto('prev')}
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#701a35] shadow-md border border-pink-200 hover:bg-white transition-all cursor-pointer"
                              aria-label="Previous dress photo"
                              title="Previous photo"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => cyclePhoto('next')}
                              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#701a35] shadow-md border border-pink-200 hover:bg-white transition-all cursor-pointer"
                              aria-label="Next dress photo"
                              title="Next photo"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        <div className="hidden absolute top-3 right-3 flex items-center space-x-1.5 z-20">
                          <label
                            className="relative flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-white/95 hover:bg-white text-[#701a35] hover:text-pink-950 text-[10px] font-mono font-bold tracking-wider uppercase border border-pink-200 shadow-xs transition-all hover:border-pink-400 cursor-pointer overflow-hidden"
                            title="Upload new photo to replace this image"
                          >
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/jpg,.jpg,.jpeg,.png,.webp,image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onClick={(e) => {
                                (e.target as HTMLInputElement).value = '';
                              }}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  await handleProcessFile(file, dressIdx, activePhotoIdx);
                                }
                                e.target.value = '';
                              }}
                            />
                            <RefreshCw className="w-3 h-3 text-[#701a35] pointer-events-none" />
                            <span className="pointer-events-none">Replace</span>
                          </label>

                          <button
                            type="button"
                            onClick={(e) => handleRemovePhoto(dressIdx, activePhotoIdx, e)}
                            className="p-1.5 rounded-lg bg-white/95 hover:bg-rose-50 text-rose-600 hover:text-rose-700 border border-pink-200 shadow-xs transition-all hover:border-rose-300 cursor-pointer"
                            title="Remove this photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="absolute bottom-3 left-3 z-20">
                          <button
                            type="button"
                            onClick={(e) => handleOpenLightbox(dressIdx, activePhotoIdx, e)}
                            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-white/95 hover:bg-white text-[#701a35] text-[10px] font-mono font-bold uppercase tracking-wider border border-pink-200 shadow-xs transition-transform active:scale-95 cursor-zoom-in"
                            title="View original uncropped photo in full resolution"
                          >
                            <Maximize2 className="w-3 h-3 text-[#701a35]" />
                            <span>Full View</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="hidden flex items-center space-x-2 pt-1 overflow-x-auto pb-1">
                    {dress.images.map((img, pIdx) => {
                      const isSelected = pIdx === activePhotoIdx;
                      const thumbSlotKey = `dress_${dressIdx}_slot_${pIdx}`;
                      const isThumbFailed = Boolean(failedSlots[thumbSlotKey]);

                      if (!img || isThumbFailed) {
                        return (
                          <label
                            key={pIdx}
                            onClick={() => {
                              setSelectedPhotoIndex((prev) => ({
                                ...prev,
                                [dressIdx]: pIdx,
                              }));
                            }}
                            className={`relative w-12 h-14 rounded-lg border-2 flex items-center justify-center overflow-hidden cursor-pointer transition-all flex-shrink-0 ${
                              isSelected
                                ? 'border-pink-600 ring-2 ring-pink-300'
                                : 'border-pink-200 hover:border-pink-400 opacity-70 hover:opacity-100 bg-[#FAF5F6]'
                            }`}
                            title={`Upload Photo 0${pIdx + 1}`}
                          >
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/jpg,.jpg,.jpeg,.png,.webp,image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onClick={(e) => {
                                (e.target as HTMLInputElement).value = '';
                              }}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  await handleProcessFile(file, dressIdx, pIdx);
                                }
                                e.target.value = '';
                              }}
                            />
                            <Upload className="w-3.5 h-3.5 text-pink-400 pointer-events-none" />
                          </label>
                        );
                      }
                      return (
                        <div
                          key={pIdx}
                          onClick={() => {
                            setSelectedPhotoIndex((prev) => ({
                              ...prev,
                              [dressIdx]: pIdx,
                            }));
                          }}
                          className={`relative w-12 h-14 rounded-lg border-2 flex items-center justify-center overflow-hidden cursor-pointer transition-all flex-shrink-0 ${
                            isSelected
                              ? 'border-pink-600 ring-2 ring-pink-300'
                              : 'border-pink-200 hover:border-pink-400 opacity-70 hover:opacity-100 bg-[#FAF5F6]'
                          }`}
                          title={`Photo 0${pIdx + 1}`}
                        >
                          <img
                            src={img}
                            alt={`Angle 0${pIdx + 1}`}
                            referrerPolicy="no-referrer"
                            onError={async (e) => {
                              const target = e.currentTarget;
                              const fallback = await resolveImageFallback(target.src, thumbSlotKey);
                              if (fallback && target.src !== fallback) {
                                target.src = fallback;
                                setDresses((prev) => {
                                  const next = [...prev];
                                  if (next[dressIdx]) {
                                    const imgs = [...next[dressIdx].images];
                                    imgs[pIdx] = fallback;
                                    next[dressIdx] = { ...next[dressIdx], images: imgs };
                                  }
                                  return next;
                                });
                                return;
                              }
                              setFailedSlots((prev) => ({ ...prev, [thumbSlotKey]: true }));
                            }}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => handleAddPhotoSlot(dressIdx)}
                      className="hidden w-12 h-14 rounded-lg border-2 border-dashed border-pink-300 hover:border-pink-500 bg-white/60 hover:bg-pink-50 text-pink-700 flex flex-col items-center justify-center transition-all flex-shrink-0 cursor-pointer"
                      title="Add another photo of this dress (e.g. drape detail or back view)"
                    >
                      <Plus className="w-4 h-4 text-[#701a35]" />
                      <span className="text-[8px] font-mono font-bold mt-0.5 uppercase">Add</span>
                    </button>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#701a35]">Dress Name / Title</h3>
                  </div>
                  <p className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 bg-white font-medium text-stone-900 text-sm">{dress.name || `Dress 0${dress.number}`}</p>
                </div>

                {dress.description.trim() && (
                  <div className="mt-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#701a35]">Write-up / Description</h3>
                      <span className="text-[10px] font-mono text-stone-400">
                        {dress.description.split(/\s+/).filter(Boolean).length} words
                      </span>
                    </div>
                    <p className="w-full flex-1 px-3.5 py-2.5 rounded-xl border border-pink-200 bg-white text-stone-800 text-xs sm:text-sm leading-relaxed min-h-[96px]">{dress.description}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </main>

      {/* Floating Save Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#701a35] text-white text-xs font-mono font-bold tracking-wide shadow-lg border border-pink-400 flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Lightbox Modal for exact full-resolution inspection */}
      {isLightboxOpen && (
        <ImageLightboxModal
          isOpen={isLightboxOpen}
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </div>
  );
};
