#!/usr/bin/env node
/**
 * Rendered-vs-extracted coverage AUDIT (gap report only — never the source of
 * truth for the shipped dictionaries).
 * ---------------------------------------------------------------------------
 * The canonical translatable strings come from the deterministic AST extractor
 * (scripts/i18n/extract-strings.mjs → source-strings.json). This script renders
 * every route in routeManifest in a headless browser and reports any user-
 * visible string that the AST extractor MISSED, so we can decide whether to
 * widen the extractor's walk set. It does NOT write locale files.
 *
 * Requirements: a production build + preview server, and Playwright. In this
 * repo Playwright is optional (not a committed dependency); install it with
 *   npm i -D playwright
 * Chromium is pre-installed in the cloud env at $PLAYWRIGHT_BROWSERS_PATH.
 *
 * Usage:
 *   npm run build && npm run preview   # in one terminal (port 8080)
 *   node scripts/i18n/audit-rendered.mjs            (npm run i18n:audit)
 *   BASE_URL=http://localhost:8080 node scripts/i18n/audit-rendered.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { getHarvestRoutes } from '../../src/utils/routeManifest.ts';

const repoRoot = process.cwd();
const SOURCE_FILE = path.join(repoRoot, 'scripts/i18n/source-strings.json');
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const PER_ROUTE_TIMEOUT = 12000;
const strict = process.argv.includes('--strict');

const readJson = (file, fallback) => {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
};

// Loaded dynamically so a missing Playwright install degrades to a clear message
// instead of a hard module-resolution crash.
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('⚠️  Playwright is not installed — skipping rendered audit.');
  console.error('   Install it to run this gap report:  npm i -D playwright');
  process.exit(0);
}

const source = readJson(SOURCE_FILE, null);
if (!source?.strings?.length) {
  console.error('❌ No source strings. Run: npm run i18n:extract');
  process.exit(1);
}
const extracted = new Set(source.strings);

// Mirrors pageTranslator.collectTranslationUnits closely enough for a gap report:
// trimmed text nodes with a letter, skipping technical/no-translate subtrees.
const harvestInPage = () => {
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE', 'KBD', 'SAMP']);
  const hasLetter = (s) => /\p{L}/u.test(s);
  const out = new Set();
  const skip = (el) => {
    for (let n = el; n; n = n.parentElement) {
      if (SKIP_TAGS.has(n.tagName)) return true;
      if (n.getAttribute && n.getAttribute('translate') === 'no') return true;
      const cn = typeof n.className === 'string' ? n.className : '';
      if (cn.includes('notranslate') || cn.includes('skiptranslate')) return true;
    }
    return false;
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const core = (node.nodeValue || '').trim();
    if (core.length >= 2 && hasLetter(core) && node.parentElement && !skip(node.parentElement)) {
      out.add(core);
    }
    node = walker.nextNode();
  }
  return Array.from(out);
};

const routes = getHarvestRoutes();
console.log(`🔎 Auditing ${routes.length} routes at ${BASE_URL} against ${extracted.size} extracted strings\n`);

const browser = await chromium.launch();
const rendered = new Set();
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  let done = 0;
  for (const route of routes) {
    const sep = route.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${route}${sep}_mtHarvest=1`;
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: PER_ROUTE_TIMEOUT });
      await page.waitForTimeout(600); // let late mounts settle
      for (const s of await page.evaluate(harvestInPage)) rendered.add(s);
    } catch (e) {
      console.warn(`  ⚠️  ${route}: ${e.message.split('\n')[0]}`);
    } finally {
      await page.close();
    }
    done++;
    if (done % 10 === 0 || done === routes.length) {
      process.stdout.write(`  ${done}/${routes.length} routes\r`);
    }
  }
} finally {
  await browser.close();
}

const gaps = [...rendered].filter((s) => !extracted.has(s)).sort((a, b) => a.localeCompare(b, 'tr'));
console.log(`\n\n📊 Rendered: ${rendered.size}  |  Extracted: ${extracted.size}  |  Rendered-but-missing: ${gaps.length}\n`);
for (const g of gaps.slice(0, 100)) console.log('   • ' + JSON.stringify(g));
if (gaps.length > 100) console.log(`   … and ${gaps.length - 100} more`);

if (strict && gaps.length > 0) {
  console.error(`\n❌ ${gaps.length} rendered string(s) not covered by the extractor`);
  process.exit(1);
}
console.log('\n✅ Audit complete');
