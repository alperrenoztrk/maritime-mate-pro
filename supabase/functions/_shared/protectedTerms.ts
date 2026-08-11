// Protection layer for technical ABBREVIATIONS in the Turkish source text.
// -----------------------------------------------------------------------------
// The app is authored in Turkish and machine translated into 24 languages. The
// engine treats a short, unfamiliar abbreviation as a typo and "corrects" it —
// silently turning professional content into nonsense:
//
//   "Manevra ve DP yedeği"  →  "Maneuver and XP reserve"   (DP  → XP)
//   "DP kaybı" / "Yüksek DP" →  "XP loss" / "High XP"
//   "KB mesafesi"           →  "NW distance"               (KB  → compass point)
//   "GM değeri" (ko/ja)     →  the abbreviation is translated away entirely
//
// The damage is concentrated in SHORT strings — labels, table cells, headings —
// because there is too little context for the engine to recognise the term. The
// same abbreviation inside a full sentence usually survives. Since the app is
// mostly short strings, this is the dominant translation defect in the corpus.
//
// The defence mirrors maskTechnicalTokens() in ./technicalText.ts: every known
// abbreviation is swapped for an ASCII sentinel that the engine leaves alone,
// then restored — verbatim, or as the language's established equivalent — after
// translation. The engine never sees a token it can "fix".
//
// Sentinel shape was chosen empirically against the translation endpoint:
//   - "xq0qx" (the math sentinel) survives, but reads as a foreign word and
//     drags the word order with it: "Manevra ve xq0qx yedeği" comes back as
//     "Maneuver and reserve xq0qx".
//   - "TKN0" is treated as an abbreviation, so it holds its position AND the
//     surrounding grammar: "Maneuver and TKN0 backup". Verified intact in 19 of
//     20 target languages (Ukrainian transliterates it to Cyrillic, which the
//     unmask regex below tolerates), in multi-slot strings and in the batched
//     "\n"-joined requests the runtime and the locale generator both use.
//   - "TKN\d" occurs nowhere in src/ or public/locales/, so it cannot collide
//     with real content.
//
// Turkish case suffixes are deliberately NOT masked: "DP'ye geçiş" becomes
// "TKN0'ye geçiş" and translates to "transition to TKN0" with the grammar
// intact, whereas swallowing the suffix loses the case relationship.

import {
  getGlossaryMaskMatcher,
  getGlossaryMaskRules,
} from './maritimeGlossary.ts';

export interface ProtectedToken {
  /** The abbreviation exactly as authored in the Turkish source. */
  token: string;
  /**
   * Established equivalent per language. A language that is not listed keeps
   * the abbreviation verbatim — the correct default for the international
   * conventions, instrument names and formula symbols that make up most of this
   * list. Only well-documented localisations are listed (e.g. IMO = OMI in
   * French, PPE = PSA in German).
   */
  localized?: Partial<Record<string, string>>;
}

