#!/usr/bin/env node
/**
 * Dictionary-page packs for the languages without a hand-checked pack
 * -----------------------------------------------------------------------------
 * src/data/glossary-i18n/<lang>.json holds the dictionary page (Glossary.tsx)
 * per language: { categories: {tr: text}, terms: {tr: [headword, definition]} }.
 * en, de, es, fr, it, nl and pt were written and checked by hand and are never
 * touched here. For the other languages this script translates the CHECKED
 * ENGLISH pack through the same gates as translate-pivot.mjs:
 *
 *   - the headword is the term itself and stays as in the English pack
 *     (a maritime term is never machine translated on its own);
 *   - the definition and the category names are translated; a text that fails
 *     a gate keeps its English.
 *
 * Generated packs carry "meta" (gates version + hash of each English text), so
 * a re-run only translates new or changed English.
 *
 *   npm run i18n:glossary -- --lang=ja,ko      # or --lang=all
 *   npm run i18n:glossary -- --check           # exit 1 when a generated pack is stale
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  BATCH_SEPARATOR,
  buildTranslationBatches,
  runWithConcurrency,
  splitBatchResult,
  translateText,
} from './mt-engine.mjs';
import { GATES_VERSION, checkForKey, finalizePivot, preparePivot } from './pivot-gates.mjs';
import { hashText } from './pivot-state.mjs';
import { SHIPPED_LANGUAGES } from './verified-corrections.mjs';

const PACK_DIR = path.join(process.cwd(), 'src/data/glossary-i18n');
const readJson = (file, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
};

const args = process.argv.slice(2);
const check = args.includes('--check');
const langArg = args.find((a) => a.startsWith('--lang='))?.slice(7) ?? 'all';
const english = readJson(path.join(PACK_DIR, 'en.json'), null);
if (!english) throw new Error('src/data/glossary-i18n/en.json is missing');

const packFile = (lang) => path.join(PACK_DIR, `${lang}.json`);
/** A pack written by hand (no meta) is never regenerated. */
const isHandChecked = (lang) => {
  if (lang === 'en') return true;
  const pack = readJson(packFile(lang), null);
  return !!pack && pack.meta?.generated !== 'pivot';
};
const langs = SHIPPED_LANGUAGES.filter(
  (lang) => !isHandChecked(lang) && (langArg === 'all' || langArg.split(',').includes(lang)),
);

/** Every English text of the pack with its stable id. */
const englishTexts = () => {
  const out = [];
  for (const [tr, text] of Object.entries(english.categories)) out.push({ id: `c:${tr}`, key: tr, text });
  for (const [tr, [, definition]] of Object.entries(english.terms)) out.push({ id: `t:${tr}`, key: tr, text: definition });
  return out;
};

const isStale = (lang) => {
  const pack = readJson(packFile(lang), null);
  if (!pack) return true;
  if (pack.meta?.gates !== GATES_VERSION) return true;
  return englishTexts().some(({ id, text }) => pack.meta?.sources?.[id] !== hashText(text));
};

if (check) {
  const stale = langs.filter(isStale);
  if (stale.length) {
    console.error(`❌ Dictionary-page packs out of date: ${stale.join(', ')}. Run: npm run i18n:glossary`);
    process.exit(1);
  }
  console.log(`✅ Generated dictionary-page packs are current (${langs.length} languages)`);
  process.exit(0);
}

for (const lang of langs) {
  const previous = readJson(packFile(lang), null);
  const reuse = previous?.meta?.gates === GATES_VERSION ? previous : null;
  const translated = new Map();
  const todo = [];
  for (const item of englishTexts()) {
    const enHash = hashText(item.text);
    const old = reuse?.meta?.sources?.[item.id] === enHash
      ? item.id.startsWith('c:') ? reuse.categories[item.key] : reuse.terms[item.key]?.[1]
      : undefined;
    if (typeof old === 'string') translated.set(item.id, old);
    else todo.push(item);
  }

  // Final = translated, or kept in English by a gate. A network failure is not
  // final: it has no hash in meta.sources and is tried again next run.
  const final = new Set(translated.keys());
  const kept = new Map();
  const keep = (id, reason) => {
    final.add(id);
    kept.set(reason, (kept.get(reason) ?? 0) + 1);
  };
  const pending = [];
  for (const item of todo) {
    const prep = preparePivot(item.text, lang);
    if (prep.kind === 'direct') {
      translated.set(item.id, prep.value);
      final.add(item.id);
    } else if (prep.kind === 'keep') keep(item.id, prep.reason);
    else pending.push({ ...item, prep });
  }
  const byQuery = new Map();
  for (const item of pending) byQuery.set(item.prep.query, [...(byQuery.get(item.prep.query) ?? []), item]);
  const finish = (query, raw) => {
    for (const item of byQuery.get(query)) {
      const done = finalizePivot(item.text, raw, item.prep, lang);
      // The headword carries the term's abbreviation; the definition need not
      // repeat it, so only the word-sense rules apply to the key here.
      const reason = done.ok ? checkForKey(item.key, done.value, lang, { abbreviations: false }) : done.reason;
      if (reason) keep(item.id, reason);
      else {
        translated.set(item.id, done.value);
        final.add(item.id);
      }
    }
  };
  let failures = 0;
  await runWithConcurrency(buildTranslationBatches([...byQuery.keys()]), 4, async (batch) => {
    const joined = batch.length > 1 ? await translateText(batch.join(BATCH_SEPARATOR), lang, 'en') : null;
    const parts = joined === null ? null : splitBatchResult(joined, batch.length);
    if (parts) return batch.forEach((query, i) => finish(query, parts[i]));
    for (const query of batch) {
      const raw = await translateText(query, lang, 'en');
      if (raw === null) failures++;
      else finish(query, raw);
    }
  });

  const sources = {};
  const pack = { categories: {}, terms: {}, meta: { generated: 'pivot', gates: GATES_VERSION, sources } };
  for (const item of englishTexts()) {
    const value = translated.get(item.id) ?? item.text;
    if (item.id.startsWith('c:')) pack.categories[item.key] = value;
    else pack.terms[item.key] = [english.terms[item.key][0], value];
    if (final.has(item.id)) sources[item.id] = hashText(item.text);
  }
  fs.writeFileSync(packFile(lang), JSON.stringify(pack, null, 1) + '\n');
  const keptText = [...kept].map(([r, n]) => `${r}:${n}`).join(' ');
  console.log(
    `${lang.padEnd(6)} translated ${translated.size}/${englishTexts().length}` +
      (keptText ? `  kept in English: ${keptText}` : '') +
      (failures ? `  network failures: ${failures} (run again)` : ''),
  );
}
if (!langs.length) console.log('No language without a hand-checked dictionary-page pack selected.');
