#!/usr/bin/env node
/**
 * Meteoroloji ders görsellerini Wikimedia Commons'tan indirir.
 *
 * `scripts/fetch_commons_pd_url.mjs` ile aynı fikirden gelir, ama iki kritik
 * farkı vardır:
 *
 *  1. ARAMA YAPMAZ. Aşağıdaki MANIFEST elle küratörlenmiştir. Commons tam
 *     metin araması bu alanda güvenilmezdir — "isobar map" sorgusu bir şirket
 *     logosunu ("ISOBAR LOGO RGB POS.jpg"), "air mass source regions" sorgusu
 *     "Afghan Commandos 2010.jpg" dosyasını ilk sırada döndürür. Konu dışı bir
 *     "dolgu" görseli, görselsizlikten kötüdür (bkz. utils/lessonImageFallbacks.ts).
 *
 *  2. LİSANSI DOĞRULAR. Her dosyanın extmetadata lisansı okunur; PD / CC0 /
 *     CC BY / CC BY-SA dışında bir şey görürse süreç hata ile durur. Böylece
 *     mağaza dağıtımına uygun olmayan bir dosya sessizce depoya giremez.
 *
 * Büyük rasterlar orijinal boyutta değil, `thumbWidth` ile ölçeklenmiş olarak
 * indirilir (APK/IPA boyutu). SVG'ler her zaman orijinal alınır.
 *
 * Kullanım:
 *   node scripts/fetch-meteorology-images.mjs           # eksikleri indir
 *   node scripts/fetch-meteorology-images.mjs --force   # hepsini yeniden indir
 *
 * Not: Bu depo bir ajan proxy'si arkasında çalışabilir. Node'un yerleşik
 * fetch'i proxy'yi ancak NODE_USE_ENV_PROXY=1 ile kullanır:
 *   NODE_USE_ENV_PROXY=1 node scripts/fetch-meteorology-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
/** Manifestte `dir` verilmezse görsel bu klasöre yazılır. */
const DEFAULT_DIR = "meteorology";
const assetDir = (dir) => path.join(root, "src/assets", dir);

const UA =
  "MaritimeMateProBot/1.0 (https://github.com/alperrenoztrk/maritime-mate-pro; nauticalleapapps@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const THROTTLE_MS = 1400; // Commons hız sınırı: daha hızlısı 429/HTML döndürür

/** İzin verilen lisanslar. Bunun dışındaki her şey süreci durdurur. */
const ALLOWED_LICENSE = /^(public domain|cc0|cc[ -]by([ -]sa)?([ -][\d.]+.*)?)$/i;

/**
 * Küratörlü liste. Her satır Commons'ta elle açılıp konuya uygunluğu ve
 * lisansı doğrulanmıştır.
 *
 *   commons    — Commons dosya başlığı ("File:" öneki olmadan)
 *   file       — src/assets/meteorology/ altına yazılacak ad
 *   thumbWidth — raster için hedef genişlik (SVG'lerde yok sayılır)
 */
