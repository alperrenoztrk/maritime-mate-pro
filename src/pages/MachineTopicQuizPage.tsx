import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, Shuffle } from "lucide-react";
import { StabilityQuiz as Quiz } from "@/components/stability/StabilityQuiz";
import type { QuizQuestion } from "@/types/quiz";

const topicQuestions: Record<string, QuizQuestion[]> = {
  thermodynamics: [
    { id: 1, question: "What parameters do the efficiency of the Carnot cycle depend on?", options: ["Pressure only", "Hot and cold source temperatures", "Volume and pressure", "Fluid type"], correctAnswer: 1, explanation: "Carnot efficiency depends only on source temperatures with the formula η = 1 − TL/TH.", category: "Thermodynamics" },
    { id: 2, question: "Which quantity remains constant in the adiabatic process?", options: ["Temperature", "Pressure", "Entropy", "Volume"], correctAnswer: 2, explanation: "In the adiabatic reversible process, the entropy remains constant (isentropic process).", category: "Thermodynamics" },
    { id: 3, question: "In what way does the Diesel cycle differ from the Otto cycle?", options: ["Heat input occurs at constant pressure", "Heat input occurs at constant volume", "Compression ratio is low", "Its efficiency is always low"], correctAnswer: 0, explanation: "In the Diesel cycle, heat input occurs at constant pressure, and in the Otto cycle, at constant volume.", category: "Thermodynamics" },
    { id: 4, question: "What does LMTD stand for?", options: ["Logarithmic average torque difference", "Log mean temperature difference", "Linear minimum temperature value", "Flow rate average"], correctAnswer: 1, explanation: "LMTD is the logarithmic average temperature difference used in heat transfer calculations in heat exchangers.", category: "Thermodynamics" },
    { id: 5, question: "What does the second law of thermodynamics mean?", options: ["Conservation of energy", "Entropy always increases or remains constant", "Equivalence of work and heat", "Absolute zero cannot be reached"], correctAnswer: 1, explanation: "Second law: total entropy never decreases in an isolated system.", category: "Thermodynamics" },
  ],
  "fluid-mechanics": [
    { id: 1, question: "For which type of flow is Bernoulli's equation valid?", options: ["Turbulent, compressible", "Frictionless, incompressible, stable", "All flow types", "Gas flows only"], correctAnswer: 1, explanation: "Bernoulli's equation is valid for ideal (frictionless), incompressible and stable flow.", category: "Fluids" },
    { id: 2, question: "What is the flow regime when the Reynolds number is greater than 4000?", options: ["Laminar", "Transition zone", "Turbulent", "Stable"], correctAnswer: 2, explanation: "At Re > 4000, the flow is considered turbulent.", category: "Fluids" },
    { id: 3, question: "What is cavitation?", options: ["Air trapped in the pipe", "Vapor bubbles form as a result of the liquid falling below its evaporation pressure.", "Wear of pump impellers", "Bubbles collapsing due to high pressure"], correctAnswer: 1, explanation: "Cavitation is the formation of vapor bubbles when the liquid pressure locally falls below the vapor pressure.", category: "Fluids" },
    { id: 4, question: "At what rate does the flow rate change according to pump affinity rules?", options: ["With revolution squared", "With revolution cube", "Directly proportional to turnover", "With the square root of the revolution"], correctAnswer: 2, explanation: "Q₂/Q₁ = n₂/n₁ — flow rate is linearly proportional to speed.", category: "Fluids" },
    { id: 5, question: "What is NPSHa?", options: ["Pump outlet pressure", "Net positive suction head (available)", "Nominal pump selection height", "Pipe loss coefficient"], correctAnswer: 1, explanation: "NPSHa: is the pressure difference against cavitation on the suction side of the pump.", category: "Fluids" },
  ],
  "machine-elements": [
    { id: 1, question: "How to calculate the torsional stress acting on a shaft?", options: ["σ = F/A", "τ = T·r/J", "σ = M·y/I", "τ = V·Q/(I·b)"], correctAnswer: 1, explanation: "Torsional stress is calculated by the formula τ = T·r/J. T: torque, r: radius, J: polar moment of inertia.", category: "Machine Elements" },
    { id: 2, question: "What does barred speed range mean?", options: ["Maximum speed range of the ship", "Speed range to avoid due to torsional vibration", "Generator frequency range", "Pump operating range"], correctAnswer: 1, explanation: "Barred speed range is the speed range in which torsional resonance occurs in the shaft line and continuous operation is prohibited.", category: "Machine Elements" },
    { id: 3, question: "What does L₁₀ mean for bearing life?", options: ["The lifetime of the mattress with a 10% probability of breaking down", "Warranty life of the mattress", "90% probability of life of the mattress", "Maximum life of the bearing"], correctAnswer: 2, explanation: "L₁₀: is the life that 90% of the tested bearings will reach without failure (million revolutions).", category: "Machine Elements" },
    { id: 4, question: "When does galvanic corrosion occur?", options: ["In tension cracks in the same material", "When two metals of different potential come into contact in an electrolyte", "By high temperature oxidation", "By chemical dissolution in an acid environment"], correctAnswer: 1, explanation: "Galvanic corrosion occurs by contact of metals of different potential in the electrolyte environment.", category: "Machine Elements" },
    { id: 5, question: "Which standard is referenced for propeller shaft material?", options: ["ISO 8217", "IACS UR M68", "SOLAS II-2", "STCW A-III/1"], correctAnswer: 1, explanation: "Propeller shaft diameter and material requirements are determined according to the IACS UR M68 standard.", category: "Machine Elements" },
  ],
  "diesel-engines": [
    { id: 1, question: "What is the symptom of Scavenge fire?", options: ["Low exhaust temperature", "Scavenge trunk temperature increase and smoke", "High coolant pressure", "Low oil pressure"], correctAnswer: 1, explanation: "Scavenge fire symptoms: scavenge trunk temperature increase, smoke, local heating and turbocharger surge.", category: "Diesel engine" },
    { id: 2, question: "What is the advantage of a two-stroke engine over a four-stroke?", options: ["Lower SFOC", "Each revolution produces a power stroke", "Less vibration", "higher rpm"], correctAnswer: 1, explanation: "The two-stroke engine produces one power stroke per revolution; every two revolutions in a four-stroke.", category: "Diesel engine" },
    { id: 3, question: "What is the SFOC unit?", options: ["kg/hour", "g/kW·h", "L/mile", "tons/day"], correctAnswer: 1, explanation: "The unit of SFOC (Specific Fuel Oil Consumption) is g/kW·h; lower value means higher efficiency.", category: "Diesel engine" },
    { id: 4, question: "What is the advantage of common rail injection system?", options: ["Lower injection pressure", "High pressure injection independent of engine speed", "Mechanical simplicity", "Maintenance free"], correctAnswer: 1, explanation: "Common rail provides injection at constant high pressure (2000+ bar) regardless of engine speed.", category: "Diesel engine" },
    { id: 5, question: "What is the main cause of crankcase explosion?", options: ["Low oil level", "Oil mist formation and ignition", "Supercooling", "High fuel pressure"], correctAnswer: 1, explanation: "Crankcase explosion occurs when oil vapor formed from hot spots ignites.", category: "Diesel engine" },
  ],
  "ship-systems": [
    { id: 1, question: "What does the HT cooling circuit usually cool?", options: ["Just oil", "Cylinder liners (jacket water)", "Charge air", "Sea water"], correctAnswer: 1, explanation: "HT (High Temperature) circuit maintains optimum operating temperature by cooling the main engine cylinder liners.", category: "Machine Systems" },
    { id: 2, question: "Why is fuel viscosity control important?", options: ["Reduces engine noise", "Provides correct atomization and combustion", "Improves fuel color", "Increases tank capacity"], correctAnswer: 1, explanation: "The correct viscosity ensures proper atomization in the injector, enabling complete combustion and low emissions.", category: "Machine Systems" },
    { id: 3, question: "What is the normal pressure range in the lubrication system?", options: ["0.5–1 bar", "1–2 bars", "3–8 bars", "15–20 bars"], correctAnswer: 2, explanation: "Main engine lubrication pressure is typically between 3–5 bar (low speed) and 5–8 bar (full load).", category: "Machine Systems" },
    { id: 4, question: "When to use quick-closing valve?", options: ["In normal operation", "In case of fire or emergency", "In fuel transfer", "At oil change"], correctAnswer: 1, explanation: "Quick-closing valve is used to remotely cut off fuel/oil flow in case of fire or leak.", category: "Machine Systems" },
    { id: 5, question: "What happens when exhaust back pressure increases?", options: ["Engine efficiency increases", "Turbocharger efficiency decreases, SFOC increases", "Coolant temperature drops", "Oil pressure rises"], correctAnswer: 1, explanation: "High exhaust back pressure reduces turbocharger efficiency, deteriorates combustion quality and increases SFOC.", category: "Machine Systems" },
  ],
  auxiliary: [
    { id: 1, question: "How long does it take for the emergency generator to be activated?", options: ["10 seconds", "30 seconds", "45 seconds", "60 seconds"], correctAnswer: 2, explanation: "In accordance with SOLAS II-1/Reg.44, the emergency generator must be activated to feed the full load within 45 seconds.", category: "Auxiliary Machinery" },
    { id: 2, question: "What does Stokes' law determine in the separator?", options: ["Fuel quality", "Particle decomposition rate", "Number of disks", "Engine efficiency"], correctAnswer: 1, explanation: "Stokes' law determines the rate at which particles decompose under gravitational/centrifugal force.", category: "Auxiliary Machinery" },
    { id: 3, question: "At what pressure should the boiler safety valve open?", options: ["At 50% more than working pressure", "Within 3% of set pressure", "At 2 times the working pressure", "At any pressure"], correctAnswer: 1, explanation: "The safety valve must open within ±3% of the set pressure.", category: "Auxiliary Machinery" },
    { id: 4, question: "What does reverse power relay do?", options: ["Prevents voltage drop", "Prevents the generator from operating as an engine", "Fixes the frequency", "Balances the load"], correctAnswer: 1, explanation: "Reverse power relay detects when the generator draws power from the network (motorization) and deactivates it.", category: "Auxiliary Machinery" },
    { id: 5, question: "Why is vacuum necessary in a fresh water generator?", options: ["Improves the taste of water", "Allows evaporation at low temperature", "Saves energy", "Controls the salt rate"], correctAnswer: 1, explanation: "In a vacuum environment, water evaporates at low temperatures such as 40–60°C, so waste heat can be used.", category: "Auxiliary Machinery" },
  ],
  "fuel-technology": [
    { id: 1, question: "What is CCAI?", options: ["Fuel viscosity measure", "Fuel flammability indicator", "Carbon emission coefficient", "Sulfur analysis index"], correctAnswer: 1, explanation: "CCAI (Calculated Carbon Aromaticity Index) is an index that shows the ignition quality of the fuel. CCAI < 870 is good.", category: "fuel" },
    { id: 2, question: "What is the biggest risk in switching from HFO to MGO?", options: ["High cost", "Thermal shock", "Low viscosity", "Tank capacity"], correctAnswer: 1, explanation: "Sudden temperature change (thermal shock) may cause damage to the pump, injector and pipe connections.", category: "fuel" },
    { id: 3, question: "What does ISO 8217 standardize?", options: ["Engine performance", "Marine fuel quality", "Emission limits", "Lubricating oil properties"], correctAnswer: 1, explanation: "ISO 8217 standardizes the quality parameters (viscosity, density, sulfur, water, sediment, etc.) of marine fuels.", category: "fuel" },
    { id: 4, question: "What should the setting tank temperature be for HFO?", options: ["40°C", "55°C", "70°C", "90°C"], correctAnswer: 2, explanation: "The HFO settling tank temperature is kept at ~70°C, allowing water and solids to settle by gravity.", category: "fuel" },
    { id: 5, question: "How many years should BDN be kept?", options: ["1 year", "2 years", "3 years", "5 years"], correctAnswer: 2, explanation: "In accordance with MARPOL Annex VI, the Bunker Delivery Note must be kept for at least 3 years.", category: "fuel" },
  ],
  "cooling-hvac": [
    { id: 1, question: "What is COP?", options: ["Compression ratio", "Coefficient of performance (cooling capacity/compressor work)", "Refrigerant coefficient", "Condenser efficiency"], correctAnswer: 1, explanation: "COP = QL/Wcomp is a measure of the efficiency of the cooling system. A higher COP indicates a more efficient system.", category: "cooling" },
    { id: 2, question: "Which fluid is R-717?", options: ["Freon", "Ammonia (NH₃)", "CO₂", "Propane"], correctAnswer: 1, explanation: "R-717 is ammonia. Highly efficient but toxic and flammable; requires special security measures.", category: "cooling" },
    { id: 3, question: "What should be the provision cooling room temperature?", options: ["-25°C to -18°C (frozen)", "+2°C to +5°C (fresh)", "Both are correct", "+10°C to +15°C"], correctAnswer: 2, explanation: "Frozen products are stored between -25°C and -18°C, and fresh products are stored between +2°C and +5°C.", category: "cooling" },
    { id: 4, question: "What does the Kigali Amendment aim for?", options: ["Banning of ODS substances", "Gradual reduction of HFCs", "Reducing CO₂ emissions", "Tightening NOx limits"], correctAnswer: 1, explanation: "The Kigali Amendment (2016) aims to phase out HFC refrigerants under the Montreal Protocol.", category: "cooling" },
    { id: 5, question: "What does subcooling mean?", options: ["Cooler overheating", "Cooling the liquid below the saturation temperature at the condenser outlet", "Complete evaporation in the evaporator", "Compressor superheat value"], correctAnswer: 1, explanation: "Subcooling is the cooling of the liquid refrigerant at the condenser outlet a few degrees below its saturation temperature.", category: "cooling" },
  ],
  electrical: [
    { id: 1, question: "Why is IT grounding used in ship electrical systems?", options: ["The cost is low", "The system continues to operate at the first earth leakage", "Provides higher efficiency", "Maintenance free"], correctAnswer: 1, explanation: "In the IT (isolated neutral) system, the circuit is not interrupted at the first earth leakage; In the second leak, an alarm is given.", category: "Electricity" },
    { id: 2, question: "What is the most common cause of black-out?", options: ["Fuel run out", "Overload or short circuit", "Low sea water temperature", "High wind"], correctAnswer: 1, explanation: "Overload, short circuit or protection failure are the most common causes of black-out.", category: "Electricity" },
    { id: 3, question: "What should be the minimum insulation resistance?", options: ["100 kΩ", "500 kΩ", "1MΩ", "10MΩ"], correctAnswer: 2, explanation: "The minimum insulation resistance according to IEC 60092 is 1 MΩ.", category: "Electricity" },
    { id: 4, question: "What are the parameters controlled in generator synchronization?", options: ["Frequency only", "Frequency, voltage, phase sequence and phase angle", "Voltage and current only", "Power factor and reactive power"], correctAnswer: 1, explanation: "In synchronization, the matching of frequency, voltage, phase sequence and phase angle is checked.", category: "Electricity" },
    { id: 5, question: "Why is phase sequence control important in shore connection?", options: ["Saves energy", "Prevents motors from turning over", "Prevents voltage drop", "Prevents generator damage"], correctAnswer: 1, explanation: "Incorrect phase sequence will cause motors to reverse, pumps to reverse, and equipment damage.", category: "Electricity" },
  ],
  automation: [
    { id: 1, question: "What does the 'I' term do in a PID controller?", options: ["Reacts suddenly", "Eliminates permanent error (offset)", "Reduces overshoot", "Filters noise"], correctAnswer: 1, explanation: "The integral (I) term resets the permanent offset by summing the accumulated error over time.", category: "Automation" },
    { id: 2, question: "What does 4 mA mean in a 4-20 mA signal?", options: ["Error status", "Minimum value of the measuring range", "Sensor off", "Calibration mode"], correctAnswer: 1, explanation: "4 mA = lower limit of the measuring range (0%); 20 mA = upper limit (100%). 0 mA indicates cable break.", category: "Automation" },
    { id: 3, question: "What does UMS certificate mean?", options: ["Automatic navigation system", "Unattended Machinery Space", "Emergency stop system", "Remote control proficiency"], correctAnswer: 1, explanation: "UMS: It is the certificate that allows the engine room to operate unmanned for certain periods of time.", category: "Automation" },
    { id: 4, question: "How many ohms is the resistance of the RTD (Pt100) sensor at 0°C?", options: ["10Ω", "50Ω", "100Ω", "1000Ω"], correctAnswer: 2, explanation: "Pt100: It is a platinum resistance temperature sensor with a resistance of 100 Ω at 0°C.", category: "Automation" },
    { id: 5, question: "What does dead band mean?", options: ["Range at which the sensor is broken", "Input range where the control output does not change", "Alarm threshold", "Maintenance interval"], correctAnswer: 1, explanation: "Dead band is the range of input changes over which the control system does not respond; prevents overwork.", category: "Automation" },
  ],
  "engine-room-ops": [
    { id: 1, question: "How long should the turning gear be run before the main engine is put into operation?", options: ["5 minutes", "15 minutes", "At least 1 hour", "There is no need"], correctAnswer: 2, explanation: "After a long stop, the turning gear is operated for at least 1 hour to perform oil distribution and mechanical control.", category: "Operation" },
    { id: 2, question: "According to STCW, what is the minimum rest period in 24 hours?", options: ["6 hours", "8 hours", "10 hours", "12 hours"], correctAnswer: 2, explanation: "STCW Code A-VIII/1: A minimum of 10 hours of rest is mandatory in a 24-hour period.", category: "Operation" },
    { id: 3, question: "What is the most critical information to be transmitted from the engine room to the bridge?", options: ["Fuel quantity", "Machine status and readiness level", "Number of crew", "Weather"], correctAnswer: 1, explanation: "The machinery status, readiness level and current restrictions should be reported to the bridge.", category: "Operation" },
    { id: 4, question: "What is stand-by?", options: ["The machine operates at full load", "The machine is kept ready to maneuver instantly", "The machine is turned off", "Auxiliary machinery stop"], correctAnswer: 1, explanation: "Stand-by: the main engine is kept in a position to instantly maneuver forward and backward.", category: "Operation" },
    { id: 5, question: "What information should be recorded in the deck logbook?", options: ["Faults only", "Machine operating parameters, fuel consumption, watch events", "Maintenance records only", "Crew list"], correctAnswer: 1, explanation: "Operating parameters, fuel/oil consumption, malfunctions and watch events are recorded in the deck logbook.", category: "Operation" },
  ],
  maintenance: [
    { id: 1, question: "What does a high MTBF mean?", options: ["Frequent malfunction", "High reliability", "High maintenance cost", "low yield"], correctAnswer: 1, explanation: "Equipment is more reliable when MTBF (Mean Time Between Failures) is high.", category: "Maintenance" },
    { id: 2, question: "What is the class special survey interval?", options: ["every year", "Every 2.5 years", "Every 5 years", "Every 10 years"], correctAnswer: 2, explanation: "Special survey is carried out every 5 years.", category: "Maintenance" },
    { id: 3, question: "What does high Fe (iron) indicate in oil analysis?", options: ["Good oil quality", "Abnormal wear", "Low TBN", "Water contamination"], correctAnswer: 1, explanation: "High Fe concentration indicates cylinder liner, piston ring or bearing wear.", category: "Maintenance" },
    { id: 4, question: "What is TBN?", options: ["Total number of bases (acid neutralization capacity)", "Total maintenance number", "Thermal decomposition point", "Torque magnitude number"], correctAnswer: 0, explanation: "TBN (Total Base Number): indicates the oil's capacity to neutralize acids. Low TBN = oil change required.", category: "Maintenance" },
    { id: 5, question: "What is the purpose of predictive maintenance?", options: ["Repair after malfunction", "Changing parts at regular intervals", "Monitoring equipment status and intervening before malfunction", "Resetting maintenance cost"], correctAnswer: 2, explanation: "Predictive maintenance, vibration analysis, oil analysis, etc. Detects signs of malfunction early using these methods.", category: "Maintenance" },
  ],
  "engine-room-safety": [
    { id: 1, question: "What should be done before commissioning the CO₂ extinguishing system in the engine room?", options: ["Ventilators are turned on", "All personnel are evacuated and ventilators are stopped", "Fire alarm system is turned off", "The main engine is brought to full load"], correctAnswer: 1, explanation: "Before CO₂ discharge, all personnel must be evacuated and ventilators and dampers must be closed.", category: "Security" },
    { id: 2, question: "What does the crankcase relief valve do?", options: ["Regulates oil pressure", "Limits damage by venting burst pressure", "Controls coolant flow", "Cuts off fuel input"], correctAnswer: 1, explanation: "Crankcase relief valve prevents structural damage by safely releasing excess pressure in case of explosion.", category: "Security" },
    { id: 3, question: "What measurement should be taken before entering the closed area of the engine room?", options: ["Temperature only", "O₂, LEL and toxic gas measurement", "Pressure only", "Humidity measurement"], correctAnswer: 1, explanation: "Before entering a closed space: O₂ (21%), LEL (<1%) and toxic gas (H₂S, CO etc.) measurement is mandatory.", category: "Security" },
    { id: 4, question: "When is a hot work permit required?", options: ["Always", "In welding, grinding and heat producing work", "On fuel tanks only", "Only on the shore"], correctAnswer: 1, explanation: "A hot work permit is mandatory for work that produces heat/sparks, such as welding, cutting, and grinding.", category: "Security" },
    { id: 5, question: "How often should quick-closing valve tests be performed?", options: ["once a year", "weekly", "Once a week or as per manufacturer recommendation", "Only in survey"], correctAnswer: 2, explanation: "Quick-closing valve tests are usually performed weekly; frequency depends on manufacturer's instructions and class rules.", category: "Security" },
  ],
  "environment-machine": [
    { id: 1, question: "What is the OWS output limit in ppm?", options: ["5 ppm", "10ppm", "15ppm", "25ppm"], correctAnswer: 2, explanation: "In accordance with MARPOL Annex I, OWS (Oily Water Separator) outlet oil concentration must be ≤ 15 ppm.", category: "Environment" },
    { id: 2, question: "What does Oil Record Book Part I cover?", options: ["Cargo operations", "Engine compartment oily waste records", "Garbage records", "Ballast water records"], correctAnswer: 1, explanation: "ORB Part I: covers engine room bilge, sludge, fuel and oil transfer records.", category: "Environment" },
    { id: 3, question: "What is the MARPOL Annex IV wastewater discharge limit?", options: ["Prohibited closer than 3 nautical miles", "Untreated discharges prohibited closer than 12 nautical miles", "Both are correct", "There is no limit"], correctAnswer: 2, explanation: "3 NM: even treated is prohibited (in some areas), 12 NM: untreated discharge is prohibited.", category: "Environment" },
    { id: 4, question: "On which ships is IAPP certification mandatory?", options: ["On all ships", "On ships over 400 GT", "Ten tankers only", "On cruise ships only"], correctAnswer: 1, explanation: "IAPP (International Air Pollution Prevention) certificate is mandatory for ships operating internationally over 400 GT.", category: "Environment" },
    { id: 5, question: "Where is incineration prohibited on a ship?", options: ["Offshore", "Harbor and shore", "It is free everywhere", "Only at ECA"], correctAnswer: 1, explanation: "Incineration of waste on ships is prohibited in port and shore (MARPOL Annex VI).", category: "Environment" },
  ],
  erm: [
    { id: 1, question: "What does 'situational awareness' mean in ERM?", options: ["Equipment awareness", "Continuous evaluation of environmental and operational conditions", "Security training", "Risk matrix"], correctAnswer: 1, explanation: "Situational awareness: continuous assessment of the current situation, changing conditions and potential risks.", category: "ERM" },
    { id: 2, question: "What does the Swiss cheese model explain?", options: ["Maintenance planning", "Accidents occur when multiple layers of defense fail simultaneously.", "Oil filter structure", "Safety valve working principle"], correctAnswer: 1, explanation: "Swiss cheese (James Reason) model: there are holes in each defensive layer; If they are all in line, an accident will occur.", category: "ERM" },
    { id: 3, question: "What does MLC 2006 determine the maximum working hours?", options: ["12 hours/day", "14 hours/24 hours or 72 hours/7 days", "16 hours/day", "unlimited"], correctAnswer: 1, explanation: "MLC 2006: operation in a maximum 14 hour/24 hour period or 72 hour/7 day period.", category: "ERM" },
    { id: 4, question: "What is near-miss?", options: ["Accident occurred", "Near accident incident", "Planned maintenance", "Risk matrix result"], correctAnswer: 1, explanation: "Near-miss: An event that could have serious consequences but was missed without any damage by chance. Reporting is mandatory.", category: "ERM" },
    { id: 5, question: "Which matrix is used in risk assessment?", options: ["3×3", "5×5 (probability × severity)", "10×10", "2×2"], correctAnswer: 1, explanation: "The standard risk matrix is 5×5: probability (1–5) × severity (1–5) = risk level (1–25).", category: "ERM" },
  ],
  "energy-efficiency": [
    { id: 1, question: "What does 'C' mean in CII rating?", options: ["good", "Medium (minimum acceptable)", "bad", "very bad"], correctAnswer: 1, explanation: "CII rating A (best) – E (worst): C = medium/minimum acceptable. D and E require corrective action.", category: "Energy Efficiency" },
    { id: 2, question: "For which ships is EEXI mandatory?", options: ["New ships only", "All existing ships after 2023 (over 400 GT)", "Tankers only", "Container ships only"], correctAnswer: 1, explanation: "EEXI (Energy Efficiency Existing Ship Index) is mandatory for all existing ships over 400 GT from 2023.", category: "Energy Efficiency" },
    { id: 3, question: "What does SEEMP contain?", options: ["CII calculation only", "Energy efficiency management plan, CII calculation and improvement measures", "Fuel report only", "Emission measurement results"], correctAnswer: 1, explanation: "SEEMP (Ship Energy Efficiency Management Plan): includes energy efficiency policy, CII monitoring and improvement plan.", category: "Energy Efficiency" },
    { id: 4, question: "How does trim optimization save fuel?", options: ["Increases engine power", "Requires lower power by reducing hull resistance", "Changes fuel quality", "Reduces propeller efficiency"], correctAnswer: 1, explanation: "Optimum trim minimizes wave resistance and total hull resistance, providing the same speed with less power.", category: "Energy Efficiency" },
    { id: 5, question: "What does the WHR system do?", options: ["Preheats the fuel", "Converts exhaust gas waste heat into electrical or steam energy", "Lowers coolant temperature", "Purifies ballast water"], correctAnswer: 1, explanation: "WHR (Waste Heat Recovery): generates electricity or provides steam using the waste heat of exhaust gas and cooling water.", category: "Energy Efficiency" },
  ],
};

