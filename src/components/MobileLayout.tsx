import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { OfflineStatusBanner } from "@/components/OfflineStatusBanner";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shared shell for all inner pages.
 * Matches the home screen's deep maritime gradient + subtle wave motif
 * so the entire app feels like one cohesive iOS-style surface.
 */
export const MobileLayout = ({ children, className }: MobileLayoutProps) => {
  return (
    <div
      className={cn(
        "relative min-h-[100svh] safe-area-inset overflow-x-hidden text-white",
        className
      )}
      style={{
        background:
          "linear-gradient(180deg, hsl(214 84% 8%) 0%, hsl(214 84% 15%) 50%, hsl(200 80% 18%) 100%)",
      }}
    >
      {/* Top radial glow — same as home */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.14) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      {/* Bottom ocean waves — same as home */}
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

      <main className="relative z-10 container mx-auto px-2 py-3 xs:px-3 xs:py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 max-w-4xl">
        <OfflineStatusBanner />
        {children}
      </main>

      <style>{`
        @keyframes ml-drift { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes ml-drift-rev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
};
