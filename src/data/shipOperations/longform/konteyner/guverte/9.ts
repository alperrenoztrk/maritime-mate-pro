import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Berthing ve unberthing manevrası (tug/mooring boat koordinasyonu)",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 9,
  estimatedPages: 16,
  intro: `Büyük konteyner gemilerinin yanaşma/ayrılma manevrası, tug ve mooring boat koordinasyonu, rüzgar/akıntı yönetimi ve net haberleşme gerektirir. Bu bölüm güvenli berthing/unberthing'i ele alır.`,
  sources: ["OCIMF MEG4", "Bridge Procedures Guide (ICS)"],
  chapters: [
    {
      heading: "1. Manevra Planı",
      sections: [
        {
          subheading: "1.1 Pilot/Master exchange",
          paragraphs: [
            `Tug sayısı/pozisyonu, yaklaşma açısı, rüzgar/akıntı etkisi ve mooring sırası pilot ile mutabık kalınır. Konteyner gemisinin yüksek windage alanı rüzgarda kritiktir.`,
          ],
          bullets: [`Tug sayısı/pozisyon`, `Rüzgar/akıntı yönetimi`, `Mooring sırası`],
        },
      ],
    },
    {
      heading: "2. Yürütme",
      sections: [
        {
          subheading: "2.1 Haberleşme ve snap-back",
          paragraphs: [
            `Pruva/kıç istasyonları ile net haberleşme kurulur; halat gerginliği ve snap-back zone'lar yönetilir. Bell book tutulur.`,
          ],
          callouts: [
            { type: "warning", title: "Windage", text: `Yüklü/boş konteyner gemisinde rüzgar sürüklemesi büyük olabilir; tug planı buna göre yapılır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Manevra planı paylaşıldı mı?`, `Tug bağlantıları güvenli mi?`, `İstasyon haberleşmesi kuruldu mu?`, `Bell book tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
