// Uygulama ikonu, splash ve mağaza görsellerini resources/ altındaki logo
// kaynaklarından üretir.
// Kullanım: npm run assets:generate
//
// Kaynaklar (tek doğru kaynak — ikon değişecekse bunlar değişir):
//   resources/icon-mark.png   → amblem (pusula + gemi + kitap), şeffaf zemin
//   resources/logo-full.png   → amblem + "Mariner's Book" yazısı, şeffaf zemin
//   resources/logo-source.png → orijinal marka dosyası (referans; build kullanmaz)
//
// Not: @capacitor/assets bu ortamda kullanılamadığı için (sharp'ın libvips
// indirme adımı proxy arkasında engelleniyor) aynı çıktı seti @resvg/resvg-js
// ile üretilir. Rasterler SVG içine base64 gömülerek ölçeklenir; resvg dış
// dosya referanslarını yüklemez.
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const BG_TOP = '#0e5f91';
const BG_BOTTOM = '#061d3d';
// Logonun kendi zemini beyaz: amblemin iç boşlukları (kitap sayfaları, gemi
// hatları) şeffaf olduğu için ikon zemini açık renk olmak zorunda. Koyu zeminde
// şekiller birbirine karışır.
const ICON_BG = '#ffffff';

function loadArt(relPath) {
  const buf = readFileSync(join(root, relPath));
  // PNG başlığından genişlik/yükseklik (IHDR, 16. bayttan itibaren).
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { href: `data:image/png;base64,${buf.toString('base64')}`, width, height };
}

const mark = loadArt('resources/icon-mark.png');
const logoFull = loadArt('resources/logo-full.png');

// Sanat eserini verilen kutuya en-boy oranını koruyarak ortalar.
function artEl(art, boxX, boxY, boxW, boxH) {
  const k = Math.min(boxW / art.width, boxH / art.height);
  const w = art.width * k;
  const h = art.height * k;
  return `<image href="${art.href}" x="${boxX + (boxW - w) / 2}" y="${boxY + (boxH - h) / 2}" width="${w}" height="${h}"/>`;
}

// scale: amblemin ikon kenarına oranı. 0.72 hem maskeli (maskable/adaptive)
// hem de normal gösterimde güvenli alanda kalır.
function iconSvg(scale = 0.72, { background = ICON_BG, filter = '' } = {}) {
  const box = 1024 * scale;
  const inset = (1024 - box) / 2;
  const bg = background ? `<rect width="1024" height="1024" fill="${background}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
    ${filter}
    <g${filter ? ' filter="url(#variant)"' : ''}>
      ${bg}
      ${artEl(mark, inset, inset, box, box)}
    </g>
  </svg>`;
}

function render(svg, size) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
}

function renderIcon(size, scale = 0.72) {
  return render(iconSvg(scale), size);
}

// iOS "tinted" ana ekranda görselin parlaklığını kullanır: beyaz zeminli ikonu
// gri tonlayıp tersleyince amblem açık, zemin koyu olur — sistem tonlaması bu
// siluetle çok daha iyi çalışır. ("dark" varyantı beyaz zeminli ikonun aynısı:
// amblemin iç boşlukları koyu zeminde okunmuyor.)
const TINT_FILTER = `<filter id="variant" color-interpolation-filters="sRGB">
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncR type="table" tableValues="1 0"/>
        <feFuncG type="table" tableValues="1 0"/>
        <feFuncB type="table" tableValues="1 0"/>
      </feComponentTransfer>
    </filter>`;

function renderTintedIcon(size) {
  return render(iconSvg(0.72, { filter: TINT_FILTER }), size);
}

// Adaptif ikon foreground'u: içerik Android'in %66 güvenli alanına sığacak
// şekilde küçültülür, zemin şeffaf kalır (renk @color/ic_launcher_background).
function renderForeground(size) {
  return render(iconSvg(0.6, { background: null }), size);
}

