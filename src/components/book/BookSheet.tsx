import { createContext, useContext, type ReactNode } from "react";

const BookSheetNestingContext = createContext(false);

interface BookSheetProps {
  title: string;
  children: ReactNode;
  /** Persistent route frame: wider paper and legacy-screen normalization. */
  routeFrame?: boolean;
}

/**
 * Hub sayfalarını kitabın bir sayfası gibi gösteren sarmalayıcı:
 * /book içindekiler sayfalarıyla aynı parşömen yaprak görseli
 * (cilt gölgesi, çizgili kâğıt, lekeler, koşu başlığı, serif mürekkep).
 * CSS `bs-` prefix'lidir — splash ve BookPage'in global/scoped kurallarıyla çakışmaz.
 */
export function BookSheet({ title, children, routeFrame = false }: BookSheetProps) {
  const alreadyInsideBook = useContext(BookSheetNestingContext);

  // Pages converted in earlier releases already render BookSheet themselves.
  // When the persistent route frame owns the paper, absorb that second shell
  // so the result is one real page rather than a book nested inside a book.
  if (alreadyInsideBook) return <>{children}</>;

  return (
    <div
      className={`relative min-h-[100svh] px-3 pb-24 pt-[max(3.6rem,calc(env(safe-area-inset-top)+3rem))] ${routeFrame ? "bs-route-frame" : ""}`}
      data-book-route={routeFrame || undefined}
    >
      <div className={`bs-volume mx-auto w-full ${routeFrame ? "max-w-4xl" : "max-w-lg"}`}>
        <div className="bs-page">
          <header className="bs-running">{title}</header>
          <BookSheetNestingContext.Provider value>
            <div className={routeFrame ? "bs-route-content" : undefined}>{children}</div>
          </BookSheetNestingContext.Provider>
        </div>
      </div>

      <style>{`
        .bs-volume{
          position: relative;
          border-radius: 3px 6px 6px 3px;
          background: linear-gradient(180deg, #f3e7c9 0%, #e6d3a8 100%);
          box-shadow: 0 14px 34px rgba(0,0,0,.55), inset 0 0 18px rgba(120,80,20,.18);
        }
        .bs-volume::before{
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 10px;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(90deg, rgba(20,12,2,.5), rgba(20,12,2,.12) 70%, transparent);
          border-radius: 3px 0 0 3px;
        }
        .bs-volume::after{
          content: "";
          position: absolute;
          right: 0; top: 1.5%; bottom: 1.5%;
          width: 9px;
          z-index: 2;
          pointer-events: none;
          border-radius: 0 4px 4px 0;
          background: repeating-linear-gradient(90deg, #f0e3c2 0 1.6px, #d5c194 1.6px 3.2px);
        }
        .bs-page{
          margin: 10px 12px 10px 14px;
          border-radius: 2px;
          padding: clamp(14px, 4vw, 22px) clamp(14px, 4.5vw, 24px) 26px;
          background:
            radial-gradient(22% 14% at 82% 12%, rgba(150,100,30,.08), transparent 70%),
            radial-gradient(30% 18% at 12% 78%, rgba(150,100,30,.06), transparent 70%),
            radial-gradient(14% 9% at 60% 45%, rgba(150,100,30,.05), transparent 70%),
            repeating-linear-gradient(180deg, transparent 0 9px, rgba(120,80,20,.07) 9px 10px),
            linear-gradient(180deg, #f8eed4 0%, #eddcb4 100%);
          box-shadow:
            inset 6px 0 10px -6px rgba(90,60,20,.45),
            inset 0 6px 8px -6px rgba(90,60,20,.3),
            inset 0 -6px 8px -6px rgba(90,60,20,.3);
          font-family: Georgia, 'Times New Roman', serif;
          color: #4a3113;
        }
        .bs-running{
          margin-bottom: 14px;
          text-align: center;
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .3em;
          text-indent: .3em;
          color: rgba(90,61,20,.6);
        }
        .bs-running::before{ content: "❖  "; opacity: .5; }
        .bs-running::after{ content: "  ❖"; opacity: .5; }
        .bs-fleuron{
          text-align: center;
          color: rgba(90,61,20,.55);
          font-size: 1.05rem;
          line-height: 1;
          margin: 4px 0 10px;
        }
        .bs-chapter{
          display: flex;
          align-items: center;
          gap: .5em;
          width: 100%;
          padding: 6px 0 4px;
          text-align: left;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(1rem, 4.2vw, 1.2rem);
          font-weight: 700;
          letter-spacing: .12em;
          color: #3f2a0e;
          text-decoration: none;
        }
        .bs-chapter:active{ opacity: .7; }
        .bs-chapter:focus, .bs-entry:focus, .bs-chip:focus, .bs-input:focus{ outline: none; }
        .bs-chapter:focus-visible, .bs-entry:focus-visible, .bs-chip:focus-visible{
          outline: 2px dotted rgba(74,49,19,.6);
          outline-offset: 2px;
        }
        .bs-chapter-rule{
          height: 1px;
          margin: 0 0 8px;
          background: linear-gradient(90deg, rgba(176,124,32,.7), rgba(176,124,32,.15));
          box-shadow: 0 2px 0 rgba(176,124,32,.2);
        }
        .bs-section{
          margin: 12px 0 2px;
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: rgba(90,61,20,.8);
        }
        .bs-entry{
          display: flex;
          align-items: baseline;
          width: 100%;
          min-height: 40px;
          padding: 7px 0 3px 12px;
          text-align: left;
          text-decoration: none;
          color: #4a3113;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(.86rem, 3.6vw, .95rem);
          line-height: 1.35;
        }
        a.bs-entry:active, button.bs-entry:active{ opacity: .65; }
        .bs-entry-label{ max-width: 78%; }
        .bs-leader{
          flex: 1;
          min-width: 16px;
          margin: 0 .45em;
          border-bottom: 2px dotted rgba(120,80,20,.45);
          transform: translateY(-3px);
        }
        .bs-anchor{ font-size: .72em; opacity: .65; }
        .bs-note{
          font-size: .72em;
          font-style: italic;
          color: rgba(90,61,20,.65);
          white-space: nowrap;
        }
        .bs-text{ color: #4a3113; }
        .bs-muted{ color: rgba(90,61,20,.72); }
        .bs-hairline{
          height: 1px;
          border: none;
          background: none;
          border-bottom: 1px dotted rgba(120,80,20,.35);
        }
        .bs-input{
          width: 100%;
          border: none;
          border-bottom: 1.5px solid rgba(74,49,19,.5);
          border-radius: 0;
          background: transparent;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: .92rem;
          color: #4a3113;
          padding: 6px 26px 6px 26px;
        }
        .bs-input::placeholder{ color: rgba(90,61,20,.5); font-style: italic; }
        .bs-input:focus{
          outline: none;
          border-bottom-color: rgba(74,49,19,.85);
        }
        .bs-chip{
          display: inline-flex;
          align-items: center;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: rgba(74,49,19,.8);
          padding: 3px 9px;
          border-radius: 3px;
          border: 1px dotted rgba(120,80,20,.55);
          background: transparent;
        }
        .bs-chip--on{
          border: 1px solid #4a3113;
          background: #4a3113;
          color: #f3e7c9;
        }
        .bs-photo{
          filter: sepia(.5) contrast(.92) saturate(.8);
          border: 1px solid rgba(74,49,19,.4);
        }
        /* ── Okuma yüzeyi (detay sayfaları) ── */
        .bs-h2{
          margin: 14px 0 4px;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 1.02rem;
          font-weight: 700;
          letter-spacing: .06em;
          color: #3f2a0e;
          border-bottom: 1px solid rgba(176,124,32,.45);
          padding-bottom: 3px;
        }
        .bs-prose{
          font-family: Georgia, 'Times New Roman', serif;
          color: #4a3113;
          font-size: .88rem;
          line-height: 1.65;
        }
        .bs-prose p{ margin: 6px 0; }
        .bs-prose strong, .bs-prose b{ color: #3f2a0e; }
        .bs-prose ul, .bs-prose ol{ margin: 6px 0 6px 18px; }
        .bs-prose ul{ list-style: disc; }
        .bs-prose ol{ list-style: decimal; }
        .bs-prose li{ margin: 3px 0; }
        .bs-prose li::marker{ color: rgba(120,80,20,.7); }
        .bs-prose h3, .bs-prose h4{
          margin: 10px 0 4px;
          font-weight: 700;
          color: #3f2a0e;
        }
        .bs-prose img{
          max-width: 100%;
          border-radius: 2px;
          margin: 8px auto;
          display: block;
          filter: sepia(.5) contrast(.92) saturate(.8);
          border: 1px solid rgba(74,49,19,.4);
        }
        .bs-prose a{ color: #7a5c1a; text-decoration: underline dotted; }
        .bs-formula{
          margin: 8px 0;
          padding: 8px 12px;
          border: 1px solid rgba(120,80,20,.45);
          border-radius: 3px;
          background: rgba(255,255,255,.35);
          font-family: Georgia, 'Times New Roman', serif;
          color: #3f2a0e;
        }
        .bs-formula::before{
          content: "Formül";
          display: block;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: rgba(90,61,20,.65);
          margin-bottom: 3px;
        }
        .bs-table-wrap{ overflow-x: auto; margin: 8px 0; }
        .bs-table{
          width: 100%;
          border-collapse: collapse;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: .8rem;
          color: #4a3113;
        }
        .bs-table th{
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(90,61,20,.85);
          text-align: left;
          padding: 5px 8px;
          border-bottom: 1.5px solid rgba(120,80,20,.55);
        }
        .bs-table td{
          padding: 5px 8px;
          border-bottom: 1px dotted rgba(120,80,20,.4);
          vertical-align: top;
        }
        .bs-callout{
          margin: 8px 0;
          padding: 7px 10px 7px 12px;
          border-left: 3px solid rgba(120,80,20,.6);
          background: rgba(120,80,20,.07);
          border-radius: 0 3px 3px 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: .84rem;
          color: #4a3113;
        }
        .bs-callout-label{
          display: block;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: rgba(90,61,20,.7);
          margin-bottom: 2px;
        }
        .bs-btn{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 3px;
          background: #4a3113;
          color: #f3e7c9;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: .82rem;
          font-weight: 600;
          letter-spacing: .08em;
          border: 1px solid #3f2a0e;
          box-shadow: 0 2px 4px rgba(0,0,0,.25);
          text-decoration: none;
          transition: transform .12s ease;
        }
        .bs-btn:active{ transform: scale(.97); }
        .bs-btn--ghost{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 3px;
          background: transparent;
          color: #4a3113;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: .82rem;
          font-weight: 600;
          letter-spacing: .08em;
          border: 1px dotted rgba(120,80,20,.6);
          text-decoration: none;
          transition: transform .12s ease;
        }
        .bs-btn--ghost:active{ transform: scale(.97); }
        .bs-btn:disabled, .bs-btn--ghost:disabled{ opacity: .4; }
        .bs-sticky{
          position: sticky;
          top: 0;
          z-index: 5;
          background: #f6ecd0;
          border-bottom: 1px dotted rgba(120,80,20,.4);
          padding: 6px 0;
          margin: 0 0 8px;
        }

        /* ── Persistent route frame ───────────────────────────────
           Legacy formula/calculator pages use several older shells. These
           rules preserve every control and state flow while translating the
           shell, cards, typography and inputs to the common paper surface. */
        .bs-route-frame{
          isolation: isolate;
        }
        .bs-route-frame .bs-page{
          min-height: calc(100svh - 7rem);
        }
        .bs-route-content{
          color: #4a3113;
          font-family: Georgia, 'Times New Roman', serif;
        }
        .bs-route-content :where(.marine-shell){
          min-height: 0 !important;
          overflow: visible !important;
          background: transparent !important;
          color: #4a3113 !important;
        }
        .bs-route-content .marine-shell > .pointer-events-none{
          display: none !important;
        }
        .bs-route-content .marine-shell main{
          min-height: 0 !important;
          max-width: none !important;
          padding: 0 !important;
        }
        .bs-route-content :where(
          .min-h-screen,
          [class*="min-h-[100svh]"],
          [class*="min-h-[100vh]"],
          [class*="min-h-[100"]
        ){
          min-height: 0 !important;
          background: transparent !important;
          background-image: none !important;
        }
        .bs-route-content :where(.container){
          max-width: none !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .bs-route-content :where(
          .text-foreground,
          .text-card-foreground,
          .text-slate-900,.text-slate-800,.text-slate-700,
          .text-gray-900,.text-gray-800,.text-gray-700,
          .text-zinc-900,.text-zinc-800,.text-zinc-700,
          .text-neutral-900,.text-neutral-800,.text-neutral-700,
          .text-stone-900,.text-stone-800,.text-stone-700,
          .text-black
        ){
          color: #4a3113 !important;
        }
        .bs-route-content :where(
          .text-muted-foreground,
          .text-slate-600,.text-slate-500,.text-slate-400,.text-slate-300,
          .text-gray-600,.text-gray-500,.text-gray-400,
          .text-zinc-600,.text-zinc-500,.text-zinc-400,
          .text-neutral-600,.text-neutral-500
        ){
          color: rgba(90,61,20,.72) !important;
        }
        .bs-route-content :where(
          .bg-background,.bg-card,[class*="bg-card/"],
          .bg-white,[class*="bg-white/"],.bg-slate-50,.bg-gray-50,.bg-muted,[class*="bg-muted/"],
          [class*="bg-slate-900/"]
        ){
          background: rgba(255,255,255,.22) !important;
          background-image: none !important;
          backdrop-filter: none !important;
        }
        .bs-route-content :where(
          [class*="border-border"],[class*="border-slate-200/"],[class*="border-slate-800/"]
        ){
          border-color: rgba(120,80,20,.38) !important;
        }
        .bs-route-content :where(.shadow,.shadow-sm,.shadow-md,.shadow-lg,.shadow-xl,.shadow-2xl){
          box-shadow: none !important;
        }
        .bs-route-content :where(input,textarea,[role="combobox"]){
          border-color: rgba(120,80,20,.48) !important;
          background: rgba(255,255,255,.28) !important;
          color: #3f2a0e !important;
          font-family: Georgia, 'Times New Roman', serif;
        }
        .bs-route-content :where(input,textarea)::placeholder{
          color: rgba(90,61,20,.5) !important;
        }
        .bs-route-content :where(.font-mono){
          color: #3f2a0e !important;
          background: rgba(255,255,255,.28) !important;
        }
        .bs-route-content :where(.sticky){
          background-color: rgba(246,236,208,.96) !important;
          backdrop-filter: none !important;
        }
        .bs-route-content :where(table){
          color: #4a3113;
        }
        .bs-route-content :where(th,td){
          border-color: rgba(120,80,20,.34) !important;
        }
        body.book-route-active [role="dialog"]:not(.marine-keep){
          border-color: rgba(120,80,20,.45) !important;
          background-color: #f6ecd0 !important;
          color: #4a3113 !important;
        }
        @media (max-width: 640px){
          .bs-route-frame{ padding-left: 5px; padding-right: 5px; }
          .bs-route-frame .bs-page{
            margin-left: 10px;
            margin-right: 8px;
            padding-left: 12px;
            padding-right: 12px;
          }
        }
        @media print{
          .bs-route-frame{ padding: 0 !important; min-height: 0 !important; }
          .bs-route-frame .bs-volume,
          .bs-route-frame .bs-page{
            width: 100% !important;
            max-width: none !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            box-shadow: none !important;
          }
          .bs-route-frame .bs-volume::before,
          .bs-route-frame .bs-volume::after,
          .bs-route-frame .bs-running{ display: none !important; }
        }
      `}</style>
    </div>
  );
}
