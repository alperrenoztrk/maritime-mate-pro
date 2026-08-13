import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronDown, ChevronUp, Anchor, Navigation, Shield, AlertTriangle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface RuleSection {
  title: string;
  icon: React.ElementType;
  rules: string[];
  source: string;
}

const sections: RuleSection[] = [
  {
    title: "COLREG — International Regulations for Preventing Collisions at Sea",
    icon: Navigation,
    source: "IMO COLREGs 1972 (Consolidated Edition)",
    rules: [
      "Rule 5 — Look-out: every vessel must at all times maintain a proper look-out by sight and hearing.",
      "Rule 6 — Safe Speed: every vessel must proceed at a safe speed that allows proper and effective action to be taken to avoid collision.",
      "Rule 7 — Risk of Collision: all available means must be used to determine whether a risk of collision exists; if the compass bearing does not appreciably change, a risk of collision is deemed to exist.",
      "Rule 8 — Action to Avoid Collision: any alteration of course and/or speed must be made in ample time, in accordance with good seamanship and be readily apparent.",
      "Rule 9 — Narrow Channels: vessels must keep as near to the starboard side of a narrow channel or fairway as is safe and practicable.",
      "Rule 10 — Traffic Separation Schemes (TSS): vessels must proceed in the appropriate traffic lane in the general direction of traffic flow.",
      "Rule 12 — Sailing Vessels: the vessel with the wind on the port side must keep out of the way of the vessel with the wind on the starboard side.",
      "Kural 13 — Geçme (追い越し): Bir gemiyi geçen gemi, geçilen gemiye yol vermekle yükümlüdür. Kıç taraftan 22.5° dışındaki açıdan yaklaşan gemi geçiyor sayılır.",
      "Rule 14 — Head-on Situation: when two power-driven vessels are meeting on reciprocal or nearly reciprocal courses, each must alter course to starboard.",
      "Rule 15 — Crossing Situation: when two power-driven vessels are crossing, the vessel which has the other on her own starboard side must keep out of the way.",
      "Rule 16 — Action by the Give-way Vessel: the give-way vessel must keep well clear of the other vessel, taking early and substantial action.",
      "Rule 17 — Action by the Stand-on Vessel: the stand-on vessel must keep her course and speed, but must take avoiding action herself if the give-way vessel is not taking appropriate action.",
      "Rule 18 — Responsibilities between Vessels: a power-driven vessel must keep out of the way of sailing vessels, vessels engaged in fishing, vessels restricted in their ability to manoeuvre and vessels constrained by their draught.",
      "Kural 19 — Kısıtlı Görüşte Seyir: Emniyetli hıza düşülmeli; radar ile tespit edilen gemilerden sancağa dönülerek kaçılmalı, 090°'nin kıçtan gelen gemiyi iskele tarafına dönülerek kaçılmamalıdır.",
    ],
  },
  {
    title: "Navigation Lights and Shapes",
    icon: Eye,
    source: "COLREG Part C — Işıklar ve Şekiller",
    rules: [
      "Power-driven vessel: masthead light, sidelights and sternlight.",
      "Vessels of 50 m and over: two masthead lights (fore and main), the lower one forward and the higher one aft.",
      "Sailing vessel: sidelights and sternlight only. Optional: red over green all-round lights at the masthead.",
      "Vessel at anchor: an all-round white light forward; vessels over 50 m also show an additional white light aft.",
      "Towing operation: additional masthead lights in a vertical line; three when the length of the tow exceeds 200 m.",
      "Restricted in ability to manoeuvre (RAM): red-white-red lights in a vertical line (or ball-diamond-ball by day).",
      "Not under command (NUC): two red lights in a vertical line (or two black balls by day).",
      "Fishing vessel: trawling — green over white in a vertical line; other fishing — red over white in a vertical line.",
      "Pilot vessel: white over red lights in a vertical line.",
    ],
  },
  {
    title: "IALA Maritime Buoyage System",
    icon: Anchor,
    source: "IALA Maritime Buoyage System",
    rules: [
      "Lateral İşaretler (Bölge A): İskele tarafı — kırmızı silindir/teneke, sancak — yeşil koni.",
      "Lateral İşaretler (Bölge B): Renkler ters; iskele tarafı — yeşil, sancak — kırmızı.",
      "Cardinal marks: black and yellow colouring and topmarks according to the quadrant (N-E-S-W) in which the danger lies.",
      "North cardinal: black above yellow; two cones pointing up. Pass to the north of the danger.",
      "South cardinal: yellow above black; two cones pointing down. Pass to the south of the danger.",
      "East cardinal: black-yellow-black; two cones base to base. Pass to the east.",
      "West cardinal: yellow-black-yellow; two cones point to point. Pass to the west.",
      "Isolated danger mark: black with a red horizontal band; topmark of two black spheres.",
      "Safe water mark: red and white vertical stripes; topmark of a single red sphere. Mid-channel / landfall.",
      "Special marks: yellow with a yellow 'X' topmark. Military exercise areas, pipelines, cables etc.",
    ],
  },
  {
    title: "Distress and Safety Signals",
    icon: AlertTriangle,
    source: "SOLAS Chapter IV, GMDSS, COLREG Annex IV",
    rules: [
      "MAYDAY: life and vessel in danger — transmitted on VHF Ch 16, 2182 kHz or with the DSC distress button.",
      "PAN PAN: an urgency situation without immediate danger — broadcast on VHF Ch 16.",
      "SECURITÉ: a navigational safety or meteorological warning — addressed to all stations.",
      "Distress signals: red flare, orange smoke, SOS (· · · — — — · · ·), continuous sounding of a whistle, flags N over C.",
      "EPIRB: 406 MHz emergency position indicating radio beacon, minimum 48 hour battery life, float-free.",
      "SART: 9 GHz radar transponder; radarда 12 nokta halinde görünür, menzil ~5 NM.",
    ],
  },
  {
    title: "Passage Planning Rules",
    icon: BookOpen,
    source: "SOLAS V/34, IMO Resolution A.893(21)",
    rules: [
      "The passage plan must cover the entire route from berth to berth.",
      "Appraisal: charts, navigational warnings, tides, weather and draft restrictions are reviewed.",
      "Planning: waypoints, no-go areas, abort points and turning circles are marked.",
      "Execution: the plan is carried out with the master's approval and updated when circumstances change.",
      "Monitoring: the position is continuously checked and the ETA, fuel and weather updates are made.",
      "UKC (Under Keel Clearance): a minimum clearance of 10% of the draft or 0.6 m, whichever is greater, must be maintained. Port requirements may differ.",
      "Squat effect: the sinkage of the vessel in shallow water must be taken into account and the speed reduced if necessary.",
    ],
  },
  {
    title: "Compass and Position Fixing Rules",
    icon: Shield,
    source: "SOLAS V/19, IMO Resolution A.382(X)",
    rules: [
      "The magnetic compass deviation must be checked regularly and the deviation card kept up to date.",
      "The gyro compass error must be verified every watch and on entering/leaving port by celestial or terrestrial bearings.",
      "GPS fixes must be verified by independent means (radar, visual bearings).",
      "Charts (ECDIS or paper) must be kept up to date and the Notices to Mariners (NtM) corrections applied.",
      "AIS information must not be relied upon alone for navigational decisions.",
    ],
  },
];

export default function NavigationRulesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setExpanded(expanded === idx ? null : idx);
  };

  return (
    <MobileLayout>
      <div className="min-h-screen bg-background px-4 pb-24 pt-6">
        <div className="mx-auto max-w-lg space-y-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Seyir Kuralları</h1>
            </div>

          <div className="space-y-2.5">
            {sections.map((section, idx) => (
              <Card key={idx} className="border-border/30 bg-card/60 overflow-hidden">
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-accent/10"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <section.icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight text-foreground">{section.title}</p>
                    <p className="text-micro text-muted-foreground truncate">{section.source}</p>
                  </div>
                  {expanded === idx ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>

                {expanded === idx && (
                  <CardContent className="border-t border-border/20 pt-3 pb-4">
                    <ul className="space-y-2">
                      {section.rules.map((rule, ri) => (
                        <li key={ri} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
