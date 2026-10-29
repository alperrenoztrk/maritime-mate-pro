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
