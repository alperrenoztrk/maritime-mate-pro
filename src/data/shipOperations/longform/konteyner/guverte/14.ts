import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Güverte vinçleri (deck crane), capstan ve windlass periyodik bakımı",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 14,
  estimatedPages: 14,
  intro: `Güverte vinçleri, capstan ve windlass; mooring ve demir operasyonlarının güvenliği için periyodik bakım gerektirir. Fren testi ve hidrolik kondisyonu kritiktir. Bu bölüm güverte makineleri bakımını ele alır.`,
  sources: ["Maker manuals", "Class Rules", "PMS"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Fren ve hidrolik",
          paragraphs: [
            `Windlass brake holding test (rendering test), hidrolik yağ ve greaseleme PMS'e göre yapılır; tel/çelik halat kondisyonu denetlenir.`,
          ],
          bullets: [`Brake holding test`, `Hidrolik/greaseleme`, `Halat kondisyonu`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Fren testi yapıldı mı?`, `Hidrolik uygun mu?`, `Greaseleme yapıldı mı?`, `PMS kaydı tutuldu mu?`],
          paragraphs: [`Windlass freninin tutmaması demir operasyonunda kontrol kaybı ve hasar yaratır.`],
        },
      ],
    },
  ],
};

export default content;
