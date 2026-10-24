import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Acil durum tatbikatı (yangın, yük sızıntısı, MOB)",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 27,
  estimatedPages: 18,
  intro: `Tatbikatlar, acil durumda refleks ve koordinasyonun tek garantisidir. Tankerlerde yangın, kargo sızıntısı (SOPEP) ve denize adam düşmesi (MOB) senaryoları düzenli çalışılır. Bu bölüm tatbikat planlamasını ve SOPEP hazırlığını ele alır.`,
  sources: ["SOLAS III/19 (drills)", "MARPOL Annex I Reg. 37 (SOPEP)"],
  chapters: [
    {
      heading: "1. Tatbikat Programı",
      sections: [
        {
          subheading: "1.1 Senaryolar ve sıklık",
          paragraphs: [
            "Plan realistic ship-specific fire, SOPEP spill-response and man-overboard (MOB) exercises under the applicable drill schedule. Include communication and equipment checks. Debrief each exercise, assign corrective actions and verify that weaknesses have been addressed.",
          ],
          bullets: [
            `Cargo deck fire drill`,
            `SOPEP/spill response drill`,
            `MOB drill + manevra`,
            `Debrief + iyileştirme`,
          ],
        },
      ],
    },
    {
      heading: "2. SOPEP Hazırlığı",
      sections: [
        {
          subheading: "2.1 Ekipman ve erişim",
          paragraphs: [
            `SOPEP ekipmanı (absorbentler, scupper plug, kürek, varil vb.) hızlı erişilebilir tutulur; bildirim listesi (kıyı devleti, şirket) güncel olmalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOPEP",
              text: `Bir damla dökülmede bile SOPEP devreye girer; ekipman ve bildirim listesi her an hazır olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `Tatbikat programı uygulanıyor mu?`,
            `SOPEP ekipmanı erişilebilir mi?`,
            `Bildirim listesi güncel mi?`,
            `Drill log + debrief kayıtları tam mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
