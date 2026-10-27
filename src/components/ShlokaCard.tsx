import React, { useState } from 'react';
import { 
  Play, Pause, Bookmark, BookmarkCheck, Copy, Check, 
  ChevronDown, ChevronUp, Share2, Sparkles, Volume2 
} from 'lucide-react';
import { Shloka } from '../data/gitaData';
import { PlaybackState } from '../utils/audioEngine';

interface ShlokaCardProps {
  shloka: Shloka;
  isCurrentPlaying: boolean;
  playbackState: PlaybackState;
  activeLineIndex: number;
  onPlay: (shloka: Shloka) => void;
  onPause: () => void;
  onResume: () => void;
  onOpenPlayer: (shloka: Shloka) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  fontSizePreference?: 'normal' | 'large';
}

export const ShlokaCard: React.FC<ShlokaCardProps> = ({
  shloka,
  isCurrentPlaying,
  playbackState,
  activeLineIndex,
  onPlay,
  onPause,
  onResume,
  onOpenPlayer,
  isBookmarked,
  onToggleBookmark,
  fontSizePreference = 'normal'
}) => {
  const [showWordMeanings, setShowWordMeanings] = useState(false);
  const [showPurport, setShowPurport] = useState(false);
  const [translationTab, setTranslationTab] = useState<'hi' | 'en'>('en');
  const [copied, setCopied] = useState(false);

  const isPlaying = isCurrentPlaying && playbackState === 'playing';

  const handleAudioAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      onPause();
    } else if (isCurrentPlaying && playbackState === 'paused') {
      onResume();
    } else {
      onPlay(shloka);
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${shloka.sanskrit}\n\n${shloka.transliteration}\n\nEnglish: ${shloka.translationEn}\n\nHindi: ${shloka.translationHi}\n\n— Bhagavad Gita (Ch ${shloka.chapter}, V ${shloka.verse})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article 
      className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
        isCurrentPlaying 
          ? 'bg-[#121929] border-amber-500/50 shadow-xl shadow-amber-950/20 ring-1 ring-amber-500/30' 
          : 'bg-[#0e1422] border-slate-800/80 hover:border-slate-700/80 shadow-md'
      }`}
    >
      {/* Card Header Strip */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-800/60 bg-slate-900/40">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-amber-400">
            Chapter {shloka.chapter} · Verse {shloka.verse}
          </span>
          <span className="text-slate-500 text-xs hidden xs:inline">·</span>
          <span className="text-xs text-slate-400 font-devanagari hidden xs:inline">
            {shloka.chapterNameSanskrit}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
            title="Copy Shloka text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(shloka.id);
            }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isBookmarked 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                : 'bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Save Shloka"}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-400/20" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Sanskrit Text Main Area */}
      <div className="p-4 sm:p-5 space-y-3.5">
        <div className="space-y-1.5">
          {shloka.sanskritLines.map((line, idx) => {
            const isLineActive = isPlaying && activeLineIndex === idx;
            return (
              <p
                key={idx}
                className={`font-devanagari font-medium leading-relaxed transition-colors duration-200 ${
                  fontSizePreference === 'large' ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                } ${
                  isLineActive 
                    ? 'text-amber-300 font-semibold drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
                    : 'text-amber-100'
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>

        {/* Roman Transliteration */}
        <p className="text-xs sm:text-sm text-slate-400 italic leading-relaxed">
          {shloka.transliteration}
        </p>

        {/* Audio Quick Bar & Translation Tabs */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/60">
          {/* Audio Chanting Button */}
          <button
            onClick={handleAudioAction}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Playing Audio</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>Listen Shloka</span>
              </>
            )}
          </button>

          {/* Translation Language Tab Switches */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-0.5 rounded-lg">
            <button
              onClick={() => setTranslationTab('en')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                translationTab === 'en'
                  ? 'bg-slate-800 text-amber-200'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setTranslationTab('hi')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md font-devanagari transition-colors ${
                translationTab === 'hi'
                  ? 'bg-slate-800 text-amber-200'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {/* Translation Content */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 text-xs sm:text-sm leading-relaxed">
          {translationTab === 'en' ? (
            <p className="text-slate-200 font-light">
              {shloka.translationEn}
            </p>
          ) : (
            <p className="text-slate-200 font-devanagari font-normal leading-relaxed">
              {shloka.translationHi}
            </p>
          )}
        </div>

        {/* Expandable Sections (Word Meanings & Purport) */}
        <div className="space-y-2 pt-1">
          {/* Word-by-Word Meaning Toggle */}
          <button
            onClick={() => setShowWordMeanings(!showWordMeanings)}
            className="w-full flex items-center justify-between text-xs text-amber-400/90 hover:text-amber-300 font-medium py-1 px-1 transition-colors"
          >
            <span>Word-by-word Sanskrit meaning (पदच्छेद)</span>
            {showWordMeanings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showWordMeanings && (
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {shloka.wordMeanings.map((wm, i) => (
                  <div key={i} className="flex items-baseline gap-2 pb-1 border-b border-slate-800/60 last:border-none">
                    <span className="font-semibold text-amber-300">{wm.word}:</span>
                    <span className="text-slate-300">{wm.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spiritual Purport Toggle */}
          <button
            onClick={() => setShowPurport(!showPurport)}
            className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 font-medium py-1 px-1 transition-colors"
          >
            <span>Spiritual insight &amp; life application</span>
            {showPurport ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showPurport && (
            <div className="p-3.5 bg-amber-950/20 border border-amber-900/30 rounded-xl text-xs text-slate-300 leading-relaxed space-y-2">
              <p>{shloka.purport}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-400/80 pt-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Theme: {shloka.moodTag}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </article>
  );
};
