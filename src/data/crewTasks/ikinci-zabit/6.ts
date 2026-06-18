import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Chronometer ve zaman yönetimi",
  roleSlug: "ikinci-zabit",
  taskIndex: 6,
  estimatedPages: 22,
  intro: `Doğru zaman, seyrin görünmeyen ama vazgeçilmez temelidir. Astronomik mevki tayininden GMDSS nöbet saatlerine, vardiya devrinden liman ETA'larına ve UTC referanslı kayıtlara kadar her şey güvenilir zamana dayanır. İkinci Zabit; gemi kronometresinin ve saatlerinin doğruluğunu izlemek, UTC referansını korumak, saat dilimi (time zone) değişikliklerini planlamak ve uygulamaktan sorumludur. Bu bölüm zaman yönetimini ve chronometer error takibini ele alır.`,
  sources: [
    "Admiralty List of Radio Signals (ALRS) Vol. 5 — time signals",
    "STCW — bridge watchkeeping ve zaman kayıtları",
    "SOLAS Chapter V — seyir kayıtları",
    "MLC 2006 — çalışma/dinlenme saatleri (rest hours)",
    "Nautical Almanac — zaman ve astronomik seyir",
  ],
  chapters: [
    {
      heading: "1. Zamanın Seyirdeki Rolü",
      sections: [
        {
          subheading: "1.1 Neden doğru zaman kritiktir?",
          paragraphs: [
            `Astronomik seyirde boylam hatası doğrudan zaman hatasından doğar: yaklaşık 4 saniyelik bir zaman hatası, ekvatorda ~1 deniz mili boylam hatasına karşılık gelir. GPS çağında bile chronometer ve doğru zaman, hem yedek seyir yöntemi hem de kayıtların tutarlılığı için önemini korur.`,
            `Ayrıca tüm gemi kayıtları (deck log, ORB, GMDSS log, rest hours) zaman damgası taşır. Tutarsız veya yanlış zaman, denetimde kayıtların güvenilirliğini zedeler ve olay sonrası incelemede ciddi sorun yaratır.`,
          ],
          bullets: [
            `Astronomik mevki ve boylam hesabı`,
            `UTC referanslı resmi kayıtlar`,
            `GMDSS ve emniyet nöbet saatleri`,
            `Vardiya devri ve rest hours uyumu`,
          ],
        },
      ],
    },
    {
      heading: "2. Kronometre ve Saatler",
      sections: [
        {
          subheading: "2.1 Chronometer error ve daily rate",
          paragraphs: [
            `Geleneksel kronometre, UTC'ye göre bir hata (chronometer error) taşır ve bu hata günlük olarak düzenli değişir (daily rate). İkinci Zabit, zaman sinyaliyle (radyo time signal/GPS UTC) karşılaştırarak hatayı ölçer, chronometer journal'a kaydeder ve daily rate'in kararlı olduğunu izler. Ani rate değişimi, kronometrede bir sorunun işaretidir.`,
          ],
          table: {
            caption: "Chronometer journal örnek mantığı",
            headers: ["Tarih", "Karşılaştırma (UTC)", "Error", "Daily rate"],
            rows: [
              ["01", "Time signal", "+00m 12s", "—"],
              ["02", "Time signal", "+00m 14s", "+2s (slow)"],
              ["03", "Time signal", "+00m 16s", "+2s (slow)"],
              ["04", "Time signal", "+00m 18s", "+2s (kararlı)"],
            ],
          },
        },
        {
          subheading: "2.2 Köprüüstü saatleri ve senkronizasyon",
          paragraphs: [
            `Köprüüstü, makine, GMDSS ve VDR saatlerinin tutarlı (genelde UTC veya gemi saati referanslı) tutulması gerekir. VDR'ın zaman kaynağı doğru olmalıdır; aksi halde olay kaydı gerçek zamanla örtüşmez. İkinci Zabit saat senkronizasyonunu periyodik kontrol eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tek referans: UTC",
              text: `Karışıklığı önlemenin en sağlam yolu, tüm resmi kayıtlarda UTC'yi temel referans almaktır. Gemi saati (ship's time) operasyonel kolaylık içindir; ama log tutarlılığı UTC ile sağlanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Zaman Sinyalleri ve UTC Referansı",
      sections: [
        {
          subheading: "3.1 UTC kaynakları",
          paragraphs: [
            `UTC; GNSS alıcılarından, radyo zaman sinyallerinden (ALRS Vol. 5'te listeli) ve internet zaman servislerinden elde edilir. İkinci Zabit, birincil kaynak GPS olsa da yedek bir kaynakla çapraz kontrol alışkanlığını korur; tek kaynağa bağımlılık, o kaynak arızalandığında zaman bütünlüğünü riske atar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Saat Dilimi (Time Zone) Yönetimi",
      sections: [
        {
          subheading: "4.1 Zone değişiminin planlanması",
          paragraphs: [
            `Doğuya seyirde saatler ileri, batıya seyirde geri alınır. İkinci Zabit, boylam ilerlemesine göre zone change'leri önceden planlar ve genellikle gece vardiyalarına dengeli dağıtır. Ani veya tek seferde büyük saat değişimi, mürettebatın dinlenme saatlerini ve uyanıklığını bozar.`,
          ],
          bullets: [
            `Zone değişimini boylam ilerlemesine göre planla`,
            `Saat değişimini vardiyalara dengeli dağıt`,
            `Rest hours etkisini hesaba kat`,
            `Değişimi panoya as ve tüm departmanlara duyur`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — rest hours",
              text: `Saat ileri alındığında vardiya kısalır, geri alındığında uzar. Zone change planlanırken minimum dinlenme saatlerinin (24 saatte 10, 7 günde 77 saat) ihlal edilmemesine dikkat edilir.`,
            },
          ],
        },
        {
          subheading: "4.2 Tarih değiştirme çizgisi (IDL)",
          paragraphs: [
            `180° meridyeni civarındaki Uluslararası Tarih Çizgisi geçişinde takvim günü atlanır (batı→doğu) veya tekrarlanır (doğu→batı). Bu, ETA hesapları, vardiya çizelgeleri ve kayıtlarda dikkatle yönetilir; aksi halde bir günlük kayıt boşluğu veya tekrarı oluşur.`,
          ],
        },
      ],
    },
    {
      heading: "5. Zaman ve Kayıt Tutarlılığı",
      sections: [
        {
          subheading: "5.1 Loglarda zaman bütünlüğü",
          paragraphs: [
            `Deck log, ORB, GMDSS log ve diğer kayıtların zaman damgaları kendi içinde ve birbiriyle tutarlı olmalıdır. İkinci Zabit, kullanılan zaman referansının (UTC/ship's time) loglarda açık ve tutarlı olduğunu gözetir. Bu tutarlılık, PSC ve olay incelemelerinde güvenin temelidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Zaman uyuşmazlığının bedeli",
              text: `Bir çatışma incelemesinde VDR zamanı, deck log ve VHF kayıtları arasındaki tutarsızlık, olay zaman çizelgesini bulanıklaştırır ve geminin savunmasını zayıflatır. Doğru ve senkron zaman, kanıt değeridir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Astronomik Seyir İçin Zaman",
      sections: [
        {
          subheading: "6.1 Sight için doğru saniye",
          paragraphs: [
            `Sekstant rasadında gök cisminin yüksekliği ölçülürken tam saniye not edilir; çünkü hesaplanan mevki bu zamana dayanır. İkinci Zabit, GPS arızası senaryosuna karşı astronomik seyir becerisini ve doğru zaman alma disiplinini canlı tutar.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Zaman yönetimi kontrolü",
          bullets: [
            `Chronometer error ölçüldü ve journal'a işlendi mi?`,
            `Daily rate kararlı mı (ani değişim var mı)?`,
            `Köprüüstü/GMDSS/VDR saatleri senkron mu?`,
            `UTC için yedek kaynak çapraz kontrolü yapıldı mı?`,
            `Zone change planlandı, rest hours korunuyor, panoya asıldı mı?`,
            `IDL geçişi (gerekiyorsa) doğru uygulandı mı?`,
            `Loglarda zaman referansı tutarlı mı?`,
          ],
          paragraphs: [
            `Zaman, seyrin sessiz omurgasıdır. İkinci Zabitin kronometre takibi, UTC disiplini ve özenli zone yönetimi; hem seyir doğruluğunu hem kayıt güvenilirliğini hem de mürettebatın dinlenme düzenini birlikte korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
