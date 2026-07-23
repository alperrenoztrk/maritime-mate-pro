// Shared in-memory rate limiter for edge functions.
//
// Fixed-window counter keyed by an arbitrary identifier (client IP or user id).
// State lives in the isolate's memory: it resets on cold start and is not
// shared across isolates, so treat the limits as a best-effort abuse brake
// (bot loops, credential-stuffing bursts, proxy abuse), not a billing-grade
// quota. Billing-grade quotas live in _shared/entitlements.ts (ai_usage).

interface WindowState {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, WindowState>();

// Cap total tracked keys so an attacker rotating identifiers can't grow the
// map unboundedly. When full, expired entries are purged; if still full the
// oldest-resetting entry is evicted.
const MAX_KEYS = 10_000;

function purgeExpired(now: number): void {
  for (const [key, state] of buckets) {
    if (state.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the current window resets (for Retry-After). */
  retryAfterSec: number;
}

/**
 * Count one hit for `id` and report whether it is within `limit` hits per
 * `windowMs` window.
 */
export function checkRateLimit(id: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  let state = buckets.get(id);

  if (!state || state.resetAt <= now) {
    if (buckets.size >= MAX_KEYS) {
      purgeExpired(now);
      if (buckets.size >= MAX_KEYS) {
        let oldestKey: string | null = null;
        let oldestReset = Infinity;
        for (const [key, s] of buckets) {
          if (s.resetAt < oldestReset) {
            oldestReset = s.resetAt;
            oldestKey = key;
          }
        }
        if (oldestKey !== null) buckets.delete(oldestKey);
      }
    }
    state = { count: 0, resetAt: now + windowMs };
    buckets.set(id, state);
  }

  state.count += 1;
  const retryAfterSec = Math.max(1, Math.ceil((state.resetAt - now) / 1000));
  return { allowed: state.count <= limit, retryAfterSec };
}

/**
 * Best-effort client IP from proxy headers. Falls back to a shared bucket
 * ("unknown") when no header is present, which still bounds total throughput.
 */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || "unknown";
}

/** 429 response with Retry-After, using the caller's CORS headers. */
export function rateLimitResponse(
  corsHeaders: Record<string, string>,
  retryAfterSec: number,
): Response {
  return new Response(
    JSON.stringify({ error: "Çok fazla istek. Lütfen bekleyin." }),
    {
      status: 429,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSec),
      },
    },
  );
}
