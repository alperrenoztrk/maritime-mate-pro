import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Acil durum tatbikatları (yangın, MOB, tahliye)",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 15,
  estimatedPages: 16,
  intro: `Ro-Ro/yolcu gemilerinde tahliye (evacuation), büyük yolcu sayısı nedeniyle özel önem taşır; yangın, MOB ve abandon ship tatbikatları SOLAS III/19 gereği düzenli yapılır. Bu bölüm tatbikat organizasyonunu ele alır.`,
  sources: ["SOLAS III/19", "LSA Code", "MES (Marine Evacuation System)"],
  chapters: [
    {
      heading: "1. Tatbikat",
      sections: [
        {
          subheading: "1.1 Tahliye senaryosu",
          paragraphs: [
            `Araç güvertesi yangını ve yolcu tahliyesi senaryoları çalışılır; MES/filika kullanımı, muster ve yolcu yönlendirme prosedürleri tatbik edilir. Debrief yapılır.`,
          ],
          bullets: [`Araç güvertesi fire drill`, `Yolcu tahliye/MES`, `Muster + yönlendirme`, `Debrief`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Tatbikatlar yapıldı mı?`, `Tahliye senaryosu dahil mi?`, `MES/filika kontrol edildi mi?`, `Drill log tutuldu mu?`],
          paragraphs: [`Yolcu gemilerinde tahliye süresi (SOLAS) kriterleri tatbikatla doğrulanmalıdır.`],
        },
      ],
    },
  ],
};

export default content;
