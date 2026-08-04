import { useEffect, useRef, useState } from "react";
import { newPlan, resolve, TIME_COMPRESSION, type VoyagePlan, type VoyageState } from "./voyage";

/**
 * Seferi canlı tutan kanca.
 *
 * Plan (hangi rota, ne zaman kalkıldı) localStorage'da duruyor: uygulama
 * kapanıp açıldığında gemi kaldığı yerden değil, GEÇEN ZAMANIN GÖTÜRDÜĞÜ
 * yerden devam ediyor. Sefer bitince kendiliğinden yeni bir rastgele liman
 * çiftine kalkıyor, aynı rota üst üste iki kez seçilmiyor.
 *
 * Saniyede bir tazeleniyor; sıkıştırma 60× olduğu için bu, seyir saatinde bir
 * dakikalık adım demek — ECDIS'teki gemi akıcı ilerliyor, React ağacı ise
 * saniyede bir kez yeniden çiziliyor.
 */

const STORAGE_KEY = "bridge-voyage-v1";

function readPlan(): VoyagePlan | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as VoyagePlan;
    if (typeof parsed?.routeId !== "string" || typeof parsed?.departedAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writePlan(plan: VoyagePlan) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch {
    /* özel kip / dolu depo — sefer yine de bu oturum boyunca yürür */
  }
}

/**
 * Kalkışı geriye alır: uygulamayı ilk kez açan kullanıcı gemiyi limanda
 * demirli değil, seferin ortasında bulsun. Rastgele bir ilerleme (rotanın
 * %5'i ile %55'i arası) veriliyor; kalkış anı ona göre geçmişe yazılıyor.
 * Üst sınır yarıdan biraz fazla: widget'a bakan biri gemiyi hemen limana
 * girerken değil, yolun ortasında bulsun.
 */
function freshPlan(exclude?: string): VoyagePlan {
  const plan = newPlan(exclude);
  const probe = resolve({ ...plan, departedAt: Date.now() }, Date.now());
  const totalHours = probe?.passage.totalHours ?? 12;
  const startedAgoHours = totalHours * (0.05 + Math.random() * 0.5);
  // Sıkıştırılmış saat: seyir saatindeki X saat, gerçek zamanda X/30 saat.
  return {
    ...plan,
    departedAt: Date.now() - (startedAgoHours * 3600000) / TIME_COMPRESSION,
  };
}

export function useVoyage(): VoyageState | null {
  const planRef = useRef<VoyagePlan | null>(null);
  const [state, setState] = useState<VoyageState | null>(null);

  useEffect(() => {
    let alive = true;

    const step = () => {
      if (!alive) return;
      const now = Date.now();
      if (!planRef.current) {
        const stored = readPlan();
        planRef.current = stored ?? freshPlan();
        if (!stored) writePlan(planRef.current);
      }

      let next = resolve(planRef.current, now);
      if (!next) {
        // Sefer tamamlandı (ya da depodaki plan bozuk): yeni limana kalk.
        // Depoya yalnız burada yazılıyor — saniyede bir localStorage'a
        // dokunmanın anlamı yok, plan sefer boyunca değişmiyor.
        planRef.current = newPlan(planRef.current.routeId, now);
        writePlan(planRef.current);
        next = resolve(planRef.current, now);
      }
      setState(next);
    };

    step();
    const id = window.setInterval(step, 1000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return state;
}
