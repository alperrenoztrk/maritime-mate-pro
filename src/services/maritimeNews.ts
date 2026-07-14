import { supabase } from "@/integrations/supabase/safeClient";

export type MaritimeNewsItem = {
  title: string;
  link: string;
  publishedAt?: string;
  source: string;
  summary?: string;
  imageUrl?: string;
};

export type MaritimeNewsResponse = {
  fetchedAt: string;
  items: MaritimeNewsItem[];
  sources?: Array<{ id: string; name: string; url: string }>;
  errors?: Array<{ source: string; error: string }>;
  locale?: MaritimeNewsLocale;
};

export type MaritimeNewsLocale = {
  language: string;
  countryCode: string;
  countryName: string;
  mode: "regional" | "regional-and-global";
};

type FallbackEdition = MaritimeNewsLocale & {
  hl: string;
  ceid: string;
  query: string;
};

const FALLBACK_EDITIONS: Record<string, FallbackEdition> = {
  tr: { language: "tr", countryCode: "TR", countryName: "Türkiye", mode: "regional", hl: "tr", ceid: "TR:tr", query: "denizcilik gemi liman" },
  en: { language: "en", countryCode: "GB", countryName: "United Kingdom", mode: "regional-and-global", hl: "en-GB", ceid: "GB:en", query: "shipping maritime port" },
  es: { language: "es", countryCode: "ES", countryName: "España", mode: "regional", hl: "es", ceid: "ES:es", query: "marítimo buque puerto" },
  de: { language: "de", countryCode: "DE", countryName: "Deutschland", mode: "regional", hl: "de", ceid: "DE:de", query: "Schifffahrt Schiff Hafen" },
  fr: { language: "fr", countryCode: "FR", countryName: "France", mode: "regional", hl: "fr", ceid: "FR:fr", query: "maritime navire port" },
  it: { language: "it", countryCode: "IT", countryName: "Italia", mode: "regional", hl: "it", ceid: "IT:it", query: "marittimo nave porto" },
  pt: { language: "pt", countryCode: "PT", countryName: "Portugal", mode: "regional", hl: "pt-PT", ceid: "PT:pt-150", query: "marítimo navio porto" },
  ja: { language: "ja", countryCode: "JP", countryName: "日本", mode: "regional", hl: "ja", ceid: "JP:ja", query: "海運 船舶 港湾" },
  ko: { language: "ko", countryCode: "KR", countryName: "대한민국", mode: "regional", hl: "ko", ceid: "KR:ko", query: "해운 선박 항만" },
  "zh-CN": { language: "zh-CN", countryCode: "CN", countryName: "中国", mode: "regional", hl: "zh-CN", ceid: "CN:zh-Hans", query: "航运 船舶 港口" },
  nl: { language: "nl", countryCode: "NL", countryName: "Nederland", mode: "regional", hl: "nl", ceid: "NL:nl", query: "scheepvaart schip haven" },
  sv: { language: "sv", countryCode: "SE", countryName: "Sverige", mode: "regional", hl: "sv", ceid: "SE:sv", query: "sjöfart fartyg hamn" },
  no: { language: "no", countryCode: "NO", countryName: "Norge", mode: "regional", hl: "no", ceid: "NO:no", query: "skipsfart skip havn" },
  da: { language: "da", countryCode: "DK", countryName: "Danmark", mode: "regional", hl: "da", ceid: "DK:da", query: "skibsfart skib havn" },
  fi: { language: "fi", countryCode: "FI", countryName: "Suomi", mode: "regional", hl: "fi", ceid: "FI:fi", query: "merenkulku alus satama" },
  pl: { language: "pl", countryCode: "PL", countryName: "Polska", mode: "regional", hl: "pl", ceid: "PL:pl", query: "żegluga statek port" },
  cs: { language: "cs", countryCode: "CZ", countryName: "Česko", mode: "regional", hl: "cs", ceid: "CZ:cs", query: "námořní doprava loď přístav" },
  hu: { language: "hu", countryCode: "HU", countryName: "Magyarország", mode: "regional", hl: "hu", ceid: "HU:hu", query: "hajózás hajó kikötő" },
  ro: { language: "ro", countryCode: "RO", countryName: "România", mode: "regional", hl: "ro", ceid: "RO:ro", query: "maritim navă port" },
};

