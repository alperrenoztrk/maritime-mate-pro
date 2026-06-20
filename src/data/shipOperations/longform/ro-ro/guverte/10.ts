import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Limana yanaşma ve ayrılma operasyonu",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 10,
  estimatedPages: 14,
  intro: `Ro-Ro/feribotlar sık ve hızlı liman dönüşü yapar; yanaşma/ayrılma manevrası, link-span/rampa hizalaması ve mooring yönetimini içerir. Bu bölüm yanaşma/ayrılmayı ele alır.`,
  sources: ["OCIMF MEG4", "Bridge Procedures Guide (ICS)"],
  chapters: [
    {
      heading: "1. Manevra",
      sections: [
        {
          subheading: "1.1 Link-span hizalama",
          paragraphs: [
            `Rampa, rıhtım link-span ile hizalanacak şekilde yanaşılır; bow thruster ve tug (gerekirse) kullanılır. Hızlı dönüşlerde dahi mooring güvenliği korunur.`,
          ],
          bullets: [`Link-span/rampa hizalama`, `Bow thruster/tug`, `Mooring güvenliği`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Hizalama doğru mu?`, `Manevra planı paylaşıldı mı?`, `Mooring güvenli mi?`, `Bell book tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
