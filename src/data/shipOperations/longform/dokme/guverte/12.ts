import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Demirleme ve demir alma operasyonu",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 12,
  estimatedPages: 14,
  intro: `Demirleme; yer seçimi, scope hesabı ve dragging izlemesini gerektirir. Bulk gemiler genelde uzun süre demirde bekler (waiting for berth), bu nedenle anchor watch disiplini kritiktir. Bu bölüm demirleme operasyonunu ele alır.`,
  sources: ["Bridge Procedures Guide (ICS)", "Seamanship references"],
  chapters: [
    {
      heading: "1. Demirleme",
      sections: [
        {
          subheading: "1.1 Yer/scope ve izleme",
          paragraphs: [
            `Derinlik, dip cinsi ve trafiğe göre yer seçilir; scope tipik 5-7× derinlik planlanır. Brought-up doğrulanır; anchor watch ile dragging izlenir.`,
          ],
          bullets: [`Yer/scope`, `Brought-up`, `Anchor watch / dragging`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Yer/scope uygun mu?`, `Brought-up doğrulandı mı?`, `Anchor watch kuruldu mu?`, `Makine standby gerekiyor mu?`],
          paragraphs: [`Uzun beklemelerde hava değişiminde sürüklenme riski artar; izleme gevşetilmez.`],
        },
      ],
    },
  ],
};

export default content;
