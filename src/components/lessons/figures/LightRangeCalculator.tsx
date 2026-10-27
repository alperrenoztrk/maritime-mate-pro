import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Admiralty approximation with standard refraction: distance in NM, heights in metres. */
const horizon = (heightMetres: number) => 2.08 * Math.sqrt(heightMetres);

const parse = (value: string, max: number): number | null => {
  if (!value.trim()) return null;
  const number = Number(value.replace(",", "."));
  return Number.isFinite(number) && number >= 0 && number <= max ? number : null;
};

const nm = (value: number) => `${value.toFixed(2)} NM`;

/**
 * Geographic range of a light from its elevation and the observer's height of
 * eye. When the reader also enters the luminous range read from the List of
 * Lights diagram, the smaller of the two is the distance at which the light
 * can first be expected.
 */
export function LightRangeCalculator() {
  const id = useId();
  const [lightHeight, setLightHeight] = useState("30");
  const [eyeHeight, setEyeHeight] = useState("15");
  const [luminous, setLuminous] = useState("");
  const light = parse(lightHeight, 1000);
  const eye = parse(eyeHeight, 100);
  const luminousRange = parse(luminous, 100);
  const parts = light !== null && eye !== null ? { light: horizon(light), eye: horizon(eye) } : null;
  const geographic = parts ? parts.light + parts.eye : null;
  const expected = geographic !== null && luminousRange !== null ? Math.min(geographic, luminousRange) : null;

  const fields = [
    { key: "light", label: "Elevation of the light (m)", value: lightHeight, set: setLightHeight, valid: light !== null },
    { key: "eye", label: "Height of eye (m)", value: eyeHeight, set: setEyeHeight, valid: eye !== null },
    { key: "luminous", label: "Luminous range from the List of Lights (NM, optional)", value: luminous, set: setLuminous, valid: !luminous.trim() || luminousRange !== null },
  ];

  return (
    <figure className="space-y-4 rounded-xl border border-border/50 bg-muted/30 p-4">
      <p className="text-sm font-semibold text-foreground">Light range calculator</p>
      <p className="font-mono text-sm text-foreground" translate="no">D = 2.08 × (√H + √h)</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <Label htmlFor={`${id}-${field.key}`} className="text-xs leading-snug">
              {field.label}
            </Label>
            <Input
              id={`${id}-${field.key}`}
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={field.value}
              aria-invalid={!field.valid}
              onChange={(event) => field.set(event.target.value)}
            />
          </div>
        ))}
      </div>
      {parts === null || geographic === null ? (
        <p role="status" className="text-sm text-amber-700 dark:text-amber-300">
          Enter the elevation of the light (0–1000 m) and the height of eye (0–100 m).
        </p>
      ) : (
        <dl className="grid gap-2 sm:grid-cols-2" aria-live="polite">
          <div className="rounded-lg border border-border/40 bg-background p-3">
            <dt className="text-xs text-muted-foreground">Geographic range</dt>
            <dd className="text-xl font-semibold text-foreground" translate="no">{nm(geographic)}</dd>
            <dd className="mt-1 font-mono text-xs text-muted-foreground" translate="no">
              {`2.08√${light} + 2.08√${eye} = ${parts.light.toFixed(2)} + ${parts.eye.toFixed(2)}`}
            </dd>
          </div>
          {expected !== null && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
              <dt className="text-xs text-muted-foreground">First sighting can be expected at about</dt>
              <dd className="text-xl font-semibold text-primary" translate="no">{nm(expected)}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">
                {expected < geographic ? "Limited by the luminous range." : "Limited by the geographic range."}
              </dd>
            </div>
          )}
        </dl>
      )}
      <figcaption className="text-xs leading-relaxed text-muted-foreground">
        Standard atmospheric refraction is assumed. The result says nothing about fog, rain, background lighting or the intensity of the light; those decide the luminous range.
      </figcaption>
    </figure>
  );
}
