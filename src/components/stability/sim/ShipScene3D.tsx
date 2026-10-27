import { useRef, type MutableRefObject, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneEnvironment } from "./SceneEnvironment";
import { OceanSurface3D } from "./OceanSurface3D";
import { WakeEffects } from "./WakeEffects";
import { ShipModel3D, type ShipType } from "./ShipModel3D";
import { immersionFor, SHIP_SCALE_DEFAULT } from "./shipDraftGeometry";
import { gerstnerHeight, type WaveComponent } from "@/lib/seakeeping";

/**
 * Sea-keeping input. When set, the ship heaves, rolls and pitches on the SAME
 * Gerstner sea the ocean shader draws: heave follows mean surface height under
 * the hull, roll/pitch are damped oscillators forced by the local wave slope
 * across the beam and along the length (Froude–Krylov, small-ship assumption).
 */
export interface SeaMotion {
  waves: WaveComponent[];
  gravity: number;
  /** Ship speed in scene units per second (water drifts astern). */
  speedUnits: number;
  /** Fraction of wave energy drawn at the hull plating. */
  hullCalm: number;
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
  /** Throttled (~12 Hz) live heel callback for HUD/GZ readouts. */
  onHeelUpdate?: (heelRad: number) => void;
  /** Wake foam opacity; 0 removes the wake strips. */
  wakeIntensity?: number;
  scale?: number;
  sea?: SeaMotion | null;
  /** Throttled live roll/pitch (radians) for the sea-keeping HUD. */
  onMotionUpdate?: (rollRad: number, pitchRad: number) => void;
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
  children,
}: ShipScene3DProps) {
  const heelGroup = useRef<THREE.Group>(null);
  const immersionGroup = useRef<THREE.Group>(null);
  const heelRef = useRef(0) as MutableRefObject<number>;
  const velocityRef = useRef(0);
  const trimRef = useRef(0);
  const immersionRef = useRef(immersionFor(draftM, scale));
  const lastReport = useRef(0);
  const driftRef = useRef(0) as MutableRefObject<number>;
  const rollV = useRef(0);
  const roll = useRef(0);
  const pitchV = useRef(0);
  const pitch = useRef(0);
  const heave = useRef(0);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);

    if (rollDynamics) {
      // damped harmonic oscillator: θ'' = -ω²(θ - θ_target) - 2ζωθ'
      const { omega, zeta } = rollDynamics;
      const error = heelRef.current - heelRad;
      const accel = -omega * omega * error - 2 * zeta * omega * velocityRef.current;
      velocityRef.current += accel * dt;
      heelRef.current += velocityRef.current * dt;
    } else {
      heelRef.current += (heelRad - heelRef.current) * (1 - Math.exp(-6 * dt));
      velocityRef.current = 0;
    }
    trimRef.current += (-trimRad - trimRef.current) * (1 - Math.exp(-6 * dt));
    immersionRef.current += (immersionFor(draftM, scale) - immersionRef.current) * (1 - Math.exp(-2 * dt));

    let waveRoll = 0;
    let wavePitch = 0;
    let heaveY = 0;
    if (sea) {
      driftRef.current += sea.speedUnits * dt;
      const t = clock.elapsedTime;
      const d = driftRef.current;
      // Ship-local sample points in scene units (bow +x, starboard +z).
      // Plane local coords: px = x + drift, py = −z.
      const k = sea.hullCalm;
      const h = (x: number, z: number) => gerstnerHeight(sea.waves, sea.gravity, x + d, -z, t) * k;
      const halfL = 2.4 * (scale / SHIP_SCALE_DEFAULT);
      const halfB = 0.45 * (scale / SHIP_SCALE_DEFAULT);
      const hb = h(halfL, 0), hs = h(-halfL, 0), hp = h(0, -halfB), hst = h(0, halfB);
      const hm = (hb + hs + hp + hst) / 4;
      // Effective wave slope: +x bow up, +rotation.x heels toward +z (starboard).
      const slopePitch = Math.atan2(hb - hs, 2 * halfL);
      const slopeRoll = Math.atan2(hp - hst, 2 * halfB) * 0.5;

      const wr = sea.rollOmega, zr = sea.rollZeta;
      const rAcc = -wr * wr * (roll.current - slopeRoll) - 2 * zr * wr * rollV.current;
      rollV.current += rAcc * dt;
      roll.current = THREE.MathUtils.clamp(roll.current + rollV.current * dt, -0.7, 0.7);

      // Pitch is heavily damped: long hulls follow the wave contour closely.
      const wp = 2.2, zp = 0.7;
      const pAcc = -wp * wp * (pitch.current - slopePitch) - 2 * zp * wp * pitchV.current;
      pitchV.current += pAcc * dt;
      pitch.current += pitchV.current * dt;

      heave.current += (hm - heave.current) * (1 - Math.exp(-3 * dt));
      waveRoll = roll.current;
      wavePitch = pitch.current;
      heaveY = heave.current;
    }

    if (heelGroup.current) {
      heelGroup.current.rotation.x = heelRef.current + waveRoll;
      heelGroup.current.rotation.z = trimRef.current + wavePitch;
      heelGroup.current.position.y = heaveY;
    }
    if (immersionGroup.current) {
      immersionGroup.current.position.y = -immersionRef.current;
    }

    if (clock.elapsedTime - lastReport.current > 0.08) {
      onHeelUpdate?.(heelRef.current + waveRoll);
      onMotionUpdate?.(heelRef.current + waveRoll, wavePitch);
      lastReport.current = clock.elapsedTime;
    }
  });

  return (
    <group>
      <SceneEnvironment />
      <OceanSurface3D
        heelRef={heelRef}
        waves={sea?.waves}
        gravity={sea?.gravity}
        driftRef={sea ? driftRef : undefined}
        hullCalm={sea?.hullCalm}
        showWake={!sea || sea.speedUnits > 0.01}
      />
      {scenery}
      <WakeEffects heelRef={heelRef} intensity={sea && sea.speedUnits <= 0.01 ? 0 : wakeIntensity} scale={scale} />

      {/* heel/trim rig → immersion rig → vessel; markers ride the heel rig */}
      <group ref={heelGroup}>
        <group ref={immersionGroup}>
          <ShipModel3D shipType={shipType} scale={scale} />
        </group>
        {children}
      </group>
    </group>
  );
}

export default ShipScene3D;
