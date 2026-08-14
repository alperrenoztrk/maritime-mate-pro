import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fuel, Container, Ship, Truck } from "lucide-react";
import type { CalculationStep } from "@/types/calculationSteps";
import { CalculationSteps } from "@/components/ui/calculation-steps";

interface TankerOperationResult {
  tankVolume: number;
  cowTime: number;
  inertGasRequired: number;
  tankPressure: number;
  pressureStatus: "safe" | "caution" | "critical";
  safetyNote: string;
}

interface LngBoilOffResult {
  tankCapacity: number;
  dailyBoilOffRate: number;
  voyageDays: number;
  totalBoilOff: number;
  remainingCargo: number;
  lossPercentage: number;
  status: "excellent" | "good" | "acceptable" | "excessive";
}

interface ContainerStackResult {
  containerWeight: number;
  stackHeight: number;
  totalStackWeight: number;
  weightPerUnit: number;
  deckCapacity: number;
  safetyFactor: number;
  maxSafeHeight: number;
  status: "safe" | "caution" | "dangerous";
  recommendation: string;
}

interface RoroAxleResult {
  vehicleWeight: number;
  axleNumber: number;
  axleLoad: number;
  deckLoadLimit: number;
  totalPressure: number;
  safetyMargin: number;
  status: "safe" | "overload";
  recommendation: string;
}

