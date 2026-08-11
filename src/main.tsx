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

// Freeze detector: a 1s heartbeat that reports how late it actually fired.
// If the user reports a frozen screen, this tells us whether the main thread
// was genuinely blocked (long gap) or whether an overlay was swallowing input
// (no gap at all).
{
  let lastBeat = Date.now();
  setInterval(() => {
    const now = Date.now();
    const drift = now - lastBeat - 1000;
    lastBeat = now;
    if (drift > 4000) {
      console.warn(`[Heartbeat] Main thread blocked for ~${Math.round(drift)}ms`);
    }
  }, 1000);
}


// Apply a manual saved font size before first paint. Dynamic Type is read from
// the native iOS bridge as soon as FontSizeProvider mounts.
try {
  const storedFontSize = safeLocalStorage.getItem('maritime-ui-font-size') as FontSizeKey | null;
  if (storedFontSize && storedFontSize in FONT_SCALES) {
    document.documentElement.style.setProperty('--font-scale', String(FONT_SCALES[storedFontSize]));
    document.documentElement.setAttribute('data-font-size', storedFontSize);
    document.documentElement.setAttribute('data-font-size-source', storedFontSize === 'system' ? 'system' : 'manual');
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
    // The native-style fade is .16s — remove only after it has finished.
    setTimeout(() => splash.remove(), 180);
  }
};

const prefersReducedMotion =
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Keep the launch surface only through the first committed React frame. iOS
// already supplies a native LaunchScreen, so the web layer must not replay a
// second narrative or block the first useful interaction.
const splashHideDelay = prefersReducedMotion ? 0 : 120;

document.getElementById('splash-root')?.classList.add('splash-brief');

requestAnimationFrame(() => setTimeout(hideSplash, splashHideDelay));

// A tap should never be ignored: let people skip straight into the app.
const splashEl = document.getElementById('splash-root');
splashEl?.addEventListener('pointerdown', hideSplash, { once: true, passive: true });

// Hard safety net in case the rAF callback never fires.
setTimeout(hideSplash, splashHideDelay + 400);
