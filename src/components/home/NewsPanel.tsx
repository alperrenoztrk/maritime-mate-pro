import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ExternalLink, Newspaper, ArrowRight } from "lucide-react";
import { fetchMaritimeNews, type MaritimeNewsItem } from "@/services/maritimeNews";

function formatRelative(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diffMin = Math.round((Date.now() - d.getTime()) / 60000);
  if (diffMin < 1) return "şimdi";
  if (diffMin < 60) return `${diffMin} dk önce`;
  const h = Math.round(diffMin / 60);
  if (h < 24) return `${h} sa önce`;
  const days = Math.round(h / 24);
  if (days < 7) return `${days} gün önce`;
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
}

function proxyImg(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const u = url.startsWith("//") ? `https:${url}` : url;
    return `https://images.weserv.nl/?url=${encodeURIComponent(u.replace(/^https?:\/\//, ""))}&w=240&h=160&fit=cover&output=webp&q=70`;
  } catch {
    return undefined;
  }
}

export function NewsPanel() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["maritime-news", "home-panel"],
    queryFn: fetchMaritimeNews,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  const items: MaritimeNewsItem[] = (data?.items ?? []).slice(0, 8);

  return (
    <section
      className="flex h-full flex-col px-4 pt-2"
      aria-label="Denizcilik haberleri"
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-white">
          <Newspaper className="h-4 w-4" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Haberler</h2>
        </div>
        <Link
          to="/maritime-news"
          className="flex items-center gap-1 text-[11px] font-medium text-white/70 hover:text-white"
        >
          Tümü <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto rounded-3xl border border-white/15 bg-white/[0.06] p-2 backdrop-blur-xl">
        {isLoading && (
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-2xl bg-white/5 p-2.5 animate-pulse"
              >
                <div className="h-14 w-20 rounded-xl bg-white/10" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 w-4/5 rounded bg-white/10" />
                  <div className="h-2 w-2/5 rounded bg-white/10" />
                </div>
              </li>
            ))}
          </ul>
        )}

        {isError && (
          <p className="px-3 py-6 text-center text-xs text-white/60">
            Haberler şu an alınamıyor.
          </p>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <p className="px-3 py-6 text-center text-xs text-white/60">
            Şu an gösterilecek haber yok.
          </p>
        )}

        <ul className="space-y-1.5">
          {items.map((item) => {
            const img = proxyImg(item.imageUrl);
            return (
              <li key={item.link}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/10 active:bg-white/15"
                >
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className="h-14 w-20 flex-shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-700/60 to-slate-700/60">
                      <Newspaper className="h-5 w-5 text-white/70" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[12px] font-medium leading-snug text-white">
                      {item.title}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/55">
                      <span className="truncate">{item.source}</span>
                      <span>·</span>
                      <span className="flex-shrink-0">{formatRelative(item.publishedAt)}</span>
                      <ExternalLink className="ml-auto h-3 w-3 flex-shrink-0 text-white/40" />
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
