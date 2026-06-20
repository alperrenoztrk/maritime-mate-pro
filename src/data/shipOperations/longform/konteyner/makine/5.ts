import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "LT/HT soğutma suyu sistemi bakımı ve antifreeze kontrolü",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 5,
  estimatedPages: 12,
  intro: `LT/HT tatlı su soğutma devreleri, ana makine ve yardımcıların ısı yükünü taşır; kimyasal şartlandırma ve (gerekli rotalarda) antifreeze kontrolü korozyon ve donmayı önler. Bu bölüm soğutma suyu bakımını ele alır.`,
  sources: ["Maker manuals", "Cooling water treatment guidelines"],
  chapters: [
    {
      heading: "1. Şartlandırma",
      sections: [
        {
          subheading: "1.1 Su kimyası ve antifreeze",
          paragraphs: [
            `Nitrit/pH/kloride haftalık test edilir; inhibitör dozajı korunur. Soğuk iklim rotalarında ilgili devrelerde antifreeze konsantrasyonu kontrol edilir.`,
          ],
          bullets: [`Su kimyası testleri`, `İnhibitör dozajı`, `Antifreeze (gerekirse)`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Su kimyası uygun mu?`, `İnhibitör dozu doğru mu?`, `Antifreeze yeterli mi?`, `Cooling log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
