import type { MarineConditions } from "./marineConditions";

/**
 * Denizin matematiği: dalga treni, geminin ona verdiği tepki ve ikisinin
 * ortak zaman ekseni.
 *
 * Aynı sayılar iki yere gidiyor — GPU'ya (OceanSurface yüzeyi Gerstner
 * dalgalarıyla kabartıyor) ve CPU'ya (gemi bu dalgaların eğimine göre
 * yalpalıyor). Tek kaynaktan beslenmelerinin sebebi tek: gözle görülen dalga
 * ile geminin yaptığı hareket birbirini tutsun. Ayrı ayrı üretilseydi ufuk bir
 * yana, dalga tepesi bir yana giderdi ve sahne anında sahte görünürdü.
 *
 * EKSENLER (gemi çatısı): +X sancak, +Y yukarı, −Z pruva. Deniz verisindeki
 * bütün açılar gerçek kuzeye göre; buradaki her şey gemiye göre. Dönüşüm tek
 * yerde (bearingToShip) yapılıyor.
 */

const G = 9.81;

export interface WaveTrain {
  /** Yayılma yönü (birim), gemi çatısında. */
  dirX: number;
  dirZ: number;
  /** Genlik (m) — tepe ile ortalama su düzeyi arası. */
  amplitude: number;
  /** Dalga sayısı k = 2π/L ve açısal frekans ω = √(gk). */
  k: number;
  omega: number;
  /** Gerstner sivriliği (0 sinüs, 1 tepe kırılıyor). */
  steepness: number;
  phase: number;
  /** Dalga boyu (m) — tepki hesapları bunu kullanıyor. */
  wavelength: number;
}

/**
 * Pusula kerterizini (geldiği yön, gerçek) gemi çatısında YAYILMA yön
 * vektörüne çevirir.
 *
 * Denizcilikte rüzgâr da dalga da GELDİĞİ yönle anılır; dalga ise geldiği
 * yönün 180° tersine yürür. Gemi çatısında β kerterizindeki bir nokta
 * (sin β, −cos β) yönündedir (pruva −Z, sancak +X).
 */
function propagationVector(fromDeg: number, headingDeg: number): { x: number; z: number } {
  const rel = ((fromDeg - headingDeg + 180) * Math.PI) / 180; // 180° eklendi: geldiği değil, gittiği yön
  return { x: Math.sin(rel), z: -Math.cos(rel) };
}

/** Gerçek kerterizi geminin çatısındaki bağıl kerterize çevirir (0–360). */
export function bearingToShip(bearingDeg: number, headingDeg: number): number {
  return (((bearingDeg - headingDeg) % 360) + 360) % 360;
}

/**
 * Deniz durumundan dalga trenini kurar.
 *
 * Altı bileşen: ölü denizin ana yönü ve ±14°'lik iki kanadı (gerçek ölü deniz
 * tek bir çizgi değil, dar bir yayılım), rüzgâr dalgasının ana yönü, ±32°'lik
 * kanadı ve üstüne binen kısa çırpıntı. Kanatlar olmadan yüzey bir levha gibi
 * ileri geri gidip geliyor; asıl "deniz" görüntüsü, farklı yönlere giden
 * trenlerin birbirini kesmesinden çıkıyor.
 *
 * ÇIRPINTI NEDEN AYRI BİR BİLEŞEN: kuvvetli rüzgârda tam gelişmiş dalganın
 * periyodu uzundur (40 kt'ta Tp ≈ 13 s → 250 m dalga boyu) ve 250 m'lik bir
 * dalga köprüüstünden bakınca yumuşak bir kabarmadır. Fırtınalı denizi
 * fırtınalı gösteren şey o kabarmanın üstündeki kısa, dik çırpıntıdır; onsuz
 * 6 metrelik deniz bile ayna gibi görünüyor.
 *
 * Genlikler enerji korunacak şekilde bölünüyor: bir spektrumun toplam
 * belirgin yüksekliği Hs ise, bileşenlerin genlik kareleri toplamı
 * (Hs/2)² olmalı.
 */
