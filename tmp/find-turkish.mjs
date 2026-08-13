#!/usr/bin/env node
/**
 * Locate Turkish user-facing strings in the UI layer (pages + components).
 * Reports file:line + the string, and a deduped inventory.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const repoRoot = process.cwd();
const roots = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const DIRS = roots.length ? roots : ['src/pages', 'src/components'];

const TR_CHARS = /[şğıçöüŞĞİÇÖÜ]/;
const TR_WORDS =
  /\b(ve|ile|için|bir|bu|olarak|gemi|hesap|sayfa|değer|göre|yok|var|kaydet|geri|ayarlar|kapat|aç|veya|daha|olan|kadar|sonra|hesapla|seçin|giriniz|yükleme|tüm|her|nasıl|nedir|ise|ana|yeni|eski|son|ilk|arasında|üzerinde|altında|yüksek|düşük|deniz|liman|yük|hız|zaman|toplam|ortalama|sonuç|hata|başarı|uyarı|bilgi|örnek|adım|not|dikkat|önemli|gerekli|kullanım|durum|tip|tür|birim|değeri|miktarı|oranı|farkı|listesi|detay|detaylar|açıklama|başlık|özet|soru|cevap|doğru|yanlış|puan|süre|tarih|saat|gün|ay|yıl)\b/i;

const hasTr = (s) => TR_CHARS.test(s) || TR_WORDS.test(s);
const hasLetters = (s) => /\p{L}/u.test(s);
const isUrlLike = (s) => /^(https?:|\/\/|data:|mailto:|tel:)/.test(s);

const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(tsx?|ts)$/.test(entry.name) && !/\.(test|spec)\.tsx?$/.test(entry.name)) files.push(p);
  }
};
for (const d of DIRS) {
  const abs = path.join(repoRoot, d);
  if (fs.existsSync(abs)) {
    if (fs.statSync(abs).isDirectory()) walk(abs);
    else files.push(abs);
  }
}

const findings = [];
const perFile = new Map();

for (const file of files.sort()) {
  const text = fs.readFileSync(file, 'utf8');
  if (!hasTr(text)) continue;
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const rel = path.relative(repoRoot, file);

  const push = (node, value, kind) => {
    const s = value.trim();
    if (!s || !hasLetters(s) || !hasTr(s) || isUrlLike(s)) return;
    const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
    findings.push({ file: rel, line: line + 1, kind, text: s });
    perFile.set(rel, (perFile.get(rel) || 0) + 1);
  };

  const visit = (node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      // skip property keys and import paths
      const parent = node.parent;
      if (parent && ts.isPropertyAssignment(parent) && parent.name === node) {
        // key -- skip
      } else {
        push(node, node.text, 'string');
      }
    } else if (ts.isJsxText(node)) {
      const v = node.text.replace(/\s+/g, ' ');
      push(node, v, 'jsx');
    } else if (ts.isTemplateExpression(node)) {
      for (const part of [node.head, ...node.templateSpans.map((s) => s.literal)]) {
        push(node, part.text, 'template');
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);

  // comments containing Turkish
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.JSX, text);
  let tk;
  while ((tk = scanner.scan()) !== ts.SyntaxKind.EndOfFileToken) {
    if (tk === ts.SyntaxKind.SingleLineCommentTrivia || tk === ts.SyntaxKind.MultiLineCommentTrivia) {
      const v = scanner.getTokenText();
      if (hasTr(v)) {
        const line = sf.getLineAndCharacterOfPosition(scanner.getTokenPos()).line + 1;
        findings.push({ file: rel, line, kind: 'comment', text: v.replace(/\s+/g, ' ').slice(0, 200) });
        perFile.set(rel, (perFile.get(rel) || 0) + 1);
      }
    }
  }
}

const outDir = process.env.OUT_DIR || '.';
fs.writeFileSync(path.join(outDir, 'turkish-findings.json'), JSON.stringify(findings, null, 2));

const byKind = {};
for (const f of findings) byKind[f.kind] = (byKind[f.kind] || 0) + 1;
const uniq = new Set(findings.filter((f) => f.kind !== 'comment').map((f) => f.text));
const chars = [...uniq].reduce((a, s) => a + s.length, 0);

console.log('files scanned:', files.length);
console.log('findings:', findings.length, JSON.stringify(byKind));
console.log('unique non-comment strings:', uniq.size, 'chars:', chars);
console.log('\nTop files:');
[...perFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).forEach(([f, c]) => console.log(String(c).padStart(6), f));
