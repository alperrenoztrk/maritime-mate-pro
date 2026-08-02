import { createContext } from "react";
import type { ProPlan } from "@/config/products";
import type { Tier } from "@/services/billing";

export interface EntitlementContextValue {
  /** Etkin paket: free / pro (abonelik) / lifetime (ömür boyu). */
  tier: Tier;
  /** Pro içeriğe erişim var mı? (abonelik VEYA ömür boyu) */
  hasProAccess: boolean;
  loading: boolean;
  /** true ise sunucuya ulaşılamadı, karar çevrimdışı önbellekten verildi. */
  fromCache: boolean;
  /** Son başarılı sunucu eşitlemesi (epoch ms); hiç eşitlenmediyse null. */
  lastSyncedAt: number | null;
  refresh: () => Promise<void>;
  purchase: (plan: ProPlan) => Promise<Tier>;
  restore: () => Promise<Tier>;
}

export const EntitlementContext = createContext<EntitlementContextValue | undefined>(undefined);
