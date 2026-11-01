// Gates for the checked-English pivot translation layer
// -----------------------------------------------------------------------------
// translate-pivot.mjs machine-translates CHECKED ENGLISH (not the ambiguous
// Turkish source) into the other languages, for every line that would
// otherwise be shown in English. The engine is generic, so every result passes
// these gates first. A line that fails any gate keeps its checked English: an
// English line is acceptable, a wrong one is not.
//
// prepare: what the engine may see
//   - a whole string that is a curated glossary term (maritimeTerms, English
//     column) gets the curated translation, no engine round-trip;
//   - a whole string that is an SMCP order ("Hard a-starboard", "Steady!") and a
//     one/two-word label with a maritime homonym ("Trim", "Port", "Draft marks")
//     keep their English: without context the engine picks the everyday sense;
//   - abbreviations, math tokens and SMCP orders inside a sentence are masked and
//     come back verbatim (orders are fixed commands, never generic verbs);
//   - English the engine cannot handle is paraphrased for the query only
//     ("slack tank" → "partially filled tank").
//
// finalize/checkForKey: what may be shipped
//   masks restored, numbers unchanged, abbreviations kept, no word-sense error
//   (English and Turkish source), no Turkish leftover, port/starboard kept,
//   right script, really translated, plausible length.
import {
  maskProtectedTokens,
  unmaskProtectedTokens,
  findMissingProtectedTokens,
} from '../../src/utils/protectedTerms.ts';
import { maskTechnicalTokens, unmaskTechnicalTokens } from '../../src/utils/technicalText.ts';
import { applyMaritimeCorrections, maritimeTerms } from '../../src/utils/maritimeGlossary.ts';
import { normalizeMachineTranslation } from '../../src/utils/translationQuality.ts';
import {
  PORT_SIDE,
  STARBOARD,
  SENSE_ERROR_RULES,
  findSenseErrors,
  findTurkishLeftovers,
} from './sense-error-rules.mjs';
import { findTermIssues } from './term-audit-rules.mjs';
import crypto from 'node:crypto';
import fs from 'node:fs';

/**
 * Content hash of the rules behind these gates. When a rule changes, existing
 * pivot lines are checked again (pivot-state.mjs) and rejected lines are
 * tried again on the next translation run.
 */
export const GATES_VERSION = crypto
  .createHash('sha1')
  .update(
    ['./pivot-gates.mjs', './sense-error-rules.mjs', './term-audit-rules.mjs', '../../supabase/functions/_shared/protectedTerms.ts']
      .map((file) => fs.readFileSync(new URL(file, import.meta.url), 'utf8'))
      .join('\n'),
  )
  .digest('hex')
  .slice(0, 12);

// ── SMCP orders (GLOSSARY.md, English column) ────────────────────────────────
// Unmistakable orders: masked wherever they occur.
const SMCP_ANYWHERE = [
  'hard[ -]a-port', 'hard[ -]a-starboard', 'steady as she goes', 'nothing to port',
  'nothing to starboard', 'dead slow ahead', 'dead slow astern', 'finished with engines?',
  'avast heaving', "anchor['’]s aweigh", '(?:port|starboard) (?:five|ten|fifteen|twenty)',
];
// Orders that are also ordinary English: masked only where the text presents
// them as an order (in quotes, in parentheses, with "!", or as the whole string).
const SMCP_ORDERS = [
  ...SMCP_ANYWHERE,
  'keep her steady', 'steady', 'midships', 'meet her', 'slow ahead', 'slow astern', 'half ahead',
  'half astern', 'full ahead', 'full astern', 'stop engines?', 'stand by engines?',
  'stand by (?:the )?anchor', 'let go (?:the )?(?:port |starboard )?anchor', 'walk back (?:the )?anchor',
  'heave up', 'weigh anchor', 'up and down', 'brought up', 'how is the chain leading\\??', 'make fast',
  'slack away', 'pay out', 'heave in', 'hold on', 'hold', 'single up', 'heave taut',
  'let go(?: the line)?', 'lower away', 'heave to',
];
const L = '(?<![\\p{L}\\p{N}])';
const R = '(?![\\p{L}\\p{N}])';
const byLength = (list) => [...list].sort((a, b) => b.length - a.length).join('|');
const ANYWHERE_RE = new RegExp(`${L}(?:${byLength(SMCP_ANYWHERE)})${R}`, 'giu');
const ORDER_ALT = byLength(SMCP_ORDERS);
const WHOLE_ORDER_RE = new RegExp(`^\\s*["“„«‘']?\\s*(?:${ORDER_ALT})\\s*[!.]?\\s*["”“»’']?\\s*$`, 'iu');
// Quoted / parenthesised / exclaimed orders; group 2 is the order itself.
const ORDER_CONTEXT_RE = new RegExp(
  `(["“„«‘'(]\\s*)(${ORDER_ALT})(?=\\s*[!.]?\\s*["”“»’')])|${L}(${ORDER_ALT})(?=!)`,
  'giu',
);

