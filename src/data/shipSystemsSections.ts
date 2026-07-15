import { Anchor, Compass, Wrench, Gauge, Flame, Package, Leaf, Radio, type LucideIcon } from "lucide-react";

export interface ShipSystemsSection {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  to: string;
  color: string;
}

export const shipSystemsSections: ShipSystemsSection[] = [
  {
    id: "deck-machinery",
    title: "Güverte Makineleri",
    desc: "Vinç, ırgat, mooring winch, capstan ve güvertede kullanılan tüm mekanik ekipmanlar",
    icon: Anchor,
    to: "/ship-systems/deck-machinery",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "nav-systems",
    title: "Seyir Sistemleri ve Cihazları",
    desc: "Radar, ECDIS, AIS, GPS, gyro pusula, echo sounder ve köprüüstü cihazları",
    icon: Compass,
    to: "/ship-systems/nav-systems",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "main-engine",
    title: "Ana Makine / Tahrik Sistemi",
    desc: "Ana dizel motor, şaft hattı, pervane, dümen makinesi ve tahrik donanımları",
    icon: Wrench,
    to: "/ship-systems/main-engine",
    color: "from-orange-500/20 to-amber-500/10",
  },
  {
    id: "auxiliary",
    title: "Yardımcı Makineler",
    desc: "Jeneratör, kompresör, pompa, separatör, kazanlar ve tüm yardımcı sistemler",
    icon: Gauge,
    to: "/ship-systems/auxiliary",
    color: "from-purple-500/20 to-violet-500/10",
  },
  {
    id: "fire-safety",
    title: "Yangın ve Emniyet Sistemleri",
    desc: "CO₂, foam, sprinkler, fire pump, EEBD/SCBA, dedektörler ve seyyar söndürücüler",
    icon: Flame,
    to: "/ship-systems/fire-safety",
    color: "from-red-500/20 to-rose-500/10",
  },
  {
    id: "cargo-systems",
    title: "Yük Sistemleri ve Ekipmanları",
    desc: "Kargo pompaları, COW, hatch cover, lashing, reefer plug, ramp ve cargo gear",
    icon: Package,
    to: "/ship-systems/cargo-systems",
    color: "from-yellow-500/20 to-amber-500/10",
  },
  {
    id: "environmental-auxiliary",
    title: "Çevre ve Yardımcı Sistemler",
    desc: "BWMS, OWS, sewage, insinerator, HVAC, hidrofor, soğuk depo, sıkıştırılmış hava ve buhar",
    icon: Leaf,
    to: "/ship-systems/environmental-auxiliary",
    color: "from-green-500/20 to-emerald-500/10",
  },
  {
    id: "gmdss-lsa",
    title: "GMDSS ve Can Kurtarma Sistemleri",
    desc: "GMDSS, EPIRB, SART, BNWAS, VDR, lifeboat, davit, liferaft ve rescue boat",
    icon: Radio,
    to: "/ship-systems/gmdss-lsa",
    color: "from-sky-500/20 to-indigo-500/10",
  },
];
