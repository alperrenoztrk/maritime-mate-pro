import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Acil tahliye prosedürü tatbikatı",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 26,
  estimatedPages: 16,
  intro: `Yolcu gemilerinde tahliye; MES (Marine Evacuation System), lifeboat ve life raft'ın koordineli kullanımıyla büyük yolcu sayısını güvenli boşaltmayı hedefler. Tahliye analizleri ve tatbikatlar bunu doğrular. Bu bölüm tahliye tatbikatını ele alır.`,
  sources: ["SOLAS III", "MSC.1/Circ.1533 (evacuation analysis)", "LSA Code"],
  chapters: [
    {
      heading: "1. Tatbikat",
      sections: [
        {
          subheading: "1.1 MES + filika/sal",
          paragraphs: [
            `MES, lifeboat ve life raft koordineli kullanılır; yolcu yönlendirme, muster ve sayım pratiği yapılır. Tahliye süresi ve darboğazlar değerlendirilir.`,
          ],
          bullets: [`MES kullanımı`, `Lifeboat/life raft`, `Yolcu yönlendirme`, `Tahliye süresi`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`MES/filika test edildi mi?`, `Yönlendirme pratiği yapıldı mı?`, `Süre kriterleri sağlanıyor mu?`, `Debrief tutuldu mu?`],
          paragraphs: [`Tahliye darboğazları (dar koridor, asansör) önceden tespit edilip giderilmelidir.`],
        },
      ],
    },
  ],
};

export default content;
