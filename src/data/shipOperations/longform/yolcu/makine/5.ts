import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Azipod/Propulsion sistemi bakımı ve kalibrasyonu",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 5,
  estimatedPages: 16,
  intro: `Modern cruise gemilerinde azimuth pod (azipod) tahrik sistemi yüksek manevra kabiliyeti sağlar; pod yatak/seal, elektrik motoru ve kontrol sistemi bakımı kritiktir. Bu bölüm azipod bakımını ele alır.`,
  sources: ["Azipod maker manuals", "Class Rules (electric propulsion)"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Pod ve kontrol",
          paragraphs: [
            `Pod seal/yatak izlenir (seal sızıntısı kritiktir), elektrik motoru insulation ve soğutma kontrol edilir; azimuth kontrol ve geri besleme kalibre edilir.`,
          ],
          bullets: [`Pod seal/yatak`, `Motor insulation/soğutma`, `Azimuth kontrol kalibrasyonu`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Seal/redundancy",
          paragraphs: [`Pod seal arızası su girişi ve büyük onarım demektir; çoklu pod yedekliliği manevra güvenliğini destekler.`],
          callouts: [
            { type: "warning", title: "Pod seal", text: `Pod seal sızıntısı erken tespit edilmezse motor hasarı ve havuzlama gerektirir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Seal/yatak normal mi?`, `Motor soğutma/insulation uygun mu?`, `Azimuth kalibre mi?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
