#!/usr/bin/env node
/**
 * Translation coverage report.
 * ----------------------------
 * Verifies that every extracted source string has an entry in each generated
 * public/locales/<lang>.json, and reports per-language coverage %.
 *
 * Usage: node scripts/i18n/check-coverage.mjs   (npm run i18n:check)
 * Exit codes: 0 always (report-only) unless --strict is passed and a present
 * locale is below 100%.
 */
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const SOURCE_FILE = path.join(repoRoot, 'scripts/i18n/source-strings.json');
const OUT_DIR = path.join(repoRoot, 'public/locales');
const strict = process.argv.includes('--strict');

const readJson = (file, fallback) => {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
};

const source = readJson(SOURCE_FILE, null);
if (!source?.strings?.length) {
  console.error('❌ No source strings. Run: npm run i18n:extract');
  process.exit(1);
}
const total = source.strings.length;

if (!fs.existsSync(OUT_DIR)) {
  console.log(`ℹ️  No locales generated yet (${path.relative(repoRoot, OUT_DIR)} missing).`);
  console.log('   Run: npm run i18n:pretranslate');
  process.exit(0);
}

const localeFiles = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.json'));
if (localeFiles.length === 0) {
  console.log('ℹ️  No locale files found. Run: npm run i18n:pretranslate');
  process.exit(0);
}

console.log(`📊 Coverage against ${total} source strings:\n`);
let belowFull = 0;
for (const file of localeFiles.sort()) {
  const dict = readJson(path.join(OUT_DIR, file), {});
  let covered = 0;
  for (const s of source.strings) {
    if (typeof dict[s] === 'string' && dict[s].trim().length > 0) covered++;
  }
  const pct = ((covered / total) * 100).toFixed(1);
  if (covered < total) belowFull++;
  console.log(`   ${file.padEnd(12)} ${String(covered).padStart(6)}/${total}  ${pct}%`);
}

if (strict && belowFull > 0) {
  console.error(`\n❌ ${belowFull} locale(s) below 100% coverage`);
  process.exit(1);
}
console.log('\n✅ Coverage report complete');
