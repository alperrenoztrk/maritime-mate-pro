import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Exhaust gas cleaning system (EGCS/Scrubber) operasyon ve kayıt",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 14,
  estimatedPages: 16,
  intro: `Scrubber (EGCS), egzozdaki SOx'i temizleyerek MARPOL Annex VI kükürt limitine uyumu sağlar; wash water izleme ve bölgesel mod kısıtları kritiktir. Bu bölüm scrubber operasyonunu ele alır.`,
  sources: ["MARPOL Annex VI", "IMO 2020 sulphur cap", "EGCS guidelines"],
  chapters: [
    {
      heading: "1. Operasyon",
      sections: [
        {
          subheading: "1.1 Wash water ve mod",
          paragraphs: [
            `Wash water pH/PAH/türbidite monitör edilir; open-loop kısıtlı bölgelerde closed-loop veya uyumlu yakıta geçilir. EGC Record Book tutulur.`,
          ],
          bullets: [`Wash water monitör`, `Bölgesel mod (open/closed)`, `EGC Record Book`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Wash water limit içinde mi?`, `Bölgesel mod doğru mu?`, `EGC Record Book güncel mi?`, `Yedek uyumlu yakıt var mı?`],
          paragraphs: [`Scrubber arızasında kısa sürede uyumlu yakıta geçiş planı hazır olmalıdır.`],
        },
      ],
    },
  ],
};

export default content;
