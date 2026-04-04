import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Leaf, TrendingDown, BarChart3, AlertTriangle, CheckCircle, Target, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { CalculationStep } from "@/types/calculationSteps";
import { CalculationSteps } from "@/components/ui/calculation-steps";

interface EmissionData {
  // Ship Parameters
  deadweight: number; // Deadweight tonnage (DWT)
  grossTonnage: number; // Gross tonnage (GT)
  shipType: 'Bulk Carrier' | 'Tanker' | 'Container' | 'General Cargo' | 'RoRo' | 'Passenger';
  buildYear: number; // Ship build year
  
  // Fuel Consumption
  annualFuelConsumption: number; // Annual fuel consumption (tonnes)
  fuelType: 'HFO' | 'MDO' | 'MGO' | 'LNG' | 'Methanol' | 'Ammonia';
  sulfurContent: number; // Sulfur content (%)
  
  // Operational Data
  annualDistanceTraveled: number; // Annual distance (nautical miles)
  transportWork: number; // Cargo carried × distance (tonne-miles)
  operatingHours: number; // Annual operating hours
  
  // Engine Data
  mainEngineRating: number; // Main engine rating (kW)
  auxiliaryEngineRating: number; // Auxiliary engine rating (kW)
  mainEngineLoadFactor: number; // Load factor (%)
  auxiliaryEngineLoadFactor: number; // Load factor (%)
  
  // SEEMP Data
  currentCII: number; // Current CII rating
  targetCII: number; // Target CII rating
  baselineYear: number; // Baseline year for comparison
  baselineFuelConsumption: number; // Baseline fuel consumption
  
  // Regional Data
  ecaOperatingTime: number; // Time in ECA (%)
  lowSulfurFuelUsage: number; // Low sulfur fuel usage (%)
  
  // Efficiency Measures
  hullCoatingReduction: number; // Hull coating efficiency (%)
  propellerOptimization: number; // Propeller optimization (%)
  engineTuning: number; // Engine tuning efficiency (%)
  weatherRouting: number; // Weather routing savings (%)
}

interface EmissionResult {
  // Annual Emissions
  co2Emissions: number; // CO2 emissions (tonnes/year)
  soxEmissions: number; // SOx emissions (tonnes/year)
  noxEmissions: number; // NOx emissions (tonnes/year)
  pmEmissions: number; // PM emissions (tonnes/year)
  
  // Emission Factors
  co2EmissionFactor: number; // CO2 emission factor (tonnes CO2/tonne fuel)
  soxEmissionFactor: number; // SOx emission factor
  noxEmissionFactor: number; // NOx emission factor
  
  // CII Calculation
  actualCII: number; // Actual CII (grams CO2/tonne-mile)
  requiredCII: number; // Required CII
  ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  ciiCompliance: boolean;
  
  // EEXI Calculation
  attainedEEXI: number; // Attained EEXI (grams CO2/tonne-mile)
  requiredEEXI: number; // Required EEXI
  eexiCompliance: boolean;
  
  // SEEMP Assessment
  fuelSavings: number; // Annual fuel savings (tonnes)
  emissionReduction: number; // Emission reduction (%)
  costSavings: number; // Annual cost savings ($)
  paybackPeriod: number; // Payback period (years)
  
  // Specific Emissions
  co2PerTonneMile: number; // CO2 per tonne-mile
  co2PerNauticalMile: number; // CO2 per nautical mile
  fuelConsumptionPerDay: number; // Daily fuel consumption
  
  // Environmental Impact
  environmentalScore: number; // Environmental score (0-100)
  complianceStatus: 'excellent' | 'good' | 'acceptable' | 'needs_improvement' | 'critical';
  
  // Future Projections
  futureEmissions2025: number; // Projected 2025 emissions
  futureEmissions2030: number; // Projected 2030 emissions
  requiredReduction: number; // Required emission reduction (%)
  
  recommendations: string[];
  warnings: string[];
}

