import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  getConsoleTexture,
  getEcdisTexture,
  getGaugeTexture,
  getGlassGlareTexture,
  getNameplateTexture,
  getRadarTexture,
} from "./bridgeTextures";
import {
  CONSOLE_TOP_Y,
  CONSOLE_UNITS,
  ECDIS_SLOT,
  PANEL_HEIGHT,
  PANEL_LOCAL_Y,
  PANEL_LOCAL_Z,
  PANEL_TILT,
  RADAR_SLOT,
  RPM_GAUGE_SLOT,
  RUDDER_GAUGE_SLOT,
  WHEEL,
  type Slot,
} from "./bridgeLayout";

/**
 * Köprüüstü konsolu: iskele (ECDIS), dümen ve sancak (radar) üniteleri.
 *
 * Her ünite aynı üç parçadan kurulur — gövde, kauçuk kenarlı tezgâh ve arkada
 * 20° yatık enstrüman paneli. Widget'lar bu yatık panelin üstüne oturur (bkz.
 * BridgeInstrumentMounts); buradaki ekranlar onların komşusu olan gerçek
 * cihazlar: elektronik harita ve radar.
 *
 * Dümen dolabı orta ünitenin kıç yüzünde; simidin ağır dönüşü kareyi canlı
 * tutmak için çok yavaş salınır, kullanıcı etkileşimi gerektirmez.
 */

const DARK_TRIM = "#23272b";

function ConsoleShell({ unit }: { unit: (typeof CONSOLE_UNITS)[number] }) {
  const console3d = getConsoleTexture();
  const nameplate = getNameplateTexture();
  const isHelm = unit.center[0] === 0;

  return (
    <group position={[unit.center[0], 0, unit.center[1]]} rotation={[0, unit.yaw, 0]}>
      {/* Gövde — tabanda geri çekilmiş süpürgelik, üstte tam en */}
      <mesh position={[0, CONSOLE_TOP_Y / 2 + 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[unit.width, CONSOLE_TOP_Y - 0.12, unit.depth]} />
        <meshStandardMaterial
          map={console3d.map}
          bumpMap={console3d.bumpMap}
          bumpScale={0.2}
          color="#d9dde0"
          roughness={0.55}
          metalness={0.18}
        />
      </mesh>
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <boxGeometry args={[unit.width - 0.08, 0.06, unit.depth - 0.1]} />
        <meshStandardMaterial color="#4c5157" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Tezgâh tablası ve kauçuk kenar */}
      <mesh position={[0, CONSOLE_TOP_Y, 0.01]} castShadow receiveShadow>
        <boxGeometry args={[unit.width + 0.05, 0.05, unit.depth + 0.06]} />
        <meshStandardMaterial
          map={console3d.map}
          bumpMap={console3d.bumpMap}
          bumpScale={0.2}
          color="#c9ced2"
          roughness={0.48}
          metalness={0.22}
        />
      </mesh>
      <mesh position={[0, CONSOLE_TOP_Y, unit.depth / 2 + 0.04]} castShadow>
        <boxGeometry args={[unit.width + 0.05, 0.08, 0.04]} />
        <meshStandardMaterial color={DARK_TRIM} roughness={0.75} metalness={0.05} />
      </mesh>

      {/* Kıç yüzünde tutamak borusu */}
      <mesh
        position={[0, CONSOLE_TOP_Y - 0.16, unit.depth / 2 + 0.07]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.02, 0.02, unit.width * 0.8, 12]} />
        <meshStandardMaterial color="#1d2226" roughness={0.4} metalness={0.55} />
      </mesh>

      {/* Yatık enstrüman paneli — widget'ların ve ekranların taşıyıcısı */}
      <mesh position={[0, PANEL_LOCAL_Y, PANEL_LOCAL_Z]} rotation={[PANEL_TILT, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[unit.width, PANEL_HEIGHT, 0.06]} />
        <meshStandardMaterial
          map={console3d.map}
          bumpMap={console3d.bumpMap}
          bumpScale={0.2}
          color="#bfc5ca"
          roughness={0.5}
          metalness={0.24}
        />
      </mesh>

      {isHelm ? (
        <mesh position={[0, 0.42, unit.depth / 2 + 0.002]}>
          <planeGeometry args={[0.62, 0.31]} />
          <meshStandardMaterial map={nameplate} roughness={0.42} metalness={0.15} />
        </mesh>
      ) : null}
    </group>
  );
}

