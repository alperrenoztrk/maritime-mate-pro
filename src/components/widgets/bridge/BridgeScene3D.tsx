import { useEffect, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import type { HomeWidgetId } from "@/hooks/useHomeWidgets";
import { BridgeRoom } from "./BridgeRoom";
import { BridgeConsole } from "./BridgeConsole";
import { BridgeInstrumentMounts, BridgeMountStyles } from "./BridgeInstrumentMounts";
import { disposeBridgeTextures } from "./bridgeTextures";
import { ROOM, SCENE_SCALE } from "./bridgeLayout";

/**
 * Köprüüstü sahnesi — ana sayfa widget'larının 3B karşılığı.
 *
 * Kamera dümencinin arkasında, göz hizasında (1.6 m) duruyor ve konsolun
 * çevresinde sınırlı bir yayda dönüyor: kullanıcı köprüüstünün içinde
 * kalıyor, duvarların arkasına geçemiyor. Aydınlatma iki kaynaktan geliyor —
 * pencerelerden giren gündüz ışığı (tek gölge veren yönlü ışık) ve tavandaki
 * gömme armatürler (bkz. BridgeRoom → Downlight).
 *
 * Çevrimdışı sözleşmesi gemi simülasyonuyla aynı: HDR dosyası yok, yansımalar
 * drei'nin Lightformer panelleriyle yerel PMREM'e çiziliyor.
 */

const SUN: [number, number, number] = [2.4, 4.4, -7.5];

/**
 * Pencerelerden gelen gündüz ışığı ve konsol metaline yansıyan gökyüzü.
 *
 * Işıklar sahne grubunun içinde durduğu için konumları metre cinsinden
 * yazılır; yalnızca dünya biriminde ölçülen büyüklükler (gölge kamerasının
 * sınırları) SCENE_SCALE ile çarpılır.
 */
function BridgeLighting() {
  return (
    <>
      <hemisphereLight args={["#dceaf6", "#3c4149", 0.5]} />
      <ambientLight intensity={0.22} />

      {/* Camlardan giren güneş — sahnedeki tek gölge kaynağı. */}
      <directionalLight
        position={SUN}
        intensity={1.75}
        color="#fff3dd"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0006}
        shadow-normalBias={0.02 * SCENE_SCALE}
        shadow-camera-left={-4.5 * SCENE_SCALE}
        shadow-camera-right={4.5 * SCENE_SCALE}
        shadow-camera-top={4 * SCENE_SCALE}
        shadow-camera-bottom={-2 * SCENE_SCALE}
        shadow-camera-near={1 * SCENE_SCALE}
        shadow-camera-far={16 * SCENE_SCALE}
      />
      {/* Pencere kuşağının odaya vurduğu geniş, gölgesiz dolgu. rectAreaLight
          değil: o, three'nin ayrıca yüklenmesi gereken LTC tablolarına
          bağlı — burada aynı etkiyi yumuşak bir yönlü ışıkla veriyoruz. */}
      <directionalLight position={[0, ROOM.sillY + 0.9, -3.4]} intensity={0.6} color="#cfe4f4" />

      <Environment resolution={64} frames={1} background={false}>
        <color attach="background" args={["#3a444e"]} />
        {/* Pencere: parlak, geniş kart */}
        <Lightformer form="rect" intensity={4} color="#e8f3ff" position={[0, 1.6, -6]} scale={[7, 1.6, 1]} />
        {/* Tavan armatürleri */}
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#fff0d6"
          position={[0, 3.4, -0.5]}
          rotation-x={Math.PI / 2}
          scale={[6, 6, 1]}
        />
        {/* Güverte: koyu geri dönüş */}
        <Lightformer
          form="rect"
          intensity={0.35}
          color="#2b3037"
          position={[0, -1, 0]}
          rotation-x={-Math.PI / 2}
          scale={[8, 8, 1]}
        />
      </Environment>
    </>
  );
}

export interface BridgeScene3DProps {
  nodes: Partial<Record<HomeWidgetId, ReactNode>>;
  enabled: HomeWidgetId[];
}

export function BridgeScene3D({ nodes, enabled }: BridgeScene3DProps) {
  // Sahne kapanınca canvas dokularını bırak — köprüüstü panoraması tek başına
  // birkaç megabayt.
  useEffect(() => () => disposeBridgeTextures(), []);

  return (
    <>
      <BridgeMountStyles />
      <Canvas
        shadows
        dpr={[1, 1.75]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {/* Kamera ve denetimler dünya biriminde çalışır — göz hizası 1.6 m.
            Dar dikey görüş açısı + geniş kare: köprüüstünün tamamı kadraja
            girerken boş güverte ve tavan dışarıda kalıyor. */}
        <PerspectiveCamera
          makeDefault
          position={[0, 1.6 * SCENE_SCALE, 1.95 * SCENE_SCALE]}
          fov={48}
          near={0.05 * SCENE_SCALE}
          far={40 * SCENE_SCALE}
        />
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          target={[0, 1.33 * SCENE_SCALE, -1.9 * SCENE_SCALE]}
          minDistance={1.1 * SCENE_SCALE}
          maxDistance={4.2 * SCENE_SCALE}
          minAzimuthAngle={-0.5}
          maxAzimuthAngle={0.5}
          // Kamera odanın içinde kalır: 75°'nin altındaki bir yükseklik açısı
          // en uzak mesafede tavanın üstüne çıkardı, 93° ise güverteye gömerdi.
          minPolarAngle={1.32}
          maxPolarAngle={1.62}
        />

        <group scale={SCENE_SCALE}>
          <BridgeLighting />
          <BridgeRoom />
          <BridgeConsole />
          <BridgeInstrumentMounts nodes={nodes} enabled={enabled} />
        </group>
      </Canvas>
    </>
  );
}

export default BridgeScene3D;
