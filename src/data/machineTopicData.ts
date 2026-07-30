import {
  Flame,
  Droplets,
  Cog,
  Fuel,
  Settings,
  Wrench,
  Thermometer,
  Snowflake,
  Zap,
  Cpu,
  ClipboardCheck,
  HardHat,
  ShieldAlert,
  Leaf,
  Users,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface MachineTopicConfig {
  slug: string;
  title: string;
  icon: LucideIcon;
  accent: string;
}

export const machineTopics: MachineTopicConfig[] = [
  { slug: "thermodynamics", title: "Termodinamik ve Isı Tekniği", icon: Flame, accent: "from-red-500 via-orange-500 to-amber-500" },
  { slug: "fluid-mechanics", title: "Akışkanlar Mekaniği", icon: Droplets, accent: "from-cyan-500 via-blue-500 to-indigo-500" },
  { slug: "machine-elements", title: "Makine Elemanları ve Malzeme Bilgisi", icon: Cog, accent: "from-zinc-500 via-slate-500 to-gray-600" },
  { slug: "diesel-engines", title: "Deniz Dizel Makineleri", icon: Settings, accent: "from-slate-600 via-zinc-700 to-slate-800" },
  { slug: "ship-systems", title: "Gemi Makine Sistemleri", icon: Wrench, accent: "from-blue-600 via-indigo-600 to-violet-600" },
  { slug: "auxiliary", title: "Yardımcı Makineler", icon: Fuel, accent: "from-amber-500 via-orange-500 to-red-500" },
  { slug: "fuel-technology", title: "Yakıt Teknolojisi ve Yönetimi", icon: Thermometer, accent: "from-orange-600 via-red-600 to-rose-600" },
  { slug: "cooling-hvac", title: "Soğutma ve Klima Sistemleri", icon: Snowflake, accent: "from-sky-500 via-cyan-500 to-teal-500" },
  { slug: "electrical", title: "Gemi Elektrik Sistemleri", icon: Zap, accent: "from-yellow-500 via-amber-500 to-orange-500" },
  { slug: "automation", title: "Elektronik, Ölçme ve Otomasyon", icon: Cpu, accent: "from-violet-500 via-purple-500 to-fuchsia-500" },
  { slug: "engine-room-ops", title: "Makine Dairesi Operasyonları", icon: ClipboardCheck, accent: "from-emerald-500 via-teal-500 to-cyan-500" },
  { slug: "maintenance", title: "Bakım, Arıza Teşhisi ve Güvenilirlik", icon: HardHat, accent: "from-stone-500 via-amber-600 to-yellow-600" },
  { slug: "engine-room-safety", title: "Makine Dairesi Güvenliği", icon: ShieldAlert, accent: "from-rose-500 via-red-500 to-orange-500" },
  { slug: "environment-machine", title: "Makine Dairesinde MARPOL ve Çevre Uyum", icon: Leaf, accent: "from-green-500 via-emerald-500 to-teal-500" },
  { slug: "erm", title: "Makine Dairesi Kaynak Yönetimi — ERM", icon: Users, accent: "from-indigo-500 via-blue-500 to-cyan-500" },
  { slug: "energy-efficiency", title: "Enerji Verimliliği", icon: TrendingUp, accent: "from-lime-500 via-green-500 to-emerald-500" },
];

export const machineTopicBySlug = Object.fromEntries(
  machineTopics.map((topic) => [topic.slug, topic]),
) as Record<string, MachineTopicConfig>;
