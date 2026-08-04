import * as THREE from "three";
import { hashSeed, mulberry32 } from "@/components/stability/sim/proceduralTextures";

/**
 * Köprüüstü sahnesinin bütün yüzeyleri — boya, güverte kaplaması, tavan
 * panelleri, konsol sacı, pencerelerden görünen panorama ve konsoldaki ölü
 * ekranlar — burada canvas üzerinde çizilir.
 *
 * Neden çalışma anında çizim: gemi simülasyonundaki kuralın aynısı geçerli
 * (bkz. stability/sim/proceduralTextures.ts). Paketlenmiş görsel yok, ağ
 * isteği yok; sahne Capacitor WebView'ında çevrimdışı da aynı görünür.
 * Üreteçler tohumlu PRNG ile deterministik, sonuçlar modül düzeyinde
 * önbelleğe alınır; sahne kapanırken disposeBridgeTextures() çağrılır.
 */

const cache = new Map<string, THREE.Texture[]>();

function remember<T extends THREE.Texture[]>(key: string, make: () => T): T {
  let t = cache.get(key) as T | undefined;
  if (!t) {
    t = make();
    cache.set(key, t);
  }
  return t;
}

export function disposeBridgeTextures(): void {
  cache.forEach((list) => list.forEach((t) => t.dispose()));
  cache.clear();
}

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d") as CanvasRenderingContext2D];
}

function toTexture(c: HTMLCanvasElement, srgb: boolean): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function tiled(t: THREE.CanvasTexture, repeatX: number, repeatY: number): THREE.CanvasTexture {
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatX, repeatY);
  return t;
}

