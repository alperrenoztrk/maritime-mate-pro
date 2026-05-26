import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { weatherPreloader } from './services/weatherPreloader'
import { LocationProvider } from './contexts/LocationContext'
import { registerOfflineSupport } from './serviceWorkerRegistration'

console.log('[Main] Starting Maritime Calculator App v2...');

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
    setTimeout(() => splash.remove(), 400);
  }
};

// Hide as soon as React mounts (effectively immediate).
requestAnimationFrame(() => setTimeout(hideSplash, 100));

// Hard safety net in case the rAF callback never fires.
setTimeout(hideSplash, 1200);
