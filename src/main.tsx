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

// Start rendering IMMEDIATELY - no splash screen
createRoot(container).render(<Root />);

// Start preloading weather data in background (non-blocking)
weatherPreloader.preloadWeatherData().catch((err) => {
  console.warn('⚠️ [Main] Hava durumu preload hatası (arka planda):', err);
});
