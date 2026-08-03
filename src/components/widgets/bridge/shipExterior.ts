import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { HALF, deckHalfBeamAt, deckYAt, UNITS_PER_METER } from "@/components/stability/sim/hullGeometry";
import { EXTERIOR } from "./bridgeLayout";

/**
 * Köprüüstünden görünen geminin geometrisi.
 *
 * Burada yalnız sayılar ve BufferGeometry var; malzemeler ve sahne ağacı
 * ShipExterior.tsx'te. Bölünme gemi simülasyonundakiyle aynı (hullGeometry.ts
 * ↔ ShipModel3D.tsx): geometri saf ve önbelleklenebilir kalsın diye.
 *
 * Geminin PLAN BİÇİMİ uydurulmadı — güverte kenarının baş tarafa doğru
 * daralması ve sheer eğrisi simülasyonun lofted lines-plan gövdesinden
 * okunuyor (deckHalfBeamAt / deckYAt). Oradaki tekne 65 m; biçim oranlanarak
 * bizim 78 m'lik kosterimize uyarlanıyor. Elle çizilmiş bir baş taraf bu kadar
 * inandırıcı olmazdı: bodoslamanın önündeki daralma, omuzluğun dolgunluğu ve
 * sheer'in yükselişi gerçek bir endaze eğrisinden geliyor.
 *
 * Eksenler sahneyle aynı: +X sancak, +Y yukarı, +Z kıç. Baş −Z'de.
 *
 * Yalnız köprüüstünün İLERİSİ kuruluyor. Yan perdeler sağır olduğu için kıç
 * taraf hiçbir kamera açısında görünmüyor; onu da çizmek boşa üçgen olurdu.
 */

/** Simülasyonun gövde biçimini örneklediğimiz tip — kuru yük formu. */
const FORM = "bulk" as const;

/** Doku ölçeği: bir sac derzi aralığı. UV'ler metreden bu katsayıyla çıkar. */
export const PLATE_M = 3.2;

/** Güverte boyunca kaç istasyonda örnekleniyor — baş tarafın kavisi için yeter. */
const STATIONS = 56;

/**
 * Sahne z'sinden simülasyonun gövde-yerel x'ine.
 * u = 0 kıç aynalığı, u = 1 baş bodoslaması.
 */
function hullX(z: number): number {
  const u = (EXTERIOR.transomZ - z) / EXTERIOR.loa;
  return -HALF + THREE.MathUtils.clamp(u, 0, 1) * 2 * HALF;
}

/** Midship güverte yarı genişliği — biçimi kendi genişliğimize oranlamak için. */
const REF_HALF_BEAM = deckHalfBeamAt(FORM, 0);
/** Midship sheer yüksekliği — yükselme buna göre ölçülür. */
const REF_DECK_Y = deckYAt(FORM, 0);

/** Güverte kenarının z'deki yarı genişliği (m). */
export function halfBeamAt(z: number): number {
  return (deckHalfBeamAt(FORM, hullX(z)) / REF_HALF_BEAM) * (EXTERIOR.beam / 2);
}

/**
 * Güverte yüksekliği (m): ana güverte + sheer + baş kasara.
 *
 * Sheer, simülasyonun gövde birimlerinde okunup metreye çevriliyor
 * (UNITS_PER_METER). 65 m'lik tekneden 78 m'lik tekneye taşınırken eğrinin
 * kendisi korunuyor, yalnız boy ölçeği değişiyor.
 */
export function deckHeightAt(z: number): number {
  const sheer = (deckYAt(FORM, hullX(z)) - REF_DECK_Y) / UNITS_PER_METER;
  const forecastle = z <= EXTERIOR.forecastleBreakZ ? EXTERIOR.forecastleRise : 0;
  return EXTERIOR.mainDeckY + sheer + forecastle;
}

/** Güvertenin kurulduğu z aralığı — köprüüstü perdesinin biraz gerisinden başa. */
const DECK_Z0 = 1;
const DECK_Z1 = EXTERIOR.stemZ;

