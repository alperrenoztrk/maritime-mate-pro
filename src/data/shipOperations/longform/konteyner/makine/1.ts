import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Jeneratör (DG) yük dengeleme, senkronizasyon ve periyodik bakımı",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 1,
  estimatedPages: 16,
  intro: `Konteyner gemilerinde reefer yükü nedeniyle elektrik talebi yüksek ve değişkendir; DG yük dengeleme, senkronizasyon ve black-out önleme kritiktir. Bu bölüm DG yönetimi ve bakımını ele alır.`,
  sources: ["SOLAS II-1 Reg. 41-43", "Engine maker manuals"],
  chapters: [
    {
      heading: "1. Yük Yönetimi",
      sections: [
        {
          subheading: "1.1 Reefer yükü ve senkronizasyon",
          paragraphs: [
            `Reefer sayısına göre devreye alınan DG sayısı ayarlanır; paralele alırken frekans/voltaj/faz eşitlenir. Power management system (PMS) standby start ve load sharing'i yönetir.`,
          ],
          bullets: [`Reefer yüküne göre DG planı`, `Senkronizasyon`, `Load sharing/PMS`],
        },
      ],
    },
    {
      heading: "2. Black-out Önleme ve Bakım",
      sections: [
        {
          subheading: "2.1 Test ve overhaul",
          paragraphs: [
            `Black-out recovery testi yapılır; DG'ler running hours'a göre overhaul edilir. Insulation ve preferential tripping doğrulanır.`,
          ],
          callouts: [
            { type: "warning", title: "Reefer ani yük", text: `Çok sayıda reefer'ın ani devreye girmesi yük dalgalanması yapar; PMS doğru ayarlanmalıdır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`DG planı reefer yüküne uygun mu?`, `Senkronizasyon doğru mu?`, `Black-out testi yapıldı mı?`, `DG log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
