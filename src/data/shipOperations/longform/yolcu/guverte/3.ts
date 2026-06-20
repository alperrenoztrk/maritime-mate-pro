import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yangın tatbikatı planlaması ve yürütme",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 3,
  estimatedPages: 16,
  intro: `Yolcu gemilerinde yangın, en yüksek risklerden biridir; aylık fire drill ve kabin/galley/engine room senaryoları düzenli çalışılır. Yolcu yönlendirme ve bölmelendirme kritiktir. Bu bölüm yangın tatbikatını ele alır.`,
  sources: ["SOLAS III/19", "SOLAS II-2", "FSS Code"],
  chapters: [
    {
      heading: "1. Tatbikat",
      sections: [
        {
          subheading: "1.1 Senaryolar",
          paragraphs: [
            `Galley, kabin, public space ve makine dairesi yangın senaryoları çalışılır; yangın ekibi müdahalesi, bölme kapatma (fire doors), sprinkler ve yolcu yönlendirme tatbik edilir.`,
          ],
          bullets: [`Galley/kabin/public space senaryoları`, `Fire team müdahale`, `Fire doors/sprinkler`, `Yolcu yönlendirme`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Aylık fire drill yapıldı mı?`, `Farklı senaryolar dahil mi?`, `Bölmelendirme test edildi mi?`, `Drill log + debrief tutuldu mu?`],
          paragraphs: [`Yolcu gemisinde yangının yayılması paniğe ve toplu kayba yol açabilir; bölmelendirme ve hızlı müdahale esastır.`],
        },
      ],
    },
  ],
};

export default content;