// Every abbreviation that actually occurs in src/data, grouped by kind. Adding
// an entry is safe as long as the token is ALL-CAPS: matching is case sensitive,
// so the stability symbol "KG" is protected while the unit "kg" is untouched.
export const PROTECTED_TOKENS: ProtectedToken[] = [
  // ── Conventions, codes and regulatory bodies ────────────────────────────────
  { token: 'SOLAS' },
  { token: 'MARPOL' },
  { token: 'COLREG' },
  { token: 'STCW' },
  { token: 'MLC' },
  { token: 'ISM' },
  { token: 'ISPS' },
  { token: 'IMDG' },
  { token: 'IGC' },
  { token: 'IBC' },
  { token: 'ISGOTT' },
  { token: 'HSC' },
  { token: 'ESP' },
  { token: 'IMO', localized: { fr: 'OMI', es: 'OMI' } },
  { token: 'ILO', localized: { fr: 'OIT', es: 'OIT' } },
  { token: 'MSC' },
  { token: 'MEPC' },
  { token: 'IACS' },
  { token: 'IALA' },
  { token: 'ITF' },
  { token: 'OCIMF' },
  { token: 'CDI' },
  { token: 'SIRE' },
  { token: 'TMSA' },
  { token: 'VIQ' },
  { token: 'PSC' },

  // ── Bridge / navigation equipment and terms ────────────────────────────────
  { token: 'ECDIS' },
  { token: 'ARPA' },
  { token: 'AIS' },
  { token: 'GPS' },
  { token: 'DGPS' },
  { token: 'BNWAS' },
  { token: 'LRIT' },
  { token: 'SSAS' },
  { token: 'VTS' },
  { token: 'TSS' },
  { token: 'UKC' },
  { token: 'CPA' },
  { token: 'TCPA' },
  { token: 'ROT' },
  { token: 'ETA' },
  { token: 'ETD' },
  { token: 'DP' },
  { token: 'DPO' },

  // ── Radio / GMDSS ──────────────────────────────────────────────────────────
  { token: 'GMDSS' },
  { token: 'DSC' },
  { token: 'NAVTEX' },
  { token: 'EPIRB' },
  { token: 'SART' },
  { token: 'MRCC' },
  { token: 'SAR' },
  { token: 'VHF', localized: { de: 'UKW' } },
  { token: 'MF' },
  { token: 'HF' },

  // ── Safety, LSA/FFA and permits ────────────────────────────────────────────
  { token: 'LSA' },
  { token: 'FFA' },
  { token: 'SCBA' },
  { token: 'EEBD' },
  { token: 'MOB' },
  { token: 'PTW' },
  { token: 'LOTO' },
  { token: 'JHA' },
  { token: 'HAZID' },
  { token: 'HAZOP' },
  { token: 'ALARP' },
  { token: 'MSDS' },
  { token: 'SDS' },
  { token: 'MOC' },
  {
    token: 'PPE',
    localized: { de: 'PSA', fr: 'EPI', es: 'EPI', it: 'DPI', pt: 'EPI', nl: 'PBM' },
  },

  // ── Management systems and environmental instruments ───────────────────────
  { token: 'SMS' },
  { token: 'PMS' },
  { token: 'SOPEP' },
  { token: 'SEEMP' },
  { token: 'EEDI' },
  { token: 'EEXI' },
  { token: 'CII' },
  { token: 'BWM' },
  { token: 'ODME' },
  { token: 'VOC' },
  { token: 'COW' },
  { token: 'IGS' },

  // ── Stability, hydrostatics and load lines ─────────────────────────────────
  // Formula symbols: never localised, in any language — they are variables.
  { token: 'GM' },
  { token: 'KG' },
  // "KB" is also the Turkish compass abbreviation for kuzeybatı (north-west).
  // The corpus is written with the direction spelled out ("Kuzeybatı Avrupa")
  // so the symbol reading is unambiguous here — keep it that way when authoring.
  { token: 'KB' },
  { token: 'BM' },
  { token: 'KM' },
  { token: 'LCG' },
  { token: 'VCG' },
  { token: 'TCG' },
  { token: 'LCF' },
  { token: 'LCB' },
  { token: 'TPC' },
  { token: 'MCT' },
  { token: 'FSC' },
  { token: 'DWT' },
  { token: 'GRT' },
  { token: 'LOA' },
  { token: 'LBP' },
  { token: 'SWL' },
  { token: 'MBL' },
  { token: 'WLL' },

  // ── Machinery, fuels and electrical ────────────────────────────────────────
  { token: 'UMS' },
  { token: 'ECR' },
  { token: 'SCR' },
  { token: 'EGR' },
  { token: 'TBN' },
  { token: 'VIT' },
  // General-engineering abbreviations with genuinely standard local forms —
  // unlike the SOLAS ones (SCBA, EEBD, EPIRB, SART), which maritime training
  // uses untranslated in every language.
  { token: 'RPM', localized: { de: 'U/min', fr: 'tr/min' } },
  { token: 'PID' },
  { token: 'PLC', localized: { de: 'SPS', fr: 'API' } },
  { token: 'UPS', localized: { de: 'USV', fr: 'ASI', es: 'SAI' } },
  { token: 'HFO' },
  { token: 'LSFO' },
  { token: 'MDO' },
  { token: 'MGO' },
  { token: 'CO2' },
  { token: 'H2S' },
  { token: 'LNG', localized: { fr: 'GNL', es: 'GNL', it: 'GNL', pt: 'GNL' } },
  { token: 'LPG', localized: { fr: 'GPL', es: 'GLP', it: 'GPL', pt: 'GLP' } },

  // ── Ship types and offshore ────────────────────────────────────────────────
  { token: 'VLCC' },
  { token: 'FPSO' },
  { token: 'AHTS' },
  { token: 'PSV' },
  { token: 'OSV' },
  { token: 'ROV' },
  { token: 'CAP' },
  { token: 'ROB' },
];

// ── Masking ──────────────────────────────────────────────────────────────────

const SENTINEL_PREFIX = 'TKN';

const sentinel = (index: number): string => `${SENTINEL_PREFIX}${index}`;

/**
 * Restoration is deliberately lenient about what came back: some engines change
 * the sentinel's case, insert a space before the index, or transliterate the
 * letters into the target script — Ukrainian returns "ТКН0" in Cyrillic and
 * Hindi spells the letters out in Devanagari as "टीकेएन0". Any of those still
 * identifies the slot unambiguously.
 *
 * Missing a transliteration is not a correctness bug but it is expensive: the
 * caller then re-translates the string unprotected, which is exactly how "PSC"
 * became "पीएससी" across 567 Hindi entries before this form was covered.
 */
