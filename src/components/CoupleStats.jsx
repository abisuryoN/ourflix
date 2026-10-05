import React, { useMemo } from 'react';
import { Camera, MapPin, Film, Coffee, Heart, Sparkles, Clock, Flame } from 'lucide-react';
import { statsConfig, coupleStartDate } from '../data/stats';

export default function CoupleStats() {
  // Calculate live days count from coupleStartDate (10 June 2024)
  const daysCount = useMemo(() => {
    const now = new Date();
    const diffTime = now.getTime() - coupleStartDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, []);

  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 py-12 sm:py-16">
      <div className="relative rounded-3xl bg-[#0d0d12] border border-white/5 p-6 sm:p-10 lg:p-12 overflow-hidden">

        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/5 rounded-full filter blur-[100px] pointer-events-none" />

        {/* Header Title */}
        <div className="relative z-10 max-w-xl space-y-2 mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <p className="text-xs font-bold uppercase tracking-widest text-red-500 font-cinema">
              LIVE RELATIONSHIP TELEMETRY
            </p>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Story in Numbers
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Every day is a new episode added to our infinite library.
          </p>
        </div>

        {/* Hero Counter: Days Together */}
        <div className="relative z-10 mb-8 sm:mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-500" />
              Continuous Streak
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight font-heading">
                {daysCount}
              </span>
              <span className="text-xl sm:text-3xl font-extrabold text-red-500 uppercase tracking-widest">
                DAYS
              </span>
            </div>
          </div>
          <div className="text-left sm:text-right space-y-1">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
              ● Active & Strong
            </span>
            <p className="text-xs text-zinc-400">
              Since June 10, 2026 (10 Juni 2026)
            </p>
          </div>
        </div>

        {/* Grid of Other Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-white/15 transition-colors">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium uppercase tracking-wider">Memories</span>
              <Camera className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-extrabold text-white">
              128<span className="text-red-500 text-lg">+</span>
            </div>
            <p className="text-[11px] text-zinc-500">Unfiltered snapshots</p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-white/15 transition-colors">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium uppercase tracking-wider">Places</span>
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-extrabold text-white">
              24<span className="text-zinc-500 text-sm font-normal ml-1">spots</span>
            </div>
            <p className="text-[11px] text-zinc-500">Cafes, cities & hills</p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-white/15 transition-colors">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium uppercase tracking-wider">Movies</span>
              <Film className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-extrabold text-white">
              36<span className="text-zinc-500 text-sm font-normal ml-1">titles</span>
            </div>
            <p className="text-[11px] text-zinc-500">Watched side-by-side</p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-white/15 transition-colors">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium uppercase tracking-wider">Rating</span>
              <Heart className="w-4 h-4 text-pink-400 fill-pink-500" />
            </div>
            <div className="text-2xl sm:text-4xl font-extrabold text-white">
              100%<span className="text-emerald-400 text-xs font-bold ml-1">Match</span>
            </div>
            <p className="text-[11px] text-zinc-500">Certified soulmates</p>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="relative z-10 mt-8 sm:mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-zinc-400 font-serif-quote italic">
            "Still watching together. No cancellation of our subscription will ever be possible."
          </p>
          <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-red-600/20 text-red-400 border border-red-500/20">
            LIFETIME MEMBERSHIP
          </span>
        </div>
      </div>
    </section>
  );
}
