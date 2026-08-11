#!/usr/bin/env node
/**
 * Re-keys shipped locale packs after interface strings were re-authored in
 * English.
 * ---------------------------------------------------------------------------
 * The dictionaries in public/locales/<lang>.json are keyed by the source string
 * the app renders. When a source string is rewritten from the legacy Turkish
 * wording to English, its old key stops matching and the other 23 languages
 * lose that string.
 *
 * This script repairs that mechanically and offline: given a { oldSource:
 * newSource } map it copies the existing translation onto the new key.
 *
 *   <lang>.json :  dict[newSource] = dict[oldSource]
 *   en.json     :  dict[newSource] = newSource   (identity — the authored
 *                  English is the source, so the lookup must be a no-op rather
 *                  than the older machine translation of the Turkish wording)
 *
 * Existing keys are never removed: an old key may still be reachable from
 * content that was not rewritten.
 *
 * The map of rewrites applied when the interface was moved to English lives in
 * scripts/i18n/source-rewrites.json. Re-run this after regenerating the packs,
 * otherwise the re-authored interface strings fall back to English in every
 * language.
 *
 * Usage: node scripts/i18n/rekey-rewritten-sources.mjs scripts/i18n/source-rewrites.json [--dry-run]
 */
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const OUT_DIR = path.join(repoRoot, 'public/locales');
const mapFile = process.argv[2];
const dryRun = process.argv.includes('--dry-run');

if (!mapFile) {
  console.error('usage: node scripts/i18n/rekey-rewritten-sources.mjs <map.json> [--dry-run]');
  process.exit(1);
}

const rawMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

// Only whole source strings can be dictionary keys. The map also carries
// partial template fragments (a rewrite of one chunk of a template literal),
// which the runtime never looks up — keeping them out stops the packs from
// growing keys that can never match.
const SOURCE_FILE = path.join(repoRoot, 'scripts/i18n/source-strings.json');
const extracted = new Set(JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8')).strings);

const pairs = Object.entries(rawMap).filter(
  ([from, to]) => from && to && from !== to && extracted.has(to),
);
console.log(`rewrite map: ${pairs.length} of ${Object.keys(rawMap).length} pairs are extracted source strings`);

const localeFiles = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.json')).sort();
let totalAdded = 0;

for (const file of localeFiles) {
  const full = path.join(OUT_DIR, file);
  const lang = file.replace(/\.json$/, '');
  const dict = JSON.parse(fs.readFileSync(full, 'utf8'));
  let added = 0;

  for (const [from, to] of pairs) {
    if (Object.prototype.hasOwnProperty.call(dict, to)) continue;
    if (lang === 'en') {
      // The English source needs a resolvable, network-free identity entry.
      dict[to] = to;
      added += 1;
      continue;
    }
    const existing = dict[from];
    if (typeof existing === 'string' && existing.trim()) {
      dict[to] = existing;
      added += 1;
    }
  }

  if (added > 0 && !dryRun) {
    fs.writeFileSync(full, JSON.stringify(dict, null, 0));
  }
  totalAdded += added;
  console.log(`   ${file.padEnd(12)} +${added}`);
}

console.log(`\n${dryRun ? '[dry run] ' : ''}added ${totalAdded} keys across ${localeFiles.length} locales`);