/** Konsol üstünde duran gerçek cihaz ekranı (ECDIS / radar). */
function DeviceScreen({
  slot,
  width,
  height,
  texture,
}: {
  slot: Slot;
  width: number;
  height: number;
  texture: THREE.Texture;
}) {
  const glare = getGlassGlareTexture();
  return (
    <group position={slot.position} rotation={[0, slot.yaw, 0]}>
      <group rotation={[slot.tilt, 0, 0]}>
        {/* Kasa */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width + 0.05, height + 0.06, 0.05]} />
          <meshStandardMaterial color="#15181b" roughness={0.62} metalness={0.2} />
        </mesh>
        {/* Görüntü — panel aydınlatmasından bağımsız parlaklıkta */}
        <mesh position={[0, 0.005, 0.027]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.005, 0.029]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            map={glare}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

/** Dümen konsolundaki yuvarlak göstergeler: dümen açısı ve şaft devri. */
function HelmGauges() {
  const faces = [
    { slot: RUDDER_GAUGE_SLOT, tex: getGaugeTexture("rudder") },
    { slot: RPM_GAUGE_SLOT, tex: getGaugeTexture("rpm") },
  ];
  return (
    <>
      {faces.map(({ slot, tex }, i) => (
        <group key={i} position={slot.position} rotation={[0, slot.yaw, 0]}>
          <group rotation={[slot.tilt, 0, 0]}>
            {/* Kasa: silindirin ekseni Z'ye çevrilir ki kadran panelden dışarı baksın. */}
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.085, 0.085, 0.05, 24]} />
              <meshStandardMaterial color="#15181b" roughness={0.6} metalness={0.25} />
            </mesh>
            <mesh position={[0, 0, 0.027]}>
              <circleGeometry args={[0.075, 24]} />
              <meshBasicMaterial map={tex} toneMapped={false} />
            </mesh>
          </group>
        </group>
      ))}
    </>
  );
}

/** Dümen simidi — jant, parmaklıklar, göbek ve tutamaklar. */
function ShipsWheel() {
  const wheel = useRef<THREE.Group>(null);

  // Ağır bir dümen dolabının hafif salınımı: kare ölü durmasın, ama dikkat
  // dağıtmasın diye genlik yarım derecenin altında.
  useFrame(({ clock }) => {
    if (wheel.current) wheel.current.rotation.z = Math.sin(clock.elapsedTime * 0.35) * 0.075;
  });

  const spokes = [0, 1, 2, 3, 4, 5];
  return (
    <group position={WHEEL.position}>
      {/* Dolap boynu */}
      <mesh position={[0, -0.16, -0.12]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.34, 16]} />
        <meshStandardMaterial color="#c9ced2" roughness={0.5} metalness={0.3} />
      </mesh>

      <group ref={wheel}>
        <mesh castShadow>
          <torusGeometry args={[WHEEL.radius, 0.022, 12, 44]} />
          <meshStandardMaterial color="#17191c" roughness={0.42} metalness={0.25} />
        </mesh>
        {spokes.map((i) => {
          const a = (i / spokes.length) * Math.PI * 2;
          return (
            <group key={i} rotation={[0, 0, a]}>
              <mesh position={[0, WHEEL.radius / 2, 0]} castShadow>
                <cylinderGeometry args={[0.011, 0.013, WHEEL.radius, 10]} />
                <meshStandardMaterial color="#b9bfc4" roughness={0.32} metalness={0.75} />
              </mesh>
              {/* Jant üstündeki tutamak */}
              <mesh position={[0, WHEEL.radius + 0.028, 0]} castShadow>
                <cylinderGeometry args={[0.014, 0.014, 0.07, 10]} />
                <meshStandardMaterial color="#17191c" roughness={0.45} metalness={0.2} />
              </mesh>
            </group>
          );
        })}
        <mesh castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.06, 20]} />
          <meshStandardMaterial color="#8d949a" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.032]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.03, 20]} />
          <meshStandardMaterial color="#c8a24a" roughness={0.28} metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/** Makine telgrafı kolu — sancak ünitesinin tezgâhında. */
function TelegraphLever() {
  return (
    <group position={[1.05, CONSOLE_TOP_Y + 0.03, -1.45]} rotation={[0, -0.21, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.075, 0.085, 0.05, 20]} />
        <meshStandardMaterial color="#2a2e32" roughness={0.55} metalness={0.35} />
      </mesh>
      <mesh position={[0, 0.11, 0.03]} rotation={[0.32, 0, 0]} castShadow>
        <cylinderGeometry args={[0.014, 0.016, 0.2, 12]} />
        <meshStandardMaterial color="#9aa1a7" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.21, 0.06]} castShadow>
        <sphereGeometry args={[0.032, 16, 12]} />
        <meshStandardMaterial color="#14171a" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  );
}

export function BridgeConsole() {
  const ecdis = getEcdisTexture();
  const radar = getRadarTexture();

  return (
    <group>
      {CONSOLE_UNITS.map((unit, i) => (
        <ConsoleShell key={i} unit={unit} />
      ))}

      {/* İskele ünitesinde elektronik harita, sancakta radar — GPS ve seyir
          widget'ları bunların yanındaki yuvalara oturur. */}
      <DeviceScreen slot={ECDIS_SLOT} width={0.46} height={0.29} texture={ecdis} />
      <DeviceScreen slot={RADAR_SLOT} width={0.34} height={0.34} texture={radar} />

      <HelmGauges />
      <ShipsWheel />
      <TelegraphLever />
    </group>
  );
}

export default BridgeConsole;
