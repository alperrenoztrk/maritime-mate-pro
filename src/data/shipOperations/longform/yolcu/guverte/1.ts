import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Güvenlik brifingleri ve video yayını",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 1,
  estimatedPages: 14,
  intro: `Sefer öncesi güvenlik brifingi (safety briefing); yolculara can yeleği kullanımı, muster station ve alarm sinyallerini öğretir. Kabin TV ve amfi video ile desteklenir. Bu bölüm güvenlik brifingini ele alır.`,
  sources: ["SOLAS III/19", "SOLAS III/8"],
  chapters: [
    {
      heading: "1. Brifing",
      sections: [
        {
          subheading: "1.1 İçerik ve yayın",
          paragraphs: [
            `Brifing; alarm sinyalleri, muster station, can yeleği giyme ve tahliye yolunu içerir; kabin TV ve genel anons/video ile pekiştirilir. Kalkıştan kısa süre sonra yapılır.`,
          ],
          bullets: [`Alarm sinyalleri`, `Muster station yönlendirme`, `Can yeleği gösterimi`, `Çok dilli yayın`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Brifing yapıldı mı?`, `Video yayınlandı mı?`, `Çok dilli mi?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Yolcular acil durumda ilk kez öğrenmemeli; brifing erken ve anlaşılır olmalıdır.`],
        },
      ],
    },
  ],
};

export default content;
