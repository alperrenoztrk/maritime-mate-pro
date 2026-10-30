import { harmonicHeight, CONSTITUENTS, type Harmonic } from "./harmonicTide";

/** One station of the offline NOAA pack (public/data/tides/noaa-stations.json). */
export interface TideStation {
  id: string;
  name: string;
  state: string;
  lat: number;
  lon: number;
  /** Station standard time offset from UTC (h). */
  tz: number;
  /** MSL above MLLW (m): added so that heights are above chart datum. */
  mslAboveMllw: number;
  epoch: string;
  /** Largest difference from NOAA's hourly predictions when the pack was built (m). */
  checkedMaxErrorM?: number;
  /** [constituent name, amplitude (m), Greenwich phase κ (°)] */
  c: Harmonic[];
}

export interface TidePack {
  source: string;
  downloaded: string;
  datum: string;
  units: string;
  stations: TideStation[];
}

export interface TideExtreme {
  timeUtc: Date;
  heightM: number;
  type: "high" | "low";
}

/** True when every constituent of the station can be predicted. */
export const isSupported = (station: TideStation) => station.c.every(([name]) => name in CONSTITUENTS);

/** Predicted height of tide above MLLW (m) at an instant. */
export function predictHeight(station: TideStation, timeUtc: Date): number {
  return harmonicHeight(station.c, station.mslAboveMllw, timeUtc);
}

const STEP = 6 * 60_000;

/** High and low waters between two instants (6-minute scan, refined to a few seconds). */
export function predictExtremes(station: TideStation, fromUtc: Date, toUtc: Date): TideExtreme[] {
  if (!(toUtc > fromUtc)) throw new Error("The end must be after the start");
  const h = (t: number) => predictHeight(station, new Date(t));
  const out: TideExtreme[] = [];
  let t0 = fromUtc.getTime() - STEP;
  let h0 = h(t0);
  let t1 = fromUtc.getTime();
  let h1 = h(t1);
  for (let t2 = t1 + STEP; t2 <= toUtc.getTime() + STEP; t2 += STEP) {
    const h2 = h(t2);
    const high = h1 >= h0 && h1 > h2;
    const low = h1 <= h0 && h1 < h2;
    if (high || low) {
      // Golden-section search for the turning point within [t0, t2].
      let a = t0;
      let b = t2;
      const g = (Math.sqrt(5) - 1) / 2;
      const better = (x: number, y: number) => (high ? x > y : x < y);
      while (b - a > 5_000) {
        const c = b - g * (b - a);
        const d = a + g * (b - a);
        if (better(h(c), h(d))) b = d;
        else a = c;
      }
      const t = (a + b) / 2;
      if (t >= fromUtc.getTime() && t <= toUtc.getTime()) out.push({ timeUtc: new Date(t), heightM: h(t), type: high ? "high" : "low" });
    }
    t0 = t1;
    h0 = h1;
    t1 = t2;
    h1 = h2;
  }
  return out;
}

/** The high or low water either side of an instant (for the rule of twelfths / tidal curve). */
export function surroundingEvents(station: TideStation, timeUtc: Date): { before: TideExtreme; after: TideExtreme } | null {
  const span = 14 * 3600_000;
  const events = predictExtremes(station, new Date(timeUtc.getTime() - span), new Date(timeUtc.getTime() + span));
  const before = [...events].reverse().find((e) => e.timeUtc <= timeUtc);
  const after = events.find((e) => e.timeUtc > timeUtc);
  return before && after ? { before, after } : null;
}

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Stations whose name, state or id contain the query. */
export function searchStations(stations: TideStation[], query: string, limit = 12): TideStation[] {
  const q = fold(query.trim());
  if (!q) return [];
  return stations.filter((s) => fold(`${s.name} ${s.state} ${s.id}`).includes(q)).slice(0, limit);
}
