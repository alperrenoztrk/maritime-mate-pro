import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "SEEMP/CII hesabı ve enerji verimliliği raporlaması",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 15,
  estimatedPages: 16,
  intro: `SEEMP (Ship Energy Efficiency Management Plan) ve CII (Carbon Intensity Indicator), geminin karbon yoğunluğunu yönetir ve raporlar; IMO DCS kapsamında yakıt tüketimi izlenir. Bu bölüm enerji verimliliği yönetimini ele alır.`,
  sources: ["MARPOL Annex VI", "IMO DCS / CII / SEEMP Part III"],
  chapters: [
    {
      heading: "1. İzleme ve Hesap",
      sections: [
        {
          subheading: "1.1 CII rating",
          paragraphs: [
            `Yakıt tüketimi ve kat edilen mesafe ile yıllık CII hesaplanır (rating A-E); SEEMP Part III iyileştirme önlemlerini (hız optimizasyonu, hull cleaning vb.) tanımlar.`,
          ],
          bullets: [`Yakıt/mesafe izleme (DCS)`, `Yıllık CII rating`, `SEEMP iyileştirme önlemleri`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`DCS verisi doğru mu?`, `CII rating hesaplandı mı?`, `SEEMP önlemleri uygulanıyor mu?`, `Statement hazır mı?`],
          paragraphs: [`D/E rating düzeltici eylem planı gerektirir; verimlilik hem regülasyon hem maliyet konusudur.`],
        },
      ],
    },
  ],
};

export default content;
