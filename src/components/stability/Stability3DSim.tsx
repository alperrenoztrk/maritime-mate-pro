import { Component, Suspense, useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import * as THREE from "three";

import {
  calculateStability,
  calculateGZ,
  checkIMOCriteria,
  calculateRollingPeriod,
  calculateDeckImmersionAngle,
  type ShipState,
  type StabilityResult,
  type IMOCompliance,
} from "./sim/StabilityPhysics";
import { ShipHull3D } from "./sim/ShipHull3D";
import { StabilityMarkers } from "./sim/StabilityMarkers";
import { WaterSurface3D } from "./sim/WaterSurface3D";

/* ─── helpers ─── */
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/* ─── 3-D scene ─── */
interface SceneProps {
  targetHeel: number;
  draftOffset: number;
  stability: StabilityResult;
  kg: number;
  onHeelUpdate: (heel: number) => void;
  gm: number;
  bm: number;
}

function StabilityScene({ targetHeel, draftOffset, stability, kg, onHeelUpdate, gm, bm }: SceneProps) {
  const shipGroup = useRef<THREE.Group>(null);
  const heelRef = useRef(0);
  const velocityRef = useRef(0);
  const lastReport = useRef(0);

  // Dynamic rolling with damped spring physics
  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);

    // Damped harmonic oscillator: θ'' = -ω²(θ - θ_target) - 2ζωθ'
    const omega = gm > 0 ? Math.sqrt(9.81 * gm) * 0.8 : 1;
    const zeta = 0.15; // damping ratio (underdamped for realistic roll)

    const error = heelRef.current - targetHeel;
    const accel = -omega * omega * error - 2 * zeta * omega * velocityRef.current;

    velocityRef.current += accel * dt;
    heelRef.current += velocityRef.current * dt;

    if (shipGroup.current) {
      shipGroup.current.rotation.z = heelRef.current;
    }

    if (clock.elapsedTime - lastReport.current > 0.08) {
      onHeelUpdate(heelRef.current);
      lastReport.current = clock.elapsedTime;
    }
  });

  const keelY = -0.45 - draftOffset;

  return (
    <group>
      {/* Local lighting only — no external HDR / IBL fetch so the scene always
          renders, even offline or inside a Capacitor WebView. A hemisphere
          light gives a soft sky/sea gradient that reads well on the metallic
          hull without needing an environment map. */}
      <hemisphereLight args={["#bcd7ff", "#0a1420", 0.6]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 12, 6]} intensity={1.15} />
      <directionalLight position={[-6, 6, -6]} intensity={0.35} color="#93c5fd" />

      {/* Ship group - rotates around metacenter */}
      <group ref={shipGroup}>
        <group position={[0, -draftOffset * 0.5, 0]}>
          <ShipHull3D />
        </group>
        {/* Stability reference points */}
        <StabilityMarkers
          kY={keelY}
          kb={stability.kb}
          kg={kg}
          km={stability.km}
          heelAngle={heelRef.current}
          gz={calculateGZ(gm, bm, heelRef.current)}
        />
      </group>

      <WaterSurface3D />

      {/* Sea floor hint */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color="#0c1524" opacity={0.15} transparent />
      </mesh>
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

  // External heeling moment → target heel angle
  const heelingMoment = useMemo(() => 2200 * (1 + (kgInput - 6.2) * 0.12), [kgInput]);
  const targetHeel = useMemo(() => {
    const gmSafe = clamp(stability.gm, 0.05, 10);
    const ratio = heelingMoment / (stability.displacement * gmSafe);
    return clamp(Math.atan(ratio), -0.65, 0.65);
  }, [stability, heelingMoment]);

  const draftOffset = useMemo(() => clamp((draftInput - 6.5) * 0.06, -0.15, 0.25), [draftInput]);
  const gz = useMemo(() => calculateGZ(stability.gm, stability.bm, heelAngle), [stability, heelAngle]);
  const heelDeg = THREE.MathUtils.radToDeg(heelAngle);

  const handleHeelUpdate = useCallback((h: number) => setHeelAngle(h), []);

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">3B Stabilite Simülasyonu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 3D viewport */}
        <div className="relative h-[340px] overflow-hidden rounded-xl border border-border/60 bg-slate-950">
          {/* An error boundary is essential here: if WebGL is unavailable or a
              draw call throws, React would otherwise unmount the whole subtree
              and leave a blank box. Instead we show a graceful message while the
              numeric calculations below keep working. */}
          <SimErrorBoundary fallback={<SimErrorFallback />}>
            <Suspense fallback={<SimLoadingFallback />}>
              <Canvas
                dpr={[1, 1.75]}
                gl={{ antialias: true, powerPreference: "high-performance" }}
                onCreated={({ gl }) => gl.setClearColor("#0b1220")}
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
                <StabilityScene
                  targetHeel={targetHeel}
                  draftOffset={draftOffset}
                  stability={stability}
                  kg={kgInput}
                  onHeelUpdate={handleHeelUpdate}
                  gm={stability.gm}
                  bm={stability.bm}
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
              <Row label="Meyil" value={`${heelDeg.toFixed(1)}°`} />
              <Row label="T (roll)" value={`${isFinite(rollingPeriod) ? rollingPeriod.toFixed(1) : "∞"} s`} />
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
            Yalpa hareketi sönümlü harmonik osilatör (ζ = 0.15) ile modellenir.
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
