import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Settings, Fuel, Gauge, Activity, Zap, AlertTriangle, CheckCircle, TrendingUp, BarChart3, Thermometer, Droplets, Waves } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CalculationSteps } from "@/components/ui/calculation-steps";
import type { CalculationStep } from "@/types/calculationSteps";

interface EngineData {
  // Main Engine Parameters
  mcrPower: number; // Maximum Continuous Rating (kW)
  currentLoad: number; // Current load (%)
  engineRPM: number; // Engine RPM
  nominalRPM: number; // Nominal RPM
  cylinderNumber: number; // Number of cylinders
  engineType: 'two-stroke' | 'four-stroke'; // Engine type
  requiredNoxTier: 'I' | 'II' | 'III'; // Regulatory tier to check against (user selection)
  
  // Fuel System
  fuelType: 'HFO' | 'MDO' | 'MGO' | 'LNG' | 'Methanol'; // Current fuel type
  fuelDensity: number; // Fuel density (kg/m³)
  fuelViscosity: number; // Fuel viscosity (cSt)
  fuelTemperature: number; // Fuel temperature (°C)
  fuelSulfurContent: number; // Fuel sulfur content (%)
  lowerCalorificValue: number; // Lower calorific value (MJ/kg)
  
  // SFOC Data
  sfocAt100: number; // SFOC at 100% load (g/kWh)
  sfocAt85: number; // SFOC at 85% load (g/kWh)
  sfocAt75: number; // SFOC at 75% load (g/kWh)
  sfocAt50: number; // SFOC at 50% load (g/kWh)
  
  // Power Measurements
  indicatedPower: number; // Indicated power (kW)
  mechanicalEfficiency: number; // Mechanical efficiency (%)
  generatorEfficiency: number; // Generator efficiency (%)
  
  // Cooling System
  seawaterInletTemp: number; // Seawater inlet temperature (°C)
  seawaterOutletTemp: number; // Seawater outlet temperature (°C)
  freshwaterInletTemp: number; // Freshwater inlet temperature (°C)
  freshwaterOutletTemp: number; // Freshwater outlet temperature (°C)
  coolingWaterFlow: number; // Cooling water flow rate (m³/h)
  
  // Heat Exchanger
  heatLoad: number; // Heat load to be removed (kW)
  logMeanTempDiff: number; // Log mean temperature difference (°C)
  overallHeatTransferCoeff: number; // Overall heat transfer coefficient (W/m²K)
  foulingFactor: number; // Fouling factor (m²K/W)
  
  // HFO/MDO Changeover
  changeoverFromHFO: boolean; // Changeover from HFO
  changeoverToMDO: boolean; // Changeover to MDO
  pipelineVolume: number; // Pipeline volume (L)
  changeoverFlowRate: number; // Changeover flow rate (L/min)
  preheatingTime: number; // Preheating time (minutes)
  
  // Tank Calculations
  bilgeTankLength: number; // Bilge tank length (m)
  bilgeTankWidth: number; // Bilge tank width (m)
  bilgeTankHeight: number; // Bilge tank height (m)
  sludgeTankDiameter: number; // Sludge tank diameter (m)
  sludgeTankHeight: number; // Sludge tank height (m)
  
  // Environmental Conditions
  ambientTemperature: number; // Ambient temperature (°C)
  ambientPressure: number; // Ambient pressure (bar)
  humidity: number; // Relative humidity (%)
  
  // Operating Hours
  dailyRunningHours: number; // Daily running hours
  totalRunningHours: number; // Total running hours
}

interface EngineResult {
  // Fuel Consumption
  currentSFOC: number; // Current SFOC (g/kWh)
  hourlyConsumption: number; // Hourly fuel consumption (kg/h)
  dailyConsumption: number; // Daily fuel consumption (tonnes)
  specificFuelConsumption: number; // Specific fuel consumption (kg/kWh)
  
  // Engine Efficiency
  indicatedThermalEfficiency: number; // Indicated thermal efficiency (%)
  brakeSpecificFuelConsumption: number; // Brake specific fuel consumption (g/kWh)
  mechanicalPowerLoss: number; // Mechanical power loss (kW)
  overallEfficiency: number; // Overall efficiency (%)
  
  // Power Calculations
  shaftPower: number; // Shaft power (kW)
  brakePower: number; // Brake power (kW)
  indicatedMeanEffectivePressure: number; // IMEP (bar)
  brakeSpecificFuelPressure: number; // BMEP (bar)
  powerOutput: number; // Current power output (kW)
  electricalPower: number; // Electrical power output (kW)
  
  // HFO/MDO Changeover
  changeoverTime: number; // Total changeover time (minutes)
  fuelWasteVolume: number; // Fuel waste volume (L)
  changeoverCost: number; // Changeover cost estimate ($)
  changeoverStatus: 'ready' | 'in_progress' | 'completed';
  
  // Cooling System Calculations
  heatRejectionRate: number; // Heat rejection rate (kW)
  coolingCapacityRequired: number; // Required cooling capacity (kW)
  seawaterPumpPower: number; // Seawater pump power (kW)
  coolingEfficiency: number; // Cooling system efficiency (%)
  
