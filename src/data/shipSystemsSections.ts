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
    color: "accent-ocean",
  },
  {
    id: "nav-systems",
    title: "Seyir Sistemleri ve Cihazları",
    desc: "Radar, ECDIS, AIS, GPS, gyro pusula, echo sounder ve köprüüstü cihazları",
    icon: Compass,
    to: "/ship-systems/nav-systems",
    color: "accent-teal",
  },
  {
    id: "main-engine",
    title: "Ana Makine / Tahrik Sistemi",
    desc: "Ana dizel motor, şaft hattı, pervane, dümen makinesi ve tahrik donanımları",
    icon: Wrench,
    to: "/ship-systems/main-engine",
    color: "accent-amber",
  },
  {
    id: "auxiliary",
    title: "Yardımcı Makineler",
    desc: "Jeneratör, acil/şaft jeneratörü, kazan, separatör, kompresör, pompa, merkezi soğutma, yakıt-yağ devreleri, balast/sintine, hidrolik ünite ve itici",
    icon: Gauge,
    to: "/ship-systems/auxiliary",
    color: "accent-slate",
  },
  {
    id: "fire-safety",
    title: "Yangın ve Emniyet Sistemleri",
    desc: "CO₂, foam, sprinkler, fire pump, EEBD/SCBA, dedektörler ve seyyar söndürücüler",
    icon: Flame,
    to: "/ship-systems/fire-safety",
    color: "accent-amber",
  },
  {
    id: "cargo-systems",
    title: "Yük Sistemleri ve Ekipmanları",
    desc: "Kargo pompaları, COW, hatch cover, lashing, reefer plug, ramp ve cargo gear",
    icon: Package,
    to: "/ship-systems/cargo-systems",
    color: "accent-deep",
  },
  {
    id: "environmental-auxiliary",
    title: "Çevre ve Yardımcı Sistemler",
    desc: "BWMS, OWS, sewage, insinerator, HVAC, hidrofor, soğuk depo, sıkıştırılmış hava ve buhar",
    icon: Leaf,
    to: "/ship-systems/environmental-auxiliary",
    color: "accent-teal",
  },
  {
    id: "gmdss-lsa",
    title: "GMDSS ve Can Kurtarma Sistemleri",
    desc: "GMDSS, EPIRB, SART, BNWAS, VDR, lifeboat, davit, liferaft ve rescue boat",
    icon: Radio,
    to: "/ship-systems/gmdss-lsa",
    color: "accent-ocean",
  },
];
