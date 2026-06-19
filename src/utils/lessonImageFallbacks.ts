/**
 * Kategori bazlı konu görseli düzeltme haritası.
 *
 * `LessonTopicDetailPage` ve `MachineTopicDetailPage`, HTTP üzerinden gelen
 * dış kaynaklı veya konuyla ilgisiz görselleri burada tanımlı keyword
 * eşleşmelerine göre yerel asset'lerle değiştirir.
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

type Fallback = { keywords: string[]; src: string };

const navigationFallbacks: Fallback[] = [
  { keywords: ["pusula düzelt", "compass correction", "cdmvt", "deviation", "variation"], src: "/diagrams/navigation/pusula-duzeltme.svg" },
  { keywords: ["düzlem seyir", "plane sailing"], src: "/diagrams/navigation/duzlem-seyir.svg" },
  { keywords: ["sextant", "sekstant"], src: sextant },
  { keywords: ["mercator", "merkator"], src: mercatorProjection },
  { keywords: ["gnomonic", "great circle", "büyük daire", "loxodrom", "loxodrome", "rhumb", "loksodrom"], src: greatCircleRhumb },
  { keywords: ["gps", "gnss", "satellite", "trilaterasyon", "dop", "hdop", "pdop"], src: gpsSatellites },
  { keywords: ["radar", "arpa"], src: radarDisplay },
  { keywords: ["ecdis"], src: ecdisDisplay },
  { keywords: ["tide", "gelgit", "tidal", "set", "drift"], src: tideCurrent },
  { keywords: ["chart", "harita", "plot", "mevki", "position", "fix"], src: chartPlotting },
  { keywords: ["compass", "pusula", "bearing", "yön", "true", "manyetik"], src: yonCompassRose },
  { keywords: ["enlem", "latitude"], src: latitudeParallels },
  { keywords: ["boylam", "longitude"], src: longitudeConcept },
  { keywords: ["koordinat", "coordinate"], src: coordinateSystem },
  { keywords: ["wind", "rüzg", "leeway", "dalga"], src: yonWindDrift },
  { keywords: ["weather", "meteoroloji"], src: weatherSystems },
  { keywords: ["ais"], src: aisTargets },
  { keywords: ["navtex"], src: navtexReceiver },
  { keywords: ["autopilot"], src: autopilotControl },
  { keywords: ["vhf", "gmdss", "radio"], src: vhfRadio },
  { keywords: ["squat", "ukc", "emniyet"], src: safetyEquipment },
  { keywords: ["projection", "projeksiyon"], src: gnomonicProjection },
  { keywords: ["north", "kuzey"], src: compass },
];

const meteorologyFallbacks: Fallback[] = [
  { keywords: ["tehlike", "danger", "solas v"], src: "/diagrams/meteorology/solas-v-tehlike-mesajlari.svg" },
  { keywords: ["rüzg", "wind", "apparent", "görünen", "true wind"], src: yonWindDrift },
  { keywords: ["weather", "front", "cephe", "depression", "alçak basınç", "yüksek basınç"], src: weatherSystems },
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

const tablesByCategory: Record<string, Fallback[]> = {
  navigation: navigationFallbacks,
  meteorology: meteorologyFallbacks,
  machine: machineFallbacks,
  communication: communicationFallbacks,
};

const defaultByCategory: Record<string, string> = {
  navigation: chartPlotting,
  meteorology: weatherSystems,
  machine: "/diagrams/machine/termodinamik-sistem.svg",
  communication: vhfRadio,
};

/**
 * Verilen src bir dış (http) görsel ise, kategori + section/topic/alt
 * metni arasında keyword eşleşmesi arar; bulursa yerel asset döner.
 * Dış olmayan src'ler (yerel import, /, data:) olduğu gibi geçirilir.
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
  const table = (categoryId && tablesByCategory[categoryId]) || navigationFallbacks;
  const haystack = `${alt ?? ""} ${sectionTitle ?? ""} ${topicTitle ?? ""}`.toLowerCase();
  const match = table.find((item) =>
    item.keywords.some((k) => haystack.includes(k.toLowerCase())),
  );
  return match?.src ?? defaultByCategory[categoryId ?? ""] ?? chartPlotting;
};
