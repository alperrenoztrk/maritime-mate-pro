import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  getMaritimeTranslationOverride,
  applyMaritimeCorrections,
} from '@/utils/maritimeGlossary';
import {
  SOURCE_LANGUAGE,
  TranslationUnit,
  collectTranslationUnits,
  runWithConcurrency,
  normalizeSource,
} from '@/utils/pageTranslator';
import { loadStaticDictionary, getStaticTranslation } from '@/utils/staticTranslations';

interface SupportedLanguage {
  language: string;
  name: string;
  displayName: string;
}

interface LanguageContextType {
  currentLanguage: string;
  supportedLanguages: SupportedLanguage[];
  isLoading: boolean;
  changeLanguage: (languageCode: string) => void;
  getLanguageName: (code: string) => string;
  isRTL: boolean;
  resetLanguagePreferences: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const DEFAULT_LANGUAGE = 'en';

// Supported languages - 25 languages (sorted by international alphabetical order / English name)
const BASE_SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { language: 'tr', name: 'Turkish', displayName: 'Türkçe' },
  { language: 'en', name: 'English', displayName: 'English' },
  { language: 'es', name: 'Spanish', displayName: 'Español' },
  { language: 'de', name: 'German', displayName: 'Deutsch' },
  { language: 'fr', name: 'French', displayName: 'Français' },
  { language: 'it', name: 'Italian', displayName: 'Italiano' },
  { language: 'pt', name: 'Portuguese', displayName: 'Português' },
  { language: 'ru', name: 'Russian', displayName: 'Русский' },
  { language: 'ja', name: 'Japanese', displayName: '日本語' },
  { language: 'ko', name: 'Korean', displayName: '한국어' },
  { language: 'zh-CN', name: 'Chinese (Simplified)', displayName: '中文 (简体)' },
  { language: 'ar', name: 'Arabic', displayName: 'العربية' },
  { language: 'hi', name: 'Hindi', displayName: 'हिन्दी' },
  { language: 'nl', name: 'Dutch', displayName: 'Nederlands' },
  { language: 'sv', name: 'Swedish', displayName: 'Svenska' },
  { language: 'no', name: 'Norwegian', displayName: 'Norsk' },
  { language: 'da', name: 'Danish', displayName: 'Dansk' },
  { language: 'fi', name: 'Finnish', displayName: 'Suomi' },
  { language: 'pl', name: 'Polish', displayName: 'Polski' },
  { language: 'cs', name: 'Czech', displayName: 'Čeština' },
  { language: 'hu', name: 'Hungarian', displayName: 'Magyar' },
  { language: 'ro', name: 'Romanian', displayName: 'Română' },
  { language: 'el', name: 'Greek', displayName: 'Ελληνικά' },
  { language: 'bg', name: 'Bulgarian', displayName: 'Български' },
  { language: 'uk', name: 'Ukrainian', displayName: 'Українська' }
];
const SUPPORTED_LANGUAGES: SupportedLanguage[] = [...BASE_SUPPORTED_LANGUAGES].sort((a, b) =>
  a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
);

interface LanguageProviderProps {
  children: ReactNode;
}

