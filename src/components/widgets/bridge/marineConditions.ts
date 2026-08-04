/**
 * Geminin BULUNDUĞU YERDEKİ denizin hâli.
 *
 * Köprüüstünün dışındaki her şey — dalga yüksekliği ve yönü, ölü denizin
 * periyodu, akıntının seti ve rayı, rüzgârın şiddeti, göğün kapalılığı —
 * buradan geliyor. Kullanıcının telefonunun bulunduğu yer değil, GEMİNİN
 * mevkii sorgulanıyor: gemi Malta açıklarındaysa dalgayı da rüzgârı da orası
 * belirler.
 *
 * İki kaynak birleşiyor:
 *   • Open-Meteo Marine  → dalga / rüzgâr dalgası / ölü deniz / yüzey akıntısı
 *   • Open-Meteo Forecast → rüzgâr, bora, basınç, hava kodu, doğuş/batış
 *
 * Ağ yoksa (gemide olağan hâl) mevkiden türeyen bir MODEL devreye giriyor:
 * uydurma sabitler değil, rüzgârdan dalgaya geçen klasik bağıntılar
 * (Pierson–Moskowitz) ve mevkiye/güne bağlı pürüzsüz bir rüzgâr alanı.
 * Böylece çevrimdışı sözleşmesi bozulmuyor — sahne hep canlı, hep tutarlı.
 */

export type MarineSource = "live" | "model";

export interface MarineConditions {
  lat: number;
  lon: number;
  /** Rüzgâr: geldiği yön (°), hız ve bora (kt). */
  windFromDeg: number;
  windKt: number;
  gustKt: number;
  /** Toplam dalga: geldiği yön (°), belirgin yükseklik (m), periyot (s). */
  waveFromDeg: number;
  waveHeightM: number;
  wavePeriodS: number;
  /** Rüzgâr dalgası (deniz). */
  windWaveFromDeg: number;
  windWaveHeightM: number;
  windWavePeriodS: number;
  /** Ölü deniz. */
  swellFromDeg: number;
  swellHeightM: number;
  swellPeriodS: number;
  /** Yüzey akıntısı: AKTIĞI yön (°, oşinografik gelenek) ve hızı (kt). */
  currentTowardDeg: number;
  currentKt: number;
  airTempC: number;
  pressureHpa: number;
  /** WMO hava kodu — 45 ve üstü kapalı/yağışlı. */
  weatherCode: number;
  /** Gemi mevkiindeki gün ilerlemesi: 0 doğuş, 1 batış; dışı gece. */
  sunProgress: number | null;
  /** Bofor kuvveti (0–12) ve Douglas deniz durumu (0–9). */
  beaufort: number;
  douglas: number;
  source: MarineSource;
  updatedAt: number;
}

/* ─── ölçekler ─── */

const BEAUFORT_LIMITS_KT = [1, 3, 6, 10, 16, 21, 27, 33, 40, 47, 55, 63];

/** Rüzgâr hızından (kt) Bofor kuvveti. */
export function beaufortFor(kt: number): number {
  let f = 0;
  while (f < BEAUFORT_LIMITS_KT.length && kt > BEAUFORT_LIMITS_KT[f]) f++;
  return f;
}

const BEAUFORT_LABELS_TR = [
  "Sakin",
  "Esinti",
  "Hafif esinti",
  "Tatlı esinti",
  "Orta esinti",
  "Sert esinti",
  "Kuvvetli esinti",
  "Fırtınamsı rüzgâr",
  "Fırtına",
  "Kuvvetli fırtına",
  "Tam fırtına",
  "Çok şiddetli fırtına",
  "Kasırga",
];

export function beaufortLabel(force: number): string {
  return BEAUFORT_LABELS_TR[Math.min(12, Math.max(0, Math.round(force)))];
}

/** Belirgin dalga yüksekliğinden (m) Douglas deniz durumu. */
export function douglasFor(hs: number): number {
  const limits = [0, 0.1, 0.5, 1.25, 2.5, 4, 6, 9, 14];
  let s = 0;
  while (s < limits.length && hs > limits[s]) s++;
  return s;
}

