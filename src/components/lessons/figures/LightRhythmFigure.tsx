import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LIGHT_FILL,
  LIGHT_RHYTHM_SETS,
  colourAt,
  litIntervals,
  periodOf,
  type LightRhythm,
  type LightRhythmSetId,
} from "./lightRhythms";
import { useLightClock } from "./useLightClock";

const TRACK_WIDTH = 400;
const TRACK_HEIGHT = 22;
const NIGHT = "#0b1220";

/** The light sequence as lit blocks on a dark track, one window wide. */
export function LightTrack({
  rhythm,
  windowSeconds,
  playhead,
  showPeriod = true,
}: {
  rhythm: LightRhythm;
  windowSeconds: number;
  playhead?: number;
  showPeriod?: boolean;
}) {
  const scale = TRACK_WIDTH / windowSeconds;
  const period = periodOf(rhythm);
  const bracket = showPeriod && rhythm.periodic && period < windowSeconds;
  const top = bracket ? 12 : 0;
  return (
    <svg
      viewBox={`0 0 ${TRACK_WIDTH} ${TRACK_HEIGHT + top}`}
      className="notranslate h-auto w-full"
      aria-hidden="true"
    >
      {bracket && (
        <g stroke="currentColor" strokeWidth={1.5} className="text-muted-foreground">
          <line x1={1} y1={5} x2={period * scale - 1} y2={5} />
          <line x1={1} y1={1} x2={1} y2={10} />
          <line x1={period * scale - 1} y1={1} x2={period * scale - 1} y2={10} />
        </g>
      )}
      <rect x={0} y={top} width={TRACK_WIDTH} height={TRACK_HEIGHT} rx={4} fill={NIGHT} />
      {litIntervals(rhythm, windowSeconds).map((interval, index) => (
        <rect
          key={index}
          x={interval.start * scale}
          y={top + 2}
          width={Math.max((interval.end - interval.start) * scale, 1.5)}
          height={TRACK_HEIGHT - 4}
          rx={1.5}
          fill={LIGHT_FILL[interval.colour]}
        />
      ))}
      {playhead !== undefined && (
        <line
          x1={(playhead % windowSeconds) * scale}
          x2={(playhead % windowSeconds) * scale}
          y1={top}
          y2={top + TRACK_HEIGHT}
          stroke="#38bdf8"
          strokeWidth={2}
        />
      )}
    </svg>
  );
}

function Lamp({ rhythm, seconds, playing }: { rhythm: LightRhythm; seconds: number; playing: boolean }) {
  const colour = playing ? colourAt(rhythm, seconds) : null;
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" aria-hidden="true">
      <circle cx={14} cy={14} r={13} fill={NIGHT} />
      <circle
        cx={14}
        cy={14}
        r={8}
        fill={colour ? LIGHT_FILL[colour] : "#1e293b"}
        style={colour ? { filter: `drop-shadow(0 0 4px ${LIGHT_FILL[colour]})` } : undefined}
      />
    </svg>
  );
}

/**
 * Light characters as timelines, with a lamp per row that blinks in real time
 * when the reader presses play. Nothing moves on its own; the quickest rhythm
 * shown (VQ, two flashes a second) stays under the three-flashes-a-second
 * photosensitivity limit, so UQ is described in the text but not animated.
 */
export function LightRhythmFigure({ set }: { set: LightRhythmSetId }) {
  const { windowSeconds, rhythms } = LIGHT_RHYTHM_SETS[set];
  const [playing, setPlaying] = useState(false);
  const seconds = useLightClock(playing);
  return (
    <figure className="space-y-3 rounded-xl border border-border/50 bg-muted/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">Light rhythms</p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="min-h-11"
          aria-pressed={playing}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {playing ? "Pause" : "Play the rhythms"}
        </Button>
      </div>
      <ul className="space-y-3">
        {rhythms.map((rhythm) => (
          <li key={`${rhythm.code}-${rhythm.name}`} className="flex items-center gap-3">
            <Lamp rhythm={rhythm} seconds={seconds} playing={playing} />
            <div className="min-w-0 flex-1 space-y-1">
              <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <span className="font-mono font-semibold text-foreground" translate="no">
                  {rhythm.code}
                </span>
                <span className="text-muted-foreground">{rhythm.name}</span>
              </p>
              <LightTrack
                rhythm={rhythm}
                windowSeconds={windowSeconds}
                playhead={playing ? seconds : undefined}
              />
            </div>
          </li>
        ))}
      </ul>
      <figcaption className="text-xs leading-relaxed text-muted-foreground">
        Bright blocks show the light on, dark blocks the eclipses. The bracket above a track marks one period. Timings inside a period are illustrative; take the real characteristic from the chart and the List of Lights.
      </figcaption>
    </figure>
  );
}
