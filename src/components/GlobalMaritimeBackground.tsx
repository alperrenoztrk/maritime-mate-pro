/**
 * Fixed full-viewport maritime background.
 * Mounted once in App. Sits behind all routes via z-index: -1 so any page
 * with a transparent (or neutralized — see index.css .marine-global rules)
 * background reveals the unified Mariner's Book design language.
 *
 * Visuals mirror the home page (Index.tsx) exactly:
 *  - deep maritime gradient
 *  - top radial sky glow
 *  - two drifting ocean waves at the bottom
 */
export const GlobalMaritimeBackground = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{
        zIndex: -1,
        background:
          "linear-gradient(180deg, hsl(var(--marine-bg-top)) 0%, hsl(var(--marine-bg-middle)) 52%, hsl(var(--marine-bg-bottom)) 100%)",
      }}
    >
      {/* Top radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(var(--marine-glow) / 0.16) 0%, transparent 55%)",
        }}
      />

      {/* Bottom ocean waves */}
      <div className="maritime-decorative-motion absolute bottom-0 left-0 right-0 h-[22%] overflow-hidden opacity-70">
        <svg
          className="absolute bottom-[10%] left-0 w-[200%] h-[60px]"
          viewBox="0 0 2880 60"
          preserveAspectRatio="none"
          style={{ animation: "mg-drift 22s linear infinite" }}
        >
          <path
            d="M0,35 C160,28 320,42 480,36 C640,30 800,22 960,28 C1120,34 1280,46 1440,40 C1600,34 1760,22 1920,28 C2080,34 2240,46 2400,40 C2560,34 2720,28 2880,32 L2880,60 L0,60 Z"
            fill="hsl(var(--marine-wave-back) / 0.24)"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-[44px]"
          viewBox="0 0 2880 44"
          preserveAspectRatio="none"
          style={{ animation: "mg-drift-rev 16s linear infinite" }}
        >
          <path
            d="M0,22 C140,18 280,28 420,24 C560,20 700,14 880,18 C1060,22 1180,30 1360,26 C1540,22 1640,14 1800,18 C1960,22 2080,30 2280,26 C2480,22 2620,16 2780,20 C2840,22 2860,22 2880,22 L2880,44 L0,44 Z"
            fill="hsl(var(--marine-wave-front) / 0.2)"
          />
        </svg>
      </div>

      <style>{`
        @keyframes mg-drift { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes mg-drift-rev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default GlobalMaritimeBackground;
