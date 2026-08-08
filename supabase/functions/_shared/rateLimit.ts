// Shared rate limiter for edge functions.
//
// Two stages, both fixed-window counters keyed by an arbitrary identifier
// (client IP or user id):
//
//  1. `checkRateLimit` — in-memory. Resets on cold start and is not shared
//     across isolates, so on its own it is only a best-effort brake: the
//     effective limit is the configured limit times the number of live
//     isolates. Kept because it stops a hot bot loop inside one isolate
//     without touching the database.
//  2. `checkDurableRateLimit` — Postgres-backed (`consume_rate_limit`, see
//     migration 20260807120000). Shared across isolates and survives cold
//     starts, so this is the limit that actually holds. Prefer it for any
//     endpoint that costs money or reaches an external service.
//
// Billing-grade quotas are a separate concern and live in
// _shared/entitlements.ts (ai_usage).

import { getServiceClient, type SupabaseClient } from './serviceClient.ts';

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
 * Count one hit for `id` against the shared Postgres counter and report
 * whether it is within `limit` hits per `windowMs` window.
 *
 * Runs the in-memory check first so a loop hammering a single isolate is
 * rejected without a database round trip; only requests that pass locally
 * reach the shared counter.
 *
 * Fails **open** (falls back to the in-memory verdict) when the database is
 * unreachable: a rate limiter should not become the reason the whole endpoint
 * goes down. The local brake still bounds throughput in that window.
 */
export async function checkDurableRateLimit(
  id: string,
  limit: number,
  windowMs: number,
  client?: SupabaseClient,
): Promise<RateLimitResult> {
  const local = checkRateLimit(id, limit, windowMs);
  if (!local.allowed) return local;

  try {
    const { data, error } = await (client ?? getServiceClient()).rpc('consume_rate_limit', {
      p_bucket: id,
      p_limit: limit,
      p_window_sec: Math.max(1, Math.round(windowMs / 1000)),
    });
    if (error) throw new Error(error.message);

    const row = Array.isArray(data) ? data[0] : data;
    if (!row) return local;
    return {
      allowed: row.allowed === true,
      retryAfterSec: Math.max(1, Number(row.retry_after_sec) || local.retryAfterSec),
    };
  } catch (e) {
    console.error('consume_rate_limit failed; falling back to in-memory limit', e);
    return local;
  }
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
