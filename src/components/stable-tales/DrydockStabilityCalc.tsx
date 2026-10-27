import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, Anchor, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { StableTalesEngine } from "./StableTalesCalculationEngine";
import { HavuzKritikData } from "./StableTalesTypes";

interface DrydockCalculationResult {
  kritik_gm: number;
  mevcut_gm: number;
  güvenlik_marjı: number;
  kren_momenti: number;
  ortalama_aralik: number;
  maksimum_aralik: number;
  destek_sayisi: number;
  güvenlik_durumu: string;
  güvenlik_rengi: string;
  öneriler: string[];
  gm_orani: number;
}

export const DrydockStabilityCalc = () => {
  const [vesselData, setVesselData] = useState({
    deplasman: 25000,
    km: 8.5,
    kg: 7.2,
    loa: 180,
    boa: 32
  });

  const [drydockData, setDrydockData] = useState<HavuzKritikData>({
    havuz_uzunlugu: 200,
    destek_noktalari: [20, 50, 80, 110, 140, 170],
    kritik_gm: undefined,
    kren_momenti: undefined
  });

  const [results, setResults] = useState<DrydockCalculationResult | null>(null);

  const addSupportPoint = () => {
    setDrydockData(prev => ({
      ...prev,
      destek_noktalari: [...prev.destek_noktalari, 100]
    }));
  };

  const removeSupportPoint = (index: number) => {
    setDrydockData(prev => ({
      ...prev,
      destek_noktalari: prev.destek_noktalari.filter((_, i) => i !== index)
    }));
  };

  const calculateDrydock = () => {
    try {
      const engine = new StableTalesEngine(vesselData.deplasman, vesselData.km, vesselData.kg);
      
      const kritik_gm = engine.havuzda_kritik_gm(drydockData);
      const mevcut_gm = engine.hesapla_gm();
      
      // Calculate support reactions and moments
      const destekAraliklari = [];
      for (let i = 0; i < drydockData.destek_noktalari.length - 1; i++) {
        destekAraliklari.push(drydockData.destek_noktalari[i + 1] - drydockData.destek_noktalari[i]);
      }
      
      const ortalama_aralik = destekAraliklari.reduce((a, b) => a + b, 0) / destekAraliklari.length;
      const maksimum_aralik = Math.max(...destekAraliklari);
      
      // Calculate critical heeling moment
      const kren_momenti = vesselData.deplasman * kritik_gm * 9.81; // kN.m
      
      // Safety assessment
      let güvenlik_durumu = 'Safe';
      let güvenlik_rengi = 'default';
      const öneriler: string[] = [];
      
      if (mevcut_gm >= kritik_gm * 1.5) {
        güvenlik_durumu = 'Very Safe';
        güvenlik_rengi = 'default';
        öneriler.push('The drydocking operation can be carried out safely');
      } else if (mevcut_gm >= kritik_gm) {
        güvenlik_durumu = 'Safe';
        güvenlik_rengi = 'secondary';
        öneriler.push('Careful operation recommended');
      } else {
        güvenlik_durumu = 'Risky';
        güvenlik_rengi = 'destructive';
        öneriler.push('URGENT: measures to increase GM must be taken!');
        öneriler.push('Ballast adjustment required');
      }

      if (maksimum_aralik > vesselData.loa / 4) {
        öneriler.push('Warning: block spacing is too wide, additional support required');
      }

      const calculatedResults = {
        kritik_gm,
        mevcut_gm,
        güvenlik_marjı: mevcut_gm - kritik_gm,
        kren_momenti,
        ortalama_aralik,
        maksimum_aralik,
        destek_sayisi: drydockData.destek_noktalari.length,
        güvenlik_durumu,
        güvenlik_rengi,
        öneriler,
        gm_orani: mevcut_gm / kritik_gm
      };

      setResults(calculatedResults);
      setDrydockData(prev => ({ ...prev, kritik_gm, kren_momenti }));

      if (mevcut_gm >= kritik_gm) {
        toast.success(`Drydocking operation safe: GM = ${mevcut_gm.toFixed(3)}m`);
      } else {
        toast.error(`GM insufficient: critical GM ${kritik_gm.toFixed(3)} m required!`);
      }

    } catch (error) {
      console.error("Drydock calculation error:", error);
      toast.error("An error occurred during the dry-docking calculation!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Gemi Bilgileri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Anchor className="h-5 w-5" />
            Dry Dock Stability Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label>Displacement (tons)</Label>
              <Input
                type="number"
                value={vesselData.deplasman}
                onChange={(e) => setVesselData(prev => ({ ...prev, deplasman: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label>KM (m)</Label>
              <Input
                type="number"
                step="0.01"
                value={vesselData.km}
                onChange={(e) => setVesselData(prev => ({ ...prev, km: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label>KG (m)</Label>
              <Input
                type="number"
                step="0.01"
                value={vesselData.kg}
                onChange={(e) => setVesselData(prev => ({ ...prev, kg: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label>LOA (m)</Label>
              <Input
                type="number"
                value={vesselData.loa}
                onChange={(e) => setVesselData(prev => ({ ...prev, loa: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label>BOA (m)</Label>
              <Input
                type="number"
                value={vesselData.boa}
                onChange={(e) => setVesselData(prev => ({ ...prev, boa: Number(e.target.value) }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Havuz ve Destek Noktaları */}
      <Card>
        <CardHeader>
          <CardTitle>Dock Configuration</CardTitle>
          <Button onClick={addSupportPoint} size="sm">Add Support Point</Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label>Dock Length (m)</Label>
            <Input
              type="number"
              value={drydockData.havuz_uzunlugu}
              onChange={(e) => setDrydockData(prev => ({ ...prev, havuz_uzunlugu: Number(e.target.value) }))}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Support Points (distance from stern - m)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {drydockData.destek_noktalari.map((nokta, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Distance (m)"
                    value={nokta}
                    onChange={(e) => {
                      const newNoktalari = [...drydockData.destek_noktalari];
                      newNoktalari[index] = Number(e.target.value);
                      setDrydockData(prev => ({ ...prev, destek_noktalari: newNoktalari }));
                    }}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeSupportPoint(index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={calculateDrydock} className="w-full mt-4">
            <Calculator className="mr-2 h-4 w-4" />
            Perform Dry-Docking Stability Analysis
          </Button>
        </CardContent>
      </Card>

      {/* Sonuçlar */}
      {results && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {results.güvenlik_durumu === 'Very Safe' || results.güvenlik_durumu === 'Safe' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                Dry-Docking Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{results.kritik_gm.toFixed(3)}</p>
                  <p className="text-sm text-muted-foreground">Critical GM (m)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">{results.mevcut_gm.toFixed(3)}</p>
                  <p className="text-sm text-muted-foreground">Current GM (m)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{results.güvenlik_marjı.toFixed(3)}</p>
                  <p className="text-sm text-muted-foreground">Margin of Safety (m)</p>
                </div>
                <div className="text-center">
                  <Badge variant={results.güvenlik_rengi === 'destructive' ? 'destructive' : results.güvenlik_rengi === 'secondary' ? 'secondary' : 'default'}>
                    {results.güvenlik_durumu}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">Safety Status</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium mb-2">Support Analysis</h5>
                  <p className="text-sm">Number of Supports: <strong>{results.destek_sayisi}</strong></p>
                  <p className="text-sm">Average Spacing: <strong>{results.ortalama_aralik.toFixed(1)}m</strong></p>
                  <p className="text-sm">Max Spacing: <strong>{results.maksimum_aralik.toFixed(1)}m</strong></p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium mb-2">Stability Values</h5>
                  <p className="text-sm">GM Ratio: <strong>{results.gm_orani.toFixed(2)}</strong></p>
                  <p className="text-sm">Heeling Moment: <strong>{results.kren_momenti.toFixed(0)} kN.m</strong></p>
                  <p className="text-sm">Min GM Ratio: <strong>1.00</strong></p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium mb-2">Dock Parameters</h5>
                  <p className="text-sm">Dock Length: {drydockData.havuz_uzunlugu}m</p>
                  <p className="text-sm">Ship LOA: {vesselData.loa}m</p>
                  <p className="text-sm">BOA: {vesselData.boa}m</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations and Warnings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {results.öneriler.map((öneri: string, index: number) => (
                <div key={index} className="p-3 border rounded-lg">
                  <p className="text-sm">{öneri}</p>
                </div>
              ))}

              <div className="p-4 bg-muted rounded-lg">
                <h5 className="font-medium mb-2">Critical GM Formula:</h5>
                <p className="font-mono text-sm mb-2">
                  GM_critical = 0.05 + (mean_block_spacing / 100)
                </p>
                <p className="text-xs text-muted-foreground">
                  This is a simplified formula. An actual docking calculation requires a structural analysis.
                </p>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">
                  Dry-Docking Safety Protocol:
                </h5>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• If GM &lt; critical GM, dry-docking is PROHIBITED</li>
                  <li>• Support points should be placed at equal intervals</li>
                  <li>• The dock should be pumped out slowly and under control</li>
                  <li>• Stability must be monitored continuously</li>
                  <li>• An emergency plan should be kept ready</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
