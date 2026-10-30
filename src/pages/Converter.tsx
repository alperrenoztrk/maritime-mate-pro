import { useState } from "react";
import { ArrowLeftRight, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalculatorPanel, CalculatorNumberField, CalculatorResultPanel } from "@/components/calculations/ProfessionalCalculator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { convertMaritimeUnit, MARITIME_UNIT_CATEGORIES } from "@/lib/maritimeUnits";

function parseDecimal(text: string): number | null {
  const normalized = text.trim().replace(",", ".");
  // Unlike parseFloat, reject partially valid strings (e.g. "12abc").
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export default function ConverterPage() {
  const [categoryId, setCategoryId] = useState("distance");
  const [fromId, setFromId] = useState("nm");
  const [toId, setToId] = useState("km");
  const [value, setValue] = useState("");
  const category = MARITIME_UNIT_CATEGORIES.find((item) => item.id === categoryId)!;
  const to = category.units.find((unit) => unit.id === toId)!;
  const parsed = parseDecimal(value);
  let converted: number | null = null;
  let error = "";
  if (value.trim() && parsed === null) {
    error = "Enter a valid numeric value.";
  } else if (parsed !== null) {
    try {
      converted = convertMaritimeUnit(categoryId, fromId, toId, parsed);
    } catch (e) {
      error = e instanceof Error ? e.message : "Conversion failed.";
    }
  }
  const chooseCategory = (id: string) => {
    const next = MARITIME_UNIT_CATEGORIES.find((item) => item.id === id);
    if (!next) return;
    setCategoryId(id);
    setFromId(next.units[0].id);
    setToId(next.units[1].id);
    setValue("");
  };
  const swap = () => {
    // Preserve the underlying measurement, not the old numeric input.
    if (converted !== null) setValue(String(Number(converted.toPrecision(12))));
    setFromId(toId);
    setToId(fromId);
  };
  return (
    <LibraryPageShell title="Unit Converter" icon={Ruler} maxWidth="max-w-3xl">
      <p className="text-sm text-muted-foreground">
        Convert maritime and engineering units with consistent SI definitions.
      </p>
      <nav aria-label="Conversion categories" className="flex gap-2 overflow-x-auto pb-2">
        {MARITIME_UNIT_CATEGORIES.map((item) => (
          <button type="button" key={item.id}
            onClick={() => chooseCategory(item.id)}
            aria-pressed={categoryId === item.id}
            className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors duration-control focus-visible:outline-2 focus-visible:outline-primary ${categoryId === item.id
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/70 bg-card text-foreground hover:bg-muted"}`}>
            {item.label}
          </button>
        ))}
      </nav>
      <CalculatorPanel title={category.label}>
        <div className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="unit-from">From</Label>
            <Select value={fromId} onValueChange={setFromId}>
              <SelectTrigger id="unit-from" className="min-h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                {category.units.map((unit) =>
                  <SelectItem key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</SelectItem>)}
              </SelectContent>
            </Select>
            <CalculatorNumberField id="converter-input" label="Value"
              value={value} placeholder="Enter a value"
              onChange={setValue} error={error || undefined} />
          </div>
          <Button type="button" onClick={swap} variant="outline" className="w-full gap-2">
            <ArrowLeftRight className="h-4 w-4" aria-hidden /> Swap units
          </Button>
          <div className="grid gap-2">
            <Label htmlFor="unit-to">To</Label>
            <Select value={toId} onValueChange={setToId}>
              <SelectTrigger id="unit-to" className="min-h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                {category.units.map((unit) =>
                  <SelectItem key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</SelectItem>)}
              </SelectContent>
            </Select>
            {converted !== null ? (
              <CalculatorResultPanel title="Converted Value"
                results={[{
                  label: `${category.units.find((unit) => unit.id === fromId)?.symbol} → ${to.symbol}`,
                  value: `${Number(converted.toPrecision(10)).toLocaleString(undefined, { maximumFractionDigits: 10 })} ${to.symbol}`,
                  primary: true,
                }]}
                steps={[`Express ${parsed} ${category.units.find((unit) => unit.id === fromId)?.symbol} in the SI reference for ${category.label}, then convert to ${to.symbol}.`]}
              />
            ) : (
              <p className="rounded-xl border border-dashed border-border p-3 text-xs text-muted-foreground" aria-live="polite">
                Enter a value to see the converted result.
              </p>
            )}
          </div>
        </div>
      </CalculatorPanel>
      <p className="text-xs leading-relaxed text-muted-foreground">
        1 NM = 1,852 m; 1 kn = 1 NM/h; 1 cable = 0.1 NM.
        Temperature conversions are absolute temperatures, not temperature differences.
        For contractual cargo and bunker quantities, follow the designated measurement standard.
      </p>
    </LibraryPageShell>
  );
}
