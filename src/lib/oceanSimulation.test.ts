import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSea, encounterPeriod, METRES_PER_UNIT, KNOT_MS, SCENE_G, spectralHs } from './seakeeping';
import { advanceOcean, advanceVesselMotion, createOceanFrame, createVesselMotion, createVesselForcing, sampleOcean, stepVesselMotion, waveTargets } from './oceanSimulation';
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
  const waves = buildSea(5, 11, 135), frame = createOceanFrame(waves), motion = createVesselMotion(), forcing = createVesselForcing();
  for (let i = 0; i < fps * 20; i++) advanceOcean(frame, waves, 0.2, SCENE_G, 1 / fps, false,
    dt => advanceVesselMotion(motion, forcing, frame, 0.5, 0.12, dt));
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

function motionRange(hs: number, heading: number) {
  const waves = buildSea(hs, 9, heading), frame = createOceanFrame(waves);
  const motion = createVesselMotion(), forcing = createVesselForcing();
  const low = [Infinity, Infinity], high = [-Infinity, -Infinity], sum = [0, 0], squares = [0, 0];
  let count = 0;
  for (let i = 0; i < 120 * 30; i++) {
    advanceOcean(frame, waves, 12 * KNOT_MS / METRES_PER_UNIT, SCENE_G, 1 / 30, false,
      dt => advanceVesselMotion(motion, forcing, frame, 2 * Math.PI / 7.5, 0.12, dt));
    if (i < 300) continue; // let the initial response develop
    [motion.roll, motion.pitch].forEach((v, axis) => {
      low[axis] = Math.min(low[axis], v); high[axis] = Math.max(high[axis], v);
      sum[axis] += v; squares[axis] += v * v;
    });
    count++;
  }
  return { low, high, mean: sum.map(v => v / count), rms: squares.map(v => Math.sqrt(v / count)) };
}

test('all sea directions produce port/starboard and bow/stern oscillation about upright', () => {
  for (const heading of [0, 45, 90, 135, 180]) {
    const result = motionRange(1.875, heading);
    for (const axis of [0, 1]) {
      assert.ok(result.low[axis] < -0.001, `${heading}: negative excursion axis ${axis}`);
      assert.ok(result.high[axis] > 0.001, `${heading}: positive excursion axis ${axis}`);
      assert.ok(Math.abs(result.mean[axis]) < 0.003, `${heading}: no persistent list/trim`);
    }
  }
});

test('rougher water increases motion; glassy calm remains upright', () => {
  const calm = motionRange(0, 90), slight = motionRange(0.5, 90), rough = motionRange(3.25, 90);
  for (const axis of [0, 1]) {
    close(calm.rms[axis], 0);
    assert.ok(rough.rms[axis] > slight.rms[axis] * 3);
  }
});

test('free roll and pitch cross upright in both directions and decay without waves', () => {
  const motion = createVesselMotion(); motion.roll = 0.1; motion.pitch = -0.05;
  let crossedRoll = false, crossedPitch = false;
  for (let i = 0; i < 120 * 120; i++) {
    stepVesselMotion(motion, { roll: 0, pitch: 0, heave: 0 }, 0.8, 0.12, 1 / 120);
    crossedRoll ||= motion.roll < -0.01; crossedPitch ||= motion.pitch > 0.001;
  }
  assert.ok(crossedRoll && crossedPitch);
  assert.ok(Math.abs(motion.roll) < 1e-5 && Math.abs(motion.pitch) < 1e-5);
});

test('30 Hz waterplane forcing tracks the original 120 Hz response within 0.2 degrees', () => {
  const waves = buildSea(3.25, 10, 90), frame = createOceanFrame(waves);
  const reference = createVesselMotion(), actual = createVesselMotion(), forcing = createVesselForcing();
  for (let i = 0; i < 60 * 30; i++) {
    advanceOcean(frame, waves, 0.16, SCENE_G, 1 / 30, false, dt => {
      stepVesselMotion(reference, waveTargets(frame), 0.8, 0.12, dt);
      advanceVesselMotion(actual, forcing, frame, 0.8, 0.12, dt);
      close(actual.roll, reference.roll, 0.2 * Math.PI / 180);
      close(actual.pitch, reference.pitch, 0.2 * Math.PI / 180);
      close(actual.heave, reference.heave, 0.01);
    });
  }
});
