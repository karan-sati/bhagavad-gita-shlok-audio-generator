import React from 'react';
import { 
  Play, Pause, Sparkles, Volume2, Search, ArrowRight, 
  Flame, Bookmark, HeartHandshake, Compass, FileCode, Feather, Music2 
} from 'lucide-react';
import { Shloka, GITA_CHAPTERS } from '../data/gitaData';
import { PlaybackState, VoicePersona, VOICE_PROFILES } from '../utils/audioEngine';

interface HomeScreenProps {
  dailyShloka: Shloka;
  currentShloka: Shloka | null;
  playbackState: PlaybackState;
  onPlay: (shloka: Shloka) => void;
  onPause: () => void;
  onResume: () => void;
  onOpenPlayer: (shloka: Shloka) => void;
  onNavigateTab: (tab: 'home' | 'shlokas' | 'chapters' | 'japa' | 'guidance' | 'saved') => void;
  onSelectChapter: (chapterNumber: number) => void;
  onOpenCodeExport: () => void;
  isTanpuraActive: boolean;
  onToggleTanpura: () => void;
  activePersona: VoicePersona;
  onOpenVoiceSelector: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  dailyShloka,
  currentShloka,
  playbackState,
  onPlay,
  onPause,
  onResume,
  onOpenPlayer,
  onNavigateTab,
  onSelectChapter,
  onOpenCodeExport,
  isTanpuraActive,
  onToggleTanpura,
  activePersona,
  onOpenVoiceSelector,
}) => {
  const isDailyPlaying = currentShloka?.id === dailyShloka.id && playbackState === 'playing';

  const handleDailyPlayToggle = () => {
    if (isDailyPlaying) {
      onPause();
    } else if (currentShloka?.id === dailyShloka.id && playbackState === 'paused') {
      onResume();
    } else {
      onPlay(dailyShloka);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-4">
      {/* Hero Banner with Krishna Arjuna Chariot Artwork */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-gradient-to-br from-amber-950/80 to-slate-950">
        <div className="relative h-44 sm:h-52 w-full">
          <img 
            src="/src/assets/images/gita_krishna_arjuna_1793092423078.jpg" 
            alt="Krishna imparting Gita to Arjuna on Chariot" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/70 to-transparent" />
          
          {/* Top Tag */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-[11px] font-semibold text-amber-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              श्लोक प्रभात · Daily Divine Verse
            </span>
          </div>

          {/* Quick React Native Code Info Button */}
          <button
            onClick={onOpenCodeExport}
            className="absolute top-3 right-3 text-[11px] font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 flex items-center gap-1.5 transition-colors"
            title="View React Native App Code"
          >
            <FileCode className="w-3 h-3 text-amber-400" />
            <span>RN Code</span>
          </button>
        </div>

        {/* Hero Content Overlap */}
        <div className="p-4 sm:p-5 -mt-6 relative z-10 space-y-3">
          <div className="flex items-center justify-between text-xs text-amber-400">
            <span className="font-semibold">Chapter {dailyShloka.chapter} · Verse {dailyShloka.verse}</span>
            <span className="font-devanagari text-slate-300">{dailyShloka.chapterNameSanskrit}</span>
          </div>

          {/* Shloka Sanskrit Line */}
          <p className="font-devanagari text-base sm:text-lg font-semibold text-amber-100 leading-relaxed">
            {dailyShloka.sanskritLines[0]}
          </p>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            "{dailyShloka.translationEn}"
          </p>

          {/* Actions */}
          <div className="pt-1 flex items-center justify-between gap-3">
            <button
              onClick={handleDailyPlayToggle}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isDailyPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Recitation</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>Listen Audio Chanting</span>
                </>
              )}
            </button>

            <button
              onClick={() => onOpenPlayer(dailyShloka)}
              className="p-2.5 rounded-xl bg-slate-900/90 text-amber-300 border border-slate-700/80 hover:border-amber-500/40 transition-colors"
              title="Open Full Screen Player"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Divine Krishna Soft Voice Banner & Audio Selector */}
      <div 
        onClick={onOpenVoiceSelector}
        className="p-3.5 bg-gradient-to-r from-[#171f30] to-[#0f1524] border border-amber-500/30 rounded-2xl flex items-center justify-between gap-3 cursor-pointer hover:border-amber-500/50 transition-all shadow-md group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform">
            <Feather className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-400">
                Audio Recitation Voice
              </span>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded-full font-semibold">
                Applied to All
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-100 truncate">
              {VOICE_PROFILES[activePersona].name} · <span className="font-devanagari font-normal text-amber-300">{VOICE_PROFILES[activePersona].hindiName}</span>
            </h4>
            <p className="text-[11px] text-slate-400 truncate">
              {VOICE_PROFILES[activePersona].subtitle} · Soft flute prelude &amp; tranquil pace
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenVoiceSelector();
          }}
          className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-sm hover:bg-amber-400 shrink-0 transition-colors"
        >
          Change Voice
        </button>
      </div>

      {/* Quick Spiritual Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => onNavigateTab('shlokas')}
          className="p-3 bg-[#0e1422] border border-slate-800 hover:border-amber-500/30 rounded-2xl text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 block group-hover:text-amber-300 transition-colors">
            All Shlokas
          </span>
          <span className="text-[10px] text-slate-400">
            Sanskrit &amp; Audio
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('guidance')}
          className="p-3 bg-[#0e1422] border border-slate-800 hover:border-amber-500/30 rounded-2xl text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 block group-hover:text-emerald-300 transition-colors">
            Life Guidance
          </span>
          <span className="text-[10px] text-slate-400">
            Anxiety &amp; Duty
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('japa')}
          className="p-3 bg-[#0e1422] border border-slate-800 hover:border-amber-500/30 rounded-2xl text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Flame className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 block group-hover:text-purple-300 transition-colors">
            108 Japa Mala
          </span>
          <span className="text-[10px] text-slate-400">
            Chanting counter
          </span>
        </button>

        <button
          onClick={onToggleTanpura}
          className="p-3 bg-[#0e1422] border border-slate-800 hover:border-amber-500/30 rounded-2xl text-left transition-all group"
        >
          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center mb-2 group-hover:scale-105 transition-transform ${
            isTanpuraActive 
              ? 'bg-amber-500 text-slate-950 border-amber-400' 
              : 'bg-slate-800/60 text-slate-400 border-slate-700'
          }`}>
            <Volume2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 block group-hover:text-amber-300 transition-colors">
            Tanpura Drone
          </span>
          <span className="text-[10px] text-slate-400">
            {isTanpuraActive ? 'Playing in Sa-Pa' : 'Tap to start drone'}
          </span>
        </button>
      </div>

      {/* Featured Chapters Row */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Chapters of Wisdom · अध्याय
          </span>
          <button
            onClick={() => onNavigateTab('chapters')}
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
          >
            <span>All 18 Cantos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {GITA_CHAPTERS.slice(1, 4).map((ch) => (
            <div
              key={ch.chapterNumber}
              onClick={() => onSelectChapter(ch.chapterNumber)}
              className="p-3 bg-[#0e1422] hover:bg-[#121929] border border-slate-800/80 rounded-2xl flex items-center justify-between cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 text-amber-400 text-xs font-bold flex items-center justify-center font-mono">
                  {ch.chapterNumber}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                    {ch.nameEn}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {ch.versesCount} Verses · {ch.keyTheme}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Temple Atmosphere Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 p-4 flex items-center gap-3.5 bg-gradient-to-r from-slate-900 to-[#101524]">
        <img 
          src="/src/assets/images/gita_temple_dusk_1793092423980.jpg" 
          alt="Temple Dusk" 
          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-amber-500/20"
          referrerPolicy="no-referrer"
        />
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-amber-400 uppercase font-semibold tracking-wider">
            Meditative Sanctuary
          </span>
          <h4 className="text-xs font-bold text-slate-100 truncate">
            Tanpura Drone &amp; Vedic Chanting
          </h4>
          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
            Turn on headphones for immersive harmonic meditation
          </p>
        </div>
      </div>
    </div>
  );
};
