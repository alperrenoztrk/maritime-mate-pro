import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Anchor,
  Battery,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Cog,
  Droplets,
  Factory,
  Flame,
  Gauge,
  Info,
  ShieldCheck,
  Snowflake,
  Zap,
  Ship,
  Fuel,
  Wind,
  CircleDot,
  type LucideIcon,
} from "lucide-react";
import engineRoomImg from "@/assets/maritime/engine-room.jpg";

/* ───── types ───── */
interface MachineSystem {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  specs: string[];
}

interface EngineType {
  title: string;
  icon: LucideIcon;
  color: string;
  powerRange: string;
  efficiency: string;
  fuel: string;
  usage: string;
  summary: string;
  advantages: string[];
  disadvantages: string[];
}

/* ───── data ───── */
const machinerySystems: MachineSystem[] = [
  {
    name: "Ana Makine",
    description: "Ana dizel motor, türbin ve tahrik kombinasyonları",
    icon: Cog,
    color: "from-amber-500 to-orange-600",
    specs: ["2-Zamanlı / 4-Zamanlı", "50–80.000 kW", "80–120 RPM"],
  },
  {
    name: "Yardımcı Makineler",
    description: "Jeneratörler, kompresörler ve pompa grupları",
    icon: Factory,
    color: "from-blue-500 to-indigo-600",
    specs: ["Dizel Jeneratör", "500–3000 kW", "720/900 RPM"],
  },
  {
    name: "Elektrik Sistemleri",
    description: "Switchboard, UPS, trafolar ve güç dağıtımı",
    icon: Battery,
    color: "from-yellow-500 to-amber-600",
    specs: ["440V / 6.6kV", "60 Hz", "3-Fazlı AC"],
  },
  {
    name: "Yakıt & Yağ",
    description: "Separatörler, tanklar, transfer ve besleme hatları",
    icon: Droplets,
    color: "from-orange-500 to-red-600",
    specs: ["HFO / MGO / VLSFO", "Purifier", "Viscotherm"],
  },
  {
    name: "Pompalar",
    description: "Sintine, balast, yangın ve soğutma suyu pompaları",
    icon: Gauge,
    color: "from-cyan-500 to-blue-600",
    specs: ["Santrifüj / Pistonlu", "0.5–200 m³/h", "Otomatik Start"],
  },
  {
    name: "Soğutma & HVAC",
    description: "Merkezi soğutma, klima ve reefer devreleri",
    icon: Snowflake,
    color: "from-sky-400 to-cyan-600",
    specs: ["Tatlı Su / Deniz Suyu", "Isı Değiştirici", "R-134a / R-407C"],
  },
  {
    name: "Kazanlar",
    description: "Yardımcı kazan, EGB ve buhar devreleri",
    icon: Flame,
    color: "from-red-500 to-rose-600",
    specs: ["7–10 bar", "Composite Boiler", "Economizer"],
  },
  {
    name: "Emniyet Sistemleri",
    description: "Yangın algılama, CO₂, alarm ve izleme sistemleri",
    icon: ShieldCheck,
    color: "from-emerald-500 to-green-600",
    specs: ["SOLAS Ch. II-2", "CO₂ / FM-200", "SCBA"],
  },
  {
    name: "Güverte Makineleri",
    description: "Irgat, vinç, capstan ve mooring winch",
    icon: Anchor,
    color: "from-slate-500 to-zinc-600",
    specs: ["Hidrolik / Elektrik", "SWL Sertifikalı", "Fren Sistemi"],
  },
];

