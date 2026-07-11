import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle2, Info, Waves, Wind } from "lucide-react";
import * as THREE from "three";

import {
  calculateStability,
  calculateGZ,
  checkIMOCriteria,
  calculateRollingPeriod,
  calculateDeckImmersionAngle,
  solveHeelAngle,
  type ShipState,
  type StabilityResult,
  type IMOCompliance,
} from "./sim/StabilityPhysics";
import { ShipModel3D, shipTypeOptions, type ShipType } from "./sim/ShipModel3D";
import { StabilityMarkers } from "./sim/StabilityMarkers";
import { OceanSurface3D } from "./sim/OceanSurface3D";
import { SceneEnvironment } from "./sim/SceneEnvironment";
import { disposeHullGeometries } from "./sim/hullGeometry";
import { disposeAllShipTextures } from "./sim/proceduralTextures";

/* ─── helpers ─── */
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

const SEA_STATE_LABELS = ["Sakin", "Hafif", "Az dalgalı", "Dalgalı", "Kaba", "Çok kaba", "Şiddetli"];

/* Vessel is drawn ~2× the visual span the old blob had; scale it down to fit
   the same framing, and record where its keel lands so the K marker sits on it. */
const SHIP_SCALE = 0.82;
/* ShipModel3D keel is at local y ≈ -0.7 (see its comment); scaled world keel: */
const SHIP_KEEL_Y = -0.7 * SHIP_SCALE;
/* Compress the real KM (~18 m) into the vessel's visual height so K/B/G/M read
   as a proportionate stack instead of floating far above the deck. */
const MARKER_VSCALE = 0.12;

/* ─── 3-D scene ─── */
interface SceneProps {
  targetHeel: number;
  draftOffset: number;
  stability: StabilityResult;
  kg: number;
  onHeelUpdate: (heel: number) => void;
  gm: number;
  bm: number;
  rollingPeriod: number;
  seaState: number;
  shipType: ShipType;
}

function StabilityScene({
  targetHeel,
  draftOffset,
  stability,
  kg,
  onHeelUpdate,
  gm,
  bm,
  rollingPeriod,
  seaState,
  shipType,
}: SceneProps) {
  const shipGroup = useRef<THREE.Group>(null);
  const heelRef = useRef(0);
  const velocityRef = useRef(0);
  const lastReport = useRef(0);

  // Dynamic rolling with damped spring physics
  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);

    // Use the calculated full-scale natural roll period. The previous
    // sqrt(g·GM) visual shortcut ignored radius of gyration and made a
    // 190-m ship snap back like a small boat.
    const period = Number.isFinite(rollingPeriod) && rollingPeriod > 2 ? rollingPeriod : 10;
    const omega = (Math.PI * 2) / period;
    const zeta = clamp(0.075 + seaState * 0.008, 0.075, 0.13);

    const error = heelRef.current - targetHeel;
    const accel = -omega * omega * error - 2 * zeta * omega * velocityRef.current;

    velocityRef.current += accel * dt;
    heelRef.current += velocityRef.current * dt;

    // Low-amplitude, multi-axis wave response keeps the hull coupled to the
    // animated sea. Pitch and heave remain deliberately smaller than roll.
    const sea = clamp(seaState / 6, 0, 1);
    const t = clock.elapsedTime;
    const waveRoll =
      THREE.MathUtils.degToRad(0.08 + sea * 1.15) *
      (Math.sin(t * omega * 0.96 + 0.4) * 0.72 + Math.sin(t * omega * 1.47) * 0.28);
    const pitch =
      THREE.MathUtils.degToRad(0.03 + sea * 0.34) *
      Math.sin(t * Math.max(0.28, omega * 0.58) + 1.3);
    const heave = (0.003 + sea * 0.035) * Math.sin(t * Math.max(0.34, omega * 0.72) - 0.8);
    const visualHeel = heelRef.current + waveRoll;

    if (shipGroup.current) {
      // X is the longitudinal roll axis; Z is the transverse pitch axis.
      shipGroup.current.rotation.x = visualHeel;
      shipGroup.current.rotation.z = pitch;
      shipGroup.current.position.y = heave;
    }

    if (clock.elapsedTime - lastReport.current > 0.08) {
      onHeelUpdate(visualHeel);
      lastReport.current = clock.elapsedTime;
    }
  });

  const keelY = SHIP_KEEL_Y - draftOffset * 0.5;

  return (
    <group>
      {/* Sky, fog, IBL environment (bundled HDR with a procedural fallback —
          still fully offline / Capacitor-safe) and the single shadow sun. */}
      <SceneEnvironment />

      {/* Ship group - heels about the waterline */}
      <group ref={shipGroup}>
        <group position={[0, -draftOffset * 0.5, 0]}>
          <ShipModel3D shipType={shipType} scale={SHIP_SCALE} />
        </group>
        {/* Stability reference points */}
        <StabilityMarkers
          kY={keelY}
          kb={stability.kb}
          kg={kg}
          km={stability.km}
          heelAngle={heelRef.current}
          gz={calculateGZ(gm, bm, heelRef.current)}
          vScale={MARKER_VSCALE}
        />
      </group>

      <OceanSurface3D shipType={shipType} seaState={seaState} />
    </group>
  );
}

