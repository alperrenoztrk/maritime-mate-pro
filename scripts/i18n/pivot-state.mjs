#!/usr/bin/env node
// State of the checked-English pivot layer
// -----------------------------------------------------------------------------
// translate-pivot.mjs writes machine translations of CHECKED ENGLISH into
// public/locales/<lang>.json for every line that would otherwise show English
// (verified-pack English fill, i18n:fix English fallbacks, new English UI text,
// and the shared English packs for lesson paragraphs and the learning guide).
//
// The translation itself lives in the dictionary. This module keeps only where
// it came from, in scripts/i18n/pivot/<lang>.json:
//
//   { "v": 1, "gates": <GATES_VERSION>,
//     "applied":      { <hash(key)>: <hash(english)> },   // translated lines
//     "rejected":     { <hash(english)>: <reason> },      // kept in English
//     "rejectedKeys": { <hash(key)>: <hash(english)> } }  // kept for one key only
//
// When the checked English of a line changes (a verified pack or a paragraph
// is corrected), the stored hash no longer matches: the line is stale and goes
// back to English until the next translation run. A translation is therefore
// never shown for an English text it was not made from.
//
//   node --import tsx scripts/i18n/pivot-state.mjs --check   # exit 1 on stale lines (i18n:verify)
//   node --import tsx scripts/i18n/pivot-state.mjs --fix     # reset stale lines, bump the cache version
//   node --import tsx scripts/i18n/pivot-state.mjs --lang=nl,de --fix
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isAbbreviationOnly } from '../../src/utils/protectedTerms.ts';
import { hasHumanTranslation } from './contextual-corrections.mjs';
import { GATES_VERSION, checkForKey, verifyTranslation, wordCount } from './pivot-gates.mjs';

const repoRoot = process.cwd();
export const LOCALES_DIR = path.join(repoRoot, 'public/locales');
export const PIVOT_DIR = path.join(repoRoot, 'scripts/i18n/pivot');
const VERSION_FILE = path.join(repoRoot, 'src/i18n/localeVersion.ts');
const STATE_FORMAT = 1;

export const hashText = (text) => crypto.createHash('sha1').update(text).digest('hex').slice(0, 16);

const readJson = (file, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
};

/** Every language with a dictionary, English last (it is never pivoted). */
export const localeLanguages = () =>
  fs
    .readdirSync(LOCALES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.slice(0, -5))
    .sort();

export const readDictionary = (lang) => readJson(path.join(LOCALES_DIR, `${lang}.json`), {});
export const writeDictionary = (lang, dict) =>
  fs.writeFileSync(path.join(LOCALES_DIR, `${lang}.json`), JSON.stringify(dict, null, 0) + '\n');

/**
 * The checked English the app shows for each key: en.json, then the shared
 * English packs the runtime adds to every dictionary (staticTranslations.ts).
 */
export function loadEnglishSources() {
  const en = readDictionary('en');
  const paragraphs = readJson(path.join(LOCALES_DIR, 'shared/lesson-paragraphs.en.json'), {});
  const learning = readJson(path.join(LOCALES_DIR, 'shared/learning-guide.en.json'), {});
  const shared = { ...paragraphs, ...learning };
  const englishFor = (key) => {
    const value = Object.hasOwn(en, key) ? en[key] : shared[key];
    return typeof value === 'string' ? value : undefined;
  };
  const keys = new Set();
  for (const key of Object.keys(en)) if (!key.startsWith('__')) keys.add(key);
  for (const key of Object.keys(shared)) keys.add(key);
  return { en, paragraphs, learning, englishFor, keys, inEnglishDictionary: (key) => Object.hasOwn(en, key) };
}

export function loadState(lang) {
  const raw = readJson(path.join(PIVOT_DIR, `${lang}.json`), null);
  const state = {
    v: STATE_FORMAT,
    gates: raw?.gates ?? GATES_VERSION,
    applied: raw?.applied ?? {},
    rejected: raw?.rejected ?? {},
    rejectedKeys: raw?.rejectedKeys ?? {},
  };
  // Made under other rules: reconcile() checks the applied lines again and the
  // rejected ones are tried again on the next translation run.
  state.needsRecheck = raw !== null && state.gates !== GATES_VERSION;
  if (raw === null) state.gates = GATES_VERSION;
  return state;
}

