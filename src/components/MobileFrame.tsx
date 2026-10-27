import React, { useState } from 'react';
import { Smartphone, Monitor, Volume2, Sparkles, BookOpen } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  activeTabTitle: string;
  activePersonaName?: string;
  onOpenVoiceSelector?: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ 
  children, 
  activeTabTitle,
  activePersonaName = 'Sri Krishna Soft Voice',
  onOpenVoiceSelector
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [currentTime] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  });

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col items-center">
      {/* Top Universal Control Strip */}
      <header className="w-full max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between border-b border-slate-800/80 bg-[#070a10]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <span className="font-devanagari text-lg leading-none">ॐ</span>
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-semibold tracking-tight text-amber-100 flex items-center gap-1.5">
              <span>श्रीमद्भगवद्गीता</span>
              <span className="text-slate-400 font-normal hidden sm:inline">· Bhagavad Gita Audio</span>
            </h1>
            <p className="text-[10px] text-slate-400 leading-tight">
              Sanskrit Shloka Recitation &amp; Meditative Tanpura
            </p>
          </div>
        </div>

        {/* Right Action Controls: Voice Selector & Mode Switcher */}
        <div className="flex items-center gap-2">
          {/* Quick Voice Selector Button */}
          {onOpenVoiceSelector && (
            <button
              onClick={onOpenVoiceSelector}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 rounded-xl text-amber-300 text-xs font-medium transition-all shadow-sm group"
              title="Change Chanting Audio Voice"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
              <span className="hidden xs:inline">Voice:</span>
              <span className="font-semibold text-amber-200 truncate max-w-[110px] sm:max-w-none">
                {activePersonaName}
              </span>
            </button>
          )}

          {/* Viewport Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="React Native Smartphone Simulation"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Expanded Desktop Responsive View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex items-center justify-center py-2 sm:py-6 px-0 sm:px-4">
        {deviceMode === 'mobile' ? (
          /* Phone Shell */
          <div className="relative w-full sm:max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[90vh] bg-slate-950 sm:rounded-[44px] shadow-2xl sm:shadow-amber-950/20 sm:border-[8px] sm:border-slate-800/90 flex flex-col overflow-hidden sm:ring-1 sm:ring-slate-700/50">
            {/* Phone Hardware Notch / Dynamic Island */}
            <div className="hidden sm:flex items-center justify-between px-7 pt-3 pb-1 z-30 select-none bg-slate-950">
              <span className="text-xs font-semibold text-slate-300">{currentTime}</span>
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5 border border-slate-800/60">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/70" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="text-[10px] text-amber-400 font-bold">5G</span>
                <div className="w-4 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-200 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Mobile Viewport Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {children}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="hidden sm:flex justify-center pb-2 pt-1 bg-slate-950 select-none">
              <div className="w-32 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        ) : (
          /* Full Desktop / Wide Canvas Layout */
          <div className="w-full max-w-6xl min-h-[800px] bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
