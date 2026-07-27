/**
 * Service Worker registration — production only, never inside the Lovable preview iframe.
 *
 * Strategy:
 *  - Skip registration entirely in dev, in an iframe, or on Lovable preview hosts.
 *  - In those contexts also actively unregister any leftover service workers and
 *    clear their caches, so old builds can never serve stale assets in the editor.
 *  - In real production, register and auto-update with workbox-window.
 */

const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true; // cross-origin → assume iframe
  }
})();

const host = typeof window !== "undefined" ? window.location.hostname : "";
const isPreviewHost =
  host.includes("lovableproject.com") ||
  host.includes("lovable.app") && host.includes("id-preview--") ||
  host.includes("lovable.dev") ||
  host === "localhost" ||
  host === "127.0.0.1";

const shouldRegister = !import.meta.env.DEV && !isInIframe && !isPreviewHost;

export async function registerOfflineSupport(): Promise<void> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  if (!shouldRegister) {
    // Aggressively clean up any previously-registered SWs in preview/iframe contexts
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      if (regs.length) {
        console.log("[Offline] Cleaned up", regs.length, "service worker(s) in preview/iframe context.");
      }
    } catch (err) {
      console.warn("[Offline] SW cleanup failed:", err);
    }
    return;
  }

  try {
    const { Workbox } = await import("workbox-window");
    const wb = new Workbox("/sw.js");

    // Do NOT auto-skip-waiting or force a reload here.
    // A forced reload discards in-flight form state (auth inputs, calculator
    // fields, quiz answers). The new SW will activate naturally the next time
    // the user navigates or reopens the tab, which is safe for their input.
    wb.addEventListener("waiting", () => {
      console.log("[Offline] New version is waiting; will activate on next visit.");
    });

    wb.addEventListener("activated", (event) => {
      if (!event.isUpdate) {
        console.log("[Offline] App is ready to work offline. Calculator pages cached.");
      }
    });

    await wb.register();
  } catch (err) {
    console.warn("[Offline] Service worker registration failed:", err);
  }
}

