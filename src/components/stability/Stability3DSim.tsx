import { Component, Suspense, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import * as THREE from "three";

import {
  calculateStability,
  calculateGZ,
  checkIMOCriteria,
  calculateRollingPeriod,
  calculateDeckImmersionAngle,
  type ShipState,
} from "./sim/StabilityPhysics";
import { type ShipType } from "./sim/ShipModel3D";
import { shipTypeOptions } from "./sim/shipTypeOptions";
import { StabilityMarkers } from "./sim/StabilityMarkers";
import { SimulationRenderLoop } from "./sim/SimulationRenderLoop";
import { type OceanQuality, defaultOceanQuality } from "./sim/oceanQuality";
import { ShipScene3D } from "./sim/ShipScene3D";
import { keelWorldY } from "./sim/shipDraftGeometry";
import { disposeHullGeometries } from "./sim/hullGeometry";
import { disposeAllShipTextures } from "./sim/proceduralTextures";
import { HarbourScene } from "./sim/HarbourScene";
import { Anchor, Waves, Pause, Play, RotateCcw } from "lucide-react";
import {
  DOUGLAS_SEA_STATES,
  KNOT_MS,
  METRES_PER_UNIT,
  SCENE_G,
  buildSea,
  deepWaterWavelength,
  encounterPeriod,
  representativeHs,
  resonanceRisk,
  spectralHs,
} from "@/lib/seakeeping";

type SimMode = "harbour" | "passage";
const HEADINGS = [
  { deg: 180, label: "Head" },
  { deg: 135, label: "Bow" },
  { deg: 90, label: "Beam" },
  { deg: 45, label: "Quarter" },
  { deg: 0, label: "Following" },
];

// Only the instruments subscribe to telemetry; the page/Canvas/controls do
// not reconcile on every reading. Simulation transforms stay outside React.
function createMotionStore() {
  let value = { roll: 0, pitch: 0, heave: 0 };
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    update: (roll: number, pitch: number, heave: number) => {
      value = { roll, pitch, heave };
      listeners.forEach(listener => listener());
    },
  };
}
type MotionStore = ReturnType<typeof createMotionStore>;
const useMotionReading = (motion: MotionStore) => useSyncExternalStore(motion.subscribe, motion.get, motion.get);


/* Compress the real KM (~18 m) into the vessel's visual height so K/B/G/M read
   as a proportionate stack instead of floating far above the deck. */
const MARKER_VSCALE = 0.12;

/* ─── IMO compliance badge ─── */
function IMOBadge({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-micro">
      {ok ? (
        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
      ) : (
        <AlertTriangle className="h-3 w-3 text-amber-400" />
      )}
      <span className={ok ? "text-emerald-300" : "text-amber-300"}>{label}</span>
    </div>
  );
}

