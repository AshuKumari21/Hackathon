/**
 * Locale mapping for SpeechSynthesis and SpeechRecognition BCP-47 tags
 */
export const LOCALE_MAP: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  pa: 'pa-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  or: 'or-IN',
  as: 'as-IN',
  bho: 'hi-IN',
  ur: 'ur-IN',
  hinglish: 'hi-IN',
  tanglish: 'ta-IN',
  tenglish: 'te-IN',
  benglish: 'bn-IN',
  manglish: 'ml-IN',
};

/**
 * Detect language from text content based on Unicode script ranges
 */
export function detectLanguageFromText(text: string, defaultLang: string = 'en'): string {
  if (!text || typeof text !== 'string') return defaultLang;

  // Bengali / Assamese
  if (/[\u0980-\u09FF]/.test(text)) {
    // Check for Assamese specific characters if any (ৰ, ৱ)
    if (/[\u09F0\u09F1]/.test(text)) return 'as';
    return 'bn';
  }
  // Devanagari (Hindi / Marathi / Bhojpuri)
  if (/[\u0900-\u097F]/.test(text)) {
    if (defaultLang === 'mr' || defaultLang === 'bho') return defaultLang;
    return 'hi';
  }
  // Tamil
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
  // Telugu
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
  // Kannada
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';
  // Malayalam
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml';
  // Gurmukhi (Punjabi)
  if (/[\u0A00-\u0A7F]/.test(text)) return 'pa';
  // Gujarati
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
  // Odia
  if (/[\u0B00-\u0B7F]/.test(text)) return 'or';
  // Urdu (Arabic script)
  if (/[\u0600-\u06FF]/.test(text)) return 'ur';

  return defaultLang;
}

/**
 * Get BCP-47 locale tag for a language code
 */
export function getLocaleForLanguage(lang: string): string {
  return LOCALE_MAP[lang] || LOCALE_MAP[lang.toLowerCase()] || 'en-IN';
}

/**
 * Clean markdown and emojis for clean, fluent Text-To-Speech pronunciation
 */
export function cleanTextForSpeech(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // Remove markdown URLs [text](url) -> text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove markdown bold / italic markers (**bold** -> bold, *italic* -> italic)
  cleaned = cleaned.replace(/[*_#`~]+/g, ' ');

  // Remove common medical / UI emojis so the synthesizer doesn't say emoji unicode descriptions
  cleaned = cleaned.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}🩺📌💡❓🚨⚠️💊📋👤🏥✓•]/gu, ' ');

  // Clean double colons and extra punctuation
  cleaned = cleaned.replace(/:\s*:/g, ':');

  // Replace multiple newlines or tabs with a single space
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

/**
 * Keywords to help match browser voices for Indian languages
 */
const VOICE_NAME_KEYWORDS: Record<string, string[]> = {
  hi: ['hindi', 'हिन्दी', 'hemant', 'kalpana', 'swara', 'madhur', 'hi-in', 'hi_in'],
  bn: ['bengali', 'bangla', 'বাংলা', 'bashkar', 'tanishaa', 'bn-in', 'bn-bd', 'bn_in'],
  ta: ['tamil', 'தமிழ்', 'valluvar', 'pallavi', 'ta-in', 'ta-lk', 'ta_in'],
  te: ['telugu', 'తెలుగు', 'mohan', 'chitra', 'te-in', 'te_in'],
  mr: ['marathi', 'मराठी', 'manohar', 'aarohi', 'mr-in', 'mr_in'],
  gu: ['gujarati', 'ગુજરાતી', 'niranjan', 'dhwani', 'gu-in', 'gu_in'],
  kn: ['kannada', 'ಕನ್ನಡ', 'gagan', 'sapna', 'kn-in', 'kn_in'],
  ml: ['malayalam', 'മലയാളം', 'midhun', 'sobhana', 'ml-in', 'ml_in'],
  pa: ['punjabi', 'ਪੰਜਾਬੀ', 'ojas', 'gurpreet', 'pa-in', 'pa_in'],
  or: ['odia', 'oriya', 'ଓଡ଼ିଆ', 'or-in', 'or_in'],
  as: ['assamese', 'অসমীয়া', 'as-in', 'as_in'],
  ur: ['urdu', 'اردو', 'salman', 'gul', 'ur-in', 'ur-pk', 'ur_in'],
  bho: ['bhojpuri', 'hindi', 'हिन्दी', 'hi-in'],
  en: ['india', 'indian', 'en-in', 'en_in', 'english', 'natural']
};

