// Loads every route in routeManifest into a hidden off-screen iframe in order
// to harvest user-visible source text from the rendered DOM. The harvest
// iframe self-reports its strings via postMessage once its DOM has been
// quiet long enough to be considered fully rendered. If postMessage never
// arrives within `perRouteTimeoutMs`, we fall back to reading the iframe's
// contentDocument directly so a slow/non-cooperative page still contributes.

import { collectTranslationUnits } from '@/utils/pageTranslator';
import { getHarvestRoutes } from '@/utils/routeManifest';

interface HarvestOptions {
  onProgress?: (done: number, total: number) => void;
  signal?: AbortSignal;
  perRouteTimeoutMs?: number;
  harvestFlag?: string;
}

const DEFAULT_TIMEOUT = 9000;

export const HARVEST_MESSAGE_TYPE = 'mt-harvest-strings';

const harvestRoute = (
  iframe: HTMLIFrameElement,
  url: string,
  pathname: string,
  timeoutMs: number,
  signal?: AbortSignal,
): Promise<string[]> =>
  new Promise((resolve) => {
    let settled = false;
    let timer = 0;
    let onMessage: ((e: MessageEvent) => void) | null = null;
    let onAbort: (() => void) | null = null;

    const cleanup = () => {
      if (onMessage) window.removeEventListener('message', onMessage);
      if (onAbort && signal) signal.removeEventListener('abort', onAbort);
      window.clearTimeout(timer);
    };

    const finish = (strings: string[]) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(strings);
    };

    const fallbackHarvest = (): string[] => {
      try {
        const doc = iframe.contentDocument;
        if (!doc || !doc.body) return [];
        const units = collectTranslationUnits(doc.body, new WeakMap());
        const out = new Set<string>();
        for (const u of units) if (u.source) out.add(u.source);
        return Array.from(out);
      } catch {
        return [];
      }
    };

    onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (
        !data ||
        typeof data !== 'object' ||
        (data as { type?: unknown }).type !== HARVEST_MESSAGE_TYPE
      ) {
        return;
      }
      const payload = data as { pathname?: string; sources?: unknown };
      // Match by pathname rather than full URL — iframe's window.location.href
      // may differ from the URL we set due to redirects / normalization.
      if (typeof payload.pathname !== 'string' || payload.pathname !== pathname) return;
      const sources = Array.isArray(payload.sources)
        ? (payload.sources.filter((s) => typeof s === 'string') as string[])
        : [];
      // Combine the iframe's self-report with a contentDocument sweep — both
      // can miss strings the other catches (e.g. attribute text vs late
      // mounts), and de-duplication is free.
      const sweep = fallbackHarvest();
      const merged = new Set<string>([...sources, ...sweep]);
      finish(Array.from(merged));
    };
    window.addEventListener('message', onMessage);

    if (signal) {
      onAbort = () => finish([]);
      signal.addEventListener('abort', onAbort, { once: true });
    }

    timer = window.setTimeout(() => finish(fallbackHarvest()), timeoutMs);

    try {
      iframe.src = url;
    } catch {
      finish([]);
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
  // A real-ish viewport so responsive components mount their full markup
  // (mobile + desktop branches differ for some pages).
  iframe.style.cssText =
    'position:fixed;left:-9999px;top:-9999px;width:1280px;height:900px;border:0;opacity:0;pointer-events:none;';
  document.body.appendChild(iframe);

  try {
    for (let i = 0; i < routes.length; i++) {
      if (signal?.aborted) break;
      const path = routes[i];
      const sep = path.includes('?') ? '&' : '?';
      const url = `${origin}${path}${sep}${harvestFlag}`;
      try {
        const sources = await harvestRoute(iframe, url, path, perRouteTimeoutMs, signal);
        for (const s of sources) if (s) collected.add(s);
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