const engineTypes: EngineType[] = [
  {
    title: "Dizel Ana Makine",
    icon: Cog,
    color: "from-slate-600 to-zinc-700",
    powerRange: "0.5 – 80+ MW",
    efficiency: "%48–52 (termal)",
    fuel: "HFO / VLSFO / MGO",
    usage: "Konteyner, tanker, dökme yük",
    summary: "Yüksek verimli pistonlu motorlar. İki zamanlı büyük yavaş devirli motorlar ana tahrikte; dört zamanlı orta/yüksek devirli motorlar jeneratörlerde kullanılır.",
    advantages: ["Yüksek termal verim ve düşük SFOC", "Ağır yakıtlarla çalışabilme", "Uzun çalışma ömrü ve sağlamlık"],
    disadvantages: ["NOx/SOx emisyonları (SCR, scrubber gerektirir)", "Periyodik overhaul için uzun duruş süreleri", "Yüksek ağırlık ve hacim"],
  },
  {
    title: "Dual-Fuel (DF) Motor",
    icon: Fuel,
    color: "from-green-600 to-emerald-700",
    powerRange: "2 – 80 MW",
    efficiency: "%46–50",
    fuel: "LNG + Pilot Dizel",
    usage: "LNG taşıyıcı, yeni nesil konteyner",
    summary: "Gaz modunda pilot dizel püskürtmesiyle tutuşan motorlar. SOx/PM emisyonlarını neredeyse sıfıra indirir, NOx Tier III uyumunu kolaylaştırır.",
    advantages: ["SOx/PM emisyonu neredeyse sıfır", "NOx Tier III uyumu kolay", "Yakıt esnekliği (LNG + Dizel)"],
    disadvantages: ["Kriyojenik depolama ve FGSS karmaşıklığı", "Metan kayması (methane slip) riski", "Yüksek ilk yatırım maliyeti"],
  },
  {
    title: "Gaz Türbini",
    icon: Wind,
    color: "from-sky-600 to-blue-700",
    powerRange: "5 – 40 MW",
    efficiency: "%30–38",
    fuel: "MGO / Doğal Gaz",
    usage: "Savaş gemisi, hızlı feribot",
    summary: "Brayton çevrimiyle çalışan kompakt makineler. Yüksek güç/ağırlık oranı ve düşük titreşimle kısa sürede tam güce ulaşır.",
    advantages: ["Çok yüksek güç/ağırlık oranı", "Düşük titreşim ve sessiz çalışma", "Hızlı devreye alma"],
    disadvantages: ["Kısmi yükte düşük verim", "Yüksek kaliteli yakıt ihtiyacı", "Pahalı sıcak parça bakımı"],
  },
  {
    title: "Buhar Türbini",
    icon: Flame,
    color: "from-orange-600 to-red-700",
    powerRange: "10 – 50 MW",
    efficiency: "%28–35",
    fuel: "HFO / Boil-off Gaz",
    usage: "LNG taşıyıcı, buz kıran",
    summary: "Kazanda üretilen yüksek basınçlı buhar türbin kademelerinden geçerek mekanik enerji üretir. Pürüzsüz tork ve düşük titreşim sağlar.",
    advantages: ["Pürüzsüz tork üretimi", "Boil-off gaz değerlendirebilme", "Sürekli yüksek güçte çalışma"],
    disadvantages: ["Modern dizellere göre düşük verim", "Kazan/kondanser bakım karmaşıklığı", "Yüksek kütle ve hacim"],
  },
  {
    title: "Dizel-Elektrik / Hibrit",
    icon: Zap,
    color: "from-violet-600 to-purple-700",
    powerRange: "1 – 30 MW",
    efficiency: "%40–48",
    fuel: "MGO / Batarya",
    usage: "DP gemisi, kruvaziyer, römorkör",
    summary: "Dizel motorlar jeneratörleri döndürür; elektrik güç dağıtım sistemi tahrik motorlarını besler. Batarya desteğiyle emisyon azaltımı sağlar.",
    advantages: ["Kısmi yükte iyi verim", "Layout esnekliği ve düşük gürültü", "Batarya ile hızlı güç yanıtı"],
    disadvantages: ["Güç elektroniği soğutma gereksinimi", "Yüksek yatırım ve entegrasyon karmaşıklığı", "Harmonik kontrol ihtiyacı"],
  },
  {
    title: "Azipod / Pod Tahrik",
    icon: CircleDot,
    color: "from-indigo-600 to-blue-700",
    powerRange: "5 – 25 MW",
    efficiency: "%45–50",
    fuel: "Elektrik (jeneratörden)",
    usage: "Kruvaziyer, buz kıran, DP",
    summary: "Elektrik motoru ve pervane aynı döner gondol içinde. 360° dönebilme ile dümen ihtiyacını ortadan kaldırır ve üstün manevra yeteneği sağlar.",
    advantages: ["360° manevra kabiliyeti", "Kısalan şaft hattı ve verim artışı", "Düşük gürültü ve titreşim"],
    disadvantages: ["Yüksek yatırım maliyeti", "Sızdırmazlık ve bakım hassasiyeti", "Güçlü elektrik altyapısı gerektirir"],
  },
];

