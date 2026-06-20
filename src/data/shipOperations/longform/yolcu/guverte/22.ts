import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Helikopter pisti (helideck) kontrolü (varsa)",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 22,
  estimatedPages: 12,
  intro: `Helideck/winching alanı olan gemilerde helikopter operasyonu (medivac vb.) güvenliği; alan temizliği, FFA hazırlığı ve haberleşme gerektirir. Bu bölüm helideck kontrolünü ele alır.`,
  sources: ["ICS Guide to Helicopter/Ship Operations", "SOLAS II-2 (helidecks)"],
  chapters: [
    {
      heading: "1. Operasyon",
      sections: [
        {
          subheading: "1.1 Alan ve FFA",
          paragraphs: [
            `Operasyon öncesi alan gevşek eşyalardan temizlenir; yangın ekibi ve FFA (foam) hazır tutulur. Rüzgar/relative wind ve haberleşme pilotla koordine edilir.`,
          ],
          bullets: [`Alan temizliği (FOD)`, `FFA/foam hazır`, `Rüzgar/haberleşme`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Alan temiz mi?`, `FFA hazır mı?`, `Haberleşme kuruldu mu?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
