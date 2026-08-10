import React, { useState, useEffect, ReactNode, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  getMaritimeTranslationOverride,
  applyMaritimeCorrections,
} from '@/utils/maritimeGlossary';
import { normalizeMachineTranslation } from '@/utils/translationQuality';
import { maskTechnicalTokens, unmaskTechnicalTokens } from '@/utils/technicalText';
import {
  SOURCE_LANGUAGE,
  TranslationUnit,
  collectTranslationUnits,
  runWithConcurrency,
  normalizeSource,
  buildTranslationBatches,
  splitBatchResult,
  BATCH_SEPARATOR,
  isNoTranslateZone,
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
import {
  ROUTE_TRANSLATION_MAX_WAIT_MS,
  settleWithDeadline,
} from '@/utils/routeTranslation';
import {
  LanguageContext,
  type LanguageChangePhase,
  type LanguageContextValue,
  type SupportedLanguage,
} from './language-context';

// True when this window is the hidden harvester iframe. In that case the
// LanguageProvider must stay in source language and skip all translation work
// so the harvested DOM text reflects the original (TR) source strings.
const IS_HARVEST_FRAME =
  typeof window !== 'undefined' &&
  window.self !== window.top &&
  /[?&]_mtHarvest=1\b/.test(window.location.search);

const DEFAULT_LANGUAGE = 'en';
const TRANSLATION_PENDING_ATTR = 'data-mt-translation-pending';
const ROUTE_TRANSLATION_PENDING_SELECTOR = '[data-mt-route-pending]';

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

interface RouteTranslationTask {
  root: HTMLElement;
  promise: Promise<void>;
}

const getSavedLanguage = (): string => {
  if (IS_HARVEST_FRAME) return SOURCE_LANGUAGE;
  try {
    const savedLanguage = localStorage.getItem('preferredLanguage') || DEFAULT_LANGUAGE;
    return BASE_SUPPORTED_LANGUAGES.some((lang) => lang.language === savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

// ── Translation engine configuration ─────────────────────────────────────────
// v2: cache version bumped when the contextual glossary/correction layer was
// activated, so clients drop previously cached mistranslations (e.g. "Üstü:"
// rendered as "Above:") instead of serving them forever from localStorage.
const TRANSLATION_CACHE_KEY = 'mt-translation-cache-v2';
const SEEN_STRINGS_KEY = 'mt-seen-strings-v1';
const TRANSLATION_CACHE_MAX = 12000;
const SEEN_STRINGS_MAX = 8000;
const BULK_CONCURRENCY = 4;
const LIVE_TRANSLATION_TIMEOUT_MS = 2_000;
const LIVE_TRANSLATION_FAILURE_COOLDOWN_MS = 30_000;
const PENDING_VISIBILITY_MAX_MS = 2_500;
const MAX_SINGLE_REQUEST_FALLBACKS = 6;
const MAX_LIVE_SOURCES_PER_PASS = 96;

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Resolve the persisted language during the first render. Waiting for an
  // effect used to render one frame in the default language before switching,
  // which also started the wrong dictionary load on slower mobile devices.
  const [currentLanguage, setCurrentLanguage] = useState<string>(getSavedLanguage);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [changeProgress, setChangeProgress] = useState(0);
  const [changePhase, setChangePhase] = useState<LanguageChangePhase>('idle');
  const [readyRouteTranslation, setReadyRouteTranslation] = useState<string | null>(null);
  const { toast } = useToast();

  const translationCacheRef = useRef<Map<string, string>>(new Map());
  const translationRunIdRef = useRef(0);
  const observerRef = useRef<MutationObserver | null>(null);
  const pendingNodesRef = useRef<Set<Node>>(new Set());
  const pendingVisibilityRef = useRef<Map<HTMLElement, number>>(new Map());
  const pendingVisibilityTimersRef = useRef<Map<HTMLElement, number>>(new Map());
  const pendingVisibilityVersionRef = useRef(0);
  const flushHandleRef = useRef<number | null>(null);
  const persistHandleRef = useRef<number | null>(null);
  const originalTextRef = useRef<WeakMap<Text, string>>(new WeakMap());
  const currentLanguageRef = useRef<string>(currentLanguage);
  const translateRootsRef = useRef<(
    roots: Node[],
    languageCode: string,
    runId: number,
    options?: { allowLive?: boolean },
  ) => Promise<void>>(async () => undefined);
  const routeTranslationPromisesRef = useRef<Map<string, RouteTranslationTask>>(new Map());
  const latestRouteTranslationTokenRef = useRef<string | null>(null);
  const liveTranslationPausedUntilRef = useRef(0);
  // Tracks languages whose upfront bulk pass has already run. Shipped locale
  // packs contain the authored application corpus (UI + lessons/articles), so
  // route translation resolves locally after the selected pack loads. Live
  // translation remains a bounded fallback only for genuinely dynamic strings.
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
            if (typeof value === 'string') rememberRuntimeTranslation(key, value);
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
          for (const item of arr) {
            if (seenStringsRef.current.size >= SEEN_STRINGS_MAX) break;
            if (typeof item === 'string') seenStringsRef.current.add(item);
          }
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
    if (seenStringsRef.current.size >= SEEN_STRINGS_MAX) return;
    seenStringsRef.current.add(source);
    seenDirtyRef.current = true;
    persistSeenSoon();
  };

  const rememberRuntimeTranslation = (key: string, value: string) => {
    const cache = translationCacheRef.current;
    if (cache.has(key)) cache.delete(key);
    cache.set(key, value);
    while (cache.size > TRANSLATION_CACHE_MAX) {
      const oldest = cache.keys().next().value as string | undefined;
      if (!oldest) break;
      cache.delete(oldest);
    }
  };

  // ── Core string translator (glossary-aware) ────────────────────────────────
  // Resolves a source string without any network access: curated
  // contextual/maritime override → static dictionary → cache. Returns undefined
  // when only a live fetch could translate it. Static/override values are not
  // copied into the runtime map: those stores already cache them, and duplicating
  // thousands of large lesson strings was a major source of mobile heap growth.
  //
  // The curated override is consulted BEFORE the shipped dictionary (matching
  // the build-time precedence documented in scripts/i18n/README.md) so that a
  // context-aware correction — e.g. the crew-hierarchy label "Üstü:" =
  // "Reports to:", not the spatial "Above:" — can never be masked by a stale
  // machine translation baked into public/locales/*.json. The runtime cache is
  // consulted LAST for the same reason: it may hold a generic live (gtx)
  // translation persisted before the pack/glossary covered the string, and that
  // must never shadow the curated result.
  const resolveLocally = (normalizedText: string, languageCode: string): string | undefined => {
    const cacheKey = `${languageCode}:${normalizedText}`;

    const maritimeOverride = getMaritimeTranslationOverride(normalizedText, languageCode);
    if (maritimeOverride) {
      // Override matching tolerates a trailing colon on the source label
      // ("Dümen:" matches the "Dümen" term) — keep that colon on the output so
      // "<label>: <value>" layouts stay intact.
      const withPunctuation =
        /:$/.test(normalizedText) && !/:$/.test(maritimeOverride)
          ? `${maritimeOverride}:`
          : maritimeOverride;
      return withPunctuation;
    }

    const staticTranslation = getStaticTranslation(normalizedText, languageCode);
    if (staticTranslation !== null) {
      return staticTranslation;
    }

    return translationCacheRef.current.get(cacheKey);
  };

  // Translates a batch of source strings in one bounded network round-trip.
  // Network/HTTP failures open a short circuit breaker: without it, every
  // route, the MutationObserver and the route gate could all retry the same
  // unavailable service and build an ever-growing request queue. A malformed
  // multi-result may use a small per-string fallback, but never an unbounded
  // fan-out across a large lesson page.
  const fetchTranslationBatch = async (
    batch: string[],
    languageCode: string
  ): Promise<Map<string, string>> => {
    const out = new Map<string, string>();
    if (Date.now() < liveTranslationPausedUntilRef.current) return out;

    // Protect math function names ("atan2", "cosφ") from the engine before the
    // request; they are restored verbatim in the response.
    const masks = batch.map((source) => maskTechnicalTokens(source));
    const query = batch.map((source, i) => masks[i]?.masked ?? source).join(BATCH_SEPARATOR);
    const controller = typeof AbortController === 'undefined' ? null : new AbortController();
    const timeout = controller
      ? globalThis.setTimeout(() => controller.abort(), LIVE_TRANSLATION_TIMEOUT_MS)
      : null;
    let parts: string[] | null = null;
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${SOURCE_LANGUAGE}&tl=${encodeURIComponent(languageCode)}&dt=t&q=${encodeURIComponent(query)}`,
        { signal: controller?.signal },
      );
      if (!response.ok) throw new Error(`translation HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data?.[0])) throw new Error('unexpected response');
      const joined = data[0].map((item: [string]) => item[0] ?? '').join('');
      parts = splitBatchResult(joined, batch.length);
    } catch {
      liveTranslationPausedUntilRef.current = Date.now() + LIVE_TRANSLATION_FAILURE_COOLDOWN_MS;
      return out;
    } finally {
      if (timeout !== null) globalThis.clearTimeout(timeout);
    }

    if (parts) {
      batch.forEach((source, i) => {
        const slots = masks[i]?.slots;
        const raw = slots ? unmaskTechnicalTokens(parts![i].trim(), slots) : parts![i].trim();
        const corrected = applyMaritimeCorrections(raw, languageCode);
        out.set(source, normalizeMachineTranslation(source, corrected, languageCode));
      });
      return out;
    }

    if (batch.length === 1 || batch.length > MAX_SINGLE_REQUEST_FALLBACKS) return out;

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
    onResolved?: (count: number) => void,
    maxSources = MAX_LIVE_SOURCES_PER_PASS,
  ): Promise<Map<string, string>> => {
    const result = new Map<string, string>();
    if (Date.now() < liveTranslationPausedUntilRef.current) return result;
    const unique = Array.from(new Set(sources)).slice(0, maxSources);
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
    if (translationRunIdRef.current !== runId) return;

    const bySource = new Map<string, Array<(t: string) => void>>();
    for (const unit of units) {
      recordSeen(unit.source);
      const list = bySource.get(unit.source);
      if (list) list.push(unit.apply);
      else bySource.set(unit.source, [unit.apply]);
    }

    const applyTranslations = (translations: Iterable<[string, string]>) => {
      writeWithoutObserving(() => {
        for (const [source, translated] of translations) {
          if (translated === source) continue;
          bySource.get(source)?.forEach((apply) => apply(translated));
        }
      });
    };

    // 1) Apply everything we can resolve without the network right away. This is
    // synchronous, so cached/static/glossary text never flickers.
    const networkSources: string[] = [];
    // Live fetch whatever the static pack/cache/glossary can't resolve, so the
    // WHOLE app (not just the ~40 packaged UI strings) gets translated. Results
    // are cached + persisted below, so the next time the same string is seen it
    // resolves instantly with no network.
    const canLiveFetch = allowLive;
    const localTranslations = new Map<string, string>();
    for (const source of bySource.keys()) {
      const local = resolveLocally(source, languageCode);
      if (local !== undefined) {
        localTranslations.set(source, local);
      } else if (canLiveFetch) {
        networkSources.push(source);
      }
      // else: leave in source language (cache-only mode after a bulk pass).
    }
    applyTranslations(localTranslations);

    // 2) Translate the remainder in as few batched requests as possible.
    if (networkSources.length > 0) {
      const translations = await networkTranslateMany(networkSources, languageCode);
      if (translationRunIdRef.current !== runId) return;
      for (const [source, translated] of translations) {
        rememberRuntimeTranslation(`${languageCode}:${source}`, translated);
      }
      applyTranslations(translations);
      if (translations.size > 0) persistCacheSoon();
    }
  };

  const translateRoots = async (
    roots: Node[],
    languageCode: string,
    runId: number,
    options: { allowLive?: boolean } = {}
  ) => {
    if (typeof document === 'undefined' || !document.body) return;
    // Load the complete packaged dictionary before collecting the DOM. This
    // avoids both live-request storms and stale snapshots: nodes added while
    // the 8–10 MB pack is loading are included in the subsequent sweep.
    if (languageCode !== SOURCE_LANGUAGE) await loadStaticDictionary(languageCode);
    if (translationRunIdRef.current !== runId) return;

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

  // PageTransition calls this before an incoming route is allowed to become
  // visible. The promise resolves only after that route's actual DOM subtree
  // has completed its local/live translation pass. This replaces the old
  // fixed 150 ms guess, which routinely expired before a lazy route mounted or
  // a large locale dictionary finished parsing on mobile.
  translateRootsRef.current = translateRoots;
  const completeRouteTranslation = useCallback((routeToken: string) => {
    setReadyRouteTranslation(routeToken);
  }, []);

  const translateRouteRoot = useCallback((root: HTMLElement, routeToken: string): Promise<void> => {
    latestRouteTranslationTokenRef.current = routeToken;
    const existing = routeTranslationPromisesRef.current.get(routeToken);
    if (existing?.root === root) return existing.promise;

    const task = (async () => {
      const languageCode = currentLanguageRef.current;
      if (languageCode === SOURCE_LANGUAGE) {
        completeRouteTranslation(routeToken);
        return;
      }

      const translationWork = (async () => {
        await loadStaticDictionary(languageCode);
        if (currentLanguageRef.current !== languageCode || !root.isConnected) return;

        // The provider's initial effect can advance the generation while the
        // dictionary is loading. Read it afterwards so this route joins the
        // latest pass instead of being discarded as stale.
        const runId = translationRunIdRef.current;
        await translateRootsRef.current([root], languageCode, runId, { allowLive: true });
      })();
      const outcome = await settleWithDeadline(
        translationWork,
        ROUTE_TRANSLATION_MAX_WAIT_MS,
      );
      if (outcome.status === 'failed') {
        console.error('Route translation failed:', outcome.error);
      } else if (outcome.status === 'timed-out') {
        console.warn('Route translation exceeded its responsiveness budget.');
      }

      // Never leave a route unresolved: PageTransition keeps the subtree
      // invisible and RouteTranslationGate keeps a full-screen blocker on top
      // until this token is marked ready. A disconnected root or a language
      // switch mid-flight is not a reason to freeze the UI — as long as this
      // is still the route the user is looking at, release it.
      if (latestRouteTranslationTokenRef.current !== routeToken) return;
      completeRouteTranslation(routeToken);

    })();

    routeTranslationPromisesRef.current.set(routeToken, { root, promise: task });
    const clearInFlight = () => {
      if (routeTranslationPromisesRef.current.get(routeToken)?.promise === task) {
        routeTranslationPromisesRef.current.delete(routeToken);
      }
    };
    void task.then(clearInFlight, clearInFlight);
    return task;
  }, [completeRouteTranslation]);

  // ── Mutation observer ──────────────────────────────────────────────────────
  const elementForNode = (node: Node): HTMLElement | null =>
    node.nodeType === Node.ELEMENT_NODE
      ? node as HTMLElement
      : node.parentElement;

  const isOwnedByPendingRoute = (node: Node) => {
    const element = elementForNode(node);
    return !!element?.closest(ROUTE_TRANSLATION_PENDING_SELECTOR);
  };

  const shouldIgnoreObservedNode = (node: Node) => {
    const element = elementForNode(node);
    return !element || isOwnedByPendingRoute(node) || isNoTranslateZone(element);
  };

  const markPendingVisibility = (node: Node) => {
    if (currentLanguageRef.current === SOURCE_LANGUAGE) return;
    const element = elementForNode(node);
    if (
      !element ||
      element.id === 'root' ||
      element === document.body ||
      shouldIgnoreObservedNode(node)
    ) {
      return;
    }

    const version = ++pendingVisibilityVersionRef.current;
    pendingVisibilityRef.current.set(element, version);
    element.setAttribute(TRANSLATION_PENDING_ATTR, '');
    const existingTimer = pendingVisibilityTimersRef.current.get(element);
    if (existingTimer !== undefined) window.clearTimeout(existingTimer);
    const timer = window.setTimeout(() => {
      if (pendingVisibilityRef.current.get(element) !== version) return;
      element.removeAttribute(TRANSLATION_PENDING_ATTR);
      pendingVisibilityRef.current.delete(element);
      pendingVisibilityTimersRef.current.delete(element);
    }, PENDING_VISIBILITY_MAX_MS);
    pendingVisibilityTimersRef.current.set(element, timer);
  };

  const clearPendingVisibility = useCallback(() => {
    for (const timer of pendingVisibilityTimersRef.current.values()) {
      window.clearTimeout(timer);
    }
    pendingVisibilityTimersRef.current.clear();
    for (const element of pendingVisibilityRef.current.keys()) {
      element.removeAttribute(TRANSLATION_PENDING_ATTR);
    }
    pendingVisibilityRef.current.clear();
  }, []);

  const flushPending = async () => {
    flushHandleRef.current = null;
    const pending = pendingNodesRef.current;
    if (pending.size === 0) return;
    const roots = Array.from(pending);
    pending.clear();
    const visibilityBatch = new Map(pendingVisibilityRef.current);
    // Route-change / newly-rendered DOM is translated live: dictionary + cache
    // hits apply synchronously (no flicker), and anything new (body content,
    // article text, dynamic strings) is fetched and cached so the entire app
    // ends up translated, not just the packaged UI labels.
    try {
      await translateRoots(roots, currentLanguageRef.current, translationRunIdRef.current, { allowLive: true });
    } finally {
      for (const [element, version] of visibilityBatch) {
        if (pendingVisibilityRef.current.get(element) !== version) continue;
        const timer = pendingVisibilityTimersRef.current.get(element);
        if (timer !== undefined) window.clearTimeout(timer);
        pendingVisibilityTimersRef.current.delete(element);
        element.removeAttribute(TRANSLATION_PENDING_ATTR);
        pendingVisibilityRef.current.delete(element);
      }
    }
  };

  const scheduleFlush = () => {
    if (flushHandleRef.current !== null) return;
    const schedule = (cb: FrameRequestCallback): number =>
      typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function'
        ? window.requestAnimationFrame(cb)
        : window.setTimeout(() => cb(performance.now()), 50);
    flushHandleRef.current = schedule(() => void flushPending());
  };

  const ensureObserver = () => {
    if (typeof document === 'undefined' || !document.body || observerRef.current) return;
    const observer = new MutationObserver((mutations) => {
      const pending = pendingNodesRef.current;
      for (const mutation of mutations) {
        if (mutation.type === 'characterData' && mutation.target.nodeType === Node.TEXT_NODE) {
          const textNode = mutation.target as Text;
          if (shouldIgnoreObservedNode(textNode)) continue;
          originalTextRef.current.set(textNode, textNode.nodeValue ?? '');
          markPendingVisibility(textNode);
          pending.add(textNode);
        } else if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((added) => {
            if (shouldIgnoreObservedNode(added)) return;
            markPendingVisibility(added);
            pending.add(added);
          });
        }
      }
      if (pending.size > 0) scheduleFlush();
    });
    observerRef.current = observer;
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  };

  // ── Language activation ──────────────────────────────────────────────────
  // Fast path: load the language's static pack (scripts/i18n/* → precached
  // public/locales/*.json). The pack seeds INSTANT, offline translation of the
  // UI strings it covers, then we translate the current page live so its body
  // content is translated too (the packs intentionally only ship the common UI
  // labels, not the whole app's content). Subsequent navigation is translated
  // live on view and cached, so the entire app — not just the interface — ends
  // up translated.
  //
  // Fallback path (kept for safety): if a language's pack is missing/empty
  // (e.g. it failed to load), fall back to the legacy harvest + live gtx flow.
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
      // The static pack loaded. It seeds instant UI translation, but it does NOT
      // cover the app's body content, so translate the page the user is looking
      // at right now — live, body included — under the overlay. That way the
      // page is fully translated the instant the overlay lifts instead of
      // flipping from source a beat later. Anything new the user navigates to
      // afterwards is translated live on view (see flushPending / page-pass).
      releaseDictionariesExcept([languageCode]);
      bulkCompletedLanguagesRef.current.add(languageCode);
      const runId = ++translationRunIdRef.current;
      await translatePage(languageCode, runId, { allowLive: true });
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
      rememberRuntimeTranslation(`${languageCode}:${src}`, dst);
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
    const translations = await networkTranslateMany(
      pool,
      languageCode,
      (count) => {
        done += count;
        setChangeProgress(
          Math.min(99, progressFloor + Math.round((done / total) * progressSpan)),
        );
      },
      Number.POSITIVE_INFINITY,
    );
    for (const [source, value] of translations) {
      rememberRuntimeTranslation(`${languageCode}:${source}`, value);
    }

    persistCacheSoon();
    bulkCompletedLanguagesRef.current.add(languageCode);
    setChangeProgress(100);
  };


  // ── Public API ─────────────────────────────────────────────────────────────
  const changeLanguage = async (languageCode: string) => {
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
  };

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
    // Storage hydration is intentionally mount-only; the functions above use
    // refs and must not replay after provider state updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (currentLanguage === SOURCE_LANGUAGE) clearPendingVisibility();
  }, [clearPendingVisibility, currentLanguage, isRTL]);

  useEffect(() => {
    if (IS_HARVEST_FRAME || typeof window === 'undefined') return;
    const handleRouteCommitted = () => {
      // A route must never inherit queued DOM mutations or hidden nodes from
      // the screen that just unmounted. Invalidate those async writes and let
      // PageTransition translate the newly committed subtree exactly once.
      translationRunIdRef.current += 1;
      pendingNodesRef.current.clear();
      clearPendingVisibility();
      routeTranslationPromisesRef.current.clear();
      if (flushHandleRef.current !== null) {
        window.cancelAnimationFrame?.(flushHandleRef.current);
        window.clearTimeout(flushHandleRef.current);
        flushHandleRef.current = null;
      }
    };
    window.addEventListener('app-route-committed', handleRouteCommitted);
    return () => window.removeEventListener('app-route-committed', handleRouteCommitted);
  }, [clearPendingVisibility]);

  useEffect(() => {
    if (IS_HARVEST_FRAME) return;
    if (typeof document === 'undefined' || isLoading) return;
    const runId = ++translationRunIdRef.current;
    const language = currentLanguage;
    ensureObserver();
    // PageTransition owns the route subtree. Translate only persistent chrome
    // here so the provider and route gate cannot launch duplicate work for the
    // same large lesson page. Portals/toasts mounted later are handled by the
    // observer.
    void (async () => {
      await loadStaticDictionary(language);
      if (translationRunIdRef.current !== runId) return;
      const globalRoots = Array.from(
        document.querySelectorAll<HTMLElement>('[data-mt-global-root]'),
      );
      await translateRoots(globalRoots, language, runId, { allowLive: true });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, isLoading]);

  useEffect(() => {
    const routeTranslationPromises = routeTranslationPromisesRef.current;
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      clearPendingVisibility();
      routeTranslationPromises.clear();
      if (typeof window !== 'undefined') {
        if (flushHandleRef.current !== null) {
          window.cancelAnimationFrame?.(flushHandleRef.current);
          window.clearTimeout(flushHandleRef.current);
        }
        if (persistHandleRef.current !== null) window.clearTimeout(persistHandleRef.current);
        if (seenPersistHandleRef.current !== null) window.clearTimeout(seenPersistHandleRef.current);
      }
    };
  }, [clearPendingVisibility]);

  const contextValue: LanguageContextValue = {
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
    readyRouteTranslation,
    translateRouteRoot,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
