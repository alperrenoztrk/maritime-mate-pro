import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Kılavuz alımı ve bırakma prosedürü",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 7,
  estimatedPages: 14,
  intro: `Pilot transfer düzenlemesi SOLAS V/23'e tam uymalıdır; pilot ladder/combination ladder güvenli kurulur. Bu bölüm güvenli pilot alımı/bırakmasını ele alır.`,
  sources: ["SOLAS V/23", "IMO Res. A.1045(27)"],
  chapters: [
    {
      heading: "1. Düzenleme",
      sections: [
        {
          subheading: "1.1 Kurulum",
          paragraphs: [`Sertifikalı ladder, manrope, life-buoy ve aydınlatma ile kurulur; sorumlu zabit gözetiminde checklist ile doğrulanır.`],
          bullets: [`Sertifikalı ladder/manrope`, `Life-buoy + ışık`, `Checklist`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Kontrol listesi",
          bullets: [`Ladder hasarsız mı?`, `Emniyet ekipmanı hazır mı?`, `Personel hazır mı?`, `Checklist dolduruldu mu?`],
          paragraphs: [`Yanlış kurulum ölümcüldür; her bileşen kontrol edilir.`],
        },
      ],
    },
  ],
};

export default content;
