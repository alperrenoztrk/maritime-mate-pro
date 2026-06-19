import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Jeneratör bakımı ve yük yönetimi",
  shipType: "dokme",
  dept: "makine",
  opIndex: 1,
  estimatedPages: 16,
  intro: `Diesel jeneratörler geminin elektrik gücünü sağlar; senkronizasyon, yük paylaşımı ve black-out önleme kritiktir. Bu bölüm DG yönetimi ve bakımını ele alır.`,
  sources: ["SOLAS II-1 Reg. 41-43", "Engine maker manuals"],
  chapters: [
    {
      heading: "1. Yük Yönetimi",
      sections: [
        {
          subheading: "1.1 Senkronizasyon",
          paragraphs: [
            `Paralele alırken frekans/voltaj/faz eşitlenir; load sharing dengeli olmalıdır. Black-out recovery testi yapılır.`,
          ],
          bullets: [`Senkronizasyon`, `Dengeli load sharing`, `Black-out testi`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Faz/insulation",
          paragraphs: [
            `Yanlış faz şaft/kuplaj kırabilir; insulation resistance ölçülür.`,
          ],
          callouts: [
            { type: "warning", title: "Yanlış faz", text: `Hatalı senkronizasyon mekanik hasar yapar; adımlar atlanmaz.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Senkronizasyon doğru mu?`, `Load sharing dengeli mi?`, `Black-out testi yapıldı mı?`, `DG log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
