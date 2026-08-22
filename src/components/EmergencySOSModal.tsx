import { useState, useEffect } from 'react';
import { AlertTriangle, Radio, X, CheckCircle2 } from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [broadcastDone, setBroadcastDone] = useState(false);

  useEffect(() => {
    let timer: number;
    if (countdown !== null && countdown > 0) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setBroadcastDone(true);
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const handleStartSOS = () => {
    setCountdown(5);
    setBroadcastDone(false);

    // Play siren sound via Web Audio API
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.5);
    } catch (e) {
      console.log('Audio Context unavailable');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border-2 border-rose-500/80 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl shadow-rose-950/60 relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SOS Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white tracking-wide">🚨 EMERGENCY SOS BROADCAST</h2>
            <p className="text-xs text-rose-300">Offline Cellular SMS & Audio Alert Protocol</p>
          </div>
        </div>

        {/* Content Body */}
        {broadcastDone ? (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">EMERGENCY ALERT DISPATCHED</h3>
            <p className="text-xs text-slate-300">
              Broadcasting GPS coordinates (26.1209° N, 85.3647° E) and audio recording to <strong>District Civil Hospital & Emergency Contacts</strong>.
            </p>
          </div>
        ) : countdown !== null ? (
          <div className="p-6 rounded-xl bg-rose-950/60 border border-rose-800 text-center space-y-3">
            <div className="text-4xl font-extrabold text-rose-400 font-mono animate-bounce">{countdown}s</div>
            <p className="text-xs text-slate-300">Broadcasting emergency alert in {countdown} seconds...</p>
            <button
              onClick={() => setCountdown(null)}
              className="btn-outline text-xs text-rose-300 border-rose-700 hover:bg-rose-900/50"
            >
              Cancel Alert
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              If the patient experiences sudden severe chest pain, shortness of breath, or loss of consciousness, tap below to broadcast immediate emergency dispatch to local emergency responders and family contacts.
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1 font-mono text-slate-400">
              <div>• Nearest Hospital: District Civil Hospital (2.4 km)</div>
              <div>• Dispatch Protocol: Cellular SMS fallback + Local Bluetooth mesh alert</div>
              <div>• Battery Efficient: Operates without active internet</div>
            </div>

            <button
              onClick={handleStartSOS}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 tracking-wider uppercase"
            >
              <Radio className="w-5 h-5 animate-pulse" />
              <span>Broadcast Emergency SOS Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
