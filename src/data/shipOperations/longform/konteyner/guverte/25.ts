import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yangın, MOB ve abandon ship tatbikatları (SOLAS III/19 uyumlu)",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 25,
  estimatedPages: 16,
  intro: `SOLAS III/19; yangın, denize adam düşmesi (MOB) ve gemiyi terk (abandon ship) tatbikatlarını düzenli zorunlu kılar. Tatbikatlar acil durumda refleks ve koordinasyonu sağlar. Bu bölüm tatbikat organizasyonunu ele alır.`,
  sources: ["SOLAS III/19 (drills)", "LSA Code"],
  chapters: [
    {
      heading: "1. Tatbikat Programı",
      sections: [
        {
          subheading: "1.1 Senaryolar",
          paragraphs: [
            `Yangın, MOB ve abandon ship senaryoları belirlenen sıklıkta yapılır; can filikası/davit, immersion suit ve muster prosedürleri çalışılır. Debrief ile eksikler giderilir.`,
          ],
          bullets: [`Fire/MOB/abandon ship`, `Filika/davit kullanımı`, `Muster + debrief`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Tatbikatlar planlandı mı?`, `Ekipman kullanıldı/kontrol edildi mi?`, `Tüm personel katıldı mı?`, `Drill log + debrief tutuldu mu?`],
          paragraphs: [`Konteyner gemilerinde DG kaynaklı yangın senaryoları da tatbikata dahil edilmelidir.`],
        },
      ],
    },
  ],
};

export default content;
