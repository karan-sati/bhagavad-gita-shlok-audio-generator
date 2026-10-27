import React, { useState } from 'react';
import { 
  X, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  RotateCcw, Bell, Sparkles, Sliders, ChevronDown, Feather, Music2 
} from 'lucide-react';
import { Shloka } from '../data/gitaData';
import { 
  GitaAudioPlayer, PlaybackState, VoicePersona, VOICE_PROFILES 
} from '../utils/audioEngine';

interface AudioPlayerModalProps {
  shloka: Shloka;
  isOpen: boolean;
  onClose: () => void;
  playbackState: PlaybackState;
  activeLineIndex: number;
  currentRepeatCount: number;
  repeatTimes: number;
  onPlay: (shloka: Shloka) => void;
  onPause: () => void;
  onResume: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSetRepeat: (times: number) => void;
  playbackSpeed: number;
  onSetSpeed: (speed: number) => void;
  includeTranslation: boolean;
  onToggleIncludeTranslation: (enabled: boolean) => void;
  isTanpuraActive: boolean;
  onToggleTanpura: () => void;
  tanpuraVolume: number;
  onChangeTanpuraVolume: (vol: number) => void;
  activePersona: VoicePersona;
  onSelectPersona: (persona: VoicePersona) => void;
  onOpenVoiceSelector: () => void;
}

