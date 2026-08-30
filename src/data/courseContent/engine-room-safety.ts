import { ShieldAlert } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Engine Room Safety — educational/reference calculations.
 *
 * Safety-critical calculators must never authorize work or entry. Vessel SMS,
 * permits, approved fire-control documentation, maker instructions and the
 * responsible officer/master remain the operational authority.
 */
export const engineRoomSafety: CourseTopic = {
  key: "engine-room-safety",
  title: "Engine Room Safety",
  icon: ShieldAlert,
  accent: "from-rose-500 via-red-500 to-orange-500",
  group: "machine",
  intro:
    "Fire and explosion risk, fixed CO₂ extinguishing, ventilation and enclosed space " +
    "entry safety. Calculations are training/reference aids and do not replace approved ship procedures.",
  entries: [
    {
      id: "fire-triangle",
      name: "Fire Triangle",
      group: "Fire Safety",
      formula: "Fuel + Oxygen + Heat = Fire",
      variables: [
        { symbol: "Fuel", label: "Combustible material" },
        { symbol: "Oxygen", label: "Oxidiser" },
        { symbol: "Heat", label: "Ignition energy" },
      ],
      source: { code: "Combustion principle", detail: "Fuel, oxidiser and sufficient ignition energy are required for combustion" },
      note: "This is a conceptual teaching aid. A single generic oxygen percentage cannot determine whether a particular fuel/mixture can burn; flammability depends on the substance, concentration, temperature and other conditions.",
      inputs: [
        { key: "fuel", label: "Combustible Material (1 = present, 0 = absent)", unit: "", placeholder: "1" },
        { key: "o2", label: "Measured Oxygen", unit: "%", placeholder: "20.9" },
        { key: "heat", label: "Ignition Source (1 = present, 0 = absent)", unit: "", placeholder: "1" },
      ],
      calculate: (v) => {
        const fuelPresent = v.fuel >= 1;
        const heatPresent = v.heat >= 1;
        const oxygenPresent = v.o2 > 0;
        const present = [fuelPresent && "Fuel", oxygenPresent && "Oxygen", heatPresent && "Heat"].filter(Boolean).join(" + ") || "—";
        return [
          { label: "Elements Indicated", value: present },
          {
            label: "Assessment",
            value: fuelPresent && heatPresent && oxygenPresent
              ? "Combustion elements indicated — evaluate the actual fuel/atmosphere"
              : "One or more basic combustion elements not indicated",
          },
        ];
      },
    },
    {
      id: "co2-quantity",
      name: "CO₂ Mass from Selected Free-Gas Ratio",
      group: "Fire Safety",
      formula: "mCO₂ = (V × selected free-gas ratio) / 0.56 m³/kg",
      variables: [
        { symbol: "V", label: "Volume used for the selected approved design method", unit: "m³" },
        { symbol: "ratio", label: "Selected free CO₂ volume ratio", unit: "%" },
        { symbol: "0.56", label: "Free CO₂ specific volume used by the FSS Code calculation", unit: "m³/kg" },
        { symbol: "mCO₂", label: "Calculated CO₂ mass", unit: "kg" },
      ],
      source: { code: "SOLAS II-2 / FSS Code Chapter 5", detail: "Fixed gas fire-extinguishing systems" },
      note: "Reference calculation only. Machinery-space CO₂ sizing is not established by one universal 40% input alone; the applicable FSS Code gross-volume method, approved system design, connected casing volume and other system requirements govern. Use the ratio and volume from the vessel's approved fire-control/system documentation.",
      inputs: [
        { key: "vol", label: "Applicable Design Volume", unit: "m³", placeholder: "2000" },
        { key: "ratio", label: "Selected Free CO₂ Ratio", unit: "%", placeholder: "40" },
      ],
      calculate: (v) => {
        if (v.vol <= 0 || v.ratio <= 0) {
          return [{ label: "Error", value: "Volume and selected ratio must be positive" }];
        }
        const mass = (v.vol * (v.ratio / 100)) / 0.56;
        return [
          { label: "Calculated CO₂ Mass", value: `${mass.toFixed(0)} kg` },
          { label: "Use", value: "Reference only — verify against the approved fixed CO₂ system" },
        ];
      },
    },
    {
      id: "foam-quantity",
      name: "Foam Quantity",
      group: "Fire Safety",
      formula: "V_foam = A × t × application rate",
      variables: [
        { symbol: "A", label: "Protected area", unit: "m²" },
        { symbol: "t", label: "Application time", unit: "min" },
        { symbol: "application rate", label: "Application rate from the applicable approved system requirement", unit: "L/m²·min" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Fixed foam system — use the rate/time applicable to the approved system" },
      note: "The arithmetic converts area × time × selected application rate to foam-solution volume. It does not establish the required regulatory application rate or system capacity for a specific ship.",
      inputs: [
        { key: "a", label: "Protected Area (A)", unit: "m²", placeholder: "300" },
        { key: "t", label: "Application Time (t)", unit: "min", placeholder: "5" },
        { key: "rate", label: "Approved Application Rate", unit: "L/m²·min", placeholder: "6.5" },
      ],
      calculate: (v) => {
        const vol = v.a * v.t * v.rate;
        return [
          { label: "Foam Solution", value: `${vol.toFixed(0)} L` },
          { label: "Foam Solution", value: `${(vol / 1000).toFixed(2)} m³` },
        ];
      },
    },
    {
      id: "engine-room-ventilation",
      name: "Ventilation Flow Estimate",
      group: "Fire Safety",
      formula: "Illustrative air demand = engine power × selected factor",
      variables: [
        { symbol: "P", label: "Total engine power", unit: "kW" },
        { symbol: "V", label: "Machinery space volume", unit: "m³" },
      ],
      source: { code: "Engineering estimate", detail: "Manufacturer, class and approved ventilation design govern" },
      note: "The default factor is an illustrative engineering estimate, not a statutory minimum. Use maker combustion-air data and the vessel's approved machinery-space ventilation design for operational decisions.",
      inputs: [
        { key: "p", label: "Total Engine Power", unit: "kW", placeholder: "15000" },
        { key: "vol", label: "Machinery Space Volume", unit: "m³", placeholder: "2500" },
      ],
      calculate: (v) => {
        if (v.vol <= 0) return [{ label: "Error", value: "Space volume must be positive" }];
        const airForCombustion = v.p * 2.5;
        const ventChanges = airForCombustion / v.vol;
        return [
          { label: "Illustrative Air Demand", value: `${airForCombustion.toFixed(0)} m³/h` },
          { label: "Equivalent Air Change Rate", value: `${ventChanges.toFixed(1)} /h` },
          { label: "Use", value: "Training estimate — not an approved ventilation set-point" },
        ];
      },
    },
    {
      id: "lel-uel",
      name: "LEL / UEL (Explosive Range)",
      group: "Explosion Risk",
      formula: "LEL ≤ concentration ≤ UEL",
      variables: [
        { symbol: "LEL", label: "Lower explosive/flammable limit for the specific substance", unit: "% by volume" },
        { symbol: "UEL", label: "Upper explosive/flammable limit for the specific substance", unit: "% by volume" },
      ],
      source: { code: "Flammability limits", detail: "Use substance-specific SDS/maker data and calibrated detector interpretation" },
      note: "Values above the UEL are not 'safe': dilution with air can bring a rich mixture back through the flammable range. Confirm the actual substance, detector scale and atmosphere before interpreting readings.",
      inputs: [
        { key: "conc", label: "Measured Concentration", unit: "% by volume", placeholder: "3" },
        { key: "lel", label: "Lower Flammable Limit (LFL/LEL)", unit: "% by volume", placeholder: "1" },
        { key: "uel", label: "Upper Flammable Limit (UFL/UEL)", unit: "% by volume", placeholder: "6" },
      ],
      calculate: (v) => {
        let status: string;
        if (v.conc < v.lel) status = "Below the entered LEL — verify substance, detector and changing conditions";
        else if (v.conc > v.uel) status = "Above the entered UEL — rich mixture; may become flammable when diluted";
        else status = "WITHIN ENTERED FLAMMABLE RANGE";
        return [
          { label: "Concentration", value: `${v.conc} % by volume` },
          { label: "Assessment", value: status },
        ];
      },
    },
    {
      id: "flash-point",
      name: "Flash Point Check against Entered Limit",
      group: "Explosion Risk",
      formula: "Margin = measured flash point − entered applicable limit",
      variables: [
        { symbol: "Tflash", label: "Measured/certified flash point", unit: "°C" },
        { symbol: "Limit", label: "Applicable minimum selected from the governing requirement", unit: "°C" },
      ],
      source: { code: "SOLAS II-2/Reg.4", detail: "Fuel-oil flash-point requirements include defined exceptions and applicability" },
      note: "The common 60 °C requirement has exceptions and application conditions. The calculator only compares against the limit entered by the user; it does not determine which regulatory limit applies to the installation.",
      inputs: [
        { key: "tflash", label: "Measured/Certified Flash Point", unit: "°C", placeholder: "65" },
        { key: "limit", label: "Applicable Entered Minimum", unit: "°C", placeholder: "60" },
      ],
      calculate: (v) => {
        const margin = v.tflash - v.limit;
        return [
          { label: "Margin to Entered Limit", value: `${margin.toFixed(1)} °C` },
          { label: "Comparison", value: margin >= 0 ? "Meets the entered minimum" : "Below the entered minimum" },
          { label: "Regulatory Status", value: "Not determined by this comparison alone" },
        ];
      },
    },
    {
      id: "enclosed-space-oxygen",
      name: "Enclosed Space Atmosphere Screening",
      group: "Explosion Risk",
      formula: "O₂ ≈ 21% vol; LFL ≤ 1%; toxic gases ≤ 50% of the applicable OEL",
      variables: [
        { symbol: "O₂", label: "Oxygen content", unit: "% vol" },
        { symbol: "LFL", label: "Flammable atmosphere reading", unit: "% LFL" },
        { symbol: "OEL", label: "Applicable occupational exposure limit for each toxic gas", unit: "ppm or applicable unit" },
      ],
      source: { code: "IMO Resolution A.1050(27)", detail: "Revised Recommendations for Entering Enclosed Spaces Aboard Ships, sections 5–8" },
      note: "Atmosphere readings alone never authorize entry. IMO guidance also requires hazard assessment, isolation, ventilation, calibrated multi-level testing, authorization/permit, communications, attendant and rescue arrangements as applicable. National requirements and the vessel SMS may set different safe atmosphere ranges.",
      inputs: [
        { key: "o2", label: "Measured O₂", unit: "% vol", placeholder: "21.0" },
        { key: "lel", label: "Flammable Gas Reading", unit: "% LFL", placeholder: "0" },
        { key: "h2s", label: "Measured H₂S", unit: "ppm", placeholder: "0" },
        { key: "h2sOel", label: "Applicable H₂S OEL", unit: "ppm", placeholder: "10" },
        { key: "co", label: "Measured CO", unit: "ppm", placeholder: "5" },
        { key: "coOel", label: "Applicable CO OEL", unit: "ppm", placeholder: "25" },
      ],
      calculate: (v) => {
        const o2Ok = Math.abs(v.o2 - 21) <= 0.2;
        const lelOk = v.lel <= 1;
        const h2sOk = v.h2s <= v.h2sOel * 0.5;
        const coOk = v.co <= v.coOel * 0.5;
        const atmosphericCriteriaMet = o2Ok && lelOk && h2sOk && coOk;
        return [
          { label: "O₂ Screening", value: `${v.o2}% vol → ${o2Ok ? "near the IMO entry reference value" : "outside the entered screening band"}` },
          { label: "Flammable Gas", value: `${v.lel}% LFL → ${lelOk ? "at/below 1% LFL" : "above 1% LFL"}` },
          { label: "H₂S Screening", value: `${v.h2s} ppm → ${h2sOk ? "at/below 50% of entered OEL" : "above 50% of entered OEL"}` },
          { label: "CO Screening", value: `${v.co} ppm → ${coOk ? "at/below 50% of entered OEL" : "above 50% of entered OEL"}` },
          {
            label: "Atmosphere Screening",
            value: atmosphericCriteriaMet
              ? "Entered atmospheric criteria met — this does NOT authorize entry"
              : "Entered atmospheric criteria not met — do not treat the space as ready for normal entry",
          },
          { label: "Entry Authorization", value: "Must come from the vessel's enclosed-space entry procedure/permit and responsible person" },
        ];
      },
    },
  ],
};
