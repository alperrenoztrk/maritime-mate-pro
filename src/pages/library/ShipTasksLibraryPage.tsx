import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  ChevronDown,
  ChevronRight,
  Cog,
  FileText,
  Flame,
  Map,
  Package,
  Siren,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { LibraryPageShell } from "@/components/library/LibraryInterface";

interface TaskRow {
  task: string;
  responsible: string;
  worker?: string;
  slug?: string;
  href?: string;
}

interface CategorySection {
  icon: LucideIcon;
  title: string;
  tasks: TaskRow[];
  accent: string;
}

const bridgeNavigationTasks: TaskRow[] = [
  { task: "Passage plan", responsible: "Master + 2/O", worker: "2/O", href: "/passage-plan" },
  { task: "Vardiya tutma", responsible: "Master", worker: "2/O – 3/O", slug: "vardiya-tutma" },
  { task: "Radar / ARPA takibi", responsible: "Vardiya zabiti", worker: "Vardiya zabiti", slug: "radar-arpa-takibi" },
  { task: "COLREG uygulama", responsible: "Vardiya zabiti", worker: "Vardiya zabiti", slug: "colreg-uygulama" },
  { task: "Kaptanı çağırma kararı", responsible: "Vardiya zabiti", worker: "Vardiya zabiti", slug: "kaptani-cagirma-karari" },
  { task: "Logbook doldurma", responsible: "Vardiya zabiti", worker: "Vardiya zabiti", slug: "logbook-doldurma" },
  { task: "Pilot embark/disembark", responsible: "Master", worker: "2/O–3/O", slug: "pilot-embark-disembark" },
  { task: "Kısıtlı sularda seyir", responsible: "Master", worker: "Master + OOW", slug: "kisitli-sularda-seyir" },
  { task: "GMDSS acil çağrı", responsible: "Master", worker: "2/O", slug: "gmdss-acil-cagri" },
  { task: "Köprüüstü disiplin", responsible: "Master", worker: "Tüm zabitler", slug: "koprusustu-disiplin" },
];

const navigationTasks: TaskRow[] = [
  { task: "Harita düzeltmeleri", responsible: "2. Kaptan", slug: "harita-duzeltmeleri" },
  { task: "ECDIS güncellemeleri", responsible: "2. Kaptan", slug: "ecdis-guncellemeleri" },
  { task: "Notice to Mariners", responsible: "2. Kaptan", slug: "notice-to-mariners" },
  { task: "Navigational warnings", responsible: "2. Kaptan", slug: "navigational-warnings" },
  { task: "Gyro / manyetik pusula kontrolü", responsible: "2/O – 3/O", slug: "gyro-manyetik-pusula-kontrolu" },
  { task: "Draft & position plotting", responsible: "OOW", slug: "draft-position-plotting" },
  { task: "BNWAS / AIS kontrol", responsible: "OOW", slug: "bnwas-ais-kontrol" },
  { task: "Seyir cihazları bakımı", responsible: "2/O", slug: "seyir-cihazlari-bakimi" },
];

const cargoTasks: TaskRow[] = [
  { task: "Yük planı", responsible: "Chief Officer", worker: "C/O", slug: "yuk-plani" },
  { task: "Loading / Discharging", responsible: "Chief Officer", worker: "3/O", slug: "loading-discharging" },
  { task: "Draft survey", responsible: "C/O", worker: "3/O", slug: "draft-survey" },
  { task: "Tank sounding", responsible: "C/O", worker: "3/O", slug: "tank-sounding" },
  { task: "Cargo watch", responsible: "C/O", worker: "3/O", slug: "cargo-watch" },
  { task: "Mooring / unmooring", responsible: "Master", worker: "2/O–3/O", slug: "mooring-unmooring" },
  { task: "Hatch cover operasyonu", responsible: "C/O", worker: "Bosun", slug: "hatch-cover-operasyonu" },
  { task: "Cargo damage takibi", responsible: "C/O", worker: "3/O", slug: "cargo-damage-takibi" },
];

const safetyTasks: TaskRow[] = [
  { task: "Safety Officer", responsible: "3. Kaptan", slug: "safety-officer" },
  { task: "Yangın ekipmanları", responsible: "3/O", slug: "yangin-ekipmanlari" },
  { task: "Can kurtarma araçları", responsible: "3/O", slug: "can-kurtarma-araclari" },
  { task: "Weekly / Monthly checks", responsible: "3/O", slug: "weekly-monthly-checks" },
  { task: "Drill organizasyonu", responsible: "3/O", slug: "drill-organizasyonu" },
  { task: "Muster list", responsible: "Master", slug: "muster-list" },
  { task: "ISM kayıtları", responsible: "Master + C/O", slug: "ism-kayitlari" },
  { task: "ISPS (güvenlik)", responsible: "Master", slug: "isps-guvenlik" },
  { task: "Security watch", responsible: "3/O", slug: "security-watch" },
];

