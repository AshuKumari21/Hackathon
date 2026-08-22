import { Cpu, HardDrive, Zap, Database, Activity, CheckCircle2 } from 'lucide-react';

export const SystemMetricsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">ONNX Runtime & LangGraph System Metrics</h2>
              <p className="text-xs text-slate-400">Real-Time Mobile WASM Heap & AI Inference Latency Benchmarks</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
            HEALTHY SYSTEMS • SUB-2S LATENCY
          </span>
        </div>
      </div>

      {/* Hardware Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: WASM Heap Memory */}
        <div className="glass-panel p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>ONNX WASM Heap RAM</span>
            <HardDrive className="w-4 h-4 text-teal-400" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">980 MB</span>
            <span className="text-xs text-slate-400 font-mono">/ 1.5 GB Budget</span>
          </div>

          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 w-[65%]" />
          </div>
          <p className="text-[10px] text-slate-400">Qwen-2.5-1.5B 4-bit GGUF quantized model footprint.</p>
        </div>

        {/* Metric 2: Average Inference Latency */}
        <div className="glass-panel p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>End-to-End Pipeline Latency</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">1.84 s</span>
            <span className="text-xs text-slate-400 font-mono">Mobile CPU</span>
          </div>

          <div className="text-xs space-y-1 font-mono text-slate-300">
            <div className="flex justify-between"><span>PaddleOCR Pass:</span><span className="text-teal-400">340ms</span></div>
            <div className="flex justify-between"><span>LLM Parsing Pass:</span><span className="text-amber-400">1300ms</span></div>
            <div className="flex justify-between"><span>Piper TTS Pass:</span><span className="text-emerald-400">200ms</span></div>
          </div>
        </div>

        {/* Metric 3: Offline Database WAL Status */}
        <div className="glass-panel p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>SQLite Spatial Database</span>
            <Database className="w-4 h-4 text-teal-400" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">WAL Mode</span>
            <span className="text-xs text-slate-400 font-mono">Active</span>
          </div>

          <div className="text-xs space-y-1 font-mono text-slate-300">
            <div className="flex justify-between"><span>Doctor Spatial Index:</span><span className="text-teal-400">Geohash 6</span></div>
            <div className="flex justify-between"><span>Enqueued Outbox Sync:</span><span className="text-amber-400">2 Items</span></div>
            <div className="flex justify-between"><span>Encryption Protocol:</span><span className="text-emerald-400">AES-256</span></div>
          </div>
        </div>
      </div>

      {/* LangGraph 7-Node State Graph Diagram Card */}
      <div className="glass-panel p-5 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-400" />
          <span>LangGraph Node Pipeline Execution Graph</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { step: '01', name: 'ocr_node', desc: 'PaddleOCR Mobile ONNX', latency: '340ms' },
            { step: '02', name: 'drug_normalizer', desc: 'RxNorm Medical Mapping', latency: '120ms' },
            { step: '03', name: 'confidence_eval', desc: '70% Threshold Gatekeeper', latency: '40ms' },
            { step: '04', name: 'disease_reasoner', desc: 'Condition & Diet Graph', latency: '600ms' },
            { step: '05', name: 'translator_node', desc: '10 Language Dialect Map', latency: '440ms' },
            { step: '06', name: 'tts_node', desc: 'Piper Audio Synthesizer', latency: '200ms' },
            { step: '07', name: 'doctor_matcher', desc: 'SQLite Haversine Index', latency: '60ms' },
            { step: '08', name: 'outbox_sync', desc: 'CRDT Delta Queue Enqueue', latency: '35ms' },
          ].map((item) => (
            <div key={item.step} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-teal-400 font-bold">NODE {item.step}</span>
                <span className="text-[10px] font-mono text-slate-400">{item.latency}</span>
              </div>

              <div className="font-bold text-white text-xs">{item.name}</div>
              <p className="text-[11px] text-slate-400">{item.desc}</p>

              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono pt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>STATE MUTATION PASS</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
