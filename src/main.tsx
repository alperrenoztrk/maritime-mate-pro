import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { weatherPreloader } from './services/weatherPreloader'
import { LocationProvider } from './contexts/LocationContext'

console.log('[Main] Starting Maritime Calculator App v2...');

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

// Hide splash screen function
const hideSplash = () => {
  const splash = document.getElementById('splash-root');
  if (splash && !splash.classList.contains('splash-hide')) {
    console.log('✅ [Main] Splash screen gizleniyor...');
    splash.classList.add('splash-hide');
    setTimeout(() => splash.remove(), 500);
  }
};

// Start rendering IMMEDIATELY
createRoot(container).render(<Root />);

// Hide splash after minimal delay (just enough for first paint)
setTimeout(hideSplash, 800);

// Start preloading weather data in background (non-blocking, doesn't affect splash)
weatherPreloader.preloadWeatherData().catch((err) => {
  console.warn('⚠️ [Main] Hava durumu preload hatası (arka planda):', err);
});
