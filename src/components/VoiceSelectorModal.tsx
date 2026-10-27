import React, { useState, useEffect } from 'react';
import { 
  X, Check, Play, Volume2, Sparkles, Feather, Music2, 
  Settings2, ChevronRight, UserCheck, AlertCircle 
} from 'lucide-react';
import { 
  VoicePersona, VOICE_PROFILES, VoiceProfile, GitaAudioPlayer, 
  RecitationLanguageMode 
} from '../utils/audioEngine';

interface VoiceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePersona: VoicePersona;
  onSelectPersona: (persona: VoicePersona) => void;
  selectedVoiceUri: string | null;
  onSelectVoiceUri: (uri: string | null) => void;
  rateMultiplier: number;
  onSetRateMultiplier: (mult: number) => void;
  onPreviewVoice: (persona: VoicePersona) => void;
  recitationMode: RecitationLanguageMode;
  onSelectRecitationMode: (mode: RecitationLanguageMode) => void;
}

export const VoiceSelectorModal: React.FC<VoiceSelectorModalProps> = ({
  isOpen,
  onClose,
  activePersona,
  onSelectPersona,
  selectedVoiceUri,
  onSelectVoiceUri,
  rateMultiplier,
  onSetRateMultiplier,
  onPreviewVoice,
  recitationMode,
  onSelectRecitationMode,
}) => {
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const sorted = [...voices].sort((a, b) => {
          const aIsHindi = a.lang.startsWith('hi') || a.name.toLowerCase().includes('hindi');
          const bIsHindi = b.lang.startsWith('hi') || b.name.toLowerCase().includes('hindi');
          if (aIsHindi && !bIsHindi) return -1;
          if (!aIsHindi && bIsHindi) return 1;
          return a.name.localeCompare(b.name);
        });
        setAvailableVoices(sorted);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  if (!isOpen) return null;

  const handleAudition = (persona: VoicePersona, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingPreview(persona);
    setTestStatus('Speaking divine verse...');
    onPreviewVoice(persona);
    setTimeout(() => {
      setPlayingPreview(null);
      setTestStatus(null);
    }, 4500);
  };

  const handleTestNow = () => {
    setPlayingPreview(activePersona);
    setTestStatus('Playing Krishna flute + divine speech test...');
    onPreviewVoice(activePersona);
    setTimeout(() => {
      setPlayingPreview(null);
      setTestStatus(null);
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-lg bg-[#0e1422] border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between bg-[#111728]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <Feather className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
                <span>Select Chanting Voice</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono">
                  Applied to All
                </span>
              </h2>
              <p className="text-xs text-amber-400 font-devanagari">
                मृदु एवं शांत स्वर · Soft Krishna Voice
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Active Voice Banner with Immediate Test Sound Button */}
          <div className="p-3.5 bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Music2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-400 block">
                    Active Recitation Voice
                  </span>
                  <span className="text-xs font-bold text-slate-100">
                    {VOICE_PROFILES[activePersona].name} ({VOICE_PROFILES[activePersona].hindiName})
                  </span>
                </div>
              </div>

              {/* Instant Test Sound Button */}
              <button
                onClick={handleTestNow}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-amber-400 active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>{playingPreview ? 'Playing...' : 'Test Voice'}</span>
              </button>
            </div>

            {testStatus && (
              <div className="text-[11px] text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 animate-pulse">
                <Volume2 className="w-3.5 h-3.5 shrink-0" />
                <span>{testStatus}</span>
              </div>
            )}
          </div>

          {/* Pronunciation Engine Selector */}
          <div className="bg-[#0b101c] border border-slate-800/80 rounded-2xl p-3.5 space-y-2">
            <label className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
              Sanskrit Pronunciation Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectRecitationMode('sanskrit_auto')}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                  recitationMode === 'sanskrit_auto'
                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <span>Universal Phonetic</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 rounded">100% Reliable</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Works on all phones, PCs &amp; browsers worldwide
                </div>
              </button>

              <button
                onClick={() => onSelectRecitationMode('sanskrit_devanagari')}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                  recitationMode === 'sanskrit_devanagari'
                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="font-bold font-devanagari">
                  शुद्ध देवनागरी
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Requires Hindi speech pack installed
                </div>
              </button>
            </div>
          </div>

          {/* Voice Persona Options */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Choose Voice Persona
            </span>

            {(Object.keys(VOICE_PROFILES) as VoicePersona[]).map((key) => {
              const profile = VOICE_PROFILES[key];
              const isSelected = activePersona === key;
              const isKrishna = key === 'krishna';

              return (
                <div
                  key={key}
                  onClick={() => onSelectPersona(key)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-[#151f33] border-amber-500/60 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/40'
                      : 'bg-[#0b101c] border-slate-800/80 hover:border-slate-700/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Radio Circle */}
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                        isSelected 
                          ? 'border-amber-400 bg-amber-500 text-slate-950' 
                          : 'border-slate-600 bg-slate-900'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-100">
                            {profile.name}
                          </h3>
                          <span className="font-devanagari text-xs text-amber-300">
                            {profile.hindiName}
                          </span>
                          {isKrishna && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.2 rounded-full font-semibold">
                              Recommended (Lord Krishna)
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {profile.description}
                        </p>

                        <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                          <span>Pitch: {profile.pitch}x</span>
                          <span aria-hidden="true">·</span>
                          <span>Soft Pace: {profile.rate}x</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-400/80">{profile.subtitle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Audition Button */}
                    <button
                      onClick={(e) => handleAudition(key, e)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 border border-slate-700/60 text-slate-300 text-[11px] font-medium flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
                      title="Audition voice sample"
                    >
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                      <span>{playingPreview === key ? 'Playing...' : 'Audition'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fine-Tuning Pace Slider */}
          <div className="bg-[#0b101c] border border-slate-800/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-200 flex items-center gap-1.5">
                <Settings2 className="w-3.5 h-3.5 text-amber-400" />
                Soft Recitation Speed (धीमी एवं शांत गति)
              </span>
              <span className="font-mono text-amber-300 text-[11px]">
                {Math.round(rateMultiplier * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.25"
              step="0.05"
              value={rateMultiplier}
              onChange={(e) => onSetRateMultiplier(parseFloat(e.target.value))}
              className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>Very Soft &amp; Slow (0.75x)</span>
              <span>Gentle Krishna Pace (1.0x)</span>
              <span>Fluent (1.25x)</span>
            </div>
          </div>

          {/* System TTS Voice Override (Optional) */}
          {availableVoices.length > 0 && (
            <div className="bg-[#0b101c] border border-slate-800/80 rounded-2xl p-3.5 space-y-2">
              <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                <span>System Voice Engine (Optional)</span>
                <span className="text-[10px] text-slate-400">
                  {selectedVoiceUri ? 'Custom Voice' : 'Auto-Optimized'}
                </span>
              </label>
              <select
                value={selectedVoiceUri || ''}
                onChange={(e) => onSelectVoiceUri(e.target.value || null)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
              >
                <option value="">Auto-Select Best Voice for Krishna Persona (Recommended)</option>
                {availableVoices.map((voice) => (
                  <option key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name} ({voice.lang}) {voice.default ? '★ Default' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#111728] border-t border-slate-800 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Krishna voice is active for all shlokas &amp; translations.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-98 transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
