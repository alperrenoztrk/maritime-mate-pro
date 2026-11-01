import {
  Anchor,
  BookA,
  ClipboardCheck,
  ClipboardList,
  Compass,
  GraduationCap,
  RadioTower,
  ScrollText,
  Ship,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface LibraryResource {
  title: string;
  to: string;
  icon: LucideIcon;
  accent: string;
}

export interface LibrarySection {
  id: string;
  title: string;
  items: LibraryResource[];
}

/** Route for a lesson library category (deck lessons vs machine topics). */
export const categoryHref = (key: string) =>
  key.startsWith("machine-") ? `/machine/${key.slice("machine-".length)}/topics` : `/lessons/${key}/topics`;

export const STATIC_SECTIONS: LibrarySection[] = [
  {
    id: "practice",
    title: "Practice",
    items: [
      { title: "Exam Preparation", to: "/exam-preparation", icon: GraduationCap, accent: "accent-deep" },
    ],
  },
  {
    id: "inspections",
    title: "Inspections",
    items: [{ title: "Inspection Checklists", to: "/beta/psc-checklist", icon: ClipboardList, accent: "accent-amber" }],
  },
  {
    id: "skills",
    title: "Seamanship Skills",
    items: [{ title: "Knot Tutorials", to: "/seamanship/knots", icon: Anchor, accent: "accent-ocean" }],
  },
  {
    id: "reference",
    title: "Quick Reference",
    items: [
      { title: "Maritime Glossary", to: "/glossary", icon: BookA, accent: "accent-ocean" },
      { title: "Regulations", to: "/regulations", icon: ScrollText, accent: "accent-deep" },
      { title: "Signal Flags", to: "/communication/flags", icon: RadioTower, accent: "accent-amber" },
      { title: "Passage Plan", to: "/passage-plan", icon: Compass, accent: "accent-ocean" },
    ],
  },
  {
    id: "ship",
    title: "Ship & Crew",
    items: [
      { title: "Crew and Duties", to: "/crew", icon: Users, accent: "accent-deep" },
      { title: "Bridge Devices", to: "/bridge", icon: Compass, accent: "accent-ocean" },
      { title: "Ship Systems", to: "/ship-systems", icon: Ship, accent: "accent-amber" },
      { title: "Shipboard Duties", to: "/ship-tasks", icon: ClipboardCheck, accent: "accent-teal" },
      { title: "Ship Operations", to: "/ship-operations", icon: Anchor, accent: "accent-ocean" },
    ],
  },
];