const MANIFEST = [
  // ── Synoptik harita sembolleri ────────────────────────────────────────────
  // NWS'in resmî cephe sembolü levhası — "Cephe tipleri" konusunda kullanılır.
  // Tekil sembol dosyaları (Cold/Warm/Occluded/Stationary front symbol.svg)
  // bilerek indirilmiyor: bileşik lejant `symbol-legend-synoptic.svg` içinde
  // aynı NWS geometrisi doğrudan çizildi, ayrı dosyalar ölü ağırlık olurdu.
  { commons: "NWS weather fronts.svg", file: "front-symbols-nws.svg" },
  // İstasyon modeli ve rüzgâr barb'ı.
  { commons: "Station model fr.svg", file: "station-model.svg" },
  { commons: "Wind barbs.svg", file: "wind-barbs.svg" },
  // Gerçek bir yüzey analiz haritası — sembollerin sahadaki karşılığı.
  { commons: "2018-04-30 Surface Weather Map NOAA.png", file: "surface-analysis-chart.png", thumbWidth: 1100 },

  // ── Basınç, izobar, hava kütlesi ──────────────────────────────────────────
  { commons: "High and low pressure N and S.svg", file: "pressure-centres-circulation.svg" },
  { commons: "Geostrophic Wind Diagram.svg", file: "geostrophic-wind.svg" },
  { commons: "Airmassesorigin.png", file: "air-mass-source-regions.png", thumbWidth: 600 },

  // ── Rüzgâr / deniz durumu ─────────────────────────────────────────────────
  { commons: "Beaufort scale 4.jpg", file: "beaufort-force-4.jpg", thumbWidth: 800 },
  { commons: "Beaufort scale 8.jpg", file: "beaufort-force-8.jpg", thumbWidth: 800 },
  { commons: "Beaufort scale 11.jpg", file: "beaufort-force-11.jpg", thumbWidth: 800 },

  // ── Tropik siklon ─────────────────────────────────────────────────────────
  { commons: "Yutu 2018-10-28 0515Z (alternate).jpg", file: "cyclone-eye-satellite.jpg", thumbWidth: 800 },
  {
    commons: "PSM V16 D312 Vertical sections of the heart of a cyclone.jpg",
    file: "cyclone-vertical-section.jpg",
    thumbWidth: 1000,
  },
  // Not: "Typhoonsizes.svg" (CC0) uygun içerikteydi ama 764 KB — tek bir ders
  // görseli için APK/IPA'ya taşınamayacak kadar ağır, bu yüzden alınmıyor.
  { commons: "BuysBallot en.svg", file: "buys-ballot-law.svg" },

  // ── Görüş / sis ───────────────────────────────────────────────────────────
  { commons: "Golden Gate Bridge fog. (51733986116).jpg", file: "advection-fog.jpg", thumbWidth: 1000 },

  // ── Akıntı ────────────────────────────────────────────────────────────────
  {
    commons: "Admiralty Chart No 5310 The World General Surface Current Circulation, Published 1949.jpg",
    file: "world-surface-currents.jpg",
    // Detaylı bir seyir haritası; okunabilirlik için diğerlerinden geniş.
    thumbWidth: 1100,
  },

  // ══ Diğer dersler → src/assets/lessons/ ═══════════════════════════════════
  // Haberleşme
  { dir: "lessons", commons: "Sbeacons.jpg", file: "epirb-sart.jpg", thumbWidth: 720 },
  { dir: "lessons", commons: "ICS-flags.png", file: "signal-flags-chart.png", thumbWidth: 540 },
  // Gemicilik
  {
    dir: "lessons",
    commons: "Jakobsleiter IMG 3508.JPG",
    file: "pilot-ladder.jpg",
    thumbWidth: 800,
  },
  {
    dir: "lessons",
    commons: "42 (tugboat, 2012) towing Genius Star through the Port of Antwerp pic1.JPG",
    file: "tug-assisting.jpg",
    thumbWidth: 1000,
  },
  // Yük
  { dir: "lessons", commons: "LNG-carrier.Galea.wmt.jpg", file: "lng-carrier.jpg", thumbWidth: 1000 },
  // Çevre
  {
    dir: "lessons",
    commons: "Oil spill drill 140408-N-WF272-031.jpg",
    file: "oil-spill-response.jpg",
    thumbWidth: 1000,
  },
  // Seyir
  {
    dir: "lessons",
    commons:
      "The view aft from a Royal Navy destroyer on an escort patrol in heavy seas in the Atlantic, October 1941. A5677.jpg",
    file: "heavy-weather.jpg",
    thumbWidth: 1000,
  },
  {
    dir: "lessons",
    commons: "Icebreakers Louis S. St-Laurent and Healy in the Arctic Ocean.jpg",
    file: "polar-ice-navigation.jpg",
    thumbWidth: 1000,
  },
];

/**
 * İndirilen SVG'lerdeki yabancı dildeki etiketleri İngilizce'ye çevirir.
 *
 * Depodaki tüm diyagramlar İngilizce `<text>` kullanır; çalışma anındaki çeviri
 * katmanı (utils/pageTranslator.ts) bu düğümleri kullanıcının diline çevirir.
 * Ayrıca `scripts/check-svg-text-fit.mjs` İngilizce dışı kalıntı metni denetler.
 *
 * Çeviri indirmenin hemen ardından uygulanır; böylece `--force` ile sıfırdan
 * indirildiğinde de sonuç aynı olur (varlıklar yeniden üretilebilir kalır).
 * Anahtarlar, kaynak dosyadaki satır bölünmesiyle birebir eşleşmelidir.
 */
