#!/usr/bin/env node
/**
 * Builds the shared English pack for lesson paragraphs.
 * -----------------------------------------------------
 * scripts/i18n/verified/paragraphs/<module>.json holds checked English for the
 * Turkish `paragraphs` texts: { "<Turkish paragraph>": "<English>" }.
 * They are merged into public/locales/shared/lesson-paragraphs.en.json, which
 * the runtime adds to every language's dictionary as a fallback
 * (src/utils/staticTranslations.ts). A paragraph with no checked text in the
 * reader's language therefore shows this English text, not a live machine
 * translation of the Turkish.
 *
 * Every English text must pass the English terminology rules and the sense
 * rules, and must not contain Turkish words.
 *
 *   node --import tsx scripts/i18n/build-paragraph-pack.mjs           # build + report
 *   node --import tsx scripts/i18n/build-paragraph-pack.mjs --check   # exit 1 if stale or invalid
 */
import fs from 'node:fs';
import path from 'node:path';
import { findEnglishMaritimeTerminologyIssues } from '../../supabase/functions/_shared/englishMaritimeTerminology.ts';
import { findSenseErrors, findTurkishLeftovers } from './sense-error-rules.mjs';
import { VERIFIED_KEYS } from './verified-corrections.mjs';

const repoRoot = process.cwd();
const PACK_DIR = path.join(repoRoot, 'scripts/i18n/verified/paragraphs');
const SOURCES = path.join(repoRoot, 'scripts/i18n/paragraph-sources.json');
const OUT_FILE = path.join(repoRoot, 'public/locales/shared/lesson-paragraphs.en.json');
const check = process.argv.includes('--check');

const { paragraphs } = JSON.parse(fs.readFileSync(SOURCES, 'utf8'));
const sourceFile = new Map(paragraphs.map((p) => [p.text, p.file]));

const merged = {};
const problems = [];
let stale = 0;
const packFiles = fs.existsSync(PACK_DIR)
  ? fs.readdirSync(PACK_DIR).filter((f) => f.endsWith('.json')).sort()
  : [];
for (const file of packFiles) {
  const pack = JSON.parse(fs.readFileSync(path.join(PACK_DIR, file), 'utf8'));
  for (const [source, english] of Object.entries(pack)) {
    const where = `${file}: "${source.slice(0, 50)}…"`;
    if (typeof english !== 'string' || !english.trim()) {
      problems.push(`${where} has no English text`);
      continue;
    }
    if (merged[source] !== undefined) problems.push(`${where} is in two packs`);
    if (!sourceFile.has(source)) {
      // The Turkish text was edited or removed; the old translation is not shipped.
      stale += 1;
      continue;
    }
    for (const issue of findEnglishMaritimeTerminologyIssues(source, english)) {
      problems.push(`${where} ${issue.id} ${issue.label}`);
    }
    for (const id of findSenseErrors(source, english, 'en')) problems.push(`${where} ${id}`);
    const leftovers = findTurkishLeftovers(english);
    if (leftovers.length) problems.push(`${where} Turkish words: ${leftovers.join(', ')}`);
    merged[source] = english;
  }
}

const sorted = Object.fromEntries(Object.keys(merged).sort().map((k) => [k, merged[k]]));
const output = JSON.stringify(sorted) + '\n';
const current = fs.existsSync(OUT_FILE) ? fs.readFileSync(OUT_FILE, 'utf8') : '';

// Coverage per module (a paragraph already in a verified dictionary pack counts).
const moduleOf = (file) => {
  const rel = file.replace(/^src\/data\//, '');
  if (rel.startsWith('crewTasks/') || rel.startsWith('shipSystems/')) return rel.split('/').slice(0, 2).join('/');
  if (rel.startsWith('shipOperations/longform/')) return rel.split('/').slice(0, 3).join('/');
  return rel.replace(/\.tsx?$/, '');
};
const coverage = new Map();
for (const { text, file } of paragraphs) {
  const m = moduleOf(file);
  const row = coverage.get(m) ?? { total: 0, done: 0 };
  row.total += 1;
  if (merged[text] !== undefined || VERIFIED_KEYS.has(text)) row.done += 1;
  coverage.set(m, row);
}
let total = 0;
let done = 0;
for (const [m, row] of [...coverage].sort()) {
  total += row.total;
  done += row.done;
  if (!check) console.log(`${m.padEnd(40)} ${String(row.done).padStart(5)} / ${row.total}`);
}
console.log(`Lesson paragraphs with checked English: ${done} / ${total}` + (stale ? ` (${stale} stale entries skipped)` : ''));

if (done !== total) problems.push(`${total - done} lesson paragraphs lack checked English`);

if (problems.length) {
  console.error(`❌ ${problems.length} problem(s):`);
  for (const p of problems.slice(0, 50)) console.error('  ' + p);
  process.exit(1);
}
if (check) {
  if (current !== output) {
    console.error('❌ public/locales/shared/lesson-paragraphs.en.json is out of date: run npm run i18n:paragraphs');
    process.exit(1);
  }
} else if (current !== output) {
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, output);
  console.log(`✅ Wrote ${Object.keys(sorted).length} paragraphs → ${path.relative(repoRoot, OUT_FILE)}`);
}
