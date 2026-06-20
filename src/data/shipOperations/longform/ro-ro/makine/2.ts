import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ana makine standby hazırlığı",
  shipType: "ro-ro",
  dept: "makine",
  opIndex: 2,
  estimatedPages: 14,
  intro: `Sık liman dönüşü yapan Ro-Ro'larda ana makine standby hazırlığı, hızlı ve güvenli manevra geçişini sağlar; ısıtma, yakıt geçişi ve telegraph testi kritiktir. Bu bölüm ME standby hazırlığını ele alır.`,
  sources: ["Engine maker manuals", "Bridge-engine room procedures"],
  chapters: [
    {
      heading: "1. Standby",
      sections: [
        {
          subheading: "1.1 Manevra moduna geçiş",
          paragraphs: [`Makine ısıtılır, yakıt geçişi yapılır, hava şişeleri dolu, telegraph testi yapılır. Sık manevrada hazırlık disiplini özellikle önemlidir.`],
          bullets: [`Isıtma + yakıt geçişi`, `Hava şişeleri dolu`, `Telegraph testi`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Isıtma/yakıt geçişi yapıldı mı?`, `Telegraph test edildi mi?`, `Hava basıncı yeterli mi?`, `Bell book tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
