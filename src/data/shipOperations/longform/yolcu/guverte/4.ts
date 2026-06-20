import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "MOB (Man Overboard) tatbikatı",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 4,
  estimatedPages: 14,
  intro: `Yolcu gemilerinde denize adam düşmesi (MOB) riski yüksektir; Williamson/Anderson/Scharnov dönüşleri ve rescue boat operasyonu düzenli tatbik edilir. Bu bölüm MOB tatbikatını ele alır.`,
  sources: ["SOLAS III/19", "IAMSAR Manual"],
  chapters: [
    {
      heading: "1. Tatbikat",
      sections: [
        {
          subheading: "1.1 Dönüş manevrası ve rescue boat",
          paragraphs: [
            `MOB alarmında pozisyon işaretlenir; Williamson/Anderson/Scharnov turn uygulanır ve rescue boat hazırlanır. Lookout ve haberleşme koordine edilir.`,
          ],
          bullets: [`MOB pozisyon işaretleme (MOB butonu)`, `Dönüş manevrası`, `Rescue boat`, `Lookout/haberleşme`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`MOB prosedürü uygulandı mı?`, `Dönüş manevrası yapıldı mı?`, `Rescue boat hazır mı?`, `Drill log tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
