// Shared SSRF protection utilities.
// Rejects non-http(s) URLs and hosts that resolve to private/loopback/link-local addresses.

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return true;
  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true; // link-local (incl. AWS metadata)
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a >= 224) return true; // multicast / reserved
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase().replace(/^\[|\]$/g, "");
  if (lower === "::1" || lower === "::") return true;
  if (lower.startsWith("fe80:") || lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("::ffff:")) {
    const v4 = lower.slice(7);
    if (/^\d+\.\d+\.\d+\.\d+$/.test(v4)) return isPrivateIPv4(v4);
  }
  return false;
}

const BLOCKED_HOSTNAMES = new Set([
  "localhost", "ip6-localhost", "ip6-loopback", "metadata.google.internal",
]);

export async function assertSafeUrl(raw: string): Promise<URL> {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error("Invalid URL");
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only http(s) URLs are allowed");
  }
  const host = parsed.hostname.toLowerCase();
  if (!host) throw new Error("Invalid host");
  if (BLOCKED_HOSTNAMES.has(host)) throw new Error("Host not allowed");
  if (host.endsWith(".internal") || host.endsWith(".local")) throw new Error("Host not allowed");

  // Literal IPs
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    if (isPrivateIPv4(host)) throw new Error("Private/loopback address not allowed");
    return parsed;
  }
  if (host.includes(":")) {
    if (isPrivateIPv6(host)) throw new Error("Private/loopback address not allowed");
    return parsed;
  }

  // Resolve hostname; reject if any resolved address is private.
  try {
    const [a, aaaa] = await Promise.all([
      Deno.resolveDns(host, "A").catch(() => [] as string[]),
      Deno.resolveDns(host, "AAAA").catch(() => [] as string[]),
    ]);
    const all = [...a, ...aaaa];
    if (all.length === 0) throw new Error("Host could not be resolved");
    for (const addr of all) {
      if (/^\d+\.\d+\.\d+\.\d+$/.test(addr) ? isPrivateIPv4(addr) : isPrivateIPv6(addr)) {
        throw new Error("Host resolves to a private/loopback address");
      }
    }
  } catch (e) {
    throw e instanceof Error ? e : new Error("DNS check failed");
  }
  return parsed;
}

/**
 * Fetch that follows redirects MANUALLY, re-validating every hop with
 * assertSafeUrl(). `redirect: "follow"` would let an attacker-controlled site
 * 302 the request into private/loopback/metadata addresses after the initial
 * check passed.
 */
export async function safeFetch(
  target: string,
  init: RequestInit = {},
  opts: { maxRedirects?: number; timeoutMs?: number } = {},
): Promise<Response> {
  const maxRedirects = opts.maxRedirects ?? 3;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), opts.timeoutMs ?? 15000);
  try {
    let current = (await assertSafeUrl(target)).toString();
    for (let hop = 0; ; hop++) {
      const response = await fetch(current, {
        ...init,
        signal: controller.signal,
        redirect: "manual",
      });
      const location = response.headers.get("location");
      if (response.status < 300 || response.status >= 400 || !location) {
        return response;
      }
      await response.body?.cancel().catch(() => {});
      if (hop >= maxRedirects) throw new Error("Too many redirects");
      const next = new URL(location, current).toString();
      await assertSafeUrl(next);
      current = next;
    }
  } finally {
    clearTimeout(timeout);
  }
}