/**
 * Find the most suitable voice from available browser voices for a target language
 */
export function findBestVoiceForLanguage(
  targetLang: string,
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  const targetLocale = getLocaleForLanguage(targetLang).toLowerCase();
  const baseLang = targetLang.split('-')[0].toLowerCase();
  const keywords = VOICE_NAME_KEYWORDS[baseLang] || [baseLang];

  // 1. Exact locale match (e.g. 'bn-IN' or 'hi-IN')
  const exactMatch = voices.find(
    (v) => v.lang.toLowerCase().replace('_', '-') === targetLocale
  );
  if (exactMatch) return exactMatch;

  // 2. Starts with base language code (e.g. 'bn', 'hi', 'ta')
  const langPrefixMatch = voices.find((v) => {
    const vLang = v.lang.toLowerCase().replace('_', '-');
    return vLang.startsWith(baseLang);
  });
  if (langPrefixMatch) return langPrefixMatch;

  // 3. Name or Lang keyword matching (e.g. name contains "Bengali" or "Bangla")
  const keywordMatch = voices.find((v) => {
    const nameLower = v.name.toLowerCase();
    const langLower = v.lang.toLowerCase();
    return keywords.some((k) => nameLower.includes(k) || langLower.includes(k));
  });
  if (keywordMatch) return keywordMatch;

  return null;
}

export interface PlaySpeechOptions {
  language?: string;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

/**
 * Master Cross-Browser Text-To-Speech Synthesizer with Dialect/Language Precision
 */
export function speakTextCrossBrowser(
  text: string,
  options: PlaySpeechOptions = {}
): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[TTS] Web Speech API is not supported in this browser.');
    options.onError?.('SpeechSynthesis not supported');
    return () => {};
  }

  // Cancel any currently playing speech first
  window.speechSynthesis.cancel();

  // Detect appropriate language if not explicitly provided or if mixed
  const targetLang = options.language || detectLanguageFromText(text);
  const locale = getLocaleForLanguage(targetLang);
  const speechText = cleanTextForSpeech(text);

  if (!speechText) {
    options.onEnd?.();
    return () => {};
  }

  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.lang = locale;
  utterance.rate = options.rate ?? 0.95; // Natural cadence for clinical comprehension
  utterance.pitch = options.pitch ?? 1.0;

  // Keep-alive timer for Chromium's long utterance freeze bug
  let keepAliveTimer: any = null;

  const cleanup = () => {
    if (keepAliveTimer) {
      clearInterval(keepAliveTimer);
      keepAliveTimer = null;
    }
  };

  utterance.onstart = () => {
    console.log(`[TTS] Speaking in '${targetLang}' (${locale}) using voice: ${utterance.voice?.name || 'Default'}`);
    options.onStart?.();

    // Chrome workaround: resume every 10 seconds to prevent auto-pause on long texts
    keepAliveTimer = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
  };

  utterance.onend = () => {
    cleanup();
    options.onEnd?.();
  };

  utterance.onerror = (e) => {
    cleanup();
    // Don't report error if speech was cancelled by user
    if (e.error !== 'canceled' && e.error !== 'interrupted') {
      console.error('[TTS] Speech error:', e);
      options.onError?.(e);
    } else {
      options.onEnd?.();
    }
  };

  const executeSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = findBestVoiceForLanguage(targetLang, voices);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  // If voices are already loaded, speak immediately
  const availableVoices = window.speechSynthesis.getVoices();
  if (availableVoices && availableVoices.length > 0) {
    executeSpeak();
  } else {
    // Wait for voices to load asynchronously
    const onVoicesChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      executeSpeak();
    };
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    // Fallback trigger if voiceschanged doesn't fire promptly
    setTimeout(() => {
      if (!window.speechSynthesis.speaking) {
        executeSpeak();
      }
    }, 100);
  }

  // Return cancel/stop function
  return () => {
    cleanup();
    window.speechSynthesis.cancel();
    options.onEnd?.();
  };
}

/**
 * Stop any current speech playback immediately
 */
export function stopAllSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
