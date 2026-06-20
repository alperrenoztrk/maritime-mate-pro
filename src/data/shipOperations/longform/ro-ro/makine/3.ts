import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Jeneratör bakımı ve yük yönetimi",
  shipType: "ro-ro",
  dept: "makine",
  opIndex: 3,
  estimatedPages: 16,
  intro: `Diesel jeneratörler geminin elektrik gücünü sağlar; senkronizasyon, yük paylaşımı ve black-out önleme kritiktir. Ro-Ro'da rampa/thruster gibi büyük yükler ani talep yaratır. Bu bölüm DG yönetimini ele alır.`,
  sources: ["SOLAS II-1 Reg. 41-43", "Engine maker manuals"],
  chapters: [
    {
      heading: "1. Yük Yönetimi",
      sections: [
        {
          subheading: "1.1 Senkronizasyon/ani yük",
          paragraphs: [`Paralele alırken frekans/voltaj/faz eşitlenir; rampa/thruster gibi ani yüklere karşı yeterli DG devrede tutulur. Black-out testi yapılır.`],
          bullets: [`Senkronizasyon`, `Ani yük için DG planı`, `Black-out testi`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Faz/insulation",
          paragraphs: [`Yanlış faz şaft/kuplaj kırabilir; insulation ölçülür.`],
          callouts: [
            { type: "warning", title: "Yanlış faz", text: `Hatalı senkronizasyon mekanik hasar yapar.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Senkronizasyon doğru mu?`, `Ani yük karşılanıyor mu?`, `Black-out testi yapıldı mı?`, `DG log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
