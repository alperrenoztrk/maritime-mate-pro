import React, { useState, useEffect } from "react";
import { Moon } from "lucide-react";

/**
 * SVG moon rendered from the actual phase position:
 * the terminator is an ellipse whose x-radius follows cos(2πp),
 * so the illuminated area matches the real illuminated fraction.
 */
const MoonPhaseVisual = ({ phasePosition, size = 176 }: { phasePosition: number; size?: number }) => {
  const r = 80;
  const cx = 100;
  const cy = 100;
  const waxing = phasePosition <= 0.5;
  // Signed terminator x-radius: +r at new moon, 0 at quarters, -r at full moon
  const tx = r * Math.cos(2 * Math.PI * phasePosition);

  // Illuminated region: outer semicircle on the lit side + terminator ellipse arc back
  const outerSweep = waxing ? 1 : 0;
  const termSweep = waxing ? (tx >= 0 ? 0 : 1) : (tx >= 0 ? 1 : 0);
  const litPath = [
    `M ${cx} ${cy - r}`,
    `A ${r} ${r} 0 1 ${outerSweep} ${cx} ${cy + r}`,
    `A ${Math.abs(tx)} ${r} 0 1 ${termSweep} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");

  const craters: Array<[number, number, number]> = [
    [78, 70, 9],
    [118, 96, 12],
    [88, 128, 7],
    [128, 60, 5],
    [65, 102, 5],
    [108, 142, 6],
  ];

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="Ay fazı görseli"
      className="mx-auto drop-shadow-[0_0_35px_rgba(226,232,255,0.35)]"
    >
      <defs>
        <radialGradient id="moon-lit" cx="42%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#fdfcf7" />
          <stop offset="55%" stopColor="#e8e6dc" />
          <stop offset="100%" stopColor="#b9b7ad" />
        </radialGradient>
        <radialGradient id="moon-dark" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#2c3350" />
          <stop offset="100%" stopColor="#171c30" />
        </radialGradient>
        <clipPath id="moon-disc">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>

      {/* Dark side with faint earthshine */}
      <circle cx={cx} cy={cy} r={r} fill="url(#moon-dark)" />
      {/* Illuminated portion */}
      <path d={litPath} fill="url(#moon-lit)" clipPath="url(#moon-disc)" />
      {/* Craters, clipped to the disc */}
      <g clipPath="url(#moon-disc)" fill="#8e8c82" opacity="0.28">
        {craters.map(([x, y, cr], i) => (
          <circle key={i} cx={x} cy={y} r={cr} />
        ))}
      </g>
      {/* Soft limb */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
    </svg>
  );
};

const MoonPhases = () => {
  const [moonPhase, setMoonPhase] = useState<{
    phase: string;
    percentage: number;
    position: number;
  }>({ phase: "", percentage: 0, position: 0 });

  useEffect(() => {
    calculateMoonPhase();
  }, []);

  const calculateMoonPhase = () => {
    const today = new Date();
    // Known new moon: January 6, 2000, 18:14 UTC
    const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
    const lunarCycle = 29.53058867; // days

    const daysSinceKnownNewMoon = (today.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const phasePosition = (daysSinceKnownNewMoon % lunarCycle) / lunarCycle;

    let phaseName = "";

    if (phasePosition < 0.0625) {
      phaseName = "Yeni Ay";
    } else if (phasePosition < 0.1875) {
      phaseName = "Hilal";
    } else if (phasePosition < 0.3125) {
      phaseName = "First Quarter";
    } else if (phasePosition < 0.4375) {
      phaseName = "Waxing Gibbous";
    } else if (phasePosition < 0.5625) {
      phaseName = "Dolunay";
    } else if (phasePosition < 0.6875) {
      phaseName = "Waning Gibbous";
    } else if (phasePosition < 0.8125) {
      phaseName = "Last Quarter";
    } else if (phasePosition < 0.9375) {
      phaseName = "Son Hilal";
    } else {
      phaseName = "Yeni Ay";
    }

    setMoonPhase({
      phase: phaseName,
      percentage: Math.round(phasePosition * 100),
      position: phasePosition
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-900 to-black">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: Math.random() * 2 + 2 + "s",
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        {/* Title */}
        <div className="mb-8">
          <Moon className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Ay Fazları
          </h1>
        </div>

        {/* Moon Phase Display */}
        <div className="bg-white/10 rounded-3xl p-12 border-2 border-white/20 shadow-2xl max-w-md w-full">
          <div className="mb-6">
            <MoonPhaseVisual phasePosition={moonPhase.position} />
          </div>

          {/* Phase name */}
          <h2 className="text-3xl font-bold text-white mb-4">
            {moonPhase.phase}
          </h2>

          {/* Phase percentage */}
          <p className="text-lg text-white/80 mb-6">
            Döngü: %{moonPhase.percentage}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full transition-[background-color,color,border-color,box-shadow,opacity,transform,width] duration-page"
              style={{ width: `${moonPhase.percentage}%` }}
            />
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-8 text-white/70 text-sm max-w-md">
          <p>
            The Moon completes one full orbit of the Earth in about 29.5 days. Over that period it passes through its different phases.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoonPhases;
