import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Building, BarChart3, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { CalculationStep } from "@/types/calculationSteps";
import { CalculationSteps } from "@/components/ui/calculation-steps";

interface StructuralData {
  // Ship dimensions
  L: number; // Ship length (m)
  B: number; // Breadth (m)
  D: number; // Depth (m)
  T: number; // Draft (m)
  
  // Material properties
  steelYieldStrength: number; // N/mm² (typical 235-355)
  elasticModulus: number; // N/mm² (typically 206000)
  plateThickness: number; // mm
  
  // Loading conditions
  deadweight: number; // tonnes
  displacement: number; // tonnes
  cargoDistribution: 'uniform' | 'concentrated' | 'partial';
  
  // Section properties
  sectionModulus: number; // cm³
  momentOfInertia: number; // cm⁴
}

interface LoadPoint {
  position: number; // Distance from AP (m)
  weight: number; // tonnes
  type: 'cargo' | 'ballast' | 'fuel' | 'structure';
}

interface StructuralResult {
  maxSaggingMoment: number; // kN.m
  maxHoggingMoment: number; // kN.m
  maxShearForce: number; // kN
  maxBendingStress: number; // N/mm²
  maxShearStress: number; // N/mm²
  deflection: number; // mm
  safetyFactor: number;
  status: 'safe' | 'marginal' | 'unsafe';
  criticalSection: number; // Position (m)
  recommendations: string[];
}

interface ShearBendingPoint {
  position: number; // m from AP
  shearForce: number; // kN
  bendingMoment: number; // kN.m
}

