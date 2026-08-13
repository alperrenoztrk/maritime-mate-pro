import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Steering gear bakımı ve testi",
  shipType: "tanker",
  dept: "makine",
  opIndex: 18,
  estimatedPages: 14,
  intro: `Dümen makinesi (steering gear), manevra güvenliğinin temelidir; SOLAS V/26 main ve emergency steering testlerini zorunlu kılar. Hidrolik yağ temizliği ve sızdırmazlık kritiktir. Bu bölüm steering gear bakımını ele alır.`,
  sources: ["SOLAS V/26 (steering gear)", "Maker manuals"],
  chapters: [
    {
      heading: "1. Test Disiplini",
      sections: [
        {
          subheading: "1.1 Departure ve emergency test",
          paragraphs: [
            `Limandan ayrılmadan önce (12 saat içinde) main steering test edilir; emergency steering ve haberleşme en az üç ayda bir yapılan acil dümen tatbikatıyla doğrulanır (SOLAS V/26.4). Hidrolik yağ temizliği (ISO 4406) izlenir.`,
          ],
          bullets: [
            `Departure test (12 saat içinde)`,
            `Emergency steering yıllık`,
            `Hidrolik yağ temizliği`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Hidrolik enjeksiyon",
          paragraphs: [
            `Yüksek basınçlı hidrolik kaçağı cilt altına enjeksiyon yapabilir; bakımda basınç boşaltılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hidrolik enjeksiyon",
              text: `Basınçlı hidrolik jeti ciddi yaralanma yapar; bakım öncesi sistem basıncı boşaltılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `Departure test yapıldı mı?`,
            `Emergency steering test edildi mi?`,
            `Hidrolik yağ temizliği uygun mu?`,
            `Steering Gear Test Log dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
