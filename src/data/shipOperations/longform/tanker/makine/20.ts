import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ballast su arıtma sistemi (BWTS) operasyonu",
  shipType: "tanker",
  dept: "makine",
  opIndex: 20,
  estimatedPages: 16,
  intro: `Ballast Water Treatment System (BWTS), BWM Convention D-2 standardına uyumu sağlar; UV veya electrochlorination tipleri yaygındır. Electrochlorination'da hidrojen (H2) birikimi patlama riski yaratır. Bu bölüm BWTS operasyonunu ele alır.`,
  sources: ["BWM Convention (D-2)", "BWTS maker manuals"],
  chapters: [
    {
      heading: "1. Operasyon",
      sections: [
        {
          subheading: "1.1 Doz ve izleme",
          paragraphs: [
            `Pre-flow testi sonrası TRO (total residual oxidant) veya UV dozu izlenir; ballast/deballast sırasında sistem aktif çalışır. İşlem BWRB'ye kaydedilir.`,
          ],
          bullets: [
            `Pre-flow test`,
            `TRO/UV doz izleme`,
            `BWRB kaydı`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 H2 patlama riski",
          paragraphs: [
            `Electrochlorination ünitelerinde açığa çıkan hidrojen, uygun ventilasyon olmazsa patlayıcı atmosfer yapar; venting ve gaz izleme kritiktir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "H2 birikimi",
              text: `Electrochlorination'da H2 birikimi patlama yapar; ventilasyon ve gaz izleme atlanmaz.`,
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
            `Pre-flow test yapıldı mı?`,
            `Doz izleme normal mi?`,
            `H2 ventilasyonu yeterli mi?`,
            `BWRB güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
