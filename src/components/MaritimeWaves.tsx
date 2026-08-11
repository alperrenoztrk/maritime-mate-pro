import { cn } from "@/lib/utils";

/**
 * The drifting ocean waves at the bottom of the shell.
 *
 * There used to be three byte-identical copies of this markup — in
 * GlobalMaritimeBackground (`mg-drift`), MobileLayout (`ml-drift`) and
 * Index (`home-drift`) — each with its own keyframe names declared in an
 * inline <style> block. Because the global background renders on every route,
 * the home screen ran two wave sets stacked on top of each other and
 * MobileLayout pages ran two more behind an opaque gradient, animating where
 * nobody could see them.
 *
 * This is now the only copy. It is rendered once, by
 * GlobalMaritimeBackground, and shows through every route.
 *
 * Keyframes live in index.css (`maritime-drift` / `maritime-drift-rev`) so
 * they are declared once for the document instead of per mounted component.
 * `motion-ambient` opts the waves into the reduced-motion policy in
 * src/styles/tokens.css.
 */
export const MaritimeWaves = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute bottom-0 left-0 right-0 h-[14%] overflow-hidden",
      className
    )}
  >
    <svg
      className="motion-ambient absolute bottom-[10%] left-0 h-[60px] w-[200%]"
      viewBox="0 0 2880 60"
      preserveAspectRatio="none"
      style={{ animation: "maritime-drift 22s linear infinite" }}
    >
      <path
        d="M0,35 C160,28 320,42 480,36 C640,30 800,22 960,28 C1120,34 1280,46 1440,40 C1600,34 1760,22 1920,28 C2080,34 2240,46 2400,40 C2560,34 2720,28 2880,32 L2880,60 L0,60 Z"
        fill="var(--maritime-wave-1)"
      />
    </svg>
    <svg
      className="motion-ambient absolute bottom-0 left-0 h-[44px] w-[200%]"
      viewBox="0 0 2880 44"
      preserveAspectRatio="none"
      style={{ animation: "maritime-drift-rev 16s linear infinite" }}
    >
      <path
        d="M0,22 C140,18 280,28 420,24 C560,20 700,14 880,18 C1060,22 1180,30 1360,26 C1540,22 1640,14 1800,18 C1960,22 2080,30 2280,26 C2480,22 2620,16 2780,20 C2840,22 2860,22 2880,22 L2880,44 L0,44 Z"
        fill="var(--maritime-wave-2)"
      />
    </svg>
  </div>
);

export default MaritimeWaves;
