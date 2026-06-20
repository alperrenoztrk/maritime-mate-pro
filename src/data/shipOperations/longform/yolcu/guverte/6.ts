import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Tender boat operasyonu (yolcu transferi)",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 6,
  estimatedPages: 14,
  intro: `Demir sahasında karaya yolcu transferi tender boat ile yapılır; güvenli iniş-binme, hava/deniz limitleri ve yolcu sayımı kritiktir. Bu bölüm tender operasyonunu ele alır.`,
  sources: ["SOLAS III", "Company tender operation procedures"],
  chapters: [
    {
      heading: "1. Operasyon",
      sections: [
        {
          subheading: "1.1 Güvenli transfer",
          paragraphs: [
            `Tender embarkation platformu/gangway güvenli kurulur; hava/deniz limitleri aşılırsa operasyon durdurulur. Her tender'da yolcu sayımı yapılır, can yeleği sağlanır.`,
          ],
          bullets: [`Embarkation platform güvenliği`, `Hava/deniz limitleri`, `Yolcu sayımı`, `Can yeleği`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Platform güvenli mi?`, `Hava/deniz limit içinde mi?`, `Sayım yapıldı mı?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Tender iniş-binme, özellikle yaşlı/PRM yolcularda en sık yaralanma noktasıdır.`],
        },
      ],
    },
  ],
};

export default content;
