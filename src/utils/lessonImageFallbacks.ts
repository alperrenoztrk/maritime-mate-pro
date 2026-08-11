/**
 * Kategori bazlı konu görseli düzeltme haritası.
 *
 * `LessonTopicDetailPage` ve `LessonTeachCard`, HTTP üzerinden gelen
 * dış kaynaklı veya konuyla ilgisiz görselleri burada tanımlı keyword
 * eşleşmelerine göre yerel asset'lerle değiştirir. Güvenilir bir eşleşme
 * yoksa görsel gizlenir — alakasız bir "dolgu" görseli göstermekten iyidir.
 */

// Navigation
import chartPlotting from "@/assets/navigation/chart-plotting.jpg";
import compass from "@/assets/navigation/compass.svg";
import gpsSatellites from "@/assets/navigation/gps-satellites.svg";
import radarDisplay from "@/assets/navigation/radar-display.svg";
import ecdisDisplay from "@/assets/navigation/ecdis-display.svg";
import tideCurrent from "@/assets/navigation/tide-current.svg";
import mercatorProjection from "@/assets/navigation/mercator-projection.svg";
import greatCircleRhumb from "@/assets/navigation/great-circle-vs-rhumb.svg";
import sextant from "@/assets/navigation/sextant.svg";
import weatherSystems from "@/assets/navigation/weather-systems.svg";
import aisTargets from "@/assets/navigation/ais-targets.svg";
import navtexReceiver from "@/assets/navigation/navtex-receiver.svg";
import autopilotControl from "@/assets/navigation/autopilot-control.svg";
import vhfRadio from "@/assets/navigation/vhf-radio.svg";
import safetyEquipment from "@/assets/navigation/safety-equipment.svg";
import gnomonicProjection from "@/assets/navigation/gnomonic-projection.svg";
import coordinateSystem from "@/assets/navigation/coordinate-system-1.jpg";
import latitudeParallels from "@/assets/navigation/latitude-parallels.jpg";
import longitudeConcept from "@/assets/navigation/longitude-concept.jpg";
import yonCompassRose from "@/assets/navigation/yon-compass-rose.jpg";
import yonWindDrift from "@/assets/navigation/yon-wind-drift.png";
import celestialTriangle from "@/assets/navigation/celestial-triangle.svg";
import ialaLateralMarks from "@/assets/navigation/iala-lateral-marks.svg";
import cardinalMarks from "@/assets/navigation/cardinal-marks.svg";
import safeWaterMark from "@/assets/navigation/safe-water-mark.svg";
import isolatedDangerMark from "@/assets/navigation/isolated-danger-mark.svg";
import sembolLightCharacteristics from "@/assets/navigation/sembol-light-characteristics.jpg";
import sembolRacon from "@/assets/navigation/sembol-racon.jpg";
// Phase B (Tide / UKC) specific local assets
import ruleOfTwelfths from "@/assets/tides/rule-of-twelfths.svg";
import tideTableExcerpt from "@/assets/tides/tide-table-excerpt.svg";
import ukcStack from "@/assets/tides/ukc-stack.svg";
// Meteorology (bkz. src/assets/meteorology/CREDITS.md)
import frontSymbols from "@/assets/meteorology/front-symbols-nws.svg";
import stationModel from "@/assets/meteorology/station-model.svg";
import windBarbs from "@/assets/meteorology/wind-barbs.svg";
import surfaceAnalysis from "@/assets/meteorology/surface-analysis-chart.png";
import pressureCentres from "@/assets/meteorology/pressure-centres-circulation.svg";
import geostrophicWind from "@/assets/meteorology/geostrophic-wind.svg";
import airMass from "@/assets/meteorology/air-mass-source-regions.png";
import beaufortSeaState from "@/assets/meteorology/beaufort-force-8.jpg";
import cycloneEye from "@/assets/meteorology/cyclone-eye-satellite.jpg";
import cycloneSection from "@/assets/meteorology/cyclone-vertical-section.jpg";
import advectionFog from "@/assets/meteorology/advection-fog.jpg";
import worldCurrents from "@/assets/meteorology/world-surface-currents.jpg";

type Fallback = {
  keywords: string[];
  src: string;
  /** Anahtar kelimeyle başlayan ama farklı anlama gelen kelimeler. */
  exclude?: string[];
};

const WORD_CHAR_RE = /[\p{L}\p{N}]/u;

