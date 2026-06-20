import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Kazan (boiler) bakımı ve buhar üretimi",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 10,
  estimatedPages: 14,
  intro: `Yolcu gemilerinde buhar; ısıtma, mutfak, çamaşırhane ve su ısıtma için yoğun kullanılır; kazan su kalitesi, blow-down ve safety valve disiplini kritiktir. Bu bölüm kazan bakımını ele alır.`,
  sources: ["Class Rules — Boilers", "Boiler maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Su kimyası/soot",
          paragraphs: [`Günlük blow-down ve su kimyası testleri yapılır; soot blowing kurum birikimini önler. Safety valve yıllık test edilir.`],
          bullets: [`Blow-down`, `Su kimyası`, `Soot blowing`, `Safety valve test`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Blow-down yapıldı mı?`, `Su kimyası uygun mu?`, `Soot blowing yapıldı mı?`, `Log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
