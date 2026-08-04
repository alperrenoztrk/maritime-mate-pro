import type { HomeWidgetId } from "@/hooks/useHomeWidgets";

/**
 * Köprüüstünün ölçüleri ve widget'ların gerçek montaj yerleri.
 *
 * Eksenler: +X sancak, +Y yukarı, +Z kıç (kameraya doğru). Bütün ölçüler
 * metredir; oda gerçek bir köprüüstü kadar geniş tutuldu ki konsol yüksekliği
 * (0.92 m), pencere denizlik hizası (0.95 m) ve göz hizası (1.6 m)
 * birbiriyle tutarlı olsun.
 *
 * Widget'ların yerleri uydurma değil, gemideki asıl yerleri:
 *   • kronometreler + rüzgâr göstergesi → ön perdedeki enstrüman panosu, orta
 *     pencerenin üstünde (fotoğraftaki çerçeveli panonun aynısı)
 *   • GPS alıcısı    → iskele konsolu, ECDIS'in yanındaki mevki tekrarlayıcısı
 *   • güneş/ufuk     → sancak konsolu, seyir bilgi ekranı
 *   • termometre     → iskele tarafındaki ön perde, camın üstü
 *
 * Oda gerçeğinden bir tık dar tutuldu: telefon ekranı dikey olduğu için
 * köprüüstünün tamamı ancak bu genişlikte tek karede görülüyor.
 */

/**
 * Sahne santimetre biriminde çizilir (1 birim = 1 cm), ölçüler ise metre
 * cinsinden yazılır — sahne kökündeki grup bu katsayıyla ölçekler.
 *
 * Sebebi drei'nin `<Html transform>` matematiği: DOM'u yerleştirirken dünya
 * birimini doğrudan CSS pikseli sayar ve perspektifi `perspective` özelliğiyle
 * uygular. Sahne birkaç birim genişliğinde olduğunda büyütme oranı ~140× olur,
 * kapsayıcı kutunun yarım piksellik yuvarlanması bile widget'ı onlarca piksel
 * kaydırır. Yüz kat büyük bir dünyada aynı görüntü ~1.4× büyütmeyle çizilir ve
 * DOM, 3B çerçevesinin tam üstüne oturur.
 */
export const SCENE_SCALE = 100;

/**
 * Dümencinin göz hizası — kameranın yüksekliği ve ufkun dünyadaki yeri.
 * Sahne birimine çevrilmesi gereken her yerde SCENE_SCALE ile çarpılır.
 */
export const EYE_Y = 1.6;

/**
 * Kameranın yuvası ve yakınlaşma sınırları (metre).
 *
 * Hem OrbitControls hem de BridgeZoom'un odak matematiği buradan okur —
 * ikisinin ayrı sayılar tutması, yakınlaşmanın denetimin sınırına takılıp
 * hedefi yanlış yerde bırakması demek olurdu.
 *
 * En yakın mesafe 0.85 m: 0.58 m genişliğindeki bir cihaz kadrajın yarısını
 * kaplasın diye. Yakın düzlem 8 cm olduğu için kırpılma riski yok.
 */
export const BRIDGE_VIEW = {
  home: [0, 1.33, -1.9] as [number, number, number],
  minDistance: 0.85,
  maxDistance: 4.2,
} as const;

export const ROOM = {
  deckY: 0,
  deckheadY: 2.62,
  /** Yan perdelerin bordadan uzaklığı — pencere kavisinin bittiği yer. */
  halfWidth: 2.78,
  aftZ: 2.6,
  /**
   * Pencere denizliği ve üst kirişi.
   *
   * Denizlik konsol tezgâhıyla (0.92) neredeyse aynı hizada, kasten: köprüüstü
   * camları güverteyi ve gemiye yakın deniz yüzeyini görebilmek için alçak
   * kesilir. Denizlik ne kadar yüksekse kör sektör o kadar uzar — SOLAS V/22
   * bunu iki gemi boyuyla sınırlıyor.
   */
  sillY: 0.95,
  headY: 2.06,
  /** Direklerin/çerçevenin kalınlığı. */
  mullion: 0.08,
} as const;

