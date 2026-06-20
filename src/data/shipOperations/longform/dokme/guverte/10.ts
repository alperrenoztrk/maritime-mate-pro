import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Kılavuz alımı ve bırakma prosedürü",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 10,
  estimatedPages: 14,
  intro: `Pilot transfer düzenlemesi SOLAS V/23'e tam uymalıdır; pilot ladder ve gerektiğinde combination ladder güvenli kurulur. Bu bölüm güvenli pilot alımı/bırakmasını ele alır.`,
  sources: ["SOLAS V/23", "IMO Res. A.1045(27)"],
  chapters: [
    {
      heading: "1. Düzenleme",
      sections: [
        {
          subheading: "1.1 Ladder kurulumu",
          paragraphs: [
            `Sertifikalı ladder, manrope, life-buoy ve aydınlatma ile kurulur; gerekiyorsa combination ladder doğru açıyla düzenlenir. Kurulum sorumlu zabit gözetiminde checklist ile doğrulanır.`,
          ],
          bullets: [`Sertifikalı ladder/manrope`, `Life-buoy + ışık`, `Combination açısı`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Kontrol listesi",
          bullets: [`Ladder hasarsız mı?`, `Emniyet ekipmanı hazır mı?`, `Personel hazır mı?`, `Checklist dolduruldu mu?`],
          paragraphs: [`Yanlış kurulum ölümcüldür; her bileşen tek tek kontrol edilir.`],
        },
      ],
    },
  ],
};

export default content;
