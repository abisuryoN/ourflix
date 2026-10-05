import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SONG = {
  src: '/audio/Sal Priadi - Besok Kita Pergi Makan (Official Audio) - (320 Kbps).mp3',
  title: 'Besok Kita Pergi Makan',
  artist: 'Sal Priadi',
};

export default function MusicPlayer() {
  const { isPlayingMusic, setIsPlayingMusic } = useApp();
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio(SONG.src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Play / pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  // Volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => setIsPlayingMusic(prev => !prev);
  const toggleMute = () => setIsMuted(m => !m);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#121217]/90 border border-white/10 text-white shadow-2xl backdrop-blur-md transition-all duration-300">

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className={`relative p-2 rounded-full flex items-center justify-center transition-all ${
            isPlayingMusic
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
          }`}
          title={isPlayingMusic ? 'Pause' : 'Play'}
        >
          {isPlayingMusic ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 translate-x-0.5" />
          )}
        </button>

        {/* Track info */}
        <div className="select-none text-left">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full bg-red-500 ${isPlayingMusic ? 'animate-pulse' : 'opacity-30'}`} />
            <span className="text-[10px] tracking-wider uppercase font-semibold text-zinc-400">
              OUR SOUNDTRACK
            </span>
          </div>
          <p className="text-xs font-medium text-white/90 truncate max-w-[150px] sm:max-w-[200px]">
            {isPlayingMusic
              ? `♪ ${SONG.artist} — ${SONG.title}`
              : `♪ ${SONG.artist} — ${SONG.title}`}
          </p>
        </div>

        {/* Volume controls */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
          <button
            onClick={toggleMute}
            className="text-zinc-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0
              ? <VolumeX className="w-4 h-4" />
              : <Volume2 className="w-4 h-4" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-red-600"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </div>
      </div>
    </div>
  );
}
