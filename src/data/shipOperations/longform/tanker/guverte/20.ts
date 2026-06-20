import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Kılavuz alımı ve bırakma prosedürü",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 20,
  estimatedPages: 14,
  intro: `Kılavuz (pilot) alımı ve bırakması, pilot ladder kurulumunun SOLAS V/23'e tam uyumunu gerektirir. Yanlış kurulmuş bir merdiven ölümcül kazalara yol açar. Bu bölüm güvenli pilot transfer düzenlemesini ele alır.`,
  sources: ["SOLAS V/23 (Pilot transfer arrangements)", "IMO Res. A.1045(27)"],
  chapters: [
    {
      heading: "1. Düzenleme",
      sections: [
        {
          subheading: "1.1 Pilot ladder kurulumu",
          paragraphs: [
            `Sertifikalı pilot ladder, manrope, stanchion, life-buoy ve aydınlatma ile kurulur; gerekiyorsa combination ladder (accommodation ladder + pilot ladder) düzenlenir. Kurulum sorumlu zabit gözetiminde yapılır ve checklist ile doğrulanır.`,
          ],
          bullets: [
            `Sertifikalı ladder + manrope`,
            `Life-buoy + ışık + heaving line`,
            `Combination ladder gerekiyorsa doğru açı`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Yaygın hatalar",
          paragraphs: [
            `Kötü bakımlı basamak, yanlış sabitleme veya eksik aydınlatma ölümcüldür. Pilot çıkış/inişinde personel hazır bekler.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ölümcül risk",
              text: `Pilot ladder uygunsuzluğu PSC detention ve can kaybı sebebidir; kurulum tek tek doğrulanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `Ladder sertifikalı ve hasarsız mı?`,
            `Manrope/life-buoy/ışık hazır mı?`,
            `Personel ve haberleşme hazır mı?`,
            `Pilot ladder checklist dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