export const EmissionCalculations = ({ initialTab }: { initialTab?: string } = {}) => {
  const { toast } = useToast();
  const [data, setData] = useState<EmissionData>({
    deadweight: 25000, grossTonnage: 18000, shipType: 'Bulk Carrier', buildYear: 2015,
    annualFuelConsumption: 2400, fuelType: 'HFO', sulfurContent: 0.5,
    annualDistanceTraveled: 85000, transportWork: 520000000, operatingHours: 6500,
    mainEngineRating: 8500, auxiliaryEngineRating: 1200,
    mainEngineLoadFactor: 75, auxiliaryEngineLoadFactor: 60,
    currentCII: 12.5, targetCII: 10.8, baselineYear: 2019, baselineFuelConsumption: 2800,
    ecaOperatingTime: 25, lowSulfurFuelUsage: 35,
    hullCoatingReduction: 3, propellerOptimization: 5, engineTuning: 2, weatherRouting: 4
  });

  const [result, setResult] = useState<EmissionResult | null>(null);
  const [calcSteps, setCalcSteps] = useState<Record<string, CalculationStep[]>>({});


  // Emission factors by fuel type (tonnes CO2/tonne fuel)
  const emissionFactors = {
    'HFO': { co2: 3.114, sox: 0.054, nox: 0.087, pm: 0.0012 },
    'MDO': { co2: 3.206, sox: 0.001, nox: 0.081, pm: 0.0008 },
    'MGO': { co2: 3.206, sox: 0.001, nox: 0.081, pm: 0.0008 },
    'LNG': { co2: 2.750, sox: 0.000, nox: 0.051, pm: 0.0001 },
    'Methanol': { co2: 1.375, sox: 0.000, nox: 0.031, pm: 0.0001 },
    'Ammonia': { co2: 0.000, sox: 0.000, nox: 0.000, pm: 0.0000 }
  };

  // CII reference lines by ship type
  const ciiReferences = {
    'Bulk Carrier': { a: 4745, c: 0.622 },
    'Tanker': { a: 5247, c: 0.610 },
    'Container': { a: 1984, c: 0.489 },
    'General Cargo': { a: 31948, c: 0.792 },
    'RoRo': { a: 5739, c: 0.631 },
    'Passenger': { a: 930, c: 0.383 }
  };

  const calculateEmissions = () => {
    const factors = emissionFactors[data.fuelType];
    
    // Adjust SOx for actual sulfur content
    const adjustedSoxFactor = data.fuelType === 'HFO' ? 
      factors.sox * (data.sulfurContent / 3.5) : factors.sox;
    
    const co2Emissions = data.annualFuelConsumption * factors.co2;
    const soxEmissions = data.annualFuelConsumption * adjustedSoxFactor;
    const noxEmissions = data.annualFuelConsumption * factors.nox;
    const pmEmissions = data.annualFuelConsumption * factors.pm;
    
    return {
      co2Emissions,
      soxEmissions,
      noxEmissions,
      pmEmissions,
      co2EmissionFactor: factors.co2,
      soxEmissionFactor: adjustedSoxFactor,
      noxEmissionFactor: factors.nox
    };
  };

  const calculateCII = () => {
    const co2Emissions = data.annualFuelConsumption * emissionFactors[data.fuelType].co2;
    const actualCII = (co2Emissions * 1000000) / data.transportWork; // grams CO2/tonne-mile
    
    const reference = ciiReferences[data.shipType];
    const currentYear = new Date().getFullYear();
    const reductionFactor = 1 - ((currentYear - 2019) * 0.02); // 2% reduction per year
    
    const requiredCII = reference.a * Math.pow(data.deadweight, -reference.c) * reductionFactor;
    
    // CII rating calculation
    let ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
    const ratio = actualCII / requiredCII;
    
    if (ratio <= 0.78) ciiRating = 'A';
    else if (ratio <= 0.94) ciiRating = 'B';
    else if (ratio <= 1.06) ciiRating = 'C';
    else if (ratio <= 1.18) ciiRating = 'D';
    else ciiRating = 'E';
    
    const ciiCompliance = ciiRating <= 'C';
    
    return {
      actualCII,
      requiredCII,
      ciiRating,
      ciiCompliance
    };
  };

  const calculateEEXI = () => {
    // Simplified EEXI calculation
    const mainEngineCO2 = (data.mainEngineRating * data.mainEngineLoadFactor / 100) * 
                         emissionFactors[data.fuelType].co2 * 0.185; // SFOC approximation
    
    const auxEngineCO2 = (data.auxiliaryEngineRating * data.auxiliaryEngineLoadFactor / 100) * 
                        emissionFactors[data.fuelType].co2 * 0.215;
    
    const attainedEEXI = (mainEngineCO2 + auxEngineCO2) * 1000 / data.deadweight;
    
    // Required EEXI (based on ship type and size)
    const reference = ciiReferences[data.shipType];
    const requiredEEXI = reference.a * Math.pow(data.deadweight, -reference.c) * 0.75; // 25% reduction
    
    const eexiCompliance = attainedEEXI <= requiredEEXI;
    
    return {
      attainedEEXI,
      requiredEEXI,
      eexiCompliance
    };
  };

  const calculateSEEMP = () => {
    // Calculate potential savings from efficiency measures
    const totalEfficiencyGain = data.hullCoatingReduction + data.propellerOptimization + 
                               data.engineTuning + data.weatherRouting;
    
    const fuelSavings = data.annualFuelConsumption * (totalEfficiencyGain / 100);
    const emissionReduction = (fuelSavings / data.annualFuelConsumption) * 100;
    
    // Cost savings (assuming $600/tonne fuel)
    const costSavings = fuelSavings * 600;
    
    // Investment cost estimation (simplified)
    const investmentCost = data.deadweight * 50; // $50 per DWT approximation
    const paybackPeriod = investmentCost / costSavings;
    
    return {
      fuelSavings,
      emissionReduction,
      costSavings,
      paybackPeriod
    };
  };

  const calculateEnvironmentalScore = (ciiRating: string, eexiCompliance: boolean) => {
    let score = 50; // Base score
    
    // CII rating impact
    switch (ciiRating) {
      case 'A': score += 25; break;
      case 'B': score += 15; break;
      case 'C': score += 5; break;
      case 'D': score -= 10; break;
      case 'E': score -= 25; break;
    }
    
    // EEXI compliance
    if (eexiCompliance) score += 15;
    else score -= 15;
    
    // Low sulfur fuel usage
    score += (data.lowSulfurFuelUsage / 100) * 10;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateFutureProjections = (currentEmissions: number) => {
    // IMO targets: 40% by 2030, 70% by 2050
    const baselineEmissions = data.baselineFuelConsumption * emissionFactors[data.fuelType].co2;
    
    const futureEmissions2025 = currentEmissions * 0.8; // 20% reduction
    const futureEmissions2030 = currentEmissions * 0.6; // 40% reduction
    
    const requiredReduction = ((currentEmissions - futureEmissions2030) / currentEmissions) * 100;
    
    return {
      futureEmissions2025,
      futureEmissions2030,
      requiredReduction
    };
  };

  const calculate = () => {
    try {
      const emissions = calculateEmissions();
      const cii = calculateCII();
      const eexi = calculateEEXI();
      const seemp = calculateSEEMP();
      
      // Specific calculations
      const co2PerTonneMile = (emissions.co2Emissions * 1000000) / data.transportWork;
      const co2PerNauticalMile = emissions.co2Emissions / data.annualDistanceTraveled;
      const fuelConsumptionPerDay = data.annualFuelConsumption / 365;
      
      const environmentalScore = calculateEnvironmentalScore(cii.ciiRating, eexi.eexiCompliance);
      
      let complianceStatus: 'excellent' | 'good' | 'acceptable' | 'needs_improvement' | 'critical';
      if (environmentalScore >= 80) complianceStatus = 'excellent';
      else if (environmentalScore >= 65) complianceStatus = 'good';
      else if (environmentalScore >= 50) complianceStatus = 'acceptable';
      else if (environmentalScore >= 35) complianceStatus = 'needs_improvement';
      else complianceStatus = 'critical';
      
      const futureProjections = calculateFutureProjections(emissions.co2Emissions);
      
      // Recommendations and warnings
      const recommendations = [];
      const warnings = [];
      
      if (cii.ciiRating === 'D' || cii.ciiRating === 'E') {
        warnings.push("CII rating is below acceptable level - immediate action required");
        recommendations.push("Implement SEEMP measures: hull coating, propeller optimization, engine tuning");
      }
      
      if (!eexi.eexiCompliance) {
        warnings.push("EEXI not compliant - ship may need technical modifications");
      }
      
      if (data.ecaOperatingTime > 50 && data.lowSulfurFuelUsage < 50) {
        recommendations.push("Increase low sulfur fuel usage for ECA compliance");
      }
      
      if (seemp.paybackPeriod > 5) {
        recommendations.push("Consider more cost-effective efficiency measures");
      }
      
      if (environmentalScore < 60) {
        recommendations.push("Develop comprehensive green shipping strategy");
      }
      
      const calculatedResult: EmissionResult = {
        co2Emissions: emissions.co2Emissions,
        soxEmissions: emissions.soxEmissions,
        noxEmissions: emissions.noxEmissions,
        pmEmissions: emissions.pmEmissions,
        co2EmissionFactor: emissions.co2EmissionFactor,
        soxEmissionFactor: emissions.soxEmissionFactor,
        noxEmissionFactor: emissions.noxEmissionFactor,
        actualCII: cii.actualCII,
        requiredCII: cii.requiredCII,
        ciiRating: cii.ciiRating,
        ciiCompliance: cii.ciiCompliance,
        attainedEEXI: eexi.attainedEEXI,
        requiredEEXI: eexi.requiredEEXI,
        eexiCompliance: eexi.eexiCompliance,
        fuelSavings: seemp.fuelSavings,
        emissionReduction: seemp.emissionReduction,
        costSavings: seemp.costSavings,
        paybackPeriod: seemp.paybackPeriod,
        co2PerTonneMile,
        co2PerNauticalMile,
        fuelConsumptionPerDay,
        environmentalScore,
        complianceStatus,
        futureEmissions2025: futureProjections.futureEmissions2025,
        futureEmissions2030: futureProjections.futureEmissions2030,
        requiredReduction: futureProjections.requiredReduction,
        recommendations,
        warnings
      };

      setResult(calculatedResult);

      // Emisyon hesaplama adimlari
      const factors = emissionFactors[data.fuelType];
      const adjustedSoxFactor = data.fuelType === 'HFO' ?
        factors.sox * (data.sulfurContent / 3.5) : factors.sox;

      const emissionSteps: CalculationStep[] = [
        {
          step: 1,
          title: "CO2 emisyon faktoru belirlenmesi",
          formula: "CO2_faktor = Yakit_Tipi_Faktoru",
          substitution: `CO2_faktor = ${factors.co2} (${data.fuelType})`,
          result: `${factors.co2} ton CO2/ton yakit`,
          explanation: `${data.fuelType} yakit tipi icin standart CO2 emisyon faktoru kullanilmaktadir.`
        },
        {
          step: 2,
          title: "SOx emisyon faktoru ayarlamasi",
          formula: data.fuelType === 'HFO' ? "SOx_faktor = Baz_SOx_faktor x (Kukurt_Icerik / 3.5)" : "SOx_faktor = Baz_SOx_faktor",
          substitution: data.fuelType === 'HFO' ? `SOx_faktor = ${factors.sox} x (${data.sulfurContent} / 3.5)` : `SOx_faktor = ${factors.sox}`,
          result: `${adjustedSoxFactor.toFixed(6)}`,
          explanation: data.fuelType === 'HFO'
            ? `HFO icin SOx faktoru, gercek kukurt icerigine (%${data.sulfurContent}) gore ayarlanmaktadir.`
            : `${data.fuelType} yakit tipi icin standart SOx emisyon faktoru kullanilmaktadir.`
        },
        {
          step: 3,
          title: "Yillik CO2 emisyonu hesabi",
          formula: "CO2 = Yillik_Yakit_Tuketimi x CO2_faktor",
          substitution: `CO2 = ${data.annualFuelConsumption} x ${factors.co2}`,
          result: `${emissions.co2Emissions.toFixed(2)} ton/yil`,
          explanation: "Yillik yakit tuketimi ile CO2 emisyon faktoru carpilarak toplam CO2 emisyonu bulunur."
        },
        {
          step: 4,
          title: "Yillik SOx emisyonu hesabi",
          formula: "SOx = Yillik_Yakit_Tuketimi x SOx_faktor",
          substitution: `SOx = ${data.annualFuelConsumption} x ${adjustedSoxFactor.toFixed(6)}`,
          result: `${emissions.soxEmissions.toFixed(2)} ton/yil`,
          explanation: "Kukurt oksit emisyonu, yakit tuketimi ve ayarlanmis SOx faktoru ile hesaplanir."
        },
        {
          step: 5,
          title: "Yillik NOx emisyonu hesabi",
          formula: "NOx = Yillik_Yakit_Tuketimi x NOx_faktor",
          substitution: `NOx = ${data.annualFuelConsumption} x ${factors.nox}`,
          result: `${emissions.noxEmissions.toFixed(2)} ton/yil`,
          explanation: "Nitrojen oksit emisyonu, yakit tuketimi ve NOx faktoru ile hesaplanir."
        },
        {
          step: 6,
          title: "Yillik PM emisyonu hesabi",
          formula: "PM = Yillik_Yakit_Tuketimi x PM_faktor",
          substitution: `PM = ${data.annualFuelConsumption} x ${factors.pm}`,
          result: `${emissions.pmEmissions.toFixed(4)} ton/yil`,
          explanation: "Partikul madde emisyonu, yakit tuketimi ve PM faktoru ile hesaplanir."
        }
      ];

      // CII hesaplama adimlari
      const co2ForCII = emissions.co2Emissions;
      const reference = ciiReferences[data.shipType];
      const currentYear = new Date().getFullYear();
      const reductionFactor = 1 - ((currentYear - 2019) * 0.02);
      const refCIIBase = reference.a * Math.pow(data.deadweight, -reference.c);

      const ciiSteps: CalculationStep[] = [
        {
          step: 1,
          title: "CO2 emisyonunun gram cinsine cevirilmesi",
          formula: "CO2_gram = CO2_ton x 1.000.000",
          substitution: `CO2_gram = ${co2ForCII.toFixed(2)} x 1.000.000`,
          result: `${(co2ForCII * 1000000).toFixed(0)} g`,
          explanation: "CII hesabi icin CO2 emisyonu gram cinsine donusturulur."
        },
        {
          step: 2,
          title: "Gerceklesen CII hesabi",
          formula: "CII_gercek = (CO2_gram) / Tasima_Isi",
          substitution: `CII_gercek = ${(co2ForCII * 1000000).toFixed(0)} / ${data.transportWork}`,
          result: `${cii.actualCII.toFixed(4)} g CO2/ton-mil`,
          explanation: "Gerceklesen CII, toplam CO2 emisyonunun (gram) tasima isine bolunmesiyle bulunur."
        },
        {
          step: 3,
          title: "Referans CII degerinin hesaplanmasi",
          formula: "CII_ref = a x DWT^(-c)",
          substitution: `CII_ref = ${reference.a} x ${data.deadweight}^(-${reference.c})`,
          result: `${refCIIBase.toFixed(4)} g CO2/ton-mil`,
          explanation: `${data.shipType} gemi tipi icin referans parametreleri: a=${reference.a}, c=${reference.c}.`
        },
        {
          step: 4,
          title: "Yillik azaltma faktorunun uygulanmasi",
          formula: "Azaltma_Faktoru = 1 - ((Mevcut_Yil - 2019) x 0.02)",
          substitution: `Azaltma_Faktoru = 1 - ((${currentYear} - 2019) x 0.02)`,
          result: `${reductionFactor.toFixed(4)}`,
          explanation: `2019'dan itibaren yilda %2 azaltma gereksinimi uygulanir. ${currentYear} icin toplam %${((currentYear - 2019) * 2)} azaltma.`
        },
        {
          step: 5,
          title: "Gerekli CII hesabi",
          formula: "CII_gerekli = CII_ref x Azaltma_Faktoru",
          substitution: `CII_gerekli = ${refCIIBase.toFixed(4)} x ${reductionFactor.toFixed(4)}`,
          result: `${cii.requiredCII.toFixed(4)} g CO2/ton-mil`,
          explanation: "Gerekli CII, referans deger ile azaltma faktorunun carpimidir."
        },
        {
          step: 6,
          title: "CII derecelendirmesi",
          formula: "Oran = CII_gercek / CII_gerekli",
          substitution: `Oran = ${cii.actualCII.toFixed(4)} / ${cii.requiredCII.toFixed(4)}`,
          result: `${(cii.actualCII / cii.requiredCII).toFixed(4)} => Derece: ${cii.ciiRating}`,
          explanation: "Oran <= 0.78: A, <= 0.94: B, <= 1.06: C, <= 1.18: D, > 1.18: E olarak derecelendirilir."
        }
      ];

      // EEXI hesaplama adimlari
      const mainEngineCO2 = (data.mainEngineRating * data.mainEngineLoadFactor / 100) * factors.co2 * 0.185;
      const auxEngineCO2 = (data.auxiliaryEngineRating * data.auxiliaryEngineLoadFactor / 100) * factors.co2 * 0.215;
      const mainEngineEffective = data.mainEngineRating * data.mainEngineLoadFactor / 100;
      const auxEngineEffective = data.auxiliaryEngineRating * data.auxiliaryEngineLoadFactor / 100;

      const eexiSteps: CalculationStep[] = [
        {
          step: 1,
          title: "Ana motor efektif gucunun hesaplanmasi",
          formula: "P_ana = Ana_Motor_Gucu x Yuk_Faktoru / 100",
          substitution: `P_ana = ${data.mainEngineRating} x ${data.mainEngineLoadFactor} / 100`,
          result: `${mainEngineEffective.toFixed(2)} kW`,
          explanation: "Ana motorun efektif gucu, nominal guc ile yuk faktorunun carpimidir."
        },
        {
          step: 2,
          title: "Ana motor CO2 katki hesabi",
          formula: "CO2_ana = P_ana x CO2_faktor x SFOC",
          substitution: `CO2_ana = ${mainEngineEffective.toFixed(2)} x ${factors.co2} x 0.185`,
          result: `${mainEngineCO2.toFixed(4)}`,
          explanation: "Ana motor CO2 katkisi; efektif guc, emisyon faktoru ve yakit tuketim oraninin (SFOC = 0.185) carpimidir."
        },
        {
          step: 3,
          title: "Yardimci motor efektif gucunun hesaplanmasi",
          formula: "P_yard = Yard_Motor_Gucu x Yuk_Faktoru / 100",
          substitution: `P_yard = ${data.auxiliaryEngineRating} x ${data.auxiliaryEngineLoadFactor} / 100`,
          result: `${auxEngineEffective.toFixed(2)} kW`,
          explanation: "Yardimci motorun efektif gucu, nominal guc ile yuk faktorunun carpimidir."
        },
        {
          step: 4,
          title: "Yardimci motor CO2 katki hesabi",
          formula: "CO2_yard = P_yard x CO2_faktor x SFOC",
          substitution: `CO2_yard = ${auxEngineEffective.toFixed(2)} x ${factors.co2} x 0.215`,
          result: `${auxEngineCO2.toFixed(4)}`,
          explanation: "Yardimci motor CO2 katkisi; efektif guc, emisyon faktoru ve yakit tuketim oraninin (SFOC = 0.215) carpimidir."
        },
        {
          step: 5,
          title: "Elde edilen EEXI hesabi",
          formula: "EEXI_elde = (CO2_ana + CO2_yard) x 1000 / DWT",
          substitution: `EEXI_elde = (${mainEngineCO2.toFixed(4)} + ${auxEngineCO2.toFixed(4)}) x 1000 / ${data.deadweight}`,
          result: `${eexi.attainedEEXI.toFixed(4)} g CO2/ton-mil`,
          explanation: "Elde edilen EEXI, toplam CO2 katkisinin 1000 ile carpilip DWT'ye bolunmesiyle bulunur."
        },
        {
          step: 6,
          title: "Gerekli EEXI hesabi",
          formula: "EEXI_gerekli = a x DWT^(-c) x 0.75",
          substitution: `EEXI_gerekli = ${reference.a} x ${data.deadweight}^(-${reference.c}) x 0.75`,
          result: `${eexi.requiredEEXI.toFixed(4)} g CO2/ton-mil`,
          explanation: "Gerekli EEXI, referans degerden %25 azaltma uygulanarak hesaplanir."
        },
        {
          step: 7,
          title: "EEXI uygunluk kontrolu",
          formula: "Uygunluk = EEXI_elde <= EEXI_gerekli",
          substitution: `${eexi.attainedEEXI.toFixed(4)} <= ${eexi.requiredEEXI.toFixed(4)}`,
          result: eexi.eexiCompliance ? "Uygun" : "Uygun Degil",
          explanation: eexi.eexiCompliance
            ? "Elde edilen EEXI, gerekli degerin altinda oldugundan gemi uygundur."
            : "Elde edilen EEXI, gerekli degeri astigindan teknik iyilestirme gerekmektedir."
        }
      ];

      // SEEMP hesaplama adimlari
      const totalEfficiencyGain = data.hullCoatingReduction + data.propellerOptimization +
                                  data.engineTuning + data.weatherRouting;
      const investmentCost = data.deadweight * 50;

      const seempSteps: CalculationStep[] = [
        {
          step: 1,
          title: "Toplam verimlilik kazancinin hesaplanmasi",
          formula: "Toplam_Verim = Govde_Kaplama + Pervane_Opt + Motor_Ayar + Hava_Rota",
          substitution: `Toplam_Verim = ${data.hullCoatingReduction} + ${data.propellerOptimization} + ${data.engineTuning} + ${data.weatherRouting}`,
          result: `%${totalEfficiencyGain.toFixed(1)}`,
          explanation: "Tum verimlilik onlemlerinin toplam kazanci hesaplanir."
        },
        {
          step: 2,
          title: "Yillik yakit tasarrufu hesabi",
          formula: "Yakit_Tasarrufu = Yillik_Tuketim x (Toplam_Verim / 100)",
          substitution: `Yakit_Tasarrufu = ${data.annualFuelConsumption} x (${totalEfficiencyGain.toFixed(1)} / 100)`,
          result: `${seemp.fuelSavings.toFixed(2)} ton/yil`,
          explanation: "Verimlilik kazanci oraninda yakit tasarrufu saglanir."
        },
        {
          step: 3,
          title: "Emisyon azaltma orani",
          formula: "Emisyon_Azalma = (Yakit_Tasarrufu / Yillik_Tuketim) x 100",
          substitution: `Emisyon_Azalma = (${seemp.fuelSavings.toFixed(2)} / ${data.annualFuelConsumption}) x 100`,
          result: `%${seemp.emissionReduction.toFixed(2)}`,
          explanation: "Yakit tasarrufu orani dogrudan emisyon azaltma oranina karsilik gelir."
        },
        {
          step: 4,
          title: "Yillik maliyet tasarrufu hesabi",
          formula: "Maliyet_Tasarrufu = Yakit_Tasarrufu x Yakit_Fiyati",
          substitution: `Maliyet_Tasarrufu = ${seemp.fuelSavings.toFixed(2)} x 600`,
          result: `$${seemp.costSavings.toFixed(0)}/yil`,
          explanation: "Yakit fiyati ton basina $600 olarak varsayilmistir."
        },
        {
          step: 5,
          title: "Yatirim maliyeti tahmini",
          formula: "Yatirim = DWT x 50",
          substitution: `Yatirim = ${data.deadweight} x 50`,
          result: `$${investmentCost.toFixed(0)}`,
          explanation: "Yaklasik yatirim maliyeti DWT basina $50 olarak tahmin edilmistir."
        },
        {
          step: 6,
          title: "Geri odeme suresi hesabi",
          formula: "Geri_Odeme = Yatirim / Yillik_Tasarruf",
          substitution: `Geri_Odeme = ${investmentCost.toFixed(0)} / ${seemp.costSavings.toFixed(0)}`,
          result: `${seemp.paybackPeriod.toFixed(2)} yil`,
          explanation: "Yatirim maliyetinin yillik tasarrufa bolunmesiyle geri odeme suresi bulunur."
        }
      ];

      // Gelecek projeksiyonlari hesaplama adimlari
      const futureSteps: CalculationStep[] = [
        {
          step: 1,
          title: "Mevcut CO2 emisyonunun belirlenmesi",
          formula: "Mevcut_CO2 = Yillik_Yakit x CO2_faktor",
          substitution: `Mevcut_CO2 = ${data.annualFuelConsumption} x ${factors.co2}`,
          result: `${emissions.co2Emissions.toFixed(2)} ton/yil`,
          explanation: "Gelecek projeksiyonlari icin mevcut emisyon degeri temel alinir."
        },
        {
          step: 2,
          title: "2025 hedef emisyon hesabi",
          formula: "Hedef_2025 = Mevcut_CO2 x 0.80",
          substitution: `Hedef_2025 = ${emissions.co2Emissions.toFixed(2)} x 0.80`,
          result: `${futureProjections.futureEmissions2025.toFixed(2)} ton`,
          explanation: "IMO hedeflerine gore 2025 yilina kadar %20 azaltma ongorulmektedir."
        },
        {
          step: 3,
          title: "2030 hedef emisyon hesabi",
          formula: "Hedef_2030 = Mevcut_CO2 x 0.60",
          substitution: `Hedef_2030 = ${emissions.co2Emissions.toFixed(2)} x 0.60`,
          result: `${futureProjections.futureEmissions2030.toFixed(2)} ton`,
          explanation: "IMO hedeflerine gore 2030 yilina kadar %40 azaltma ongorulmektedir."
        },
        {
          step: 4,
          title: "Gerekli azaltma oraninin hesaplanmasi",
          formula: "Gerekli_Azalma = ((Mevcut - Hedef_2030) / Mevcut) x 100",
          substitution: `Gerekli_Azalma = ((${emissions.co2Emissions.toFixed(2)} - ${futureProjections.futureEmissions2030.toFixed(2)}) / ${emissions.co2Emissions.toFixed(2)}) x 100`,
          result: `%${futureProjections.requiredReduction.toFixed(2)}`,
          explanation: "2030 hedefine ulasmak icin gereken toplam emisyon azaltma yuzdesi."
        }
      ];

      setCalcSteps({
        emissions: emissionSteps,
        cii: ciiSteps,
        eexi: eexiSteps,
        seemp: seempSteps,
        future: futureSteps
      });

      toast({
        title: "Hesaplama Tamamlandi",
        description: "Emisyon ve cevresel hesaplamalar basariyla tamamlandi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Hesaplama sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const updateData = (field: keyof EmissionData, value: number | string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Emisyon ve Çevresel Hesaplamalar
          </CardTitle>
          <CardDescription>
            CO2, SOx, NOx emisyonları, CII, EEXI, SEEMP hesaplamaları ve çevresel değerlendirme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={initialTab || "ship"} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ship">Gemi</TabsTrigger>
              <TabsTrigger value="fuel">Yakıt</TabsTrigger>
              <TabsTrigger value="operation">Operasyon</TabsTrigger>
              <TabsTrigger value="efficiency">Verimlilik</TabsTrigger>
            </TabsList>

            <TabsContent value="ship" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadweight">Deadweight (DWT)</Label>
                  <Input
                    id="deadweight"
                    type="number"
                    value={data.deadweight}
                    onChange={(e) => updateData('deadweight', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grossTonnage">Gross Tonnage (GT)</Label>
                  <Input
                    id="grossTonnage"
                    type="number"
                    value={data.grossTonnage}
                    onChange={(e) => updateData('grossTonnage', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buildYear">İnşa Yılı</Label>
                  <Input
                    id="buildYear"
                    type="number"
                    value={data.buildYear}
                    onChange={(e) => updateData('buildYear', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mainEngineRating">Ana Motor Gücü (kW)</Label>
                  <Input
                    id="mainEngineRating"
                    type="number"
                    value={data.mainEngineRating}
                    onChange={(e) => updateData('mainEngineRating', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fuel" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualFuelConsumption">Yıllık Yakıt Tüketimi (ton)</Label>
                  <Input
                    id="annualFuelConsumption"
                    type="number"
                    value={data.annualFuelConsumption}
                    onChange={(e) => updateData('annualFuelConsumption', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sulfurContent">Kükürt İçeriği (%)</Label>
                  <Input
                    id="sulfurContent"
                    type="number"
                    step="0.1"
                    value={data.sulfurContent}
                    onChange={(e) => updateData('sulfurContent', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ecaOperatingTime">ECA'da Faaliyet (%)</Label>
                  <Input
                    id="ecaOperatingTime"
                    type="number"
                    value={data.ecaOperatingTime}
                    onChange={(e) => updateData('ecaOperatingTime', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lowSulfurFuelUsage">Düşük Kükürtlü Yakıt (%)</Label>
                  <Input
                    id="lowSulfurFuelUsage"
                    type="number"
                    value={data.lowSulfurFuelUsage}
                    onChange={(e) => updateData('lowSulfurFuelUsage', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="operation" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualDistanceTraveled">Yıllık Mesafe (mil)</Label>
                  <Input
                    id="annualDistanceTraveled"
                    type="number"
                    value={data.annualDistanceTraveled}
                    onChange={(e) => updateData('annualDistanceTraveled', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transportWork">Taşıma İşi (ton-mil)</Label>
                  <Input
                    id="transportWork"
                    type="number"
                    value={data.transportWork}
                    onChange={(e) => updateData('transportWork', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operatingHours">Çalışma Saati (yıllık)</Label>
                  <Input
                    id="operatingHours"
                    type="number"
                    value={data.operatingHours}
                    onChange={(e) => updateData('operatingHours', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentCII">Mevcut CII</Label>
                  <Input
                    id="currentCII"
                    type="number"
                    step="0.1"
                    value={data.currentCII}
                    onChange={(e) => updateData('currentCII', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="efficiency" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hullCoatingReduction">Gövde Kaplama Verimi (%)</Label>
                  <Input
                    id="hullCoatingReduction"
                    type="number"
                    step="0.1"
                    value={data.hullCoatingReduction}
                    onChange={(e) => updateData('hullCoatingReduction', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propellerOptimization">Pervane Optimizasyonu (%)</Label>
                  <Input
                    id="propellerOptimization"
                    type="number"
                    step="0.1"
                    value={data.propellerOptimization}
                    onChange={(e) => updateData('propellerOptimization', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engineTuning">Motor Ayarı (%)</Label>
                  <Input
                    id="engineTuning"
                    type="number"
                    step="0.1"
                    value={data.engineTuning}
                    onChange={(e) => updateData('engineTuning', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weatherRouting">Hava Rotası (%)</Label>
                  <Input
                    id="weatherRouting"
                    type="number"
                    step="0.1"
                    value={data.weatherRouting}
                    onChange={(e) => updateData('weatherRouting', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button onClick={calculate} className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Hesapla
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Yıllık Emisyonlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">CO₂ Emisyonu</Label>
                  <p className="text-2xl font-bold text-red-600">{result.co2Emissions.toFixed(0)} ton/yıl</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">SOₓ Emisyonu</Label>
                  <p className="text-2xl font-bold text-orange-700">{result.soxEmissions.toFixed(1)} ton/yıl</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">NOₓ Emisyonu</Label>
                  <p className="text-2xl font-bold text-yellow-600">{result.noxEmissions.toFixed(1)} ton/yıl</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">PM Emisyonu</Label>
                  <p className="text-2xl font-bold text-purple-600">{result.pmEmissions.toFixed(2)} ton/yıl</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["emissions"] || []} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                CII ve EEXI Değerlendirmesi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">CII Rating</Label>
                  <Badge variant={
                    result.ciiRating === 'A' ? 'default' :
                    result.ciiRating === 'B' ? 'secondary' :
                    result.ciiRating === 'C' ? 'outline' : 'destructive'
                  } className="text-lg p-2">
                    {result.ciiRating}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">CII Uygunluğu</Label>
                  <Badge variant={result.ciiCompliance ? 'default' : 'destructive'}>
                    {result.ciiCompliance ? 'Uygun' : 'Uygun Değil'}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Actual CII</Label>
                  <p className="text-lg font-semibold">{result.actualCII.toFixed(2)} g/ton-mil</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Required CII</Label>
                  <p className="text-lg font-semibold">{result.requiredCII.toFixed(2)} g/ton-mil</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">EEXI Uygunluğu</Label>
                  <Badge variant={result.eexiCompliance ? 'default' : 'destructive'}>
                    {result.eexiCompliance ? 'Uygun' : 'Uygun Değil'}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Çevresel Skor</Label>
                  <p className="text-2xl font-bold text-green-700">{result.environmentalScore.toFixed(0)}/100</p>
...
                  <p className="text-2xl font-bold text-green-700">{result.fuelSavings.toFixed(0)} ton/yıl</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Emisyon Azalması</Label>
                  <p className="text-2xl font-bold text-info">{result.emissionReduction.toFixed(1)}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Maliyet Tasarrufu</Label>
                  <p className="text-lg font-semibold">${result.costSavings.toFixed(0)}/yıl</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Geri Ödeme Süresi</Label>
                  <p className="text-lg font-semibold">{result.paybackPeriod.toFixed(1)} yıl</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["cii"] || []} />
              <CalculationSteps steps={calcSteps["eexi"] || []} />
              <CalculationSteps steps={calcSteps["seemp"] || []} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Gelecek Projeksiyonları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">2025 Hedef Emisyon</Label>
                  <p className="text-lg font-semibold">{result.futureEmissions2025.toFixed(0)} ton</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">2030 Hedef Emisyon</Label>
                  <p className="text-lg font-semibold">{result.futureEmissions2030.toFixed(0)} ton</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Gerekli Azalma</Label>
                  <p className="text-lg font-semibold">{result.requiredReduction.toFixed(1)}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Uygunluk Durumu</Label>
                  <Badge variant={
                    result.complianceStatus === 'excellent' ? 'default' :
                    result.complianceStatus === 'good' ? 'secondary' :
                    result.complianceStatus === 'acceptable' ? 'outline' : 'destructive'
                  }>
                    {result.complianceStatus === 'excellent' ? 'Mükemmel' :
                     result.complianceStatus === 'good' ? 'İyi' :
                     result.complianceStatus === 'acceptable' ? 'Kabul Edilebilir' :
                     result.complianceStatus === 'needs_improvement' ? 'İyileştirme Gerekli' : 'Kritik'}
                  </Badge>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["future"] || []} />
            </CardContent>
          </Card>

          {result.warnings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Uyarılar
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

          {result.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Öneriler
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