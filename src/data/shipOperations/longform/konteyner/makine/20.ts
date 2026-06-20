import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Engine room watch keeping — UMS veya manned ER vardiyası",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 20,
  estimatedPages: 14,
  intro: `Makine dairesi vardiyası, UMS (unmanned) veya manlı modda STCW'ye uygun yürütülür; rounds, parametre izleme ve alarm müdahalesi vardiya güvenliğinin esasıdır. Bu bölüm ER vardiyasını ele alır.`,
  sources: ["STCW Reg. VIII/2", "Class automation/UMS requirements"],
  chapters: [
    {
      heading: "1. Vardiya",
      sections: [
        {
          subheading: "1.1 Rounds ve UMS",
          paragraphs: [
            `Düzenli rounds ile sızıntı, ısınma ve anormal ses/titreşim kontrol edilir; UMS modunda dead-man alarm ve bridge/cabin aktarımı çalışmalıdır. Handover net yapılır.`,
          ],
          bullets: [`Düzenli rounds`, `Parametre izleme`, `UMS dead-man/aktarım`, `Net handover`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Rounds yapıldı mı?`, `Alarmlar ele alındı mı?`, `UMS aktarımı çalışıyor mu?`, `Handover net mi?`],
          paragraphs: [`UMS moduna geçmeden önce tüm kritik alarmların aktarımı doğrulanır.`],
        },
      ],
    },
  ],
};

export default content;
