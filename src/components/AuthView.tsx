import React, { useState } from 'react';
import type { RegionalLanguageCode } from '../types';
import { LOCALIZATION_DATA } from '../data/localization';
import { Activity, ShieldCheck, Lock, ArrowRight, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthViewProps {
  language: RegionalLanguageCode;
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ language, onLoginSuccess, onBackToHome }) => {
  const [abhaId, setAbhaId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [otp, setOtp] = useState('');

  const t = LOCALIZATION_DATA[language] || LOCALIZATION_DATA.en;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!abhaId || !patientName) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
      onLoginSuccess();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="max-w-md w-full glass-panel p-8 space-y-6 relative border-teal-500/20 shadow-2xl">
        
        {/* Brand Banner */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/25 mx-auto">
            <Activity className="w-7 h-7 text-slate-950 font-bold" />
          </div>
          <h2 className="text-2xl font-black text-white">{t.appName}</h2>
          <p className="text-xs text-slate-400">{t.tagline}</p>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Patient Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full glass-input text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">ABHA Health ID Number (14 Digits)</label>
              <input
                type="text"
                required
                pattern="\d{14}"
                placeholder="e.g. 91884210492812"
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value.replace(/\D/g, ''))}
                maxLength={14}
                className="w-full glass-input text-xs font-mono"
              />
              <span className="text-[10px] text-slate-400">Ayushman Bharat Health Account ID for verified medical records sync.</span>
            </div>

            <button
              type="submit"
              disabled={isVerifying || abhaId.length < 14}
              className="w-full btn-teal py-3 justify-center text-xs font-bold gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <span>Sending Secure OTP...</span>
              ) : (
                <>
                  <span>Verify with ABHA ID & Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-xs text-teal-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <strong>OTP Sent Successfully</strong> to mobile linked with ABHA ID ending in {abhaId.slice(-4)}.
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Enter 6-Digit OTP</label>
              <input
                type="text"
                required
                pattern="\d{6}"
                placeholder="Enter 6-Digit verification code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="w-full glass-input text-center text-base font-mono tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying || otp.length < 6}
              className="w-full btn-teal py-3 justify-center text-xs font-bold gap-2 disabled:opacity-50"
            >
              {isVerifying ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Verify OTP & Enter Workspace</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Back Link / Skip options */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
          <button
            onClick={onBackToHome}
            className="hover:text-white"
          >
            &larr; Back to Landing Page
          </button>

          <button
            onClick={onLoginSuccess}
            className="text-teal-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Skip & Start Trial Mode</span>
            <UserCheck className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
