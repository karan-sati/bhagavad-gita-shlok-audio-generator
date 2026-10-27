import React, { useState } from 'react';
import { Search, Filter, Bookmark, Sparkles, Volume2, Type } from 'lucide-react';
import { Shloka, GITA_SHLOKAS, GITA_CHAPTERS } from '../data/gitaData';
import { ShlokaCard } from './ShlokaCard';
import { PlaybackState } from '../utils/audioEngine';

interface ShlokasScreenProps {
  currentShloka: Shloka | null;
  playbackState: PlaybackState;
  activeLineIndex: number;
  onPlay: (shloka: Shloka) => void;
  onPause: () => void;
  onResume: () => void;
  onOpenPlayer: (shloka: Shloka) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  selectedChapterFilter: number | null;
  onClearChapterFilter: () => void;
  onSelectChapterFilter: (chapterNum: number | null) => void;
}

export const ShlokasScreen: React.FC<ShlokasScreenProps> = ({
  currentShloka,
  playbackState,
  activeLineIndex,
  onPlay,
  onPause,
  onResume,
  onOpenPlayer,
  bookmarks,
  onToggleBookmark,
  selectedChapterFilter,
  onClearChapterFilter,
  onSelectChapterFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const filteredShlokas = GITA_SHLOKAS.filter((s) => {
    // Chapter filter
    if (selectedChapterFilter !== null && s.chapter !== selectedChapterFilter) {
      return false;
    }
    // Bookmarks filter
    if (onlyBookmarks && !bookmarks.includes(s.id)) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSanskrit = s.sanskrit.includes(searchQuery);
      const matchTranslit = s.transliteration.toLowerCase().includes(q);
      const matchEn = s.translationEn.toLowerCase().includes(q);
      const matchHi = s.translationHi.includes(searchQuery);
      const matchChapter = `chapter ${s.chapter}`.includes(q) || `verse ${s.verse}`.includes(q);
      const matchTheme = s.moodTag.toLowerCase().includes(q);
      return matchSanskrit || matchTranslit || matchEn || matchHi || matchChapter || matchTheme;
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-4 space-y-4">
      {/* Top Header & Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              Vedic Verses · गीता श्लोकावली
            </span>
            <h2 className="text-base font-bold text-slate-100">
              Sacred Shlokas &amp; Audio Recitation
            </h2>
          </div>

          {/* Font Size Toggle */}
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-medium transition-colors ${
              fontSize === 'large'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle Sanskrit Font Size"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono">{fontSize === 'large' ? 'Large' : 'Normal'}</span>
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Sanskrit, English, keyword (e.g. duty, karma, peace)..."
            className="w-full bg-[#0e1422] border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {/* All Chapters */}
          <button
            onClick={() => onSelectChapterFilter(null)}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap shrink-0 transition-colors border ${
              selectedChapterFilter === null && !onlyBookmarks
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                : 'bg-[#0e1422] text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            All Verses
          </button>

          {/* Bookmarks toggle */}
          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors border ${
              onlyBookmarks
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-[#0e1422] text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({bookmarks.length})</span>
          </button>

          {/* Chapter Quick Filters */}
          {[2, 3, 4, 6, 9, 12, 18].map((chNum) => (
            <button
              key={chNum}
              onClick={() => {
                setOnlyBookmarks(false);
                onSelectChapterFilter(selectedChapterFilter === chNum ? null : chNum);
              }}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap shrink-0 transition-colors border ${
                selectedChapterFilter === chNum
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-[#0e1422] text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Ch. {chNum}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Notice */}
      {selectedChapterFilter !== null && (
        <div className="flex items-center justify-between px-3 py-2 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs text-amber-300">
          <span>Filtering Chapter {selectedChapterFilter}</span>
          <button 
            onClick={onClearChapterFilter}
            className="text-[11px] underline text-slate-400 hover:text-slate-200"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Shloka Cards List */}
      <div className="space-y-4 pb-12">
        {filteredShlokas.map((shloka) => (
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
            fontSizePreference={fontSize}
          />
        ))}

        {filteredShlokas.length === 0 && (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <Sparkles className="w-8 h-8 mx-auto text-amber-400 opacity-50" />
            <p className="text-sm font-medium text-slate-300">No shlokas found</p>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or removing the active chapter filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
