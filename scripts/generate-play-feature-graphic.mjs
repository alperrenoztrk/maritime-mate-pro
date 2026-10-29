/**
 * Google Play "feature graphic" üreteci — public/play/feature-graphic-1024x500.png
 *
 * Kullanım: npm run assets:play-feature
 *
 * Görsel elle çizilmez; iki kaynaktan türetilir:
 *
 *   - public/maritime-logo.svg → kitap + pusula markası ve `icon-bg` degrade
 *     durakları BİREBİR buradan okunur. Marka hiçbir yerde yeniden çizilmez,
 *     yalnızca ölçeklenip yerleştirilir; ikon değişirse bu görsel de değişir.
 *   - src/index.css → `:root` içindeki `--primary` tasarım belirteci (HSL)
 *     hex'e çevrilip sol üstteki ışık huzmesinde kullanılır.
 *
 * Google'ın kuralları ve bu betiğin onları nasıl garanti ettiği:
 *
 *   - Tam 1024x500 PNG, saydamlık yok → çıktı RGB (color type 2) olarak
 *     kodlanır, yani alfa kanalı dosyada hiç yer almaz. Kodlamadan önce her
 *     pikselin alfası 255 mi diye ayrıca doğrulanır.
 *   - Logo ve metin ortadaki ~%80'de kalmalı (Play bazı yüzeylerde kenarları
 *     kırpar) → kilit (marka + kelime markası + cetvel) tek bir grup olarak
 *     ölçülür, FIT_BOX'a sığacak şekilde ölçeklenip ortalanır ve üretimden
 *     sonra saydam zeminde YENİDEN render edilip piksel piksel taranarak
 *     mürekkebin güvenli kutunun dışına taşmadığı doğrulanır.
 *   - Ekran görüntüsü, sahte cihaz çerçevesi, "Google Play" markası ya da
 *     indirme rozeti yok. Metin yalnızca uygulama adı.
 *
 * Yazı tipi notu: uygulamanın kendi gövde yazı tipi Inter yalnızca woff2
 * olarak paketlendiği için resvg (fontdb) onu yükleyemiyor. Bu yüzden
 * public/og-image.png'nin de üzerinde çalıştığı Arial-metrik aile olan
 * Liberation Sans Bold kullanılıyor — iki pazarlama görselinin kelime markası
 * böylece aynı harf biçimlerini paylaşıyor. Yazı tipi bulunamazsa betik
 * sessizce başka bir aileye düşmez, hata verir.
 */
import { Resvg } from '@resvg/resvg-js';
import { deflateSync } from 'node:zlib';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(root, rel), 'utf8');

const WIDTH = 1024;
const HEIGHT = 500;
const OUT = 'public/play/feature-graphic-1024x500.png';

/** Play'in kırpma payı: logo ve metin ortadaki %80'in dışına çıkamaz. */
const SAFE_FRACTION = 0.8;
const SAFE = {
  left: (WIDTH * (1 - SAFE_FRACTION)) / 2,
  top: (HEIGHT * (1 - SAFE_FRACTION)) / 2,
  right: WIDTH - (WIDTH * (1 - SAFE_FRACTION)) / 2,
  bottom: HEIGHT - (HEIGHT * (1 - SAFE_FRACTION)) / 2,
};

/**
 * Kilidin sığdırılacağı kutu. Güvenli alandan belirgin biçimde dar tutuluyor:
 * güvenli sınıra dayanan bir yerleşim teknik olarak kurala uyar ama sıkışık
 * görünür, ayrıca yazı tipi değişirse payı kalmaz.
 */
const FIT_BOX = { x: 150, y: 96, width: 724, height: 308 };

/** Kilit oranları — marka mürekkebinin yüksekliğine göre. */
const MARK_INK_HEIGHT = 300; // yerel birim; sığdırma sonrası ölçeklenir
const CAP_TO_MARK = 0.3; // kelime markasının versal yüksekliği / marka yüksekliği
const GAP_TO_MARK = 0.22; // marka ile metin arası boşluk
const RULE_THICKNESS_TO_CAP = 0.05;
const RULE_OFFSET_TO_CAP = 0.44; // taban çizgisinin altındaki cetvelin uzaklığı

const APP_NAME = 'Mariner’s Book';

const FONT_CANDIDATES = [
  '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
  '/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf',
  '/usr/share/fonts/liberation-sans/LiberationSans-Bold.ttf',
  '/Library/Fonts/Arial Bold.ttf',
  '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
];

const fail = (message) => {
  console.error(`✗ ${message}`);
  process.exit(1);
};

