import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';
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
import {
  harvestAllRoutes,
  hasHarvestedFor,
  markHarvestedFor,
} from '@/utils/routeHarvester';
import { HARVEST_VERSION } from '@/utils/routeManifest';

// True when this window is the hidden harvester iframe. In that case the
// LanguageProvider must stay in source language and skip all translation work
// so the harvested DOM text reflects the original (TR) source strings.
const IS_HARVEST_FRAME =
  typeof window !== 'undefined' &&
  window.self !== window.top &&
  /[?&]_mtHarvest=1\b/.test(window.location.search);

export type LanguageChangePhase = 'idle' | 'harvest' | 'translate';

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
  isChangingLanguage: boolean;
  changeProgress: number;
  changePhase: LanguageChangePhase;
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
const SEEN_STRINGS_KEY = 'mt-seen-strings-v1';
const TRANSLATION_CACHE_MAX = 12000;
const SEEN_STRINGS_MAX = 8000;
const BULK_CONCURRENCY = 8;
const PAGE_CONCURRENCY = 6;

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [changeProgress, setChangeProgress] = useState(0);
  const [changePhase, setChangePhase] = useState<LanguageChangePhase>('idle');
  const { toast } = useToast();

  const translationCacheRef = useRef<Map<string, string>>(new Map());
  const inFlightRef = useRef<Map<string, Promise<string>>>(new Map());
  const translationRunIdRef = useRef(0);
  const observerRef = useRef<MutationObserver | null>(null);
  const pendingNodesRef = useRef<Set<Node>>(new Set());
  const flushHandleRef = useRef<number | null>(null);
  const persistHandleRef = useRef<number | null>(null);
  const originalTextRef = useRef<WeakMap<Text, string>>(new WeakMap());
  const currentLanguageRef = useRef<string>(DEFAULT_LANGUAGE);
  // After the bulk pass for a language completes we lock route-time translation
  // to cache-only: never trigger live fetches on navigation, so the user never
  // sees half-translated pages. Unseen strings stay in the source language and
  // get added to the seen-set for the next switch.
  const bulkCompletedLanguagesRef = useRef<Set<string>>(new Set());
  // Persistent registry of every source string the app has ever rendered.
  const seenStringsRef = useRef<Set<string>>(new Set());
  const seenDirtyRef = useRef(false);
  const seenPersistHandleRef = useRef<number | null>(null);

  // RTL languages
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  const isRTL = rtlLanguages.includes(currentLanguage);

  currentLanguageRef.current = currentLanguage;

  // ── Persistence helpers ────────────────────────────────────────────────────
  const loadCacheFromStorage = () => {
    try {
      const raw = localStorage.getItem(TRANSLATION_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        if (parsed && typeof parsed === 'object') {
          for (const [key, value] of Object.entries(parsed)) {
            if (typeof value === 'string') translationCacheRef.current.set(key, value);
          }
        }
      }
    } catch {
      // ignore
    }
    try {
      const rawSeen = localStorage.getItem(SEEN_STRINGS_KEY);
      if (rawSeen) {
        const arr = JSON.parse(rawSeen) as unknown;
        if (Array.isArray(arr)) {
          for (const item of arr) if (typeof item === 'string') seenStringsRef.current.add(item);
        }
      }
    } catch {
      // ignore
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
        // ignore
      }
    }, 1500);
  };

  const persistSeenSoon = () => {
    if (!seenDirtyRef.current || seenPersistHandleRef.current !== null) return;
    seenPersistHandleRef.current = window.setTimeout(() => {
      seenPersistHandleRef.current = null;
      seenDirtyRef.current = false;
      try {
        const arr: string[] = [];
        let count = 0;
        for (const s of seenStringsRef.current) {
          arr.push(s);
          if (++count >= SEEN_STRINGS_MAX) break;
        }
        localStorage.setItem(SEEN_STRINGS_KEY, JSON.stringify(arr));
      } catch {
        // ignore
      }
    }, 2500);
  };

  const recordSeen = (source: string) => {
    if (!source) return;
    if (seenStringsRef.current.has(source)) return;
    seenStringsRef.current.add(source);
    seenDirtyRef.current = true;
    persistSeenSoon();
  };

  // ── Core string translator (glossary-aware) ────────────────────────────────
  const translateText = async (
    text: string,
    languageCode: string,
    options: { allowLive?: boolean } = {}
  ): Promise<string> => {
    const { allowLive = true } = options;
    const normalizedText = normalizeSource(text);
    if (!normalizedText) return text;
    if (languageCode === SOURCE_LANGUAGE) return normalizedText;

    recordSeen(normalizedText);

    const cacheKey = `${languageCode}:${normalizedText}`;
    const cached = translationCacheRef.current.get(cacheKey);
    if (cached !== undefined) return cached;

    const staticTranslation = getStaticTranslation(normalizedText, languageCode);
    if (staticTranslation !== null) {
      translationCacheRef.current.set(cacheKey, staticTranslation);
      return staticTranslation;
    }

    const maritimeOverride = getMaritimeTranslationOverride(normalizedText, languageCode);
    if (maritimeOverride) {
      translationCacheRef.current.set(cacheKey, maritimeOverride);
      return maritimeOverride;
    }

    // After bulk completion, never live-fetch on route changes — keep source so
    // the user doesn't see a flicker / half-translated page.
    if (!allowLive || bulkCompletedLanguagesRef.current.has(languageCode)) {
      return normalizedText;
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

  // ── DOM application ────────────────────────────────────────────────────────
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

  const translateUnits = async (
    units: TranslationUnit[],
    languageCode: string,
    runId: number,
    options: { allowLive?: boolean } = {}
  ) => {
    if (units.length === 0) return;

    if (languageCode === SOURCE_LANGUAGE) {
      writeWithoutObserving(() => units.forEach((unit) => unit.apply(unit.source)));
      return;
    }

    const bySource = new Map<string, Array<(t: string) => void>>();
    for (const unit of units) {
      recordSeen(unit.source);
      const list = bySource.get(unit.source);
      if (list) list.push(unit.apply);
      else bySource.set(unit.source, [unit.apply]);
    }

    const sources = Array.from(bySource.keys());
    await runWithConcurrency(sources, PAGE_CONCURRENCY, async (source) => {
      const translated = await translateText(source, languageCode, options);
      if (translationRunIdRef.current !== runId) return;
      if (translated === source) return;
      const appliers = bySource.get(source);
      if (!appliers) return;
      writeWithoutObserving(() => appliers.forEach((apply) => apply(translated)));
    });

    persistCacheSoon();
  };

  const translateRoots = async (
    roots: Node[],
    languageCode: string,
    runId: number,
    options: { allowLive?: boolean } = {}
  ) => {
    if (typeof document === 'undefined' || !document.body) return;
    const units: TranslationUnit[] = [];
    for (const root of roots) {
      if (root.isConnected) units.push(...collectTranslationUnits(root, originalTextRef.current));
    }
    await translateUnits(units, languageCode, runId, options);
  };

  const translatePage = (
    languageCode: string,
    runId: number,
    options: { allowLive?: boolean } = {}
  ) => translateRoots([document.body], languageCode, runId, options);

  // ── Mutation observer ──────────────────────────────────────────────────────
  const flushPending = () => {
    flushHandleRef.current = null;
    const pending = pendingNodesRef.current;
    if (pending.size === 0) return;
    const roots = Array.from(pending);
    pending.clear();
    // After a language switch, route-change DOM is translated CACHE-ONLY: no
    // live fetches → no flicker, no partial pages. Unseen strings stay in
    // source language and are recorded for the next switch.
    const allowLive = !bulkCompletedLanguagesRef.current.has(currentLanguageRef.current);
    void translateRoots(roots, currentLanguageRef.current, translationRunIdRef.current, { allowLive });
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

  // ── Bulk pre-translation (the heart of "no flicker on later pages") ───────
  const runBulkTranslation = async (languageCode: string) => {
    if (languageCode === SOURCE_LANGUAGE) {
      bulkCompletedLanguagesRef.current.add(languageCode);
      return;
    }

    // 1) Seed cache from static dictionary (all entries).
    const dict = await loadStaticDictionary(languageCode);
    for (const [src, dst] of Object.entries(dict)) {
      translationCacheRef.current.set(`${languageCode}:${src}`, dst);
    }

    // 2) Also harvest the strings currently visible in the DOM (these may not
    // be in the seen-set yet on the very first language switch of a session).
    if (typeof document !== 'undefined' && document.body) {
      const units = collectTranslationUnits(document.body, originalTextRef.current);
      for (const u of units) recordSeen(u.source);
    }

    // 3) Build the master pool of source strings to translate.
    const pool: string[] = [];
    const poolSet = new Set<string>();
    for (const src of seenStringsRef.current) {
      if (!src) continue;
      const key = `${languageCode}:${src}`;
      if (translationCacheRef.current.has(key)) continue;
      if (getMaritimeTranslationOverride(src, languageCode)) continue;
      if (poolSet.has(src)) continue;
      poolSet.add(src);
      pool.push(src);
    }

    const total = pool.length;
    if (total === 0) {
      setChangeProgress(100);
      bulkCompletedLanguagesRef.current.add(languageCode);
      return;
    }

    // 4) Translate via Google in parallel; update progress.
    let done = 0;
    await runWithConcurrency(pool, BULK_CONCURRENCY, async (source) => {
      const cacheKey = `${languageCode}:${source}`;
      if (!translationCacheRef.current.has(cacheKey)) {
        try {
          const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${SOURCE_LANGUAGE}&tl=${encodeURIComponent(languageCode)}&dt=t&q=${encodeURIComponent(source)}`
          );
          const data = await response.json();
          const machine = Array.isArray(data?.[0])
            ? data[0].map((item: [string]) => item[0]).join('')
            : source;
          const corrected = applyMaritimeCorrections(machine, languageCode);
          translationCacheRef.current.set(cacheKey, corrected);
        } catch {
          // leave uncached — will fall back to source on render
        }
      }
      done += 1;
      // Throttle setState a bit to avoid render storms.
      if (done % 5 === 0 || done === total) {
        setChangeProgress(Math.min(99, Math.round((done / total) * 100)));
      }
    });

    persistCacheSoon();
    bulkCompletedLanguagesRef.current.add(languageCode);
    setChangeProgress(100);
  };

  // ── Public API ─────────────────────────────────────────────────────────────
  const changeLanguage = useCallback(async (languageCode: string) => {
    if (languageCode === currentLanguageRef.current) return;
    if (!SUPPORTED_LANGUAGES.find((lang) => lang.language === languageCode)) return;

    // Switching languages → reset the bulk-completion flag so we re-run.
    bulkCompletedLanguagesRef.current.delete(languageCode);

    setIsChangingLanguage(true);
    setChangeProgress(0);

    try {
      await runBulkTranslation(languageCode);
    } catch (error) {
      console.error('Toplu çeviri sırasında hata:', error);
    }

    localStorage.setItem('preferredLanguage', languageCode);
    setCurrentLanguage(languageCode);

    // Allow the effect-driven page pass a tick to run, then dismiss.
    window.setTimeout(() => {
      setIsChangingLanguage(false);
      const titleTr = 'Dil Değiştirildi';
      const descTr = `Uygulama dili ${getLanguageNameLocal(languageCode)} olarak değiştirildi`;
      toast({
        title: getStaticTranslation(titleTr, languageCode) ?? titleTr,
        description: getStaticTranslation(descTr, languageCode) ?? descTr,
      });
    }, 300);
  }, [toast]);

  const getLanguageNameLocal = (code: string): string =>
    SUPPORTED_LANGUAGES.find((lang) => lang.language === code)?.displayName || code;

  const getLanguageName = getLanguageNameLocal;

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

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage, isRTL]);

  useEffect(() => {
    if (typeof document === 'undefined' || isLoading) return;
    const runId = ++translationRunIdRef.current;
    const language = currentLanguage;
    ensureObserver();
    void (async () => {
      await loadStaticDictionary(language);
      if (translationRunIdRef.current !== runId) return;
      // Live fetches only allowed if we haven't yet run a bulk pass for this
      // language (e.g. first session load). After a user-initiated change,
      // bulkCompletedLanguagesRef is set → page passes stay cache-only.
      const allowLive = !bulkCompletedLanguagesRef.current.has(language);
      void translatePage(language, runId, { allowLive });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, isLoading]);

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
        if (seenPersistHandleRef.current !== null) window.clearTimeout(seenPersistHandleRef.current);
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
    isChangingLanguage,
    changeProgress,
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

// Backwards-compatible no-op utility
export const getTranslation = (key: string, defaultText: string = '', _language: string = DEFAULT_LANGUAGE) => {
  return defaultText;
};
