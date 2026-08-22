import { useState } from 'react';
import type { MedicalDocumentSession, OCRBoundingBox } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  EyeOff,
  Layers,
} from 'lucide-react';

interface DocumentViewerModalProps {
  session: MedicalDocumentSession;
  activeBoundingBoxId?: string | null;
  onClose?: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  session,
  activeBoundingBoxId,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showBoxes, setShowBoxes] = useState(true);

  const totalPages = session.pages.length || 1;
  const currentPageData = session.pages[currentPageIndex] || {
    pageNumber: 1,
    rawText: session.rawOcrText,
    boundingBoxes: [],
  };

  // Fallback image url if page dataUrl is missing
  const pageImageSrc =
    currentPageData.dataUrl ||
    session.previewUrl ||
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80';

  // Get all bounding boxes for current page
  const pageBoxes = currentPageData.boundingBoxes.length > 0
    ? currentPageData.boundingBoxes
    : (session.medicines.flatMap((m) => m.boundingBox ? [m.boundingBox] : [])
        .concat(session.testResults.flatMap((t) => t.boundingBox ? [t.boundingBox] : []))
        .filter((b) => b.page === currentPageIndex + 1));

  const handlePrevPage = () => {
    if (currentPageIndex > 0) setCurrentPageIndex((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) setCurrentPageIndex((prev) => prev + 1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50));
  };

  const getBoxStyles = (box: OCRBoundingBox) => {
    const isTarget = activeBoundingBoxId === box.id;
    if (isTarget) {
      return 'border-2 border-teal-300 bg-teal-400/30 ring-4 ring-teal-400/40 animate-pulse z-20';
    }
    if (box.type === 'warning') {
      return 'border-2 border-amber-400 bg-amber-400/15 text-amber-300';
    }
    if (box.type === 'medicine') {
      return 'border-2 border-teal-400 bg-teal-400/15 text-teal-300';
    }
    if (box.type === 'test') {
      return 'border-2 border-emerald-400 bg-emerald-400/15 text-emerald-300';
    }
    return 'border-2 border-cyan-400 bg-cyan-400/10 text-cyan-300';
  };

  return (
    <div className="space-y-4">
      {/* ── Toolbar Controls ──────────────────────────────────────────────── */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Page Navigator */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold text-white px-2">
            Page {currentPageIndex + 1} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPageIndex === totalPages - 1}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom & Overlay Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle Bounding Boxes */}
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
              showBoxes
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {showBoxes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showBoxes ? 'OCR Boxes: ON' : 'OCR Boxes: OFF'}</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
            <button
              onClick={handleZoomOut}
              className="p-1 text-slate-400 hover:text-slate-200"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 w-12 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 text-slate-400 hover:text-slate-200"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-1 text-slate-400 hover:text-slate-200 ml-1"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Document Viewport ────────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-auto max-h-[600px] flex items-center justify-center relative select-none">
        <div
          className="relative transition-transform duration-200 shadow-2xl rounded-lg overflow-hidden border border-slate-800 bg-slate-900"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Main Document Image */}
          <img
            src={pageImageSrc}
            alt={`Page ${currentPageIndex + 1}`}
            className="max-w-full md:max-w-2xl h-auto object-contain block filter contrast-105"
          />

          {/* OCR Bounding Boxes Overlay */}
          {showBoxes && pageBoxes.map((box) => (
            <div
              key={box.id}
              className={`absolute rounded transition-all duration-200 flex items-start justify-end p-1 pointer-events-auto group ${getBoxStyles(box)}`}
              style={{
                left: `${box.x}%`,
                top: `${box.y}%`,
                width: `${box.width}%`,
                height: `${box.height}%`,
              }}
            >
              <span className="text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-slate-950/90 backdrop-blur shadow whitespace-nowrap opacity-90 group-hover:opacity-100">
                {box.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-2">
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-teal-400" />
          <span>Showing Page {currentPageIndex + 1} with {pageBoxes.length} detected OCR regions</span>
        </span>
        <span className="font-mono text-[11px] text-slate-500">
          Confidence: {(session.overallConfidence * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
};
