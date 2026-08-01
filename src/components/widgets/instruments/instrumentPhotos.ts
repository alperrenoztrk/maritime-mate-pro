/**
 * Ana sayfa widget'larının gövdesini oluşturan gerçek enstrüman fotoğrafları.
 *
 * Her widget bir fotoğrafın üstüne canlı veri bindirir. Fotoğraf; gövdeyi,
 * pirinç bezeli, camı ve ışığı verir. Okuma yüzeyi (kadran / LCD / cam tüp)
 * fotoğrafın üstüne kalibre edilmiş opak bir katmanla yeniden çizilir; yoksa
 * fotoğraftaki donmuş ibreler canlı ibrelerle çakışır.
 *
 * Koordinat sistemi:
 *  - `crop`  → ORİJİNAL fotoğrafın 0–1 kesirleri. Kırpma CSS'te yapılır
 *              (bkz. InstrumentFrame), ortamda görüntü aracı yok.
 *  - `aspect`→ kırpılmış kutunun genişlik/yükseklik oranı. Küçük widget'lar
 *              1/1.14 ≈ 0.877 ile aynı satır yüksekliğini paylaşır.
 *  - Çapalar → KIRPILMIŞ kutunun 0–1 kesirleri, yani ölçekten bağımsız.
 */

import chronometerPhoto from "@/assets/instruments/chronometer.jpg";
import compassPhoto from "@/assets/instruments/compass.jpg";
import thermometerPhoto from "@/assets/instruments/thermometer.jpg";
import portholePhoto from "@/assets/instruments/porthole.jpg";
import gpsPhoto from "@/assets/ship-systems/gps.jpg";

