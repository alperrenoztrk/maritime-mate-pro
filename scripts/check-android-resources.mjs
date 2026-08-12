#!/usr/bin/env node
/**
 * Android string-resource escaping guard.
 * ---------------------------------------
 * aapt2 rejects an unescaped apostrophe or double quote inside a <string>
 * value, and it reports it as:
 *
 *   java.lang.IllegalStateException: Can not extract resource from
 *   com.android.aaptcompiler.ParsedResource@65b8354e.
 *
 * — no file, no line, no resource name, buried under a 200-line Gradle stack
 * trace, and only after the release build has already run for a minute. That
 * is what silently broke every "Android Release" run until `Mariner's Book`
 * in values/strings.xml was escaped to `Mariner\'s Book`.
 *
 * This check runs in milliseconds and names the offending resource, so run it
 * before the Gradle build (see .github/workflows/android-release.yml).
 *
 * Usage: node scripts/check-android-resources.mjs   (npm run check:android-resources)
 */
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const RES_ROOT = path.join(repoRoot, 'android/app/src/main/res');

const valuesFiles = [];
const collect = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('values')) collect(full);
    } else if (entry.name.endsWith('.xml')) {
      valuesFiles.push(full);
    }
  }
};
collect(RES_ROOT);

// <string name="x">…</string> and the <item> children of arrays/plurals.
const VALUE_RE = /<(string|item)\b[^>]*>([\s\S]*?)<\/\1>/g;
const NAME_RE = /\bname\s*=\s*"([^"]*)"/;

/**
 * A value wrapped in double quotes is taken literally by aapt, so an
 * apostrophe inside it needs no backslash. Anywhere else, a bare ' or " is a
 * hard error.
 */
const findUnescaped = (value) => {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 1) return null;
  for (let i = 0; i < value.length; i += 1) {
    const ch = value[i];
    if (ch !== "'" && ch !== '"') continue;
    let backslashes = 0;
    for (let j = i - 1; j >= 0 && value[j] === '\\'; j -= 1) backslashes += 1;
    if (backslashes % 2 === 0) return ch;
  }
  return null;
};

const failures = [];
for (const file of valuesFiles) {
  const text = fs.readFileSync(file, 'utf8');
  const lineStarts = [0];
  for (let i = 0; i < text.length; i += 1) if (text[i] === '\n') lineStarts.push(i + 1);
  const lineOf = (index) => {
    let low = 0;
    let high = lineStarts.length - 1;
    while (low < high) {
      const mid = Math.ceil((low + high) / 2);
      if (lineStarts[mid] <= index) low = mid;
      else high = mid - 1;
    }
    return low + 1;
  };

  VALUE_RE.lastIndex = 0;
  let match;
  while ((match = VALUE_RE.exec(text)) !== null) {
    const [, , value] = match;
    // Resource references and nested markup are not literal text.
    if (value.includes('<')) continue;
    const offender = findUnescaped(value);
    if (!offender) continue;
    const name = NAME_RE.exec(match[0])?.[1] ?? '(unnamed)';
    failures.push(
      `${path.relative(repoRoot, file)}:${lineOf(match.index)}  ${name} — unescaped ${
        offender === "'" ? "apostrophe (')" : 'double quote (")'
      } in ${JSON.stringify(value.trim())}`,
    );
  }
}

if (failures.length > 0) {
  console.error('❌ Android string resources with unescaped characters:\n');
  for (const failure of failures) console.error(`   ${failure}`);
  console.error(
    `\n   aapt2 fails on these with an opaque "Can not extract resource" error.` +
      `\n   Escape as \\' and \\" , or wrap the whole value in double quotes.`,
  );
  process.exit(1);
}

console.log(`✅ Android string resources escaped correctly (${valuesFiles.length} values files).`);
