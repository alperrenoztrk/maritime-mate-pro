import { useState } from "react";
import { Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { estimateRectangularTank } from "@/lib/toolCalculations";

export default function TankCalculationsPage() {
  const [data, setData] = useState({ area: "", height: "", density: "1025" });
  const [result, setResult] = useState<ReturnType<typeof estimateRectangularTank> | null>(null);
  const [error, setError] = useState("");
  const update = (key: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setResult(null);
    setError("");
  };
  const calculate = () => {
    if (Object.values(data).some((v) => !v.trim())) {
      setError("Enter the area, liquid height and density.");
      setResult(null);
      return;
    }
    try {
      setResult(estimateRectangularTank(Number(data.area), Number(data.height), Number(data.density)));
      setError("");
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Check the inputs.");
    }
  };
  return (
    <LibraryPageShell title="Rectangular Tank Estimate" icon={Droplets} maxWidth="max-w-3xl">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Training estimate for a vertical prismatic tank with constant cross-sectional area and a level,
        homogeneous liquid. A real ship tank must use its approved sounding/ullage and calibration tables.
      </p>
      <Card className="surface-2 rounded-2xl border-border/60 shadow-none">
        <CardHeader><CardTitle className="text-base">Tank measurements</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {([
              ["area", "Horizontal cross-sectional area (m²)", "50"],
              ["height", "Liquid height above tank bottom (m)", "2.5"],
              ["density", "Liquid density (kg/m³)", "1025"],
            ] as const).map(([key, label, placeholder]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{label}</Label>
                <Input id={key} type="number" inputMode="decimal" min="0" step="any"
                  value={data[key]} placeholder={placeholder}
                  onChange={(e) => update(key, e.target.value)} />
              </div>
            ))}
          </div>
          <Button className="w-full" onClick={calculate}>Calculate</Button>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>
      {result && (
        <Card className="surface-2 rounded-2xl border-border/60 shadow-none">
          <CardHeader><CardTitle className="text-base">Estimated quantities</CardTitle></CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-3">
            <div><p className="text-muted-foreground">Volume</p><p className="text-lg font-semibold tabular-nums">{result.volumeM3.toFixed(3)} m³</p></div>
            <div><p className="text-muted-foreground">Liquid mass</p><p className="text-lg font-semibold tabular-nums">{result.massTonnes.toFixed(3)} t</p></div>
            <div><p className="text-muted-foreground">Vertical mass moment about tank bottom</p>
              <p className="text-lg font-semibold tabular-nums">{result.verticalMomentTonneMetres.toFixed(3)} t·m</p></div>
          </CardContent>
        </Card>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        V = A × h; mass = V × ρ / 1000; vertical moment = mass × h/2.
        This is not a sounding table, free-surface correction or a full ship stability calculation.
      </p>
    </LibraryPageShell>
  );
}

export { TankCalculationsPage as TankCalculations };
