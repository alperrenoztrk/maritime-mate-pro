/**
 * Ana sayfa widget'larının gövdesini oluşturan gerçek enstrüman fotoğrafları.
 *
 * Her widget bir fotoğrafın üstüne canlı veri bindirir. Fotoğraf; gövdeyi,
 * bezeli, camı ve ışığı verir. Okuma yüzeyi (kadran / LCD / cam tüp)
 * fotoğrafın üstüne kalibre edilmiş opak bir katmanla yeniden çizilir; yoksa
 * fotoğraftaki donmuş ibreler canlı ibrelerle çakışır.
 *
 * Koordinat sistemi:
 *  - `crop`  → ORİJİNAL fotoğrafın 0–1 kesirleri. Kırpma CSS'te yapılır
 *              (bkz. InstrumentFrame), ortamda görüntü aracı yok.
 *  - `aspect`→ kırpılmış kutunun genişlik/yükseklik oranı. Küçük widget'lar
 *              1/1.14 ≈ 0.877 ile aynı satır yüksekliğini paylaşır.
 *  - Çapalar → KIRPILMIŞ kutunun 0–1 kesirleri, yani ölçekten bağımsız.
 *  - `mask`  → dikkat: maske `<img>` kutusuna uygulanır, widget kutusuna değil.
 *              Yüzdeleri KIRPILMAMIŞ fotoğrafın kesirleri olarak yaz.
 */

import seikoClockPhoto from "@/assets/instruments/seiko-marine-clock.jpg";
import windIndicatorPhoto from "@/assets/instruments/wind-indicator.jpg";
import thermometerPhoto from "@/assets/instruments/thermometer.jpg";
import portholePhoto from "@/assets/instruments/porthole.jpg";
import gpsPhoto from "@/assets/instruments/gps-receiver.webp";

/** Fotoğrafın hangi bölgesinin widget kutusuna gireceği. */
export interface PhotoCrop {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Dairesel okuma yüzeyi (saat kadranı, rüzgâr göstergesi). */
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
  /** Kredi penceresinde görünen başlık. */
  title: string;
  /** Kaynak sayfa — yalnızca dış kaynaklı (Commons) fotoğraflarda. */
  url?: string;
  author: string;
  license: string;
}

export interface InstrumentPhoto {
  src: string;
  alt: string;
  crop: PhotoCrop;
  aspect: number;
  /**
   * Fotoğrafın arka planını kesen CSS maskesi. Yüzdeler `<img>` kutusuna,
   * yani kırpılmamış fotoğrafa göredir.
   */
  mask?: string;
  credit: PhotoCredit;
}

/** Küçük widget'ların ortak en-boy oranı — .iw-small ile aynı satırı paylaşırlar. */
export const SMALL_ASPECT = 1 / 1.14;

/**
 * Saat gövdesi: stüdyoda beyaz fonda çekilmiş bir Seiko köprüüstü saati.
 *
 * Beyaz fon widget ızgarasında parlak bir kutu gibi durduğu için maskeleniyor:
 * kasa dairesi (554 px karede merkez 273,283 — yarıçap 194) artı kulakların
 * geçtiği yatay bant açık kalıyor, gerisi şeffaf. Böylece saat, kartın koyu
 * zemininin üstünde duruyor.
 */
export const SEIKO_CLOCK: InstrumentPhoto = {
  src: seikoClockPhoto,
  alt: "Seiko bridge clock with a light blue bezel and cream dial",
  // Kasa (çap 388 px) kırpılmış kutunun %93'ünü kaplar.
  crop: { x: 0.11661, y: 0.08123, w: 0.75307, h: 0.85849 },
  aspect: SMALL_ASPECT,
  mask:
    "radial-gradient(ellipse 35.38% 35.38% at 49.31% 51.05%, #000 0 98%, transparent 100%)," +
    " radial-gradient(ellipse 38.63% 5.42% at 49.31% 51.05%, #000 0 94%, transparent 100%)",
  credit: {
    title: "Seiko bridge watch",
    author: "User archive",
    license: "Supplied by the app owner",
  },
};

