/**
 * Ders seslendirme tercihleri (localStorage).
 *
 * `topicContentOverrides.ts` ile aynı desen: sabit anahtar + CustomEvent, böylece
 * Ayarlar sayfasındaki değişiklik açık olan oynatıcıya anında yansır.
 */

export interface NarrationPreferences {
  /** Seslendirme açık mı? */
  enabled: boolean;
  /** Slayt bitince otomatik olarak sonrakine geç. */
  autoplay: boolean;
  /** Konuşma hızı (0.7 – 1.5). */
  rate: number;
  /** Kullanıcının elle seçtiği ses (voiceURI). Boşsa otomatik erkek ses seçilir. */
  voiceURI: string | null;
}

export const NARRATION_PREFS_KEY = "marineExpert.narrationPreferences";
export const NARRATION_PREFS_EVENT = "marineExpert:narrationPreferencesUpdated";

export const DEFAULT_NARRATION_PREFERENCES: NarrationPreferences = {
  enabled: true,
  autoplay: true,
  rate: 1,
  voiceURI: null,
};

const clampRate = (value: unknown): number => {
  const rate = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(rate)) return DEFAULT_NARRATION_PREFERENCES.rate;
  return Math.min(1.5, Math.max(0.7, rate));
};

export const getNarrationPreferences = (): NarrationPreferences => {
  if (typeof localStorage === "undefined") return { ...DEFAULT_NARRATION_PREFERENCES };
  try {
    const raw = localStorage.getItem(NARRATION_PREFS_KEY);
    if (!raw) return { ...DEFAULT_NARRATION_PREFERENCES };
    const parsed = JSON.parse(raw) as Partial<NarrationPreferences>;
    return {
      enabled: typeof parsed.enabled === "boolean" ? parsed.enabled : DEFAULT_NARRATION_PREFERENCES.enabled,
      autoplay: typeof parsed.autoplay === "boolean" ? parsed.autoplay : DEFAULT_NARRATION_PREFERENCES.autoplay,
      rate: clampRate(parsed.rate),
      voiceURI: typeof parsed.voiceURI === "string" && parsed.voiceURI ? parsed.voiceURI : null,
    };
  } catch {
    return { ...DEFAULT_NARRATION_PREFERENCES };
  }
};

export const setNarrationPreferences = (patch: Partial<NarrationPreferences>): NarrationPreferences => {
  const next = { ...getNarrationPreferences(), ...patch };
  next.rate = clampRate(next.rate);
  try {
    localStorage.setItem(NARRATION_PREFS_KEY, JSON.stringify(next));
  } catch {
    // Kota dolu / private mode: tercih kaydedilemese de oturum içinde çalışmaya devam eder.
  }
  window.dispatchEvent(new CustomEvent(NARRATION_PREFS_EVENT, { detail: next }));
  return next;
};
