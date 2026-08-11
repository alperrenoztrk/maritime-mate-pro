import type { CSSProperties } from "react";

export type SemanticLibraryAccent =
  | "accent-ocean"
  | "accent-deep"
  | "accent-teal"
  | "accent-amber"
  | "accent-slate";

const SEMANTIC_ACCENT_STOPS: Readonly<Record<SemanticLibraryAccent, readonly [string, string]>> = {
  "accent-ocean": ["hsl(var(--primary))", "hsl(199 86% 43%)"],
  "accent-deep": ["hsl(var(--primary-dark))", "hsl(var(--secondary))"],
  "accent-teal": ["hsl(var(--accent))", "hsl(190 72% 31%)"],
  "accent-amber": ["hsl(39 86% 44%)", "hsl(25 78% 42%)"],
  "accent-slate": ["hsl(215 27% 36%)", "hsl(220 34% 20%)"],
};

const SEMANTIC_ACCENT_TONES: Readonly<Record<SemanticLibraryAccent, CSSProperties>> = {
  "accent-ocean": { color: "hsl(var(--primary))", backgroundColor: "hsl(var(--primary) / 0.12)" },
  "accent-deep": { color: "hsl(var(--primary-dark))", backgroundColor: "hsl(var(--primary-dark) / 0.12)" },
  "accent-teal": { color: "hsl(var(--accent))", backgroundColor: "hsl(var(--accent) / 0.14)" },
  "accent-amber": { color: "hsl(36 92% 42%)", backgroundColor: "hsl(36 92% 48% / 0.14)" },
  "accent-slate": { color: "hsl(215 27% 36%)", backgroundColor: "hsl(215 27% 42% / 0.14)" },
};

export const isSemanticLibraryAccent = (accent: string): accent is SemanticLibraryAccent =>
  accent in SEMANTIC_ACCENT_STOPS;

/**
 * `body.marine-global` (index.css) sayfa kabuğunun içindeki her
 * `[class*="bg-gradient-to"]` öğesini `background: transparent !important` ile
 * siliyor; bu yüzden Tailwind'in `bg-gradient-to-*` yardımcı sınıfı kitaplık
 * kartlarında renk üretmiyordu. Renk durakları (`from-/via-/to-`) sınıflardan
 * gelmeye devam ediyor, gradyanın kendisini burada satır içi kuruyoruz — böylece
 * seçici eşleşmiyor ve cilt renkleri korunuyor.
 */
export const accentGradient = (angle: string, accent?: string): CSSProperties => {
  if (accent && isSemanticLibraryAccent(accent)) {
    const [start, end] = SEMANTIC_ACCENT_STOPS[accent];
    return { backgroundImage: `linear-gradient(${angle}, ${start}, ${end})` };
  }
  return { backgroundImage: `linear-gradient(${angle}, var(--tw-gradient-stops))` };
};

/** Calm, single-color treatment for iOS inset-list symbols. Book covers keep
 * the richer gradient above; navigational rows use this quieter tonal pair. */
export const accentTone = (accent?: string): CSSProperties =>
  accent && isSemanticLibraryAccent(accent)
    ? SEMANTIC_ACCENT_TONES[accent]
    : { color: "hsl(var(--primary))", backgroundColor: "hsl(var(--primary) / 0.12)" };
