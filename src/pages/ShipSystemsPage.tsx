import { Link } from "react-router-dom";
import { Anchor, Compass, Wrench, Gauge, ArrowRight } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { BottomNavigation } from "@/components/BottomNavigation";

const SECTIONS = [
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
];

export default function ShipSystemsPage() {
  return (
    <MobileLayout>
      <div className="relative min-h-screen bg-background px-4 pb-24 pt-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-40 right-0 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-lg flex-col gap-6">
          <header className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Gemi Sistemleri ve Ekipmanları
            </h1>
            <p className="text-xs text-muted-foreground">
              Güverte makineleri, seyir cihazları, ana makine ve yardımcı sistemler
            </p>
          </header>

          <div className="flex flex-col gap-3">
            {SECTIONS.map((section) => (
              <Link
                key={section.id}
                to={section.to}
                className="group flex items-center gap-4 rounded-2xl border border-border/30 bg-card/60 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-card/80 active:scale-[0.98]"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${section.color}`}>
                  <section.icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight">{section.title}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground line-clamp-2">{section.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </MobileLayout>
  );
}
