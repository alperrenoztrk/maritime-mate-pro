import { Component, Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle2, Info, Wind } from "lucide-react";
import * as THREE from "three";

import {
  calculateStability,
  calculateGZ,
  checkIMOCriteria,
  calculateRollingPeriod,
  calculateDeckImmersionAngle,
  solveHeelAngle,
  type ShipState,
  type IMOCompliance,
} from "./sim/StabilityPhysics";
import { type ShipType } from "./sim/ShipModel3D";
import { shipTypeOptions } from "./sim/shipTypeOptions";
import { StabilityMarkers } from "./sim/StabilityMarkers";
import { ShipScene3D } from "./sim/ShipScene3D";
import { keelWorldY } from "./sim/shipDraftGeometry";
import { disposeHullGeometries } from "./sim/hullGeometry";
import { disposeAllShipTextures } from "./sim/proceduralTextures";
import { HarbourScene } from "./sim/HarbourScene";
import { Anchor, Waves } from "lucide-react";
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
} from "@/lib/seakeeping";

type SimMode = "harbour" | "passage";
const HEADINGS = [
  { deg: 180, label: "Head" },
  { deg: 135, label: "Bow" },
  { deg: 90, label: "Beam" },
  { deg: 45, label: "Quarter" },
  { deg: 0, label: "Following" },
];

