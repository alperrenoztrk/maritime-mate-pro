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

// Start preloading weather data during splash screen
console.log('🌤️ [Main] Hava durumu preload başlatılıyor...');
weatherPreloader.preloadWeatherData();

createRoot(container).render(<Root />);

// Hide splash screen only after weather data is preloaded or timeout
const hideSplash = () => {
  const splash = document.getElementById('splash-root');
  if (splash && !splash.classList.contains('splash-hide')) {
    console.log('✅ [Main] Splash screen gizleniyor...');
    splash.classList.add('splash-hide');
    // Remove from DOM after transition
    setTimeout(() => splash.remove(), 600);
  }
};

// Wait for preload to complete or timeout
const checkPreloadStatus = () => {
  if (weatherPreloader.isPreloadComplete()) {
    console.log('✅ [Main] Hava durumu preload tamamlandı, splash screen gizleniyor');
    setTimeout(hideSplash, 500); // Short delay for smooth transition
  } else {
    // Check again in 100ms
    setTimeout(checkPreloadStatus, 100);
  }
};

// Start checking after minimum splash time (3 seconds)
setTimeout(checkPreloadStatus, 3000);

// GUARANTEED: Force hide after 8 seconds max
setTimeout(() => {
  console.log('⏱️ [Main] Splash screen timeout kontrolü...');
  hideSplash();
}, 8000);
