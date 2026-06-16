import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Anchor, Compass, Wrench, Gauge, Flame, Package, Leaf, Radio, ArrowRight, Search, X } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { shipSystemsData } from "@/data/shipSystemsData";

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

const SECTION_META: Record<string, { title: string; icon: typeof Anchor; color: string }> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, { title: s.title, icon: s.icon, color: s.color }]),
);

interface TopicHit {
  sectionId: string;
  sectionTitle: string;
  topicIndex: number;
  topicTitle: string;
  icon: typeof Anchor;
  color: string;
}

const ALL_TOPICS: TopicHit[] = Object.entries(shipSystemsData).flatMap(([sectionId, section]) => {
  const meta = SECTION_META[sectionId];
  if (!meta) return [];
  return section.topics.map((t, idx) => ({
    sectionId,
    sectionTitle: meta.title,
    topicIndex: idx,
    topicTitle: t.title,
    icon: meta.icon,
    color: meta.color,
  }));
});

const normalize = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/[ğ]/g, "g")
    .replace(/[ü]/g, "u")
    .replace(/[ş]/g, "s")
    .replace(/[ö]/g, "o")
    .replace(/[ç]/g, "c");

export default function ShipSystemsPage() {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();

  const hits = useMemo(() => {
    if (!trimmed) return [] as TopicHit[];
    const q = normalize(trimmed);
    return ALL_TOPICS.filter(
      (h) => normalize(h.topicTitle).includes(q) || normalize(h.sectionTitle).includes(q),
    );
  }, [trimmed]);

  return (
    <MobileLayout>
      <div className="relative min-h-screen bg-background px-4 pb-24 pt-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-40 right-0 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-lg flex-col gap-5">
          <header className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Gemi Sistemleri ve Ekipmanları
            </h1>
          </header>

          {/* Arama kutusu */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Konu veya ekipman ara…"
              className="w-full rounded-xl border border-border/40 bg-card/60 py-2.5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground/70 backdrop-blur-sm outline-none transition focus:border-primary/40 focus:bg-card/80"
              aria-label="Gemi sistemleri içinde ara"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Aramayı temizle"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Arama sonuçları */}
          {trimmed ? (
            <div className="flex flex-col gap-2">
              <p className="px-1 text-[11px] text-muted-foreground">
                {hits.length} sonuç bulundu
              </p>
              {hits.length === 0 ? (
                <div className="rounded-xl border border-border/30 bg-card/40 p-6 text-center">
                  <p className="text-sm text-muted-foreground">Eşleşen konu bulunamadı.</p>
                </div>
              ) : (
                hits.map((hit) => (
                  <Link
                    key={`${hit.sectionId}-${hit.topicIndex}`}
                    to={`/ship-systems/${hit.sectionId}?topic=${hit.topicIndex}`}
                    className="group flex items-center gap-3 rounded-xl border border-border/30 bg-card/60 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 active:scale-[0.99]"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${hit.color}`}>
                      <hit.icon className="h-4 w-4 text-primary" strokeWidth={1.6} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{hit.topicTitle}</p>
                      <p className="truncate text-[11px] text-muted-foreground">{hit.sectionTitle}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))
              )}
            </div>
          ) : (
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
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
