import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface TaskRow {
  task: string;
  responsible: string;
  worker?: string;
  slug?: string;
  href?: string;
}

const TaskLink = ({ task, slug, href }: { task: string; slug?: string; href?: string }) => {
  const to = href || (slug ? `/ship-tasks/${slug}` : undefined);
  return to ? (
    <Link
      to={to}
      className="text-primary underline decoration-dotted underline-offset-2 transition-colors hover:text-primary/80"
    >
      {task}
    </Link>
  ) : (
    <>{task}</>
  );
};

const bridgeNavigationTasks: TaskRow[] = [
  { task: "Passage plan", responsible: "Master + 2/O", worker: "2/O", href: "/passage-plan" },
  { task: "Vardiya tutma", responsible: "Master", worker: "2/O – 3/O – 4/O", slug: "vardiya-tutma" },
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
  { task: "Cargo watch", responsible: "3/O – 4/O", worker: "3/O", slug: "cargo-watch" },
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
  { task: "Security watch", responsible: "3/O – 4/O", slug: "security-watch" },
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

/* ── Table renderers ── */

const ThreeColTable = ({ tasks, headers }: { tasks: TaskRow[]; headers: [string, string, string] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-border/50 text-left">
          <th className="py-2 pr-4 font-semibold text-foreground">{headers[0]}</th>
          <th className="py-2 pr-4 font-semibold text-primary">{headers[1]}</th>
          <th className="py-2 font-semibold text-muted-foreground">{headers[2]}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/30">
        {tasks.map(({ task, responsible, worker, slug }) => (
          <tr key={task}>
            <td className="py-1.5 pr-4 text-foreground">
              <TaskLink task={task} slug={slug} />
            </td>
            <td className="py-1.5 pr-4 text-primary">{responsible}</td>
            <td className="py-1.5 text-muted-foreground">{worker}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TwoColTable = ({ tasks, headers }: { tasks: TaskRow[]; headers: [string, string] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-border/50 text-left">
          <th className="py-2 pr-4 font-semibold text-foreground">{headers[0]}</th>
          <th className="py-2 font-semibold text-primary">{headers[1]}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/30">
        {tasks.map(({ task, responsible, slug }) => (
          <tr key={task}>
            <td className="py-1.5 pr-4 text-foreground">
              <TaskLink task={task} slug={slug} />
            </td>
            <td className="py-1.5 text-primary">{responsible}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface CategorySection {
  icon: string;
  number: string;
  title: string;
  description: string;
  tasks: TaskRow[];
  columns: 2 | 3;
  headers: [string, string] | [string, string, string];
}

const categories: CategorySection[] = [
  {
    icon: "⚓", number: "1️⃣", title: "SEYİR & KÖPRÜÜSTÜ İŞLERİ",
    description: "Saatlik çalışma için bu başlık seçildiğinde; rota planı, mevki belirleme yöntemleri ve OOW'un köprüüstü görev akışı adım adım anlatılır.",
    tasks: bridgeNavigationTasks, columns: 3, headers: ["İş", "Asıl Sorumlu", "Fiilen Yapan"],
  },
  {
    icon: "🗺️", number: "2️⃣", title: "NAVİGASYON & HARİTA İŞLERİ",
    description: "Saatlik içerikte ECDIS/kağıt harita düzeltme adımları, Notice to Mariners takibi ve gyrolar/manyetik pusula karşılaştırması açıklanır.",
    tasks: navigationTasks, columns: 2, headers: ["İş", "Sorumlu"],
  },
  {
    icon: "📦", number: "3️⃣", title: "YÜK OPERASYONLARI",
    description: "Saatlik içerikte yük planı okuma, operasyon sırasında draft/sounding kontrolü ve emniyet gözetimi anlatılır.",
    tasks: cargoTasks, columns: 3, headers: ["İş", "Asıl Sorumlu", "Sahadaki"],
  },
  {
    icon: "🧯", number: "4️⃣", title: "EMNİYET & ISM / ISPS",
    description: "Saatlik içerikte yangın ve güvenlik devriyesi güzergâhı, kritik ekipman kontrolleri ve ISPS erişim adımları açıklanır.",
    tasks: safetyTasks, columns: 2, headers: ["İş", "Sorumlu"],
  },
  {
    icon: "🔧", number: "5️⃣", title: "GÜVERTE BAKIM & ONARIM",
    description: "Saatlik içerikte güverte ekipman kontrolü, boya/pas takibi ve halat–tel bakım adımları anlatılır.",
    tasks: maintenanceTasks, columns: 3, headers: ["İş", "Sorumlu", "Yapan"],
  },
  {
    icon: "👥", number: "6️⃣", title: "PERSONEL & DİSİPLİN",
    description: "Saatlik içerikte vardiya görev dağılımı, PPE kullanım kontrolü ve yeni personel oryantasyonu anlatılır.",
    tasks: personnelTasks, columns: 2, headers: ["İş", "Sorumlu"],
  },
  {
    icon: "📑", number: "7️⃣", title: "DOKÜMANTASYON & DENETİM",
    description: "Saatlik içerikte logbook yazım düzeni, kontrol listesi kullanımı ve PSC hazırlık dosyası gözden geçirme adımları açıklanır.",
    tasks: documentationTasks, columns: 2, headers: ["İş", "Sorumlu"],
  },
  {
    icon: "🚨", number: "8️⃣", title: "ACİL DURUMLAR",
    description: "Saatlik içerikte alarm panelleri, kaçış yolları ve acil ekipman erişim noktaları anlatılır.",
    tasks: emergencyTasks, columns: 2, headers: ["Durum", "Lider"],
  },
  {
    icon: "⚙️", number: "9️⃣", title: "MAKİNE DAİRESİ İŞLERİ",
    description: "Saatlik içerikte ana/yardımcı makine parametre kontrolü, alarm kayıtları ve sintine seviyeleri anlatılır.",
    tasks: engineRoomTasks, columns: 3, headers: ["İş", "Asıl Sorumlu", "Fiilen Yapan"],
  },
];

export default function ShipTasksPage() {
  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      data-no-translate
      style={highRefreshRateStyles}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6">
        <header className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            Hesaplama Merkezi
          </div>
          <h1 className="text-2xl font-bold text-foreground">Gemide Yapılan Tüm İşler ve Sorumluları</h1>
          <p className="text-xs text-muted-foreground">
            Gemide düzenli olarak yapılan işler ve bunların asıl sorumlularıyla fiilen yapan personel.
          </p>
          <div className="flex justify-center">
            <Link
              to="/calculations"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-card"
            >
              <ArrowLeft className="h-4 w-4" />
              Geri
            </Link>
          </div>
        </header>

        <section className="space-y-6 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur">
          {categories.map((cat) => (
            <div key={cat.title} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{cat.icon}</span>
                <h2 className="font-bold text-foreground">{cat.number} {cat.title}</h2>
              </div>
              <p className="text-xs text-muted-foreground">{cat.description}</p>
              {cat.columns === 3 ? (
                <ThreeColTable tasks={cat.tasks} headers={cat.headers as [string, string, string]} />
              ) : (
                <TwoColTable tasks={cat.tasks} headers={cat.headers as [string, string]} />
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
