#!/usr/bin/env node
/**
 * Turkish leftover scanner.
 * -------------------------
 * The extractor (extract-strings.mjs) only collects ALLOWED_PROPS fields, JSX
 * text and a few message calls. Anything else that reaches the screen is looked
 * up at runtime by its text node, and when no dictionary has it the live
 * translator is the only path: offline (or on a 429) it stays Turkish.
 *
 * This scan walks every string literal and JSX text in src/** (tests
 * excluded), keeps the ones that look like user-visible Turkish copy and
 * reports those that no runtime layer covers:
 *   - public/locales/en.json (the English dictionary)
 *   - scripts/i18n/verified/*.json (checked packs, English fill)
 *   - public/locales/shared/lesson-paragraphs.en.json, learning-guide.en.json
 *   - the core UI overlay and the maritime glossary whole-string overrides
 *
 * It also lists formula.text values that contain Turkish: formula lines are
 * not translated and must be written in English in the source.
 *
 * Usage:
 *   npm run i18n:scan-turkish                      # per-file summary
 *   npm run i18n:scan-turkish -- --file=musterList # only matching paths
 *   npm run i18n:scan-turkish -- --json=out.json   # full report
 *   npm run i18n:scan-turkish -- --list            # print every string
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { VERIFIED_KEYS } from './verified-corrections.mjs';
import { getCoreUiTranslation } from '../../src/i18n/coreUiTranslations.ts';
import { getMaritimeTranslationOverride } from '../../src/utils/maritimeGlossary.ts';

const repoRoot = process.cwd();
const args = process.argv.slice(2);
const argValue = (name) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const fileFilter = argValue('file');
const jsonOut = argValue('json');
const listAll = args.includes('--list');

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(repoRoot, rel), 'utf8'));
const EN = readJson('public/locales/en.json');
const PARAGRAPHS = readJson('public/locales/shared/lesson-paragraphs.en.json');
const LEARNING = readJson('public/locales/shared/learning-guide.en.json');

const TURKISH_CHARS = /[çğıöşüÇĞİÖŞÜ]/;
// Turkish written without special letters ("Puslu", "Kapat") is caught by
// vocabulary: words that occur in Turkish dictionary keys but in no English
// text the app ships.
const words = (s) => s.toLocaleLowerCase('en').match(/\p{L}{3,}/gu) ?? [];
const englishVocab = new Set();
for (const v of [...Object.values(EN), ...Object.values(PARAGRAPHS)]) {
  if (typeof v === 'string') for (const w of words(v)) englishVocab.add(w);
}
const turkishVocab = new Set();
for (const [k, v] of Object.entries(EN)) {
  if (k === v) continue;
  for (const w of words(k)) if (!englishVocab.has(w)) turkishVocab.add(w);
}
// Words seen in no text at all fall back to common Turkish endings.
const TURKISH_ENDING = /(?:lu|lü|li|lar|ler|dir|tir|mak|mek|iyor|uyor|siz|suz|nin|nun|dan|den|tan|ten|ları|leri|sini|sına|ına|ine)$/;
const unknownTurkish = (w) => !englishVocab.has(w) && TURKISH_ENDING.test(w);
const looksTurkish = (s) =>
  TURKISH_CHARS.test(s) || words(s).some((w) => turkishVocab.has(w) || unknownTurkish(w));

const isTranslatableShape = (s) =>
  s.length >= 2 &&
  /\p{L}/u.test(s) &&
  !/^[a-z0-9_\-./]+$/.test(s) &&
  !/^(https?:|\/|data:|#|mailto:|tel:)/.test(s) &&
  !/^[a-z][\w-]*(\s+[a-z][\w:/[\]-]*)+$/.test(s); // className lists

// An English entry that still holds Turkish letters is not a translation.
// Quoted or bracketed Turkish (a term being explained) is allowed.
const englishIsTurkish = (key) =>
  typeof EN[key] === 'string' && /[ğışĞİŞ]/.test(EN[key].replace(/[“"'‘][^”"'’]*[”"'’]|\([^)]*\)/g, ''));
const covered = (key) => {
  if (VERIFIED_KEYS.has(key)) return true;
  if (EN[key] !== undefined && !englishIsTurkish(key)) return true;
  if (PARAGRAPHS[key] !== undefined || LEARNING[key] !== undefined) return true;
  if (getCoreUiTranslation(key, 'en')) return true;
  try {
    if (getMaritimeTranslationOverride(key, 'en')) return true;
  } catch {
    /* glossary lookups are best-effort */
  }
  return false;
};