const DOUGLAS_LABELS_TR = [
  "Ayna gibi",
  "Çırpıntılı",
  "Hafif dalgalı",
  "Dalgalı",
  "Orta dalgalı",
  "Kaba",
  "Çok kaba",
  "Yüksek",
  "Çok yüksek",
  "Olağanüstü",
];

export function douglasLabel(state: number): string {
  return DOUGLAS_LABELS_TR[Math.min(9, Math.max(0, Math.round(state)))];
}

/** 0–360°'yi 16 kerteli pusula adına çevirir. */
export function compassName(deg: number): string {
  const names = ["K", "KKD", "KD", "DKD", "D", "DGD", "GD", "GGD", "G", "GGB", "GB", "BGB", "B", "BKB", "KB", "KKB"];
  const wrapped = (((deg % 360) + 360) % 360) / 22.5;
  return names[Math.round(wrapped) % 16];
}

/* ─── mevkiden türeyen model (çevrimdışı ve yedek) ─── */

/** Tohumlu, [0,1) aralığında yumuşak bir alan — aynı mevkide hep aynı değer. */
function field(x: number, y: number, seed: number): number {
  const s = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

/** Üç ölçekli, mevkide sürekli değişen bir alan (−1..1). */
function smoothField(lat: number, lon: number, seed: number): number {
  return (
    Math.sin(lat * 0.11 + lon * 0.07 + seed) * 0.55 +
    Math.sin(lat * 0.031 - lon * 0.043 + seed * 1.7) * 0.31 +
    Math.sin(lat * 0.29 + lon * 0.23 + seed * 2.9) * 0.14
  );
}

/**
 * Ağ olmadığında denizin hâli.
 *
 * Rüzgâr mevkiden ve günden türeyen pürüzsüz bir alandan çıkıyor; dalga o
 * rüzgârdan Pierson–Moskowitz bağıntılarıyla üretiliyor (Hs = 0.21·U²/g,
 * Tp = 2πU/(0.877·g)) ve kapalı denizler için kabarma sınırı (fetch) 0.62
 * katsayısıyla uygulanıyor. Ölü deniz ayrı ve daha uzun periyotlu; akıntı
 * yavaşça dönen bağımsız bir alan.
 */
export function modelMarine(lat: number, lon: number, at: Date = new Date()): MarineConditions {
  const day = Math.floor(at.getTime() / 86400000);
  const phase = day * 0.37 + at.getHours() / 24;

  const gust = smoothField(lat, lon, phase);
  const windKt = Math.max(2, 13 + gust * 11 + field(lat, lon, day) * 4);
  const windFromDeg = (((smoothField(lat, lon, phase + 5.1) * 180 + lon * 1.7 + day * 11) % 360) + 360) % 360;

  const u = windKt * 0.5144; // m/s
  const fetchFactor = 0.62;
  const hsFull = (0.21 * u * u) / 9.81;
  const windWaveHeightM = Math.max(0.05, hsFull * fetchFactor);
  // Periyot da kabarma sınırından payını alır: tam gelişmiş PM periyodunun
  // ~%72'si, kapalı denizlerde ölçülen değerlere bu daha yakın.
  const windWavePeriodS = Math.max(2.2, ((2 * Math.PI * u) / (0.877 * 9.81)) * 0.72);

  const swellHeightM = Math.max(0.1, 0.5 + smoothField(lat, lon, phase + 12.3) * 0.75);
  const swellPeriodS = 8.5 + smoothField(lat, lon, phase + 3.3) * 3.2;
  const swellFromDeg = (((windFromDeg + 45 + smoothField(lat, lon, phase + 8.8) * 70) % 360) + 360) % 360;

  // Bileşik deniz: iki spektrumun enerjisi toplanır (Hs² toplamı).
  const waveHeightM = Math.hypot(windWaveHeightM, swellHeightM);
  const wavePeriodS = windWaveHeightM >= swellHeightM ? windWavePeriodS : swellPeriodS;
  const waveFromDeg = windWaveHeightM >= swellHeightM ? windFromDeg : swellFromDeg;

  const currentKt = Math.max(0.05, 0.55 + smoothField(lat, lon, phase + 21.7) * 0.5);
  const currentTowardDeg = (((smoothField(lat, lon, phase + 17.2) * 180 + lat * 3.1) % 360) + 360) % 360;

  const cloud = smoothField(lat, lon, phase + 30.4);
  const weatherCode = cloud > 0.45 ? 61 : cloud > 0.1 ? 45 : cloud > -0.25 ? 2 : 0;

  return {
    lat,
    lon,
    windFromDeg,
    windKt,
    gustKt: windKt * 1.35,
    waveFromDeg,
    waveHeightM,
    wavePeriodS,
    windWaveFromDeg: windFromDeg,
    windWaveHeightM,
    windWavePeriodS,
    swellFromDeg,
    swellHeightM,
    swellPeriodS,
    currentTowardDeg,
    currentKt,
    airTempC: 22 - Math.abs(lat) * 0.32 + smoothField(lat, lon, phase + 44.1) * 4,
    pressureHpa: 1013 + smoothField(lat, lon, phase + 55.5) * 12,
    weatherCode,
    sunProgress: solarProgress(lat, lon, at),
    beaufort: beaufortFor(windKt),
    douglas: douglasFor(waveHeightM),
    source: "model",
    updatedAt: at.getTime(),
  };
}

/**
 * Gemi mevkiindeki gün ilerlemesi (0 doğuş, 1 batış).
 *
 * Doğuş/batış saatleri servisten gelmediğinde gerekiyor: güneşin sapması ve
 * saat açısıyla klasik hesap. Kutup gece/gündüzünde (|cosH| > 1) gün boyu
 * karanlık/aydınlık olarak dönüyor.
 */
export function solarProgress(lat: number, lon: number, at: Date): number | null {
  const start = Date.UTC(at.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((at.getTime() - start) / 86400000);
  const decl = 23.44 * (Math.PI / 180) * Math.sin(((2 * Math.PI) / 365) * (dayOfYear - 81));
  const φ = (lat * Math.PI) / 180;
  const cosH = -Math.tan(φ) * Math.tan(decl);
  if (cosH > 1) return -0.5; // kutup gecesi
  if (cosH < -1) return 0.5; // kutup gündüzü
  const H = Math.acos(cosH) * (180 / Math.PI); // yarım gün uzunluğu, derece

  // Güneşin o andaki saat açısı: UTC saatinden ve boylamdan.
  const utcHours = at.getUTCHours() + at.getUTCMinutes() / 60 + at.getUTCSeconds() / 3600;
  const solarHours = utcHours + lon / 15;
  const hourAngle = (solarHours - 12) * 15; // öğlen 0
  // −H doğuş, +H batış → [0,1] aralığına taşı.
  return (hourAngle + H) / (2 * H);
}

/* ─── canlı veri ─── */

const MARINE_URL = "https://marine-api.open-meteo.com/v1/marine";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

interface MarineResponse {
  current?: Record<string, number | string | undefined>;
}

interface ForecastResponse {
  current?: Record<string, number | string | undefined>;
  daily?: { sunrise?: string[]; sunset?: string[] };
}

const num = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;

/**
 * Gemi mevkii için iki servisi paralel sorgular ve modelin üstüne yazar.
 *
 * Model taban olarak duruyor: servisin vermediği her alan (kapalı denizlerde
 * akıntı ızgarası çoğu zaman boş döner) modelin değeriyle dolu kalıyor,
 * ekranda boşluk görünmüyor. Tek bir istek bile düşse sahne canlı kalır.
 */
export async function fetchMarine(
  lat: number,
  lon: number,
  signal?: AbortSignal,
): Promise<MarineConditions> {
  const now = new Date();
  const base = modelMarine(lat, lon, now);

  const marineUrl = new URL(MARINE_URL);
  marineUrl.searchParams.set("latitude", lat.toFixed(3));
  marineUrl.searchParams.set("longitude", lon.toFixed(3));
  marineUrl.searchParams.set(
    "current",
    [
      "wave_height",
      "wave_direction",
      "wave_period",
      "wind_wave_height",
      "wind_wave_direction",
      "wind_wave_period",
      "swell_wave_height",
      "swell_wave_direction",
      "swell_wave_period",
      "ocean_current_velocity",
      "ocean_current_direction",
    ].join(","),
  );

  const airUrl = new URL(FORECAST_URL);
  airUrl.searchParams.set("latitude", lat.toFixed(3));
  airUrl.searchParams.set("longitude", lon.toFixed(3));
  airUrl.searchParams.set(
    "current",
    ["wind_speed_10m", "wind_direction_10m", "wind_gusts_10m", "temperature_2m", "pressure_msl", "weather_code"].join(","),
  );
  airUrl.searchParams.set("daily", "sunrise,sunset");
  airUrl.searchParams.set("forecast_days", "1");
  airUrl.searchParams.set("wind_speed_unit", "kn");
  airUrl.searchParams.set("timeformat", "unixtime");

  const [marineRes, airRes] = await Promise.allSettled([
    fetch(marineUrl.toString(), { signal }).then((r) => (r.ok ? (r.json() as Promise<MarineResponse>) : null)),
    fetch(airUrl.toString(), { signal }).then((r) => (r.ok ? (r.json() as Promise<ForecastResponse>) : null)),
  ]);

  const out: MarineConditions = { ...base, updatedAt: Date.now() };
  let live = false;

  if (marineRes.status === "fulfilled" && marineRes.value?.current) {
    const c = marineRes.value.current;
    const wh = num(c.wave_height);
    if (wh !== undefined) {
      live = true;
      out.waveHeightM = wh;
      out.waveFromDeg = num(c.wave_direction) ?? out.waveFromDeg;
      out.wavePeriodS = num(c.wave_period) ?? out.wavePeriodS;
      out.windWaveHeightM = num(c.wind_wave_height) ?? wh * 0.8;
      out.windWaveFromDeg = num(c.wind_wave_direction) ?? out.waveFromDeg;
      out.windWavePeriodS = num(c.wind_wave_period) ?? out.wavePeriodS * 0.8;
      out.swellHeightM = num(c.swell_wave_height) ?? wh * 0.5;
      out.swellFromDeg = num(c.swell_wave_direction) ?? out.waveFromDeg;
      out.swellPeriodS = num(c.swell_wave_period) ?? out.wavePeriodS * 1.4;
    }
    // Akıntı km/sa geliyor; köprüüstünde her şey knot.
    const cv = num(c.ocean_current_velocity);
    if (cv !== undefined) {
      out.currentKt = cv / 1.852;
      out.currentTowardDeg = num(c.ocean_current_direction) ?? out.currentTowardDeg;
    }
  }

  if (airRes.status === "fulfilled" && airRes.value?.current) {
    const c = airRes.value.current;
    const ws = num(c.wind_speed_10m);
    if (ws !== undefined) {
      live = true;
      out.windKt = ws;
      out.windFromDeg = num(c.wind_direction_10m) ?? out.windFromDeg;
      out.gustKt = num(c.wind_gusts_10m) ?? ws * 1.3;
      out.airTempC = num(c.temperature_2m) ?? out.airTempC;
      out.pressureHpa = num(c.pressure_msl) ?? out.pressureHpa;
      out.weatherCode = num(c.weather_code) ?? out.weatherCode;
    }
    const sunrise = airRes.value.daily?.sunrise?.[0];
    const sunset = airRes.value.daily?.sunset?.[0];
    if (typeof sunrise === "number" && typeof sunset === "number" && sunset > sunrise) {
      out.sunProgress = (Date.now() / 1000 - sunrise) / (sunset - sunrise);
    }
  }

  out.beaufort = beaufortFor(out.windKt);
  out.douglas = douglasFor(out.waveHeightM);
  out.source = live ? "live" : "model";
  return out;
}