/**
 * Fotoğraftaki krem kadranın kırpılmış kutuya göre ölçülen sınırları. Kadran
 * kasaya göre biraz sola/yukarı kaçıktır (fotoğraf tam cepheden değil); çapa
 * bu kaçıklığı taşır. Yarıçap basılı dakika halkasının bir tık dışında:
 * fotoğrafın taksimatı hiç sızmasın.
 */
export const SEIKO_CLOCK_DIAL: DialAnchor = { cx: 0.472, cy: 0.477, r: 0.392 };

/**
 * Rüzgâr gövdesi: köprüüstünde duvara monteli Koshin rüzgâr paneli. Panelde
 * yan yana iki gösterge var (hız ve yön); widget bir ızgara sütunu geniş
 * olduğu için kırpma sağdaki YÖN göstergesini alır — hız zaten alt şeritte
 * rakamla okunur.
 */
export const WIND_GAUGE: InstrumentPhoto = {
  src: windIndicatorPhoto,
  alt: "Wind direction indicator with a black bezel on a bridge console",
  // 572×536 karede gösterge (430.6, 250.8) merkezli. Kırpma göstergeyi kutuya
  // ortalar, üstte panelin vidalarını da içeri alır.
  crop: { x: 0.54956, y: 0.22071, w: 0.40646, h: 0.4944 },
  aspect: SMALL_ASPECT,
  credit: {
    title: "Koshin wind speed/direction panel",
    author: "User archive",
    license: "Supplied by the app owner",
  },
};

/** Göstergenin beyaz yüzü; canlı kadran siyah bezelin iç kenarına kadar örter. */
export const WIND_GAUGE_DIAL: DialAnchor = { cx: 0.5, cy: 0.506, r: 0.422 };

export const THERMOMETER: InstrumentPhoto = {
  src: thermometerPhoto,
  alt: "Mercury thermometer in a glass tube mounted on a white wall",
  // Kılcal sola alınmaz: kırpma, boruyu kutunun %68'ine getirir ki üstteki
  // etiket plakası sıcak havalarda cıvanın ucunu örtmesin.
  crop: { x: 0.06, y: 0, w: 0.554, h: 0.423 },
  aspect: SMALL_ASPECT,
  credit: {
    title: "Quicksilvertermometer Osaby.JPG",
    url: "https://commons.wikimedia.org/wiki/File:Quicksilvertermometer_Osaby.JPG",
    author: "Pieter Kuiper",
    license: "Public domain",
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
  alt: "Sea and coast seen through a ship's porthole",
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

/**
 * Konum gövdesi: SGN-500 birleşik GPS/GLONASS alıcısı. Kırpma
 * fotoğrafın tam enini alır; koyu fon cihazı kartın içinde çerçeveler ve
 * yükseklik diğer geniş widget'la (lombar) aynı 1.8 oranına oturur.
 */
export const GPS: InstrumentPhoto = {
  src: gpsPhoto,
  alt: "SGN-500 GPS/GLONASS receiver",
  crop: { x: 0, y: 0.05556, w: 1, h: 0.80351 },
  aspect: 1.8,
  credit: {
    title: "SGN-500 GPS/GLONASS receiver",
    author: "User archive",
    license: "Supplied by the app owner",
  },
};

/**
 * LCD'nin görüntü alanı. Fotoğraftaki ekran 2011 tarihli donmuş bir fix
 * gösteriyor (tarih, mevki, COG/SOG); alan siyah çerçevenin içine kadar
 * tamamen örtülür.
 */
export const GPS_SCREEN: ScreenAnchor = { x: 0.1725, y: 0.1795, w: 0.4595, h: 0.648 };

/** Kredi penceresinin listesi — her fotoğraf burada bir kez görünür. */
export const INSTRUMENT_CREDITS: PhotoCredit[] = [
  SEIKO_CLOCK.credit,
  WIND_GAUGE.credit,
  GPS.credit,
  THERMOMETER.credit,
  PORTHOLE.credit,
];