/* ─── Main component ─── */
export const Stability3DSim = () => {
  // User inputs: KG and Draft only — GM is derived
  const [kgInput, setKgInput] = useState(6.2);
  const [draftInput, setDraftInput] = useState(6.5);
  const [cbInput, setCbInput] = useState(0.72);
  const motion = useMemo(createMotionStore, []);
  const [shipType, setShipType] = useState<ShipType>("container");
  const [mode, setMode] = useState<SimMode>("passage");
  const [seaCode, setSeaCode] = useState(4);
  const [wavePeriod, setWavePeriod] = useState(9);
  const [heading, setHeading] = useState(90);
  const [speedKn, setSpeedKn] = useState(12);
  const [playing, setPlaying] = useState(() => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [resetToken, setResetToken] = useState(0);
  const [quality, setQuality] = useState<OceanQuality>(defaultOceanQuality);
  const [showMarkers, setShowMarkers] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const paused = !playing || !visible || !inView;
  useEffect(() => {
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    visibility();
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (viewport.current) observer?.observe(viewport.current);
    return () => { document.removeEventListener('visibilitychange', visibility); observer?.disconnect(); };
  }, []);
  const activeShip = shipTypeOptions.find((o) => o.value === shipType);

  // Free cached hull geometries + canvas textures when leaving the route.
  useEffect(
    () => () => {
      disposeAllShipTextures();
      disposeHullGeometries();
    },
    []
  );

  // Reference ship dimensions
  const ship: ShipState = useMemo(
    () => ({
      kg: kgInput,
      draft: draftInput,
      cb: cbInput,
      breadth: 32.2,
      length: 190,
      depth: 18.5,
    }),
    [kgInput, draftInput, cbInput]
  );

  const stability = useMemo(() => calculateStability(ship), [ship]);
  const imo = useMemo(() => checkIMOCriteria(stability.gm, stability.bm), [stability]);
  const rollingPeriod = useMemo(() => calculateRollingPeriod(ship, stability.gm), [ship, stability.gm]);
  const deckImmAngle = useMemo(
    () => calculateDeckImmersionAngle(ship.breadth, ship.depth, ship.draft),
    [ship]
  );

  // Harbour: sheltered basin, short low swell, ship stopped alongside.
  const effHs = mode === "harbour" ? 0.2 : representativeHs(seaCode);
  const effT = mode === "harbour" ? 5 : wavePeriod;
  const effHeading = mode === "harbour" ? 120 : heading;
  const effSpeed = mode === "harbour" ? 0 : speedKn;
  const wavelength = deepWaterWavelength(effT);
  const te = encounterPeriod(effT, effSpeed, effHeading);
  const risk = resonanceRisk(rollingPeriod, te);
  const sea = useMemo(
    () => ({
      waves: buildSea(effHs, effT, effHeading),
      gravity: SCENE_G,
      speedUnits: (effSpeed * KNOT_MS) / METRES_PER_UNIT,
      rollOmega: isFinite(rollingPeriod) && rollingPeriod > 0 ? (2 * Math.PI) / rollingPeriod : 0.3,
      rollZeta: mode === "harbour" ? 0.3 : 0.12,
    }),
    [effHs, effT, effHeading, effSpeed, mode, rollingPeriod]
  );

  const actualHs = spectralHs(sea.waves);

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">3D Stability Simulation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mode selector */}
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Simulation mode">
          {([
            { v: "harbour", label: "Harbour", Icon: Anchor },
            { v: "passage", label: "Passage", Icon: Waves },
          ] as const).map(({ v, label, Icon }) => (
            <button
              key={v}
              aria-pressed={mode === v}
              onClick={() => setMode(v)}
              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                mode === v ? "border-primary bg-primary/15 text-primary" : "border-border/50 bg-muted/30 text-muted-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Ship-type selector */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/30 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-xs font-semibold">Ship Type</Label>
            <span className="hidden text-micro text-muted-foreground sm:inline">{activeShip?.description}</span>
          </div>
          <Select value={shipType} onValueChange={(v) => setShipType(v as ShipType)}>
            <SelectTrigger aria-label="Ship type" className="h-11 w-full text-xs sm:w-44">
              <SelectValue placeholder="Select ship type" />
            </SelectTrigger>
            <SelectContent>
              {shipTypeOptions.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-xs">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Simulation playback">
          <button type="button" onClick={() => setPlaying(v => !v)} aria-pressed={playing} className="flex min-h-11 items-center gap-2 rounded-lg border px-3 text-xs font-semibold">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? 'Pause' : 'Play'}
          </button>
          <button type="button" onClick={() => { setResetToken(v => v + 1); motion.update(0, 0, 0); }} className="flex min-h-11 items-center gap-2 rounded-lg border px-3 text-xs">
            <RotateCcw className="h-4 w-4" /> Restart
          </button>
          <button type="button" onClick={() => setShowMarkers(v => !v)} aria-pressed={showMarkers} className="min-h-11 rounded-lg border px-3 text-xs">Stability markers</button>
          <label className="ml-auto flex items-center gap-2 text-xs">
            Detail
            <select aria-label="Water detail" value={quality} onChange={e => setQuality(e.target.value as OceanQuality)} className="min-h-11 rounded-lg border bg-background px-2">
              <option value="performance">Performance</option><option value="balanced">Balanced</option><option value="high">High</option>
            </select>
          </label>
        </div>
        {/* Instruments are outside the canvas to keep the vessel visible. */}
        <div ref={viewport} data-testid="ship-viewport" className="relative h-[360px] overflow-hidden rounded-xl border border-border/60 bg-slate-950 sm:h-[460px]">
          {/* An error boundary is essential here: if WebGL is unavailable or a
              draw call throws, React would otherwise unmount the whole subtree
              and leave a blank box. Instead we show a graceful message while the
              numeric calculations below keep working. */}
          <SimErrorBoundary fallback={<SimErrorFallback />}>
            <Suspense fallback={<SimLoadingFallback />}>
              <Canvas
                shadows={quality === 'high'}
                frameloop="demand"
                dpr={quality === 'performance' ? 1 : [1, quality === 'high' ? 1.5 : 1.25]}
                gl={{
                  antialias: false,
                  powerPreference: "default",
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.1,
                }}
                onCreated={({ gl }) => {
                  gl.shadowMap.type = THREE.PCFSoftShadowMap;
                }}
              >
                <SimulationRenderLoop paused={paused} fps={quality === 'high' ? 60 : 30} />
                <PerspectiveCamera makeDefault position={[6.5, 3.1, 7]} fov={42} />
                {/* Let the user orbit / zoom the vessel. Pan is disabled and the
                    polar angle is clamped so the camera can't dip under the sea. */}
                <OrbitControls
                  enablePan={false}
                  enableDamping
                  dampingFactor={0.08}
                  minDistance={5}
                  maxDistance={16}
                  maxPolarAngle={Math.PI / 2.05}
                  target={[0, 0.2, 0]}
                />
                <ShipScene3D
                  shipType={shipType}
                  heelRad={0}
                  draftM={draftInput}
                  onMotionUpdate={motion.update}
                  sea={sea}
                  paused={paused}
                  resetToken={resetToken}
                  quality={quality}
                  wakeIntensity={0.85}
                  scenery={mode === "harbour" ? <HarbourScene /> : null}
                >
                  {showMarkers && <LiveStabilityMarkers motion={motion} gm={stability.gm} bm={stability.bm}
                    kY={keelWorldY(draftInput)}
                    kb={stability.kb}
                    kg={kgInput}
                    km={stability.km}
                    vScale={MARKER_VSCALE}
                  />}
                </ShipScene3D>
              </Canvas>
            </Suspense>
          </SimErrorBoundary>

          {/* Interaction hint */}
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 rounded-md bg-background/70 px-2 py-1 text-micro text-muted-foreground shadow-sm">
            Drag: rotate · Pinch: zoom
          </div>

          <MotionWarnings motion={motion} gm={stability.gm} deckImmAngle={deckImmAngle} />
        </div>

        <MotionReadout motion={motion} gm={stability.gm} bm={stability.bm} rollingPeriod={rollingPeriod} te={te} hs={actualHs} />
        <details className="rounded-lg border p-3 text-xs">
          <summary className="cursor-pointer font-medium">Hydrostatic particulars</summary>
          <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2">
            <Row label="KM" value={`${stability.km.toFixed(2)} m`} />
            <Row label="KG" value={`${kgInput.toFixed(2)} m`} />
            <Row label="KB" value={`${stability.kb.toFixed(2)} m`} />
            <Row label="BM" value={`${stability.bm.toFixed(2)} m`} />
            <Row label="Displacement" value={`${Math.round(stability.displacement)} t`} />
            <Row label="Deck immersion" value={`${deckImmAngle.toFixed(1)}°`} />
          </div>
        </details>

        {/* Sea state controls */}
        {mode === "passage" ? (
          <div className="space-y-3 rounded-lg border border-primary/25 bg-primary/5 p-3">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-xs font-semibold">Sea state (Douglas)</Label>
              <Select value={String(seaCode)} onValueChange={(v) => setSeaCode(Number(v))}>
                <SelectTrigger aria-label="Sea state" className="h-11 w-44 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DOUGLAS_SEA_STATES.map((d) => (
                    <SelectItem key={d.code} value={String(d.code)} className="text-xs">
                      {d.code} · {d.name} ({d.hs[0]}–{d.hs[1]} m)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block text-xs font-semibold">Wave direction relative to ship</Label>
              <div className="grid grid-cols-3 gap-1 sm:grid-cols-5">
                {HEADINGS.map((h) => (
                  <button
                    key={h.deg}
                    onClick={() => setHeading(h.deg)}
                    aria-pressed={heading === h.deg}
                    className={`min-h-11 rounded-md border px-1 py-1.5 text-micro font-semibold ${
                      heading === h.deg ? "border-primary bg-primary/15 text-primary" : "border-border/50 text-muted-foreground"
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <SliderControl label="Wave period (s)" value={wavePeriod} min={4} max={16} step={0.5} onChange={setWavePeriod} hint={`λ = g·T²/2π = ${wavelength.toFixed(0)} m`} />
              <SliderControl label="Speed (kn)" value={speedKn} min={0} max={24} step={1} onChange={setSpeedKn} hint="Changes the encounter period with the waves." />
            </div>
            {actualHs < effHs * 0.98 && <p className="text-micro text-muted-foreground">This short-period sea exceeds the steepness limit. Rendered Hs: {actualHs.toFixed(2)} m (requested {effHs.toFixed(2)} m). Increase the period for taller waves.</p>}
            <p className="text-micro text-muted-foreground">Head seas emphasise pitch; beam seas emphasise roll. Motion uses a simplified reference hull, not ship-specific response data.</p>
            {risk !== "none" && actualHs > 0.1 && (
              <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-2 text-micro text-destructive">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  {risk === "synchronous"
                    ? `Synchronous rolling risk: encounter period (${te.toFixed(1)} s) ≈ roll period (${rollingPeriod.toFixed(1)} s). Period proximity only; this is not a prediction of ship safety.`
                    : `Parametric rolling risk: encounter period (${te.toFixed(1)} s) ≈ ½ roll period (${(rollingPeriod / 2).toFixed(1)} s). Period proximity only; this is not a prediction of ship safety.`}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-primary/25 bg-primary/5 p-3 text-micro text-muted-foreground">
            Alongside in a sheltered basin: low swell (Hs 0.2 m, T 5 s), ship stopped. Switch to Passage to set sea state, wave direction and speed.
          </div>
        )}

        {/* Sliders */}
        <div className="grid gap-3 md:grid-cols-3">
          <SliderControl
            label="KG (m)"
            value={kgInput}
            min={4.0}
            max={12.0}
            step={0.1}
            onChange={setKgInput}
            hint="Height of the centre of gravity. ↑ KG → ↓ GM"
          />
          <SliderControl
            label="Draft (m)"
            value={draftInput}
            min={4.0}
            max={12.0}
            step={0.1}
            onChange={setDraftInput}
            hint="Draft. Affects displacement and KB."
          />
          <SliderControl
            label="Cb (block coeff.)"
            value={cbInput}
            min={0.55}
            max={0.88}
            step={0.01}
            onChange={setCbInput}
            hint="Hull block coefficient. Affects BM."
          />
        </div>

        {/* IMO A.749 Compliance */}
        <div className="rounded-lg border border-border/40 bg-muted/30 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Info className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">IMO A.749 Stability Criteria</span>
            <Badge
              variant={imo.overallPass ? "default" : "destructive"}
              className="ml-auto text-micro px-1.5 py-0"
            >
              {imo.overallPass ? "PASS" : "NOT SUITABLE"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <IMOBadge label={`GM ≥ 0.15 m (${stability.gm.toFixed(2)})`} ok={imo.gmOk} />
            <IMOBadge label={`GZ₃₀° ≥ 0.20 m`} ok={imo.gzAt30Ok} />
            <IMOBadge label={`Angle of max GZ ≥ 25°`} ok={imo.maxGzAngleOk} />
            <IMOBadge label={`Area 0–30° ≥ 0.055 m·rad`} ok={imo.areaTo30Ok} />
            <IMOBadge label={`Area 0–40° ≥ 0.090 m·rad`} ok={imo.areaTo40Ok} />
            <IMOBadge label={`Area 30–40° ≥ 0.030 m·rad`} ok={imo.area30to40Ok} />
          </div>
        </div>

        {/* Formulas */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-micro text-muted-foreground space-y-1">
          <div className="font-mono text-primary text-xs">GM = KM − KG</div>
          <div className="font-mono text-primary text-xs">GZ = sinφ · [GM + ½·BM·tan²φ]</div>
          <div className="font-mono text-primary text-xs">Te = 2π / |ω − ω²·V·cos μ / g|</div>
          <div className="font-mono text-primary text-xs">KB ≈ ⅓(5T/2 − ∇/Awp)</div>
          <p className="mt-1 text-micro">
            At large angles (φ &gt; 15°) the wall-sided formula gives a far more accurate result than the linear approximation. Wave-induced roll, pitch and heave use damped responses to the water surface along the hull. This model does not resolve breaking-wave impacts, flooding or parametric instability.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

/* ─── sub-components ─── */

function LiveStabilityMarkers({ motion, gm, bm, ...props }: {
  motion: MotionStore; gm: number; bm: number; kY: number; kb: number; kg: number; km: number; vScale: number;
}) {
  const { roll } = useMotionReading(motion);
  return <StabilityMarkers {...props} heelAngle={roll} gz={calculateGZ(gm, bm, roll)} />;
}

function MotionWarnings({ motion, gm, deckImmAngle }: { motion: MotionStore; gm: number; deckImmAngle: number }) {
  const { roll } = useMotionReading(motion);
  const absHeel = Math.abs(THREE.MathUtils.radToDeg(roll));
  const danger = gm < 0.15 || absHeel >= 45;
  const immersed = deckImmAngle > 0 && absHeel >= deckImmAngle;
  if (!danger && !immersed) return null;
  return <div className={`absolute left-1/2 top-2.5 -translate-x-1/2 rounded-lg px-3 py-1.5 text-micro font-semibold text-white shadow-lg flex items-center gap-1.5 ${danger ? 'bg-red-500/90' : 'bg-amber-500/90'}`}>
    <AlertTriangle className="h-3.5 w-3.5" />
    {gm < 0.15 ? 'DANGER: GM < 0.15 m — insufficient stability!' : danger ? `DANGER: ${absHeel.toFixed(0)}° heel — capsize risk!` : `Deck edge immersed (φ_deck ${deckImmAngle.toFixed(0)}°)`}
  </div>;
}

function MotionReadout({ motion, gm, bm, rollingPeriod, te, hs }: {
  motion: MotionStore; gm: number; bm: number; rollingPeriod: number; te: number; hs: number;
}) {
  const { roll, pitch, heave } = useMotionReading(motion);
  return <div data-testid="motion-readout" className="grid grid-cols-2 gap-x-5 gap-y-2 rounded-lg bg-muted/40 p-3 text-xs sm:grid-cols-4">
    <Row label="Roll / heel" value={`${THREE.MathUtils.radToDeg(roll).toFixed(1)}°`} />
    <Row label="Pitch" value={`${THREE.MathUtils.radToDeg(pitch).toFixed(1)}°`} />
    <Row label="Heave" value={`${(heave * METRES_PER_UNIT).toFixed(2)} m`} />
    <Row label="GM" value={`${gm.toFixed(2)} m`} />
    <Row label="GZ" value={`${calculateGZ(gm, bm, roll).toFixed(3)} m`} />
    <Row label="T (roll)" value={`${isFinite(rollingPeriod) ? rollingPeriod.toFixed(1) : '∞'} s`} />
    <Row label="T (enc.)" value={`${isFinite(te) ? te.toFixed(1) : '∞'} s`} />
    <Row label="Hs" value={`${hs.toFixed(2)} m`} />
  </div>;
}

/** Catches WebGL / render failures so the viewport degrades gracefully. */
class SimErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error("Stability3DSim render error:", error);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function SimErrorFallback() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
      <AlertTriangle className="h-6 w-6 text-amber-400" />
      <p className="text-xs text-muted-foreground">
        3D rendering could not be started on this device (WebGL may not be supported). The calculations and criteria below continue to work.
      </p>
    </div>
  );
}

function SimLoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-xs text-muted-foreground">3D simulation loading…</p>
      </div>
    </div>
  );
}

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span translate="no" className="font-mono font-semibold" style={color ? { color } : undefined}>
        {value}
      </span>
    </div>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs flex items-center justify-between">
        <span>{label}</span>
        <span className="font-mono">{value.toFixed(2)}</span>
      </Label>
      <Slider aria-label={label} value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} />
      <p className="text-micro text-muted-foreground">{hint}</p>
    </div>
  );
}

export default Stability3DSim;
