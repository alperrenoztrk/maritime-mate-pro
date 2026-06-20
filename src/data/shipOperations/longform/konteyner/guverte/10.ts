import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Anchoring ve weighing anchor operasyonu",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 10,
  estimatedPages: 16,
  intro: `Demirleme (anchoring) ve demir alma (weighing), doğru demir yeri seçimi, scope (zincir boyu) hesabı ve dragging izlemesini gerektirir. Yanlış demirleme sürüklenme ve çatışma riski yaratır. Bu bölüm anchoring operasyonunu ele alır.`,
  sources: ["Bridge Procedures Guide (ICS)", "Seamanship references"],
  chapters: [
    {
      heading: "1. Demirleme",
      sections: [
        {
          subheading: "1.1 Yer seçimi ve scope",
          paragraphs: [
            `Demir yeri derinlik, dip cinsi, akıntı ve trafiğe göre seçilir; scope tipik olarak derinliğin 5-7 katı zincir olacak şekilde planlanır. Brought-up doğrulanır.`,
          ],
          bullets: [`Derinlik/dip/akıntı`, `Scope (5-7×derinlik)`, `Brought-up kontrolü`],
        },
      ],
    },
    {
      heading: "2. İzleme ve Demir Alma",
      sections: [
        {
          subheading: "2.1 Dragging ve weighing",
          paragraphs: [
            `Anchor watch ile sürüklenme (dragging) izlenir (GPS/bearing); gerekirse makine hazır tutulur. Demir alırken windlass yükü ve zincir kondisyonu gözlenir.`,
          ],
          callouts: [
            { type: "warning", title: "Dragging", text: `Sürüklenme erken tespit edilmezse çatışma/karaya oturma riski doğar; anchor watch ihmal edilmez.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Yer/scope uygun mu?`, `Brought-up doğrulandı mı?`, `Anchor watch kuruldu mu?`, `Bell book/log tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