function resolveFallbackEdition(value: unknown): FallbackEdition {
  const raw = typeof value === "string" ? value.trim().replace(/_/g, "-").toLowerCase() : "";
  if (raw === "zh" || raw === "zh-cn" || raw === "zh-hans") return FALLBACK_EDITIONS["zh-CN"];
  if (raw === "nb" || raw === "nn" || raw.startsWith("nb-") || raw.startsWith("nn-")) return FALLBACK_EDITIONS.no;
  const exact = Object.keys(FALLBACK_EDITIONS).find((key) => key.toLowerCase() === raw);
  return FALLBACK_EDITIONS[exact || raw.split("-")[0]] || FALLBACK_EDITIONS.en;
}

function createFallbackNews(language: unknown): MaritimeNewsResponse {
  const edition = resolveFallbackEdition(language);
  const params = new URLSearchParams({
    q: edition.query,
    hl: edition.hl,
    gl: edition.countryCode,
    ceid: edition.ceid,
  });
  const url = `https://news.google.com/search?${params.toString()}`;
  return {
    fetchedAt: new Date().toISOString(),
    locale: {
      language: edition.language,
      countryCode: edition.countryCode,
      countryName: edition.countryName,
      mode: edition.mode,
    },
    items: [{
      title: `${edition.countryName} denizcilik haberlerini aç`,
      link: url,
      source: `Google News · ${edition.countryName}`,
      summary: "Haber servisine geçici olarak ulaşılamadı. Seçili dile ait güncel yerel kaynakları açabilirsiniz.",
    }],
    sources: [{ id: `fallback-${edition.language}`, name: `Google News · ${edition.countryName}`, url }],
  };
}

type SupabaseClientInternals = {
  supabaseUrl?: string;
  supabaseKey?: string;
  anonKey?: string;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toStringSafe(value: unknown): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return String(value);
}

function normalizeResponse(data: unknown): MaritimeNewsResponse {
  // Some runtimes can return non-JSON or unexpected shapes (e.g. { error: "..." }).
  if (!isObject(data)) {
    throw new Error("Haber servisi beklenmeyen yanıt döndürdü.");
  }

  // Edge function error path: { error: message }
  const topLevelError = data["error"];
  if (typeof topLevelError === "string" && topLevelError.trim()) {
    throw new Error(topLevelError);
  }

  const fetchedAt = toStringSafe(data["fetchedAt"]) || new Date().toISOString();
  const itemsRaw = data["items"];
  const errorsRaw = data["errors"];
  const sourcesRaw = data["sources"];
  const localeRaw = data["locale"];

  const items: MaritimeNewsItem[] = Array.isArray(itemsRaw)
    ? itemsRaw
        .map((it) => (isObject(it) ? it : null))
        .filter(Boolean)
        .map((it) => ({
          title: toStringSafe(it["title"]),
          link: toStringSafe(it["link"]),
          publishedAt: typeof it["publishedAt"] === "string" ? it["publishedAt"] : undefined,
          source: toStringSafe(it["source"]),
          summary: typeof it["summary"] === "string" ? it["summary"] : undefined,
          imageUrl: typeof it["imageUrl"] === "string" ? it["imageUrl"] : undefined,
        }))
        .filter((it) => Boolean(it.title && it.link))
    : [];

  const errors: MaritimeNewsResponse["errors"] = Array.isArray(errorsRaw)
    ? errorsRaw
        .map((e) => (isObject(e) ? e : null))
        .filter(Boolean)
        .map((e) => ({ source: toStringSafe(e["source"]), error: toStringSafe(e["error"]) }))
        .filter((e) => Boolean(e.source && e.error))
    : undefined;

  const sources: MaritimeNewsResponse["sources"] = Array.isArray(sourcesRaw)
    ? sourcesRaw
        .map((s) => (isObject(s) ? s : null))
        .filter(Boolean)
        .map((s) => ({ id: toStringSafe(s["id"]), name: toStringSafe(s["name"]), url: toStringSafe(s["url"]) }))
        .filter((s) => Boolean(s.id && s.name && s.url))
    : undefined;

  const locale: MaritimeNewsLocale | undefined = isObject(localeRaw)
    ? {
        language: toStringSafe(localeRaw["language"]),
        countryCode: toStringSafe(localeRaw["countryCode"]),
        countryName: toStringSafe(localeRaw["countryName"]),
        mode: localeRaw["mode"] === "regional-and-global" ? "regional-and-global" : "regional",
      }
    : undefined;

  // If all upstream feeds failed, treat it as an error so the UI retries instead of caching an empty list all day.
  if (items.length === 0 && errors && errors.length > 0) {
    const first = errors[0];
    throw new Error(first?.error || "Haber kaynaklarına erişilemedi.");
  }

  return { fetchedAt, items, errors, sources, locale };
}

