import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Main air compressor ve control air compressor bakımı",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 6,
  estimatedPages: 12,
  intro: `Starting air ve control air kompresörleri; drain, intercooler ve safety valve bakımı ile güvenli çalışır. Yağ taşıması ve hava şişesi muayenesi kritiktir. Bu bölüm kompresör bakımını ele alır.`,
  sources: ["Class Rules", "Compressor maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Drain/intercooler/safety valve",
          paragraphs: [
            `Otomatik drain, intercooler temizliği ve safety valve testi yapılır; air bottle periyodik iç muayeneye tabidir. Oil carry-over yangın/patlama riski yaratır.`,
          ],
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
          paragraphs: [`Yetersiz starting air manevrada ana makineyi başlatamama riskidir.`],
        },
      ],
    },
  ],
};

export default content;