// Splash: degrade arka plan + ortada beyaz kart içinde tam logo. Kart şart:
// logo koyu lacivert, degrade zeminde doğrudan okunmuyor.
function renderSplash(w, h) {
  const logoW = Math.min(w * 0.45, h * 0.62 * (logoFull.width / logoFull.height));
  const logoH = logoW * (logoFull.height / logoFull.width);
  const padX = logoW * 0.1;
  const padY = logoH * 0.16;
  const cardW = logoW + padX * 2;
  const cardH = logoH + padY * 2;
  const cardX = (w - cardW) / 2;
  const cardY = (h - cardH) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="sbg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${BG_TOP}"/>
        <stop offset="1" stop-color="${BG_BOTTOM}"/>
      </linearGradient>
      <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="${cardH * 0.04}" stdDeviation="${cardH * 0.05}" flood-color="#020617" flood-opacity="0.35"/>
      </filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sbg)"/>
    <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="${Math.min(cardW, cardH) * 0.12}" fill="#ffffff" filter="url(#card-shadow)"/>
    ${artEl(logoFull, cardX + padX, cardY + padY, logoW, logoH)}
  </svg>`;
  return new Resvg(svg).render().asPng();
}

// Sosyal paylaşım kartı: solda beyaz kart içinde logo, sağda metin.
function renderOgImage(w = 1200, h = 630) {
  const logoW = w * 0.3;
  const logoH = logoW * (logoFull.height / logoFull.width);
  const pad = logoW * 0.1;
  const cardW = logoW + pad * 2;
  const cardH = logoH + pad * 2;
  const cardX = 84;
  const cardY = (h - cardH) / 2;
  const textX = cardX + cardW + 64;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${BG_TOP}"/>
        <stop offset="0.55" stop-color="#0b3768"/>
        <stop offset="1" stop-color="${BG_BOTTOM}"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.18" cy="0.1" r="0.9">
        <stop offset="0" stop-color="#7dd3fc" stop-opacity="0.34"/>
        <stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>
    <path d="M0 520 C190 452 350 578 540 514 C730 450 890 576 1080 512 C1126 496 1165 499 1200 511 V630 H0 Z" fill="#38bdf8" opacity="0.1"/>
    <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="${cardH * 0.12}" fill="#ffffff"/>
    ${artEl(logoFull, cardX + pad, cardY + pad, logoW, logoH)}
    <text x="${textX}" y="275" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="70" font-weight="700" letter-spacing="-2">Mariner’s Book</text>
    <text x="${textX + 4}" y="337" fill="#bae6fd" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="27" font-weight="500">Denizcilik eğitimi ve operasyonel araçlar</text>
    <rect x="${textX + 4}" y="383" width="168" height="48" rx="24" fill="#ffffff" fill-opacity="0.12" stroke="#ffffff" stroke-opacity="0.2"/>
    <text x="${textX + 88}" y="415" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="20" font-weight="600">Tek çalışma alanı</text>
  </svg>`;
  return new Resvg(svg).render().asPng();
}

// PNG yükünü ICO kabına saran minimal yazıcı (tarayıcılar /favicon.ico'yu
// kendiliğinden ister; PNG gömülü ICO tüm güncel tarayıcılarca desteklenir).
function pngToIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngBuffers.length, 4);
  let offset = 6 + pngBuffers.length * 16;
  const entries = [];
  for (const { size, png } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    entries.push(entry);
  }
  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.png)]);
}

function write(relPath, buf) {
  const p = join(root, relPath);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, buf);
  console.log('✓', relPath);
}

// ---------- Android ----------
const androidRes = 'android/app/src/main/res';
if (existsSync(join(root, androidRes))) {
  const densities = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
  for (const [d, size] of Object.entries(densities)) {
    const icon = renderIcon(size);
    write(`${androidRes}/mipmap-${d}/ic_launcher.png`, icon);
    write(`${androidRes}/mipmap-${d}/ic_launcher_round.png`, icon);
    write(`${androidRes}/mipmap-${d}/ic_launcher_foreground.png`, renderForeground(Math.round(size * 2.25)));
  }
  const splashes = {
    'drawable/splash.png': [480, 320],
    'drawable-land-mdpi/splash.png': [480, 320],
    'drawable-land-hdpi/splash.png': [800, 480],
    'drawable-land-xhdpi/splash.png': [1280, 720],
    'drawable-land-xxhdpi/splash.png': [1600, 960],
    'drawable-land-xxxhdpi/splash.png': [1920, 1280],
    'drawable-port-mdpi/splash.png': [320, 480],
    'drawable-port-hdpi/splash.png': [480, 800],
    'drawable-port-xhdpi/splash.png': [720, 1280],
    'drawable-port-xxhdpi/splash.png': [960, 1600],
    'drawable-port-xxxhdpi/splash.png': [1280, 1920],
  };
  for (const [rel, [w, h]] of Object.entries(splashes)) {
    write(`${androidRes}/${rel}`, renderSplash(w, h));
  }
}

// ---------- iOS ----------
const iosAssets = 'ios/App/App/Assets.xcassets';
if (existsSync(join(root, iosAssets))) {
  const icon = renderIcon(1024);
  write(`${iosAssets}/AppIcon.appiconset/AppIcon-512@2x.png`, icon);
  write(`${iosAssets}/AppIcon.appiconset/AppIcon-512@2x-dark.png`, icon);
  write(`${iosAssets}/AppIcon.appiconset/AppIcon-512@2x-tinted.png`, renderTintedIcon(1024));
  const splash = renderSplash(2732, 2732);
  write(`${iosAssets}/Splash.imageset/splash-2732x2732.png`, splash);
  write(`${iosAssets}/Splash.imageset/splash-2732x2732-1.png`, splash);
  write(`${iosAssets}/Splash.imageset/splash-2732x2732-2.png`, splash);
}

// ---------- Play Store / App Store pazarlama görselleri ----------
write('resources/store/play-icon-512.png', renderIcon(512));
write('resources/store/play-feature-graphic-1024x500.png', renderSplash(1024, 500));
write('resources/store/app-store-icon-1024.png', renderIcon(1024));

// ---------- Web ----------
// Favicon küçük boyutta gösterildiği için amblem biraz daha büyük yerleşir.
write('public/favicon.png', renderIcon(64, 0.86));
write('public/favicon.ico', pngToIco([16, 32, 48].map(size => ({ size, png: renderIcon(size, 0.86) }))));
write('public/apple-touch-icon.png', renderIcon(180));
write('public/app-icon-192.png', renderIcon(192));
write('public/app-icon-512.png', renderIcon(512));
write('public/maritime-logo.png', renderIcon(512));
write('public/og-image.png', renderOgImage());

console.log('\nTamamlandı. Android res/, iOS Assets.xcassets, resources/store ve public/ güncellendi.');
