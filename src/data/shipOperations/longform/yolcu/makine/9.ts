import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Soğuk depo (provision) sistemi bakımı",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 9,
  estimatedPages: 14,
  intro: `Yolcu gemilerinde büyük provision (gıda) soğuk depoları gıda güvenliğinin temelidir; refrigerant sistemleri, sıcaklık izleme ve hijyen kritiktir. Bu bölüm soğuk depo bakımını ele alır.`,
  sources: ["Maker manuals", "Food safety (sanitation) standards"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Refrigerant ve sıcaklık",
          paragraphs: [
            `Soğutma kompresörleri ve refrigerant sistemi bakıma alınır; depo sıcaklıkları sürekli izlenir ve alarmlı tutulur. Hijyen ve defrost programı uygulanır.`,
          ],
          bullets: [`Kompresör/refrigerant bakımı`, `Sıcaklık izleme + alarm`, `Defrost + hijyen`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Sıcaklıklar normal mi?`, `Alarmlar çalışıyor mu?`, `Refrigerant kaçağı var mı?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Soğuk zincir kaybı gıda kaynaklı salgın (norovirus vb.) riskini artırır.`],
        },
      ],
    },
  ],
};

export default content;
