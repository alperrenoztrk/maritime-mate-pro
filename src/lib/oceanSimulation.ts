import { SCENE_G, WAVE_COUNT, type WaveComponent } from './seakeeping';

const TAU = 2 * Math.PI;
export const OCEAN_STEP = 1 / 120;
export interface OceanFrame {
  waves: WaveComponent[];
  phases: number[];
  time: number;
  chop: number;
  speed: number;
  accumulator: number;
}
export function createOceanFrame(waves: WaveComponent[]): OceanFrame {
  return {
    waves: Array.from({ length: WAVE_COUNT }, (_, i) => [...(waves[i] ?? [1, 0, 0, 1])] as WaveComponent),
    phases: Array.from({ length: WAVE_COUNT }, (_, i) => (i * 2.399963 + 0.7) % TAU),
    time: 0, chop: 0, speed: 0, accumulator: 0,
  };
}
/** Fixed clock shared by geometry, shading, foam and vessel dynamics.
 * Normal 15–120 Hz frames retain elapsed time. Slow frames use bounded catch-up;
 * background-tab gaps are discarded. */
export function advanceOcean(
  frame: OceanFrame, target: WaveComponent[], speed: number, gravity: number,
  delta: number, paused: boolean, stepMotion?: (dt: number) => void,
): void {
  if (paused || !Number.isFinite(delta) || delta <= 0 || delta > 1) return;
  frame.accumulator += Math.min(delta, 0.25);
  while (frame.accumulator + 1e-10 >= OCEAN_STEP) {
    frame.accumulator -= OCEAN_STEP;
    const blend = 1 - Math.exp(-OCEAN_STEP * 1.5);
    frame.speed += (speed - frame.speed) * blend;
    let steepness = 0;
    for (let i = 0; i < WAVE_COUNT; i++) {
      const w = frame.waves[i], next = target[i] ?? [1, 0, 0, 1];
      // Rotate along the shortest arc; never pass through a zero direction.
      const angle = Math.atan2(w[1], w[0]);
      const difference = Math.atan2(Math.sin(Math.atan2(next[1], next[0]) - angle), Math.cos(Math.atan2(next[1], next[0]) - angle));
      w[0] = Math.cos(angle + difference * blend);
      w[1] = Math.sin(angle + difference * blend);
      w[2] += (next[2] - w[2]) * blend;
      w[3] += (next[3] - w[3]) * blend;
      const k = TAU / w[3];
      // Integrated frequency prevents a speed/period change teleporting crests.
      frame.phases[i] = (frame.phases[i] + (k * w[0] * frame.speed - Math.sqrt(Math.max(gravity, 0) * k)) * OCEAN_STEP) % TAU;
      steepness += w[2];
    }
    frame.chop = Math.min(0.85, 0.65 / Math.max(steepness, 0.001));
    frame.time += OCEAN_STEP;
    stepMotion?.(OCEAN_STEP);
  }
}
/** Invert horizontal Gerstner displacement before sampling a WORLD position.
 * Aggregate chop ≤ .65 makes this fixed-point iteration contractive. */
export function sampleOcean(frame: OceanFrame, x: number, z: number): number {
  const y = -z;
  let u = x, v = y;
  for (let iteration = 0; iteration < 8; iteration++) {
    let offsetX = 0, offsetY = 0;
    for (let i = 0; i < WAVE_COUNT; i++) {
      const [dx, dy, steepness, wavelength] = frame.waves[i];
      const k = TAU / wavelength;
      const offset = frame.chop * steepness / k * Math.cos(k * (dx * u + dy * v) + frame.phases[i]);
      offsetX += dx * offset; offsetY += dy * offset;
    }
    const nextU = x - offsetX, nextV = y - offsetY;
    const error = Math.abs(nextU - u) + Math.abs(nextV - v);
    u = nextU; v = nextV;
    // Once converged, further trigonometric evaluations add no visible detail.
    if (error < 1e-6) break;
  }
  let height = 0;
  for (let i = 0; i < WAVE_COUNT; i++) {
    const [dx, dy, steepness, wavelength] = frame.waves[i];
    const k = TAU / wavelength;
    height += steepness / k * Math.sin(k * (dx * u + dy * v) + frame.phases[i]);
  }
  return height;
}
export interface VesselMotion {
  roll: number; rollVelocity: number;
  pitch: number; pitchVelocity: number;
  heave: number; heaveVelocity: number;
}
export const createVesselMotion = (): VesselMotion => ({ roll: 0, rollVelocity: 0, pitch: 0, pitchVelocity: 0, heave: 0, heaveVelocity: 0 });
/** Nine waterplane stations and a weighted plane fit avoid bow/stern aliasing.
 * A visual training approximation, not vessel-specific RAO/CFD data. */
