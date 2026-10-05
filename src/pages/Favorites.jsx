import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Sparkles, Film, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { memoriesData } from '../data/memories';
import MemoryCard from '../components/MemoryCard';
import ThreeScene from '../components/ThreeScene';

export default function Favorites() {
  const { favorites } = useApp();

  const favoriteMemories = memoriesData.filter(m => favorites.includes(m.id));

  return (
    <div className="min-h-screen bg-[#070709] text-[#f4f4f6] pt-24 pb-28 relative overflow-hidden">
      {/* 3D Atmosphere */}
      <ThreeScene variant="favorites" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <p className="text-xs font-bold uppercase tracking-widest text-red-500 font-cinema">
              PERSONAL CURATION
            </p>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>My List</span>
            <span className="text-lg sm:text-2xl font-semibold text-zinc-500">
              ({favoriteMemories.length})
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            The moments and milestones you've bookmarked to re-watch anytime.
          </p>
        </div>

        {/* Empty State vs Grid */}
        {favoriteMemories.length === 0 ? (
          <div className="text-center py-20 sm:py-28 rounded-3xl bg-[#101015]/60 border border-white/5 space-y-4 max-w-2xl mx-auto px-6">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
              <Heart className="w-8 h-8 stroke-1" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                No memories here yet.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-serif-quote italic">
                Start collecting the moments that matter by clicking the heart or "My List" icon on any memory.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/memories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30"
              >
                <Film className="w-4 h-4" />
                <span>Explore All Memories</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {favoriteMemories.map(memory => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
