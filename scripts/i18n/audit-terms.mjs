#!/usr/bin/env node
/**
 * Terminology audit for the shipped dictionaries.
 * -----------------------------------------------
 * Machine translation damages this corpus in two systematic ways, and both are
 * silent — the output reads fluently, it is just wrong:
 *
 *   1. Technical abbreviations get "corrected" into other abbreviations or
 *      dropped entirely ("DP" → "XP", "KB" → "NW", "GM" translated away).
 *   2. Ambiguous Turkish maritime words land on their everyday sense
 *      ("baş kontrolü" → "head control", "KG hesabı" → "KG account").
 *
 * src/utils/protectedTerms.ts and the maritime glossary now stop both at
 * translation time. This script is the other half: it reports the damage still
 * baked into public/locales/*.json, so it can be repaired, and it fails the
 * build if the damage ever comes back.
 *
 * Usage:
 *   node scripts/i18n/audit-terms.mjs               # report
 *   node scripts/i18n/audit-terms.mjs --strict      # non-zero exit on findings
 *   node scripts/i18n/audit-terms.mjs --json        # repair queue on stdout
 *   node scripts/i18n/audit-terms.mjs --lang=de,fr  # limit the scan
 *   node scripts/i18n/audit-terms.mjs --samples=5   # examples per finding
 */
import fs from 'node:fs';
import path from 'node:path';
import { findTermIssues } from './term-audit-rules.mjs';

const repoRoot = process.cwd();
const OUT_DIR = path.join(repoRoot, 'public/locales');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
  })
);
const strict = !!args.strict;
const asJson = !!args.json;
const sampleCount = args.samples ? parseInt(args.samples, 10) : 2;
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

/** @type {Record<string, string[]>} language → source strings needing repair */
const repairQueue = {};
const report = [];
let grandTotal = 0;

for (const file of files) {
  const lang = file.replace(/\.json$/, '');
  const raw = fs.readFileSync(path.join(OUT_DIR, file), 'utf8').trim();
  if (!raw) {
    report.push({ lang, empty: true, tokens: 0, senses: 0, findings: [] });
    continue;
  }
  const dict = JSON.parse(raw);

  const tokenCounts = new Map();
  const senseCounts = new Map();
  const samples = new Map();
  const queue = new Set();

  for (const [source, value] of Object.entries(dict)) {
    if (source.startsWith('__') || typeof value !== 'string') continue;

    for (const { kind, label } of findTermIssues(source, value, lang)) {
      const counts = kind === 'abbreviation' ? tokenCounts : senseCounts;
      counts.set(label, (counts.get(label) ?? 0) + 1);
      if ((samples.get(label) ?? []).length < sampleCount) {
        samples.set(label, [...(samples.get(label) ?? []), [source, value]]);
      }
      queue.add(source);
    }
  }

  const tokens = [...tokenCounts.values()].reduce((a, b) => a + b, 0);
  const senses = [...senseCounts.values()].reduce((a, b) => a + b, 0);
  grandTotal += queue.size;
  if (queue.size > 0) repairQueue[lang] = [...queue];

  report.push({
    lang,
    empty: false,
    tokens,
    senses,
    entries: queue.size,
    findings: [...tokenCounts, ...senseCounts]
      .sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({ label, count, samples: samples.get(label) ?? [] })),
  });
}

if (asJson) {
  process.stdout.write(JSON.stringify(repairQueue));
  process.exit(strict && grandTotal > 0 ? 1 : 0);
}

console.log('🔎 Terminology audit of public/locales\n');
console.log(`   ${'lang'.padEnd(8)}${'entries'.padStart(9)}${'abbrev.'.padStart(10)}${'senses'.padStart(9)}`);
for (const row of report) {
  if (row.empty) {
    console.log(`   ${row.lang.padEnd(8)}${'(empty file)'.padStart(28)}`);
    continue;
  }
  console.log(
    `   ${row.lang.padEnd(8)}${String(row.entries).padStart(9)}${String(row.tokens).padStart(10)}${String(row.senses).padStart(9)}`
  );
}

for (const row of report) {
  if (row.empty || row.findings.length === 0) continue;
  console.log(`\n── ${row.lang} ${'─'.repeat(60 - row.lang.length)}`);
  for (const finding of row.findings) {
    console.log(`   ${String(finding.count).padStart(5)}  ${finding.label}`);
    for (const [source, value] of finding.samples) {
      console.log(`          ${JSON.stringify(source.slice(0, 58))}`);
      console.log(`       →  ${JSON.stringify(value.slice(0, 58))}`);
    }
  }
}

console.log(`\n${grandTotal} dictionary entries need repair across ${files.length} languages.`);
if (grandTotal > 0) {
  console.log('   Repair them with:  npm run i18n:repair && npm run i18n:generate');
}

if (strict && grandTotal > 0) {
  console.error('\n❌ Terminology audit failed');
  process.exit(1);
}
console.log('\n✅ Terminology audit complete');
