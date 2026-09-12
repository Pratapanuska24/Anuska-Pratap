import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { fileToDataUrl } from '../utils/portfolioStorage';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  categoryFolder: string;
  defaultLabel?: string;
  onImageAdded: (newImage: { url: string; label: string; caption: string; categoryFolder: string }) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  categoryName,
  categoryFolder,
  defaultLabel = 'Front View',
  onImageAdded,
}) => {
  const [label, setLabel] = useState(defaultLabel);
  const [caption, setCaption] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const dataUrl = await fileToDataUrl(file);
      setPreviewUrl(dataUrl);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const dataUrl = await fileToDataUrl(file);
      setPreviewUrl(dataUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = previewUrl || urlInput.trim();
    if (!finalUrl) return;

    onImageAdded({
      url: finalUrl,
      label: label.trim() || 'Portfolio View',
      caption: caption.trim(),
      categoryFolder,
    });

    // Reset and close
    setPreviewUrl(null);
    setUrlInput('');
    setCaption('');
    onClose();
  };

  const standardLabels = [
    'Front View',
    'Back View',
    'Side View',
    'Detail Shot',
    'Moodboard',
    'Sketches & CAD',
    'Process / Draping',
    'Fabric / Textile',
    'Research Image',
    'Artwork Reference',
    'Final Photoshoot',
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pink-950/80 backdrop-blur-sm select-none font-sans">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          className="relative z-10 max-w-lg w-full bg-white rounded-2xl border-2 border-pink-200 shadow-2xl p-5 sm:p-7 overflow-hidden text-zinc-900"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-pink-950 tracking-wide uppercase">
                Add Photo to {categoryName}
              </h3>
              <p className="text-xs text-pink-700/80 font-mono mt-0.5">
                Target asset folder: <span className="font-bold">{categoryFolder}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-pink-100 text-pink-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Drop / Select Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                isDragging
                  ? 'border-pink-600 bg-pink-100/60 scale-[1.01]'
                  : previewUrl
                  ? 'border-pink-400 bg-pink-50/40'
                  : 'border-pink-300 hover:border-pink-500 bg-pink-50/30 hover:bg-pink-50/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {previewUrl ? (
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-36 w-auto object-contain rounded-lg shadow-xs border border-pink-200"
                  />
                  <p className="text-xs font-bold text-pink-900">Click or drop to replace selected file</p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-pink-950">
                    Click to browse or drop fashion image here
                  </p>
                  <p className="text-[11px] text-pink-700/80 mt-1">
                    Supports JPG, PNG, WEBP high-resolution photography
                  </p>
                </>
              )}
            </div>

            {/* Direct URL input fallback */}
            <div>
              <label className="block text-[11px] font-bold text-pink-900 uppercase tracking-wider mb-1">
                Or Paste Image Web URL
              </label>
              <div className="relative">
                <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or /images/..."
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (!previewUrl && e.target.value.startsWith('http')) {
                      setPreviewUrl(e.target.value);
                    }
                  }}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-pink-200 bg-pink-50/30 focus:outline-hidden focus:ring-2 focus:ring-pink-400 text-zinc-800"
                />
              </div>
            </div>

            {/* Role / Label Selection */}
            <div>
              <label className="block text-[11px] font-bold text-pink-900 uppercase tracking-wider mb-1.5">
                Image Role / View Label
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {standardLabels.map((stdLabel) => (
                  <button
                    key={stdLabel}
                    type="button"
                    onClick={() => setLabel(stdLabel)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium transition-all ${
                      label === stdLabel
                        ? 'bg-pink-600 text-white shadow-xs'
                        : 'bg-pink-100/70 text-pink-900 hover:bg-pink-200/70'
                    }`}
                  >
                    {stdLabel}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Or custom label (e.g., Detail Collar Zoom)"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-pink-200 bg-pink-50/30 focus:outline-hidden focus:ring-2 focus:ring-pink-400 text-zinc-800"
              />
            </div>

            {/* Caption */}
            <div>
              <label className="block text-[11px] font-bold text-pink-900 uppercase tracking-wider mb-1">
                Description / Caption
              </label>
              <input
                type="text"
                placeholder="e.g. Hand-stitched boning channels on pink silk satin"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-pink-200 bg-pink-50/30 focus:outline-hidden focus:ring-2 focus:ring-pink-400 text-zinc-800"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-pink-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-bold text-pink-900 hover:bg-pink-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!previewUrl && !urlInput.trim()}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Save to Project</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