export const SpecialShipCalculations = ({ initialTab }: { initialTab?: string } = {}) => {
  const [calcSteps, setCalcSteps] = useState<Record<string, CalculationStep[]>>({});

  // Tanker - COW and Inert Gas
  const [cargoTankVolume, setCargoTankVolume] = useState("");
  const [cowRate, setCowRate] = useState("");
  const [tankPressure, setTankPressure] = useState("");
  const [tankerResult, setTankerResult] = useState<TankerOperationResult | null>(null);

  // LNG - Boil-off Rate
  const [lngTankCapacity, setLngTankCapacity] = useState("");
  const [boilOffRate, setBoilOffRate] = useState("");
  const [voyageDuration, setVoyageDuration] = useState("");
  const [lngResult, setLngResult] = useState<LngBoilOffResult | null>(null);

  // Container - Stack Weight
  const [containerWeight, setContainerWeight] = useState("");
  const [stackHeight, setStackHeight] = useState("");
  const [deckCapacity, setDeckCapacity] = useState("");
  const [containerResult, setContainerResult] = useState<ContainerStackResult | null>(null);

  // Ro-Ro - Axle Load
  const [vehicleWeight, setVehicleWeight] = useState("");
  const [axleNumber, setAxleNumber] = useState("");
  const [deckLoadLimit, setDeckLoadLimit] = useState("");
  const [roroResult, setRoroResult] = useState<RoroAxleResult | null>(null);

  const calculateTankerOperations = () => {
    const volume = parseFloat(cargoTankVolume);
    const rate = parseFloat(cowRate);
    const pressure = parseFloat(tankPressure);
    
    if (isNaN(volume) || isNaN(rate) || isNaN(pressure)) return;

    const cowTime = volume / rate; // hours
    const inertGasRequired = volume * 1.05; // 5% excess
    const pressureStatus = pressure < 0.014 ? 'safe' : pressure < 0.02 ? 'caution' : 'critical';

    setTankerResult({
      tankVolume: volume,
      cowTime,
      inertGasRequired,
      tankPressure: pressure,
      pressureStatus,
      safetyNote: pressureStatus === 'safe' ? 'Safe pressure level' :
                  pressureStatus === 'caution' ? 'Caution - pressure rising' :
                  'Critical pressure - urgent intervention required'
    });
    setCalcSteps(prev => ({ ...prev, tanker: [
      { step: 1, title: "COW time calculation", formula: "COW Time = Tank Volume / COW Ratio", substitution: `COW = ${volume.toFixed(1)} / ${rate.toFixed(1)}`, result: `COW Duration = ${cowTime.toFixed(1)} clock` },
      { step: 2, title: "Inert gas requirement", formula: "Inert Gas = Tank Volume × 1.05 (5% excess)", substitution: `Inert Gas = ${volume.toFixed(1)} × 1.05`, result: `Inert Gas = ${inertGasRequired.toFixed(0)} m³` },
      { step: 3, title: "Pressure control", formula: "P < 0.014 bar → Safe, P < 0.02 → Caution, P ≥ 0.02 → Critical", result: `P = ${pressure} bar → ${pressureStatus}` },
    ] }));
  };

  const calculateLNGBoilOff = () => {
    const capacity = parseFloat(lngTankCapacity);
    const dailyBoilOff = parseFloat(boilOffRate);
    const duration = parseFloat(voyageDuration);
    
    if (isNaN(capacity) || isNaN(dailyBoilOff) || isNaN(duration)) return;

    const totalBoilOff = (dailyBoilOff / 100) * capacity * duration;
    const remainingCargo = capacity - totalBoilOff;
    const lossPercentage = (totalBoilOff / capacity) * 100;

    setLngResult({
      tankCapacity: capacity,
      dailyBoilOffRate: dailyBoilOff,
      voyageDays: duration,
      totalBoilOff,
      remainingCargo,
      lossPercentage,
      status: lossPercentage < 2 ? 'excellent' :
              lossPercentage < 5 ? 'good' :
              lossPercentage < 10 ? 'acceptable' : 'excessive'
    });
    setCalcSteps(prev => ({ ...prev, lng: [
      { step: 1, title: "Formula", formula: "Total Loss = (Daily Boil-off% / 100) × Capacity × Day", explanation: "LNG evaporation loss calculation" },
      { step: 2, title: "Placement of values", formula: `Loss = (${dailyBoilOff} / 100) × ${capacity.toFixed(1)} × ${duration}`, result: `Total Loss = ${totalBoilOff.toFixed(1)} m³` },
      { step: 3, title: "Kalan kargo", formula: "Remaining = Capacity - Total Loss", substitution: `Kalan = ${capacity.toFixed(1)} - ${totalBoilOff.toFixed(1)}`, result: `Kalan Kargo = ${remainingCargo.toFixed(1)} m³` },
      { step: 4, title: "Loss percentage", formula: "Loss% = (Total Loss/Capacity) × 100", substitution: `Loss% = (${totalBoilOff.toFixed(1)} / ${capacity.toFixed(1)}) × 100`, result: `Loss = %${lossPercentage.toFixed(2)}` },
    ] }));
  };

  const calculateContainerStack = () => {
    const weight = parseFloat(containerWeight);
    const height = parseFloat(stackHeight);
    const capacity = parseFloat(deckCapacity);
    
    if (isNaN(weight) || isNaN(height) || isNaN(capacity)) return;

    const totalStackWeight = weight * height;
    const weightPerUnit = totalStackWeight / (height || 1);
    const safetyFactor = capacity / totalStackWeight;
    const maxSafeHeight = Math.floor(capacity / weight);

    setContainerResult({
      containerWeight: weight,
      stackHeight: height,
      totalStackWeight,
      weightPerUnit,
      deckCapacity: capacity,
      safetyFactor,
      maxSafeHeight,
      status: safetyFactor >= 1.5 ? 'safe' :
              safetyFactor >= 1.2 ? 'caution' : 'dangerous',
      recommendation: safetyFactor < 1.2 ? 'Reduce stack height' :
                     safetyFactor < 1.5 ? 'Install with caution' :
                     'Safe upload limits'
    });
    setCalcSteps(prev => ({ ...prev, container: [
      { step: 1, title: "Total stack weight", formula: "Total = Container Weight × Stack Height", substitution: `Toplam = ${weight} × ${height}`, result: `Toplam = ${totalStackWeight} ton` },
      { step: 2, title: "Safety factor", formula: "SF = Deck Capacity / Total Stack Weight", substitution: `SF = ${capacity} / ${totalStackWeight}`, result: `SF = ${safetyFactor.toFixed(2)}` },
      { step: 3, title: "Max. safe stack", formula: "Max = ⌊Deck Capacity / Container Weight⌋", substitution: `Maks = ⌊${capacity} / ${weight}⌋`, result: `Max Secure Stack = ${maxSafeHeight} adet` },
    ] }));
  };

  const calculateRoRoAxleLoad = () => {
    const weight = parseFloat(vehicleWeight);
    const axles = parseFloat(axleNumber);
    const limit = parseFloat(deckLoadLimit);
    
    if (isNaN(weight) || isNaN(axles) || isNaN(limit) || axles === 0) return;

    const axleLoad = weight / axles;
    const totalPressure = weight;
    const safetyMargin = ((limit - axleLoad) / limit) * 100;

    setRoroResult({
      vehicleWeight: weight,
      axleNumber: axles,
      axleLoad,
      deckLoadLimit: limit,
      totalPressure,
      safetyMargin,
      status: axleLoad <= limit ? 'safe' : 'overload',
      recommendation: axleLoad <= limit ?
        `Safe - ${safetyMargin.toFixed(1)}% safety margin` :
        'Load limit exceeded - vehicle must be rejected'
    });
    setCalcSteps(prev => ({ ...prev, roro: [
      { step: 1, title: "Axle load calculation", formula: "Axle Load = Vehicle Weight / Number of Axles", substitution: `Axle Load = ${weight} / ${axles}`, result: `Axle Load = ${axleLoad.toFixed(2)} ton/axle` },
      { step: 2, title: "margin of safety", formula: "Margin = ((Limit - Axle Load) / Limit) × 100", substitution: `Marj = ((${limit} - ${axleLoad.toFixed(2)}) / ${limit}) × 100`, result: `Safety Margin = ${safetyMargin.toFixed(1)}%` },
      { step: 3, title: "Result", formula: "Axle Load ≤ Limit → Safe", result: axleLoad <= limit ? `${axleLoad.toFixed(2)} ≤ ${limit} → SECURE` : `${axleLoad.toFixed(2)} > ${limit} → OVERLOAD` },
    ] }));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={initialTab || "tanker"} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tanker">Tanker</TabsTrigger>
          <TabsTrigger value="lng">LNG</TabsTrigger>
          <TabsTrigger value="container">Container</TabsTrigger>
          <TabsTrigger value="roro">Ro-Ro</TabsTrigger>
        </TabsList>

        {/* Tanker Operations */}
        <TabsContent value="tanker">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Fuel className="w-5 h-5 text-orange-500" />
                Tanker Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="cargoTankVolume">Tank Hacmi (m³)</Label>
                  <Input
                    id="cargoTankVolume"
                    type="number"
                    value={cargoTankVolume}
                    onChange={(e) => setCargoTankVolume(e.target.value)}
                    placeholder="Tank kapasitesi"
                  />
                </div>
                <div>
                  <Label htmlFor="cowRate">COW Rate (m³/hour)</Label>
                  <Input
                    id="cowRate"
                    type="number"
                    value={cowRate}
                    onChange={(e) => setCowRate(e.target.value)}
                    placeholder="Washing rate"
                  />
                </div>
                <div>
                  <Label htmlFor="tankPressure">Tank Pressure (bar)</Label>
                  <Input
                    id="tankPressure"
                    type="number"
                    value={tankPressure}
                    onChange={(e) => setTankPressure(e.target.value)}
                    placeholder="current pressure"
                  />
                </div>
              </div>
              
              <Button onClick={calculateTankerOperations} className="w-full">
                Calculate
              </Button>

              {tankerResult && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">COW Duration:</span>
                        <span className="ml-2">{tankerResult.cowTime.toFixed(1)} h</span>
                      </div>
                      <div>
                        <span className="font-medium">Inert Gas:</span>
                        <span className="ml-2">{tankerResult.inertGasRequired.toFixed(0)} m³</span>
                      </div>
                      <div>
                        <span className="font-medium">Pressure Status:</span>
                        <Badge variant={tankerResult.pressureStatus === 'safe' ? 'default' :
                                      tankerResult.pressureStatus === 'caution' ? 'outline' : 'destructive'}
                               className="ml-2">
                          {tankerResult.pressureStatus}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Security Note:</span>
                        <p className="mt-1 text-muted-foreground">{tankerResult.safetyNote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <CalculationSteps steps={calcSteps["tanker"] || []} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* LNG Calculations */}
        <TabsContent value="lng">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Fuel className="w-5 h-5 text-blue-500" />
                LNG Boil-off Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="lngTankCapacity">Tank Kapasitesi (m³)</Label>
                  <Input
                    id="lngTankCapacity"
                    type="number"
                    value={lngTankCapacity}
                    onChange={(e) => setLngTankCapacity(e.target.value)}
                    placeholder="LNG tank kapasitesi"
                  />
                </div>
                <div>
                  <Label htmlFor="boilOffRate">Daily Boil-off (%)</Label>
                  <Input
                    id="boilOffRate"
                    type="number"
                    value={boilOffRate}
                    onChange={(e) => setBoilOffRate(e.target.value)}
                    placeholder="Daily loss rate"
                  />
                </div>
                <div>
                  <Label htmlFor="voyageDuration">Trip Duration (Days)</Label>
                  <Input
                    id="voyageDuration"
                    type="number"
                    value={voyageDuration}
                    onChange={(e) => setVoyageDuration(e.target.value)}
                    placeholder="Total sailing days"
                  />
                </div>
              </div>
              
              <Button onClick={calculateLNGBoilOff} className="w-full">
                Calculate Boil-off
              </Button>

              {lngResult && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Total Loss:</span>
                        <span className="ml-2">{lngResult.totalBoilOff.toFixed(1)} m³</span>
                      </div>
                      <div>
                        <span className="font-medium">Kalan Kargo:</span>
                        <span className="ml-2">{lngResult.remainingCargo.toFixed(1)} m³</span>
                      </div>
                      <div>
                        <span className="font-medium">Loss Rate:</span>
                        <Badge variant={lngResult.status === 'excellent' ? 'default' :
                                      lngResult.status === 'good' ? 'outline' : 'destructive'}
                               className="ml-2">
                          {lngResult.lossPercentage.toFixed(2)}%
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Durum:</span>
                        <span className="ml-2 capitalize">{lngResult.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <CalculationSteps steps={calcSteps["lng"] || []} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Container Calculations */}
        <TabsContent value="container">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Container className="w-5 h-5 text-green-500" />
                Konteyner Stack Limiti
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="containerWeight">Container Weight (ton)</Label>
                  <Input
                    id="containerWeight"
                    type="number"
                    value={containerWeight}
                    onChange={(e) => setContainerWeight(e.target.value)}
                    placeholder="Ton/konteyner"
                  />
                </div>
                <div>
                  <Label htmlFor="stackHeight">Stack Height (pcs)</Label>
                  <Input
                    id="stackHeight"
                    type="number"
                    value={stackHeight}
                    onChange={(e) => setStackHeight(e.target.value)}
                    placeholder="Number of containers"
                  />
                </div>
                <div>
                  <Label htmlFor="deckCapacity">Deck Capacity (tons)</Label>
                  <Input
                    id="deckCapacity"
                    type="number"
                    value={deckCapacity}
                    onChange={(e) => setDeckCapacity(e.target.value)}
                    placeholder="Maksimum kapasite"
                  />
                </div>
              </div>
              
              <Button onClick={calculateContainerStack} className="w-full">
                Stack Control
              </Button>

              {containerResult && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Total Weight:</span>
                        <span className="ml-2">{containerResult.totalStackWeight} ton</span>
                      </div>
                      <div>
                        <span className="font-medium">Safety Factor:</span>
                        <span className="ml-2">{containerResult.safetyFactor.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="font-medium">Max. Secure Stack:</span>
                        <span className="ml-2">{containerResult.maxSafeHeight} adet</span>
                      </div>
                      <div>
                        <span className="font-medium">Durum:</span>
                        <Badge variant={containerResult.status === 'safe' ? 'default' :
                                      containerResult.status === 'caution' ? 'outline' : 'destructive'}
                               className="ml-2">
                          {containerResult.status}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Suggestion:</span>
                        <p className="mt-1 text-muted-foreground">{containerResult.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <CalculationSteps steps={calcSteps["container"] || []} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ro-Ro Calculations */}
        <TabsContent value="roro">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Truck className="w-5 h-5 text-purple-500" />
                Ro-Ro Axle Load
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="vehicleWeight">Vehicle Weight (tons)</Label>
                  <Input
                    id="vehicleWeight"
                    type="number"
                    value={vehicleWeight}
                    onChange={(e) => setVehicleWeight(e.target.value)}
                    placeholder="Total vehicle weight"
                  />
                </div>
                <div>
                  <Label htmlFor="axleNumber">Number of Axles</Label>
                  <Input
                    id="axleNumber"
                    type="number"
                    value={axleNumber}
                    onChange={(e) => setAxleNumber(e.target.value)}
                    placeholder="Toplam axle"
                  />
                </div>
                <div>
                  <Label htmlFor="deckLoadLimit">Deck Limit (ton/axle)</Label>
                  <Input
                    id="deckLoadLimit"
                    type="number"
                    value={deckLoadLimit}
                    onChange={(e) => setDeckLoadLimit(e.target.value)}
                    placeholder="Limit per axle"
                  />
                </div>
              </div>
              
              <Button onClick={calculateRoRoAxleLoad} className="w-full">
                Axle Load Control
              </Button>

              {roroResult && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Axle Load:</span>
                        <span className="ml-2">{roroResult.axleLoad.toFixed(2)} ton/axle</span>
                      </div>
                      <div>
                        <span className="font-medium">Safety Margin:</span>
                        <span className="ml-2">{roroResult.safetyMargin.toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="font-medium">Durum:</span>
                        <Badge variant={roroResult.status === 'safe' ? 'default' : 'destructive'}
                               className="ml-2">
                          {roroResult.status}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Suggestion:</span>
                        <p className="mt-1 text-muted-foreground">{roroResult.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <CalculationSteps steps={calcSteps["roro"] || []} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