const LABEL_TRANSLATIONS = {
  // NWS levhası dokuz cepheyi yalnızca "1".."9" ile etiketler; anahtar listesi
  // ise render EDİLMEYEN <desc> içindedir. Ders görseli olarak tek başına
  // durabilmesi için numaralar adlarla değiştirilir (yazı boyutu RAW_PATCHES
  // ile 60 px'lik sütun aralığına sığacak şekilde küçültülür).
  "front-symbols-nws.svg": {
    1: "Cold",
    2: "Warm",
    3: "Stationary",
    4: "Occluded",
    5: "Trough",
    6: "Squall line",
    7: "Dry line",
    8: "Trop. wave",
    9: "Trowal",
  },
  "station-model.svg": {
    "Types de nuages": "High cloud",
    "élevés (cirrus)": "type (cirrus)",
    "Types de nuage": "Middle cloud",
    "de niveau moyen": "type",
    "Pression au niveau de": "Sea-level",
    "la mer": "pressure",
    "(147 = 1014,7 Hpa)": "(147 = 1014.7 hPa)",
    "Variation de pression": "Pressure change",
    "des 3 dernières": "over the past",
    "heures(2,8 HPa)": "3 hours (2.8 hPa)",
    Tendance: "Tendency",
    "(à la hausse constante)": "(rising steadily)",
    "Temps dans les": "Past weather",
    "dernières 6 heures": "(last 6 hours)",
    "(pluie)": "(rain)",
    "Variation (+ ou -)": "Change (+ or -)",
    "Quantité de pluie": "Precipitation",
    "durant cette période": "in that period",
    "(6,5 mm)": "(6.5 mm)",
    "Nombre d'octas couvert": "Low cloud amount",
    "par les nuages bas": "in oktas",
    "Base des nuages bas": "Low cloud base",
    "(2= 300 à 599 pieds)": "(2 = 300-599 feet)",
    "Type de nuages": "Low cloud",
    "bas (stratus)": "type (stratus)",
    "Point de rosée": "Dew point",
    "Temps actuel": "Present weather",
    "(neige faible)": "(light snow)",
    "Visibilité horitontale": "Horizontal visibility",
    "(3/4 milles)": "(3/4 mile)",
    "Température (C)": "Temperature (C)",
    "Direction du vent": "Wind direction",
    "(nord-ouest)": "(north-west)",
    "Barbules indiquant": "Barbs showing",
    "la force du vents": "wind speed",
    "(20 noeuds)": "(20 knots)",
    "Couverture nuageuse": "Total cloud cover",
    "totale en octats": "in oktas",
  },
};

/**
 * Etiket dışı düzeltmeler. Uzun cephe adlarının 60 px'lik sütun aralığına
 * sığması için yazı boyutu küçültülür ve satır biraz aşağı alınır.
 */
const RAW_PATCHES = {
  "front-symbols-nws.svg": [
    ['font-size="20" font-weight="bold" transform="translate(1,260)"', 'font-size="11" transform="translate(1,262)"'],
  ],
};

/** SVG `<text>`/`<tspan>` düğüm içeriklerini sözlüğe göre değiştirir. */
function translateLabels(dest, file) {
  const map = LABEL_TRANSLATIONS[file];
  const raw = RAW_PATCHES[file];
  if (!map && !raw) return 0;
  const original = fs.readFileSync(dest, "utf8");
  let replaced = 0;
  let updated = original;

  for (const [from, to] of raw ?? []) {
    if (!updated.includes(from)) {
      throw new Error(`${file}: beklenen kalıp bulunamadı — kaynak dosya değişmiş olabilir: ${from}`);
    }
    updated = updated.replace(from, to);
    replaced++;
  }
  if (!map) {
    fs.writeFileSync(dest, updated);
    return replaced;
  }

  updated = updated.replace(
    /(<(?:text|tspan)\b[^>]*>)([^<]+)(<\/(?:text|tspan)>)/g,
    (whole, open, inner, close) => {
      const hit = map[inner.trim()];
      if (hit === undefined) return whole;
      replaced++;
      return `${open}${hit}${close}`;
    },
  );
  if (replaced) fs.writeFileSync(dest, updated);
  return replaced;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const strip = (html) => (html || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function api(params) {
  const url = `${API}?format=json&${new URLSearchParams(params)}`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      // Hız sınırına takıldık: Commons JSON yerine düz metin/HTML döndürür.
      await sleep(2500 * (attempt + 1));
    }
  }
  throw new Error(`Commons API yanıt vermedi: ${params.titles ?? ""}`);
}

