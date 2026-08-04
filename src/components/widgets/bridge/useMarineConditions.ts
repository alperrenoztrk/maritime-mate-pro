import { useEffect, useRef, useState } from "react";
import { distanceNm } from "./voyage";
import { fetchMarine, modelMarine, solarProgress, type MarineConditions } from "./marineConditions";

/**
 * Gemi ilerledikçe denizin hâlini takip eden kanca.
 *
 * İki tetikleyici var: gemi rota üzerinde yeterince yol aldığında (35 NM) ve
 * belirli aralıklarla (gerçek zamanda 4 dakika). Sıkıştırma 60× olduğu için
 * ikisi de aynı kapıya çıkıyor — Marmara'dan Ege'ye geçen gemi yeni denizin
 * verisini oraya varır varmaz alıyor.
 *
 * İlk kare beklemiyor: kanca hemen mevkiye ait MODEL değerini döndürüyor,
 * ağdan cevap gelince onun üstüne yazıyor. Böylece köprüüstü hiçbir zaman
 * "veri yok" hâlinde açılmıyor; sahne ilk karede canlı.
 *
 * Mevki saniyede bir tazeleniyor ama etki (effect) ona bağlanmıyor: gemi
 * mevkii bir ref'te tutuluyor, karar veren tek bir sayaç var. Aksi hâlde her
 * saniye yeni bir AbortController kurulur, hiçbiri işe yaramazdı.
 */

/** Yeni sorgu için gereken en küçük yer değiştirme (NM). */
const REFETCH_NM = 35;
/** Aynı mevkide kalınsa bile tazeleme aralığı (gerçek zaman, ms). */
const REFETCH_MS = 240000;
/** Karar sayacının adımı — güneşin ilerlemesi de bu sıklıkta tazelenir. */
const TICK_MS = 15000;

export function useMarineConditions(lat: number | null, lon: number | null): MarineConditions | null {
  const [conditions, setConditions] = useState<MarineConditions | null>(null);
  const position = useRef<{ lat: number; lon: number } | null>(null);
  position.current = lat == null || lon == null ? null : { lat, lon };
  // Sefer ilk karede henüz kurulmamış olabilir; mevki belirir belirmez sayaç
  // yeniden kurulsun ki ilk sorgu 15 saniye beklemesin.
  const hasFix = position.current !== null;

  useEffect(() => {
    let alive = true;
    let controller: AbortController | null = null;
    let lastFetch: { lat: number; lon: number; at: number } | null = null;

    const tick = () => {
      const here = position.current;
      if (!alive || !here) return;

      const moved = lastFetch ? distanceNm(lastFetch, here) : Infinity;
      const aged = lastFetch ? Date.now() - lastFetch.at : Infinity;

      if (moved < REFETCH_NM && aged < REFETCH_MS) {
        // Denizin hâli aynı; yalnız güneş yürüsün — gökyüzü ağ beklemez.
        setConditions((prev) =>
          prev ? { ...prev, sunProgress: solarProgress(here.lat, here.lon, new Date()) } : modelMarine(here.lat, here.lon),
        );
        return;
      }

      // Ağ cevabı gelene kadar mevkiye ait model geçerli.
      setConditions((prev) => prev ?? modelMarine(here.lat, here.lon));

      lastFetch = { ...here, at: Date.now() };
      controller?.abort();
      controller = new AbortController();
      fetchMarine(here.lat, here.lon, controller.signal)
        .then((next) => {
          if (alive) setConditions(next);
        })
        .catch(() => {
          if (alive) setConditions((prev) => prev ?? modelMarine(here.lat, here.lon));
        });
    };

    tick();
    const id = window.setInterval(tick, TICK_MS);
    return () => {
      alive = false;
      controller?.abort();
      clearInterval(id);
    };
  }, [hasFix]);

  return conditions;
}
