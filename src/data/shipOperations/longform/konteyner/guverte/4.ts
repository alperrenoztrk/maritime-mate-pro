import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "IMDG Code Dangerous Goods manifest ve segregasyon kontrolü",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 4,
  estimatedPages: 20,
  intro: `IMDG Code, tehlikeli yüklerin sınıflandırma, ambalaj, etiketleme, stowage ve segregation kurallarını düzenler. Mis-declared DG, konteyner gemilerinde yangının başlıca nedenidir (Maersk Honam). Bu bölüm DG manifest ve segregation kontrolünü ele alır.`,
  sources: ["IMDG Code", "SOLAS VII", "CINS guidelines"],
  chapters: [
    {
      heading: "1. Sınıflandırma ve Segregation",
      sections: [
        {
          subheading: "1.1 Manifest ve stowage",
          paragraphs: [
            `DG manifest, packing certificate ve stowage pozisyonları kontrol edilir; segregation table'a göre uyumsuz sınıflar ayrı tutulur. EmS (acil müdahale) bilgileri hazır olmalıdır.`,
          ],
          bullets: [`Manifest + packing certificate`, `Segregation table uyumu`, `EmS hazırlığı`, `Etiket/levha kontrolü`],
        },
      ],
    },
    {
      heading: "2. Mis-declaration Riski",
      sections: [
        {
          subheading: "2.1 Yanlış beyan",
          paragraphs: [
            `Yanlış beyan edilmiş DG (örn. kalsiyum hipoklorit) yangına yol açabilir; CINS sirkülerleri ve şüpheli yük göstergeleri takip edilir.`,
          ],
          callouts: [
            { type: "example", title: "Maersk Honam (2018)", text: `Yanlış beyan edilen DG hold yangınına ve can kaybına yol açtı; DG beyanları güvensiz kabul edilip kontrol edilmelidir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Manifest doğru mu?`, `Segregation sağlandı mı?`, `EmS erişilebilir mi?`, `Şüpheli beyanlar kontrol edildi mi?`],
        },
      ],
    },
  ],
};

export default content;