const maintenanceTasks: TaskRow[] = [
  { task: "Boya & pas", responsible: "C/O", worker: "Bosun + AB", slug: "boya-pas" },
  { task: "Güverte temizliği", responsible: "C/O", worker: "AB", slug: "guverte-temizligi" },
  { task: "Halat – tel bakımı", responsible: "C/O", worker: "Bosun", slug: "halat-tel-bakimi" },
  { task: "Vinç – capstan yağlama", responsible: "C/O", worker: "AB", slug: "vinc-capstan-yaglama" },
  { task: "Güverte aydınlatma", responsible: "C/O", worker: "AB", slug: "guverte-aydinlatma" },
  { task: "Fener & işaretler", responsible: "C/O", worker: "AB", slug: "fener-isaretler" },
];

const personnelTasks: TaskRow[] = [
  { task: "Günlük iş planı", responsible: "Chief Officer", slug: "gunluk-is-plani" },
  { task: "Güverte personeli", responsible: "C/O", slug: "guverte-personeli" },
  { task: "Disiplin", responsible: "Master", slug: "disiplin" },
  { task: "İş güvenliği", responsible: "3/O", slug: "is-guvenligi" },
  { task: "Yeni personel oryantasyonu", responsible: "3/O", slug: "yeni-personel-oryantasyonu" },
  { task: "Eğitim", responsible: "Master + C/O", slug: "egitim" },
];

const documentationTasks: TaskRow[] = [
  { task: "PSC hazırlık", responsible: "Master + C/O + 3/O", slug: "psc-hazirlik" },
  { task: "Logbooks", responsible: "OOW", slug: "logbooks-dokumantasyon" },
  { task: "Checklists", responsible: "İlgili zabit", slug: "checklists-dokumantasyon" },
  { task: "Certificates", responsible: "Master", slug: "certificates-dokumantasyon" },
  { task: "Company reporting", responsible: "Master", slug: "company-reporting" },
  { task: "Deficiency takibi", responsible: "C/O", slug: "deficiency-takibi" },
];

const emergencyTasks: TaskRow[] = [
  { task: "Yangın", responsible: "Master", slug: "yangin-acil" },
  { task: "Can kurtarma", responsible: "3/O", slug: "can-kurtarma-acil" },
  { task: "Adam denize", responsible: "Master", slug: "adam-denize" },
  { task: "Collision", responsible: "Master", slug: "collision-acil" },
  { task: "Grounding", responsible: "Master", slug: "grounding-acil" },
  { task: "Abandon ship", responsible: "Master", slug: "abandon-ship" },
  { task: "Medical emergency", responsible: "Master", slug: "medical-emergency" },
  { task: "Oil spill", responsible: "C/O", slug: "oil-spill-acil" },
];

