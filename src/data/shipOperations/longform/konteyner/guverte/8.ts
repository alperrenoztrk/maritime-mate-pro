import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Pilot embarkation/disembarkation prosedürü (SOLAS V/23)",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 8,
  estimatedPages: 14,
  intro: `Pilot transfer düzenlemesi SOLAS V/23'e tam uymalıdır; özellikle yüksek fribordlu konteyner gemilerinde combination ladder doğru açı ve kurulumla hazırlanır. Bu bölüm güvenli pilot embarkation/disembarkation'ı ele alır.`,
  sources: ["SOLAS V/23", "IMO Res. A.1045(27)"],
  chapters: [
    {
      heading: "1. Düzenleme",
      sections: [
        {
          subheading: "1.1 Combination ladder",
          paragraphs: [
            `Yüksek fribordda accommodation ladder + pilot ladder kombinasyonu kurulur; geçiş noktası, açı ve trap door düzeni doğrulanır. Manrope, life-buoy, ışık ve heaving line hazır olur.`,
          ],
          bullets: [`Sertifikalı ladder`, `Doğru combination açısı`, `Life-buoy/ışık/manrope`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Kurulum doğrulama",
          paragraphs: [
            `Kurulum sorumlu zabit gözetiminde checklist ile doğrulanır; personel pilotu karşılar.`,
          ],
          callouts: [
            { type: "warning", title: "Ölümcül risk", text: `Yanlış kurulum pilot ladder kazaları ve can kaybına yol açar; her bileşen tek tek kontrol edilir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Ladder sertifikalı/hasarsız mı?`, `Combination açısı doğru mu?`, `Emniyet ekipmanı hazır mı?`, `Checklist dolduruldu mu?`],
        },
      ],
    },
  ],
};

export default content;
