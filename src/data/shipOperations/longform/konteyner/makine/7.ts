import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Fuel oil separator (purifier), strainer ve filtre bakımı",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 7,
  estimatedPages: 14,
  intro: `Purifier ve filtreler, yakıttaki su ve katıları uzaklaştırarak enjeksiyon ekipmanını korur; disc temizliği, gravity disc seçimi ve ΔP izleme şarttır. Bu bölüm separatör/filtre bakımını ele alır.`,
  sources: ["ISO 8217", "Separator maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Disc ve ΔP",
          paragraphs: [
            `Purifier disc'leri çalışma saatine göre temizlenir; gravity disc yakıt yoğunluğuna göre seçilir. Filtre ΔP izlenir, auto back-flush doğrulanır.`,
          ],
          bullets: [`Disc temizliği`, `Gravity disc seçimi`, `Filter ΔP / back-flush`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Hot HFO",
          paragraphs: [
            `Sıcak HFO sıçraması yanık yapar; izolasyon ve PPE sağlanır.`,
          ],
          callouts: [
            { type: "warning", title: "Hot HFO", text: `Sıcak yakıt yanığı ciddidir; bakım öncesi izolasyon ve PPE atlanmaz.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Disc temizlendi mi?`, `Gravity disc doğru mu?`, `ΔP normal mi?`, `PMS kaydı tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
