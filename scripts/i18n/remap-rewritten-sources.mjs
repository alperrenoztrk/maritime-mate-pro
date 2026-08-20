#!/usr/bin/env node
/**
 * Carries existing translations across a source rewrite.
 * ---------------------------------------------------------------------------
 * When a Turkish source string in src/ is rewritten into English, every shipped
 * dictionary keeps a perfectly good translation of it — under the OLD Turkish
 * key, which nothing looks up any more. The new English key is simply the
 * English pack's value for that old key, so the translation can be re-filed
 * without a single network request:
 *
 *     en.json:  "Yükleme durumu"  ->  "Upload status"        (the rewrite)
 *     de.json:  "Yükleme durumu"  ->  "Upload-Status"
 *     ⇒ de.json gains "Upload status" -> "Upload-Status"
 *
 * Without this step a German reader loses every rewritten string to the live
 * translator — and to the source language when the device is offline.
 *
 * Usage:
 *   node scripts/i18n/remap-rewritten-sources.mjs            # all languages
 *   node scripts/i18n/remap-rewritten-sources.mjs --lang=de,fr
 *   node scripts/i18n/remap-rewritten-sources.mjs --dry-run
 *
 * Run `npm run i18n:extract` first: the current source strings decide which
 * English keys are actually wanted.
 */
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const SOURCE_FILE = path.join(repoRoot, 'scripts/i18n/source-strings.json');
const OUT_DIR = path.join(repoRoot, 'public/locales');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const langArg = args.find((a) => a.startsWith('--lang='))?.slice('--lang='.length);

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const source = readJson(SOURCE_FILE);
const sourceStrings = new Set(source.strings ?? source);
if (sourceStrings.size === 0) {
  console.error('❌ No source strings. Run: npm run i18n:extract');
  process.exit(1);
}

const english = readJson(path.join(OUT_DIR, 'en.json'));

// old Turkish key → new English key, for the English strings the app now uses.
const rewritten = new Map();
for (const [oldKey, newKey] of Object.entries(english)) {
  if (oldKey.startsWith('__') || typeof newKey !== 'string') continue;
  if (oldKey === newKey || !newKey.trim()) continue;
  if (!sourceStrings.has(newKey) || sourceStrings.has(oldKey)) continue;
  // A single English string can be the translation of several Turkish ones;
  // the first wins, exactly as the runtime lookup would resolve it.
  if (!rewritten.has(newKey)) rewritten.set(newKey, oldKey);
}
console.log(`↔  ${rewritten.size} rewritten source strings recoverable from en.json`);

const languages = langArg
  ? langArg.split(',').map((l) => l.trim()).filter(Boolean)
  : fs
      .readdirSync(OUT_DIR)
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace(/\.json$/, ''));

for (const lang of languages) {
  const file = path.join(OUT_DIR, `${lang}.json`);
  if (!fs.existsSync(file)) {
    console.warn(`⚠️  ${lang}.json not found, skipping`);
    continue;
  }
  const pack = readJson(file);
  let added = 0;
  for (const [newKey, oldKey] of rewritten) {
    if (pack[newKey] !== undefined) continue;
    const translated = pack[oldKey];
    if (typeof translated !== 'string' || !translated.trim()) continue;
    pack[newKey] = translated;
    added += 1;
  }
  if (!dryRun && added > 0) fs.writeFileSync(file, JSON.stringify(pack));
  console.log(`   ${lang.padEnd(6)} +${added}`);
}

console.log(dryRun ? '✅ Dry run complete (nothing written)' : '✅ Remap complete');
