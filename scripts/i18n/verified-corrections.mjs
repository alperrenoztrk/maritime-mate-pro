// Verified translation packs
// -----------------------------------------------------------------------------
// Each scripts/i18n/verified/<name>.json maps an exact source string (as looked
// up at runtime) to checked translations:
//
//   { "<source>": { "fill"?: false, "en": "...", "de": "...", ... } }
//
// The packs were written and checked by hand for the languages they list. For
// every other shipped language the checked English text is used, unless the
// entry says "fill": false: an English line is acceptable, a wrong machine
// translation is not. With "fill": false only the listed languages change
// (used where the other languages were already right and only some were wrong).
//
// Consumed through contextual-corrections.mjs, so i18n:fix, i18n:generate and
// i18n:pretranslate all keep these texts. apply-contextual-fixes.mjs also
// inserts verified keys that a dictionary does not have yet (new or rewritten
// source strings).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const VERIFIED_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'verified');

// Every language shipped in public/locales.
export const SHIPPED_LANGUAGES = [
  'ar', 'bg', 'cs', 'da', 'de', 'el', 'en', 'es', 'fi', 'fr', 'hi', 'hu',
  'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'uk', 'zh-CN',
];

const entries = new Map();
for (const file of fs.readdirSync(VERIFIED_DIR).filter((f) => f.endsWith('.json')).sort()) {
  const pack = JSON.parse(fs.readFileSync(path.join(VERIFIED_DIR, file), 'utf8'));
  for (const [source, entry] of Object.entries(pack)) {
    const { fill = true, ...explicit } = entry;
    if (typeof explicit.en !== 'string' || !explicit.en.trim()) {
      throw new Error(`verified/${file}: "${source.slice(0, 60)}" has no English text`);
    }
    if (entries.has(source)) {
      throw new Error(`verified/${file}: "${source.slice(0, 60)}" is already in another pack`);
    }
    const filled = {};
    if (fill) {
      for (const lang of SHIPPED_LANGUAGES) filled[lang] = explicit.en;
    }
    entries.set(source, { explicit, filled });
  }
}

/** Source strings covered by a verified pack. */
export const VERIFIED_KEYS = new Set(entries.keys());

/**
 * Languages a verified pack lists explicitly for a source string (written and
 * checked by hand). The other languages only carry the English fill, which the
 * checked-English pivot layer (translate-pivot.mjs) may replace.
 */
export const VERIFIED_EXPLICIT_LANGS = new Map(
  [...entries].map(([source, { explicit }]) => [source, new Set(Object.keys(explicit))]),
);

/**
 * Merges the verified packs into a curated corrections map. Explicit verified
 * texts win; curated texts win over the English fill.
 */
export function withVerifiedCorrections(curated) {
  const out = { ...curated };
  for (const [source, { explicit, filled }] of entries) {
    out[source] = { ...filled, ...(curated[source] ?? {}), ...explicit };
  }
  return out;
}
