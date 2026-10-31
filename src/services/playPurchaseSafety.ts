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
