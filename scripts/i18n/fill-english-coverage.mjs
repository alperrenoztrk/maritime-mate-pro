#!/usr/bin/env node
/**
 * Fills dictionary gaps left by NEW ENGLISH UI strings.
 * -----------------------------------------------------------------------------
 * A UI change (a Lovable edit, a feature PR) that adds or rewords an English
 * label has no entry in public/locales/*.json yet. `i18n:check --strict` then
 * fails and the release workflow produces no AAB, although nothing is wrong
 * with the text. This script closes exactly that gap:
 *
 *   - English gaps: the English text itself is written into every locale. This
 *     is the same rule as verified/ui-coverage.json: a checked English line is
 *     acceptable in another language, a wrong machine translation is not. The
 *     filled text still goes through the term audits that follow in
 *     `i18n:verify`, so a wrong maritime term still blocks the build.
 *   - Turkish gaps are never filled: Turkish must not reach the screen. They
 *     stay as coverage errors (the build keeps failing) until checked English
 *     is added to a verified pack.
 *
 * Run `npm run i18n:extract` first (source-strings.json is not tracked).
 *
 *   npm run i18n:fill-english             fill locales + record in ui-coverage.json
 *   npm run i18n:fill-english -- --ci     fill locales only, print GitHub annotations
 *   npm run i18n:fill-english -- --check  report only, exit 1 when a gap exists
 */
import fs from 'node:fs';
import path from 'node:path';
import { hasTurkishText } from '../../src/utils/turkishText.ts';

const repoRoot = process.cwd();
const SOURCE_FILE = path.join(repoRoot, 'scripts/i18n/source-strings.json');
const OUT_DIR = path.join(repoRoot, 'public/locales');
const LEARNING_PACK = path.join(OUT_DIR, 'shared/learning-guide.en.json');
const UI_COVERAGE = path.join(repoRoot, 'scripts/i18n/verified/ui-coverage.json');

const args = new Set(process.argv.slice(2));
const ci = args.has('--ci');
const checkOnly = args.has('--check');
const record = !ci && !checkOnly;

const readJson = (file, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
};

const source = readJson(SOURCE_FILE, null);
if (!source?.strings?.length) {
  console.error('❌ No source strings. Run: npm run i18n:extract');
  process.exit(1);
}
const learning = readJson(LEARNING_PACK, {});
const covered = (dict, s) =>
  (typeof dict[s] === 'string' && dict[s].trim().length > 0) ||
  (typeof learning[s] === 'string' && learning[s].trim().length > 0);

const localeFiles = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.json')).sort();
const dicts = Object.fromEntries(localeFiles.map((f) => [f, readJson(path.join(OUT_DIR, f), {})]));

// A gap is a source string missing from at least one locale.
const gaps = source.strings.filter((s) => localeFiles.some((f) => !covered(dicts[f], s)));
const turkish = gaps.filter((s) => hasTurkishText(s));
const english = gaps.filter((s) => !hasTurkishText(s));

// GitHub annotation text: one line, with the characters the runner parses escaped.
const annotate = (s) => s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').slice(0, 300);

if (checkOnly) {
  for (const s of english) console.log(`  english gap: ${JSON.stringify(s)}`);
  for (const s of turkish) console.log(`  TURKISH gap: ${JSON.stringify(s)}`);
  console.log(`${english.length} English and ${turkish.length} Turkish strings have no dictionary entry.`);
  process.exit(gaps.length ? 1 : 0);
}

let written = 0;
if (english.length) {
  for (const f of localeFiles) {
    const dict = dicts[f];
    let changed = 0;
    for (const s of english) {
      if (!covered(dict, s)) {
        dict[s] = s;
        changed++;
      }
    }
    if (changed) {
      fs.writeFileSync(path.join(OUT_DIR, f), JSON.stringify(dict, null, 0) + '\n');
      written += changed;
    }
  }
}

if (record && english.length) {
  const pack = readJson(UI_COVERAGE, {});
  for (const s of english) if (!pack[s]) pack[s] = { en: s };
  fs.writeFileSync(UI_COVERAGE, JSON.stringify(pack, null, 1) + '\n');
}

for (const s of english) {
  if (ci) console.log(`::warning title=English fill (add to verified/ui-coverage.json)::${annotate(s)}`);
  else console.log(`  filled: ${JSON.stringify(s)}`);
}
for (const s of turkish) {
  if (ci) console.log(`::error title=Turkish UI text without checked English::${annotate(s)}`);
  else console.log(`  NOT filled (Turkish): ${JSON.stringify(s)}`);
}

console.log(
  `✅ ${english.length} new English strings filled in ${localeFiles.length} locales (${written} entries)` +
    (record && english.length ? ', recorded in verified/ui-coverage.json' : '') +
    (turkish.length ? `; ❌ ${turkish.length} Turkish strings need checked English` : ''),
);

if (ci && process.env.GITHUB_STEP_SUMMARY && (english.length || turkish.length)) {
  const lines = ['### i18n gaps', ''];
  if (english.length) lines.push(`English strings filled for this build (${english.length}):`, '', ...english.map((s) => `- ${s.replace(/\n/g, ' ')}`), '');
  if (turkish.length) lines.push(`Turkish strings without checked English (${turkish.length}) — build stops:`, '', ...turkish.map((s) => `- ${s.replace(/\n/g, ' ')}`), '');
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n') + '\n');
}
