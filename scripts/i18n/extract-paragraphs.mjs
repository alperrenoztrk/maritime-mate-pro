#!/usr/bin/env node
/**
 * Lesson paragraph extractor.
 * ---------------------------
 * The `paragraphs` arrays (crew tasks, ship systems, ship operations, machine
 * topics) are long Turkish prose. They are kept out of the per-language
 * dictionaries (see extract-strings.mjs) and get checked English through one
 * shared pack instead: scripts/i18n/verified/paragraphs/*.json →
 * public/locales/shared/lesson-paragraphs.en.json (build-paragraph-pack.mjs).
 *
 * This script lists every paragraph with the file it comes from, so the pack
 * builder can report coverage per module.
 *
 * Usage: node scripts/i18n/extract-paragraphs.mjs   (npm run i18n:extract-paragraphs)
 * Output: scripts/i18n/paragraph-sources.json  { count, paragraphs: [{ text, file }] }
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const repoRoot = process.cwd();
const SRC = path.join(repoRoot, 'src');
const OUT_FILE = path.join(repoRoot, 'scripts/i18n/paragraph-sources.json');

const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) files.push(full);
  }
};
walk(SRC);

const seen = new Map();
for (const file of files.sort()) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.includes('paragraphs')) continue;
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const visit = (node) => {
    if (
      ts.isPropertyAssignment(node) &&
      node.name.getText(sf) === 'paragraphs' &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (!ts.isStringLiteral(element) && !ts.isNoSubstitutionTemplateLiteral(element)) continue;
        // Same key the runtime uses: the trimmed text of the <p> node.
        const value = element.text.trim();
        if (value && !seen.has(value)) seen.set(value, path.relative(repoRoot, file));
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

const paragraphs = [...seen].map(([text, file]) => ({ text, file }));
fs.writeFileSync(OUT_FILE, JSON.stringify({ count: paragraphs.length, paragraphs }, null, 1) + '\n');
console.log(`✅ Extracted ${paragraphs.length} lesson paragraphs → ${path.relative(repoRoot, OUT_FILE)}`);
