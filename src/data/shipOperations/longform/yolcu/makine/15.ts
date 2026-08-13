import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Steering gear bakımı ve testi",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 15,
  estimatedPages: 14,
  intro: `Dümen makinesi manevra güvenliğinin temelidir; SOLAS V/26 main ve emergency steering testlerini zorunlu kılar. Hidrolik temizliği kritiktir. Bu bölüm steering gear test/bakımını ele alır.`,
  sources: ["SOLAS V/26", "Maker manuals"],
  chapters: [
    {
      heading: "1. Test",
      sections: [
        {
          subheading: "1.1 Departure/emergency",
          paragraphs: [`Departure öncesi (12 saat içinde) main steering test edilir; emergency steering en az üç ayda bir yapılan acil dümen tatbikatıyla doğrulanır (SOLAS V/26.4). Hidrolik yağ temizliği izlenir.`],
          bullets: [`Departure test`, `Emergency steering yıllık`, `Hidrolik yağ temizliği`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Kontrol listesi",
          bullets: [`Departure test yapıldı mı?`, `Emergency test edildi mi?`, `Hidrolik temiz mi?`, `Test log tutuldu mu?`],
          callouts: [
            { type: "warning", title: "Hidrolik enjeksiyon", text: `Basınçlı hidrolik jeti yaralanma yapar; basınç boşaltılır.` },
          ],
        },
      ],
    },
  ],
};

export default content;
