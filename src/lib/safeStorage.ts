/**
 * Crash-proof Web Storage.
 *
 * In a cross-origin / privacy-partitioned preview iframe (Lovable preview,
 * Safari ITP, third-party-cookie blocking, sandboxed iframes) simply *reading*
 * `window.localStorage` can throw `SecurityError`. Any module that touches
 * storage at import time then crashes the whole bundle before React mounts —
 * the splash screen stays on "INITIALIZING…" forever and the preview "won't open".
 *
 * This module:
 *  1. Exposes `safeLocalStorage` / `safeSessionStorage` handles that never throw.
 *  2. As an import side-effect, replaces `window.localStorage` /
 *     `window.sessionStorage` with the same safe handle when the native one is
 *     unusable, so code that uses the globals directly is protected too.
 *
 * Import this FIRST in the entry module so the guard is installed before any
 * other module evaluates.
 */

function createMemoryStorage(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? (store.get(key) as string) : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  } as Storage;
}

/** Returns the native storage if it can actually be read AND written, else null. */
function probeNative(name: "localStorage" | "sessionStorage"): Storage | null {
  try {
    const native = (window as unknown as Record<string, Storage>)[name];
    if (!native) return null;
    const probeKey = "__safe_storage_probe__";
    native.setItem(probeKey, "1");
    native.removeItem(probeKey);
    return native;
  } catch {
    return null;
  }
}

/**
 * Wraps a native storage so individual operations (e.g. quota errors, or a
 * setItem that throws mid-session) can never propagate and crash the app.
 */
function harden(native: Storage): Storage {
  const fallback = createMemoryStorage();
  return {
    get length() {
      try {
        return native.length;
      } catch {
        return fallback.length;
      }
    },
    clear() {
      try {
        native.clear();
      } catch {
        fallback.clear();
      }
    },
    getItem(key: string) {
      try {
        return native.getItem(key);
      } catch {
        return fallback.getItem(key);
      }
    },
    key(index: number) {
      try {
        return native.key(index);
      } catch {
        return fallback.key(index);
      }
    },
    removeItem(key: string) {
      try {
        native.removeItem(key);
      } catch {
        fallback.removeItem(key);
      }
    },
    setItem(key: string, value: string) {
      try {
        native.setItem(key, value);
      } catch {
        fallback.setItem(key, value);
      }
    },
  } as Storage;
}

function resolveSafe(name: "localStorage" | "sessionStorage"): Storage {
  if (typeof window === "undefined") return createMemoryStorage();
  const native = probeNative(name);
  const safe = native ? harden(native) : createMemoryStorage();

  // Replace the global so untouched call sites (`window.localStorage.x`) are
  // protected as well. Only override when the native one is broken — otherwise
  // leave the real object in place.
  if (!native) {
    try {
      Object.defineProperty(window, name, {
        configurable: true,
        get() {
          return safe;
        },
      });
    } catch {
      try {
        (window as unknown as Record<string, Storage>)[name] = safe;
      } catch {
        /* nothing more we can do; safe handle is still returned below */
      }
    }
  }

  return safe;
}

export const safeLocalStorage: Storage = resolveSafe("localStorage");
export const safeSessionStorage: Storage = resolveSafe("sessionStorage");
