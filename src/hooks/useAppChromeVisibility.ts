import { useLayoutEffect, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import { isAppChromeHidden } from "@/lib/appChrome";

// Route-keyed leases keep an outgoing animated page from hiding the new page's
// navigation. A lease is removed on completion, exit or unmount (also StrictMode).
const leases = new Map<symbol, string>();
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
const notify = () => listeners.forEach((listener) => listener());
const routeToken = (location: ReturnType<typeof useLocation>) =>
  JSON.stringify([location.key, location.pathname, location.search, location.hash]);

export function useHideAppChrome(active: boolean) {
  const token = routeToken(useLocation());
  useLayoutEffect(() => {
    if (!active) return;
    const lease = Symbol("focused-study");
    leases.set(lease, token);
    notify();
    return () => { leases.delete(lease); notify(); };
  }, [active, token]);
}

export function useAppChromeHidden() {
  const location = useLocation();
  const token = routeToken(location);
  const focused = useSyncExternalStore(
    subscribe,
    () => [...leases.values()].includes(token),
    () => false,
  );
  return focused || isAppChromeHidden(location.pathname);
}
