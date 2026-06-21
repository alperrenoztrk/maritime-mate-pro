import { useState } from "react";
import { Calculator, ListOrdered } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { CalcStep, CourseEntry } from "@/data/courseContent/types";
import { StepByStepSolution } from "./StepByStepSolution";

/**
 * Tek bir bağlı hesaplayıcı kartı. Üstte formülü gösterir (Formüller
 * sayfasıyla aynı ifade → formül-hesaplama bağı görünür olur), altında
 * girdiler ve `entry.calculate` ile hesaplanan sonuçlar.
 *
 * Tasarım, mevcut makine "CalcToolCard"'ından korunarak tüm dersler için
 * ortaklaştırılmıştır.
 */
export function CalculatorCard({ entry }: { entry: CourseEntry }) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{ label: string; value: string }[] | null>(null);
  const [steps, setSteps] = useState<CalcStep[] | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [numVals, setNumVals] = useState<Record<string, number>>({});

  const inputs = entry.inputs ?? [];

  const handleCalc = () => {
    if (!entry.calculate) return;
    const computed: Record<string, number> = {};
    for (const inp of inputs) {
      const v = parseFloat(vals[inp.key] || "0");
      if (isNaN(v)) return;
      computed[inp.key] = v;
    }
    const r = entry.calculate(computed);
    setResults(Array.isArray(r) ? r : [r]);
    setNumVals(computed);
    setSteps(entry.steps ? entry.steps(computed) : null);
    setShowSteps(false);
  };

  return (
    <Card className="bg-card/80 backdrop-blur border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{entry.name}</CardTitle>
        <div className="mt-1 rounded-lg bg-background p-2 text-center font-mono text-sm text-primary">
          {entry.formula}
        </div>
        {entry.note && <p className="text-xs text-muted-foreground">{entry.note}</p>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {inputs.map((inp) => (
            <div key={inp.key} className="space-y-1">
              <Label className="text-xs">
                {inp.label} {inp.unit && <span className="text-muted-foreground">({inp.unit})</span>}
              </Label>
              <Input
                type="number"
                placeholder={inp.placeholder}
                value={vals[inp.key] || ""}
                onChange={(e) => setVals((p) => ({ ...p, [inp.key]: e.target.value }))}
                className="h-9"
              />
            </div>
          ))}
        </div>
        <Button onClick={handleCalc} size="sm" className="w-full gap-2">
          <Calculator className="h-4 w-4" /> Hesapla
        </Button>
        {results && (
          <div className="bg-primary/5 rounded-lg p-3 space-y-1">
            {results.map((r, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-semibold text-foreground">{r.value}</span>
              </div>
            ))}
          </div>
        )}
        {results && steps && steps.length > 0 && (
          <>
            <Button
              onClick={() => setShowSteps((s) => !s)}
              size="sm"
              variant="ghost"
              className="w-full gap-2 text-primary"
            >
              <ListOrdered className="h-4 w-4" />
              {showSteps ? "Adımları Gizle" : "Çözümü Adım Adım Göster"}
            </Button>
            {showSteps && (
              <StepByStepSolution entry={entry} vals={numVals} steps={steps} />
            )}
          </>
        )}
        {entry.source && (
          <p className="text-[11px] text-muted-foreground">
            Kaynak: {entry.source.code}
            {entry.source.detail ? ` — ${entry.source.detail}` : ""}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
