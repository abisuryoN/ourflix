import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Play, Plus, Check, Heart, Calendar, MapPin, Film, Sparkles, ArrowLeft, Clock, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { memoriesData } from '../data/memories';
import Gallery from '../components/Gallery';
import ImageViewer from '../components/ImageViewer';
import MemoryRow from '../components/MemoryRow';
import gsap from 'gsap';

export default function MemoryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const [viewerOpen, setViewerOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const memory = memoriesData.find(m => m.slug === slug) || memoriesData[0];
  const isFav = favorites.includes(memory.id);

  // Recommendations: Other memories in same category or general list
  const relatedMemories = memoriesData.filter(m => m.id !== memory.id);

  useEffect(() => {
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, [slug]);

  const handleWatchMemory = () => {
    setPhotoIndex(0);
    setViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#f4f4f6] pb-24 overflow-x-hidden">
      
      {/* Top Back Navigation Bar */}
      <div className="fixed top-20 left-4 sm:left-8 z-30">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-white/10 text-white hover:bg-white/15 transition-all text-xs font-semibold backdrop-blur-md shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Cinematic Hero Banner */}
      <div 
        ref={heroRef}
        className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-end overflow-hidden"
      >
        {/* Ambient Blur Layer */}
        <img
          src={memory.heroImage || memory.thumbnail}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-30 scale-110"
        />

        {/* Crisp Foreground Image */}
        <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-12 lg:pr-24 pointer-events-none opacity-40 sm:opacity-75">
          <img
            src={memory.heroImage || memory.thumbnail}
            alt={memory.title}
            className="max-h-[65vh] w-auto max-w-[90%] sm:max-w-[50%] object-contain rounded-2xl shadow-2xl"
          />
        </div>

        {/* Vignette Gradients */}
        <div className="absolute inset-0 hero-vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/75 to-transparent" />

        {/* Hero Title & Meta Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full">
          <div className="max-w-3xl space-y-4">
            
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-black tracking-widest uppercase rounded bg-red-600 text-white shadow-lg shadow-red-600/40">
                OURFLIX EXCLUSIVE
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded bg-white/10 text-zinc-300 border border-white/10">
                {memory.subCategory || memory.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {memory.title}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-xl text-zinc-300 font-serif-quote italic leading-relaxed">
              "{memory.tagline || memory.quote}"
            </p>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-400 font-medium">
              <span className="text-emerald-400 font-bold">
                {memory.matchRate || '99% Match'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {memory.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                {memory.location}
              </span>
              <span>•</span>
              <span className="px-1.5 py-0.5 border border-white/20 rounded text-[10px] font-bold text-white">
                {memory.images?.length || memory.photosCount || 1} PHOTOS
              </span>
              <span>•</span>
              <span className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-bold text-white tracking-widest">
                4K HDR
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={handleWatchMemory}
                className="group flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-white text-black font-bold text-sm sm:text-base hover:bg-white/90 active:scale-95 transition-all shadow-xl shadow-white/10"
              >
                <Play className="w-5 h-5 fill-black transition-transform group-hover:scale-110" />
                <span>Watch Memory</span>
              </button>

              <button
                onClick={() => toggleFavorite(memory.id)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md text-white font-semibold text-sm transition-all border border-white/10"
              >
                {isFav ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>In My List</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to My List</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 mt-8">
        
        {/* The Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left 2 Cols: Story text */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-1 border-b border-white/10 pb-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                The Story
              </h2>
              <p className="text-xs text-zinc-400 font-serif-quote italic">
                From our private diary archives
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              {memory.story && memory.story.length > 0 ? (
                memory.story.map((paragraph, idx) => (
                  <p key={idx} className="first-letter:text-2xl first-letter:font-bold first-letter:text-red-500">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{memory.description}</p>
              )}
            </div>

            {/* Romantic Quote Block */}
            {memory.quote && (
              <blockquote className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-red-950/20 to-transparent border-l-4 border-red-600 text-sm sm:text-base font-serif-quote italic text-zinc-200">
                "{memory.quote}"
              </blockquote>
            )}
          </div>

          {/* Right Col: Metadata Sidebar */}
          <div className="space-y-6 p-6 rounded-2xl bg-[#121217] border border-white/5 h-fit">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              Episode Metadata
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="text-zinc-500 block text-xs">Date</span>
                <span className="text-white font-medium">{memory.date}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-xs">Location</span>
                <span className="text-white font-medium">{memory.location}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-xs">Category</span>
                <span className="text-white font-medium">{memory.category}</span>
              </div>
              {memory.tags && (
                <div>
                  <span className="text-zinc-500 block text-xs mb-1.5">Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                    {memory.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 text-[11px] border border-white/10">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Video Player Section if available */}
        {memory.isVideo && memory.videoUrl && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Film className="w-5 h-5 text-red-500" />
                <span>Featured Video Clip</span>
                <span className="text-xs font-normal text-red-400 bg-red-600/20 px-2 py-0.5 rounded-full border border-red-500/30">
                  4K MOTION
                </span>
              </h3>
              <span className="text-xs text-zinc-400">
                Full HD Motion Memory
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black border border-red-500/20 shadow-2xl aspect-video max-w-4xl mx-auto">
              <video
                src={memory.videoUrl}
                controls
                playsInline
                poster={memory.thumbnail}
                className="w-full h-full object-contain"
              />
            </div>
          </section>
        )}

        {/* Photo Gallery Grid */}
        <section>
          <Gallery
            images={memory.images || [memory.heroImage, memory.thumbnail]}
            title="Photo Gallery"
          />
        </section>

        {/* More Like This Row */}
        <section className="pt-8 border-t border-white/5">
          <MemoryRow
            title="More Like This"
            subtitle="Explore more cherished moments in our collection"
            memories={relatedMemories}
          />
        </section>

      </div>

      {/* Fullscreen Lightbox for "Watch Memory" button */}
      <ImageViewer
        images={memory.images || [memory.heroImage, memory.thumbnail]}
        currentIndex={photoIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onNext={() => setPhotoIndex((prev) => (prev + 1) % (memory.images?.length || 1))}
        onPrev={() => setPhotoIndex((prev) => (prev - 1 + (memory.images?.length || 1)) % (memory.images?.length || 1))}
      />

    </div>
  );
}