/**
 * Anahtar kelime eşleşmesi: kelime başında olmak zorunda, böylece "eta"
 * "beta"/"theta"/"metadata" içinde, "fix" ise "prefix" içinde eşleşmez.
 *
 * Türkçe eklerin ("enlemler", "trimi") eşleşmeye devam etmesi için sondaki
 * sınır yalnız kısa (≤3 harf) anahtarlarda aranır; "yön" artık "yönetim"
 * içinde eşleşmez.
 */
const matchesKeyword = (haystack: string, keyword: string): boolean => {
  const needle = keyword.toLowerCase().trim();
  if (!needle) return false;

  for (let from = 0; from <= haystack.length; ) {
    const index = haystack.indexOf(needle, from);
    if (index === -1) return false;

    const before = index === 0 ? "" : haystack[index - 1];
    if (!before || !WORD_CHAR_RE.test(before)) {
      if (needle.length > 3) return true;
      const after = haystack[index + needle.length] ?? "";
      if (!after || !WORD_CHAR_RE.test(after)) return true;
    }
    from = index + 1;
  }
  return false;
};

const matchesFallback = (haystack: string, item: Fallback): boolean => {
  if (item.exclude?.some((word) => haystack.includes(word.toLowerCase()))) return false;
  return item.keywords.some((keyword) => matchesKeyword(haystack, keyword));
};

/**
 * Phase B concept overrides — Faz B konularının (ETA, akıntı, gelgit, UKC)
 * kaynak verileri tarihi olarak yanlış görseller içerdiği için dış (http)
 * görseller bu haritaya göre değiştirilir.
 *
 * Yerel görsellere dokunulmaz: onlar içerik dosyalarında elle seçilmiştir ve
 * bölüme burada tahmin edilenden daha uygundur.
 */
const phaseBOverrides: Fallback[] = [
  { keywords: ["onikiler", "twelfth", "12'ler", "12ler"], src: ruleOfTwelfths },
  { keywords: ["tide table", "tidal table", "gelgit tablo", "admiralty tide"], src: tideTableExcerpt },
  { keywords: ["ukc", "under-keel", "under keel", "squat", "barrass"], src: ukcStack },
  { keywords: ["chart datum", "lat (lowest", "sıfır noktası"], src: "/diagrams/navigation/harita-datum.svg" },
  { keywords: ["gelgit", "tide", "tidal", "spring tide", "neap tide"], src: tideCurrent },
  { keywords: ["akıntılı seyir", "set ve drift", "set & drift", "akıntı vektör", "vektör üçgen", "cts (course to steer)", "course to steer"], src: tideCurrent },
  { keywords: ["eta diyagram", "eta hesab", "eta ve seyir", "estimated time of arrival", "calculating the eta", "the eta and"], src: "/diagrams/navigation/eta-diyagrami.svg" },
];

