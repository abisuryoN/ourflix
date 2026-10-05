import React, { useState } from 'react';
import { Maximize2, Sparkles } from 'lucide-react';
import ImageViewer from './ImageViewer';

export default function Gallery({ images = [], title = "Photo Gallery" }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!images || images.length === 0) return null;

  const handleOpenPhoto = (idx) => {
    setSelectedIdx(idx);
    setViewerOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span>{title}</span>
          <span className="text-xs font-normal text-zinc-500">
            ({images.length} photos)
          </span>
        </h3>
        <span className="text-xs text-zinc-400">
          Click any photo to expand
        </span>
      </div>

      {/* Grid: 2 columns on mobile, 3-4 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => handleOpenPhoto(idx)}
            className="group relative aspect-4/3 rounded-xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/20 cursor-pointer shadow-md transition-all duration-300"
          >
            <img
              src={img}
              alt={`${title} snapshot ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            
            {/* Subtle dark vignette on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="p-2.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100 backdrop-blur-sm">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white/80 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Photo #{idx + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <ImageViewer
        images={images}
        currentIndex={selectedIdx}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onNext={() => setSelectedIdx((prev) => (prev + 1) % images.length)}
        onPrev={() => setSelectedIdx((prev) => (prev - 1 + images.length) % images.length)}
      />
    </div>
  );
}
