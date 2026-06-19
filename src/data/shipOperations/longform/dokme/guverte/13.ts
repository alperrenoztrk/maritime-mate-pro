import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Palamar bağlama ve çözme operasyonu",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 13,
  estimatedPages: 14,
  intro: `Mooring (palamar) operasyonu; head/breast/spring line yönetimi ve snap-back güvenliğini gerektirir. Bu bölüm güvenli mooring/unmooring'i ele alır.`,
  sources: ["OCIMF MEG4", "Mooring safety guidance"],
  chapters: [
    {
      heading: "1. Mooring",
      sections: [
        {
          subheading: "1.1 Line düzeni",
          paragraphs: [
            `Line tipleri sırayla verilir; halat kondisyonu/SWL ve tension dengesi kontrol edilir. Snap-back bölgelerinde durulmaz.`,
          ],
          bullets: [`Head/breast/spring`, `Halat kondisyonu/SWL`, `Snap-back zone`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Line düzeni plana uygun mu?`, `Halatlar kondisyonlu mu?`, `Snap-back bölgeleri biliniyor mu?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Kopan halat snap-back yapar; eğitim ve farkındalık ölümcül kazaları önler.`],
        },
      ],
    },
  ],
};

export default content;
