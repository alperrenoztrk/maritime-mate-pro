import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftRight, Ruler, Gauge, Thermometer, Droplets, Wind } from "lucide-react";

/* ─── Conversion definitions ─── */
type UnitDef = { label: string; toBase: (v: number) => number; fromBase: (v: number) => number };

const CATEGORIES: {
  id: string;
  label: string;
  icon: React.ElementType;
  units: UnitDef[];
}[] = [
  {
    id: "distance",
    label: "Distance",
    icon: Ruler,
    units: [
      { label: "Nautical Miles (NM)", toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
      { label: "Kilometer (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { label: "Meter (m)", toBase: (v) => v, fromBase: (v) => v },
      { label: "Feet (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { label: "Yard (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { label: "Cable", toBase: (v) => v * 185.2, fromBase: (v) => v / 185.2 },
      { label: "Fathom", toBase: (v) => v * 1.8288, fromBase: (v) => v / 1.8288 },
    ],
  },
  {
    id: "speed",
    label: "Speed",
    icon: Gauge,
    units: [
      { label: "Knot (kn)", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
      { label: "km/s", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { label: "m/s", toBase: (v) => v, fromBase: (v) => v },
      { label: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    ],
  },
  {
    id: "weight",
    label: "Weight",
    icon: Droplets,
    units: [
      { label: "Metric Ton (MT)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { label: "Long Ton (LT)", toBase: (v) => v * 1016.047, fromBase: (v) => v / 1016.047 },
      { label: "Short Ton (ST)", toBase: (v) => v * 907.185, fromBase: (v) => v / 907.185 },
      { label: "Kilogram (kg)", toBase: (v) => v, fromBase: (v) => v },
      { label: "Pound (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    ],
  },
  {
    id: "volume",
    label: "Volume",
    icon: Droplets,
    units: [
      { label: "Cubic meters (m³)", toBase: (v) => v, fromBase: (v) => v },
      { label: "Liter (L)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { label: "US Gallon", toBase: (v) => v * 0.00378541, fromBase: (v) => v / 0.00378541 },
      { label: "Imperial Gallon", toBase: (v) => v * 0.00454609, fromBase: (v) => v / 0.00454609 },
      { label: "Barrel (bbl)", toBase: (v) => v * 0.158987, fromBase: (v) => v / 0.158987 },
      { label: "Feet³ (ft³)", toBase: (v) => v * 0.0283168, fromBase: (v) => v / 0.0283168 },
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    icon: Thermometer,
    units: [
      { label: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
      { label: "Fahrenheit (°F)", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      { label: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  {
    id: "pressure",
    label: "Pressure",
    icon: Wind,
    units: [
      { label: "Bar", toBase: (v) => v, fromBase: (v) => v },
      { label: "mbar/hPa", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { label: "PSI", toBase: (v) => v * 0.0689476, fromBase: (v) => v / 0.0689476 },
      { label: "atm", toBase: (v) => v * 1.01325, fromBase: (v) => v / 1.01325 },
      { label: "mmHg", toBase: (v) => v * 0.00133322, fromBase: (v) => v / 0.00133322 },
      { label: "kPa", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    ],
  },
];

function ConverterSection({ cat }: { cat: typeof CATEGORIES[0] }) {
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [value, setValue] = useState("");

  const numValue = parseFloat(value.replace(",", "."));
  const result = !isNaN(numValue)
    ? cat.units[toIdx].fromBase(cat.units[fromIdx].toBase(numValue))
    : null;

  const swap = () => {
    setFromIdx(toIdx);
    setToIdx(fromIdx);
  };

  return (
    <Card className="border-border/30 bg-card/60">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <cat.icon className="h-4 w-4 text-primary" />
          {cat.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Source Unit</Label>
          <Select value={String(fromIdx)} onValueChange={(v) => setFromIdx(Number(v))}>
            <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {cat.units.map((u, i) => (
                <SelectItem key={i} value={String(i)}>{u.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={swap}
            className="rounded-full border border-border/40 bg-card/80 p-2 transition hover:bg-accent/20"
          >
            <ArrowLeftRight className="h-4 w-4 text-primary" />
          </button>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Target Unit</Label>
          <Select value={String(toIdx)} onValueChange={(v) => setToIdx(Number(v))}>
            <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {cat.units.map((u, i) => (
                <SelectItem key={i} value={String(i)}>{u.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-center">
            <span className="text-lg font-semibold text-foreground">
              {result !== null ? result.toLocaleString("tr-TR", { maximumFractionDigits: 6 }) : "—"}
            </span>
            <span className="ml-1.5 text-xs text-muted-foreground">
              {cat.units[toIdx].label}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ConverterPage() {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-background px-4 pb-24 pt-6">
        <div className="mx-auto max-w-lg space-y-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Unit Converter</h1>
            </div>

          <Tabs defaultValue="distance">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="distance" className="text-xs">Distance</TabsTrigger>
              <TabsTrigger value="speed" className="text-xs">Speed</TabsTrigger>
              <TabsTrigger value="weight" className="text-xs">Weight</TabsTrigger>
            </TabsList>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="volume" className="text-xs">Volume</TabsTrigger>
              <TabsTrigger value="temperature" className="text-xs">temperature</TabsTrigger>
              <TabsTrigger value="pressure" className="text-xs">pressure</TabsTrigger>
            </TabsList>

            {CATEGORIES.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <ConverterSection cat={cat} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </MobileLayout>
  );
}
