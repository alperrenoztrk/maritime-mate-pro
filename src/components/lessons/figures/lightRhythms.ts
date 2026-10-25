/**
 * Light rhythms drawn by the lesson figures.
 *
 * Definitions follow IALA R1001 (Maritime Buoyage System) and IHO INT 1
 * section P. Phase durations inside a period are representative: the standard
 * fixes the character, the colour and the period, not the exact length of
 * every flash, so the figures say "illustrative".
 */
export type LightColour = "W" | "R" | "G" | "Y" | "Bu";

/** One phase of a period: `colour` lit, or `null` for an eclipse (dark). */
export interface LightPhase {
  colour: LightColour | null;
  seconds: number;
}

export interface LightRhythm {
  /** Chart abbreviation, shown verbatim (never translated). */
  code: string;
  name: string;
  phases: LightPhase[];
  /** False for a fixed light: it has no period to repeat. */
  periodic: boolean;
}

export interface LightRhythmSet {
  /** Width of the drawn time window in seconds. */
  windowSeconds: number;
  rhythms: LightRhythm[];
}

export const LIGHT_FILL: Record<LightColour, string> = {
  W: "#fff4c2",
  R: "#ef4444",
  G: "#22c55e",
  Y: "#facc15",
  Bu: "#3b82f6",
};

const on = (colour: LightColour, seconds: number): LightPhase => ({ colour, seconds });
const dark = (seconds: number): LightPhase => ({ colour: null, seconds });

/** `count` equal flashes; the last eclipse stretches to fill the period. */
const group = (
  colour: LightColour,
  count: number,
  flash: number,
  gap: number,
  period: number,
): LightPhase[] => {
  const phases: LightPhase[] = [];
  for (let index = 0; index < count; index++) {
    phases.push(on(colour, flash));
    if (index < count - 1) phases.push(dark(gap));
  }
  const used = count * flash + (count - 1) * gap;
  phases.push(dark(Math.round((period - used) * 100) / 100));
  return phases;
};

const rhythm = (code: string, name: string, phases: LightPhase[], periodic = true): LightRhythm => ({
  code,
  name,
  phases,
  periodic,
});

// Quick: 60 flashes a minute; very quick: 120 flashes a minute.
const Q_FLASH = 0.3;
const Q_GAP = 0.7;
const VQ_FLASH = 0.2;
const VQ_GAP = 0.3;

