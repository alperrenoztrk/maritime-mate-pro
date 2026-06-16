import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SplashCompassDial from "@/components/ui/SplashCompassDial";
import { createCompassListener, requestCompassPermission } from "@/utils/heading";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // Compass state
  const [headingDeg, setHeadingDeg] = useState<number | null>(null);
  // Swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchLastX = useRef<number | null>(null);
  const touchLastY = useRef<number | null>(null);
  const didSwipeRef = useRef(false);

  // --- Compass logic using unified listener ---
  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const initCompass = async () => {
      const granted = await requestCompassPermission();
      if (!granted) {
        console.warn('Compass permission not granted');
      }
      
      cleanup = createCompassListener((heading) => {
        setHeadingDeg(Math.round(heading));
      }, 0.3);
    };

    initCompass();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    didSwipeRef.current = false;
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchLastX.current = null;
    touchLastY.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchLastX.current = e.targetTouches[0].clientX;
    touchLastY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const endTouch = e.changedTouches[0];
    const endX = touchLastX.current ?? endTouch.clientX;
    const endY = touchLastY.current ?? endTouch.clientY;
    
    const dx = endX - touchStartX.current;
    const dy = endY - touchStartY.current;

    if (Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy)) {
      touchStartX.current = null;
      touchStartY.current = null;
      touchLastX.current = null;
      touchLastY.current = null;
      return;
    }

    const isLeftSwipe = dx < 0;
    const isRightSwipe = dx > 0;
    
    if (isLeftSwipe) {
      didSwipeRef.current = true;
      navigate('/widgets');
    }
    if (isRightSwipe) {
      didSwipeRef.current = true;
      navigate('/maritime-news');
    }
    
    touchStartX.current = null;
    touchStartY.current = null;
    touchLastX.current = null;
    touchLastY.current = null;
  };

  const handleTouchCancel = () => {
    touchStartX.current = null;
    touchStartY.current = null;
    touchLastX.current = null;
    touchLastY.current = null;
    didSwipeRef.current = false;
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }

    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]')
    ) {
      return;
    }

    const clickX = e.clientX;
    const clickY = e.clientY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    if (clickY > screenHeight * 0.70) return;
    
    if (clickX < screenWidth * 0.35) {
      navigate('/maritime-news');
      return;
    }
    if (clickX > screenWidth * 0.65) {
      navigate('/widgets');
    }
  };

  return (
    <div
      className="relative min-h-[100svh] overflow-hidden touch-auto cursor-pointer"
      style={{
        background: 'linear-gradient(180deg, hsl(214 84% 8%) 0%, hsl(214 84% 15%) 50%, hsl(200 80% 18%) 100%)'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onClick={handleClick}
    >
      {/* Background glow effect */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(56,189,248,0.12) 0%, transparent 50%)'
        }}
      />

      {/* Realistic ocean waves */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] overflow-hidden pointer-events-none">
        {/* Deep ocean base */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%]" style={{ background: 'linear-gradient(180deg, rgba(2,48,71,0.0) 0%, rgba(2,48,71,0.6) 30%, rgba(1,36,53,0.95) 100%)' }} />

        {/* Wave layer 1 - back swell */}
        <svg className="absolute bottom-[28%] left-0 w-[200%] h-[80px]" viewBox="0 0 2880 80" preserveAspectRatio="none"
          style={{ animation: 'ocean-swell-1 12s ease-in-out infinite, ocean-drift-1 22s linear infinite' }}>
          <path d="M0,45 C120,38 240,55 360,48 C480,41 600,30 720,35 C840,40 960,55 1080,50 C1200,45 1320,32 1440,38 C1560,44 1680,55 1800,48 C1920,41 2040,30 2160,35 C2280,40 2400,55 2520,50 C2640,45 2760,35 2880,40 L2880,80 L0,80 Z" fill="rgba(8,60,85,0.5)" />
        </svg>

        {/* Wave layer 2 - mid ocean */}
        <svg className="absolute bottom-[20%] left-0 w-[200%] h-[70px]" viewBox="0 0 2880 70" preserveAspectRatio="none"
          style={{ animation: 'ocean-swell-2 10s ease-in-out infinite, ocean-drift-2 18s linear infinite' }}>
          <path d="M0,35 C80,28 180,42 300,38 C420,34 500,22 660,28 C820,34 900,48 1080,42 C1260,36 1340,24 1440,30 C1540,36 1660,48 1800,42 C1940,36 1980,22 2160,28 C2340,34 2400,48 2520,42 C2640,36 2760,28 2880,32 L2880,70 L0,70 Z" fill="rgba(14,100,140,0.45)" />
        </svg>

        {/* Wave layer 3 - surface chop */}
        <svg className="absolute bottom-[14%] left-0 w-[200%] h-[55px]" viewBox="0 0 2880 55" preserveAspectRatio="none"
          style={{ animation: 'ocean-swell-3 7.5s ease-in-out infinite, ocean-drift-3 14s linear infinite' }}>
          <path d="M0,30 C60,24 140,36 240,32 C340,28 420,18 560,24 C700,30 780,40 960,35 C1140,30 1200,18 1320,22 C1440,26 1540,38 1680,34 C1820,30 1860,18 2000,24 C2140,30 2220,40 2400,35 C2580,30 2700,22 2880,28 L2880,55 L0,55 Z" fill="rgba(14,130,170,0.4)" />
        </svg>

        {/* Wave layer 4 - foam line */}
        <svg className="absolute bottom-[8%] left-0 w-[200%] h-[40px]" viewBox="0 0 2880 40" preserveAspectRatio="none"
          style={{ animation: 'ocean-swell-4 6s ease-in-out infinite, ocean-drift-4 11s linear infinite' }}>
          <path d="M0,22 C50,18 120,28 200,24 C280,20 360,14 480,18 C600,22 680,30 840,26 C1000,22 1060,14 1200,18 C1340,22 1400,30 1560,26 C1720,22 1780,14 1920,18 C2060,22 2120,30 2280,26 C2440,22 2560,16 2700,20 C2820,24 2860,22 2880,24 L2880,40 L0,40 Z" fill="rgba(20,160,200,0.35)" />
        </svg>

        {/* Wave layer 5 - closest, with subtle foam */}
        <svg className="absolute bottom-[2%] left-0 w-[200%] h-[35px]" viewBox="0 0 2880 35" preserveAspectRatio="none"
          style={{ animation: 'ocean-swell-5 5s ease-in-out infinite, ocean-drift-5 9s linear infinite' }}>
          <path d="M0,18 C40,14 100,22 180,19 C260,16 340,10 440,14 C540,18 620,24 760,21 C900,18 960,10 1100,14 C1240,18 1300,24 1440,21 C1580,18 1640,10 1780,14 C1920,18 1980,24 2120,21 C2260,18 2340,12 2480,16 C2620,20 2740,18 2880,20 L2880,35 L0,35 Z" fill="rgba(30,180,220,0.3)" />
        </svg>

        {/* Foam highlights */}
        <svg className="absolute bottom-[10%] left-0 w-[200%] h-[20px] opacity-[0.15]" viewBox="0 0 2880 20" preserveAspectRatio="none"
          style={{ animation: 'ocean-drift-3 16s linear infinite, ocean-foam 4s ease-in-out infinite' }}>
          <path d="M0,12 C30,10 80,14 140,12 C200,10 260,8 340,10 C420,12 480,15 580,13 C680,11 740,8 860,10 C980,12 1040,15 1160,13 C1280,11 1340,8 1460,10 C1580,12 1640,15 1760,13 C1880,11 1940,8 2060,10 C2180,12 2240,15 2360,13 C2480,11 2600,9 2760,11 C2840,12 2860,12 2880,12 L2880,20 L0,20 Z" fill="rgba(200,230,255,0.6)" />
        </svg>
      </div>

      {/* Settings button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate('/settings');
        }}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        aria-label="Ayarlar"
      >
        <Settings className="w-6 h-6 text-white/70" />
      </button>

      {/* Left navigation button → Maritime News */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate('/maritime-news'); }}
        aria-label="Denizcilik Haberleri"
        className="fixed left-2 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1 group"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-200 group-hover:bg-white/25 group-active:scale-90">
          <ChevronLeft className="w-5 h-5 text-white drop-shadow-lg" />
        </div>
        <span className="text-[9px] text-white/50 font-medium leading-tight max-w-[48px] text-center">Haberler</span>
      </button>

      {/* Right navigation button → Widgets */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate('/widgets'); }}
        aria-label="Araçlar"
        className="fixed right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1 group"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-200 group-hover:bg-white/25 group-active:scale-90">
          <ChevronRight className="w-5 h-5 text-white drop-shadow-lg" />
        </div>
        <span className="text-[9px] text-white/50 font-medium leading-tight max-w-[48px] text-center">Araçlar</span>
      </button>

      {/* Main content */}
      <main className="relative z-10 flex min-h-[100svh] flex-col items-center px-6 text-center" aria-label="Marine Expert Pro home">
        {/* Title */}
        <div className="pt-12 sm:pt-16">
          <h1
            className="select-none font-black tracking-wider notranslate"
            translate="no"
            lang="en"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #7dd3fc 50%, #ffffff 100%)',
              backgroundSize: '200% auto',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'title-shine 3s linear infinite',
              textShadow: '0 0 40px rgba(56,189,248,0.3)'
            }}
          >
            <span className="block text-[clamp(2.5rem,9vw,4.5rem)] leading-tight">MARINE</span>
            <span className="block text-[clamp(2.5rem,9vw,4.5rem)] leading-tight">EXPERT PRO</span>
            <span className="sr-only"> — Interactive Maritime Learning and Calculations</span>
          </h1>
        </div>

        {/* Compass */}
        <div className="mt-8 flex-1 flex items-center justify-center">
          <div className="relative h-[clamp(12rem,40vw,16rem)] w-[clamp(12rem,40vw,16rem)]">
            <div 
              className="relative h-full w-full"
              style={{ 
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(56,189,248,0.2))'
              }}
            >
              <SplashCompassDial
                headingDeg={headingDeg ?? 0}
                className="h-full w-full select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="w-full max-w-[22rem] mx-auto pb-3" onClick={e => e.stopPropagation()}>
          <GlobalSearch />
        </div>

        {/* CTA Button */}
        <div className="w-full pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          <Link to="/calculations" className="inline-block w-full max-w-[22rem]" aria-label="Keşfetmeye Başla">
            <Button
              className="w-full rounded-full py-6 text-[clamp(1.3rem,4vw,1.6rem)] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 24px rgba(14,165,233,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              Keşfetmeye Başla
            </Button>
          </Link>
        </div>
      </main>


      {/* CSS Animations */}
      <style>{`
        @keyframes ocean-drift-1 { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes ocean-drift-2 { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes ocean-drift-3 { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes ocean-drift-4 { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes ocean-drift-5 { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes ocean-swell-1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
        @keyframes ocean-swell-2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes ocean-swell-3 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
        @keyframes ocean-swell-4 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes ocean-swell-5 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
        @keyframes ocean-foam { 0%,100% { opacity: 0.15; } 50% { opacity: 0.25; } }
        @keyframes title-shine {
          to { background-position: 200% center; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Index;
