import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Edit3, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ThreeScene from '../components/ThreeScene';
import gsap from 'gsap';

export default function ProfileSelection() {
  const navigate = useNavigate();
  const { profiles, selectProfile, partnerName, updatePartnerName } = useApp();
  const [editingPartner, setEditingPartner] = useState(false);
  const [nameInput, setNameInput] = useState(partnerName);
  const [selectedId, setSelectedId] = useState(null);

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(cardsRef.current,
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)', delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleProfileClick = (profile) => {
    setSelectedId(profile.id);
    selectProfile(profile);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      navigate('/');
      return;
    }

    // Cinematic transition towards Home
    const cardEl = cardsRef.current.find((_, i) => profiles[i]?.id === profile.id);
    if (cardEl) {
      gsap.to(cardEl, {
        scale: 1.15,
        boxShadow: '0 0 50px rgba(229, 9, 20, 0.8)',
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(10px)',
      duration: 0.75,
      delay: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        navigate('/');
      }
    });
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      updatePartnerName(nameInput.trim());
      setEditingPartner(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#070709] px-4 py-12 overflow-hidden selection:bg-red-600/40"
    >
      {/* 3D Atmosphere */}
      <ThreeScene variant="hero" />

      {/* Cinematic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full filter blur-[140px] pointer-events-none" />

      {/* Brand Watermark */}
      <div className="absolute top-8 left-8 sm:left-12 z-10 flex items-center gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-wider text-red-600 font-cinema drop-shadow-[0_2px_15px_rgba(229,9,20,0.6)]">
          OURFLIX
        </span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8 sm:space-y-12">
        
        {/* Title Header */}
        <div ref={titleRef} className="space-y-2">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-zinc-500 uppercase font-cinema">
            PRIVATE CINEMA VAULT
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Who's Watching?
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto font-serif-quote italic">
            Select your profile to load personal memories, curated rows, and private letters.
          </p>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto px-4">
          {profiles.map((profile, idx) => {
            const isSelected = selectedId === profile.id;
            return (
              <div
                key={profile.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                onClick={() => handleProfileClick(profile)}
                className={`group relative rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'border-red-600 bg-red-950/20 scale-105'
                    : 'border-white/10 bg-[#121217]/80 hover:bg-[#181822] hover:border-red-500/50 hover:scale-105'
                } shadow-xl hover:shadow-2xl hover:shadow-red-950/30 backdrop-blur-md`}
              >
                {/* Profile Avatar Frame */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden mb-4 border-2 border-transparent group-hover:border-red-500 transition-all duration-300 shadow-lg">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                  
                  {/* Subtle Heart icon on together profile */}
                  {profile.id === 'together' && (
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow-md">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                    </div>
                  )}
                </div>

                {/* Profile Name */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                  {profile.name}
                </h3>

                {/* Role / Subtitle */}
                <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                  {profile.role}
                </p>

                {/* Custom Partner Name Edit Button (Only for partner profile) */}
                {profile.id === 'pacar' && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingPartner(!editingPartner);
                    }}
                    className="mt-3 flex items-center gap-1 text-[11px] text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Rename</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal / In-place Name Editor for Partner Profile */}
        {editingPartner && (
          <form 
            onSubmit={handleSaveName}
            className="max-w-xs mx-auto p-3 rounded-xl glass-panel border border-white/10 flex items-center gap-2 animate-in fade-in"
          >
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter Partner's Name"
              className="flex-1 bg-black/40 text-white text-xs px-2.5 py-1.5 rounded-lg border border-white/10 focus:outline-none focus:border-red-500"
              autoFocus
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
              title="Save Name"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Bottom Tagline */}
        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span>Netflix, but every movie is about our love story.</span>
        </div>

      </div>
    </div>
  );
}
