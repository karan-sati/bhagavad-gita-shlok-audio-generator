import React, { useState } from 'react';
import { 
  ShieldAlert, Briefcase, Brain, HeartHandshake, Flame, 
  Sparkles, Play, ChevronRight, BookOpen 
} from 'lucide-react';
import { LIFE_GUIDANCE_THEMES, GITA_SHLOKAS, Shloka } from '../data/gitaData';
import { ShlokaCard } from './ShlokaCard';
import { PlaybackState } from '../utils/audioEngine';

interface GuidanceScreenProps {
  currentShloka: Shloka | null;
  playbackState: PlaybackState;
  activeLineIndex: number;
  onPlay: (shloka: Shloka) => void;
  onPause: () => void;
  onResume: () => void;
  onOpenPlayer: (shloka: Shloka) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const GuidanceScreen: React.FC<GuidanceScreenProps> = ({
  currentShloka,
  playbackState,
  activeLineIndex,
  onPlay,
  onPause,
  onResume,
  onOpenPlayer,
  bookmarks,
  onToggleBookmark,
}) => {
  const [activeThemeId, setActiveThemeId] = useState<string>('anxiety-fear');

  const activeTheme = LIFE_GUIDANCE_THEMES.find(t => t.id === activeThemeId) || LIFE_GUIDANCE_THEMES[0];
  const themeShlokas = GITA_SHLOKAS.filter(s => activeTheme.suggestedShlokas.includes(s.id));

  const getThemeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-emerald-400" />;
      case 'Brain': return <Brain className="w-4 h-4 text-cyan-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4 text-rose-400" />;
      case 'Flame': return <Flame className="w-4 h-4 text-amber-500" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-4 space-y-4">
      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
          Wisdom for Life · जीवन मार्गदर्शन
        </span>
        <h2 className="text-base font-bold text-slate-100">
          What Bhagavad Gita Says For...
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Find timeless clarity for emotional storms and life decisions
        </p>
      </div>

      {/* Theme Pills Carousel */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {LIFE_GUIDANCE_THEMES.map((theme) => {
          const isActive = theme.id === activeThemeId;
          return (
            <button
              key={theme.id}
              onClick={() => setActiveThemeId(theme.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all border ${
                isActive
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/40 shadow-sm'
                  : 'bg-[#0e1422] text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {getThemeIcon(theme.icon)}
              <span>{theme.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Theme Summary Card */}
      <div className="p-4 bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-500/20 rounded-2xl">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm font-bold text-amber-200 flex items-center gap-2">
            {getThemeIcon(activeTheme.icon)}
            <span>{activeTheme.title}</span>
          </h3>
          <span className="font-devanagari text-xs text-amber-400/80">
            {activeTheme.sanskritTitle}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {activeTheme.description}
        </p>
      </div>

      {/* Recommended Shlokas for this Theme */}
      <div className="space-y-4 pb-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">
            Sacred Shlokas with Audio ({themeShlokas.length})
          </span>
          <span className="text-[11px] text-amber-400">
            Tap audio button to chant
          </span>
        </div>

        {themeShlokas.map((shloka) => (
          <ShlokaCard
            key={shloka.id}
            shloka={shloka}
            isCurrentPlaying={currentShloka?.id === shloka.id}
            playbackState={playbackState}
            activeLineIndex={activeLineIndex}
            onPlay={onPlay}
            onPause={onPause}
            onResume={onResume}
            onOpenPlayer={onOpenPlayer}
            isBookmarked={bookmarks.includes(shloka.id)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </div>
  );
};
