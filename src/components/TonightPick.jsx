import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, Calendar, MapPin, Film, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { memoriesData } from '../data/memories';

export default function TonightPick() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();

  // Stable pick per day/session
  const pick = useMemo(() => {
    // Pick based on day of year to stay stable throughout the day
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const nonHero = memoriesData.filter(m => !m.isHero);
    return nonHero[dayOfYear % nonHero.length] || memoriesData[1];
  }, []);

  const isFav = favorites.includes(pick.id);

  return (
    <section className="w-full px-4 sm:px-8 lg:px-14 py-8 sm:py-12">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#121218] to-[#181824] shadow-2xl">

        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={pick.heroImage || pick.thumbnail}
            alt=""
            className="w-full h-full object-cover filter blur-2xl opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent" />
        </div>

        {/* Crisp Preview on Right (Desktop) */}
        <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 max-h-[85%] items-center">
          {pick.isVideo && pick.videoUrl ? (
            <video
              src={pick.videoUrl}
              className="max-h-[210px] w-auto rounded-xl object-contain shadow-2xl border border-white/10"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img
              src={pick.heroImage || pick.thumbnail}
              alt={pick.title}
              className="max-h-[210px] w-auto rounded-xl object-contain shadow-2xl border border-white/10"
            />
          )}
        </div>

        {/* Content Box */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/90 text-white shadow-lg shadow-red-600/40">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Tonight's Curated Pick
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              You probably forgot about this one
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {pick.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-zinc-300">
            <span className="text-emerald-400 font-semibold">{pick.matchRate || '99% Match'}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              {pick.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              {pick.location}
            </span>
            <span>•</span>
            <span className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-bold">
              {pick.photosCount} Photos
            </span>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 font-serif-quote italic leading-relaxed">
            "{pick.tagline || pick.description}"
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/memory/${pick.slug}`)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Memory</span>
            </button>

            <button
              onClick={() => toggleFavorite(pick.id)}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all"
              title={isFav ? "Remove from My List" : "Add to My List"}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
