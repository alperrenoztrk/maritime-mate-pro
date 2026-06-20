import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Muster list ve acil durum tatbikatları",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 21,
  estimatedPages: 14,
  intro: `Muster list ve düzenli tatbikatlar (yangın, MOB, abandon ship, enclosed space) SOLAS III/19 gereği acil durum hazırlığını sağlar. Bulk gemilerde enclosed space (hold, bilge, fumige ambar) riski özellikle yüksektir. Bu bölüm tatbikat organizasyonunu ele alır.`,
  sources: ["SOLAS III/19", "SOLAS III/8 (muster list)", "LSA Code"],
  chapters: [
    {
      heading: "1. Tatbikat",
      sections: [
        {
          subheading: "1.1 Senaryolar",
          paragraphs: [
            `Yangın/MOB/abandon ship ve enclosed space entry & rescue tatbikatları yapılır; muster list güncel tutulur. Debrief ile eksikler giderilir.`,
          ],
          bullets: [`Fire/MOB/abandon ship`, `Enclosed space entry & rescue`, `Muster list güncelliği`, `Debrief`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Tatbikatlar yapıldı mı?`, `Enclosed space drill dahil mi?`, `Muster list güncel mi?`, `Drill log tutuldu mu?`],
          paragraphs: [`Bulk gemilerinde kapalı alan ölümleri yaygındır; enclosed space drill ihmal edilmez.`],
        },
      ],
    },
  ],
};

export default content;
