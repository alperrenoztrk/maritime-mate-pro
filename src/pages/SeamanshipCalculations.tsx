import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Link, useParams } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationGrid, CalculationGridScreen, type CalculationGridItem } from "@/components/ui/calculation-grid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Anchor, Navigation2, Ship, Sigma, Wind, Link2 } from "lucide-react";

const seamanshipItems: CalculationGridItem[] = [
  { id: "overview", title: "Gemicilik Paneli", icon: Navigation2, to: "/seamanship/calculations" },
  { id: "mooring", title: "Palamar Çalışma Yükü", icon: Anchor, to: "/seamanship/calculations/mooring" },
  { id: "wind", title: "Rüzgâr Kuvveti", icon: Wind, to: "/seamanship/calculations/wind" },
  { id: "catenary", title: "Katenary Hesabı", icon: Ship, to: "/seamanship/calculations/catenary" },
  { id: "anchor-holding", title: "Demir Tutma Kuvveti", icon: Anchor, to: "/seamanship/calculations/anchor-holding" },
  { id: "bollard-pull", title: "Römorkör Bollard Pull", icon: Ship, to: "/seamanship/calculations/bollard-pull" },
  { id: "scope-ratio", title: "Scope Ratio", icon: Link2, to: "/seamanship/calculations/scope-ratio" },
];

const sectionTitles: Record<string, string> = {
  mooring: "Palamar Çalışma Yükü",
  wind: "Rüzgâr Kuvveti",
  catenary: "Katenary Hesabı",
  "anchor-holding": "Demir Tutma Kuvveti",
  "bollard-pull": "Römorkör Bollard Pull",
  "scope-ratio": "Scope Ratio",
};

type SectionKey = keyof typeof sectionTitles;

const validSections = new Set<SectionKey>(["mooring", "wind", "catenary", "anchor-holding", "bollard-pull", "scope-ratio"]);

