import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Droplets, ArrowUpDown, AlertTriangle, CheckCircle, FlaskConical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CalculationSteps } from "@/components/ui/calculation-steps";
import type { CalculationStep } from "@/types/calculationSteps";

interface BallastTank {
  name: string;
  capacity: number; // m³
  currentLevel: number; // %
  LCG: number; // Longitudinal center from AP (m)
  TCG: number; // Transverse center from CL (m)
  VCG: number; // Vertical center from baseline (m)
  pumpRate: number; // m³/hour
}

interface BallastOperation {
  tankFrom: string;
  tankTo: string;
  volume: number; // m³
  duration: number; // hours
  purpose: 'trim' | 'stability' | 'draft' | 'list';
}

interface BallastResult {
  newTrim: number;
  newList: number;
  newGM: number;
  newDraft: number;
  pumpingTime: number;
  stabilityStatus: 'improved' | 'neutral' | 'degraded';
  freeSurfaceEffect: number;
  ballastExchangeCompliance: boolean;
  recommendations: string[];
}

interface BWMCCompliance {
  exchangeRequired: boolean;
  treatmentRequired: boolean;
  ballastWaterRecord: boolean;
  portStateCompliance: boolean;
  dischargeStandard: {
    organism_10_50_microns: number; // org/m³
    organism_50_microns_plus: number; // org/ml
    vibrio_cholerae: number; // cfu/100ml
    escherichia_coli: number; // cfu/100ml
    intestinal_enterococci: number; // cfu/100ml
  };
}

