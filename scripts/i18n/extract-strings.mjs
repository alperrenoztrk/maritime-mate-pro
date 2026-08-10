#!/usr/bin/env node
/**
 * Static string extractor for build-time pre-translation.
 * -------------------------------------------------------
 * Walks the app's static content (src/data + the *TopicsPage.tsx topic maps)
 * and collects every user-visible Turkish string value found under an
 * allow-listed property name. The result feeds scripts/i18n/pretranslate.mjs.
 *
 * Strings are normalized identically to the runtime translator
 * (normalizeSource = trim) so dictionary keys match runtime lookup keys.
 *
 * Usage: node scripts/i18n/extract-strings.mjs   (npm run i18n:extract)
 * Output: scripts/i18n/source-strings.json  { count, strings: string[] }
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const repoRoot = process.cwd();
const OUT_FILE = path.join(repoRoot, 'scripts/i18n/source-strings.json');

// Property names whose string values are user-visible content (not ids/enums).
//
// The longform lesson fields (`lead`, `bullets`, `headers`, `rows`, `sources` —
// see src/data/shipOperations/longform/types.ts) are included because that is
// where the app's short strings live: table cells, bullet items and chapter
// leads. Short strings are exactly where generic MT breaks down, so they belong
// in the reviewable dictionary rather than on the live path.
//
// `paragraphs` is deliberately NOT here. It is 11k strings averaging ~175
// characters — roughly 4 MB per language on dictionaries that already sit near
// 10 MB — and long prose is the one place where the engine holds up: measured
// on this corpus, abbreviations survived every full sentence and failed only in
// short fragments. Long paragraphs stay on the live path, which now applies the
// same protection (src/utils/protectedTerms.ts).
const ALLOWED_PROPS = new Set([
  'title', 'subtitle', 'description', 'content', 'introduction', 'keyPoints',
  'bulletPoints', 'question', 'options', 'explanation', 'label', 'desc', 'name',
  'purpose', 'summary', 'text', 'caption', 'answer', 'hint', 'note', 'warning',
  'tip', 'heading', 'subheading', 'intro', 'body', 'definition', 'term',
  'category', 'message', 'placeholder',
  'lead', 'bullets', 'headers', 'rows', 'sources',
]);

// Properties rendered through ReactMarkdown (see
// src/components/navigation/TopicContentModal.tsx). For these the runtime DOM
// text nodes are the *rendered* fragments, not the raw markdown, so we emit
// markdown-derived text segments instead of the whole string.
const MARKDOWN_PROPS = new Set(['content', 'body']);

const norm = (s) => s.trim();
const hasLetters = (s) => /\p{L}/u.test(s);
// Pure slug/identifier/key, url, asset path, or numeric-only — never translate.
const isSlugOrId = (s) => /^[a-z0-9_\-./]+$/.test(s);
const isUrlLike = (s) => /^(https?:|\/|data:|#|mailto:|tel:)/.test(s);
const isNumericish = (s) => /^[\d\s.,:%°/+\-x×()]+$/.test(s);
// Math/formula lines (e.g. "A = ΔTrim × LCF / LBP") have a math operator but
// almost no natural-language words — skip them (pointless/harmful to translate).
const naturalWordCount = (s) => (s.match(/\p{L}{4,}/gu) || []).length;
const looksLikeFormula = (s) => /[=√∑∫·×÷]/.test(s) && naturalWordCount(s) <= 2;

const strings = new Set();

const isTranslatable = (s) =>
  s.length >= 2 && hasLetters(s) && !isSlugOrId(s) && !isNumericish(s) && !looksLikeFormula(s);

const addSegment = (value) => {
  const s = norm(value);
  if (isTranslatable(s)) strings.add(s);
};

// Splits a line into the text segments ReactMarkdown produces: plain runs plus
// the inner text of emphasis/links/code (each becomes its own DOM text node).
function stripInlineToSegments(text) {
  const tokenRe = /(\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|_([^_\n]+)_|`([^`]+)`|\[([^\]]+)\]\([^)]*\))/g;
  let last = 0;
  let buffer = '';
  let match;
  while ((match = tokenRe.exec(text))) {
    buffer += text.slice(last, match.index);
    addSegment(buffer);
    buffer = '';
    addSegment(match[2] || match[3] || match[4] || match[5] || match[6] || match[7] || '');
    last = tokenRe.lastIndex;
  }
  buffer += text.slice(last);
  addSegment(buffer);
}

// Approximates ReactMarkdown's block/inline segmentation of a markdown string.
function markdownToSegments(value) {
  let text = value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')   // images -> <img> (no text node)
    .replace(/```[\s\S]*?```/g, ' ')          // fenced code blocks
    .replace(/^[\s\-─—_=*|]{3,}$/gm, ' ');    // decorative divider lines
  for (const block of text.split(/\n\s*\n/)) {
    let paragraph = [];
    const flush = () => {
      if (paragraph.length) { stripInlineToSegments(paragraph.join(' ')); paragraph = []; }
    };
    for (const rawLine of block.split(/\n/)) {
      const line = rawLine.trim();
      if (!line) { flush(); continue; }
      const listMatch = line.match(/^([-*+]|\d+[.)])\s+(.*)$/);
      if (listMatch) { flush(); stripInlineToSegments(listMatch[2]); continue; }
      if (/^#{1,6}\s+/.test(line)) { flush(); stripInlineToSegments(line.replace(/^#{1,6}\s+/, '')); continue; }
      paragraph.push(line);
    }
    flush();
  }
}

function consider(value, propName) {
  if (typeof value !== 'string') return;
  if (MARKDOWN_PROPS.has(propName)) { markdownToSegments(value); return; }
  const v = norm(value);
  if (isUrlLike(v)) return;
  // If the string embeds inline HTML, also emit each text segment (matches the
  // runtime's per-text-node fragmentation) in addition to the whole string.
  if (/<[^>]+>/.test(v)) {
    for (const seg of v.split(/<[^>]+>/)) addSegment(seg);
  }
  if (isTranslatable(v)) strings.add(v);
}

function stringLiteralText(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  return null;
}

// Collects string literals from an array of any depth (`string[]`, `string[][]`).
function collectFromArray(node, propName) {
  for (const el of node.elements) {
    const lit = stringLiteralText(el);
    if (lit !== null) consider(lit, propName);
    else if (ts.isArrayLiteralExpression(el)) collectFromArray(el, propName);
  }
}

function listFiles(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, exts, out);
    else if (exts.some((ext) => entry.name.endsWith(ext))) out.push(full);
  }
  return out;
}

// UI component files that contain hardcoded Turkish strings (JSX text and specific
// prop values) that the data-file walker would otherwise miss. These live outside
// the broadly-walked src/pages + src/components/courseContent trees.
const UI_COMPONENT_FILES = [
  'src/components/FloatingNavButtons.tsx',
  'src/contexts/LanguageContext.tsx',
  'src/hooks/useHomeWidgets.ts',
].map((f) => path.join(repoRoot, f)).filter(fs.existsSync);

// Dev / diagnostic / admin components whose strings real users never see. They
// use [data-translatable] for internal tooling, so we skip them by basename to
// keep the shipped dictionaries lean.
const EXCLUDE_BASENAMES = new Set([
  'ReleaseChecklistCard.tsx',
]);

// High-traffic content component directories rendered into the lesson/topic UI.
const CONTENT_COMPONENT_DIRS = [
  path.join(repoRoot, 'src/components/courseContent'),
  path.join(repoRoot, 'src/components/widgets'),
];
const EXTRA_COMPONENT_FILES = [
].map((f) => path.join(repoRoot, f)).filter(fs.existsSync);

// Canonical walk set: all static content (src/data) + every page + the lesson
// content components + a few curated UI files. Deduped, minus dev/admin files.
const files = [
  ...new Set([
    ...listFiles(path.join(repoRoot, 'src/data'), ['.ts', '.tsx']),
    ...listFiles(path.join(repoRoot, 'src/pages'), ['.tsx']),
    ...CONTENT_COMPONENT_DIRS.flatMap((d) => listFiles(d, ['.ts', '.tsx'])),
    ...EXTRA_COMPONENT_FILES,
    ...UI_COMPONENT_FILES,
  ]),
].filter((f) => !EXCLUDE_BASENAMES.has(path.basename(f)));

// Fixed UI strings that live as plain JSX text / string-literal expressions in
// components (not ALLOWED_PROPS props, not [data-translatable]), so the AST
// walker above would miss them. Kept here verbatim (must match source byte-for-
// byte after trim, or the runtime dictionary lookup misses). Sources:
//   - src/components/courseContent/autoSteps.ts
//   - src/components/courseContent/StepByStepSolution.tsx
//   - src/components/courseContent/CalculatorCard.tsx
const UI_SEED_STRINGS = [
  'Verilen değerler',
  'Uygulanan formül',
  'Adım Adım Çözüm',
  'Çözümü Adım Adım Göster',
  'Adımları Gizle',
  'Bu işlemi yapay zekaya sor',
  'Yapay Zeka Açıklaması',
  'Hazırlanıyor...',
  'Açıklama alınamadı. Lütfen tekrar deneyin.',
  // src/components/widgets/HomeWidgetGrid.tsx — wmoText() weather conditions and
  // the location-source label live in function bodies / ternaries, not JSX text.
  'Açık',
  'Az Bulutlu',
  'Bulutlu',
  'Yağmurlu',
  'Karlı',
  'Sağanak',
  'Kar',
  'Fırtına',
  'Manuel',
  // src/components/widgets/WeatherInfoWidgets.tsx — wmoToTr() + chart tooltip labels
  'Veri Yok',
  'Sisli',
  'Sağanak Yağışlı',
  'Gök Gürültülü',
  'Sıcaklık',
  'Nem',
  'Rüzgar',
  'Yağış',
  // src/components/widgets/ManualLocationDialog.tsx — toast messages
  'Geçersiz enlem değeri (-90 ile 90 arası olmalı)',
  'Geçersiz boylam değeri (-180 ile 180 arası olmalı)',
  'Konum kaydedildi',
  'Manuel konum temizlendi — GPS / IP kullanılacak',
];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(
    file, text, ts.ScriptTarget.Latest, true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  const walk = (node) => {
    if (ts.isPropertyAssignment(node)) {
      const name = ts.isIdentifier(node.name)
        ? node.name.text
        : (ts.isStringLiteral(node.name) ? node.name.text : null);
      if (name && ALLOWED_PROPS.has(name)) {
        const init = node.initializer;
        const lit = stringLiteralText(init);
        if (lit !== null) consider(lit, name);
        // Arrays are walked recursively: longform tables hold their body as
        // `rows: string[][]`, so a single level would collect nothing at all.
        else if (ts.isArrayLiteralExpression(init)) collectFromArray(init, name);
      }
    }
    // JSX attributes the runtime translator also translates (see
    // TRANSLATABLE_ATTRS in src/utils/pageTranslator.ts).
    if (ts.isJsxAttribute(node)) {
      const attrName = node.name.getText(sf);
      if (
        (attrName === 'placeholder' || attrName === 'title' || attrName === 'aria-label') &&
        node.initializer && ts.isStringLiteral(node.initializer)
      ) {
        consider(node.initializer.text, 'text');
      }
    }
    // Every static JSX text child renders to a DOM text node at runtime, so we
    // collect them all (the old [data-translatable] opt-in is no longer needed).
    // String-literal expression children like {"Bir metin"} are captured too.
    if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
      for (const child of node.children) {
        if (ts.isJsxText(child)) {
          consider(child.text, 'text');
        } else if (ts.isJsxExpression(child) && child.expression) {
          const lit = stringLiteralText(child.expression);
          if (lit !== null) consider(lit, 'text');
        }
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(sf);
}

for (const seed of UI_SEED_STRINGS) addSegment(seed);

const list = [...strings].sort((a, b) => a.localeCompare(b, 'tr'));
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify({ count: list.length, strings: list }, null, 2) + '\n');

console.log(`✅ Extracted ${list.length} unique static source strings from ${files.length} files`);
console.log(`   → ${path.relative(repoRoot, OUT_FILE)}`);
