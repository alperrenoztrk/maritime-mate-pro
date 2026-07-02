import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Waves, TrendingUp, BarChart3, Activity, AlertTriangle, CheckCircle, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { CalculationStep } from "@/types/calculationSteps";
import { CalculationSteps } from "@/components/ui/calculation-steps";

interface HydrodynamicsData {
  // Ship Principal Dimensions
  shipLength: number; // Length between perpendiculars (m)
  shipBeam: number; // Beam (m)
  shipDraft: number; // Draft (m)
  displacement: number; // Displacement (tonnes)
  blockCoefficient: number; // Block coefficient (Cb)
  prismaticCoefficient: number; // Prismatic coefficient (Cp)
  wateplaneCoefficient: number; // Waterplane coefficient (Cwp)
  
  // Ship Speed & Power
  shipSpeed: number; // Ship speed (knots)
  enginePower: number; // Engine power (kW)
  propellerDiameter: number; // Propeller diameter (m)
  propellerRPM: number; // Propeller RPM
  
  // Wave & Environmental Conditions
  waveHeight: number; // Significant wave height (m)
  waveLength: number; // Wave length (m)
  wavePeriod: number; // Wave period (s)
  waveDirection: number; // Wave direction relative to ship (degrees)
  windSpeed: number; // Wind speed (knots)
  
  // Hull Form Parameters
  entranceAngle: number; // Entrance angle (degrees)
  lcbPosition: number; // LCB position (% from midships)
  wetSurfaceArea: number; // Wetted surface area (m²)
  
  // Motion & Stability
  radiusOfGyration: number; // Radius of gyration (m)
  metacentricHeight: number; // GM (m)
  naturalRollPeriod: number; // Natural roll period (s)
  dampingCoefficient: number; // Damping coefficient
  heaveAmplitude: number; // Heave amplitude (m)
  pitchAmplitude: number; // Pitch amplitude (degrees)
  
  // Propulsion System
  propellerPitch: number; // Propeller pitch (m)
  numberOfBlades: number; // Number of propeller blades
  expandedAreaRatio: number; // Expanded area ratio (EAR)
  thrust: number; // Thrust (kN)
}

interface HydrodynamicsResult {
  // Froude Number & Resistance
  froudeNumber: number; // Froude number
  reynoldsNumber: number; // Reynolds number
  totalResistance: number; // Total resistance (kN)
  waveResistance: number; // Wave resistance (kN)
  viscousResistance: number; // Viscous resistance (kN)
  formFactor: number; // Form factor (1+k)
  residualResistance: number; // Residual resistance (kN)
  
  // Propulsion Efficiency
  propellerEfficiency: number; // Propeller efficiency (%)
  hullEfficiency: number; // Hull efficiency (%)
  relativeRotativeEfficiency: number; // Relative rotative efficiency (%)
  totalPropulsiveEfficiency: number; // Total propulsive efficiency (%)
  thrustDeduction: number; // Thrust deduction factor
  wakeDeduction: number; // Wake deduction factor
  
  // Ship Motions
  rollAmplitude: number; // Roll amplitude (degrees)
  pitchAmplitude: number; // Pitch amplitude (degrees)
  heaveAmplitude: number; // Heave amplitude (m)
  rollPeriod: number; // Roll period (s)
  pitchPeriod: number; // Pitch period (s)
  heavePeriod: number; // Heave period (s)
  
  // Motion Criteria
  rollAcceleration: number; // Roll acceleration (degrees/s²)
  verticalAcceleration: number; // Vertical acceleration (m/s²)
  lateralAcceleration: number; // Lateral acceleration (m/s²)
  slamming: boolean; // Slamming occurrence
  slammingProbability: number; // Slamming probability (%)
  
  // Seakeeping Assessment
  seakeepingIndex: number; // Seakeeping index (0-10)
  comfortLevel: 'excellent' | 'good' | 'fair' | 'poor' | 'severe';
  operabilityIndex: number; // Operability index (%)
  
  // Wave Analysis
  encounterFrequency: number; // Wave encounter frequency (rad/s)
  waveImpactForce: number; // Wave impact force (kN)
  addedResistance: number; // Added resistance in waves (kN)
  speedLoss: number; // Speed loss in waves (%)
  
  // Structural Loads
  bending_moment: number; // Sagging/hogging moment (kN.m)
  shearForce: number; // Shear force (kN)
  torsionalMoment: number; // Torsional moment (kN.m)
  
  // Performance Analysis
  effectivePower: number; // Effective power (kW)
  deliveredPower: number; // Delivered power (kW)
  thrustPower: number; // Thrust power (kW)
  
  recommendations: string[];
  warnings: string[];
}