// ReactMarkdown renders inline emphasis/links as separate text nodes, so a
// markdown string is covered when every rendered segment is.
function markdownSegments(value) {
  const out = [];
  const text = value.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/```[\s\S]*?```/g, ' ');
  for (const rawLine of text.split(/\n/)) {
    const line = rawLine.trim().replace(/^([-*+]|\d+[.)]|#{1,6})\s+/, '');
    if (!line) continue;
    for (const part of line.split(/\*\*|__|`|\[|\]\([^)]*\)/)) {
      const s = part.trim();
      if (s.length >= 2 && /\p{L}/u.test(s)) out.push(s);
    }
  }
  return out;
}

const isCovered = (value) => {
  const key = value.trim();
  if (covered(key)) return true;
  if (/[\n*`#]/.test(key)) {
    const segments = markdownSegments(key);
    return segments.length > 0 && segments.every((s) => !looksTurkish(s) || covered(s));
  }
  if (/<[^>]+>/.test(key)) {
    const parts = key.split(/<[^>]+>/).map((s) => s.trim()).filter((s) => s.length >= 2);
    return parts.length > 0 && parts.every((s) => !looksTurkish(s) || covered(s));
  }
  return false;
};

function normalizeJsxText(value) {
  const lines = value.replace(/\r\n?/g, '\n').split('\n');
  let lastNonEmptyLine = 0;
  for (let i = 0; i < lines.length; i += 1) if (/[^\t ]/.test(lines[i])) lastNonEmptyLine = i;
  let result = '';
  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i].replace(/\t/g, ' ');
    if (i !== 0) line = line.replace(/^ +/, '');
    if (i !== lines.length - 1) line = line.replace(/ +$/, '');
    if (!line) continue;
    result += line;
    if (i !== lastNonEmptyLine) result += ' ';
  }
  return result;
}

// Property values that are identifiers, routes, styles or assets.
const NON_VISIBLE_PROPS = new Set([
  'id', 'key', 'slug', 'icon', 'iconName', 'color', 'colorClass', 'gradient', 'bg',
  'route', 'path', 'href', 'url', 'to', 'className', 'image', 'img', 'src', 'imageUrl',
  'file', 'variant', 'emoji', 'moduleId', 'courseId', 'topicId', 'lessonId', 'paragraphs',
  'storageKey', 'queryKey', 'testId', 'accent', 'tone', 'kind', 'status', 'level',
]);
const NON_VISIBLE_JSX_ATTRS = new Set([
  'className', 'key', 'id', 'href', 'to', 'src', 'type', 'style', 'role', 'variant',
  'size', 'icon', 'path', 'name', 'value', 'htmlFor', 'target', 'rel', 'lang', 'dir',
]);
const NON_VISIBLE_CALLS = /^(console\.\w+|require|import|navigate|localStorage\.\w+|sessionStorage\.\w+|fetch|.*\.from|.*\.eq|.*\.select|.*\.rpc|.*\.invoke|.*\.querySelector(All)?|.*\.getItem|.*\.setItem|.*\.removeItem|.*\.includes|.*\.startsWith|.*\.endsWith|.*\.indexOf|.*\.replace(All)?|.*\.split|.*\.match|.*\.test|.*\.has|.*\.get|.*\.set|.*\.add|.*\.delete|Error|TypeError|RegExp|.*\.addEventListener|.*\.removeEventListener|.*\.track|.*\.log|.*\.warn|.*\.error|.*\.debug)$/;
const COMPARISON = new Set([
  ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken,
]);

function propName(nameNode) {
  if (!nameNode) return null;
  if (ts.isIdentifier(nameNode) || ts.isStringLiteral(nameNode) || ts.isPrivateIdentifier(nameNode)) return nameNode.text;
  return null;
}