/** Tohumlu, yumuşak lekeli gürültü — boyanın ve sacın "düz plastik" durmasını engeller. */
function speckle(
  g: CanvasRenderingContext2D,
  w: number,
  h: number,
  seed: number,
  count: number,
  radius: number,
  alpha: number,
  dark = "0,0,0",
  light = "255,255,255",
) {
  const rnd = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    const r = radius * (0.35 + rnd() * 1.3);
    const up = rnd() > 0.5;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(${up ? light : dark},${alpha})`);
    grad.addColorStop(1, `rgba(${up ? light : dark},0)`);
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
}

/* ─── perde/boya: köprüüstü bulkhead'i ─── */

export interface SurfaceSet {
  map: THREE.CanvasTexture;
  /** Yükseklik kanalı doğrudan bumpMap olarak kullanılır — normal map üretmek
   *  bu kadar düz yüzeyler için gereksiz maliyet. */
  bumpMap: THREE.CanvasTexture;
}

/** Açık gri fırça izli gemi boyası; yatay kaynak dikişleri belli belirsiz. */
export function getPaintTexture(): SurfaceSet {
  const [map, bump] = remember("paint", () => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#e8ebed";
    g.fillRect(0, 0, 512, 512);
    speckle(g, 512, 512, 0x9a11, 260, 26, 0.045);

    // Rulo izi: yaklaşık dikey, çok soluk.
    const rnd = mulberry32(0x51ab);
    g.lineWidth = 1;
    for (let i = 0; i < 90; i++) {
      const x = rnd() * 512;
      g.strokeStyle = `rgba(255,255,255,${0.05 + rnd() * 0.06})`;
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x + (rnd() - 0.5) * 8, 512);
      g.stroke();
    }

    const [hc, hg] = makeCanvas(256, 256);
    hg.fillStyle = "#808080";
    hg.fillRect(0, 0, 256, 256);
    speckle(hg, 256, 256, 0x1177, 160, 12, 0.35);
    // Sacın panel dikişi: her 128 px'te bir hafif çukur.
    hg.strokeStyle = "rgba(40,40,40,.7)";
    hg.lineWidth = 2;
    for (let y = 0; y <= 256; y += 128) {
      hg.beginPath();
      hg.moveTo(0, y);
      hg.lineTo(256, y);
      hg.stroke();
    }
    return [toTexture(c, true), toTexture(hc, false)];
  });
  return { map: tiled(map, 3, 2), bumpMap: tiled(bump, 3, 2) };
}

/** Kaymaz güverte kaplaması: koyu gri, ince kırmızımsı-mavi zerreli. */
export function getDeckTexture(): SurfaceSet {
  const [map, bump] = remember("deck", () => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#4a4f55";
    g.fillRect(0, 0, 512, 512);
    speckle(g, 512, 512, 0x2c41, 900, 5, 0.3, "24,26,30", "150,158,166");
    speckle(g, 512, 512, 0x77d3, 120, 3, 0.28, "80,60,55", "180,190,200");
    // Yürüme yolu boyunca hafif parlaklık farkı.
    const sheen = g.createLinearGradient(0, 0, 512, 512);
    sheen.addColorStop(0, "rgba(255,255,255,.05)");
    sheen.addColorStop(0.5, "rgba(255,255,255,0)");
    sheen.addColorStop(1, "rgba(0,0,0,.06)");
    g.fillStyle = sheen;
    g.fillRect(0, 0, 512, 512);

    const [hc, hg] = makeCanvas(256, 256);
    hg.fillStyle = "#787878";
    hg.fillRect(0, 0, 256, 256);
    speckle(hg, 256, 256, 0x3311, 700, 3, 0.5);
    return [toTexture(c, true), toTexture(hc, false)];
  });
  return { map: tiled(map, 5, 4), bumpMap: tiled(bump, 5, 4) };
}

/** Tavan: beyaz akustik panel ızgarası, alüminyum çıtalı. */
export function getDeckheadTexture(): SurfaceSet {
  const [map, bump] = remember("deckhead", () => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#f2f4f5";
    g.fillRect(0, 0, 512, 512);
    speckle(g, 512, 512, 0x6f22, 200, 18, 0.03);
    // Panel çıtaları — 256 px'lik kare panel ızgarası.
    g.strokeStyle = "rgba(150,158,166,.85)";
    g.lineWidth = 6;
    for (let p = 0; p <= 512; p += 256) {
      g.beginPath();
      g.moveTo(p, 0);
      g.lineTo(p, 512);
      g.moveTo(0, p);
      g.lineTo(512, p);
      g.stroke();
    }
    g.strokeStyle = "rgba(255,255,255,.9)";
    g.lineWidth = 2;
    for (let p = 0; p <= 512; p += 256) {
      g.beginPath();
      g.moveTo(p - 2, 0);
      g.lineTo(p - 2, 512);
      g.moveTo(0, p - 2);
      g.lineTo(512, p - 2);
      g.stroke();
    }

    const [hc, hg] = makeCanvas(256, 256);
    hg.fillStyle = "#909090";
    hg.fillRect(0, 0, 256, 256);
    hg.strokeStyle = "#303030";
    hg.lineWidth = 4;
    hg.strokeRect(0, 0, 256, 256);
    return [toTexture(c, true), toTexture(hc, false)];
  });
  return { map: tiled(map, 4, 3), bumpMap: tiled(bump, 4, 3) };
}

/** Konsol sacı: RAL 7035 açık gri, fırçalanmış, ince toz dokulu. */
export function getConsoleTexture(): SurfaceSet {
  const [map, bump] = remember("console", () => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#cfd3d6";
    g.fillRect(0, 0, 512, 512);
    speckle(g, 512, 512, 0x4d19, 400, 10, 0.05);
    const rnd = mulberry32(0x8ab2);
    for (let i = 0; i < 400; i++) {
      const y = rnd() * 512;
      g.strokeStyle = `rgba(255,255,255,${0.03 + rnd() * 0.05})`;
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(512, y + (rnd() - 0.5) * 3);
      g.stroke();
    }

    const [hc, hg] = makeCanvas(256, 256);
    hg.fillStyle = "#828282";
    hg.fillRect(0, 0, 256, 256);
    speckle(hg, 256, 256, 0x22aa, 260, 6, 0.25);
    return [toTexture(c, true), toTexture(hc, false)];
  });
  return { map: tiled(map, 2, 2), bumpMap: tiled(bump, 2, 2) };
}

/** Konsol ön yüzündeki künye plakası. */
export function getNameplateTexture(): THREE.CanvasTexture {
  return remember("nameplate", () => {
    const [c, g] = makeCanvas(512, 256);
    g.fillStyle = "#d7dbde";
    g.fillRect(0, 0, 512, 256);
    speckle(g, 512, 256, 0x1a2b, 120, 14, 0.05);
    g.fillStyle = "#123a63";
    g.font = "bold 62px Georgia, 'Times New Roman', serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("MARINER'S", 256, 98);
    g.fillText("BOOK", 256, 166);
    g.strokeStyle = "rgba(18,58,99,.5)";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(120, 200);
    g.lineTo(392, 200);
    g.stroke();
    return [toTexture(c, true)];
  })[0];
}

/* ─── pencere panoraması ─── */

/**
 * Panorama artık tam tur (360°): fon silindiri geminin rotasına göre
 * döndüğü için yayın kenarı kadraja girmemeli (bkz. HORIZON_SCENE).
 * 4096×320 oranı silindirin 12.6:1 oranına oturuyor.
 */
const PAN_W = 4096;
const PAN_H = 320;
/** Ufuk çizgisi — göz hizası pencere ortasının biraz üstünde. */
const PAN_HORIZON = 147;

/**
 * Uzaktaki kıyı: tepeler + şehir silueti, hava perspektifiyle soluk.
 *
 * İki ucunda da sıfıra iniyor (taper). Panorama tam tur olduğu için kıyının
 * bir yerde bıçakla kesilmiş gibi bitmesi kabul edilemez — hem gerçekçi değil
 * hem de dikişte iki farklı kıyı çizgisi karşılaşırdı.
 */
function paintCoast(g: CanvasRenderingContext2D, x0: number, x1: number, seed: number, height: number) {
  const rnd = mulberry32(seed);
  /** Uçlarda 0, ortada 1 — kıyı ufkun içinden çıkıp ufka geri giriyor. */
  const taper = (t: number) => Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, t))), 0.55);

  // Tepe sırtı
  g.beginPath();
  g.moveTo(x0, PAN_HORIZON);
  for (let x = x0; x <= x1; x += 20) {
    const t = (x - x0) / (x1 - x0);
    const ridge =
      Math.sin(t * 7.1 + seed) * 0.35 + Math.sin(t * 3.3 + seed * 0.7) * 0.45 + Math.sin(t * 13.7) * 0.2;
    g.lineTo(x, PAN_HORIZON - height * taper(t) * (0.55 + ridge * 0.35));
  }
  g.lineTo(x1, PAN_HORIZON);
  g.closePath();
  g.fillStyle = "rgba(122,146,166,.85)";
  g.fill();

  // Şehir: kıyı boyunca küçük bloklar, birkaçı yüksek.
  for (let x = x0; x < x1; x += 5 + rnd() * 9) {
    const t = (x - x0) / (x1 - x0);
    const tall = rnd() > 0.9;
    const h = (tall ? 16 + rnd() * 22 : 4 + rnd() * 10) * (height / 46) * taper(t);
    const w = 3 + rnd() * 7;
    if (h < 0.6) continue;
    g.fillStyle = `rgba(${205 + rnd() * 35},${208 + rnd() * 30},${210 + rnd() * 28},${0.5 + rnd() * 0.35})`;
    g.fillRect(x, PAN_HORIZON - h, w, h);
    if (rnd() > 0.7) {
      g.fillStyle = "rgba(255,236,190,.5)";
      g.fillRect(x + 1, PAN_HORIZON - h + 2, w - 2, 1.5);
    }
  }

  // Kıyı şeridi köpüğü — uçlarda kıyıyla birlikte sönüyor.
  const foam = g.createLinearGradient(x0, 0, x1, 0);
  foam.addColorStop(0, "rgba(236,244,248,0)");
  foam.addColorStop(0.18, "rgba(236,244,248,.5)");
  foam.addColorStop(0.82, "rgba(236,244,248,.5)");
  foam.addColorStop(1, "rgba(236,244,248,0)");
  g.fillStyle = foam;
  g.fillRect(x0, PAN_HORIZON - 1.5, x1 - x0, 2.5);
}

/**
 * Dikişte kesilmemesi gereken çizimler için: şekli x'te çizer, kenara
 * yakınsa bir de karşı kenarda tekrarlar. Tam turlu panoramada u=0 ile u=1
 * aynı pikseldir; bu olmadan bulutlar ve pırıltılar dikişte yarım kalırdı.
 */
function wrapped(x: number, margin: number, draw: (x: number) => void) {
  draw(x);
  if (x < margin) draw(x + PAN_W);
  else if (x > PAN_W - margin) draw(x - PAN_W);
}

/**
 * Ufuk dokusunun düşey ekseninde ufuk çizgisinin yeri (0 üst, 1 alt).
 * Fon silindirinin merkez yüksekliği buradan hesaplanır — bkz. SeaHorizon.
 */
export const PANORAMA_HORIZON_V = PAN_HORIZON / PAN_H;

/**
 * Uzak fon: gökyüzü, kıyı ve ufka kadar giden deniz.
 *
 * Eskiden camlara boyanıyordu — her pencere paneli tuvalin kendi u dilimini
 * gösteriyordu — ve kendi geminin baş tarafı da bu tuvale çiziliydi. Artık
 * gemi camın dışında gerçek geometri; bu tuval camdan değil, geminin
 * arkasındaki fon silindirinden görünüyor (bkz. SeaHorizon → HORIZON_SCENE).
 * Kompozisyon aynı kaldı — iki yanda boğaz kıyısı, ortada açık su — yalnız
 * boyalı baş taraf çıkarıldı.
 */
export function getSeaPanoramaTexture(): THREE.CanvasTexture {
  return remember("panorama", () => {
    const [c, g] = makeCanvas(PAN_W, PAN_H);

    // Gökyüzü
    const sky = g.createLinearGradient(0, 0, 0, PAN_HORIZON);
    sky.addColorStop(0, "#4d8ec4");
    sky.addColorStop(0.55, "#8fbcdc");
    sky.addColorStop(1, "#d8e8f1");
    g.fillStyle = sky;
    g.fillRect(0, 0, PAN_W, PAN_HORIZON);

    // Bulutlar
    const rnd = mulberry32(0x5eac);
    for (let i = 0; i < 44; i++) {
      const cx = rnd() * PAN_W;
      const y = 10 + rnd() * (PAN_HORIZON - 52);
      const rx = 60 + rnd() * 190;
      const ry = rx * (0.16 + rnd() * 0.16);
      const a = 0.22 + rnd() * 0.4;
      wrapped(cx, rx, (x) => {
        const grad = g.createRadialGradient(x, y, 0, x, y, rx);
        grad.addColorStop(0, `rgba(255,255,255,${a})`);
        grad.addColorStop(0.55, `rgba(255,255,255,${a * 0.45})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        g.save();
        g.translate(x, y);
        g.scale(1, ry / rx);
        g.translate(-x, -y);
        g.fillStyle = grad;
        g.fillRect(x - rx, y - rx, rx * 2, rx * 2);
        g.restore();
      });
    }

    // Güneş — sağ omuzda, camda parlama olarak da yankılanır.
    const sunX = PAN_W * 0.72;
    const sunY = PAN_HORIZON * 0.36;
    const halo = g.createRadialGradient(sunX, sunY, 0, sunX, sunY, 260);
    halo.addColorStop(0, "rgba(255,250,232,.95)");
    halo.addColorStop(0.12, "rgba(255,244,206,.6)");
    halo.addColorStop(1, "rgba(255,244,206,0)");
    g.fillStyle = halo;
    g.fillRect(sunX - 260, sunY - 260, 520, 520);

    // Deniz
    const sea = g.createLinearGradient(0, PAN_HORIZON, 0, PAN_H);
    sea.addColorStop(0, "#5b93b4");
    sea.addColorStop(0.18, "#3d7a9d");
    sea.addColorStop(0.55, "#215878");
    sea.addColorStop(1, "#123c58");
    g.fillStyle = sea;
    g.fillRect(0, PAN_HORIZON, PAN_W, PAN_H - PAN_HORIZON);

    // Kıyı bantları: üç ayrı kara parçası, aralarında açık su. Hiçbiri
    // dikişe (x=0 ≡ x=W) değmiyor — orası hep açık deniz.
    paintCoast(g, PAN_W * 0.06, PAN_W * 0.31, 3.1, 46);
    paintCoast(g, PAN_W * 0.40, PAN_W * 0.55, 5.7, 28);
    paintCoast(g, PAN_W * 0.66, PAN_W * 0.93, 8.4, 40);

    // Dalga çizgileri: ufka yaklaştıkça sıklaşır, aşağıda kalınlaşır.
    for (let i = 0; i < 1100; i++) {
      const t = Math.pow(rnd(), 1.9);
      const y = PAN_HORIZON + 2 + t * (PAN_H - PAN_HORIZON - 2);
      const cx = rnd() * PAN_W;
      const len = 6 + t * 90 * (0.4 + rnd());
      const thick = 0.7 + t * 2.6;
      const jitter = (rnd() - 0.5) * thick;
      g.strokeStyle = `rgba(255,255,255,${0.05 + rnd() * 0.16 * (0.35 + t)})`;
      g.lineWidth = thick;
      wrapped(cx, len + 4, (x) => {
        g.beginPath();
        g.moveTo(x, y);
        g.lineTo(x + len, y + jitter);
        g.stroke();
      });
    }

    // Güneş yolu — ufuktan aşağı doğru açılan pırıltı bandı.
    for (let i = 0; i < 420; i++) {
      const t = Math.pow(rnd(), 1.6);
      const y = PAN_HORIZON + 2 + t * (PAN_H - PAN_HORIZON);
      const spread = 40 + t * 420;
      const x = sunX + (rnd() - 0.5) * spread * 2;
      const len = 4 + t * 46;
      g.strokeStyle = `rgba(255,247,214,${(0.1 + rnd() * 0.4) * (1 - t * 0.55)})`;
      g.lineWidth = 0.8 + t * 2.4;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + len, y);
      g.stroke();
    }

    // Kendi geminin baş tarafı burada çizilmez: gemi artık camın dışında
    // gerçek geometri (bkz. ShipExterior). Bu tuval yalnız uzak fon — gökyüzü,
    // kıyı ve ufka kadar giden deniz.

    return [toTexture(c, true)];
  })[0];
}

