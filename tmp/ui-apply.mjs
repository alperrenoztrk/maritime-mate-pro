#!/usr/bin/env node
/**
 * Apply English translations to the source, byte-precisely, using the offsets
 * recorded by tmp/ui-scan.mjs.
 *
 * Usage: node tmp/ui-apply.mjs tmp/translations/<batch>.json
 * Batch file shape: { "s123": "English text", ... }
 */
import fs from 'node:fs';

const todo = JSON.parse(fs.readFileSync('tmp/ui-todo.json', 'utf8'));
const byId = new Map(todo.map((t) => [t.id, t]));

const batchFiles = process.argv.slice(2);
const map = {};
for (const bf of batchFiles) Object.assign(map, JSON.parse(fs.readFileSync(bf, 'utf8')));

// Re-encode a translated value into the literal form the original used.
const encode = (entry, value) => {
  const { raw, kind, text } = entry;
  if (kind === 'jsx') {
    // Preserve the original leading/trailing whitespace of the JSX text node.
    const lead = raw.match(/^\s*/)[0];
    const trail = raw.match(/\s*$/)[0];
    return lead + value.trim() + trail;
  }
  if (kind === 'templatepart') {
    // head: `…${   middle: }…${   tail: }…`
    const open = raw[0];
    const close = raw.endsWith('${') ? raw.slice(-2) : raw.slice(-1);
    const body = value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return open + body + close;
  }
  const quote = raw[0];
  if (quote === '"' || quote === "'") {
    const body = value
      .replace(/\\/g, '\\\\')
      .replace(new RegExp(quote, 'g'), '\\' + quote)
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
    return quote + body + quote;
  }
  if (quote === '`') {
    const body = value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return '`' + body + '`';
  }
  throw new Error(`Unhandled literal form for ${entry.id}: ${raw.slice(0, 20)}`);
};

const perFile = new Map();
let applied = 0;
const unknown = [];
for (const [id, value] of Object.entries(map)) {
  const entry = byId.get(id);
  if (!entry) { unknown.push(id); continue; }
  if (!perFile.has(entry.file)) perFile.set(entry.file, []);
  perFile.get(entry.file).push({ entry, value });
}

for (const [file, items] of perFile) {
  let text = fs.readFileSync(file, 'utf8');
  items.sort((a, b) => b.entry.start - a.entry.start);
  for (const { entry, value } of items) {
    const current = text.slice(entry.start, entry.end);
    if (current !== entry.raw) {
      throw new Error(`Offset drift in ${file} @${entry.start} (${entry.id}).\n  expected: ${JSON.stringify(entry.raw.slice(0, 80))}\n  found:    ${JSON.stringify(current.slice(0, 80))}`);
    }
    text = text.slice(0, entry.start) + encode(entry, value) + text.slice(entry.end);
    applied += 1;
  }
  fs.writeFileSync(file, text);
  console.log(`updated ${file} (${items.length})`);
}

if (unknown.length) console.warn('unknown ids:', unknown.join(', '));
console.log('applied:', applied);
