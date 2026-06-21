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
const ALLOWED_PROPS = new Set([
  'title', 'subtitle', 'description', 'content', 'introduction', 'keyPoints',
  'bulletPoints', 'question', 'options', 'explanation', 'label', 'desc', 'name',
  'purpose', 'summary', 'text', 'caption', 'answer', 'hint', 'note', 'warning',
  'tip', 'heading', 'subheading', 'intro', 'body', 'definition', 'term',
  'category', 'message', 'placeholder',
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

function listFiles(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, exts, out);
    else if (exts.some((ext) => entry.name.endsWith(ext))) out.push(full);
  }
  return out;
}

const TOPIC_PAGES = [
  'SeamanshipTopicsPage', 'MeteorologyTopicsPage', 'StabilityTopicsPage',
  'CargoTopicsPage', 'SafetyTopicsPage', 'EnvironmentTopicsPage', 'EconomicsTopicsPage',
].map((name) => path.join(repoRoot, 'src/pages', `${name}.tsx`)).filter(fs.existsSync);

// UI component files that contain hardcoded Turkish strings (JSX text and specific
// prop values) that the data-file walker would otherwise miss.
const UI_COMPONENT_FILES = [
  'src/components/courseContent/CourseQuiz.tsx',
  'src/components/courseContent/CourseTopicHeader.tsx',
  'src/components/courseContent/CalculatorCard.tsx',
  'src/components/courseContent/CalculatorList.tsx',
  'src/components/courseContent/CourseRulesList.tsx',
  'src/components/FloatingNavButtons.tsx',
  'src/components/ui/language-selector.tsx',
  'src/contexts/LanguageContext.tsx',
].map((f) => path.join(repoRoot, f)).filter(fs.existsSync);

const files = [
  ...listFiles(path.join(repoRoot, 'src/data'), ['.ts', '.tsx']),
  ...TOPIC_PAGES,
  ...UI_COMPONENT_FILES,
];

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
        else if (ts.isArrayLiteralExpression(init)) {
          for (const el of init.elements) {
            const elLit = stringLiteralText(el);
            if (elLit !== null) consider(elLit, name);
          }
        }
      }
    }
    // Static text inside [data-translatable] JSX elements.
    if (ts.isJsxElement(node)) {
      const hasDataTranslatable = node.openingElement.attributes.properties.some(
        (a) => ts.isJsxAttribute(a) && a.name.getText() === 'data-translatable',
      );
      if (hasDataTranslatable) {
        for (const child of node.children) {
          if (ts.isJsxText(child)) consider(child.text, 'text');
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