/**
 * imageinfo + lisans verisini çeker.
 *
 * `iiurlwidth` istek başına tek bir değer alır, bu yüzden manifest önce hedef
 * genişliğe göre gruplanır. Dönen `thumburl` OLDUĞU GİBİ kullanılır — Commons
 * bazı dosyalarda istenen genişliği standart bir basamağa yuvarlar (1000 →
 * 1280) ve yalnızca o genişlik sunulur; URL'deki `<N>px-` bölümünü elle
 * yeniden yazmak HTTP 400 döndürür.
 */
async function fetchInfo(entries) {
  const byTitle = new Map();
  const groups = new Map();
  for (const entry of entries) {
    const key = entry.thumbWidth ?? 0;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  }

  for (const [width, group] of groups) {
    for (let i = 0; i < group.length; i += 20) {
      const chunk = group.slice(i, i + 20);
      const json = await api({
        action: "query",
        titles: chunk.map((e) => `File:${e.commons}`).join("|"),
        prop: "imageinfo",
        iiprop: "url|size|mime|extmetadata",
        ...(width ? { iiurlwidth: String(width) } : {}),
      });
      for (const page of Object.values(json.query?.pages ?? {})) {
        byTitle.set(page.title.replace(/^File:/, ""), page.imageinfo?.[0] ?? null);
      }
      await sleep(THROTTLE_MS);
    }
  }
  return byTitle;
}

/**
 * upload.wikimedia.org hem 429 (hız sınırı) hem de henüz üretilmemiş
 * küçük resimlerde 400 döndürebilir; ikisi de yeniden denemeyle geçer.
 * Bu yüzden artan bekleme ile birkaç kez denenir.
 */
async function download(url, dest) {
  let lastError;
  for (let attempt = 0; attempt < 5; attempt++) {
    if (attempt) await sleep(3000 * attempt);
    let res;
    try {
      res = await fetch(url, { headers: { "User-Agent": UA } });
    } catch (err) {
      lastError = err;
      continue;
    }
    if (!res.ok) {
      lastError = new Error(`HTTP ${res.status} — ${url}`);
      if (res.status === 404) break; // yeniden denemek anlamsız
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 200) {
      lastError = new Error(`şüpheli derecede küçük dosya (${buf.length} B) — ${url}`);
      continue;
    }
    fs.writeFileSync(dest, buf);
    return buf.length;
  }
  throw lastError;
}

