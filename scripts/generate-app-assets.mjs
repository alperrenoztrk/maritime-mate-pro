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
const ogSvgPath = join(root, 'resources/og-image.svg');

const BG_TOP = '#0e5f91';
const BG_BOTTOM = '#061d3d';

// Zeminsiz logo: yalnızca resources/icon.svg içindeki `#icon-mark` grubu.
// Grup düz path listesi tutar (iç içe <g> yok), bu yüzden ilk </g> grubu kapatır.
function extractMark(svg) {
  const mark = svg.match(/<g id="icon-mark"[\s\S]*?<\/g>/);
  if (!mark) throw new Error('resources/icon.svg içinde <g id="icon-mark"> bulunamadı.');
  return mark[0];
}

const logoOnly = extractMark(iconSvg);

function recolorSvg(svg, palette) {
  return svg.replace(/#[0-9a-f]{6}/gi, color => palette[color.toLowerCase()] ?? color);
}

const darkIconSvg = recolorSvg(iconSvg, {
  '#ffffff': '#08182c',
  '#042e57': '#f4f8fd',
  '#007885': '#3bb4c2',
  '#bf9131': '#e3b455',
});

// iOS uses the luminance of this grayscale artwork when the user chooses a
// tinted Home Screen. Broad, high-contrast shapes survive system tinting far
// better than feeding the full-colour icon into that mode, so the mark is kept
// bright against a dark ground.
const tintedIconSvg = recolorSvg(iconSvg, {
  '#ffffff': '#1c1c1e',
  '#042e57': '#f2f2f7',
  '#007885': '#aeaeb2',
  '#bf9131': '#8e8e93',
});

// Koyu zeminler (splash, og-image) logonun ters/knockout kullanımını ister:
// lacivert çizgiler beyaza döner, turkuaz ve altın parlatılır.
const logoKnockout = extractMark(darkIconSvg);

function renderIcon(size) {
  return new Resvg(iconSvg, { fitTo: { mode: 'width', value: size } }).render().asPng();
}

function renderIconVariant(svg, size) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
}

// Adaptif ikon foreground'u: logo, Android'in %66 güvenli alanına sığacak
// şekilde ölçeklenir (0.78 x kutunun %78'i ≈ %61); arka plan şeffaf kalır
// (renk @color/ic_launcher_background).
function renderForeground(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
    <g transform="translate(512 512) scale(0.78) translate(-512 -512)">
      ${logoOnly}
    </g>
  </svg>`;
  return new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
}

// Splash: verilen boyutta degrade arka plan + ortalanmış logo.
function renderSplash(w, h) {
  const logoSize = Math.round(Math.min(w, h) * 0.42);
  const inner = logoKnockout;
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

// Çok boyutlu .ico: her giriş gömülü PNG olarak yazılır (tüm güncel
// tarayıcılar destekler), böylece favicon da tek kaynaktan türer.
function buildIco(sizes) {
  const images = sizes.map(size => ({ size, png: renderIcon(size) }));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette girişi yok
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map(i => i.png)]);
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
  write(`${iosAssets}/AppIcon.appiconset/AppIcon-512@2x-dark.png`, renderIconVariant(darkIconSvg, 1024));
  write(`${iosAssets}/AppIcon.appiconset/AppIcon-512@2x-tinted.png`, renderIconVariant(tintedIconSvg, 1024));
  const splash = renderSplash(2732, 2732);
  write(`${iosAssets}/Splash.imageset/splash-2732x2732.png`, splash);
  write(`${iosAssets}/Splash.imageset/splash-2732x2732-1.png`, splash);
  write(`${iosAssets}/Splash.imageset/splash-2732x2732-2.png`, splash);
}

// ---------- Play Store / App Store pazarlama görselleri ----------
write('resources/store/play-icon-512.png', renderIcon(512));
write('resources/store/play-feature-graphic-1024x500.png', renderSplash(1024, 500));
write('resources/store/app-store-icon-1024.png', renderIcon(1024));
write('public/favicon.png', renderIcon(64));
write('public/favicon.ico', buildIco([16, 32, 48]));
write('public/apple-touch-icon.png', renderIcon(180));
write('public/app-icon-192.png', renderIcon(192));
write('public/app-icon-512.png', renderIcon(512));
write(
  'public/maritime-logo.svg',
  iconSvg.replace(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="Mariner\'s Book">',
  ),
);

if (existsSync(ogSvgPath)) {
  // Logo, og-image.svg içinde kopyalanmaz; boş `#og-logo-slot` grubu burada
  // knockout varyantla doldurulur.
  const ogSvg = readFileSync(ogSvgPath, 'utf8').replace(
    /(<g id="og-logo-slot"[^>]*>)(<\/g>)/,
    (_, open, close) => `${open}${logoKnockout}${close}`,
  );
  if (!ogSvg.includes('icon-mark')) {
    throw new Error('resources/og-image.svg içinde boş <g id="og-logo-slot"> bulunamadı.');
  }
  write('public/og-image.png', new Resvg(ogSvg).render().asPng());
}

console.log('\nTamamlandı. Android res/, iOS Assets.xcassets ve resources/store güncellendi.');