/**
 * Camın dışı: geminin kendisi, deniz ve ufuk.
 *
 * Dikey datum odanın güvertesi (y=0). Göz hizası 1.6 m; ana güverte 2.7 m
 * altta — köprüüstü tek katlı bir güverte evinin üstünde. Su hattı ana
 * güverteden 5.0 m aşağıda (fribord), göz su üstünde 9.3 m kalıyor.
 *
 * BOY NEDEN 118 m: manzaranın geometrisi belirledi, oda değil.
 *
 * Camdan aşağı bakılabilen açı sınırlı. Denizlik 7.5°'de kesiyor, ama asıl
 * engel konsolun yükseltilmiş gösterge kutusu: göz (y=1.6, z=1.95) ile kutunun
 * üstü (y≈1.15, z=-1.84) yatayın 6.8° altında bir hat çiziyor. Bundan daha
 * yatay bakılamıyor.
 *
 * Bir ışın θ açısıyla inerken güverteyi (gözün 4.3 m altında) 4.3/tanθ
 * mesafesinde keser. Bu mesafe geminin başından uzaksa ışın başın üstünden
 * geçip denize düşer. Yani güverte ancak
 *
 *     θ ≥ atan(4.3 / başa_olan_mesafe)
 *
 * açılarında görünür. Kısa gemide bu eşik büyür ve güverte incecik bir şeride
 * iner: ilk denemede gemi 78 m'ydi, baş 60 m'deydi, eşik 4.1° çıkıyordu ve
 * kullanılabilir 6.8°'nin yalnız 2.7°'si gemiye kalıyordu — pencerenin çoğu
 * denizdi. 118 m'de baş ~100 m'ye gidiyor, eşik 2.5°'ye düşüyor ve gemi
 * 4.3°'yi alıyor. Sezgiye ters ama doğru: köprüüstünden gemiyi büyüten şey
 * yakın güverte değil, UZAK güvertedir.
 *
 * Boy odanın genişliğinden çıkarılmadı, çünkü oda zaten gerçeğinden dar
 * (telefon ekranı için — bkz. dosya başı). Kullanıcı köprüüstünün genişliğiyle
 * geminin genişliğini aynı karede karşılaştıramıyor.
 *
 * Buradan çıkan katmanlar:
 *   • kör sektör  9.3 / 0.119 = 78 m ≈ 0.66 gemi boyu — SOLAS V/22 iki gemi
 *     boyuna izin veriyor, gerçek bir köprüüstünün içindeyiz
 *   • güverte plakası 36 m'den başa kadar
 *   • ambar mezarnalarının üstü (y=-1.2) 24 m'den itibaren
 *   • baş kasara güvertesi (y=-0.5) 18 m'den itibaren
 */
export const EXTERIOR = {
  /** Ana güverte — odanın güvertesinden 2.7 m, yani bir güverte aşağıda. */
  mainDeckY: -2.7,
  /** Su hattı — ana güverteden 5.0 m aşağıda (fribord). */
  waterlineY: -7.7,
  /** Tam boy ve genişlik: çok maksatlı kuru yük gemisi. */
  loa: 118,
  beam: 17.4,
  /** Baş bodoslama ve kıç aynalık (z ekseninde; baş −Z yönünde). */
  stemZ: -98,
  transomZ: 20,
  /** Ambar ağzı mezarnası: güverteden yüksekliği ve ağzın yarı genişliği. */
  coamingHeight: 1.5,
  hatchHalfWidth: 6.2,
  /** Üç ambar ağzı — köprüüstü perdesi z=-3'te bitiyor. */
  hatches: [
    { z0: -10, z1: -34 },
    { z0: -38, z1: -62 },
    { z0: -66, z1: -84 },
  ] as Array<{ z0: number; z1: number }>,
  /** Küpeşte yüksekliği — güverte kenarında. */
  bulwarkHeight: 1.1,
  /** Baş kasara: kırılma yeri ve ana güverteden yüksekliği. */
  forecastleBreakZ: -88,
  forecastleRise: 2.2,
  /**
   * İki güverte vinci, ambar aralarında ve merkez hattının dışında.
   *
   * Bordaya alınmaları hem gerçek (çok maksatlı gemilerde vinçler ambar
   * ağzını boş bırakmak için bir tarafa kaydırılır) hem de zorunlu: merkez
   * hattındayken kule ve bom tam karşıya gelip güverteyi baştan sona
   * kapatıyordu.
   */
  cranes: [
    { z: -36, x: -5.6 },
    { z: -64, x: -5.6 },
  ] as Array<{ z: number; x: number }>,
  /** Direk baş kasara güvertesinde; ırgat onun ilerisinde. */
  mastZ: -90,
  mastHeight: 12,
  windlassZ: -93,
} as const;

