import type { PrescriptionScan, RegionalLanguageCode } from '../types';
import { HeartPulse, Utensils, Activity, Sparkles } from 'lucide-react';

interface DiseaseGuidanceProps {
  scan: PrescriptionScan;
  language: RegionalLanguageCode;
}

export const DiseaseGuidance: React.FC<DiseaseGuidanceProps> = ({ scan, language }) => {
  const transcriptData =
    scan.regionalTranscripts[language] ||
    scan.regionalTranscripts.hi ||
    scan.regionalTranscripts.en || {
      summaryText: '',
      regionalVoiceScript: '',
      dietTips: ['Eat balanced local grains and avoid excess salt/sugar.'],
      lifestyleTips: ['30 minutes of brisk walking daily and adequate hydration.'],
    };

  return (
    <div className="glass-panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Disease-Aware Lifestyle & Diet Guidance</h2>
            <p className="text-xs text-slate-400">Offline Medical Knowledge Graph Recommendations</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-800 text-teal-300 border border-slate-700">
          {scan.detectedConditions.length} Conditions Identified
        </span>
      </div>

      {/* Detected Conditions Badges */}
      <div className="flex flex-wrap gap-2">
        {scan.detectedConditions.map((condition, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            {condition}
          </span>
        ))}
      </div>

      {/* Guidance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Diet Advice Card */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Utensils className="w-4 h-4" />
            <span>Regional Diet & Nutrition Tips</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            {transcriptData.dietTips.length > 0 ? (
              transcriptData.dietTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 regional-text">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic">No specific diet restrictions for this scan.</li>
            )}
          </ul>
        </div>

        {/* Lifestyle Advice Card */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <Activity className="w-4 h-4" />
            <span>Daily Routine & Precautionary Care</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            {transcriptData.lifestyleTips.length > 0 ? (
              transcriptData.lifestyleTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 regional-text">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic">Standard restful recovery recommended.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
