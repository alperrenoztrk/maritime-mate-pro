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
    name: "Ana Makine (Sevk Sistemi)",
    detail: "Main diesel engine, steam/gas turbine or diesel-electric propulsion",
    description:
      "Geminin ana tahrik sistemini oluşturur; pervane, şaft hattı ve kumanda zinciriyle entegre çalışır. Yakıt kalitesi, yağlama basıncı ve ana yatak sıcaklıkları performans için kritik parametrelerdir.",
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
      "Gemi elektriğini sağlayan yardımcı dizel jeneratörler ve acil jeneratör, kritik sistemlerin kesintisiz beslenmesi için yedekli çalışır. Yük paylaşımı ve otomatik devre alma kabiliyetleri önemlidir.",
    manual: [
      "Complete the oil, cooling water, fuel and air/fog tests before starting.",
      "Keep harmonic/reactive loads balanced by monitoring generator load sharing.",
      "Carry out the emergency generator auto-start and fuel level tests weekly.",
      "Record the AVR, governor and insulation resistance tests during planned maintenance.",
    ],
  },
  {
    name: "Elektrik & Güç Sistemleri",
    detail: "Main/emergency switchboard, UPS, transformers and battery banks",
    description:
      "Ana ve acil switchboard üzerinden güç dağıtımı yapılır; kritik devreler UPS ve bataryalarla korunur. Toprak kaçağı, kısa devre ve frekans/voltaj sapmaları anlık izlenmelidir.",
    manual: [
      "Apply the busbar synchronisation and breaker opening/closing sequences according to the procedure.",
      "Monitor harmonic distortion and voltage balance during load transfer; check overheating busbars with a thermal camera.",
      "Carry out UPS battery tests periodically, ventilate the room and check the gas detectors.",
      "Run black-out scenarios in emergency drills and record the times taken.",
    ],
  },
  {
    name: "Yakıt & Yağ Sistemleri",
    detail: "Fuel/lube oil separators, day tanks, transfer and supply pumps",
    description:
      "Ana makine ve jeneratörlere temiz, uygun viskozitede yakıt/yağ sağlar. Separatörler su ve partikülü ayırır; günlük tank seviyeleri geminin trim/stabilitesini de etkileyebilir.",
    manual: [
      "Set the pre-separator heater according to the grade of fuel; make sure the bowl speed is at its nominal value.",
      "Apply an automatic shut-off and a lookout against the risk of overflow when transferring between day tanks.",
      "Record fouling trends by monitoring the LO/FO filtration differential pressures.",
      "Carry out sludge and drain discharges in accordance with the MARPOL procedure and enter them in the Oil Record Book.",
    ],
  },
  {
    name: "Pompalar",
    detail: "Bilge, ballast, fire, cooling water and fresh/sea water pumps",
    description:
      "Gemideki tüm akışkan transferlerinin bel kemiğidir; yangın, balast ve soğutma pompaları farklı görevlerde çalışır. Kavitasyon, titreşim ve sızıntı erken arıza göstergeleridir.",
    manual: [
      "Check the suction/discharge valves and any venting needs before starting each pump.",
      "Follow the tank sequence on the ballast pumps according to the stability plan; test the fire pumps weekly.",
      "Clean the strainers/filters on the cooling water pumps regularly and log the pressure and temperature differences.",
      "Verify the bilge pumps together with the MARPOL requirements and the 15 ppm OWS interlocks.",
    ],
  },
  {
    name: "Soğutma & HVAC",
    detail: "Central cooling circuit, HVAC, cold stores and reefer systems",
    description:
      "Ana/yardımcı makine jacket water ve merkezi soğutma devreleri, güverte ve yaşam mahallini iklimlendiren HVAC ile entegre çalışır. Reefer konteyner beslemeleri sıcaklık hassasiyetlidir.",
    manual: [
      "Monitor the central cooling plate heat exchangers by differential pressure and clean them when necessary.",
      "Check the HVAC filters and damper settings monthly; adjust the fresh air ratio according to the CO₂ sensors.",
      "Verify the reefer socket load tests and the alarm monitoring panel regularly.",
      "Inspect the condenser/evaporator surfaces for fouling and record the gas leak tests.",
    ],
  },
  {
    name: "Kazanlar (Boiler)",
    detail: "Auxiliary boiler and EGB; heating, fuel viscosity and steam demand",
    description:
      "Yardımcı kazanlar ve egzoz gaz kazanı, yakıt ısıtma, tank ısıtma ve yaşam mahalli buhar ihtiyacını sağlar. Yanma ayarı, su seviyesi kontrolü ve blow-down kritik güvenlik noktalarıdır.",
    manual: [
      "Verify the steam/air pressure and viscosity required for fuel atomisation before starting up.",
      "Test the low water level and high steam pressure alarms periodically; observe the feed water pumps.",
      "Plan and record soot-blowing on the EGB according to the exhaust temperature difference.",
      "Monitor the TDS/pH values with a daily blow-down; adjust the chemical dosage according to the test results.",
    ],
  },
  {
    name: "Emniyet & Kontrol Sistemleri",
    detail: "Fire detection/CO₂, ECR operation, alarm and monitoring systems",
    description:
      "Makine dairesi otomasyon sistemi, alarm ve emniyet kilitlemeleriyle tüm ekipmanı izler. Uzaktan izleme (AMS), acil durdurma istasyonları ve gaz söndürme sistemleri koordineli çalışmalıdır.",
    manual: [
      "Use the alarm panel inhibit/override modes only where the procedure requires it; log any changes made.",
      "Verify the CO₂/FM200 system isolation valves, pull pins and siren tests periodically.",
      "Practise the changeover from the ECR to local control mode together with the crew.",
      "Review the trend records (pressure, temperature, vibration) weekly and update the early warning limits.",
    ],
  },
  {
    name: "Güverte Makineleri",
    detail: "Windlass, mooring winch, crane, capstan and Ro-Ro ramps",
    description:
      "Güverte operasyonlarında yük kaldırma ve bağlama ekipmanlarının güvenli çalışması kritik önemdedir. Hidrolik sistemler, fren bandı ayarları ve acil durdurma istasyonları düzenli kontrol ister.",
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
        eyebrow="Makine"
        title="Machine Calculations"
      >
        <Card className="border-border/70 bg-gradient-to-br from-blue-50 via-white to-slate-50 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-lg text-[#2F5BFF]">
                <Wrench className="h-5 w-5" />
                Gemideki Makineler
              </CardTitle>
              <Button variant="outline" onClick={() => setShowMachines((prev) => !prev)}>
                {showMachines ? "Listeyi Gizle" : "Tüm Makineleri Göster"}
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
                        Kullanım kılavuzu
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
              Makine Hesaplama Modülü
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
