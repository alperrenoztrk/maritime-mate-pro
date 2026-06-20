import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Seyir vardiyası tutma ve logbook",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 27,
  estimatedPages: 14,
  intro: `Seyir vardiyası STCW Reg. VIII/2 ve COLREG'e uygun yürütülür; look-out, trafik değerlendirme, Master'ı çağırma kriterleri ve logbook disiplini vardiya güvenliğinin esasıdır. Bu bölüm vardiya tutmayı ele alır.`,
  sources: ["STCW Reg. VIII/2", "COLREG 1972", "Bridge Procedures Guide"],
  chapters: [
    {
      heading: "1. Vardiya",
      sections: [
        {
          subheading: "1.1 Look-out ve handover",
          paragraphs: [
            `OOW sürekli look-out yapar; radar/ARPA ile risk değerlendirir, COLREG uygular. Rest hours ve net handover sağlanır; şüphede Master çağrılır.`,
          ],
          bullets: [`Sürekli look-out`, `COLREG manevra`, `Rest hours`, `Net handover`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Look-out yeterli mi?`, `COLREG uygulanıyor mu?`, `Rest hours uyumlu mu?`, `Logbook güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
