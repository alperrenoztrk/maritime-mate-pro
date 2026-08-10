// Shared detection rules for the terminology audit.
// -----------------------------------------------------------------------------
// Used by scripts/i18n/audit-terms.mjs (report / regression guard) and
// scripts/i18n/repair-terms.mjs (drop the damaged entries so the protected
// pipeline can translate them again). Keeping the rules in one place means the
// audit and the repair can never disagree about what is broken.
import { findMissingProtectedTokens } from '../../src/utils/protectedTerms.ts';

// Word-sense failures: [label, Turkish source pattern, per-language wrong output].
// A finding needs BOTH halves — the source must use the ambiguous Turkish word
// AND the translation must show the everyday sense. That pairing is what keeps
// false positives out: an English "iron" is only suspect when the Turkish said
// "demir", and a "head" only when the Turkish said "baş".
export const SENSE_RULES = [
  ['baş = heading, not head', /\bbaş\s+(kontrol|açı|yön|tut)|otomatik\s+baş|mevki\s+ve\s+baş/i, {
    en: /\bhead\b/i, de: /\bKopf/i, fr: /\bt[êe]te\b/i, es: /\bcabeza\b/i,
    it: /\btesta\b/i, pt: /\bcabeça\b/i, nl: /\bhoofd\b/i,
  }],
  ['omuzluk = hull quarter, not shoulder pad', /omuzluk/i, {
    en: /\bshoulder\b/i, de: /\bSchulter/i, fr: /\b[ée]paule/i, es: /\bhombro/i,
    it: /\bspalla/i, pt: /\bombro/i, nl: /\bschouder/i,
  }],
  ['kıç kasara = poop deck, not aft forecastle', /kıç\s+kasara/i, {
    en: /aft\s+forecastle/i,
  }],
  ['makine hazır = engine on stand-by', /makine\s+hazır/i, {
    en: /machine\s+(is\s+)?ready/i,
  }],
  ['alabanda = hard over helm order', /alabanda/i, {
    en: /\b(astern to|away from the pier|Alabanda)\b/, de: /\bAlabanda\b/,
    fr: /\bAlabanda\b/, es: /\bAlabanda\b/,
  }],
  ['hesap = calculation, not account', /hesab[ıi]|hesaplama|hesap\b/i, {
    en: /\baccounts?\b/i, de: /\bKont(o|en)\b/, fr: /\bcomptes?\b/i,
    es: /\bcuentas?\b/i, it: /\bcont[oi]\b/i, pt: /\bcontas?\b/i,
    nl: /\b(rekening|account)/i,
  }],
];

// Sources where "hesap" genuinely means the user's account. Mirrors
// ACCOUNT_SOURCE_RE in src/utils/technicalText.ts — keep the two in step.
const ACCOUNT_SOURCE_RE =
  /\b(banka|kullanıcı|üye|oturum|e-posta|google|apple)\s+hesab|hesab[^.!?]{0,40}\b(google|apple|e-?posta|şifre|parola|oturum)\b|hesab[ıi]m|hesab[ıi]n[ıi]z|hesap\s+(ve\s+veri\s+)?silme|hesab[ıi]\s*(kalıcı olarak\s*)?sil/i;

/**
 * Labels every terminology defect in one dictionary entry. An empty array means
 * the entry is clean.
 *
 * Severity separates the two kinds of finding:
 *   - `error`   — the term is gone from the translation. Always a defect.
 *   - `warning` — some occurrences survived and some did not. Usually a defect,
 *     but a long paragraph may legitimately reword the second mention away, so
 *     these are repaired (re-translation is cheap) without failing `--strict`.
 *
 * @param {string} source Turkish source string (the dictionary key)
 * @param {string} value  Translation shipped for `lang`
 * @param {string} lang   Target language code
 * @returns {Array<{ kind: 'abbreviation' | 'sense', severity: 'error' | 'warning', label: string }>}
 */
export function findTermIssues(source, value, lang) {
  const issues = [];

  for (const found of findMissingProtectedTokens(source, value, lang)) {
    const { token, expected, sourceCount, translatedCount } = found;
    const gone = translatedCount === 0;
    issues.push({
      kind: 'abbreviation',
      severity: gone ? 'error' : 'warning',
      label: gone
        ? `${token} → missing (expected "${expected}")`
        : `${token} → ${translatedCount}/${sourceCount} kept (expected "${expected}")`,
    });
  }

  for (const [label, sourceRe, targets] of SENSE_RULES) {
    const targetRe = targets[lang];
    if (!targetRe || !sourceRe.test(source) || !targetRe.test(value)) continue;
    if (label.startsWith('hesap') && ACCOUNT_SOURCE_RE.test(source)) continue;
    issues.push({ kind: 'sense', severity: 'error', label });
  }

  return issues;
}
