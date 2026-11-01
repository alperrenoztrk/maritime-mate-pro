// Credential-free machine-translation client shared by the i18n scripts.
// -----------------------------------------------------------------------------
// Used by generate-locales-gtx.mjs (Turkish source → target) and by
// translate-pivot.mjs (checked English → target). The runtime translator in
// src/contexts/LanguageContext.tsx keeps its own copy because it must stay
// browser-only.
//
// Credential-free Google-compatible services expose several response shapes. A
// privacy proxy is tried first so one build host cannot exhaust Google's per-IP
// quota; the direct Chrome and canonical endpoints remain fallbacks. A provider
// that keeps failing (bot challenge, empty answers) is paused for a while, so a
// broken endpoint does not cost one wasted round-trip per string.
import {
  BATCH_SEPARATOR,
  buildTranslationBatches,
  splitBatchResult,
} from '../../src/utils/pageTranslator.ts';

export { BATCH_SEPARATOR, buildTranslationBatches, splitBatchResult };

export const MT_PROVIDERS = [
  {
    name: 'simplytranslate',
    buildUrl(text, targetLang, sourceLang) {
      const params = new URLSearchParams({ engine: 'google', from: sourceLang, to: targetLang, text });
      return `https://simplytranslate.org/api/translate/?${params}`;
    },
    parse(data) {
      return typeof data?.translated_text === 'string' ? data.translated_text : null;
    },
  },
  {
    name: 'clients5',
    buildUrl(text, targetLang, sourceLang) {
      const params = new URLSearchParams({ client: 'at', sl: sourceLang, tl: targetLang, q: text });
      return `https://clients5.google.com/translate_a/t?${params}`;
    },
    parse(data) {
      return Array.isArray(data) && typeof data[0] === 'string' ? data.join('') : null;
    },
  },
  {
    name: 'gtx',
    buildUrl(text, targetLang, sourceLang) {
      const params = new URLSearchParams({ client: 'gtx', sl: sourceLang, tl: targetLang, dt: 't', q: text });
      return `https://translate.googleapis.com/translate_a/single?${params}`;
    },
    parse(data) {
      if (!Array.isArray(data?.[0])) return null;
      return data[0].map((item) => item[0]).join('');
    },
  },
];

const RETRY_MAX = 4;
const RETRY_DELAY = 1500; // ms between retries on 429 (grows linearly)
const FETCH_TIMEOUT = 20_000;
// A provider that failed this many strings in a row is skipped for a while;
// the pause grows while it keeps failing (30 s, 2 min, then 5 min).
const PROVIDER_MAX_FAILURES = 3;
const PROVIDER_PAUSES_MS = [30_000, 120_000, 300_000];
// Optional pause before every request (gentler on the free endpoints in CI).
const REQUEST_DELAY_MS = Math.max(0, Number(process.env.I18N_DELAY_MS) || 0);

const health = new Map();
const stats = { requests: 0, failures: 0 };

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const hasUsableTranslation = (value) =>
  typeof value === 'string' && value.trim().length > 0;

const providerState = (name) => {
  let state = health.get(name);
  if (!state) {
    state = { failures: 0, pausedUntil: 0, pauses: 0 };
    health.set(name, state);
  }
  return state;
};

/** True while at least one provider is not paused. */
export const providersAvailable = () =>
  MT_PROVIDERS.some((provider) => Date.now() >= providerState(provider.name).pausedUntil);

/** Milliseconds until the first paused provider may be tried again (0 when one is free). */
export const nextProviderIn = () =>
  Math.max(0, Math.min(...MT_PROVIDERS.map((provider) => providerState(provider.name).pausedUntil - Date.now())));

/** Request counters for the run report. */
export const mtStats = () => ({ ...stats });

/**
 * Translates one query (which may hold several strings joined with
 * BATCH_SEPARATOR). Returns null when every provider failed.
 */
export async function translateText(text, targetLang, sourceLang = 'tr') {
  for (const provider of MT_PROVIDERS) {
    const state = providerState(provider.name);
    if (Date.now() < state.pausedUntil) continue;
    const url = provider.buildUrl(text, targetLang, sourceLang);
    let result = null;
    for (let attempt = 0; attempt < RETRY_MAX; attempt++) {
      if (REQUEST_DELAY_MS) await sleep(REQUEST_DELAY_MS);
      stats.requests += 1;
      try {
        const res = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(FETCH_TIMEOUT) });
        if (res.status === 429) {
          await sleep(RETRY_DELAY * (attempt + 1));
          continue;
        }
        // A bot-challenge redirect or a non-JSON answer is provider-specific:
        // move to the next provider instead of retrying the same challenge.
        if (!res.ok || !res.headers.get('content-type')?.includes('json')) break;
        const parsed = provider.parse(await res.json());
        if (hasUsableTranslation(parsed)) result = parsed;
        break;
      } catch {
        if (attempt < RETRY_MAX - 1) {
          await sleep(RETRY_DELAY);
          continue;
        }
      }
    }
    if (result !== null) {
      state.failures = 0;
      state.pauses = 0;
      return result;
    }
    stats.failures += 1;
    state.failures += 1;
    if (state.failures >= PROVIDER_MAX_FAILURES) {
      state.failures = 0;
      state.pausedUntil = Date.now() + PROVIDER_PAUSES_MS[Math.min(state.pauses, PROVIDER_PAUSES_MS.length - 1)];
      state.pauses += 1;
    }
  }
  return null;
}

export async function runWithConcurrency(items, concurrency, task) {
  let cursor = 0;
  const worker = async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await task(items[index], index);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
}