/* ─── camın dışı: geminin yüzeyleri ─── */

/**
 * Dış mekân dokularının tekrarı dokunun kendisinde değil, geometrinin
 * UV'lerinde: shipExterior.ts koordinatları doğrudan metreden UV'ye çevirir
 * (bkz. PLATE_M). Böylece 80 m'lik güverte ile 2 m'lik bir küpeşte parçası
 * aynı sac ölçeğini gösterir; doku tarafında oran ayarlamak gerekmez.
 */

/**
 * Yük güvertesi: kiremit kırmızısı güverte boyası.
 *
 * Yürüme yolları ve ambar çevresi gemide en çok aşınan yerdir; boya oradan
 * kalkar, altındaki astar ve pas görünür. Tuvaldeki dört dikiş, UV ölçeğiyle
 * birlikte yaklaşık 0.8 m'de bir sac derzi verir.
 */
export function getWeatherDeckTexture(): SurfaceSet {
  const [map, bump] = remember("weatherDeck", () => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#96412c";
    g.fillRect(0, 0, 512, 512);
    // Boyanın kalktığı yerler: astar grisi ve pas.
    speckle(g, 512, 512, 0x51a3, 260, 16, 0.16, "70,52,44", "186,150,120");
    speckle(g, 512, 512, 0x9c17, 90, 26, 0.12, "58,44,38", "150,96,60");
    // Kaymaz yüzeyin ince taneleri.
    speckle(g, 512, 512, 0x2ef4, 1400, 2.4, 0.22, "48,26,18", "196,132,104");

    // Sac dikişleri — bir kenarında ışık, öbüründe gölge.
    g.lineWidth = 3;
    for (let p = 0; p <= 512; p += 128) {
      g.strokeStyle = "rgba(52,26,18,.35)";
      g.beginPath();
      g.moveTo(0, p);
      g.lineTo(512, p);
      g.stroke();
      g.strokeStyle = "rgba(226,168,140,.18)";
      g.beginPath();
      g.moveTo(0, p + 3);
      g.lineTo(512, p + 3);
      g.stroke();
    }

    const [hc, hg] = makeCanvas(256, 256);
    hg.fillStyle = "#8a8a8a";
    hg.fillRect(0, 0, 256, 256);
    speckle(hg, 256, 256, 0x2ef4, 900, 2, 0.55);
    hg.strokeStyle = "#3a3a3a";
    hg.lineWidth = 2;
    for (let p = 0; p <= 256; p += 64) {
      hg.beginPath();
      hg.moveTo(0, p);
      hg.lineTo(256, p);
      hg.stroke();
    }
    return [toTexture(c, true), toTexture(hc, false)];
  });
  return { map: tiled(map, 1, 1), bumpMap: tiled(bump, 1, 1) };
}

