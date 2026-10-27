import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode, Smartphone } from 'lucide-react';
import { REACT_NATIVE_FILES } from '../data/reactNativeCode';

interface ReactNativeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReactNativeExportModal: React.FC<ReactNativeExportModalProps> = ({ isOpen, onClose }) => {
  const [activeFile, setActiveFile] = useState<keyof typeof REACT_NATIVE_FILES>('App.tsx');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode = REACT_NATIVE_FILES[activeFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-2xl bg-[#0d131f] border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>React Native / Expo Project Code</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                  iOS &amp; Android Ready
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Direct React Native source code using Expo Speech, Audio &amp; Vector Icons
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-5 pt-3 pb-2 flex items-center justify-between gap-2 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {Object.keys(REACT_NATIVE_FILES).map((fileName) => (
              <button
                key={fileName}
                onClick={() => setActiveFile(fileName as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-colors border ${
                  activeFile === fileName
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{fileName}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400 transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Content View */}
        <div className="flex-1 overflow-auto p-4 bg-[#080c14] font-mono text-xs text-slate-200 leading-relaxed">
          <pre className="select-all">
            <code>{currentCode}</code>
          </pre>
        </div>

        {/* Quick Launch Command Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-slate-300">npx create-expo-app --template blank</span>
          </div>
          <span className="text-slate-500">Run with `npx expo start`</span>
        </div>
      </div>
    </div>
  );
};
