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
import {
  readLanguagePreference,
  SOURCE_LANGUAGE,
} from './utils/languagePreference'
import { beginInitialTranslationGuard } from './utils/translationGuard'

if (window.location.hostname === 'www.nauticalleap.com') {
  window.location.replace(`https://nauticalleap.com${window.location.pathname}${window.location.search}${window.location.hash}`);
}

console.log('[Main] Starting Maritime Calculator App v2...');

// Resolve the persisted language before React mounts. Route content is authored
// in Turkish and translated at runtime, so letting the root paint before the
// selected dictionary is ready would expose a frame of source-language text.
// The static guard lives outside #root and remains visible until the provider
// has translated the first committed tree.
const initialLanguage = readLanguagePreference(safeLocalStorage);
document.documentElement.lang = initialLanguage;
document.documentElement.dir = initialLanguage === 'ar' ? 'rtl' : 'ltr';
beginInitialTranslationGuard(initialLanguage !== SOURCE_LANGUAGE);

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
    // Keep the launch hand-off brief; the native launch screen already covers
    // loading and the branded sequence must never block daily use.
    setTimeout(() => splash.remove(), 280);
  }
};

const prefersReducedMotion =
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let hasSeenIntro = false;
try {
  hasSeenIntro = safeLocalStorage.getItem('maritime-intro-seen') === 'true';
  safeLocalStorage.setItem('maritime-intro-seen', 'true');
} catch {
  // The safe-storage guard normally prevents this; keep launch non-blocking if
  // an embedded browser still denies storage access.
}
const splashHideDelay = prefersReducedMotion ? 180 : hasSeenIntro ? 240 : 1100;
requestAnimationFrame(() => setTimeout(hideSplash, splashHideDelay));

// Hard safety net in case the rAF callback never fires.
setTimeout(hideSplash, splashHideDelay + 500);
