import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Trim pompası operasyonu",
  shipType: "ro-ro",
  dept: "makine",
  opIndex: 8,
  estimatedPages: 12,
  intro: `Trim/heeling pompaları, rampa açısı ve liste düzeltmesi için ballast'ı hızlı transfer eder; yanaşma ve araç elleçleme sırasında güverte ile koordineli çalışır. Bu bölüm trim pompası operasyonunu ele alır.`,
  sources: ["Maker manuals", "Stability booklet"],
  chapters: [
    {
      heading: "1. Operasyon",
      sections: [
        {
          subheading: "1.1 Hızlı transfer",
          paragraphs: [`Trim/heeling pompası ile ballast hızlı transfer edilir; liste/trim hedefe getirilir. Pompa seal/bearing bakımı PMS'e göre yapılır.`],
          bullets: [`Hızlı ballast transferi`, `Liste/trim hedefi`, `Seal/bearing bakımı`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Pompa çalışıyor mu?`, `Liste/trim yönetildi mi?`, `Bakım yapıldı mı?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
