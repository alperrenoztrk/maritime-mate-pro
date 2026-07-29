import { Helmet } from "react-helmet-async";

const SITE_ORIGIN = "https://nauticalleap.com";

export interface SEOProps {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/lessons". Defaults to current pathname. */
  path?: string;
  /** Optional JSON-LD schema object or array of objects to inject. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Per-route <head> tags: unique title, description, self-referencing
 * canonical and Open Graph URL. Sitewide fallback tags stay in index.html.
 */
export function SEO({ title, description, path, jsonLd }: SEOProps) {
  const resolvedPath =
    path ??
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const url = `${SITE_ORIGIN}${resolvedPath}`;
  const safeTitle = title.length > 60 ? title.slice(0, 57) + "…" : title;
  const safeDesc =
    description.length > 160 ? description.slice(0, 157) + "…" : description;

  return (
    <Helmet>
      <title>{safeTitle}</title>
      <meta name="description" content={safeDesc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDesc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDesc} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
}