/** The text with every SMCP order removed (side checks ignore verbatim orders). */
export const stripOrders = (text) =>
  text.replace(ANYWHERE_RE, ' ').replace(ORDER_CONTEXT_RE, (whole, open) => (open !== undefined ? `${open} ` : ' '));

// ── Short labels with maritime homonyms ──────────────────────────────────────
const RISKY_WORDS = [
  'port', 'bows?', 'stern', 'heel(?:ing)?', 'list(?:ing)?', 'trim(?:ming)?', 'draft', 'draught', 'head',
  'beam', 'springs?', 'watch(?:es)?', 'berth', 'holds?', 'log', 'slack', 'soundings?', 'lead', 'fast',
  'tender', 'stiff', 'bridge', 'wing', 'lights?', 'marks?', 'master', 'mate', 'bank', 'hog(?:ging)?',
  'sag(?:ging)?', 'squat', 'pitch(?:ing)?', 'roll(?:ing)?', 'yaw(?:ing)?', 'surge', 'sway', 'heave',
  'hatch', 'frame', 'sheet', 'block', 'lines?', 'set', 'drift', 'fix', 'range', 'bearing', 'swell',
  'course', 'tug', 'fender', 'lay', 'run', 'reach', 'tack', 'lee', 'ratings?', 'current', 'deviation',
  'variation', 'cable', 'shackle', 'rose', 'card', 'boom', 'gear', 'shell', 'tanks?', 'trunk', 'stand',
  'stop', 'steady', 'let',
];
const RISKY_SHORT_RE = new RegExp(`${L}(?:${RISKY_WORDS.join('|')})${R}`, 'iu');

// English the engine mistranslates although the meaning is plain; the query
// carries an unambiguous paraphrase instead (display English is unchanged).
const PIVOT_REWRITES = [
  [/\bslack(\s+(?:ballast|fuel|fresh water|water|oil|cargo))?\s+(tanks?)\b/giu, (m, kind = '', tank) =>
    `${/^S/.test(m) ? 'Partially' : 'partially'} filled${kind} ${tank}`],
  // Flooding of the hull becomes a flood over land in most languages. Fixed
  // terms keep "flooding" (CO2 total flooding, counter-flooding, flooding
  // angle/point/valve, flooding detection).
  [/(?<![-\p{L}])(?<!total\s)(?<!counter\s)(?<!angle\sof\s)flooding\s+of\s+(?=(?:a|an|the|one|two|this|that|each|any)\b)/giu,
    (m) => `${/^F/.test(m) ? 'Entry' : 'entry'} of seawater into `],
  [/(?<![-\p{L}])(?<!total\s)(?<!counter\s)(?<!angle\sof\s)flooding(?![-\p{L}])(?!\s+(?:angles?|points?|valves?|systems?|lines?|boundar|detect))/giu,
    (m) => `${/^F/.test(m) ? 'Entry' : 'entry'} of seawater`],
];

