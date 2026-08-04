import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MarineConditions } from "./marineConditions";
import type { VoyageState } from "./voyage";
import { buildWaveTrains, fieldOffset, SHIP, shipMotion } from "./waveField";
import { buildTelemetry, createScratch } from "./bridgeTelemetry";
import type { BridgeSim } from "./bridgeSim";

/**
 * Sahnenin tek kare döngüsü.
 *
 * Köprüüstünde her karede değişen üç şey var: dalga alanının gemiye göre
 * kayması, geminin o dalgalarda yaptığı hareket ve cihazların okuduğu
 * telemetri. Üçü de burada, bir kez hesaplanıp paylaşılan bir nesneye
 * yazılıyor.
 *
 * NEDEN REACT DURUMU DEĞİL: bunlar saniyede altmış kez değişiyor. Her biri
 * için setState çağrılsaydı ağaç saniyede altmış kez yeniden çizilir, üstelik
 * `<Html>` içindeki gerçek widget'lar da onunla birlikte gidip gelirdi.
 * Değişken bir nesne (BridgeSim) tutup okuyanların onu her karede taze
 * okuması, R3F'te bunun olağan çözümü.
 */

/**
 * Hareketin yumuşatma sabiti (s).
 *
 * Deniz verisi değiştiğinde (yeni mevki, yeni dalga yönü) ya da rota bacağı
 * dönerken yalpa bir anda atlamasın diye açılar üstel filtreden geçiyor.
 * 0.35 s, geminin kendi ataletiyle aynı mertebe — filtrenin varlığı fark
 * edilmiyor, sıçrama ise kayboluyor.
 */
const MOTION_TAU = 0.35;

/** Telemetri 6/sn tazeleniyor: hiçbir ekran bundan sık çizilmiyor. */
const TELEMETRY_INTERVAL_MS = 160;

export interface BridgeSimulationProps {
  sim: BridgeSim;
  voyage: VoyageState | null;
  marine: MarineConditions | null;
}

export function BridgeSimulation({ sim, voyage, marine }: BridgeSimulationProps) {
  const scratch = useRef(createScratch());
  const lastTelemetry = useRef(0);
  const raw = useRef({ roll: 0, pitch: 0, yaw: 0, heave: 0 });

  // Dalga treni yalnız deniz verisi ya da rota değişince kuruluyor; her karede
  // beş bileşen yeniden türetmenin anlamı yok.
  useEffect(() => {
    sim.trains = marine ? buildWaveTrains(marine, voyage?.cogDeg ?? 0) : [];
  }, [sim, marine, voyage?.cogDeg]);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(0.1, delta);
    const speedKt = voyage?.sogKt ?? 0;

    // 1) Dalga alanı gemiye ve akıntıya göre kayar.
    const step = fieldOffset(
      dt,
      speedKt,
      marine?.currentKt ?? 0,
      marine?.currentTowardDeg ?? 0,
      voyage?.cogDeg ?? 0,
    );
    sim.offset.x += step.x;
    sim.offset.z += step.z;

    // 2) Gemi o dalgalara tepki verir.
    const motion = shipMotion(sim.trains, clock.getElapsedTime(), sim.offset, speedKt, SHIP);
    const a = 1 - Math.exp(-dt / MOTION_TAU);
    const r = raw.current;
    r.roll += (motion.roll - r.roll) * a;
    r.pitch += (motion.pitch - r.pitch) * a;
    r.yaw += (motion.yaw - r.yaw) * a;
    r.heave += (motion.heave - r.heave) * a;
    sim.motion = {
      ...motion,
      roll: r.roll,
      pitch: r.pitch,
      yaw: r.yaw,
      heave: r.heave,
    };

    // 3) Cihazlar okusun diye telemetri.
    const now = Date.now();
    if (voyage && marine && now - lastTelemetry.current >= TELEMETRY_INTERVAL_MS) {
      lastTelemetry.current = now;
      sim.telemetry = buildTelemetry(voyage, marine, sim.motion, scratch.current, now);
    }
  });

  return null;
}

export default BridgeSimulation;
