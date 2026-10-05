import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Heart, Plus, Check, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MemoryCard({ memory, showProgress = false, className = '' }) {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const isFav = favorites.includes(memory.id);

  // Desktop 3D Tilt calculation
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768 || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;  // max 6 deg

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  const handleCardClick = () => {
    navigate(`/memory/${memory.slug}`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className={`group relative rounded-xl overflow-hidden bg-[#14141b] border border-white/5 hover:border-white/20 transition-all duration-300 ease-out cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-red-950/20 select-none ${className}`}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.25s ease-out, border-color 0.25s ease-out' }}
    >
      {/* Thumbnail Aspect Ratio Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        {memory.isVideo && memory.videoUrl ? (
          <video
            src={memory.videoUrl}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            muted
            playsInline
            preload="metadata"
            onMouseEnter={e => e.currentTarget.play()}
            onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
          />
        ) : (
          <img
            src={memory.thumbnail}
            alt={memory.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        )}

        {/* Gradient vignette on card */}
        <div className="absolute inset-0 card-vignette opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10">
            {memory.subCategory || memory.category}
          </span>

          {/* Quick Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(memory.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
              isFav 
                ? 'bg-red-600 text-white shadow-md shadow-red-600/50' 
                : 'bg-black/60 text-zinc-400 hover:text-white hover:bg-black/80'
            }`}
            title={isFav ? "Remove from My List" : "Add to My List"}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Video badge */}
        {memory.isVideo && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-600/90 backdrop-blur-md">
            <Play className="w-2.5 h-2.5 fill-white text-white" />
            <span className="text-[9px] font-bold text-white uppercase tracking-wider">Video</span>
          </div>
        )}

        {/* Hover Action Overlay Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl shadow-red-600/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 fill-white translate-x-0.5" />
          </div>
        </div>

        {/* Optional Progress Bar (for Continue Watching) */}
        {showProgress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${memory.progress || 60}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Info Box */}
      <div className="p-3.5 space-y-1.5 bg-gradient-to-b from-[#14141b] to-[#0f0f14]">
        {/* Date and Match Rate */}
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span className="font-semibold text-emerald-400">
            {memory.matchRate || '99% Match'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-zinc-500" />
            {memory.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
          {memory.title}
        </h3>

        {/* Short Tagline / Location */}
        <p className="text-xs text-zinc-400 line-clamp-1 italic font-serif-quote">
          "{memory.tagline || memory.description}"
        </p>

        {/* Location tag */}
        {memory.location && (
          <div className="pt-1 flex items-center gap-1 text-[11px] text-zinc-500 truncate">
            <MapPin className="w-3 h-3 shrink-0 text-red-500/70" />
            <span className="truncate">{memory.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
