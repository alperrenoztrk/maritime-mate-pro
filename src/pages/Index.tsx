import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchHomeNews, readCachedNews, HOME_NEWS_QUERY_KEY } from "@/services/maritimeNews";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Crown } from "lucide-react";
import { useEntitlement } from "@/contexts/useEntitlement";
import { AppIconGrid } from "@/components/home/AppIconGrid";
import { StudyShortcuts } from "@/components/home/StudyShortcuts";
import { NewsPanel } from "@/components/home/NewsPanel";
import { HomeWidgetGrid } from "@/components/widgets/HomeWidgetGrid";
import { hapticSelection } from "@/lib/haptics";
import { MOTION_EASE_OUT, MOTION_SECONDS, useReducedMotion } from "@/hooks/useAppMotion";

const VIEWS = [
  { id: "overview", label: "Summary" },
  { id: "news", label: "News" },
  { id: "widgets", label: "Widgets" },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

const Index = () => {
  const [activeView, setActiveView] = useState<ViewId>("overview");
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const { hasProAccess, loading: entitlementLoading } = useEntitlement();
  const queryClient = useQueryClient();

  // Warm the news page as soon as home is shown so it opens instantly.
  useEffect(() => {
    const cached = readCachedNews();
    if (cached && !queryClient.getQueryData(HOME_NEWS_QUERY_KEY)) {
      queryClient.setQueryData(HOME_NEWS_QUERY_KEY, cached.data, { updatedAt: cached.savedAt });
    }
    void queryClient
      .prefetchQuery({ queryKey: HOME_NEWS_QUERY_KEY, queryFn: fetchHomeNews, staleTime: 5 * 60 * 1000 })
      .then(() => {
        const items = queryClient.getQueryData<{ items?: { imageUrl?: string }[] }>(HOME_NEWS_QUERY_KEY)?.items ?? [];
        items.slice(0, 8).forEach((item) => {
          if (!item.imageUrl) return;
          const src = item.imageUrl.startsWith("//") ? `https:${item.imageUrl}` : item.imageUrl;
          const img = new Image();
          img.src = `https://images.weserv.nl/?url=${encodeURIComponent(src.replace(/^https?:\/\//, ""))}&w=240&h=160&fit=cover&output=webp&q=72`;
        });
      });
  }, [queryClient]);

  return (
    <main className="relative min-h-[100svh] px-[max(1rem,var(--safe-left))] pt-[calc(var(--safe-top)+1.5rem)] text-foreground sm:px-[max(1.25rem,var(--safe-left))]">
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex items-center justify-between gap-3 pb-5">
          <h1
            data-page-title
            className="notranslate min-w-0 text-[clamp(1.75rem,7vw,3rem)] font-bold leading-tight tracking-[-0.04em] text-foreground"
            translate="no"
            lang="en"
          >
            Mariner&rsquo;s Book
          </h1>
          {/* Home entry to the paywall. Hidden while the entitlement is still
              loading so a Pro member never sees an upgrade prompt flash. */}
          {!entitlementLoading && (
            <button
              type="button"
              onClick={() => navigate("/pro")}
              aria-label="Mariner's Book Pro"
              className={`notranslate inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-colors duration-control ${
                hasProAccess
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-amber-400/60 bg-amber-500 text-black hover:bg-amber-400"
              }`}
              translate="no"
            >
              <Crown className="h-4 w-4" aria-hidden="true" />
              Pro
            </button>
          )}
        </header>


        <div
          role="tablist"
          aria-label="Home screen view"
          className="surface-1 sticky top-[calc(var(--safe-top)+0.5rem)] z-20 grid grid-cols-3 gap-1 rounded-xl border p-1 shadow-elev-1"
        >
          {VIEWS.map((view) => {
            const selected = activeView === view.id;
            return (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`home-panel-${view.id}`}
                onClick={() => {
                  if (!selected) hapticSelection();
                  setActiveView(view.id);
                }}
                className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition-[background-color,color,box-shadow] duration-control ${
                  selected
                    ? "bg-background text-foreground shadow-elev-1"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {view.label}
              </button>
            );
          })}
        </div>

        {/* Keep long study titles from widening the shared tab-panel track. */}
        <div className="grid grid-cols-1 items-start">
        <AnimatePresence mode="sync" initial={false}>
          <motion.section
            key={activeView}
            id={`home-panel-${activeView}`}
            role="tabpanel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : MOTION_SECONDS.control, ease: MOTION_EASE_OUT }}
            className="col-start-1 row-start-1 min-w-0 py-5"
          >
            {activeView === "overview" && (
              <div className="space-y-6">
                <StudyShortcuts />
                <AppIconGrid />
              </div>
            )}
            {activeView === "news" && <NewsPanel />}
            {activeView === "widgets" && <HomeWidgetGrid />}
          </motion.section>
        </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default Index;