/* ───── sub‑components ───── */
function SystemCard({ system }: { system: MachineSystem }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-3 rounded-xl border border-border/50 bg-card/80 p-4 shadow-sm backdrop-blur transition-colors hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${system.color} text-white shadow-md`}>
          <system.icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-sm font-bold text-foreground">{system.name}</h3>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {system.specs.map((spec) => (
          <span key={spec} className="rounded-md bg-muted/60 px-2 py-0.5 text-micro font-medium text-muted-foreground">
            {spec}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function EngineTypeCard({ engine, isOpen, onToggle }: { engine: EngineType; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/80 shadow-sm backdrop-blur transition-colors hover:border-primary/30">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${engine.color} text-white shadow-md`}>
          <engine.icon className="h-5 w-5" />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-foreground">{engine.title}</h3>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-micro text-muted-foreground">
            <span className="flex items-center gap-1"><Zap className="h-3 w-3" aria-hidden /> {engine.powerRange}</span>
            <span className="flex items-center gap-1"><Gauge className="h-3 w-3" aria-hidden /> {engine.efficiency}</span>
            <span className="flex items-center gap-1"><Fuel className="h-3 w-3" aria-hidden /> {engine.fuel}</span>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/40 px-4 pb-4 pt-3 space-y-3">
              <p className="text-xs leading-relaxed text-foreground/90">{engine.summary}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-3">
                  <h4 className="mb-1.5 text-micro font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Avantajlar</h4>
                  <ul className="space-y-1">
                    {engine.advantages.map((a) => (
                      <li key={a} className="flex items-start gap-1.5 text-micro text-foreground/80">
                        <span className="mt-0.5 text-emerald-500">✓</span>{a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-red-500/10 p-3">
                  <h4 className="mb-1.5 text-micro font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Dezavantajlar</h4>
                  <ul className="space-y-1">
                    {engine.disadvantages.map((d) => (
                      <li key={d} className="flex items-start gap-1.5 text-micro text-foreground/80">
                        <span className="mt-0.5 text-red-500">✗</span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-lg bg-muted/40 px-3 py-2">
                <Ship className="h-3.5 w-3.5 text-primary" />
                <span className="text-micro text-muted-foreground">
                  <strong className="text-foreground">Kullanım:</strong> {engine.usage}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───── comparison table ───── */
function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/50 bg-card/80 shadow-sm backdrop-blur">
      <table className="w-full text-micro">
        <thead>
          <tr className="border-b border-border/50 bg-muted/30">
            <th className="px-3 py-2.5 text-left font-bold text-foreground">Makine Tipi</th>
            <th className="px-3 py-2.5 text-center font-bold text-foreground">Güç (MW)</th>
            <th className="px-3 py-2.5 text-center font-bold text-foreground">Verim</th>
            <th className="hidden px-3 py-2.5 text-center font-bold text-foreground sm:table-cell">Bakım</th>
            <th className="hidden px-3 py-2.5 text-left font-bold text-foreground md:table-cell">Öne Çıkan Kullanım</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Dizel", power: "0.5–80+", eff: "Yüksek", effColor: "text-emerald-500", maint: "Düzenli overhaul", use: "Büyük ticari gemiler" },
            { name: "Gaz Türbini", power: "5–40", eff: "Kısmi ↓", effColor: "text-amber-500", maint: "Yüksek maliyet", use: "Savaş gemisi, feribot" },
            { name: "Buhar Türbini", power: "10–50", eff: "Orta", effColor: "text-amber-500", maint: "Kazan bakımı", use: "LNG taşıyıcı, buz kıran" },
            { name: "Nükleer", power: "50–200+", eff: "Yüksek", effColor: "text-emerald-500", maint: "Özel lisans", use: "Uçak gemisi, denizaltı" },
            { name: "Dizel-Elektrik", power: "1–30", eff: "İyi", effColor: "text-emerald-500", maint: "Batarya bakımı", use: "DP, kruvaziyer" },
            { name: "Dual-Fuel", power: "2–80", eff: "Yüksek", effColor: "text-emerald-500", maint: "FGSS bakımı", use: "LNG, konteyner" },
            { name: "Yakıt Hücresi", power: "0.1–5", eff: "Çok yüksek", effColor: "text-emerald-500", maint: "Stack değişimi", use: "Pilot feribot" },
          ].map((row) => (
            <tr key={row.name} className="border-b border-border/30 transition-colors hover:bg-muted/20">
              <td className="px-3 py-2 font-semibold text-foreground">{row.name}</td>
              <td className="px-3 py-2 text-center text-muted-foreground">{row.power}</td>
              <td className={`px-3 py-2 text-center font-semibold ${row.effColor}`}>{row.eff}</td>
              <td className="hidden px-3 py-2 text-center text-muted-foreground sm:table-cell">{row.maint}</td>
              <td className="hidden px-3 py-2 text-muted-foreground md:table-cell">{row.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───── main page ───── */
export default function MachineryHubPage() {
  const [openEngine, setOpenEngine] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,5%)] dark:via-[hsl(220,50%,7%)] dark:to-[hsl(220,50%,9%)]">
      {/* ── Hero ── */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={engineRoomImg}
          alt="Gemi makine dairesi"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-micro font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              <Cog className="h-3 w-3" /> Makine Bölümü
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
              Gemi Makineleri
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 pt-4">
        {/* ── System Cards Grid ── */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
            <Cog className="h-4 w-4 text-primary" />
            Makine Dairesi Sistemleri
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {machinerySystems.map((system, i) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <SystemCard system={system} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Engine Types ── */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
            <BookOpen className="h-4 w-4 text-primary" />
            Tahrik Sistemi Tipleri
          </h2>
          <div className="space-y-2">
            {engineTypes.map((engine, idx) => (
              <EngineTypeCard
                key={engine.title}
                engine={engine}
                isOpen={openEngine === idx}
                onToggle={() => setOpenEngine(openEngine === idx ? null : idx)}
              />
            ))}
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
            <Info className="h-4 w-4 text-primary" />
            Karşılaştırma Tablosu
          </h2>
          <ComparisonTable />
        </section>

        {/* ── Quick Links ── */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Makine Hesaplamaları", to: "/engine", icon: Gauge, desc: "Motor gücü, yakıt tüketimi ve performans" },
            { label: "Makine Dersleri", to: "/lessons", icon: BookOpen, desc: "16 konu başlığında makine müfredatı" },
            { label: "Makine Dairesi İşleri", to: "/ship-tasks", icon: Factory, desc: "Günlük operasyon prosedürleri" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <link.icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <span className="text-sm font-bold text-foreground">{link.label}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </section>

        {/* ── SVG Diagrams ── */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
            <Ship className="h-4 w-4 text-primary" />
            Teknik Diyagramlar
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-sm">
              <div className="border-b border-border/40 px-4 py-2">
                <h3 className="text-xs font-bold text-foreground">2 Zamanlı Dizel Motor Çevrimi</h3>
              </div>
              <div className="p-2">
                <img src="/diagrams/machine/iki-zamanli-dizel.svg" alt="Two-stroke diesel engine cycle" className="w-full rounded-lg" />
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-sm">
              <div className="border-b border-border/40 px-4 py-2">
                <h3 className="text-xs font-bold text-foreground">Yakıt Sistemi Akış Şeması (HFO)</h3>
              </div>
              <div className="p-2">
                <img src="/diagrams/machine/yakit-sistemi.svg" alt="Fuel system flow diagram" className="w-full rounded-lg" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
