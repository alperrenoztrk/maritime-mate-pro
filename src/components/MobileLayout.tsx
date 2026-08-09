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
        // Transparent by design: <GlobalMaritimeBackground /> paints the
        // gradient, glow and waves once, fixed, for the whole app. This shell
        // used to repaint all three — which meant every MobileLayout page ran
        // a second wave animation over an occluded first one.
        "marine-shell relative min-h-[100svh] w-full overflow-x-hidden text-white antialiased",
        className
      )}
    >
      {/* Content — safe-area aware, scrollable, contained width */}
      <main
        className={cn(
          "relative z-10 mx-auto w-full max-w-4xl",
          // Horizontal padding scales with viewport
          "px-3 xs:px-4 sm:px-5 md:px-6",
          // Reserves the strip AppNavBar occupies (notch + control height),
          // so a page's own heading is never covered by the global back pill.
          "pt-[var(--floating-nav-reserve)]",
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
