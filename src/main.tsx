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

// Hide splash screen function - must be defined BEFORE anything else
const hideSplash = () => {
  const splash = document.getElementById('splash-root');
  if (splash && !splash.classList.contains('splash-hide')) {
    console.log('✅ [Main] Splash screen gizleniyor...');
    splash.classList.add('splash-hide');
    // Remove from DOM after transition
    setTimeout(() => splash.remove(), 600);
  }
};

// GUARANTEED: Force hide after 4 seconds max - set this FIRST before anything else
const forceHideTimeout = setTimeout(() => {
  console.log('⏱️ [Main] Splash screen ZORLA gizleniyor (4s timeout)...');
  hideSplash();
}, 4000);

// Start rendering immediately
createRoot(container).render(<Root />);

// Start preloading weather data (non-blocking)
console.log('🌤️ [Main] Hava durumu preload başlatılıyor...');
weatherPreloader.preloadWeatherData().then(() => {
  console.log('✅ [Main] Hava durumu preload tamamlandı');
  // Clear force timeout if preload completed
  clearTimeout(forceHideTimeout);
  // Hide splash after short delay for smooth transition
  setTimeout(hideSplash, 300);
}).catch((err) => {
  console.warn('⚠️ [Main] Hava durumu preload hatası, splash yine de gizlenecek:', err);
  clearTimeout(forceHideTimeout);
  hideSplash();
});
