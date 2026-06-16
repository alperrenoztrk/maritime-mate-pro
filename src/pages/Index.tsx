import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { AppIconGrid } from "@/components/home/AppIconGrid";
import { HomeWidgetGrid } from "@/components/widgets/HomeWidgetGrid";

const Index = () => {
  const navigate = useNavigate();

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

      {/* Settings button */}
      <button
        onClick={() => navigate("/settings")}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        aria-label="Ayarlar"
      >
        <Settings className="w-6 h-6 text-white/80" />
      </button>

      {/* Main content */}
      <main
        className="relative z-10 flex min-h-[100svh] flex-col px-2 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:pt-12"
        aria-label="Marine Expert Pro home"
      >
        {/* Title */}
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
              MARINE EXPERT PRO
            </span>
            <span className="sr-only"> — Interactive Maritime Learning and Calculations</span>
          </h1>
          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/55">
            Professional Maritime Solutions
          </p>
        </div>

        {/* Search */}
        <div className="mt-5 px-4">
          <GlobalSearch />
        </div>

        {/* App icon grid */}
        <div className="mt-8">
          <AppIconGrid />
        </div>

        {/* Widgets */}
        <div className="mt-8">
          <HomeWidgetGrid />
        </div>
      </main>

      <style>{`
        @keyframes home-drift { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes home-drift-rev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes title-shine { to { background-position: 200% center; } }
      `}</style>
    </div>
  );
};

export default Index;
