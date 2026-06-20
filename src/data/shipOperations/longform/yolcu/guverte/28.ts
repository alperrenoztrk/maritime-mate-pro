import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Tıbbi acil durum prosedürü (hasta tahliyesi)",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 28,
  estimatedPages: 14,
  intro: `Yolcu gemilerinde tıbbi acil durumlar sık görülür; gemi revin (medical center) ile koordinasyon, telemedicine ve gerektiğinde helikopter/tender ile medivac yönetilir. Bu bölüm tıbbi acil durumu ele alır.`,
  sources: ["MLC (medical care)", "ICS Guide to Helicopter/Ship Operations", "Telemedical advice (TMAS)"],
  chapters: [
    {
      heading: "1. Müdahale",
      sections: [
        {
          subheading: "1.1 Revir ve medivac",
          paragraphs: [
            `Gemi revin ile ilk müdahale yapılır; gerekirse TMAS (telemedical advice) alınır ve medivac (helikopter veya tender) planlanır. Hasta nakli güvenli koordine edilir.`,
          ],
          bullets: [`Revir ilk müdahale`, `TMAS danışma`, `Medivac (heli/tender)`, `Koordinasyon`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Revir hazır mı?`, `TMAS ile iletişim kuruldu mu?`, `Medivac planı var mı?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
