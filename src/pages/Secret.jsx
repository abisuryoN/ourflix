import React, { useState, useEffect, useRef } from 'react';
import { Lock, BookOpen, Sparkles, Heart, ChevronRight, ArrowLeft, Clock, Feather } from 'lucide-react';
import { lettersData } from '../data/letters';
import ThreeScene from '../components/ThreeScene';
import gsap from 'gsap';

export default function Secret() {
  const [selectedEpisode, setSelectedEpisode] = useState(lettersData[0]);
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [selectedEpisode]);

  return (
    <div className="min-h-screen bg-[#060608] text-[#f4f4f6] pt-24 pb-28 relative overflow-hidden">
      {/* 3D Atmosphere */}
      <ThreeScene variant="secret" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-12 sm:mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5" />
          <span>FOR YOU • PRIVATE LETTERS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Letters to My Favorite Person
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-serif-quote italic max-w-lg mx-auto">
          "Unpublished thoughts, quiet confessions, and our future written in words."
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Episode List Tabs (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1 mb-2">
            Select Episode to Read
          </h3>

          <div className="space-y-3">
            {lettersData.map((ep) => {
              const isSelected = selectedEpisode.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => setSelectedEpisode(ep)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all duration-300 ${
                    isSelected
                      ? 'bg-red-950/30 border-red-500/60 shadow-xl shadow-red-950/20 translate-x-1'
                      : 'bg-[#101015]/80 hover:bg-[#15151e] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-red-400 uppercase tracking-wider text-[11px]">
                      {ep.episode}
                    </span>
                    <span className="text-zinc-500 flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {ep.readTime}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white mb-1 line-clamp-1">
                    {ep.title}
                  </h4>

                  <p className="text-xs text-zinc-400 line-clamp-2 font-serif-quote italic">
                    "{ep.excerpt}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Immersive Reading Stage (8 cols) */}
        <div 
          ref={contentRef}
          className="lg:col-span-8 rounded-3xl bg-[#0e0e13]/90 border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-md relative"
        >
          {/* Subtle Top Border Glow */}
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

          {/* Letter Header */}
          <div className="border-b border-white/10 pb-6 mb-8 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="text-red-500 font-bold uppercase tracking-widest text-[11px]">
                {selectedEpisode.season} • {selectedEpisode.episode}
              </span>
              <span className="font-serif-quote italic text-zinc-500">
                {selectedEpisode.date}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {selectedEpisode.title}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 font-serif-quote italic">
              {selectedEpisode.subtitle}
            </p>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-6 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
            {selectedEpisode.content.map((para, idx) => (
              <p 
                key={idx} 
                className="first-letter:text-3xl first-letter:font-bold first-letter:text-red-500 first-letter:mr-1 first-letter:float-left leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Sign-off and Signature */}
          <div className="mt-12 pt-8 border-t border-white/10 space-y-2 text-right">
            <p className="text-sm font-serif-quote italic text-zinc-400">
              "{selectedEpisode.closing}"
            </p>
            <p className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center justify-end gap-2">
              <Feather className="w-4 h-4 text-red-500" />
              <span>{selectedEpisode.signature}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
