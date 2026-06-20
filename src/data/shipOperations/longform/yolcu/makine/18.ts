import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Emisyon azaltma (SOx scrubber, CII/SEEMP)",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 18,
  estimatedPages: 16,
  intro: `MARPOL Annex VI; SOx (scrubber/düşük kükürtlü yakıt) ve CII/SEEMP ile emisyonu yönetir. Cruise gemileri ECA ve liman emisyon kurallarına özellikle dikkat eder. Bu bölüm emisyon yönetimini ele alır.`,
  sources: ["MARPOL Annex VI", "IMO DCS / CII / SEEMP Part III"],
  chapters: [
    {
      heading: "1. SOx ve CII",
      sections: [
        {
          subheading: "1.1 Scrubber/yakıt ve rating",
          paragraphs: [
            `Scrubber wash water izlenir veya uyumlu yakıt kullanılır; ECA/liman kurallarına uyulur. Yıllık CII hesaplanır ve SEEMP önlemleri uygulanır.`,
          ],
          bullets: [`Wash water/yakıt uyumu`, `ECA/liman kuralları`, `CII rating + SEEMP`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Wash water/yakıt uygun mu?`, `ECA/liman kurallarına uyuldu mu?`, `CII hesaplandı mı?`, `EGC/DCS kayıtları güncel mi?`],
          paragraphs: [`Birçok cruise limanı shore power/emisyon kurallarına özellikle dikkat eder.`],
        },
      ],
    },
  ],
};

export default content;
