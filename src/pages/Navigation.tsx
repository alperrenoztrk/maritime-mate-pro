import { BookOpenCheck, Bot, Compass, ListChecks, Signal, Sigma, TriangleAlert, Waves } from "lucide-react";
import { ToolPage } from "@/components/tools/ToolKit";
import { ToolLinkGroup } from "@/components/tools/ToolLinkGroup";
import { NAVIGATION_TOOL_GROUPS } from "@/components/navigationCalc/navigationTools";

const REFERENCE = [
  { title: "Navigation Formulas", icon: Sigma, to: "/navigation/formulas" },
  { title: "Tidal Calculation Step by Step", icon: Waves, to: "/navigation/tide-tutorial" },
  { title: "IALA Buoyage", icon: TriangleAlert, to: "/navigation/buoyage" },
  { title: "Sound Signals", icon: Signal, to: "/navigation/sound-signals" },
];

const PRACTICE = [
  { title: "Navigation Assistant", icon: Bot, to: "/navigation/assistant" },
  { title: "Navigation Quiz", icon: ListChecks, to: "/navigation/quiz" },
];

export default function Navigation() {
  return (
    <ToolPage title="Navigation Calculations" icon={Compass}>
      {NAVIGATION_TOOL_GROUPS.map((group) => (
        <ToolLinkGroup
          key={group.title}
          title={group.title}
          links={group.tools.map((t) => ({ title: t.title, icon: t.icon, to: `/navigation/calc/${t.id}` }))}
          accent="accent-ocean"
        />
      ))}
      <ToolLinkGroup title="Reference" links={REFERENCE} accent="accent-teal" />
      <ToolLinkGroup title="Assistant and practice" links={PRACTICE} accent="accent-slate" />
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <BookOpenCheck className="h-3.5 w-3.5" aria-hidden />
        Training and cross-checking aid: the ship's charts, publications and approved equipment take precedence.
      </p>
    </ToolPage>
  );
}
