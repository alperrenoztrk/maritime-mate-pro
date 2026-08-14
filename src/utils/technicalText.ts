// Protection layer for technical/mathematical source text.
//
// The app is authored in Turkish and every other language is machine
// translated. Generic MT engines happily "translate" mathematics:
//   "atan2(Dep, dLat)"  →  "tane2(Dep, dLat)"   (tr: "atan" = one who throws)
//   "Kurs = atan2(...)" →  formula becomes wrong in 18 locales.
//
// Two defences live here:
//   1. isTechnicalString() — strings that are pure formula are never sent to
//      the translator at all (they are language independent anyway).
//   2. maskTechnicalTokens()/unmaskTechnicalTokens() — inside mixed prose the
//      math function names are swapped for ASCII sentinels that survive MT
//      round-trips untouched, then restored verbatim afterwards.

// Function names that MT engines are known to mangle. Longest first so that
// "atan2" wins over "atan"/"tan".
const MATH_FUNCTIONS = [
  'arcsin', 'arccos', 'arctan',
  'atan2', 'asin', 'acos', 'atan',
  'sinh', 'cosh', 'tanh',
  'sqrt', 'exp', 'log', 'ln',
  'sin', 'cos', 'tan',
];

// A math function only counts when it is used as one: followed by "(" or by a
// Greek/variable symbol ("cosφ", "sinΔλ"). Plain prose words are untouched.
const MATH_CALL_RE = new RegExp(
  `\\b(${MATH_FUNCTIONS.join('|')})\\s*(?=[(\\u0370-\\u03FF])`,
  'giu'
);

// ASCII sentinel — verified to pass through the translation endpoints intact.
const maskToken = (index: number): string => `xq${index}qx`;
const MASK_RE = /xq(\d+)qx/g;

/** Symbols that only appear in formulas / measurements. */
const MATH_SYMBOLS = /[=√∑Σ∫∂≈≤≥×÷°′″⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉Δδθφλμρηπω±·]/u;

// A formula may still contain a user-facing Turkish label. These words were
// previously swallowed by the pure-formula heuristic, leaving strings such as
// "Açı (°)", "Hız 1 (V₁)" and "Sıcaklık Farkı (T₁−T₂)" untranslated.
const TRANSLATABLE_TECHNICAL_LABEL_RE =
  /(?:^|[^\p{L}])(?:açı|açılar|hız|başlangıç|varış|enlem|boylam|doğu|batı|kuzey|güney|farkı|sıcaklık|yoğunluk|sıvı|yatak|ömrü|ölçümü|kurs|kerteriz|mevki|birim|genlik|çap|deplasman|kargo|yük|ambar|su|rüzgâr|rüzgar|hesaplanır|kesişim|doğrultu|dik|arası|ile|veya)(?=$|[^\p{L}])/iu;

/**
 * True when a string is a formula rather than prose, and therefore must be
 * shown identically in every language.
 *
 * Heuristic: it contains at least one math symbol AND its alphabetic content is
 * dominated by short symbol-like tokens (variables, function names) rather than
 * real words.
 */
export const isTechnicalString = (value: string): boolean => {
  const text = value.trim();
  if (!text) return false;
  if (!MATH_SYMBOLS.test(text)) return false;
  if (TRANSLATABLE_TECHNICAL_LABEL_RE.test(text)) return false;

  // Words of 4+ letters that are not known math functions count as prose.
  const words = text.match(/\p{L}{4,}/gu) ?? [];
  const proseWords = words.filter((w) => !MATH_FUNCTIONS.includes(w.toLowerCase()));

  // No prose at all → definitely a formula ("Δ = W × 1.025").
  if (proseWords.length === 0) return true;

  // Mostly symbols with a couple of labels ("Mesafe = √(dLat² + Dep²)") is
  // still a formula: require the symbol density to be high.
  const symbolCount = (text.match(new RegExp(MATH_SYMBOLS.source, 'gu')) ?? []).length;
  return symbolCount >= 2 && proseWords.length <= 2 && text.length <= 120;
};

/** True when the string uses a math function call the engine would mangle. */
export const containsMathCall = (value: string): boolean => {
  MATH_CALL_RE.lastIndex = 0;
  return MATH_CALL_RE.test(value);
};

export interface TechnicalMask {
  masked: string;
  slots: string[];
}

/**
 * Replaces math function names with sentinels. Returns null when there is
 * nothing to protect (the common case), so callers can skip the extra work.
 */
export const maskTechnicalTokens = (source: string): TechnicalMask | null => {
  const slots: string[] = [];
  const masked = source.replace(MATH_CALL_RE, (match) => {
    slots.push(match);
    return maskToken(slots.length - 1);
  });
  return slots.length ? { masked, slots } : null;
};

