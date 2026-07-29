import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { OfflineStatusBanner } from "@/components/OfflineStatusBanner";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shared shell for all inner pages.
 * - Matches home screen's deep maritime gradient + waves for a cohesive look.
 * - Handles safe-area insets (notch / home indicator) on all edges, plus the
 *   native AdMob banner height (--ad-banner-height, see src/services/ads.ts).
 * - Locks horizontal overflow; allows vertical scroll inside <main>.
 * - Sets a readable default typography scale on dark background.
 */
export const MobileLayout = ({ children, className }: MobileLayoutProps) => {
  return (
    <div
      className={cn(
        "marine-shell relative min-h-[100svh] w-full overflow-x-hidden text-white antialiased",
        className
      )}
      style={{
        background:
          "linear-gradient(180deg, hsl(214 84% 8%) 0%, hsl(214 84% 15%) 50%, hsl(200 80% 18%) 100%)",
      }}
    >
      {/* Top radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.14) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      {/* Bottom ocean waves */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[22%] overflow-hidden">
        <svg
          className="absolute bottom-[10%] left-0 w-[200%] h-[60px]"
          viewBox="0 0 2880 60"
          preserveAspectRatio="none"
          style={{ animation: "ml-drift 22s linear infinite" }}
          aria-hidden
        >
          <path
            d="M0,35 C160,28 320,42 480,36 C640,30 800,22 960,28 C1120,34 1280,46 1440,40 C1600,34 1760,22 1920,28 C2080,34 2240,46 2400,40 C2560,34 2720,28 2880,32 L2880,60 L0,60 Z"
            fill="rgba(14,100,140,0.30)"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-[44px]"
          viewBox="0 0 2880 44"
          preserveAspectRatio="none"
          style={{ animation: "ml-drift-rev 16s linear infinite" }}
          aria-hidden
        >
          <path
            d="M0,22 C140,18 280,28 420,24 C560,20 700,14 880,18 C1060,22 1180,30 1360,26 C1540,22 1640,14 1800,18 C1960,22 2080,30 2280,26 C2480,22 2620,16 2780,20 C2840,22 2860,22 2880,22 L2880,44 L0,44 Z"
            fill="rgba(30,180,220,0.22)"
          />
        </svg>
      </div>

      {/* Content — safe-area aware, scrollable, contained width */}
      <main
        className={cn(
          "relative z-10 mx-auto w-full max-w-4xl",
          // Horizontal padding scales with viewport
          "px-3 xs:px-4 sm:px-5 md:px-6",
          // Vertical padding respects notch + home indicator
          "pt-[max(0.875rem,env(safe-area-inset-top))]",
          // Bottom padding also clears the native AdMob banner when one is
          // shown; --ad-banner-height is 0px whenever there is no banner.
          "pb-[calc(max(1.25rem,env(safe-area-inset-bottom))+var(--ad-banner-height,0px))]",
          // Avoid bleed under left/right curved edges in landscape
          "pl-[max(0.75rem,env(safe-area-inset-left))]",
          "pr-[max(0.75rem,env(safe-area-inset-right))]",
          // Stretch to fill viewport so backgrounds align
          "min-h-[100svh]"
        )}
      >
        <OfflineStatusBanner />
        <div className="marine-shell__content">{children}</div>
      </main>

      <style>{`
        @keyframes ml-drift { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes ml-drift-rev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

        /* Typography normalization on the dark maritime shell.
           Scoped to .marine-shell so it never leaks into modals/overlays. */
        .marine-shell { color: rgb(241 245 249); }
        .marine-shell h1 { font-weight: 700; letter-spacing: -0.01em; line-height: 1.15; }
        .marine-shell h2 { font-weight: 600; letter-spacing: -0.005em; line-height: 1.2; }
        .marine-shell h3, .marine-shell h4 { font-weight: 600; line-height: 1.25; }
        .marine-shell p { line-height: 1.55; }

        /* Soft-tone any hard slate/zinc/gray text written by inner pages
           so they remain readable on the dark gradient without per-page edits. */
        .marine-shell__content :where(.text-slate-900,.text-slate-800,.text-slate-700,
          .text-gray-900,.text-gray-800,.text-gray-700,
          .text-zinc-900,.text-zinc-800,.text-zinc-700,
          .text-neutral-900,.text-neutral-800,.text-neutral-700,
          .text-stone-900,.text-stone-800,.text-stone-700,
          .text-black,.text-foreground) {
          color: rgb(241 245 249) !important;
        }
        .marine-shell__content :where(.text-slate-600,.text-slate-500,
          .text-gray-600,.text-gray-500,
          .text-zinc-600,.text-zinc-500,
          .text-neutral-600,.text-neutral-500,
          .text-muted-foreground) {
          color: rgb(203 213 225) !important;
        }
        .marine-shell__content :where(.text-slate-400,.text-gray-400,.text-zinc-400) {
          color: rgb(148 163 184) !important;
        }
      `}</style>
    </div>
  );
};
