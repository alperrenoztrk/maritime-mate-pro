#!/usr/bin/env node
/**
 * Word-sense error scan of the shipped dictionaries (public/locales/*.json):
 * everyday senses of maritime terms and Turkish words left in translations.
 * Rules live in scripts/i18n/sense-error-rules.mjs.
 *
 *   node scripts/i18n/scan-sense-errors.mjs                 # report
 *   node scripts/i18n/scan-sense-errors.mjs --lang=de,fr    # some languages
 *   node scripts/i18n/scan-sense-errors.mjs --samples=5     # show examples
 *   node scripts/i18n/scan-sense-errors.mjs --check         # exit 1 on any hit
 */
import fs from 'node:fs';
import { effectiveDictionary } from './effective-dictionary.mjs';
import path from 'node:path';
import { SENSE_ERROR_RULES, findTranslationDefects } from './sense-error-rules.mjs';

const OUT_DIR = path.join(process.cwd(), 'public/locales');
const args = process.argv.slice(2);
const check = args.includes('--check');
const langArg = args.find((a) => a.startsWith('--lang='))?.slice(7);
const samples = Number(args.find((a) => a.startsWith('--samples='))?.slice(10) ?? 0);
const langs = fs
  .readdirSync(OUT_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.slice(0, -5))
  .filter((l) => !langArg || langArg.split(',').includes(l))
  .sort();

let total = 0;
const perRule = new Map([...SENSE_ERROR_RULES.map((r) => [r.id, 0]), ['turkish-leftover', 0]]);
const en = effectiveDictionary('en', JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'en.json'), 'utf8')));
for (const lang of langs) {
  const dict = effectiveDictionary(lang, JSON.parse(fs.readFileSync(path.join(OUT_DIR, `${lang}.json`), 'utf8')));
  const counts = new Map();
  const shown = new Map();
  for (const [key, value] of Object.entries(dict)) {
    if (key.startsWith('__')) continue;
    // English fallback text: checked by the English rules, not as a translation.
    if (lang !== 'en' && value === en[key]) continue;
    for (const id of findTranslationDefects(key, value, lang, en[key])) {
      counts.set(id, (counts.get(id) ?? 0) + 1);
      perRule.set(id, perRule.get(id) + 1);
      total++;
      if ((shown.get(id) ?? 0) < samples) {
        shown.set(id, (shown.get(id) ?? 0) + 1);
        console.log(`   [${lang}] ${id}\n      ${JSON.stringify(key).slice(0, 150)}\n   →  ${JSON.stringify(value).slice(0, 150)}`);
      }
    }
  }
  const line = [...counts].map(([id, n]) => `${id}:${n}`).join(' ');
  console.log(`${lang.padEnd(6)} ${String([...counts.values()].reduce((a, b) => a + b, 0)).padStart(5)}  ${line}`);
}
console.log(`\nTotal ${total}: ${[...perRule].filter(([, n]) => n).map(([id, n]) => `${id}:${n}`).join(' ')}`);
if (check && total > 0) {
  console.error('❌ Word-sense errors found');
  process.exit(1);
}