// ─── Kaynak 1: uygulama ikonu ────────────────────────────────────────────────

const logoSvg = read('public/maritime-logo.svg');

/** `icon-bg` degradesinin duraklarını ikondan aynen alır. */
function readGradientStops(svg, id) {
  const block = svg.match(new RegExp(`<linearGradient id="${id}"[^>]*>([\\s\\S]*?)</linearGradient>`));
  if (!block) fail(`maritime-logo.svg içinde "${id}" degradesi bulunamadı.`);
  const stops = [...block[1].matchAll(/<stop\s+offset="([\d.]+)"\s+stop-color="(#[0-9a-fA-F]{6})"/g)].map(
    (m) => ({ offset: m[1], color: m[2] }),
  );
  if (stops.length < 2) fail(`"${id}" degradesinde beklenen duraklar okunamadı.`);
  return stops;
}

const BG_STOPS = readGradientStops(logoSvg, 'icon-bg');

/**
 * İkonun renk sözlüğünden ödünç alınan tonlar. Sabit yazılıyorlar ama ikonun
 * içinde hâlâ var olduklarını doğruluyoruz: ikon paleti değişirse bu görsel
 * sessizce eski palete yapışıp kalmasın, betik dursun.
 */
const SKY = '#7dd3fc'; // kitabın orta katlama çizgisi
const WAVE_NEAR = '#38bdf8'; // ikondaki üst su hattı
const WAVE_FAR = '#e0f2fe'; // ikondaki alt su hattı
const SHADOW = '#020617'; // ikonun gölge rengi
for (const [name, color] of Object.entries({ SKY, WAVE_NEAR, WAVE_FAR, SHADOW })) {
  if (!logoSvg.includes(color)) {
    fail(`${name} rengi (${color}) artık maritime-logo.svg içinde yok — paleti güncelleyin.`);
  }
}

/**
 * Markayı ikondan ayıklar: <defs> olduğu gibi korunur (degradeler ve gölge
 * filtresi oradan geliyor), tam sayfa arka plan dikdörtgenleri ve ikonun kendi
 * su hattı yolları atılır — bu görselin dalgaları 1024x500 tuvale göre ayrıca
 * çiziliyor. Beklenen düğümler bulunamazsa betik durur.
 */
