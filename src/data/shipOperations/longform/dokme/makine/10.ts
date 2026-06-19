import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "MARPOL uyum kontrolü",
  shipType: "dokme",
  dept: "makine",
  opIndex: 10,
  estimatedPages: 14,
  intro: `Makine dairesi operasyonlarının yasal kayıtları (ORB I, MARPOL VI) doğru kodlarla, zamanında ve Master imzalı tutulmalıdır. Tutarsızlık kriminal sorumluluk doğurur. Bu bölüm MARPOL kayıt uyumunu ele alır.`,
  sources: ["MARPOL Annex I", "MARPOL Annex VI"],
  chapters: [
    {
      heading: "1. Kayıt Disiplini",
      sections: [
        {
          subheading: "1.1 Doğru kod/imza",
          paragraphs: [`Operasyonlar doğru kodla, zamanında işlenir; her sayfa Master imzalı olur. Kayıtlar fiili durumla tutarlı olmalıdır.`],
          bullets: [`Doğru kod`, `Zamanında giriş`, `Master imzası`, `Fiili durumla tutarlılık`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Kodlar doğru mu?`, `Girişler zamanında mı?`, `İmzalar tam mı?`, `Tutarlı mı?`],
          callouts: [
            { type: "warning", title: "Kriminal sorumluluk", text: `Yanlış kayıt bazı ülkelerde kriminaldir.` },
          ],
        },
      ],
    },
  ],
};

export default content;
