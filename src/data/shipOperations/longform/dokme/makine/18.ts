import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Emisyon takibi (CII/SEEMP)",
  shipType: "dokme",
  dept: "makine",
  opIndex: 18,
  estimatedPages: 16,
  intro: `MARPOL Annex VI; CII (Carbon Intensity Indicator) ve SEEMP ile karbon yoğunluğunu yönetir; IMO DCS kapsamında yakıt tüketimi izlenir. Bu bölüm enerji verimliliği yönetimini ele alır.`,
  sources: ["MARPOL Annex VI", "IMO DCS / CII / SEEMP Part III"],
  chapters: [
    {
      heading: "1. İzleme ve Hesap",
      sections: [
        {
          subheading: "1.1 CII rating",
          paragraphs: [`Yakıt/mesafe ile yıllık CII hesaplanır (A-E); SEEMP Part III iyileştirme önlemlerini tanımlar (hız optimizasyonu, hull/propeller cleaning).`],
          bullets: [`DCS izleme`, `Yıllık CII rating`, `SEEMP önlemleri`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`DCS verisi doğru mu?`, `CII hesaplandı mı?`, `SEEMP uygulanıyor mu?`, `Statement hazır mı?`],
          paragraphs: [`D/E rating düzeltici eylem planı gerektirir.`],
        },
      ],
    },
  ],
};

export default content;
