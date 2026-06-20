import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Limana yanaşma ve ayrılma operasyonu",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 11,
  estimatedPages: 14,
  intro: `Yanaşma/ayrılma; pilot/Master exchange, tug koordinasyonu ve mooring yönetimini içerir. Derin draftlı bulk gemilerde UKC ve manevra alanı kritiktir. Bu bölüm yanaşma/ayrılmayı ele alır.`,
  sources: ["OCIMF MEG4", "Bridge Procedures Guide (ICS)"],
  chapters: [
    {
      heading: "1. Manevra",
      sections: [
        {
          subheading: "1.1 Plan ve mooring",
          paragraphs: [
            `Tug sayısı/pozisyon, yaklaşma açısı ve mooring sırası planlanır; snap-back zone'lar yönetilir. Bell book tutulur.`,
          ],
          bullets: [`Pilot/Master exchange`, `Tug koordinasyonu`, `Mooring sırası + snap-back`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Manevra planı paylaşıldı mı?`, `Tug bağlantıları güvenli mi?`, `Mooring güvenli mi?`, `Bell book tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
