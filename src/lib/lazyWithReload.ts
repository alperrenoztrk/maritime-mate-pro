import { lazy, type ComponentType } from "react";

/**
 * Drop-in replacement for React.lazy that survives stale deployments.
 *
 * Why this exists: pages are code-split into hashed chunks. After a new build
 * is deployed (or when a stale PWA service-worker cache serves an old
 * index.html), the dynamic import() for a page can reject with a
 * "Failed to fetch dynamically imported module" / ChunkLoadError because the
 * hashed filename no longer exists on the server. Without handling, that
 * rejection bubbles up and crashes the whole app to the error screen — the
 * user sees a page that simply refuses to open.
 *
 * Strategy: on the first chunk-load failure for a given session, force a single
 * hard reload so the browser fetches the fresh index.html + chunk manifest.
 * The attempt is recorded in sessionStorage so we never loop: if the import
 * still fails after the reload, we rethrow and let the surrounding
 * ErrorBoundary present a recoverable fallback instead of reloading forever.
 */
type Importer<T extends ComponentType<unknown>> = () => Promise<{ default: T }>;

const RELOAD_FLAG_PREFIX = "chunk-reload:";

function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    /Failed to fetch dynamically imported module/i.test(message) ||
    /error loading dynamically imported module/i.test(message) ||
    /ChunkLoadError/i.test(message) ||
    /Importing a module script failed/i.test(message) ||
    // Safari phrasing
    /Unable to (preload|load) (CSS|module)/i.test(message)
  );
}

export function lazyWithReload<T extends ComponentType<unknown>>(importer: Importer<T>) {
  return lazy(async () => {
    // A stable-ish key per call site so each chunk gets one reload budget.
    const key = RELOAD_FLAG_PREFIX + importer.toString().slice(0, 120);
    try {
      const mod = await importer();
      // Success: clear any prior reload marker so future failures get a retry.
      try {
        sessionStorage.removeItem(key);
      } catch {
        /* storage may be unavailable in some webviews — ignore */
      }
      return mod;
    } catch (error) {
      if (isChunkLoadError(error)) {
        let alreadyReloaded = false;
        try {
          alreadyReloaded = sessionStorage.getItem(key) === "1";
          if (!alreadyReloaded) sessionStorage.setItem(key, "1");
        } catch {
          /* storage unavailable — fall through and just rethrow */
        }
        if (!alreadyReloaded && typeof window !== "undefined") {
          // Fresh failure: pull the new assets with a hard reload.
          window.location.reload();
          // Return a never-resolving promise so React keeps showing the
          // Suspense fallback during the brief moment before navigation.
          return new Promise<{ default: T }>(() => {});
        }
      }
      // Non-chunk error, or we already tried reloading: let the ErrorBoundary
      // handle it gracefully instead of bricking the app.
      throw error;
    }
  });
}
