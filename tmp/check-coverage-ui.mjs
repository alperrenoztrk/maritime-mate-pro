#!/usr/bin/env node
// Cross-check the UI-layer Turkish strings against the shipped en.json dictionary.
import fs from 'node:fs';
import path from 'node:path';

const SP = process.env.OUT_DIR || '.';
const findings = JSON.parse(fs.readFileSync(path.join(SP, 'turkish-findings.json'), 'utf8'));
const dict = JSON.parse(fs.readFileSync('public/locales/en.json', 'utf8'));
const entries = dict.translations || dict;
console.log('dict keys:', Object.keys(entries).length, 'top-level shape:', Object.keys(dict).slice(0, 5));

const missing = [];
const covered = [];
const seen = new Set();
for (const f of findings) {
  if (f.kind === 'comment') continue;
  const key = f.text.trim();
  if (seen.has(key)) continue;
  seen.add(key);
  if (Object.prototype.hasOwnProperty.call(entries, key)) covered.push(f);
  else missing.push(f);
}
console.log('unique:', seen.size, 'covered:', covered.length, 'missing:', missing.length);

const perFile = new Map();
for (const m of missing) perFile.set(m.file, (perFile.get(m.file) || 0) + 1);
console.log('\nMissing per file:');
[...perFile.entries()].sort((a, b) => b[1] - a[1]).forEach(([f, c]) => console.log(String(c).padStart(5), f));
fs.writeFileSync(path.join(SP, 'ui-missing.json'), JSON.stringify(missing, null, 2));
