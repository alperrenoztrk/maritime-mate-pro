import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getConsoleTexture, getNameplateTexture } from "./bridgeTextures";
import {
  drawAutopilot,
  drawConning,
  drawEchoSounder,
  drawEcdis,
  drawGyroRepeater,
  drawInmarsatC,
  drawIridium,
  drawNavtex,
  drawRadar,
  drawRpmGauge,
  drawRudderGauge,
  drawTelegraph,
  drawVhf,
  telegraphLeverLean,
  telegraphOrderIndex,
} from "./bridgeScreens";
import { LiveScreen } from "./LiveScreen";
import type { BridgeSim } from "./bridgeSim";
import {
  AUTOPILOT_SLOT,
  CONNING_SLOT,
  CONSOLE_TOP_Y,
  CONSOLE_UNITS,
  ECDIS_SLOT,
  ECHO_SOUNDER_SLOT,
  GYRO_REPEATER,
  INMARSAT_SLOT,
  IRIDIUM_SLOT,
  NAVTEX_SLOT,
  PANEL_HEIGHT,
  PANEL_LOCAL_Y,
  PANEL_LOCAL_Z,
  PANEL_TILT,
  RADAR_SLOT,
  RPM_GAUGE_SLOT,
  RUDDER_GAUGE_SLOT,
  TELEGRAPH,
  VHF_SLOT,
  WHEEL,
} from "./bridgeLayout";

