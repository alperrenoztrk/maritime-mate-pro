import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { AppIconGrid } from "@/components/home/AppIconGrid";
import { HomeWidgetGrid } from "@/components/widgets/HomeWidgetGrid";
import { NewsPanel } from "@/components/home/NewsPanel";


const PAGES = ["news", "home", "widgets"] as const;
type PageId = (typeof PAGES)[number];

const PAGE_LABELS: Record<PageId, string> = {
  news: "Haberler",
  home: "Uygulamalar",
  widgets: "Widget'lar",
};

const Index = () => {

  const pagerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState<PageId>("home");


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
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const idx = Math.round(el.scrollLeft / el.clientWidth);
        const clamped = Math.max(0, Math.min(PAGES.length - 1, idx));
        setActivePage(PAGES[clamped]);
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToPage = (index: number) => {
    const el = pagerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };



  return (
    <div
      className="relative min-h-[100svh] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(214 84% 8%) 0%, hsl(214 84% 15%) 50%, hsl(200 80% 18%) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(56,189,248,0.14) 0%, transparent 55%)",
        }}
      />

      {/* Subtle ocean waves at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[28%] overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-[10%] left-0 w-[200%] h-[60px]"
          viewBox="0 0 2880 60"
          preserveAspectRatio="none"
          style={{ animation: "home-drift 22s linear infinite" }}
        >
          <path
            d="M0,35 C160,28 320,42 480,36 C640,30 800,22 960,28 C1120,34 1280,46 1440,40 C1600,34 1760,22 1920,28 C2080,34 2240,46 2400,40 C2560,34 2720,28 2880,32 L2880,60 L0,60 Z"
            fill="rgba(14,100,140,0.35)"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-[44px]"
          viewBox="0 0 2880 44"
          preserveAspectRatio="none"
          style={{ animation: "home-drift-rev 16s linear infinite" }}
        >
          <path
            d="M0,22 C140,18 280,28 420,24 C560,20 700,14 880,18 C1060,22 1180,30 1360,26 C1540,22 1640,14 1800,18 C1960,22 2080,30 2280,26 C2480,22 2620,16 2780,20 C2840,22 2860,22 2880,22 L2880,44 L0,44 Z"
            fill="rgba(30,180,220,0.28)"
          />
        </svg>
      </div>




      {/* Header — fixed at top, visible on every page */}
      <div className="absolute top-0 left-0 right-0 z-30 px-2 pt-8 sm:pt-12 pointer-events-none">
        <div className="px-4 text-center">
          <h1
            className="select-none font-black tracking-wider notranslate"
            translate="no"
            lang="en"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #7dd3fc 50%, #ffffff 100%)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "title-shine 3s linear infinite",
              textShadow: "0 0 32px rgba(56,189,248,0.3)",
            }}
          >
            <span className="block text-[clamp(1.6rem,6vw,2.4rem)] leading-tight">
              MARINER'S BOOK
            </span>
            <span className="sr-only"> — Interactive Maritime Learning and Calculations</span>
          </h1>
          {/* Current pager page — orients the user as they swipe */}
          <div className="mt-1.5 flex h-5 items-center justify-center" aria-hidden="true">
            <span
              key={activePage}
              className="text-[12px] font-medium uppercase tracking-[0.22em] text-sky-200/75"
              style={{ animation: "page-label-in 0.3s ease both" }}
            >
              {PAGE_LABELS[activePage]}
            </span>
          </div>
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
        <section className="flex h-full w-screen flex-shrink-0 snap-center snap-always flex-col pt-[max(10rem,calc(env(safe-area-inset-top)+9rem))] pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))]">
          <NewsPanel />
        </section>

        {/* CENTER — Uygulamalar + Beta/Ayarlar */}
        <section className="flex h-full w-screen flex-shrink-0 snap-center snap-always flex-col items-center justify-start gap-8 overflow-y-auto px-2 pt-[max(10rem,calc(env(safe-area-inset-top)+9rem))] pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))]">
          <AppIconGrid />
        </section>

        {/* RIGHT — Widgets */}
        <section className="flex h-full w-screen flex-shrink-0 snap-center snap-always flex-col overflow-y-auto px-2 pt-[max(10rem,calc(env(safe-area-inset-top)+9rem))] pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))]">
          <HomeWidgetGrid />
        </section>
      </main>

      {/* Bottom controls: always-visible tappable page dots + iOS-style search pill */}
      <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 right-0 z-20 flex flex-col items-center gap-2.5 pointer-events-none">
        <div
          className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-white/10 bg-black/20 px-1.5 py-1 backdrop-blur-xl"
          role="tablist"
          aria-label="Ana ekran sayfaları"
        >
          {PAGES.map((p, i) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={activePage === p}
              aria-label={PAGE_LABELS[p]}
              onClick={() => scrollToPage(i)}
              className="flex h-7 min-h-0 min-w-0 items-center justify-center rounded-full px-1.5 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <span
                className={
                  "h-2 rounded-full transition-all duration-300 " +
                  (activePage === p ? "w-5 bg-white" : "w-2 bg-white/40")
                }
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-global-search"))}
          aria-label="Ara"
          className="pointer-events-auto flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-200 hover:bg-white/15 active:scale-95"
        >
          <Search className="h-4 w-4 text-white" strokeWidth={2.25} />
          <span className="text-[15px] font-medium text-white">Ara</span>
        </button>
      </div>

      <style>{`
        @keyframes home-drift { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes home-drift-rev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes title-shine { to { background-position: 200% center; } }
        @keyframes page-label-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
};

export default Index;