export const StructuralCalculations = ({ initialTab }: { initialTab?: string } = {}) => {
  const { toast } = useToast();
  
  
  const [structuralData, setStructuralData] = useState<Partial<StructuralData>>({
    elasticModulus: 206000, // Steel E = 206 GPa
    steelYieldStrength: 235, // Mild steel
    plateThickness: 12
  });
  
  const [loadPoints, setLoadPoints] = useState<LoadPoint[]>([
    { position: 20, weight: 1000, type: 'cargo' },
    { position: 40, weight: 800, type: 'ballast' },
    { position: 60, weight: 1200, type: 'cargo' },
    { position: 80, weight: 600, type: 'fuel' },
    { position: 100, weight: 900, type: 'cargo' },
    { position: 120, weight: 700, type: 'ballast' }
  ]);
  
  const [result, setResult] = useState<StructuralResult | null>(null);
  const [shearBendingData, setShearBendingData] = useState<ShearBendingPoint[]>([]);
  const [activeTab, setActiveTab] = useState(initialTab || "loads");
  const [calcSteps, setCalcSteps] = useState<Record<string, CalculationStep[]>>({});

  // Calculate distributed weight (ship's own weight)
  const calculateDistributedWeight = (L: number, displacement: number): number => {
    // Assume ship's structural weight is distributed uniformly
    const structuralWeight = displacement * 0.3; // Approximately 30% of displacement
    return structuralWeight / L; // tonnes/m
  };

  // Calculate shear force at any position
  const calculateShearForce = (position: number, L: number, distributedWeight: number): number => {
    let shearForce = 0;
    
    // Add distributed weight effect
    shearForce += distributedWeight * position;
    
    // Add concentrated loads
    loadPoints.forEach(load => {
      if (load.position <= position) {
        shearForce += load.weight;
      }
    });
    
    // Add reaction at AP (assuming simply supported)
    const totalLoad = distributedWeight * L + loadPoints.reduce((sum, load) => sum + load.weight, 0);
    const reactionAP = totalLoad / 2; // Simplified - assuming uniform loading
    shearForce -= reactionAP;
    
    return shearForce;
  };

  // Calculate bending moment at any position
  const calculateBendingMoment = (position: number, L: number, distributedWeight: number): number => {
    let moment = 0;
    
    // Reaction moment at AP
    const totalLoad = distributedWeight * L + loadPoints.reduce((sum, load) => sum + load.weight, 0);
    const reactionAP = totalLoad / 2;
    moment += reactionAP * position;
    
    // Distributed weight moment
    moment -= distributedWeight * position * position / 2;
    
    // Concentrated load moments
    loadPoints.forEach(load => {
      if (load.position <= position) {
        moment -= load.weight * (position - load.position);
      }
    });
    
    return moment;
  };

  // Generate shear force and bending moment diagrams
  const generateShearBendingDiagram = (L: number) => {
    const distributedWeight = calculateDistributedWeight(L, structuralData.displacement || 15000);
    const points: ShearBendingPoint[] = [];
    
    // Calculate at regular intervals
    for (let x = 0; x <= L; x += L / 50) {
      const shearForce = calculateShearForce(x, L, distributedWeight) * 9.81; // Convert to kN
      const bendingMoment = calculateBendingMoment(x, L, distributedWeight) * 9.81; // Convert to kN.m
      
      points.push({
        position: x,
        shearForce,
        bendingMoment
      });
    }
    
    setShearBendingData(points);
    return points;
  };

  // Calculate bending stress
  const calculateBendingStress = (moment: number, sectionModulus: number): number => {
    // σ = M / Z, where M is in kN.m and Z is in cm³
    return (moment * 1000000) / (sectionModulus * 1000); // N/mm²
  };

  // Calculate shear stress (simplified)
  const calculateShearStress = (shearForce: number, webArea: number): number => {
    // τ = Q / A, where Q is in kN and A is in mm²
    return (shearForce * 1000) / webArea; // N/mm²
  };

  // Calculate deflection using Euler-Bernoulli beam theory
  const calculateDeflection = (L: number, E: number, I: number, maxMoment: number): number => {
    // Simplified calculation for maximum deflection
    // δ = 5wL⁴/(384EI) for uniformly distributed load
    const w = (structuralData.displacement || 15000) * 9.81 / (L * 1000); // N/mm
    return (5 * w * Math.pow(L * 1000, 4)) / (384 * E * I * 10000); // mm
  };

  // Main structural calculation
  const calculateStructural = () => {
    if (!structuralData.L || !structuralData.displacement || !structuralData.sectionModulus) {
      toast({
        title: "Eksik Veri",
        description: "Enter the required structural parameters.",
        variant: "destructive"
      });
      return;
    }

    const data = structuralData as StructuralData;
    const points = generateShearBendingDiagram(data.L);
    
    // Find maximum values
    const maxShearForce = Math.max(...points.map(p => Math.abs(p.shearForce)));
    const maxSaggingMoment = Math.max(...points.map(p => p.bendingMoment));
    const maxHoggingMoment = Math.abs(Math.min(...points.map(p => p.bendingMoment)));
    
    // Find critical section
    const criticalPoint = points.reduce((max, point) => 
      Math.abs(point.bendingMoment) > Math.abs(max.bendingMoment) ? point : max
    );
    
    // Calculate stresses
    const maxBendingStress = calculateBendingStress(
      Math.max(maxSaggingMoment, maxHoggingMoment),
      data.sectionModulus
    );
    
    // Estimate web area for shear stress calculation
    const webArea = data.plateThickness * (data.D || 12) * 1000; // mm²
    const maxShearStress = calculateShearStress(maxShearForce, webArea);
    
    // Calculate deflection
    const deflection = calculateDeflection(
      data.L,
      data.elasticModulus,
      data.momentOfInertia || 500000000, // cm⁴
      Math.max(maxSaggingMoment, maxHoggingMoment)
    );
    
    // Safety factor calculation
    const safetyFactor = data.steelYieldStrength / maxBendingStress;
    
    // Status determination
    let status: StructuralResult['status'] = 'safe';
    if (safetyFactor < 1.5) status = 'unsafe';
    else if (safetyFactor < 2.0) status = 'marginal';
    
    // Recommendations
    const recommendations: string[] = [];
    if (safetyFactor < 2.0) {
      recommendations.push("Güvenlik faktörü düşük - yük dağılımını optimize edin");
    }
    if (maxBendingStress > data.steelYieldStrength * 0.8) {
      recommendations.push("Eğilme gerilmesi yüksek - yapısal takviye gerekli");
    }
    if (deflection > data.L * 1000 / 300) {
      recommendations.push("Deformasyon aşırı - rijitlik artırılmalı");
    }
    if (maxShearStress > 100) {
      recommendations.push("Kesme gerilmesi yüksek - web kalınlığı artırın");
    }
    
    const result: StructuralResult = {
      maxSaggingMoment,
      maxHoggingMoment,
      maxShearForce,
      maxBendingStress,
      maxShearStress,
      deflection,
      safetyFactor,
      status,
      criticalSection: criticalPoint.position,
      recommendations
    };
    
    setResult(result);

    // Adim adim hesaplama aciklamasi
    const distributedWeight = calculateDistributedWeight(data.L, data.displacement);
    const structuralWeight = data.displacement * 0.3;
    const totalLoad = distributedWeight * data.L + loadPoints.reduce((sum, load) => sum + load.weight, 0);
    const totalConcentrated = loadPoints.reduce((sum, load) => sum + load.weight, 0);
    const reactionAP = totalLoad / 2;
    const maxMomentVal = Math.max(maxSaggingMoment, maxHoggingMoment);
    const webAreaVal = data.plateThickness * (data.D || 12) * 1000;
    const wVal = data.displacement * 9.81 / (data.L * 1000);
    const I_val = data.momentOfInertia || 500000000;

    const steps: CalculationStep[] = [
      {
        step: 1,
        title: "Yapısal ağırlığın hesaplanması",
        formula: "Wyapisal = Deplasman x 0.30",
        substitution: `Wyapisal = ${data.displacement} x 0.30`,
        result: `Wyapisal = ${structuralWeight.toFixed(1)} ton`,
        explanation: "Geminin yapısal ağırlığı, deplasmanın yaklaşık %30'u olarak kabul edilir."
      },
      {
        step: 2,
        title: "Dağıtılmış ağırlığın hesaplanması",
        formula: "w = Wyapisal / L",
        substitution: `w = ${structuralWeight.toFixed(1)} / ${data.L}`,
        result: `w = ${distributedWeight.toFixed(2)} ton/m`,
        explanation: "Yapısal ağırlık gemi boyunca düzgün dağıtılmış kabul edilir."
      },
      {
        step: 3,
        title: "Toplam yükün hesaplanması",
        formula: "Qtoplam = w x L + Sigma(Pi)",
        substitution: `Qtoplam = ${distributedWeight.toFixed(2)} x ${data.L} + ${totalConcentrated.toFixed(0)}`,
        result: `Qtoplam = ${totalLoad.toFixed(1)} ton`,
        explanation: `The distributed weight (${structuralWeight.toFixed(0)} tonnes) and ${loadPoints.length} point loads (${totalConcentrated.toFixed(0)} tonnes) are summed.`
      },
      {
        step: 4,
        title: "Mesnet tepkisinin hesaplanması (basit mesnetli kiriş)",
        formula: "RAP = Qtoplam / 2",
        substitution: `RAP = ${totalLoad.toFixed(1)} / 2`,
        result: `RAP = ${reactionAP.toFixed(1)} ton`,
        explanation: "Gemi basit mesnetli kiriş olarak modellenir, simetrik yükleme varsayımıyla tepkiler eşit alınır."
      },
      {
        step: 5,
        title: "Maksimum sagging (çökme) momenti",
        formula: "Msagging = max(M(x)) x 9.81",
        substitution: `Msagging = ${(maxSaggingMoment / 9.81).toFixed(0)} x 9.81`,
        result: `Msagging = ${maxSaggingMoment.toFixed(0)} kN.m`,
        explanation: "Gemi boyunca 50 noktada eğilme momenti hesaplanarak en büyük pozitif moment bulunur."
      },
      {
        step: 6,
        title: "Maksimum hogging (kabarma) momenti",
        formula: "Mhogging = |min(M(x))| x 9.81",
        substitution: `Mhogging = |${(maxHoggingMoment / 9.81).toFixed(0)}| x 9.81`,
        result: `Mhogging = ${maxHoggingMoment.toFixed(0)} kN.m`,
        explanation: "Gemi boyunca hesaplanan en büyük negatif moment mutlak değeri alınır."
      },
      {
        step: 7,
        title: "Maksimum kesme kuvvetinin bulunması",
        formula: "Vmax = max(|V(x)|) x 9.81",
        substitution: `Vmax = ${(maxShearForce / 9.81).toFixed(0)} x 9.81`,
        result: `Vmax = ${maxShearForce.toFixed(0)} kN`,
        explanation: "Gemi boyunca 50 noktada kesme kuvveti hesaplanarak en büyük mutlak değer bulunur."
      },
      {
        step: 8,
        title: "Eğilme gerilmesinin hesaplanması",
        formula: "sigma = M / Z = (M x 10^6) / (Z x 10^3)",
        substitution: `sigma = (${maxMomentVal.toFixed(0)} x 10^6) / (${data.sectionModulus} x 10^3)`,
        result: `sigma = ${maxBendingStress.toFixed(1)} N/mm²`,
        explanation: "Birim dönüşümü: M (kN.m -> N.mm) ve Z (cm³ -> mm³) uygulanır."
      },
      {
        step: 9,
        title: "Kesme gerilmesinin hesaplanması",
        formula: "tau = V / Aweb",
        substitution: `tau = (${maxShearForce.toFixed(0)} x 1000) / (${data.plateThickness} x ${((data.D || 12) * 1000).toFixed(0)})`,
        result: `tau = ${maxShearStress.toFixed(1)} N/mm²`,
        explanation: `Web area: A = plate thickness x depth = ${data.plateThickness} x ${((data.D || 12) * 1000).toFixed(0)} = ${webAreaVal.toFixed(0)} mm²`
      },
      {
        step: 10,
        title: "Maksimum deformasyonun hesaplanması (Euler-Bernoulli)",
        formula: "delta = 5wL^4 / (384EI)",
        substitution: `delta = (5 x ${wVal.toFixed(4)} x (${(data.L * 1000).toFixed(0)})^4) / (384 x ${data.elasticModulus} x ${I_val} x 10000)`,
        result: `delta = ${deflection.toFixed(1)} mm`,
        explanation: "Düzgün dağılmış yük altında basit mesnetli kiriş için maksimum sehim formülü kullanılır."
      },
      {
        step: 11,
        title: "Güvenlik faktörünün hesaplanması",
        formula: "SF = sigmay / sigmamax",
        substitution: `SF = ${data.steelYieldStrength} / ${maxBendingStress.toFixed(1)}`,
        result: `SF = ${safetyFactor.toFixed(2)}`,
        explanation: safetyFactor >= 2.0
          ? "Güvenlik faktörü >= 2.0: Yapı güvenli durumda."
          : safetyFactor >= 1.5
            ? "Güvenlik faktörü 1.5 - 2.0 arası: Sınır durumda, dikkat edilmeli."
            : "Güvenlik faktörü < 1.5: Yapı güvensiz, acil önlem gerekli!"
      },
      {
        step: 12,
        title: "Durum değerlendirmesi",
        formula: "SF >= 2.0 -> Güvenli | 1.5 <= SF < 2.0 -> Sınır | SF < 1.5 -> Güvensiz",
        result: `Durum: ${status === 'safe' ? 'GÜVENLİ' : status === 'marginal' ? 'SINIR DURUMDA' : 'GÜVENSİZ'}`,
        explanation: `The critical section is ${criticalPoint.position.toFixed(1)} m from the AP. Permissible deflection = L/300 = ${(data.L * 1000 / 300).toFixed(1)} mm, calculated deflection = ${deflection.toFixed(1)} mm.`
      }
    ];

    setCalcSteps(prev => ({ ...prev, "calculateStructural": steps }));

    toast({
      title: "Structural Analysis Complete",
      description: `Safety Factor: ${safetyFactor.toFixed(2)}`,
      variant: status === 'unsafe' ? "destructive" : "default"
    });
  };

  const addLoadPoint = () => {
    setLoadPoints([...loadPoints, { position: 50, weight: 500, type: 'cargo' }]);
  };

  const updateLoadPoint = <K extends keyof LoadPoint>(index: number, field: K, value: LoadPoint[K]) => {
    const newPoints = [...loadPoints];
    newPoints[index] = { ...newPoints[index], [field]: value };
    setLoadPoints(newPoints);
  };

  const removeLoadPoint = (index: number) => {
    setLoadPoints(loadPoints.filter((_, i) => i !== index));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-500';
      case 'marginal': return 'bg-yellow-500';
      case 'unsafe': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            Yapısal Yük Hesaplamaları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="loads">Yük Dağılımı</TabsTrigger>
              <TabsTrigger value="properties">Yapısal Özellikler</TabsTrigger>
              <TabsTrigger value="analysis">Analiz Sonuçları</TabsTrigger>
              <TabsTrigger value="diagrams">Diyagramlar</TabsTrigger>
            </TabsList>

            <TabsContent value="loads" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="L">Gemi Boyu (L) [m]</Label>
                  <Input
                    id="L"
                    type="number"
                    value={structuralData.L || ''}
                    onChange={(e) => setStructuralData({...structuralData, L: parseFloat(e.target.value)})}
                    placeholder="150"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displacement">Deplasman [ton]</Label>
                  <Input
                    id="displacement"
                    type="number"
                    value={structuralData.displacement || ''}
                    onChange={(e) => setStructuralData({...structuralData, displacement: parseFloat(e.target.value)})}
                    placeholder="15000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargoDistribution">Yük Dağılımı</Label>
                  <select 
                    id="cargoDistribution"
                    className="w-full p-2 border rounded"
                    value={structuralData.cargoDistribution || 'uniform'}
                    onChange={(e) => setStructuralData({...structuralData, cargoDistribution: e.target.value as StructuralData["cargoDistribution"]})}
                  >
                    <option value="uniform">Düzgün Dağılım</option>
                    <option value="concentrated">Yoğunlaşmış</option>
                    <option value="partial">Kısmi Yükleme</option>
                  </select>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Yük Noktaları</h4>
                  <Button onClick={addLoadPoint} variant="outline" size="sm">
                    Yük Noktası Ekle
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {loadPoints.map((load, index) => (
                    <div key={index} className="grid grid-cols-4 gap-3 p-3 border rounded-lg">
                      <div>
                        <Label className="text-xs">Pozisyon (AP'den) [m]</Label>
                        <Input
                          type="number"
                          value={load.position}
                          onChange={(e) => updateLoadPoint(index, 'position', parseFloat(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Ağırlık [ton]</Label>
                        <Input
                          type="number"
                          value={load.weight}
                          onChange={(e) => updateLoadPoint(index, 'weight', parseFloat(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Tür</Label>
                        <select 
                          className="w-full p-1 border rounded text-sm"
                          value={load.type}
                          onChange={(e) => updateLoadPoint(index, 'type', e.target.value as LoadPoint["type"])}
                        >
                          <option value="cargo">Kargo</option>
                          <option value="ballast">Balast</option>
                          <option value="fuel">Yakıt</option>
                          <option value="structure">Yapı</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <Button 
                          onClick={() => removeLoadPoint(index)} 
                          variant="destructive" 
                          size="sm"
                          className="w-full"
                        >
                          Sil
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Malzeme Özellikleri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="steelYieldStrength">Çelik Akma Dayanımı [N/mm²]</Label>
                      <Input
                        id="steelYieldStrength"
                        type="number"
                        value={structuralData.steelYieldStrength || ''}
                        onChange={(e) => setStructuralData({...structuralData, steelYieldStrength: parseFloat(e.target.value)})}
                        placeholder="235"
                      />
                      <div className="text-xs text-muted-foreground">
                        Normal çelik: 235, Yüksek mukavemetli: 355
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="elasticModulus">Elastisite Modülü [N/mm²]</Label>
                      <Input
                        id="elasticModulus"
                        type="number"
                        value={structuralData.elasticModulus || ''}
                        onChange={(e) => setStructuralData({...structuralData, elasticModulus: parseFloat(e.target.value)})}
                        placeholder="206000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plateThickness">Plaka Kalınlığı [mm]</Label>
                      <Input
                        id="plateThickness"
                        type="number"
                        value={structuralData.plateThickness || ''}
                        onChange={(e) => setStructuralData({...structuralData, plateThickness: parseFloat(e.target.value)})}
                        placeholder="12"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Kesit Özellikleri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sectionModulus">Kesit Modülü [cm³]</Label>
                      <Input
                        id="sectionModulus"
                        type="number"
                        value={structuralData.sectionModulus || ''}
                        onChange={(e) => setStructuralData({...structuralData, sectionModulus: parseFloat(e.target.value)})}
                        placeholder="5000000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="momentOfInertia">Atalet Momenti [cm⁴]</Label>
                      <Input
                        id="momentOfInertia"
                        type="number"
                        value={structuralData.momentOfInertia || ''}
                        onChange={(e) => setStructuralData({...structuralData, momentOfInertia: parseFloat(e.target.value)})}
                        placeholder="500000000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="depth">Gemi Derinliği (D) [m]</Label>
                      <Input
                        id="depth"
                        type="number"
                        value={structuralData.D || ''}
                        onChange={(e) => setStructuralData({...structuralData, D: parseFloat(e.target.value)})}
                        placeholder="12"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button onClick={calculateStructural} className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Yapısal Analiz Yap
              </Button>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {result && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Yapısal Analiz Sonuçları
                      <Badge className={getStatusColor(result.status)}>
                        {result.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{result.maxSaggingMoment.toFixed(0)}</div>
                        <div className="text-sm text-muted-foreground">Max Sagging (kN.m)</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{result.maxHoggingMoment.toFixed(0)}</div>
                        <div className="text-sm text-muted-foreground">Max Hogging (kN.m)</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{result.maxShearForce.toFixed(0)}</div>
                        <div className="text-sm text-muted-foreground">Max Kesme (kN)</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">{result.safetyFactor.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Güvenlik Faktörü</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{result.maxBendingStress.toFixed(1)} N/mm²</div>
                        <div className="text-sm text-muted-foreground">Max Eğilme Gerilmesi</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{result.maxShearStress.toFixed(1)} N/mm²</div>
                        <div className="text-sm text-muted-foreground">Max Kesme Gerilmesi</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{result.deflection.toFixed(1)} mm</div>
                        <div className="text-sm text-muted-foreground">Max Deformasyon</div>
                      </div>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm">
                        <strong>Kritik Kesit:</strong> AP'den {result.criticalSection.toFixed(1)}m
                      </div>
                    </div>

                    {result.recommendations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Öneriler</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm">{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <CalculationSteps steps={calcSteps["calculateStructural"] || []} />
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Class Society Standartları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <h4>Yapısal Gereksinimler:</h4>
                    <ul>
                      <li><strong>ABS Rules:</strong> Hull girder ultimate strength</li>
                      <li><strong>DNV GL:</strong> Direct calculation methods</li>
                      <li><strong>Lloyd's Register:</strong> Structural analysis procedures</li>
                      <li><strong>IMO CSR:</strong> Common Structural Rules for tankers</li>
                    </ul>
                    
                    <h4>Güvenlik Faktörleri:</h4>
                    <ul>
                      <li><strong>Minimum:</strong> SF ≥ 1.5 (Ultimate limit state)</li>
                      <li><strong>Önerilen:</strong> SF ≥ 2.0 (Working stress)</li>
                      <li><strong>Fatigue:</strong> SF ≥ 3.0 (Cyclic loading)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="diagrams" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Kesme Kuvveti ve Eğilme Momenti Diyagramları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Kesme Kuvveti Diyagramı</h4>
                      <div className="h-32 border rounded-lg p-4 bg-muted/50">
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          Kesme Kuvveti Grafiği
                          <br />
                          (Chart kütüphanesi ile geliştirilebilir)
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Eğilme Momenti Diyagramı</h4>
                      <div className="h-32 border rounded-lg p-4 bg-muted/50">
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          Eğilme Momenti Grafiği
                          <br />
                          (Chart kütüphanesi ile geliştirilebilir)
                        </div>
                      </div>
                    </div>
                    
                    {shearBendingData.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Kritik Değerler</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Max Pozitif Moment:</strong> 
                            {Math.max(...shearBendingData.map(p => p.bendingMoment)).toFixed(0)} kN.m
                          </div>
                          <div>
                            <strong>Max Negatif Moment:</strong> 
                            {Math.min(...shearBendingData.map(p => p.bendingMoment)).toFixed(0)} kN.m
                          </div>
                          <div>
                            <strong>Max Kesme Kuvveti:</strong> 
                            {Math.max(...shearBendingData.map(p => Math.abs(p.shearForce))).toFixed(0)} kN
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Gerilme Analizi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <h4>Kullanılan Formüller:</h4>
                    <ul>
                      <li><strong>Eğilme Gerilmesi:</strong> σ = M / Z</li>
                      <li><strong>Kesme Gerilmesi:</strong> τ = Q / A</li>
                      <li><strong>Deflection:</strong> δ = 5wL⁴/(384EI)</li>
                      <li><strong>Güvenlik Faktörü:</strong> SF = σy / σmax</li>
                    </ul>
                    
                    <h4>Kritik Kontroller:</h4>
                    <ul>
                      <li>Eğilme gerilmesi {'<'} Akma dayanımı</li>
                      <li>Kesme gerilmesi {'<'} 0.6 × Akma dayanımı</li>
                      <li>Deflection {'<'} L/300 (Comfort kriteri)</li>
                      <li>Güvenlik faktörü ≥ 2.0</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
