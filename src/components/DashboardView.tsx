import type { NavTab, PrescriptionScan, RegionalLanguageCode } from '../types';
import { LOCALIZATION_DATA } from '../data/localization';
import { MOCK_VITALS } from '../data/mockData';
import { HeartPulse, Activity, Camera, MessageSquare, UserCheck, Bell, ShieldCheck, Database, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface DashboardViewProps {
  onSelectTab: (tab: NavTab) => void;
  activeScan: PrescriptionScan;
  language: RegionalLanguageCode;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectTab, activeScan, language }) => {
  const t = LOCALIZATION_DATA[language] || LOCALIZATION_DATA.en;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-900/60 via-slate-900 to-slate-900 border border-teal-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30">
                PATIENT PORTAL • ABHA LINKED
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {t.welcome} 👋
            </h1>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your offline health assistant has analyzed your latest prescription. Your Type-2 Diabetes and Blood Pressure medication schedule is active.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('scanner')}
              className="btn-teal text-xs py-2.5 px-4 shadow-lg shadow-teal-500/20"
            >
              <Camera className="w-4 h-4" />
              <span>{t.ocrStudio}</span>
            </button>

            <button
              onClick={() => onSelectTab('chatbot')}
              className="btn-outline text-xs py-2.5 px-4"
            >
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>{t.aiChat}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Patient Vitals Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Vitals Card 1: Blood Pressure */}
        <div className="glass-panel p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Blood Pressure</span>
            <HeartPulse className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              {MOCK_VITALS.bloodPressureSystolic}/{MOCK_VITALS.bloodPressureDiastolic}
            </span>
            <span className="text-xs text-slate-400 font-mono">mmHg</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.optimalRange}</span>
          </div>
        </div>

        {/* Vitals Card 2: Blood Sugar */}
        <div className="glass-panel p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>{t.fastingSugar}</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              {MOCK_VITALS.fastingBloodSugar}
            </span>
            <span className="text-xs text-slate-400 font-mono">mg/dL</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.postPrandial}: {MOCK_VITALS.postPrandialSugar} mg/dL</span>
          </div>
        </div>

        {/* Vitals Card 3: Active Medications */}
        <div className="glass-panel p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>{t.activeMeds}</span>
            <Bell className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">
              {activeScan.medicines.length}
            </span>
            <span className="text-xs text-slate-400 font-mono">Prescribed</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-teal-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>1 Dose Taken Today</span>
          </div>
        </div>

        {/* Vitals Card 4: Local Database Status */}
        <div className="glass-panel p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Offline Local Cache</span>
            <Database className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">100%</span>
            <span className="text-xs text-slate-400 font-mono">Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <span>{t.encrypted}</span>
          </div>
        </div>
      </div>

      {/* Main Feature Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Scan Quick Summary */}
        <div className="lg:col-span-7 glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-teal-400" />
                <span>{t.activeScanTitle}</span>
              </h3>
              <p className="text-xs text-slate-400">{activeScan.title} • {activeScan.date}</p>
            </div>

            <button
              onClick={() => onSelectTab('scanner')}
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
            >
              <span>{t.viewStudio}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold">{activeScan.clinicName}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                {(activeScan.confidenceScore * 100).toFixed(0)}% Confidence
              </span>
            </div>

            <div className="space-y-1.5">
              {activeScan.medicines.map((med) => (
                <div key={med.id} className="p-2 rounded bg-slate-950/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">{med.brandName}</span>
                    <span className="text-[11px] text-teal-400 ml-2">({med.genericName})</span>
                  </div>
                  <span className="font-mono text-slate-300">{med.dosage} • {med.frequency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Doctor Recommendations */}
        <div className="lg:col-span-5 glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span>{t.nearbyCare}</span>
            </h3>

            <button
              onClick={() => onSelectTab('doctors')}
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
            >
              <span>{t.directory}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Dr. Anand Verma</h4>
                <p className="text-[11px] text-teal-400">General Physician & Diabetologist</p>
                <p className="text-[10px] text-slate-400 font-mono">Muzzafarpur • 2.4 km away</p>
              </div>
              <button
                onClick={() => onSelectTab('doctors')}
                className="btn-outline text-[10px] py-1 px-2.5"
              >
                {t.bookSlot}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
