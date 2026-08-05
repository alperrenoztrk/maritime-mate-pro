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

/** Yelpaze gövdenin derinliği (m) — yarım silindirin kalınlığı. */
const FAN_DEPTH = 0.1;

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
  /**
   * Cihazın biçimi:
   *   "rect" düz ekran, "dial" yuvarlak kadran, "fan" yelpaze (makine telgrafı).
   *
   * "fan"da yüzey bir YARIM disk; dokusu kare tuvalin üst yarısıdır, çünkü
   * CircleGeometry'nin uv'si tam dairenin sınır kutusuna göre kurulur. Çizim
   * işlevi de bunu bilerek üst yarıya çiziyor (bkz. drawTelegraph).
   */
  shape?: "rect" | "dial" | "fan";
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
  shape = "rect",
  dim = 1,
}: LiveScreenProps) {
  const height = width / aspect;
  const radius = width / 2;

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
        {shape === "dial" ? (
          <>
            {/* Kadran kasası: silindirin ekseni Z'ye çevrilir ki yüz panelden
                dışarı baksın. */}
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[radius + 0.012, radius + 0.012, 0.05, 28]} />
              <meshStandardMaterial color="#15181b" roughness={0.6} metalness={0.25} />
            </mesh>
            <mesh position={[0, 0, 0.027]}>
              <circleGeometry args={[radius, 28]} />
              <meshBasicMaterial map={texture} toneMapped={false} color={new THREE.Color(dim, dim, dim)} />
            </mesh>
          </>
        ) : shape === "fan" ? (
          <>
            {/* Yelpaze gövde: yarım silindir. thetaStart π/2 seçildi ki
                X ekseni etrafında çeyrek tur döndürüldüğünde duran yarı ÜST
                yarı olsun; düz kenarı da tabana otursun. */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -FAN_DEPTH / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[radius, radius, FAN_DEPTH, 40, 1, false, Math.PI / 2, Math.PI]} />
              <meshStandardMaterial color="#2b3034" roughness={0.62} metalness={0.22} />
            </mesh>
            {/* Yayı çevreleyen kabartma çerçeve */}
            <mesh position={[0, 0, -FAN_DEPTH / 2]} castShadow>
              <torusGeometry args={[radius, radius * 0.045, 8, 40, Math.PI]} />
              <meshStandardMaterial color="#191d20" roughness={0.5} metalness={0.35} />
            </mesh>
            {/* Kaide plakası — gövdeyi tezgâha bağlayan döküm ayak */}
            <mesh position={[0, -radius * 0.055, -FAN_DEPTH / 2]} castShadow receiveShadow>
              <boxGeometry args={[radius * 2.1, radius * 0.11, FAN_DEPTH * 1.35]} />
              <meshStandardMaterial color="#16191c" roughness={0.7} metalness={0.2} />
            </mesh>
            {/* Yüz: yarım disk, dokunun üst yarısını alır */}
            <mesh position={[0, 0, 0.002]}>
              <circleGeometry args={[radius * 0.985, 48, 0, Math.PI]} />
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