export const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({
  shloka,
  isOpen,
  onClose,
  playbackState,
  activeLineIndex,
  currentRepeatCount,
  repeatTimes,
  onPlay,
  onPause,
  onResume,
  onNext,
  onPrev,
  onSetRepeat,
  playbackSpeed,
  onSetSpeed,
  includeTranslation,
  onToggleIncludeTranslation,
  isTanpuraActive,
  onToggleTanpura,
  tanpuraVolume,
  onChangeTanpuraVolume,
  activePersona,
  onSelectPersona,
  onOpenVoiceSelector,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  if (!isOpen) return null;

  const isPlaying = playbackState === 'playing';

  const handlePlayToggle = () => {
    if (isPlaying) {
      onPause();
    } else if (playbackState === 'paused') {
      onResume();
    } else {
      onPlay(shloka);
    }
  };

  const handleRingBell = () => {
    GitaAudioPlayer.bell.playBell();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4">
      {/* Container */}
      <div className="relative w-full sm:max-w-md h-[92vh] sm:h-[720px] bg-gradient-to-b from-[#111625] via-[#0d111d] to-[#070913] rounded-t-3xl sm:rounded-3xl border border-amber-900/40 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Background Artwork Backdrop with Gradient Scrim */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <img 
            src="/src/assets/images/gita_krishna_arjuna_1793092423078.jpg" 
            alt="Krishna Arjuna" 
            className="w-full h-full object-cover filter blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e17]/80 via-[#0b0e17]/90 to-[#070913]" />
        </div>

        {/* Header Bar */}
        <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-amber-500/10">
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="Minimize"
          >
            <ChevronDown className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="text-[11px] font-medium tracking-wider uppercase text-amber-400/90 block">
              Chapter {shloka.chapter} · Verse {shloka.verse}
            </span>
            <h2 className="text-sm font-semibold text-slate-200">
              {shloka.chapterName}
            </h2>
          </div>

          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
              showSettings 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-900/80 text-slate-300 border-slate-700/60 hover:text-white'
            }`}
            title="Chanting Settings"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 overflow-y-auto px-6 py-4 flex flex-col items-center justify-between space-y-4">
          
          {/* Sanskrit Artwork Mini Emblem */}
          <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-amber-600/40 via-amber-400/20 to-amber-700/40 shadow-xl shadow-amber-950/40 flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img 
                src="/src/assets/images/gita_sacred_flute_1793092423443.jpg" 
                alt="Sacred Flute" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-amber-950/20 backdrop-blur-[0.5px]" />
            </div>

            {/* Active Chanting Pulsing Rings */}
            {isPlaying && (
              <div className="absolute inset-0 rounded-full border border-amber-400/50 animate-ping opacity-40 pointer-events-none" />
            )}
          </div>

          {/* Voice Indicator Badge */}
          <div className="w-full flex items-center justify-center">
            <button
              onClick={onOpenVoiceSelector}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs transition-colors group"
              title="Click to change Chanting Voice"
            >
              <Feather className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Voice:</span>
              <span className="font-semibold text-amber-200">
                {VOICE_PROFILES[activePersona].name}
              </span>
              <span className="text-[10px] text-amber-400 font-devanagari">
                ({VOICE_PROFILES[activePersona].hindiName})
              </span>
            </button>
          </div>

          {/* Sanskrit Verse with Synchronized Glow */}
          <div className="w-full bg-slate-900/70 border border-amber-500/20 rounded-2xl p-4 text-center backdrop-blur-md shadow-inner">
            <div className="space-y-2">
              {shloka.sanskritLines.map((line, idx) => {
                const isCurrentLine = isPlaying && activeLineIndex === idx;
                return (
                  <p 
                    key={idx}
                    className={`font-devanagari text-lg sm:text-xl font-medium leading-relaxed transition-all duration-300 ${
                      isCurrentLine 
                        ? 'text-amber-300 scale-[1.02] drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]' 
                        : 'text-amber-100/90'
                    }`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Transliteration */}
            <div className="mt-3 pt-3 border-t border-slate-800/80">
              <p className="text-xs text-amber-200/60 italic leading-relaxed">
                {shloka.transliteration}
              </p>
            </div>
          </div>

          {/* Meaning / Translation Preview */}
          <div className="w-full text-center px-2">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              "{shloka.translationEn}"
            </p>
            <p className="text-xs text-slate-400 font-devanagari mt-1.5 line-clamp-2">
              {shloka.translationHi}
            </p>
          </div>

          {/* Visual Waveform Equalizer */}
          <div className="flex items-center justify-center gap-1.5 h-7">
            {isPlaying ? (
              <>
                <span className="w-1 bg-amber-400 rounded-full animate-wave-1" />
                <span className="w-1 bg-amber-400 rounded-full animate-wave-2" />
                <span className="w-1 bg-amber-400 rounded-full animate-wave-3" />
                <span className="w-1 bg-amber-400 rounded-full animate-wave-4" />
                <span className="w-1 bg-amber-400 rounded-full animate-wave-5" />
                <span className="w-1 bg-amber-400 rounded-full animate-wave-2" />
                <span className="w-1 bg-amber-400 rounded-full animate-wave-4" />
              </>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1.5 bg-slate-600 rounded-full" />
                <span className="w-1 h-1.5 bg-slate-600 rounded-full" />
                <span className="w-1 h-1.5 bg-slate-600 rounded-full" />
                <span className="w-1 h-1.5 bg-slate-600 rounded-full" />
                <span className="w-1 h-1.5 bg-slate-600 rounded-full" />
              </div>
            )}
          </div>

          {/* Repeat Counter Info */}
          {repeatTimes > 1 && (
            <div className="text-[11px] font-medium text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-full flex items-center gap-1.5">
              <RotateCcw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Chanting Cycle: {currentRepeatCount} of {repeatTimes}</span>
            </div>
          )}

        </div>

        {/* Audio Controls Footer */}
        <div className="relative z-10 p-5 bg-[#090d16]/95 border-t border-slate-800/80">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {/* Bell Chime Trigger */}
            <button
              onClick={handleRingBell}
              className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 border border-amber-900/30 flex items-center justify-center hover:bg-slate-800 transition-colors"
              title="Sacred Temple Bell"
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* Previous Shloka */}
            <button
              onClick={onPrev}
              className="w-11 h-11 rounded-full bg-slate-800/80 text-slate-200 hover:text-white flex items-center justify-center transition-colors"
              title="Previous Shloka"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Primary Chanting Play/Pause */}
            <button
              onClick={handlePlayToggle}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              title={isPlaying ? "Pause Recitation" : "Recite Shloka"}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-slate-950" />
              ) : (
                <Play className="w-7 h-7 fill-slate-950 ml-0.5" />
              )}
            </button>

            {/* Next Shloka */}
            <button
              onClick={onNext}
              className="w-11 h-11 rounded-full bg-slate-800/80 text-slate-200 hover:text-white flex items-center justify-center transition-colors"
              title="Next Shloka"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Tanpura Drone Quick Toggle */}
            <button
              onClick={onToggleTanpura}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                isTanpuraActive 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title={isTanpuraActive ? "Tanpura Drone Playing" : "Start Tanpura Drone"}
            >
              <span className="text-[10px] font-bold">तं</span>
            </button>
          </div>
        </div>

        {/* Drawer Settings Panel (Overlay) */}
        {showSettings && (
          <div className="absolute inset-x-0 bottom-0 z-20 bg-slate-900/98 border-t border-amber-500/30 rounded-t-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Chanting &amp; Audio Preferences
              </h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-200 text-xs"
              >
                Done
              </button>
            </div>

            {/* Chanting Voice Persona Selector */}
            <div className="space-y-1.5 pb-2 border-b border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-amber-400" />
                  Chanting Voice (स्वर)
                </span>
                <button
                  onClick={() => {
                    setShowSettings(false);
                    onOpenVoiceSelector();
                  }}
                  className="text-[11px] text-amber-400 hover:text-amber-300 underline"
                >
                  More Options
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {(Object.keys(VOICE_PROFILES) as VoicePersona[]).map((key) => {
                  const p = VOICE_PROFILES[key];
                  const isSel = activePersona === key;
                  return (
                    <button
                      key={key}
                      onClick={() => onSelectPersona(key)}
                      className={`p-2 rounded-xl text-left border transition-all text-xs ${
                        isSel 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm' 
                          : 'bg-slate-800/80 text-slate-300 border-transparent hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold truncate">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-devanagari">{p.hindiName}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tanpura Drone Control */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  Tanpura Drone (तानपूरा)
                </span>
                <button
                  onClick={onToggleTanpura}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    isTanpuraActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isTanpuraActive ? 'Active' : 'Off'}
                </button>
              </div>
              {isTanpuraActive && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-slate-400">Vol</span>
                  <input
                    type="range"
                    min="0.05"
                    max="1"
                    step="0.05"
                    value={tanpuraVolume}
                    onChange={(e) => onChangeTanpuraVolume(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">
                    {Math.round(tanpuraVolume * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Recitation Pace */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-200 font-medium block">
                Recitation Pace (गति)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[0.75, 1.0, 1.25].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => onSetSpeed(speed)}
                    className={`py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                      playbackSpeed === speed
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800 text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    {speed === 0.75 ? '0.75x Slow' : speed === 1.0 ? '1.0x Normal' : '1.25x Fast'}
                  </button>
                ))}
              </div>
            </div>

            {/* Japa / Repeat Count */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-200 font-medium block">
                Repeat / Japa Count (आवृत्ति)
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 11, 108].map((times) => (
                  <button
                    key={times}
                    onClick={() => onSetRepeat(times)}
                    className={`py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                      repeatTimes === times
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800 text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    {times}x {times === 108 ? 'Mala' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Spoken Translation Switch */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-xs text-slate-200 font-medium block">
                  Speak Hindi Translation
                </span>
                <span className="text-[10px] text-slate-400">
                  Speaks Hindi meaning after chanting Sanskrit
                </span>
              </div>
              <button
                onClick={() => onToggleIncludeTranslation(!includeTranslation)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  includeTranslation ? 'bg-amber-500' : 'bg-slate-800'
                }`}
              >
                <div 
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    includeTranslation ? 'translate-x-5' : 'translate-x-0'
                  }`} 
                />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