export const LIGHT_RHYTHM_SETS = {
  basic: {
    windowSeconds: 20,
    rhythms: [
      rhythm("F W", "Fixed", [on("W", 20)], false),
      rhythm("Fl W 5s", "Flashing", [on("W", 0.5), dark(4.5)]),
      rhythm("LFl W 10s", "Long-flashing", [on("W", 2), dark(8)]),
      rhythm("Oc W 6s", "Occulting", [on("W", 5), dark(1)]),
      rhythm("Oc(2) W 8s", "Group occulting", [on("W", 5), dark(1), on("W", 1), dark(1)]),
      rhythm("Iso W 4s", "Isophase", [on("W", 2), dark(2)]),
      rhythm("Fl(2) W 10s", "Group flashing", group("W", 2, 0.5, 1, 10)),
      rhythm("Fl(2+1) R 10s", "Composite group flashing", [
        on("R", 0.5), dark(0.7), on("R", 0.5), dark(1.8), on("R", 0.5), dark(6),
      ]),
      rhythm("Mo(A) W 8s", "Morse code A", [on("W", 0.5), dark(0.5), on("W", 1.5), dark(5.5)]),
      rhythm("Al Fl WR 10s", "Alternating flashing", [on("W", 0.5), dark(4.5), on("R", 0.5), dark(4.5)]),
    ],
  },
  quick: {
    windowSeconds: 10,
    rhythms: [
      rhythm("Q W", "Quick", [on("W", Q_FLASH), dark(Q_GAP)]),
      rhythm("VQ W", "Very quick", [on("W", VQ_FLASH), dark(VQ_GAP)]),
      rhythm("Q(3) W 10s", "Group quick", group("W", 3, Q_FLASH, Q_GAP, 10)),
      rhythm("VQ(9) W 10s", "Group very quick", group("W", 9, VQ_FLASH, VQ_GAP, 10)),
    ],
  },
  cardinal: {
    windowSeconds: 15,
    rhythms: [
      rhythm("Q", "North cardinal", [on("W", Q_FLASH), dark(Q_GAP)]),
      rhythm("VQ", "North cardinal", [on("W", VQ_FLASH), dark(VQ_GAP)]),
      rhythm("Q(3) 10s", "East cardinal", group("W", 3, Q_FLASH, Q_GAP, 10)),
      rhythm("VQ(3) 5s", "East cardinal", group("W", 3, VQ_FLASH, VQ_GAP, 5)),
      rhythm("Q(6)+LFl 15s", "South cardinal", [
        ...group("W", 6, Q_FLASH, Q_GAP, 6 - Q_GAP).slice(0, -1),
        dark(Q_GAP), on("W", 2), dark(7),
      ]),
      rhythm("VQ(6)+LFl 10s", "South cardinal", [
        ...group("W", 6, VQ_FLASH, VQ_GAP, 3 - VQ_GAP).slice(0, -1),
        dark(VQ_GAP), on("W", 2), dark(5),
      ]),
      rhythm("Q(9) 15s", "West cardinal", group("W", 9, Q_FLASH, Q_GAP, 15)),
      rhythm("VQ(9) 10s", "West cardinal", group("W", 9, VQ_FLASH, VQ_GAP, 10)),
    ],
  },
  marks: {
    windowSeconds: 12,
    rhythms: [
      rhythm("Fl R 4s", "Port-hand mark (Region A)", [on("R", 0.5), dark(3.5)]),
      rhythm("Fl G 4s", "Starboard-hand mark (Region A)", [on("G", 0.5), dark(3.5)]),
      rhythm("Fl(2+1) R 10s", "Preferred channel to starboard (Region A)", [
        on("R", 0.5), dark(0.7), on("R", 0.5), dark(1.8), on("R", 0.5), dark(6),
      ]),
      rhythm("Fl(2) W 5s", "Isolated danger mark", group("W", 2, 0.5, 1, 5)),
      rhythm("Iso W 4s", "Safe water mark", [on("W", 2), dark(2)]),
      rhythm("Fl Y 5s", "Special mark", [on("Y", 0.5), dark(4.5)]),
      rhythm("Al Bu Y 3s", "Emergency wreck marking buoy", [on("Bu", 1), dark(0.5), on("Y", 1), dark(0.5)]),
    ],
  },
} satisfies Record<string, LightRhythmSet>;

export type LightRhythmSetId = keyof typeof LIGHT_RHYTHM_SETS;

export const periodOf = (rhythm: LightRhythm): number =>
  rhythm.phases.reduce((sum, phase) => sum + phase.seconds, 0);

/** Colour shown at `seconds` after the start of the sequence, or null when dark. */
export const colourAt = (rhythm: LightRhythm, seconds: number): LightColour | null => {
  const period = periodOf(rhythm);
  let offset = ((seconds % period) + period) % period;
  for (const phase of rhythm.phases) {
    if (offset < phase.seconds) return phase.colour;
    offset -= phase.seconds;
  }
  return rhythm.phases[rhythm.phases.length - 1]?.colour ?? null;
};

/** Lit intervals inside [0, windowSeconds), for drawing. */
export const litIntervals = (
  rhythm: LightRhythm,
  windowSeconds: number,
): Array<{ start: number; end: number; colour: LightColour }> => {
  const period = periodOf(rhythm);
  const intervals: Array<{ start: number; end: number; colour: LightColour }> = [];
  for (let cycle = 0; cycle * period < windowSeconds; cycle++) {
    let time = cycle * period;
    for (const phase of rhythm.phases) {
      const end = Math.min(time + phase.seconds, windowSeconds);
      if (phase.colour && time < windowSeconds) intervals.push({ start: time, end, colour: phase.colour });
      time += phase.seconds;
    }
  }
  return intervals;
};
