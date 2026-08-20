import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import { EngineCalculations } from "@/components/calculations/EngineCalculations";
import { MobileLayout } from "@/components/MobileLayout";
import { CalculationGridScreen } from "@/components/ui/calculation-grid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const onboardMachines = [
  {
    name: "Main engine (Propulsion System)",
    detail: "Main diesel engine, steam/gas turbine or diesel-electric propulsion",
    description:
      "It forms the main propulsion system of the ship; It works integrated with the propeller, shaft line and control chain. Fuel quality, lubrication pressure and main bearing temperatures are critical parameters for performance.",
    manual: [
      "Before the watch: check the oil level, the sea/oil cooling water circuits and the fuel viscosity heating.",
      "Start-up: verify that the turning gear is disengaged and that the lube oil pressure and jacket water temperature are within operating limits.",
      "At sea: monitor the exhaust temperature trends and carry out the cylinder balance check regularly; log vibration/alarm records.",
      "Shutdown: reduce the load gradually and keep circulating the cooling circuits according to the normal stopping procedure.",
    ],
  },
  {
    name: "Auxiliary Machinery",
    detail: "Auxiliary diesel and emergency generators, shaft generator",
    description:
      "Auxiliary diesel generators and emergency generators that provide ship electricity operate in redundancy to ensure uninterrupted supply of critical systems. Load sharing and automatic commissioning capabilities are important.",
    manual: [
      "Complete the oil, cooling water, fuel and air/fog tests before starting.",
      "Keep harmonic/reactive loads balanced by monitoring generator load sharing.",
      "Carry out the emergency generator auto-start and fuel level tests weekly.",
      "Record the AVR, governor and insulation resistance tests during planned maintenance.",
    ],
  },
  {
    name: "Electrical & Power Systems",
    detail: "Main/emergency switchboard, UPS, transformers and battery banks",
    description:
      "Power distribution is done through the main and emergency switchboard; critical circuits are protected by UPS and batteries. Earth leakage, short circuit and frequency/voltage deviations should be monitored instantly.",
    manual: [
      "Apply the busbar synchronisation and breaker opening/closing sequences according to the procedure.",
      "Monitor harmonic distortion and voltage balance during load transfer; check overheating busbars with a thermal camera.",
      "Carry out UPS battery tests periodically, ventilate the room and check the gas detectors.",
      "Run black-out scenarios in emergency drills and record the times taken.",
    ],
  },
  {
    name: "Fuel & Oil Systems",
    detail: "Fuel/lube oil separators, day tanks, transfer and supply pumps",
    description:
      "It provides clean, appropriate viscosity fuel/oil to the main machinery and generators. Separators separate water and particulate; Daily tank levels can also affect the trim/stability of the ship.",
    manual: [
      "Set the pre-separator heater according to the grade of fuel; make sure the bowl speed is at its nominal value.",
      "Apply an automatic shut-off and a lookout against the risk of overflow when transferring between day tanks.",
      "Record fouling trends by monitoring the LO/FO filtration differential pressures.",
      "Carry out sludge and drain discharges in accordance with the MARPOL procedure and enter them in the Oil Record Book.",
    ],
  },
  {
    name: "Pumps",
    detail: "Bilge, ballast, fire, cooling water and fresh/sea water pumps",
    description:
      "It is the backbone of all fluid transfers on board; Fire, ballast and cooling pumps work in different roles. Cavitation, vibration and leakage are early indicators of failure.",
    manual: [
      "Check the suction/discharge valves and any venting needs before starting each pump.",
      "Follow the tank sequence on the ballast pumps according to the stability plan; test the fire pumps weekly.",
      "Clean the strainers/filters on the cooling water pumps regularly and log the pressure and temperature differences.",
      "Verify the bilge pumps together with the MARPOL requirements and the 15 ppm OWS interlocks.",
    ],
  },
  {
    name: "Refrigeration & HVAC",
    detail: "Central cooling circuit, HVAC, cold stores and reefer systems",
    description:
      "The main/auxiliary engine jacket water and central cooling circuits work integrated with the HVAC that air-conditions the deck and living space. Reefer container feeds are temperature sensitive.",
    manual: [
      "Monitor the central cooling plate heat exchangers by differential pressure and clean them when necessary.",
      "Check the HVAC filters and damper settings monthly; adjust the fresh air ratio according to the CO₂ sensors.",
      "Verify the reefer socket load tests and the alarm monitoring panel regularly.",
      "Inspect the condenser/evaporator surfaces for fouling and record the gas leak tests.",
    ],
  },
  {
    name: "Boilers",
    detail: "Auxiliary boiler and EGB; heating, fuel viscosity and steam demand",
    description:
      "Auxiliary boilers and exhaust gas boilers provide fuel heating, tank heating and living space steam needs. Combustion adjustment, water level control and blow-down are critical safety points.",
    manual: [
      "Verify the steam/air pressure and viscosity required for fuel atomisation before starting up.",
      "Test the low water level and high steam pressure alarms periodically; observe the feed water pumps.",
      "Plan and record soot-blowing on the EGB according to the exhaust temperature difference.",
      "Monitor the TDS/pH values with a daily blow-down; adjust the chemical dosage according to the test results.",
    ],
  },
  {
    name: "Safety & Control Systems",
    detail: "Fire detection/CO₂, ECR operation, alarm and monitoring systems",
    description:
      "The engine room automation system monitors all equipment with alarms and safety interlocks. Remote monitoring (AMS), emergency stop stations and gas extinguishing systems must work in coordination.",
    manual: [
      "Use the alarm panel inhibit/override modes only where the procedure requires it; log any changes made.",
      "Verify the CO₂/FM200 system isolation valves, pull pins and siren tests periodically.",
      "Practise the changeover from the ECR to local control mode together with the crew.",
      "Review the trend records (pressure, temperature, vibration) weekly and update the early warning limits.",
    ],
  },
  {
    name: "Deck Machines",
    detail: "Windlass, mooring winch, crane, capstan and Ro-Ro ramps",
    description:
      "Safe operation of load lifting and lashing equipment is critical in deck operations. Hydraulic systems, brake band settings and emergency stop stations require regular checks.",
    manual: [
      "Check the limit switches, oil levels and safety pins before the operation; barrier off the working area.",
      "Verify the mooring winch brake tests and the SWL labels periodically, and grease the wire ropes.",
      "Share the communication procedure and hand signals with the team during crane and ramp operations.",
      "Complete the hydraulic system pressure/leak checks; point out the emergency stop and manual override positions.",
    ],
  },
];