/** Why a literal is not user-visible copy, or null when it may be. */
function hiddenReason(node, sf) {
  let child = node;
  let parent = node.parent;
  while (parent) {
    if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent) || ts.isImportTypeNode?.(parent)) return 'import';
    if (ts.isLiteralTypeNode(parent) || ts.isTypeNode(parent)) return 'type';
    if (ts.isPropertyAssignment(parent)) {
      if (parent.name === child) return 'key';
      if (NON_VISIBLE_PROPS.has(propName(parent.name))) return 'prop';
      return null;
    }
    if (ts.isComputedPropertyName(parent) || (ts.isElementAccessExpression(parent) && parent.argumentExpression === child)) return 'key';
    if (ts.isJsxAttribute(parent)) {
      const name = parent.name.getText(sf);
      if (NON_VISIBLE_JSX_ATTRS.has(name) || name.startsWith('data-') || name.startsWith('on')) return 'attr';
      return null;
    }
    if (ts.isCaseClause(parent) && parent.expression === child) return 'case';
    if (ts.isBinaryExpression(parent) && COMPARISON.has(parent.operatorToken.kind)) return 'compare';
    if (ts.isCallExpression(parent) || ts.isNewExpression(parent)) {
      const callee = parent.expression.getText(sf);
      if (NON_VISIBLE_CALLS.test(callee)) return 'call';
      return null;
    }
    if (ts.isTaggedTemplateExpression(parent)) return 'tagged';
    if (ts.isBlock(parent) || ts.isSourceFile(parent) || ts.isJsxElement(parent)) return null;
    child = parent;
    parent = parent.parent;
  }
  return null;
}

/** formula: { text: "..." } */
const isFormulaText = (node) => {
  const prop = node.parent;
  if (!prop || !ts.isPropertyAssignment(prop) || propName(prop.name) !== 'text') return false;
  const obj = prop.parent;
  const holder = obj?.parent;
  return !!holder && ts.isPropertyAssignment(holder) && /^formulas?$/.test(propName(holder.name) ?? '');
};

function listFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '__tests__' || entry.name === 'test' || entry.name === 'tests') continue;
      listFiles(full, out);
    } else if (/\.tsx?$/.test(entry.name) && !/\.(test|spec)\.tsx?$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
      out.push(full);
    }
  }
  return out;
}

const files = listFiles(path.join(repoRoot, 'src'))
  .map((f) => path.relative(repoRoot, f))
  .filter((f) => !fileFilter || f.includes(fileFilter))
  .sort();

const report = {};
const formulaText = [];
let dynamicCount = 0;
const dynamic = [];

for (const rel of files) {
  const text = fs.readFileSync(path.join(repoRoot, rel), 'utf8');
  const sf = ts.createSourceFile(rel, text, ts.ScriptTarget.Latest, true, rel.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const missing = new Map();
  const add = (value, node) => {
    const s = value.trim();
    if (!isTranslatableShape(s) || !looksTurkish(s)) return;
    if (isCovered(s)) return;
    if (!missing.has(s)) missing.set(s, sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1);
  };
  const visit = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      if (isFormulaText(node)) {
        if (looksTurkish(node.text)) {
          formulaText.push({ file: rel, line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1, text: node.text });
        }
      } else if (!hiddenReason(node, sf)) {
        add(node.text, node);
      }
    } else if (ts.isTemplateExpression(node)) {
      if (!hiddenReason(node, sf) && [node.head, ...node.templateSpans.map((s) => s.literal)].some((p) => looksTurkish(p.text))) {
        dynamicCount++;
        dynamic.push({ file: rel, line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1, text: node.getText(sf).slice(1, -1) });
      }
    } else if (ts.isJsxText(node)) {
      add(normalizeJsxText(node.text).replace(/&(amp|lt|gt|quot|apos|nbsp|rsquo|lsquo|ndash|mdash|hellip|deg|middot|times|rarr);/g,
        (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ndash: '–', mdash: '—', hellip: '…', deg: '°', middot: '·', times: '×', rarr: '→' })[e]), node);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (missing.size) report[rel] = [...missing].map(([s, line]) => ({ line, text: s }));
}

const entries = Object.entries(report).sort((a, b) => b[1].length - a[1].length);
const total = entries.reduce((n, [, list]) => n + list.length, 0);
for (const [file, list] of entries) {
  console.log(`${String(list.length).padStart(6)}  ${file}`);
  if (listAll) for (const { line, text } of list) console.log(`        ${line}: ${text.replace(/\s+/g, ' ').slice(0, 200)}`);
}
console.log(`\nUncovered Turkish strings: ${total} in ${entries.length} files`);
console.log(`Template literals with Turkish (dynamic, not keyed): ${dynamicCount}`);
if (listAll) for (const f of dynamic) console.log(`        ${f.file}:${f.line}: ${f.text.replace(/\s+/g, ' ').slice(0, 200)}`);
console.log(`formula.text with Turkish (write in English in the source): ${formulaText.length}`);
if (listAll) for (const f of formulaText) console.log(`        ${f.file}:${f.line}: ${f.text}`);

if (jsonOut) {
  fs.writeFileSync(jsonOut, JSON.stringify({ total, files: report, formulaText, dynamic }, null, 2) + '\n');
  console.log(`→ ${jsonOut}`);
}
