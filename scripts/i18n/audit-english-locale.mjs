#!/usr/bin/env node
/**
 * Fails when the shipped English interface is incomplete or still contains
 * Turkish copy. The audit is source-aware so intentional Turkish-letter Morse
 * examples and established non-Turkish proper names are not false positives.
 */
import fs from 'node:fs';
import path from 'node:path';
import { containsTurkishResidue } from './english-residuals.mjs';

const repoRoot = process.cwd();
const sourceFile = path.join(repoRoot, 'scripts/i18n/source-strings.json');
const localeFile = path.join(repoRoot, 'public/locales/en.json');
const strict = process.argv.includes('--strict');

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    console.error(`❌ Could not read ${path.relative(repoRoot, file)}: ${error.message}`);
    process.exit(1);
  }
};

const sourceData = readJson(sourceFile);
const dictionary = readJson(localeFile);
const sources = sourceData?.strings ?? [];

if (sources.length === 0) {
  console.error('❌ No extracted source strings. Run: npm run i18n:extract');
  process.exit(1);
}

const missing = [];
const untranslated = [];
const residual = [];

for (const source of sources) {
  const value = dictionary[source];
  if (typeof value !== 'string' || value.trim().length === 0) {
    missing.push(source);
    continue;
  }
  if (!containsTurkishResidue(source, value)) continue;
  (value === source ? untranslated : residual).push({ source, value });
}

const printItems = (title, items) => {
  if (items.length === 0) return;
  console.log(`\n${title} (${items.length})`);
  for (const item of items.slice(0, 100)) {
    if (typeof item === 'string') console.log(`  - ${JSON.stringify(item)}`);
    else console.log(`  - ${JSON.stringify(item.source)} → ${JSON.stringify(item.value)}`);
  }
  if (items.length > 100) console.log(`  … and ${items.length - 100} more`);
};

console.log('🔎 English interface audit');
console.log(`   source strings: ${sources.length}`);
console.log(`   missing: ${missing.length}`);
console.log(`   untranslated Turkish: ${untranslated.length}`);
console.log(`   Turkish residue in translations: ${residual.length}`);

printItems('Missing English entries', missing);
printItems('Untranslated Turkish entries', untranslated);
printItems('Partially translated entries', residual);

const issueCount = missing.length + untranslated.length + residual.length;
if (strict && issueCount > 0) {
  console.error(`\n❌ English interface audit failed with ${issueCount} issue(s)`);
  process.exit(1);
}

console.log(issueCount === 0
  ? '\n✅ English locale is complete and contains no detected Turkish UI residue'
  : `\n⚠️  English interface audit found ${issueCount} issue(s)`);
