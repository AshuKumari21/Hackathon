import { useState, useEffect } from 'react';
import type { ReminderItem, RegionalLanguageCode } from '../types';
import { MOCK_REMINDERS } from '../data/mockData';
import { speakTextCrossBrowser, stopAllSpeech } from '../utils/speechUtils';
import { Clock, Bell, Volume2, CheckCircle2, Circle } from 'lucide-react';

interface RemindersTimelineProps {
  language: RegionalLanguageCode;
}

export const RemindersTimeline: React.FC<RemindersTimelineProps> = ({ language }) => {
  const [reminders, setReminders] = useState<ReminderItem[]>(MOCK_REMINDERS);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      stopAllSpeech();
    };
  }, []);

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, taken: !item.taken } : item))
    );
  };

  const playVoiceAlert = (reminder: ReminderItem) => {
    if (playingAudioId === reminder.id) {
      stopAllSpeech();
      setPlayingAudioId(null);
      return;
    }

    stopAllSpeech();
    speakTextCrossBrowser(reminder.regionalAudioText, {
      language: language,
      onStart: () => setPlayingAudioId(reminder.id),
      onEnd: () => setPlayingAudioId(null),
      onError: () => setPlayingAudioId(null)
    });
  };

  return (
    <div className="glass-panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Voice Medicine Reminders Schedule</h2>
            <p className="text-xs text-slate-400">Offline Scheduled Local Push Notifications</p>
          </div>
        </div>

        <span className="text-xs font-mono text-teal-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
          {reminders.filter((r) => r.taken).length} / {reminders.length} Completed
        </span>
      </div>

      {/* Reminders List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {reminders.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
              item.taken
                ? 'bg-slate-950/40 border-slate-800/80 opacity-60'
                : 'bg-slate-900/80 border-slate-700/80 shadow-md shadow-slate-950/50'
            }`}
          >
            {/* Left Info & Checkbox */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleReminder(item.id)}
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                {item.taken ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{item.medicineName}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-teal-300 font-mono">
                    {item.dosage}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1 font-mono text-amber-400">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                  <span>•</span>
                  <span>{item.foodRelation}</span>
                </div>
              </div>
            </div>

            {/* Right Action: Voice Trigger */}
            <button
              onClick={() => playVoiceAlert(item)}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                playingAudioId === item.id
                  ? 'bg-teal-500 text-slate-950 font-bold animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
              title="Test Voice Alert"
            >
              <Volume2 className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">Voice Test</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
