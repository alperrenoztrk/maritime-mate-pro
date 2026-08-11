#!/usr/bin/env node
/**
 * Build-time AI pre-translation.
 * ------------------------------
 * Reads scripts/i18n/source-strings.json and produces public/locales/<lang>.json
 * dictionaries used at runtime for instant, network-free translation.
 *
 * For each string, per language:
 *   1) curated maritime override (getMaritimeTranslationOverride) wins, else
 *   2) AI translation via the Lovable AI Gateway (google/gemini-2.5-flash) with
 *      the maritime system prompt + glossary hint, batched for cost/speed, then
 *   3) applyMaritimeCorrections to fix any leftover terms.
 *
 * Incremental: scripts/i18n/.cache/<lang>.json remembers prior translations so
 * re-runs only translate new/changed strings.
 *
 * Run with tsx (TS imports):  npx tsx scripts/i18n/pretranslate.mjs [--lang=en,de] [--limit=N]
 * Requires env LOVABLE_API_KEY for AI. Without it, only the override-only
 * dictionary is written (and a warning is printed).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  getMaritimeTranslationOverride,
  applyMaritimeCorrections,
  maritimeGlossaryPromptHint,
} from '../../src/utils/maritimeGlossary.ts';
import {
  PROTECTED_TOKENS,
  findMissingProtectedTokens,
} from '../../src/utils/protectedTerms.ts';
import { CONTEXTUAL_CORRECTIONS } from './contextual-corrections.mjs';

const repoRoot = process.cwd();
const SOURCE_FILE = path.join(repoRoot, 'scripts/i18n/source-strings.json');
const CACHE_DIR = path.join(repoRoot, 'scripts/i18n/.cache');
const OUT_DIR = path.join(repoRoot, 'public/locales');

const AI_ENDPOINT = 'https://ai.gateway.lovable.dev/v1/chat/completions';
const AI_MODEL = 'google/gemini-2.5-flash';
const BATCH_SIZE = 25;
const BATCH_CONCURRENCY = 4;

// Target languages (mirror SUPPORTED_LANGUAGES in LanguageContext, minus 'tr').
const LANGUAGE_NAMES = {
  en: 'English', es: 'Spanish', de: 'German', fr: 'French', it: 'Italian',
  pt: 'Portuguese', ru: 'Russian', ja: 'Japanese', ko: 'Korean',
  'zh-CN': 'Chinese (Simplified)', ar: 'Arabic', hi: 'Hindi', nl: 'Dutch',
  sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', pl: 'Polish',
  cs: 'Czech', hu: 'Hungarian', ro: 'Romanian', el: 'Greek', bg: 'Bulgarian',
  uk: 'Ukrainian',
};
const ALL_LANGS = Object.keys(LANGUAGE_NAMES);

// --- args ---
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
  })
);
const langs = args.lang ? String(args.lang).split(',').map((s) => s.trim()) : ['en'];
const limit = args.limit ? parseInt(args.limit, 10) : Infinity;

const apiKey = process.env.LOVABLE_API_KEY;

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runWithConcurrency(items, concurrency, task) {
  let cursor = 0;
  const worker = async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await task(items[index], index);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
}

// Abbreviations the model must carry through untouched. Unlike the generic
// engines, a language model gets these right when told, so the AI path states
// the rule instead of masking the text (masking would cost it the context it
// needs to translate the surrounding sentence well).
const PROTECTED_TOKEN_HINT = PROTECTED_TOKENS.map((entry) => entry.token).join(', ');

function systemPrompt(langName) {
  return (
    `You are a professional maritime translator specialised in nautical, navigation, ` +
    `ship stability and marine engineering terminology. Translate each Turkish string ` +
    `to ${langName} using the standard professional maritime terminology of the target ` +
    `language (never literal/generic words). Preserve numbers, symbols, units and ` +
    `placeholders. Maritime glossary (Turkish = English) for reference: ` +
    `${maritimeGlossaryPromptHint}.\n\n` +
    `Keep these technical abbreviations EXACTLY as written — never translate, expand, ` +
    `spell out or "correct" them, and never drop them (stability symbols such as GM, ` +
    `KG, KB and BM are formula variables): ${PROTECTED_TOKEN_HINT}. The only permitted ` +
    `change is the established equivalent of the target language (e.g. IMO = OMI in ` +
    `French, PPE = PSA in German).\n\n` +
    `You receive a JSON array of strings. Return ONLY a JSON array of the same length ` +
    `with the translations in the same order — no prose, no code fences.`
  );
}

function parseJsonArray(text) {
  let t = String(text).trim();
  if (t.startsWith('```')) t = t.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  const start = t.indexOf('[');
  const end = t.lastIndexOf(']');
  if (start === -1 || end === -1) return null;
  try {
    const arr = JSON.parse(t.slice(start, end + 1));
    return Array.isArray(arr) ? arr.map((x) => (typeof x === 'string' ? x : String(x))) : null;
  } catch { return null;
  }
}

async function aiTranslateBatch(batch, langCode, langName) {
  const body = {
    model: AI_MODEL,
    messages: [
      { role: 'system', content: systemPrompt(langName) },
      { role: 'user', content: JSON.stringify(batch) },
    ],
    temperature: 0.2,
  };
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 429 || res.status >= 500) { await sleep(2000 * (attempt + 1)); continue; }
    if (!res.ok) throw new Error(`AI gateway ${res.status} for ${langCode}`);
    const data = await res.json();
    const out = parseJsonArray(data.choices?.[0]?.message?.content ?? '');
    if (out && out.length === batch.length) return out;
    // Mismatch: signal caller to fall back to per-string.
    return null;
  }
  throw new Error(`AI gateway repeatedly failed for ${langCode}`);
}

async function translateLanguage(langCode, sources) {
  const langName = LANGUAGE_NAMES[langCode];
  if (!langName) { console.warn(`⚠️  Unknown language "${langCode}", skipping`); return; }

  const cacheFile = path.join(CACHE_DIR, `${langCode}.json`);
  const cache = readJson(cacheFile, {});
  let aiCount = 0;
  let overrideCount = 0;
  let droppedCount = 0;

  // Determine what still needs AI (not overridable, not cached).
  const pending = [];
  for (const source of sources) {
    // Curated contextual correction wins over everything (see
    // contextual-corrections.mjs), then the maritime glossary override.
    const correction = CONTEXTUAL_CORRECTIONS[source]?.[langCode];
    if (correction !== undefined) { cache[source] = correction; overrideCount++; continue; }
    const override = getMaritimeTranslationOverride(source, langCode);
    if (override) { cache[source] = override; overrideCount++; continue; }
    if (cache[source] === undefined) pending.push(source);
  }

  const limited = pending.slice(0, Number.isFinite(limit) ? limit : pending.length);
  if (limited.length && !apiKey) {
    console.warn(`⚠️  LOVABLE_API_KEY not set — writing override-only dictionary for ${langCode} ` +
      `(${limited.length} strings left untranslated).`);
  }

  if (limited.length && apiKey) {
    const batches = [];
    for (let i = 0; i < limited.length; i += BATCH_SIZE) batches.push(limited.slice(i, i + BATCH_SIZE));
    let done = 0;
    await runWithConcurrency(batches, BATCH_CONCURRENCY, async (batch) => {
      let results = await aiTranslateBatch(batch, langCode, langName);
      if (!results) {
        // Fallback: translate one-by-one for this batch.
        results = [];
        for (const s of batch) {
          const single = await aiTranslateBatch([s], langCode, langName);
          results.push(single && single[0] ? single[0] : s);
        }
      }
      // A dropped abbreviation is silent damage, so verify rather than trust:
      // retry the string on its own, and if the model drops it again leave the
      // entry uncached so the runtime (which masks) translates it instead.
      for (let i = 0; i < batch.length; i++) {
        const source = batch[i];
        let translated = results[i] ?? source;
        if (findMissingProtectedTokens(source, translated, langCode).length > 0) {
          const retry = await aiTranslateBatch([source], langCode, langName);
          const retried = retry && retry[0];
          if (!retried || findMissingProtectedTokens(source, retried, langCode).length > 0) {
            droppedCount++;
            continue;
          }
          translated = retried;
        }
        cache[source] = applyMaritimeCorrections(translated, langCode);
        aiCount++;
      }
      done += batch.length;
      if (done % 250 < BATCH_SIZE) console.log(`   ${langCode}: ${done}/${limited.length}`);
    });
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 0));
  }

  // Build the shipped dictionary from the CURRENT source list only.
  const version = crypto.createHash('sha1')
    .update(langCode + '\n' + sources.join('\n')).digest('hex').slice(0, 12);
  const dict = { __version: version };
  let covered = 0;
  for (const source of sources) {
    if (cache[source] !== undefined) { dict[source] = cache[source]; covered++; }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, `${langCode}.json`), JSON.stringify(dict, null, 0) + '\n');

  console.log(`✅ ${langCode}: ${covered}/${sources.length} covered ` +
    `(override ${overrideCount}, AI ${aiCount}` +
    (droppedCount ? `, ${droppedCount} left to the runtime: abbreviation dropped` : '') +
    `) → public/locales/${langCode}.json`);
}

async function main() {
  const source = readJson(SOURCE_FILE, null);
  if (!source?.strings?.length) {
    console.error('❌ No source strings. Run: npm run i18n:extract');
    process.exit(1);
  }
  const targets = langs.includes('all') ? ALL_LANGS : langs;
  console.log(`🌐 Pre-translating ${source.strings.length} strings → [${targets.join(', ')}]` +
    (apiKey ? '' : '  (no API key: override-only)'));
  for (const lang of targets) {
    await translateLanguage(lang, source.strings);
  }
}

main().catch((err) => { console.error('❌', err.message); process.exit(1); });
