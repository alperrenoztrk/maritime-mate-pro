/**
 * Offline harmonic predictions checked against NOAA's own published high and
 * low waters (fixtures/noaa-hilo.json, downloaded by scripts/tides/fetch-noaa.mjs).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { predictExtremes, predictHeight, searchStations, surroundingEvents, type TidePack } from "./tidePrediction";

const ROOT = path.resolve(import.meta.dirname, "../../..");
const pack = JSON.parse(fs.readFileSync(path.join(ROOT, "public/data/tides/noaa-stations.json"), "utf8")) as TidePack;
const fixtures = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "fixtures/noaa-hilo.json"), "utf8")) as {
  stations: Record<string, Array<{ t: string; v: number; type: "H" | "L" }>>;
};

const MAX_MINUTES = 6;
const MAX_METRES = 0.03;

for (const [id, expected] of Object.entries(fixtures.stations)) {
  test(`station ${id}: HW/LW match NOAA within ${MAX_MINUTES} min and ${MAX_METRES * 100} cm`, () => {
    const station = pack.stations.find((s) => s.id === id);
    assert.ok(station, `station ${id} in the pack`);
    const first = new Date(expected[0].t);
    const last = new Date(expected[expected.length - 1].t);
    const got = predictExtremes(station, new Date(first.getTime() - 3600_000), new Date(last.getTime() + 3600_000));
    for (const e of expected) {
      const t = new Date(e.t).getTime();
      const match = got.find((g) => g.type === (e.type === "H" ? "high" : "low") && Math.abs(g.timeUtc.getTime() - t) < 90 * 60_000);
      assert.ok(match, `${id} ${e.type} ${e.t} found`);
      const dMin = Math.abs(match.timeUtc.getTime() - t) / 60_000;
      const dM = Math.abs(match.heightM - e.v);
      assert.ok(dMin <= MAX_MINUTES, `${id} ${e.t}: time off by ${dMin.toFixed(1)} min`);
      assert.ok(dM <= MAX_METRES, `${id} ${e.t}: height ${match.heightM.toFixed(3)} vs ${e.v} m`);
    }
  });
}

test("height at an extreme equals the extreme; surrounding events bracket the time", () => {
  const station = pack.stations.find((s) => s.id === "8518750")!;
  const [e] = predictExtremes(station, new Date("2026-11-01T00:00:00Z"), new Date("2026-11-01T12:00:00Z"));
  assert.ok(Math.abs(predictHeight(station, e.timeUtc) - e.heightM) < 0.005);
  const mid = new Date(e.timeUtc.getTime() + 3 * 3600_000);
  const s = surroundingEvents(station, mid)!;
  assert.ok(s.before.timeUtc <= mid && s.after.timeUtc > mid);
  assert.notEqual(s.before.type, s.after.type);
});

test("station search by name, state or id", () => {
  assert.ok(searchStations(pack.stations, "battery").some((s) => s.id === "8518750"));
  assert.ok(searchStations(pack.stations, "9414290").length === 1);
  assert.deepEqual(searchStations(pack.stations, "  "), []);
});
