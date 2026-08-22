import React from 'react';
import type { RegionalLanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/mockData';
import { Activity, Globe, Wifi, WifiOff, AlertTriangle, Cpu, Layers } from 'lucide-react';

interface HeaderProps {
  isOfflineMode: boolean;
  onToggleOffline: () => void;
  currentLanguage: RegionalLanguageCode;
  onSelectLanguage: (lang: RegionalLanguageCode) => void;
  onOpenSos: () => void;
  onOpenLangGraph: () => void;
  onOpenEval: () => void;
  pendingSyncCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  isOfflineMode,
  onToggleOffline,
  currentLanguage,
  onSelectLanguage,
  onOpenSos,
  onOpenLangGraph,
  onOpenEval,
  pendingSyncCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">Swasthya<span className="text-teal-400">SaaS</span></h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 font-mono">BHARAT EDITION</span>
            </div>
            <p className="text-xs text-slate-400">Offline Multimodal SaaS Health Assistant</p>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Offline/Online Mode Switch */}
          <button
            onClick={onToggleOffline}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all ${
              isOfflineMode
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
            }`}
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Offline Mode (ONNX Local)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cloud Sync Active ({pendingSyncCount} enqueued)</span>
              </>
            )}
          </button>

          {/* Regional Language Picker */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-lg px-2 py-1">
            <Globe className="w-4 h-4 text-teal-400" />
            <select
              value={currentLanguage}
              onChange={(e) => onSelectLanguage(e.target.value as RegionalLanguageCode)}
              className="bg-transparent text-sm text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-200">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {/* LangGraph Pipeline Inspector */}
          <button
            onClick={onOpenLangGraph}
            className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
            title="Inspect LangGraph State Machine"
          >
            <Cpu className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">LangGraph Pipeline</span>
          </button>

          {/* Evaluation & Failure Matrix */}
          <button
            onClick={onOpenEval}
            className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
            title="View 20 Evaluation Cases & Failure Log"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Eval Matrix</span>
          </button>

          {/* Emergency SOS Button */}
          <button
            onClick={onOpenSos}
            className="btn-danger text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>SOS Emergency</span>
          </button>
        </div>
      </div>
    </header>
  );
};
