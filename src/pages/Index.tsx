import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SplashCompassDial from "@/components/ui/SplashCompassDial";
import { createCompassListener, requestCompassPermission } from "@/utils/heading";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
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

      {/* Realistic Lighthouse */}
      <div className="absolute right-[8%] bottom-[22%] w-[60px] h-[120px] z-[1] pointer-events-none">
        <svg viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>
          <defs>
            {/* Tower gradient - weathered white/grey stone */}
            <linearGradient id="tower-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4d0c8" />
              <stop offset="30%" stopColor="#f0ece4" />
              <stop offset="70%" stopColor="#f5f1e9" />
              <stop offset="100%" stopColor="#c8c4bc" />
            </linearGradient>
            {/* Red stripe */}
            <linearGradient id="red-stripe" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b91c1c" />
              <stop offset="30%" stopColor="#dc2626" />
              <stop offset="70%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            {/* Lantern room glass warm glow */}
            <radialGradient id="lantern-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
            </radialGradient>
            {/* Fresnel lens light cone */}
            <radialGradient id="fresnel-glow" cx="0%" cy="50%" r="100%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
              <stop offset="20%" stopColor="#fbbf24" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Rock base */}
          <ellipse cx="40" cy="156" rx="36" ry="5" fill="#1a1a2e" opacity="0.6" />
          <path d="M8,155 Q15,148 25,150 Q35,145 45,150 Q55,148 65,150 Q72,148 72,155 Z" fill="#2d3748" />
          <path d="M12,155 Q20,151 30,153 Q40,149 50,153 Q60,151 68,155 Z" fill="#4a5568" />
          
          {/* Tower body - tapered */}
          <path d="M27 150 L30 68 L50 68 L53 150 Z" fill="url(#tower-grad)" />
          
          {/* Tower shadow edge */}
          <path d="M27 150 L30 68 L34 68 L31 150 Z" fill="rgba(0,0,0,0.08)" />
          
          {/* Red stripes */}
          <path d="M31.2 85 L48.8 85 L48.5 95 L31.5 95 Z" fill="url(#red-stripe)" />
          <path d="M32.4 110 L47.6 110 L47.3 120 L32.7 120 Z" fill="url(#red-stripe)" />
          
          {/* Gallery/walkway platform */}
          <rect x="22" y="64" width="36" height="4" rx="1" fill="#374151" />
          <rect x="24" y="63" width="32" height="2" rx="0.5" fill="#4b5563" />
          {/* Gallery railing posts */}
          <line x1="24" y1="58" x2="24" y2="64" stroke="#6b7280" strokeWidth="1" />
          <line x1="32" y1="58" x2="32" y2="64" stroke="#6b7280" strokeWidth="0.8" />
          <line x1="40" y1="58" x2="40" y2="64" stroke="#6b7280" strokeWidth="0.8" />
          <line x1="48" y1="58" x2="48" y2="64" stroke="#6b7280" strokeWidth="0.8" />
          <line x1="56" y1="58" x2="56" y2="64" stroke="#6b7280" strokeWidth="1" />
          {/* Railing top bar */}
          <line x1="23" y1="58" x2="57" y2="58" stroke="#6b7280" strokeWidth="1" />
          
          {/* Lantern room - glass housing */}
          <rect x="28" y="44" width="24" height="20" rx="1.5" fill="#1f2937" />
          {/* Glass panes with warm glow */}
          <rect x="30" y="46" width="9" height="16" rx="0.5" fill="url(#lantern-glow)" />
          <rect x="41" y="46" width="9" height="16" rx="0.5" fill="url(#lantern-glow)" />
          {/* Fresnel lens center */}
          <circle cx="40" cy="54" r="5" fill="#fef3c7" opacity="0.8" />
          <circle cx="40" cy="54" r="3" fill="#ffffff" opacity="0.9" />
          
          {/* Dome roof */}
          <path d="M26 44 Q28 34 40 30 Q52 34 54 44 Z" fill="#374151" />
          <path d="M30 44 Q32 36 40 33 Q48 36 50 44 Z" fill="#4b5563" opacity="0.5" />
          
          {/* Ventilator ball + lightning rod */}
          <circle cx="40" cy="28" r="3" fill="#6b7280" />
          <line x1="40" y1="18" x2="40" y2="25" stroke="#9ca3af" strokeWidth="1.5" />
          
          {/* Door */}
          <rect x="35" y="138" width="10" height="14" rx="5" fill="#78350f" />
          <circle cx="43" cy="146" r="0.8" fill="#d97706" />
          
          {/* Window */}
          <rect x="37" y="100" width="6" height="8" rx="3" fill="rgba(251,191,36,0.25)" stroke="#9ca3af" strokeWidth="0.5" />
        </svg>
        
        {/* Realistic rotating light beam - continuous 360° rotation like real lighthouse */}
        <div 
          className="absolute z-[2]"
          style={{
            top: '34%',
            left: '50%',
            width: '0px',
            height: '0px',
            animation: 'lighthouse-rotate 8s linear infinite'
          }}
        >
          {/* Main beam - narrow cone like Fresnel lens output */}
          <div style={{
            position: 'absolute',
            top: '-3px',
            left: '0',
            width: '280px',
            height: '6px',
            background: 'linear-gradient(90deg, rgba(255,251,235,0.95) 0%, rgba(251,191,36,0.7) 8%, rgba(251,191,36,0.3) 25%, rgba(251,191,36,0.08) 50%, transparent 100%)',
            transformOrigin: 'left center',
            filter: 'blur(0.5px)',
          }} />
          {/* Beam spread/scatter */}
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '0',
            width: '220px',
            height: '24px',
            background: 'linear-gradient(90deg, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0.12) 20%, rgba(251,191,36,0.03) 50%, transparent 100%)',
            transformOrigin: 'left center',
            filter: 'blur(3px)',
            borderRadius: '0 50% 50% 0',
          }} />
          {/* Opposite beam (dual-beam lighthouse characteristic) */}
          <div style={{
            position: 'absolute',
            top: '-3px',
            right: '0',
            left: 'auto',
            width: '280px',
            height: '6px',
            background: 'linear-gradient(-90deg, rgba(255,251,235,0.95) 0%, rgba(251,191,36,0.7) 8%, rgba(251,191,36,0.3) 25%, rgba(251,191,36,0.08) 50%, transparent 100%)',
            transformOrigin: 'right center',
            transform: 'rotate(180deg)',
            filter: 'blur(0.5px)',
          }} />
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '0',
            left: 'auto',
            width: '220px',
            height: '24px',
            background: 'linear-gradient(-90deg, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0.12) 20%, rgba(251,191,36,0.03) 50%, transparent 100%)',
            transformOrigin: 'right center',
            transform: 'rotate(180deg)',
            filter: 'blur(3px)',
            borderRadius: '0 50% 50% 0',
          }} />
        </div>
        
        {/* Fresnel lens glow - constant warm halo around lantern */}
        <div 
          className="absolute rounded-full"
          style={{
            top: '30%',
            left: '30%',
            width: '24px',
            height: '24px',
            background: 'radial-gradient(circle, rgba(255,251,235,0.9) 0%, rgba(251,191,36,0.6) 30%, rgba(251,191,36,0.2) 60%, transparent 100%)',
            animation: 'fresnel-pulse 2s ease-in-out infinite',
          }}
        />
        
        {/* Atmospheric light scatter around lantern room */}
        <div 
          className="absolute rounded-full"
          style={{
            top: '22%',
            left: '10%',
            width: '50px',
            height: '50px',
            background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 50%, transparent 100%)',
            filter: 'blur(4px)',
            animation: 'fresnel-pulse 2s ease-in-out infinite',
          }}
        />
      </div>

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

      {/* Left arrow indicator */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-30">
        <ChevronLeft className="w-6 h-6 text-white drop-shadow-lg animate-pulse" />
      </div>

      {/* Right arrow indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-30">
        <ChevronRight className="w-6 h-6 text-white drop-shadow-lg animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center px-6 text-center">
        {/* Title */}
        <div className="pt-12 sm:pt-16">
          <h1
            className="select-none font-black tracking-wider"
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

        {/* CTA Button */}
        <div className="w-full pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6">
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
      </div>

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
        @keyframes lighthouse-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fresnel-pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
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