// ── Curated glossary terms, English column ───────────────────────────────────
const curatedCache = new Map();
const curatedFor = (lang) => {
  let map = curatedCache.get(lang);
  if (map) return map;
  map = new Map();
  for (const term of maritimeTerms) {
    const en = term.translations?.en;
    const target = term.translations?.[lang];
    if (!en || !target) continue;
    const key = en.trim().toLowerCase();
    if (!map.has(key)) map.set(key, target);
  }
  curatedCache.set(lang, map);
  return map;
};
/** Curated translation of a whole-string glossary term, keeping a trailing colon. */
export const curatedTranslation = (english, lang) => {
  const trimmed = english.trim();
  const colon = trimmed.endsWith(':');
  const hit = curatedFor(lang).get((colon ? trimmed.slice(0, -1) : trimmed).trim().toLowerCase());
  return hit ? (colon ? `${hit}:` : hit) : null;
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const WORD_RE = /\p{L}+/gu;
const realWords = (text) => (text.match(WORD_RE) ?? []).filter((w) => w.length > 1);
export const wordCount = (text) => realWords(text).length;

const SCRIPT = {
  ru: /\p{Script=Cyrillic}/u, uk: /\p{Script=Cyrillic}/u, bg: /\p{Script=Cyrillic}/u,
  el: /\p{Script=Greek}/u, ar: /\p{Script=Arabic}/u, hi: /\p{Script=Devanagari}/u,
  ja: /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u, ko: /\p{Script=Hangul}/u,
  'zh-CN': /\p{Script=Han}/u,
};
const CJK = new Set(['ja', 'ko', 'zh-CN']);

const NATIVE_DIGITS = /[٠-٩۰-۹०-९０-９]/g;
const asciiDigit = (d) => {
  const c = d.charCodeAt(0);
  for (const base of [0x0660, 0x06f0, 0x0966, 0xff10]) if (c >= base && c <= base + 9) return String(c - base);
  return d;
};
// "1,500", "1.500", "1 500", "0,15", "06:00" all count as one number.
const NUMBER_RE = /\d{1,3}(?:[    ]\d{3})+(?!\d)|\d+(?:[.,:'   ]\d+)*/g;
export const numberTokens = (text) =>
  (text.replace(NATIVE_DIGITS, asciiDigit).match(NUMBER_RE) ?? []).map((t) => t.replace(/\D/g, ''));

/** Numbers of the English that the translation lost or changed. */
export const missingNumbers = (english, translated) => {
  const have = new Map();
  for (const t of numberTokens(translated)) have.set(t, (have.get(t) ?? 0) + 1);
  const missing = [];
  for (const t of numberTokens(english)) {
    const n = have.get(t) ?? 0;
    if (n > 0) have.set(t, n - 1);
    else missing.push(t);
  }
  return missing;
};

const normalizeForCompare = (text) => text.toLowerCase().replace(/\s+/g, ' ').trim();

const portHarbourRule = SENSE_ERROR_RULES.find((rule) => rule.id === 'port-harbour');
const mentionsPortSide = (text) =>
  !!portHarbourRule && portHarbourRule.src.test(text) && !portHarbourRule.skipSrc?.test(text);
const mentionsStarboard = (text) => /\bstarboard\b/iu.test(text);

// ── prepare ──────────────────────────────────────────────────────────────────
/**
 * Decides how one English text is handled for `lang`.
 * @returns {{ kind: 'direct', value: string }
 *   | { kind: 'keep', reason: string }
 *   | { kind: 'mt', query: string, termSlots: string[] | null, mathSlots: string[] | null, checkText: string }}
 */
export function preparePivot(english, lang) {
  const curated = curatedTranslation(english, lang);
  if (curated) return { kind: 'direct', value: curated };
  if (WHOLE_ORDER_RE.test(english)) return { kind: 'keep', reason: 'smcp-order' };
  if (wordCount(english) === 0) return { kind: 'keep', reason: 'no-words' };
  if (wordCount(english) <= 2 && RISKY_SHORT_RE.test(english)) return { kind: 'keep', reason: 'short-risky' };

  let query = english;
  for (const [pattern, replacement] of PIVOT_REWRITES) query = query.replace(pattern, replacement);

  const termMask = maskProtectedTokens(query, lang);
  const termSlots = termMask?.slots ? [...termMask.slots] : [];
  query = termMask?.masked ?? query;
  // SMCP orders share the abbreviation sentinels (TKN<n>), numbered after them.
  const sentinel = (text) => {
    termSlots.push(text);
    return `TKN${termSlots.length - 1}`;
  };
  query = query.replace(ANYWHERE_RE, (order) => sentinel(order));
  query = query.replace(ORDER_CONTEXT_RE, (whole, open, quoted, exclaimed) =>
    quoted !== undefined ? `${open}${sentinel(quoted)}` : sentinel(exclaimed));

  // Side terms are checked on the text the engine really translates: a side
  // that only occurs inside a masked order comes back verbatim in English.
  const checkText = query;

  const mathMask = maskTechnicalTokens(query);
  return {
    kind: 'mt',
    query: mathMask?.masked ?? query,
    termSlots: termSlots.length ? termSlots : null,
    mathSlots: mathMask?.slots ?? null,
    checkText,
  };
}

// ── finalize ─────────────────────────────────────────────────────────────────
/**
 * Restores and gates one engine answer for one English text.
 * @returns {{ ok: true, value: string } | { ok: false, reason: string }}
 */
export function finalizePivot(english, raw, prep, lang) {
  let out = typeof raw === 'string' ? raw.trim() : '';
  if (!out) return { ok: false, reason: 'empty' };
  if (prep.mathSlots) out = unmaskTechnicalTokens(out, prep.mathSlots);
  if (prep.termSlots) {
    const restored = unmaskProtectedTokens(out, prep.termSlots);
    if (restored === null) return { ok: false, reason: 'mask-lost' };
    out = restored;
  }
  if (/\bTKN\s?\d|xq\d+qx/i.test(out)) return { ok: false, reason: 'mask-lost' };
  out = normalizeMachineTranslation(english, applyMaritimeCorrections(out, lang), lang);

  if (wordCount(english) >= 2 && normalizeForCompare(out) === normalizeForCompare(english)) {
    return { ok: false, reason: 'untranslated' };
  }
  const reason = verifyTranslation(english, out, lang, prep.checkText);
  if (reason) return { ok: false, reason };
  return { ok: true, value: out };
}

/**
 * The gates on a finished translation of `english`. Also used to check pivot
 * lines again after a rule changed (pivot-state.mjs).
 * @param {string} [sideText] English with the SMCP orders masked
 * @returns {string | null} rejection reason, or null when the line may ship
 */
export function verifyTranslation(english, out, lang, sideText = stripOrders(english)) {
  const words = wordCount(english);
  const script = SCRIPT[lang];
  if (script && words >= 1 && !script.test(out)) return 'script';
  if (english.length >= 24) {
    const ratio = out.length / english.length;
    const [min, max] = CJK.has(lang) ? [0.12, 1.6] : [0.45, 2.6];
    if (ratio < min || ratio > max) return 'length';
  }
  if (missingNumbers(english, out).length) return 'numbers';
  if (findMissingProtectedTokens(english, out, lang).length) return 'abbreviation';
  const senses = findSenseErrors(english, out, lang);
  if (senses.length) return `sense:${senses[0]}`;
  if (findTurkishLeftovers(out, english).length) return 'turkish-leftover';
  if (mentionsStarboard(sideText) && STARBOARD[lang] && !STARBOARD[lang].test(out)) return 'side-starboard';
  if (mentionsPortSide(sideText) && PORT_SIDE[lang] && !PORT_SIDE[lang].test(out)) return 'side-port';
  return null;
}

/**
 * The checks that depend on the dictionary key (the Turkish source, or the
 * English UI string itself): the same rules i18n:scan-senses and
 * i18n:audit-terms apply to the shipped dictionaries, so a pivot line can never
 * fail those gates later.
 * @returns {string | null} rejection reason, or null when the line may ship
 */
export function checkForKey(sourceKey, value, lang, { abbreviations = true } = {}) {
  const senses = findSenseErrors(sourceKey, value, lang);
  if (senses.length) return `sense:${senses[0]}`;
  if (abbreviations && findTermIssues(sourceKey, value, lang).length) return 'term-audit';
  return null;
}
