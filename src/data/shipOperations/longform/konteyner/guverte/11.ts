import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Mooring ve unmooring operasyonu (fore, aft ve spring lines)",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 11,
  estimatedPages: 16,
  intro: `Mooring operasyonu; head, breast ve spring line'ların doğru sırayla verilmesi ve gerginlik yönetimini içerir. Snap-back zone'lar mooring'in en ölümcül riskidir. Bu bölüm güvenli mooring/unmooring'i ele alır.`,
  sources: ["OCIMF MEG4", "Mooring safety guidance"],
  chapters: [
    {
      heading: "1. Mooring Düzeni",
      sections: [
        {
          subheading: "1.1 Line tipleri ve sıra",
          paragraphs: [
            `Head/stern line, breast line ve spring line geminin ileri-geri ve yanal hareketini kısıtlar; verilme sırası pilot/Master planına göre yapılır. Halat kondisyonu ve MBL/SWL kontrol edilir.`,
          ],
          bullets: [`Head/breast/spring`, `Halat kondisyonu/SWL`, `Tension dengesi`],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Snap-back",
          paragraphs: [
            `Kopan halat snap-back yapar; personel snap-back bölgesinde durmaz. Mixed mooring (farklı malzeme) ek risk yaratır.`,
          ],
          callouts: [
            { type: "warning", title: "Snap-back zone", text: `Snap-back ölümcüldür; bu bölgelerde durmak yasaktır ve düzenli eğitim verilir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Line düzeni plana uygun mu?`, `Halatlar kondisyonlu mu?`, `Snap-back bölgeleri biliniyor mu?`, `Mooring kayıtları tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
