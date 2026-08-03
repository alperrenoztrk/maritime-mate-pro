import { useMemo } from "react";
import * as THREE from "three";
import { getDeckTexture, getDeckheadTexture, getGlassGlareTexture, getPaintTexture } from "./bridgeTextures";
import { CLOCK_BOARD, FRONT_WING_Z, ROOM, SCENE_SCALE, WINDOW_PANELS } from "./bridgeLayout";

/**
 * Köprüüstü kabuğu: güverte, tavan, perdeler ve pencere kuşağı.
 *
 * Pencere kuşağı gerçek bir köprüüstü gibi kırık hatlı — orta cam düz, yanlar
 * 22° ve 50° açılarak kanatlara doğru dönüyor (bkz. bridgeLayout →
 * WINDOW_PANELS).
 *
 * Camların ardı artık boş: manzara buraya boyanmıyor, dışarıda gerçek
 * geometri olarak duruyor (SeaHorizon + ShipExterior). Oda bu yüzden yalnız
 * kabuk — açıklıkların arasından geminin kendi baş güvertesi görünüyor.
 */

const PAINT_COLOR = "#eef1f3";
const FRAME_COLOR = "#3b4147";

/** Perde parçası: kırık hattın bir segmentine oturan boyalı sac. */
function WallSlab({
  center,
  yaw,
  width,
  height,
  y,
  thickness = 0.12,
}: {
  center: [number, number];
  yaw: number;
  width: number;
  height: number;
  y: number;
  thickness?: number;
}) {
  const paint = getPaintTexture();
  if (height <= 0) return null;
  return (
    <mesh position={[center[0], y, center[1]]} rotation={[0, yaw, 0]} castShadow receiveShadow>
      <boxGeometry args={[width, height, thickness]} />
      <meshStandardMaterial
        map={paint.map}
        bumpMap={paint.bumpMap}
        bumpScale={0.4}
        color={PAINT_COLOR}
        roughness={0.72}
        metalness={0.04}
      />
    </mesh>
  );
}

/**
 * Tek bir cam.
 *
 * Eskiden burada panoramanın u dilimini taşıyan aydınlatmasız bir düzlem
 * vardı: manzara camın üstüne boyalıydı, dolayısıyla kamera dönünce hiç
 * kaymıyordu. Artık dışarısı gerçek geometri (bkz. SeaHorizon, ShipExterior)
 * ve cam açıklığı gerçekten açık — geriye yalnız camın kendi parlaması kaldı.
 */
function WindowGlass({ panel }: { panel: (typeof WINDOW_PANELS)[number] }) {
  const glare = getGlassGlareTexture();
  const height = ROOM.headY - ROOM.sillY;

  return (
    <group position={[panel.center[0], (ROOM.sillY + ROOM.headY) / 2, panel.center[1]]} rotation={[0, panel.yaw, 0]}>
      {/* Camın izi: dışarıdan gelen ışığın köşegen yansıması. Derinliğe
          yazmaz, yoksa arkasındaki denizi keserdi. */}
      <mesh position={[0, 0, -0.014]}>
        <planeGeometry args={[panel.width, height]} />
        <meshBasicMaterial
          map={glare}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </mesh>
    </group>
  );
}

