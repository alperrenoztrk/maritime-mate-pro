// Loads every route in routeManifest into a hidden off-screen iframe in order
// to harvest user-visible source text from the rendered DOM. The collected
// strings are passed back to the caller so the LanguageContext can pre-cache
// translations for the whole app before a language switch finalises.

import { collectTranslationUnits } from '@/utils/pageTranslator';
import { getHarvestRoutes } from '@/utils/routeManifest';

interface HarvestOptions {
  onProgress?: (done: number, total: number) => void;
  signal?: AbortSignal;
  perRouteTimeoutMs?: number;
  postLoadDelayMs?: number;
  // Tells the iframe app to skip the language overlay loop (we set a query flag).
  harvestFlag?: string;
}

const DEFAULT_TIMEOUT = 4500;
const DEFAULT_POST_LOAD = 700;

const waitFor = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    const t = window.setTimeout(() => resolve(), ms);
    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(t);
        reject(new DOMException('Aborted', 'AbortError'));
      },
      { once: true },
    );
  });

const loadRoute = (
  iframe: HTMLIFrameElement,
  url: string,
  timeoutMs: number,
  signal?: AbortSignal,
): Promise<void> =>
  new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      iframe.removeEventListener('load', onLoad);
      window.clearTimeout(timer);
      resolve();
    };
    const onLoad = () => finish();
    iframe.addEventListener('load', onLoad);
    const timer = window.setTimeout(finish, timeoutMs);
    signal?.addEventListener('abort', finish, { once: true });
    try {
      iframe.src = url;
    } catch {
      finish();
    }
  });

export const harvestAllRoutes = async (
  options: HarvestOptions = {},
): Promise<string[]> => {
  if (typeof document === 'undefined' || !document.body) return [];

  const {
    onProgress,
    signal,
    perRouteTimeoutMs = DEFAULT_TIMEOUT,
    postLoadDelayMs = DEFAULT_POST_LOAD,
    harvestFlag = '_mtHarvest=1',
  } = options;

  const routes = getHarvestRoutes();
  const total = routes.length;
  const collected = new Set<string>();
  const origin = window.location.origin;

  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.setAttribute('tabindex', '-1');
  iframe.title = 'mt-harvester';
  iframe.style.cssText =
    'position:fixed;left:-9999px;top:-9999px;width:1024px;height:768px;border:0;opacity:0;pointer-events:none;';
  document.body.appendChild(iframe);

  const originalsScratch = new WeakMap<Text, string>();

  try {
    for (let i = 0; i < routes.length; i++) {
      if (signal?.aborted) break;
      const path = routes[i];
      const sep = path.includes('?') ? '&' : '?';
      const url = `${origin}${path}${sep}${harvestFlag}`;
      try {
        await loadRoute(iframe, url, perRouteTimeoutMs, signal);
        // Give lazy code-split chunks and Suspense boundaries a moment to
        // settle before harvesting text.
        await waitFor(postLoadDelayMs, signal);
        const doc = iframe.contentDocument;
        if (doc && doc.body) {
          const units = collectTranslationUnits(doc.body, originalsScratch);
          for (const u of units) {
            if (u.source) collected.add(u.source);
          }
        }
      } catch {
        // ignore per-route errors and move on
      }
      onProgress?.(i + 1, total);
    }
  } finally {
    try {
      iframe.src = 'about:blank';
    } catch {
      /* ignore */
    }
    iframe.remove();
  }

  return Array.from(collected);
};

const HARVEST_DONE_KEY_PREFIX = 'mt-harvest-done-';

export const hasHarvestedFor = (languageCode: string, version: string): boolean => {
  try {
    return localStorage.getItem(`${HARVEST_DONE_KEY_PREFIX}${version}-${languageCode}`) === '1';
  } catch {
    return false;
  }
};

export const markHarvestedFor = (languageCode: string, version: string): void => {
  try {
    localStorage.setItem(`${HARVEST_DONE_KEY_PREFIX}${version}-${languageCode}`, '1');
  } catch {
    /* ignore */
  }
};
