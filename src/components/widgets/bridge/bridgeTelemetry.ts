import { compassName, type MarineConditions } from "./marineConditions";
import { depthAt, type VoyageState } from "./voyage";
import type { ShipMotion } from "./waveField";

/**
 * Köprüüstündeki bütün cihazların okuduğu tek gerçeklik.
 *
 * ECDIS'in mevkisi, radarın rotası, iskandilin derinliği, conning'in rüzgârı
 * ve otopilotun dümen açısı aynı nesneden çıkıyor. Ayrı ayrı üretilselerdi
 * bir ekran 021° yazarken diğeri 034° yazardı — gerçek bir köprüüstünde
 * hepsi tek cayrodan, tek loglardan, tek GPS'ten beslenir; burada da öyle.
 *
 * Türetilmiş büyüklükler (bağıl rüzgâr, dümen açısı, şaft devri) burada
 * hesaplanıyor, ekranlarda değil: aynı sayıyı iki cihazın iki türlü
 * hesaplaması, iki türlü göstermesi demek olurdu.
 */

export interface Traffic {
  /** AIS adı ve MMSI — hedef listelerinde ve ARPA etiketinde. */
  name: string;
  mmsi: string;
  /** Gemiye göre bağıl kerteriz (°) ve mesafe (NM). */
  relBearingDeg: number;
  rangeNm: number;
  /** Hedefin kendi rotası ve süratı. */
  courseDeg: number;
  speedKt: number;
  /** En yakın yaklaşma mesafesi (NM) ve süresi (dk). */
  cpaNm: number;
  tcpaMin: number;
}

export interface BridgeTelemetry {
  voyage: VoyageState;
  marine: MarineConditions;
  /** Gerçek zaman (ms) — tarama, yanıp sönme gibi animasyonlar için. */
  nowMs: number;

  /** İskandil: anlık derinlik (m) ve son üç dakikanın izi (eskiden yeniye). */
  depthM: number;
  depthTrace: number[];

  /** Otopilot: emredilen rota (°), dümen açısı (° sancak artı), mod. */
  setCourseDeg: number;
  rudderDeg: number;
  autopilotMode: "TRACK" | "HDG" | "MANUAL";
  /** Dönme hızı (°/dk, sancak artı). */
  rotDegMin: number;

  /** Makine: emir, şaft devri ve yüzdesi. */
  telegraphOrder: string;
  shaftRpm: number;
  enginePct: number;

  /** Bağıl rüzgâr: geldiği bağıl kerteriz (°) ve hızı (kt). */
  apparentWindDeg: number;
  apparentWindKt: number;
  /** Gerçek rüzgârın bağıl kerterizi — conning ikisini birden yazıyor. */
  trueWindRelDeg: number;

  /** Denizin gemiye yaptırdığı hareket. */
  rollDeg: number;
  pitchDeg: number;
  encounterPeriodS: number;

  /** Çevredeki trafik — radar ve ECDIS aynı listeyi çiziyor. */
  traffic: Traffic[];
}

/** Servis hızındaki devir — 14 knotta 118 d/d'lik yavaş devirli ana makine. */
const RPM_AT_SERVICE = 118;
const SERVICE_KT = 14;

/**
 * Bağıl rüzgâr: gerçek rüzgâr ile geminin kendi hızının vektör farkı.
 *
 * Köprüüstünde okunmayan büyüklük gerçek rüzgâr değil, bağıl rüzgârdır —
 * anemometre onu ölçer. 14 knotla giden bir gemide pruvadan gelen 20
 * knotluk rüzgâr güvertede 34 knot eser; kıçtan gelende 6 knot kalır.
 */
function apparentWind(
  windKt: number,
  windFromDeg: number,
  headingDeg: number,
  speedKt: number,
): { relDeg: number; kt: number; trueRelDeg: number } {
  const trueRel = (((windFromDeg - headingDeg) % 360) + 360) % 360;
  const rad = (trueRel * Math.PI) / 180;
  // Rüzgârın GELDİĞİ yön vektörü (gemi çatısında, pruva −Z / +ileri).
  const ax = Math.sin(rad) * windKt;
  const ay = Math.cos(rad) * windKt + speedKt; // ilerleme rüzgârı hep pruvadan
  const kt = Math.hypot(ax, ay);
  const relDeg = (((Math.atan2(ax, ay) * 180) / Math.PI) + 360) % 360;
  return { relDeg, kt, trueRelDeg: trueRel };
}

/**
 * Çevredeki trafik.
 *
 * Sekiz hedef, rotanın kimliğinden tohumlanıyor: aynı seferde hep aynı
 * gemiler görünüyor, sefer değişince liman trafiği de değişiyor. Hedefler
 * gerçek zamanla hareket ediyor; CPA/TCPA bağıl hareket üçgeninden
 * hesaplanıyor — radardaki etiket uydurma değil.
 */
