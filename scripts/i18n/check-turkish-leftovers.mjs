#!/usr/bin/env node
/**
 * Turkish leftover guard.
 * -----------------------
 * Finds Turkish display text in src/ that has no entry anywhere in the
 * runtime lookup chain (coreUi → abbreviation → glossary → en.json, shared
 * packs and verified packs). Such text reaches the screen untranslated: the
 * page translator falls back to live machine translation and, when that is
 * unavailable, the Turkish source stays on screen.
 *
 * It also catches template literals that glue Turkish words around runtime
 * values (`${x} için ...`): the composed sentence can never match a
 * dictionary key. Build such text from whole, separately rendered strings.
 *
 * Accepted leftovers (internal ids, search keywords, native language names…)
 * live in scripts/i18n/turkish-leftovers-baseline.json.
 *
 * Usage:
 *   node --import tsx scripts/i18n/check-turkish-leftovers.mjs            report
 *   node --import tsx scripts/i18n/check-turkish-leftovers.mjs --check    exit 1 on new leftovers
 *   node --import tsx scripts/i18n/check-turkish-leftovers.mjs --update   rewrite the baseline
 *   node --import tsx scripts/i18n/check-turkish-leftovers.mjs --all      list every leftover, accepted or not
 *
 * Fix a new leftover by adding checked English to
 * scripts/i18n/verified/english-leftover-texts.json (then `npm run i18n:fix`),
 * or, for a template, by rewriting it so that no Turkish words surround the
 * interpolated values.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = process.cwd();
const ts = createRequire(path.join(root, 'package.json'))('typescript');
const check = process.argv.includes('--check');
const update = process.argv.includes('--update');
const listAll = process.argv.includes('--all');
const BASELINE = path.join(root, 'scripts/i18n/turkish-leftovers-baseline.json');

const { getCoreUiTranslation } = await import(path.join(root, 'src/i18n/coreUiTranslations.ts'));
const { getMaritimeTranslationOverride } = await import(path.join(root, 'src/utils/maritimeGlossary.ts'));
const { isAbbreviationOnly } = await import(path.join(root, 'src/utils/protectedTerms.ts'));
const { hasTurkishText } = await import(path.join(root, 'src/utils/turkishText.ts'));

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const keys = new Set();
const addKeys = (dict) => {
  for (const key of Object.keys(dict)) {
    keys.add(key);
    keys.add(key.replace(/\s+/g, ' ').trim());
  }
};
addKeys(readJson('public/locales/en.json'));
for (const file of fs.readdirSync(path.join(root, 'public/locales/shared')).filter((f) => f.endsWith('.en.json'))) {
  addKeys(readJson(`public/locales/shared/${file}`));
}
for (const file of fs.readdirSync(path.join(root, 'scripts/i18n/verified')).filter((f) => f.endsWith('.json'))) {
  addKeys(readJson(`scripts/i18n/verified/${file}`));
}

// hasTurkishText() keys on Turkish letters and a word list tuned for the
// runtime. ASCII-only Turkish ("BNWAS aktif.", "Sensor kalibre.", "FSCtoplam")
// slips past it, so the guard adds unambiguous Turkish words and the Turkish
// subscripts used in formulas.
const GUARD_TURKISH_WORDS = new RegExp(`\\b(${[
  'ile', 'icin', 'olarak', 'veya', 'gibi', 'sefer', 'riski', 'aktif', 'takip', 'takibi', 'izleme',
  'kalibre', 'kalibrasyon', 'kalibrasyonu', 'revize', 'tarihi', 'tarihli', 'doldur', 'indir', 'teslim',
  'etiketli', 'emniyetli', 'yasal', 'sorun', 'sebebi', 'patlama', 'birikimi', 'refakat', 'uyum',
  'imza', 'butonu', 'tercih', 'yoklama', 'brifing', 'senaryo', 'sahte', 'kritik', 'varsa', 'talep',
  'aktar', 'sabit', 'toplam', 'gerekli', 'istif', 'ihmal', 'radyan', 'pruvadan', 'uygula',
  'mesafesi', 'girin', 'kapasitesi', 'doluluk', 'tahmini', 'lineer', 'ekvatorda', 'dedveyt',
  'emisyonlar', 'dinlenme', 'hesapla', 'ticari', 'puslu', 'basit', 'kondenser', 'izentropik',
  'momenti', 'yanal', 'payda', 'orijinal', 'efektif', 'konsantrasyon', 'yedeklilik', 'yolcu',
  'engelli', 'eksik', 'bildirim', 'sertifika', 'vardiya', 'bitiminde', 'seviyesi', 'tutukluk',
  'hidrolik', 'analiz', 'enjeksiyon', 'manometre', 'vakum', 'senkronizasyon', 'kaptan', 'batma',
  'okuma', 'devir', 'frekans', 'iletken', 'kesiti', 'diyot', 'trafo', 'ayarlanabilir', 'atalet',
].join('|')})\\b|[A-Za-zΔ](?:toplam|gerekli|istif|yeni|eski|hedef|kaynak|sintine|balast|pompa|hacim|statik|sistem|egzoz|elektrik|mekanik|silindir|verici|kirli|temiz|yanma|saat)\\b`, 'i');
const looksTurkish = (text) => hasTurkishText(text) || GUARD_TURKISH_WORDS.test(text);

const covered = (value) => {
  const text = value.trim();
  if (!text) return true;
  const collapsed = text.replace(/\s+/g, ' ');
  return keys.has(text) || keys.has(collapsed) || !!getCoreUiTranslation(text, 'en')
    || isAbbreviationOnly(text) || !!getMaritimeTranslationOverride(text, 'en');
};

// Files whose Turkish strings are detection lists or search data, not display text.
const NON_DISPLAY_FILES = new Set([
  'src/utils/turkishText.ts', 'src/utils/technicalText.ts', 'src/components/news/hyphenate.ts',
  'src/i18n/coreUiTranslations.ts', 'src/lib/appSearch.ts', 'src/data/deepSearchIndex.ts',
]);
// Positions where a string is used as data, not shown.
const NON_DISPLAY_PROPS = new Set([
  'id', 'slug', '@id', '@to', '@href', '@dataKey', '@value', 'keywords[]', 'searchTerms[]',
  'compare', 'case', 'index', 'moduleId', 'roleSlug', 'dept', 'query', 'aka[]', 'position',
  'call:console.log', 'call:console.warn', 'call:console.error', 'call:warn',
  'var:TURKISH_WORDS', 'var:waterKeywords', 'var:SOLAS_CRITERION_KEYS', 'sv[]', 'hu[]', 'de[]', 'pt[]', 'fi[]',
]);
const isNonDisplayProp = (prop) => NON_DISPLAY_PROPS.has(prop)
  || /^call:.*\.(includes|startsWith|endsWith|test|match|replace)\b/.test(prop)
  || /^call:.*toLocale(Lower|Upper)Case/.test(prop);

const listFiles = (dir, acc = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, acc);
    else if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.|\.d\.ts$/.test(entry.name)) acc.push(full);
  }
  return acc;
};

const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', ndash: '–', mdash: '—', hellip: '…', deg: '°', middot: '·', times: '×', rarr: '→', larr: '←', le: '≤', ge: '≥', plusmn: '±', micro: 'µ' };
const decode = (value) => value.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (match, ref) => (ref[0] === '#'
  ? String.fromCodePoint(ref[1] === 'x' ? parseInt(ref.slice(2), 16) : parseInt(ref.slice(1), 10))
  : (NAMED[ref] ?? match)));
// Mirrors how React joins multi-line JSX text.
const jsxNormalize = (value) => {
  const lines = value.replace(/\r\n?/g, '\n').split('\n');
  let last = 0;
  lines.forEach((line, index) => { if (/[^\t ]/.test(line)) last = index; });
  let out = '';
  lines.forEach((line, index) => {
    let part = line.replace(/\t/g, ' ');
    if (index) part = part.replace(/^ +/, '');
    if (index !== lines.length - 1) part = part.replace(/ +$/, '');
    if (!part) return;
    out += part;
    if (index !== last) out += ' ';
  });
  return out;
};

// Markdown content is rendered (and looked up) segment by segment.
const markdownSegments = (value) => {
  const segments = [];
  const inline = (text) => {
    const re = /(\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|_([^_\n]+)_|`([^`]+)`|\[([^\]]+)\]\([^)]*\))/g;
    let last = 0;
    let match;
    while ((match = re.exec(text))) {
      segments.push(text.slice(last, match.index));
      segments.push(match[2] || match[3] || match[4] || match[5] || match[6] || match[7] || '');
      last = re.lastIndex;
    }
    segments.push(text.slice(last));
  };
  const text = value.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/```[\s\S]*?```/g, ' ').replace(/^[\s\-─—_=*|]{3,}$/gm, ' ');
  for (const block of text.split(/\n\s*\n/)) {
    let paragraph = [];
    const flush = () => { if (paragraph.length) { inline(paragraph.join(' ')); paragraph = []; } };
    for (const raw of block.split(/\n/)) {
      const line = raw.trim();
      if (!line) { flush(); continue; }
      const item = line.match(/^([-*+]|\d+[.)])\s+(.*)$/);
      if (item) { flush(); inline(item[2]); continue; }
      if (/^#{1,6}\s+/.test(line)) { flush(); inline(line.replace(/^#{1,6}\s+/, '')); continue; }
      paragraph.push(line);
    }
    flush();
  }
  return segments.map((segment) => segment.trim()).filter(Boolean);
};

const propNameOf = (node) => {
  let current = node;
  let inArray = false;
  for (let depth = 0; current.parent && depth < 8; depth++) {
    const parent = current.parent;
    if (ts.isPropertyAssignment(parent) && parent.initializer === current) {
      const name = ts.isIdentifier(parent.name) || ts.isStringLiteral(parent.name) ? parent.name.text : '?';
      return inArray ? `${name}[]` : name;
    }
    if (ts.isPropertyAssignment(parent) && parent.name === current) return '#key';
    if (ts.isJsxAttribute(parent)) return `@${parent.name.getText()}`;
    if (ts.isCallExpression(parent)) return `call:${parent.expression.getText().slice(0, 40)}`;
    if (ts.isVariableDeclaration(parent)) return `var:${parent.name.getText().slice(0, 30)}`;
    if (ts.isBinaryExpression(parent) && [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken].includes(parent.operatorToken.kind)) return 'compare';
    if (ts.isCaseClause(parent)) return 'case';
    if (ts.isElementAccessExpression(parent)) return 'index';
    if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) return 'import';
    if (ts.isLiteralTypeNode(parent)) return 'type';
    if (ts.isArrayLiteralExpression(parent)) inArray = true;
    if (ts.isJsxExpression(parent)) return 'jsxexpr';
    if (ts.isReturnStatement(parent)) return 'return';
    current = parent;
  }
  return 'other';
};

const found = new Map();
for (const file of listFiles(path.join(root, 'src'))) {
  const rel = path.relative(root, file).split(path.sep).join('/');
  if (NON_DISPLAY_FILES.has(rel)) continue;
  const text = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const record = (node, value, prop) => {
    const trimmed = value.trim();
    if (!trimmed || !/\p{L}/u.test(trimmed) || !looksTurkish(trimmed)) return;
    if (isNonDisplayProp(prop)) return;
    const markdown = (prop === 'content' || prop === 'body') && /[\n*#`_]/.test(trimmed);
    const parts = markdown ? markdownSegments(trimmed).filter((part) => looksTurkish(part)) : [trimmed];
    for (const part of parts) {
      if (covered(part)) continue;
      const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
      const entry = found.get(part);
      if (entry) entry.locations.push(`${rel}:${line}`);
      else found.set(part, { text: part, locations: [`${rel}:${line}`] });
    }
  };
  const walk = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const prop = propNameOf(node);
      if (prop !== 'import' && prop !== 'type' && prop !== '#key') record(node, node.text, prop);
    } else if (ts.isTemplateExpression(node)) {
      const joined = [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join('${…}');
      record(node, joined, propNameOf(node));
    } else if (ts.isJsxText(node)) {
      record(node, decode(jsxNormalize(node.text)), 'jsx');
    } else if (ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      record(node, decode(node.initializer.text), `@${node.name.getText()}`);
      return;
    }
    ts.forEachChild(node, walk);
  };
  walk(sourceFile);
}

const baseline = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : { accepted: [] };
const accepted = new Set(baseline.accepted);
const current = [...found.values()].sort((a, b) => a.text.localeCompare(b.text, 'tr'));

if (update) {
  const next = {
    note: 'Turkish strings in src/ that are intentionally not translated (internal ids, search keywords, native names, unused files). Rewrite with: node --import tsx scripts/i18n/check-turkish-leftovers.mjs --update',
    accepted: current.map((entry) => entry.text),
  };
  fs.writeFileSync(BASELINE, `${JSON.stringify(next, null, 1)}\n`);
  console.log(`✅ Baseline rewritten: ${next.accepted.length} accepted strings.`);
  process.exit(0);
}

const fresh = current.filter((entry) => !accepted.has(entry.text));
const stale = baseline.accepted.filter((text) => !found.has(text));
console.log(`Turkish display strings without a dictionary entry: ${current.length} (accepted in baseline: ${current.length - fresh.length}, new: ${fresh.length})`);
if (stale.length) console.log(`ℹ️  ${stale.length} baseline entries no longer occur; refresh with --update.`);
for (const entry of (listAll ? current : fresh.slice(0, 50))) {
  console.log(`  ✗ ${entry.locations[0]}  ${entry.text.slice(0, 140).replace(/\n/g, ' ')}`);
}
if (!listAll && fresh.length > 50) console.log(`  … and ${fresh.length - 50} more`);
if (check && fresh.length > 0) {
  console.error('\n❌ New Turkish text would reach the screen untranslated. Add checked English to scripts/i18n/verified/english-leftover-texts.json, or rewrite templates so no Turkish words surround ${…}.');
  process.exit(1);
}
