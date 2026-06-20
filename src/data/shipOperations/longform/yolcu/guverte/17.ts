import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Güverte genel bakım ve temizliği",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 17,
  estimatedPages: 12,
  intro: `Yolcu gemilerinde yolcu görünür alanların bakımı ve temizliği, hem güvenlik (slip/fall) hem misafir memnuniyeti açısından önemlidir. Bu bölüm güverte bakım/temizliğini ele alır.`,
  sources: ["Company maintenance procedures", "Public health (sanitation)"],
  chapters: [
    {
      heading: "1. Bakım/Temizlik",
      sections: [
        {
          subheading: "1.1 Güvenlik ve görünüm",
          paragraphs: [
            `Yolcu alanları, kaymaz yüzey ve korkuluk güvenliği gözetilerek bakılır; ıslak zeminler işaretlenir. Boya/korozyon bakımı düzenli yapılır.`,
          ],
          bullets: [`Slip/fall önleme`, `Korkuluk güvenliği`, `Boya/korozyon`, `Hijyen`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Yüzeyler güvenli mi?`, `Islak zemin işaretli mi?`, `Korkuluklar sağlam mı?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