const sortObject = (obj) => Object.fromEntries(Object.keys(obj).sort().map((k) => [k, obj[k]]));
export function saveState(lang, state) {
  fs.mkdirSync(PIVOT_DIR, { recursive: true });
  const out = {
    v: STATE_FORMAT,
    gates: state.gates,
    applied: sortObject(state.applied),
    rejected: sortObject(state.rejected),
    rejectedKeys: sortObject(state.rejectedKeys),
  };
  fs.writeFileSync(path.join(PIVOT_DIR, `${lang}.json`), JSON.stringify(out, null, 0) + '\n');
}

/** A line worth translating: real words, not just abbreviations or numbers. */
export const isTranslatableEnglish = (english) =>
  typeof english === 'string' && wordCount(english) > 0 && !isAbbreviationOnly(english);

/**
 * Drops pivot lines whose English changed (stale), whose key is gone, or that
 * were already put back into English (i18n:fix). Mutates dict and state.
 */
export function reconcile(lang, dict, sources, state) {
  const byHash = new Map();
  for (const key of sources.keys) byHash.set(hashText(key), key);
  for (const key of Object.keys(dict)) if (!key.startsWith('__')) byHash.set(hashText(key), key);

  const result = { stale: 0, orphan: 0, reverted: 0, rechecked: 0 };
  const recheck = state.needsRecheck;
  if (recheck) {
    state.rejected = {};
    state.rejectedKeys = {};
  }
  for (const [keyHash, enHash] of Object.entries(state.applied)) {
    const key = byHash.get(keyHash);
    const english = key === undefined ? undefined : sources.englishFor(key);
    const inEn = key !== undefined && sources.inEnglishDictionary(key);
    if (key === undefined || english === undefined) {
      if (key !== undefined && !inEn) delete dict[key];
      delete state.applied[keyHash];
      result.orphan++;
      continue;
    }
    if (hashText(english) !== enHash) {
      if (inEn) dict[key] = english;
      else delete dict[key];
      delete state.applied[keyHash];
      result.stale++;
      continue;
    }
    if (dict[key] === undefined || dict[key] === english) {
      if (!inEn) delete dict[key];
      delete state.applied[keyHash];
      result.reverted++;
      continue;
    }
    if (recheck) {
      const reason = verifyTranslation(english, dict[key], lang) ?? checkForKey(key, dict[key], lang);
      if (reason) {
        if (inEn) dict[key] = english;
        else delete dict[key];
        delete state.applied[keyHash];
        state.rejected[enHash] = reason;
        result.rechecked++;
      }
    }
  }
  if (recheck) {
    state.gates = GATES_VERSION;
    state.needsRecheck = false;
  }
  for (const [keyHash, enHash] of Object.entries(state.rejectedKeys)) {
    const key = byHash.get(keyHash);
    const english = key === undefined ? undefined : sources.englishFor(key);
    if (english === undefined || hashText(english) !== enHash) delete state.rejectedKeys[keyHash];
  }
  return result;
}

/**
 * Lines of `lang` that show checked English and may be translated, grouped by
 * their English text: Map<english, key[]>.
 */
export function collectCandidates(lang, dict, sources, state, { scope = 'all' } = {}) {
  const byEnglish = new Map();
  const add = (english, key) => {
    const keys = byEnglish.get(english);
    if (keys) keys.push(key);
    else byEnglish.set(english, [key]);
  };
  for (const key of sources.keys) {
    const inEn = sources.inEnglishDictionary(key);
    if (scope === 'learning' && !Object.hasOwn(sources.learning, key)) continue;
    if (scope === 'paragraphs' && !Object.hasOwn(sources.paragraphs, key)) continue;
    if (scope === 'fills' && !inEn) continue;
    const english = sources.englishFor(key);
    if (!isTranslatableEnglish(english)) continue;
    const shown = Object.hasOwn(dict, key) ? dict[key] : inEn ? undefined : english;
    if (shown !== english) continue;
    if (hasHumanTranslation(key, lang)) continue;
    const enHash = hashText(english);
    if (state.rejected[enHash] !== undefined) continue;
    if (state.rejectedKeys[hashText(key)] === enHash) continue;
    add(english, key);
  }
  return byEnglish;
}