/**
 * Katlanır ambar kapağı: enine panellere bölünmüş, takviyeli çelik.
 *
 * Kapağın okunur tarafı panel derzleridir — kapak enine katlandığı için
 * derzler gemiyi enlemesine keser. Kapak geometrisi UV'yi bu yöne göre
 * kuruyor, derzler de gemiyi enine kesiyor.
 */
export function getHatchCoverTexture(): SurfaceSet {
  const [map, bump] = remember("hatchCover", () => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#63676a";
    g.fillRect(0, 0, 512, 512);
    speckle(g, 512, 512, 0x7a31, 320, 10, 0.16, "34,38,42", "148,154,158");
    // Pas lekeleri — kapak yıllarca açık havada durur. Az ve dağınık: sık
    // çizilirse boyuna şeritler oluşup çelik kapak ahşap güverteye benziyor.
    const rnd = mulberry32(0x4d21);
    for (let i = 0; i < 26; i++) {
      const x = rnd() * 512;
      const w = 3 + rnd() * 9;
      const h = 30 + rnd() * 90;
      const y = rnd() * (512 - h);
      const grad = g.createLinearGradient(0, y, 0, y + h);
      grad.addColorStop(0, "rgba(134,78,42,.3)");
      grad.addColorStop(1, "rgba(134,78,42,0)");
      g.fillStyle = grad;
      g.fillRect(x, y, w, h);
    }

    // Panel derzleri — kapağın okunur tarafı bunlar, bu yüzden baskın.
    // Aralarındaki ince çizgiler panel takviyeleri.
    g.fillStyle = "rgba(22,26,30,.3)";
    for (let p = 32; p < 512; p += 128) {
      for (let q = 0; q < 3; q++) g.fillRect(0, p + q * 32, 512, 2);
    }
    for (let p = 0; p <= 512; p += 128) {
      g.fillStyle = "rgba(18,22,26,.85)";
      g.fillRect(0, p - 4, 512, 8);
      g.fillStyle = "rgba(198,206,212,.35)";
      g.fillRect(0, p + 4, 512, 3);
    }

    const [hc, hg] = makeCanvas(256, 256);
    hg.fillStyle = "#9a9a9a";
    hg.fillRect(0, 0, 256, 256);
    hg.fillStyle = "#101010";
    for (let p = 0; p <= 256; p += 64) hg.fillRect(0, p - 3, 256, 6);
    speckle(hg, 256, 256, 0x7a31, 400, 3, 0.28);
    return [toTexture(c, true), toTexture(hc, false)];
  });
  return { map: tiled(map, 1, 1), bumpMap: tiled(bump, 1, 1) };
}

