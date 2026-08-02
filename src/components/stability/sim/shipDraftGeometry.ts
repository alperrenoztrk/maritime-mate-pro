import { DECK_Y, KEEL_Y, UNITS_PER_METER } from "./hullGeometry";

export const SHIP_SCALE_DEFAULT = 0.82;

/** Immersion (world units, +down) for a draft, clamped at the deck edge. */
export function immersionFor(draftM: number, scale: number): number {
  const raw = (draftM - 6.5) * UNITS_PER_METER * scale;
  const max = (DECK_Y + 0.04) * scale;
  return Math.min(raw, max);
}

/** World Y of the keel at a given draft — for placing the K marker. */
export function keelWorldY(draftM: number, scale: number = SHIP_SCALE_DEFAULT): number {
  return (KEEL_Y + 0.1) * scale - immersionFor(draftM, scale);
}
