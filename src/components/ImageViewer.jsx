import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Maximize2 } from 'lucide-react';

export default function ImageViewer({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onNext,
  onPrev
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling while modal is active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onNext, onPrev, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-300">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between text-white z-20">
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-400 bg-white/10 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="hidden sm:inline text-xs text-zinc-500">
            Use ← → arrow keys to navigate
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close image viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Area with Previous/Next Controls */}
      <div className="relative flex-1 flex items-center justify-center my-auto overflow-hidden">
        
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/60 hover:bg-red-600 text-white border border-white/10 backdrop-blur-md transition-all hover:scale-110 shadow-2xl"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Large Uncropped Image or Video */}
        <div className="max-w-6xl max-h-[82vh] flex items-center justify-center p-2">
          {currentImg && currentImg.endsWith('.mp4') ? (
            <video
              src={currentImg}
              controls
              autoPlay
              playsInline
              className="max-h-[80vh] w-auto max-w-full rounded-xl shadow-2xl bg-black"
            />
          ) : (
            <img
              src={currentImg}
              alt={`Memory photo ${currentIndex + 1}`}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300 animate-in zoom-in-95 duration-200"
            />
          )}
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-red-600 text-white border border-white/10 backdrop-blur-md transition-all hover:scale-110 shadow-2xl"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2 z-20">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx > currentIndex) {
                  for (let i = currentIndex; i < idx; i++) onNext();
                } else if (idx < currentIndex) {
                  for (let i = currentIndex; i > idx; i--) onPrev();
                }
              }}
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                idx === currentIndex
                  ? 'border-red-600 scale-105 opacity-100 shadow-lg shadow-red-600/30'
                  : 'border-transparent opacity-40 hover:opacity-80'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
