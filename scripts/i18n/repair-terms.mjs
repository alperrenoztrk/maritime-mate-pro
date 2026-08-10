#!/usr/bin/env node
/**
 * Drops terminology-damaged entries so they can be translated again.
 * ------------------------------------------------------------------
 * The shipped dictionaries were generated before the protected-abbreviation
 * layer existed, so they carry translations the engine corrupted ("DP" → "XP",
 * "ARPA" → "Barley", "COW" → "KUH", "KG hesabı" → "KG account"). Those entries
 * cannot be patched in place — the correct text has to come from a translation
 * round-trip — so this script removes them from BOTH the shipped dictionary and
 * the incremental generator cache. The next `npm run i18n:generate` then
 * re-translates exactly those strings through the protected pipeline.
 *
 * The detection rules are shared with the audit (./term-audit-rules.mjs), so a
 * repair removes precisely what `npm run i18n:audit-terms` reports.
 *
 * Usage:
 *   node scripts/i18n/repair-terms.mjs                # repair every locale
 *   node scripts/i18n/repair-terms.mjs --lang=de,fr   # limit the scan
 *   node scripts/i18n/repair-terms.mjs --dry-run      # report, write nothing
 *
 * Then:  npm run i18n:generate    (and npm run i18n:fix)
 */
import fs from 'node:fs';
import path from 'node:path';
import { findTermIssues } from './term-audit-rules.mjs';

const repoRoot = process.cwd();
const OUT_DIR = path.join(repoRoot, 'public/locales');
const CACHE_DIR = path.join(repoRoot, 'scripts/i18n/.cache');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
  })
);
const dryRun = !!args['dry-run'];
const onlyLangs = args.lang ? String(args.lang).split(',').map((s) => s.trim()) : null;

if (!fs.existsSync(OUT_DIR)) {
  console.error(`❌ No locales directory at ${path.relative(repoRoot, OUT_DIR)}`);
  process.exit(1);
}

const files = fs
  .readdirSync(OUT_DIR)
  .filter((f) => f.endsWith('.json'))
  .filter((f) => !onlyLangs || onlyLangs.includes(f.replace(/\.json$/, '')))
  .sort();

console.log(`🧹 Repairing terminology damage${dryRun ? ' (dry run)' : ''}\n`);
console.log(`   ${'lang'.padEnd(8)}${'dropped'.padStart(9)}${'cache'.padStart(8)}${'remaining'.padStart(11)}`);

let grandTotal = 0;
for (const file of files) {
  const lang = file.replace(/\.json$/, '');
  const dictPath = path.join(OUT_DIR, file);
  const raw = fs.readFileSync(dictPath, 'utf8').trim();
  if (!raw) {
    console.log(`   ${lang.padEnd(8)}${'(empty file)'.padStart(28)}`);
    continue;
  }

  const dict = JSON.parse(raw);
  const damaged = [];
  for (const [source, value] of Object.entries(dict)) {
    if (source.startsWith('__') || typeof value !== 'string') continue;
    if (findTermIssues(source, value, lang).length > 0) damaged.push(source);
  }

  for (const source of damaged) delete dict[source];

  // The generator seeds itself from this cache, so a stale entry here would put
  // the damaged translation straight back into the dictionary.
  const cachePath = path.join(CACHE_DIR, `${lang}.json`);
  let cacheDropped = 0;
  let cache = null;
  if (fs.existsSync(cachePath)) {
    cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    for (const source of damaged) {
      if (cache[source] !== undefined) { delete cache[source]; cacheDropped++; }
    }
  }

  if (!dryRun && damaged.length > 0) {
    // Compact output: these files must stay as small as possible in the repo.
    fs.writeFileSync(dictPath, JSON.stringify(dict) + '\n');
    if (cache) fs.writeFileSync(cachePath, JSON.stringify(cache));
  }

  grandTotal += damaged.length;
  const remaining = Object.keys(dict).filter((k) => !k.startsWith('__')).length;
  console.log(
    `   ${lang.padEnd(8)}${String(damaged.length).padStart(9)}${String(cacheDropped).padStart(8)}${String(remaining).padStart(11)}`
  );
}

console.log(`\n${dryRun ? 'Would drop' : 'Dropped'} ${grandTotal} damaged entries.`);
if (!dryRun && grandTotal > 0) {
  console.log('   Re-translate them with:  npm run i18n:generate');
}
