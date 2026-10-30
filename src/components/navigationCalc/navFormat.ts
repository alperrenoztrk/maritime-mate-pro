import { fmt, parseNumber } from "@/components/tools/format";
import type { ResultRow } from "@/components/tools/ToolKit";

export type PositionInput = { deg: string; min: string; hemi: string };

export const lat = (deg = "", min = "", hemi = "N"): PositionInput => ({ deg, min, hemi });
export const lon = (deg = "", min = "", hemi = "E"): PositionInput => ({ deg, min, hemi });

/** Degrees + decimal minutes → signed decimal degrees (N and E positive); NaN if invalid. */
export function positionToDecimal(p: PositionInput, kind: "lat" | "lon"): number {
  const d = parseNumber(p.deg);
  const m = p.min.trim() === "" ? 0 : parseNumber(p.min);
  if (!Number.isFinite(d) || !Number.isFinite(m) || d < 0 || m < 0 || m >= 60) return Number.NaN;
  const value = d + m / 60;
  if (value > (kind === "lat" ? 90 : 180)) return Number.NaN;
  return p.hemi === "S" || p.hemi === "W" ? -value : value;
}

const dm = (value: number, degWidth: number, pos: string, neg: string) => {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  let d = Math.floor(abs);
  let m = Math.round((abs - d) * 600) / 10;
  if (m >= 60) {
    d += 1;
    m = 0;
  }
  return `${String(d).padStart(degWidth, "0")}° ${m.toFixed(1).padStart(4, "0")}′ ${value < 0 ? neg : pos}`;
};

export const fmtLat = (value: number) => dm(value, 2, "N", "S");
export const fmtLon = (value: number) => dm(value, 3, "E", "W");

/** True course or bearing as 000.0°. */
export const fmtBearing = (value: number, digits = 1) =>
  Number.isFinite(value) ? `${(((value % 360) + 360) % 360).toFixed(digits).padStart(digits ? 4 + digits : 3, "0")}°` : "—";

/** Angle east/west: +2.5 → "2.5° E". */
export const fmtEW = (value: number, digits = 1) =>
  Number.isFinite(value) ? `${fmt(Math.abs(value), digits)}° ${value < 0 ? "W" : value > 0 ? "E" : ""}`.trim() : "—";

/** "2026-01-01T06:30" (datetime-local) read as UTC. */
export const parseUtc = (value: string) => (value.trim() ? new Date(`${value}Z`) : new Date(Number.NaN));

export const fmtUtc = (date: Date) =>
  Number.isFinite(date.getTime()) ? `${date.toISOString().slice(0, 16).replace("T", " ")} UTC` : "—";

export const fmtHours = (hours: number) => {
  if (!Number.isFinite(hours)) return "—";
  const totalMin = Math.round(hours * 60);
  return `${Math.floor(totalMin / 60)} h ${String(totalMin % 60).padStart(2, "0")} min`;
};

export const copyRows = (rows: ResultRow[]) => rows.map((r) => `${r.label}: ${r.value}`).join("\n");

export const errorText = (e: unknown) => (e instanceof Error ? e.message : "Check the inputs.");

/** Thrown when an input is still empty: the tool waits silently instead of showing an error. */
export class Incomplete extends Error {}

export function need(...values: number[]) {
  if (values.some((v) => !Number.isFinite(v))) throw new Incomplete();
}

export function attempt<T>(compute: () => T): { value?: T; error?: string } {
  try {
    return { value: compute() };
  } catch (e) {
    return e instanceof Incomplete ? {} : { error: errorText(e) };
  }
}
