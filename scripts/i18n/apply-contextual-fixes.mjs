#!/usr/bin/env node
/**
 * Applies the contextual translation layer to the SHIPPED locale dictionaries
 * (public/locales/*.json) in place, without re-running machine translation:
 *
 *   1. Curated contextual corrections (scripts/i18n/contextual-corrections.mjs,
 *      including the verified packs in scripts/i18n/verified/) — human-verified
 *      whole-string fixes, highest priority. Verified keys missing from a
 *      dictionary are inserted.
 *   2. Maritime glossary whole-string overrides (getMaritimeTranslationOverride)
 *      — deterministic professional terminology per language. Trailing-colon
 *      and ALL-CAPS styling of the Turkish source label is preserved.
 *   3. Inline maritime corrections (applyMaritimeCorrections) — fixes leftover
 *      Turkish terms / known-bad tokens inside longer translated strings.
 *   4. Word-sense errors and Turkish leftovers (sense-error-rules.mjs): a machine
 *      translation that uses the everyday sense of a maritime term ("vineyard"
 *      for bağ, "iron" for demir, "explosion" for a whistle blast) is replaced
 *      with the English text.
 *
 * The English fill of the verified packs does not overwrite a current pivot
 * translation of the same checked English (translate-pivot.mjs, state in
 * scripts/i18n/pivot/); a text written by a person always does. Afterwards the
 * pivot state is reconciled and src/i18n/localeVersion.ts is refreshed.
 *
 * Run whenever the glossary or the corrections file changes:
 *   npm run i18n:fix
 *   npm run i18n:fix -- --lang=de,fr    # limit to some languages
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  getMaritimeTranslationOverride,
  applyMaritimeCorrections,
} from '../../src/utils/maritimeGlossary.ts';
import { normalizeMachineTranslation } from '../../src/utils/translationQuality.ts';
import {
  isAbbreviationOnly,
  renderAbbreviationOnly,
} from '../../src/utils/protectedTerms.ts';
import { CONTEXTUAL_CORRECTIONS, hasHumanTranslation } from './contextual-corrections.mjs';
import {
  hashText,
  loadEnglishSources,
  loadState,
  reconcile,
  saveState,
  writeLocaleVersion,
} from './pivot-state.mjs';
import { VERIFIED_KEYS } from './verified-corrections.mjs';
import { findSenseErrors, findTranslationDefects, findTurkishLeftovers } from './sense-error-rules.mjs';
import { repairEnglishMaritimeTerminology } from '../../src/utils/englishMaritimeTerminology.ts';

const repoRoot = process.cwd();
const OUT_DIR = path.join(repoRoot, 'public/locales');

const langArg = process.argv.slice(2).find((a) => a.startsWith('--lang='));
const onlyLangs = langArg ? langArg.slice('--lang='.length).split(',').map((s) => s.trim()) : null;
const files = fs
  .readdirSync(OUT_DIR)
  .filter((f) => f.endsWith('.json'))
  .filter((f) => !onlyLangs || onlyLangs.includes(f.replace(/\.json$/, '')))
  // English first: the other languages fall back to its (already fixed) text.
  .sort((a, b) => (a === 'en.json' ? -1 : b === 'en.json' ? 1 : a.localeCompare(b)));
let grandTotal = 0;
let grandFallbacks = 0;
let EN = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'en.json'), 'utf8'));
let PIVOT_SOURCES = loadEnglishSources();
const SHARED_ENGLISH = { ...PIVOT_SOURCES.paragraphs, ...PIVOT_SOURCES.learning };

// An English entry is a safe fallback when it has no wrong-sense hit and is
// not itself left in Turkish.
const englishFallback = (key) => {
  const text = EN[key] ?? SHARED_ENGLISH[key];
  if (typeof text !== 'string' || !text.trim()) return undefined;
  if (findSenseErrors(key, text, 'en').length) return undefined;
  if (findTurkishLeftovers(text).length > 3) return undefined;
  return text;
};

for (const file of files) {
  const lang = file.replace(/\.json$/, '');
  const filePath = path.join(OUT_DIR, file);
  const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let changed = 0;
  let fallbacks = 0;
  // Lines translated from the checked English (pivot layer). The English fill
  // of a verified pack must not undo them; a human text still wins.
  const pivotState = lang === 'en' ? null : loadState(lang);
  const isCurrentPivot = (key, value) => {
    const enHash = pivotState?.applied[hashText(key)];
    if (enHash === undefined) return false;
    const english = EN[key] ?? SHARED_ENGLISH[key];
    return typeof english === 'string' && value !== english && hashText(english) === enHash;
  };
  // Verified keys a dictionary does not have yet (new or rewritten source
  // strings) are added; without this they would go to the live translator.
  for (const key of VERIFIED_KEYS) {
    const text = CONTEXTUAL_CORRECTIONS[key]?.[lang];
    if (dict[key] === undefined && text !== undefined) {
      dict[key] = text;
      changed++;
    }
  }
  for (const [key, value] of Object.entries(dict)) {
    if (key.startsWith('__') || typeof value !== 'string') continue;

    let next = value;
    let correction = CONTEXTUAL_CORRECTIONS[key]?.[lang];
    if (correction !== undefined && !hasHumanTranslation(key, lang) && isCurrentPivot(key, value)) {
      correction = undefined;
    }
    if (correction !== undefined) {
      next = correction;
    } else if (isAbbreviationOnly(key)) {
      // "SOLAS V", "MF/HF", "DP 1" — no translatable words, so the entry is the
      // abbreviations themselves in this language's established form. Fixed in
      // place; these need no engine round-trip.
      next = renderAbbreviationOnly(key, lang);
    } else {
      const override = getMaritimeTranslationOverride(key, lang);
      if (override) {
        next = override;
        // Override matching tolerates a trailing colon on the source label
        // ("DÜMEN:" matches "Dümen") — restore the label's punctuation/casing.
        if (/:$/.test(key.trim()) && !/:$/.test(next)) next += ':';
        if (key === key.toLocaleUpperCase('tr-TR') && key !== key.toLocaleLowerCase('tr-TR')) {
          next = next.toLocaleUpperCase(lang);
        }
      } else {
        // Machine-translated entry: inline term corrections + systematic
        // machine-output cleanup (zero-width chars, "X (X)"/"x/x" duplicates,
        // leading-case drift). Curated corrections/overrides above are
        // human-authored and skip this on purpose.
        next = normalizeMachineTranslation(key, applyMaritimeCorrections(value, lang), lang);
      }
    }

    if (lang === 'en') next = repairEnglishMaritimeTerminology(key, next);

    // 4. Word-sense errors and Turkish leftovers (scripts/i18n/sense-error-rules.mjs)
    // in machine output: show the English text instead of a wrong translation.
    if (lang !== 'en' && correction === undefined && findTranslationDefects(key, next, lang, EN[key] ?? SHARED_ENGLISH[key]).length) {
      const fallback = englishFallback(key);
      if (fallback !== undefined && fallback !== next) {
        next = fallback;
        fallbacks++;
      }
    }

    if (next !== value) {
      dict[key] = next;
      changed++;
    }
  }

  if (pivotState) {
    // Lines this run put back into English (a new sense rule, a changed
    // English) leave the pivot state.
    const before = JSON.stringify(pivotState);
    const { stale, orphan } = reconcile(lang, dict, PIVOT_SOURCES, pivotState);
    changed += stale + orphan;
    if (JSON.stringify(pivotState) !== before) saveState(lang, pivotState);
  }

  if (changed > 0) {
    fs.writeFileSync(filePath, JSON.stringify(dict, null, 0) + '\n');
  }
  grandTotal += changed;
  grandFallbacks += fallbacks;
  if (lang === 'en') {
    EN = dict;
    // The pivot state compares against the English just written.
    PIVOT_SOURCES = loadEnglishSources();
  }
  console.log(`${lang.padEnd(6)} ${changed} entries fixed (${fallbacks} wrong-sense entries now in English)`);
}

if (writeLocaleVersion()) console.log('src/i18n/localeVersion.ts updated');
console.log(`\n✅ Done. ${grandTotal} dictionary entries corrected across ${files.length} languages (${grandFallbacks} wrong-sense entries now in English).`);
