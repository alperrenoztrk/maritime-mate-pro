import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ballast su arıtma sistemi (BWTS) operasyonu",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 17,
  estimatedPages: 14,
  intro: `BWTS, BWM Convention D-2 standardına uyumu sağlar; UV veya electrochlorination tipleri yaygındır. Electrochlorination'da H2 patlama riski yaratır. Bu bölüm BWTS operasyonunu ele alır.`,
  sources: ["BWM Convention (D-2)", "BWTS maker manuals"],
  chapters: [
    {
      heading: "1. Operasyon",
      sections: [
        {
          subheading: "1.1 Doz ve kayıt",
          paragraphs: [`Pre-flow testi sonrası TRO/UV doz izlenir; ballast/deballast sırasında aktif çalışır ve BWRB'ye kaydedilir.`],
          bullets: [`Pre-flow test`, `TRO/UV doz`, `BWRB kaydı`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 H2 riski",
          paragraphs: [`Electrochlorination'da H2 birikimi ventilasyon olmazsa patlar; gaz izleme kritiktir.`],
          callouts: [
            { type: "warning", title: "H2", text: `Yetersiz ventilasyonda H2 patlayıcı atmosfer yapar.` },
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
