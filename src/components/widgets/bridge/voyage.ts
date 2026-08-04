/**
 * Seferin kendisi: gemi hangi limandan hangi limana, hangi rotayı izleyerek
 * gidiyor ve şu anda neresinde.
 *
 * Burada yalnız saf matematik ve veri var; React tarafı useVoyage.ts'te,
 * çizim tarafı bridgeScreens.ts'te. Köprüüstündeki bütün seyir cihazları
 * (ECDIS, radar, conning, iskandil, otopilot) tek bir VoyageState'ten
 * besleniyor — iki ekranın birbirini yalanlaması ancak böyle engellenebilir.
 *
 * ROTALAR NEDEN ELLE YAZILDI: iki rastgele liman arasına büyük daire çekmek
 * gemiyi karadan geçirir. Buradaki her rota gerçek bir kısa sefer ve ara
 * mevkileri suda; "rastgele liman → rastgele liman" isteği rotanın kendisini
 * rastgele seçerek karşılanıyor. Mevkiler denizciliğe uygun yaklaşıklıkta —
 * seyir planı değil, köprüüstü manzarası için.
 */

export interface Port {
  name: string;
  /** UN/LOCODE — ECDIS ve seyir defteri satırlarında kullanılır. */
  locode: string;
  lat: number;
  lon: number;
}

export interface Route {
  id: string;
  /** Seyredilen deniz — NAVTEX/EGC uyarıları bu adı taşır. */
  sea: string;
  from: Port;
  to: Port;
  /** Kalkış ve varış arasındaki dönüş mevkileri (enlem, boylam). */
  via: Array<[number, number]>;
  /** Bu seferin servis sürati (kt). */
  speedKt: number;
}

const P = (name: string, locode: string, lat: number, lon: number): Port => ({ name, locode, lat, lon });

