import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Steering gear testi (main ve emergency) ve hydraulic bakımı",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 17,
  estimatedPages: 14,
  intro: `Dümen makinesi, manevra güvenliğinin temelidir; SOLAS V/26 main ve emergency steering testlerini zorunlu kılar. Hidrolik temizliği ve sızdırmazlık kritiktir. Bu bölüm steering gear test/bakımını ele alır.`,
  sources: ["SOLAS V/26", "Maker manuals"],
  chapters: [
    {
      heading: "1. Test",
      sections: [
        {
          subheading: "1.1 Departure ve emergency",
          paragraphs: [
            `Limandan ayrılmadan önce (12 saat içinde) main steering test edilir; emergency steering ve haberleşme yıllık tatbikatla doğrulanır. Hidrolik yağ temizliği izlenir.`,
          ],
          bullets: [`Departure test`, `Emergency steering yıllık`, `Hidrolik yağ temizliği`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Hidrolik enjeksiyon",
          paragraphs: [
            `Basınçlı hidrolik kaçağı cilt altına enjekte olabilir; bakımda basınç boşaltılır.`,
          ],
          callouts: [
            { type: "warning", title: "Hidrolik enjeksiyon", text: `Basınçlı jet ciddi yaralanma yapar; basınç boşaltılmadan müdahale edilmez.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Departure test yapıldı mı?`, `Emergency test edildi mi?`, `Hidrolik temiz mi?`, `Test log tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
