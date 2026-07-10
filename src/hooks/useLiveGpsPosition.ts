import { useEffect, useRef, useState } from "react";

export type LiveGpsPosition = {
  latitude: number;
  longitude: number;
  accuracyMeters: number | null;
  headingDeg: number | null;
  speedMps: number | null;
  timestamp: number;
};

/**
 * Cihazın GPS'inden belirli aralıklarla (varsayılan: saniyede bir) taze konum okur.
 * Tarayıcı izni reddederse veya GPS yoksa null döner; hata durumunda son bilinen
 * geçerli konum korunur.
 */
export function useLiveGpsPosition(intervalMs: number = 1000, enabled: boolean = true) {
  const [position, setPosition] = useState<LiveGpsPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inFlightRef = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled) return;
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setError("Konum servisi desteklenmiyor");
      return;
    }

    let cancelled = false;

    const poll = () => {
      // Sekme arka plandayken veya önceki istek sürerken yeni istek açma
      if (cancelled || inFlightRef.current || document.hidden) return;
      inFlightRef.current = true;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          inFlightRef.current = false;
          if (cancelled) return;
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracyMeters: typeof pos.coords.accuracy === "number" ? pos.coords.accuracy : null,
            headingDeg: typeof pos.coords.heading === "number" ? pos.coords.heading : null,
            speedMps: typeof pos.coords.speed === "number" ? pos.coords.speed : null,
            timestamp: pos.timestamp ?? Date.now(),
          });
          setError(null);
        },
        (err) => {
          inFlightRef.current = false;
          if (cancelled) return;
          setError(err.message);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: intervalMs * 5 }
      );
    };

    poll();
    const intervalId = window.setInterval(poll, intervalMs);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [intervalMs, enabled]);

  return { position, error };
}
