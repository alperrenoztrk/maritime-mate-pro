/**
 * Tank contents by geometry, for tanks without calibration tables (e.g. deck
 * tanks, portable tanks). Ship's tanks are always taken from the approved
 * sounding/ullage tables with trim and list corrections.
 */

export type TankShape = "rectangular" | "vertical-cylinder" | "horizontal-cylinder";

export interface TankGeometry {
  shape: TankShape;
  /** Length (rectangular, horizontal cylinder) in m. */
  length?: number;
  /** Breadth (rectangular) in m. */
  breadth?: number;
  /** Height (rectangular) in m. */
  height?: number;
  /** Diameter (cylinders) in m. */
  diameter?: number;
}

/** Cross-section area of liquid of depth h in a circle of radius r (circular segment). */
export function circularSegmentArea(radius: number, depth: number): number {
  const h = Math.min(Math.max(depth, 0), 2 * radius);
  return radius * radius * Math.acos((radius - h) / radius) - (radius - h) * Math.sqrt(2 * radius * h - h * h);
}

/** Total capacity (m³). */
export function tankCapacity(g: TankGeometry): number {
  switch (g.shape) {
    case "rectangular":
      return (g.length ?? 0) * (g.breadth ?? 0) * (g.height ?? 0);
    case "vertical-cylinder":
      return Math.PI * ((g.diameter ?? 0) / 2) ** 2 * (g.height ?? 0);
    case "horizontal-cylinder":
      return Math.PI * ((g.diameter ?? 0) / 2) ** 2 * (g.length ?? 0);
  }
}

/** Liquid volume (m³) at a filled depth (sounding corrected to the tank bottom), ship upright and even keel. */
export function tankVolumeAtDepth(g: TankGeometry, depth: number): number {
  switch (g.shape) {
    case "rectangular":
      return (g.length ?? 0) * (g.breadth ?? 0) * Math.min(Math.max(depth, 0), g.height ?? 0);
    case "vertical-cylinder":
      return Math.PI * ((g.diameter ?? 0) / 2) ** 2 * Math.min(Math.max(depth, 0), g.height ?? 0);
    case "horizontal-cylinder":
      return circularSegmentArea((g.diameter ?? 0) / 2, depth) * (g.length ?? 0);
  }
}

/** Free surface moment (t·m) of the liquid surface when slack. */
export function tankFsm(g: TankGeometry, depth: number, density: number): number {
  switch (g.shape) {
    case "rectangular":
      return (density * (g.length ?? 0) * (g.breadth ?? 0) ** 3) / 12;
    case "vertical-cylinder":
      return (density * Math.PI * (g.diameter ?? 0) ** 4) / 64;
    case "horizontal-cylinder": {
      const r = (g.diameter ?? 0) / 2;
      const h = Math.min(Math.max(depth, 0), 2 * r);
      const width = 2 * Math.sqrt(Math.max(2 * r * h - h * h, 0)); // free surface breadth
      return (density * (g.length ?? 0) * width ** 3) / 12;
    }
  }
}

export interface TankTableRow {
  /** Sounding or ullage, as tabulated (cm or m — same unit as the reading). */
  reading: number;
  /** Volume (m³). */
  volume: number;
  vcg?: number;
  lcg?: number;
  /** Free surface moment at ρ = 1.000 t/m³ (or as tabulated). */
  fsm?: number;
}

export interface TankTableResult {
  correctedReading: number;
  volume: number;
  vcg?: number;
  lcg?: number;
  fsm?: number;
  /** True when the reading lies outside the rows given. */
  extrapolated: boolean;
}

/**
 * Calibration-table look-up: the reading (sounding or ullage) is corrected for
 * trim and list with the table's own corrections, then every column is
 * interpolated linearly between the two bracketing rows.
 */
export function lookUpTankTable(rows: TankTableRow[], reading: number, trimCorrection = 0, listCorrection = 0): TankTableResult {
  const sorted = [...rows].sort((a, b) => a.reading - b.reading);
  if (sorted.length < 2) throw new Error("Enter at least two table rows.");
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].reading === sorted[i - 1].reading) throw new Error("Table readings must be different.");
  }
  const x = reading + trimCorrection + listCorrection;
  let i = sorted.findIndex((r) => r.reading >= x);
  if (i <= 0) i = i === 0 ? 1 : sorted.length - 1;
  const a = sorted[i - 1];
  const b = sorted[i];
  const f = (x - a.reading) / (b.reading - a.reading);
  const lerp = (p?: number, q?: number) => (p === undefined || q === undefined ? undefined : p + (q - p) * f);
  return {
    correctedReading: x,
    volume: a.volume + (b.volume - a.volume) * f,
    vcg: lerp(a.vcg, b.vcg),
    lcg: lerp(a.lcg, b.lcg),
    fsm: lerp(a.fsm, b.fsm),
    extrapolated: x < sorted[0].reading || x > sorted[sorted.length - 1].reading,
  };
}
