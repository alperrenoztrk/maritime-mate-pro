// SignalTonePlayer'ın ton üretimi ve kalıp yardımcıları.
//
// Bileşenden ayrı bir modülde duruyorlar: bir .tsx dosyası hem bileşen hem
// sabit/fonksiyon dışa aktarırsa React Fast Refresh o dosyada çalışmaz
// (react-refresh/only-export-components). Ayrım ayrıca bu saf fonksiyonların
// React'e hiç dokunmadan test edilebilmesini sağlar.

/** Bir işaretin tek bir öğesi: ses (`on`) ya da sessizlik (`off`). */
export interface ToneStep {
  /** Ses mi sessizlik mi. */
  on: boolean;
  /** Süre (saniye). */
  seconds: number;
}

export type TonePreset = "whistle" | "bell" | "gong" | "morse";

export interface PresetSpec {
  /** Taşıyıcı frekans (Hz). */
  frequency: number;
  type: OscillatorType;
  /** Gerçek gemi düdüğü tek frekans değildir; hafif bir alt harmonik eklenir. */
  subFrequency?: number;
  /** Çan/gong gibi vuruşlu kaynaklarda ton, süreden bağımsız olarak söner. */
  decay?: number;
  gain: number;
}

/**
 * SOLAS Bölüm V / COLREG Ek III, düdük temel frekansını gemi boyuna göre
 * 70–700 Hz aralığında tanımlar; burada orta-büyük gemi hissi veren bir değer
 * seçilmiştir. Amaç ölçüm değil, ritmin (kısa/uzun) işitilerek öğrenilmesidir.
 */
export const TONE_PRESETS: Record<TonePreset, PresetSpec> = {
  whistle: { frequency: 200, subFrequency: 100, type: "sawtooth", gain: 0.16 },
  bell: { frequency: 1180, type: "sine", decay: 0.45, gain: 0.2 },
  gong: { frequency: 320, type: "sine", decay: 1.1, gain: 0.22 },
  morse: { frequency: 600, type: "sine", gain: 0.18 },
};

type AudioContextCtor = typeof AudioContext;

const getAudioContextCtor = (): AudioContextCtor | undefined => {
  if (typeof window === "undefined") return undefined;
  return (
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext
  );
};

export const isAudioSupported = () => Boolean(getAudioContextCtor());

let sharedContext: AudioContext | null = null;

/**
 * Paylaşılan AudioContext'i döndürür; yoksa oluşturur.
 *
 * iOS/Safari yalnızca bir kullanıcı jesti içinde AudioContext açılmasına veya
 * resume edilmesine izin verir — bu yüzden modül yüklenirken DEĞİL, ilk "play"
 * tıklamasında çağrılmalıdır.
 */
export const acquireAudioContext = (): AudioContext | null => {
  const Ctor = getAudioContextCtor();
  if (!Ctor) return null;
  if (!sharedContext || sharedContext.state === "closed") {
    sharedContext = new Ctor();
  }
  if (sharedContext.state === "suspended") {
    void sharedContext.resume();
  }
  return sharedContext;
};

/** COLREG Kural 32: kısa düdük ≈ 1 sn, uzun düdük 4-6 sn (ortası alınır). */
export const SHORT_BLAST = 1;
export const LONG_BLAST = 5;
/** İşaret öğeleri arasındaki kısa boşluk. */
const BLAST_GAP = 0.6;

/**
 * "SSS", "L", "LSS" gibi bir kalıbı ToneStep dizisine çevirir.
 * S = kısa düdük, L = uzun düdük.
 */
export const blastPattern = (pattern: string): ToneStep[] => {
  const steps: ToneStep[] = [];
  const chars = pattern.trim().toUpperCase().split("");
  chars.forEach((char, index) => {
    if (char !== "S" && char !== "L") return;
    steps.push({ on: true, seconds: char === "S" ? SHORT_BLAST : LONG_BLAST });
    if (index < chars.length - 1) steps.push({ on: false, seconds: BLAST_GAP });
  });
  return steps;
};

/**
 * Mors kodunu (".-" biçiminde) ToneStep dizisine çevirir.
 * Zamanlama ITU-R M.1677: nokta = 1 birim, çizgi = 3 birim, öğe arası = 1 birim.
 * Koddaki boşluk harf ayracıdır (toplamda 3 birim olacak şekilde tamamlanır).
 */
export const morsePattern = (code: string, unitSeconds = 0.09): ToneStep[] => {
  const steps: ToneStep[] = [];
  const symbols = code.split("");
  symbols.forEach((symbol, index) => {
    if (symbol === ".") steps.push({ on: true, seconds: unitSeconds });
    else if (symbol === "-") steps.push({ on: true, seconds: unitSeconds * 3 });
    else if (symbol === " ") {
      steps.push({ on: false, seconds: unitSeconds * 2 });
      return;
    } else return;
    if (index < symbols.length - 1) steps.push({ on: false, seconds: unitSeconds });
  });
  return steps;
};
