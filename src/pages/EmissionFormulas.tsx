import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sigma } from "lucide-react";

const formulas = [
  {
    category: "Emission Calculations",
    items: [
      {
        name: "CO₂ Emission",
        formula: "CO₂ (tonnes) = Fuel (tonnes) × CF",
        description: "CF: carbon factor (by fuel type)",
        example: "For HFO, CF = 3.114; 1000 tonnes of HFO → 3114 tonnes of CO₂"
      },
      {
        name: "SOx Emission",
        formula: "SOx (kg) = Fuel (tonnes) × S% × 20 × 2",
        description: "S%: fuel sulphur content (per cent), 2: the SO₂/S conversion factor",
        example: "0.5% sulphur, 100 tonnes of fuel → 200 kg of SOx"
      },
      {
        name: "NOx Emission",
        formula: "NOx (kg) = P (kW) × t (h) × EF / 1000",
        description: "EF: emission factor (g/kWh), varies with the engine type",
        example: "For a Tier II engine, EF ≈ 14.4 g/kWh"
      },
      {
        name: "PM Emisyonu",
        formula: "PM (kg) = Fuel (tonnes) × EF_PM",
        description: "EF_PM: particulate matter emission factor (kg per tonne of fuel)",
        example: "For HFO, EF_PM ≈ 1.5 kg/tonne"
      }
    ]
  },
  {
    category: "Energy Efficiency",
    items: [
      {
        name: "EEXI (Energy Efficiency Existing Ship Index)",
        formula: "EEXI = (P × CF × SFC) / (Capacity × Vref)",
        description: "P: main engine power (kW), SFC: specific fuel consumption (g/kWh), Vref: reference speed (knots)",
        example: "Birim: gCO₂ / (ton·nm)"
      },
      {
        name: "CII (Carbon Intensity Indicator)",
        formula: "CII = (Annual CO₂) / (Capacity × Distance)",
        description: "The operational carbon intensity, calculated on an annual basis",
        example: "Birim: gCO₂ / (ton·nm)"
      },
      {
        name: "AER (Annual Efficiency Ratio)",
        formula: "AER = (∑CO₂) / (DWT × ∑Distance)",
        description: "Total annual CO₂ / (transport capacity × total distance)",
        example: "Typical AER for a bulk carrier: 3-8 g CO₂/(tonne·nm)"
      },
      {
        name: "EEDI (Energy Efficiency Design Index)",
        formula: "EEDI = (∑P × CF × SFC) / (fi × Capacity × Vref)",
        description: "The design index for new ships; fi: correction factors",
        example: "IMO phase 3: EEDI ≤ Referans × (1 - %30)"
      }
    ]
  },
  {
    category: "Fuel and Energy",
    items: [
      {
        name: "Daily Fuel Consumption",
        formula: "FOC (tonnes/day) = P (kW) × SFOC (g/kWh) × 24 / 10⁶",
        description: "SFOC: specific fuel consumption, varies with the load condition",
        example: "10,000 kW at 180 g/kWh → 43.2 tonnes/day"
      },
      {
        name: "Voyage Fuel Consumption",
        formula: "Total Fuel = FOC × (Distance / Speed) / 24",
        description: "The distance is in nm and the speed in knots",
        example: "3000 nm at 15 knots and 40 tonnes/day → 333 tonnes"
      },
      {
        name: "Enerji (kWh)",
        formula: "E = P (kW) × t (h)",
        description: "For generator load analysis",
        example: "500 kW × 24 saat = 12,000 kWh"
      }
    ]
  },
  {
    category: "Carbon Factors (CF)",
    items: [
      {
        name: "HFO (Heavy Fuel Oil)",
        formula: "CF = 3.114 tonnes CO₂ per tonne of fuel",
        description: "Heavy fuel oil, the most common marine fuel",
        example: ""
      },
      {
        name: "VLSFO (Very Low Sulphur FO)",
        formula: "CF = 3.151 tonnes CO₂ per tonne of fuel",
        description: "Low sulphur fuel (0.5% max)",
        example: ""
      },
      {
        name: "MGO/MDO (Marine Gas/Diesel Oil)",
        formula: "CF = 3.206 tonnes CO₂ per tonne of fuel",
        description: "Distillate fuels",
        example: ""
      },
      {
        name: "LNG (Liquefied Natural Gas)",
        formula: "CF = 2.750 tonnes CO₂ per tonne of fuel",
        description: "Liquefied natural gas",
        example: ""
      },
      {
        name: "Methanol",
        formula: "CF = 1.375 tonnes CO₂ per tonne of fuel",
        description: "Alternative fuel",
        example: ""
      }
    ]
  }
];

export default function EmissionFormulas() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-green-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
            <Sigma className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Environmental Formulas
          </h1>
        </div>

        <div className="space-y-8">
          {formulas.map((category, cIndex) => (
            <div key={cIndex} className="animate-fade-in" style={{ animationDelay: `${cIndex * 100}ms` }}>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-emerald-600" />
                {category.category}
              </h2>
              <div className="grid gap-4">
                {category.items.map((item, iIndex) => (
                  <Card key={iIndex} className="border-border/60 bg-card/85">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-foreground">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 font-mono text-sm">
                        {item.formula}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      {item.example && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded">
                          Example: {item.example}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
