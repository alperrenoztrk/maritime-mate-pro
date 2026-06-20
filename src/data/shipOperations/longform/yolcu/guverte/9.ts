import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Limana yanaşma ve ayrılma operasyonu",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 9,
  estimatedPages: 14,
  intro: `Büyük yolcu gemilerinin yanaşma/ayrılması; pilot, tug ve thruster koordinasyonu, yüksek windage ve kalabalık liman trafiği yönetimini gerektirir. Bu bölüm yanaşma/ayrılmayı ele alır.`,
  sources: ["OCIMF MEG4", "Bridge Procedures Guide (ICS)"],
  chapters: [
    {
      heading: "1. Manevra",
      sections: [
        {
          subheading: "1.1 Tug/thruster ve windage",
          paragraphs: [
            `Tug, bow/stern thruster ve (varsa) azipod ile manevra yapılır; cruise gemilerinin büyük yan yüzeyi rüzgarda kritiktir. Mooring güvenli yönetilir.`,
          ],
          bullets: [`Tug/thruster/azipod`, `Windage yönetimi`, `Mooring + snap-back`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Manevra planı paylaşıldı mı?`, `Tug/thruster hazır mı?`, `Mooring güvenli mi?`, `Bell book tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
