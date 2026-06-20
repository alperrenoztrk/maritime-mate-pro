import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yolcu manifesto hazırlama ve güncelleme",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 23,
  estimatedPages: 12,
  intro: `Yolcu manifesti; gemideki kişilerin gerçek zamanlı listesi ve özel ihtiyaç (special needs) işaretlerini içerir. Acil durumda arama-kurtarmanın temelidir. Bu bölüm manifest yönetimini ele alır.`,
  sources: ["SOLAS III", "EU Directive 98/41"],
  chapters: [
    {
      heading: "1. Manifest",
      sections: [
        {
          subheading: "1.1 Gerçek zamanlı liste",
          paragraphs: [
            `Embarkation/debarkation ile manifest gerçek zamanlı güncellenir; PRM/special needs işaretlenir. Kıyıdaki yetkili kopya ile tutarlılık sağlanır.`,
          ],
          bullets: [`Gerçek zamanlı güncelleme`, `Special needs flag`, `Kıyı kopya tutarlılığı`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Manifest güncel mi?`, `Special needs işaretli mi?`, `Sayım doğru mu?`, `Kıyı kopyası tutarlı mı?`],
        },
      ],
    },
  ],
};

export default content;