/** Cam çerçevesi: denizlik, üst kiriş ve tutamak borusu. */
function WindowFrame({ panel }: { panel: (typeof WINDOW_PANELS)[number] }) {
  return (
    <group position={[panel.center[0], 0, panel.center[1]]} rotation={[0, panel.yaw, 0]}>
      <mesh position={[0, ROOM.sillY - 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[panel.width, 0.09, 0.2]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.5} metalness={0.35} />
      </mesh>
      <mesh position={[0, ROOM.headY + 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[panel.width, 0.09, 0.2]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.5} metalness={0.35} />
      </mesh>
      {/* Köprüüstü tutamağı — denizlik hizasında, oda tarafında. */}
      <mesh position={[0, ROOM.sillY - 0.14, 0.13]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, panel.width * 0.92, 12]} />
        <meshStandardMaterial color="#1d2226" roughness={0.42} metalness={0.5} />
      </mesh>
    </group>
  );
}

/** Camları ayıran dikey direkler — kırık hattın her köşesinde bir tane. */
function Mullions() {
  const posts = useMemo(() => {
    const out: Array<{ x: number; z: number; yaw: number }> = [];
    WINDOW_PANELS.forEach((panel, i) => {
      const half = panel.width / 2;
      const dir = [Math.cos(panel.yaw), -Math.sin(panel.yaw)];
      // Panelin sancak ucu; ilk panelde iskele ucu da eklenir.
      if (i === 0) {
        out.push({ x: panel.center[0] - dir[0] * half, z: panel.center[1] - dir[1] * half, yaw: panel.yaw });
      }
      const next = WINDOW_PANELS[i + 1];
      out.push({
        x: panel.center[0] + dir[0] * half,
        z: panel.center[1] + dir[1] * half,
        yaw: next ? (panel.yaw + next.yaw) / 2 : panel.yaw,
      });
    });
    return out;
  }, []);

  const height = ROOM.headY - ROOM.sillY + 0.1;
  return (
    <>
      {posts.map((p, i) => (
        <mesh
          key={i}
          position={[p.x, (ROOM.sillY + ROOM.headY) / 2, p.z]}
          rotation={[0, p.yaw, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[ROOM.mullion, height, 0.18]} />
          <meshStandardMaterial color={FRAME_COLOR} roughness={0.48} metalness={0.4} />
        </mesh>
      ))}
    </>
  );
}

/** Tavandaki gömme aydınlatma: parlayan disk + odayı dolduran nokta ışık. */
function Downlight({ x, z, lit }: { x: number; z: number; lit: boolean }) {
  return (
    <group position={[x, ROOM.deckheadY - 0.012, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.11, 24]} />
        <meshBasicMaterial color={lit ? "#fff6e2" : "#cfd4d8"} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[0.11, 0.135, 24]} />
        <meshStandardMaterial color="#b9c0c6" roughness={0.4} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Armatürün ışığı: menzil ve şiddet dünya biriminde ölçülür, bu yüzden
          sahne ölçeğiyle birlikte büyür (şiddet mesafenin karesiyle söner). */}
      {lit ? (
        <pointLight
          position={[0, -0.15, 0]}
          intensity={2.4 * SCENE_SCALE * SCENE_SCALE}
          distance={4.2 * SCENE_SCALE}
          decay={2}
          color="#ffeccd"
        />
      ) : null}
    </group>
  );
}

/** Köşe hoparlörü — fotoğraftaki gibi tavan altında, açılı asılı. */
function Speaker({ x, z, yaw }: { x: number; z: number; yaw: number }) {
  return (
    <group position={[x, ROOM.deckheadY - 0.26, z]} rotation={[0.28, yaw, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.2, 0.3, 0.16]} />
        <meshStandardMaterial color="#1a1d20" roughness={0.62} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0, 0.082]}>
        <circleGeometry args={[0.07, 20]} />
        <meshStandardMaterial color="#101214" roughness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * Ön perdedeki enstrüman panosu — saatler ve rüzgâr göstergesi bunun üstüne
 * monte edilir (bkz. bridgeLayout → INSTRUMENT_MOUNTS). Fotoğraftaki gibi
 * ahşap çerçeveli, koyu yüzeyli.
 */
function InstrumentBoard() {
  const { width, height, y, z } = CLOCK_BOARD;
  return (
    <group position={[0, y, z]}>
      <mesh position={[0, 0, 0.03]} castShadow receiveShadow>
        <boxGeometry args={[width, height, 0.06]} />
        <meshStandardMaterial color="#5d452c" roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[width - 0.06, height - 0.06]} />
        <meshStandardMaterial color="#20242a" roughness={0.7} />
      </mesh>
    </group>
  );
}