/** Lines and characters of `lang` that are shown in checked English. */
export function englishShare(lang, dict, sources) {
  let lines = 0;
  let chars = 0;
  let totalChars = 0;
  for (const key of sources.keys) {
    const inEn = sources.inEnglishDictionary(key);
    const english = sources.englishFor(key);
    const shown = Object.hasOwn(dict, key) ? dict[key] : inEn ? undefined : english;
    if (typeof shown !== 'string') continue;
    totalChars += shown.length;
    if (lang !== 'en' && shown === english && isTranslatableEnglish(english)) {
      lines++;
      chars += english.length;
    }
  }
  return { lines, chars, totalChars, percent: totalChars ? (100 * chars) / totalChars : 0 };
}

/**
 * Content hash of every dictionary, written to src/i18n/localeVersion.ts. The
 * runtime puts it in the dictionary URLs (?v=…), so browsers and the PWA cache
 * fetch a dictionary again whenever its content changes.
 */
export function computeLocaleVersion() {
  const hash = crypto.createHash('sha1');
  const files = [
    ...localeLanguages().map((lang) => `${lang}.json`),
    'shared/lesson-paragraphs.en.json',
    'shared/learning-guide.en.json',
    'shared/terminology-overrides.json',
  ];
  for (const file of files) {
    const full = path.join(LOCALES_DIR, file);
    if (!fs.existsSync(full)) continue;
    hash.update(file);
    hash.update(fs.readFileSync(full));
  }
  return hash.digest('hex').slice(0, 10);
}

const versionSource = (version) =>
  '// Generated by scripts/i18n/pivot-state.mjs from the content of public/locales.\n' +
  '// The runtime adds it to the dictionary URLs so a changed dictionary is fetched\n' +
  '// again instead of being served from the browser or PWA cache. Do not edit.\n' +
  `export const LOCALE_VERSION = '${version}';\n`;

export const readLocaleVersion = () =>
  /LOCALE_VERSION = '([^']*)'/.exec(fs.existsSync(VERSION_FILE) ? fs.readFileSync(VERSION_FILE, 'utf8') : '')?.[1] ?? null;

/** Rewrites src/i18n/localeVersion.ts when the dictionaries changed. Returns true when written. */
export function writeLocaleVersion() {
  const version = computeLocaleVersion();
  if (readLocaleVersion() === version) return false;
  fs.writeFileSync(VERSION_FILE, versionSource(version));
  return true;
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const args = process.argv.slice(2);
  const fix = args.includes('--fix');
  const langArg = args.find((a) => a.startsWith('--lang='))?.slice(7);
  const langs = localeLanguages().filter((l) => l !== 'en' && (!langArg || langArg.split(',').includes(l)));
  const sources = loadEnglishSources();
  let problems = 0;
  for (const lang of langs) {
    const dict = readDictionary(lang);
    const state = loadState(lang);
    const needsRecheck = state.needsRecheck;
    const before = JSON.stringify(state);
    const { stale, orphan, reverted, rechecked } = reconcile(lang, dict, sources, state);
    const changedDict = stale + orphan + reverted + rechecked > 0;
    problems += stale + orphan + rechecked + (needsRecheck ? 1 : 0);
    if (changedDict || JSON.stringify(state) !== before) {
      console.log(
        `${lang.padEnd(6)} stale:${stale} removed:${orphan} back-in-English:${reverted}` +
          (needsRecheck ? ` rules changed, failed again:${rechecked}` : ''),
      );
    }
    if (fix) {
      if (changedDict) writeDictionary(lang, dict);
      if (JSON.stringify(state) !== before) saveState(lang, state);
    }
  }
  if (fix) {
    if (writeLocaleVersion()) console.log(`src/i18n/localeVersion.ts → ${readLocaleVersion()}`);
    console.log('✅ Pivot state reconciled');
  } else {
    const versionStale = readLocaleVersion() !== computeLocaleVersion();
    if (problems > 0 || versionStale) {
      if (problems > 0) console.error(`❌ Pivot translations are stale or were made under older gate rules (${problems}).`);
      if (versionStale) console.error('❌ src/i18n/localeVersion.ts does not match public/locales.');
      console.error('   Run: npm run i18n:pivot -- --fix');
      process.exit(1);
    }
    console.log('✅ Pivot translations match their checked English; locale version is current');
  }
}
