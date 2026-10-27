/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { HomeScreen } from './components/HomeScreen';
import { ShlokasScreen } from './components/ShlokasScreen';
import { ChaptersScreen } from './components/ChaptersScreen';
import { JapaMalaScreen } from './components/JapaMalaScreen';
import { GuidanceScreen } from './components/GuidanceScreen';
import { BottomTabBar, TabType } from './components/BottomTabBar';
import { MiniPlayerBar } from './components/MiniPlayerBar';
import { AudioPlayerModal } from './components/AudioPlayerModal';
import { VoiceSelectorModal } from './components/VoiceSelectorModal';
import { ReactNativeExportModal } from './components/ReactNativeExportModal';
import { GITA_SHLOKAS, Shloka } from './data/gitaData';
import { 
  GitaAudioPlayer, PlaybackState, VoicePersona, VOICE_PROFILES, 
  RecitationLanguageMode 
} from './utils/audioEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentShloka, setCurrentShloka] = useState<Shloka>(() => GITA_SHLOKAS[0]); // BG 2.47
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [currentRepeatCount, setCurrentRepeatCount] = useState(1);
  const [repeatTimes, setRepeatTimes] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.9);
  const [includeTranslation, setIncludeTranslation] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isCodeExportModalOpen, setIsCodeExportModalOpen] = useState(false);
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<number | null>(null);

  // Audio Voice Persona (Default: Sri Krishna Soft Voice)
  const [activePersona, setActivePersona] = useState<VoicePersona>(() => {
    try {
      const saved = localStorage.getItem('gita_voice_persona') as VoicePersona;
      return saved && VOICE_PROFILES[saved] ? saved : 'krishna';
    } catch {
      return 'krishna';
    }
  });

  const [selectedVoiceUri, setSelectedVoiceUri] = useState<string | null>(() => {
    try {
      return localStorage.getItem('gita_voice_uri') || null;
    } catch {
      return null;
    }
  });

  // Recitation Mode (Auto Universal Phonetic vs Pure Devanagari)
  const [recitationMode, setRecitationMode] = useState<RecitationLanguageMode>(() => {
    try {
      return (localStorage.getItem('gita_recitation_mode') as RecitationLanguageMode) || 'sanskrit_auto';
    } catch {
      return 'sanskrit_auto';
    }
  });

  const handleSelectRecitationMode = (mode: RecitationLanguageMode) => {
    setRecitationMode(mode);
    if (playerRef.current) {
      playerRef.current.setRecitationMode(mode);
    }
  };

  const [rateMultiplier, setRateMultiplier] = useState(1.0);

  // Tanpura state
  const [isTanpuraActive, setIsTanpuraActive] = useState(false);
  const [tanpuraVolume, setTanpuraVolume] = useState(0.35);

  // Bookmarks in localStorage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gita_bookmarks');
      return saved ? JSON.parse(saved) : ['BG_2_47', 'BG_18_66'];
    } catch {
      return ['BG_2_47', 'BG_18_66'];
    }
  });

  const playerRef = useRef<GitaAudioPlayer | null>(null);

  // Initialize Player & Callbacks
  useEffect(() => {
    const player = new GitaAudioPlayer();
    player.setPersona(activePersona);
    player.setSpecificVoiceUri(selectedVoiceUri);
    player.setRecitationMode(recitationMode);
    player.setCallbacks({
      onStateChange: (state) => setPlaybackState(state),
      onLineChange: (lineIdx) => setActiveLineIndex(lineIdx),
      onRepeatCountChange: (count) => setCurrentRepeatCount(count),
      onComplete: () => {
        // Shloka finished
      }
    });
    playerRef.current = player;

    return () => {
      player.stop();
      GitaAudioPlayer.tanpura.stop();
    };
  }, []);

  const handlePlayShloka = (shloka: Shloka) => {
    setCurrentShloka(shloka);
    if (playerRef.current) {
      playerRef.current.setPersona(activePersona);
      playerRef.current.setSpecificVoiceUri(selectedVoiceUri);
      playerRef.current.setRecitationMode(recitationMode);
      playerRef.current.setRateMultiplier(rateMultiplier);
      playerRef.current.setRepeatTimes(repeatTimes);
      playerRef.current.setIncludeTranslation(includeTranslation);
      playerRef.current.playShloka(
        shloka.id,
        shloka.sanskritLines,
        shloka.transliterationLines,
        shloka.translationHi,
        shloka.translationEn
      );
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const handleResume = () => {
    if (playerRef.current) {
      playerRef.current.resume();
    }
  };

  const handleNextShloka = () => {
    const currentIndex = GITA_SHLOKAS.findIndex(s => s.id === currentShloka.id);
    const nextIndex = (currentIndex + 1) % GITA_SHLOKAS.length;
    const nextShloka = GITA_SHLOKAS[nextIndex];
    handlePlayShloka(nextShloka);
  };

  const handlePrevShloka = () => {
    const currentIndex = GITA_SHLOKAS.findIndex(s => s.id === currentShloka.id);
    const prevIndex = (currentIndex - 1 + GITA_SHLOKAS.length) % GITA_SHLOKAS.length;
    const prevShloka = GITA_SHLOKAS[prevIndex];
    handlePlayShloka(prevShloka);
  };

  const handleSetSpeed = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    if (playerRef.current) {
      playerRef.current.setRate(newSpeed);
    }
  };

  const handleSetRepeat = (times: number) => {
    setRepeatTimes(times);
    if (playerRef.current) {
      playerRef.current.setRepeatTimes(times);
    }
  };

  const handleToggleIncludeTranslation = (enabled: boolean) => {
    setIncludeTranslation(enabled);
    if (playerRef.current) {
      playerRef.current.setIncludeTranslation(enabled);
    }
  };

  const handleToggleTanpura = () => {
    if (isTanpuraActive) {
      GitaAudioPlayer.tanpura.stop();
      setIsTanpuraActive(false);
    } else {
      GitaAudioPlayer.tanpura.start();
      setIsTanpuraActive(true);
    }
  };

  const handleChangeTanpuraVolume = (vol: number) => {
    setTanpuraVolume(vol);
    GitaAudioPlayer.tanpura.setVolume(vol);
  };

  const handleSelectPersona = (persona: VoicePersona) => {
    setActivePersona(persona);
    if (playerRef.current) {
      playerRef.current.setPersona(persona);
    }
  };

  const handleSelectVoiceUri = (uri: string | null) => {
    setSelectedVoiceUri(uri);
    if (playerRef.current) {
      playerRef.current.setSpecificVoiceUri(uri);
    }
  };

  const handleSetRateMultiplier = (mult: number) => {
    setRateMultiplier(mult);
    if (playerRef.current) {
      playerRef.current.setRateMultiplier(mult);
    }
  };

  const handlePreviewVoice = (persona: VoicePersona) => {
    if (playerRef.current) {
      playerRef.current.previewVoice(persona);
    }
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('gita_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectChapterFromChapters = (chNum: number) => {
    setSelectedChapterFilter(chNum);
    setActiveTab('shlokas');
  };

  return (
    <MobileFrame 
      activeTabTitle={activeTab}
      activePersonaName={VOICE_PROFILES[activePersona].name}
      onOpenVoiceSelector={() => setIsVoiceModalOpen(true)}
    >
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Active Tab Screen */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTab === 'home' && (
            <HomeScreen
              dailyShloka={GITA_SHLOKAS[0]}
              currentShloka={currentShloka}
              playbackState={playbackState}
              onPlay={handlePlayShloka}
              onPause={handlePause}
              onResume={handleResume}
              onOpenPlayer={(s) => {
                setCurrentShloka(s);
                setIsPlayerModalOpen(true);
              }}
              onNavigateTab={(tab) => {
                if (tab === 'saved') {
                  setActiveTab('shlokas');
                } else {
                  setActiveTab(tab);
                }
              }}
              onSelectChapter={handleSelectChapterFromChapters}
              onOpenCodeExport={() => setIsCodeExportModalOpen(true)}
              isTanpuraActive={isTanpuraActive}
              onToggleTanpura={handleToggleTanpura}
              activePersona={activePersona}
              onOpenVoiceSelector={() => setIsVoiceModalOpen(true)}
            />
          )}

          {activeTab === 'shlokas' && (
            <ShlokasScreen
              currentShloka={currentShloka}
              playbackState={playbackState}
              activeLineIndex={activeLineIndex}
              onPlay={handlePlayShloka}
              onPause={handlePause}
              onResume={handleResume}
              onOpenPlayer={(s) => {
                setCurrentShloka(s);
                setIsPlayerModalOpen(true);
              }}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              selectedChapterFilter={selectedChapterFilter}
              onClearChapterFilter={() => setSelectedChapterFilter(null)}
              onSelectChapterFilter={setSelectedChapterFilter}
            />
          )}

          {activeTab === 'chapters' && (
            <ChaptersScreen
              onSelectChapter={handleSelectChapterFromChapters}
            />
          )}

          {activeTab === 'japa' && (
            <JapaMalaScreen
              currentShloka={currentShloka}
              onPlayCurrentShloka={() => handlePlayShloka(currentShloka)}
              isTanpuraActive={isTanpuraActive}
              onToggleTanpura={handleToggleTanpura}
            />
          )}

          {activeTab === 'guidance' && (
            <GuidanceScreen
              currentShloka={currentShloka}
              playbackState={playbackState}
              activeLineIndex={activeLineIndex}
              onPlay={handlePlayShloka}
              onPause={handlePause}
              onResume={handleResume}
              onOpenPlayer={(s) => {
                setCurrentShloka(s);
                setIsPlayerModalOpen(true);
              }}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
            />
          )}
        </div>

        {/* Sticky Mini Player Dock */}
        <MiniPlayerBar
          shloka={currentShloka}
          playbackState={playbackState}
          onPlayToggle={() => {
            if (playbackState === 'playing') handlePause();
            else if (playbackState === 'paused') handleResume();
            else handlePlayShloka(currentShloka);
          }}
          onExpand={() => setIsPlayerModalOpen(true)}
          isTanpuraActive={isTanpuraActive}
        />

        {/* Fixed Mobile Bottom Tab Bar */}
        <BottomTabBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* Full-Screen Audio Player Modal */}
        <AudioPlayerModal
          shloka={currentShloka}
          isOpen={isPlayerModalOpen}
          onClose={() => setIsPlayerModalOpen(false)}
          playbackState={playbackState}
          activeLineIndex={activeLineIndex}
          currentRepeatCount={currentRepeatCount}
          repeatTimes={repeatTimes}
          onPlay={handlePlayShloka}
          onPause={handlePause}
          onResume={handleResume}
          onNext={handleNextShloka}
          onPrev={handlePrevShloka}
          onSetRepeat={handleSetRepeat}
          playbackSpeed={playbackSpeed}
          onSetSpeed={handleSetSpeed}
          includeTranslation={includeTranslation}
          onToggleIncludeTranslation={handleToggleIncludeTranslation}
          isTanpuraActive={isTanpuraActive}
          onToggleTanpura={handleToggleTanpura}
          tanpuraVolume={tanpuraVolume}
          onChangeTanpuraVolume={handleChangeTanpuraVolume}
          activePersona={activePersona}
          onSelectPersona={handleSelectPersona}
          onOpenVoiceSelector={() => setIsVoiceModalOpen(true)}
        />

        {/* Voice Selector & Customizer Modal */}
        <VoiceSelectorModal
          isOpen={isVoiceModalOpen}
          onClose={() => setIsVoiceModalOpen(false)}
          activePersona={activePersona}
          onSelectPersona={handleSelectPersona}
          selectedVoiceUri={selectedVoiceUri}
          onSelectVoiceUri={handleSelectVoiceUri}
          rateMultiplier={rateMultiplier}
          onSetRateMultiplier={handleSetRateMultiplier}
          onPreviewVoice={handlePreviewVoice}
          recitationMode={recitationMode}
          onSelectRecitationMode={handleSelectRecitationMode}
        />

        {/* React Native Code Export Modal */}
        <ReactNativeExportModal
          isOpen={isCodeExportModalOpen}
          onClose={() => setIsCodeExportModalOpen(false)}
        />
      </div>
    </MobileFrame>
  );
}
