import type { PlayPurchase, PlayProductType } from "@/plugins/playBilling";

/**
 * A native callback is untrusted data until purchase tokens have been
 * verified by Google Play on the server. Never treat these as entitlements.
 */
export interface VerificationInput { productId: string; purchaseToken: string; type: PlayProductType }

export function normalizePurchases(
  purchases: readonly PlayPurchase[],
  type: PlayProductType,
  allowedProductIds: readonly string[],
): { inputs: VerificationInput[]; pending: boolean } {
  const allowed = new Set(allowedProductIds);
  const seen = new Set<string>();
  const inputs: VerificationInput[] = [];
  let pending = false;
  for (const purchase of purchases) {
    if (purchase.purchaseState === 2) { pending = true; continue; }
    if (purchase.purchaseState !== 1) continue;
    if (typeof purchase.purchaseToken !== "string" || !purchase.purchaseToken.trim() ||
        purchase.purchaseToken.length > 4096) continue;
    for (const productId of purchase.productIds ?? []) {
      if (!allowed.has(productId)) continue;
      const dedupe = `${type}:${productId}:${purchase.purchaseToken}`;
      if (seen.has(dedupe)) continue;
      seen.add(dedupe);
      inputs.push({ productId, purchaseToken: purchase.purchaseToken, type });
    }
  }
  return { inputs, pending };
}
/**
 * Why a background check should send the device's Play purchases to the
 * server, or null when nothing needs doing.
 *
 *  - "unacknowledged": Google Play holds a completed purchase the server has
 *    not acknowledged yet (a pending payment that has since cleared, an app
 *    closed before verification, no connection on board). Google refunds
 *    unacknowledged purchases after three days, so this must be verified as
 *    soon as the app can reach the server.
 *  - "not_on_server": the account has no Pro access on the server although
 *    Google Play reports an owned Pro product (a renewal the server missed,
 *    a purchase made before signing in). Worth one throttled check.
 */
export type BackgroundSyncReason = "unacknowledged" | "not_on_server";

export function planBackgroundSync(
  subs: readonly PlayPurchase[],
  inapp: readonly PlayPurchase[],
  productIds: { subs: readonly string[]; inapp: readonly string[] },
  serverHasAccess: boolean,
): { inputs: VerificationInput[]; reason: BackgroundSyncReason | null } {
  const inputs = [
    ...normalizePurchases(subs, "subs", productIds.subs).inputs,
    ...normalizePurchases(inapp, "inapp", productIds.inapp).inputs,
  ];
  if (inputs.length === 0) return { inputs, reason: null };
  const known = new Set([...productIds.subs, ...productIds.inapp]);
  const unacknowledged = [...subs, ...inapp].some((purchase) =>
    purchase.purchaseState === 1 && purchase.acknowledged === false &&
    (purchase.productIds ?? []).some((id) => known.has(id)));
  if (unacknowledged) return { inputs, reason: "unacknowledged" };
  if (!serverHasAccess) return { inputs, reason: "not_on_server" };
  return { inputs, reason: null };
}

export function isVerifiedResponse(value: unknown): value is {
  tier: "free" | "pro" | "lifetime";
  results: Array<{ productId: string; status: string; active: boolean; expiresAt: string | null; error?: string }>;
} {
  if (!value || typeof value !== "object") return false;
  const response = value as Record<string, unknown>;
  if (!["free","pro","lifetime"].includes(String(response.tier)) || !Array.isArray(response.results)) return false;
  return response.results.every((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const result = entry as Record<string, unknown>;
    return typeof result.productId === "string" && typeof result.status === "string" &&
      typeof result.active === "boolean" && (result.expiresAt === null || typeof result.expiresAt === "string") &&
      (result.error === undefined || typeof result.error === "string");
  });
}
