type CapacitorDiagnostic = {
  isNativePlatform?: () => boolean;
};

type DiagnosticWindow = Window & {
  Capacitor?: CapacitorDiagnostic;
};

const diagnosticWindow = window as DiagnosticWindow;
const diagnosticMode = import.meta.env.MODE;
const shouldShowBootDiagnostics = diagnosticMode === 'native';

const diagnosticLines = () => {
  let isNativePlatform = 'unavailable';
  try {
    isNativePlatform = String(diagnosticWindow.Capacitor?.isNativePlatform?.());
  } catch (error) {
    isNativePlatform = `threw: ${error instanceof Error ? error.message : String(error)}`;
  }

  return [
    `typeof window.Capacitor: ${typeof diagnosticWindow.Capacitor}`,
    `window.Capacitor?.isNativePlatform?.(): ${isNativePlatform}`,
    `import.meta.env.MODE: ${diagnosticMode}`,
    `document.readyState: ${document.readyState}`,
    `VITE_SUPABASE_URL[0..30]: ${(import.meta.env.VITE_SUPABASE_URL ?? '').slice(0, 30)}`,
  ];
};

const paintDiagnostic = (headline: string, error?: unknown, source?: string, line?: number, column?: number) => {
  const normalized = error instanceof Error ? error : new Error(String(error ?? 'Unknown error'));
  const stack = normalized.stack?.split('\n').slice(0, 5) ?? [];
  const stackLocation = normalized.stack?.match(/(?:https?|capacitor|file):[^\s)]+:\d+:\d+/)?.[0];
  const location = source ? `${source}:${line ?? '?'}:${column ?? '?'}` : stackLocation ?? 'unavailable';
  const output = [
    headline,
    `message: ${normalized.message}`,
    `location: ${location}`,
    ...stack,
    '',
    ...diagnosticLines(),
  ].join('\n');

  const render = () => {
    document.documentElement.style.background = '#000';
    document.body.textContent = '';
    Object.assign(document.body.style, {
      margin: '0',
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      fontSize: '16px',
      fontFamily: 'monospace',
      userSelect: 'text',
      WebkitUserSelect: 'text',
    });
    const pre = document.createElement('pre');
    pre.textContent = output;
    Object.assign(pre.style, {
      margin: '0',
      padding: '20px',
      whiteSpace: 'pre-wrap',
      overflowWrap: 'anywhere',
      userSelect: 'text',
      WebkitUserSelect: 'text',
    });
    document.body.appendChild(pre);
  };

  if (document.body) render();
  else document.addEventListener('DOMContentLoaded', render, { once: true });
};

window.onerror = (message, source, line, column, error) => {
  paintDiagnostic('boot: window.onerror', error ?? message, source, line, column);
  return true;
};

window.onunhandledrejection = (event) => {
  paintDiagnostic('boot: unhandled rejection', event.reason);
};

const paintMountReached = () => {
  if (!shouldShowBootDiagnostics) return;
  paintDiagnostic('boot: reached mount');
};

async function bootstrap() {
  // This is deliberately the first import. Every remaining dependency is
  // loaded only after the global crash screen above has been installed.
  const { safeLocalStorage } = await import('./lib/safeStorage');
  const [
    { createRoot },
    { createElement },
    { FONT_SCALES },
    { weatherPreloader },
    { registerOfflineSupport },
    { AppRoot },
  ] = await Promise.all([
    import('react-dom/client'),
    import('react'),
    import('./contexts/font-size-context'),
    import('./services/weatherPreloader'),
    import('./serviceWorkerRegistration'),
    import('./AppRoot'),
    import('./index.css'),
  ]);

  if (window.location.hostname === 'www.nauticalleap.com') {
    window.location.replace(`https://nauticalleap.com${window.location.pathname}${window.location.search}${window.location.hash}`);
    return;
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
    const storedFontSize = safeLocalStorage.getItem('maritime-ui-font-size');
    if (storedFontSize && storedFontSize in FONT_SCALES) {
      const scale = FONT_SCALES[storedFontSize as keyof typeof FONT_SCALES];
      document.documentElement.style.setProperty('--font-scale', String(scale));
      document.documentElement.setAttribute('data-font-size', storedFontSize);
      document.documentElement.setAttribute('data-font-size-source', storedFontSize === 'system' ? 'system' : 'manual');
    }
  } catch (e) {
    console.warn('[Main] Font size could not be applied:', e);
  }

// Register service worker for offline support (production only — skipped in dev/iframe).
  void registerOfflineSupport();

  const container = document.getElementById("root");
  if (!container) {
    throw new Error('Root element not found');
  }

// Background weather preload — never blocks the splash screen.
  try {
    void weatherPreloader.preloadWeatherData();
  } catch (e) {
    console.warn('[Main] Weather preload could not start:', e);
  }

  try {
    createRoot(container).render(createElement(AppRoot));
    paintMountReached();
  } catch (error) {
    paintDiagnostic('boot: React render failed', error);
    return;
  }

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
const splashHideDelay = prefersReducedMotion ? 1000 : 1120;

document.getElementById('splash-root')?.classList.add('splash-brief');

requestAnimationFrame(() => setTimeout(hideSplash, splashHideDelay));

// A tap should never be ignored: let people skip straight into the app.
const splashEl = document.getElementById('splash-root');
splashEl?.addEventListener('pointerdown', hideSplash, { once: true, passive: true });

// Hard safety net in case the rAF callback never fires.
  setTimeout(hideSplash, splashHideDelay + 400);
}

void bootstrap().catch((error) => {
  paintDiagnostic('boot: bootstrap failed', error);
});