export default function MachineCalculationsPage() {
  const [showMachines, setShowMachines] = useState(false);

  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Engine"
        title="Machine Calculations"
      >
        <Card className="border-border/70 bg-gradient-to-br from-blue-50 via-white to-slate-50 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-lg text-[#2F5BFF]">
                <Wrench className="h-5 w-5" />
                Machinery on Board
              </CardTitle>
              <Button variant="outline" onClick={() => setShowMachines((prev) => !prev)}>
                {showMachines ? "Hide List" : "Show All Machines"}
              </Button>
            </div>
          </CardHeader>
          {showMachines && (
            <CardContent className="pt-0">
              <div className="grid gap-3 md:grid-cols-2">
                {onboardMachines.map((machine) => (
                  <div
                    key={machine.name}
                    className="rounded-xl border border-border bg-card/80 dark:bg-card/60 px-4 py-3 shadow-[0_8px_24px_rgba(47,91,255,0.08)] space-y-3"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900">{machine.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{machine.detail}</p>
                      <p className="text-sm text-slate-700 leading-relaxed dark:text-slate-200">{machine.description}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 px-3 py-2 text-slate-700 dark:bg-slate-900/40">
                      <p className="text-micro font-semibold uppercase tracking-wide text-[#2F5BFF]">
                        User manual
                      </p>
                      <ul className="mt-2 space-y-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                        {machine.manual.map((step) => (
                          <li key={step} className="flex gap-2">
                            <span className="mt-0.5 text-[#2F5BFF]">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl text-[#2F5BFF]">
              <Wrench className="h-6 w-6" />
              Machine Calculation Module
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EngineCalculations />
          </CardContent>
        </Card>
      </CalculationGridScreen>
    </MobileLayout>
  );
}
