import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MusicPlayer() {
  const { isPlayingMusic, setIsPlayingMusic } = useApp();
  const [volume, setVolume] = useState(0.4);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSongTitle, setCurrentSongTitle] = useState('Our Cinematic Theme (Acoustic)');
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);

  // Web Audio romantic ambient generator
  useEffect(() => {
    if (!isPlayingMusic) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      return;
    }

    // Initialize Web Audio
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      gainNode.connect(audioCtxRef.current.destination);
      gainNodeRef.current = gainNode;
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    // Play smooth romantic chord progression (Cmaj9 -> Am9 -> Fmaj7 -> Gsus4)
    const chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj7
      [196.00, 261.63, 293.66, 392.00, 440.00]  // Gsus4 add9
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const chord = chords[chordIdx % chords.length];
      chordIdx++;

      chord.forEach((freq, noteIdx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Soft warm triangle/sine blend
        osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.12);

        // Slow soft attack and long decay
        const start = now + noteIdx * 0.12;
        noteGain.gain.setValueAtTime(0.0001, start);
        noteGain.gain.exponentialRampToValueAtTime(0.08 / chord.length, start + 1.2);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, start + 4.5);

        osc.connect(noteGain);
        noteGain.connect(gainNodeRef.current);

        osc.start(start);
        osc.stop(start + 4.8);
      });
    };

    playChord();
    intervalRef.current = setInterval(playChord, 4800);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlayingMusic]);

  // Adjust volume
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  const togglePlay = () => {
    setIsPlayingMusic(prev => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div 
        className={`flex items-center gap-3 px-3 py-2 rounded-full glass-panel border border-white/10 text-white shadow-2xl transition-all duration-300 ${
          isExpanded ? 'pr-4 bg-[#121217]/95' : 'bg-[#121217]/80 hover:bg-[#121217]/95'
        }`}
      >
        {/* Vinyl / Disc icon with spinning animation when playing */}
        <button
          onClick={togglePlay}
          className={`relative p-2 rounded-full flex items-center justify-center transition-all ${
            isPlayingMusic 
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
              : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
          }`}
          title={isPlayingMusic ? "Pause Music" : "Play Romantic Soundtrack"}
        >
          {isPlayingMusic ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 translate-x-0.5" />
          )}
        </button>

        {/* Mini track info */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer select-none text-left"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-zinc-400">
              OUR SOUNDTRACK
            </span>
          </div>
          <p className="text-xs font-medium text-white/90 truncate max-w-[140px] sm:max-w-[180px]">
            {isPlayingMusic ? '♪ Playing: Our Cinematic Theme' : '♪ Click play for ambient music'}
          </p>
        </div>

        {/* Volume & Details Toggle */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
          <button
            onClick={() => setVolume(v => v === 0 ? 0.4 : 0)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-red-600"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </div>
      </div>
    </div>
  );
}
