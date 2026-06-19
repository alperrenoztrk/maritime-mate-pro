import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ballast pompası bakımı",
  shipType: "tanker",
  dept: "makine",
  opIndex: 4,
  estimatedPages: 14,
  intro: `Segregated ballast (SBT) pompaları, kargo operasyonuna paralel ballast yönetiminin makine tarafıdır. Seal, bearing ve kapasite bakımı PMS'e göre yapılır. Bu bölüm ballast pompası bakımını ele alır.`,
  sources: ["MARPOL Annex I Reg. 18 (SBT)", "Pump maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Seal/bearing ve kapasite",
          paragraphs: [
            `Seal ve bearing PMS'e göre yenilenir; kapasite testi ile performans doğrulanır. SBT'nin yağ ile karışmaması için hat ayrımı korunur.`,
          ],
          bullets: [
            `Seal/bearing PMS değişimi`,
            `Kapasite testi`,
            `Hat/valf ayrımı (kontaminasyon önleme)`,
          ],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [
            `Seal/bearing yapıldı mı?`,
            `Kapasite uygun mu?`,
            `SBT ayrımı korundu mu?`,
            `PMS report dolduruldu mu?`,
          ],
          paragraphs: [
            `SBT kontaminasyonu ağır MARPOL ihlalidir; bakım sırasında hat ayrımı titizlikle korunur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