export const ROUTES: Route[] = [
  {
    id: "ambarli-izmir",
    sea: "MARMARA — ÇANAKKALE BOĞAZI — EGE",
    from: P("Ambarlı", "TRAMB", 40.9639, 28.6889),
    to: P("İzmir Alsancak", "TRIZM", 38.4437, 27.1428),
    via: [
      [40.82, 28.20],
      [40.62, 27.55],
      [40.38, 26.92],
      [40.15, 26.38],
      [40.02, 26.17],
      [39.55, 25.92],
      [38.92, 26.32],
      [38.53, 26.62],
      [38.42, 26.88],
    ],
    speedKt: 13.2,
  },
  {
    id: "novorossiysk-istanbul",
    sea: "KARADENİZ",
    from: P("Novorossiysk", "RUNVS", 44.7213, 37.7844),
    to: P("İstanbul", "TRIST", 41.0180, 28.9770),
    via: [
      [44.35, 37.05],
      [43.55, 35.10],
      [42.85, 32.60],
      [42.10, 30.20],
      [41.45, 29.28],
      [41.22, 29.13],
    ],
    speedKt: 14.0,
  },
  {
    id: "mersin-iskenderun",
    sea: "DOĞU AKDENİZ",
    from: P("Mersin", "TRMER", 36.7960, 34.6320),
    to: P("İskenderun", "TRISK", 36.5980, 36.1700),
    via: [
      [36.58, 34.92],
      [36.36, 35.52],
      [36.42, 35.95],
    ],
    speedKt: 12.4,
  },
  {
    id: "iskenderun-portsaid",
    sea: "DOĞU AKDENİZ — LEVANT",
    from: P("İskenderun", "TRISK", 36.5980, 36.1700),
    to: P("Port Said", "EGPSD", 31.2620, 32.3020),
    via: [
      [36.05, 35.62],
      [34.60, 34.55],
      [33.10, 33.40],
      [31.80, 32.60],
    ],
    speedKt: 13.6,
  },
  {
    id: "izmir-pire",
    sea: "EGE",
    from: P("İzmir Alsancak", "TRIZM", 38.4437, 27.1428),
    to: P("Pire", "GRPIR", 37.9420, 23.6210),
    via: [
      [38.40, 26.62],
      [37.92, 26.28],
      [37.34, 25.30],
      [37.20, 24.05],
      [37.72, 23.62],
    ],
    speedKt: 13.0,
  },
  {
    id: "pire-valletta",
    sea: "ORTA AKDENİZ — İYON DENİZİ",
    from: P("Pire", "GRPIR", 37.9420, 23.6210),
    to: P("Valletta", "MTMLA", 35.8930, 14.5140),
    via: [
      [37.55, 23.28],
      [36.75, 22.42],
      [36.25, 21.35],
      [35.85, 19.20],
      [35.62, 16.80],
    ],
    speedKt: 14.4,
  },
  {
    id: "barcelona-genova",
    sea: "BALEAR — LİGURYA DENİZİ",
    from: P("Barselona", "ESBCN", 41.3510, 2.1620),
    to: P("Cenova", "ITGOA", 44.4020, 8.9210),
    via: [
      [41.22, 3.40],
      [41.35, 5.60],
      [42.45, 7.85],
      [43.65, 8.62],
    ],
    speedKt: 14.8,
  },
  {
    id: "rotterdam-hamburg",
    sea: "KUZEY DENİZİ — ALMAN KÖRFEZİ",
    from: P("Rotterdam", "NLRTM", 51.9510, 4.1400),
    to: P("Hamburg", "DEHAM", 53.5400, 9.9700),
    via: [
      [52.18, 4.18],
      [53.15, 4.35],
      [53.92, 5.60],
      [54.10, 7.05],
      [54.02, 8.18],
      [53.87, 8.71],
      [53.66, 9.42],
    ],
    speedKt: 12.8,
  },
  {
    id: "gibraltar-casablanca",
    sea: "CEBELİTARIK — ATLANTİK",
    from: P("Cebelitarık", "GIGIB", 36.1400, -5.3540),
    to: P("Kazablanka", "MACAS", 33.6020, -7.6180),
    via: [
      [35.90, -5.95],
      [35.30, -6.60],
      [34.30, -7.30],
    ],
    speedKt: 13.8,
  },
  {
    id: "singapore-klang",
    sea: "MALAKKA BOĞAZI",
    from: P("Singapur", "SGSIN", 1.2640, 103.8300),
    to: P("Port Klang", "MYPKG", 3.0000, 101.3600),
    via: [
      [1.22, 103.48],
      [1.28, 102.75],
      [1.85, 101.95],
      [2.60, 101.42],
    ],
    speedKt: 12.6,
  },
  {
    id: "hongkong-kaohsiung",
    sea: "GÜNEY ÇİN DENİZİ — TAYVAN BOĞAZI",
    from: P("Hong Kong", "HKHKG", 22.2900, 114.1600),
    to: P("Kaohsiung", "TWKHH", 22.6100, 120.2800),
    via: [
      [22.08, 114.85],
      [22.55, 117.10],
      [22.62, 119.45],
    ],
    speedKt: 15.2,
  },
  {
    id: "jebelali-muscat",
    sea: "BASRA KÖRFEZİ — UMMAN KÖRFEZİ",
    from: P("Jebel Ali", "AEJEA", 25.0100, 55.0600),
    to: P("Maskat", "OMMCT", 23.6200, 58.5620),
    via: [
      [25.32, 55.85],
      [26.18, 56.42],
      [25.55, 57.15],
      [24.30, 58.20],
    ],
    speedKt: 13.4,
  },
  {
    id: "yokohama-busan",
    sea: "PASİFİK — DOĞU ÇİN DENİZİ",
    from: P("Yokohama", "JPYOK", 35.4500, 139.6600),
    to: P("Busan", "KRPUS", 35.1000, 129.0400),
    via: [
      [34.85, 139.30],
      [33.60, 136.20],
      [32.95, 132.40],
      [33.40, 129.85],
      [34.55, 129.05],
    ],
    speedKt: 15.6,
  },
  {
    id: "losangeles-oakland",
    sea: "KUZEY PASİFİK — KALİFORNİYA KIYISI",
    from: P("Los Angeles", "USLAX", 33.7300, -118.2620),
    to: P("Oakland", "USOAK", 37.7960, -122.3300),
    via: [
      [33.85, -119.15],
      [34.45, -120.75],
      [35.60, -121.65],
      [36.90, -122.55],
      [37.78, -122.62],
      [37.82, -122.47],
    ],
    speedKt: 14.2,
  },
  {
    id: "santos-buenosaires",
    sea: "GÜNEY ATLANTİK — LA PLATA",
    from: P("Santos", "BRSSZ", -23.9600, -46.3020),
    to: P("Buenos Aires", "ARBUE", -34.5900, -58.3700),
    via: [
      [-25.40, -46.60],
      [-29.20, -48.60],
      [-32.60, -51.60],
      [-34.90, -55.40],
      [-34.90, -57.40],
    ],
    speedKt: 13.9,
  },
];

