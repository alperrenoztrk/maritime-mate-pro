import { useEffect, useRef, useState } from "react";
import { AppIconGrid } from "@/components/home/AppIconGrid";
import { HomeWidgetGrid } from "@/components/widgets/HomeWidgetGrid";
import { NewsPanel } from "@/components/home/NewsPanel";


const PAGES = ["news", "home", "widgets"] as const;
type PageId = (typeof PAGES)[number];

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
    return () => {
      el.removeEventListener("scroll", onScroll);
    };

  }, []);



  return (
    <div
      className="app-tabbar-inset-managed relative min-h-[100svh] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--marine-bg-top)) 0%, hsl(var(--marine-bg-middle)) 52%, hsl(var(--marine-bg-bottom)) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, hsl(var(--marine-glow) / 0.16) 0%, transparent 55%)",
        }}
      />

      {/* Subtle ocean waves at bottom */}
      <div className="home-decorative-motion absolute bottom-0 left-0 right-0 h-[28%] overflow-hidden pointer-events-none opacity-70">
        <svg
          className="absolute bottom-[10%] left-0 w-[200%] h-[60px]"
          viewBox="0 0 2880 60"
          preserveAspectRatio="none"
          style={{ animation: "home-drift 22s linear infinite" }}
        >
          <path
            d="M0,35 C160,28 320,42 480,36 C640,30 800,22 960,28 C1120,34 1280,46 1440,40 C1600,34 1760,22 1920,28 C2080,34 2240,46 2400,40 C2560,34 2720,28 2880,32 L2880,60 L0,60 Z"
            fill="hsl(var(--marine-wave-back) / 0.26)"
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
            fill="hsl(var(--marine-wave-front) / 0.22)"
          />
        </svg>
      </div>




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
            className="home-decorative-motion select-none font-extrabold tracking-[0.04em] notranslate"
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
        <section aria-labelledby="home-news-heading" className="flex h-full w-screen flex-shrink-0 snap-center snap-always flex-col pt-[max(10rem,calc(env(safe-area-inset-top)+9rem))] pb-[calc(var(--app-content-bottom)+2.25rem)]">
          <h2 id="home-news-heading" className="sr-only">Denizcilik Haberleri</h2>
          <NewsPanel />
        </section>

        {/* CENTER — Uygulamalar + Beta/Ayarlar */}
        <section aria-labelledby="home-apps-heading" className="flex h-full w-screen flex-shrink-0 snap-center snap-always flex-col items-center justify-start gap-8 overflow-y-auto overscroll-y-contain px-2 pt-[max(10rem,calc(env(safe-area-inset-top)+9rem))] pb-[calc(var(--app-content-bottom)+2.25rem)]">
          <h2 id="home-apps-heading" className="sr-only">Uygulamalar</h2>
          <AppIconGrid />
        </section>

        {/* RIGHT — Widgets */}
        <section aria-labelledby="home-widgets-heading" className="flex h-full w-screen flex-shrink-0 snap-center snap-always flex-col overflow-y-auto overscroll-y-contain px-2 pt-[max(10rem,calc(env(safe-area-inset-top)+9rem))] pb-[calc(var(--app-content-bottom)+2.25rem)]">
          <h2 id="home-widgets-heading" className="sr-only">Widget'lar</h2>
          <HomeWidgetGrid />
        </section>
      </main>

      {/* Persistent page control stays discoverable above the global tab bar. */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-20 flex justify-center"
        style={{ bottom: "calc(var(--app-tabbar-height) + 0.6rem)" }}
        aria-label={`Sayfa ${PAGES.indexOf(activePage) + 1} / ${PAGES.length}`}
      >
        <div className="ios-glass flex items-center gap-2 rounded-full px-3 py-2">
          {PAGES.map((page) => (
            <span
              key={page}
              className={
                "h-2 rounded-full transition-[width,background-color] duration-200 " +
                (activePage === page ? "w-5 bg-primary" : "w-2 bg-muted-foreground/40")
              }
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes home-drift { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes home-drift-rev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes title-shine { to { background-position: 200% center; } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
};

export default Index;
