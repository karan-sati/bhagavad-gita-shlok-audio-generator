import React from 'react';
import { Play, Pause, ChevronUp, Bell, Sparkles } from 'lucide-react';
import { Shloka } from '../data/gitaData';
import { PlaybackState } from '../utils/audioEngine';

interface MiniPlayerBarProps {
  shloka: Shloka | null;
  playbackState: PlaybackState;
  onPlayToggle: () => void;
  onExpand: () => void;
  isTanpuraActive: boolean;
}

export const MiniPlayerBar: React.FC<MiniPlayerBarProps> = ({
  shloka,
  playbackState,
  onPlayToggle,
  onExpand,
  isTanpuraActive,
}) => {
  if (!shloka) return null;

  const isPlaying = playbackState === 'playing';

  return (
    <div className="w-full bg-[#111726]/95 border-t border-amber-500/20 px-3.5 py-2.5 flex items-center justify-between gap-3 shadow-xl backdrop-blur-md z-40">
      {/* Clickable Area to Expand Full Player */}
      <div 
        onClick={onExpand}
        className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer group"
      >
        {/* Shloka Icon Avatar */}
        <div className="relative w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 overflow-hidden">
          <img 
            src="/src/assets/images/gita_sacred_flute_1793092423443.jpg" 
            alt="Flute" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-[0.5px] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </div>
          )}
        </div>

        {/* Shloka Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
            <span>BG {shloka.chapter}.{shloka.verse}</span>
            {isTanpuraActive && (
              <span className="text-[9px] text-emerald-400 font-normal">· Tanpura</span>
            )}
          </div>
          <p className="font-devanagari text-xs text-amber-100 font-medium truncate">
            {shloka.sanskritLines[0]}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onPlayToggle}
          className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-transform"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-slate-950" />
          ) : (
            <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
          )}
        </button>

        <button
          onClick={onExpand}
          className="w-8 h-8 rounded-full bg-slate-800/80 text-slate-300 flex items-center justify-center hover:text-white transition-colors"
          title="Open Full Player"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
