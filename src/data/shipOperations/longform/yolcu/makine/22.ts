import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Emergency generator ve UPS sistemi testi",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 22,
  estimatedPages: 14,
  intro: `Emergency generator ve UPS, black-out durumunda kritik yükleri (seyir, haberleşme, acil aydınlatma, tahliye sistemleri) besler; SOLAS gereği periyodik test edilir. Bu bölüm acil güç testini ele alır.`,
  sources: ["SOLAS II-1 Reg. 42/43", "Maker manuals"],
  chapters: [
    {
      heading: "1. Test",
      sections: [
        {
          subheading: "1.1 Otomatik başlatma ve yük",
          paragraphs: [
            `Emergency generator otomatik başlatma (black-out simülasyonu) ile test edilir; kritik yükleri belirlenen sürede beslemesi doğrulanır. UPS bataryaları ve otonomi süresi kontrol edilir.`,
          ],
          bullets: [`Otomatik start testi`, `Kritik yük besleme`, `UPS batarya/otonomi`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Emergency gen otomatik başlıyor mu?`, `Kritik yükler besleniyor mu?`, `UPS otonomisi yeterli mi?`, `Test log tutuldu mu?`],
          paragraphs: [`Acil güç, tahliye sistemlerinin (aydınlatma, anons) çalışması için hayatidir.`],
        },
      ],
    },
  ],
};

export default content;
