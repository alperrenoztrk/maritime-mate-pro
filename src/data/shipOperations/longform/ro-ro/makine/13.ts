import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Kompresör ve hava sistemi bakımı",
  shipType: "ro-ro",
  dept: "makine",
  opIndex: 13,
  estimatedPages: 12,
  intro: `Starting air ve control air kompresörleri; drain, intercooler ve safety valve bakımı ile güvenli çalışır. Sık manevrada yeterli starting air kritiktir. Bu bölüm kompresör bakımını ele alır.`,
  sources: ["Class Rules", "Compressor maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Drain/intercooler/safety valve",
          paragraphs: [`Otomatik drain, intercooler temizliği ve safety valve testi yapılır; air bottle periyodik muayeneye tabidir.`],
          bullets: [`Drain + intercooler`, `Safety valve test`, `Air bottle inspection`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Drain/intercooler yapıldı mı?`, `Safety valve test edildi mi?`, `Air bottle güncel mi?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Sık manevrada yetersiz starting air ana makineyi başlatamama riskidir.`],
        },
      ],
    },
  ],
};

export default content;