export const BallastCalculations = ({ initialTab }: { initialTab?: string } = {}) => {
  const { toast } = useToast();
  
  
  const [ballastTanks, setBallastTanks] = useState<BallastTank[]>([
    { name: "No.1 DB Port", capacity: 450, currentLevel: 85, LCG: 120, TCG: -8, VCG: 2.5, pumpRate: 150 },
    { name: "No.1DB Starboard", capacity: 450, currentLevel: 85, LCG: 120, TCG: 8, VCG: 2.5, pumpRate: 150 },
    { name: "No.2 DB Port", capacity: 380, currentLevel: 70, LCG: 90, TCG: -9, VCG: 2.8, pumpRate: 120 },
    { name: "No.2 DB Starboard", capacity: 380, currentLevel: 70, LCG: 90, TCG: 9, VCG: 2.8, pumpRate: 120 },
    { name: "Fore Peak", capacity: 200, currentLevel: 95, LCG: 135, TCG: 0, VCG: 4.0, pumpRate: 80 },
    { name: "Aft Peak", capacity: 180, currentLevel: 90, LCG: 8, TCG: 0, VCG: 3.5, pumpRate: 80 }
  ]);
  
  const [operation, setOperation] = useState<Partial<BallastOperation>>({});
  const [result, setResult] = useState<BallastResult | null>(null);
  const [bwmcData, setBwmcData] = useState<Partial<BWMCCompliance>>({});
  const [activeTab, setActiveTab] = useState(initialTab || "tanks");
  const [calcSteps, setCalcSteps] = useState<Record<string, CalculationStep[]>>({});

  // Calculate total ballast weight
  const calculateTotalBallast = (): number => {
    return ballastTanks.reduce((total, tank) => {
      return total + (tank.capacity * tank.currentLevel / 100 * 1.025); // 1.025 = seawater density
    }, 0);
  };

  // Calculate ballast center of gravity
  const calculateBallastCG = () => {
    let totalMomentLCG = 0;
    let totalMomentTCG = 0;
    let totalMomentVCG = 0;
    let totalWeight = 0;

    ballastTanks.forEach(tank => {
      const weight = tank.capacity * tank.currentLevel / 100 * 1.025;
      totalMomentLCG += weight * tank.LCG;
      totalMomentTCG += weight * tank.TCG;
      totalMomentVCG += weight * tank.VCG;
      totalWeight += weight;
    });

    return {
      LCG: totalWeight > 0 ? totalMomentLCG / totalWeight : 0,
      TCG: totalWeight > 0 ? totalMomentTCG / totalWeight : 0,
      VCG: totalWeight > 0 ? totalMomentVCG / totalWeight : 0
    };
  };

  // Calculate free surface effect for partially filled tanks
  const calculateFreeSurfaceEffect = (): number => {
    let totalFSM = 0; // Free surface moment

    ballastTanks.forEach(tank => {
      // Only partially filled tanks have free surface effect
      if (tank.currentLevel > 5 && tank.currentLevel < 95) {
        // Simplified calculation - assuming rectangular tank
        const tankLength = Math.sqrt(tank.capacity / 12); // Estimated
        const tankBreadth = Math.sqrt(tank.capacity / 12); // Estimated
        const fsMoment = (tankLength * Math.pow(tankBreadth, 3)) / 12;
        totalFSM += fsMoment * 1.025; // Including density
      }
    });

    // Convert to FSC (Free Surface Correction)
    const displacement = 15000; // Assumed displacement
    return totalFSM / displacement;
  };

  // Ballast transfer calculation
  const calculateBallastTransfer = () => {
    if (!operation.tankFrom || !operation.tankTo || !operation.volume) {
      toast({
        title: "Missing Data",
        description: "Enter transfer details.",
        variant: "destructive"
      });
      return;
    }

    const fromTank = ballastTanks.find(t => t.name === operation.tankFrom);
    const toTank = ballastTanks.find(t => t.name === operation.tankTo);

    if (!fromTank || !toTank) return;

    // Calculate new tank levels
    const transferWeight = operation.volume * 1.025; // tonnes
    const fromVolumeChange = operation.volume;
    const toVolumeChange = operation.volume;

    const newFromLevel = fromTank.currentLevel - (fromVolumeChange / fromTank.capacity * 100);
    const newToLevel = toTank.currentLevel + (toVolumeChange / toTank.capacity * 100);

    if (newFromLevel < 0 || newToLevel > 100) {
      toast({
        title: "Invalid Transfer",
        description: "Tank capacities are exceeded.",
        variant: "destructive"
      });
      return;
    }

    // Calculate effects on trim and list
    const momentLCG = transferWeight * (toTank.LCG - fromTank.LCG);
    const momentTCG = transferWeight * (toTank.TCG - fromTank.TCG);
    
    // Simplified calculations
    const displacement = 15000; // tonnes
    const GML = 120; // Longitudinal metacentric height (m)
    const GMT = 1.2; // Transverse metacentric height (m)
    
    const trimChange = momentLCG / (displacement * GML / 100); // cm
    const listChange = momentTCG / (displacement * GMT) * (180 / Math.PI); // degrees

    // Calculate pumping time
    const pumpingTime = operation.volume / Math.min(fromTank.pumpRate, toTank.pumpRate);

    // Free surface effect
    const freeSurfaceEffect = calculateFreeSurfaceEffect();

    // Status determination
    let stabilityStatus: BallastResult['stabilityStatus'] = 'neutral';
    if (Math.abs(listChange) < 0.5 && Math.abs(trimChange) < 20) {
      stabilityStatus = 'improved';
    } else if (Math.abs(listChange) > 2 || Math.abs(trimChange) > 50) {
      stabilityStatus = 'degraded';
    }

    // BWMC Compliance check
    const ballastExchangeCompliance = checkBWMCCompliance();

    // Recommendations
    const recommendations: string[] = [];
    if (Math.abs(listChange) > 1) {
      recommendations.push("Extreme list - balancing tanks against broadside");
    }
    if (Math.abs(trimChange) > 30) {
      recommendations.push("Trim variation high - longitudinal balancing required");
    }
    if (freeSurfaceEffect > 0.3) {
      recommendations.push("High free surface effect - fill tanks fully");
    }
    if (!ballastExchangeCompliance) {
      recommendations.push("Check BWM Convention compliance");
    }

    const result: BallastResult = {
      newTrim: trimChange / 100, // convert to meters
      newList: listChange,
      newGM: 1.2 - freeSurfaceEffect, // Simplified
      newDraft: 8.5, // Assumed
      pumpingTime,
      stabilityStatus,
      freeSurfaceEffect,
      ballastExchangeCompliance,
      recommendations
    };

    setResult(result);

    // Adım adım hesaplama açıklaması oluştur
    const steps: CalculationStep[] = [
      {
        step: 1,
        title: "Transfer weight calculation",
        formula: "Wtransfer = V × ρ",
        substitution: `Wtransfer = ${operation.volume} × 1.025`,
        result: `Wtransfer = ${transferWeight.toFixed(3)} ton`,
        explanation: "The weight of water transferred is the volume multiplied by the density of seawater"
      },
      {
        step: 2,
        title: "Resource tank new level",
        formula: "Seviyeyeni = Seviyeeski - (Vtransfer / Kapasite × 100)",
        substitution: `Seviyeyeni = ${fromTank.currentLevel} - (${operation.volume} / ${fromTank.capacity} × 100)`,
        result: `Seviyeyeni = ${newFromLevel.toFixed(1)}%`,
        explanation: `${fromTank.name} tank level after transfer`
      },
      {
        step: 3,
        title: "Target tank new level",
        formula: "Seviyeyeni = Seviyeeski + (Vtransfer / Kapasite × 100)",
        substitution: `Seviyeyeni = ${toTank.currentLevel} + (${operation.volume} / ${toTank.capacity} × 100)`,
        result: `Seviyeyeni = ${newToLevel.toFixed(1)}%`,
        explanation: `${toTank.name} tank level after transfer`
      },
      {
        step: 4,
        title: "Longitudinal moment change (Trim moment)",
        formula: "MLCG = Wtransfer × (LCGhedef - LCGkaynak)",
        substitution: `MLCG = ${transferWeight.toFixed(3)} × (${toTank.LCG} - ${fromTank.LCG})`,
        result: `MLCG = ${momentLCG.toFixed(3)} t·m`,
        explanation: "Moment due to longitudinal center of gravity difference"
      },
      {
        step: 5,
        title: "Transverse moment change (List moment)",
        formula: "MTCG = Wtransfer × (TCGhedef - TCGkaynak)",
        substitution: `MTCG = ${transferWeight.toFixed(3)} × (${toTank.TCG} - ${fromTank.TCG})`,
        result: `MTCG = ${momentTCG.toFixed(3)} t·m`,
        explanation: "Moment due to transverse center of gravity difference"
      },
      {
        step: 6,
        title: "Trim change calculation",
        formula: "ΔTrim = MLCG / (Δ × GML / 100)",
        substitution: `ΔTrim = ${momentLCG.toFixed(3)} / (${displacement} × ${GML} / 100)`,
        result: `ΔTrim = ${trimChange.toFixed(3)} cm = ${(trimChange / 100).toFixed(3)} m`,
        explanation: "Δ = displacement, GML = longitudinal metacentric height"
      },
      {
        step: 7,
        title: "List exchange account",
        formula: "ΔList = MTCG / (Δ × GMT) × (180/π)",
        substitution: `ΔList = ${momentTCG.toFixed(3)} / (${displacement} × ${GMT}) × ${(180 / Math.PI).toFixed(4)}`,
        result: `ΔList = ${listChange.toFixed(3)}°`,
        explanation: "GMT = transverse metacentric height, result converted to degrees"
      },
      {
        step: 8,
        title: "Pumping time calculation",
        formula: "t = V / min(Qkaynak, Qhedef)",
        substitution: `t = ${operation.volume} / min(${fromTank.pumpRate}, ${toTank.pumpRate})`,
        result: `t = ${pumpingTime.toFixed(2)} clock`,
        explanation: "Based on the lower of the pump capacity of the two tanks"
      },
      {
        step: 9,
        title: "Free surface correction (FSC)",
        formula: "FSC = Σ(ρ × l × b³ / 12) / Δ",
        substitution: `FSC = Σ(FSM) / ${displacement}`,
        result: `FSC = ${freeSurfaceEffect.toFixed(4)} m`,
        explanation: "Effect of liquid movement on stability in partially filled tanks (levels between 5% and 95%)"
      },
      {
        step: 10,
        title: "Corrected GM account",
        formula: "GMcorrected = GM₀ - FSC",
        substitution: `GMcorrected = ${GMT} - ${freeSurfaceEffect.toFixed(4)}`,
        result: `GMcorrected = ${(GMT - freeSurfaceEffect).toFixed(3)} m`,
        explanation: "The corrected metacentric height is found by subtracting the free surface effect."
      }
    ];

    setCalcSteps(prev => ({...prev, "ballastTransfer": steps}));

    toast({
      title: "Ballast Transfer Calculated",
      description: `Transfer time: ${pumpingTime.toFixed(1)} clock`,
      variant: stabilityStatus === 'degraded' ? "destructive" : "default"
    });
  };

  // Check BWMC compliance
  const checkBWMCCompliance = (): boolean => {
    // Simplified compliance check
    const hasExchangeRecord = bwmcData.ballastWaterRecord || false;
    const hasTreatmentSystem = bwmcData.treatmentRequired || false;
    
    return hasExchangeRecord && hasTreatmentSystem;
  };

  const updateTankLevel = (tankName: string, newLevel: number) => {
    setBallastTanks(prev => prev.map(tank => 
      tank.name === tankName ? { ...tank, currentLevel: newLevel } : tank
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'improved': return 'bg-green-500';
      case 'neutral': return 'bg-blue-500';
      case 'degraded': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-6 w-6" />
            Ballast Calculations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tanks">Tank Status</TabsTrigger>
              <TabsTrigger value="operations">Transfer Transactions</TabsTrigger>
              <TabsTrigger value="exchange">Ballast Change</TabsTrigger>
              <TabsTrigger value="compliance">BWMC Eligibility</TabsTrigger>
            </TabsList>

            <TabsContent value="tanks" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {ballastTanks.map((tank, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{tank.name}</CardTitle>
                      <CardDescription>
                        Capacity: {tank.capacity}m³ | Pump: {tank.pumpRate}m³/h
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <Label htmlFor={`level-${index}`}>Level (%)</Label>
                          <Input
                            id={`level-${index}`}
                            type="number"
                            min="0"
                            max="100"
                            value={tank.currentLevel}
                            onChange={(e) => updateTankLevel(tank.name, parseFloat(e.target.value))}
                          />
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="text-sm font-bold">
                            {(tank.capacity * tank.currentLevel / 100).toFixed(0)}m³
                          </div>
                          <div className="text-xs text-muted-foreground">Available Volume</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="text-sm font-bold">
                            {(tank.capacity * tank.currentLevel / 100 * 1.025).toFixed(0)}t
                          </div>
                          <div className="text-xs text-muted-foreground">Weight</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="text-sm font-bold">LCG: {tank.LCG}m</div>
                          <div className="text-xs text-muted-foreground">TCG: {tank.TCG}m</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="text-sm font-bold">VCG: {tank.VCG}m</div>
                          <div className="text-xs text-muted-foreground">
                            {tank.currentLevel > 5 && tank.currentLevel < 95 ? "FS Yes" : "No FS"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Total Ballast Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{calculateTotalBallast().toFixed(0)}t</div>
                      <div className="text-sm text-muted-foreground">Total Ballast</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{calculateBallastCG().LCG.toFixed(1)}m</div>
                      <div className="text-sm text-muted-foreground">Ballast LCG</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{calculateBallastCG().TCG.toFixed(2)}m</div>
                      <div className="text-sm text-muted-foreground">Ballast TCG</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{calculateFreeSurfaceEffect().toFixed(3)}m</div>
                      <div className="text-sm text-muted-foreground">Free Surface Effect</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpDown className="h-5 w-5" />
                    Ballast Transfer Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tankFrom">Source Tank</Label>
                      <select 
                        id="tankFrom"
                        className="w-full p-2 border rounded"
                        value={operation.tankFrom || ''}
                        onChange={(e) => setOperation({...operation, tankFrom: e.target.value})}
                      >
                        <option value="">Select Tank</option>
                        {ballastTanks.map(tank => (
                          <option key={tank.name} value={tank.name}>
                            {tank.name} ({tank.currentLevel.toFixed(0)}%)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tankTo">Target Tank</Label>
                      <select 
                        id="tankTo"
                        className="w-full p-2 border rounded"
                        value={operation.tankTo || ''}
                        onChange={(e) => setOperation({...operation, tankTo: e.target.value})}
                      >
                        <option value="">Select Tank</option>
                        {ballastTanks.map(tank => (
                          <option key={tank.name} value={tank.name}>
                            {tank.name} ({tank.currentLevel.toFixed(0)}%)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="volume">Transfer Volume [m³]</Label>
                      <Input
                        id="volume"
                        type="number"
                        value={operation.volume || ''}
                        onChange={(e) => setOperation({...operation, volume: parseFloat(e.target.value)})}
                        placeholder="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Transfer Purpose</Label>
                      <select 
                        id="purpose"
                        className="w-full p-2 border rounded"
                        value={operation.purpose || ''}
                        onChange={(e) => setOperation({...operation, purpose: e.target.value as BallastOperation["purpose"]})}
                      >
                        <option value="">Select Purpose</option>
                        <option value="trim">Trim Correction</option>
                        <option value="stability">Stability Increase</option>
                        <option value="draft">Draft Adjustment</option>
                        <option value="list">List Correction</option>
                      </select>
                    </div>
                  </div>

                  <Button onClick={calculateBallastTransfer} className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Calculate Transfer
                  </Button>

                  {result && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Transfer Results
                          <Badge className={getStatusColor(result.stabilityStatus)}>
                            {result.stabilityStatus.toUpperCase()}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold">
                              {result.newTrim > 0 ? '+' : ''}{result.newTrim.toFixed(3)}m
                            </div>
                            <div className="text-sm text-muted-foreground">Trim Change</div>
                          </div>
                          <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold">
                              {result.newList > 0 ? '+' : ''}{result.newList.toFixed(2)}°
                            </div>
                            <div className="text-sm text-muted-foreground">List Change</div>
                          </div>
                          <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold">{result.pumpingTime.toFixed(1)}h</div>
                            <div className="text-sm text-muted-foreground">Pumping Time</div>
                          </div>
                          <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold">{result.newGM.toFixed(3)}m</div>
                            <div className="text-sm text-muted-foreground">New GM</div>
                          </div>
                        </div>

                        {result.recommendations.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Suggestions</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {result.recommendations.map((rec, index) => (
                                <li key={index} className="text-sm">{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <CalculationSteps steps={calcSteps["ballastTransfer"] || []} />
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exchange" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ballast Water Change</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-info-muted rounded-lg">
                    <h4 className="font-semibold text-info-muted-foreground mb-2">BWM Convention Requirements</h4>
                    <ul className="text-sm text-info-muted-foreground space-y-1">
                      <li>• Ballast change from shore {'>'} 200 nm away</li>
                      <li>• Water depth {'>'} 200 meters</li>
                      <li>• 95% volumetric change minimum</li>
                      <li>• Pumping rate {'>'} 3 times tank volume</li>
                      <li>• Ballast Water Record Book registration is mandatory</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold">200+ nm</div>
                      <div className="text-sm text-muted-foreground">Distance from Shore</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold">200+ m</div>
                      <div className="text-sm text-muted-foreground">Water Depth</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold">95%</div>
                      <div className="text-sm text-muted-foreground">Min. Change</div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Exchange Methods</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded">
                        <h5 className="font-medium">Sequential Method</h5>
                        <p className="text-sm text-muted-foreground">
                          The tank is first emptied, then new water is taken in. Safe but slow.
                        </p>
                      </div>
                      <div className="p-3 border rounded">
                        <h5 className="font-medium">Flow-through Method</h5>
                        <p className="text-sm text-muted-foreground">
                          Giving and receiving at the same time. Fast but pay attention to stability.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5" />
                    BWMC Compliance and Discharge Standards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">System Requirements</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            checked={bwmcData.exchangeRequired || false}
                            onChange={(e) => setBwmcData({...bwmcData, exchangeRequired: e.target.checked})}
                          />
                          <span className="text-sm">Ballast change was made</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            checked={bwmcData.treatmentRequired || false}
                            onChange={(e) => setBwmcData({...bwmcData, treatmentRequired: e.target.checked})}
                          />
                          <span className="text-sm">BWM system available</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            checked={bwmcData.ballastWaterRecord || false}
                            onChange={(e) => setBwmcData({...bwmcData, ballastWaterRecord: e.target.checked})}
                          />
                          <span className="text-sm">BWR Book is up to date</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            checked={bwmcData.portStateCompliance || false}
                            onChange={(e) => setBwmcData({...bwmcData, portStateCompliance: e.target.checked})}
                          />
                          <span className="text-sm">Port State Control suitable</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Discharge Standards (D-2)</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-muted rounded">
                          <span>Organisms ≥10-50 μm:</span>
                          <span>&lt;10 organizma/m³</span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted rounded">
                          <span>Organisms ≥50 μm:</span>
                          <span>&lt;10 organizma/ml</span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted rounded">
                          <span>Vibrio cholerae:</span>
                          <span>&lt;1 cfu/100ml</span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted rounded">
                          <span>Escherichia coli:</span>
                          <span>&lt;250 cfu/100ml</span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted rounded">
                          <span>Intestinal Enterococci:</span>
                          <span>&lt;100 cfu/100ml</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">BWM System Types</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-700">
                      <div>
                        <strong>UV Treatment</strong>
                        <p>Disinfection with ultraviolet light</p>
                      </div>
                      <div>
                        <strong>Electrolysis</strong>
                        <p>Production of active chlorine by electrolysis</p>
                      </div>
                      <div>
                        <strong>Ozonation</strong>
                        <p>Sterilization with ozone gas</p>
                      </div>
                    </div>
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
