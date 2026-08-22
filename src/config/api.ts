/**
 * Production & Development API Configuration
 * 
 * In production (Vercel, Netlify, Cloudflare Pages, etc.), set VITE_API_URL
 * to point to your deployed FastAPI server URL (e.g., "https://swasthya-backend.onrender.com").
 * 
 * In local development, if VITE_API_URL is omitted or empty, relative URLs
 * (like "/api/health/chat") will be routed through Vite's local dev server proxy.
 */

const rawApiUrl = import.meta.env.VITE_API_URL || '';

// Clean trailing slashes for consistent URL formatting
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

export const getApiEndpoint = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};
