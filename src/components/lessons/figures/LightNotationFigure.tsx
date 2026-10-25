import { LightTrack } from "./LightRhythmFigure";
import type { LightRhythm } from "./lightRhythms";

const PARTS = [
  { code: "Fl(3)", label: "Character", text: "Group flashing: three flashes in each period" },
  { code: "W", label: "Color", text: "White" },
  { code: "10s", label: "Period", text: "The whole group, flashes and eclipses together, repeats every 10 seconds" },
  { code: "18m", label: "Elevation", text: "Height of the light above the chart's height datum, usually MHWS" },
  { code: "15M", label: "Range", text: "Nominal range in nautical miles" },
];

const FL3_W_10S: LightRhythm = {
  code: "Fl(3) W 10s",
  name: "Group flashing",
  periodic: true,
  phases: [
    { colour: "W", seconds: 0.5 },
    { colour: null, seconds: 1 },
    { colour: "W", seconds: 0.5 },
    { colour: null, seconds: 1 },
    { colour: "W", seconds: 0.5 },
    { colour: null, seconds: 6.5 },
  ],
};

/** A chart light description taken apart, with its period drawn to scale. */
export function LightNotationFigure() {
  return (
    <figure className="space-y-4 rounded-xl border border-border/50 bg-muted/30 p-4">
      <p
        className="rounded-lg bg-background px-3 py-2 text-center font-mono text-lg font-semibold text-foreground"
        translate="no"
      >
        Fl(3) W 10s 18m 15M
      </p>
      <dl className="grid gap-2 sm:grid-cols-2">
        {PARTS.map((part) => (
          <div key={part.code} className="flex items-start gap-3 rounded-lg border border-border/40 bg-background p-3">
            <dt className="min-w-14 whitespace-nowrap rounded-md bg-primary/10 px-2 py-1 text-center font-mono text-sm font-semibold text-primary" translate="no">
              {part.code}
            </dt>
            <dd className="space-y-0.5 text-sm">
              <span className="block font-semibold text-foreground">{part.label}</span>
              <span className="block leading-relaxed text-muted-foreground">{part.text}</span>
            </dd>
          </div>
        ))}
      </dl>
      <div className="space-y-1">
        <LightTrack rhythm={FL3_W_10S} windowSeconds={20} />
        <div className="flex justify-between text-xs text-muted-foreground" translate="no">
          <span>0 s</span>
          <span>10 s</span>
          <span>20 s</span>
        </div>
      </div>
      <figcaption className="text-xs leading-relaxed text-muted-foreground">
        The bracket is one period: three flashes and the eclipses between and after them take 10 seconds together. A representative entry, not a real light.
      </figcaption>
    </figure>
  );
}
