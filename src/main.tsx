// MUST be first: installs a crash-proof Web Storage guard before any other
// module touches localStorage at import time (preview iframes can make storage
// access throw, which otherwise crashes the app before React mounts).
import './lib/safeStorage'
import { safeLocalStorage } from './lib/safeStorage'
import { createRoot } from 'react-dom/client'
import './index.css'
import { FONT_SCALES, type FontSizeKey } from './contexts/font-size-context'
import { weatherPreloader } from './services/weatherPreloader'
import { registerOfflineSupport } from './serviceWorkerRegistration'
import { AppRoot } from './AppRoot'

if (window.location.hostname === 'www.nauticalleap.com') {
  window.location.replace(`https://nauticalleap.com${window.location.pathname}${window.location.search}${window.location.hash}`);
}

console.log('[Main] Starting Maritime Calculator App v2...');

// Apply the saved font-size scale before first paint to avoid a flash of
// unscaled text. The FontSizeProvider keeps it in sync afterwards.
try {
  const storedFontSize = safeLocalStorage.getItem('maritime-ui-font-size') as FontSizeKey | null;
  if (storedFontSize && storedFontSize in FONT_SCALES) {
    document.documentElement.style.setProperty('--font-scale', String(FONT_SCALES[storedFontSize]));
    document.documentElement.setAttribute('data-font-size', storedFontSize);
  }
} catch (e) {
  console.warn('[Main] Yazı boyutu uygulanamadı:', e);
}

// Register service worker for offline support (production only — skipped in dev/iframe).
registerOfflineSupport();

const container = document.getElementById("root");
if (!container) {
  throw new Error('Root element not found');
}

// Background weather preload — never blocks the splash screen.
try {
  weatherPreloader.preloadWeatherData();
} catch (e) {
  console.warn('[Main] Weather preload başlatılamadı:', e);
}

createRoot(container).render(<AppRoot />);

const hideSplash = () => {
  const splash = document.getElementById('splash-root');
  if (splash && !splash.classList.contains('splash-hide')) {
    splash.classList.add('splash-hide');
    // The fade-out transition is .24s — remove only after it has finished.
    setTimeout(() => splash.remove(), 280);
  }
};

const prefersReducedMotion =
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Keep launch as a quiet brand beat. Native LaunchScreen already provides the
// static first frame, so an additional four-second narrative only delays the
// user's first useful interaction.
const SEEN_KEY = 'maritime-splash-seen';
let hasSeenSplash = false;
try {
  hasSeenSplash = safeLocalStorage.getItem(SEEN_KEY) === '1';
  safeLocalStorage.setItem(SEEN_KEY, '1');
} catch {
  /* storage unavailable — use the same short, safe launch */
}

const splashHideDelay = prefersReducedMotion ? 220 : hasSeenSplash ? 420 : 760;

document.getElementById('splash-root')?.classList.add('splash-brief');

requestAnimationFrame(() => setTimeout(hideSplash, splashHideDelay));

// A tap should never be ignored: let people skip straight into the app.
const splashEl = document.getElementById('splash-root');
splashEl?.addEventListener('pointerdown', hideSplash, { once: true, passive: true });

// Hard safety net in case the rAF callback never fires.
setTimeout(hideSplash, splashHideDelay + 600);
