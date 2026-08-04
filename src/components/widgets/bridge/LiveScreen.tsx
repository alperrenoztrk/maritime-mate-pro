import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Slot } from "./bridgeLayout";
import type { ScreenDraw } from "./bridgeScreens";
import type { BridgeSim } from "./bridgeSim";

/**
 * Canlı bir cihaz ekranı: kasa, cam ve içinde işleyen bir tuval.
 *
 * Ekranın kendisi bir CanvasTexture; içeriği bridgeScreens.ts'teki çizim
 * işlevlerinden biri, telemetriyi de BridgeSim'den okuyor. Ekran React
 * durumuna bağlı değil — köprüüstünde on üç cihaz var, hepsi durum tutsaydı
 * ağaç saniyede altmış kez yeniden çizilirdi.
 *
 * TAZELEME SIKLIĞI CİHAZA GÖRE: radar 12/sn (tarama dönüyor), conning 5/sn,
 * telsizler 0.5/sn. Her tazeleme bir GPU yüklemesi demek; hepsini 60/sn
 * çizmek mobil cihazda sahnenin geri kalanını yerdi.
 */

export interface LiveScreenProps {
  slot: Slot;
  /** Cihazın gerçek genişliği (m). */
  width: number;
  /** Genişlik / yükseklik. Yuvarlak kadranlarda 1. */
  aspect: number;
  /** Tuvalin piksel genişliği — yükseklik orandan çıkar. */
  resolution?: number;
  /** Saniyedeki tazeleme sayısı. */
  fps: number;
  draw: ScreenDraw;
  sim: BridgeSim;
  /** Kasanın altındaki künye. */
  label?: string;
  /** Yuvarlak kadran: kasa silindir, cam daire. */
  round?: boolean;
  /** Ekranın gece parlaklığı — köprüüstü karardıkça cihazlar kısılır. */
  dim?: number;
}

export function LiveScreen({
  slot,
  width,
  aspect,
  resolution = 512,
  fps,
  draw,
  sim,
  label,
  round = false,
  dim = 1,
}: LiveScreenProps) {
  const height = width / aspect;

  const { canvas, texture } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = resolution;
    c.height = Math.round(resolution / aspect);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return { canvas: c, texture: tex };
  }, [resolution, aspect]);

  useEffect(() => () => texture.dispose(), [texture]);

  const nextDraw = useRef(0);

  useFrame(() => {
    const now = performance.now();
    if (now < nextDraw.current) return;
    nextDraw.current = now + 1000 / fps;

    const telemetry = sim.telemetry;
    const g = canvas.getContext("2d");
    if (!g) return;
    if (!telemetry) {
      // Sefer ve deniz verisi kurulana kadar cihaz "ısınıyor".
      g.fillStyle = "#05090f";
      g.fillRect(0, 0, canvas.width, canvas.height);
      g.fillStyle = "rgba(126,196,235,.5)";
      g.font = `bold ${canvas.height * 0.09}px Helvetica, Arial, sans-serif`;
      g.textAlign = "center";
      g.fillText("BAŞLATILIYOR", canvas.width / 2, canvas.height / 2);
      g.textAlign = "left";
      texture.needsUpdate = true;
      return;
    }
    g.save();
    draw(g, canvas.width, canvas.height, telemetry);
    g.restore();
    texture.needsUpdate = true;
  });

  return (
    <group position={slot.position} rotation={[0, slot.yaw, 0]}>
      <group rotation={[slot.tilt, 0, 0]}>
        {round ? (
          <>
            {/* Kadran kasası: silindirin ekseni Z'ye çevrilir ki yüz panelden
                dışarı baksın. */}
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[width / 2 + 0.012, width / 2 + 0.012, 0.05, 28]} />
              <meshStandardMaterial color="#15181b" roughness={0.6} metalness={0.25} />
            </mesh>
            <mesh position={[0, 0, 0.027]}>
              <circleGeometry args={[width / 2, 28]} />
              <meshBasicMaterial map={texture} toneMapped={false} color={new THREE.Color(dim, dim, dim)} />
            </mesh>
          </>
        ) : (
          <>
            {/* Kasa ve çevresindeki bezel */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[width + 0.045, height + 0.05, 0.05]} />
              <meshStandardMaterial color="#14181c" roughness={0.6} metalness={0.22} />
            </mesh>
            {/* Görüntü — panel aydınlatmasından bağımsız parlaklıkta */}
            <mesh position={[0, 0.004, 0.027]}>
              <planeGeometry args={[width, height]} />
              <meshBasicMaterial map={texture} toneMapped={false} color={new THREE.Color(dim, dim, dim)} />
            </mesh>
            {label ? (
              <mesh position={[0, -height / 2 - 0.017, 0.026]}>
                <planeGeometry args={[width * 0.9, 0.012]} />
                <meshBasicMaterial color="#2b3238" toneMapped={false} />
              </mesh>
            ) : null}
          </>
        )}
      </group>
    </group>
  );
}

export default LiveScreen;
