import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calculator } from "lucide-react";
import { InputError } from "@/components/ui/input-error";
import { validateRange, validateUnit } from "@/utils/validation/validationHelpers";
import { CalculationSteps } from "@/components/ui/calculation-steps";
import type { CalculationStep } from "@/types/calculationSteps";

export const BasicStabilityCalculations = () => {
  const [kmInputs, setKmInputs] = useState({ kb: "", bm: "" });
  const [km, setKm] = useState<number | null>(null);
  const [kmSteps, setKmSteps] = useState<CalculationStep[]>([]);

  const [bmInputs, setBmInputs] = useState({ length: "", breadth: "", draft: "", cb: "" });
  const [bm, setBm] = useState<number | null>(null);
  const [bmSteps, setBmSteps] = useState<CalculationStep[]>([]);

  const [tpcInputs, setTpcInputs] = useState({ awp: "", rho: "1.025" });
  const [tpc, setTpc] = useState<number | null>(null);
  const [tpcSteps, setTpcSteps] = useState<CalculationStep[]>([]);

  const [draftInputs, setDraftInputs] = useState({ volume: "", awp: "" });
  const [draftChange, setDraftChange] = useState<number | null>(null);
  const [draftSteps, setDraftSteps] = useState<CalculationStep[]>([]);

  const [lcgItems, setLcgItems] = useState<Array<{ name: string; weight: string; lcg: string }>>([
    { name: "Item 1", weight: "", lcg: "" },
  ]);
  const [lcgResult, setLcgResult] = useState<number | null>(null);
  const [lcgSteps, setLcgSteps] = useState<CalculationStep[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const setError = (key: string, message: string | null) => {
    setErrors((prev) => {
      if (!message && !prev[key]) return prev;
      if (!message) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: message };
    });
  };

  const validateField = (
    key: string,
    rawValue: string,
    label: string,
    unit: string,
    min: number,
    max: number,
    example: string
  ) => {
    const unitError = validateUnit(rawValue, { label, unit, example });
    if (unitError) {
      setError(key, unitError);
      return null;
    }
    const numeric = Number(rawValue);
    if (Number.isNaN(numeric)) {
      setError(key, `${label} sayısal olmalıdır. Doğru kullanım: ${example} ${unit}.`);
      return null;
    }
    const rangeError = validateRange(numeric, { label, unit, min, max, example });
    setError(key, rangeError);
    return rangeError ? null : numeric;
  };

  const calcKM = () => {
    const kb = validateField("km-kb", kmInputs.kb, "KB", "m", 0, 20, "2.4");
    const bmVal = validateField("km-bm", kmInputs.bm, "BM", "m", 0, 30, "3.1");
    if (kb === null || bmVal === null) return;
    const result = kb + bmVal;
    setKm(result);
    setKmSteps([
      {
        step: 1,
        title: "Formül",
        formula: "KM = KB + BM",
        explanation: "Metacenter yüksekliği (KM), omurga merkezinden (KB) ve metacentrik yarıçaptan (BM) bulunur."
      },
      {
        step: 2,
        title: "Değerlerin yerleştirilmesi",
        formula: `KM = KB + BM`,
        substitution: `KM = ${kb.toFixed(3)} + ${bmVal.toFixed(3)}`,
      },
      {
        step: 3,
        title: "Sonuç",
        formula: `KM = ${kb.toFixed(3)} + ${bmVal.toFixed(3)}`,
        result: `KM = ${result.toFixed(3)} m`,
      },
    ]);
  };

  const calcBM = () => {
    const L = validateField("bm-l", bmInputs.length, "Boy (L)", "m", 10, 450, "120");
    const B = validateField("bm-b", bmInputs.breadth, "En (B)", "m", 2, 80, "20");
    const T = validateField("bm-t", bmInputs.draft, "Su Çekimi", "m", 0.5, 35, "6.5");
    const Cb = validateField("bm-cb", bmInputs.cb || "0.7", "Blok Katsayısı (Cb)", "-", 0.45, 0.95, "0.72");
    if ([L, B, T, Cb].some((val) => val === null)) return;
    const Ixx = (L! * Math.pow(B!, 3)) / 12;
    const volumeDisplacement = L! * B! * T! * Cb!;
    const result = Ixx / volumeDisplacement;
    setBm(result);
    setBmSteps([
      {
        step: 1,
        title: "Formül",
        formula: "BM = I_xx / ∇",
        explanation: "BM (metacentrik yarıçap), su hattı atalet momentinin (I_xx) hacim deplasmanına (∇) bölünmesiyle bulunur."
      },
      {
        step: 2,
        title: "Atalet momentini hesapla (I_xx)",
        formula: "I_xx = (L × B³) / 12",
        substitution: `I_xx = (${L!.toFixed(2)} × ${B!.toFixed(2)}³) / 12 = (${L!.toFixed(2)} × ${Math.pow(B!, 3).toFixed(2)}) / 12`,
        result: `I_xx = ${Ixx.toFixed(3)} m⁴`,
      },
      {
        step: 3,
        title: "Hacim deplasmanını hesapla (∇)",
        formula: "∇ = L × B × T × Cb",
        substitution: `∇ = ${L!.toFixed(2)} × ${B!.toFixed(2)} × ${T!.toFixed(2)} × ${Cb!.toFixed(3)}`,
        result: `∇ = ${volumeDisplacement.toFixed(3)} m³`,
      },
      {
        step: 4,
        title: "Sonuç",
        formula: "BM = I_xx / ∇",
        substitution: `BM = ${Ixx.toFixed(3)} / ${volumeDisplacement.toFixed(3)}`,
        result: `BM = ${result.toFixed(3)} m`,
      },
    ]);
  };

  const calcTPC = () => {
    const awp = validateField("tpc-awp", tpcInputs.awp, "Su Hattı Alanı (Awp)", "m²", 10, 50000, "820");
    const rho = validateField("tpc-rho", tpcInputs.rho, "Su Yoğunluğu", "t/m³", 0.98, 1.03, "1.025");
    if (awp === null || rho === null) return;
    const result = (awp * rho) / 100;
    setTpc(result);
    setTpcSteps([
      {
        step: 1,
        title: "Formül",
        formula: "TPC = (Awp × ρ) / 100",
        explanation: "TPC (Tonnes Per Centimetre), geminin 1 cm batması için gereken ağırlıktır. Su hattı alanı (Awp) ile su yoğunluğunun (ρ) çarpılıp 100'e bölünmesiyle bulunur."
      },
      {
        step: 2,
        title: "Değerlerin yerleştirilmesi",
        formula: "TPC = (Awp × ρ) / 100",
        substitution: `TPC = (${awp.toFixed(2)} × ${rho.toFixed(3)}) / 100`,
        result: `TPC = ${(awp * rho).toFixed(3)} / 100`,
      },
      {
        step: 3,
        title: "Sonuç",
        formula: `TPC = ${(awp * rho).toFixed(3)} / 100`,
        result: `TPC = ${result.toFixed(2)} ton/cm`,
      },
    ]);
  };

  const calcDraftChange = () => {
    const V = validateField("draft-v", draftInputs.volume, "Hacim (V)", "m³", 1, 200000, "3200");
    const awp = validateField("draft-awp", draftInputs.awp, "Su Hattı Alanı (Awp)", "m²", 10, 50000, "850");
    if (V === null || awp === null || awp === 0) return;
    const result = V / awp;
    setDraftChange(result);
    setDraftSteps([
      {
        step: 1,
        title: "Formül",
        formula: "ΔT = V / Awp",
        explanation: "Su çekimi değişimi (ΔT), eklenen/çıkarılan hacmin (V) su hattı alanına (Awp) bölünmesiyle bulunur."
      },
      {
        step: 2,
        title: "Değerlerin yerleştirilmesi",
        formula: "ΔT = V / Awp",
        substitution: `ΔT = ${V.toFixed(2)} / ${awp.toFixed(2)}`,
      },
      {
        step: 3,
        title: "Sonuç",
        formula: `ΔT = ${V.toFixed(2)} / ${awp.toFixed(2)}`,
        result: `ΔT = ${result.toFixed(3)} m`,
      },
    ]);
  };

  const calcLCG = () => {
    let sumW = 0;
    let sumWx = 0;
    const itemDetails: string[] = [];
    for (const it of lcgItems) {
      const w = Number(it.weight);
      const x = Number(it.lcg);
      if (!Number.isNaN(w) && !Number.isNaN(x)) {
        sumW += w; sumWx += w * x;
        itemDetails.push(`${it.name}: ${w.toFixed(2)} t × ${x.toFixed(2)} m = ${(w * x).toFixed(2)} t·m`);
      }
    }
    if (sumW <= 0) return;
    const result = sumWx / sumW;
    setLcgResult(result);
    setLcgSteps([
      {
        step: 1,
        title: "Formül",
        formula: "LCG = ΣW·x / ΣW",
        explanation: "Boyuna ağırlık merkezi (LCG), her bir ağırlığın momentler toplamının toplam ağırlığa bölünmesiyle bulunur."
      },
      {
        step: 2,
        title: "Her bir momenti hesapla (W × x)",
        formula: itemDetails.join("\n"),
      },
      {
        step: 3,
        title: "Toplamları hesapla",
        formula: `ΣW = ${sumW.toFixed(2)} t`,
        substitution: `ΣW·x = ${sumWx.toFixed(2)} t·m`,
      },
      {
        step: 4,
        title: "Sonuç",
        formula: "LCG = ΣW·x / ΣW",
        substitution: `LCG = ${sumWx.toFixed(2)} / ${sumW.toFixed(2)}`,
        result: `LCG = ${result.toFixed(2)} m`,
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Temel Stabilite Hesaplamaları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded bg-muted">
              <h4 className="font-semibold mb-3">KM = KB + BM</h4>
              <div className="grid grid-cols-3 gap-2 items-end">
                <div>
                  <Label>KB (m)</Label>
                  <Input value={kmInputs.kb} onChange={(e)=>setKmInputs(p=>({...p, kb:e.target.value}))} />
                  <InputError message={errors["km-kb"]} />
                </div>
                <div>
                  <Label>BM (m)</Label>
                  <Input value={kmInputs.bm} onChange={(e)=>setKmInputs(p=>({...p, bm:e.target.value}))} />
                  <InputError message={errors["km-bm"]} />
                </div>
                <div className="flex items-end"/>
                <Button className="col-span-3" onClick={calcKM}><Calculator className="h-4 w-4 mr-1"/>Hesapla</Button>
              </div>
              {km!==null && (<div className="mt-2 text-sm">KM = <span className="font-mono">{km.toFixed(3)} m</span></div>)}
              <CalculationSteps steps={kmSteps} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded bg-muted">
              <h4 className="font-semibold mb-3">BM (dikdörtgen yaklaşımı)</h4>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <Label>L (m)</Label>
                  <Input value={bmInputs.length} onChange={(e)=>setBmInputs(p=>({...p, length:e.target.value}))} />
                  <InputError message={errors["bm-l"]} />
                </div>
                <div>
                  <Label>B (m)</Label>
                  <Input value={bmInputs.breadth} onChange={(e)=>setBmInputs(p=>({...p, breadth:e.target.value}))} />
                  <InputError message={errors["bm-b"]} />
                </div>
                <div>
                  <Label>Su Çekimi (m)</Label>
                  <Input value={bmInputs.draft} onChange={(e)=>setBmInputs(p=>({...p, draft:e.target.value}))} />
                  <InputError message={errors["bm-t"]} />
                </div>
                <div>
                  <Label>Cb</Label>
                  <Input value={bmInputs.cb} onChange={(e)=>setBmInputs(p=>({...p, cb:e.target.value}))} />
                  <InputError message={errors["bm-cb"]} />
                </div>
                <Button className="col-span-2" onClick={calcBM}><Calculator className="h-4 w-4 mr-1"/>Hesapla</Button>
              </div>
              {bm!==null && (<div className="mt-2 text-sm">BM = <span className="font-mono">{bm.toFixed(3)} m</span></div>)}
              <CalculationSteps steps={bmSteps} />
            </div>

            <div className="p-4 rounded bg-muted">
              <h4 className="font-semibold mb-3">TPC = Awp × ρ / 100</h4>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <Label>Awp (m²)</Label>
                  <Input value={tpcInputs.awp} onChange={(e)=>setTpcInputs(p=>({...p, awp:e.target.value}))} />
                  <InputError message={errors["tpc-awp"]} />
                </div>
                <div>
                  <Label>ρ (t/m³)</Label>
                  <Input value={tpcInputs.rho} onChange={(e)=>setTpcInputs(p=>({...p, rho:e.target.value}))} />
                  <InputError message={errors["tpc-rho"]} />
                </div>
                <Button className="col-span-2" onClick={calcTPC}><Calculator className="h-4 w-4 mr-1"/>Hesapla</Button>
              </div>
              {tpc!==null && (<div className="mt-2 text-sm">TPC = <span className="font-mono">{tpc.toFixed(2)} ton/cm</span></div>)}
              <CalculationSteps steps={tpcSteps} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded bg-muted">
              <h4 className="font-semibold mb-3">Su çekimi değişimi ΔT = V / Awp</h4>
              <div className="grid grid-cols-2 gap-2 items-end">
                <div>
                  <Label>Hacim V (m³)</Label>
                  <Input value={draftInputs.volume} onChange={(e)=>setDraftInputs(p=>({...p, volume:e.target.value}))} />
                  <InputError message={errors["draft-v"]} />
                </div>
                <div>
                  <Label>Awp (m²)</Label>
                  <Input value={draftInputs.awp} onChange={(e)=>setDraftInputs(p=>({...p, awp:e.target.value}))} />
                  <InputError message={errors["draft-awp"]} />
                </div>
                <Button className="col-span-2" onClick={calcDraftChange}><Calculator className="h-4 w-4 mr-1"/>Hesapla</Button>
              </div>
              {draftChange!==null && (<div className="mt-2 text-sm">ΔT = <span className="font-mono">{draftChange.toFixed(3)} m</span></div>)}
              <CalculationSteps steps={draftSteps} />
            </div>

            <div className="p-4 rounded bg-muted">
              <h4 className="font-semibold mb-3">LCG (∑W·x / ∑W)</h4>
              <div className="space-y-2">
                {lcgItems.map((it, idx)=> (
                  <div key={idx} className="grid grid-cols-3 gap-2">
                    <Input placeholder="Ad" value={it.name} onChange={(e)=>{
                      const c = [...lcgItems]; c[idx] = { ...c[idx], name: e.target.value }; setLcgItems(c);
                    }} />
                    <Input placeholder="Ağırlık (t)" value={it.weight} onChange={(e)=>{
                      const c = [...lcgItems]; c[idx] = { ...c[idx], weight: e.target.value }; setLcgItems(c);
                    }} />
                    <Input placeholder="LCG (m)" value={it.lcg} onChange={(e)=>{
                      const c = [...lcgItems]; c[idx] = { ...c[idx], lcg: e.target.value }; setLcgItems(c);
                    }} />
                  </div>
                ))}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={()=> setLcgItems(p=>[...p, { name: `Item ${p.length+1}`, weight: "", lcg: "" }])}>Satır Ekle</Button>
                  <Button size="sm" onClick={calcLCG}><Calculator className="h-4 w-4 mr-1"/>Hesapla</Button>
                </div>
                {lcgResult!==null && (<div className="text-sm">LCG = <span className="font-mono">{lcgResult.toFixed(2)} m</span></div>)}
                <CalculationSteps steps={lcgSteps} />
              </div>
            </div>
          </div>

          <Separator />
          <div className="text-xs opacity-70">Basit yaklaşımlar kullanılmıştır; ayrıntılı analiz için Gelişmiş sekmesini kullanın.</div>
        </CardContent>
      </Card>
    </div>
  );
};