const navigationFallbacks: Fallback[] = [
  { keywords: ["pusula düzelt", "compass correction", "cdmvt", "deviation", "variation"], src: "/diagrams/navigation/pusula-duzeltme.svg" },
  { keywords: ["düzlem seyir", "plane sailing"], src: "/diagrams/navigation/duzlem-seyir.svg" },
  { keywords: ["ölü hesap", "dead reckoning", "parakete mevki"], src: "/diagrams/navigation/olu-hesap.svg" },
  { keywords: ["kural 13", "yetişme", "overtaking"], src: "/diagrams/navigation/kural13-yetisme.svg" },
  { keywords: ["kural 14", "pruva pruvaya", "head-on", "head on"], src: "/diagrams/navigation/kural14-pruva-pruvaya.svg" },
  { keywords: ["kural 15", "aykırı geçiş", "crossing"], src: "/diagrams/navigation/kural15-aykiri-gecis.svg" },
  { keywords: ["gözcülük", "güvenli hız", "lookout", "safe speed"], src: "/diagrams/navigation/kural5-gozculuk.svg" },
  { keywords: ["brm", "bridge resource", "köprüüstü kaynak"], src: "/diagrams/navigation/brm-bilesenleri.svg" },
  { keywords: ["dönüş dairesi", "turning circle", "advance", "transfer", "tactical diameter"], src: "/diagrams/navigation/donus-dairesi.svg" },
  { keywords: ["deniz mili", "nautical mile"], src: "/diagrams/navigation/deniz-mili.svg" },
  { keywords: ["doppler", "parakete"], src: "/diagrams/navigation/doppler-log.svg" },
  { keywords: ["göksel", "celestial", "zenith", "azimut", "azimuth", "yıldız"], src: celestialTriangle },
  { keywords: ["sextant", "sekstant"], src: sextant },
  { keywords: ["mercator", "merkator"], src: mercatorProjection },
  { keywords: ["gnomonic", "great circle", "büyük daire", "loxodrom", "loxodrome", "rhumb", "loksodrom"], src: greatCircleRhumb },
  { keywords: ["gps", "gnss", "satellite", "trilaterasyon", "dop", "hdop", "pdop"], src: gpsSatellites },
  { keywords: ["radar", "arpa"], src: radarDisplay },
  { keywords: ["ecdis"], src: ecdisDisplay },
  { keywords: ["emniyetli su", "safe water"], src: safeWaterMark },
  { keywords: ["izole tehlike", "isolated danger"], src: isolatedDangerMark },
  { keywords: ["kardinal", "cardinal"], src: cardinalMarks },
  {
    keywords: ["lateral", "şamandıra", "iala", "buoy"],
    src: ialaLateralMarks,
    // "buoyancy" (yüzerlik) stabilite kavramıdır, şamandıra değil.
    exclude: ["buoyancy", "buoyant"],
  },
  { keywords: ["racon"], src: sembolRacon },
  { keywords: ["fener karakter", "ışık karakter", "light characteristic", "sektör ışık", "sector light"], src: sembolLightCharacteristics },
  { keywords: ["akıntı", "current", "drift", "set ve drift"], src: tideCurrent },
  {
    keywords: ["chart", "harita", "plot", "mevki", "position", "fix"],
    src: chartPlotting,
    exclude: ["charter", "çarter"],
  },
  {
    keywords: ["compass", "pusula", "bearing", "kerteriz", "yön", "direction", "manyetik", "magnetic"],
    src: yonCompassRose,
    // "yönetim/yönetici/yönerge/yönetmelik" yön kavramı değildir.
    exclude: ["yönet", "yönerge", "yöntem"],
  },
  { keywords: ["enlem", "latitude"], src: latitudeParallels },
  { keywords: ["boylam", "longitude"], src: longitudeConcept },
  { keywords: ["koordinat", "coordinate"], src: coordinateSystem },
  { keywords: ["wind", "rüzg", "leeway", "dalga"], src: yonWindDrift, exclude: ["window", "windlass"] },
  { keywords: ["weather", "meteoroloji"], src: weatherSystems },
  { keywords: ["ais"], src: aisTargets },
  { keywords: ["navtex"], src: navtexReceiver },
  { keywords: ["autopilot"], src: autopilotControl },
  { keywords: ["vhf", "gmdss", "radio"], src: vhfRadio },
  { keywords: ["can yeleği", "can simidi", "lifejacket", "lifebuoy", "emniyet teçhizat"], src: safetyEquipment },
  { keywords: ["projection", "projeksiyon"], src: gnomonicProjection },
  { keywords: ["north", "kuzey"], src: compass },
];

/**
 * Sıra önemlidir: ilk eşleşen kazanır, bu yüzden dar anahtarlar ("wind sea",
 * "barb", "geostrophic") geniş olanlardan ("wind", "rüzg") önce gelir.
 */