function extractMark(svg) {
  const defs = svg.match(/<defs>[\s\S]*?<\/defs>/);
  if (!defs) fail('maritime-logo.svg içinde <defs> bloğu bulunamadı.');

  const bodyStart = svg.indexOf('</defs>') + '</defs>'.length;
  let body = svg.slice(bodyStart, svg.lastIndexOf('</svg>'));

  const backgrounds = body.match(/<rect width="1024" height="1024"[^>]*\/>/g);
  if (!backgrounds || backgrounds.length !== 2) {
    fail('İkonun iki tam sayfa arka plan <rect> düğümü beklendiği gibi bulunamadı.');
  }
  for (const rect of backgrounds) body = body.replace(rect, '');

  const waterlines = body.match(/<path d="M0 8\d\d[^>]*\/>/g);
  if (!waterlines || waterlines.length !== 2) {
    fail('İkonun iki su hattı <path> düğümü beklendiği gibi bulunamadı.');
  }
  for (const path of waterlines) body = body.replace(path, '');

  if (!/<circle cx="512" cy="488"/.test(body)) {
    fail('Pusula madalyonu ayıklanan markada bulunamadı — ikon yapısı değişmiş olabilir.');
  }
  return { defs: defs[0], body: body.trim() };
}

const mark = extractMark(logoSvg);

// ─── Kaynak 2: tasarım belirteçleri ──────────────────────────────────────────

/** src/index.css'teki `:root` bloğundan bir HSL belirtecini hex olarak okur. */
function readHslToken(css, token) {
  const rootBlock = css.match(/:root\s*\{[\s\S]*?--primary:[\s\S]*?\n\s*\}/);
  if (!rootBlock) fail('src/index.css içinde --primary taşıyan :root bloğu bulunamadı.');
  const match = rootBlock[0].match(
    new RegExp(`--${token}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`),
  );
  if (!match) fail(`src/index.css içinde --${token} belirteci bulunamadı.`);
  return hslToHex(Number(match[1]), Number(match[2]), Number(match[3]));
}

function hslToHex(h, s, l) {
  const sat = s / 100;
  const lum = l / 100;
  const c = (1 - Math.abs(2 * lum - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lum - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0]
    : h < 120 ? [x, c, 0]
    : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c]
    : h < 300 ? [x, 0, c]
    : [c, 0, x];
  const channel = (v) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}

const PRIMARY = readHslToken(read('src/index.css'), 'primary');

// ─── Yazı tipi ───────────────────────────────────────────────────────────────

const fontFile = FONT_CANDIDATES.find((p) => existsSync(p));
if (!fontFile) {
  fail(
    'Liberation Sans Bold bulunamadı. Debian/Ubuntu: `apt-get install fonts-liberation`.\n' +
      `  Arananlar:\n${FONT_CANDIDATES.map((p) => `    ${p}`).join('\n')}`,
  );
}
const FONT_FAMILY = 'Liberation Sans';
const renderOptions = {
  font: { loadSystemFonts: false, fontFiles: [fontFile], defaultFontFamily: FONT_FAMILY },
  logLevel: 'error',
};

// ─── Ölçüm ───────────────────────────────────────────────────────────────────

/**
 * Verilen SVG'yi saydam zeminde render edip görünür mürekkebin sınır kutusunu
 * piksel taramasıyla bulur. Yazı tipi metriklerini elle varsaymak yerine gerçek
 * çıktıyı ölçtüğümüz için yerleşim, yazı tipi değişse bile doğru kalır.
 */
function measureInk(svg, alphaThreshold = 4) {
  const image = new Resvg(svg, renderOptions).render();
  const { width, height, pixels } = image;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (pixels[(y * width + x) * 4 + 3] > alphaThreshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) fail('Ölçüm için render edilen katmanda hiç görünür piksel yok.');
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

const wrap = (w, h, content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${content}</svg>`;

// Marka: kendi 1024 kutusunda ölçülür. Yerleşim ölçümü gölge filtresi OLMADAN
// yapılıyor — yumuşak gölge kitabın altına taştığı için mürekkep kutusunun
// merkezini aşağı çekiyor ve kelime markası optik olarak alçak duruyordu.
// Görsel yine gölgeyle render ediliyor; taşma denetimi de gerçek render üzerinde.
const SHADOW_FILTER = ' filter="url(#book-shadow)"';
if (!mark.body.includes(SHADOW_FILTER)) {
  fail('İkonun gölge filtresi bulunamadı — ölçüm referansı sessizce kaymasın diye durduruluyor.');
}
const markRefInk = measureInk(
  wrap(1024, 1024, `${mark.defs}${mark.body.replace(SHADOW_FILTER, '')}`),
);

// Kelime markası: büyük bir referans boyda ölçülüp oranlara çevriliyor.
const TEXT_REF_SIZE = 400;
const TEXT_REF_X = 200;
const TEXT_REF_Y = 500;
const textElement = (x, y, size) =>
  `<text x="${x}" y="${y}" font-family="${FONT_FAMILY}" font-size="${size}" font-weight="700"` +
  ` letter-spacing="${(-0.02 * size).toFixed(3)}" fill="#ffffff">${APP_NAME}</text>`;
const textRefInk = measureInk(
  wrap(3200, 800, textElement(TEXT_REF_X, TEXT_REF_Y, TEXT_REF_SIZE)),
);

const textRatio = {
  lsb: (textRefInk.x - TEXT_REF_X) / TEXT_REF_SIZE,
  top: (textRefInk.y - TEXT_REF_Y) / TEXT_REF_SIZE,
  bottom: (textRefInk.y + textRefInk.height - TEXT_REF_Y) / TEXT_REF_SIZE,
  width: textRefInk.width / TEXT_REF_SIZE,
};

// ─── Kilit geometrisi ────────────────────────────────────────────────────────
// Yerel uzay: marka mürekkebinin sol üst köşesi (0, 0).

const markScale = MARK_INK_HEIGHT / markRefInk.height;
const markWidth = markRefInk.width * markScale;
const markOffsetX = -markRefInk.x * markScale;
const markOffsetY = -markRefInk.y * markScale;

const capHeight = MARK_INK_HEIGHT * CAP_TO_MARK;
const fontSize = capHeight / (textRatio.bottom - textRatio.top);
const textWidth = textRatio.width * fontSize;
const textX = markWidth + MARK_INK_HEIGHT * GAP_TO_MARK - textRatio.lsb * fontSize;
const textY = MARK_INK_HEIGHT / 2 - ((textRatio.top + textRatio.bottom) / 2) * fontSize;
const textInkLeft = textX + textRatio.lsb * fontSize;
const textInkTop = textY + textRatio.top * fontSize;
const textInkBottom = textY + textRatio.bottom * fontSize;

const ruleThickness = capHeight * RULE_THICKNESS_TO_CAP;
const ruleY = textInkBottom + capHeight * RULE_OFFSET_TO_CAP;

const lockup = {
  x: 0,
  y: Math.min(0, textInkTop),
  right: Math.max(markWidth, textInkLeft + textWidth),
  bottom: Math.max(MARK_INK_HEIGHT, ruleY + ruleThickness),
};
lockup.width = lockup.right - lockup.x;
lockup.height = lockup.bottom - lockup.y;

const fitScale = Math.min(FIT_BOX.width / lockup.width, FIT_BOX.height / lockup.height);
const fitX = FIT_BOX.x + (FIT_BOX.width - lockup.width * fitScale) / 2 - lockup.x * fitScale;
const fitY = FIT_BOX.y + (FIT_BOX.height - lockup.height * fitScale) / 2 - lockup.y * fitScale;

const lockupSvg =
  `<g transform="translate(${fitX.toFixed(3)} ${fitY.toFixed(3)}) scale(${fitScale.toFixed(6)})">` +
  `<g transform="translate(${markOffsetX.toFixed(3)} ${markOffsetY.toFixed(3)}) scale(${markScale.toFixed(6)})">${mark.body}</g>` +
  textElement(textX.toFixed(3), textY.toFixed(3), fontSize.toFixed(3)) +
  `<rect x="${textInkLeft.toFixed(3)}" y="${ruleY.toFixed(3)}" width="${textWidth.toFixed(3)}"` +
  ` height="${ruleThickness.toFixed(3)}" rx="${(ruleThickness / 2).toFixed(3)}" fill="${SKY}" fill-opacity="0.42"/>` +
  `</g>`;

// ─── Zemin ───────────────────────────────────────────────────────────────────
// Derinlik ikonun `icon-bg` degradesinden geliyor. Doku iki kaynaktan: harita
// arka planındaki (public/nautical-chart-background.svg) kerte hatlarını
// yankılayan soluk çapraz çizgiler ve ikonun kendi su hattı. Kare bir ağ
// denendi ama bu degradenin üzerinde kuşak (banding) gibi okunuyordu.
// Ekran görüntüsü, cihaz çerçevesi ya da rozet yok.

const backdrop = `
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fg-base)"/>
  <g stroke="${SKY}" stroke-opacity="0.07" stroke-width="1" fill="none">
    <path d="M-120 470 L1160 118"/>
    <path d="M-120 620 L1160 268"/>
    <path d="M-120 320 L1160 -32"/>
    <path d="M-120 170 L1160 -182"/>
  </g>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fg-glow)"/>
  <path d="M0 424 C121 388 228 462 349 424 C470 386 577 460 698 422 C793 392 916 400 1024 428 V500 H0 Z"
        fill="${WAVE_NEAR}" opacity="0.11"/>
  <path d="M0 462 C128 428 234 492 362 458 C490 424 596 488 724 454 C822 428 928 434 1024 460 V500 H0 Z"
        fill="${WAVE_FAR}" opacity="0.07"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fg-vignette)"/>`;

