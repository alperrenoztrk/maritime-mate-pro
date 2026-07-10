import { Component, Suspense, type ReactNode } from "react";
import { Environment, Lightformer, Sky } from "@react-three/drei";
import { getAOBlobTexture } from "./proceduralTextures";

/**
 * Atmosphere + image-based lighting for the stability sim.
 *
 * Offline contract (Capacitor WebView): the HDR environment map is a bundled
 * asset served same-origin from public/env/ — no third-party fetch. If it is
 * missing or fails to decode, a small error boundary swaps in a fully
 * procedural <Environment> (drei renders its children to a local PMREM
 * cubemap), so the sim can never end up without reflections.
 *
 * Sun direction is shared between the Sky shader and the single shadow-casting
 * directional light so highlights, sky and shadows agree.
 */

const SUN_DIRECTION: [number, number, number] = [8, 4.5, 6];
const SUN_LIGHT_POS: [number, number, number] = [12, 9, 9];

class EnvErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    console.warn("HDR environment failed to load, using procedural fallback:", error?.message);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Asset-free IBL: a bright sun card + graded sky panels rendered to PMREM. */
function ProceduralEnvironment() {
  return (
    <Environment resolution={128} frames={1} background={false}>
      <color attach="background" args={["#5c7fa0"]} />
      <Lightformer form="rect" intensity={5} color="#fff2dc" position={[8, 6, 6]} scale={[4, 4, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={1.1} color="#9dc4ef" position={[0, 10, 0]} rotation-x={Math.PI / 2} scale={[16, 16, 1]} />
      <Lightformer form="rect" intensity={0.5} color="#274a68" position={[0, -6, 0]} rotation-x={-Math.PI / 2} scale={[16, 16, 1]} />
      <Lightformer form="rect" intensity={0.4} color="#b8d4ea" position={[-8, 3, -6]} scale={[6, 3, 1]} target={[0, 0, 0]} />
    </Environment>
  );
}

export function SceneEnvironment() {
  return (
    <>
      {/* physical sky shader — offline, replaces the flat clear color */}
      <Sky
        distance={450}
        sunPosition={SUN_DIRECTION}
        turbidity={4}
        rayleigh={0.9}
        mieCoefficient={0.004}
        mieDirectionalG={0.8}
      />
      <fog attach="fog" args={["#8fb0cd", 22, 55]} />

      {/* IBL: bundled HDR with procedural fallback */}
      <EnvErrorBoundary fallback={<ProceduralEnvironment />}>
        <Suspense fallback={<ProceduralEnvironment />}>
          <Environment files="/env/sky_1k.hdr" background={false} />
        </Suspense>
      </EnvErrorBoundary>

      {/* base fill — most of the fill now comes from the environment map */}
      <hemisphereLight args={["#bcd7ff", "#0a1420", 0.35]} />
      <ambientLight intensity={0.12} />

      {/* single shadow-casting sun, aligned with the Sky sun */}
      <directionalLight
        position={SUN_LIGHT_POS}
        intensity={1.55}
        color="#fff4e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={2}
        shadow-camera-far={35}
      />

      {/* soft dark blob under the hull footprint (world space — does not heel):
          cheap grounding in place of per-frame contact shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} renderOrder={1}>
        <planeGeometry args={[7.2, 2.2]} />
        <meshBasicMaterial
          color="#04101c"
          alphaMap={getAOBlobTexture()}
          transparent
          opacity={0.38}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export default SceneEnvironment;
