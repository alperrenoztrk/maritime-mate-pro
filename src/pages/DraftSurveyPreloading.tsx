import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Calculator, Anchor } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function DraftSurveyPreloading() {
  const { toast } = useToast();
  
  const [inputs, setInputs] = useState({
    drafts: {
      forward: "",
      midship: "",
      aft: ""
    },
    vesselParticulars: {
      lbp: "",
      breadth: "",
      tpc: "",
      displacement: "",
      deadweight: ""
    },
    consumables: {
      fuel: "",
      freshWater: "",
      ballast: "",
      stores: ""
    }
  });

  const [result, setResult] = useState<{
    currentDisplacement: number;
    availableCapacity: number;
    recommendedLoad: number;
    stability: string;
  } | null>(null);

  const calculate = () => {
    const { drafts, vesselParticulars, consumables } = inputs;
    
    if (!drafts.forward || !drafts.midship || !drafts.aft || !vesselParticulars.tpc) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    // Mevcut ortalama draft
    const meanDraft = (parseFloat(drafts.forward) + 4*parseFloat(drafts.midship) + parseFloat(drafts.aft)) / 6;
    
    // TPC ile mevcut deplasman
    const tpc = parseFloat(vesselParticulars.tpc);
    const currentDisplacement = meanDraft * 100 * tpc;
    
    // Consumables toplamı
    const totalConsumables = parseFloat(consumables.fuel || "0") + 
                            parseFloat(consumables.freshWater || "0") + 
                            parseFloat(consumables.ballast || "0") + 
                            parseFloat(consumables.stores || "0");
    
    // Deadweight'ten kullanılabilir kapasite
    const deadweight = parseFloat(vesselParticulars.deadweight || "0");
    const availableCapacity = deadweight - totalConsumables;
    
    // Önerilen yük miktarı (güvenlik faktörü %10)
    const recommendedLoad = availableCapacity * 0.9;
    
    // Stabilite durumu değerlendirmesi
    const trimByHead = parseFloat(drafts.forward) - parseFloat(drafts.aft);
    let stability = "good";
    if (Math.abs(trimByHead) > 2) {
      stability = "Caution - Excessive Trim";
    } else if (Math.abs(trimByHead) > 1) {
      stability = "Moderate - Controlled Trim";
    }

    setResult({
      currentDisplacement,
      availableCapacity,
      recommendedLoad,
      stability
    });

    toast({ title: "Calculation Completed", description: "Checked before loading" });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pre-Loading Check</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Drafts (m)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="forward">Chief Draft</Label>
              <Input
                id="forward"
                type="number"
                step="0.01"
                value={inputs.drafts.forward}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  drafts: { ...prev.drafts, forward: e.target.value }
                }))}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="midship">Medium Draft</Label>
              <Input
                id="midship"
                type="number"
                step="0.01"
                value={inputs.drafts.midship}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  drafts: { ...prev.drafts, midship: e.target.value }
                }))}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="aft">Aft Draft</Label>
              <Input
                id="aft"
                type="number"
                step="0.01"
                value={inputs.drafts.aft}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  drafts: { ...prev.drafts, aft: e.target.value }
                }))}
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ship Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="lbp">LBP (m)</Label>
              <Input
                id="lbp"
                type="number"
                value={inputs.vesselParticulars.lbp}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  vesselParticulars: { ...prev.vesselParticulars, lbp: e.target.value }
                }))}
                placeholder="Length"
              />
            </div>
            <div>
              <Label htmlFor="breadth">Width (m)</Label>
              <Input
                id="breadth"
                type="number"
                value={inputs.vesselParticulars.breadth}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  vesselParticulars: { ...prev.vesselParticulars, breadth: e.target.value }
                }))}
                placeholder="Width"
              />
            </div>
            <div>
              <Label htmlFor="tpc">TPC (ton/cm)</Label>
              <Input
                id="tpc"
                type="number"
                step="0.01"
                value={inputs.vesselParticulars.tpc}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  vesselParticulars: { ...prev.vesselParticulars, tpc: e.target.value }
                }))}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="displacement">Displacement (tons)</Label>
              <Input
                id="displacement"
                type="number"
                value={inputs.vesselParticulars.displacement}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  vesselParticulars: { ...prev.vesselParticulars, displacement: e.target.value }
                }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="deadweight">Deadweight (tons)</Label>
              <Input
                id="deadweight"
                type="number"
                value={inputs.vesselParticulars.deadweight}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  vesselParticulars: { ...prev.vesselParticulars, deadweight: e.target.value }
                }))}
                placeholder="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Consumables (tons)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="fuel">fuel</Label>
              <Input
                id="fuel"
                type="number"
                value={inputs.consumables.fuel}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  consumables: { ...prev.consumables, fuel: e.target.value }
                }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="freshWater">Fresh Water</Label>
              <Input
                id="freshWater"
                type="number"
                value={inputs.consumables.freshWater}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  consumables: { ...prev.consumables, freshWater: e.target.value }
                }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="ballast">Ballast</Label>
              <Input
                id="ballast"
                type="number"
                value={inputs.consumables.ballast}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  consumables: { ...prev.consumables, ballast: e.target.value }
                }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="stores">Rations</Label>
              <Input
                id="stores"
                type="number"
                value={inputs.consumables.stores}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  consumables: { ...prev.consumables, stores: e.target.value }
                }))}
                placeholder="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={calculate} className="w-full" size="lg">
        <Calculator className="h-4 w-4 mr-2" />
        Check
      </Button>

      {result && (
        <Card className="bg-green-50 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Pre-Loading Check Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p><strong>Current Displacement:</strong> {result.currentDisplacement.toFixed(2)} ton</p>
                <p><strong>Available Capacity:</strong> {result.availableCapacity.toFixed(2)} ton</p>
              </div>
              <div className="space-y-2">
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  <strong>Recommended Load:</strong> {result.recommendedLoad.toFixed(2)} ton
                </p>
                <p><strong>Stability Status:</strong> {result.stability}</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white dark:bg-gray-600 rounded">
              <p className="text-sm text-muted-foreground">
                * Recommended cargo quantity is calculated with a 10% safety factor
              </p>
              <p className="text-sm text-muted-foreground">
                * Check trim and stability before loading
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}