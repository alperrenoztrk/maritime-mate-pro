import { Clock3, Droplets, Fuel, Gauge, Waves } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { ProfessionalCalculator, type ProfessionalCalculatorProps } from "@/components/calculations/ProfessionalCalculator";
import {
  calculateVoyageEta,
  calculateRectangularFreeSurface,
  calculateTpcFromWaterplaneArea,
  calculateEngineFuelConsumption,
  calculateFuelEndurance,
} from "@/lib/verifiedOperationalMath";

/** Focused, auditable calculators — never a claim of ship-approved operational output. */
const VERIFIED_TOOLS: Record<string, ProfessionalCalculatorProps> = {
  "voyage-eta": {
    title: "Voyage ETA (UTC)",
    icon: Clock3,
    description: "Calculate passage time and UTC arrival clock from distance, constant speed over ground, and departure clock. D+1 means the next UTC day.",
    formula: "Passage time (h) = Distance (NM) / SOG (kn); ETA UTC = ETD UTC + passage time",
    groups: [{
      title: "Passage Inputs",
      fields: [
        { key: "distance", label: "Remaining distance", unit: "NM", placeholder: "120", min: 0 },
        { key: "speed", label: "Expected speed over ground", unit: "kn", placeholder: "10", min: 0.000001 },
        { key: "etd", label: "Departure UTC (decimal hours)", unit: "h", placeholder: "20.5", min: 0, max: 23.999999,
          help: "Example: 20.5 = 20:30 UTC. Do not enter 20.30 for 20:30." },
      ],
    }],
    resultTitle: "ETA Results",
    solve: ({ distance, speed, etd }) => {
      const r = calculateVoyageEta(distance, speed, etd);
      return {
        results: [
          { label: "Estimated arrival (UTC)", value: `${r.etaUtcClock} (D+${r.dayOffset})`, primary: true },
          { label: "Passage time", value: `${r.passageHours.toFixed(3)} h` },
          { label: "Whole UTC days after departure", value: `${r.dayOffset}` },
        ],
        steps: [
          `Passage time = ${distance} NM / ${speed} kn = ${r.passageHours.toFixed(4)} h.`,
          `Departure = ${etd} decimal UTC hours; add passage hours and carry over whole 24-hour days.`,
          `Rounded to nearest minute: ${r.etaUtcClock} UTC on D+${r.dayOffset}.`,
        ],
        notices: ["ETA is based on an assumed constant SOG and does not include route changes, weather, currents, speed restrictions, delays or a calendar date."],
      };
    },
    limitations: "For planning and cross-checking only; input speed must represent expected SOG. No destination time zone or calendar date is inferred. Confirm using the approved passage plan and live conditions.",
  },
  "free-surface": {
    title: "Free Surface Correction (GM)",
    icon: Waves,
    description: "Transverse small-angle correction for ONE partially filled, freely communicating rectangular tank. Enter GM before free-surface correction.",
    formula: "i = L × B³ / 12 (m⁴); FSM = ρ_liquid × i (t·m); FSC = FSM / Δ (m); GM_effective = GM_before − FSC",
    groups: [
      { title: "Slack Tank Geometry", fields: [
        { key: "length", label: "Free-surface length (fore and aft)", unit: "m", placeholder: "10", min: 0.000001 },
        { key: "breadth", label: "Free-surface breadth (port to starboard)", unit: "m", placeholder: "5", min: 0.000001 },
        { key: "density", label: "Tank liquid density", unit: "t/m³", placeholder: "1.025", min: 0.000001 },
      ] },
      { title: "Vessel Stability", fields: [
        { key: "displacement", label: "Ship displacement including tank liquid", unit: "t", placeholder: "10000", min: 0.000001 },
        { key: "gm", label: "GM before free-surface correction", unit: "m", placeholder: "0.8" },
      ] },
    ],
    resultTitle: "Effective Initial GM",
    solve: ({ length, breadth, density, displacement, gm }) => {
      const r = calculateRectangularFreeSurface(length, breadth, density, displacement, gm);
      return {
        results: [
          { label: "GM after this tank correction", value: `${r.correctedGmM.toFixed(4)} m`, primary: true },
          { label: "Free surface correction", value: `${r.freeSurfaceCorrectionM.toFixed(4)} m`, primary: true },
          { label: "Free surface moment", value: `${r.freeSurfaceMomentTonneMetres.toFixed(3)} t·m` },
          { label: "Transverse second moment", value: `${r.transverseSecondMomentM4.toFixed(3)} m⁴` },
        ],
        steps: [
          `Transverse surface second moment = ${length} × ${breadth}³ / 12 = ${r.transverseSecondMomentM4.toFixed(4)} m⁴.`,
          `FSM = ${density} × ${r.transverseSecondMomentM4.toFixed(4)} = ${r.freeSurfaceMomentTonneMetres.toFixed(4)} t·m.`,
          `FSC = ${r.freeSurfaceMomentTonneMetres.toFixed(4)} / ${displacement} = ${r.freeSurfaceCorrectionM.toFixed(5)} m.`,
          `GM effective = ${gm} − ${r.freeSurfaceCorrectionM.toFixed(5)} = ${r.correctedGmM.toFixed(5)} m.`,
        ],
        notices: [
          "Only one idealised unpartitioned slack tank is included. Approved stability data must be used to account for all relevant free surfaces.",
          ...(r.correctedGmM <= 0 ? ["Calculated GM is non-positive. This is a serious warning; do not infer compliance or operational safety from this worksheet."] : []),
        ],
      };
    },
    limitations: "Small-angle initial-stability approximation for a single rectangular slack tank. Do not apply to pressed-up or empty tanks, or to subdivided/nonrectangular tanks without approved correction data. A positive GM alone does not establish intact-stability compliance.",
  },
  "waterplane-tpc": {
    title: "TPC from Waterplane Area",
    icon: Droplets,
    description: "Estimate tonnes per centimetre immersion from waterplane area at the specified draft and actual water density.",
    formula: "TPC (t/cm) = A_waterplane (m²) × ρ_water (t/m³) / 100",
    groups: [{ title: "Hydrostatic Inputs", fields: [
      { key: "area", label: "Waterplane area at draft", unit: "m²", placeholder: "2500", min: 0.000001 },
      { key: "density", label: "Water density", unit: "t/m³", placeholder: "1.025", min: 0.000001 },
    ] }],
    resultTitle: "TPC Estimate",
    solve: ({ area, density }) => {
      const r = calculateTpcFromWaterplaneArea(area, density);
      return {
        results: [{ label: "Tonnes per centimetre immersion", value: `${r.tonnesPerCm.toFixed(3)} t/cm`, primary: true }],
        steps: [`TPC = ${area} × ${density} / 100 = ${r.tonnesPerCm.toFixed(4)} t/cm.`],
        notices: ["TPC depends on draft, trim and water density. Use ship hydrostatic tables for actual loading calculations."],
      };
    },
    limitations: "Local approximation at a specified waterplane. Not a substitute for vessel hydrostatic data or a loading instrument.",
  },
  "engine-sfoc": {
    title: "Engine Fuel Consumption",
    icon: Fuel,
    description: "Calculate fuel mass from actual engine power output, representative SFOC and total operating time.",
    formula: "Fuel (t) = Power (kW) × SFOC (g/kWh) × Running time (h) / 1,000,000",
    groups: [{ title: "Engine Performance Data", fields: [
      { key: "power", label: "Average delivered power", unit: "kW", placeholder: "8000", min: 0 },
      { key: "sfoc", label: "Specific fuel oil consumption", unit: "g/kWh", placeholder: "180", min: 0.000001,
        help: "Use a load-appropriate figure from the engine's manufacturer/test data; it varies with operating conditions." },
      { key: "hours", label: "Running time", unit: "h", placeholder: "24", min: 0 },
    ] }],
    resultTitle: "Fuel Consumption",
    solve: ({ power, sfoc, hours }) => {
      const r = calculateEngineFuelConsumption(power, sfoc, hours);
      return {
        results: [
          { label: "Estimated consumption", value: `${r.tonnes.toFixed(4)} t`, primary: true },
          { label: "Estimated consumption", value: `${r.kilograms.toFixed(2)} kg` },
          { label: "Fuel consumption per operating hour", value: `${r.hourlyKg.toFixed(2)} kg/h` },
        ],
        steps: [
          `Hourly mass rate = ${power} kW × ${sfoc} g/kWh ÷ 1000 = ${r.hourlyKg.toFixed(4)} kg/h.`,
          `Total mass = ${r.hourlyKg.toFixed(4)} kg/h × ${hours} h ÷ 1000 = ${r.tonnes.toFixed(4)} t.`,
        ],
        notices: ["Only the selected engine is included. Fuel consumed by auxiliaries and boilers is not included unless independently accounted for."],
      };
    },
    limitations: "Assumes constant average power and SFOC across the period. Performance varies with engine loading, fuel, environment and wear. Confirm against engine documentation and measured fuel flow/ROB.",
  },
  "fuel-endurance": {
    title: "Fuel Endurance",
    icon: Gauge,
    description: "Estimate operating endurance from fuel remaining on board, a protected reserve and expected daily use.",
    formula: "Usable fuel = ROB − protected reserve; Endurance (days) = usable fuel / expected daily consumption",
    groups: [{ title: "Fuel Planning Inputs", fields: [
      { key: "rob", label: "Fuel remaining on board", unit: "t", placeholder: "120", min: 0 },
      { key: "reserve", label: "Protected fuel reserve", unit: "t", placeholder: "20", min: 0 },
      { key: "daily", label: "Expected consumption", unit: "t/day", placeholder: "25", min: 0.000001 },
    ] }],
    resultTitle: "Fuel Endurance Results",
    solve: ({ rob, reserve, daily }) => {
      const r = calculateFuelEndurance(rob, reserve, daily);
      return {
        results: [
          { label: "Endurance excluding reserve", value: `${r.days.toFixed(2)} days`, primary: true },
          { label: "Endurance excluding reserve", value: `${r.hours.toFixed(1)} h` },
          { label: "Usable fuel above reserve", value: `${r.availableTonnes.toFixed(3)} t` },
        ],
        steps: [
          `Fuel available = ${rob} − ${reserve} = ${r.availableTonnes.toFixed(3)} t.`,
          `Endurance = ${r.availableTonnes.toFixed(3)} / ${daily} = ${r.days.toFixed(3)} days.`,
        ],
        notices: ["Endurance is not a range forecast. Weather, speed, generators, machinery, fuel quality and changes in consumption remain separate considerations."],
      };
    },
    limitations: "Constant average total daily consumption assumed; usable quantities must account for unpumpable fuel and vessel procedures. Reserve must be maintained under the vessel's passage/fuel management plan.",
  },
};

export default function VerifiedMaritimeToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const config = toolId ? VERIFIED_TOOLS[toolId] : null;
  return config ? <ProfessionalCalculator {...config} /> : <Navigate to="/calculations" replace />;
}
