import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSea, encounterPeriod, METRES_PER_UNIT, KNOT_MS, SCENE_G, spectralHs } from './seakeeping';
import { advanceOcean, createOceanFrame, createVesselMotion, sampleOcean, stepVesselMotion, waveTargets } from './oceanSimulation';
const close = (a: number, b: number, tolerance = 1e-8) => assert.ok(Math.abs(a - b) < tolerance, `${a} differs from ${b}`);

test('propagation agrees with encounter period for head, beam and following seas', () => {
  for (const direction of [0, 90, 180]) {
    const waves = buildSea(2, 10, direction), speed = 15 * KNOT_MS / METRES_PER_UNIT;
    const [dx,,, wavelength] = waves[0], k = 2 * Math.PI / wavelength;
    close(2 * Math.PI / Math.abs(Math.sqrt(SCENE_G * k) - k * dx * speed), encounterPeriod(10, 15, direction));
  }
  assert.ok(buildSea(2, 10, 180)[0][0] < -0.99);
  assert.ok(buildSea(2, 10, 0)[0][0] > 0.99);
});
test('spectral energy reproduces Hs and glassy calm is exactly flat', () => {
  for (const h of [0, 0.2, 1.875, 3.25, 7.5]) close(spectralHs(buildSea(h, 12, 135)), h);
  const waves = buildSea(0, 9, 90), frame = createOceanFrame(waves);
  advanceOcean(frame, waves, 0, SCENE_G, 0.1, false);
  close(sampleOcean(frame, 3, 1), 0);
  assert.deepEqual(waveTargets(frame), { heave: 0, pitch: 0, roll: 0 });
});
test('world sampling matches horizontally displaced Gerstner water', () => {
  const frame = createOceanFrame([[1, 0, 0.3, 5]]); frame.chop = 0.85;
  const phase = 0.8, u = 1.1, k = 2 * Math.PI / 5, a = 0.3 / k;
  frame.phases[0] = phase;
  const x = u + frame.chop * a * Math.cos(k * u + phase);
  close(sampleOcean(frame, x, 0), a * Math.sin(k * u + phase), 1e-5);
});
test('slopes produce bow-up pitch and starboard-down roll with correct signs', () => {
  const head = createOceanFrame([[1, 0, 0.05, 30]]); head.phases[0] = 0;
  assert.ok(waveTargets(head).pitch > 0); close(waveTargets(head).roll, 0);
  const beam = createOceanFrame([[0, 1, 0.05, 30]]); beam.phases[0] = 0;
  assert.ok(waveTargets(beam).roll > 0); close(waveTargets(beam).pitch, 0);
});
function run(fps: number) {
  const waves = buildSea(5, 11, 135), frame = createOceanFrame(waves), motion = createVesselMotion();
  for (let i = 0; i < fps * 20; i++) advanceOcean(frame, waves, 0.2, SCENE_G, 1 / fps, false,
    dt => stepVesselMotion(motion, waveTargets(frame), 0.5, 0.12, dt));
  return { frame, motion };
}
test('water and ship retain the same timing at 15, 30, 60 and 120 fps', () => {
  const baseline = run(120);
  for (const fps of [15, 30, 60]) {
    const actual = run(fps); close(actual.frame.time, 20, 1e-7);
    close(actual.motion.roll, baseline.motion.roll); close(actual.motion.pitch, baseline.motion.pitch);
    close(actual.motion.heave, baseline.motion.heave);
    close(sampleOcean(actual.frame, 1, 2), sampleOcean(baseline.frame, 1, 2));
  }
});
test('pause and tab suspension cannot jump the simulation clock', () => {
  const waves = buildSea(4, 10, 90), frame = createOceanFrame(waves);
  advanceOcean(frame, waves, 0.2, SCENE_G, 0.1, false);
  const snapshot = JSON.stringify(frame);
  advanceOcean(frame, waves, 0.5, SCENE_G, 0.1, true);
  advanceOcean(frame, waves, 0.5, SCENE_G, 120, false);
  assert.equal(JSON.stringify(frame), snapshot);
});
test('rapid sea changes remain finite and cannot fold the surface', () => {
  const frame = createOceanFrame(buildSea(7.5, 4, 0)), motion = createVesselMotion();
  for (let i = 0; i < 900; i++) {
    const waves = buildSea(i % 120 < 60 ? 7.5 : 0, i % 240 < 120 ? 4 : 16, i % 80 < 40 ? 0 : 180);
    advanceOcean(frame, waves, i % 2 ? 0.37 : 0, SCENE_G, 1 / 30, false,
      dt => stepVesselMotion(motion, waveTargets(frame), 0.6, 0.12, dt));
    assert.ok(frame.chop * frame.waves.reduce((sum, w) => sum + w[2], 0) <= 0.650001);
    assert.ok(Object.values(motion).every(Number.isFinite)); assert.ok(Math.abs(motion.roll) <= 0.85);
  }
});
test('motion settles after the sea becomes calm', () => {
  const result = run(30), calm = buildSea(0, 9, 90);
  for (let i = 0; i < 30 * 160; i++) advanceOcean(result.frame, calm, 0, SCENE_G, 1 / 30, false,
    dt => stepVesselMotion(result.motion, waveTargets(result.frame), 0.6, 0.2, dt));
  for (const value of Object.values(result.motion)) close(value, 0, 1e-6);
});
test('slow rendering advances bounded time rather than freezing every frame', () => {
  const waves = buildSea(3, 10, 90), frame = createOceanFrame(waves);
  advanceOcean(frame, waves, 0, SCENE_G, 0.5, false); close(frame.time, 0.25);
});
