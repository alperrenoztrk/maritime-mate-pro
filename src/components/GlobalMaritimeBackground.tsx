import { useLocation } from "react-router-dom";

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
 *
 * The gradient and glow are global, but the drifting waves belong to the home
 * page alone — every other route gets the plain backdrop. This is why the
 * component is mounted inside the router (see App): it needs the current path.
 */
export const GlobalMaritimeBackground = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{
        zIndex: -1,
        background: "var(--maritime-shell-background)",
      }}
    >
      {/* Top radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "var(--maritime-shell-glow)",
        }}
      />

      {isHome && <MaritimeWaves />}
    </div>
  );
};

export default GlobalMaritimeBackground;
