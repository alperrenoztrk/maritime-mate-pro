#!/usr/bin/env node
// Print the pending Turkish strings for the given file(s): node tmp/ui-dump.mjs <fileSubstring...>
import fs from 'node:fs';
const todo = JSON.parse(fs.readFileSync('tmp/ui-todo.json', 'utf8'));
const pats = process.argv.slice(2);
const done = fs.existsSync('tmp/translations')
  ? new Set(fs.readdirSync('tmp/translations').flatMap((f) => Object.keys(JSON.parse(fs.readFileSync('tmp/translations/' + f, 'utf8')))))
  : new Set();
for (const t of todo) {
  if (done.has(t.id)) continue;
  if (pats.length && !pats.some((p) => t.file.includes(p))) continue;
  console.log(`${t.id}\t${t.file}:${t.line}\t${t.kind}\t${JSON.stringify(t.text)}`);
}
