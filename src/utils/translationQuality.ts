// Post-processing for MACHINE-translated strings (gtx output), shared by the
// runtime live translator (LanguageContext) and the build-time locale pipeline
// (scripts/i18n/*). Fixes three systematic defects of the raw machine output —
// never applied to curated corrections/overrides, whose text is human-authored:
//
//   1. Zero-width characters the endpoint injects around non-breaking spaces
//      (e.g. rendered "values<ZWSP><ZWSP>are compared").
//   2. Redundant duplicates produced when the Turkish source glosses an English
//      term — "Bilge (Sintine)" / "köpük/foam" — and both halves translate to
//      the same word: "Bilge (Bilge)" → "Bilge", "foam/foam" → "foam".
//   3. Leading-letter case drifting from the source: "Makine" → "machine",
//      mid-sentence fragment "açısına uygun…" → "An arc…".

import { fixCalculationNoun } from './technicalText';
import { repairEnglishMaritimeTerminology } from './englishMaritimeTerminology';

const ZERO_WIDTH = /\u200B|\u200C|\u200D|\uFEFF/g;

const isUpper = (ch: string): boolean => /\p{Lu}/u.test(ch);
const isLower = (ch: string): boolean => /\p{Ll}/u.test(ch);

// "X (X)" with the two sides equal ignoring case. Sides may be multi-word
// ("Alarm fatigue (alarm fatigue)").
const PAREN_DUPLICATE = /(\p{L}[\p{L}'’ -]*?)\s*\(\s*(\p{L}[\p{L}'’ -]*?)\s*\)/gu;
// "x/x" with both sides a single identical word (no spaces, so intentional
// phrases like "Steady / Steady as she goes" are left alone). Sides must be
// ≥ 3 letters: short pairs are formula variables ("sin B/b"), not words.
const SLASH_DUPLICATE = /(\p{L}{3,})\/(\p{L}{3,})/gu;
// An identical pair in the SOURCE ("çelik/çelik μ ≈ 0.10", "sin B / b") means
// the pairing itself is meaningful (friction pairs, formulas) — never collapse
// the translation's pairs then.
const SOURCE_IDENTICAL_PAIR = /(\p{L}+)\s*\/\s*(\p{L}+)/gu;

export const normalizeMachineTranslation = (
  source: string,
  translated: string,
  languageCode?: string
): string => {
  let out = translated;

  // 1) Zero-width artifacts (only when the source itself has none).
  if (!ZERO_WIDTH.test(source)) out = out.replace(ZERO_WIDTH, '');
  ZERO_WIDTH.lastIndex = 0;

  // 2) Collapse duplicates — but never when the same duplicate already exists
  // in the source (then it is authored, not a translation artifact).
  const sourceLower = source.toLowerCase();
  const collapse = (match: string, a: string, b: string): string =>
    a.toLowerCase() === b.toLowerCase() && !sourceLower.includes(match.toLowerCase())
      ? a
      : match;
  out = out.replace(PAREN_DUPLICATE, collapse);
  let sourceHasIdenticalPair = false;
  for (const m of source.matchAll(SOURCE_IDENTICAL_PAIR)) {
    if (m[1].toLowerCase() === m[2].toLowerCase()) {
      sourceHasIdenticalPair = true;
      break;
    }
  }
  if (!sourceHasIdenticalPair) out = out.replace(SLASH_DUPLICATE, collapse);

  // 3) Match the source's leading-letter case. Guarded so acronyms and
  // mixed-case tokens (IMO, MAYDAY, pH, "I") are never touched: the first word
  // must be all-lowercase to be capitalized, or Xxxx-shaped to be lowercased.
  const s0 = source[0];
  const t0 = out[0];
  if (s0 && t0) {
    const firstWord = out.split(/\s/, 1)[0];
    if (isUpper(s0) && isLower(t0)) {
      if (!/\p{Lu}/u.test(firstWord)) {
        out = t0.toLocaleUpperCase(languageCode || undefined) + out.slice(1);
      }
    } else if (isLower(s0) && isUpper(t0)) {
      if (firstWord.length >= 2 && !/\p{Lu}/u.test(firstWord.slice(1))) {
        out = t0.toLocaleLowerCase(languageCode || undefined) + out.slice(1);
      }
    }
  }

  // 4) Fix the "hesap = account" mistranslation of calculation headings.
  out = fixCalculationNoun(source, out, languageCode);

  // 5) English needs the Turkish source to disambiguate maritime senses such
  // as AB/EU, demir/iron and iskele/pier. This final pass is deterministic and
  // idempotent, so cached and live translations follow the same terminology.
  if (languageCode === 'en') out = repairEnglishMaritimeTerminology(source, out);

  return out;
};
