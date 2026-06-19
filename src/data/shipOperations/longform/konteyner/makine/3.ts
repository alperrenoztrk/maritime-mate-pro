import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Fresh Water Generator (FWG) operasyonu ve tatlı su stoğu takibi",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 3,
  estimatedPages: 14,
  intro: `FWG (evaporator/RO), seyirde tatlı su üretir; içme suyu kalitesi ve liman/kıyı kontaminasyonu yönetimi kritiktir. Bu bölüm FWG operasyonunu ele alır.`,
  sources: ["WHO Guidelines for Drinking-water Quality", "Maker manuals"],
  chapters: [
    {
      heading: "1. Üretim",
      sections: [
        {
          subheading: "1.1 Salinite ve bölge",
          paragraphs: [
            `Salinometer ile tuzluluk izlenir; eşik aşılırsa dump valve devreye girer. Liman/kıyı sularında kontaminasyon nedeniyle üretim durdurulur.`,
          ],
          bullets: [`Salinite izleme`, `Limanda üretim YAPMA`, `Dezenfeksiyon (klor/UV)`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Salinite eşik altında mı?`, `Limanda durduruldu mu?`, `Dezenfeksiyon yapıldı mı?`, `FW log güncel mi?`],
          paragraphs: [`İçme suyu için periyodik bakteriyolojik test yapılır.`],
        },
      ],
    },
  ],
};

export default content;
