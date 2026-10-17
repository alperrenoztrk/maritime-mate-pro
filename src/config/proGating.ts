/**
 * Pro content locks (build-time switch).
 *
 * Off by default. While the app is in closed testing every tester sees all
 * content; the production build is made with the repository variable
 * `PRO_GATING_ENABLED=true` (passed to Vite as `VITE_PRO_GATING_ENABLED`, see
 * .github/workflows/android-release.yml) and only then do the locks below
 * take effect. Any other value, or no value, leaves everything open.
 *
 * What Pro covers (decided Oct 2026, mirrors the /pro page):
 *  - Library books, except the free books listed in FREE_LIBRARY_KEYS
 *  - Quizzes and the exam-preparation centre (exercises stay free)
 *  - Advanced calculations: advanced stability analyses and the draft survey suite
 *  - 3D models and the ship simulator
 * Always free: glossary, news, weather, basic calculators, formulas, crew,
 * bridge, ship tasks/operations, notes, and a limited monthly AI quota
 * (the AI quota itself is enforced by the server, not here).
 */
export const PRO_GATING_ENABLED: boolean =
  String(import.meta.env.VITE_PRO_GATING_ENABLED ?? "").trim().toLowerCase() === "true";

/**
 * Library books that stay free when the locks are on. Keys are the library
 * category keys (`/lessons/:key/topics`; engine books use the `machine-`
 * prefix, e.g. `/machine/engine-room-safety/topics` → `machine-engine-room-safety`).
 */
export const FREE_LIBRARY_KEYS: ReadonlySet<string> = new Set([
  "navigation",
  "safety",
  "machine-engine-room-safety",
]);

export const isFreeLibraryKey = (key: string | undefined | null): boolean =>
  !!key && FREE_LIBRARY_KEYS.has(key);
