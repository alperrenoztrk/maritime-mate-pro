import { useState } from "react";
import { Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { estimateDisplacementChange, type DraftReadings } from "@/lib/toolCalculations";

type DraftField = keyof DraftReadings;
const DRAFT_FIELDS: { key: DraftField; label: string }[] = [
  { key: "forward", label: "Forward" },
  { key: "midship", label: "Midship" },
  { key: "aft", label: "Aft" },
];
type Fields = Record<DraftField, string>;
const emptyDrafts = (): Fields => ({ forward: "", midship: "", aft: "" });

export default function DraftSurveyBallast() {
  const [before, setBefore] = useState<Fields>(emptyDrafts);
  const [after, setAfter] = useState<Fields>(emptyDrafts);
  const [tpc, setTpc] = useState("");
  const [result, setResult] = useState<ReturnType<typeof estimateDisplacementChange> | null>(null);
  const [error, setError] = useState("");
  const invalidate = () => { setResult(null); setError(""); };
  const calculate = () => {
    if (![...Object.values(before), ...Object.values(after), tpc].every((value) => value.trim())) {
      setError("Complete all six drafts and TPC.");
      setResult(null);
      return;
    }
    const parseDrafts = (fields: Fields): DraftReadings => ({
      forward: Number(fields.forward), midship: Number(fields.midship), aft: Number(fields.aft),
    });
    try {
      setResult(estimateDisplacementChange(parseDrafts(before), parseDrafts(after), Number(tpc)));
      setError("");
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Check the inputs.");
    }
  };
  return (
    <LibraryPageShell title="Draft Change Estimate" icon={Droplets} maxWidth="max-w-3xl">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Estimate a change in displacement from two sets of drafts at a constant tonnes-per-centimetre
        (TPC) value. <strong>This does not determine ballast quantity</strong>: cargo, bunkers,
        freshwater, stores, trim, density and other changes can affect the observed drafts.
      </p>
      <Card className="surface-2 rounded-2xl border-border/60 shadow-none">
        <CardHeader><CardTitle className="text-base">Vessel hydrostatic input</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="tpc">TPC from vessel hydrostatic data (t/cm)</Label>
          <Input id="tpc" type="number" inputMode="decimal" min="0" step="any"
            placeholder="20" value={tpc}
            onChange={(e) => { setTpc(e.target.value); invalidate(); }} />
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        {([
          { id: "before", label: "Before", values: before, update: setBefore },
          { id: "after", label: "After", values: after, update: setAfter },
        ] as const).map((group) => (
          <Card key={group.id} className="surface-2 rounded-2xl border-border/60 shadow-none">
            <CardHeader><CardTitle className="text-base">{group.label} drafts (m)</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {DRAFT_FIELDS.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <Label htmlFor={`${group.id}-${field.key}`}>{field.label}</Label>
                  <Input id={`${group.id}-${field.key}`} type="number"
                    inputMode="decimal" step="any" min="0" placeholder="5.00"
                    value={group.values[field.key]}
                    onChange={(e) => {
                      group.update((previous) => ({ ...previous, [field.key]: e.target.value }));
                      invalidate();
                    }} />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="w-full" onClick={calculate}>Estimate displacement change</Button>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {result && (
        <Card className="surface-2 rounded-2xl border-border/60 shadow-none">
          <CardHeader><CardTitle className="text-base">Approximate displacement change</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-xl font-semibold tabular-nums">
              {result.displacementChangeTonnes > 0 ? "+" : ""}
              {result.displacementChangeTonnes.toFixed(2)} t
            </p>
            <p className="text-muted-foreground">Before mean: {result.beforeMeanM.toFixed(3)} m · After mean: {result.afterMeanM.toFixed(3)} m</p>
            <p className="text-muted-foreground">Draft difference: {result.draftChangeM.toFixed(3)} m</p>
          </CardContent>
        </Card>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        Approximate mean = (forward + 4 × midship + aft) / 6; ΔDisplacement ≈ ΔDraft (cm) × TPC.
        This simplified check does not replace vessel hydrostatic corrections or tank sounding tables.
      </p>
    </LibraryPageShell>
  );
}
