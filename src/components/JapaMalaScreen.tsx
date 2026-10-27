import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, Sparkles, CheckCircle2, Award, Flame } from 'lucide-react';
import { GitaAudioPlayer } from '../utils/audioEngine';
import { Shloka } from '../data/gitaData';

interface JapaMalaScreenProps {
  currentShloka: Shloka | null;
  onPlayCurrentShloka: () => void;
  isTanpuraActive: boolean;
  onToggleTanpura: () => void;
}

const MANTRAS = [
  {
    id: 'maha-mantra',
    name: 'Hare Krishna Maha Mantra',
    sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥',
    meaning: 'The Great Chanting for Deliverance of Consciousness'
  },
  {
    id: 'vasudeva',
    name: 'Om Namo Bhagavate Vasudevaya',
    sanskrit: 'ॐ नमो भगवते वासुदेवाय॥',
    meaning: 'Salutations to the Supreme Lord Sri Krishna'
  },
  {
    id: 'karmanye',
    name: 'Gita Karmanye Shloka (2.47)',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    meaning: 'Focus fully on action, never attach to outcomes'
  },
  {
    id: 'gayatri',
    name: 'Gayatri Mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    meaning: 'May the Supreme Light illuminate our intellect'
  }
];

export const JapaMalaScreen: React.FC<JapaMalaScreenProps> = ({
  currentShloka,
  isTanpuraActive,
  onToggleTanpura
}) => {
  const [beadCount, setBeadCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('gita_japa_bead') || '0', 10);
  });
  const [roundsCompleted, setRoundsCompleted] = useState<number>(() => {
    return parseInt(localStorage.getItem('gita_japa_rounds') || '0', 10);
  });
  const [selectedMantraIndex, setSelectedMantraIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    localStorage.setItem('gita_japa_bead', beadCount.toString());
  }, [beadCount]);

  useEffect(() => {
    localStorage.setItem('gita_japa_rounds', roundsCompleted.toString());
  }, [roundsCompleted]);

  const handleBeadClick = () => {
    // Play bead audio click
    GitaAudioPlayer.bell.playJapaBeadClick();

    // Haptic vibration if supported on mobile
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // ignore
      }
    }

    if (beadCount + 1 >= 108) {
      // Completed 1 round of 108
      setBeadCount(0);
      const newRounds = roundsCompleted + 1;
      setRoundsCompleted(newRounds);
      setShowCelebration(true);
      GitaAudioPlayer.bell.playBell();
      setTimeout(() => setShowCelebration(false), 3000);
    } else {
      setBeadCount(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setBeadCount(0);
  };

  const currentMantra = MANTRAS[selectedMantraIndex];
  const progressPercent = Math.round((beadCount / 108) * 100);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
            Japa Sadhana · जप माला
          </span>
          <h2 className="text-base font-bold text-slate-100">
            108 Sacred Beads Counter
          </h2>
        </div>

        {/* Tanpura toggle */}
        <button
          onClick={onToggleTanpura}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            isTanpuraActive 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
              : 'bg-slate-900 text-slate-400 border-slate-800'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Tanpura {isTanpuraActive ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Mantra Selector */}
      <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-3 space-y-2">
        <label className="text-xs text-slate-400 block font-medium">
          Select Chanting Mantra
        </label>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {MANTRAS.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setSelectedMantraIndex(idx)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors border ${
                selectedMantraIndex === idx
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Active Mantra Box */}
        <div className="p-3 bg-slate-950/70 rounded-xl border border-amber-500/15 text-center">
          <p className="font-devanagari text-base sm:text-lg text-amber-200 font-medium leading-relaxed">
            {currentMantra.sanskrit}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 italic">
            {currentMantra.meaning}
          </p>
        </div>
      </div>

      {/* Main Circular Counter Button */}
      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          
          {/* Circular SVG Ring of 108 Beads */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background track circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#1e293b"
              strokeWidth="4"
            />
            {/* Active progress stroke */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * beadCount) / 108}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          {/* Central Interactive Touch Bead */}
          <button
            onClick={handleBeadClick}
            className="absolute inset-8 rounded-full bg-gradient-to-b from-[#162035] to-[#0c121e] border-2 border-amber-500/40 shadow-2xl flex flex-col items-center justify-center hover:scale-102 active:scale-95 transition-transform group cursor-pointer"
          >
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold mb-1">
              Tap for Next Bead
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-amber-100 font-mono tabular-nums group-hover:text-amber-300">
              {beadCount}
            </div>
            <span className="text-xs text-slate-400 mt-1">
              of 108 Beads
            </span>
            <span className="text-[10px] text-amber-400/80 font-mono mt-0.5">
              ({progressPercent}%)
            </span>
          </button>
        </div>

        {/* Celebration Banner when 108 reached */}
        {showCelebration && (
          <div className="mt-2 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-full text-xs flex items-center gap-2 shadow-lg animate-bounce">
            <Award className="w-4 h-4" />
            <span>Maha Mala Complete! 108 Chants Offered.</span>
          </div>
        )}
      </div>

      {/* Rounds & Reset Controls */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-3 text-center">
          <span className="text-[11px] text-slate-400 font-medium block">
            Completed Rounds (माला)
          </span>
          <span className="text-xl font-bold text-amber-300 font-mono">
            {roundsCompleted} <span className="text-xs text-slate-400">({roundsCompleted * 108} total)</span>
          </span>
        </div>

        <button
          onClick={handleReset}
          className="bg-[#0e1422] border border-slate-800 hover:border-slate-700 rounded-2xl p-3 flex flex-col items-center justify-center transition-colors group"
        >
          <RotateCcw className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
          <span className="text-[11px] text-slate-400 group-hover:text-slate-200 mt-1 font-medium">
            Reset Bead Count
          </span>
        </button>
      </div>
    </div>
  );
};
