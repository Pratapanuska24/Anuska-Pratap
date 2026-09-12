import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  X, 
  ZoomIn, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Link,
  Tag
} from 'lucide-react';
import { WorkProject, WorkImage, loadWorkProjects, saveWorkProjects, DEFAULT_WORK_PROJECTS } from '../utils/workStorage';

interface WorkScreenProps {
  onBackToMenu: () => void;
  onOpenPdf: () => void;
}

export const WorkScreen: React.FC<WorkScreenProps> = ({ onBackToMenu, onOpenPdf }) => {
  const [projects, setProjects] = useState<WorkProject[]>(() => loadWorkProjects());
  const [selectedImageModal, setSelectedImageModal] = useState<{ url: string; title: string; caption?: string } | null>(null);
  
  // New Project Modal State
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSeason, setNewSeason] = useState('SS26 Collection');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newImages, setNewImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');

  // Target project for adding a picture
  const [targetProjectIdForUpload, setTargetProjectIdForUpload] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newProjectFileInputRef = useRef<HTMLInputElement>(null);

  // Active image index for each project card
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  // Persist projects whenever they change
  useEffect(() => {
    saveWorkProjects(projects);
  }, [projects]);

  // Handle uploading image(s) for an existing project
  const handleUploadImageForProject = (projectId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          const newImg: WorkImage = {
            id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            url: dataUrl,
            name: file.name,
            caption: file.name.replace(/\.[^/.]+$/, ''),
            addedAt: Date.now()
          };

          setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
              const updatedImages = [...p.images, newImg];
              return { ...p, images: updatedImages };
            }
            return p;
          }));

          // Set active index to new image
          setActiveImageIndexes(prev => {
            const proj = projects.find(p => p.id === projectId);
            const nextIdx = proj ? proj.images.length : 0;
            return { ...prev, [projectId]: nextIdx };
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add image to new project creation form
  const handleNewProjectImageFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          setNewImages(prev => [...prev, dataUrl]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add Image via URL to new project form
  const handleAddImageUrlToNewProject = () => {
    if (!urlInput.trim()) return;
    setNewImages(prev => [...prev, urlInput.trim()]);
    setUrlInput('');
  };

  // Create & Save New Project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const formattedTags = newTags
      ? newTags.split(',').map(t => t.trim()).filter(Boolean)
      : ['Fashion Design', 'SS26'];

    const projectImages: WorkImage[] = newImages.length > 0 
      ? newImages.map((url, idx) => ({
          id: `img-new-${Date.now()}-${idx}`,
          url,
          name: `${newTitle} Photo ${idx + 1}`,
          caption: `${newTitle} Detail ${idx + 1}`,
          addedAt: Date.now()
        }))
      : [
          {
            id: `img-placeholder-${Date.now()}`,
            url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="%23FDF2F8"/><rect x="20" y="20" width="360" height="460" rx="10" fill="%23FFFFFF" stroke="%23F472B6" stroke-width="2"/><text x="200" y="250" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23EC4899" text-anchor="middle">NEW PROJECT PHOTO</text></svg>',
            name: 'Project Graphic',
            caption: 'Initial project prototype',
            addedAt: Date.now()
          }
        ];

    const newProj: WorkProject = {
      id: `custom-work-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory.trim() || 'Couture & Garment Construction',
      season: newSeason.trim() || 'SS26 Collection',
      description: newDescription.trim() || 'Custom design project added to Anuska Pratap portfolio.',
      tags: formattedTags,
      images: projectImages,
      isDefault: false
    };

    setProjects(prev => [newProj, ...prev]);

    // Reset Form
    setNewTitle('');
    setNewCategory('');
    setNewSeason('SS26 Collection');
    setNewDescription('');
    setNewTags('');
    setNewImages([]);
    setIsAddProjectOpen(false);
  };

  // Delete image from a project
  const handleDeleteImage = (projectId: string, imageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const filtered = p.images.filter(img => img.id !== imageId);
        return { ...p, images: filtered };
      }
      return p;
    }));
    setActiveImageIndexes(prev => ({ ...prev, [projectId]: 0 }));
  };

  // Delete an entire project
  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this work project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  // Reset to default
  const handleResetToDefaults = () => {
    if (window.confirm('Reset work projects back to initial default items?')) {
      setProjects(DEFAULT_WORK_PROJECTS);
      saveWorkProjects(DEFAULT_WORK_PROJECTS);
      setActiveImageIndexes({});
    }
  };

  return (
    <div 
      className="fixed inset-0 z-40 text-zinc-900 flex flex-col justify-between p-4 sm:p-8 md:p-10 font-sans overflow-y-auto select-none"
      style={{
        background: 'linear-gradient(135deg, #FFF1F2 0%, #FDF2F8 50%, #FCE7F3 100%)'
      }}
    >
      {/* Hidden Global File Inputs */}
      <input 
        type="file" 
        ref={fileInputRef} 
        multiple
        accept="image/*" 
        className="hidden" 
        onChange={(e) => {
          if (targetProjectIdForUpload) {
            handleUploadImageForProject(targetProjectIdForUpload, e.target.files);
            setTargetProjectIdForUpload(null);
          }
        }}
      />

      <input 
        type="file" 
        ref={newProjectFileInputRef} 
        multiple
        accept="image/*" 
        className="hidden" 
        onChange={(e) => handleNewProjectImageFiles(e.target.files)}
      />

      {/* TOP HEADER */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b-2 border-pink-200/80 pb-4 bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMenu}
            className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-pink-600 hover:text-white text-pink-700 text-[11px] font-bold tracking-widest uppercase transition-all rounded-lg border border-pink-300 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Menu</span>
          </button>

          <div className="text-xs font-mono tracking-widest text-pink-900 font-bold uppercase hidden sm:block">
            WORK GALLERY & TECH PACKS — ANUSKA PRATAP
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Project Button */}
          <button
            onClick={() => setIsAddProjectOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white text-[11px] font-bold tracking-widest uppercase transition-all rounded-lg shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Work Project</span>
          </button>

          {/* Reset button */}
          <button
            onClick={handleResetToDefaults}
            title="Reset to default items"
            className="p-1.5 bg-white hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-lg text-xs cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Pop PDF Button */}
          <button
            onClick={onOpenPdf}
            className="flex items-center gap-2 px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold tracking-widest uppercase transition-all rounded-lg shadow-md cursor-pointer ml-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pop PDF Portfolio</span>
          </button>
        </div>
      </div>

      {/* MAIN WORK CARDS GRID */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full flex-1">
        {projects.map((project) => {
          const currentImgIndex = activeImageIndexes[project.id] || 0;
          const currentImage = project.images[currentImgIndex] || project.images[0];
          const hasImages = project.images && project.images.length > 0;

          return (
            <div 
              key={project.id}
              className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 hover:border-pink-400 rounded-2xl p-5 shadow-lg flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-wider uppercase font-mono px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-800 border border-pink-200">
                    {project.season || 'SS26 Collection'}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {/* Upload Picture Button */}
                    <button
                      onClick={() => {
                        setTargetProjectIdForUpload(project.id);
                        fileInputRef.current?.click();
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 text-[10px] font-bold tracking-wider uppercase rounded-md border border-pink-200 transition-colors cursor-pointer"
                      title="Add picture to this project"
                    >
                      <Upload className="w-3 h-3 text-pink-600" />
                      <span>Add Picture</span>
                    </button>

                    {!project.isDefault && (
                      <button
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        className="p-1 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* PROJECT IMAGE DISPLAY */}
                <div className="relative w-full h-56 sm:h-64 bg-pink-50/60 rounded-xl overflow-hidden border border-pink-200/80 mb-4 flex items-center justify-center group/img">
                  {hasImages && currentImage ? (
                    <>
                      <img 
                        src={currentImage.url} 
                        alt={currentImage.name || project.title}
                        className="w-full h-full object-contain p-2 cursor-pointer transition-transform duration-300 hover:scale-105 select-none"
                        onClick={() => setSelectedImageModal({
                          url: currentImage.url,
                          title: project.title,
                          caption: currentImage.caption || project.description
                        })}
                      />

                      {/* Zoom Hint */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/60 text-white p-1.5 rounded-full cursor-pointer pointer-events-none">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>

                      {/* Image Delete Button */}
                      {project.images.length > 1 && (
                        <button
                          onClick={(e) => handleDeleteImage(project.id, currentImage.id, e)}
                          title="Delete this picture"
                          className="absolute bottom-2 right-2 opacity-0 group-hover/img:opacity-100 transition-opacity bg-red-600/90 hover:bg-red-700 text-white p-1.5 rounded-full cursor-pointer shadow-sm"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}

                      {/* Image Navigator if multiple */}
                      {project.images.length > 1 && (
                        <div className="absolute inset-y-0 inset-x-1 flex items-center justify-between pointer-events-none">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndexes(prev => ({
                                ...prev,
                                [project.id]: (currentImgIndex - 1 + project.images.length) % project.images.length
                              }));
                            }}
                            className="p-1 bg-white/80 hover:bg-white text-pink-800 rounded-full shadow pointer-events-auto cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndexes(prev => ({
                                ...prev,
                                [project.id]: (currentImgIndex + 1) % project.images.length
                              }));
                            }}
                            className="p-1 bg-white/80 hover:bg-white text-pink-800 rounded-full shadow pointer-events-auto cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-pink-400">
                      <ImageIcon className="w-10 h-10 mb-2 opacity-50 text-pink-500" />
                      <p className="text-xs font-semibold text-pink-700">No pictures yet</p>
                      <button
                        onClick={() => {
                          setTargetProjectIdForUpload(project.id);
                          fileInputRef.current?.click();
                        }}
                        className="mt-2 text-[10px] bg-pink-500 text-white px-2.5 py-1 rounded-md font-bold uppercase tracking-wider"
                      >
                        + Upload Picture
                      </button>
                    </div>
                  )}
                </div>

                {/* THUMBNAILS STRIP */}
                {project.images && project.images.length > 1 && (
                  <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
                    {project.images.map((img, idx) => (
                      <button
                        key={img.id}
                        onClick={() => setActiveImageIndexes(prev => ({ ...prev, [project.id]: idx }))}
                        className={`w-10 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                          idx === currentImgIndex ? 'border-pink-600 scale-105 shadow-sm' : 'border-pink-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setTargetProjectIdForUpload(project.id);
                        fileInputRef.current?.click();
                      }}
                      title="Add another photo"
                      className="w-10 h-10 rounded-lg border-2 border-dashed border-pink-300 flex items-center justify-center text-pink-500 hover:bg-pink-50 shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Project Title & Category */}
                <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-1 font-sans">
                  {project.title}
                </h3>
                <p className="text-xs font-bold text-pink-700 uppercase tracking-wider mb-2 font-mono">
                  {project.category}
                </p>

                {/* Description */}
                <p className="text-xs text-zinc-600 leading-relaxed font-sans mb-3">
                  {project.description}
                </p>
              </div>

              {/* Tags & Footer */}
              <div className="pt-3 border-t border-pink-100 flex flex-wrap items-center gap-1.5">
                {project.tags && project.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded bg-pink-50 text-pink-800 border border-pink-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="relative z-10 flex flex-wrap items-center justify-between text-xs font-mono text-pink-800 uppercase tracking-widest border-t-2 border-pink-200 pt-3 mt-4">
        <div>ANUSKA PRATAP — COUTURE, DRAPING & APPAREL DESIGN</div>
        <div>CLICK "POP PDF PORTFOLIO" TO VIEW 7-PAGE DOCUMENT</div>
      </div>

      {/* MODAL: ADD NEW WORK PROJECT */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border-2 border-pink-300">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-pink-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-600" />
                <h2 className="text-xl font-black uppercase tracking-tight text-pink-900 font-sans">
                  Add New Work Project
                </h2>
              </div>
              <button 
                onClick={() => setIsAddProjectOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateProject} className="space-y-4 text-xs font-sans">
              
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-800 uppercase tracking-wider mb-1">
                    Project Title *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Sculpted Silk Corset"
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-pink-500 bg-pink-50/40 text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-800 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input 
                    type="text" 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. Couture Draping & Tailoring"
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-pink-500 bg-pink-50/40 text-zinc-900"
                  />
                </div>
              </div>

              {/* Season & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-800 uppercase tracking-wider mb-1">
                    Season / Archive
                  </label>
                  <input 
                    type="text" 
                    value={newSeason}
                    onChange={(e) => setNewSeason(e.target.value)}
                    placeholder="e.g. SS26 Collection"
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-pink-500 bg-pink-50/40 text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-800 uppercase tracking-wider mb-1">
                    Tags (comma separated)
                  </label>
                  <input 
                    type="text" 
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="e.g. Corsetry, Zero Waste, Tech Pack"
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-pink-500 bg-pink-50/40 text-zinc-900"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-zinc-800 uppercase tracking-wider mb-1">
                  Project Description
                </label>
                <textarea 
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe your design inspiration, pattern making technique, fabrics, and construction..."
                  className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-pink-500 bg-pink-50/40 text-zinc-900"
                />
              </div>

              {/* PICTURE UPLOAD SECTION */}
              <div className="border border-pink-200 rounded-xl p-4 bg-pink-50/30">
                <label className="block font-bold text-pink-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-pink-600" />
                  <span>Project Pictures ({newImages.length} attached)</span>
                </label>

                {/* Upload Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => newProjectFileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold tracking-wider uppercase cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Picture(s)</span>
                  </button>

                  {/* Or add via URL */}
                  <div className="flex items-center gap-1 flex-1 min-w-[200px]">
                    <input 
                      type="url" 
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Paste image link URL..."
                      className="flex-1 px-2.5 py-1.5 border border-pink-300 rounded-lg bg-white text-zinc-900 text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrlToNewProject}
                      className="px-2.5 py-1.5 bg-zinc-800 text-white rounded-lg font-bold cursor-pointer hover:bg-zinc-900"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                {/* Attached Images Preview Grid */}
                {newImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2 border-t border-pink-200">
                    {newImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-pink-300 group">
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setNewImages(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-80 hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-pink-200">
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold uppercase tracking-wider rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold uppercase tracking-widest rounded-lg shadow-md cursor-pointer"
                >
                  Save Project
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedImageModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImageModal(null)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button 
              onClick={() => setSelectedImageModal(null)}
              className="p-2 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div 
            className="max-w-4xl max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImageModal.url} 
              alt={selectedImageModal.title}
              className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl border-2 border-white/20 bg-white"
            />
            <div className="mt-3 text-center text-white">
              <h3 className="text-lg font-bold tracking-wider uppercase font-sans">
                {selectedImageModal.title}
              </h3>
              {selectedImageModal.caption && (
                <p className="text-xs text-zinc-300 font-mono mt-1">
                  {selectedImageModal.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