/**
 * Deniz ve ufuk.
 *
 * Fon, panorama dokusunu taşıyan geniş bir silindir yayı. Kamera odanın içinde
 * en fazla ~1.5 m geziniyor; 600 m'deki bir fon buna karşılık 0.15° parallaks
 * yapar, yani sabit durur — ama artık **geminin arkasındadır**, üstüne boyalı
 * değil. İşin asıl kazancı bu: gemi fona göre kayar.
 *
 * Yükseklik: dikey olarak ±14° kapsanıyor (600 m'de ±150 m). 240°'lik yayın
 * çevresi 2513 m, yüksekliği 300 m → 8.4:1; panorama dokusu 3072×384 = 8:1,
 * yani doku neredeyse hiç esnemeden oturuyor.
 *
 * Merkez yüksekliği ufuk çizgisinden çıkar ve elle yazılmaz: dokuda ufuk
 * üstten %45.8'de (PANORAMA_HORIZON_V), dünyada da göz hizasına (EYE_Y) denk
 * gelmeli. SeaHorizon bu ikisinden hesaplıyor — ≈ −10.9 m.
 */
export const HORIZON_SCENE = {
  backdropRadius: 600,
  backdropHeight: 300,
  /** Yayın açıklığı — kamera azimutu ±0.5 rad kısıtlı, 240° fazlasıyla yeter. */
  backdropArc: (240 * Math.PI) / 180,
  /** Deniz düzlemi, sis bandının ötesine taşacak kadar geniş. */
  seaRadius: 700,
  /**
   * Sis: deniz düzleminin dış kenarını fonun boyalı denizine bağlar. 700 m'deki
   * kenar ufkun 0.74° altında kalıyor; sis olmadan orada bir disk kenarı
   * görünürdü. Oda (≤6 m) ve gemi (≤60 m) sisin çok berisinde.
   */
  fogNear: 200,
  fogFar: 650,
  /** Panoramanın ufuk hizasındaki deniz rengi — sis bununla karışmalı. */
  fogColor: "#5b93b4",
} as const;

/** Ön perdenin plan görünümü: iskele kanadından sancak kanadına kırık hat. */
const FRONT_POLYLINE: Array<[number, number]> = [
  [-2.774, -1.575],
  [-2.002, -2.494],
  [-0.75, -3.0],
  [0.75, -3.0],
  [2.002, -2.494],
  [2.774, -1.575],
];

export interface WindowPanel {
  /** Panel merkezinin plan konumu. */
  center: [number, number];
  /** Y ekseni etrafında dönüş — panelin yüzü oda içine bakar. */
  yaw: number;
  width: number;
  /**
   * Panelin ön perde boyunca kapladığı oran (0 iskele ucu, 1 sancak ucu).
   *
   * Manzara camlara boyanırken panoramanın u dilimiydi. Cam artık geçirgen
   * (bkz. BridgeRoom → WindowGlass), manzara dışarıda gerçek geometri; bu
   * aralık yalnız perdenin plan geometrisini tarif etmek için duruyor.
   */
  u0: number;
  u1: number;
}

function buildWindowPanels(): WindowPanel[] {
  const segs = FRONT_POLYLINE.slice(0, -1).map((a, i) => {
    const b = FRONT_POLYLINE[i + 1];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const width = Math.hypot(dx, dz);
    return { a, b, dx: dx / width, dz: dz / width, width };
  });
  const total = segs.reduce((s, p) => s + p.width, 0);
  let run = 0;
  return segs.map((s) => {
    const u0 = run / total;
    run += s.width;
    return {
      center: [(s.a[0] + s.b[0]) / 2, (s.a[1] + s.b[1]) / 2] as [number, number],
      // Düzlemin normali (sin yaw, cos yaw); iskeleden sancağa giden yön
      // vektörünün sol dikeyi odanın içini gösterir.
      yaw: Math.atan2(-s.dz, s.dx),
      width: s.width,
      u0,
      u1: run / total,
    };
  });
}

export const WINDOW_PANELS: WindowPanel[] = buildWindowPanels();

/** Ön perdenin oda içine bakan köşe noktaları — yan perdeler buradan başlar. */
export const FRONT_WING_Z = FRONT_POLYLINE[0][1];