async function main() {
  const force = process.argv.includes("--force");
  for (const dir of new Set(MANIFEST.map((e) => e.dir ?? DEFAULT_DIR))) {
    fs.mkdirSync(assetDir(dir), { recursive: true });
  }

  console.log(`Commons'tan ${MANIFEST.length} görsel alınıyor → src/assets/\n`);
  const info = await fetchInfo(MANIFEST);

  /** @type {Record<string, object[]>} klasör -> kredi satırları */
  const creditsByDir = {};
  const failures = [];

  for (const entry of MANIFEST) {
    const meta = info.get(entry.commons);
    if (!meta) {
      failures.push(`${entry.commons}: Commons'ta bulunamadı`);
      continue;
    }

    const license = strip(meta.extmetadata?.LicenseShortName?.value) || "?";
    if (!ALLOWED_LICENSE.test(license)) {
      failures.push(`${entry.commons}: izin verilmeyen lisans "${license}"`);
      continue;
    }

    // SVG için thumburl bir PNG render'ıdır; vektörü korumak adına orijinal alınır.
    const isSvg = meta.mime === "image/svg+xml";
    const url = isSvg || !entry.thumbWidth ? meta.url : meta.thumburl || meta.url;
    const dir = entry.dir ?? DEFAULT_DIR;
    const dest = path.join(assetDir(dir), entry.file);

    let size = fs.existsSync(dest) ? fs.statSync(dest).size : 0;
    let translated = 0;
    if (force || !size) {
      try {
        await download(url.split("?")[0], dest);
        translated = translateLabels(dest, entry.file);
        size = fs.statSync(dest).size;
        await sleep(THROTTLE_MS);
      } catch (err) {
        failures.push(`${entry.commons}: ${err.message}`);
        continue;
      }
    }

    const artist = strip(meta.extmetadata?.Artist?.value) || "—";
    (creditsByDir[dir] ??= []).push({
      file: entry.file,
      commons: entry.commons,
      artist: artist.length > 60 ? `${artist.slice(0, 57)}…` : artist,
      license,
    });
    const note = translated ? `  (${translated} etiket İngilizce'ye çevrildi)` : "";
    console.log(
      `  ✓ ${`${dir}/${entry.file}`.padEnd(44)} ${String(Math.round(size / 1024)).padStart(5)} KB  ${license}${note}`,
    );
  }

  let total = 0;
  for (const [dir, rows] of Object.entries(creditsByDir)) {
    writeCredits(dir, rows);
    total += rows.length;
    console.log(`  · krediler yazıldı: src/assets/${dir}/CREDITS.md`);
  }

  if (failures.length) {
    console.error(`\n${failures.length} dosya alınamadı:`);
    failures.forEach((f) => console.error(`  ✗ ${f}`));
    process.exitCode = 1;
    return;
  }
  console.log(`\n${total} görsel hazır.`);
}

/** Klasör başına ek açıklama (elle çizilen diyagramlar vb.). */
const CREDITS_FOOTER = {
  meteorology: [
    "## Elle çizilen diyagramlar",
    "",
    "Serbest lisanslı uygun bir karşılığı bulunmayan konular için diyagramlar",
    "depo içinde `public/diagrams/meteorology/` altında çizilmiştir:",
    "",
    "| Dosya | Konu |",
    "| --- | --- |",
    "| `sinoptik-sembol-lejanti.svg` | İzobar, alçak/yüksek merkez, dört cephe tipi, trough ve ridge sembolleri (NWS sembol geometrisi esas alındı) |",
    "| `tehlikeli-yarim-daire.svg` | Tropik siklonun tehlikeli ve seyredilebilir yarım daireleri |",
    "| `dalga-parametreleri.svg` | Dalga yüksekliği/boyu/periyodu ve wind sea – swell ayrımı |",
  ],
};

const CREDITS_TITLE = {
  meteorology: "Meteoroloji Görselleri",
  lessons: "Ders Görselleri (Yük, Emniyet, Gemicilik, Haberleşme, Çevre)",
};

function writeCredits(dir, rows) {
  const lines = [
    `# ${CREDITS_TITLE[dir] ?? dir} — Kaynaklar ve Lisanslar`,
    "",
    "Bu klasördeki görseller Wikimedia Commons'tan `scripts/fetch-lesson-images.mjs`",
    "ile indirilmiştir. Script yalnızca Public Domain / CC0 / CC BY / CC BY-SA lisanslı",
    "dosyaları kabul eder; başka bir lisans görürse hata verip durur.",
    "",
    "CC BY / CC BY-SA lisanslı görsellerde atıf zorunludur; kaynak sayfa",
    "bağlantıları üzerinden lisans metinlerine ulaşılabilir.",
    "",
    "Yeniden üretmek için:",
    "",
    "```bash",
    "NODE_USE_ENV_PROXY=1 node scripts/fetch-lesson-images.mjs",
    "```",
    "",
    "| Dosya | Kaynak (Wikimedia Commons) | Yükleyen / Fotoğrafçı | Lisans |",
    "| --- | --- | --- | --- |",
  ];
  for (const r of rows) {
    const url = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(r.commons.replace(/ /g, "_"))}`;
    lines.push(`| \`${r.file}\` | [${r.commons}](${url}) | ${r.artist} | ${r.license} |`);
  }
  const footer = CREDITS_FOOTER[dir];
  if (footer) lines.push("", ...footer);
  lines.push("");
  fs.writeFileSync(path.join(assetDir(dir), "CREDITS.md"), lines.join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
