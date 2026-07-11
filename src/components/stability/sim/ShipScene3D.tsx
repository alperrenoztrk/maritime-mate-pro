import { useRef, type MutableRefObject, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneEnvironment } from "./SceneEnvironment";
import { OceanSurface3D } from "./OceanSurface3D";
import { WakeEffects } from "./WakeEffects";
import { ShipModel3D, type ShipType } from "./ShipModel3D";
import { DECK_Y, KEEL_Y, UNITS_PER_METER } from "./hullGeometry";

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
  /** Trim in radians; + = bow down ("baş trim"). Applied as rotation.z = -trim. */
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
  /** Rendered inside the heeling group — markers tilt with the ship. */
  children?: ReactNode;
}

export const SHIP_SCALE_DEFAULT = 0.82;

/** Immersion (world units, +down) for a draft, clamped at the deck edge. */
function immersionFor(draftM: number, scale: number): number {
  const raw = (draftM - 6.5) * UNITS_PER_METER * scale;
  const max = (DECK_Y + 0.04) * scale; // deck edge stays just above the sea
  return Math.min(raw, max);
}

/** World Y of the keel at a given draft — for placing the K marker. */
export function keelWorldY(draftM: number, scale: number = SHIP_SCALE_DEFAULT): number {
  // ShipModel3D lifts itself +0.1·scale so the design WL sits at world y=0.
  return (KEEL_Y + 0.1) * scale - immersionFor(draftM, scale);
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
  children,
}: ShipScene3DProps) {
  const heelGroup = useRef<THREE.Group>(null);
  const immersionGroup = useRef<THREE.Group>(null);
  const heelRef = useRef(0) as MutableRefObject<number>;
  const velocityRef = useRef(0);
  const trimRef = useRef(0);
  const immersionRef = useRef(immersionFor(draftM, scale));
  const lastReport = useRef(0);

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

    if (heelGroup.current) {
      heelGroup.current.rotation.x = heelRef.current;
      heelGroup.current.rotation.z = trimRef.current;
    }
    if (immersionGroup.current) {
      immersionGroup.current.position.y = -immersionRef.current;
    }

    if (onHeelUpdate && clock.elapsedTime - lastReport.current > 0.08) {
      onHeelUpdate(heelRef.current);
      lastReport.current = clock.elapsedTime;
    }
  });

  return (
    <group>
      <SceneEnvironment />
      <OceanSurface3D heelRef={heelRef} />
      <WakeEffects heelRef={heelRef} intensity={wakeIntensity} scale={scale} />

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