/* ─── küresel geometri ─── */

const R_NM = 3440.065; // Dünya yarıçapı, deniz mili
const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;

export interface Fix {
  lat: number;
  lon: number;
}

/** İki mevki arası büyük daire mesafesi (NM). */
export function distanceNm(a: Fix, b: Fix): number {
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R_NM * Math.asin(Math.min(1, Math.sqrt(s)));
}

/** a'dan b'ye ilk kerteriz (gerçek, 0–360°). */
export function bearingDeg(a: Fix, b: Fix): number {
  const φ1 = toRad(a.lat);
  const φ2 = toRad(b.lat);
  const dλ = toRad(b.lon - a.lon);
  const y = Math.sin(dλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(dλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/**
 * Büyük daire üzerinde kesirli ara mevki (küresel doğrusal interpolasyon).
 * Kısa bacaklarda düz enlem/boylam karışımıyla farkı yok ama kutup yakınında
 * ve uzun bacaklarda doğru olan bu.
 */
export function interpolate(a: Fix, b: Fix, f: number): Fix {
  const φ1 = toRad(a.lat);
  const λ1 = toRad(a.lon);
  const φ2 = toRad(b.lat);
  const λ2 = toRad(b.lon);
  const d = distanceNm(a, b) / R_NM;
  if (d < 1e-9) return { lat: a.lat, lon: a.lon };
  const A = Math.sin((1 - f) * d) / Math.sin(d);
  const B = Math.sin(f * d) / Math.sin(d);
  const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
  const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
  const z = A * Math.sin(φ1) + B * Math.sin(φ2);
  return { lat: toDeg(Math.atan2(z, Math.hypot(x, y))), lon: toDeg(Math.atan2(y, x)) };
}

/** İki kerteriz arasındaki en kısa açı farkı (−180..180). */
export function angleDelta(from: number, to: number): number {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

/* ─── seyir planı ─── */

export interface Waypoint extends Fix {
  index: number;
  /** Kalkıştan bu mevkiye kadar rota boyu mesafe (NM). */
  runNm: number;
}

export interface Passage {
  route: Route;
  waypoints: Waypoint[];
  totalNm: number;
  /** Seferin tamamı (saat). */
  totalHours: number;
}

/** Rotayı kalkış + ara mevkiler + varış olarak tek diziye açar. */
export function buildPassage(route: Route): Passage {
  const raw: Fix[] = [
    { lat: route.from.lat, lon: route.from.lon },
    ...route.via.map(([lat, lon]) => ({ lat, lon })),
    { lat: route.to.lat, lon: route.to.lon },
  ];
  const waypoints: Waypoint[] = [];
  let run = 0;
  raw.forEach((fix, i) => {
    if (i > 0) run += distanceNm(raw[i - 1], fix);
    waypoints.push({ ...fix, index: i, runNm: run });
  });
  return { route, waypoints, totalNm: run, totalHours: run / route.speedKt };
}

export interface VoyageState {
  route: Route;
  passage: Passage;
  /** Gemi mevkii. */
  lat: number;
  lon: number;
  /** Rota hattı üzerindeki gerçek rota (COG) ve süratler. */
  cogDeg: number;
  sogKt: number;
  /** Kalkıştan beri alınan ve varışa kalan yol (NM). */
  runNm: number;
  toGoNm: number;
  /** 0 kalkış, 1 varış. */
  progress: number;
  /** İzlenen bacak ve sıradaki dönüş mevkii. */
  legIndex: number;
  nextWaypoint: Waypoint;
  bearingToWptDeg: number;
  distanceToWptNm: number;
  /** Rota hattından sapma (NM); sancak tarafı artı. */
  xteNm: number;
  /** Varışa kalan süre (saat) ve varış anı. */
  hoursToGo: number;
  eta: Date;
  /** Seyir saati — sıkıştırılmış zaman ölçeğindeki "gemi zamanı". */
  shipTime: Date;
  /** Sefer bitti mi (limanda). */
  arrived: boolean;
}

/**
 * Rotanın belirli bir noktasındaki gemi durumu.
 *
 * `runNm` rota boyunca alınan yol; hangi bacakta olduğumuzu ondan buluyoruz.
 * XTE gerçek bir sapma değil: rota hattının üstündeyiz, ama dümen tutarken
 * gemi hattın birkaç onda birlik mili yanında salınır — o salınımı seyir
 * saatine bağlı yavaş bir sinüsle üretiyoruz ki otopilot ve ECDIS ölü
 * göstermesin.
 */
export function stateAt(passage: Passage, runNm: number, shipTime: Date): VoyageState {
  const { waypoints, totalNm, route } = passage;
  const clamped = Math.min(totalNm, Math.max(0, runNm));

  let leg = 0;
  while (leg < waypoints.length - 2 && waypoints[leg + 1].runNm < clamped) leg++;

  const a = waypoints[leg];
  const b = waypoints[leg + 1];
  const legNm = Math.max(1e-6, b.runNm - a.runNm);
  const f = Math.min(1, Math.max(0, (clamped - a.runNm) / legNm));
  const here = interpolate(a, b, f);

  const cog = bearingDeg(here, b);
  const toGo = totalNm - clamped;
  const arrived = toGo <= 0.05;

  // Dümen salınımı: 8 dakikalık ve 3 dakikalık iki bileşen, toplam ±0.06 NM.
  const tMin = shipTime.getTime() / 60000;
  const xte =
    0.042 * Math.sin((2 * Math.PI * tMin) / 8.3) + 0.018 * Math.sin((2 * Math.PI * tMin) / 3.1 + 1.7);

  return {
    route,
    passage,
    lat: here.lat,
    lon: here.lon,
    cogDeg: cog,
    sogKt: arrived ? 0 : route.speedKt,
    runNm: clamped,
    toGoNm: toGo,
    progress: totalNm > 0 ? clamped / totalNm : 1,
    legIndex: leg,
    nextWaypoint: b,
    bearingToWptDeg: cog,
    distanceToWptNm: b.runNm - clamped,
    xteNm: arrived ? 0 : xte,
    hoursToGo: toGo / route.speedKt,
    eta: new Date(shipTime.getTime() + (toGo / route.speedKt) * 3600000),
    shipTime,
    arrived,
  };
}

/**
 * Rota altındaki su derinliği (m).
 *
 * Deniz haritası taşımıyoruz; iskandil için gereken tek şey inandırıcı ve
 * MEVKİYE BAĞLI bir profil. İki kaynaktan kuruluyor: limanlara yaklaşınca
 * sığlaşan bir taban eğrisi (yaklaşma kanalı 18 m, açık su rotanın kendi
 * derinliği) ve mevkiden türeyen pürüzsüz bir taban gürültüsü — böylece aynı
 * rotada aynı yerde hep aynı derinlik okunur, gemi ilerledikçe iz kayar.
 */
export function depthAt(passage: Passage, state: VoyageState): number {
  const p = state.progress;
  // Kıyıya yakınlık: iki uçta 0, ortada 1.
  const offshore = Math.min(1, Math.min(p, 1 - p) / 0.12);
  const openWater = 26 + Math.min(240, passage.totalNm * 0.55);
  const base = 14 + (openWater - 14) * offshore ** 1.4;

  // Taban engebesi — mevkiden türeyen üç dalga boyu.
  const x = state.lat * 12.9898 + state.lon * 78.233;
  const ripple =
    Math.sin(x * 0.7) * 0.42 + Math.sin(x * 2.3 + 1.1) * 0.24 + Math.sin(x * 5.9 + 2.7) * 0.12;
  return Math.max(9, base * (1 + 0.22 * ripple));
}

/* ─── sefer seçimi ─── */

/**
 * Zaman sıkıştırması: 1 saniye gerçek zaman = 30 saniye seyir zamanı.
 *
 * Gerçek zamanlı bir sefer widget'ta hiç kıpırdamazdı — 300 millik bir bacak
 * 23 saat sürer. 30× ile aynı bacak 46 dakikada geçiyor: varışa kalan mil
 * dakikada 7 mil eriyor, ECDIS'te gemi gözle görülür şekilde ilerliyor, ama
 * kısa bacaklar bile widget'a birkaç dakika bakan birinin gözü önünde bitip
 * gemiyi limanda bırakmıyor.
 *
 * DİKKAT: bu ölçek yalnız SEYİR PLANINA uygulanır. Denizin kendisi (dalga
 * karşılaşması, yalpa periyodu, geminin suda aldığı yol) gerçek zamanda ve
 * gerçek süratle hesaplanır — yoksa gemi 400 knot'la giden bir tekne gibi
 * sallanırdı (bkz. waveField.ts).
 */
export const TIME_COMPRESSION = 30;

/**
 * Varıştan sonra yeni seferin başlamasına kadar geçen liman süresi (seyir
 * saati). Kısa tutuldu: köprüüstünün limanda ölü durması, seyir hâlinde
 * durmasından çok daha az ilginç.
 */
const PORT_STAY_HOURS = 0.6;

export interface VoyagePlan {
  routeId: string;
  /** Kalkış anı — gerçek zaman damgası (ms). */
  departedAt: number;
}

function pickRouteId(exclude?: string): string {
  const pool = ROUTES.filter((r) => r.id !== exclude);
  const list = pool.length > 0 ? pool : ROUTES;
  return list[Math.floor(Math.random() * list.length)].id;
}

export function routeById(id: string): Route | undefined {
  return ROUTES.find((r) => r.id === id);
}

/** Rastgele bir liman çiftine yeni sefer. */
export function newPlan(exclude?: string, departedAt = Date.now()): VoyagePlan {
  return { routeId: pickRouteId(exclude), departedAt };
}

/**
 * Planın verdiği anlık durum. Sefer bitmişse (liman süresi dâhil) null döner —
 * çağıran taraf yeni bir plan üretir.
 */
export function resolve(plan: VoyagePlan, nowMs: number): VoyageState | null {
  const route = routeById(plan.routeId);
  if (!route) return null;
  const passage = buildPassage(route);
  const elapsedHours = ((nowMs - plan.departedAt) * TIME_COMPRESSION) / 3600000;
  if (elapsedHours < 0) return null;
  if (elapsedHours > passage.totalHours + PORT_STAY_HOURS) return null;
  const shipTime = new Date(plan.departedAt + elapsedHours * 3600000);
  return stateAt(passage, elapsedHours * route.speedKt, shipTime);
}
