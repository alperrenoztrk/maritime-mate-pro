#!/usr/bin/env node
/**
 * Applies the contextual translation layer to the SHIPPED locale dictionaries
 * (public/locales/*.json) in place, without re-running machine translation:
 *
 *   1. Curated contextual corrections (scripts/i18n/contextual-corrections.mjs)
 *      — human-verified whole-string fixes, highest priority.
 *   2. Maritime glossary whole-string overrides (getMaritimeTranslationOverride)
 *      — deterministic professional terminology per language. Trailing-colon
 *      and ALL-CAPS styling of the Turkish source label is preserved.
 *   3. Inline maritime corrections (applyMaritimeCorrections) — fixes leftover
 *      Turkish terms / known-bad tokens inside longer translated strings.
 *
 * Run whenever the glossary or the corrections file changes:
 *   npm run i18n:fix
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  getMaritimeTranslationOverride,
  applyMaritimeCorrections,
} from '../../src/utils/maritimeGlossary.ts';
import { normalizeMachineTranslation } from '../../src/utils/translationQuality.ts';
import { CONTEXTUAL_CORRECTIONS } from './contextual-corrections.mjs';

const repoRoot = process.cwd();
const OUT_DIR = path.join(repoRoot, 'public/locales');

const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.json'));
let grandTotal = 0;

for (const file of files) {
  const lang = file.replace(/\.json$/, '');
  const filePath = path.join(OUT_DIR, file);
  const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let changed = 0;
  for (const [key, value] of Object.entries(dict)) {
    if (key.startsWith('__') || typeof value !== 'string') continue;

    let next = value;
    const correction = CONTEXTUAL_CORRECTIONS[key]?.[lang];
    if (correction !== undefined) {
      next = correction;
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

    if (next !== value) {
      dict[key] = next;
      changed++;
    }
  }

  if (changed > 0) {
    fs.writeFileSync(filePath, JSON.stringify(dict, null, 0) + '\n');
  }
  grandTotal += changed;
  console.log(`${lang.padEnd(6)} ${changed} entries fixed`);
}

console.log(`\n✅ Done. ${grandTotal} dictionary entries corrected across ${files.length} languages.`);
