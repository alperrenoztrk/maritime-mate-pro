import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Atık yağ yönetimi",
  shipType: "ro-ro",
  dept: "makine",
  opIndex: 10,
  estimatedPages: 14,
  intro: `Sludge; separatör/filtre kaynaklı yağ atığıdır; incinerator veya reception facility ile bertaraf edilir ve ORB I'a kaydedilir. Bu bölüm sludge yönetimini ele alır.`,
  sources: ["MARPOL Annex I", "MARPOL Annex VI (incinerator)"],
  chapters: [
    {
      heading: "1. Bertaraf",
      sections: [
        {
          subheading: "1.1 Incinerator/reception",
          paragraphs: [`Sludge sounding alınır; bertaraf incinerator veya kıyı reception ile yapılır. Incinerator flame failure trip doğru çalışmalıdır.`],
          bullets: [`Sounding`, `Incinerator/reception`, `ORB I — Code C, I`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Sounding alındı mı?`, `Bertaraf doğru mu?`, `ORB I işlendi mi?`, `Makbuz saklandı mı?`],
        },
      ],
    },
  ],
};

export default content;
