import { useEffect, useMemo, useRef, type MutableRefObject, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneEnvironment } from "./SceneEnvironment";
import { OceanSurface3D } from "./OceanSurface3D";
import { ShipModel3D, type ShipType } from "./ShipModel3D";
import { immersionFor, SHIP_SCALE_DEFAULT } from "./shipDraftGeometry";
import { buildSea, SCENE_G, type WaveComponent } from "@/lib/seakeeping";
import { advanceOcean, createOceanFrame, createVesselMotion, stepVesselMotion, waveTargets } from "@/lib/oceanSimulation";
import { SimulationClock } from "./SimulationClock";

/**
 * Sea-keeping input. When set, the ship heaves, rolls and pitches on the SAME
 * Gerstner sea the ocean shader draws: heave follows mean surface height under
 * the hull, roll/pitch are damped oscillators forced by the local wave slope
 * across the beam and along the length (distributed waterplane approximation).
 */
export interface SeaMotion {
  waves: WaveComponent[];
  gravity: number;
  /** Ship speed in scene units per second (water drifts astern). */
  speedUnits: number;
  /** Natural roll circular frequency (rad/s) = 2π / Tr. */
  rollOmega: number;
  rollZeta: number;
}

/**
 * Shared realistic ship scene: environment/IBL + Gerstner ocean + wake layer
 * + the vessel on a heel/trim/immersion rig. Used by BOTH stability screens
 * (Stability3DSim on /beta/ship-simulator and Ship3DVisualization on
 * /stability/calculations) so they render the same ship.
 *
 * The heel angle animates either as a damped harmonic roll (rollDynamics set,
 * physics feel for the beta sim) or a frame-rate-independent exponential lerp
 * (rollDynamics null, direct slider feel for the calculations page). Trim and
 * draft immersion always lerp.
 *
 * Draft honesty: the hull's painted draft marks use UNITS_PER_METER, and the
 * ship group is immersed by (draftM − 6.5)·UNITS_PER_METER·scale, so the
 * waterline genuinely crosses the marks at the requested draft. The visual
 * hull is ~12.4 m deep versus the physics ship's 18.5 m moulded depth, so
 * immersion is clamped to keep the deck edge just above water — the marks
 * stay height-honest through roughly 4–11 m of draft.
 */

export interface ShipScene3DProps {
  shipType: ShipType;
  /** Target heel in radians; + heels to starboard (group rotation.x). */
  heelRad: number;
  /** Trim in radians; + = bow down ("head trim"). Applied as rotation.z = -trim. */
  trimRad?: number;
  /** Real draft in metres; 6.5 puts the boot-top on the waterline. */
  draftM?: number;
  /** Damped-spring roll parameters, or null for a critically-damped lerp. */
  rollDynamics?: { omega: number; zeta: number } | null;
  /** Throttled (10 Hz) live heel callback for HUD/GZ readouts. */
  onHeelUpdate?: (heelRad: number) => void;
  /** Wake foam strength; 0 removes bow/stern foam. */
  wakeIntensity?: number;
  scale?: number;
  sea?: SeaMotion | null;
  /** Throttled live roll/pitch (radians) for the sea-keeping HUD. */
  onMotionUpdate?: (rollRad: number, pitchRad: number, heaveUnits: number) => void;
  paused?: boolean;
  resetToken?: number;
  quality?: 'high' | 'balanced';
  /** Extra scenery that does not move with the ship (e.g. harbour). */
  scenery?: ReactNode;
  /** Rendered inside the heeling group — markers tilt with the ship. */
  children?: ReactNode;
}

export function ShipScene3D({
  shipType,
  heelRad,
  trimRad = 0,
  draftM = 6.5,
  rollDynamics = null,
  onHeelUpdate,
  wakeIntensity = 0.35,
  scale = SHIP_SCALE_DEFAULT,
  sea = null,
  onMotionUpdate,
  scenery,
  paused = false,
  resetToken = 0,
  quality = "balanced",
  children,
}: ShipScene3DProps) {
  const heelGroup = useRef<THREE.Group>(null);
  const immersionGroup = useRef<THREE.Group>(null);
  const heelRef = useRef(0) as MutableRefObject<number>;
  const velocityRef = useRef(0);
  const trimRef = useRef(0);
  const immersionRef = useRef(immersionFor(draftM, scale));
  const lastReport = useRef(0);
  const fallbackWaves = useMemo(() => buildSea(0.35, 8, 120), []);
  const frame = useRef(createOceanFrame(sea?.waves ?? fallbackWaves));
  const motion = useRef(createVesselMotion());
  const totalHeel = useRef(0);

  useEffect(() => {
    frame.current.time = 0;
    frame.current.accumulator = 0;
    frame.current.phases = createOceanFrame(frame.current.waves).phases;
    motion.current = createVesselMotion();
    velocityRef.current = 0;
    heelRef.current = 0;
    lastReport.current = -1;
  }, [resetToken]);

  // Update before the GPU material copies uniforms: one clock for every layer.
  useFrame((_, delta) => {
    advanceOcean(frame.current, sea?.waves ?? fallbackWaves, sea?.speedUnits ?? 0.08,
      sea?.gravity ?? SCENE_G, delta, paused, dt => {
        if (rollDynamics) {
          const { omega, zeta } = rollDynamics;
          const accel = -omega * omega * (heelRef.current - heelRad) - 2 * zeta * omega * velocityRef.current;
          velocityRef.current += accel * dt;
          heelRef.current += velocityRef.current * dt;
        } else {
          heelRef.current += (heelRad - heelRef.current) * (1 - Math.exp(-6 * dt));
          velocityRef.current = 0;
        }
        trimRef.current += (-trimRad - trimRef.current) * (1 - Math.exp(-6 * dt));
        immersionRef.current += (immersionFor(draftM, scale) - immersionRef.current) * (1 - Math.exp(-2 * dt));
        if (sea) stepVesselMotion(motion.current, waveTargets(frame.current, scale / SHIP_SCALE_DEFAULT), sea.rollOmega, sea.rollZeta, dt);
      });
    const m = motion.current;
    totalHeel.current = heelRef.current + (sea ? m.roll : 0);
    if (heelGroup.current) {
      heelGroup.current.rotation.x = totalHeel.current;
      heelGroup.current.rotation.z = trimRef.current + (sea ? m.pitch : 0);
      heelGroup.current.position.y = sea ? m.heave : 0;
    }
    if (immersionGroup.current) immersionGroup.current.position.y = -immersionRef.current;
    if (frame.current.time - lastReport.current >= 0.1) {
      onHeelUpdate?.(totalHeel.current);
      onMotionUpdate?.(totalHeel.current, sea ? m.pitch : 0, sea ? m.heave : 0);
      lastReport.current = frame.current.time;
    }
  }, -1);

  return (
    <group>
      <SceneEnvironment />
      <OceanSurface3D frame={frame} heelRef={totalHeel} wakeIntensity={wakeIntensity} quality={quality} />
      {scenery}

      {/* heel/trim rig → immersion rig → vessel; markers ride the heel rig */}
      <group ref={heelGroup} name="vessel-motion">
        <group ref={immersionGroup}>
          <SimulationClock.Provider value={frame}>
            <ShipModel3D shipType={shipType} scale={scale} />
          </SimulationClock.Provider>
        </group>
        {children}
      </group>
    </group>
  );
}

export default ShipScene3D;
