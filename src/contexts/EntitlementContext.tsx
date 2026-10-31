import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import { useAuth } from "@/hooks/useAuthContext";
import { supabase } from "@/integrations/supabase/safeClient";
import { safeLocalStorage } from "@/lib/safeStorage";
import { OFFLINE_GRACE_DAYS } from "@/config/products";
import {
  purchasePlan,
  restorePurchases,
  syncOwnedPurchases,
  type Tier,
} from "@/services/billing";
import type { ProPlan } from "@/config/products";
import { EntitlementContext } from "./entitlement-context";

/**
 * Paket hakkı (entitlement) bağlamı.
 *
 * Gerçek kaynak sunucudur: `user_entitlements` tablosu yalnızca
 * `verify-purchase` edge function'ının Google Play doğrulamasıyla yazılır;
 * istemci kendi satırlarını RLS ile okur. Bu bağlam sonucu yerelde önbelleğe
 * alır ki gemide internet yokken Pro erişimi OFFLINE_GRACE_DAYS boyunca
 * sürsün (ömür boyu paket çevrimdışında süresiz tanınır).
 */

interface EntitlementRow {
  product_id: string;
  product_type: "subscription" | "lifetime";
  status: string;
  expires_at: string | null;
}

interface EntitlementCache {
  userId: string;
  tier: Tier;
  rows: EntitlementRow[];
  syncedAt: number; // epoch ms — son başarılı sunucu eşitlemesi
}

const CACHE_KEY = "mmp.entitlement.v1";

// Arka plan satın alma eşitlemesi (bkz. syncOwnedPurchases). Onaylanmamış
// satın alma her ön plana dönüşte denenir (en sık dakikada bir); "sunucuda Pro
// yok ama Play'de ürün var" kontrolü ise başarılı bir denemeden sonra 12 saat
// bekler — başka hesaba bağlı bir satın alma her açılışta istek atmasın.
const SYNC_MIN_INTERVAL_MS = 60_000;
const RELINK_INTERVAL_MS = 12 * 60 * 60 * 1000;
const relinkKey = (userId: string) => `mmp.billing.relink.v1.${userId}`;

// Sunucudaki isRowActive ile aynı kurallar (bkz. _shared/entitlements.ts):
// canceled abonelik expires_at'e kadar erişimlidir; on_hold/paused erişimsiz.
const ACCESS_STATUSES = new Set(["active", "grace_period", "canceled"]);

function isRowActive(row: EntitlementRow, now: Date): boolean {
  if (!ACCESS_STATUSES.has(row.status)) return false;
  if (row.product_type === "lifetime") return row.status === "active";
  if (!row.expires_at) return false;
  return new Date(row.expires_at).getTime() > now.getTime();
}

function computeTier(rows: EntitlementRow[], now: Date = new Date()): Tier {
  if (rows.some((r) => r.product_type === "subscription" && isRowActive(r, now))) return "pro";
  if (rows.some((r) => r.product_type === "lifetime" && isRowActive(r, now))) return "lifetime";
  return "free";
}

