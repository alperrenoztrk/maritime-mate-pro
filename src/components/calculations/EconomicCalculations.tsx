import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, TrendingUp, Clock } from "lucide-react";
import type { CalculationStep } from "@/types/calculationSteps";
import { CalculationSteps } from "@/components/ui/calculation-steps";

interface TceResult {
  grossFreight: number;
  voyageExpenses: number;
  netFreight: number;
  voyageDays: number;
  tce: number;
  profitability: "Excellent" | "Good" | "Fair" | "Poor";
}

interface DemurrageResult {
  demurrageRate: number;
  layTime: number;
  actualTime: number;
  timeDifference: number;
  type: "Demurrage" | "Despatch" | "On Time";
  amount: number;
  description: string;
  status: "penalty" | "bonus" | "neutral";
}

interface VoyageEconomicsResult {
  cargoQuantity: number;
  freightRate: number;
  grossRevenue: number;
  bunkerCost: number;
  portCosts: number;
  totalCosts: number;
  netProfit: number;
  profitMargin: number;
  profitability: "Excellent" | "Good" | "Fair" | "Poor" | "Loss";
}

export const EconomicCalculations = () => {
  const [calcSteps, setCalcSteps] = useState<Record<string, CalculationStep[]>>({});

  // Time Charter Equivalent
  const [grossFreight, setGrossFreight] = useState("");
  const [voyageExpenses, setVoyageExpenses] = useState("");
  const [voyageDays, setVoyageDays] = useState("");
  const [tceResult, setTceResult] = useState<TceResult | null>(null);

  // Demurrage Calculation
  const [demurrageRate, setDemurrageRate] = useState("");
  const [layTime, setLayTime] = useState("");
  const [actualTime, setActualTime] = useState("");
  const [demurrageResult, setDemurrageResult] = useState<DemurrageResult | null>(null);

  // Voyage Economics
  const [cargoQuantity, setCargoQuantity] = useState("");
  const [freightRate, setFreightRate] = useState("");
  const [bunkerCost, setBunkerCost] = useState("");
  const [portCosts, setPortCosts] = useState("");
  const [voyageResult, setVoyageResult] = useState<VoyageEconomicsResult | null>(null);

  const calculateTCE = () => {
    const freight = parseFloat(grossFreight);
    const expenses = parseFloat(voyageExpenses);
    const days = parseFloat(voyageDays);
    
    if (isNaN(freight) || isNaN(expenses) || isNaN(days) || days === 0) return;

    const netFreight = freight - expenses;
    const tce = netFreight / days;

    setTceResult({
      grossFreight: freight,
      voyageExpenses: expenses,
      netFreight,
      voyageDays: days,
      tce: tce,
      profitability: tce > 15000 ? 'Excellent' : tce > 10000 ? 'Good' : tce > 5000 ? 'Fair' : 'Poor'
    });
    setCalcSteps(prev => ({ ...prev, tce: [
      { step: 1, title: "Formula", formula: "TCE = (Gross Freight - Voyage Expenses) / Voyage Day", explanation: "Time Equivalent Rental (TCE) calculates daily earnings" },
      { step: 2, title: "Net freight account", formula: "Net Freight = Gross Freight - Voyage Expenses", substitution: `Net Navlun = $${freight.toLocaleString()} - $${expenses.toLocaleString()}`, result: `Net Navlun = $${netFreight.toLocaleString()}` },
      { step: 3, title: "TCE account", formula: "TCE = Net Freight / Day", substitution: `TCE = $${netFreight.toLocaleString()} / ${days}`, result: `TCE = $${tce.toFixed(0)}/day` },
    ] }));
  };

  const calculateDemurrage = () => {
    const rate = parseFloat(demurrageRate);
    const layTimeHours = parseFloat(layTime);
    const actualHours = parseFloat(actualTime);
    
    if (isNaN(rate) || isNaN(layTimeHours) || isNaN(actualHours)) return;

    const timeDifference = actualHours - layTimeHours;
    const baseResult = {
      demurrageRate: rate,
      layTime: layTimeHours,
      actualTime: actualHours,
      timeDifference
    };

    let result: DemurrageResult;

    if (timeDifference > 0) {
      // Demurrage - vessel is delayed
      result = {
        ...baseResult,
        type: 'Demurrage',
        amount: timeDifference * rate,
        description: 'Loading/unloading time exceeded',
        status: 'penalty',
      };
    } else if (timeDifference < 0) {
      // Despatch - vessel finished early
      result = {
        ...baseResult,
        type: 'Despatch',
        amount: Math.abs(timeDifference) * (rate * 0.5), // Usually half demurrage rate
        description: 'Loading/unloading completed early',
        status: 'bonus',
      };
    } else {
      result = {
        ...baseResult,
        type: 'On Time',
        amount: 0,
        description: 'Completed on time',
        status: 'neutral',
      };
    }

    setDemurrageResult(result);
    const demSteps: CalculationStep[] = [
      { step: 1, title: "Formula", formula: "Time Difference = Actual Time - Lay Time", explanation: "Positive difference means demurrage, negative difference means despatch" },
      { step: 2, title: "Time difference calculation", formula: `Fark = ${actualHours} - ${layTimeHours}`, result: `Fark = ${timeDifference} clock` },
    ];
    if (timeDifference > 0) {
      demSteps.push({ step: 3, title: "Demurrage account", formula: "Demurrage = Fark × Oran", substitution: `Demurrage = ${timeDifference} × $${rate}`, result: `Demurrage = $${result.amount.toFixed(2)}` });
    } else if (timeDifference < 0) {
      demSteps.push({ step: 3, title: "Despatch account", formula: "Despatch = |Fark| × Oran × 0.5", substitution: `Despatch = ${Math.abs(timeDifference)} × $${rate} × 0.5`, result: `Despatch = $${result.amount.toFixed(2)}` });
    } else {
      demSteps.push({ step: 3, title: "Result", formula: "Fark = 0", result: "Completed on time, no payment" });
    }
    setCalcSteps(prev => ({ ...prev, demurrage: demSteps }));
  };

  const calculateVoyageEconomics = () => {
    const quantity = parseFloat(cargoQuantity);
    const rate = parseFloat(freightRate);
    const bunker = parseFloat(bunkerCost);
    const ports = parseFloat(portCosts);
    
    if (isNaN(quantity) || isNaN(rate) || isNaN(bunker) || isNaN(ports)) return;

    const grossRevenue = quantity * rate;
    const totalCosts = bunker + ports;
    const netProfit = grossRevenue - totalCosts;
    const profitMargin = (netProfit / grossRevenue) * 100;

    setVoyageResult({
      cargoQuantity: quantity,
      freightRate: rate,
      grossRevenue,
      bunkerCost: bunker,
      portCosts: ports,
      totalCosts,
      netProfit,
      profitMargin,
      profitability: profitMargin > 20 ? 'Excellent' :
                     profitMargin > 10 ? 'Good' :
                     profitMargin > 5 ? 'Fair' :
                     profitMargin > 0 ? 'Poor' : 'Loss'
    });
    setCalcSteps(prev => ({ ...prev, voyage: [
      { step: 1, title: "gross revenue account", formula: "Gross Revenue = Cargo Amount × Freight Rate", substitution: `Gross Revenue = ${quantity.toLocaleString()} × $${rate}`, result: `Gross Revenue = $${grossRevenue.toLocaleString()}` },
      { step: 2, title: "Toplam maliyet", formula: "Total Cost = Fuel + Port Expenses", substitution: `Toplam = $${bunker.toLocaleString()} + $${ports.toLocaleString()}`, result: `Toplam Maliyet = $${totalCosts.toLocaleString()}` },
      { step: 3, title: "Net kâr", formula: "Net Profit = Gross Revenue - Total Cost", substitution: `Net Kâr = $${grossRevenue.toLocaleString()} - $${totalCosts.toLocaleString()}`, result: `Net Kâr = $${netProfit.toLocaleString()}` },
      { step: 4, title: "profit margin", formula: "Profit Margin = (Net Profit / Gross Revenue) × 100", substitution: `Marj = ($${netProfit.toLocaleString()} / $${grossRevenue.toLocaleString()}) × 100`, result: `Profit Margin = %${profitMargin.toFixed(1)}` },
    ] }));
  };

  return (
    <div className="space-y-6">
      {/* Time Charter Equivalent */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="w-5 h-5 text-green-500" />
            Time Charter Equivalent (TCE)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="grossFreight">Gross Freight ($)</Label>
              <Input
                id="grossFreight"
                type="number"
                value={grossFreight}
                onChange={(e) => setGrossFreight(e.target.value)}
                placeholder="Toplam navlun geliri"
              />
            </div>
            <div>
              <Label htmlFor="voyageExpenses">Sefer Giderleri ($)</Label>
              <Input
                id="voyageExpenses"
                type="number"
                value={voyageExpenses}
                onChange={(e) => setVoyageExpenses(e.target.value)}
                placeholder="Fuel, port etc."
              />
            </div>
            <div>
              <Label htmlFor="voyageDays">Trip Duration (Days)</Label>
              <Input
                id="voyageDays"
                type="number"
                value={voyageDays}
                onChange={(e) => setVoyageDays(e.target.value)}
                placeholder="Total sailing days"
              />
            </div>
          </div>
          
          <Button onClick={calculateTCE} className="w-full">
            Calculate TCE
          </Button>

          {tceResult && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Gross Freight:</span>
                    <span className="ml-2">${tceResult.grossFreight.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium">Net Navlun:</span>
                    <span className="ml-2">${tceResult.netFreight.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">TCE (Daily):</span>
                    <Badge variant="outline" className="ml-2">
                      ${tceResult.tce.toFixed(0)}/day
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Profitability:</span>
                    <Badge variant={tceResult.profitability === 'Excellent' ? 'default' :
                                  tceResult.profitability === 'Good' ? 'outline' : 'destructive'}
                           className="ml-2">
                      {tceResult.profitability}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
          <CalculationSteps steps={calcSteps["tce"] || []} />
        </CardContent>
      </Card>

      <Separator />

      {/* Demurrage Calculator */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5 text-orange-500" />
            Demurrage/Despatch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="demurrageRate">Demurrage Rate ($/hour)</Label>
              <Input
                id="demurrageRate"
                type="number"
                value={demurrageRate}
                onChange={(e) => setDemurrageRate(e.target.value)}
                placeholder="Saatlik oran"
              />
            </div>
            <div>
              <Label htmlFor="layTime">Lay Time (Hour)</Label>
              <Input
                id="layTime"
                type="number"
                value={layTime}
                onChange={(e) => setLayTime(e.target.value)}
                placeholder="Estimated duration"
              />
            </div>
            <div>
              <Label htmlFor="actualTime">Actual Duration (Hours)</Label>
              <Input
                id="actualTime"
                type="number"
                value={actualTime}
                onChange={(e) => setActualTime(e.target.value)}
                placeholder="Actual time"
              />
            </div>
          </div>
          
          <Button onClick={calculateDemurrage} className="w-full">
            Calculate
          </Button>

          {demurrageResult && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Tip:</span>
                    <Badge variant={demurrageResult.status === 'bonus' ? 'default' :
                                  demurrageResult.status === 'penalty' ? 'destructive' : 'outline'}
                           className="ml-2">
                      {demurrageResult.type}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Tutar:</span>
                    <span className="ml-2 font-bold">${demurrageResult.amount.toFixed(2)}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Time Difference:</span>
                    <span className="ml-2">{Math.abs(demurrageResult.timeDifference)} h</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Description:</span>
                    <p className="mt-1 text-muted-foreground">{demurrageResult.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <CalculationSteps steps={calcSteps["demurrage"] || []} />
        </CardContent>
      </Card>

      <Separator />

      {/* Voyage Economics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Sefer Ekonomisi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cargoQuantity">Cargo Quantity (MT)</Label>
              <Input
                id="cargoQuantity"
                type="number"
                value={cargoQuantity}
                onChange={(e) => setCargoQuantity(e.target.value)}
                placeholder="Ton"
              />
            </div>
            <div>
              <Label htmlFor="freightRate">Freight Rate ($/MT)</Label>
              <Input
                id="freightRate"
                type="number"
                value={freightRate}
                onChange={(e) => setFreightRate(e.target.value)}
                placeholder="per ton"
              />
            </div>
            <div>
              <Label htmlFor="bunkerCost">Fuel Cost ($)</Label>
              <Input
                id="bunkerCost"
                type="number"
                value={bunkerCost}
                onChange={(e) => setBunkerCost(e.target.value)}
                placeholder="Total fuel"
              />
            </div>
            <div>
              <Label htmlFor="portCosts">Port Expenses ($)</Label>
              <Input
                id="portCosts"
                type="number"
                value={portCosts}
                onChange={(e) => setPortCosts(e.target.value)}
                placeholder="Port and other"
              />
            </div>
          </div>
          
          <Button onClick={calculateVoyageEconomics} className="w-full">
            Analiz Et
          </Button>

          {voyageResult && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Gross Income:</span>
                    <span className="ml-2">${voyageResult.grossRevenue.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium">Toplam Maliyet:</span>
                    <span className="ml-2">${voyageResult.totalCosts.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium">Net Kâr:</span>
                    <span className={`ml-2 font-bold ${voyageResult.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                      ${voyageResult.netProfit.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Profit Margin:</span>
                    <Badge variant={voyageResult.profitMargin > 10 ? 'default' :
                                  voyageResult.profitMargin > 0 ? 'outline' : 'destructive'}
                           className="ml-2">
                      {voyageResult.profitMargin.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Rating:</span>
                    <Badge variant={voyageResult.profitability === 'Excellent' ? 'default' :
                                  voyageResult.profitability === 'Good' ? 'outline' : 'destructive'}
                           className="ml-2">
                      {voyageResult.profitability}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
          <CalculationSteps steps={calcSteps["voyage"] || []} />
        </CardContent>
      </Card>
    </div>
  );
};