  // MARPOL Annex VI Emissions
  noxEmissionRate: number; // NOx emission rate (g/kWh)
  noxLimit: number; // Applicable NOx limit for selected tier (g/kWh)
  noxDailyEmission: number; // Daily NOx emission (kg)
  soxEmissionRate: number; // SOx emission rate (g/kWh)
  soxDailyEmission: number; // Daily SOx emission (kg)
  co2EmissionRate: number; // CO2 emission rate (g/kWh)
  co2DailyEmission: number; // Daily CO2 emission (kg)
  pmEmissionRate: number; // PM emission rate (g/kWh)
  eeoi: number; // Energy Efficiency Operational Indicator
  cii: number; // Carbon Intensity Indicator
  
  // Heat Exchanger
  heatExchangerArea: number; // Required heat exchanger area (m²)
  numberOfTubes: number; // Number of tubes required
  tubeLength: number; // Tube length (m)
  pressureDrop: number; // Pressure drop (kPa)
  effectiveness: number; // Heat exchanger effectiveness (%)
  
  // Tank Calculations
  bilgeTankCapacity: number; // Bilge tank capacity (m³)
  sludgeTankCapacity: number; // Sludge tank capacity (m³)
  bilgeGenerationRate: number; // Bilge generation rate (L/day)
  sludgeGenerationRate: number; // Sludge generation rate (L/day)
  
  // Compliance Status
  noxCompliance: 'compliant' | 'non_compliant' | 'marginal';
  soxCompliance: 'compliant' | 'non_compliant' | 'marginal';
  marpolTier: 'I' | 'II' | 'III';
  ecaCompliance: boolean; // ECA (Emission Control Area) compliance
  
  recommendations: string[];
  warnings: string[];
}

