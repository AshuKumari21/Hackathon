import type { NavTab, RegionalLanguageCode } from '../types';
import { LOCALIZATION_DATA } from '../data/localization';
import { 
  LayoutDashboard, 
  Camera, 
  MessageSquare, 
  HeartPulse, 
  UserCheck, 
  Bell, 
  History, 
  Cpu, 
  Layers, 
  AlertTriangle,
  Activity,
  WifiOff,
  Wifi,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
  onOpenSos: () => void;
  pendingSyncCount: number;
  language: RegionalLanguageCode;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOfflineMode,
  onToggleOffline,
  onOpenSos,
  pendingSyncCount,
  language,
  onLogout
}) => {
  const t = LOCALIZATION_DATA[language] || LOCALIZATION_DATA.en;

  const navItems: { id: NavTab; label: string; icon: any; badge?: string }[] = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'scanner', label: t.ocrStudio, icon: Camera, badge: 'ONNX AI' },
    { id: 'chatbot', label: t.aiChat, icon: MessageSquare, badge: 'Voice' },
    { id: 'guidance', label: t.dietGuidance, icon: HeartPulse },
    { id: 'doctors', label: t.doctors, icon: UserCheck, badge: 'SQLite' },
    { id: 'reminders', label: t.reminders, icon: Bell, badge: '4 Today' },
    { id: 'memory', label: t.healthMemory, icon: History },
    { id: 'metrics', label: t.systemMetrics, icon: Cpu },
    { id: 'eval', label: t.evalSuite, icon: Layers },
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between flex-shrink-0 h-screen sticky top-0 z-30">
      {/* Top Header & Branding */}
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/25">
            <Activity className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white">{t.appName}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{t.tagline}</p>
          </div>
        </div>

        {/* User Card */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center font-bold text-xs">
            RK
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-200 truncate">Ramesh Kumar</h4>
            <p className="text-[10px] text-slate-400 font-mono truncate">ABHA: 91-8842-1049</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/20 to-teal-500/10 text-teal-300 border border-teal-500/30 shadow-md shadow-teal-500/10 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                    isActive ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-slate-800/80 space-y-2">
        {/* Offline Mode Toggle Button */}
        <button
          onClick={onToggleOffline}
          className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
            isOfflineMode
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
          }`}
        >
          <div className="flex items-center gap-2">
            {isOfflineMode ? <WifiOff className="w-4 h-4 text-amber-400" /> : <Wifi className="w-4 h-4 text-emerald-400" />}
            <span>{isOfflineMode ? t.offlineMode.split(' ')[0] : 'Online'}</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900">
            {pendingSyncCount}
          </span>
        </button>

        {/* SOS Emergency Button */}
        <button
          onClick={onOpenSos}
          className="w-full btn-danger text-xs py-2 flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{t.sosEmergency}</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-800/50 flex items-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.logout}</span>
        </button>
      </div>
    </aside>
  );
};
