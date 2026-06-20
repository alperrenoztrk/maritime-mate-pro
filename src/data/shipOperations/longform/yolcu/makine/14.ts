import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yakıt separator ve filtre bakımı",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 14,
  estimatedPages: 14,
  intro: `Purifier ve filtreler, yakıttaki su ve katıları uzaklaştırarak enjeksiyon ekipmanını korur; disc temizliği ve ΔP izleme şarttır. Bu bölüm separatör/filtre bakımını ele alır.`,
  sources: ["ISO 8217", "Separator maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Disc ve ΔP",
          paragraphs: [`Disc'ler çalışma saatine göre temizlenir; gravity disc doğru seçilir; filtre ΔP izlenir.`],
          bullets: [`Disc temizliği`, `Gravity disc seçimi`, `Filter ΔP`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Hot HFO/kontrol",
          paragraphs: [`Sıcak HFO sıçraması yanık yapar; izolasyon ve PPE sağlanır.`],
          callouts: [
            { type: "warning", title: "Hot HFO", text: `Bakım öncesi izolasyon ve PPE atlanmaz.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Disc temizlendi mi?`, `ΔP normal mi?`, `PPE kullanıldı mı?`, `PMS kaydı tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
