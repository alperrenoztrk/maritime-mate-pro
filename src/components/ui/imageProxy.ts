/**
 * Wrap an external image URL with the images.weserv.nl proxy so that
 * Referer/hotlink-protected hosts load reliably inside the app.
 */
export function withImageProxy(url: string): string {
  if (!url) return url;
  if (
    url.startsWith("data:") ||
    url.startsWith("blob:") ||
    url.startsWith("/") ||
    url.startsWith("./") ||
    url.startsWith("../")
  ) {
    return url;
  }
  if (url.includes("images.weserv.nl")) return url;
  try {
    const parsedUrl = new URL(url);
    const target = `${parsedUrl.host}${parsedUrl.pathname}${parsedUrl.search}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(target)}&w=900&output=webp&we`;
  } catch {
    return url;
  }
}
