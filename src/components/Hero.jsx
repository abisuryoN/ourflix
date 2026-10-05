import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Check, Info, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { memoriesData } from '../data/memories';
import ThreeScene from './ThreeScene';
import gsap from 'gsap';

export default function Hero() {
  const navigate = useNavigate();
  const { partnerName, favorites, toggleFavorite, isPlayingMusic, setIsPlayingMusic } = useApp();
  
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const quoteRef = useRef(null);
  const metaRef = useRef(null);
  const ctaRef = useRef(null);
  const bgImgRef = useRef(null);

  const featuredMemory = memoriesData.find(m => m.isHero) || memoriesData[0];
  const isFav = favorites.includes(featuredMemory.id);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(bgImgRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4 }
      )
      .fromTo(titleRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=1.0"
      )
      .fromTo(quoteRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.7"
      )
      .fromTo(metaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(ctaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleContinueStory = () => {
    navigate(`/memory/${featuredMemory.slug}`);
  };

  return (
    <div 
      ref={heroRef} 
      className="relative w-full h-screen flex items-center overflow-hidden bg-[#070709]"
    >
      {/* Full-bleed background image — both faces fully visible */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgImgRef}
          src={featuredMemory.heroImage}
          alt="Abi & Nazra"
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 35%' }}
        />
        {/* Cinematic gradients — left heavy so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-black/60" />
      </div>

      {/* 3D Atmosphere */}
      <ThreeScene variant="hero" />

      {/* Hero Content — left-aligned, over the gradient */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pt-20">
        <div className="max-w-xl space-y-4 sm:space-y-6">
          
          {/* Badges */}
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 text-[11px] sm:text-xs font-black tracking-widest uppercase rounded bg-red-600 text-white shadow-lg shadow-red-600/40">
              OURFLIX ORIGINAL
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              SPECIAL ROMANCE COLLECTION
            </span>
          </div>

          {/* Title */}
          <div ref={titleRef} className="space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-red-500/90 font-cinema">
              OUR STORY
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Abi & {partnerName}
            </h1>
          </div>

          {/* Quote */}
          <p 
            ref={quoteRef}
            className="text-base sm:text-xl text-zinc-300 font-serif-quote italic leading-relaxed"
          >
            "Sejak 10 Juni 2026, setiap cerita bersamamu adalah adegan terbaik dalam hidupku."
          </p>

          {/* Meta */}
          <div 
            ref={metaRef}
            className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-zinc-400 font-medium"
          >
            <span className="text-emerald-400 font-bold tracking-wide">100% Match</span>
            <span className="text-zinc-600">•</span>
            <span>10 Juni 2026</span>
            <span className="text-zinc-600">•</span>
            <span className="px-1.5 py-0.5 border border-white/20 rounded text-[11px] text-zinc-300 font-bold">ALL AGES</span>
            <span className="text-zinc-600">•</span>
            <span>Unlimited Love</span>
            <span className="text-zinc-600">•</span>
            <span className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-bold text-white tracking-widest">4K ULTRA HD</span>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={handleContinueStory}
              className="group flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white text-black font-bold text-sm sm:text-base hover:bg-white/90 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
              <Play className="w-5 h-5 fill-black transition-transform group-hover:scale-110" />
              <span>Lihat Cerita Kita</span>
            </button>

            <button
              onClick={() => toggleFavorite(featuredMemory.id)}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md text-white font-semibold text-sm sm:text-base transition-all border border-white/10"
            >
              {isFav ? (
                <><Check className="w-5 h-5 text-emerald-400" /><span>In My List</span></>
              ) : (
                <><Plus className="w-5 h-5" /><span>My List</span></>
              )}
            </button>

            <button
              onClick={() => navigate(`/memory/${featuredMemory.slug}`)}
              className="p-3 sm:p-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
              title="Detail Foto"
            >
              <Info className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlayingMusic(!isPlayingMusic)}
              className={`p-3 sm:p-3.5 rounded-xl backdrop-blur-md transition-all border ${
                isPlayingMusic 
                  ? 'bg-red-600/30 border-red-500/50 text-white' 
                  : 'bg-white/10 hover:bg-white/20 border-white/10 text-zinc-300'
              }`}
              title={isPlayingMusic ? "Soundtrack playing" : "Play ambient music"}
            >
              {isPlayingMusic ? <Volume2 className="w-5 h-5 text-red-400 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