const meteorologyFallbacks: Fallback[] = [
  { keywords: ["tehlike", "danger", "solas v"], src: "/diagrams/meteorology/solas-v-tehlike-mesajlari.svg" },
  {
    keywords: ["synoptik", "synoptic", "sinoptik", "izobar", "isobar", "trough", "ridge"],
    src: "/diagrams/meteorology/sinoptik-sembol-lejanti.svg",
  },
  { keywords: ["istasyon modeli", "station model", "station plot"], src: stationModel },
  { keywords: ["barb", "barbül"], src: windBarbs },
  {
    keywords: ["yüzey analiz", "surface analysis", "surface weather map", "hava haritası", "weather map"],
    src: surfaceAnalysis,
  },
  { keywords: ["geostrofik", "geostrophic", "gradyan", "gradient"], src: geostrophicWind },
  { keywords: ["hava kütle", "air mass"], src: airMass },
  { keywords: ["beaufort", "deniz durumu", "sea state"], src: beaufortSeaState },
  {
    keywords: ["dalga", "wave", "swell", "wind sea", "periyot", "period"],
    src: "/diagrams/meteorology/dalga-parametreleri.svg",
  },
  {
    keywords: ["yarım daire", "semicircle", "buys ballot", "buys-ballot", "kaçınma"],
    src: "/diagrams/meteorology/tehlikeli-yarim-daire.svg",
  },
  { keywords: ["eyewall", "eye", "göz"], src: cycloneEye },
  {
    keywords: ["siklon", "cyclone", "tropikal", "tropical", "hurricane", "typhoon", "fırtına"],
    src: cycloneSection,
  },
  { keywords: ["sis", "fog", "görüş", "visibility"], src: advectionFog },
  { keywords: ["akıntı", "current", "drift", "set ve drift"], src: worldCurrents },
  { keywords: ["cephe", "front", "occlu", "oklü"], src: frontSymbols },
  {
    keywords: ["basınç merkez", "alçak basınç", "yüksek basınç", "depression", "anticyclone", "antisiklon"],
    src: pressureCentres,
  },
  { keywords: ["rüzg", "wind", "apparent", "görünen", "true wind"], src: yonWindDrift },
  { keywords: ["weather", "meteoroloji"], src: weatherSystems },
];

const machineFallbacks: Fallback[] = [
  { keywords: ["carnot"], src: "/diagrams/machine/carnot-cevrimi.svg" },
  { keywords: ["pv", "p-v", "p v diyagram"], src: "/diagrams/machine/pv-diyagrami.svg" },
  { keywords: ["dört zamanlı", "4-stroke", "four stroke"], src: "/diagrams/machine/dort-zamanli-dizel.svg" },
  { keywords: ["iki zamanlı", "2-stroke", "two stroke"], src: "/diagrams/machine/iki-zamanli-dizel.svg" },
  { keywords: ["soğut", "refrigerat", "cooling cycle"], src: "/diagrams/machine/sogutucu-cevrimi.svg" },
  { keywords: ["yakıt", "fuel"], src: "/diagrams/machine/yakit-sistemi.svg" },
  { keywords: ["termodinami", "thermo"], src: "/diagrams/machine/termodinamik-sistem.svg" },
  { keywords: ["yangın", "fire triangle"], src: "/diagrams/machine/yangin-ucgeni.svg" },
  { keywords: ["gerilme", "stress", "strain"], src: "/diagrams/machine/gerilme-gerinim.svg" },
];

const communicationFallbacks: Fallback[] = [
  { keywords: ["smcp", "mesaj"], src: "/diagrams/communication/smcp-mesaj-isaretleri.svg" },
  { keywords: ["vhf", "radio", "gmdss"], src: vhfRadio },
  { keywords: ["navtex"], src: navtexReceiver },
];

const stabilityFallbacks: Fallback[] = [
  { keywords: ["serbest yüzey", "free surface"], src: "/diagrams/stability/serbest-yuzey.svg" },
  { keywords: ["metasantr", "metasentr", "metacent"], src: "/diagrams/stability/metasantr-gm.svg" },
  { keywords: ["gz eğri", "gz curve", "statik stabilite eğri"], src: "/diagrams/stability/gz-egrisi.svg" },
  { keywords: ["doğrultma", "righting", "gz"], src: "/diagrams/dogrultma-kolu.svg" },
  { keywords: ["yara", "hasar", "damage"], src: "/diagrams/stability/yara-stabilitesi.svg" },
  { keywords: ["trim", "draft"], src: "/diagrams/stability/trim.svg" },
  { keywords: ["ağırlık merkezi", "gravity"], src: "/diagrams/agirlik-merkezi.svg" },
  { keywords: ["kaldırma", "buoyancy", "arşimet", "yüzerlik", "deplasman"], src: "/diagrams/kaldirma-merkezi.svg" },
  { keywords: ["denge", "equilibrium"], src: "/diagrams/denge-halleri.svg" },
];

const tablesByCategory: Record<string, Fallback[]> = {
  navigation: navigationFallbacks,
  meteorology: meteorologyFallbacks,
  machine: machineFallbacks,
  communication: communicationFallbacks,
  stability: stabilityFallbacks,
};

/**
 * Kategorinin görsel haritası. Tanımsız kategoriler için boş liste döner —
 * eskiden seyir haritasına düşülüyordu ve yük/emniyet/çevre bölümlerine
 * radar, pusula gibi ilgisiz seyir diyagramları atanabiliyordu.
 */