function getQuestions(slug: string): QuizQuestion[] {
  return topicQuestions[slug] || [];
}

function getRandomQuestions(slug: string, count: number, seed: number): QuizQuestion[] {
  const all = getQuestions(slug);
  if (count >= all.length) return all;
  const shuffled = [...all].sort(() => {
    seed = (seed * 16807) % 2147483647;
    return (seed / 2147483647) - 0.5;
  });
  return shuffled.slice(0, count);
}

export default function MachineTopicQuizPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const allQuestions = topicSlug ? getQuestions(topicSlug) : [];
  const maxCount = allQuestions.length;

  const [count, setCount] = useState<number>(Math.min(5, maxCount));
  const [seed, setSeed] = useState<number>(Date.now());

  const questions = useMemo(() => getRandomQuestions(topicSlug || "", count, seed), [topicSlug, count, seed]);

  if (!topic || maxCount === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Quiz not found</p>
      </div>
    );
  }

  const selectableCounts = Array.from(new Set([5, maxCount].filter(n => n <= maxCount))).sort((a, b) => a - b);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 space-y-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" />
              {topic.title} Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>Total questions: {maxCount}</span>
              <span>•</span>
              <span>Displayed: {count}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectableCounts.map((c) => (
                <Button key={c} variant={count === c ? "default" : "outline"} size="sm" onClick={() => { setCount(c); setSeed(Date.now()); }}>
                  {c === maxCount ? `All (${c})` : `${c} Question`}
                </Button>
              ))}
              <Button variant="ghost" size="sm" className="gap-1" onClick={() => setSeed(Date.now())}>
                <Shuffle className="h-4 w-4" /> Mix
              </Button>
            </div>

            <Quiz questions={questions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
