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
  buildTranslationBatches,
  splitBatchResult,
  BATCH_SEPARATOR,
} from '@/utils/pageTranslator';
import {
  loadStaticDictionary,
  getStaticTranslation,
  isDictionaryComplete,
  releaseDictionariesExcept,
} from '@/utils/staticTranslations';
import {
  HARVEST_MESSAGE_TYPE,
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

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [changeProgress, setChangeProgress] = useState(0);
  const [changePhase, setChangePhase] = useState<LanguageChangePhase>('idle');
  const { toast } = useToast();

  const translationCacheRef = useRef<Map<string, string>>(new Map());
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
  // Resolves a source string without any network access: cache → static
  // dictionary → curated maritime override. Returns undefined when only a live
  // fetch could translate it. Caches static/override hits for next time.
  const resolveLocally = (normalizedText: string, languageCode: string): string | undefined => {
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

    return undefined;
  };

  // Translates a batch of source strings in a single network round-trip. On any
  // failure (or a response that can't be split back to the batch shape) it falls
  // back to translating each source on its own so a single bad string never
  // poisons the whole batch.
  const fetchTranslationBatch = async (
    batch: string[],
    languageCode: string
  ): Promise<Map<string, string>> => {
    const out = new Map<string, string>();
    const query = batch.join(BATCH_SEPARATOR);
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${SOURCE_LANGUAGE}&tl=${encodeURIComponent(languageCode)}&dt=t&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (!Array.isArray(data?.[0])) throw new Error('unexpected response');
      const joined = data[0].map((item: [string]) => item[0] ?? '').join('');
      const parts = splitBatchResult(joined, batch.length);
      if (parts) {
        batch.forEach((source, i) => {
          out.set(source, applyMaritimeCorrections(parts[i].trim(), languageCode));
        });
        return out;
      }
    } catch {
      // fall through to per-string fallback below
    }

    if (batch.length === 1) return out; // single failed → leave unset (keep source)

    await runWithConcurrency(batch, BULK_CONCURRENCY, async (source) => {
      const single = await fetchTranslationBatch([source], languageCode);
      const value = single.get(source);
      if (value !== undefined) out.set(source, value);
    });
    return out;
  };

  // Translates many source strings, packing them into as few network requests as
  // possible. Returns source → translated for every string that resolved.
  const networkTranslateMany = async (
    sources: string[],
    languageCode: string,
    onResolved?: (count: number) => void
  ): Promise<Map<string, string>> => {
    const result = new Map<string, string>();
    const unique = Array.from(new Set(sources));
    const batches = buildTranslationBatches(unique);
    await runWithConcurrency(batches, BULK_CONCURRENCY, async (batch) => {
      const translated = await fetchTranslationBatch(batch, languageCode);
      for (const [source, value] of translated) result.set(source, value);
      onResolved?.(batch.length);
    });
    return result;
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

    const { allowLive = true } = options;

    const bySource = new Map<string, Array<(t: string) => void>>();
    for (const unit of units) {
      recordSeen(unit.source);
      const list = bySource.get(unit.source);
      if (list) list.push(unit.apply);
      else bySource.set(unit.source, [unit.apply]);
    }

    const applyTranslation = (source: string, translated: string) => {
      if (translated === source) return;
      const appliers = bySource.get(source);
      if (!appliers) return;
      writeWithoutObserving(() => appliers.forEach((apply) => apply(translated)));
    };

    // 1) Apply everything we can resolve without the network right away. This is
    // synchronous, so cached/static/glossary text never flickers.
    const networkSources: string[] = [];
    const canLiveFetch = allowLive && !bulkCompletedLanguagesRef.current.has(languageCode);
    for (const source of bySource.keys()) {
      const local = resolveLocally(source, languageCode);
      if (local !== undefined) {
        applyTranslation(source, local);
      } else if (canLiveFetch) {
        networkSources.push(source);
      }
      // else: leave in source language (cache-only mode after a bulk pass).
    }

    // 2) Translate the remainder in as few batched requests as possible.
    if (networkSources.length > 0) {
      const translations = await networkTranslateMany(networkSources, languageCode);
      if (translationRunIdRef.current !== runId) return;
      for (const [source, translated] of translations) {
        translationCacheRef.current.set(`${languageCode}:${source}`, translated);
        applyTranslation(source, translated);
      }
    }

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

  // ── Language activation ──────────────────────────────────────────────────
  // Fast path: when a language ships a COMPLETE static pack (generated from the
  // full extracted corpus and flagged `__complete` — see scripts/i18n/* + the
  // precached public/locales/*.json), switching just loads that pack — instant
  // and fully offline — and the page pass resolves every string from it. No
  // route harvest, no live machine translation.
  //
  // Fallback path: when the pack is partial/UI-only (the default shipped today)
  // or failed to load, we run the harvest + live gtx flow so the WHOLE app gets
  // translated — not just the interface strings the small pack happens to cover.
  const runBulkTranslation = async (languageCode: string) => {
    if (languageCode === SOURCE_LANGUAGE) {
      bulkCompletedLanguagesRef.current.add(languageCode);
      return;
    }

    // Load the (precached) pack first — resolves instantly from cache, offline.
    setChangePhase('translate');
    setChangeProgress(0);
    const dict = await loadStaticDictionary(languageCode);

    if (isDictionaryComplete(languageCode)) {
      // The pack covers the whole app: nothing to fetch, nothing to harvest.
      // Free other languages' (large) packs to cap memory; the files remain in
      // the PWA precache so a later switch re-loads instantly.
      releaseDictionariesExcept([languageCode]);
      bulkCompletedLanguagesRef.current.add(languageCode);
      setChangeProgress(100);
      return;
    }

    // ── Fallback: legacy harvest + live translation (no complete pack) ───────
    // 0) Off-screen harvest of every route's source text (once per language).
    // This guarantees that the seen-set covers the whole app, so that when
    // the user later navigates to a page they never visited before, all of
    // its text is already in the cache — no flicker, no missing translations.
    const needsHarvest = !hasHarvestedFor(languageCode, HARVEST_VERSION);
    if (needsHarvest) {
      setChangePhase('harvest');
      setChangeProgress(0);
      try {
        const harvested = await harvestAllRoutes({
          onProgress: (done, total) => {
            if (total > 0) setChangeProgress(Math.min(50, Math.round((done / total) * 50)));
          },
        });
        for (const src of harvested) recordSeen(src);
        markHarvestedFor(languageCode, HARVEST_VERSION);
      } catch (error) {
        console.warn('Route harvest sırasında hata:', error);
      }
    }

    setChangePhase('translate');
    const progressFloor = needsHarvest ? 50 : 0;
    const progressSpan = needsHarvest ? 50 : 100;
    setChangeProgress(progressFloor);

    // 1) Seed cache from whatever partial static dictionary loaded above.
    for (const [src, dst] of Object.entries(dict)) {
      translationCacheRef.current.set(`${languageCode}:${src}`, dst);
    }

    // 2) Also harvest the strings currently visible in the DOM.
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

    // 4) Translate via Google in as few batched requests as possible; update
    // progress as each batch resolves. Strings left untranslated (network
    // failures) stay uncached and fall back to source on render.
    let done = 0;
    const translations = await networkTranslateMany(pool, languageCode, (count) => {
      done += count;
      setChangeProgress(
        Math.min(99, progressFloor + Math.round((done / total) * progressSpan)),
      );
    });
    for (const [source, value] of translations) {
      translationCacheRef.current.set(`${languageCode}:${source}`, value);
    }

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
      setChangePhase('idle');
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
    if (IS_HARVEST_FRAME) {
      // Inside the hidden harvester iframe: force source language, no caches,
      // no observers, no translation passes. The parent window harvests the
      // raw DOM text from this frame.
      setCurrentLanguage(SOURCE_LANGUAGE);
      setIsLoading(false);
      return;
    }
    loadCacheFromStorage();
    const savedLanguage = localStorage.getItem('preferredLanguage') || DEFAULT_LANGUAGE;
    const validLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.language === savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE;

    setCurrentLanguage(validLanguage);
    setIsLoading(false);
  }, []);

  // Inside the harvest iframe: wait until the DOM has been quiet for a short
  // window (≥ QUIET_MS with no mutations), then sweep source strings and
  // postMessage them to the parent harvester. A hard cap ensures we always
  // report something even if the page mutates continuously.
  useEffect(() => {
    if (!IS_HARVEST_FRAME) return;
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const QUIET_MS = 800;
    const HARD_CAP_MS = 8000;
    const pathname = window.location.pathname;
    let quietTimer: number | null = null;
    let reported = false;

    const report = () => {
      if (reported) return;
      reported = true;
      try {
        const units = collectTranslationUnits(
          document.body,
          new WeakMap<Text, string>(),
        );
        const sources: string[] = [];
        const seen = new Set<string>();
        for (const u of units) {
          if (!u.source || seen.has(u.source)) continue;
          seen.add(u.source);
          sources.push(u.source);
        }
        window.parent?.postMessage(
          { type: HARVEST_MESSAGE_TYPE, pathname, sources },
          '*',
        );
      } catch {
        window.parent?.postMessage(
          { type: HARVEST_MESSAGE_TYPE, pathname, sources: [] },
          '*',
        );
      }
    };

    const scheduleQuiet = () => {
      if (quietTimer !== null) window.clearTimeout(quietTimer);
      quietTimer = window.setTimeout(report, QUIET_MS);
    };

    const observer = new MutationObserver(() => scheduleQuiet());
    const start = () => {
      if (!document.body) return;
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      scheduleQuiet();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
      start();
    }

    const hardStop = window.setTimeout(report, HARD_CAP_MS);

    return () => {
      observer.disconnect();
      if (quietTimer !== null) window.clearTimeout(quietTimer);
      window.clearTimeout(hardStop);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage, isRTL]);

  useEffect(() => {
    if (IS_HARVEST_FRAME) return;
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
    changePhase,
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
