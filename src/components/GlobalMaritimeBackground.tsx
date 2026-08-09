import { MaritimeWaves } from "@/components/MaritimeWaves";

/**
 * Fixed full-viewport maritime background — the app's one and only backdrop.
 * Mounted once in App. Sits behind all routes via z-index: -1 so any page
 * with a transparent (or neutralized — see index.css .marine-global rules)
 * background reveals the unified Mariner's Book design language.
 *
 * MobileLayout and Index used to repaint this same gradient, glow and wave
 * pair themselves. They no longer do: they are transparent and let this layer
 * show through, so the backdrop stays put while content scrolls over it.
 */
export const GlobalMaritimeBackground = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{
        zIndex: -1,
        // Top stop is the app's canonical shell colour — mirrored by
        // index.html theme-color, the PWA manifest and the native status bar.
        background:
          "linear-gradient(180deg, hsl(214 84% 8%) 0%, hsl(214 84% 15%) 50%, hsl(200 80% 18%) 100%)",
      }}
    >
      {/* Top radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.14) 0%, transparent 55%)",
        }}
      />

      <MaritimeWaves />
    </div>
  );
};

export default GlobalMaritimeBackground;
