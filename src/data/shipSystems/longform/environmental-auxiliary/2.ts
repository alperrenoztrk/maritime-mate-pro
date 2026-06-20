import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Sewage Treatment Plant (STP)",
  sectionId: "environmental-auxiliary",
  topicIndex: 2,
  estimatedPages: 22,
  intro: `Sewage treatment plant (STP — atık su/pis su arıtma tesisi), gemideki tuvalet ve gri su atığını denize verilebilir veya tanklanabilir hale getiren MARPOL Annex IV gereği çevre sistemidir. Atık su, patojen ve organik kirlilik içerdiğinden arıtılmadan veya yeterli mesafe sağlanmadan denize verilemez. Bu bölüm; black/grey water kavramını, arıtma teknolojilerini (biyolojik aktif çamur, MBR membran, elektrokimyasal), MARPOL Annex IV deşarj kriterlerini ve mesafe kuralını, dezenfeksiyon ve deşarj izlemeyi ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "MARPOL Annex IV — sewage",
    "IMO Res. MEPC.227(64) — STP effluent standard",
    "Special area (Baltic) sewage rules",
    "Üretici el kitapları (Hamworthy/Wartsila, Evac, RWO)",
  ],
  chapters: [
    {
      heading: "1. Atık Su ve Arıtma",
      sections: [
        {
          subheading: "1.1 Black water ve grey water",
          paragraphs: [
            `Black water tuvalet (lağım) atığıdır ve patojen yüklüdür; grey water lavabo/duş/mutfak atığıdır. MARPOL Annex IV black water'ı düzenler; bazı bölgelerde (örn. Baltık özel alan) grey water dahil daha katı kurallar uygulanır. STP, atığı biyolojik/kimyasal olarak arıtıp dezenfekte eder.`,
          ],
          bullets: [
            `Black water: tuvalet, patojen yüklü`,
            `Grey water: lavabo/duş/mutfak`,
            `Özel alanlarda kurallar daha katı`,
          ],
        },
        {
          subheading: "1.2 Arıtma teknolojileri",
          paragraphs: [
            `Yaygın yöntem biyolojik aktif çamur (aerobik bakteriler organik maddeyi parçalar) + çökeltme + klorlama/UV dezenfeksiyondur. Modern MBR (membrane bioreactor) sistemler membran filtrasyonla çok düşük kirlilikte çıkış sağlar. Elektrokimyasal/kimyasal sistemler de kullanılır.`,
          ],
          table: {
            headers: ["Teknoloji", "Prensip", "Not"],
            rows: [
              ["Aktif çamur", "Aerobik biyolojik", "Yaygın, bakteri dengesi kritik"],
              ["MBR", "Biyolojik + membran", "Yüksek kalite, membran bakımı"],
              ["Elektrokimyasal", "Kimyasal oksidasyon", "Kompakt, kimyasal yönetimi"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. MARPOL Kriterleri",
      sections: [
        {
          subheading: "2.1 Deşarj ve mesafe",
          paragraphs: [
            `Arıtılmış atık su, onaylı STP ile ve gemi belirli hızdayken (en route) kriterlere uygun deşarj edilebilir. Öğütülmüş/dezenfekte atık kıyıdan ≥3 deniz mili, öğütülmemiş atık ≥12 deniz mili uzakta verilir. Liman/özel alanda deşarj genelde yasak; atık tanklanır veya kıyı tesisine verilir.`,
          ],
          table: {
            headers: ["Atık durumu", "Mesafe"],
            rows: [
              ["Onaylı STP ile arıtılmış", "Kriter sağlanırsa deşarj edilebilir"],
              ["Öğütülmüş + dezenfekte", "≥ 3 deniz mili"],
              ["Öğütülmemiş", "≥ 12 deniz mili"],
              ["Liman/özel alan", "Genelde yasak (tankla/kıyı tesisi)"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "Holding tank",
              text: `Deşarjın yasak olduğu bölgelerde atık holding tankta tutulur; tank kapasitesi sefer planına göre yönetilir, taşma önlenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Bakım ve Arıza",
      sections: [
        {
          subheading: "3.1 Bakım ve bakteri dengesi",
          paragraphs: [
            `Biyolojik sistemlerde bakteri kültürünün sağlığı kritiktir; aşırı kimyasal (deterjan, klor) bakteriyi öldürür ve arıtma çöker. Bakım; havalandırma blower, dezenfeksiyon dozajı, çamur seviyesi ve (MBR'de) membran temizliği/değişimini kapsar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Bakteriyi koruyun",
              text: `Tuvaletlere aşırı dezenfektan/kimyasal dökmek STP'deki bakteri kültürünü öldürür; arıtma verimi düşer ve sistem yeniden devreye almak zaman alır.`,
            },
          ],
        },
        {
          subheading: "3.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Çıkış kalitesi kötü/koku", "Bakteri ölümü/aşırı yük", "Aerasyon, kimyasal girişini azalt"],
              ["Sistem taşıyor", "Blower/çamur/tıkanma", "Blower + çamur tahliye"],
              ["Dezenfeksiyon yetersiz", "Doz/klor tükenmiş", "Dozaj ve kimyasal ikmal"],
              ["MBR debisi düştü", "Membran kirliliği", "Membran temizlik/değişim"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
