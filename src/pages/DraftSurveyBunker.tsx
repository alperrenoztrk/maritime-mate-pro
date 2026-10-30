import { useState } from "react";
import { Fuel } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { estimateBunkerMass } from "@/lib/toolCalculations";

export default function DraftSurveyBunker() {
  const [data, setData] = useState({ volume: "", vcf: "", density: "" });
  const [result, setResult] = useState<ReturnType<typeof estimateBunkerMass> | null>(null);
  const [error, setError] = useState("");
  const update = (key: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setResult(null);
    setError("");
  };
  const calculate = () => {
    if (Object.values(data).some((value) => !value.trim())) {
      setError("Enter net observed fuel volume, the correct VCF and certified density at 15 °C.");
      setResult(null);
      return;
    }
    try {
      setResult(estimateBunkerMass(Number(data.volume), Number(data.vcf), Number(data.density)));
      setError("");
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Check the inputs.");
    }
  };
  return (
    <LibraryPageShell title="Bunker Quantity Estimate" icon={Fuel} maxWidth="max-w-3xl">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Estimate bunker mass from <strong>net observed fuel volume</strong> obtained using the
        vessel's sounding/ullage tables, a petroleum-table volume correction factor (VCF),
        and certified density at 15 °C. A change in ship's draft alone cannot establish the
        delivered bunker quantity.
      </p>
      <Card className="surface-2 rounded-2xl border-border/60 shadow-none">
        <CardHeader><CardTitle className="text-base">Tank measurement inputs</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {([
            ["volume", "Net observed fuel volume (m³)", "125"],
            ["vcf", "Volume correction factor to 15 °C (from applicable tables)", "0.991"],
            ["density", "Certified fuel density at 15 °C (t/m³)", "0.950"],
          ] as const).map(([key, label, placeholder]) => (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={key}>{label}</Label>
              <Input id={key} type="number" inputMode="decimal" step="any" min="0"
                value={data[key]} placeholder={placeholder}
                onChange={(e) => update(key, e.target.value)} />
            </div>
          ))}
          <Button onClick={calculate} className="w-full">Calculate bunker mass</Button>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>
      {result && (
        <Card className="surface-2 rounded-2xl border-border/60 shadow-none">
          <CardHeader><CardTitle className="text-base">Estimated bunker quantity</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-xl font-semibold tabular-nums">{result.massTonnes.toFixed(3)} t</p>
            <p className="text-muted-foreground">Standard volume at 15 °C: {result.standardVolumeM3.toFixed(3)} m³</p>
          </CardContent>
        </Card>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        Standard volume = net observed fuel volume × VCF; mass (t) = standard volume × density at 15 °C.
        Do not assume a universal temperature coefficient: use the appropriate petroleum tables,
        tank calibrations, trim/list corrections and separate free-water deductions.
      </p>
    </LibraryPageShell>
  );
}
