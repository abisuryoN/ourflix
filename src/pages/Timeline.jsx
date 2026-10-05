import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Sparkles, Heart, Flag, ArrowDown } from 'lucide-react';
import { timelineData } from '../data/timeline';
import ThreeScene from '../components/ThreeScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate each milestone card on scroll
      itemsRef.current.forEach((el, index) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#070709] text-[#f4f4f6] pt-24 pb-28 relative overflow-hidden">
      {/* 3D Atmosphere */}
      <ThreeScene variant="timeline" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16 sm:mb-20 relative z-10">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-red-600/20 text-red-400 border border-red-500/30">
          CHRONOLOGICAL REPLAY
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Our Timeline
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 font-serif-quote italic max-w-xl mx-auto">
          "From a random coincidence to our forever story. Every milestone recorded in high definition."
        </p>
        
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-red-500" />
          <span>Scroll down to walk through our story</span>
        </div>
      </div>

      {/* Timeline Road */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Center Vertical Glowing Track Line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-red-600 via-white/20 to-red-600/40" />

        {/* Milestone Entries */}
        <div className="space-y-12 sm:space-y-16">
          {timelineData.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[idx] = el)}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12 pl-12 sm:pl-0`}
              >
                {/* Center Node / Year Badge */}
                <div className="absolute left-6 sm:left-1/2 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#121217] border-2 border-red-600 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(229,9,20,0.6)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                </div>

                {/* Milestone Card Content */}
                <div className="w-full sm:w-[calc(50%-2.5rem)] rounded-2xl bg-[#111116]/90 border border-white/10 p-5 sm:p-6 space-y-3 shadow-xl backdrop-blur-md hover:border-red-500/40 transition-all duration-300 group">
                  
                  {/* Image with zoom */}
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-red-400 font-bold text-xs border border-white/10">
                      {item.year}
                    </div>
                  </div>

                  {/* Header */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        {item.location}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-semibold tracking-wide uppercase">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Romantic Quote */}
                  {item.quote && (
                    <div className="pt-2 border-t border-white/5 text-xs text-zinc-400 font-serif-quote italic text-red-200/90">
                      "{item.quote}"
                    </div>
                  )}

                </div>

                {/* Empty spacer for the other half on desktop */}
                <div className="hidden sm:block sm:w-[calc(50%-2.5rem)]" />
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Sign off */}
      <div className="mt-20 text-center relative z-10 space-y-2">
        <Heart className="w-6 h-6 text-red-600 fill-red-600 mx-auto animate-pulse" />
        <p className="text-sm font-semibold text-white">To be continued in the next episodes...</p>
        <p className="text-xs text-zinc-500">More seasons are currently in production.</p>
      </div>
    </div>
  );
}