export function buildWaveTrains(marine: MarineConditions, headingDeg: number): WaveTrain[] {
  const trains: WaveTrain[] = [];

  const add = (fromDeg: number, hs: number, periodS: number, spreadDeg: number, share: number, phase: number) => {
    if (hs < 0.02 || periodS < 1) return;
    const amplitude = (hs / 2) * Math.sqrt(share);
    const wavelength = Math.max(1.5, (G * periodS * periodS) / (2 * Math.PI));
    const k = (2 * Math.PI) / wavelength;
    const d = propagationVector(fromDeg + spreadDeg, headingDeg);
    // Sivrilik dikliğe bağlı: ka (=2πa/L) 0.10'un üstünde tepeler kırılır.
    const steepness = Math.min(0.9, k * amplitude * 6.5);
    trains.push({
      dirX: d.x,
      dirZ: d.z,
      amplitude,
      k,
      omega: Math.sqrt(G * k),
      steepness,
      phase,
      wavelength,
    });
  };

  add(marine.swellFromDeg, marine.swellHeightM, marine.swellPeriodS, 0, 0.62, 0.0);
  add(marine.swellFromDeg, marine.swellHeightM, marine.swellPeriodS * 0.94, -14, 0.19, 2.1);
  add(marine.swellFromDeg, marine.swellHeightM, marine.swellPeriodS * 1.06, 14, 0.19, 4.3);

  add(marine.windWaveFromDeg, marine.windWaveHeightM, marine.windWavePeriodS, 0, 0.5, 1.3);
  add(marine.windWaveFromDeg, marine.windWaveHeightM, marine.windWavePeriodS * 0.74, 32, 0.33, 5.0);
  add(marine.windWaveFromDeg, marine.windWaveHeightM, marine.windWavePeriodS * 0.44, -49, 0.17, 3.4);

  return trains;
}

/** GPU'ya ve gemi tepkisine giden bileşen sayısı — shader tam bu kadar okuyor. */
export const WAVE_COMPONENTS = 6;

/**
 * Yüzeyin kendi üstüne katlanma ölçüsünün üst sınırı.
 *
 * Beyaz köpüğün eşiği bundan türüyor: köpük rüzgârın estiği her yere değil,
 * KIRILMAYA yaklaşan tepelere biner. Eşik mutlak bir sayı olsaydı sakin
 * denizde hiç köpük çıkmaz, fırtınada ise yüzeyin tamamı beyaza boğulurdu —
 * ölçek denizin kendi dikliğinden okunmalı.
 */
export function foldingScale(trains: WaveTrain[]): number {
  let sum = 0;
  for (const w of trains) {
    const q = Math.min(1, Math.min(w.steepness, 0.92) / Math.max(1e-4, w.k * w.amplitude * WAVE_COMPONENTS));
    sum += q * w.k * w.amplitude;
  }
  return Math.max(1e-3, sum);
}

/**
 * Dalga alanının gemiye göre kayması.
 *
 * Gemi suyun içinde ilerliyor, su da akıntıyla sürükleniyor. İkisi de dalga
 * deseninin ÖRNEKLENDİĞİ noktayı kaydırır; kaydırınca karşılaşma frekansı
 * (Doppler) kendiliğinden doğar — ayrıca hesaplamaya gerek kalmaz.
 *
 * Gemi çatısında geminin ilerleme yönü (0,−1) olduğuna göre t saniyede
 * alınan yol (0, −V·t); akıntı ise suyu taşıdığı için ters işaretle girer.
 *
 * DİKKAT: burada gerçek zaman ve gerçek sürat kullanılır. Seyir planındaki
 * 30× sıkıştırma (bkz. voyage.ts) denize uygulanmaz — uygulansaydı gemi 400
 * knotla giden bir tekne gibi sallanırdı.
 */
