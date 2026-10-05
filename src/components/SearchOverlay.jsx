import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Calendar, MapPin, Film, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { memoriesData } from '../data/memories';
import gsap from 'gsap';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useApp();
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.96, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredMemories = searchQuery.trim() === ''
    ? memoriesData.slice(0, 4) // Show popular recommended memories when search is empty
    : memoriesData.filter(m => {
        const query = searchQuery.toLowerCase();
        return (
          m.title.toLowerCase().includes(query) ||
          m.year.toLowerCase().includes(query) ||
          m.date.toLowerCase().includes(query) ||
          m.location.toLowerCase().includes(query) ||
          m.category.toLowerCase().includes(query) ||
          m.subCategory.toLowerCase().includes(query) ||
          (m.tags && m.tags.some(t => t.toLowerCase().includes(query)))
        );
      });

  const handleSelectMemory = (slug) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/memory/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div 
        ref={modalRef}
        className="w-full max-w-2xl bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-4 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-red-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories, years (e.g. 2024, 2025), places, tags..."
            className="w-full bg-transparent text-white placeholder:text-zinc-500 text-base sm:text-lg focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-4 py-2.5 bg-black/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs text-zinc-400">
          <span className="shrink-0 font-medium text-zinc-500">Quick:</span>
          {['2024', '2025', 'First Date', 'Trip', 'Coffee', 'Beach', 'Rain'].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className={`shrink-0 px-2.5 py-1 rounded-full border transition-all ${
                searchQuery.toLowerCase() === tag.toLowerCase()
                  ? 'border-red-500 text-red-400 bg-red-500/10'
                  : 'border-white/10 text-zinc-400 hover:border-white/25 hover:text-white bg-white/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-zinc-500 px-2 mb-2">
            {searchQuery.trim() === '' ? 'Featured Memories' : `Results (${filteredMemories.length})`}
          </div>

          {filteredMemories.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 space-y-2">
              <Film className="w-8 h-8 mx-auto stroke-1 opacity-50" />
              <p className="text-sm">No memories found for "{searchQuery}"</p>
              <p className="text-xs text-zinc-600">Try searching for a year, date, cafe, or milestone title.</p>
            </div>
          ) : (
            filteredMemories.map(memory => (
              <div
                key={memory.id}
                onClick={() => handleSelectMemory(memory.slug)}
                className="group flex items-center gap-4 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all duration-200"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                  <img
                    src={memory.thumbnail}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-500/20">
                      {memory.category}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      {memory.year}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-red-400 transition-colors truncate">
                    {memory.title}
                  </h4>
                  <p className="text-xs text-zinc-400 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                    {memory.location}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 pr-1" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