const tableForCategory = (categoryId: string | undefined): Fallback[] => {
  if (!categoryId) return [];
  // Beta/makine alt kategorileri "machine-<slug>" biçiminde gelir.
  if (categoryId.startsWith("machine")) return machineFallbacks;
  return tablesByCategory[categoryId] ?? [];
};

/**
 * Verilen src bir dış (http) görsel ise, kategori + section/topic/alt
 * metni arasında keyword eşleşmesi arar; bulursa yerel asset döner,
 * bulamazsa `undefined` döner (görsel gösterilmez). Dış olmayan src'ler
 * (yerel import, /, data:) olduğu gibi geçirilir.
 */
export const resolveLessonImage = (
  categoryId: string | undefined,
  src: string | undefined,
  sectionTitle: string | undefined,
  topicTitle: string | undefined,
  alt: string | undefined,
  replaceExternal: boolean = true,
): string | undefined => {
  if (!src) return undefined;
  if (!replaceExternal || !src.startsWith("http")) return src;

  const haystack = `${alt ?? ""} ${sectionTitle ?? ""} ${topicTitle ?? ""}`.toLowerCase();

  const phaseB = phaseBOverrides.find((item) => matchesFallback(haystack, item));
  if (phaseB) return phaseB.src;

  const match = tableForCategory(categoryId).find((item) => matchesFallback(haystack, item));
  return match?.src;
};

const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)\)/g;

/**
 * Tekrar denetimi için görselin kimliği.
 *
 * Aynı dosya iki ayrı yolla gelebilir: `src/assets/...` üzerinden import
 * edilince Vite adı hash'ler (`mercator-projection-a1b2c3d4.svg`), aynı dosyanın
 * `public/diagrams/...` kopyası ise düz yolla gelir. Ham metin karşılaştırması
 * bunları farklı sanıp aynı diyagramı iki kez basar; bu yüzden klasör ve hash
 * atılıp yalnız dosya adı üzerinden karşılaştırılır.
 */
export const lessonImageIdentity = (src: string): string =>
  src
    .split(/[?#]/)[0]
    .split("/")
    .pop()!
    .replace(/-[A-Za-z0-9_-]{8,}(\.[A-Za-z0-9]+)$/, "$1")
    .toLowerCase();

/**
 * Bir bölümün markdown metninin GÖSTERECEĞİ görselleri (çözümlenmiş hâlleriyle)
 * döndürür; metni değiştirmez.
 *
 * Çağıran sayfa, konu boyunca hangi görsellerin kullanıldığını biriktirip
 * `normalizeLessonMarkdownImages`'a geçirebilsin diye vardır. Aksi hâlde
 * tekrar denetimi yalnız bölüm içinde çalışır ve aynı diyagram (ör. Mercator)
 * bir konunun ardışık bölümlerinde arka arkaya basılır.
 */
export const collectLessonMarkdownImages = (
  content: string,
  categoryId: string | undefined,
  sectionTitle: string | undefined,
  topicTitle: string | undefined,
): string[] => {
  const found: string[] = [];
  const seen = new Set<string>();
  content.replace(MARKDOWN_IMAGE_RE, (_full, alt: string, src: string) => {
    const resolved = resolveLessonImage(categoryId, src, sectionTitle, topicTitle, alt);
    if (resolved && !seen.has(lessonImageIdentity(resolved))) {
      seen.add(lessonImageIdentity(resolved));
      found.push(resolved);
    }
    return "";
  });
  return found;
};

/**
 * Section markdown metnindeki görselleri normalize eder: dış görseller
 * `resolveLessonImage` ile yerel karşılığına çevrilir, karşılığı olmayanlar
 * ve aynı bölümde tekrar edenler metinden çıkarılır.
 */
export const normalizeLessonMarkdownImages = (
  content: string,
  categoryId: string | undefined,
  sectionTitle: string | undefined,
  topicTitle: string | undefined,
  alreadyUsed: Iterable<string> = [],
): string => {
  const seen = new Set([...alreadyUsed].map(lessonImageIdentity));
  return content.replace(MARKDOWN_IMAGE_RE, (_full, alt: string, src: string) => {
    const resolved = resolveLessonImage(categoryId, src, sectionTitle, topicTitle, alt);
    if (!resolved || seen.has(lessonImageIdentity(resolved))) return "";
    seen.add(lessonImageIdentity(resolved));
    return `![${alt}](${resolved})`;
  });
};
