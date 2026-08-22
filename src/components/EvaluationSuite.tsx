import { useState } from 'react';
import type { RegionalLanguageCode } from '../types';
import { EVALUATION_CASES, FAILURE_LOG_SEEDS } from '../data/mockData';
import { LOCALIZATION_DATA } from '../data/localization';
import { Layers, X, CheckCircle2, Bug } from 'lucide-react';

interface EvaluationSuiteProps {
  isOpen: boolean;
  onClose: () => void;
  language?: RegionalLanguageCode;
}

export const EvaluationSuite: React.FC<EvaluationSuiteProps> = ({ isOpen, onClose, language = 'en' }) => {
  const t = LOCALIZATION_DATA[language] || LOCALIZATION_DATA.en;
  const [activeTab, setActiveTab] = useState<'eval' | 'logs'>('eval');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'OCR', 'Translation', 'Disease Safety', 'Offline Doctor'];

  const filteredCases = EVALUATION_CASES.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-6 space-y-5 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{t.evalTitle}</h2>
              <p className="text-xs text-slate-400">{t.evalSubtitle}</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('eval')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'eval'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            20 Evaluation Cases Matrix ({EVALUATION_CASES.length})
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'logs'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Failure Log Seeds ({FAILURE_LOG_SEEDS.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'eval' ? (
          <div className="flex-1 overflow-hidden flex flex-col space-y-3">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1 rounded-md border font-medium ${
                    selectedCategory === cat
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Eval Cases Table */}
            <div className="flex-1 overflow-y-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-200">
                <thead className="bg-slate-950 text-slate-400 font-mono sticky top-0 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Scenario / Edge Case</th>
                    <th className="py-2.5 px-3">Expected Result</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                  {filteredCases.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-mono text-slate-400">#{item.id}</td>
                      <td className="py-2.5 px-3 font-semibold text-teal-400">{item.category}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="text-[11px] text-slate-400">{item.scenario}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">{item.expectedResult}</td>
                      <td className="py-2.5 px-3 font-mono">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3">
            {FAILURE_LOG_SEEDS.map((log) => (
              <div key={log.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Bug className="w-4 h-4 text-rose-400" />
                    <span className="font-bold text-white">{log.id}</span>
                    <span className="text-teal-400 font-mono">{log.component}</span>
                  </div>
                  <span className="text-slate-400 font-mono">{log.timestamp}</span>
                </div>

                <div className="text-xs font-mono text-rose-300 bg-rose-950/40 p-2 rounded border border-rose-900/50">
                  Error Signature: {log.errorSignature}
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Root Cause:</strong> {log.rootCause}</div>
                  <div className="text-emerald-400"><strong>Mitigation:</strong> {log.mitigation}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
