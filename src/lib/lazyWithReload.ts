import { lazy } from "react";
import { safeSessionStorage } from "@/lib/safeStorage";

// A tab can keep an old Vite entrypoint after a deploy. When a user first
// opens an uncached page, its old hashed import() URL may no longer exist.
// Only reload once per route within this window; a persistent 404 must not
// cause an infinite refresh loop on mobile.
const CHUNK_RELOAD_PREFIX = "mariners-book:failed-chunk-reload:";
const CHUNK_RETRY_WINDOW_MS = 5 * 60 * 1000;

export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    /ChunkLoadError/i.test(message) ||
    /Loading (?:CSS )?chunk [\w-]+ failed/i.test(message) ||
    /Failed to fetch dynamically imported module/i.test(message) ||
    /Importing a module script failed/i.test(message) ||
    /error loading dynamically imported module/i.test(message) ||
    /Failed to load module script/i.test(message) ||
    // WebKit sometimes reduces failed dynamic imports to this message.
    /^Load failed$/i.test(message)
  );
}

export function shouldReloadFailedChunk(
  error: unknown,
  previousAttempt: string | null,
  now: number,
  online: boolean,
): boolean {
  if (!online || !isChunkLoadError(error)) return false;
  if (previousAttempt === null) return true;
  const then = Number(previousAttempt);
  return !Number.isFinite(then) || then <= 0 || now < then ||
    now - then >= CHUNK_RETRY_WINDOW_MS;
}

function retryKey(): string {
  return CHUNK_RELOAD_PREFIX + window.location.pathname + window.location.search;
}

/**
 * A drop-in replacement for React.lazy that recovers after deployments have
 * invalidated old, not-yet-loaded page chunks. Rendering exceptions and other
 * import errors still propagate to the route-local ErrorBoundary.
 */
export const lazyWithReload: typeof lazy = (load) =>
  lazy(async () => {
    try {
      const module = await load();
      // A genuinely loaded page makes the next deploy eligible for a new retry.
      if (typeof window !== "undefined") {
        safeSessionStorage.removeItem(retryKey());
      }
      return module;
    } catch (error) {
      if (typeof window !== "undefined") {
        const key = retryKey();
        const previous = safeSessionStorage.getItem(key);
        const online = typeof navigator === "undefined" || navigator.onLine !== false;
        if (shouldReloadFailedChunk(error, previous, Date.now(), online)) {
          safeSessionStorage.setItem(key, String(Date.now()));
          // Hard reload refreshes the HTML + Vite chunk manifest, rather than
          // retrying the same stale import URL cached in React.lazy.
          window.location.reload();
        }
      }
      throw error;
    }
  });
