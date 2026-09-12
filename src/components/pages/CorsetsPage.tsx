import React, { useState } from 'react';
import { PortfolioHeader } from '../PortfolioHeader';
import { ImageLightboxModal } from '../ImageLightboxModal';
import { ImageUploadModal } from '../ImageUploadModal';
import { AppMode, CorsetProject, GalleryImage } from '../../types';
import { loadCorsetProjects, saveCorsetProjects } from '../../utils/portfolioStorage';
import { 
  Plus, 
  Layers, 
  Sparkles, 
  Tag, 
  Trash2, 
  Eye, 
  Folder,
  Scissors,
  Check,
  FileText
} from 'lucide-react';

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
  const [projects, setProjects] = useState<CorsetProject[]>(() => loadCorsetProjects());
  
  // Lightbox state
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Upload modal state
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // New Project Modal
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSeason, setNewSeason] = useState('SS 2026');
  const [newConcept, setNewConcept] = useState('');
  const [newMaterials, setNewMaterials] = useState('');
  const [newTechniques, setNewTechniques] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleOpenLightbox = (images: GalleryImage[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleOpenUpload = (projectId: string) => {
    setActiveProjectId(projectId);
    setIsUploadOpen(true);
  };

  const handleImageAdded = (imgData: { url: string; label: string; caption: string; categoryFolder: string }) => {
    if (!activeProjectId) return;

    const newImg: GalleryImage = {
      id: `img-${Date.now()}`,
      url: imgData.url,
      label: imgData.label,
      caption: imgData.caption,
      categoryFolder: imgData.categoryFolder,
      addedAt: Date.now(),
    };

    const updated = projects.map((proj) => {
      if (proj.id === activeProjectId) {
        return {
          ...proj,
          images: [newImg, ...proj.images],
        };
      }
      return proj;
    });

    setProjects(updated);
    saveCorsetProjects(updated);
    showToast('Photo added to Corset project');
  };

  const handleDeleteImage = (projectId: string, imageId: string) => {
    const updated = projects.map((proj) => {
      if (proj.id === projectId) {
        return {
          ...proj,
          images: proj.images.filter((img) => img.id !== imageId),
        };
      }
      return proj;
    });

    setProjects(updated);
    saveCorsetProjects(updated);
    showToast('Image removed from gallery');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj: CorsetProject = {
      id: `corset-${Date.now()}`,
      title: newTitle.trim(),
      season: newSeason.trim() || 'SS 2026',
      concept: newConcept.trim() || 'Sculptural corsetry exploration.',
      materials: newMaterials.trim() || 'Silk satin, Spiral steel bones, Cotton coutil.',
      techniques: newTechniques.trim() || 'Internal boning channels, waist tape, eyelet lacing.',
      description: newDescription.trim() || 'Custom bespoke corset bodice.',
      images: [],
    };

    const updated = [newProj, ...projects];
    setProjects(updated);
    saveCorsetProjects(updated);
    setIsCreatingProject(false);
    setNewTitle('');
    setNewConcept('');
    setNewMaterials('');
    setNewTechniques('');
    setNewDescription('');
    showToast('New Corset Project created');
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-zinc-900 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Header */}
      <PortfolioHeader
        currentCategory="corsets"
        categoryTitle="THE CORSETS"
        categorySubtitle="PAGE 02 — STRUCTURAL BONING & COUTURE SILHOUETTES"
        onBackToMenu={onBackToMenu}
        onNavigateToCategory={onNavigateToCategory}
        onBackToLanding={onBackToLanding}
        actionButton={
          <button
            type="button"
            onClick={() => setIsCreatingProject(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        }
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        
        {/* Toast */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-pink-900 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-mono font-bold border border-pink-400">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Introduction Hero Card */}
        <section className="bg-white rounded-3xl border-2 border-pink-200 p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 bg-pink-100 text-pink-900 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full border border-pink-300">
                PORTFOLIO CATEGORY 02
              </span>
              <span className="text-xs font-mono text-pink-700">Folder: /images/corsets/</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-pink-950 uppercase tracking-tight">
              SCULPTURAL COUTURE CORSETRY
            </h2>

            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
              A comprehensive showcase of bespoke corsetry engineered with spiral steel boning, precision waist reduction, sweetheart décolletage, and architectural Basque hemlines. Each project includes front/back views, process fittings, vector CAD specification flats, and high-fashion editorial imagery.
            </p>
          </div>
        </section>

        {/* Projects List */}
        <div className="space-y-12">
          {projects.map((project, projIdx) => (
            <article
              key={project.id}
              className="bg-white rounded-3xl border-2 border-pink-200 p-6 sm:p-8 shadow-lg space-y-6 relative overflow-hidden"
            >
              {/* Project Header Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-pink-100 pb-5">
                <div>
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="text-lg font-black text-pink-600 font-serif">
                      0{projIdx + 1}.
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-pink-100 text-pink-900 text-[10px] font-mono font-bold uppercase tracking-wider border border-pink-200">
                      {project.season}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-pink-950 uppercase tracking-tight">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleOpenUpload(project.id)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-mono font-bold tracking-wider uppercase border border-pink-300 transition-all shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </button>
                </div>
              </div>

              {/* Specification Grid: Concept, Materials, Techniques, Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-pink-50/40 border border-pink-100 text-xs">
                
                <div className="space-y-1">
                  <span className="font-mono font-bold text-pink-900 uppercase tracking-wider text-[10px] flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-pink-600" />
                    <span>CONCEPT</span>
                  </span>
                  <p className="text-zinc-700 leading-relaxed">{project.concept}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono font-bold text-pink-900 uppercase tracking-wider text-[10px] flex items-center space-x-1">
                    <Layers className="w-3 h-3 text-pink-600" />
                    <span>MATERIALS</span>
                  </span>
                  <p className="text-zinc-700 leading-relaxed">{project.materials}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono font-bold text-pink-900 uppercase tracking-wider text-[10px] flex items-center space-x-1">
                    <Scissors className="w-3 h-3 text-pink-600" />
                    <span>TECHNIQUES</span>
                  </span>
                  <p className="text-zinc-700 leading-relaxed">{project.techniques}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono font-bold text-pink-900 uppercase tracking-wider text-[10px] flex items-center space-x-1">
                    <FileText className="w-3 h-3 text-pink-600" />
                    <span>DESCRIPTION</span>
                  </span>
                  <p className="text-zinc-700 leading-relaxed">{project.description}</p>
                </div>

              </div>

              {/* Multi-Image Gallery Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-pink-950 uppercase tracking-wider">
                      PROJECT GALLERY & CAD FLATS
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-800 text-[10px] font-mono font-bold">
                      {project.images.length} IMAGES
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-pink-700">
                    Click any image for full-screen zoom & aspect ratio view
                  </span>
                </div>

                {project.images.length === 0 ? (
                  <div className="border-2 border-dashed border-pink-200 rounded-2xl p-8 text-center bg-pink-50/20 flex flex-col items-center justify-center">
                    <p className="text-xs text-pink-900 font-bold uppercase font-mono mb-2">
                      No photos added to this corset project yet
                    </p>
                    <button
                      type="button"
                      onClick={() => handleOpenUpload(project.id)}
                      className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold font-mono uppercase shadow-xs transition-all flex items-center space-x-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Upload First Image</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.images.map((img, imgIdx) => (
                      <div
                        key={img.id || imgIdx}
                        onClick={() => handleOpenLightbox(project.images, imgIdx)}
                        className="group relative bg-pink-50 rounded-2xl border-2 border-pink-200 hover:border-pink-500 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col"
                      >
                        {/* Aspect Frame (maintains proportion without stretching) */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-pink-100 flex items-center justify-center">
                          <img
                            src={img.url}
                            alt={img.label || 'Corset Image'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Hover Action Overlay */}
                          <div className="absolute inset-0 bg-pink-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                            <span className="p-2.5 rounded-full bg-white/90 text-pink-900 shadow-md">
                              <Eye className="w-4 h-4" />
                            </span>
                          </div>

                          {/* Top Role Badge */}
                          {img.label && (
                            <div className="absolute top-2.5 left-2.5 bg-pink-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-mono font-bold text-white uppercase tracking-wider border border-pink-300/40 shadow-xs flex items-center space-x-1">
                              <Tag className="w-2.5 h-2.5 text-pink-300" />
                              <span>{img.label}</span>
                            </div>
                          )}

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(project.id, img.id);
                            }}
                            className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-white/90 hover:bg-rose-600 hover:text-white text-pink-900 transition-colors shadow-xs opacity-0 group-hover:opacity-100"
                            title="Delete Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Caption & Asset Folder Path */}
                        <div className="p-3 bg-white flex flex-col justify-between flex-1 border-t border-pink-100">
                          <p className="text-xs font-medium text-zinc-800 line-clamp-2">
                            {img.caption || img.label || 'Corset specification photo'}
                          </p>
                          <div className="mt-2 pt-2 border-t border-pink-50 flex items-center justify-between text-[9px] font-mono text-pink-700">
                            <span className="flex items-center space-x-1">
                              <Folder className="w-2.5 h-2.5" />
                              <span>{img.categoryFolder || '/images/corsets/'}</span>
                            </span>
                            <span className="text-pink-900 font-bold">ZOOM</span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </article>
          ))}
        </div>

      </main>

      {/* Upload Modal */}
      <ImageUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        categoryName="The Corsets"
        categoryFolder="/images/corsets/"
        defaultLabel="Front View"
        onImageAdded={handleImageAdded}
      />

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />

      {/* Create Project Modal */}
      {isCreatingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pink-950/80 backdrop-blur-sm select-none font-sans">
          <div className="relative max-w-xl w-full bg-white rounded-3xl border-2 border-pink-300 shadow-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black text-pink-950 uppercase">Create New Corset Project</h3>
            
            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Victorian Silk Basque Corset"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-pink-200 bg-pink-50/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Season / Collection</label>
                <input
                  type="text"
                  placeholder="e.g. Spring / Summer 2026"
                  value={newSeason}
                  onChange={(e) => setNewSeason(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-pink-200 bg-pink-50/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Concept</label>
                <textarea
                  rows={2}
                  placeholder="Design inspiration & silhouette objectives..."
                  value={newConcept}
                  onChange={(e) => setNewConcept(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-pink-200 bg-pink-50/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Materials</label>
                <input
                  type="text"
                  placeholder="e.g. Duchess Satin, Coutil, 16 Steel Bones, Eyelets"
                  value={newMaterials}
                  onChange={(e) => setNewMaterials(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-pink-200 bg-pink-50/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Techniques</label>
                <input
                  type="text"
                  placeholder="e.g. French seaming, spiral boning channels, waist tape"
                  value={newTechniques}
                  onChange={(e) => setNewTechniques(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-pink-200 bg-pink-50/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Description</label>
                <textarea
                  rows={2}
                  placeholder="Overall garment description..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-pink-200 bg-pink-50/30"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-pink-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingProject(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-pink-900 hover:bg-pink-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white shadow-xs"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
