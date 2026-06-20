import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Soğutma suyu sistemi bakımı",
  shipType: "dokme",
  dept: "makine",
  opIndex: 11,
  estimatedPages: 12,
  intro: `LT/HT tatlı su soğutma devreleri, ana makine ve yardımcıların ısı yükünü taşır; kimyasal şartlandırma korozyon ve kireçlenmeyi önler. Bu bölüm soğutma suyu bakımını ele alır.`,
  sources: ["Maker manuals", "Cooling water treatment guidelines"],
  chapters: [
    {
      heading: "1. Şartlandırma",
      sections: [
        {
          subheading: "1.1 Su kimyası",
          paragraphs: [`Nitrit/pH/kloride haftalık test edilir; inhibitör dozu korunur. Cooler temizliği ısı transferini korur.`],
          bullets: [`Su kimyası testleri`, `İnhibitör dozajı`, `Cooler temizliği`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Su kimyası uygun mu?`, `İnhibitör dozu doğru mu?`, `Cooler temiz mi?`, `Log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