const SENTINEL_RE = new RegExp(
  '(?:' +
    [
      // Latin, Cyrillic and Greek letters that look like T-K-N.
      String.raw`[TtТтΤτ]\s?[KkКкΚκ]\s?[NnНнΝν]`,
      // Devanagari spelling of the letter names ("ṭī-ke-en").
      String.raw`टी\s?के\s?एन`,
    ].join('|') +
    ')' +
    // The index tolerates the letters engines confuse with digits — "TKN0" has
    // come back as "TKNO" — and the Arabic-Indic digit forms.
    String.raw`\s?([0-9OolI٠-٩۰-۹]{1,3})`,
  'gu'
);

const normalizeIndex = (value: string): string =>
  value
    .replace(/[Oo]/g, '0')
    .replace(/[lI]/g, '1')
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Longest token first so "DPO" wins over "DP" and "TCPA" over "CPA". Matching is
// case SENSITIVE (the abbreviations are authored ALL-CAPS) and bounded by
// Unicode letter/digit lookarounds, so "KG" matches in "KG değeri" but not in
// "kg" or inside "KGB". An apostrophe is not a letter, so the Turkish suffix in
// "DP'ye" stays outside the match and survives translation attached to the
// sentinel.
const TOKEN_PATTERN = new RegExp(
  `(?<![\\p{L}\\p{N}])(${[...PROTECTED_TOKENS]
    .map((entry) => entry.token)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|')})(?![\\p{L}\\p{N}])`,
  'gu'
);

const localizedIndex: Map<string, Partial<Record<string, string>>> = new Map(
  PROTECTED_TOKENS.filter((entry) => entry.localized).map((entry) => [
    entry.token,
    entry.localized as Partial<Record<string, string>>,
  ])
);

/** Resolves how a token must read in the target language. */
export const renderProtectedToken = (token: string, languageCode: string): string =>
  localizedIndex.get(token)?.[languageCode] ?? token;

export interface ProtectedMask {
  /** Source with every protected abbreviation replaced by its sentinel. */
  masked: string;
  /** Target-language rendering per slot (slot index = sentinel index). */
  slots: string[];
}

/**
 * Renders an abbreviation-only string directly, without an engine round-trip:
 * every abbreviation becomes the language's established form and the rest of the
 * string is left alone ("VHF + MF" → "UKW + MF" in German).
 */
export const renderAbbreviationOnly = (source: string, languageCode: string): string => {
  TOKEN_PATTERN.lastIndex = 0;
  return source.replace(TOKEN_PATTERN, (token: string) =>
    renderProtectedToken(token, languageCode)
  );
};

/**
 * True when a string carries no translatable words once its abbreviations are
 * removed — "SOLAS V", "STCW II/1", "MF/HF", "DP 1", "ARPA". These read the same
 * in every language, and sending them to an engine only invites damage: with the
 * abbreviation masked there is nothing left to translate, and the engine tends to
 * glue the remains together ("TKN0 V" → "TKN0V" → "SOLASV"). Render them with
 * renderAbbreviationOnly instead.
 */
export const isAbbreviationOnly = (source: string): boolean => {
  const text = source.trim();
  if (!text) return false;
  TOKEN_PATTERN.lastIndex = 0;
  if (!TOKEN_PATTERN.test(text)) return false;
  TOKEN_PATTERN.lastIndex = 0;
  const rest = text.replace(TOKEN_PATTERN, ' ');
  // Roman numerals and single letters are section markers, not words.
  const words = (rest.match(/\p{L}+/gu) ?? []).filter(
    (word) => word.length > 1 && !/^[IVXLCDM]+$/.test(word)
  );
  return words.length === 0;
};

/**
 * Replaces protected abbreviations AND curated maritime glossary terms with
 * sentinels. Returns null when the source contains neither (the common case),
 * so callers can skip the extra work and send the string unchanged.
 *
 * The glossary half is what makes curated terminology reach the output at all on
 * the plain-text paths. `getMaritimeTranslationOverride` only matches a whole
 * string and `applyMaritimeCorrections` only rescues Turkish words the engine
 * left untranslated — neither helps when the engine confidently translates a
 * term wrongly, which is the usual case: "baş kontrolü" inside "DP — baş
 * kontrolü" comes back as "head control". Masking forces the curated term
 * whatever the engine produced, exactly as the Supabase translate function
 * already does with its HTML no-translate spans.
 */