export const HydrodynamicsCalculations = ({ initialTab }: { initialTab?: string } = {}) => {
  const { toast } = useToast();
  const [data, setData] = useState<HydrodynamicsData>({
    shipLength: 180, shipBeam: 32, shipDraft: 12, displacement: 25000,
    blockCoefficient: 0.82, prismaticCoefficient: 0.85, wateplaneCoefficient: 0.88,
    shipSpeed: 14.5, enginePower: 15000, propellerDiameter: 6.5, propellerRPM: 120,
    waveHeight: 3.5, waveLength: 100, wavePeriod: 8, waveDirection: 180, windSpeed: 25,
    entranceAngle: 22, lcbPosition: 2.5, wetSurfaceArea: 8500,
    radiusOfGyration: 7.2, metacentricHeight: 1.8, naturalRollPeriod: 12, dampingCoefficient: 0.15,
    heaveAmplitude: 1.2, pitchAmplitude: 3.5,
    propellerPitch: 4.2, numberOfBlades: 4, expandedAreaRatio: 0.65, thrust: 850
  });

  const [result, setResult] = useState<HydrodynamicsResult | null>(null);
  const [calcSteps, setCalcSteps] = useState<Record<string, CalculationStep[]>>({});


  const g = 9.81; // Gravity acceleration
  const rho = 1025; // Seawater density (kg/m³)
  const nu = 1.19e-6; // Kinematic viscosity of seawater (m²/s)

  // Froude and Reynolds numbers
  const calculateDimensionlessNumbers = () => {
    const speedMS = data.shipSpeed * 0.514; // Convert knots to m/s
    const froudeNumber = speedMS / Math.sqrt(g * data.shipLength);
    const reynoldsNumber = speedMS * data.shipLength / nu;
    
    return { froudeNumber, reynoldsNumber };
  };

  // Resistance calculations
  const calculateResistance = () => {
    const speedMS = data.shipSpeed * 0.514;
    const { froudeNumber, reynoldsNumber } = calculateDimensionlessNumbers();
    
    // Viscous resistance calculation (ITTC-57 formula)
    const cf = 0.075 / Math.pow(Math.log10(reynoldsNumber) - 2, 2);
    const formFactor = 1 + 0.93 * Math.pow(data.blockCoefficient / data.prismaticCoefficient, 0.92) * 
                      Math.pow(0.95 - data.prismaticCoefficient, -0.521) * 
                      Math.pow(1 - data.prismaticCoefficient + 0.0225 * data.lcbPosition, 0.6906);
    
    const viscousResistance = 0.5 * rho * data.wetSurfaceArea * Math.pow(speedMS, 2) * cf * formFactor / 1000;
    
    // Wave resistance (Holtrop-Mennen method approximation)
    const c1 = 2223105 * Math.pow(data.prismaticCoefficient, 3.78613) * 
               Math.pow(data.shipDraft / data.shipBeam, 1.07961) * 
               Math.pow(90 - data.entranceAngle, -1.37565);
    
    const c2 = Math.pow(data.shipLength / data.shipBeam, 0.8) * 
               Math.pow(data.shipLength / data.shipDraft, 0.678) * 
               Math.pow(data.blockCoefficient, 0.167);
    
    const waveResistance = c1 * c2 * rho * g * data.displacement / 1000 * 
                          Math.pow(froudeNumber, 2) * Math.exp(-0.034 * Math.pow(froudeNumber, -3.29));
    
    const totalResistance = viscousResistance + waveResistance;
    
    return {
      viscousResistance,
      waveResistance,
      totalResistance,
      formFactor,
      residualResistance: waveResistance
    };
  };

  // Propulsion efficiency calculations
  const calculatePropulsion = () => {
    const speedMS = data.shipSpeed * 0.514;
    
    // Wake fraction and thrust deduction (approximate values)
    const wakeDeduction = 0.25 * data.blockCoefficient + 0.15; // Simplified formula
    const thrustDeduction = 0.15 * data.blockCoefficient + 0.1;
    
    // Advance coefficient
    const advanceSpeed = speedMS * (1 - wakeDeduction);
    const advanceCoeff = advanceSpeed / (data.propellerRPM / 60 * data.propellerDiameter);
    
    // Propeller efficiency (Wageningen B-series approximation)
    const pitchRatio = data.propellerPitch / data.propellerDiameter;
    const kt = 0.2 + 0.3 * advanceCoeff - 0.1 * Math.pow(advanceCoeff, 2);
    const kq = 0.025 + 0.015 * advanceCoeff;
    
    const propellerEfficiency = (kt / kq) * (advanceCoeff / (2 * Math.PI)) * 100;
    
    // Hull efficiency
    const hullEfficiency = (1 - thrustDeduction) / (1 - wakeDeduction) * 100;
    
    // Relative rotative efficiency (approximate)
    const relativeRotativeEfficiency = 0.98 * 100; // Typically 98%
    
    // Total propulsive efficiency
    const totalPropulsiveEfficiency = (propellerEfficiency * hullEfficiency * relativeRotativeEfficiency) / 10000;
    
    return {
      propellerEfficiency,
      hullEfficiency,
      relativeRotativeEfficiency,
      totalPropulsiveEfficiency,
      thrustDeduction,
      wakeDeduction
    };
  };

  // Ship motions in waves
  const calculateMotions = () => {
    const omega = 2 * Math.PI / data.wavePeriod; // Wave frequency
    const k = Math.pow(omega, 2) / g; // Wave number
    const encounterFrequency = omega - Math.pow(omega, 2) * data.shipSpeed * 0.514 / g * 
                               Math.cos(data.waveDirection * Math.PI / 180);
    
    // Roll motion
    const rollNaturalFreq = 2 * Math.PI / data.naturalRollPeriod;
    const rollRAO = data.waveHeight / (1 + Math.pow(encounterFrequency / rollNaturalFreq, 2));
    const rollAmplitude = rollRAO * Math.atan(data.metacentricHeight / data.radiusOfGyration) * 180 / Math.PI;
    
    // Pitch motion (simplified)
    const pitchNaturalFreq = Math.sqrt(g / data.shipLength);
    const pitchAmplitude = data.waveHeight * k * data.shipLength / 4 * 180 / Math.PI;
    
    // Heave motion
    const heaveAmplitude = data.waveHeight * 0.7; // Simplified heave response
    
    // Motion periods
    const rollPeriod = 2 * Math.PI / encounterFrequency;
    const pitchPeriod = data.wavePeriod * 0.8; // Approximate
    const heavePeriod = data.wavePeriod;
    
    // Accelerations
    const rollAcceleration = Math.pow(encounterFrequency, 2) * rollAmplitude;
    const verticalAcceleration = Math.pow(encounterFrequency, 2) * heaveAmplitude;
    const lateralAcceleration = Math.pow(encounterFrequency, 2) * rollAmplitude * data.shipBeam / 2 / 180 * Math.PI;
    
    return {
      rollAmplitude,
      pitchAmplitude,
      heaveAmplitude,
      rollPeriod,
      pitchPeriod,
      heavePeriod,
      rollAcceleration,
      verticalAcceleration,
      lateralAcceleration,
      encounterFrequency
    };
  };

  // Slamming and pounding analysis
  const calculateSlamming = () => {
    const { froudeNumber } = calculateDimensionlessNumbers();
    const speedMS = data.shipSpeed * 0.514;
    
    // Relative motion criteria for slamming
    const relativeMotion = data.heaveAmplitude + data.pitchAmplitude * data.shipLength / 2 / 180 * Math.PI;
    const emergenceRatio = relativeMotion / data.shipDraft;
    
    // Slamming probability (simplified Ochi method)
    const slammingParameter = speedMS * data.waveHeight / Math.pow(data.shipLength, 2);
    const slammingProbability = Math.min(100, slammingParameter * 50);
    const slamming = slammingProbability > 5;
    
    // Wave impact force
    const waveImpactForce = 0.5 * rho * Math.pow(speedMS, 2) * data.shipBeam * data.waveHeight;
    
    return {
      slamming,
      slammingProbability,
      waveImpactForce
    };
  };

  // Added resistance and speed loss
  const calculateAddedResistance = () => {
    const { froudeNumber } = calculateDimensionlessNumbers();
    const k = Math.pow(2 * Math.PI / data.wavePeriod, 2) / g;
    
    // Added resistance in waves (simplified Gerritsma-Beukelman method)
    const addedResistanceCoeff = 8 * Math.pow(k * data.waveHeight, 2) * Math.pow(data.shipBeam, 2) / 
                                Math.pow(data.shipLength, 2) * Math.sin(data.waveDirection * Math.PI / 180);
    
    const addedResistance = addedResistanceCoeff * 0.5 * rho * g * Math.pow(data.waveHeight, 2) * 
                           data.shipBeam * data.shipLength / data.shipLength / 1000;
    
    // Speed loss estimation
    const speedLoss = (addedResistance / data.enginePower) * 100;
    
    return {
      addedResistance,
      speedLoss
    };
  };

  // Structural loads
  const calculateStructuralLoads = () => {
    const waveSlope = 2 * Math.PI * data.waveHeight / data.waveLength;
    const dynamicPressure = 0.5 * rho * Math.pow(data.shipSpeed * 0.514, 2);
    
    // Bending moment (sagging/hogging)
    const bendingMoment = rho * g * data.displacement * 1000 * data.shipLength * waveSlope * 0.1;
    
    // Shear force
    const shearForce = bendingMoment / (data.shipLength / 2);
    
    // Torsional moment
    const torsionalMoment = dynamicPressure * data.shipBeam * Math.pow(data.shipLength, 2) * waveSlope * 0.05;
    
    return {
      bendingMoment,
      shearForce,
      torsionalMoment
    };
  };

  const calculate = () => {
    try {
      const dimensionless = calculateDimensionlessNumbers();
      const resistance = calculateResistance();
      const propulsion = calculatePropulsion();
      const motions = calculateMotions();
      const slamming = calculateSlamming();
      const addedRes = calculateAddedResistance();
      const loads = calculateStructuralLoads();
      
      // Power calculations
      const speedMS = data.shipSpeed * 0.514;
      const effectivePower = resistance.totalResistance * speedMS;
      const thrustPower = effectivePower / (propulsion.hullEfficiency / 100);
      const deliveredPower = thrustPower / (propulsion.propellerEfficiency / 100);
      
      // Seakeeping assessment
      let seakeepingIndex = 10;
      if (motions.rollAmplitude > 20) seakeepingIndex -= 2;
      if (motions.verticalAcceleration > 0.3 * g) seakeepingIndex -= 2;
      if (slamming.slammingProbability > 10) seakeepingIndex -= 3;
      if (addedRes.speedLoss > 15) seakeepingIndex -= 2;
      seakeepingIndex = Math.max(0, seakeepingIndex);
      
      let comfortLevel: 'excellent' | 'good' | 'fair' | 'poor' | 'severe';
      if (seakeepingIndex >= 8) comfortLevel = 'excellent';
      else if (seakeepingIndex >= 6) comfortLevel = 'good';
      else if (seakeepingIndex >= 4) comfortLevel = 'fair';
      else if (seakeepingIndex >= 2) comfortLevel = 'poor';
      else comfortLevel = 'severe';
      
      const operabilityIndex = Math.max(0, 100 - addedRes.speedLoss * 2 - slamming.slammingProbability);
      
      // Recommendations and warnings
      const recommendations = [];
      const warnings = [];
      
      if (dimensionless.froudeNumber > 0.32) {
        warnings.push("High Froude number - increased wave resistance and fuel consumption");
      }
      
      if (motions.rollAmplitude > 25) {
        warnings.push("Excessive roll motion - consider course/speed alteration");
      }
      
      if (slamming.slamming) {
        warnings.push("Slamming detected - reduce speed or alter course");
      }
      
      if (addedRes.speedLoss > 20) {
        warnings.push("Significant speed loss in waves - consider weather routing");
      }
      
      if (propulsion.totalPropulsiveEfficiency < 50) {
        recommendations.push("Low propulsive efficiency - check propeller condition");
      }
      
      if (loads.bendingMoment > data.displacement * 1000 * g * data.shipLength * 0.1) {
        warnings.push("High bending moments - monitor structural stress");
      }

      const calculatedResult: HydrodynamicsResult = {
        froudeNumber: dimensionless.froudeNumber,
        reynoldsNumber: dimensionless.reynoldsNumber,
        totalResistance: resistance.totalResistance,
        waveResistance: resistance.waveResistance,
        viscousResistance: resistance.viscousResistance,
        formFactor: resistance.formFactor,
        residualResistance: resistance.residualResistance,
        propellerEfficiency: propulsion.propellerEfficiency,
        hullEfficiency: propulsion.hullEfficiency,
        relativeRotativeEfficiency: propulsion.relativeRotativeEfficiency,
        totalPropulsiveEfficiency: propulsion.totalPropulsiveEfficiency,
        thrustDeduction: propulsion.thrustDeduction,
        wakeDeduction: propulsion.wakeDeduction,
        rollAmplitude: motions.rollAmplitude,
        pitchAmplitude: motions.pitchAmplitude,
        heaveAmplitude: motions.heaveAmplitude,
        rollPeriod: motions.rollPeriod,
        pitchPeriod: motions.pitchPeriod,
        heavePeriod: motions.heavePeriod,
        rollAcceleration: motions.rollAcceleration,
        verticalAcceleration: motions.verticalAcceleration,
        lateralAcceleration: motions.lateralAcceleration,
        slamming: slamming.slamming,
        slammingProbability: slamming.slammingProbability,
        seakeepingIndex,
        comfortLevel,
        operabilityIndex,
        encounterFrequency: motions.encounterFrequency,
        waveImpactForce: slamming.waveImpactForce,
        addedResistance: addedRes.addedResistance,
        speedLoss: addedRes.speedLoss,
        bending_moment: loads.bendingMoment,
        shearForce: loads.shearForce,
        torsionalMoment: loads.torsionalMoment,
        effectivePower,
        deliveredPower,
        thrustPower,
        recommendations,
        warnings
      };

      setResult(calculatedResult);

      // Adim adim hesaplama aciklamalari

      // Direnc ve Verimlilik adimlari
      const resistanceSteps: CalculationStep[] = [
        {
          step: 1,
          title: "Hiz Donusumu (knot -> m/s)",
          formula: "V = Vknot x 0.514",
          substitution: `V = ${data.shipSpeed} x 0.514`,
          result: `V = ${speedMS.toFixed(3)} m/s`,
          explanation: "Gemi hizi knot biriminden m/s birimine donusturulur."
        },
        {
          step: 2,
          title: "Froude Sayisi",
          formula: "Fn = V / sqrt(g x L)",
          substitution: `Fn = ${speedMS.toFixed(3)} / sqrt(${g} x ${data.shipLength})`,
          result: `Fn = ${dimensionless.froudeNumber.toFixed(4)}`,
          explanation: "Froude sayisi, gemi hizinin dalga hizina oranini ifade eder. 0.32'nin uzerinde dalga direnci onemli olcude artar."
        },
        {
          step: 3,
          title: "Reynolds Sayisi",
          formula: "Rn = V x L / v",
          substitution: `Rn = ${speedMS.toFixed(3)} x ${data.shipLength} / ${nu}`,
          result: `Rn = ${dimensionless.reynoldsNumber.toExponential(3)}`,
          explanation: "Reynolds sayisi, akisin turbulansi hakkinda bilgi verir. Yuksek degerler tam turbulanslI akisi gosterir."
        },
        {
          step: 4,
          title: "Surtunme Direnci Katsayisi (ITTC-57)",
          formula: "Cf = 0.075 / (log10(Rn) - 2)^2",
          substitution: `Cf = 0.075 / (log10(${dimensionless.reynoldsNumber.toExponential(3)}) - 2)^2`,
          result: `Cf = ${(0.075 / Math.pow(Math.log10(dimensionless.reynoldsNumber) - 2, 2)).toExponential(4)}`,
          explanation: "ITTC-1957 formulu ile duz levha surtunme direnci katsayisi hesaplanir."
        },
        {
          step: 5,
          title: "Form Faktoru (1+k)",
          formula: "(1+k) = 1 + 0.93 x (Cb/Cp)^0.92 x (0.95-Cp)^(-0.521) x (1-Cp+0.0225xLCB)^0.6906",
          substitution: `(1+k) = 1 + 0.93 x (${data.blockCoefficient}/${data.prismaticCoefficient})^0.92 x (0.95-${data.prismaticCoefficient})^(-0.521) x (1-${data.prismaticCoefficient}+0.0225x${data.lcbPosition})^0.6906`,
          result: `(1+k) = ${resistance.formFactor.toFixed(4)}`,
          explanation: "Form faktoru, govde seklinin surtunme direncine etkisini ifade eder."
        },
        {
          step: 6,
          title: "Viskoz Direnc",
          formula: "Rv = 0.5 x rho x S x V^2 x Cf x (1+k) / 1000",
          substitution: `Rv = 0.5 x ${rho} x ${data.wetSurfaceArea} x ${speedMS.toFixed(3)}^2 x Cf x ${resistance.formFactor.toFixed(4)} / 1000`,
          result: `Rv = ${resistance.viscousResistance.toFixed(2)} kN`,
          explanation: "Viskoz direnc, suyun viskozitesinden kaynaklanan surtunme ve form direncinin toplamidir."
        },
        {
          step: 7,
          title: "Dalga Direnci (Holtrop-Mennen Yaklasimi)",
          formula: "Rw = C1 x C2 x rho x g x D / 1000 x Fn^2 x exp(-0.034 x Fn^(-3.29))",
          substitution: `Rw = C1 x C2 x ${rho} x ${g} x ${data.displacement} / 1000 x ${dimensionless.froudeNumber.toFixed(4)}^2 x exp(-0.034 x ${dimensionless.froudeNumber.toFixed(4)}^(-3.29))`,
          result: `Rw = ${resistance.waveResistance.toFixed(2)} kN`,
          explanation: "Dalga direnci, geminin su yuzeyinde olusturdugu dalgalardan kaynaklanan direnc bilesenidir."
        },
        {
          step: 8,
          title: "Toplam Direnc",
          formula: "Rt = Rv + Rw",
          substitution: `Rt = ${resistance.viscousResistance.toFixed(2)} + ${resistance.waveResistance.toFixed(2)}`,
          result: `Rt = ${resistance.totalResistance.toFixed(2)} kN`,
          explanation: "Toplam direnc, viskoz direnc ile dalga direncinin toplamidir."
        },
        {
          step: 9,
          title: "Iz Katsayisi",
          formula: "w = 0.25 x Cb + 0.15",
          substitution: `w = 0.25 x ${data.blockCoefficient} + 0.15`,
          result: `w = ${propulsion.wakeDeduction.toFixed(4)}`,
          explanation: "Iz katsayisi, pervane diskindeki suyun gemi hizina gore yavaslamasini ifade eder."
        },
        {
          step: 10,
          title: "Itki Azalma Katsayisi",
          formula: "t = 0.15 x Cb + 0.1",
          substitution: `t = 0.15 x ${data.blockCoefficient} + 0.1`,
          result: `t = ${propulsion.thrustDeduction.toFixed(4)}`,
          explanation: "Itki azalma katsayisi, pervanenin emme etkisiyle artan direnci ifade eder."
        },
        {
          step: 11,
          title: "Govde Verimi",
          formula: "etaH = (1 - t) / (1 - w)",
          substitution: `etaH = (1 - ${propulsion.thrustDeduction.toFixed(4)}) / (1 - ${propulsion.wakeDeduction.toFixed(4)})`,
          result: `etaH = ${(propulsion.hullEfficiency).toFixed(2)}%`,
          explanation: "Govde verimi, iz ve itki azalma katsayilarinin birlesmis etkisini gosterir."
        },
        {
          step: 12,
          title: "Pervane Verimi",
          formula: "etaO = (Kt / Kq) x (J / 2pi)",
          substitution: `etaO hesaplandi (Wageningen B-serisi yaklasimi ile)`,
          result: `etaO = ${propulsion.propellerEfficiency.toFixed(2)}%`,
          explanation: "Pervane acik su verimi, pervane itki ve tork katsayilari ile ilerleme katsayisindan hesaplanir."
        },
        {
          step: 13,
          title: "Toplam Sevk Verimi",
          formula: "etaD = etaO x etaH x etaR / 10000",
          substitution: `etaD = ${propulsion.propellerEfficiency.toFixed(2)} x ${propulsion.hullEfficiency.toFixed(2)} x ${propulsion.relativeRotativeEfficiency.toFixed(2)} / 10000`,
          result: `etaD = ${propulsion.totalPropulsiveEfficiency.toFixed(2)}%`,
          explanation: "Toplam sevk verimi, tum verimlilik bilesenlerinin carpimini ifade eder."
        }
      ];

      // Gemi Hareketleri adimlari
      const omega = 2 * Math.PI / data.wavePeriod;
      const kWave = Math.pow(omega, 2) / g;
      const motionSteps: CalculationStep[] = [
        {
          step: 1,
          title: "Dalga Frekans",
          formula: "omega = 2pi / T",
          substitution: `omega = 2pi / ${data.wavePeriod}`,
          result: `omega = ${omega.toFixed(4)} rad/s`,
          explanation: "Dalga frekans, dalga periyodundan hesaplanir."
        },
        {
          step: 2,
          title: "Dalga Sayisi",
          formula: "k = omega^2 / g",
          substitution: `k = ${omega.toFixed(4)}^2 / ${g}`,
          result: `k = ${kWave.toFixed(6)} 1/m`,
          explanation: "Dalga sayisi, dalga boyuyla ters orantili bir buyukluktur."
        },
        {
          step: 3,
          title: "Karsilasma Frekans",
          formula: "omegae = omega - omega^2 x V / g x cos(mu)",
          substitution: `omegae = ${omega.toFixed(4)} - ${omega.toFixed(4)}^2 x ${speedMS.toFixed(3)} / ${g} x cos(${data.waveDirection}deg)`,
          result: `omegae = ${motions.encounterFrequency.toFixed(4)} rad/s`,
          explanation: "Karsilasma frekansi, geminin dalga ile karsilasma hizini ifade eder. Dalga yonu ve gemi hizina baglidir."
        },
        {
          step: 4,
          title: "Yalpa Dogal Frekansi",
          formula: "omegaroll = 2pi / Troll",
          substitution: `omegaroll = 2pi / ${data.naturalRollPeriod}`,
          result: `omegaroll = ${(2 * Math.PI / data.naturalRollPeriod).toFixed(4)} rad/s`,
          explanation: "Yalpa dogal frekansi, geminin serbest yalpa periyodundan elde edilir."
        },
        {
          step: 5,
          title: "Yalpa RAO (Tepki Genlik Operatoru)",
          formula: "RAOroll = Hw / (1 + (omegae / omegaroll)^2)",
          substitution: `RAOroll = ${data.waveHeight} / (1 + (${motions.encounterFrequency.toFixed(4)} / ${(2 * Math.PI / data.naturalRollPeriod).toFixed(4)})^2)`,
          result: `RAOroll = ${(data.waveHeight / (1 + Math.pow(motions.encounterFrequency / (2 * Math.PI / data.naturalRollPeriod), 2))).toFixed(4)}`,
          explanation: "RAO, dalga yuksekligine karsilik gelen hareket genligini verir."
        },
        {
          step: 6,
          title: "Yalpa Genligi",
          formula: "phi = RAOroll x atan(GM / kxx) x 180/pi",
          substitution: `phi = RAO x atan(${data.metacentricHeight} / ${data.radiusOfGyration}) x 180/pi`,
          result: `phi = ${motions.rollAmplitude.toFixed(2)} derece`,
          explanation: "Yalpa genligi, dalga kosullarinda geminin enine sallanma miktarini ifade eder."
        },
        {
          step: 7,
          title: "Tangage Genligi",
          formula: "theta = Hw x k x L / 4 x 180/pi",
          substitution: `theta = ${data.waveHeight} x ${kWave.toFixed(6)} x ${data.shipLength} / 4 x 180/pi`,
          result: `theta = ${motions.pitchAmplitude.toFixed(2)} derece`,
          explanation: "Tangage genligi, geminin boyuna eksen etrafindaki sallanma miktarini ifade eder."
        },
        {
          step: 8,
          title: "Dalip Cikma Genligi",
          formula: "z = Hw x 0.7",
          substitution: `z = ${data.waveHeight} x 0.7`,
          result: `z = ${motions.heaveAmplitude.toFixed(2)} m`,
          explanation: "Dalip cikma genligi, geminin dusey dogrultudaki hareket genligini ifade eder."
        },
        {
          step: 9,
          title: "Dusey Ivme",
          formula: "av = omegae^2 x z",
          substitution: `av = ${motions.encounterFrequency.toFixed(4)}^2 x ${motions.heaveAmplitude.toFixed(2)}`,
          result: `av = ${motions.verticalAcceleration.toFixed(3)} m/s^2`,
          explanation: "Dusey ivme, dalip cikma hareketinden kaynaklanan ivmedir. Yuk ve murettebat konforu icin onemlidir."
        },
        {
          step: 10,
          title: "Yanal Ivme",
          formula: "al = omegae^2 x phi x B/2 / 180 x pi",
          substitution: `al = ${motions.encounterFrequency.toFixed(4)}^2 x ${motions.rollAmplitude.toFixed(2)} x ${data.shipBeam}/2 / 180 x pi`,
          result: `al = ${motions.lateralAcceleration.toFixed(3)} m/s^2`,
          explanation: "Yanal ivme, yalpa hareketinden kaynaklanan yan ivmedir."
        }
      ];

      // Denizcilik Performansi adimlari
      const relativeMotion = data.heaveAmplitude + data.pitchAmplitude * data.shipLength / 2 / 180 * Math.PI;
      const slammingParameter = speedMS * data.waveHeight / Math.pow(data.shipLength, 2);
      const seakeepingSteps: CalculationStep[] = [
        {
          step: 1,
          title: "Slamming Parametresi",
          formula: "Sp = V x Hw / L^2",
          substitution: `Sp = ${speedMS.toFixed(3)} x ${data.waveHeight} / ${data.shipLength}^2`,
          result: `Sp = ${slammingParameter.toExponential(4)}`,
          explanation: "Slamming parametresi, gemi hizi ve dalga yuksekligine bagli olarak slamming olasiligini belirler."
        },
        {
          step: 2,
          title: "Slamming Olasiligi (Ochi Metodu)",
          formula: "Pslam = min(100, Sp x 50)",
          substitution: `Pslam = min(100, ${slammingParameter.toExponential(4)} x 50)`,
          result: `Pslam = ${slamming.slammingProbability.toFixed(2)}%`,
          explanation: "Slamming olasiligi %5'in uzerinde ise slamming riski vardir."
        },
        {
          step: 3,
          title: "Dalga Etki Kuvveti",
          formula: "Fimpact = 0.5 x rho x V^2 x B x Hw",
          substitution: `Fimpact = 0.5 x ${rho} x ${speedMS.toFixed(3)}^2 x ${data.shipBeam} x ${data.waveHeight}`,
          result: `Fimpact = ${slamming.waveImpactForce.toFixed(1)} N`,
          explanation: "Dalga etki kuvveti, dalgalarin govdeye uyguladi dinamik kuvvettir."
        },
        {
          step: 4,
          title: "Ilave Dalga Direnci (Gerritsma-Beukelman)",
          formula: "Raw = Caw x 0.5 x rho x g x Hw^2 x B / 1000",
          substitution: `Raw hesabi: dalga sayisi, dalga yuksekligi, gemi boyutlari ve dalga yonu kullanilarak yapildi`,
          result: `Raw = ${addedRes.addedResistance.toFixed(2)} kN`,
          explanation: "Ilave dalga direnci, dalgali denizde artan direnci ifade eder."
        },
        {
          step: 5,
          title: "Hiz Kaybi",
          formula: "DeltaV = (Raw / Peng) x 100",
          substitution: `DeltaV = (${addedRes.addedResistance.toFixed(2)} / ${data.enginePower}) x 100`,
          result: `DeltaV = ${addedRes.speedLoss.toFixed(2)}%`,
          explanation: "Dalgali denizde motor gucune oranla beklenen hiz kaybi yuzdesidir."
        },
        {
          step: 6,
          title: "Denizcilik Indeksi",
          formula: "SI = 10 - cezalar (yalpa, ivme, slamming, hiz kaybi)",
          substitution: `SI = 10 - (yalpa>${motions.rollAmplitude.toFixed(1)}>20? -2) - (ivme -2) - (slam -3) - (hiz kaybi -2)`,
          result: `SI = ${seakeepingIndex.toFixed(1)} / 10`,
          explanation: "Denizcilik indeksi, genel denizcilik performansini 0-10 arasinda puanlar."
        },
        {
          step: 7,
          title: "Operabilite Indeksi",
          formula: "OI = max(0, 100 - DeltaV x 2 - Pslam)",
          substitution: `OI = max(0, 100 - ${addedRes.speedLoss.toFixed(2)} x 2 - ${slamming.slammingProbability.toFixed(2)})`,
          result: `OI = ${operabilityIndex.toFixed(1)}%`,
          explanation: "Operabilite indeksi, geminin mevcut kosullarda ne kadar etkili calisabilecegini gosterir."
        }
      ];

      // Guc Hesaplamalari adimlari
      const powerSteps: CalculationStep[] = [
        {
          step: 1,
          title: "Efektif Guc (PE)",
          formula: "PE = Rt x V",
          substitution: `PE = ${resistance.totalResistance.toFixed(2)} x ${speedMS.toFixed(3)}`,
          result: `PE = ${effectivePower.toFixed(1)} kW`,
          explanation: "Efektif guc, geminin belirli bir hizda suyu itmek icin gereken guctur."
        },
        {
          step: 2,
          title: "Itki Gucu (PT)",
          formula: "PT = PE / etaH",
          substitution: `PT = ${effectivePower.toFixed(1)} / ${(propulsion.hullEfficiency / 100).toFixed(4)}`,
          result: `PT = ${thrustPower.toFixed(1)} kW`,
          explanation: "Itki gucu, pervanenin suya aktardigi guctur. Govde verimi ile iliskilidir."
        },
        {
          step: 3,
          title: "Teslim Edilen Guc (PD)",
          formula: "PD = PT / etaO",
          substitution: `PD = ${thrustPower.toFixed(1)} / ${(propulsion.propellerEfficiency / 100).toFixed(4)}`,
          result: `PD = ${deliveredPower.toFixed(1)} kW`,
          explanation: "Teslim edilen guc, pervane miline iletilmesi gereken guctur. Pervane verimi ile iliskilidir."
        }
      ];

      setCalcSteps({
        resistance: resistanceSteps,
        motions: motionSteps,
        seakeeping: seakeepingSteps,
        power: powerSteps
      });

      toast({
        title: "Hesaplama Tamamlandi",
        description: "Hidrodinamik hesaplamalar basariyla tamamlandi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Hesaplama sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const updateData = (field: keyof HydrodynamicsData, value: number | string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="h-5 w-5" />
            Hidrodinamik Hesaplamalar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={initialTab || "ship"} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ship">Gemi</TabsTrigger>
              <TabsTrigger value="propulsion">Sevk</TabsTrigger>
              <TabsTrigger value="waves">Dalgalar</TabsTrigger>
              <TabsTrigger value="motion">Hareket</TabsTrigger>
            </TabsList>

            <TabsContent value="ship" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shipLength">Gemi Boyu (m)</Label>
                  <Input
                    id="shipLength"
                    type="number"
                    step="0.1"
                    value={data.shipLength}
                    onChange={(e) => updateData('shipLength', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipBeam">Gemi Eni (m)</Label>
                  <Input
                    id="shipBeam"
                    type="number"
                    step="0.1"
                    value={data.shipBeam}
                    onChange={(e) => updateData('shipBeam', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipDraft">Su Çekimi (m)</Label>
                  <Input
                    id="shipDraft"
                    type="number"
                    step="0.1"
                    value={data.shipDraft}
                    onChange={(e) => updateData('shipDraft', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displacement">Deplasман (ton)</Label>
                  <Input
                    id="displacement"
                    type="number"
                    value={data.displacement}
                    onChange={(e) => updateData('displacement', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blockCoefficient">Blok Katsayısı (Cb)</Label>
                  <Input
                    id="blockCoefficient"
                    type="number"
                    step="0.01"
                    value={data.blockCoefficient}
                    onChange={(e) => updateData('blockCoefficient', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipSpeed">Gemi Hızı (knot)</Label>
                  <Input
                    id="shipSpeed"
                    type="number"
                    step="0.1"
                    value={data.shipSpeed}
                    onChange={(e) => updateData('shipSpeed', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="propulsion" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="enginePower">Motor Gücü (kW)</Label>
                  <Input
                    id="enginePower"
                    type="number"
                    value={data.enginePower}
                    onChange={(e) => updateData('enginePower', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propellerDiameter">Pervane Çapı (m)</Label>
                  <Input
                    id="propellerDiameter"
                    type="number"
                    step="0.1"
                    value={data.propellerDiameter}
                    onChange={(e) => updateData('propellerDiameter', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propellerRPM">Pervane RPM</Label>
                  <Input
                    id="propellerRPM"
                    type="number"
                    value={data.propellerRPM}
                    onChange={(e) => updateData('propellerRPM', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propellerPitch">Pervane Adımı (m)</Label>
                  <Input
                    id="propellerPitch"
                    type="number"
                    step="0.1"
                    value={data.propellerPitch}
                    onChange={(e) => updateData('propellerPitch', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numberOfBlades">Kanat Sayısı</Label>
                  <Input
                    id="numberOfBlades"
                    type="number"
                    value={data.numberOfBlades}
                    onChange={(e) => updateData('numberOfBlades', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thrust">İtki Kuvveti (kN)</Label>
                  <Input
                    id="thrust"
                    type="number"
                    value={data.thrust}
                    onChange={(e) => updateData('thrust', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="waves" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waveHeight">Dalga Yüksekliği (m)</Label>
                  <Input
                    id="waveHeight"
                    type="number"
                    step="0.1"
                    value={data.waveHeight}
                    onChange={(e) => updateData('waveHeight', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waveLength">Dalga Boyu (m)</Label>
                  <Input
                    id="waveLength"
                    type="number"
                    value={data.waveLength}
                    onChange={(e) => updateData('waveLength', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wavePeriod">Dalga Periyodu (s)</Label>
                  <Input
                    id="wavePeriod"
                    type="number"
                    step="0.1"
                    value={data.wavePeriod}
                    onChange={(e) => updateData('wavePeriod', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waveDirection">Dalga Doğrultusu (°)</Label>
                  <Input
                    id="waveDirection"
                    type="number"
                    value={data.waveDirection}
                    onChange={(e) => updateData('waveDirection', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="windSpeed">Rüzgar Hızı (knot)</Label>
                  <Input
                    id="windSpeed"
                    type="number"
                    value={data.windSpeed}
                    onChange={(e) => updateData('windSpeed', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="motion" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metacentricHeight">GM (m)</Label>
                  <Input
                    id="metacentricHeight"
                    type="number"
                    step="0.1"
                    value={data.metacentricHeight}
                    onChange={(e) => updateData('metacentricHeight', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="naturalRollPeriod">Doğal Yalpa Periyodu (s)</Label>
                  <Input
                    id="naturalRollPeriod"
                    type="number"
                    step="0.1"
                    value={data.naturalRollPeriod}
                    onChange={(e) => updateData('naturalRollPeriod', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="radiusOfGyration">Atalet Yarıçapı (m)</Label>
                  <Input
                    id="radiusOfGyration"
                    type="number"
                    step="0.1"
                    value={data.radiusOfGyration}
                    onChange={(e) => updateData('radiusOfGyration', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dampingCoefficient">Sönümleme Katsayısı</Label>
                  <Input
                    id="dampingCoefficient"
                    type="number"
                    step="0.01"
                    value={data.dampingCoefficient}
                    onChange={(e) => updateData('dampingCoefficient', e.target.value === '' ? Number.NaN : parseFloat(e.target.value))}
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
                <TrendingUp className="h-5 w-5" />
                Direnç ve Verimlilik
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Froude Sayısı</Label>
                  <p className="text-2xl font-bold text-info">{result.froudeNumber.toFixed(3)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Toplam Direnç</Label>
                  <p className="text-2xl font-bold text-red-600">{result.totalResistance.toFixed(1)} kN</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Dalga Direnci</Label>
                  <p className="text-2xl font-bold text-orange-700">{result.waveResistance.toFixed(1)} kN</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Pervane Verimi</Label>
                  <p className="text-lg font-semibold">{result.propellerEfficiency.toFixed(1)}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Gövde Verimi</Label>
                  <p className="text-lg font-semibold">{result.hullEfficiency.toFixed(1)}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Toplam Sevk Verimi</Label>
                  <p className="text-lg font-semibold">{result.totalPropulsiveEfficiency.toFixed(1)}%</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["resistance"] || []} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Gemi Hareketleri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Yalpa Genliği</Label>
                  <p className="text-2xl font-bold text-purple-600">{result.rollAmplitude.toFixed(1)}°</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tangage Genliği</Label>
                  <p className="text-2xl font-bold text-green-700">{result.pitchAmplitude.toFixed(1)}°</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Dalıp Çıkma</Label>
                  <p className="text-2xl font-bold text-info">{result.heaveAmplitude.toFixed(1)} m</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Düşey İvme</Label>
                  <p className="text-lg font-semibold">{result.verticalAcceleration.toFixed(2)} m/s²</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Yanal İvme</Label>
                  <p className="text-lg font-semibold">{result.lateralAcceleration.toFixed(2)} m/s²</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Slamming</Label>
                  <Badge variant={result.slamming ? 'destructive' : 'default'}>
                    {result.slamming ? 'Var' : 'Yok'}
                  </Badge>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["motions"] || []} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5" />
                Denizcilik Performansı
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Denizcilik İndeksi</Label>
                  <p className="text-2xl font-bold text-info">{result.seakeepingIndex.toFixed(1)}/10</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Konfor Seviyesi</Label>
                  <Badge variant={
                    result.comfortLevel === 'excellent' ? 'default' :
                    result.comfortLevel === 'good' ? 'secondary' :
                    result.comfortLevel === 'fair' ? 'outline' :
                    result.comfortLevel === 'poor' ? 'destructive' : 'destructive'
                  }>
                    {result.comfortLevel === 'excellent' ? 'Mükemmel' :
                     result.comfortLevel === 'good' ? 'İyi' :
                     result.comfortLevel === 'fair' ? 'Orta' :
                     result.comfortLevel === 'poor' ? 'Kötü' : 'Çok Kötü'}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Operabilite İndeksi</Label>
                  <p className="text-lg font-semibold">{result.operabilityIndex.toFixed(1)}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Hız Kaybı</Label>
                  <p className="text-lg font-semibold">{result.speedLoss.toFixed(1)}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">İlave Direnç</Label>
                  <p className="text-lg font-semibold">{result.addedResistance.toFixed(1)} kN</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Slamming Olasılığı</Label>
                  <p className="text-lg font-semibold">{result.slammingProbability.toFixed(1)}%</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["seakeeping"] || []} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Güç Hesaplamaları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Efektif Güç</Label>
                  <p className="text-2xl font-bold text-green-700">{result.effectivePower.toFixed(0)} kW</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">İtki Gücü</Label>
                  <p className="text-2xl font-bold text-info">{result.thrustPower.toFixed(0)} kW</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Teslim Edilen Güç</Label>
                  <p className="text-2xl font-bold text-orange-700">{result.deliveredPower.toFixed(0)} kW</p>
                </div>
              </div>
              <CalculationSteps steps={calcSteps["power"] || []} />
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