const backdropDefs = `
  <linearGradient id="fg-base" x1="0" y1="0" x2="1" y2="1">
    ${BG_STOPS.map((s) => `<stop offset="${s.offset}" stop-color="${s.color}"/>`).join('')}
  </linearGradient>
  <radialGradient id="fg-glow" cx="0.16" cy="0.04" r="0.85">
    <stop offset="0" stop-color="${PRIMARY}" stop-opacity="0.17"/>
    <stop offset="1" stop-color="${PRIMARY}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="fg-vignette" cx="0.5" cy="0.46" r="0.74">
    <stop offset="0.42" stop-color="${SHADOW}" stop-opacity="0"/>
    <stop offset="1" stop-color="${SHADOW}" stop-opacity="0.46"/>
  </radialGradient>`;

const compose = (withBackdrop) =>
  wrap(
    WIDTH,
    HEIGHT,
    `<defs>${mark.defs.replace(/^<defs>|<\/defs>$/g, '')}${withBackdrop ? backdropDefs : ''}</defs>` +
      (withBackdrop ? backdrop : '') +
      lockupSvg,
  );

// ─── PNG kodlama (RGB, alfa kanalı yok) ──────────────────────────────────────

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function pngChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

/**
 * RGBA piksellerini alfa kanalı OLMAYAN bir PNG'ye (color type 2) kodlar —
 * Play "saydamlık yok" istiyor, biz de kanalı hiç yazmayarak bunu dosya
 * düzeyinde garanti ediyoruz. Satır başına en ucuz süzgeç seçilir (libpng'nin
 * mutlak-değer-toplamı sezgiseli).
 */