export interface ConsoleUnit {
  /** Tezgâhın merkezi (x, z). */
  center: [number, number];
  yaw: number;
  width: number;
  depth: number;
}

/** Tezgâh üstü yüksekliği — oturur konumda kolay erişilen 0.92 m. */
export const CONSOLE_TOP_Y = 0.92;

export const CONSOLE_UNITS: ConsoleUnit[] = [
  { center: [-1.36, -1.66], yaw: 0.23, width: 1.32, depth: 0.68 },
  { center: [0, -1.84], yaw: 0, width: 1.0, depth: 0.68 },
  { center: [1.36, -1.66], yaw: -0.23, width: 1.32, depth: 0.68 },
];

/** Dümen dolabı: orta konsolun kıç yüzünde, oturur göz hizasının altında. */
export const WHEEL = {
  position: [0, 0.58, -1.45] as [number, number, number],
  radius: 0.24,
};

/** Yatık enstrüman panelinin eğimi ve ünite yerel çerçevesindeki yeri. */
export const PANEL_TILT = -0.34;
export const PANEL_LOCAL_Y = CONSOLE_TOP_Y + 0.16;
export const PANEL_LOCAL_Z = -0.2;
export const PANEL_HEIGHT = 0.42;

export interface Slot {
  position: [number, number, number];
  /** Önce Y ekseninde yaw, sonra yerel X ekseninde tilt uygulanır. */
  yaw: number;
  tilt: number;
}

/**
 * Bir ünitenin yatık paneli üstündeki yuva.
 *
 * `alongWidth` panel boyunca sancağa doğru, `alongPanel` panelin kendi yukarı
 * yönünde, `standoff` ise panel yüzeyinden dışarı (normal boyunca) kaydırır.
 * Ekranlar da widget'lar da aynı yuva hesabını kullandığı için hepsi tek bir
 * düzlemde, aynı eğimle oturur.
 */
export function panelSlot(unit: ConsoleUnit, alongWidth: number, alongPanel = 0, standoff = 0.05): Slot {
  const cos = Math.cos(PANEL_TILT);
  const sin = Math.sin(PANEL_TILT);
  // Panelin kendi eksenleri (ünite yerel çerçevesinde): yukarı ve normal.
  const up: [number, number] = [cos, sin]; // (y, z)
  const normal: [number, number] = [-sin, cos]; // (y, z)

  const lx = alongWidth;
  const ly = PANEL_LOCAL_Y + alongPanel * up[0] + standoff * normal[0];
  const lz = PANEL_LOCAL_Z + alongPanel * up[1] + standoff * normal[1];

  const c = Math.cos(unit.yaw);
  const s = Math.sin(unit.yaw);
  return {
    position: [unit.center[0] + lx * c + lz * s, ly, unit.center[1] - lx * s + lz * c],
    yaw: unit.yaw,
    tilt: PANEL_TILT,
  };
}

export const [PORT_UNIT, HELM_UNIT, STBD_UNIT] = CONSOLE_UNITS;

/**
 * Ön perdenin bir camının üstündeki duvar yuvası — perde kırık hatlı olduğu
 * için cihaz o segmentin açısını alır ve yüzü odaya bakar.
 */
export function frontWallSlot(panelIndex: number, y: number, standoff = 0.08): Slot {
  const panel = WINDOW_PANELS[panelIndex];
  return {
    position: [
      panel.center[0] + Math.sin(panel.yaw) * standoff,
      y,
      panel.center[1] + Math.cos(panel.yaw) * standoff,
    ],
    yaw: panel.yaw,
    tilt: 0,
  };
}

export interface InstrumentMount extends Slot {
  id: HomeWidgetId;
  /** Cihazın gerçek genişliği; yüksekliği widget'ın en-boy oranından çıkar. */
  width: number;
  /** Widget'ın en-boy oranı (genişlik / yükseklik) — çerçeve buna göre kesilir. */
  aspect: number;
  /** Montaj yerinin adı — kapalı widget'ın boş yuvasında yazar. */
  fixture: string;
}

/**
 * Küçük enstrümanların ortak oranı (bkz. instrumentPhotos → SMALL_ASPECT) ve
 * geniş olanların oranları. Burada tekrar yazılıyor çünkü montaj çerçevesinin
 * yüksekliği widget yüklenmeden önce, geometri kurulurken gerekiyor.
 */
