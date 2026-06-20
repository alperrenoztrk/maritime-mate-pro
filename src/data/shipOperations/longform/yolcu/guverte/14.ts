import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Engelli yolcu tahliye prosedürü",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 14,
  estimatedPages: 16,
  intro: `Hareket kısıtlı yolcular (PRM – Persons with Reduced Mobility), tahliyede özel destek gerektirir; evacuation chair, refuge area ve atanmış personel ile tahliye planlanır. Bu bölüm PRM tahliyesini ele alır.`,
  sources: ["SOLAS III", "EU PRM regulations", "Company evacuation plan"],
  chapters: [
    {
      heading: "1. Plan",
      sections: [
        {
          subheading: "1.1 PRM desteği",
          paragraphs: [
            `PRM yolcular embarkation'da işaretlenir; her birine atanmış personel, evacuation chair ve refuge area planlanır. Asansör kullanılamayacağından merdiven tahliyesi pratiği yapılır.`,
          ],
          bullets: [`PRM işaretleme (manifest)`, `Atanmış personel`, `Evacuation chair`, `Refuge area`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`PRM yolcular işaretlendi mi?`, `Personel atandı mı?`, `Evacuation chair hazır mı?`, `Refuge area belirli mi?`],
          paragraphs: [`PRM tahliyesi önceden planlanmazsa genel tahliyeyi de yavaşlatır.`],
        },
      ],
    },
  ],
};

export default content;