function encodeOpaquePng(pixels, width, height) {
  const BPP = 3;
  const stride = width * BPP;
  const raw = Buffer.alloc(height * (stride + 1));
  const current = Buffer.alloc(stride);
  let previous = Buffer.alloc(stride);
  const candidate = Buffer.alloc(stride);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const src = (y * width + x) * 4;
      current[x * BPP] = pixels[src];
      current[x * BPP + 1] = pixels[src + 1];
      current[x * BPP + 2] = pixels[src + 2];
    }

    let bestType = 0;
    let bestScore = Infinity;
    let best = Buffer.alloc(stride);
    for (let type = 0; type <= 4; type++) {
      let score = 0;
      for (let i = 0; i < stride; i++) {
        const a = i >= BPP ? current[i - BPP] : 0;
        const b = previous[i];
        const c = i >= BPP ? previous[i - BPP] : 0;
        let value;
        if (type === 0) value = current[i];
        else if (type === 1) value = current[i] - a;
        else if (type === 2) value = current[i] - b;
        else if (type === 3) value = current[i] - ((a + b) >> 1);
        else {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          value = current[i] - (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
        }
        candidate[i] = value & 0xff;
        score += candidate[i] < 128 ? candidate[i] : 256 - candidate[i];
      }
      if (score < bestScore) {
        bestScore = score;
        bestType = type;
        candidate.copy(best);
      }
    }

    raw[y * (stride + 1)] = bestType;
    best.copy(raw, y * (stride + 1) + 1);
    previous.set(current);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit derinliği
  ihdr[9] = 2; // color type 2 = truecolor, alfa yok
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ─── Üretim ve doğrulama ─────────────────────────────────────────────────────

const rendered = new Resvg(compose(true), renderOptions).render();
if (rendered.width !== WIDTH || rendered.height !== HEIGHT) {
  fail(`Beklenen ${WIDTH}x${HEIGHT}, üretilen ${rendered.width}x${rendered.height}.`);
}

// `pixels` bir getter: her okumada tamponu yeniden kuruyor, bu yüzden bir kez
// alınıp yeniden kullanılıyor (döngü içinde okumak süreci şişiriyor).
const renderedPixels = rendered.pixels;
for (let i = 3; i < renderedPixels.length; i += 4) {
  if (renderedPixels[i] !== 255) {
    fail('Tuvalde saydam piksel var — zemin katmanı tüm alanı kaplamıyor.');
  }
}

// Kilidin mürekkebi: aynı dönüşümle, zemin olmadan render edilip taranıyor.
const round = (n) => String(Math.round(n));
const inkBox = measureInk(compose(false));
const inside =
  inkBox.x >= SAFE.left &&
  inkBox.y >= SAFE.top &&
  inkBox.x + inkBox.width <= SAFE.right &&
  inkBox.y + inkBox.height <= SAFE.bottom;
if (!inside) {
  fail(
    `Logo/metin güvenli alanın dışına taşıyor.\n` +
      `  mürekkep: x ${round(inkBox.x)}–${round(inkBox.x + inkBox.width)},` +
      ` y ${round(inkBox.y)}–${round(inkBox.y + inkBox.height)}\n` +
      `  güvenli : x ${round(SAFE.left)}–${round(SAFE.right)}, y ${round(SAFE.top)}–${round(SAFE.bottom)}`,
  );
}

const png = encodeOpaquePng(renderedPixels, WIDTH, HEIGHT);
mkdirSync(join(root, dirname(OUT)), { recursive: true });
writeFileSync(join(root, OUT), png);

const pad = (n) => round(n).padStart(4);
console.log(`✓ ${OUT}`);
console.log(`  boyut      ${WIDTH}x${HEIGHT}, ${(png.length / 1024).toFixed(1)} KB, alfa kanalı yok`);
console.log(`  yazı tipi  ${fontFile}`);
console.log(`  zemin      ${BG_STOPS.map((stop) => stop.color).join(' → ')}  (maritime-logo.svg · #icon-bg)`);
console.log(`  ışık       ${PRIMARY}  (src/index.css · --primary)`);
console.log(`  mürekkep   x ${pad(inkBox.x)}–${pad(inkBox.x + inkBox.width)}   y ${pad(inkBox.y)}–${pad(inkBox.y + inkBox.height)}`);
console.log(`  güvenli    x ${pad(SAFE.left)}–${pad(SAFE.right)}   y ${pad(SAFE.top)}–${pad(SAFE.bottom)}  (%${SAFE_FRACTION * 100})`);