const engineRoomTasks: TaskRow[] = [
  { task: "Ana makine operasyonu", responsible: "Chief Engineer", worker: "2/E – 3/E", slug: "ana-makine-operasyonu" },
  { task: "Yardımcı makine bakımı", responsible: "2nd Engineer", worker: "3/E – 4/E", slug: "yardimci-makine-bakimi" },
  { task: "Jeneratör operasyonu", responsible: "2nd Engineer", worker: "3/E – Oiler", slug: "jenerator-operasyonu" },
  { task: "Yakıt transferi", responsible: "Chief Engineer", worker: "3/E", slug: "yakit-transferi" },
  { task: "Yağlama sistemi", responsible: "2nd Engineer", worker: "4/E – Oiler", slug: "yaglama-sistemi" },
  { task: "Soğutma sistemi", responsible: "2nd Engineer", worker: "3/E", slug: "sogutma-sistemi" },
  { task: "Balast operasyonu", responsible: "Chief Engineer", worker: "3/E", slug: "balast-operasyonu" },
  { task: "Sintine pompası", responsible: "3rd Engineer", worker: "4/E – Oiler", slug: "sintine-pompasi" },
  { task: "Separator çalıştırma", responsible: "3rd Engineer", worker: "4/E", slug: "separator-calistirma" },
  { task: "Kazan operasyonu", responsible: "2nd Engineer", worker: "3/E", slug: "kazan-operasyonu" },
  { task: "Kompresör bakımı", responsible: "3rd Engineer", worker: "4/E", slug: "kompresor-bakimi" },
  { task: "Pompa bakımları", responsible: "2nd Engineer", worker: "3/E – 4/E", slug: "pompa-bakimlari" },
  { task: "Elektrik sistemleri", responsible: "Electrician", worker: "Electrician", slug: "elektrik-sistemleri" },
  { task: "Otomasyon sistemleri", responsible: "Chief Engineer", worker: "Electrician", slug: "otomasyon-sistemleri" },
  { task: "Spare parts yönetimi", responsible: "Chief Engineer", worker: "2/E", slug: "spare-parts-yonetimi" },
  { task: "Makine logbook", responsible: "Chief Engineer", worker: "Vardiya mühendisi", slug: "makine-logbook" },
  { task: "PMS kayıtları", responsible: "2nd Engineer", worker: "Tüm mühendisler", slug: "pms-kayitlari" },
  { task: "Bunkering operasyonu", responsible: "Chief Engineer", worker: "2/E – 3/E", slug: "bunkering-operasyonu" },
  { task: "LO/FO analizleri", responsible: "Chief Engineer", worker: "2/E", slug: "lo-fo-analizleri" },
  { task: "Makine dairesi temizliği", responsible: "Chief Engineer", worker: "Oiler – Wiper", slug: "makine-dairesi-temizligi" },
  { task: "Emergency generator", responsible: "2nd Engineer", worker: "3/E", slug: "emergency-generator" },
  { task: "Steering gear bakımı", responsible: "2nd Engineer", worker: "3/E", slug: "steering-gear-bakimi" },
  { task: "Makine dairesi güvenliği", responsible: "Chief Engineer", worker: "Tüm personel", slug: "makine-dairesi-guvenligi" },
];

const categories: CategorySection[] = [
  { icon: Anchor, title: "Seyir ve Köprüüstü İşleri", tasks: bridgeNavigationTasks, accent: "from-blue-500 to-indigo-700" },
  { icon: Map, title: "Navigasyon ve Harita İşleri", tasks: navigationTasks, accent: "from-cyan-500 to-blue-700" },
  { icon: Package, title: "Yük Operasyonları", tasks: cargoTasks, accent: "from-amber-500 to-orange-700" },
  { icon: Flame, title: "Emniyet ve ISM / ISPS", tasks: safetyTasks, accent: "from-rose-500 to-red-700" },
  { icon: Wrench, title: "Güverte Bakım ve Onarım", tasks: maintenanceTasks, accent: "from-slate-500 to-zinc-700" },
  { icon: Users, title: "Personel ve Disiplin", tasks: personnelTasks, accent: "from-violet-500 to-indigo-700" },
  { icon: FileText, title: "Dokümantasyon ve Denetim", tasks: documentationTasks, accent: "from-teal-500 to-cyan-700" },
  { icon: Siren, title: "Acil Durumlar", tasks: emergencyTasks, accent: "from-orange-500 to-rose-700" },
  { icon: Cog, title: "Makine Dairesi İşleri", tasks: engineRoomTasks, accent: "from-slate-600 to-slate-900" },
];

const taskHref = (task: TaskRow) => task.href ?? (task.slug ? `/ship-tasks/${task.slug}` : "#");

export default function ShipTasksLibraryPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <LibraryPageShell title="Gemide Yapılan İşler" icon={FileText}>
      <section className="space-y-3">
        {categories.map((category, categoryIndex) => {
          const expanded = expandedCategory === category.title;
          return (
            <article
              key={category.title}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm"
            >
              <button
                type="button"
                onClick={() => setExpandedCategory(expanded ? null : category.title)}
                className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-muted/40"
                aria-expanded={expanded}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white`}>
                  <category.icon className="h-5 w-5" />
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {categoryIndex + 1}
                </span>
                <span className="min-w-0 flex-1 font-semibold leading-snug text-foreground">{category.title}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-micro font-semibold text-muted-foreground">
                  {category.tasks.length}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>

              {expanded && (
                <div className="grid gap-2 border-t border-border/40 bg-background/35 p-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.tasks.map((task) => (
                    <Link
                      key={task.task}
                      to={taskHref(task)}
                      className="group flex min-h-16 items-center gap-3 rounded-xl border border-border/40 bg-card/70 px-3 py-2.5 transition hover:border-primary/40 hover:bg-card"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold leading-snug text-foreground">{task.task}</span>
                        <span className="mt-1 block text-micro text-muted-foreground">
                          {task.responsible}{task.worker ? ` · ${task.worker}` : ""}
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </LibraryPageShell>
  );
}
