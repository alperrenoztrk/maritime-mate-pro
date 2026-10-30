#!/usr/bin/env node
/**
 * Downloads NOAA CO-OPS harmonic constituents and datums for every tidal
 * harmonic station (public domain) and writes the compact offline pack used
 * by the Tides tool: public/data/tides/noaa-stations.json.
 *
 * Also stores NOAA's own high/low predictions for a few stations as test
 * fixtures (src/lib/calc/fixtures/noaa-hilo.json), so the app's predictions
 * are checked against the official ones.
 *
 * Every station is then checked against NOAA's own hourly predictions for a
 * fortnight; a station whose prediction differs by more than MAX_ERROR_M is
 * left out, and the largest difference is stored with each station.
 *
 * Usage: node --import tsx scripts/tides/fetch-noaa.mjs [--fixtures-only]
 */
import fs from "node:fs";
import path from "node:path";
import { CONSTITUENTS, harmonicHeight } from "../../src/lib/calc/harmonicTide.ts";

const MD = "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi";
const DATA = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";
const OUT = "public/data/tides/noaa-stations.json";
const FIXTURES = "src/lib/calc/fixtures/noaa-hilo.json";
const FIXTURE_STATIONS = ["8518750", "8443970", "9414290", "9447130", "8410140", "1612340"];
const FIXTURE_BEGIN = "20261101";
const FIXTURE_HOURS = 72;
const CHECK_BEGIN = "20261101";
const CHECK_HOURS = 336;
const MAX_ERROR_M = 0.03;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
      if (res.status === 404) return null;
    } catch {
      /* retry */
    }
    await sleep(1000 * 2 ** i);
  }
  throw new Error(`Failed: ${url}`);
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i], i);
      }
    }),
  );
  return out;
}

const round = (x, d) => Math.round(x * 10 ** d) / 10 ** d;

async function stationPack() {
  const list = await getJson(`${MD}/stations.json?type=harcon`);
  const stations = list.stations.filter((s) => s.tidal && !s.greatlakes);
  console.log(`Harmonic stations: ${list.stations.length}, tidal (not Great Lakes): ${stations.length}`);
  let done = 0;
  const packed = await mapLimit(stations, 8, async (s) => {
    const [harcon, datums] = await Promise.all([
      getJson(`${MD}/stations/${s.id}/harcon.json?units=metric`),
      getJson(`${MD}/stations/${s.id}/datums.json?units=metric`),
    ]);
    if (++done % 100 === 0) console.log(`  ${done}/${stations.length}`);
    const constituents = (harcon?.HarmonicConstituents ?? [])
      .filter((c) => c.amplitude > 0)
      .map((c) => [c.name, round(c.amplitude, 3), round(c.phase_GMT, 1)]);
    const value = (name) => datums?.datums?.find((d) => d.name === name)?.value;
    const msl = value("MSL");
    const mllw = value("MLLW");
    if (!constituents.length || !Number.isFinite(msl) || !Number.isFinite(mllw)) return null;
    if (!constituents.every(([name]) => name in CONSTITUENTS)) return { skipped: `${s.id} ${s.name}: non-standard constituents` };
    const station = {
      id: s.id,
      name: s.name,
      state: s.state ?? "",
      lat: round(s.lat, 4),
      lon: round(s.lng, 4),
      tz: s.timezonecorr ?? 0,
      // Harmonic constants are about mean sea level: predictions above MLLW add MSL − MLLW.
      mslAboveMllw: round(msl - mllw, 3),
      epoch: datums?.epoch ?? "",
      c: constituents,
    };
    const check = await getJson(
      `${DATA}?product=predictions&application=marinersbook&station=${s.id}&begin_date=${CHECK_BEGIN}&range=${CHECK_HOURS}&datum=MLLW&time_zone=gmt&units=metric&interval=h&format=json`,
    ).catch(() => null);
    if (!check?.predictions?.length) return { skipped: `${s.id} ${s.name}: no NOAA predictions to check against` };
    let maxError = 0;
    for (const p of check.predictions) {
      const t = new Date(`${p.t.replace(" ", "T")}:00Z`);
      maxError = Math.max(maxError, Math.abs(harmonicHeight(station.c, station.mslAboveMllw, t) - Number(p.v)));
    }
    if (maxError > MAX_ERROR_M) return { skipped: `${s.id} ${s.name}: differs from NOAA by ${maxError.toFixed(3)} m` };
    return { ...station, checkedMaxErrorM: round(maxError, 3) };
  });
  const skipped = packed.filter((x) => x?.skipped).map((x) => x.skipped);
  if (skipped.length) console.log(`Left out ${skipped.length}:\n  ${skipped.join("\n  ")}`);
  const kept = packed.filter((x) => x && !x.skipped).sort((a, b) => a.name.localeCompare(b.name));
  const pack = {
    source: "NOAA CO-OPS harmonic constituents and tidal datums (public domain), tidesandcurrents.noaa.gov",
    downloaded: new Date().toISOString().slice(0, 10),
    datum: "MLLW",
    units: "m",
    check: `Hourly predictions compared with NOAA's for ${CHECK_HOURS / 24} days from ${CHECK_BEGIN}; stations differing by more than ${MAX_ERROR_M} m left out.`,
    stations: kept,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(pack));
  console.log(`Wrote ${OUT}: ${kept.length} stations, ${(fs.statSync(OUT).size / 1024).toFixed(0)} KiB`);
}

async function fixtures() {
  const out = { source: "NOAA CO-OPS predictions, interval=hilo, datum=MLLW, time_zone=gmt, units=metric", begin: FIXTURE_BEGIN, hours: FIXTURE_HOURS, stations: {} };
  for (const id of FIXTURE_STATIONS) {
    const url = `${DATA}?product=predictions&application=marinersbook&station=${id}&begin_date=${FIXTURE_BEGIN}&range=${FIXTURE_HOURS}&datum=MLLW&time_zone=gmt&units=metric&interval=hilo&format=json`;
    const json = await getJson(url);
    out.stations[id] = json.predictions.map((p) => ({ t: `${p.t.replace(" ", "T")}:00Z`, v: Number(p.v), type: p.type }));
  }
  fs.mkdirSync(path.dirname(FIXTURES), { recursive: true });
  fs.writeFileSync(FIXTURES, JSON.stringify(out, null, 1) + "\n");
  console.log(`Wrote ${FIXTURES}`);
}

if (!process.argv.includes("--fixtures-only")) await stationPack();
await fixtures();
