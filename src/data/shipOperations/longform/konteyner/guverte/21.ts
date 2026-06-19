import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Mooring rope, fender, heaving line ve güverte bağlama ekipmanı bakımı",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 21,
  estimatedPages: 14,
  intro: `Mooring halatları, fender ve heaving line; düzenli denetim ve doğru saklama ile güvenli kalır. Aşınmış/hasarlı halat snap-back riskini artırır. Bu bölüm bağlama ekipmanı bakımını ele alır.`,
  sources: ["OCIMF MEG4", "Line management plan"],
  chapters: [
    {
      heading: "1. Bakım ve Denetim",
      sections: [
        {
          subheading: "1.1 Halat kondisyonu",
          paragraphs: [
            `Halatlar aşınma, kesik ve UV hasarı açısından denetlenir; line management plan ile retirement kriterleri izlenir. Tails ve fender'lar kontrol edilir.`,
          ],
          bullets: [`Aşınma/kesik denetimi`, `Retirement kriterleri`, `Tails/fender kontrol`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Halatlar kondisyonlu mu?`, `Retirement kriteri aşıldı mı?`, `Tails/fender uygun mu?`, `Kayıtlar tutuldu mu?`],
          paragraphs: [`Zayıflamış halat mooring sırasında kopabilir; düzenli denetim snap-back riskini azaltır.`],
        },
      ],
    },
  ],
};

export default content;