/**
 * Küpeşte, kasara perdesi ve bordanın su üstü kuşağı: açık gri gemi boyası.
 *
 * Odanın perdeleriyle (getPaintTexture) aynı boya değil — dışarısı hava ve
 * tuzla yıkanır, dikişler daha belirgin, güverteye yakın yerde pas akar.
 */
export function getTopsideTexture(): SurfaceSet {
  const [map, bump] = remember("topside", () => {
    const [c, g] = makeCanvas(512, 512);
    g.fillStyle = "#dfe3e5";
    g.fillRect(0, 0, 512, 512);
    speckle(g, 512, 512, 0x1b8c, 240, 14, 0.09, "80,88,96", "255,255,255");

    // Yatay sac dikişleri.
    g.lineWidth = 2;
    for (let p = 0; p <= 512; p += 170) {
      g.strokeStyle = "rgba(120,132,142,.4)";
      g.beginPath();
      g.moveTo(0, p);
      g.lineTo(512, p);
      g.stroke();
    }
    // Perçin/kaynak izleri ve pas akıntıları.
    const rnd = mulberry32(0x3f9a);
    for (let i = 0; i < 48; i++) {
      const x = rnd() * 512;
      const y = rnd() * 400;
      const w = 1.5 + rnd() * 4;
      const h = 24 + rnd() * 110;
      const grad = g.createLinearGradient(0, y, 0, y + h);
      grad.addColorStop(0, "rgba(150,92,48,.3)");
      grad.addColorStop(1, "rgba(150,92,48,0)");
      g.fillStyle = grad;
      g.fillRect(x, y, w, h);
    }

    const [hc, hg] = makeCanvas(256, 256);
    hg.fillStyle = "#828282";
    hg.fillRect(0, 0, 256, 256);
    speckle(hg, 256, 256, 0x1b8c, 400, 4, 0.3);
    hg.strokeStyle = "#2e2e2e";
    hg.lineWidth = 2;
    for (let p = 0; p <= 256; p += 85) {
      hg.beginPath();
      hg.moveTo(0, p);
      hg.lineTo(256, p);
      hg.stroke();
    }
    return [toTexture(c, true), toTexture(hc, false)];
  });
  return { map: tiled(map, 1, 1), bumpMap: tiled(bump, 1, 1) };
}

