import type { PrescriptionScan } from '../types';
import { MOCK_PRESCRIPTIONS } from '../data/mockData';
import { History, Calendar, FileText, Pill, ShieldCheck, Download } from 'lucide-react';

interface HealthMemoryViewProps {
  onSelectScan: (scan: PrescriptionScan) => void;
}

export const HealthMemoryView: React.FC<HealthMemoryViewProps> = ({ onSelectScan }) => {
  return (
    <div className="glass-panel p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Patient Health Memory Wallet</h2>
            <p className="text-xs text-slate-400">Encrypted Local EHR History & Scanned Medical Records</p>
          </div>
        </div>

        <button className="btn-outline text-xs py-2 px-3 flex items-center gap-2">
          <Download className="w-4 h-4 text-teal-400" />
          <span>Export ABHA Health Summary</span>
        </button>
      </div>

      {/* History Timeline Cards */}
      <div className="space-y-4">
        {MOCK_PRESCRIPTIONS.map((scan) => (
          <div
            key={scan.id}
            onClick={() => onSelectScan(scan)}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all cursor-pointer space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{scan.title}</h3>
                  <p className="text-xs text-slate-400">{scan.clinicName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  {scan.date}
                </span>

                <span className={`px-2.5 py-0.5 rounded font-mono font-bold ${
                  scan.isLowConfidence ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {(scan.confidenceScore * 100).toFixed(0)}% Confidence
                </span>
              </div>
            </div>

            {/* Extracted Generic Summary */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 font-semibold">
                <Pill className="w-4 h-4" />
                <span>Extracted Medications ({scan.medicines.length}):</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {scan.medicines.map((m) => (
                  <span key={m.id} className="px-2 py-1 rounded bg-slate-900 text-slate-200 border border-slate-800 text-[11px]">
                    <strong>{m.brandName}</strong> ({m.genericName}) - {m.dosage}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified & Saved in Encrypted Local SQLite Store</span>
              </span>

              <span className="text-teal-400 hover:underline font-semibold">
                Open in OCR Studio &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
