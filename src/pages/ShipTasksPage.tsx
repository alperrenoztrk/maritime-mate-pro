import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const bridgeNavigationTasks = [
  { task: "Passage plan", responsible: "Master + 2/O", worker: "2/O", href: "/passage-plan" },
  { task: "Vardiya tutma", responsible: "Master", worker: "2/O – 3/O – 4/O" },
  { task: "Radar / ARPA takibi", responsible: "Vardiya zabiti", worker: "Vardiya zabiti" },
  { task: "COLREG uygulama", responsible: "Vardiya zabiti", worker: "Vardiya zabiti" },
  { task: "Kaptanı çağırma kararı", responsible: "Vardiya zabiti", worker: "Vardiya zabiti" },
  { task: "Logbook doldurma", responsible: "Vardiya zabiti", worker: "Vardiya zabiti" },
  { task: "Pilot embark/disembark", responsible: "Master", worker: "2/O–3/O" },
  { task: "Kısıtlı sularda seyir", responsible: "Master", worker: "Master + OOW" },
  { task: "GMDSS acil çağrı", responsible: "Master", worker: "2/O" },
  { task: "Köprüüstü disiplin", responsible: "Master", worker: "Tüm zabitler" },
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
          {/* 1. Seyir & Köprüüstü İşleri */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚓</span>
              <h2 className="font-bold text-foreground">1️⃣ SEYİR & KÖPRÜÜSTÜ İŞLERİ</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="py-2 pr-4 font-semibold text-foreground">İş</th>
                    <th className="py-2 pr-4 font-semibold text-primary">Asıl Sorumlu</th>
                    <th className="py-2 font-semibold text-muted-foreground">Fiilen Yapan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {bridgeNavigationTasks.map(({ task, responsible, worker, href }) => (
                    <tr key={task}>
                      <td className="py-1.5 pr-4 text-foreground">
                        {href ? (
                          <Link
                            to={href}
                            className="text-primary underline decoration-dotted underline-offset-2 transition-colors hover:text-primary/80"
                          >
                            {task}
                          </Link>
                        ) : (
                          task
                        )}
                      </td>
                      <td className="py-1.5 pr-4 text-primary">{responsible}</td>
                      <td className="py-1.5 text-muted-foreground">{worker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Navigasyon & Harita İşleri */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🗺️</span>
              <h2 className="font-bold text-foreground">2️⃣ NAVİGASYON & HARİTA İŞLERİ</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="py-2 pr-4 font-semibold text-foreground">İş</th>
                    <th className="py-2 font-semibold text-primary">Sorumlu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    ["Harita düzeltmeleri", "2. Kaptan"],
                    ["ECDIS güncellemeleri", "2. Kaptan"],
                    ["Notice to Mariners", "2. Kaptan"],
                    ["Navigational warnings", "2. Kaptan"],
                    ["Gyro / manyetik pusula kontrolü", "2/O – 3/O"],
                    ["Draft & position plotting", "OOW"],
                    ["BNWAS / AIS kontrol", "OOW"],
                    ["Seyir cihazları bakımı", "2/O"],
                  ].map(([task, responsible]) => (
                    <tr key={task}>
                      <td className="py-1.5 pr-4 text-foreground">{task}</td>
                      <td className="py-1.5 text-primary">{responsible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4 rounded-xl border border-border/60 bg-background/80 p-4 text-xs text-foreground shadow-sm">
              <h3 className="text-sm font-semibold text-foreground">ECDIS / ENC Güncellemesi</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">1. ENC Kavramı</p>
                  <p>
                    ENC, ECDIS sistemlerinde kullanılan elektronik seyir haritalarıdır ve kağıt haritaların dijital
                    karşılığını oluşturur. ENC&apos;ler belirli sınırlarla ayrılmış hücreler halinde çalışır ve her hücre
                    bağımsız olarak güncellenir. Bu nedenle ECDIS güncellemesinde esas olan, rota üzerinde kullanılan tüm
                    ENC hücrelerinin ayrı ayrı güncel olmasıdır.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">2. Güncelleme Dosyalarının Yüklenmesi</p>
                  <p>
                    ENC güncelleme dosyaları gemiye ulaştırıldıktan sonra ECDIS sistemine yüklenir. Bu işlem genellikle
                    harici bir veri taşıyıcı veya gemi içi ağ üzerinden gerçekleştirilir. Bu aşamada yapılan işlem yalnızca
                    verinin sisteme aktarılmasıdır ve güncellemenin tamamlandığı anlamına gelmez.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">3. Güncellemelerin Uygulandığının Kontrolü</p>
                  <p>
                    Güncelleme dosyaları yüklendikten sonra, ECDIS üzerinde her ENC hücresinin durumu kontrol edilir.
                    ENC&apos;ye ait Edition Number, Update Number ve Last Update Date bilgileri incelenerek güncellemelerin
                    eksiksiz şekilde uygulandığı teyit edilir. ECDIS, güncel olmayan ENC&apos;leri bu aşamada uyarı
                    mesajlarıyla belirtir.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">4. Permit Kontrolü</p>
                  <p>
                    ENC&apos;lerin kullanılabilmesi ve güncellenebilmesi için ilgili hücrelere ait permitlerin geçerli olması
                    gerekir. Permit süresi dolmuş bir ENC, görüntülenebilir olsa bile yeni güncellemeleri alamaz. Bu nedenle
                    güncelleme sonrasında rota üzerindeki tüm ENC&apos;lerin permit durumu ayrıca kontrol edilir.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">5. Ölçek ve Kullanım Bandı Kontrolü</p>
                  <p>
                    ENC&apos;nin güncel olması tek başına yeterli değildir. Kullanılan ENC&apos;nin seyir safhasına uygun
                    ölçekte olması gerekir. Yanlış ölçekte kullanılan bir ENC, güncel olsa dahi emniyetli seyir için yeterli
                    bilgi sağlamaz. Bu nedenle kullanım bandı ve overscale uyarıları kontrol edilir.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">6. Güncelleme Kayıtları</p>
                  <p>
                    ENC güncellemesi tamamlandıktan sonra, ECDIS tarafından oluşturulan update report alınır. Bu rapor,
                    yapılan güncellemelerin sistem tarafından kabul edildiğini gösterir. Güncelleme işlemi tarih, saat ve
                    sorumlu zabit bilgisiyle gemi kayıtlarına işlenir ve denetimlerde belge olarak kullanılır.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">Genel Değerlendirme</p>
                  <p>
                    Kağıt haritalar ve ECDIS üzerinde kullanılan ENC&apos;ler farklı yöntemlerle güncellenmelerine rağmen aynı
                    amaca hizmet eder: seyirde kullanılan bilgilerin en güncel ve doğru haliyle gemiye sunulması. Her iki
                    sistemde de güncelleme işlemleri, vardiya zabitinin doğrudan sorumluluğu altında yürütülür ve eksiksiz
                    şekilde kayıt altına alınır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Yük Operasyonları */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <h2 className="font-bold text-foreground">3️⃣ YÜK OPERASYONLARI</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="py-2 pr-4 font-semibold text-foreground">İş</th>
                    <th className="py-2 pr-4 font-semibold text-primary">Asıl Sorumlu</th>
                    <th className="py-2 font-semibold text-muted-foreground">Sahadaki</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    ["Yük planı", "Chief Officer", "C/O"],
                    ["Loading / Discharging", "Chief Officer", "3/O"],
                    ["Draft survey", "C/O", "3/O"],
                    ["Tank sounding", "C/O", "3/O"],
                    ["Cargo watch", "3/O – 4/O", "3/O"],
                    ["Mooring / unmooring", "Master", "2/O–3/O"],
                    ["Hatch cover operasyonu", "C/O", "Bosun"],
                    ["Cargo damage takibi", "C/O", "3/O"],
                  ].map(([task, responsible, worker]) => (
                    <tr key={task}>
                      <td className="py-1.5 pr-4 text-foreground">{task}</td>
                      <td className="py-1.5 pr-4 text-primary">{responsible}</td>
                      <td className="py-1.5 text-muted-foreground">{worker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Emniyet & ISM/ISPS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧯</span>
              <h2 className="font-bold text-foreground">4️⃣ EMNİYET & ISM / ISPS</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="py-2 pr-4 font-semibold text-foreground">İş</th>
                    <th className="py-2 font-semibold text-primary">Sorumlu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    ["Safety Officer", "3. Kaptan"],
                    ["Yangın ekipmanları", "3/O"],
                    ["Can kurtarma araçları", "3/O"],
                    ["Weekly / Monthly checks", "3/O"],
                    ["Drill organizasyonu", "3/O"],
                    ["Muster list", "Master"],
                    ["ISM kayıtları", "Master + C/O"],
                    ["ISPS (güvenlik)", "Master"],
                    ["Security watch", "3/O – 4/O"],
                  ].map(([task, responsible]) => (
                    <tr key={task}>
                      <td className="py-1.5 pr-4 text-foreground">{task}</td>
                      <td className="py-1.5 text-primary">{responsible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Güverte Bakım & Onarım */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔧</span>
              <h2 className="font-bold text-foreground">5️⃣ GÜVERTE BAKIM & ONARIM</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="py-2 pr-4 font-semibold text-foreground">İş</th>
                    <th className="py-2 pr-4 font-semibold text-primary">Sorumlu</th>
                    <th className="py-2 font-semibold text-muted-foreground">Yapan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    ["Boya & pas", "C/O", "Bosun + AB"],
                    ["Güverte temizliği", "C/O", "AB"],
                    ["Halat – tel bakımı", "C/O", "Bosun"],
                    ["Vinç – capstan yağlama", "C/O", "AB"],
                    ["Güverte aydınlatma", "C/O", "AB"],
                    ["Fener & işaretler", "C/O", "AB"],
                  ].map(([task, responsible, worker]) => (
                    <tr key={task}>
                      <td className="py-1.5 pr-4 text-foreground">{task}</td>
                      <td className="py-1.5 pr-4 text-primary">{responsible}</td>
                      <td className="py-1.5 text-muted-foreground">{worker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Personel & Disiplin */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">👥</span>
              <h2 className="font-bold text-foreground">6️⃣ PERSONEL & DİSİPLİN</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="py-2 pr-4 font-semibold text-foreground">İş</th>
                    <th className="py-2 font-semibold text-primary">Sorumlu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    ["Günlük iş planı", "Chief Officer"],
                    ["Güverte personeli", "C/O"],
                    ["Disiplin", "Master"],
                    ["İş güvenliği", "3/O"],
                    ["Yeni personel oryantasyonu", "3/O"],
                    ["Eğitim", "Master + C/O"],
                  ].map(([task, responsible]) => (
                    <tr key={task}>
                      <td className="py-1.5 pr-4 text-foreground">{task}</td>
                      <td className="py-1.5 text-primary">{responsible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 7. Dokümantasyon & Denetim */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">📑</span>
              <h2 className="font-bold text-foreground">7️⃣ DOKÜMANTASYON & DENETİM</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="py-2 pr-4 font-semibold text-foreground">İş</th>
                    <th className="py-2 font-semibold text-primary">Sorumlu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    ["PSC hazırlık", "Master + C/O + 3/O"],
                    ["Logbooks", "OOW"],
                    ["Checklists", "İlgili zabit"],
                    ["Certificates", "Master"],
                    ["Company reporting", "Master"],
                    ["Deficiency takibi", "C/O"],
                  ].map(([task, responsible]) => (
                    <tr key={task}>
                      <td className="py-1.5 pr-4 text-foreground">{task}</td>
                      <td className="py-1.5 text-primary">{responsible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 8. Acil Durumlar */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚨</span>
              <h2 className="font-bold text-foreground">8️⃣ ACİL DURUMLAR</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="py-2 pr-4 font-semibold text-foreground">Durum</th>
                    <th className="py-2 font-semibold text-primary">Lider</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    ["Yangın", "Master"],
                    ["Can kurtarma", "3/O"],
                    ["Adam denize", "Master"],
                    ["Collision", "Master"],
                    ["Grounding", "Master"],
                    ["Abandon ship", "Master"],
                    ["Medical emergency", "Master"],
                    ["Oil spill", "C/O"],
                  ].map(([situation, leader]) => (
                    <tr key={situation}>
                      <td className="py-1.5 pr-4 text-foreground">{situation}</td>
                      <td className="py-1.5 text-primary">{leader}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 9. Makine Dairesi İşleri */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚙️</span>
              <h2 className="font-bold text-foreground">9️⃣ MAKİNE DAİRESİ İŞLERİ</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="py-2 pr-4 font-semibold text-foreground">İş</th>
                    <th className="py-2 pr-4 font-semibold text-primary">Asıl Sorumlu</th>
                    <th className="py-2 font-semibold text-muted-foreground">Fiilen Yapan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    ["Ana makine operasyonu", "Chief Engineer", "2/E – 3/E"],
                    ["Yardımcı makine bakımı", "2nd Engineer", "3/E – 4/E"],
                    ["Jeneratör operasyonu", "2nd Engineer", "3/E – Oiler"],
                    ["Yakıt transferi", "Chief Engineer", "3/E"],
                    ["Yağlama sistemi", "2nd Engineer", "4/E – Oiler"],
                    ["Soğutma sistemi", "2nd Engineer", "3/E"],
                    ["Balast operasyonu", "Chief Engineer", "3/E"],
                    ["Sintine pompası", "3rd Engineer", "4/E – Oiler"],
                    ["Separator çalıştırma", "3rd Engineer", "4/E"],
                    ["Kazan operasyonu", "2nd Engineer", "3/E"],
                    ["Kompresör bakımı", "3rd Engineer", "4/E"],
                    ["Pompa bakımları", "2nd Engineer", "3/E – 4/E"],
                    ["Elektrik sistemleri", "Electrician", "Electrician"],
                    ["Otomasyon sistemleri", "Chief Engineer", "Electrician"],
                    ["Spare parts yönetimi", "Chief Engineer", "2/E"],
                    ["Makine logbook", "Chief Engineer", "Vardiya mühendisi"],
                    ["PMS kayıtları", "2nd Engineer", "Tüm mühendisler"],
                    ["Bunkering operasyonu", "Chief Engineer", "2/E – 3/E"],
                    ["LO/FO analizleri", "Chief Engineer", "2/E"],
                    ["Makine dairesi temizliği", "Chief Engineer", "Oiler – Wiper"],
                    ["Emergency generator", "2nd Engineer", "3/E"],
                    ["Steering gear bakımı", "2nd Engineer", "3/E"],
                    ["Makine dairesi güvenliği", "Chief Engineer", "Tüm personel"],
                  ].map(([task, responsible, worker]) => (
                    <tr key={task}>
                      <td className="py-1.5 pr-4 text-foreground">{task}</td>
                      <td className="py-1.5 pr-4 text-primary">{responsible}</td>
                      <td className="py-1.5 text-muted-foreground">{worker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