export const maskProtectedTokens = (
  source: string,
  languageCode: string
): ProtectedMask | null => {
  if (!source || !languageCode || languageCode === 'tr') return null;

  const slots: string[] = [];
  TOKEN_PATTERN.lastIndex = 0;
  let masked = source.replace(TOKEN_PATTERN, (token: string) => {
    slots.push(renderProtectedToken(token, languageCode));
    return sentinel(slots.length - 1);
  });

  // Most strings hold no glossary term, so test the one combined pattern before
  // running several hundred individual rules.
  const matcher = getGlossaryMaskMatcher(languageCode);
  if (matcher?.test(masked)) {
    for (const { pattern, replacement } of getGlossaryMaskRules(languageCode)) {
      pattern.lastIndex = 0;
      masked = masked.replace(pattern, () => {
        slots.push(replacement);
        return sentinel(slots.length - 1);
      });
    }
  }

  return slots.length ? { masked, slots } : null;
};

/** A protected abbreviation the source carries but the translation dropped. */
export interface MissingProtectedToken {
  /** The abbreviation as written in the Turkish source. */
  token: string;
  /** How it should have been rendered in the target language. */
  expected: string;
  /** Times the source used it. */
  sourceCount: number;
  /** Times the translation carries it (verbatim or as `expected`). */
  translatedCount: number;
}

/**
 * Lists protected abbreviations that did not survive into a translation. Either
 * the verbatim token or the language's established equivalent counts as intact,
 * so a French string may keep "IMO" or use "OMI".
 *
 * This is the check side of the mask: the AI pre-translation path uses it to
 * retry a batch the model mangled, and scripts/i18n/audit-terms.mjs uses it to
 * find damage already baked into the shipped dictionaries.
 */
export const findMissingProtectedTokens = (
  source: string,
  translated: string,
  languageCode: string
): MissingProtectedToken[] => {
  if (!source || !translated || !languageCode || languageCode === 'tr') return [];

  const missing: MissingProtectedToken[] = [];
  TOKEN_PATTERN.lastIndex = 0;

  // Occurrences are counted rather than merely detected: a paragraph that uses
  // "DP" three times and comes back with two has lost one to the engine, and
  // presence alone would call that clean.
  //
  // Boundaries are Latin-only on purpose. Japanese, Chinese, Korean, Greek and
  // Cyrillic text runs straight up against a Latin abbreviation with no space
  // ("2.1 トルクとKG", "IMO硫黄分規制"), and treating the neighbouring script as
  // part of the word would report every CJK entry as damaged. Merging with
  // LATIN letters is the real failure ("GM" inside "GMDSS"), so only those
  // count. A digit may lead, because engines sometimes swallow the space in
  // "2.1 DSC" → "2.1DSC" — a spacing slip, not a lost abbreviation. A short
  // lower-case tail is an inflection: English plurals ("EPIRBs"), German
  // genitives ("IMOs").
  const countIn = (haystack: string, needle: string): number =>
    (haystack.match(
      new RegExp(
        `(?<![A-Za-z])${escapeRegExp(needle)}(?:['’]?[a-z]{1,3})?(?![A-Za-z0-9])`,
        'gu'
      )
    ) ?? []).length;

  // Occurrences inside parentheses are not counted: the source often glosses a
  // term with itself ("Başlangıç GM (Initial GM)") and normalizeMachineTranslation
  // deliberately collapses that duplicate away.
  const outsideParens = source.replace(/\([^)]*\)/g, ' ');
  const sourceCounts = new Map<string, number>();
  for (const match of outsideParens.matchAll(TOKEN_PATTERN)) {
    sourceCounts.set(match[1], (sourceCounts.get(match[1]) ?? 0) + 1);
  }

  for (const [token, sourceCount] of sourceCounts) {
    const expected = renderProtectedToken(token, languageCode);
    const translatedCount =
      expected === token
        ? countIn(translated, token)
        : countIn(translated, expected) + countIn(translated, token);
    if (translatedCount < sourceCount) {
      missing.push({ token, expected, sourceCount, translatedCount });
    }
  }

  return missing;
};

/**
 * Restores the target-language abbreviations. Returns null when the engine lost
 * or duplicated a sentinel — the caller must then fall back to translating the
 * unmasked source, because a half-restored string would leak "TKN0" into the UI.
 */
export const unmaskProtectedTokens = (
  translated: string,
  slots: string[]
): string | null => {
  const seen = new Set<number>();
  let failed = false;

  SENTINEL_RE.lastIndex = 0;
  const out = translated.replace(SENTINEL_RE, (whole: string, rawIndex: string) => {
    const index = Number(normalizeIndex(rawIndex));
    const slot = slots[index];
    if (slot === undefined) {
      failed = true;
      return whole;
    }
    seen.add(index);
    return slot;
  });

  if (failed || seen.size !== slots.length) return null;
  return out;
};
