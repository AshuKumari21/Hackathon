import { useState, useRef, useEffect } from 'react';
import type { MedicalDocumentSession, RegionalLanguageCode } from '../types';
import { MOCK_DOCUMENT_SESSIONS } from '../data/mockData';
import {
  FileText,
  Camera,
  FolderOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Play,
  RotateCcw,
  Layers,
  FileCheck
} from 'lucide-react';

export interface UploadedFileItem {
  file: File;
  base64Data: string;
  dataUrl: string;
  name: string;
  size: number;
  type: string;
  pageCount: number;
  previewUrl: string;
  documentHint: 'prescription' | 'report' | 'auto';
}

interface MedicalDocumentUploaderProps {
  onStartScan: (fileItem: UploadedFileItem) => void;
  onSelectDemoSession: (session: MedicalDocumentSession) => void;
  language: RegionalLanguageCode;
  isOfflineMode: boolean;
}

export const MedicalDocumentUploader: React.FC<MedicalDocumentUploaderProps> = ({
  onStartScan,
  onSelectDemoSession,
  isOfflineMode,
}) => {
  const [selectedFile, setSelectedFile] = useState<UploadedFileItem | null>(null);
  const [documentHint, setDocumentHint] = useState<'prescription' | 'report' | 'auto'>('auto');
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Camera capture modal state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [cameraStream]);

  // Handle WebRTC Camera
  const handleStartCamera = async () => {
    setErrorMsg(null);
    setCapturedPhoto(null);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setErrorMsg('Unable to access device camera. Please upload an image directly from device files.');
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setCapturedPhoto(dataUrl);
      // Stop stream
      if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.stop());
        setCameraStream(null);
      }
    }
  };

  const handleConfirmCapturedPhoto = () => {
    if (!capturedPhoto) return;
    const base64 = capturedPhoto.split(',')[1];
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/jpeg' });
    const file = new File([blob], `camera_capture_${Date.now()}.jpg`, { type: 'image/jpeg' });

    setSelectedFile({
      file,
      base64Data: base64,
      dataUrl: capturedPhoto,
      name: file.name,
      size: file.size,
      type: file.type,
      pageCount: 1,
      previewUrl: capturedPhoto,
      documentHint,
    });
    setIsCameraOpen(false);
  };

  const handleCloseCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((t) => t.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
    setCapturedPhoto(null);
  };

  // Handle File Input / Drag and drop
  const processSelectedFile = (file: File, hint: 'prescription' | 'report' | 'auto') => {
    setErrorMsg(null);
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    const isValidExt = ['jpg', 'jpeg', 'png', 'webp', 'pdf'].includes(ext || '');

    if (!validMimes.includes(file.type) && !isValidExt) {
      setErrorMsg('Unsupported file format. Please upload JPG, PNG, or PDF.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('File size exceeds 25MB. Please upload a smaller document.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64Data = dataUrl.split(',')[1] || '';
      const isPdf = file.type === 'application/pdf' || ext === 'pdf';
      const pageCount = isPdf ? 2 : 1; // Estimated pages

      setSelectedFile({
        file,
        base64Data,
        dataUrl,
        name: file.name,
        size: file.size,
        type: file.type || (isPdf ? 'application/pdf' : 'image/jpeg'),
        pageCount,
        previewUrl: isPdf ? 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80' : dataUrl,
        documentHint: hint,
      });
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, hint: 'prescription' | 'report' | 'auto') => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file, hint);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file, documentHint);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Main Upload Card ──────────────────────────────────────────────── */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          {/* Header Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>Medical Document Scanner</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-400">
                {isOfflineMode ? 'ONNX Local OCR' : 'Gemini Multimodal Vision'}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Upload Your Medical Document
            </h2>

            <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Upload a clear image or PDF of your prescription, blood report, lab test, diagnostic summary, or test report for AI-powered multi-page extraction and plain-language clinical breakdown.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-rose-200">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => handleFileInputChange(e, documentHint)}
          />

          {/* ── Document Selected Preview ─────────────────────────────────── */}
          {selectedFile ? (
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-teal-500/40 shadow-xl space-y-5 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-teal-400" />
                  <span className="text-sm font-bold text-white">Document Selected</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                    Ready to Scan
                  </span>
                </div>

                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Change Document</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                {/* Thumbnail Preview */}
                <div className="sm:col-span-4 aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative">
                  <img
                    src={selectedFile.previewUrl}
                    alt={selectedFile.name}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur text-[10px] font-mono text-slate-300">
                    {selectedFile.type.includes('pdf') ? 'PDF Document' : 'Image'}
                  </div>
                </div>

                {/* Meta details */}
                <div className="sm:col-span-8 space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white truncate max-w-md">
                      {selectedFile.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Size: {(selectedFile.size / 1024).toFixed(1)} KB • Pages: {selectedFile.pageCount} page(s)
                    </p>
                  </div>

                  {/* Document Category Hint Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <span>Document Category:</span>
                      <span className="text-[11px] text-slate-500 font-normal">(helps prioritize extraction)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'prescription', label: '📄 Doctor Prescription' },
                        { id: 'report', label: '🧪 Medical / Lab Report' },
                        { id: 'auto', label: '✨ Auto-Detect' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setDocumentHint(opt.id as any);
                            setSelectedFile((prev) => prev ? { ...prev, documentHint: opt.id as any } : null);
                          }}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                            selectedFile.documentHint === opt.id
                              ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => onStartScan(selectedFile)}
                      className="btn-teal py-2.5 px-6 text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-500/25"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Scan &amp; Analyze All Pages</span>
                    </button>

                    <button
                      onClick={() => setSelectedFile(null)}
                      className="btn-outline py-2.5 px-4 text-xs font-medium text-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ── Two Large Upload Choices ───────────────────────────────────── */
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Option 1: Prescription */}
                <div
                  onClick={() => {
                    setDocumentHint('prescription');
                    fileInputRef.current?.click();
                  }}
                  className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group space-y-4 text-left shadow-lg hover:shadow-teal-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors flex items-center justify-between">
                      <span>📄 Upload Prescription</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        JPG / PNG / PDF
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Extracts medicines, dosages, timing instructions, clinical conditions, and doctor details.
                    </p>
                  </div>
                  <div className="text-[11px] text-teal-400 font-semibold flex items-center gap-1 pt-1">
                    <span>Select Prescription File &rarr;</span>
                  </div>
                </div>

                {/* Option 2: Medical / Lab Report */}
                <div
                  onClick={() => {
                    setDocumentHint('report');
                    fileInputRef.current?.click();
                  }}
                  className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group space-y-4 text-left shadow-lg hover:shadow-emerald-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                      <span>🧪 Upload Medical Report</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        JPG / PNG / PDF
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Extracts test results (CBC, Lipid, Diabetes, LFT, KFT, etc.), matches reference ranges, and categorizes findings.
                    </p>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                    <span>Select Lab Report File &rarr;</span>
                  </div>
                </div>
              </div>

              {/* Drag-and-Drop Area + Action Bar */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center space-y-3 ${
                  isDragOver
                    ? 'border-teal-400 bg-teal-500/10'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setDocumentHint('auto');
                      fileInputRef.current?.click();
                    }}
                    className="btn-teal text-xs py-2.5 px-4 flex items-center gap-2 shadow"
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span>Choose from Device</span>
                  </button>

                  <button
                    onClick={handleStartCamera}
                    className="btn-outline text-xs py-2.5 px-4 flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4 text-teal-400" />
                    <span>Take Photo</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-500">
                  Or drag &amp; drop your file here • Accepted: JPG, PNG, WebP, PDF (Max 25MB)
                </p>
              </div>
            </div>
          )}

          {/* ── Demo Mode Documents Section ──────────────────────────────── */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  🎬 Try Demo Documents (Pre-loaded Samples)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                  Sample Data
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Explore how the scanner classifies and analyzes different document types
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {MOCK_DOCUMENT_SESSIONS.map((session) => (
                <button
                  key={session.documentId}
                  onClick={() => onSelectDemoSession(session)}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/40 text-left transition-all group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-teal-300 transition-colors truncate">
                      {session.isPrescription ? '📄 ' : '🧪 '}
                      {session.patientInfo.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 font-mono">
                      Demo
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {session.documentTypeLabel}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>{session.pagesCount} page(s)</span>
                    <span className="text-teal-400 font-semibold group-hover:underline flex items-center gap-0.5">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      View Sample
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Privacy disclaimer */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>🔒 Your medical document is processed locally &amp; securely for this analysis session.</span>
          </div>
        </div>
      </div>

      {/* ── Camera Capture Modal ────────────────────────────────────────── */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 max-w-lg w-full space-y-4 border border-teal-500/40 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Camera className="w-5 h-5 text-teal-400" />
                <span>Camera Document Capture</span>
              </div>
              <button onClick={handleCloseCamera} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video / Snapshot container */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative flex items-center justify-center">
              {capturedPhoto ? (
                <img src={capturedPhoto} alt="Captured" className="w-full h-full object-cover" />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
              <canvas ref={canvasRef} className="hidden" />

              {/* Viewfinder guide box */}
              {!capturedPhoto && (
                <div className="absolute inset-6 border-2 border-dashed border-teal-400/60 rounded-xl pointer-events-none flex items-start justify-end p-2">
                  <span className="text-[10px] bg-slate-950/80 px-2 py-0.5 rounded text-teal-300 font-mono">
                    Align document edges
                  </span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4">
              {capturedPhoto ? (
                <>
                  <button
                    onClick={() => {
                      setCapturedPhoto(null);
                      handleStartCamera();
                    }}
                    className="btn-outline text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>

                  <button
                    onClick={handleConfirmCapturedPhoto}
                    className="btn-teal text-xs py-2 px-5 flex items-center gap-1.5 font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Use This Document</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCapturePhoto}
                  className="w-14 h-14 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/40 transition-all hover:scale-105"
                  title="Capture Photo"
                >
                  <Camera className="w-7 h-7 fill-current" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
