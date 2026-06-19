import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Fuel oil transferi ve trim/stability düzenlemesi",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 13,
  estimatedPages: 14,
  intro: `Yakıt tankları arası transfer (settling/service/storage), tüketim ve trim/stability dengesi için yapılır; güverte ile koordineli yürütülür. Yanlış transfer liste/trim ve overflow yaratır. Bu bölüm yakıt transferini ele alır.`,
  sources: ["Company procedures", "Stability booklet"],
  chapters: [
    {
      heading: "1. Transfer",
      sections: [
        {
          subheading: "1.1 Line-up ve izleme",
          paragraphs: [
            `Transfer öncesi valf line-up doğrulanır; tank seviyeleri ve overflow alarmları izlenir. Büyük transferler trim/liste açısından güverte ile koordine edilir.`,
          ],
          bullets: [`Valf line-up`, `Seviye/overflow izleme`, `Trim/liste koordinasyonu`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Line-up doğru mu?`, `Overflow alarmı çalışıyor mu?`, `Trim/liste yönetildi mi?`, `Kayıt tutuldu mu?`],
          paragraphs: [`İçerideki transfer dahi yanlış valfle tank taşması yapabilir; line-up atlanmaz.`],
        },
      ],
    },
  ],
};

export default content;