function readCache(userId: string): EntitlementCache | null {
  try {
    const raw = safeLocalStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as EntitlementCache;
    if (parsed.userId !== userId) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(cache: EntitlementCache): void {
  try {
    safeLocalStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // depolama yoksa çevrimdışı hak korunamaz; sessizce geç
  }
}

/**
 * Çevrimdışı paket kararı: sunucuya ulaşılamadığında son eşitlenmiş veriye
 * güvenilir. Abonelik yenilemeleri çevrimdışında görülemeyeceği için süre
 * kısıtı expires_at yerine "Days since last sync" ile konur.
 */
function tierFromCache(cache: EntitlementCache, now: Date = new Date()): Tier {
  const hadLifetime = cache.rows.some(
    (r) => r.product_type === "lifetime" && r.status === "active",
  );
  if (hadLifetime) return "lifetime";

  const ageDays = (now.getTime() - cache.syncedAt) / 86_400_000;
  if (cache.tier === "pro" && ageDays <= OFFLINE_GRACE_DAYS) return "pro";
  return "free";
}

export const EntitlementProvider = ({ children }: { children: ReactNode }) => {
  const { user, mfaChallengeRequired } = useAuth();
  const [tier, setTier] = useState<Tier>("free");
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setTier("free");
      setFromCache(false);
      setLastSyncedAt(null);
      setLoading(false);
      return;
    }

    // 2FA kodu girilmeden önce oturum `aal1`dir ve `user_entitlements` RLS
    // tarafından kapalıdır. Kritik nokta: sorgu HATA vermez, BOŞ döner —
    // yani aşağıdaki akış tier'ı "free" hesaplayıp önbellekteki Pro hakkını
    // ezerdi. Kullanıcı kodu girmeden uygulamayı kapatırsa çevrimdışı Pro
    // erişimi de kaybolurdu. Kod adımı bitene kadar son bilinen durumu koru;
    // oturum aal2'ye yükselince user nesnesi değişir ve bu effect yeniden
    // çalışır (bkz. src/lib/mfa.ts).
    if (mfaChallengeRequired) {
      const cache = readCache(user.id);
      if (cache) {
        setTier(tierFromCache(cache));
        setFromCache(true);
        setLastSyncedAt(cache.syncedAt);
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_entitlements")
        .select("product_id, product_type, status, expires_at")
        .eq("user_id", user.id);
      if (error) throw error;

      const rows = (data ?? []) as EntitlementRow[];
      const computed = computeTier(rows);
      const cache: EntitlementCache = {
        userId: user.id,
        tier: computed,
        rows,
        syncedAt: Date.now(),
      };
      writeCache(cache);
      setTier(computed);
      setFromCache(false);
      setLastSyncedAt(cache.syncedAt);
    } catch {
      // Çevrimdışı / sunucu hatası: son eşitlenmiş hakları belirli süre koru.
      const cache = readCache(user.id);
      if (cache) {
        setTier(tierFromCache(cache));
        setFromCache(true);
        setLastSyncedAt(cache.syncedAt);
      } else {
        setTier("free");
        setFromCache(true);
        setLastSyncedAt(null);
      }
    } finally {
      setLoading(false);
    }
  }, [user, mfaChallengeRequired]);

  useEffect(() => {
    setLoading(true);
    void refresh();
  }, [refresh]);

  // Arka plan eşitlemesi için güncel durum; callback'ler yeniden kurulmasın
  // diye ref'te tutulur.
  const stateRef = useRef({ tier, fromCache, loading });
  stateRef.current = { tier, fromCache, loading };
  /** Ön planda satın alma/geri yükleme sürerken arka plan eşitlemesi durur. */
  const billingBusy = useRef(false);
  const syncInFlight = useRef(false);
  const lastSyncAt = useRef(0);

  const backgroundSync = useCallback(async () => {
    if (!user || mfaChallengeRequired || !Capacitor.isNativePlatform()) return;
    const state = stateRef.current;
    if (state.loading || billingBusy.current || syncInFlight.current) return;
    const now = Date.now();
    if (now - lastSyncAt.current < SYNC_MIN_INTERVAL_MS) return;
    lastSyncAt.current = now;
    syncInFlight.current = true;
    try {
      let lastRelink = 0;
      try {
        lastRelink = Number(safeLocalStorage.getItem(relinkKey(user.id)) ?? 0) || 0;
      } catch {
        lastRelink = 0;
      }
      // Çevrimdışıyken sunucudaki durumu bilmiyoruz; yalnızca onaylanmamış
      // satın almalar denenir (o da bağlantı yoksa sessizce başarısız olur).
      const allowRelink = !state.fromCache && now - lastRelink >= RELINK_INTERVAL_MS;
      const serverHasAccess = state.tier === "pro" || state.tier === "lifetime";
      const synced = await syncOwnedPurchases(serverHasAccess, allowRelink);
      if (!synced) return;
      if (synced.reason === "not_on_server") {
        try {
          safeLocalStorage.setItem(relinkKey(user.id), String(now));
        } catch {
          // depolama yoksa bir sonraki açılışta yeniden denenir
        }
      }
      await refresh();
    } catch {
      // Bağlantı yok / Play kullanılamıyor: bir sonraki ön plana dönüşte denenir.
    } finally {
      syncInFlight.current = false;
    }
  }, [user, mfaChallengeRequired, refresh]);

  // Açılışta (ilk sunucu okuması bitince) bir kez, sonra her ön plana dönüşte.
  useEffect(() => {
    if (!loading) void backgroundSync();
  }, [loading, backgroundSync]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let removed = false;
    let remove: (() => void) | null = null;
    CapacitorApp.addListener("resume", () => {
      void backgroundSync();
    })
      .then((handle) => {
        if (removed) void handle.remove();
        else remove = () => void handle.remove();
      })
      .catch(() => {
        // App eklentisi yoksa yalnızca açılış eşitlemesi çalışır.
      });
    return () => {
      removed = true;
      remove?.();
    };
  }, [backgroundSync]);

  const purchase = useCallback(async (plan: ProPlan): Promise<Tier> => {
    if (!user) throw new Error("You must be logged in to purchase");
    billingBusy.current = true;
    try {
      const result = await purchasePlan(plan, user.id);
      await refresh();
      return result.tier;
    } finally {
      billingBusy.current = false;
    }
  }, [user, refresh]);

  const restore = useCallback(async (): Promise<Tier> => {
    if (!user) throw new Error("You must be logged in to restore");
    billingBusy.current = true;
    try {
      const result = await restorePurchases();
      await refresh();
      return result.tier;
    } finally {
      billingBusy.current = false;
    }
  }, [user, refresh]);

  const value = useMemo(() => ({
    tier,
    hasProAccess: tier === "pro" || tier === "lifetime",
    loading,
    fromCache,
    lastSyncedAt,
    refresh,
    purchase,
    restore,
  }), [tier, loading, fromCache, lastSyncedAt, refresh, purchase, restore]);

  return (
    <EntitlementContext.Provider value={value}>
      {children}
    </EntitlementContext.Provider>
  );
};
