import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppIconGrid } from "@/components/home/AppIconGrid";
import { NewsPanel } from "@/components/home/NewsPanel";
import { HomeWidgetGrid } from "@/components/widgets/HomeWidgetGrid";
import { hapticSelection } from "@/lib/haptics";
import { prefersReducedMotion } from "@/hooks/useAppMotion";

const VIEWS = [
  { id: "overview", label: "Özet" },
  { id: "news", label: "Haberler" },
  { id: "widgets", label: "Widget'lar" },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

const Index = () => {
  const [activeView, setActiveView] = useState<ViewId>("overview");
  const reduceMotion = prefersReducedMotion();

  return (
    <main className="relative min-h-[100svh] px-[max(1rem,var(--safe-left))] pt-[calc(var(--safe-top)+1.5rem)] text-foreground sm:px-[max(1.25rem,var(--safe-left))]">
      <div className="mx-auto w-full max-w-3xl">
        <header className="pb-5">
          <h1
            data-page-title
            className="notranslate text-[clamp(1.75rem,7vw,3rem)] font-bold leading-tight tracking-[-0.04em] text-foreground"
            translate="no"
            lang="en"
          >
            Mariner&rsquo;s Book
          </h1>
        </header>


        <div
          role="tablist"
          aria-label="Ana ekran görünümü"
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

        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={activeView}
            id={`home-panel-${activeView}`}
            role="tabpanel"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.18, ease: [0.32, 0.72, 0, 1] }}
            className="py-5"
          >
            {activeView === "overview" && <AppIconGrid />}
            {activeView === "news" && <NewsPanel />}
            {activeView === "widgets" && <HomeWidgetGrid />}
          </motion.section>
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Index;
