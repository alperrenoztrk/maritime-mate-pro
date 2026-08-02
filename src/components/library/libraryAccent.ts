import type { CSSProperties } from "react";

/**
 * `body.marine-global` (index.css) sayfa kabuğunun içindeki her
 * `[class*="bg-gradient-to"]` öğesini `background: transparent !important` ile
 * siliyor; bu yüzden Tailwind'in `bg-gradient-to-*` yardımcı sınıfı kitaplık
 * kartlarında renk üretmiyordu. Renk durakları (`from-/via-/to-`) sınıflardan
 * gelmeye devam ediyor, gradyanın kendisini burada satır içi kuruyoruz — böylece
 * seçici eşleşmiyor ve cilt renkleri korunuyor.
 */
export const accentGradient = (angle: string): CSSProperties => ({
  backgroundImage: `linear-gradient(${angle}, var(--tw-gradient-stops))`,
});
