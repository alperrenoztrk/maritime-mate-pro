import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Soğutma suyu sistemi bakımı",
  shipType: "tanker",
  dept: "makine",
  opIndex: 17,
  estimatedPages: 12,
  intro: `LT/HT tatlı su soğutma devreleri, ana makine ve yardımcıların ısı yükünü taşır; kimyasal şartlandırma korozyon ve kireçlenmeyi önler. Bu bölüm soğutma suyu bakımını ele alır.`,
  sources: ["Maker manuals", "Cooling water treatment guidelines"],
  chapters: [
    {
      heading: "1. Şartlandırma",
      sections: [
        {
          subheading: "1.1 Su kimyası",
          paragraphs: [
            `Nitrit/pH/kloride değerleri haftalık test edilir; uygun inhibitör dozu korozyonu önler. Cooler temizliği ısı transferini korur.`,
          ],
          bullets: [
            `Nitrit/pH/kloride haftalık test`,
            `İnhibitör dozajı`,
            `Cooler temizliği`,
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
            `Su kimyası uygun mu?`,
            `İnhibitör dozu doğru mu?`,
            `Cooler temiz mi?`,
            `Cooling water log güncel mi?`,
          ],
          paragraphs: [
            `Bakımda CIP kimyasalları kullanılırsa SDS'e göre PPE şarttır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
