import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Abandon ship tatbikatı",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 5,
  estimatedPages: 16,
  intro: `Gemiyi terk (abandon ship) tatbikatı; lifeboat/life raft indirme, muster ve büyük yolcu sayısının tahliyesini kapsar. Tahliye süresi SOLAS kriterlerine uymalıdır. Bu bölüm abandon ship tatbikatını ele alır.`,
  sources: ["SOLAS III/19", "LSA Code", "MSC.1/Circ.1533 (evacuation analysis)"],
  chapters: [
    {
      heading: "1. Tatbikat",
      sections: [
        {
          subheading: "1.1 Filika/sal ve muster",
          paragraphs: [
            `Lifeboat ve life raft indirme/launch, muster ve yolcu yönlendirme tatbik edilir; davit, brake ve release gear test edilir. Tahliye süresi izlenir.`,
          ],
          bullets: [`Lifeboat/life raft launch`, `Muster + yönlendirme`, `Davit/release gear`, `Tahliye süresi`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Filika güvenliği",
          paragraphs: [
            `Lifeboat drill'lerinde on-load release gear kaynaklı kazalar geçmişte ölümlere yol açtı; maker prosedürü ve fall preventer kullanımına dikkat edilir.`,
          ],
          callouts: [
            { type: "warning", title: "Release gear", text: `Lifeboat indirme tatbikatları release gear hatalarına karşı dikkatle yapılır; can kaybı geçmişte yaşanmıştır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Filika/sal indirildi mi?`, `Release gear güvenli mi?`, `Muster yapıldı mı?`, `Drill log tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