function buildTraffic(voyage: VoyageState, nowMs: number): Traffic[] {
  const names = [
    ["MAERSK KOTKA", "220518000"],
    ["CMA CGM LYRA", "228336700"],
    ["BOSPHORUS QUEEN", "271043512"],
    ["STENA IMPERIAL", "235098765"],
    ["ATLANTIC PIONEER", "636019284"],
    ["NORDIC BREEZE", "257846120"],
    ["ANADOLU STAR", "271000345"],
    ["GULF TRADER", "470112233"],
  ];

  const seed = voyage.route.id.length * 977 + Math.floor(voyage.passage.totalNm);
  const minutes = nowMs / 60000;

  return names.map(([name, mmsi], i) => {
    const r = (seed + i * 37) % 100;
    // Hedefin kendi seyri: rotamıza göre dağılmış kurslar, 8–17 knot.
    const courseDeg = (voyage.cogDeg + 40 + r * 3.1) % 360;
    const speedKt = 8 + (r % 10);

    // Bağıl mevki: yavaşça değişen kerteriz ve mesafe.
    const drift = minutes * (0.15 + (r % 7) * 0.04);
    const relBearingDeg = (r * 3.6 + drift * 9) % 360;
    const rangeNm = 0.8 + ((r * 0.11 + drift * 0.35) % 5.4);

    // CPA: hedefin bağıl hız vektörü ile bağıl mevki vektöründen.
    const b = (relBearingDeg * Math.PI) / 180;
    const px = Math.sin(b) * rangeNm;
    const py = Math.cos(b) * rangeNm;
    const c = ((courseDeg - voyage.cogDeg) * Math.PI) / 180;
    const vx = Math.sin(c) * speedKt;
    const vy = Math.cos(c) * speedKt - voyage.sogKt;
    const v2 = vx * vx + vy * vy;
    const tcpaH = v2 > 1e-6 ? -(px * vx + py * vy) / v2 : 0;
    const t = Math.max(0, tcpaH);
    const cpaNm = Math.hypot(px + vx * t, py + vy * t);

    return { name, mmsi, relBearingDeg, rangeNm, courseDeg, speedKt, cpaNm, tcpaMin: t * 60 };
  });
}

/** İskandil izi: derinlik sahnenin ömrü boyunca biriken bir tampon. */
const TRACE_LENGTH = 120;

export interface TelemetryScratch {
  depthTrace: number[];
  lastTraceMs: number;
}

export function createScratch(): TelemetryScratch {
  return { depthTrace: [], lastTraceMs: 0 };
}

/** İz saniyede bir örnekleniyor — 120 örnek = seyir saatinde iki saat. */
const TRACE_INTERVAL_MS = 1000;

export function buildTelemetry(
  voyage: VoyageState,
  marine: MarineConditions,
  motion: ShipMotion,
  scratch: TelemetryScratch,
  nowMs: number,
): BridgeTelemetry {
  const depthM = depthAt(voyage.passage, voyage);

  if (nowMs - scratch.lastTraceMs >= TRACE_INTERVAL_MS) {
    scratch.lastTraceMs = nowMs;
    scratch.depthTrace.push(depthM);
    if (scratch.depthTrace.length > TRACE_LENGTH) scratch.depthTrace.shift();
  }

  // Otopilot: rota hattına oturtan orantılı düzeltme. XTE sancağa kayınca
  // dümen iskeleye basar; kazanç 90°/NM, ±15° ile sınırlı.
  const rudderDeg = Math.max(-15, Math.min(15, -voyage.xteNm * 90));
  const setCourseDeg = voyage.cogDeg;
  // Dönme hızı dümenden çıkar: 15° dümenle 118 m'lik bir gemi ≈ 22°/dk döner.
  const rotDegMin = rudderDeg * 1.45;

  const wind = apparentWind(marine.windKt, marine.windFromDeg, voyage.cogDeg, voyage.sogKt);
  const enginePct = Math.min(100, (voyage.sogKt / SERVICE_KT) * 88);

  return {
    voyage,
    marine,
    nowMs,
    depthM,
    depthTrace: scratch.depthTrace.slice(),
    setCourseDeg,
    rudderDeg,
    autopilotMode: voyage.arrived ? "MANUAL" : "TRACK",
    rotDegMin,
    telegraphOrder: voyage.arrived ? "STOP" : "FULL AHEAD",
    shaftRpm: (voyage.sogKt / SERVICE_KT) * RPM_AT_SERVICE,
    enginePct,
    apparentWindDeg: wind.relDeg,
    apparentWindKt: wind.kt,
    trueWindRelDeg: wind.trueRelDeg,
    rollDeg: motion.rollAmplitudeDeg,
    pitchDeg: motion.pitchAmplitudeDeg,
    encounterPeriodS: motion.encounterPeriodS,
    traffic: buildTraffic(voyage, nowMs),
  };
}

/* ─── ekranların ortak biçimleyicileri ─── */

export const fmt = {
  /** 021.4° gibi üç haneli rota. */
  deg: (d: number, decimals = 0) => `${(((d % 360) + 360) % 360).toFixed(decimals).padStart(decimals ? 5 : 3, "0")}°`,
  /** Enlem/boylam, denizcilikte okunan biçim: 40° 58.4′ K */
  lat: (v: number) => dm(v, "K", "G"),
  lon: (v: number) => dm(v, "D", "B"),
  /** 12.4 kn */
  kt: (v: number, decimals = 1) => `${v.toFixed(decimals)} kn`,
  nm: (v: number, decimals = 1) => `${v.toFixed(decimals)} NM`,
  /** Saat: 14:07 */
  hhmm: (d: Date) =>
    `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`,
  /** Süre: 4s 12d */
  hours: (h: number) => {
    if (!Number.isFinite(h) || h < 0) return "—";
    const total = Math.round(h * 60);
    return `${Math.floor(total / 60)}s ${String(total % 60).padStart(2, "0")}d`;
  },
  compass: compassName,
};

function dm(value: number, pos: string, neg: string): string {
  const d = Math.floor(Math.abs(value));
  const m = (Math.abs(value) - d) * 60;
  return `${String(d).padStart(2, "0")}° ${m.toFixed(1).padStart(4, "0")}′ ${value >= 0 ? pos : neg}`;
}