/* ─── konsoldaki cihaz ekranları ─── */

/*
 * ECDIS, radar ve yuvarlak göstergelerin ölü (sabit) tuvalleri buradan
 * kaldırıldı. Köprüüstündeki her ekran artık CANLI: içeriğini seferin ve
 * denizin o andaki hâlinden çiziyor, tazeleme sıklığını cihaz belirliyor
 * (bkz. bridgeScreens.ts + LiveScreen.tsx). Sabit bir radar resmi, dönen
 * taramanın ve gerçek CPA/TCPA okumalarının yanında duramazdı.
 */

/** Cam/ekran üstündeki köşegen parlama — pencerelerin cam olduğunu belli eder. */
export function getGlassGlareTexture(): THREE.CanvasTexture {
  return remember("glare", () => {
    const [c, g] = makeCanvas(512, 256);
    g.fillStyle = "#000000";
    g.fillRect(0, 0, 512, 256);
    g.save();
    g.translate(256, 128);
    g.rotate(-0.42);
    const streak = g.createLinearGradient(-260, 0, 260, 0);
    streak.addColorStop(0, "rgba(255,255,255,0)");
    streak.addColorStop(0.34, "rgba(255,255,255,.45)");
    streak.addColorStop(0.42, "rgba(255,255,255,.16)");
    streak.addColorStop(0.55, "rgba(255,255,255,.5)");
    streak.addColorStop(0.62, "rgba(255,255,255,.1)");
    streak.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = streak;
    g.fillRect(-300, -46, 600, 92);
    g.restore();
    // Kenarlara doğru sönümle: parlama panelin ortasında kalsın.
    const vig = g.createRadialGradient(256, 128, 40, 256, 128, 300);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,1)");
    g.globalCompositeOperation = "multiply";
    g.fillStyle = vig;
    g.fillRect(0, 0, 512, 256);
    return [toTexture(c, true)];
  })[0];
}

/**
 * Kapalı bir widget'ın boş yuvası: sönük ekran ve üstünde cihazın künyesi.
 * Ayarlardan kapatılan widget köprüüstünden silinmez — yeri, sökülmüş bir
 * cihazın kör kapağı gibi durur.
 */
export function getFixtureLabelTexture(name: string): THREE.CanvasTexture {
  return remember(`fixture-${name}`, () => {
    const [c, g] = makeCanvas(512, 288);
    g.fillStyle = "#1b1f22";
    g.fillRect(0, 0, 512, 288);
    speckle(g, 512, 288, hashSeed(name), 140, 22, 0.05);
    // Kör kapağın kenar pahı
    g.strokeStyle = "rgba(255,255,255,.08)";
    g.lineWidth = 3;
    g.strokeRect(10, 10, 492, 268);
    g.fillStyle = "rgba(214,226,236,.42)";
    g.font = "bold 30px Helvetica, Arial, sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(name, 256, 138);
    g.font = "20px Helvetica, Arial, sans-serif";
    g.fillStyle = "rgba(214,226,236,.24)";
    g.fillText("KAPALI", 256, 178);
    return [toTexture(c, true)];
  })[0];
}
