import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Sludge (atık yağ) yönetimi — slop tank, bertaraf ve ORB I kaydı",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 11,
  estimatedPages: 14,
  intro: `Sludge; separatör/filtre kaynaklı yağ atığıdır; sludge tank → incinerator veya reception facility yoluyla bertaraf edilir ve ORB I'a kaydedilir. Bu bölüm sludge yönetimini ele alır.`,
  sources: ["MARPOL Annex I", "MARPOL Annex VI (incinerator)"],
  chapters: [
    {
      heading: "1. Bertaraf",
      sections: [
        {
          subheading: "1.1 Incinerator/reception",
          paragraphs: [
            `Sludge sounding düzenli alınır; bertaraf incinerator veya kıyı reception ile yapılır. Incinerator flame failure trip doğru çalışmalıdır.`,
          ],
          bullets: [`Sludge sounding`, `Incinerator/reception`, `ORB I — Code C, I`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Sounding alındı mı?`, `Bertaraf doğru mu?`, `ORB I işlendi mi?`, `Reception makbuzu saklandı mı?`],
          paragraphs: [`Incinerator flame failure trip arızalıysa yakılmamış yakıt birikip patlama yapabilir.`],
        },
      ],
    },
  ],
};

export default content;