/* ─── IMO compliance badge ─── */
function IMOBadge({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px]">
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
  const [seaState, setSeaState] = useState(2);
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

  const draftOffset = useMemo(() => clamp((draftInput - 6.5) * 0.06, -0.15, 0.25), [draftInput]);
  const gz = useMemo(() => calculateGZ(stability.gm, stability.bm, heelAngle), [stability, heelAngle]);
  const heelDeg = THREE.MathUtils.radToDeg(heelAngle);
  const absHeel = Math.abs(heelDeg);
  const deckImmersed = deckImmAngle > 0 && absHeel >= deckImmAngle;
  const nearCapsize = absHeel >= 45;

  const handleHeelUpdate = useCallback((h: number) => setHeelAngle(h), []);

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">3B Stabilite Simülasyonu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ship-type selector */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/30 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-xs font-semibold">Gemi Tipi</Label>
            <span className="hidden text-[10px] text-muted-foreground sm:inline">{activeShip?.description}</span>
          </div>
          <Select value={shipType} onValueChange={(v) => setShipType(v as ShipType)}>
            <SelectTrigger className="h-8 w-full text-xs sm:w-44">
              <SelectValue placeholder="Gemi tipi seç" />
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
                <PerspectiveCamera makeDefault position={[8.2, 4.8, 8.2]} fov={38} />
                {/* Let the user orbit / zoom the vessel. Pan is disabled and the
                    polar angle is clamped so the camera can't dip under the sea. */}
                <OrbitControls
                  enablePan={false}
                  enableDamping
                  dampingFactor={0.08}
                  minDistance={5.8}
                  maxDistance={18}
                  maxPolarAngle={Math.PI / 2.05}
                  target={[0, 0.2, 0]}
                />
                <StabilityScene
                  targetHeel={targetHeel}
                  draftOffset={draftOffset}
                  stability={stability}
                  kg={kgInput}
                  onHeelUpdate={handleHeelUpdate}
                  gm={stability.gm}
                  bm={stability.bm}
                  rollingPeriod={rollingPeriod}
                  seaState={seaState}
                  shipType={shipType}
                />
              </Canvas>
            </Suspense>
          </SimErrorBoundary>

          {/* Interaction hint */}
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 rounded-md bg-background/70 px-2 py-1 text-[9px] text-muted-foreground shadow-sm backdrop-blur-sm">
            Sürükle: döndür · Kaydır: yakınlaş
          </div>

          {/* Live readout - top left */}
          <div className="absolute left-2.5 top-2.5 rounded-lg bg-background/85 px-3 py-2 text-[11px] shadow-md backdrop-blur-sm">
            <div className="space-y-0.5">
              <Row label="KM" value={`${stability.km.toFixed(2)} m`} />
              <Row label="KG" value={`${kgInput.toFixed(2)} m`} />
              <Row label="GM" value={`${stability.gm.toFixed(2)} m`} color={stability.gm < 0.15 ? "#ef4444" : "#22c55e"} />
              <div className="my-1 border-t border-border/30" />
              <Row label="GZ" value={`${gz.toFixed(3)} m`} />
              <Row
                label="Meyil"
                value={`${heelDeg.toFixed(1)}°`}
                color={nearCapsize ? "#ef4444" : deckImmersed ? "#f59e0b" : undefined}
              />
              <Row label="T (roll)" value={`${isFinite(rollingPeriod) ? rollingPeriod.toFixed(1) : "∞"} s`} />
              <Row label="Rüzgâr" value={windMoment > 0 ? `${Math.round(windMoment / 1000)}k t·m` : "—"} />
              <Row label="Deniz" value={SEA_STATE_LABELS[seaState]} />
            </div>
          </div>

          {/* Hydrostatic data - bottom right */}
          <div className="absolute bottom-2.5 right-2.5 rounded-lg bg-background/85 px-3 py-2 text-[10px] text-muted-foreground shadow-md backdrop-blur-sm">
            <div>KB: {stability.kb.toFixed(2)} m</div>
            <div>BM: {stability.bm.toFixed(2)} m</div>
            <div>Δ: {Math.round(stability.displacement)} t</div>
            <div>φ_deck: {deckImmAngle.toFixed(1)}°</div>
          </div>

          {/* GM danger warning */}
          {stability.gm < 0.15 && (
            <div className="absolute left-1/2 top-2.5 -translate-x-1/2 rounded-lg bg-red-500/90 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur-sm flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              TEHLİKE: GM &lt; 0.15 m — Yetersiz stabilite!
            </div>
          )}

          {/* Heel / deck-immersion warning (only when GM is otherwise OK) */}
          {stability.gm >= 0.15 && (nearCapsize || deckImmersed) && (
            <div
              className={`absolute left-1/2 top-2.5 -translate-x-1/2 rounded-lg px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur-sm flex items-center gap-1.5 ${
                nearCapsize ? "bg-red-500/90" : "bg-amber-500/90"
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              {nearCapsize
                ? `TEHLİKE: ${absHeel.toFixed(0)}° meyil — alabora riski!`
                : `Güverte kenarı suya girdi (φ_deck ${deckImmAngle.toFixed(0)}°)`}
            </div>
          )}
        </div>

        {/* Wind / heeling-moment slider — the "star" control */}
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
          <Label className="mb-1.5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-sky-600 dark:text-sky-300">
              <Wind className="h-3.5 w-3.5" />
              Rüzgâr / Yalpa Momenti
            </span>
            <span className="font-mono">
              {windMoment > 0 ? `${Math.round(windMoment / 1000)}k t·m → ${absHeel.toFixed(1)}°` : "Sakin"}
            </span>
          </Label>
          <Slider
            value={[windMoment]}
            min={0}
            max={280000}
            step={5000}
            onValueChange={(v) => setWindMoment(v[0])}
          />
          <p className="mt-1 text-[10px] text-muted-foreground">
            Yandan esen rüzgârın devirme momenti. Denge meyli, doğrultma momenti Δ·GZ(φ)'ye eşitlenerek çözülür.
            Yüksek KG → düşük GM → aynı rüzgârda daha büyük meyil.
          </p>

          <div className="mt-3 border-t border-sky-500/20 pt-3">
            <Label className="mb-1.5 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-sky-600 dark:text-sky-300">
                <Waves className="h-3.5 w-3.5" />
                Deniz durumu
              </span>
              <span className="font-mono">{seaState} · {SEA_STATE_LABELS[seaState]}</span>
            </Label>
            <Slider
              value={[seaState]}
              min={0}
              max={6}
              step={1}
              onValueChange={(v) => setSeaState(v[0])}
            />
            <p className="mt-1 text-[10px] text-muted-foreground">
              Görsel dalga, yalpa, baş-kıç vurma ve düşey hareket şiddetini birlikte değiştirir.
            </p>
          </div>
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
            hint="Ağırlık merkezi yüksekliği. ↑ KG → ↓ GM"
          />
          <SliderControl
            label="Draft (m)"
            value={draftInput}
            min={4.0}
            max={12.0}
            step={0.1}
            onChange={setDraftInput}
            hint="Su çekimi. Deplasman ve KB etkiler."
          />
          <SliderControl
            label="Cb (blok kts.)"
            value={cbInput}
            min={0.55}
            max={0.88}
            step={0.01}
            onChange={setCbInput}
            hint="Gövde doluluk oranı. BM'yi etkiler."
          />
        </div>

        {/* IMO A.749 Compliance */}
        <div className="rounded-lg border border-border/40 bg-muted/30 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Info className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">IMO A.749 Stabilite Kriterleri</span>
            <Badge
              variant={imo.overallPass ? "default" : "destructive"}
              className="ml-auto text-[10px] px-1.5 py-0"
            >
              {imo.overallPass ? "UYGUN" : "UYGUN DEĞİL"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <IMOBadge label={`GM ≥ 0.15 m (${stability.gm.toFixed(2)})`} ok={imo.gmOk} />
            <IMOBadge label={`GZ₃₀° ≥ 0.20 m`} ok={imo.gzAt30Ok} />
            <IMOBadge label={`Max GZ açısı ≥ 25°`} ok={imo.maxGzAngleOk} />
            <IMOBadge label={`Alan 0–30° ≥ 0.055 m·rad`} ok={imo.areaTo30Ok} />
            <IMOBadge label={`Alan 0–40° ≥ 0.090 m·rad`} ok={imo.areaTo40Ok} />
            <IMOBadge label={`Alan 30–40° ≥ 0.030 m·rad`} ok={imo.area30to40Ok} />
          </div>
        </div>

        {/* Formulas */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-[11px] text-muted-foreground space-y-1">
          <div className="font-mono text-primary text-xs">GM = KM − KG</div>
          <div className="font-mono text-primary text-xs">GZ = sinφ · [GM + ½·BM·tan²φ]</div>
          <div className="font-mono text-primary text-xs">KB ≈ ⅓(5T/2 − ∇/Awp)</div>
          <p className="mt-1 text-[10px]">
            Wall-sided formül büyük açılarda (φ &gt; 15°) doğrusal yaklaşıma göre çok daha doğru sonuç verir.
            Yalpa hareketi, hesaplanan doğal yalpa periyodunu kullanan sönümlü harmonik osilatörle modellenir.
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
        3D görüntüleme bu cihazda başlatılamadı (WebGL desteklenmiyor olabilir).
        Hesaplamalar ve kriterler aşağıda çalışmaya devam eder.
      </p>
    </div>
  );
}

function SimLoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-xs text-muted-foreground">3D simülasyon yükleniyor…</p>
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
      <p className="text-[10px] text-muted-foreground">{hint}</p>
    </div>
  );
}

export default Stability3DSim;

