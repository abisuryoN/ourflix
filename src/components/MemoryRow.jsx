import React, { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MemoryCard from './MemoryCard';

export default function MemoryRow({
  title,
  subtitle,
  memories = [],
  showProgress = false,
  badge = null
}) {
  const rowRef = useRef(null);
  const isScrollingRef = useRef(false);
  const wrapTimerRef = useRef(null);

  const REPEAT = 5;
  const count = memories.length;

  const repeatedMemories = Array.from({ length: REPEAT }, (_, r) =>
    memories.map((m, i) => ({ ...m, uniqueKey: `${m.id}-r${r}-i${i}` }))
  ).flat();

  /* ── helpers ──────────────────────────────────────────── */

  const getItemWidth = useCallback(() => {
    if (!rowRef.current) return 0;
    const firstChild = rowRef.current.firstElementChild;
    if (!firstChild) return 0;
    const gap = parseFloat(window.getComputedStyle(rowRef.current).gap) || 16;
    return firstChild.offsetWidth + gap;
  }, []);

  /** Silently teleport scrollLeft by delta without animation */
  const jumpBy = useCallback((delta) => {
    if (!rowRef.current) return;
    rowRef.current.style.scrollBehavior = 'auto';
    rowRef.current.scrollLeft += delta;
    void rowRef.current.offsetWidth; // force reflow
    rowRef.current.style.scrollBehavior = '';
  }, []);

  /** Check boundaries and wrap if needed */
  const doWrapCheck = useCallback(() => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth } = rowRef.current;
    const singleSetWidth = scrollWidth / REPEAT;
    if (scrollLeft >= singleSetWidth * (REPEAT - 1)) {
      jumpBy(-singleSetWidth * (REPEAT - 2));
    } else if (scrollLeft <= singleSetWidth * 0.5) {
      jumpBy(singleSetWidth * (REPEAT - 2));
    }
  }, [jumpBy]);

  /** After smooth scroll settles (~380ms), unlock and wrap */
  const scheduleWrapCheck = useCallback(() => {
    clearTimeout(wrapTimerRef.current);
    wrapTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      doWrapCheck();
    }, 380);
  }, [doWrapCheck]);

  /* ── init at centre copy ──────────────────────────────── */
  useEffect(() => {
    if (!rowRef.current || count === 0) return;
    const timer = setTimeout(() => {
      if (!rowRef.current) return;
      const singleSetWidth = rowRef.current.scrollWidth / REPEAT;
      rowRef.current.style.scrollBehavior = 'auto';
      rowRef.current.scrollLeft = singleSetWidth * 2;
      void rowRef.current.offsetWidth;
      rowRef.current.style.scrollBehavior = '';
    }, 120);
    return () => clearTimeout(timer);
  }, [count]);

  /* ── arrow — slides 1 card, smooth ───────────────────── */
  const handleArrow = useCallback((dir) => {
    if (!rowRef.current) return;
    isScrollingRef.current = true;
    const delta = dir === 'left' ? -getItemWidth() : getItemWidth();
    rowRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    scheduleWrapCheck();
  }, [getItemWidth, scheduleWrapCheck]);

  /* ── touch/drag swipe wrap ────────────────────────────── */
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current || !rowRef.current) return;
    doWrapCheck();
  }, [doWrapCheck]);

  if (!memories || count === 0) return null;

  return (
    <section className="relative py-6 sm:py-8 space-y-3 group/section">
      {/* Header */}
      <div className="w-full px-4 sm:px-8 lg:px-14 flex items-baseline justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{title}</span>
              {badge && (
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded-full bg-red-600/30 text-red-400 border border-red-500/30">
                  {badge}
                </span>
              )}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-400 font-normal">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left Arrow — visible on ALL screen sizes */}
        <button
          onClick={() => handleArrow('left')}
          className="flex absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-red-600 active:bg-red-700 text-white items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl md:opacity-0 md:group-hover/section:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Scroll left"
          style={{ touchAction: 'manipulation' }}
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Track */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar px-4 sm:px-8 lg:px-14 py-2"
          style={{ scrollSnapType: 'none', scrollBehavior: 'auto', overflowY: 'hidden' }}
        >
          {repeatedMemories.map((memory) => (
            <div
              key={memory.uniqueKey}
              className="w-[72vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] shrink-0"
            >
              <MemoryCard memory={memory} showProgress={showProgress} />
            </div>
          ))}
        </div>

        {/* Right Arrow — visible on ALL screen sizes */}
        <button
          onClick={() => handleArrow('right')}
          className="flex absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-red-600 active:bg-red-700 text-white items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl md:opacity-0 md:group-hover/section:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Scroll right"
          style={{ touchAction: 'manipulation' }}
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
}
