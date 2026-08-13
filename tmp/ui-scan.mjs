#!/usr/bin/env node
/**
 * Scan the UI layer (pages + components) for Turkish user-facing strings that
 * are NOT covered by the shipped locale dictionaries, and emit them with exact
 * source offsets so translations can be applied byte-precisely.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const repoRoot = process.cwd();
const DIRS = ['src/pages', 'src/components'];
const OUT = process.env.OUT || 'tmp/ui-todo.json';

const TR_CHARS = /[şğıçöüŞĞİÇÖÜ]/;
// Turkish marker words WITHOUT Turkish-specific letters. Words that are also
// valid English (not, var, her, son, tip, ana, ise, an, ay) are excluded so
// already-translated copy is not flagged.
const TR_WORDS =
  /\b(ve|ile|bir|bu|olarak|gemi|hesap|sayfa|veya|daha|olan|kadar|sonra|hesapla|deniz|liman|zaman|toplam|ortalama|bilgi|dikkat|durum|birim|listesi|detay|detaylar|soru|cevap|puan|tarih|saat|kaydet|geri|kapat|yeni|eski|ilk|yok|yaz|adres|kullanan|kural|kurallar|madde|bolum|konu|konular|sorular|cevaplar|dersler|ders)\b/;
const hasTr = (s) => TR_CHARS.test(s) || TR_WORDS.test(s);
const hasLetters = (s) => /\p{L}/u.test(s);
const isUrlLike = (s) => /^(https?:|\/\/|data:|mailto:|tel:)/.test(s);
// Asset/route paths and bare slugs — never user-visible copy.
const isPathLike = (s) => /^[\w\-./]+$/.test(s) && s.includes('/');
// Injected <style> blocks: the Turkish inside them is CSS commentary, not UI.
const isStyleBlock = (s) => s.includes('{') && s.includes(';') && /[\w-]+\s*:\s*[^;]+;/.test(s);
// Letter inventories / character classes used by algorithms (e.g. hyphenation).
const isCharInventory = (s) => !/\s/.test(s) && s.length > 20 && !/[.,!?]/.test(s);

const dict = JSON.parse(fs.readFileSync('public/locales/en.json', 'utf8'));
const covered = dict.translations || dict;
const isCovered = (s) => Object.prototype.hasOwnProperty.call(covered, s);

const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.tsx?$/.test(entry.name) && !/\.(test|spec)\.tsx?$/.test(entry.name)) files.push(p);
  }
};
for (const d of DIRS) walk(path.join(repoRoot, d));

const todo = [];
let id = 0;

for (const file of files.sort()) {
  const text = fs.readFileSync(file, 'utf8');
  if (!hasTr(text)) continue;
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const rel = path.relative(repoRoot, file);

  const add = (node, value, kind) => {
    const s = value.trim();
    if (!s || !hasLetters(s) || !hasTr(s)) return;
    if (isUrlLike(s) || isPathLike(s) || isStyleBlock(s) || isCharInventory(s)) return;
    if (isCovered(s)) return;
    const start = node.getStart(sf);
    const end = node.getEnd();
    const raw = text.slice(start, end);
    const { line } = sf.getLineAndCharacterOfPosition(start);
    todo.push({ id: `s${++id}`, file: rel, line: line + 1, kind, start, end, raw, text: value });
  };

  const visit = (node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const parent = node.parent;
      const isKey = parent && ts.isPropertyAssignment(parent) && parent.name === node;
      if (!isKey) add(node, node.text, ts.isStringLiteral(node) ? 'string' : 'template');
    } else if (ts.isJsxText(node)) {
      add(node, node.text, 'jsx');
    } else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      add(node, node.text, 'templatepart');
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

fs.writeFileSync(OUT, JSON.stringify(todo, null, 2));
const perFile = new Map();
for (const t of todo) perFile.set(t.file, (perFile.get(t.file) || 0) + 1);
console.log('todo entries:', todo.length, 'chars:', todo.reduce((a, t) => a + t.text.length, 0));
[...perFile.entries()].sort((a, b) => b[1] - a[1]).forEach(([f, c]) => console.log(String(c).padStart(5), f));
