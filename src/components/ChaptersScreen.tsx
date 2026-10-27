import React, { useState } from 'react';
import { Search, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { GITA_CHAPTERS, ChapterInfo } from '../data/gitaData';

interface ChaptersScreenProps {
  onSelectChapter: (chapterNumber: number) => void;
}

export const ChaptersScreen: React.FC<ChaptersScreenProps> = ({ onSelectChapter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChapters = GITA_CHAPTERS.filter(ch => 
    ch.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.nameSanskrit.includes(searchQuery) ||
    ch.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.chapterNumber.toString() === searchQuery.trim()
  );

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-4 space-y-4">
      {/* Header */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
          The 18 Divine Cantos · अष्टादश अध्यायाः
        </span>
        <h2 className="text-base font-bold text-slate-100">
          Chapters of Bhagavad Gita
        </h2>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search chapter by name or number (1-18)..."
          className="w-full bg-[#0e1422] border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
        />
      </div>

      {/* Chapters List */}
      <div className="space-y-3 pb-8">
        {filteredChapters.map((chapter) => (
          <div
            key={chapter.chapterNumber}
            onClick={() => onSelectChapter(chapter.chapterNumber)}
            className="p-4 bg-[#0e1422] hover:bg-[#121929] border border-slate-800 hover:border-amber-500/30 rounded-2xl cursor-pointer transition-all duration-200 group flex items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3.5 min-w-0">
              {/* Chapter Badge */}
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-sm font-mono group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-colors">
                {chapter.chapterNumber}
              </div>

              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-semibold text-slate-100 group-hover:text-amber-300 transition-colors truncate">
                    {chapter.nameEn}
                  </h3>
                  <span className="font-devanagari text-xs text-amber-400/80 shrink-0">
                    {chapter.nameSanskrit}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                  {chapter.meaning}
                </p>

                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                  <span>{chapter.versesCount} Verses</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400/80 truncate">{chapter.keyTheme}</span>
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        ))}

        {filteredChapters.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs">No chapter found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