/* ─── helpers ─── */
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

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
  const [heelAngle, setHeelAngle] = useState(0);
  const [shipType, setShipType] = useState<ShipType>("container");
  const [windMoment, setWindMoment] = useState(0); // external beam-wind heeling moment (t·m)
  const [mode, setMode] = useState<SimMode>("passage");
  const [seaCode, setSeaCode] = useState(4);
  const [wavePeriod, setWavePeriod] = useState(9);
  const [heading, setHeading] = useState(90);
  const [speedKn, setSpeedKn] = useState(12);
  const [pitchAngle, setPitchAngle] = useState(0);
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

  // Total heeling moment = a small intrinsic list (from a raised KG) + the
  // user-controlled beam-wind moment. The equilibrium heel is solved against
  // the actual righting moment Δ·GZ(φ), so it respects the GZ curve rather
  // than a naive small-angle approximation.
  const heelingMoment = useMemo(() => 2200 * (1 + (kgInput - 6.2) * 0.12) + windMoment, [kgInput, windMoment]);
  const targetHeel = useMemo(
    () => solveHeelAngle(stability.gm, stability.bm, stability.displacement, heelingMoment, 55),
    [stability, heelingMoment]
  );

  // Roll spring stiffness follows GM (stiff ship rolls fast), clamped sane.
  const rollDynamics = useMemo(
    () => ({ omega: clamp(Math.sqrt(9.81 * Math.max(stability.gm, 0.05)) * 0.8, 0.6, 4), zeta: 0.15 }),
    [stability.gm]
  );
  const gz = useMemo(() => calculateGZ(stability.gm, stability.bm, heelAngle), [stability, heelAngle]);
  const heelDeg = THREE.MathUtils.radToDeg(heelAngle);
  const absHeel = Math.abs(heelDeg);
  const deckImmersed = deckImmAngle > 0 && absHeel >= deckImmAngle;
  const nearCapsize = absHeel >= 45;

  const handleHeelUpdate = useCallback((h: number) => setHeelAngle(h), []);
  const handleMotion = useCallback((_r: number, p: number) => setPitchAngle(p), []);

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
      hullCalm: mode === "harbour" ? 0.6 : 0.85,
      rollOmega: isFinite(rollingPeriod) && rollingPeriod > 0 ? (2 * Math.PI) / rollingPeriod : 0.3,
      rollZeta: 0.06,
    }),
    [effHs, effT, effHeading, effSpeed, mode, rollingPeriod]
  );

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">3D Stability Simulation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mode selector */}
        <div className="grid grid-cols-2 gap-2" role="tablist" aria-label="Simulation mode">
          {([
            { v: "harbour", label: "Harbour", Icon: Anchor },
            { v: "passage", label: "Passage", Icon: Waves },
          ] as const).map(({ v, label, Icon }) => (
            <button
              key={v}
              role="tab"
              aria-selected={mode === v}
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
            <SelectTrigger className="h-8 w-full text-xs sm:w-44">
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

        {/* 3D viewport */}
        <div className="relative h-[340px] overflow-hidden rounded-xl border border-border/60 bg-slate-950">
          {/* An error boundary is essential here: if WebGL is unavailable or a
              draw call throws, React would otherwise unmount the whole subtree
              and leave a blank box. Instead we show a graceful message while the
              numeric calculations below keep working. */}
          <SimErrorBoundary fallback={<SimErrorFallback />}>
            <Suspense fallback={<SimLoadingFallback />}>
              <Canvas
                shadows
                dpr={[1, 1.75]}
                performance={{ min: 0.6 }}
                gl={{
                  antialias: true,
                  powerPreference: "high-performance",
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.1,
                }}
                onCreated={({ gl }) => {
                  gl.shadowMap.type = THREE.PCFSoftShadowMap;
                }}
              >
                <PerspectiveCamera makeDefault position={[7, 4.5, 7]} fov={42} />
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
                  heelRad={targetHeel}
                  draftM={draftInput}
                  rollDynamics={rollDynamics}
                  onHeelUpdate={handleHeelUpdate}
                  onMotionUpdate={handleMotion}
                  sea={sea}
                  scenery={mode === "harbour" ? <HarbourScene /> : null}
                >
                  <StabilityMarkers
                    kY={keelWorldY(draftInput)}
                    kb={stability.kb}
                    kg={kgInput}
                    km={stability.km}
                    heelAngle={heelAngle}
                    gz={gz}
                    vScale={MARKER_VSCALE}
                  />
                </ShipScene3D>
              </Canvas>
            </Suspense>
          </SimErrorBoundary>

          {/* Interaction hint */}
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 rounded-md bg-background/70 px-2 py-1 text-micro text-muted-foreground shadow-sm">
            Drag: rotate · Pinch: zoom
          </div>

          {/* Live readout - top left */}
          <div className="absolute left-2.5 top-2.5 rounded-lg bg-background/85 px-3 py-2 text-micro shadow-md">
            <div className="space-y-0.5">
              <Row label="KM" value={`${stability.km.toFixed(2)} m`} />
              <Row label="KG" value={`${kgInput.toFixed(2)} m`} />
              <Row label="GM" value={`${stability.gm.toFixed(2)} m`} color={stability.gm < 0.15 ? "#ef4444" : "#22c55e"} />
              <div className="my-1 border-t border-border/30" />
              <Row label="GZ" value={`${gz.toFixed(3)} m`} />
              <Row
                label="Heel"
                value={`${heelDeg.toFixed(1)}°`}
                color={nearCapsize ? "#ef4444" : deckImmersed ? "#f59e0b" : undefined}
              />
              <Row label="T (roll)" value={`${isFinite(rollingPeriod) ? rollingPeriod.toFixed(1) : "∞"} s`} />
              <Row label="Pitch" value={`${THREE.MathUtils.radToDeg(pitchAngle).toFixed(1)}°`} />
              <Row label="T (enc.)" value={`${isFinite(te) ? te.toFixed(1) : "∞"} s`} />
              <Row label="wind" value={windMoment > 0 ? `${Math.round(windMoment / 1000)}k t·m` : "—"} />
            </div>
          </div>

          {/* Hydrostatic data - bottom right */}
          <div className="absolute bottom-2.5 right-2.5 rounded-lg bg-background/85 px-3 py-2 text-micro text-muted-foreground shadow-md">
            <div>KB: {stability.kb.toFixed(2)} m</div>
            <div>BM: {stability.bm.toFixed(2)} m</div>
            <div>Δ: {Math.round(stability.displacement)} t</div>
            <div>φ_deck: {deckImmAngle.toFixed(1)}°</div>
          </div>

          {/* GM danger warning */}
          {stability.gm < 0.15 && (
            <div className="absolute left-1/2 top-2.5 -translate-x-1/2 rounded-lg bg-red-500/90 px-3 py-1.5 text-micro font-semibold text-white shadow-lg flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              DANGER: GM &lt; 0.15 m — insufficient stability!
            </div>
          )}

          {/* Heel / deck-immersion warning (only when GM is otherwise OK) */}
          {stability.gm >= 0.15 && (nearCapsize || deckImmersed) && (
            <div
              className={`absolute left-1/2 top-2.5 -translate-x-1/2 rounded-lg px-3 py-1.5 text-micro font-semibold text-white shadow-lg flex items-center gap-1.5 ${
                nearCapsize ? "bg-red-500/90" : "bg-amber-500/90"
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              {nearCapsize
                ? `DANGER: ${absHeel.toFixed(0)}° heel — capsize risk!`
                : `Deck edge immersed (φ_deck ${deckImmAngle.toFixed(0)}°)`}
            </div>
          )}
        </div>

        {/* Sea state controls */}
        {mode === "passage" ? (
          <div className="space-y-3 rounded-lg border border-primary/25 bg-primary/5 p-3">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-xs font-semibold">Sea state (Douglas)</Label>
              <Select value={String(seaCode)} onValueChange={(v) => setSeaCode(Number(v))}>
                <SelectTrigger className="h-8 w-44 text-xs">
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
              <div className="grid grid-cols-5 gap-1">
                {HEADINGS.map((h) => (
                  <button
                    key={h.deg}
                    onClick={() => setHeading(h.deg)}
                    aria-pressed={heading === h.deg}
                    className={`rounded-md border px-1 py-1.5 text-micro font-semibold ${
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
            {risk !== "none" && (
              <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-2 text-micro text-destructive">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  {risk === "synchronous"
                    ? `Synchronous rolling risk: encounter period (${te.toFixed(1)} s) ≈ roll period (${rollingPeriod.toFixed(1)} s). Alter course or speed.`
                    : `Parametric rolling risk: encounter period (${te.toFixed(1)} s) ≈ ½ roll period (${(rollingPeriod / 2).toFixed(1)} s). Alter course or speed.`}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-primary/25 bg-primary/5 p-3 text-micro text-muted-foreground">
            Alongside in a sheltered basin: low swell (Hs 0.2 m, T 5 s), ship stopped. Switch to Passage to set sea state, wave direction and speed.
          </div>
        )}

        {/* Wind / heeling-moment slider — the "star" control */}
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
          <Label className="mb-1.5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-sky-600 dark:text-sky-300">
              <Wind className="h-3.5 w-3.5" />
              Wind / Roll Moment
            </span>
            <span className="font-mono">
              {windMoment > 0 ? `${Math.round(windMoment / 1000)}k t·m → ${absHeel.toFixed(1)}°` : "Calm"}
            </span>
          </Label>
          <Slider
            value={[windMoment]}
            min={0}
            max={280000}
            step={5000}
            onValueChange={(v) => setWindMoment(v[0])}
          />
          <p className="mt-1 text-micro text-muted-foreground">
            The heeling moment of a beam wind. The equilibrium heel is solved by setting it equal to the righting moment Δ·GZ(φ). Higher KG → lower GM → greater heel in the same wind.
          </p>
        </div>

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
            At large angles (φ &gt; 15°) the wall-sided formula gives a far more accurate result than the linear approximation. Roll motion is modelled as a damped harmonic oscillator (ζ = 0.15).
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

/* ─── sub-components ─── */

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
      <span className="font-mono font-semibold" style={color ? { color } : undefined}>
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
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} />
      <p className="text-micro text-muted-foreground">{hint}</p>
    </div>
  );
}

export default Stability3DSim;
