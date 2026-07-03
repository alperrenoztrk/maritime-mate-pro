// Uygulama ikonu ve splash ekranlarını resources/icon.svg kaynağından üretir.
// Kullanım: npm run assets:generate
//
// Not: @capacitor/assets bu ortamda kullanılamadığı için (sharp'ın libvips
// indirme adımı proxy arkasında engelleniyor) aynı çıktı seti @resvg/resvg-js
// ile üretilir. Çıktılar Android res/ ve iOS Assets.xcassets içine yazılır.
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const iconSvg = readFileSync(join(root, 'resources/icon.svg'), 'utf8');

const BG_TOP = '#0f3a7d';
const BG_BOTTOM = '#071c3f';

// Arka plan karesi ve dalga dokusu olmadan yalnızca dümen simidi logosu.
// (Dalga path'leri 1024 kutusuna kırpıldığı için şeffaf/degrade zeminlerde
// dikdörtgen artefakt oluşturur.)
const logoOnly = iconSvg
  .replace(/<rect width="1024" height="1024"[^/]*\/>/, '')
  .replace(/<path d="M0 8[^/]*\/>/g, '')
  .replace(/<\/?svg[^>]*>/g, '');

function renderIcon(size) {
  return new Resvg(iconSvg, { fitTo: { mode: 'width', value: size } }).render().asPng();
}

// Adaptif ikon foreground'u: içerik, Android'in %66 güvenli alanına sığacak
// şekilde küçültülmüş; arka plan şeffaf (renk @color/ic_launcher_background).
function renderForeground(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
    <g transform="translate(512 512) scale(0.62) translate(-512 -512)">
      ${logoOnly}
    </g>
  </svg>`;
  return new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
}

// Splash: verilen boyutta degrade arka plan + ortalanmış logo.
function renderSplash(w, h) {
  const logoSize = Math.round(Math.min(w, h) * 0.42);
  const inner = logoOnly;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="sbg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${BG_TOP}"/>
        <stop offset="1" stop-color="${BG_BOTTOM}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sbg)"/>
    <g transform="translate(${(w - logoSize) / 2} ${(h - logoSize) / 2}) scale(${logoSize / 1024})">${inner}</g>
  </svg>`;
  return new Resvg(svg).render().asPng();
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
  write(`${iosAssets}/AppIcon.appiconset/AppIcon-512@2x.png`, renderIcon(1024));
  const splash = renderSplash(2732, 2732);
  write(`${iosAssets}/Splash.imageset/splash-2732x2732.png`, splash);
  write(`${iosAssets}/Splash.imageset/splash-2732x2732-1.png`, splash);
  write(`${iosAssets}/Splash.imageset/splash-2732x2732-2.png`, splash);
}

// ---------- Play Store / App Store pazarlama görselleri ----------
write('resources/store/play-icon-512.png', renderIcon(512));
write('resources/store/play-feature-graphic-1024x500.png', renderSplash(1024, 500));
write('resources/store/app-store-icon-1024.png', renderIcon(1024));

console.log('\nTamamlandı. Android res/, iOS Assets.xcassets ve resources/store güncellendi.');
