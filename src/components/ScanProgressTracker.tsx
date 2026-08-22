import React from 'react';
import {
  Sparkles,
  FileCheck,
  Cpu,
  Table,
  ShieldCheck,
  CheckCircle2,
  Loader2
} from 'lucide-react';

export interface ScanStage {
  id: string;
  label: string;
  detail: string;
  icon: any;
  status: 'pending' | 'in_progress' | 'completed';
}

interface ScanProgressTrackerProps {
  fileName: string;
  progressPercent: number;
  currentPage: number;
  totalPages: number;
  currentStageId: string;
  detectedDocTypeLabel?: string;
}

export const ScanProgressTracker: React.FC<ScanProgressTrackerProps> = ({
  fileName,
  progressPercent,
  currentPage,
  totalPages,
  currentStageId,
  detectedDocTypeLabel,
}) => {
  const stages: { id: string; label: string; icon: any }[] = [
    { id: 'upload', label: 'Document uploaded & validated', icon: FileCheck },
    { id: 'pages', label: `Page extraction & preprocessing (Page ${currentPage}/${totalPages})`, icon: Cpu },
    { id: 'ocr', label: 'PaddleOCR / Gemini Vision inference', icon: Sparkles },
    { id: 'classification', label: detectedDocTypeLabel ? `Identified: ${detectedDocTypeLabel}` : 'Document type classification', icon: Table },
    { id: 'entities', label: 'Extracting test values, reference ranges & medicines', icon: Table },
    { id: 'safety', label: 'Safety validation & educational summary generation', icon: ShieldCheck },
  ];

  const getStageStatus = (stageIdx: number, activeStageId: string) => {
    const activeIdx = stages.findIndex((s) => s.id === activeStageId);
    if (activeIdx === -1) {
      if (progressPercent >= 100) return 'completed';
      return stageIdx === 0 ? 'in_progress' : 'pending';
    }
    if (stageIdx < activeIdx) return 'completed';
    if (stageIdx === activeIdx) return 'in_progress';
    return 'pending';
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-950/90 border border-teal-500/40 shadow-2xl space-y-6 max-w-3xl mx-auto animate-in zoom-in-95 duration-200">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
            <h3 className="text-base font-bold text-white">Analyzing Medical Document</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {progressPercent}% Complete
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono truncate max-w-md">
            File: <strong className="text-slate-200">{fileName}</strong> • Multi-Page Scan ({currentPage}/{totalPages})
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs font-bold text-teal-300 font-mono">
            {currentPage < totalPages ? `Scanning page ${currentPage}/${totalPages}` : 'Cross-page synthesis'}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Real-time Clinical OCR</span>
        </div>
      </div>

      {/* Main Animated Progress Bar */}
      <div className="space-y-2">
        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 rounded-full transition-all duration-300 shadow-lg shadow-teal-500/30 animate-pulse"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span>Starting Multimodal Pipeline</span>
          <span>Generating Clinical Overview</span>
        </div>
      </div>

      {/* Pipeline Stages Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {stages.map((st, idx) => {
          const status = getStageStatus(idx, currentStageId);
          const Icon = st.icon;

          return (
            <div
              key={st.id}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                status === 'completed'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : status === 'in_progress'
                  ? 'bg-teal-500/15 border-teal-500/50 text-teal-200 shadow-md shadow-teal-500/10 animate-pulse'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-500'
              }`}
            >
              <div className="flex-shrink-0">
                {status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : status === 'in_progress' ? (
                  <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                ) : (
                  <Icon className="w-4 h-4 text-slate-500" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{st.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-slate-500">
        Processing text structure, reference ranges, and dosage tables across all pages without data fabrication.
      </p>
    </div>
  );
};
