import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, SlidersHorizontal, Calendar, Heart } from 'lucide-react';
import { memoriesData } from '../data/memories';
import MemoryCard from '../components/MemoryCard';
import ThreeScene from '../components/ThreeScene';

export default function Memories() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['All', 'Our Memories', 'Favorite People', 'Our Favorite Moments'];
  const years = ['All', '2024', '2025'];

  const filteredMemories = useMemo(() => {
    return memoriesData.filter(memory => {
      const matchCat = selectedCategory === 'All' || memory.category === selectedCategory;
      const matchYear = selectedYear === 'All' || memory.year === selectedYear;
      const matchSearch = searchTerm.trim() === '' ||
        memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (memory.tags && memory.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));

      return matchCat && matchYear && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'match') return parseInt(b.matchRate) - parseInt(a.matchRate);
      if (sortBy === 'newest') return b.year.localeCompare(a.year);
      return 0;
    });
  }, [selectedCategory, selectedYear, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-[#070709] text-[#f4f4f6] pt-24 pb-28 relative overflow-hidden">
      {/* 3D Atmosphere */}
      <ThreeScene variant="memories" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <p className="text-xs font-bold uppercase tracking-widest text-red-500 font-cinema">
              COMPLETE CATALOG
            </p>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            All Memories & Episodes
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Browse through all chapters of our shared relationship archive.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 bg-[#101015]/80 p-4 sm:p-5 rounded-2xl border border-white/5 backdrop-blur-md">
          {/* Top Search Input & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search title, location, tag..."
                className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 shrink-0">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/40 border border-white/10 text-white text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="default">Default Order</option>
                <option value="match">Highest Match Rate</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Memories Grid */}
        {filteredMemories.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 space-y-2">
            <p className="text-base font-semibold text-zinc-400">No memories found</p>
            <p className="text-xs">Try clearing filters or search keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredMemories.map(memory => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
