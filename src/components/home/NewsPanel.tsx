import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ChevronRight, Newspaper } from "lucide-react";
import { fetchMaritimeNews, type MaritimeNewsItem } from "@/services/maritimeNews";
import { NewsReaderDialog } from "@/components/news/NewsReaderDialog";

function formatRelative(iso?: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diffMinutes = Math.round((Date.now() - date.getTime()) / 60_000);
  if (diffMinutes < 1) return "now";
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  const hours = Math.round(diffMinutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
}

function proxyImage(url?: string): string | undefined {
  if (!url) return undefined;
  const source = url.startsWith("//") ? `https:${url}` : url;
  return `https://images.weserv.nl/?url=${encodeURIComponent(source.replace(/^https?:\/\//, ""))}&w=240&h=160&fit=cover&output=webp&q=72`;
}

export function NewsPanel() {
  const [selected, setSelected] = useState<MaritimeNewsItem | null>(null);
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["maritime-news", "home-panel"],
    queryFn: () => fetchMaritimeNews(),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
  const items = (data?.items ?? []).slice(0, 8);

  const openItem = (item: MaritimeNewsItem) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <section aria-labelledby="home-news-title" className="space-y-3">
      <div className="flex items-center justify-between gap-3 px-1">
        <div>
          <h2 id="home-news-title" className="flex items-center gap-2 text-xl font-semibold tracking-[-0.02em] text-foreground">
            <Newspaper className="h-5 w-5 text-primary" />
            Maritime News
          </h2>
          <p className="mt-0.5 text-caption text-muted-foreground">Current headlines from the industry</p>
        </div>
        <Link to="/maritime-news" className="inline-flex min-h-11 items-center gap-0.5 rounded-xl px-2 text-sm font-semibold text-primary hover:bg-primary/10">
          All
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="surface-2 overflow-hidden rounded-2xl border">
        {isLoading && (
          <div className="divide-y divide-border/60" aria-label="News loading">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex animate-pulse gap-3 p-3.5">
                <div className="h-16 w-20 shrink-0 rounded-xl bg-muted" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 w-5/6 rounded bg-muted" />
                  <div className="h-3 w-2/5 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && <p className="p-6 text-center text-sm text-muted-foreground">News cannot be received at the moment.</p>}
        {!isLoading && !isError && items.length === 0 && (
          <p className="p-6 text-center text-sm text-muted-foreground">There is currently no news to display.</p>
        )}

        {!isLoading && !isError && items.length > 0 && (
          <ul className="divide-y divide-border/60">
            {items.map((item) => {
              const image = proxyImage(item.imageUrl);
              return (
                <li key={item.link}>
                  <button
                    type="button"
                    onClick={() => openItem(item)}
                    className="flex min-h-[5.5rem] w-full items-center gap-3 p-3.5 text-left transition-colors duration-control hover:bg-primary/5 active:bg-primary/10"
                  >
                    {image ? (
                      <img src={image} alt="" loading="lazy" className="h-16 w-20 shrink-0 rounded-xl object-cover" />
                    ) : (
                      <span className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Newspaper className="h-5 w-5" />
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">{item.title}</span>
                      <span className="mt-1 block text-caption text-muted-foreground">{formatRelative(item.publishedAt)}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <NewsReaderDialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) setSelected(null);
        }}
        item={selected}
      />
    </section>
  );
}