const SMALL = 1 / 1.14;

/**
 * Ön perdedeki enstrüman panosu — orta pencerenin üstünde, fotoğraftaki
 * çerçeveli panonun yerinde. Üç cihaz taşır: yerel saat, GMT saati ve rüzgâr.
 */
export const CLOCK_BOARD = { y: 2.33, z: -2.97, width: 1.36, height: 0.5 };

/** Panonun yüzeyi — cihazlar perdeden bu kadar dışarıda durur. */
const BOARD_Z = CLOCK_BOARD.z + 0.07;
const BOARD_INSTRUMENT_W = 0.34;

export const INSTRUMENT_MOUNTS: InstrumentMount[] = [
  // Enstrüman panosu: yerel saat — GMT — rüzgâr.
  {
    id: "clock-national",
    position: [-0.42, CLOCK_BOARD.y, BOARD_Z],
    yaw: 0,
    tilt: 0,
    width: BOARD_INSTRUMENT_W,
    aspect: SMALL,
    fixture: "SHIP'S CLOCK",
  },
  {
    id: "clock-gmt",
    position: [0, CLOCK_BOARD.y, BOARD_Z],
    yaw: 0,
    tilt: 0,
    width: BOARD_INSTRUMENT_W,
    aspect: SMALL,
    fixture: "GMT CLOCK",
  },
  {
    id: "wind",
    position: [0.42, CLOCK_BOARD.y, BOARD_Z],
    yaw: 0,
    tilt: 0,
    width: BOARD_INSTRUMENT_W,
    aspect: SMALL,
    fixture: "WIND REPEATER",
  },
  // İskele konsolu: mevki tekrarlayıcısı (GPS/GLONASS), ECDIS'in yanı.
  {
    ...panelSlot(PORT_UNIT, 0.36, 0.01, 0.055),
    id: "location",
    width: 0.58,
    aspect: 1.8,
    fixture: "GPS / GLONASS",
  },
  // Sancak konsolu: seyir bilgi ekranı (güneş doğuş/batış), radarın yanı.
  {
    ...panelSlot(STBD_UNIT, -0.36, 0.01, 0.055),
    id: "sun",
    width: 0.58,
    aspect: 16 / 9,
    fixture: "CONNING INFO",
  },
  // İskele tarafındaki ön perde — kanat kapısının yanı, camın üstü: gemide
  // termometre/barometre buraya, dümencinin göz atabileceği yere asılır.
  {
    ...frontWallSlot(1, 2.33),
    id: "weather",
    width: 0.3,
    aspect: SMALL,
    fixture: "THERMOMETER",
  },
];

/** Konsoldaki gerçek cihazların yuvaları — widget'larla aynı düzlemde dururlar. */
export const ECDIS_SLOT = panelSlot(PORT_UNIT, -0.4, 0.01, 0.055);
export const RADAR_SLOT = panelSlot(STBD_UNIT, 0.42, 0.01, 0.055);
export const RUDDER_GAUGE_SLOT = panelSlot(HELM_UNIT, -0.32, 0.02, 0.05);
export const RPM_GAUGE_SLOT = panelSlot(HELM_UNIT, 0.32, 0.02, 0.05);

/**
 * drei `<Html transform>` içeriğinin ölçek katsayısı.
 *
 * Html, dönüşüm kipinde nesne matrisinin taban vektörlerini
 * `1 / ((distanceFactor || 10) / 400)` ile böler; distanceFactor verilmediğinde
 * bu 40'tır, yani 40 CSS pikseli bir grup birimine denk gelir. Widget'lar sabit
 * piksel genişliğinde çizilip grup bu katsayıyla ölçeklendiği için montaj
 * genişliği layout dosyasında metre cinsinden yazılabiliyor (grubun kendisi
 * SCENE_SCALE ile ayrıca ölçeklenir; oran değişmez).
 */
export const HTML_PX_PER_UNIT = 40;

/** Sabit piksel genişliğinde çizilen widget'ın istenen metre genişliğine ölçeği. */
export function htmlScaleFor(widthMeters: number, widthPx: number): number {
  return (widthMeters * HTML_PX_PER_UNIT) / widthPx;
}

/** Widget DOM'unun 3D'ye gömülmeden önceki piksel genişliği. */
export const MOUNT_PX = 260;