export function fieldOffset(
  seconds: number,
  speedKt: number,
  currentKt: number,
  currentTowardDeg: number,
  headingDeg: number,
): { x: number; z: number } {
  const v = speedKt * 0.5144; // m/s
  const c = currentKt * 0.5144;
  const rel = ((currentTowardDeg - headingDeg) * Math.PI) / 180;
  const cx = Math.sin(rel) * c;
  const cz = -Math.cos(rel) * c;
  return { x: -cx * seconds, z: -v * seconds - cz * seconds };
}

export interface SurfaceSample {
  /** Su düzeyi (m, ortalama düzeye göre). */
  height: number;
  /** Yüzey eğimi: ∂y/∂x (sancak) ve ∂y/∂z (kıç). */
  slopeX: number;
  slopeZ: number;
}

/** Dalga treninin bir noktadaki toplam yüksekliği ve eğimi. */
export function sampleSurface(trains: WaveTrain[], x: number, z: number, t: number): SurfaceSample {
  let height = 0;
  let slopeX = 0;
  let slopeZ = 0;
  for (const w of trains) {
    const f = w.k * (w.dirX * x + w.dirZ * z) - w.omega * t + w.phase;
    height += w.amplitude * Math.sin(f);
    const c = w.amplitude * w.k * Math.cos(f);
    slopeX += c * w.dirX;
    slopeZ += c * w.dirZ;
  }
  return { height, slopeX, slopeZ };
}

export interface ShipParticulars {
  /** Tam boy (m) ve genişlik (m) — tepki fonksiyonlarının ölçeği. */
  loa: number;
  beam: number;
  /** Doğal yalpa periyodu (s). */
  rollPeriodS: number;
  /** Yalpa sönümü (bilge omurgalı kuru yük gemisi ≈ 0.10). */
  rollDamping: number;
}

export interface ShipMotion {
  /**
   * Geminin kendi eksenleri etrafındaki dönüşü (radyan, sağ el kuralı).
   * roll +Z ekseninde: artı değer sancağı YUKARI kaldırır.
   * pitch +X ekseninde: artı değer BAŞI yukarı kaldırır.
   */
  roll: number;
  pitch: number;
  /** Metre: yukarı artı. */
  heave: number;
  /** Radyan: sancağa savrulma artı. */
  yaw: number;
  /** Tek yönlü genlikler (derece) — conning ekranı bunları yazıyor. */
  rollAmplitudeDeg: number;
  pitchAmplitudeDeg: number;
  /** Baskın dalganın karşılaşma periyodu (s). */
  encounterPeriodS: number;
}

/**
 * Geminin dalgaya tepkisi — doğrusal bir denizcilik modeli.
 *
 * Gemi dalga yüzeyinin kopyası değildir: kendi boyundan kısa dalgaları
 * SÜZER (118 m'lik bir tekne 20 m'lik dalgayı hissetmez, üstünden geçer),
 * kendi boyuna yakın dalgalarda en çok vurur, yalpayı ise doğal periyoduna
 * yakın karşılaşma periyotlarında büyütür — rezonans. Her bileşen için üç
 * aktarım katsayısı hesaplanıp katkılar toplanıyor.
 *
 * Karşılaşma frekansı ωe = ω + k·V·dz: baştan gelen dalgada (dz>0) artar,
 * kıçtan gelende azalır. Rezonans büyütmesi klasik tek serbestlik dereceli
 * sönümlü salınım çarpanı, 4 kat ile sınırlı.
 */
