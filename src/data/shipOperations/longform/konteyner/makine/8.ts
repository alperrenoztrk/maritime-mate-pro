import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ballast Water Treatment System (BWTS) operasyonu — BWM Convention kaydı",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 8,
  estimatedPages: 14,
  intro: `BWTS, BWM Convention D-2 standardına uyumu sağlar; UV veya electrochlorination tipleri yaygındır. Electrochlorination'da H2 birikimi patlama riski yaratır. Bu bölüm BWTS operasyonunu ele alır.`,
  sources: ["BWM Convention (D-2)", "BWTS maker manuals"],
  chapters: [
    {
      heading: "1. Operasyon",
      sections: [
        {
          subheading: "1.1 Doz ve kayıt",
          paragraphs: [
            `Pre-flow testi sonrası TRO/UV dozu izlenir; ballast/deballast sırasında sistem aktif çalışır ve BWRB'ye kaydedilir.`,
          ],
          bullets: [`Pre-flow test`, `TRO/UV doz`, `BWRB kaydı`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 H2 riski",
          paragraphs: [
            `Electrochlorination'da H2 birikimi ventilasyon olmazsa patlama yapar; gaz izleme ve venting kritiktir.`,
          ],
          callouts: [
            { type: "warning", title: "H2 birikimi", text: `Yetersiz ventilasyonda H2 patlayıcı atmosfer yapar.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Pre-flow test yapıldı mı?`, `Doz normal mi?`, `H2 ventilasyonu yeterli mi?`, `BWRB güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