/** Fotoğrafın hangi bölgesinin widget kutusuna gireceği. */
export interface PhotoCrop {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Dairesel okuma yüzeyi (kronometre kadranı, pusula kartı). */
export interface DialAnchor {
  cx: number;
  cy: number;
  /** Yarıçap — kırpılmış kutunun GENİŞLİĞİNE oranla. */
  r: number;
  /** Kadran cepheden değilse düzlemi yatır (CSS rotateX). */
  tiltDeg?: number;
  /** Kadranın kendi düzlemindeki dönüklüğü (CSS rotateZ). */
  rollDeg?: number;
}

/** Eliptik bölge (lombar açıklığı — fotoğrafta tam daire değil). */
export interface EllipseAnchor {
  cx: number;
  cy: number;
  /** Yatay yarıçap — kutunun GENİŞLİĞİNE oranla. */
  rx: number;
  /** Dikey yarıçap — kutunun YÜKSEKLİĞİNE oranla. */
  ry: number;
}

/** Dikdörtgen okuma yüzeyi (LCD ekran). */
export interface ScreenAnchor {
  x: number;
  y: number;
  w: number;
  h: number;
  tiltDeg?: number;
  yawDeg?: number;
  rollDeg?: number;
}

/**
 * Termometrenin kılcal borusu.
 *
 * `tempA`/`tempB`, fotoğrafta BASILI skalanın üstünden okunmuş iki referans
 * noktasıdır — cıvanın ucu gerçekten rakamı göstersin diye eşleme bu ikisinden
 * lineer kurulur. Maskenin sınırları (`yTubeTop`/`yBase`) skaladan ayrıdır:
 * fotoğrafın alt tarafındaki koni biçimli boyun örtülmez, cıva oraya girmeden
 * skalanın bittiği yerde biter.
 */
export interface ColumnAnchor {
  cx: number;
  w: number;
  yTubeTop: number;
  yBase: number;
  tempA: number;
  yA: number;
  tempB: number;
  yB: number;
}

export interface PhotoCredit {
  /** Commons dosya adı; kredi penceresinde görünen başlık. */
  title: string;
  url: string;
  author: string;
  license: string;
}

export interface InstrumentPhoto {
  src: string;
  alt: string;
  crop: PhotoCrop;
  aspect: number;
  credit: PhotoCredit;
}

/** Küçük widget'ların ortak en-boy oranı — .iw-small ile aynı satırı paylaşırlar. */
export const SMALL_ASPECT = 1 / 1.14;

export const CHRONOMETER: InstrumentPhoto = {
  src: chronometerPhoto,
  alt: "Pirinç çerçeveli, ahşap kutulu gemi kronometresi",
  // 960×733 karede kadran (485, 339) merkezli, 230 px yarıçaplı. Kırpma tam
  // olarak SMALL_ASPECT veriyor (643×733) — daire yamulmasın diye.
  crop: { x: 0.1703, y: 0, w: 0.6698, h: 1 },
  aspect: SMALL_ASPECT,
  credit: {
    title: "Marine-Chronometer.A.Lange&Soehne.1948.jpg",
    url: "https://commons.wikimedia.org/wiki/File:Marine-Chronometer.A.Lange%26Soehne.1948.jpg",
    author: "Bautsch",
    license: "CC0",
  },
};

/**
 * Fotoğraftaki emaye kadranın kırpılmış kutuya göre ölçülen sınırları.
 * Yarıçap fotoğrafın kadranından bir tık büyük: canlı yüzey emayenin son
 * milimetresini de örtsün ki fotoğrafın basılı dakika halkası hiç görünmesin.
 */
export const CHRONOMETER_DIAL: DialAnchor = { cx: 0.5118, cy: 0.4935, r: 0.3795 };

export const COMPASS: InstrumentPhoto = {
  src: compassPhoto,
  alt: "Siyah bezelli, cam kubbeli gemi pusulası",
  // 960×720 karede kart (515, 369) merkezli, 254 px yarıçaplı. Kırpma kartı
  // yatayda ortalar; fotoğrafta bezel kartın sağına kaçık olduğu için kutuda
  // pusulanın kendisi ortalanır.
  crop: { x: 0.2075, y: 0, w: 0.658, h: 1 },
  aspect: SMALL_ASPECT,
  credit: {
    title: "Askania compass.JPG",
    url: "https://commons.wikimedia.org/wiki/File:Askania_compass.JPG",
    author: "Blueberry009",
    license: "Kamu malı",
  },
};

/** Fotoğraftaki pusula kartının sınırları; canlı kart bunun tam üstüne oturur. */
export const COMPASS_DIAL: DialAnchor = { cx: 0.5163, cy: 0.5026, r: 0.3955 };

export const THERMOMETER: InstrumentPhoto = {
  src: thermometerPhoto,
  alt: "Beyaz duvara asılı, cam borulu cıvalı termometre",
  // Kılcal sola alınmaz: kırpma, boruyu kutunun %68'ine getirir ki üstteki
  // etiket plakası sıcak havalarda cıvanın ucunu örtmesin.
  crop: { x: 0.06, y: 0, w: 0.554, h: 0.423 },
  aspect: SMALL_ASPECT,
  credit: {
    title: "Quicksilvertermometer Osaby.JPG",
    url: "https://commons.wikimedia.org/wiki/File:Quicksilvertermometer_Osaby.JPG",
    author: "Pieter Kuiper",
    license: "Kamu malı",
  },
};

/**
 * Kırpılmış karede skalanın görünen aralığı +40 °C … −20 °C — gerçek hava
 * sıcaklıklarının tamamı. Referanslar fotoğraftaki basılı +40 ve 0 işaretleri.
 */
export const THERMOMETER_COLUMN: ColumnAnchor = {
  cx: 0.688,
  w: 0.042,
  yTubeTop: 0,
  yBase: 0.95,
  tempA: 40,
  yA: 0.0184,
  tempB: 0,
  yB: 0.6728,
};

export const PORTHOLE: InstrumentPhoto = {
  src: portholePhoto,
  alt: "Gemi lombarından görünen deniz ve kıyı",
  crop: { x: 0, y: 0, w: 1, h: 1 },
  aspect: 16 / 9,
  credit: {
    title: "Bamberton through the porthole - panoramio.jpg",
    url: "https://commons.wikimedia.org/wiki/File:Bamberton_through_the_porthole_-_panoramio.jpg",
    author: "Kiwibirdman",
    license: "CC BY 3.0",
  },
};

/**
 * Lombarın cam açıklığı — 960×540 karede (474, 275) merkezli, 216 px yarıçaplı
 * daire. Kutunun eni ve boyu farklı ölçeklendiği için yarıçap iki eksende ayrı
 * kesir olarak tutulur.
 */
export const PORTHOLE_GLASS: EllipseAnchor = { cx: 0.4938, cy: 0.5093, rx: 0.225, ry: 0.4 };

export const GPS: InstrumentPhoto = {
  src: gpsPhoto,
  alt: "Gemi köprüüstünde duran Furuno GP-80 GPS alıcısı",
  crop: { x: 0.127, y: 0.141, w: 0.703, h: 0.586 },
  aspect: 1.8,
  credit: {
    title: "Furuno Electric GPS Navigator GP-80 at Greenpeace's Rainbow Warrior II 20110108.jpg",
    url: "https://commons.wikimedia.org/wiki/File:Furuno_Electric_GPS_Navigator_GP-80_at_Greenpeace%27s_Rainbow_Warrior_II_20110108.jpg",
    author: "☼ うみ 目覚めたら",
    license: "CC BY-SA 2.0",
  },
};

export const GPS_SCREEN: ScreenAnchor = { x: 0.22, y: 0.21, w: 0.387, h: 0.545 };

/** Kredi penceresinin listesi — her fotoğraf burada bir kez görünür. */
export const INSTRUMENT_CREDITS: PhotoCredit[] = [
  CHRONOMETER.credit,
  COMPASS.credit,
  THERMOMETER.credit,
  PORTHOLE.credit,
  GPS.credit,
];
