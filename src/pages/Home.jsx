import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart, Lock, BookOpen } from 'lucide-react';
import Hero from '../components/Hero';
import ContinueWatching from '../components/ContinueWatching';
import MemoryRow from '../components/MemoryRow';
import TonightPick from '../components/TonightPick';
import CoupleStats from '../components/CoupleStats';
import { memoriesData } from '../data/memories';
import { lettersData } from '../data/letters';

export default function Home() {
  const ourMemories = memoriesData.filter(m => m.category === 'Our Memories');
  const favoritePeople = memoriesData.filter(m => m.category === 'Favorite People');
  const favoriteMoments = memoriesData.filter(m => m.category === 'Our Favorite Moments');

  return (
    <div className="min-h-screen bg-[#070709] text-[#f4f4f6] pb-24 overflow-x-hidden">
      
      {/* Hero Fullscreen Banner */}
      <Hero />

      {/* Main Content Rows */}
      <div className="relative z-20 pt-8 sm:pt-14 space-y-6 sm:space-y-10">
        
        {/* Continue Watching Row */}
        <ContinueWatching memories={memoriesData} />

        {/* Section 1: Our Memories */}
        <MemoryRow
          title="Our Memories"
          subtitle="Milestone moments that shaped our journey together"
          memories={ourMemories}
          badge="Featured Series"
        />

        {/* Section 2: Favorite People */}
        <MemoryRow
          title="Favorite People"
          subtitle="The most precious smile and warmth in my universe"
          memories={favoritePeople}
          badge="Special Spotlight"
        />

        {/* Tonight's Pick Banner */}
        <TonightPick />

        {/* Section 3: Our Favorite Moments */}
        <MemoryRow
          title="Our Favorite Moments"
          subtitle="The days we laughed hardest and held on closest"
          memories={favoriteMoments}
        />

        {/* Couple Stats Live Telemetry */}
        <CoupleStats />

        {/* Secret Letters Teaser Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-red-500/20 bg-gradient-to-r from-red-950/40 via-[#141018] to-[#0d0d12] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded bg-red-600/80 text-white">
                  CONFIDENTIAL EPISODES
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-red-400" />
                  FOR YOUR EYES ONLY
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Secret Letters: "Things I Never Said"
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 font-serif-quote italic">
                "{lettersData[0]?.excerpt}"
              </p>
            </div>

            <Link
              to="/secret"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all active:scale-95 shrink-0"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read All Episodes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
        <div className="space-y-1">
          <p className="font-cinema text-red-600 tracking-wider text-sm font-bold">
            OURFLIX
          </p>
          <p>© 2024–{new Date().getFullYear()} Abi & Nazra. All rights reserved to our hearts.</p>
        </div>
        <p className="flex items-center justify-center gap-1 text-zinc-400 font-serif-quote italic">
          Built with infinite love & cinematic memories <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
        </p>
      </footer>

    </div>
  );
}
