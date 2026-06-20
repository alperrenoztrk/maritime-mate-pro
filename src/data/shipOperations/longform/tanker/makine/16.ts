import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yakıt separator ve filtre bakımı",
  shipType: "tanker",
  dept: "makine",
  opIndex: 16,
  estimatedPages: 14,
  intro: `Purifier (separatör) ve filtreler, yakıttaki su ve katı kirleticileri uzaklaştırarak enjeksiyon ekipmanını korur. Düzenli disc temizliği ve ΔP izleme şarttır. Bu bölüm separatör/filtre bakımını ele alır.`,
  sources: ["ISO 8217", "Separator maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Disc temizliği ve ΔP",
          paragraphs: [
            `Purifier disc'leri belirli çalışma saatinde temizlenir; filtrelerde auto back-flush ve ΔP izlenir. Sıcak HFO ile çalışırken sıçrama/yanık riski vardır.`,
          ],
          bullets: [
            `Disc temizliği (çalışma saatine göre)`,
            `Filter ΔP / auto back-flush`,
            `Gravity disc doğru seçimi`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Hot HFO",
          paragraphs: [
            `Sıcak HFO açığa çıkarsa ciddi yanık yapar; bakım öncesi izolasyon ve PPE sağlanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hot HFO splash",
              text: `Sıcak yakıt sıçraması yanık yapar; izolasyon ve PPE atlanmaz.`,
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
            `Disc temizlendi mi?`,
            `Filter ΔP normal mi?`,
            `İzolasyon/PPE sağlandı mı?`,
            `Purifier overhaul kaydı tutuldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