function getFunctionBaseUrl(): string {
  // Use the environment variable which points to the correct project
  const baseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  if (baseUrl) return baseUrl;
  
  // Fallback: use supabase client URL
  const client = supabase as unknown as SupabaseClientInternals;
  const fallback = client.supabaseUrl;
  if (!fallback) throw new Error("Backend URL bulunamadı.");
  return fallback;
}

export function getFunctionUrls(functionName = "maritime-news"): string[] {
  const baseUrl = getFunctionBaseUrl().replace(/\/+$/, "");
  const urls = [`${baseUrl}/functions/v1/${functionName}`];

  try {
    const parsed = new URL(baseUrl);
    const hostParts = parsed.hostname.split(".");

    // https://<project>.supabase.co -> https://<project>.functions.supabase.co/<functionName>
    if (hostParts.length >= 3 && hostParts.includes("supabase")) {
      const projectRef = hostParts[0];
      const rootDomain = hostParts.slice(1).join(".");
      urls.push(`${parsed.protocol}//${projectRef}.functions.${rootDomain}/${functionName}`);
    }
  } catch (e) {
    console.warn("📰 [MaritimeNews] Could not derive functions domain", e);
  }

  return Array.from(new Set(urls));
}

export function getAnonKey(): string {
  const key = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) as
    | string
    | undefined;
  if (key) return key;

  // Fallback to the generated Supabase client key when env is not injected (common in some builds/webviews).
  const client = supabase as unknown as SupabaseClientInternals;
  const fallback = client.supabaseKey || client.anonKey;
  if (!fallback) throw new Error("Backend anahtarı bulunamadı.");
  return fallback;
}

function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...init, signal: controller.signal }).finally(() => {
    clearTimeout(timeout);
  });
}

export type FetchMaritimeNewsOptions = {
  /** Active application language. The server resolves this to a regional news edition. */
  language?: string;
  /**
   * Maximum number of articles to keep per source. Defaults to 10 so that each
   * feed contributes a reasonable slice of headlines with images to the UI.
   */
  perSourceLimit?: number;
  /**
   * Overall cap for returned items. When omitted, the server will default to
   * `perSourceLimit * feedCount` to include the requested slice from every
   * source.
   */
  totalLimit?: number;
};

export async function fetchMaritimeNews(
  options: FetchMaritimeNewsOptions = {},
  timeoutMs = 12_000
): Promise<MaritimeNewsResponse> {
  const { language = "en", perSourceLimit = 10, totalLimit } = options;
  // Use direct call to avoid mis-pointing to an old/paused backend project when the generated client URL/key is stale.
  const key = getAnonKey();
  const candidateUrls = getFunctionUrls();
  const errors: string[] = [];

  for (const url of candidateUrls) {
    try {
      console.info("📰 [MaritimeNews] Requesting:", { url, language, totalLimit, perSourceLimit });

      const res = await fetchWithTimeout(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          apikey: key,
          authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ language, limit: totalLimit, perSourceLimit }),
      }, timeoutMs);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("📰 [MaritimeNews] HTTP error:", { status: res.status, text });
        throw new Error(text || `Haber servisi hata döndürdü (${res.status}).`);
      }

      const data = (await res.json().catch(() => null)) as unknown;
      return normalizeResponse(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const withTimeout =
        err instanceof DOMException && err.name === "AbortError"
          ? `Zaman aşımı (${timeoutMs} ms)`
          : message;
      errors.push(`${url}: ${withTimeout}`);
      console.warn("📰 [MaritimeNews] Failed endpoint, trying next", { url, message: withTimeout });
    }
  }

  console.warn("📰 [MaritimeNews] All endpoints failed, falling back to static content", { errors });

  return {
    ...createFallbackNews(language),
    fetchedAt: new Date().toISOString(),
    errors: errors.map((e, i) => ({ source: `Uç nokta ${i + 1}`, error: e })),
  };
}