// ── Translation engine configuration ─────────────────────────────────────────
const TRANSLATION_CACHE_KEY = 'mt-translation-cache-v1';
const TRANSLATION_CACHE_MAX = 6000;
const TRANSLATION_CONCURRENCY = 6;

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const translationCacheRef = useRef<Map<string, string>>(new Map());
  const inFlightRef = useRef<Map<string, Promise<string>>>(new Map());
  const translationRunIdRef = useRef(0);
  const observerRef = useRef<MutationObserver | null>(null);
  const pendingNodesRef = useRef<Set<Node>>(new Set());
  const flushHandleRef = useRef<number | null>(null);
  const persistHandleRef = useRef<number | null>(null);
  // Original (Turkish source) text captured per text node before translation.
  const originalTextRef = useRef<WeakMap<Text, string>>(new WeakMap());
  // Lets the long-lived observer/flush callbacks read the active language.
  const currentLanguageRef = useRef<string>(DEFAULT_LANGUAGE);

  // RTL languages
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  const isRTL = rtlLanguages.includes(currentLanguage);

  currentLanguageRef.current = currentLanguage;

  // ── Translation cache persistence ──────────────────────────────────────────
  const loadCacheFromStorage = () => {
    try {
      const raw = localStorage.getItem(TRANSLATION_CACHE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      if (!parsed || typeof parsed !== 'object') return;
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === 'string') translationCacheRef.current.set(key, value);
      }
    } catch {
      // Ignore corrupted cache.
    }
  };

  const persistCacheSoon = () => {
    if (persistHandleRef.current !== null) return;
    persistHandleRef.current = window.setTimeout(() => {
      persistHandleRef.current = null;
      try {
        const out: Record<string, string> = {};
        let count = 0;
        for (const [key, value] of translationCacheRef.current) {
          out[key] = value;
          if (++count >= TRANSLATION_CACHE_MAX) break;
        }
        localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(out));
      } catch {
        // Storage full / unavailable — keep working from the in-memory cache.
      }
    }, 2000);
  };

  // ── Core string translator (glossary-aware) ────────────────────────────────
  // 1) Exact maritime override  2) machine translation  3) inline maritime fixes
  const translateText = async (text: string, languageCode: string): Promise<string> => {
    const normalizedText = normalizeSource(text);
    if (!normalizedText) return text;
    if (languageCode === SOURCE_LANGUAGE) return normalizedText;

    const cacheKey = `${languageCode}:${normalizedText}`;
    const cached = translationCacheRef.current.get(cacheKey);
    if (cached !== undefined) return cached;

    // Build-time pre-translated static content: instant, network-free hit. The
    // dictionary is generated with the maritime override + corrections already
    // applied, so it is safe to consult before the live engine.
    const staticTranslation = getStaticTranslation(normalizedText, languageCode);
    if (staticTranslation !== null) {
      translationCacheRef.current.set(cacheKey, staticTranslation);
      return staticTranslation;
    }

    // Maritime terminology takes precedence over generic machine translation, so
    // the core nautical vocabulary is always rendered with the correct term
    // (e.g. "Sancak Tarafı" -> "Starboard side", not "Banner side").
    const maritimeOverride = getMaritimeTranslationOverride(normalizedText, languageCode);
    if (maritimeOverride) {
      translationCacheRef.current.set(cacheKey, maritimeOverride);
      return maritimeOverride;
    }

    const inFlight = inFlightRef.current.get(cacheKey);
    if (inFlight) return inFlight;

    const request = (async (): Promise<string> => {
      try {
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${SOURCE_LANGUAGE}&tl=${encodeURIComponent(languageCode)}&dt=t&q=${encodeURIComponent(normalizedText)}`
        );
        const data = await response.json();
        const machine = Array.isArray(data?.[0])
          ? data[0].map((item: [string]) => item[0]).join('')
          : normalizedText;
        // Fix maritime terms the machine engine left untranslated or rendered
        // non-maritime inside longer strings (e.g. leftover "Pruva" -> "Bow").
        const corrected = applyMaritimeCorrections(machine, languageCode);
        translationCacheRef.current.set(cacheKey, corrected);
        return corrected;
      } catch (error) {
        console.error('Metin çevirisi alınamadı:', error);
        return normalizedText;
      } finally {
        inFlightRef.current.delete(cacheKey);
      }
    })();

    inFlightRef.current.set(cacheKey, request);
    return request;
  };

  // ── Applying translations ──────────────────────────────────────────────────
  // Detach the observer while we write so our own edits don't re-enqueue work.
  const writeWithoutObserving = (write: () => void) => {
    const observer = observerRef.current;
    observer?.disconnect();
    try {
      write();
    } finally {
      if (observer && typeof document !== 'undefined' && document.body) {
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      }
    }
  };

  const translateUnits = async (units: TranslationUnit[], languageCode: string, runId: number) => {
    if (units.length === 0) return;

    // Restoring to the source language is synchronous (use captured originals).
    if (languageCode === SOURCE_LANGUAGE) {
      writeWithoutObserving(() => units.forEach((unit) => unit.apply(unit.source)));
      return;
    }

    const bySource = new Map<string, Array<(t: string) => void>>();
    for (const unit of units) {
      const list = bySource.get(unit.source);
      if (list) list.push(unit.apply);
      else bySource.set(unit.source, [unit.apply]);
    }

    const sources = Array.from(bySource.keys());
    await runWithConcurrency(sources, TRANSLATION_CONCURRENCY, async (source) => {
      const translated = await translateText(source, languageCode);
      if (translationRunIdRef.current !== runId) return;
      if (translated === source) return;
      const appliers = bySource.get(source);
      if (!appliers) return;
      // Progressive: update each string's nodes as soon as it resolves.
      writeWithoutObserving(() => appliers.forEach((apply) => apply(translated)));
    });

    persistCacheSoon();
  };

  const translateRoots = async (roots: Node[], languageCode: string, runId: number) => {
    if (typeof document === 'undefined' || !document.body) return;
    const units: TranslationUnit[] = [];
    for (const root of roots) {
      if (root.isConnected) units.push(...collectTranslationUnits(root, originalTextRef.current));
    }
    await translateUnits(units, languageCode, runId);
  };

  const translatePage = (languageCode: string, runId: number) =>
    translateRoots([document.body], languageCode, runId);

  // ── Mutation observer (handles route changes & dynamic content) ────────────
  const flushPending = () => {
    flushHandleRef.current = null;
    const pending = pendingNodesRef.current;
    if (pending.size === 0) return;
    const roots = Array.from(pending);
    pending.clear();
    void translateRoots(roots, currentLanguageRef.current, translationRunIdRef.current);
  };

  const scheduleFlush = () => {
    if (flushHandleRef.current !== null) return;
    const schedule = (cb: FrameRequestCallback): number =>
      typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function'
        ? window.requestAnimationFrame(cb)
        : window.setTimeout(() => cb(performance.now()), 50);
    flushHandleRef.current = schedule(() => flushPending());
  };

  const ensureObserver = () => {
    if (typeof document === 'undefined' || !document.body || observerRef.current) return;
    const observer = new MutationObserver((mutations) => {
      const pending = pendingNodesRef.current;
      for (const mutation of mutations) {
        if (mutation.type === 'characterData' && mutation.target.nodeType === Node.TEXT_NODE) {
          const textNode = mutation.target as Text;
          // External (React) change to source text: refresh the captured origin.
          originalTextRef.current.set(textNode, textNode.nodeValue ?? '');
          pending.add(textNode);
        } else if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((added) => pending.add(added));
        }
      }
      if (pending.size > 0) scheduleFlush();
    });
    observerRef.current = observer;
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  };

  // ── Public API ─────────────────────────────────────────────────────────────
  const changeLanguage = (languageCode: string) => {
    if (languageCode === currentLanguage) return;
    if (!SUPPORTED_LANGUAGES.find((lang) => lang.language === languageCode)) return;

    setCurrentLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);

    // Pre-load the static dictionary for the new language so toast strings can
    // be translated instantly instead of waiting for the live translator.
    void loadStaticDictionary(languageCode).then(() => {
      const titleTr = 'Dil Değiştirildi';
      const descTr  = `Uygulama dili ${getLanguageName(languageCode)} olarak değiştirildi`;
      toast({
        title: getStaticTranslation(titleTr, languageCode) ?? titleTr,
        description: getStaticTranslation(descTr, languageCode) ?? descTr,
      });
    });
  };

  const getLanguageName = (code: string): string =>
    SUPPORTED_LANGUAGES.find((lang) => lang.language === code)?.displayName || code;

  const resetLanguagePreferences = () => {
    localStorage.removeItem('preferredLanguage');
    setCurrentLanguage(DEFAULT_LANGUAGE);

    const titleTr = 'Ayarlar Sıfırlandı';
    const descTr  = 'Dil ayarları varsayılan değerlere döndürüldü';
    toast({
      title: getStaticTranslation(titleTr, DEFAULT_LANGUAGE) ?? titleTr,
      description: getStaticTranslation(descTr, DEFAULT_LANGUAGE) ?? descTr,
    });
  };

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    loadCacheFromStorage();
    const savedLanguage = localStorage.getItem('preferredLanguage') || DEFAULT_LANGUAGE;
    const validLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.language === savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE;

    setCurrentLanguage(validLanguage);
    setIsLoading(false);
  }, []);

  // Keep document language/direction in sync.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage, isRTL]);

  // Translate the whole app whenever the language changes, and observe the DOM
  // so dynamically rendered content (route changes, lazy data) is translated too.
  useEffect(() => {
    if (typeof document === 'undefined' || isLoading) return;
    const runId = ++translationRunIdRef.current;
    const language = currentLanguage;
    ensureObserver();
    // Load the build-time static dictionary FIRST so the bulk of the content is
    // served instantly from it (no network), then run the full translation pass.
    // The dictionary is a same-origin, SW-cached asset, so this is fast. If it is
    // missing/empty the pass simply falls back to the live translator.
    void (async () => {
      await loadStaticDictionary(language);
      if (translationRunIdRef.current === runId) void translatePage(language, runId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, isLoading]);

  // Tear down on unmount.
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (typeof window !== 'undefined') {
        if (flushHandleRef.current !== null) {
          window.cancelAnimationFrame?.(flushHandleRef.current);
          window.clearTimeout(flushHandleRef.current);
        }
        if (persistHandleRef.current !== null) window.clearTimeout(persistHandleRef.current);
      }
    };
  }, []);

  const contextValue: LanguageContextType = {
    currentLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isLoading,
    changeLanguage,
    getLanguageName,
    isRTL,
    resetLanguagePreferences,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Simple translation utility (no hooks, no re-renders)
// This is kept for backwards compatibility but doesn't use the API
export const getTranslation = (key: string, defaultText: string = '', language: string = DEFAULT_LANGUAGE) => {
  return defaultText;
};
