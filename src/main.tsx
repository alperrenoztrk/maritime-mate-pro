// MUST be first: installs a crash-proof Web Storage guard before any other
// module touches localStorage at import time (preview iframes can make storage
// access throw, which otherwise crashes the app before React mounts).
import './lib/safeStorage'
import { safeLocalStorage } from './lib/safeStorage'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { FONT_SCALES, type FontSizeKey } from './contexts/FontSizeContext'
import { weatherPreloader } from './services/weatherPreloader'
import { LocationProvider } from './contexts/LocationContext'
import { registerOfflineSupport } from './serviceWorkerRegistration'

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

function Root() {
  return (
    <ErrorBoundary>
      <LocationProvider>
        <App />
      </LocationProvider>
    </ErrorBoundary>
  );
}

// Background weather preload — never blocks the splash screen.
try {
  weatherPreloader.preloadWeatherData();
} catch (e) {
  console.warn('[Main] Weather preload başlatılamadı:', e);
}

createRoot(container).render(<Root />);

const hideSplash = () => {
  const splash = document.getElementById('splash-root');
  if (splash && !splash.classList.contains('splash-hide')) {
    splash.classList.add('splash-hide');
    // The fade-out transition is .6s — remove only after it has finished.
    setTimeout(() => splash.remove(), 650);
  }
};

// Let the splash sequence play through before fading: book cover opens, the
// ship drawing appears on the page, pops into 3D and sails off (~4.2s).
const prefersReducedMotion =
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const splashHideDelay = prefersReducedMotion ? 1100 : 4200;
requestAnimationFrame(() => setTimeout(hideSplash, splashHideDelay));

// Hard safety net in case the rAF callback never fires.
setTimeout(hideSplash, splashHideDelay + 1200);