function SeamanshipCalculationContent({ initialSection }: { initialSection?: SectionKey }) {
  const [mooringInputs, setMooringInputs] = useState({ swl: "", safetyFactor: "0.55" });
  const [windInputs, setWindInputs] = useState({ cd: "1.2", area: "", velocity: "" });
  const [catenaryInputs, setCatenaryInputs] = useState({ weight: "", scope: "", depth: "" });
  const [anchorInputs, setAnchorInputs] = useState({ weight: "", groundType: "mud" });
  const [bollardInputs, setBollardInputs] = useState({ displacement: "", speed: "", k: "30" });
  const [scopeInputs, setScopeInputs] = useState({ chainLength: "", depth: "" });

  const mooringRef = useRef<HTMLDivElement>(null);
  const windRef = useRef<HTMLDivElement>(null);
  const catenaryRef = useRef<HTMLDivElement>(null);
  const anchorHoldingRef = useRef<HTMLDivElement>(null);
  const bollardPullRef = useRef<HTMLDivElement>(null);
  const scopeRatioRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useMemo<Record<SectionKey, RefObject<HTMLDivElement>>>(() => ({
    mooring: mooringRef,
    wind: windRef,
    catenary: catenaryRef,
    "anchor-holding": anchorHoldingRef,
    "bollard-pull": bollardPullRef,
    "scope-ratio": scopeRatioRef,
  }), []);

  useEffect(() => {
    if (!initialSection) return;
    const target = sectionRefs[initialSection]?.current;
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [initialSection, sectionRefs]);

  const calculateMooringLoad = () => {
    const swl = parseFloat(mooringInputs.swl.replace(",", "."));
    const sf = parseFloat(mooringInputs.safetyFactor.replace(",", "."));
    if (isNaN(swl) || isNaN(sf)) return null;
    return ((swl * sf) / 1000).toFixed(2);
  };

  const calculateWindForce = () => {
    const cd = parseFloat(windInputs.cd.replace(",", "."));
    const area = parseFloat(windInputs.area.replace(",", "."));
    const velocity = parseFloat(windInputs.velocity.replace(",", "."));
    if (isNaN(cd) || isNaN(area) || isNaN(velocity)) return null;
    return (0.613 * cd * area * velocity * velocity / 1000).toFixed(2);
  };

  const calculateCatenaryLength = () => {
    const weight = parseFloat(catenaryInputs.weight.replace(",", "."));
    const scope = parseFloat(catenaryInputs.scope.replace(",", "."));
    const depth = parseFloat(catenaryInputs.depth.replace(",", "."));
    if (isNaN(weight) || isNaN(scope) || isNaN(depth)) return null;
    const chainLength = Math.sqrt(scope * scope + depth * depth);
    return chainLength.toFixed(2);
  };

  // Ground type holding coefficients
  const groundCoefficients: Record<string, { factor: number; label: string }> = {
    mud: { factor: 6, label: "Çamur" },
    sand: { factor: 7, label: "Kum" },
    clay: { factor: 10, label: "Kil" },
    rock: { factor: 3, label: "Kayalık" },
    gravel: { factor: 5, label: "Çakıl" },
  };

  const calculateAnchorHolding = () => {
    const weight = parseFloat(anchorInputs.weight.replace(",", "."));
    if (isNaN(weight)) return null;
    const coeff = groundCoefficients[anchorInputs.groundType]?.factor ?? 6;
    const holdingPower = (weight / 1000) * coeff; // tonnes
    return { holdingPower: holdingPower.toFixed(2), coeff };
  };

  const calculateBollardPull = () => {
    const displacement = parseFloat(bollardInputs.displacement.replace(",", "."));
    const speed = parseFloat(bollardInputs.speed.replace(",", "."));
    const k = parseFloat(bollardInputs.k.replace(",", "."));
    if (isNaN(displacement) || isNaN(speed) || isNaN(k)) return null;
    // BP = (Δ^(2/3) × V²) / K
    const bp = (Math.pow(displacement, 2 / 3) * speed * speed) / k;
    return bp.toFixed(1);
  };

  const calculateScopeRatio = () => {
    const chainLength = parseFloat(scopeInputs.chainLength.replace(",", "."));
    const depth = parseFloat(scopeInputs.depth.replace(",", "."));
    if (isNaN(chainLength) || isNaN(depth) || depth === 0) return null;
    const ratio = chainLength / depth;
    let recommendation = "";
    if (ratio < 3) recommendation = "Yetersiz — minimum 3:1 önerilir";
    else if (ratio < 5) recommendation = "Kabul edilebilir — sakin hava";
    else if (ratio < 7) recommendation = "İyi — normal koşullar";
    else if (ratio < 10) recommendation = "Çok iyi — sert hava";
    else recommendation = "Mükemmel — fırtına koşulları";
    return { ratio: ratio.toFixed(1), recommendation };
  };

  return (
    <div className="space-y-6">
      {/* Mooring */}
      <Card ref={sectionRefs.mooring} className="bg-white/90 border-white/60 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#2F5BFF]">
            <Anchor className="h-5 w-5" />
            Palamar Çalışma Yükü
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>SWL (kg)</Label>
            <Input placeholder="Güvenli çalışma yükü" value={mooringInputs.swl} onChange={(e) => setMooringInputs({ ...mooringInputs, swl: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Güvenlik Katsayısı</Label>
            <Input placeholder="0.55 - 0.60" value={mooringInputs.safetyFactor} onChange={(e) => setMooringInputs({ ...mooringInputs, safetyFactor: e.target.value })} />
          </div>
          {calculateMooringLoad() && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-slate-600">Çalışma Yükü:</p>
              <p className="text-2xl font-bold text-[#2F5BFF]">{calculateMooringLoad()} kN</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Wind Force */}
        <Card ref={sectionRefs.wind} className="bg-white/90 border-white/60 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2F5BFF]">
              <Wind className="h-5 w-5" />
              Rüzgâr Kuvveti
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Sürtünme Katsayısı (Cd)</Label>
              <Input placeholder="1.0 - 1.3" value={windInputs.cd} onChange={(e) => setWindInputs({ ...windInputs, cd: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Cephe Alanı (m²)</Label>
              <Input placeholder="Rüzgâra maruz alan" value={windInputs.area} onChange={(e) => setWindInputs({ ...windInputs, area: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Rüzgâr Hızı (m/s)</Label>
              <Input placeholder="Rüzgâr hızı" value={windInputs.velocity} onChange={(e) => setWindInputs({ ...windInputs, velocity: e.target.value })} />
            </div>
            {calculateWindForce() && (
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-slate-600">Rüzgâr Kuvveti:</p>
                <p className="text-2xl font-bold text-[#2F5BFF]">{calculateWindForce()} kN</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Catenary */}
        <Card ref={sectionRefs.catenary} className="bg-white/90 border-white/60 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2F5BFF]">
              <Ship className="h-5 w-5" />
              Katenary Hesabı
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Zincir Ağırlığı (kg/m)</Label>
              <Input placeholder="Zincir ağırlığı" value={catenaryInputs.weight} onChange={(e) => setCatenaryInputs({ ...catenaryInputs, weight: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Mendirek Mesafesi (m)</Label>
              <Input placeholder="Scope" value={catenaryInputs.scope} onChange={(e) => setCatenaryInputs({ ...catenaryInputs, scope: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Su Derinliği (m)</Label>
              <Input placeholder="Derinlik" value={catenaryInputs.depth} onChange={(e) => setCatenaryInputs({ ...catenaryInputs, depth: e.target.value })} />
            </div>
            {calculateCatenaryLength() && (
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-slate-600">Zincir Uzunluğu:</p>
                <p className="text-2xl font-bold text-[#2F5BFF]">{calculateCatenaryLength()} m</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Anchor Holding Power */}
      <Card ref={sectionRefs["anchor-holding"]} className="bg-white/90 border-white/60 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#2F5BFF]">
            <Anchor className="h-5 w-5" />
            Demir Tutma Kuvveti
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Demir Ağırlığı (kg)</Label>
            <Input placeholder="Demir ağırlığı" value={anchorInputs.weight} onChange={(e) => setAnchorInputs({ ...anchorInputs, weight: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Zemin Tipi</Label>
            <Select value={anchorInputs.groundType} onValueChange={(val) => setAnchorInputs({ ...anchorInputs, groundType: val })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(groundCoefficients).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(() => {
            const result = calculateAnchorHolding();
            if (!result) return null;
            return (
              <div className="bg-blue-50 rounded-lg p-4 space-y-1">
                <p className="text-sm text-slate-600">Tutma Kuvveti = Ağırlık × Katsayı ({result.coeff})</p>
                <p className="text-2xl font-bold text-[#2F5BFF]">{result.holdingPower} ton</p>
              </div>
            );
          })()}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bollard Pull */}
        <Card ref={sectionRefs["bollard-pull"]} className="bg-white/90 border-white/60 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2F5BFF]">
              <Ship className="h-5 w-5" />
              Römorkör Bollard Pull
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Deplasman (ton)</Label>
              <Input placeholder="Gemi deplasmanı" value={bollardInputs.displacement} onChange={(e) => setBollardInputs({ ...bollardInputs, displacement: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Gemi Hızı (knot)</Label>
              <Input placeholder="Hız" value={bollardInputs.speed} onChange={(e) => setBollardInputs({ ...bollardInputs, speed: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Admiralty Katsayısı (K)</Label>
              <Input placeholder="25 - 35" value={bollardInputs.k} onChange={(e) => setBollardInputs({ ...bollardInputs, k: e.target.value })} />
            </div>
            {calculateBollardPull() && (
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-slate-600">Gerekli Bollard Pull:</p>
                <p className="text-2xl font-bold text-[#2F5BFF]">{calculateBollardPull()} ton</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scope Ratio */}
        <Card ref={sectionRefs["scope-ratio"]} className="bg-white/90 border-white/60 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2F5BFF]">
              <Link2 className="h-5 w-5" />
              Scope Ratio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Zincir Uzunluğu (m)</Label>
              <Input placeholder="Filada zincir" value={scopeInputs.chainLength} onChange={(e) => setScopeInputs({ ...scopeInputs, chainLength: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Su Derinliği (m)</Label>
              <Input placeholder="Derinlik" value={scopeInputs.depth} onChange={(e) => setScopeInputs({ ...scopeInputs, depth: e.target.value })} />
            </div>
            {(() => {
              const result = calculateScopeRatio();
              if (!result) return null;
              return (
                <div className="bg-blue-50 rounded-lg p-4 space-y-1">
                  <p className="text-sm text-slate-600">Scope Ratio:</p>
                  <p className="text-2xl font-bold text-[#2F5BFF]">{result.ratio}:1</p>
                  <p className="text-sm text-slate-500">{result.recommendation}</p>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SeamanshipCalculationDetailPage() {
  const { tool } = useParams<{ tool?: string }>();
  const initialSection = useMemo(() => {
    if (tool && validSections.has(tool as SectionKey)) {
      return tool as SectionKey;
    }
    return "mooring";
  }, [tool]);

  const activeTitle = tool && sectionTitles[tool] ? sectionTitles[tool] : "Gemicilik Hesaplamaları";

  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Gemicilik"
        title={activeTitle}
      >
        <SeamanshipCalculationContent initialSection={initialSection} />
      </CalculationGridScreen>
    </MobileLayout>
  );
}

const SeamanshipCalculationsPage = () => {
  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Gemicilik"
        title="Gemicilik Hesaplamaları"
      >
        <div className="space-y-6">
          <div className="flex justify-end">
            <Link to="/seamanship/formulas">
              <Button variant="secondary" size="sm" className="gap-2">
                <Sigma className="h-4 w-4" />
                Formüller
              </Button>
            </Link>
          </div>

          <CalculationGrid items={seamanshipItems} className="sm:grid-cols-2" />

          <p className="text-center text-sm text-slate-300">
            Her hesaplama ayrı bir sayfada açılır
          </p>
        </div>
      </CalculationGridScreen>
    </MobileLayout>
  );
};

export default SeamanshipCalculationsPage;