/** Kıç perdedeki harita odası kapısı. */
function Door() {
  return (
    <group position={[1.75, 1.02, ROOM.aftZ - 0.07]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.86, 2.04, 0.08]} />
        <meshStandardMaterial color="#d5d9dc" roughness={0.6} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[0.96, 2.14, 0.05]} />
        <meshStandardMaterial color="#9aa2a8" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Kol ve gözetleme camı */}
      <mesh position={[0.3, 0.06, -0.06]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.022, 0.022, 0.17, 10]} />
        <meshStandardMaterial color="#2a2f34" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.62, -0.055]}>
        <planeGeometry args={[0.34, 0.3]} />
        <meshStandardMaterial color="#1b2b36" roughness={0.15} metalness={0.2} />
      </mesh>
    </group>
  );
}

export function BridgeRoom() {
  const paint = getPaintTexture();
  const deck = getDeckTexture();
  const deckhead = getDeckheadTexture();

  const sideLength = ROOM.aftZ - FRONT_WING_Z;
  const sideCenterZ = (ROOM.aftZ + FRONT_WING_Z) / 2;
  const wallHeight = ROOM.deckheadY;

  return (
    <group>
      {/* Güverte */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, ROOM.deckY, -0.2]} receiveShadow>
        <planeGeometry args={[ROOM.halfWidth * 2 + 1.6, 7.6]} />
        <meshStandardMaterial map={deck.map} bumpMap={deck.bumpMap} bumpScale={0.25} roughness={0.86} metalness={0.05} />
      </mesh>

      {/* Tavan */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM.deckheadY, -0.2]} receiveShadow>
        <planeGeometry args={[ROOM.halfWidth * 2 + 1.6, 7.6]} />
        <meshStandardMaterial
          map={deckhead.map}
          bumpMap={deckhead.bumpMap}
          bumpScale={0.3}
          color="#f7f9fa"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Ön perde: her camın altı ve üstü boyalı sac */}
      {WINDOW_PANELS.map((panel, i) => (
        <group key={i}>
          <WallSlab center={panel.center} yaw={panel.yaw} width={panel.width} height={ROOM.sillY} y={ROOM.sillY / 2} />
          <WallSlab
            center={panel.center}
            yaw={panel.yaw}
            width={panel.width}
            height={ROOM.deckheadY - ROOM.headY}
            y={(ROOM.deckheadY + ROOM.headY) / 2}
          />
          <WindowGlass panel={panel} />
          <WindowFrame panel={panel} />
        </group>
      ))}
      <Mullions />

      {/* Yan perdeler */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * ROOM.halfWidth, wallHeight / 2, sideCenterZ]}
          rotation={[0, Math.PI / 2, 0]}
          receiveShadow
        >
          <boxGeometry args={[sideLength, wallHeight, 0.12]} />
          <meshStandardMaterial
            map={paint.map}
            bumpMap={paint.bumpMap}
            bumpScale={0.4}
            color={PAINT_COLOR}
            roughness={0.72}
            metalness={0.04}
          />
        </mesh>
      ))}

      {/* Kıç perde */}
      <mesh position={[0, wallHeight / 2, ROOM.aftZ]} receiveShadow>
        <boxGeometry args={[ROOM.halfWidth * 2, wallHeight, 0.12]} />
        <meshStandardMaterial
          map={paint.map}
          bumpMap={paint.bumpMap}
          bumpScale={0.4}
          color={PAINT_COLOR}
          roughness={0.74}
          metalness={0.04}
        />
      </mesh>
      <Door />

      <InstrumentBoard />

      {/* Aydınlatma armatürleri — ikisi yanık, kaptanın gece görüşü için ikisi kısık */}
      <Downlight x={-1.36} z={-1.0} lit />
      <Downlight x={1.36} z={-1.0} lit />
      <Downlight x={-1.36} z={1.15} lit={false} />
      <Downlight x={1.36} z={1.15} lit={false} />
      <Downlight x={0} z={0.2} lit />

      <Speaker x={-ROOM.halfWidth + 0.16} z={-0.8} yaw={-1.0} />
      <Speaker x={ROOM.halfWidth - 0.16} z={-0.8} yaw={1.0} />
    </group>
  );
}

export default BridgeRoom;
