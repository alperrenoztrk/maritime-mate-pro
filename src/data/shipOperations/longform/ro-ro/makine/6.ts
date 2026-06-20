import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Tatlı su üretimi",
  shipType: "ro-ro",
  dept: "makine",
  opIndex: 6,
  estimatedPages: 12,
  intro: `Tatlı su, evaporator/RO ile üretilir; içme suyu kalitesi ve liman/kıyı kontaminasyonu yönetimi kritiktir. Kısa kıyı seferlerinde üretim sınırlı olabilir. Bu bölüm tatlı su üretimini ele alır.`,
  sources: ["WHO Guidelines for Drinking-water Quality", "Maker manuals"],
  chapters: [
    {
      heading: "1. Üretim",
      sections: [
        {
          subheading: "1.1 Salinite ve bölge",
          paragraphs: [`Salinometer ile tuzluluk izlenir; kıyı/limanda kontaminasyon nedeniyle üretim durdurulur. Dezenfeksiyon uygulanır.`],
          bullets: [`Salinite izleme`, `Kıyı/limanda üretim YAPMA`, `Dezenfeksiyon`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Salinite eşik altında mı?`, `Kıyıda durduruldu mu?`, `Dezenfeksiyon yapıldı mı?`, `FW log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
