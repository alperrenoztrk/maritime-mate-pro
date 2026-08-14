#!/usr/bin/env node
/**
 * Deterministically repairs the shipped English dictionary with the same
 * source-aware terminology rules used by the runtime translator.
 *
 * Usage:
 *   node scripts/i18n/repair-english-terminology.mjs
 *   node scripts/i18n/repair-english-terminology.mjs --check
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  findEnglishMaritimeTerminologyIssues,
  repairEnglishMaritimeTerminology,
} from '../../supabase/functions/_shared/englishMaritimeTerminology.ts';

const checkOnly = process.argv.includes('--check');
const dictionaryPath = path.join(process.cwd(), 'public/locales/en.json');
const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'));

let changed = 0;
let findingsBefore = 0;
const families = new Map();

for (const [source, value] of Object.entries(dictionary)) {
  if (source.startsWith('__') || typeof value !== 'string') continue;
  const issues = findEnglishMaritimeTerminologyIssues(source, value);
  findingsBefore += issues.length;
  for (const issue of issues) families.set(issue.id, (families.get(issue.id) ?? 0) + 1);

  const repaired = repairEnglishMaritimeTerminology(source, value);
  if (repaired === value) continue;
  changed += 1;
  if (!checkOnly) dictionary[source] = repaired;
}

if (!checkOnly && changed > 0) {
  fs.writeFileSync(dictionaryPath, JSON.stringify(dictionary) + '\n');
}

const mode = checkOnly ? 'check' : 'repair';
console.log(`English terminology ${mode}: ${changed} entries need changes; ${findingsBefore} findings in ${families.size} families.`);
if (families.size > 0) {
  console.log(
    [...families]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([id, count]) => `${id}:${count}`)
      .join(' '),
  );
}

if (checkOnly && changed > 0) process.exit(1);
