import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Kazan ve ısı sistemi bakımı",
  shipType: "dokme",
  dept: "makine",
  opIndex: 16,
  estimatedPages: 14,
  intro: `Auxiliary boiler ve ısı sistemi; su kalitesi, blow-down, soot blowing ve safety valve disiplini ile güvenli çalışır. Bu bölüm kazan bakımını ele alır.`,
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
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Soot fire",
          paragraphs: [`Kurum birikimi soot fire riski yaratır; soot blowing düzenli yapılır.`],
          callouts: [
            { type: "warning", title: "Soot fire", text: `İhmal edilen soot baca/kazan yangını yapar.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Blow-down yapıldı mı?`, `Su kimyası uygun mu?`, `Soot blowing yapıldı mı?`, `Log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