export const EngineCalculations = ({ initialTab }: { initialTab?: string } = {}) => {
  const { toast } = useToast();
  const [data, setData] = useState<EngineData>({
    mcrPower: 15000, currentLoad: 75, engineRPM: 120, nominalRPM: 127,
    cylinderNumber: 6, engineType: 'two-stroke', fuelType: 'HFO',
    requiredNoxTier: 'II',
    fuelDensity: 950, fuelViscosity: 380, fuelTemperature: 150,
    fuelSulfurContent: 0.5, lowerCalorificValue: 40.2,
    sfocAt100: 190, sfocAt85: 185, sfocAt75: 175, sfocAt50: 195,
    indicatedPower: 12000, mechanicalEfficiency: 90, generatorEfficiency: 95,
    seawaterInletTemp: 25, seawaterOutletTemp: 35, freshwaterInletTemp: 65,
    freshwaterOutletTemp: 75, coolingWaterFlow: 800, heatLoad: 5500,
    logMeanTempDiff: 35, overallHeatTransferCoeff: 2500, foulingFactor: 0.0002,
    changeoverFromHFO: false, changeoverToMDO: false, pipelineVolume: 1200,
    changeoverFlowRate: 60, preheatingTime: 45, bilgeTankLength: 8,
    bilgeTankWidth: 4, bilgeTankHeight: 2.5, sludgeTankDiameter: 2.5,
    sludgeTankHeight: 3, ambientTemperature: 28, ambientPressure: 1.01325,
    humidity: 65, dailyRunningHours: 24, totalRunningHours: 25000
  });

  const [result, setResult] = useState<EngineResult | null>(null);
  const [calcSteps, setCalcSteps] = useState<Record<string, CalculationStep[]>>({});

  // Calculate SFOC based on engine load using interpolation
  const calculateSFOC = (load: number): number => {
    if (load <= 50) {
      return data.sfocAt50 + (data.sfocAt50 * 0.15 * (1 - load/50));
    } else if (load <= 75) {
      const ratio = (load - 50) / 25;
      return data.sfocAt50 + (data.sfocAt75 - data.sfocAt50) * ratio;
    } else if (load <= 85) {
      const ratio = (load - 75) / 10;
      return data.sfocAt75 + (data.sfocAt85 - data.sfocAt75) * ratio;
    } else if (load <= 100) {
      const ratio = (load - 85) / 15;
      return data.sfocAt85 + (data.sfocAt100 - data.sfocAt85) * ratio;
    } else {
      // Penalty for overload
      const excess = load - 100;
      return data.sfocAt100 * (1 + 0.03 * excess);
    }
  };

  // Calculate NOx emissions according to MARPOL Annex VI
  const calculateNOxEmissions = (
    engineRPM: number
  ): { rate: number; limits: { I: number; II: number; III: number } } => {
    // MARPOL Annex VI Reg. 13 (g/kWh) limits are engine speed dependent.
    // Tier I:  n < 130: 17.0;  130 ≤ n < 2000: 45·n^-0.2;  n ≥ 2000: 9.8
    // Tier II: n < 130: 14.4;  130 ≤ n < 2000: 44·n^-0.23; n ≥ 2000: 7.7
    // Tier III:n < 130: 3.4;   130 ≤ n < 2000: 9·n^-0.2;   n ≥ 2000: 2.0 (≈1.96)
    const n = Math.max(0, engineRPM);

    const tierI =
      n < 130 ? 17 :
      n < 2000 ? 45 * Math.pow(n, -0.2) :
      9.8;

    const tierII =
      n < 130 ? 14.4 :
      n < 2000 ? 44 * Math.pow(n, -0.23) :
      7.7;

    const tierIII =
      n < 130 ? 3.4 :
      n < 2000 ? 9 * Math.pow(n, -0.2) :
      2.0;

    // Typical NOx emission for current engine (very rough estimate)
    const baseNOx =
      data.engineType === 'two-stroke'
        ? 12 + (data.currentLoad / 100) * 3
        : 8 + (data.currentLoad / 100) * 2;

    return { rate: baseNOx, limits: { I: tierI, II: tierII, III: tierIII } };
  };

  // Calculate SOx emissions based on fuel sulfur content
  const calculateSOxEmissions = (fuelConsumption: number): number => {
    // SOx = 2 × S × FC (MARPOL formula)
    // Where S = sulfur content (%), FC = fuel consumption (kg/h)
    return 2 * (data.fuelSulfurContent / 100) * fuelConsumption;
  };

  // Calculate CO2 emissions
  const calculateCO2Emissions = (fuelConsumption: number): number => {
    // CO2 emission factor for marine fuel oil (kg CO2/kg fuel)
    const co2Factor = data.fuelType === 'HFO' ? 3.151 : 
                     data.fuelType === 'MDO' ? 3.206 :
                     data.fuelType === 'MGO' ? 3.206 :
                     data.fuelType === 'LNG' ? 2.750 : 1.375; // Methanol
    
    return fuelConsumption * co2Factor;
  };

  // Calculate heat exchanger area
  const calculateHeatExchangerArea = (): { area: number; tubes: number; length: number } => {
    // Q = U × A × LMTD
    // A = Q / (U × LMTD)
    const cleanHeatTransferCoeff = 1 / (1/data.overallHeatTransferCoeff - data.foulingFactor);
    const area = (data.heatLoad * 1000) / (cleanHeatTransferCoeff * data.logMeanTempDiff);
    
    // Assuming tube diameter 25mm, pitch 32mm
    const tubeArea = Math.PI * 0.025 * 4; // 4m tube length
    const numberOfTubes = Math.ceil(area / tubeArea);
    const tubeLength = area / (numberOfTubes * Math.PI * 0.025);
    
    return { area, tubes: numberOfTubes, length: tubeLength };
  };

  // Calculate tank capacities
  const calculateTankCapacities = () => {
    const bilgeCapacity = data.bilgeTankLength * data.bilgeTankWidth * data.bilgeTankHeight;
    const sludgeCapacity = Math.PI * Math.pow(data.sludgeTankDiameter/2, 2) * data.sludgeTankHeight;
    
    // Typical generation rates
    const bilgeGeneration = (data.mcrPower / 1000) * 0.5; // L/day per MW
    const estimatedConsumption = (data.mcrPower * 0.185 * 24) / 1000; // Estimated daily consumption in tonnes
    const sludgeGeneration = (estimatedConsumption * 1000) * 0.01; // 1% of fuel consumption
    
    return { bilgeCapacity, sludgeCapacity, bilgeGeneration, sludgeGeneration };
  };

  const calculate = () => {
    try {
      const currentSFOC = calculateSFOC(data.currentLoad);
      const powerOutput = (data.mcrPower * data.currentLoad) / 100;
      
      // Fuel consumption calculations
      const hourlyConsumption = (powerOutput * currentSFOC) / 1000; // kg/h
      const dailyConsumption = (hourlyConsumption * data.dailyRunningHours) / 1000; // tonnes
      
      // Power calculations
      const shaftPower = powerOutput;
      const brakePower = (data.indicatedPower * data.mechanicalEfficiency) / 100;
      const electricalPower = (brakePower * data.generatorEfficiency) / 100;
      
      // Efficiency calculations
      const indicatedThermalEfficiency = (data.indicatedPower * 3600) / (hourlyConsumption * data.lowerCalorificValue * 1000) * 100;
      const overallEfficiency = (electricalPower * 3600) / (hourlyConsumption * data.lowerCalorificValue * 1000) * 100;
      
      // Emissions calculations
      const noxCalc = calculateNOxEmissions(data.engineRPM);
      const selectedNoxLimit = noxCalc.limits[data.requiredNoxTier];
      const noxDailyEmission = (noxCalc.rate * powerOutput * data.dailyRunningHours) / 1000; // kg/day
      
      const soxEmissionRate = calculateSOxEmissions(1) / powerOutput * 1000; // g/kWh
      const soxDailyEmission = calculateSOxEmissions(hourlyConsumption) * data.dailyRunningHours; // kg/day
      
      const co2EmissionRate = (calculateCO2Emissions(1) / powerOutput) * 1000000; // g/kWh
      const co2DailyEmission = calculateCO2Emissions(hourlyConsumption) * data.dailyRunningHours; // kg/day
      
      // Cooling system calculations
      const heatRejectionRate = powerOutput * 0.4; // Typical 40% heat rejection
      const coolingCapacityRequired = heatRejectionRate * 1.2; // 20% safety margin
      
      // Heat exchanger calculations
      const heatExchanger = calculateHeatExchangerArea();
      
      // Tank calculations
      const tanks = calculateTankCapacities();
      
      // HFO/MDO changeover calculations
      const changeoverTime = data.preheatingTime + (data.pipelineVolume / data.changeoverFlowRate);
      const fuelWasteVolume = data.pipelineVolume * 1.1; // 10% safety margin
      
      // Compliance checks
      const noxCompliance: 'compliant' | 'non_compliant' | 'marginal' = (() => {
        if (selectedNoxLimit <= 0) return 'non_compliant';
        // Give a small margin band (within +5%) as "marginal"
        if (noxCalc.rate <= selectedNoxLimit) return 'compliant';
        if (noxCalc.rate <= selectedNoxLimit * 1.05) return 'marginal';
        return 'non_compliant';
      })();
      
      const soxCompliance: 'compliant' | 'non_compliant' | 'marginal' = 
        data.fuelSulfurContent <= 0.1 ? 'compliant' :
        data.fuelSulfurContent <= 0.5 ? 'marginal' : 'non_compliant';
      
      // Simple proxy: if user selects Tier III, treat this as "NOx ECA / Tier III area check".
      const ecaCompliance = data.requiredNoxTier === 'III'
        ? (data.fuelSulfurContent <= 0.1 && noxCalc.rate <= selectedNoxLimit)
        : (data.fuelSulfurContent <= 0.1);
      
      // EEOI calculation (kg CO2/nm)
      const eeoi = (co2DailyEmission * 1000) / (14.5 * 24); // Assuming 14.5 knots speed
      
      // Recommendations and warnings
      const recommendations = [];
      const warnings = [];
      
      if (data.currentLoad < 70) {
        recommendations.push("Improve fuel efficiency by increasing engine load");
      }
      
      if (data.currentLoad > 90) {
        warnings.push("Engine load too high - risk of damage");
      }
      
      if (currentSFOC > 200) {
        recommendations.push("Increase fuel efficiency by performing engine maintenance");
      }
      
      if (data.fuelSulfurContent > 0.5) {
        warnings.push("Fuel sulfur content exceeds MARPOL limit");
      }
      
      if (noxCalc.rate > selectedNoxLimit) {
        warnings.push(`NOx emisyonu MARPOL Tier ${data.requiredNoxTier} exceeds the limit (Limit: ${selectedNoxLimit.toFixed(2)} g/kWh)`);
      }
      
      if (!ecaCompliance) {
        warnings.push("Does not meet ECA zone requirements");
      }

      const calculatedResult: EngineResult = {
        currentSFOC,
        hourlyConsumption,
        dailyConsumption,
        specificFuelConsumption: currentSFOC / 1000,
        indicatedThermalEfficiency,
        brakeSpecificFuelConsumption: currentSFOC,
        mechanicalPowerLoss: data.indicatedPower - brakePower,
        overallEfficiency,
        shaftPower,
        brakePower,
        indicatedMeanEffectivePressure: (data.indicatedPower * 60) / (data.cylinderNumber * data.engineRPM * 0.1),
        brakeSpecificFuelPressure: (brakePower * 60) / (data.cylinderNumber * data.engineRPM * 0.1),
        powerOutput,
        electricalPower,
        changeoverTime,
        fuelWasteVolume,
        changeoverCost: fuelWasteVolume * 0.8, // $0.8/L estimate
        changeoverStatus: 'ready',
        heatRejectionRate,
        coolingCapacityRequired,
        seawaterPumpPower: (data.coolingWaterFlow * 10) / 3600, // Rough estimate
        coolingEfficiency: 85,
        noxEmissionRate: noxCalc.rate,
        noxLimit: selectedNoxLimit,
        noxDailyEmission,
        soxEmissionRate,
        soxDailyEmission,
        co2EmissionRate,
        co2DailyEmission,
        pmEmissionRate: 0.4, // Typical PM emission
        eeoi,
        cii: eeoi * 1.2, // Simplified CII calculation
        heatExchangerArea: heatExchanger.area,
        numberOfTubes: heatExchanger.tubes,
        tubeLength: heatExchanger.length,
        pressureDrop: 15, // Typical pressure drop
        effectiveness: 80,
        bilgeTankCapacity: tanks.bilgeCapacity,
        sludgeTankCapacity: tanks.sludgeCapacity,
        bilgeGenerationRate: tanks.bilgeGeneration,
        sludgeGenerationRate: tanks.sludgeGeneration,
        noxCompliance,
        soxCompliance,
        marpolTier: data.requiredNoxTier,
        ecaCompliance,
        recommendations,
        warnings
      };

      setResult(calculatedResult);
      setCalcSteps({
        fuel: [
          { step: 1, title: "SFOC account", formula: "SFOC calculated by interpolation (based on % load)", result: `SFOC = ${currentSFOC.toFixed(1)} g/kWh (Load: %${data.currentLoad})` },
          { step: 2, title: "power output", formula: "P = MCR × Load / 100", substitution: `P = ${data.mcrPower} × ${data.currentLoad} / 100`, result: `P = ${powerOutput.toFixed(0)} kW` },
          { step: 3, title: "Hourly consumption", formula: "FCsaat = (P × SFOC) / 1000", substitution: `FC = (${powerOutput.toFixed(0)} × ${currentSFOC.toFixed(1)}) / 1000`, result: `FC = ${hourlyConsumption.toFixed(1)} kg/hour` },
          { step: 4, title: "daily consumption", formula: "FCday = (FChour × Working Hour) / 1000", substitution: `FCday = (${hourlyConsumption.toFixed(1)} × ${data.dailyRunningHours}) / 1000`, result: `FCday = ${dailyConsumption.toFixed(1)} tons/day` },
        ],
        power: [
          { step: 1, title: "brake power", formula: "BP = Indicated Power × Mechanical Efficiency / 100", substitution: `BP = ${data.indicatedPower} × ${data.mechanicalEfficiency} / 100`, result: `BP = ${brakePower.toFixed(0)} kW` },
          { step: 2, title: "electric power", formula: "EP = BP × Generator Efficiency / 100", substitution: `EP = ${brakePower.toFixed(0)} × ${data.generatorEfficiency} / 100`, result: `EP = ${electricalPower.toFixed(0)} kW` },
          { step: 3, title: "Indicated thermal efficiency", formula: "ηi = (Pi × 3600) / (FC × LCV × 1000) × 100", result: `ηi = ${indicatedThermalEfficiency.toFixed(1)}%` },
          { step: 4, title: "Total yield", formula: "η = (EP × 3600) / (FC × LCV × 1000) × 100", result: `η = ${overallEfficiency.toFixed(1)}%` },
        ],
        emissions: [
          { step: 1, title: "NOx emission", formula: `MARPOL Tier ${data.requiredNoxTier} limiti (RPM=${data.engineRPM})`, result: `NOx = ${noxCalc.rate.toFixed(2)} g/kWh (Limit: ${selectedNoxLimit.toFixed(2)} g/kWh)` },
          { step: 2, title: "SOx emission", formula: "SOx = 2 × S% × FC", explanation: `Sulfur content:%${data.fuelSulfurContent}`, result: `SOx = ${soxEmissionRate.toFixed(2)} g/kWh` },
          { step: 3, title: "CO₂ emissions", formula: "CO₂ = FC × Emission Factor", explanation: `${data.fuelType} emission factor used`, result: `CO₂ = ${(co2DailyEmission/1000).toFixed(1)} tons/day` },
        ],
        changeover: [
          { step: 1, title: "Transition time", formula: "Time = Preheat + (Pipe Volume / Flow Rate)", substitution: `Duration = ${data.preheatingTime} + (${data.pipelineVolume} / ${data.changeoverFlowRate})`, result: `Duration = ${changeoverTime.toFixed(0)} dakika` },
          { step: 2, title: "waste fuel", formula: "Waste = Pipe Volume × 1.1 (10% safety)", substitution: `Waste = ${data.pipelineVolume} × 1.1`, result: `Waste = ${fuelWasteVolume.toFixed(0)} L` },
        ],
        cooling: [
          { step: 1, title: "Heat rejection rate", formula: "Q = Power × 0.4 (typical 40% heat rejection)", substitution: `Q = ${powerOutput.toFixed(0)} × 0.4`, result: `Q = ${heatRejectionRate.toFixed(0)} kW` },
          { step: 2, title: "Required cooling", formula: "Qgerekli = Q × 1.2 (%20 emniyet)", substitution: `Qgerekli = ${heatRejectionRate.toFixed(0)} × 1.2`, result: `Qgerekli = ${coolingCapacityRequired.toFixed(0)} kW` },
        ],
        heatExchanger: [
          { step: 1, title: "Heat exchanger area", formula: "A = Q / (U × LMTD)", substitution: `A = ${(data.heatLoad*1000).toFixed(0)} / (Ueff × ${data.logMeanTempDiff})`, result: `A = ${heatExchanger.area.toFixed(1)} m²` },
          { step: 2, title: "Number of pipes", formula: "n = A / (π × d × Lboru)", result: `n = ${heatExchanger.tubes} adet` },
        ],
        tanks: [
          { step: 1, title: "waste water tank", formula: "V = L × B × H", substitution: `V = ${data.bilgeTankLength} × ${data.bilgeTankWidth} × ${data.bilgeTankHeight}`, result: `V = ${tanks.bilgeCapacity.toFixed(1)} m³` },
          { step: 2, title: "bilge tank", formula: "V = π × r² × H", substitution: `V = π × ${(data.sludgeTankDiameter/2).toFixed(2)}² × ${data.sludgeTankHeight}`, result: `V = ${tanks.sludgeCapacity.toFixed(1)} m³` },
        ],
      });
      toast({
        title: "Calculation Completed",
        description: "Machine calculations were completed in accordance with MARPOL regulations.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during calculation.",
        variant: "destructive",
      });
    }
  };

  const updateData = <K extends keyof EngineData>(field: K, value: EngineData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Machine Calculations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={initialTab || "engine"} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="engine">Main engine</TabsTrigger>
              <TabsTrigger value="fuel">Fuel System</TabsTrigger>
              <TabsTrigger value="cooling">cooling</TabsTrigger>
              <TabsTrigger value="changeover">transition</TabsTrigger>
              <TabsTrigger value="heat">Heat Exchanger</TabsTrigger>
              <TabsTrigger value="tanks">Tanks</TabsTrigger>
            </TabsList>

            <TabsContent value="engine" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mcrPower">MCR Power (kW)</Label>
                  <Input
                    id="mcrPower"
                    type="number"
                    value={data.mcrPower}
                    onChange={(e) => updateData('mcrPower', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentLoad">Current Load (%)</Label>
                  <Input
                    id="currentLoad"
                    type="number"
                    value={data.currentLoad}
                    onChange={(e) => updateData('currentLoad', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engineRPM">Engine RPM</Label>
                  <Input
                    id="engineRPM"
                    type="number"
                    value={data.engineRPM}
                    onChange={(e) => updateData('engineRPM', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nominalRPM">Nominal RPM</Label>
                  <Input
                    id="nominalRPM"
                    type="number"
                    value={data.nominalRPM}
                    onChange={(e) => updateData('nominalRPM', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cylinderNumber">Number of Cylinders</Label>
                  <Input
                    id="cylinderNumber"
                    type="number"
                    value={data.cylinderNumber}
                    onChange={(e) => updateData('cylinderNumber', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engineType">Engine Type</Label>
                  <Select value={data.engineType} onValueChange={(value) => updateData('engineType', value as 'four-stroke' | 'two-stroke')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="two-stroke">Two Stroke</SelectItem>
                      <SelectItem value="four-stroke">Four Stroke</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requiredNoxTier">NOₓ Regulation Tier (Control)</Label>
                  <Select value={data.requiredNoxTier} onValueChange={(value) => updateData('requiredNoxTier', value as EngineData["requiredNoxTier"])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="I">Tier I</SelectItem>
                      <SelectItem value="II">Tier II</SelectItem>
                      <SelectItem value="III">Tier III (ECA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="indicatedPower">Indicated Power (kW)</Label>
                  <Input
                    id="indicatedPower"
                    type="number"
                    value={data.indicatedPower}
                    onChange={(e) => updateData('indicatedPower', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mechanicalEfficiency">Mechanical Efficiency (%)</Label>
                  <Input
                    id="mechanicalEfficiency"
                    type="number"
                    value={data.mechanicalEfficiency}
                    onChange={(e) => updateData('mechanicalEfficiency', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fuel" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select value={data.fuelType} onValueChange={(value) => updateData('fuelType', value as 'HFO' | 'MDO' | 'MGO' | 'LNG' | 'Methanol')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HFO">Heavy Fuel Oil (HFO)</SelectItem>
                      <SelectItem value="MDO">Marine Diesel Oil (MDO)</SelectItem>
                      <SelectItem value="MGO">Marine Gas Oil (MGO)</SelectItem>
                      <SelectItem value="LNG">Liquefied Natural Gas (LNG)</SelectItem>
                      <SelectItem value="Methanol">Methanol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelDensity">Fuel Density (kg/m³)</Label>
                  <Input
                    id="fuelDensity"
                    type="number"
                    value={data.fuelDensity}
                    onChange={(e) => updateData('fuelDensity', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelSulfurContent">Sulfur Content (%)</Label>
                  <Input
                    id="fuelSulfurContent"
                    type="number"
                    step="0.01"
                    value={data.fuelSulfurContent}
                    onChange={(e) => updateData('fuelSulfurContent', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lowerCalorificValue">Lower Calorific Value (MJ/kg)</Label>
                  <Input
                    id="lowerCalorificValue"
                    type="number"
                    step="0.1"
                    value={data.lowerCalorificValue}
                    onChange={(e) => updateData('lowerCalorificValue', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sfocAt100">SFOC @ 100% (g/kWh)</Label>
                  <Input
                    id="sfocAt100"
                    type="number"
                    value={data.sfocAt100}
                    onChange={(e) => updateData('sfocAt100', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sfocAt85">SFOC @ 85% (g/kWh)</Label>
                  <Input
                    id="sfocAt85"
                    type="number"
                    value={data.sfocAt85}
                    onChange={(e) => updateData('sfocAt85', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sfocAt75">SFOC @ 75% (g/kWh)</Label>
                  <Input
                    id="sfocAt75"
                    type="number"
                    value={data.sfocAt75}
                    onChange={(e) => updateData('sfocAt75', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sfocAt50">SFOC @ 50% (g/kWh)</Label>
                  <Input
                    id="sfocAt50"
                    type="number"
                    value={data.sfocAt50}
                    onChange={(e) => updateData('sfocAt50', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cooling" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seawaterInletTemp">Sea Water Inlet Temperature (°C)</Label>
                  <Input
                    id="seawaterInletTemp"
                    type="number"
                    value={data.seawaterInletTemp}
                    onChange={(e) => updateData('seawaterInletTemp', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seawaterOutletTemp">Sea Water Outlet Temperature (°C)</Label>
                  <Input
                    id="seawaterOutletTemp"
                    type="number"
                    value={data.seawaterOutletTemp}
                    onChange={(e) => updateData('seawaterOutletTemp', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freshwaterInletTemp">Fresh Water Inlet Temperature (°C)</Label>
                  <Input
                    id="freshwaterInletTemp"
                    type="number"
                    value={data.freshwaterInletTemp}
                    onChange={(e) => updateData('freshwaterInletTemp', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freshwaterOutletTemp">Fresh Water Outlet Temperature (°C)</Label>
                  <Input
                    id="freshwaterOutletTemp"
                    type="number"
                    value={data.freshwaterOutletTemp}
                    onChange={(e) => updateData('freshwaterOutletTemp', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coolingWaterFlow">Cooling Water Flow Rate (m³/h)</Label>
                  <Input
                    id="coolingWaterFlow"
                    type="number"
                    value={data.coolingWaterFlow}
                    onChange={(e) => updateData('coolingWaterFlow', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="changeover" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pipelineVolume">Pipeline Volume (L)</Label>
                  <Input
                    id="pipelineVolume"
                    type="number"
                    value={data.pipelineVolume}
                    onChange={(e) => updateData('pipelineVolume', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="changeoverFlowRate">Passage Flow (L/min)</Label>
                  <Input
                    id="changeoverFlowRate"
                    type="number"
                    value={data.changeoverFlowRate}
                    onChange={(e) => updateData('changeoverFlowRate', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preheatingTime">Preheating Time (minutes)</Label>
                  <Input
                    id="preheatingTime"
                    type="number"
                    value={data.preheatingTime}
                    onChange={(e) => updateData('preheatingTime', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="heat" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heatLoad">Heat Load (kW)</Label>
                  <Input
                    id="heatLoad"
                    type="number"
                    value={data.heatLoad}
                    onChange={(e) => updateData('heatLoad', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logMeanTempDiff">Average Temperature Difference (°C)</Label>
                  <Input
                    id="logMeanTempDiff"
                    type="number"
                    value={data.logMeanTempDiff}
                    onChange={(e) => updateData('logMeanTempDiff', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overallHeatTransferCoeff">Heat Transfer Coefficient (W/m²K)</Label>
                  <Input
                    id="overallHeatTransferCoeff"
                    type="number"
                    value={data.overallHeatTransferCoeff}
                    onChange={(e) => updateData('overallHeatTransferCoeff', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foulingFactor">Pollution Factor (m²K/W)</Label>
                  <Input
                    id="foulingFactor"
                    type="number"
                    step="0.00001"
                    value={data.foulingFactor}
                    onChange={(e) => updateData('foulingFactor', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tanks" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bilgeTankLength">Waste Water Tank Length (m)</Label>
                  <Input
                    id="bilgeTankLength"
                    type="number"
                    value={data.bilgeTankLength}
                    onChange={(e) => updateData('bilgeTankLength', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bilgeTankWidth">Waste Water Tank Width (m)</Label>
                  <Input
                    id="bilgeTankWidth"
                    type="number"
                    value={data.bilgeTankWidth}
                    onChange={(e) => updateData('bilgeTankWidth', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bilgeTankHeight">Waste Water Tank Height (m)</Label>
                  <Input
                    id="bilgeTankHeight"
                    type="number"
                    value={data.bilgeTankHeight}
                    onChange={(e) => updateData('bilgeTankHeight', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sludgeTankDiameter">Bilge Tank Diameter (m)</Label>
                  <Input
                    id="sludgeTankDiameter"
                    type="number"
                    value={data.sludgeTankDiameter}
                    onChange={(e) => updateData('sludgeTankDiameter', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sludgeTankHeight">Bilge Tank Height (m)</Label>
                  <Input
                    id="sludgeTankHeight"
                    type="number"
                    value={data.sludgeTankHeight}
                    onChange={(e) => updateData('sludgeTankHeight', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button onClick={calculate} className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Fuel Consumption & Efficiency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5" />
                Fuel Consumption and Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">Current SFOC</Label>
                  <p className="text-2xl font-bold text-info">{result.currentSFOC.toFixed(1)} g/kWh</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Hourly Consumption</Label>
                  <p className="text-2xl font-bold text-green-700">{result.hourlyConsumption.toFixed(1)} kg/h</p>
...
                  <p className="text-2xl font-bold text-orange-700">{result.dailyConsumption.toFixed(1)} ton</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Yield</Label>
                  <p className="text-2xl font-bold text-purple-600">{result.overallEfficiency.toFixed(1)}%</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["fuel"] || []} />
            </CardContent>
          </Card>

          {/* Power Calculations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Power Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Shaft Power</Label>
                  <p className="text-lg font-semibold">{result.shaftPower.toFixed(0)} kW</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Braking Power</Label>
                  <p className="text-lg font-semibold">{result.brakePower.toFixed(0)} kW</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Electric Power</Label>
                  <p className="text-lg font-semibold">{result.electricalPower.toFixed(0)} kW</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Indicated Thermal Efficiency</Label>
                  <p className="text-lg font-semibold">{result.indicatedThermalEfficiency.toFixed(1)}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">IMEP</Label>
                  <p className="text-lg font-semibold">{result.indicatedMeanEffectivePressure.toFixed(1)} bar</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">BMEP</Label>
                  <p className="text-lg font-semibold">{result.brakeSpecificFuelPressure.toFixed(1)} bar</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["power"] || []} />
            </CardContent>
          </Card>

          {/* MARPOL Emissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                MARPOL Annex VI Emissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">NOx Emission</Label>
                  <p className="text-lg font-semibold">{result.noxEmissionRate.toFixed(2)} g/kWh</p>
                  <p className="text-xs text-muted-foreground">
                    Limit (Tier {data.requiredNoxTier}, RPM {data.engineRPM}): {result.noxLimit.toFixed(2)} g/kWh
                  </p>
                  <Badge variant={result.noxCompliance === 'compliant' ? 'default' : 
                                 result.noxCompliance === 'marginal' ? 'secondary' : 'destructive'}>
                    {result.noxCompliance === 'compliant' ? 'Suitable' :
                     result.noxCompliance === 'marginal' ? 'on the border' : 'Not Suitable'}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">SOx Emission</Label>
                  <p className="text-lg font-semibold">{result.soxEmissionRate.toFixed(2)} g/kWh</p>
                  <Badge variant={result.soxCompliance === 'compliant' ? 'default' : 
                                 result.soxCompliance === 'marginal' ? 'secondary' : 'destructive'}>
                    {result.soxCompliance === 'compliant' ? 'Suitable' :
                     result.soxCompliance === 'marginal' ? 'on the border' : 'Not Suitable'}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">CO₂ Emission</Label>
                  <p className="text-lg font-semibold">{(result.co2DailyEmission/1000).toFixed(1)} tons/day</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">MARPOL Tier</Label>
                  <Badge variant="outline">Tier {result.marpolTier}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">ECA Compliance</Label>
                  <Badge variant={result.ecaCompliance ? 'default' : 'destructive'}>
                    {result.ecaCompliance ? 'Compatible' : 'Not Compatible'}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">EEOI</Label>
                  <p className="text-lg font-semibold">{result.eeoi.toFixed(2)} kg CO₂/nm</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["emissions"] || []} />
            </CardContent>
          </Card>

          {/* HFO/MDO Changeover */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                HFO/MDO Transition Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Total Transition Time</Label>
                  <p className="text-lg font-semibold">{result.changeoverTime.toFixed(0)} dakika</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Waste Fuel Volume</Label>
                  <p className="text-lg font-semibold">{result.fuelWasteVolume.toFixed(0)} L</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Estimated Cost</Label>
                  <p className="text-lg font-semibold">${result.changeoverCost.toFixed(0)}</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["changeover"] || []} />
            </CardContent>
          </Card>

          {/* Cooling System */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Cooling System Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Heat Removal Rate</Label>
                  <p className="text-lg font-semibold">{result.heatRejectionRate.toFixed(0)} kW</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Required Cooling Capacity</Label>
                  <p className="text-lg font-semibold">{result.coolingCapacityRequired.toFixed(0)} kW</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Cooling Efficiency</Label>
                  <p className="text-lg font-semibold">{result.coolingEfficiency.toFixed(0)}%</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["cooling"] || []} />
            </CardContent>
          </Card>

          {/* Heat Exchanger */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5" />
                Heat Exchanger Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Required Space</Label>
                  <p className="text-lg font-semibold">{result.heatExchangerArea.toFixed(1)} m²</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Number of Pipes</Label>
                  <p className="text-lg font-semibold">{result.numberOfTubes}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Pipe Length</Label>
                  <p className="text-lg font-semibold">{result.tubeLength.toFixed(1)} m</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Pressure Drop</Label>
                  <p className="text-lg font-semibold">{result.pressureDrop.toFixed(0)} kPa</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Event</Label>
                  <p className="text-lg font-semibold">{result.effectiveness.toFixed(0)}%</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["heatExchanger"] || []} />
            </CardContent>
          </Card>

          {/* Tank Calculations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5" />
                Tank Capacity Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Waste Water Tank Capacity</Label>
                  <p className="text-lg font-semibold">{result.bilgeTankCapacity.toFixed(1)} m³</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Bilge Tank Capacity</Label>
                  <p className="text-lg font-semibold">{result.sludgeTankCapacity.toFixed(1)} m³</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Waste Water Production</Label>
                  <p className="text-lg font-semibold">{result.bilgeGenerationRate.toFixed(1)} L/day</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Bilge Production</Label>
                  <p className="text-lg font-semibold">{result.sludgeGenerationRate.toFixed(1)} L/day</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["tanks"] || []} />
            </CardContent>
          </Card>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-red-700">{warning}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