/** Restores masked math function names, in place, after translation. */
export const unmaskTechnicalTokens = (translated: string, slots: string[]): string =>
  translated.replace(MASK_RE, (whole, index: string) => slots[Number(index)] ?? whole);

// ── "Account" disambiguation ───────────────────────────────────────────────────
// Turkish "hesap" means both "account" and "calculation". Titles such as
// "KG Hesabı" are rendered "KG Account" by every generic engine. When the
// SOURCE is a calculation heading we rewrite the banking sense out of the
// translation.

// Bare "Account" is included because it heads calculation content throughout the
// corpus ("Hesap Formülü", "Hesap Adımları", "GM ve KG Hesap Örnekleri"); the
// account senses it also has are excluded by ACCOUNT_SOURCE_RE below.
const CALCULATION_SOURCE_RE =
  /hesab[ıi]|hesaplamas[ıi]|hesaplama|hesab[ıi]n[ıi]|hesaplar[ıi]|hesap\b/i;

// [wrong "account" word(s), correct "calculation" word] per language.
const ACCOUNT_TO_CALCULATION: Record<string, [RegExp, string]> = {
  // Case-insensitive where the noun is lower-case mid-string ("KG account").
  en: [/\bAccounts?\b/gi, 'Calculation'],
  de: [/\bKont(o|en)\b/g, 'Berechnung'],
  fr: [/\bComptes?\b/gi, 'Calcul'],
  es: [/\bCuentas?\b/gi, 'Cálculo'],
  it: [/\bCont(o|i)\b/gi, 'Calcolo'],
  pt: [/\bContas?\b/gi, 'Cálculo'],
  nl: [/\b(Rekening|Account)s?\b/gi, 'Berekening'],
  pl: [/\bKont(o|a)\b/gi, 'Obliczenie'],
  cs: [/\bÚč(et|ty)\b/gi, 'Výpočet'],
  sv: [/\bKont(o|on)\b/gi, 'Beräkning'],
  da: [/\bKont(o|i)\b/gi, 'Beregning'],
  no: [/\bKont(o|oer)\b/gi, 'Beregning'],
  fi: [/\bTil(i|it)\b/gi, 'Laskenta'],
  hu: [/\b(Fiók|Számla)\b/gi, 'Számítás'],
  ro: [/\bCont(uri)?\b/gi, 'Calcul'],
  ja: [/アカウント/g, '計算'],
  ko: [/계정/g, '계산'],
  'zh-CN': [/[帐账]户|账号/g, '计算'],
};

// Sources where "hesap" really is the user's account: the sign-in and
// account-deletion screens ("delete my account", "Hesap ve Veri Silme", "banka
// hesabı"). A bare UI label is reserved for Account; calculation content uses
// the unambiguous "Hesaplama" label. These keep the banking sense.
const ACCOUNT_SOURCE_RE = new RegExp(
  [
    String.raw`^\s*hesap\s*$`,
    // The account keyword leads: "banka hesabı", "kullanıcı hesabı".
    String.raw`\b(banka|kullanıcı|üye|oturum|e-posta|google|apple)\s+hesab`,
    // …or trails: "Bu hesabı Google ile oluşturduysanız".
    String.raw`hesab[^.!?]{0,40}\b(google|apple|e-?posta|şifre|parola|oturum)\b`,
    // Possessives and the deletion flow.
    String.raw`hesab[ıi]m`,
    String.raw`hesab[ıi]n[ıi]z`,
    String.raw`hesap\s+(ve\s+veri\s+)?silme`,
    String.raw`hesab[ıi]\s*(kalıcı olarak\s*)?sil`,
  ].join('|'),
  'i'
);

/**
 * Rewrites the banking sense of "hesap" when the Turkish source is clearly a
 * calculation heading. Never touches translations whose source did not use
 * "hesap" (so "banka hesabı"-style prose is unaffected — it does not match the
 * calculation heading test below).
 */
export const fixCalculationNoun = (
  source: string,
  translated: string,
  languageCode?: string
): string => {
  if (!languageCode) return translated;
  const rule = ACCOUNT_TO_CALCULATION[languageCode];
  if (!rule) return translated;
  if (!CALCULATION_SOURCE_RE.test(source)) return translated;
  if (ACCOUNT_SOURCE_RE.test(source)) return translated;
  const [pattern, replacement] = rule;
  pattern.lastIndex = 0;
  return translated.replace(pattern, (match) =>
    // Preserve lower-case usage inside a sentence.
    /^\p{Lu}/u.test(match) ? replacement : replacement.toLowerCase()
  );
};
