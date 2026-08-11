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
 * Cihazın GPS'inden sürekli taze konum okur (watchPosition ile). İşletim sistemi
 * yeni bir fix ürettiği anda (tipik olarak saniyede bir) güncelleme gelir;
 * `intervalMs` yalnızca state güncellemelerini kısıtlayan alt sınırdır.
 * Tarayıcı izni reddederse veya GPS yoksa null döner; hata durumunda son bilinen
 * geçerli konum korunur. Sekme arka plana geçince takip duraklatılır.
 */
export function useLiveGpsPosition(intervalMs: number = 1000, enabled: boolean = true) {
  const [position, setPosition] = useState<LiveGpsPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      // Avoid exposing an old GPS fix while a manual location is selected.
      setPosition(null);
      setError(null);
      return;
    }
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setError("Konum servisi desteklenmiyor");
      return;
    }

    let cancelled = false;
    let watchId: number | null = null;

    const stopWatch = () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
      }
    };

    const startWatch = () => {
      if (cancelled || watchId !== null) return;
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          if (cancelled) return;
          // GPS intervalMs'den daha sık veri üretirse state'i boğmamak için kısıtla;
          // %20 tolerans, ~1 Hz gelen fix'lerin zamanlama titremesiyle düşmesini önler
          const now = Date.now();
          if (now - lastUpdateRef.current < intervalMs * 0.8) return;
          lastUpdateRef.current = now;
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracyMeters: typeof pos.coords.accuracy === "number" ? pos.coords.accuracy : null,
            headingDeg: typeof pos.coords.heading === "number" ? pos.coords.heading : null,
            speedMps: typeof pos.coords.speed === "number" ? pos.coords.speed : null,
            timestamp: pos.timestamp ?? now,
          });
          setError(null);
        },
        (err) => {
          if (cancelled) return;
          setError(err.message);
          // Geçici hatalarda (timeout vb.) takip sürer; son geçerli konum korunur
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 30000 }
      );
    };

    // Sekme arka plandayken pil tüketmemek için takibi duraklat
    const handleVisibility = () => {
      if (document.hidden) {
        stopWatch();
      } else {
        startWatch();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    if (!document.hidden) startWatch();

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", handleVisibility);
      stopWatch();
    };
  }, [intervalMs, enabled]);

  return { position, error };
}
