import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { hapticSelection } from "@/lib/haptics";
import { AppIconGrid } from "@/components/home/AppIconGrid";
import { HomeWidgetGrid } from "@/components/widgets/HomeWidgetGrid";
import { NewsPanel } from "@/components/home/NewsPanel";


const PAGES = ["news", "home", "widgets"] as const;
type PageId = (typeof PAGES)[number];

const Index = () => {

  const pagerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState<PageId>("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<number | null>(null);


  // Start centered on the home page
  useEffect(() => {
    const el = pagerRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth, behavior: "auto" });
  }, []);

  // Track which page is in view
  useEffect(() => {
    const el = pagerRef.current;
    if (!el) return;
    let ticking = false;
    // Tracks the last panel we fired a haptic for, so the tick happens once
    // per panel change rather than on every scroll frame.
    let lastIndex = Math.round(el.scrollLeft / el.clientWidth);
    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = window.setTimeout(() => setIsScrolling(false), 500);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const idx = Math.round(el.scrollLeft / el.clientWidth);
        const clamped = Math.max(0, Math.min(PAGES.length - 1, idx));
        if (clamped !== lastIndex) {
          // Panel snapped — the same selection feedback iOS gives a picker.
          lastIndex = clamped;
          hapticSelection();
        }
        setActivePage(PAGES[clamped]);
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    };

  }, []);



  return (
    <div className="relative min-h-[100svh] overflow-hidden">
      {/*
        No background of its own. The gradient that used to be declared here
        was already dead: marine-global's `background: transparent !important`
        matched this element (min-h-[100svh], no marine-keep) and beat the
        inline style. The wave pair, however, still rendered — stacked on top
        of the identical pair inside GlobalMaritimeBackground. Both are gone;
        the shared fixed backdrop shows through.
      */}




      {/* Header — viewport-fixed at top, visible on every page and unaffected by
          the pages scrolling underneath it */}
      <div className="fixed inset-x-0 top-0 z-30 pointer-events-none">
        {/* Scrim: content scrolled up behind the title fades out instead of
            colliding with the letters */}
        <div
          aria-hidden
          className="absolute inset-0 backdrop-blur-[6px]"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--marine-bg-top) / 0.96) 0%, hsl(var(--marine-bg-top) / 0.88) 60%, transparent 100%)",
            maskImage: "linear-gradient(180deg, #000 0%, #000 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 70%, transparent 100%)",
          }}
        />
        <div className="relative px-4 pb-10 text-center pt-[max(2rem,calc(env(safe-area-inset-top)+0.75rem))] sm:pt-[max(3rem,calc(env(safe-area-inset-top)+0.75rem))]">
          <h1
            className="motion-ambient select-none font-black tracking-wider notranslate"
            translate="no"
            lang="en"
            style={{
              background: "linear-gradient(135deg, hsl(var(--marine-title-start)) 0%, hsl(var(--marine-title-mid)) 50%, hsl(var(--marine-title-start)) 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "title-shine 3s linear infinite",
              textShadow: "0 10px 30px hsl(var(--marine-glow) / 0.16)",
            }}
          >
            <span className="block text-[clamp(1.6rem,6vw,2.4rem)] leading-tight">
              MARINER'S BOOK
            </span>
          </h1>
        </div>
      </div>

      {/* Horizontal swipeable pager — snap-stop always so one swipe = one page */}
      <main
        ref={pagerRef}
        className="relative z-10 flex h-[100svh] snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar overscroll-x-contain"
        style={{ scrollSnapType: "x mandatory" }}
        aria-label="Mariner's Book"
      >
        {/* LEFT — News */}
        <section aria-labelledby="home-news-heading" className="flex h-full w-screen flex-shrink-0 snap-center snap-always flex-col pt-[max(10rem,calc(env(safe-area-inset-top)+9rem))] pb-[max(4rem,env(safe-area-inset-bottom))]">
          <h2 id="home-news-heading" className="sr-only">Denizcilik Haberleri</h2>
          <NewsPanel />
        </section>

        {/* CENTER — Uygulamalar + Beta/Ayarlar */}
        <section aria-labelledby="home-apps-heading" className="flex h-full w-screen flex-shrink-0 snap-center snap-always flex-col items-center justify-start gap-8 overflow-y-auto overscroll-y-contain px-2 pt-[max(10rem,calc(env(safe-area-inset-top)+9rem))] pb-[max(4rem,env(safe-area-inset-bottom))]">
          <h2 id="home-apps-heading" className="sr-only">Uygulamalar</h2>
          <AppIconGrid />
        </section>

        {/* RIGHT — Widgets */}
        <section aria-labelledby="home-widgets-heading" className="flex h-full w-screen flex-shrink-0 snap-center snap-always flex-col overflow-y-auto overscroll-y-contain px-2 pt-[max(10rem,calc(env(safe-area-inset-top)+9rem))] pb-[max(4rem,env(safe-area-inset-bottom))]">
          <h2 id="home-widgets-heading" className="sr-only">Widget'lar</h2>
          <HomeWidgetGrid />
        </section>
      </main>

      {/* iOS-style pill: idle = Search, scrolling = page dots */}
      <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 right-0 z-20 flex justify-center pointer-events-none">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-global-search"))}
          aria-label={isScrolling ? `Sayfa ${PAGES.indexOf(activePage) + 1} / ${PAGES.length}` : "Ara"}
          className="pointer-events-auto flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-200 hover:bg-white/15 active:scale-95"
        >
          {isScrolling ? (
            <div className="flex items-center gap-2">
              {PAGES.map((page) => (
                <span
                  key={page}
                  className={
                    "h-2 w-2 rounded-full transition-all duration-200 " +
                    (activePage === page ? "bg-white scale-110" : "bg-white/40")
                  }
                />
              ))}
            </div>
          ) : (
            <>
              <Search className="h-4 w-4 text-white" strokeWidth={2.25} />
              <span className="text-[15px] font-medium text-white">Ara</span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes title-shine { to { background-position: 200% center; } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
};

export default Index;
