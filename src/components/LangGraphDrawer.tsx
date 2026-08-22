import { useState } from 'react';
import type { RegionalLanguageCode } from '../types';
import { Cpu, X, ArrowRight, CheckCircle2, ShieldCheck, Database, Volume2 } from 'lucide-react';

interface LangGraphDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language?: RegionalLanguageCode;
}

export const LangGraphDrawer: React.FC<LangGraphDrawerProps> = ({ isOpen, onClose, language = 'en' }) => {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const nodes = [
    { id: 'ocr_node', name: '1. OCR Extractor', desc: 'PaddleOCR ONNX extracts bounding boxes and text strings.', status: 'SUCCESS', icon: Cpu },
    { id: 'drug_normalizer', name: '2. Drug Normalizer', desc: 'Maps brand names (e.g. Glycomet) to RxNorm generic Metformin.', status: 'SUCCESS', icon: Database },
    { id: 'confidence_evaluator', name: '3. Confidence Gatekeeper', desc: 'Computes threshold (94% confidence > 70% minimum cutoff).', status: 'SUCCESS', icon: ShieldCheck },
    { id: 'disease_reasoner', name: '4. Disease Reasoner', desc: 'Infers Type 2 Diabetes & Hypertension; loads diet guidelines.', status: 'SUCCESS', icon: CheckCircle2 },
    { id: 'regional_translator', name: '5. Regional Translator', desc: `Translates instruction into target language script (${language.toUpperCase()}).`, status: 'SUCCESS', icon: ArrowRight },
    { id: 'tts_node', name: '6. TTS Generator', desc: 'Piper ONNX synthesizes regional voice audio stream.', status: 'SUCCESS', icon: Volume2 },
    { id: 'doctor_matcher', name: '7. Doctor Matcher', desc: 'Queries SQLite spatial geohash index for nearby specialists.', status: 'SUCCESS', icon: CheckCircle2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">LangGraph Node Orchestration Inspector</h2>
            <p className="text-xs text-slate-400">Node.js / LangGraph.js Agentic Execution Graph</p>
          </div>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = activeStep === index;

            return (
              <div
                key={node.id}
                onClick={() => setActiveStep(index)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isActive
                    ? 'bg-teal-500/10 border-teal-500/50 shadow-md shadow-teal-500/10'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800 text-teal-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{node.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      {node.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{node.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
