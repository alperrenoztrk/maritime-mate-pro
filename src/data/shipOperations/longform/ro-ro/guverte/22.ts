import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Fender ve palamar ekipmanı bakımı",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 22,
  estimatedPages: 12,
  intro: `Sık liman dönüşü yapan Ro-Ro'larda fender ve mooring ekipmanı yoğun aşınmaya maruz kalır; düzenli denetim güvenli yanaşma ve mooring sağlar. Bu bölüm fender/mooring bakımını ele alır.`,
  sources: ["OCIMF MEG4", "Line management plan"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Denetim",
          paragraphs: [`Halatlar aşınma/kesik açısından denetlenir; fender kondisyonu kontrol edilir. Sık operasyon nedeniyle retirement kriterleri yakın izlenir.`],
          bullets: [`Halat aşınma denetimi`, `Fender kondisyonu`, `Retirement kriteri`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Halatlar kondisyonlu mu?`, `Fender uygun mu?`, `Retirement aşıldı mı?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