/**
 * Köprüüstü konsolu ve üstündeki tam takım seyir aygıtları.
 *
 * Beş ünitelik at nalı: iskele kanadı (NAVTEX, Inmarsat-C), iskele (ECDIS),
 * dümen (otopilot, dümen açısı, şaft devri, dümen dolabı), sancak
 * (radar/ARPA, conning) ve sancak kanadı (iskandil, VHF/DSC). Bunlara dümenin
 * önündeki cayro tekrarlayıcı, sancak omzundaki makine telgrafı sütunu ve
 * kanat kapısının üstündeki Iridium terminali ekleniyor.
 *
 * Ekranların hiçbiri resim değil: hepsi BridgeSim'den okuyan canlı tuvaller
 * (bkz. LiveScreen + bridgeScreens). Radar dönüyor, ECDIS'teki gemi rotada
 * ilerliyor, iskandil izi kayıyor, telgrafın ibresi emri gösteriyor.
 *
 * Ana sayfanın widget'ları bu cihazların komşusu — aynı yatık panelde, aynı
 * eğimde duruyorlar (bkz. BridgeInstrumentMounts).
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

/** Dümen simidi — jant, parmaklıklar, göbek ve tutamaklar. */
function ShipsWheel({ sim }: { sim: BridgeSim }) {
  const wheel = useRef<THREE.Group>(null);

  /**
   * Simit artık dekor değil: otopilotun bastığı dümen açısını gösteriyor.
   * Dört tur kilitten kilide bir dümen dolabında 15°'lik dümen ≈ 1.7 tur,
   * ama kadrajda okunabilir kalsın diye açı 6 kat büyütülüp gösteriliyor.
   */
  useFrame(() => {
    if (!wheel.current) return;
    const rudder = sim.telemetry?.rudderDeg ?? 0;
    const target = (-rudder * Math.PI) / 180 * 6;
    wheel.current.rotation.z += (target - wheel.current.rotation.z) * 0.06;
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

/** Yelpazenin kendi çerçevesinde duran yuva — gövde zaten yerleştirilmiş. */
const FAN_SLOT = { position: [0, 0, 0] as [number, number, number], yaw: 0, tilt: 0 };

/**
 * Makine telgrafı: sütunun üstünde yelpaze gövdeli kumanda.
 *
 * Yuvarlak kadranlı, iki ibreli tipten yelpazeye geçildi — bugün bir
 * köprüüstünde duran telgraf budur: yarım disk gövde, kademeleri ışıklı yüz
 * (bkz. drawTelegraph) ve tek bir kol.
 *
 * KOL ARTIK EMRİ GÖSTERİYOR. Eskiden yalnız iki konumu vardı (dik ya da öne
 * yatık) ve kadranın yanında, kendi mili olmayan bir çubuktu; şimdi yelpazenin
 * miline oturuyor ve emredilen kademenin açısına gidiyor — yüzdeki yanan lamba
 * ile kolun gösterdiği yer aynı yer.
 */
function TelegraphPedestal({ sim }: { sim: BridgeSim }) {
  const lever = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!lever.current) return;
    const order = sim.telemetry ? telegraphOrderIndex(sim.telemetry.telegraphOrder) : 4;
    // Sancağa yatık kol yol ileri demek; ekran uzayında sancak +X, dolayısıyla
    // Z ekseni etrafındaki dönüş ters işaretli.
    const target = -telegraphLeverLean(order);
    lever.current.rotation.z += (target - lever.current.rotation.z) * 0.08;
  });

  const R = TELEGRAPH.radius;
  return (
    <group position={TELEGRAPH.position}>
      {/* Sütun: güverteden yelpazenin miline kadar */}
      <mesh position={[0, -TELEGRAPH.position[1] / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.075, 0.11, TELEGRAPH.position[1], 18]} />
        <meshStandardMaterial color="#b9bfc4" roughness={0.45} metalness={0.55} />
      </mesh>
      <mesh position={[0, 0.03 - TELEGRAPH.position[1], 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.19, 0.06, 20]} />
        <meshStandardMaterial color="#3a4046" roughness={0.65} metalness={0.3} />
      </mesh>

      {/* Önce yüzü dümenciye çeviren yaw, sonra kendi düzleminde geriye yatma */}
      <group rotation={[0, TELEGRAPH.yaw, 0]}>
        <group rotation={[TELEGRAPH.tilt, 0, 0]}>
          {/* Gövde ve canlı yüzü */}
          <LiveScreen
            slot={FAN_SLOT}
            width={R * 2}
            aspect={1}
            resolution={640}
            fps={4}
            draw={drawTelegraph}
            sim={sim}
            shape="fan"
          />

          {/* Emir kolu: mil yelpazenin merkezinde, kol emrin kademesine bakar */}
          <group position={[0, 0, 0.03]}>
            <group ref={lever}>
              {/* Mil kovanı */}
              <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[R * 0.13, R * 0.13, 0.045, 20]} />
                <meshStandardMaterial color="#202427" roughness={0.5} metalness={0.4} />
              </mesh>
              {/* Kolun gövdesi */}
              <mesh position={[0, TELEGRAPH.leverLength / 2, 0.01]} castShadow>
                <cylinderGeometry args={[R * 0.075, R * 0.095, TELEGRAPH.leverLength, 14]} />
                <meshStandardMaterial color="#15181b" roughness={0.42} metalness={0.35} />
              </mesh>
              {/* Topuz: kola göre yatık, fotoğraftaki eğik başlık */}
              <group position={[0, TELEGRAPH.leverLength, 0.012]} rotation={[0.55, 0, 0]}>
                <mesh position={[0, TELEGRAPH.knobLength / 2, 0]} castShadow>
                  <cylinderGeometry args={[R * 0.115, R * 0.135, TELEGRAPH.knobLength, 18]} />
                  <meshStandardMaterial color="#121517" roughness={0.35} metalness={0.3} />
                </mesh>
                <mesh position={[0, TELEGRAPH.knobLength, 0]} castShadow>
                  <sphereGeometry args={[R * 0.115, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                  <meshStandardMaterial color="#121517" roughness={0.35} metalness={0.3} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

/** Cayro tekrarlayıcı sütunu — dümencinin tam önünde. */
function GyroPedestal({ sim }: { sim: BridgeSim }) {
  const [x, y, z] = GYRO_REPEATER.position;
  return (
    <group>
      <mesh position={[x, y - 0.16, z]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.3, 16]} />
        <meshStandardMaterial color="#c2c8cc" roughness={0.45} metalness={0.5} />
      </mesh>
      <LiveScreen
        slot={{ position: [x, y, z], yaw: 0, tilt: GYRO_REPEATER.tilt }}
        width={GYRO_REPEATER.diameter}
        aspect={1}
        resolution={512}
        fps={5}
        draw={drawGyroRepeater}
        sim={sim}
        shape="dial"
      />
    </group>
  );
}

export interface BridgeConsoleProps {
  sim: BridgeSim;
  /** Gecenin koyuluğu (0–1) — cihaz ekranları gece kısılır. */
  night?: number;
}

export function BridgeConsole({ sim, night = 0 }: BridgeConsoleProps) {
  /**
   * Gece kısma: köprüüstünde ekranlar gece görüşünü bozmamak için kısılır,
   * SOLAS da bunu ister. Tam karanlıkta bile %45'te kalıyor — okunmayan bir
   * ekranın kadrajda anlamı yok.
   */
  const dim = 1 - 0.55 * Math.min(1, Math.max(0, night));

  return (
    <group>
      {CONSOLE_UNITS.map((unit, i) => (
        <ConsoleShell key={i} unit={unit} />
      ))}

      {/* İskele kanadı: MSI grubu */}
      <LiveScreen slot={NAVTEX_SLOT} width={0.34} aspect={1.45} resolution={640} fps={0.5} draw={drawNavtex} sim={sim} dim={dim} />
      <LiveScreen slot={INMARSAT_SLOT} width={0.34} aspect={1.45} resolution={640} fps={0.5} draw={drawInmarsatC} sim={sim} dim={dim} />

      {/* İskele: elektronik harita — GPS widget'ı bunun yanındaki yuvada */}
      <LiveScreen slot={ECDIS_SLOT} width={0.5} aspect={1.56} resolution={1100} fps={3} draw={drawEcdis} sim={sim} dim={dim} />

      {/* Dümen: otopilot ve iki yuvarlak gösterge */}
      <LiveScreen slot={AUTOPILOT_SLOT} width={0.34} aspect={2} resolution={640} fps={2} draw={drawAutopilot} sim={sim} dim={dim} />
      <LiveScreen slot={RUDDER_GAUGE_SLOT} width={0.15} aspect={1} resolution={384} fps={6} draw={drawRudderGauge} sim={sim} shape="dial" dim={dim} />
      <LiveScreen slot={RPM_GAUGE_SLOT} width={0.15} aspect={1} resolution={384} fps={6} draw={drawRpmGauge} sim={sim} shape="dial" dim={dim} />

      {/* Sancak: radar/ARPA ve conning */}
      <LiveScreen slot={RADAR_SLOT} width={0.46} aspect={1.72} resolution={1100} fps={10} draw={drawRadar} sim={sim} dim={dim} />
      <LiveScreen slot={CONNING_SLOT} width={0.44} aspect={1.9} resolution={896} fps={5} draw={drawConning} sim={sim} dim={dim} />

      {/* Sancak kanadı: iskandil ve telsiz */}
      <LiveScreen slot={ECHO_SOUNDER_SLOT} width={0.34} aspect={1.45} resolution={640} fps={3} draw={drawEchoSounder} sim={sim} dim={dim} />
      <LiveScreen slot={VHF_SLOT} width={0.34} aspect={1.45} resolution={640} fps={1} draw={drawVhf} sim={sim} dim={dim} />

      {/* Kanat kapısının üstü: uydu terminali */}
      <LiveScreen slot={IRIDIUM_SLOT} width={0.32} aspect={1.4} resolution={640} fps={1} draw={drawIridium} sim={sim} dim={dim} />

      <GyroPedestal sim={sim} />
      <TelegraphPedestal sim={sim} />
      <ShipsWheel sim={sim} />
    </group>
  );
}

export default BridgeConsole;
