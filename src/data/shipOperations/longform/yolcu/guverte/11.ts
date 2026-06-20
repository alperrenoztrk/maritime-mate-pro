import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Stabilite hesabı (yolcu ve bagaj ağırlığı dahil)",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 11,
  estimatedPages: 16,
  intro: `Yolcu gemilerinde stabilite; yolcu (genelde 75 kg/yolcu varsayımı), bagaj, kargo ve ballast dahil hesaplanır. Yolcuların bir borda toplanması (passenger crowding) heeling moment yaratır. Bu bölüm yolcu gemisi stabilitesini ele alır.`,
  sources: ["IS Code 2008 (passenger criteria)", "SOLAS II-1 (damage stability)"],
  chapters: [
    {
      heading: "1. Stabilite",
      sections: [
        {
          subheading: "1.1 Passenger crowding ve turning",
          paragraphs: [
            `IS Code yolcu gemileri için passenger crowding (yolcuların bir bordaya toplanması) ve turning kaynaklı heeling moment kriterleri içerir. Yolcu/bagaj ağırlığı standart varsayımla hesaba katılır.`,
          ],
          bullets: [`Yolcu (75 kg) + bagaj + kargo`, `Passenger crowding momenti`, `Turning momenti`, `Damage stability`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Yolcu/bagaj hesaba katıldı mı?`, `Crowding/turning kriterleri sağlandı mı?`, `Damage case kontrol edildi mi?`, `Çıktı saklandı mı?`],
          paragraphs: [`Yolcu gemilerinde stabilite kriterleri ek (crowding/turning) momentlerle daha katıdır.`],
        },
      ],
    },
  ],
};

export default content;
