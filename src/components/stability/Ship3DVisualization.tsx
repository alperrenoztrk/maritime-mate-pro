import { Component, Suspense, useEffect, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Move3d } from "lucide-react";
import * as THREE from "three";

import { type ShipType } from "./sim/ShipModel3D";
import { shipTypeOptions } from "./sim/shipTypeOptions";
import { ShipScene3D } from "./sim/ShipScene3D";
import { keelWorldY } from "./sim/shipDraftGeometry";
import { StabilityMarkers } from "./sim/StabilityMarkers";
import { disposeHullGeometries } from "./sim/hullGeometry";
import { disposeAllShipTextures } from "./sim/proceduralTextures";

/**
 * "3D Ship Simulation" card on the Stability Calculations page.
 *
 * Renders the SAME realistic vessel scene as the beta ship simulator
 * (ShipScene3D: lofted hull with bulbous bow, stepped superstructure, Gerstner
 * ocean, IBL sky) driven directly by the heel/trim sliders. This replaced the
 * old box-primitive ship, its CPU water plane (which used THREE.RGBFormat,
 * removed in three r137) and the drei Environment CDN preset — everything
 * here renders offline inside the Capacitor WebView.
 *
 * The old wireframe cargo-tank cut-away is intentionally gone: it needed a
 * translucent hull, which is incompatible with the realistic plating. Heel
 * and trim status boxes plus the G/B/M legend are preserved.
 */

/* Representative hydrostatic points for the education markers (metres above
   keel, compressed by MARKER_VSCALE) — this card has no live GM physics. */
const MARKER_KB = 3.5;
const MARKER_KG = 5.8;
const MARKER_KM = 7.2;
const MARKER_VSCALE = 0.12;

class SimErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error("Ship3DVisualization render error:", error);
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
        3D rendering could not be started on this device (WebGL may not be supported).
      </p>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-xs text-muted-foreground">3D model loading…</p>
      </div>
    </div>
  );
}

export const Ship3DVisualization = () => {
  const [heelAngle, setHeelAngle] = useState<number>(0);
  const [trimAngle, setTrimAngle] = useState<number>(0);
  const [shipType, setShipType] = useState<ShipType>("container");
  const activeShipType = shipTypeOptions.find((option) => option.value === shipType);

  // Free cached hull geometries + canvas textures when leaving the page.
  useEffect(
    () => () => {
      disposeAllShipTextures();
      disposeHullGeometries();
    },
    []
  );

  const handleReset = () => {
    setHeelAngle(0);
    setTrimAngle(0);
  };

  const heelRad = THREE.MathUtils.degToRad(heelAngle);

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Move3d className="h-5 w-5 text-primary" />
          3D Ship Simulation
        </CardTitle>
        <CardDescription className="text-xs">
          Rotate, pan and zoom with the mouse. Select the type of ship and examine the different superstructure and Deck layouts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 rounded-lg border border-border/40 bg-muted/40 p-3 text-xs">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Label className="text-xs font-semibold">Ship Type</Label>
            <Select value={shipType} onValueChange={(value) => setShipType(value as ShipType)}>
              <SelectTrigger className="h-8 w-full sm:w-48 text-xs">
                <SelectValue placeholder="Select ship type" />
              </SelectTrigger>
              <SelectContent>
                {shipTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-muted-foreground">{activeShipType?.description}</p>
        </div>

        <div className="relative h-[300px] w-full overflow-hidden rounded-lg border border-border/40 bg-slate-950">
          <SimErrorBoundary fallback={<SimErrorFallback />}>
            <Suspense fallback={<LoadingFallback />}>
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
                  heelRad={heelRad}
                  trimRad={THREE.MathUtils.degToRad(trimAngle)}
                  rollDynamics={null}
                  wakeIntensity={0.3}
                >
                  <StabilityMarkers
                    kY={keelWorldY(6.5)}
                    kb={MARKER_KB}
                    kg={MARKER_KG}
                    km={MARKER_KM}
                    heelAngle={heelRad}
                    gz={0}
                    vScale={MARKER_VSCALE}
                  />
                </ShipScene3D>
              </Canvas>
            </Suspense>
          </SimErrorBoundary>

          {/* Legend overlay */}
          <div className="absolute bottom-2 left-2 space-y-0.5 rounded bg-background/80 px-2 py-1 text-micro">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>G - Center of Gravity</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>B - Lift Center</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>M - Metacentre</span>
            </div>
          </div>

          {/* Angle display */}
          <div className="absolute right-2 top-2 rounded bg-background/80 px-2 py-1 font-mono text-micro">
            <div>Heel {heelAngle}°</div>
            <div>Trim: {trimAngle}°</div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="flex justify-between text-xs">
              <span>Heel</span>
              <span className="font-mono">{heelAngle}°</span>
            </Label>
            <Slider value={[heelAngle]} onValueChange={(v) => setHeelAngle(v[0])} min={-45} max={45} step={1} />
            <div className="flex justify-between text-micro text-muted-foreground">
              <span>Pier -45°</span>
              <span>Starboard +45°</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="flex justify-between text-xs">
              <span>Trim</span>
              <span className="font-mono">{trimAngle}°</span>
            </Label>
            <Slider value={[trimAngle]} onValueChange={(v) => setTrimAngle(v[0])} min={-10} max={10} step={0.5} />
            <div className="flex justify-between text-micro text-muted-foreground">
              <span>Stern Trim -10°</span>
              <span>Head Trim +10°</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} className="h-8 flex-1 text-xs">
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset Angles
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div
            className={`rounded p-2 ${
              Math.abs(heelAngle) > 15
                ? "border border-red-500/30 bg-red-500/10"
                : Math.abs(heelAngle) > 5
                  ? "border border-yellow-500/30 bg-yellow-500/10"
                  : "border border-green-500/30 bg-green-500/10"
            }`}
          >
            <p className="font-semibold">Heel Status</p>
            <p className="text-muted-foreground">
              {Math.abs(heelAngle) <= 5 ? "✓ Normal" : Math.abs(heelAngle) <= 15 ? "⚠ Attention" : "⚠ Dangerous!"}
            </p>
          </div>
          <div
            className={`rounded p-2 ${
              Math.abs(trimAngle) > 5 ? "border border-yellow-500/30 bg-yellow-500/10" : "border border-green-500/30 bg-green-500/10"
            }`}
          >
            <p className="font-semibold">Trim Status</p>
            <p className="text-muted-foreground">
              {trimAngle > 2 ? "Head Trim" : trimAngle < -2 ? "Stern Trim" : "✓ Plain Keel"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Ship3DVisualization;