export function shipMotion(
  trains: WaveTrain[],
  t: number,
  offset: { x: number; z: number },
  speedKt: number,
  ship: ShipParticulars,
): ShipMotion {
  const v = speedKt * 0.5144;
  const omegaRoll = (2 * Math.PI) / ship.rollPeriodS;

  let roll = 0;
  let pitch = 0;
  let heave = 0;
  let yaw = 0;
  // Genlikler kareler toplamıyla birikiyor: bağımsız bileşenlerin mutlak
  // değerleri toplanırsa hepsinin aynı anda tepe yaptığı, gerçekte görülmeyen
  // bir sayı çıkar. Belirgin genlik √(2·Σa²) — denizcilikte kullanılan ölçü.
  let rollAmp2 = 0;
  let pitchAmp2 = 0;
  let dominantEnergy = 0;
  let encounterPeriod = ship.rollPeriodS;

  for (const w of trains) {
    const f = w.k * (w.dirX * offset.x + w.dirZ * offset.z) - w.omega * t + w.phase;
    const sin = Math.sin(f);
    const cos = Math.cos(f);
    const slope = w.amplitude * w.k; // maksimum yüzey eğimi

    // Karşılaşma frekansı ve periyodu.
    const omegaE = w.omega + w.k * v * w.dirZ;
    const periodE = (2 * Math.PI) / Math.max(0.05, Math.abs(omegaE));

    // Dalgalanma (heave): kısa dalgada sıfır, uzun dalgada birebir.
    const lam = w.wavelength / ship.loa;
    const heaveRao = smoothstep(0.28, 1.15, lam);
    heave += w.amplitude * sin * heaveRao;

    // Baş-kıç vurma: dalga boyu gemi boyuna yaklaşırken tepe yapar.
    const pitchRao = smoothstep(0.25, 1.0, lam) * (1 + 0.45 * bump(lam, 1.0, 0.55));
    // Eksi: su kıça doğru yükseliyorsa (∂y/∂z > 0) baş çukurdadır, aşağı gider.
    pitch -= slope * cos * w.dirZ * pitchRao;

    // Yalpa: enine eğim uyarır, doğal periyot büyütür.
    const beamRao = smoothstep(0.6, 2.4, w.wavelength / (2 * ship.beam));
    const r = omegaRoll > 0 ? Math.abs(omegaE) / omegaRoll : 0;
    const magnification = 1 / Math.sqrt((1 - r * r) ** 2 + (2 * ship.rollDamping * r) ** 2);
    const rollRao = beamRao * Math.min(4, magnification);
    roll += slope * cos * w.dirX * rollRao;

    // Savrulma: kıç omuzluktan gelen dalga gemiyi yalatır — küçük ama var.
    yaw += slope * sin * w.dirX * w.dirZ * 0.12;

    rollAmp2 += (slope * w.dirX * rollRao) ** 2;
    pitchAmp2 += (slope * w.dirZ * pitchRao) ** 2;

    const energy = w.amplitude * w.amplitude;
    if (energy > dominantEnergy) {
      dominantEnergy = energy;
      encounterPeriod = periodE;
    }
  }

  return {
    roll,
    pitch,
    heave,
    yaw,
    rollAmplitudeDeg: (Math.sqrt(2 * rollAmp2) * 180) / Math.PI,
    pitchAmplitudeDeg: (Math.sqrt(2 * pitchAmp2) * 180) / Math.PI,
    encounterPeriodS: encounterPeriod,
  };
}

/** Bizim kosterimiz: 118 m × 17.4 m, GM ≈ 1.15 m → T ≈ 12.6 s. */
export const SHIP: ShipParticulars = {
  loa: 118,
  beam: 17.4,
  rollPeriodS: 12.6,
  rollDamping: 0.1,
};

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** x = center'da 1, width kadar uzakta 0 olan yumuşak tepe. */
function bump(x: number, center: number, width: number): number {
  const d = (x - center) / width;
  return Math.exp(-d * d);
}

/**
 * Rüzgârın beyaz köpük örtüsü.
 *
 * Beyaz köpük 4 Bofor'da (≈11 kt) tek tük başlar, 7 Bofor'da (≈33 kt) deniz
 * boydan boya köpüklüdür. Kırılma ayrıca dikliğe bağlı olduğu için asıl
 * seçimi shader yapıyor; bu yalnız üst sınır.
 */
export function whitecapCoverage(windKt: number): number {
  return smoothstep(9, 34, windKt) * 0.85;
}