function stations(z0: number, z1: number, n: number): number[] {
  const out: number[] = [];
  for (let i = 0; i <= n; i++) out.push(z0 + ((z1 - z0) * i) / n);
  return out;
}

/**
 * Baş kasara kırılmasının iki yanına birer istasyon sıkıştırır.
 *
 * Kırılma dik bir basamak; örnekleme oraya denk gelmezse güverte kademe yerine
 * rampa gibi çıkar. İki istasyonu 1 cm arayla koyup basamağı keskin tutuyoruz.
 */
function deckStations(): number[] {
  const brk = EXTERIOR.forecastleBreakZ;
  const zs = stations(DECK_Z0, DECK_Z1, STATIONS).filter((z) => Math.abs(z - brk) > 0.4);
  zs.push(brk + 0.005, brk - 0.005);
  return zs.sort((a, b) => b - a); // kıçtan başa
}

/**
 * Güverte plakası: her istasyonda iskele/sancak kenarını birleştiren şerit.
 * UV doğrudan metreden çıkar, böylece sac derzleri her yerde aynı ölçekte.
 */
function buildDeck(): THREE.BufferGeometry {
  const zs = deckStations();
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];

  zs.forEach((z) => {
    const hb = halfBeamAt(z);
    const y = deckHeightAt(z);
    pos.push(-hb, y, z, hb, y, z);
    uv.push(-hb / PLATE_M, z / PLATE_M, hb / PLATE_M, z / PLATE_M);
  });

  // İstasyonlar kıçtan başa sıralı ve her istasyonda önce iskele sonra sancak
  // yazılıyor; normalin yukarı bakması için sarım bu yönde olmak zorunda.
  for (let i = 0; i < zs.length - 1; i++) {
    const a = i * 2;
    idx.push(a, a + 3, a + 2, a, a + 1, a + 3);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/**
 * Küpeşte: güverte kenarını izleyen dikey saç.
 *
 * Tek yüzlü şerit; sarım iç yüzü verecek şekilde kuruluyor çünkü köprüüstü
 * merkez hattında ve iki küpeştenin de yalnız iç yüzü görülüyor. Malzeme yine
 * de DoubleSide — gemi yalpalarken kenar bir kare için ters dönerse boşluk
 * görünmesin (bkz. ShipExterior).
 */
function buildBulwark(side: 1 | -1): THREE.BufferGeometry {
  const zs = deckStations();
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];

  zs.forEach((z) => {
    const hb = halfBeamAt(z) * side;
    const y0 = deckHeightAt(z);
    const y1 = y0 + EXTERIOR.bulwarkHeight;
    pos.push(hb, y0, z, hb, y1, z);
    uv.push(z / PLATE_M, 0, z / PLATE_M, EXTERIOR.bulwarkHeight / PLATE_M);
  });

  for (let i = 0; i < zs.length - 1; i++) {
    const a = i * 2;
    // Sancak ve iskele tarafında sarım yönü ters — yüzler hep içeri baksın.
    if (side > 0) idx.push(a, a + 1, a + 3, a, a + 3, a + 2);
    else idx.push(a, a + 3, a + 1, a, a + 2, a + 3);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Bordanın su üstü kuşağı: güverte kenarından su hattına inen saç. */
function buildTopside(side: 1 | -1): THREE.BufferGeometry {
  const zs = deckStations();
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];

  zs.forEach((z) => {
    const hb = halfBeamAt(z) * side;
    const yTop = deckHeightAt(z);
    // Su hattında gövde güverteden biraz dar: omuzluk yukarı doğru açılır.
    const hbWl = hb * 0.94;
    pos.push(hb, yTop, z, hbWl, EXTERIOR.waterlineY, z);
    uv.push(z / PLATE_M, 0, z / PLATE_M, (yTop - EXTERIOR.waterlineY) / PLATE_M);
  });

  for (let i = 0; i < zs.length - 1; i++) {
    const a = i * 2;
    if (side > 0) idx.push(a, a + 3, a + 1, a, a + 2, a + 3);
    else idx.push(a, a + 1, a + 3, a, a + 3, a + 2);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Kutu üretmenin kısayolu — UV'si metre ölçeğine getirilmiş. */
function box(
  w: number,
  h: number,
  d: number,
  x: number,
  y: number,
  z: number,
  uvScale = PLATE_M,
): THREE.BufferGeometry {
  const g = new THREE.BoxGeometry(w, h, d);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, (uv.getX(i) * Math.max(w, d)) / uvScale, (uv.getY(i) * h) / uvScale);
  }
  uv.needsUpdate = true;
  g.translate(x, y, z);
  return g;
}

function cyl(
  r: number,
  h: number,
  x: number,
  y: number,
  z: number,
  rot?: [number, number, number],
  segments = 12,
): THREE.BufferGeometry {
  const g = new THREE.CylinderGeometry(r, r, h, segments);
  if (rot) {
    g.rotateX(rot[0]);
    g.rotateY(rot[1]);
    g.rotateZ(rot[2]);
  }
  g.translate(x, y, z);
  return g;
}

/**
 * Ambar ağzı mezarnası: güverteden yükselen dört duvar.
 * Kapağın kendisi ayrı malzemede, ayrı geometride.
 */
function buildCoamings(): THREE.BufferGeometry[] {
  const parts: THREE.BufferGeometry[] = [];
  const hw = EXTERIOR.hatchHalfWidth;
  const t = 0.12;

  EXTERIOR.hatches.forEach(({ z0, z1 }) => {
    const zc = (z0 + z1) / 2;
    const len = Math.abs(z1 - z0);
    const y0 = deckHeightAt(zc);
    const yc = y0 + EXTERIOR.coamingHeight / 2;
    // Uzun kenarlar
    parts.push(box(t, EXTERIOR.coamingHeight, len, -hw, yc, zc));
    parts.push(box(t, EXTERIOR.coamingHeight, len, hw, yc, zc));
    // Baş ve kıç kenarları
    parts.push(box(hw * 2 + t, EXTERIOR.coamingHeight, t, 0, yc, z0));
    parts.push(box(hw * 2 + t, EXTERIOR.coamingHeight, t, 0, yc, z1));
    // Ambar ağzını kapatan sac: kapağın altında, mezarnanın içinde. Görevi
    // yalnız ambara bakışı kesmek — kapakla aynı hizaya konursa ikisi aynı
    // piksel için çekişir ve yüzey lekelenir.
    parts.push(box(hw * 2 - 0.1, 0.1, len - 0.1, 0, y0 + EXTERIOR.coamingHeight * 0.6, zc));
  });

  return parts;
}

/**
 * Ambar kapağı: mezarnanın üstünde hafif kamburlu panel yüzeyi.
 *
 * Kamburu (0.18 m) suyun akması için: gerçek kapaklar da ortadan kenara doğru
 * eğimlidir. UV, kapak enine katlandığı için z ekseninde derzleri verecek
 * şekilde kuruluyor.
 */
function buildHatchCovers(): THREE.BufferGeometry[] {
  const hw = EXTERIOR.hatchHalfWidth;
  const crown = 0.18;
  const nx = 8;

  return EXTERIOR.hatches.map(({ z0, z1 }) => {
    const zc = (z0 + z1) / 2;
    // Kapak mezarna ağzının üstüne oturur — 8 cm conta/oturma payı.
    const yBase = deckHeightAt(zc) + EXTERIOR.coamingHeight + 0.08;
    const pos: number[] = [];
    const uv: number[] = [];
    const idx: number[] = [];

    for (let j = 0; j <= 1; j++) {
      const z = j === 0 ? z0 : z1;
      for (let i = 0; i <= nx; i++) {
        const s = (i / nx) * 2 - 1;
        pos.push(s * hw, yBase + crown * (1 - s * s), z);
        // Dokuda dört derz var; 9.6 m'lik karo başına 2.4 m'de bir katlama
        // çizgisi düşüyor — gerçek katlanır kapak paneli bu genişlikte.
        uv.push((s * hw) / PLATE_M, z / 9.6);
      }
    }
    // Satırlar kıçtan başa, sütunlar iskeleden sancağa gidiyor; normalin
    // yukarı çıkması için sarım bu yönde olmak zorunda. Ters sarımda kapak
    // arka yüzüyle kalıp eleniyor ve altındaki kör kapak görünüyordu.
    for (let i = 0; i < nx; i++) {
      const a = i;
      const b = i + nx + 1;
      idx.push(a, b + 1, b, a, a + 1, b + 1);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  });
}

/**
 * Baş kasara kırılması: güvertenin yükseldiği yerdeki enine perde.
 *
 * Bu perde aynı zamanda dalgakıran işini görüyor — baştan binen suyu ambar
 * ağızlarından uzak tutan yüzey o. 78 m'lik bir kosterde ikinci ambarın kıç
 * ucuyla kırılma arası zaten 3 m; oraya ayrıca bir dalgakıran koymak gerçek
 * gemide de yapılmaz.
 */
function buildForecastleBreak(): THREE.BufferGeometry {
  const z = EXTERIOR.forecastleBreakZ;
  const hb = halfBeamAt(z);
  const yLow = deckHeightAt(z + 1);
  const yHigh = deckHeightAt(z - 1);
  return box(hb * 2, yHigh - yLow, 0.14, 0, (yLow + yHigh) / 2, z);
}

/** Irgat: gövde, iki zincir dişlisi ve yanlarındaki ustura kafaları. */
function buildWindlass(): THREE.BufferGeometry[] {
  const z = EXTERIOR.windlassZ;
  const y = deckHeightAt(z);
  const parts: THREE.BufferGeometry[] = [];
  parts.push(box(4.2, 1.05, 1.8, 0, y + 0.52, z));
  parts.push(box(1.3, 0.6, 1.2, 0, y + 1.35, z));
  for (const s of [-1, 1]) {
    // Zincir dişlisi — ekseni enine, yani X boyunca yatık silindir.
    parts.push(cyl(0.5, 0.5, s * 1.5, y + 0.72, z, [0, 0, Math.PI / 2], 14));
    // Ustura kafası
    parts.push(cyl(0.34, 0.58, s * 2.45, y + 0.81, z, undefined, 12));
  }
  return parts;
}

/**
 * Demir zinciri: ırgattan loçaya inen iki parça.
 * Baklaları tek tek çizmenin anlamı yok — bu mesafede (50 m) zincir birkaç
 * piksel; kalın bir çubuk aynı okumayı veriyor.
 */
function buildChains(): THREE.BufferGeometry[] {
  const zW = EXTERIOR.windlassZ;
  const zH = EXTERIOR.windlassZ - 4.2;
  const yW = deckHeightAt(zW) + 0.72;
  const yH = deckHeightAt(zH) + 0.06;
  const parts: THREE.BufferGeometry[] = [];
  for (const s of [-1, 1]) {
    const dz = zH - zW;
    const dy = yH - yW;
    const len = Math.hypot(dz, dy);
    const g = new THREE.CylinderGeometry(0.11, 0.11, len, 6);
    // Silindir +Y ekseninde doğar; X etrafında θ dönünce ekseni (0,cosθ,sinθ)
    // olur, yani istenen (0,dy,dz) yönü için θ = atan2(dz, dy).
    g.rotateX(Math.atan2(dz, dy));
    g.translate(s * 1.5, (yW + yH) / 2, (zW + zH) / 2);
    parts.push(g);
  }
  return parts;
}

/** Baş direği: gövde, seren ve silyon feneri kutusu. */
function buildMast(): THREE.BufferGeometry[] {
  const z = EXTERIOR.mastZ;
  const y = deckHeightAt(z);
  const h = EXTERIOR.mastHeight;
  return [
    cyl(0.19, h, 0, y + h / 2, z, undefined, 10),
    // Seren: direğin üst üçte birinde, enine.
    cyl(0.09, 4.0, 0, y + h * 0.72, z, [0, 0, Math.PI / 2], 8),
    box(0.42, 0.5, 0.42, 0, y + h + 0.24, z),
  ];
}

/**
 * Güverte vinci: kaide, döner kule ve bom.
 *
 * Bom istiflenmiş hâlde — limandaki değil, seyirdeki gemi. 48°'lik açı
 * mataforanın kendi mesnedine yaslandığı yer; daha dik istiflenseydi kadrajın
 * ortasına dikilirdi.
 */
function buildCranes(): THREE.BufferGeometry[] {
  const parts: THREE.BufferGeometry[] = [];
  EXTERIOR.cranes.forEach(({ z, x }) => {
    const y = deckHeightAt(z);
    parts.push(cyl(1.3, 2.6, x, y + 1.3, z, undefined, 16));
    parts.push(box(2.6, 2.9, 3.2, x, y + 4.15, z));
    // Bom: kaideden yukarı ve kıça doğru istiflenmiş.
    const boomLen = 13;
    const tilt = THREE.MathUtils.degToRad(48);
    const boom = new THREE.BoxGeometry(0.55, 0.55, boomLen);
    boom.rotateX(-tilt);
    boom.translate(x, y + 5.2 + (Math.sin(tilt) * boomLen) / 2, z + (Math.cos(tilt) * boomLen) / 2);
    parts.push(boom);
  });
  return parts;
}

/** Küpeşte üstü tutamak borusu ve baş kasara korkuluğu. */
function buildRails(): THREE.BufferGeometry[] {
  const zs = deckStations();
  const parts: THREE.BufferGeometry[] = [];
  for (const side of [-1, 1] as const) {
    const pts: THREE.Vector3[] = zs.map(
      (z) => new THREE.Vector3(halfBeamAt(z) * side, deckHeightAt(z) + EXTERIOR.bulwarkHeight, z),
    );
    const curve = new THREE.CatmullRomCurve3(pts);
    parts.push(new THREE.TubeGeometry(curve, zs.length, 0.055, 6, false));
  }
  return parts;
}

export interface ShipExteriorGeometry {
  deck: THREE.BufferGeometry;
  covers: THREE.BufferGeometry;
  /** Açık gri boyalı her şey: küpeşte, mezarna, kasara perdesi, borda, vinç. */
  painted: THREE.BufferGeometry;
  /** Koyu çelik: ırgat, zincir, direk, korkuluk, bom. */
  steel: THREE.BufferGeometry;
}

let cached: ShipExteriorGeometry | null = null;

/**
 * Bütün parçaları dört malzeme grubunda birleştirir.
 *
 * Birleştirmenin sebebi mobil: ayrı ayrı bırakılsa ~40 çizim çağrısı olurdu,
 * böyle dört tane. Sonuç modül düzeyinde önbelleklenir — sahne her açılışta
 * yeniden loft edilmez.
 */
export function getShipExteriorGeometry(): ShipExteriorGeometry {
  if (cached) return cached;

  const painted = mergeGeometries([
    buildBulwark(-1),
    buildBulwark(1),
    buildTopside(-1),
    buildTopside(1),
    buildForecastleBreak(),
    ...buildCranes(),
  ]) as THREE.BufferGeometry;

  const steel = mergeGeometries([
    ...buildWindlass(),
    ...buildChains(),
    ...buildMast(),
    ...buildRails(),
  ]) as THREE.BufferGeometry;

  cached = {
    // Mezarnalar güverte boyasını taşır, perde grisini değil: gemide de ambar
    // ağzı çevresi güverteyle aynı renge boyanır. Ayrıca kadrajda işe yarıyor
    // — açık gri kalınca köprüüstünün perdeleriyle aynı tona düşüp gemi tek
    // parça bir gri kütle gibi okunuyordu.
    deck: mergeGeometries([buildDeck(), ...buildCoamings()]) as THREE.BufferGeometry,
    covers: mergeGeometries(buildHatchCovers()) as THREE.BufferGeometry,
    painted,
    steel,
  };
  return cached;
}

export function disposeShipExteriorGeometry(): void {
  if (!cached) return;
  Object.values(cached).forEach((g) => g.dispose());
  cached = null;
}
