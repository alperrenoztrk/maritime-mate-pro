import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "MOB (Man Overboard) tatbikatı",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 4,
  estimatedPages: 14,
  intro: `Yolcu gemilerinde denize adam düşmesi (MOB) riski yüksektir; Williamson/Anderson/Scharnov dönüşleri ve rescue boat operasyonu düzenli tatbik edilir. Bu bölüm MOB tatbikatını ele alır.`,
  sources: ["SOLAS III/19", "IAMSAR Manual"],
  chapters: [
    {
      heading: "1. Tatbikat",
      sections: [
        {
          subheading: "1.1 Dönüş manevrası ve rescue boat",
          paragraphs: [
            "On a man-overboard (MOB) alarm, raise the alarm, mark the position and maintain visual contact with dedicated lookouts. The bridge selects a recovery manoeuvre appropriate to when the casualty was seen, sea room, traffic and ship response. Prepare the approved recovery equipment and coordinate communications; a named turn is not automatically suitable for every situation.",
          ],
          bullets: [`MOB pozisyon işaretleme (MOB butonu)`, `Dönüş manevrası`, `Rescue boat`, `Lookout/haberleşme`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`MOB prosedürü uygulandı mı?`, `Dönüş manevrası yapıldı mı?`, `Rescue boat hazır mı?`, `Drill log tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
