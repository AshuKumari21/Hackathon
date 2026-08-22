import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { PrescriptionScanner } from './components/PrescriptionScanner';
import { AIChatAssistant } from './components/AIChatAssistant';
import { DiseaseGuidance } from './components/DiseaseGuidance';
import { DoctorDirectory } from './components/DoctorDirectory';
import { RemindersTimeline } from './components/RemindersTimeline';
import { HealthMemoryView } from './components/HealthMemoryView';
import { SystemMetricsView } from './components/SystemMetricsView';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { LangGraphDrawer } from './components/LangGraphDrawer';
import { EvaluationSuite } from './components/EvaluationSuite';
import { AuthView } from './components/AuthView';

import type { PrescriptionScan, RegionalLanguageCode, NavTab } from './types';
import { MOCK_PRESCRIPTIONS, SUPPORTED_LANGUAGES } from './data/mockData';
import { LOCALIZATION_DATA } from './data/localization';
import { 
  Globe, Cpu, Layers, AlertTriangle, Sparkles, Activity, ShieldCheck, 
  Camera, UserCheck, Bell, HeartPulse, ChevronRight, Laptop
} from 'lucide-react';

export function App() {
  const [page, setPage] = useState<'landing' | 'auth' | 'workspace'>('landing');
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isOfflineMode, setIsOfflineMode] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<RegionalLanguageCode>(() => {
    try {
      const saved = localStorage.getItem('swasthya_selected_language') as RegionalLanguageCode | null;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
    return 'en';
  });
  const [activeScan, setActiveScan] = useState<PrescriptionScan>(MOCK_PRESCRIPTIONS[0]);

  const handleLanguageChange = (lang: RegionalLanguageCode) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('swasthya_selected_language', lang);
    } catch {
      // Ignore storage errors
    }
  };
  
  // Modals state
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isLangGraphOpen, setIsLangGraphOpen] = useState(false);
  const [isEvalOpen, setIsEvalOpen] = useState(false);
  
  // Sync Outbox count
  const [pendingSyncCount, setPendingSyncCount] = useState(2);

  const handleEnqueueBooking = () => {
    setPendingSyncCount((prev) => prev + 1);
  };

  const t = LOCALIZATION_DATA[currentLanguage] || LOCALIZATION_DATA.en;

  // --- PAGE 1: PREMIUM LANDING PAGE ---
  if (page === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-x-hidden selection:bg-teal-500 selection:text-slate-950">
        {/* Navbar */}
        <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 fixed top-0 left-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/25">
                <Activity className="w-6 h-6 text-slate-950 font-bold" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white">{t.appName}</span>
                <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 font-mono">{t.edition}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Selector in Navbar */}
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">
                <Globe className="w-4 h-4 text-teal-400" />
                <select
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as RegionalLanguageCode)}
                  className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-200">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full text-center relative space-y-8">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold font-mono tracking-wider uppercase animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>{t.tagline}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {t.appName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Bharat Portal</span>
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Shattering language barriers and internet deserts. On-device PaddleOCR, Regional voice translation, and Clinical AI designed to run smoothly on cheap $50 smartphones.
          </p>

          <div className="flex items-center justify-center pt-4">
            <button
              onClick={() => setPage('workspace')}
              className="btn-teal py-3.5 px-10 text-base font-bold flex items-center gap-2 shadow-xl shadow-teal-500/25 hover:scale-105 transition-all"
            >
              <span>Start</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-5xl mx-auto">
            {[
              { val: '10+', label: 'Regional Indian Languages' },
              { val: '100%', label: 'Offline On-Device Inference' },
              { val: '< 2.0s', label: 'Average Execution Latency' },
              { val: 'Encrypted', label: 'Local SQLite Spatial DB' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 text-center space-y-1">
                <div className="text-2xl font-extrabold text-teal-400 font-mono">{stat.val}</div>
                <div className="text-[11px] text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Visual Mockup */}
        <section className="px-6 max-w-5xl mx-auto w-full pb-20">
          <div className="glass-panel p-4 border border-teal-500/30 shadow-2xl relative group rounded-2xl overflow-hidden aspect-[16/9]">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
              alt="Workspace Mockup"
              className="w-full h-full object-cover rounded-xl filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
              <div className="space-y-1 text-left">
                <h3 className="text-base font-bold text-white">SaaS-Style Clinic Dashboard Workspace</h3>
                <p className="text-xs text-slate-300">Empowering health comprehension in Bihar, Tamil Nadu, Punjab & beyond.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="bg-slate-900/40 border-t border-b border-slate-800/80 py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white">Core Technology Superpowers</h2>
              <p className="text-xs text-slate-400">Production-Grade Multimodal Architecture Built for Bharat</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: '📸 Prescription-to-Voice OCR', desc: 'Runs client-side ONNX PaddleOCR to crop, de-noise, and translate handwritten prescriptions into native voice scripts.', icon: Camera },
                { title: '🧠 Disease-Aware Nutrition AI', desc: 'Suggests local crop alternatives (Bajra, Ragi) and triggers caution warnings for medication conflict cases.', icon: HeartPulse },
                { title: '🩺 Spatial Doctor Proximity Search', desc: 'Uses SQLite spatial geohash radius indexing to locate verified clinics offline without GPS dependency.', icon: UserCheck },
                { title: '🔔 Regional Voice Reminders', desc: 'Triggers local push alerts speaking medicine routines aloud in Hindi, Punjabi, Bengali, or Tamil.', icon: Bell },
                { title: '🛡️ Confidence Signal Gateway', desc: 'Deterministic parser evaluates reading certainty; falls back to pharmacist confirmation for unreadable scripts.', icon: ShieldCheck },
                { title: '🚨 SOS Cellular Broadcast Protocol', desc: '1-Tap Emergency Red trigger broadcasts offline mesh signals and GPS data to the nearest health post.', icon: AlertTriangle },
              ].map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="glass-panel p-5 space-y-3 hover:-translate-y-1 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{feat.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* tech stack banner */}
        <section className="py-20 px-6 max-w-5xl mx-auto w-full text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Edge Optimization Tech Stack</h2>
            <p className="text-xs text-slate-400">Zero Cloud-Dependency Offline Execution</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'PaddleOCR ONNX', desc: 'Sub-15MB runtime' },
              { name: 'Qwen-2.5-1.5B', desc: '4-bit quantized GGUF' },
              { name: 'Piper TTS', desc: 'ONNX Voice synthesizers' },
              { name: 'SQLite WAL DB', desc: 'Encrypted EHR wallet' },
            ].map((tech, i) => (
              <div key={i} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="font-bold text-white text-xs">{tech.name}</div>
                <div className="text-[10px] text-teal-400 font-mono mt-1">{tech.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 py-6 px-6 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-bold text-slate-200">{t.appName} Bharat</span> • {t.tagline}
            </div>
            <button
              onClick={() => setPage('workspace')}
              className="text-teal-400 hover:text-teal-300 font-bold"
            >
              Start &rarr;
            </button>
          </div>
        </footer>

        {/* Background Modals */}
        <LangGraphDrawer isOpen={isLangGraphOpen} onClose={() => setIsLangGraphOpen(false)} />
      </div>
    );
  }

  // --- PAGE 2: SECURE AUTHENTICATION GATE ---
  if (page === 'auth') {
    return (
      <AuthView
        language={currentLanguage}
        onLoginSuccess={() => setPage('workspace')}
        onBackToHome={() => setPage('landing')}
      />
    );
  }

  // --- PAGE 3: MAIN APP PORTAL WORKSPACE ---
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 animate-in fade-in duration-300">
      {/* Left SaaS Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOfflineMode={isOfflineMode}
        onToggleOffline={() => setIsOfflineMode(!isOfflineMode)}
        onOpenSos={() => setIsSosOpen(true)}
        pendingSyncCount={pendingSyncCount}
        language={currentLanguage}
        onLogout={() => setPage('landing')}
      />

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Navigation Bar */}
        <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-extrabold text-white capitalize tracking-wide">
              {activeTab === 'dashboard' && t.dashboard}
              {activeTab === 'scanner' && t.ocrStudio}
              {activeTab === 'chatbot' && t.aiChat}
              {activeTab === 'guidance' && t.dietGuidance}
              {activeTab === 'doctors' && t.doctors}
              {activeTab === 'reminders' && t.reminders}
              {activeTab === 'memory' && t.healthMemory}
              {activeTab === 'metrics' && t.systemMetrics}
              {activeTab === 'eval' && t.evalSuite}
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 font-mono">
              {t.edition}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            {/* Return to Landing Page */}
            <button
              onClick={() => setPage('landing')}
              className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <Laptop className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">{t.landingPage}</span>
            </button>

            {/* Regional Language Selector */}
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1">
              <Globe className="w-4 h-4 text-teal-400" />
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value as RegionalLanguageCode)}
                className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-200">
                    {lang.flag} {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>

            {/* Inspector Triggers */}
            <button
              onClick={() => setIsLangGraphOpen(true)}
              className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
              title="Inspect LangGraph 7-Node Execution Graph"
            >
              <Cpu className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">LangGraph Pipeline</span>
            </button>

            <button
              onClick={() => setIsEvalOpen(true)}
              className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
              title="View 20 Evaluation Test Cases"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">20 Eval Cases</span>
            </button>

            {/* Emergency SOS Button */}
            <button
              onClick={() => setIsSosOpen(true)}
              className="btn-danger text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
              <span>SOS Emergency</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Body Render */}
        <main className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              onSelectTab={setActiveTab}
              activeScan={activeScan}
              language={currentLanguage}
            />
          )}

          {activeTab === 'scanner' && (
            <PrescriptionScanner
              currentScan={activeScan}
              onSelectScan={setActiveScan}
              language={currentLanguage}
              isOfflineMode={isOfflineMode}
            />
          )}

          {activeTab === 'chatbot' && (
            <AIChatAssistant language={currentLanguage} />
          )}

          {activeTab === 'guidance' && (
            <DiseaseGuidance scan={activeScan} language={currentLanguage} />
          )}

          {activeTab === 'doctors' && (
            <DoctorDirectory onEnqueueBooking={handleEnqueueBooking} />
          )}

          {activeTab === 'reminders' && (
            <RemindersTimeline language={currentLanguage} />
          )}

          {activeTab === 'memory' && (
            <HealthMemoryView
              onSelectScan={(scan) => {
                setActiveScan(scan);
                setActiveTab('scanner');
              }}
            />
          )}

          {activeTab === 'metrics' && (
            <SystemMetricsView />
          )}

          {activeTab === 'eval' && (
            <div className="glass-panel p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">20 Evaluation Test Cases Suite</h2>
              <p className="text-xs text-slate-400">Click the button below to launch full inspection modal.</p>
              <button onClick={() => setIsEvalOpen(true)} className="btn-teal text-xs">
                Launch Evaluation Matrix & Failure Log
              </button>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 py-4 px-6 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-bold text-slate-200">{t.appName} Bharat</span> • {t.tagline}
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span>ONNX Quantized OCR + Qwen-2.5-1.5B</span>
              <span>•</span>
              <span>Piper Regional TTS</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals & Drawers */}
      <EmergencySOSModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
      <LangGraphDrawer isOpen={isLangGraphOpen} onClose={() => setIsLangGraphOpen(false)} />
      <EvaluationSuite isOpen={isEvalOpen} onClose={() => setIsEvalOpen(false)} />
    </div>
  );
}

export default App;
