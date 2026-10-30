import { useState } from "react";
import { Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { correctReferenceDisplacement } from "@/lib/toolCalculations";

export default function DraftSurveyDensity() {
  const [data, setData] = useState({ actual: "", reference: "1.025", displacement: "" });
  const [result, setResult] = useState<ReturnType<typeof correctReferenceDisplacement> | null>(null);
  const [error, setError] = useState("");
  const update = (key: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setResult(null);
    setError("");
  };
  const calculate = () => {
    if (Object.values(data).some((v) => !v.trim())) {
      setError("Enter both densities and reference displacement.");
      setResult(null);
      return;
    }
    try {
      setResult(correctReferenceDisplacement(
        Number(data.displacement), Number(data.actual), Number(data.reference),
      ));
      setError("");
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Check the inputs.");
    }
  };
  return (
    <LibraryPageShell title="Displacement Density Correction" icon={Thermometer} maxWidth="max-w-3xl">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Correct a displacement read from hydrostatic tables at a reference water density to
        the same submerged volume at the observed water density. This is a mass correction,
        not freshwater allowance or change of draft.
      </p>
      <Card className="surface-2 rounded-2xl border-border/60 shadow-none">
        <CardHeader><CardTitle className="text-base">Measured values</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {([
              ["actual", "Observed water density (t/m³)", "1.010"],
              ["reference", "Hydrostatic-table reference density (t/m³)", "1.025"],
              ["displacement", "Displacement from reference-density tables (t)", "10000"],
            ] as const).map(([key, label, placeholder]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{label}</Label>
                <Input id={key} type="number" inputMode="decimal" step="any" min="0"
                  value={data[key]} placeholder={placeholder}
                  onChange={(e) => update(key, e.target.value)} />
              </div>
            ))}
          </div>
          <Button onClick={calculate} className="w-full">Calculate correction</Button>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>
      {result && (
        <Card className="surface-2 rounded-2xl border-border/60 shadow-none">
          <CardHeader><CardTitle className="text-base">Density-corrected displacement</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xl font-semibold tabular-nums">{result.correctedDisplacementTonnes.toFixed(3)} t</p>
            <p className="text-sm text-muted-foreground">
              Correction relative to table displacement: {result.correctionTonnes >= 0 ? "+" : ""}
              {result.correctionTonnes.toFixed(3)} t
            </p>
          </CardContent>
        </Card>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        Δ(actual) = Δ(table) × ρ(actual) / ρ(table). Use a calibrated hydrometer and
        ship-approved hydrostatic tables; trim and draft-mark corrections are separate.
      </p>
    </LibraryPageShell>
  );
}
