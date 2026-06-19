import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Jeneratör bakımı ve yük yönetimi",
  shipType: "tanker",
  dept: "makine",
  opIndex: 13,
  estimatedPages: 16,
  intro: `Diesel jeneratörler (DG), geminin elektrik gücünü sağlar; paralel çalışma, senkronizasyon ve black-out önleme kritik konulardır. Hatalı senkronizasyon şaft/kuplaj hasarı yapar. Bu bölüm DG bakımı ve yük yönetimini ele alır.`,
  sources: ["SOLAS II-1 Reg. 41-43 (electrical)", "Engine maker manuals"],
  chapters: [
    {
      heading: "1. Paralel Çalışma",
      sections: [
        {
          subheading: "1.1 Senkronizasyon",
          paragraphs: [
            `DG'ler paralele alınırken frekans, voltaj ve faz sırası eşitlenir; hatalı senkronizasyon ani moment ile mekanik hasar yapar. Yük paylaşımı (load sharing) dengeli olmalıdır.`,
          ],
          bullets: [
            `Frekans/voltaj/faz eşitleme`,
            `Dengeli load sharing`,
            `Preferential trip ayarları`,
          ],
        },
      ],
    },
    {
      heading: "2. Black-out Önleme",
      sections: [
        {
          subheading: "2.1 Test ve insulation",
          paragraphs: [
            `Black-out recovery testi periyodik yapılır; insulation resistance ölçülür. Otomatik standby start ve preferential tripping doğru çalışmalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış faz",
              text: `Yanlış faz sırasıyla paralele alma şaft/kuplaj kırabilir; senkronizasyon atlanmaz.`,
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
            `Senkronizasyon doğru mu?`,
            `Load sharing dengeli mi?`,
            `Black-out testi yapıldı mı?`,
            `DG log güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