export function waveTargets(frame: OceanFrame, scale = 1) {
  const halfL = 2.65 * scale, halfB = 0.48 * scale;
  let height = 0, roll = 0, pitch = 0, weight = 0, moment = 0;
  for (let station = -4; station <= 4; station++) {
    const x = station * halfL / 4, w = 1 - 0.4 * Math.abs(station / 4);
    const port = sampleOcean(frame, x, -halfB), starboard = sampleOcean(frame, x, halfB);
    const mean = (port + starboard) / 2;
    height += mean * w;
    roll += (port - starboard) / (2 * halfB) * w;
    pitch += mean * x * w; moment += x * x * w; weight += w;
  }
  return { heave: height / weight, roll: Math.atan(roll / weight), pitch: Math.atan(pitch / moment) };
}
export function stepVesselMotion(m: VesselMotion, target: ReturnType<typeof waveTargets>, rollOmega: number, damping: number, dt: number): void {
  const wr = Math.max(0.15, Math.min(4, rollOmega)), zr = Math.max(0.08, damping);
  m.rollVelocity += (-wr * wr * (m.roll - target.roll) - 2 * zr * wr * m.rollVelocity) * dt;
  m.roll += m.rollVelocity * dt;
  // Extra restoring stiffness dissipates extreme motion instead of storing
  // energy indefinitely against a hard angle clamp.
  if (Math.abs(m.roll) > 0.6) m.rollVelocity -= Math.sign(m.roll) * (Math.abs(m.roll) - 0.6) * 12 * dt;
  if (Math.abs(m.roll) > 0.85) { m.roll = Math.sign(m.roll) * 0.85; m.rollVelocity *= 0.5; }
  const wp = Math.sqrt(SCENE_G / 0.13);
  m.pitchVelocity += (-wp * wp * (m.pitch - target.pitch) - 1.4 * wp * m.pitchVelocity) * dt;
  m.pitch += m.pitchVelocity * dt;
  const wh = 1.2;
  m.heaveVelocity += (-wh * wh * (m.heave - target.heave) - 1.6 * wh * m.heaveVelocity) * dt;
  m.heave += m.heaveVelocity * dt;
}

/** Waterplane forcing needs 30 Hz sampling, not all 120 integration steps.
 * Keep the damped oscillators at their original fixed step so the motion and
 * phase are independent of rendering rate, including slow mobile frames. */
export interface VesselForcing {
  nextSample: number;
  target: ReturnType<typeof waveTargets>;
}
export const createVesselForcing = (): VesselForcing => ({
  nextSample: 0, target: { roll: 0, pitch: 0, heave: 0 },
});
export function advanceVesselMotion(
  motion: VesselMotion, forcing: VesselForcing, frame: OceanFrame,
  rollOmega: number, damping: number, dt: number, scale = 1,
): void {
  if (frame.time + 1e-10 >= forcing.nextSample) {
    forcing.target = waveTargets(frame, scale);
    forcing.nextSample = frame.time + 1 / 30;
  }
  stepVesselMotion(motion, forcing.target, rollOmega, damping, dt);
}
