import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { supabase } from "@/integrations/supabase/safeClient";
import { safeLocalStorage } from "@/lib/safeStorage";
import { OFFLINE_GRACE_DAYS } from "@/config/products";
import {
  purchasePlan,
  restorePurchases,
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
 * kısıtı expires_at yerine "son eşitlemeden bu yana geçen gün" ile konur.
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

  const purchase = useCallback(async (plan: ProPlan): Promise<Tier> => {
    if (!user) throw new Error("Satın alma için giriş yapmalısınız");
    const result = await purchasePlan(plan, user.id);
    await refresh();
    return result.tier;
  }, [user, refresh]);

  const restore = useCallback(async (): Promise<Tier> => {
    if (!user) throw new Error("Geri yükleme için giriş yapmalısınız");
    const result = await restorePurchases();
    await refresh();
    return result.tier;
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
