import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Sahil tesisi güvenlik bildirimi (ISPS)",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 27,
  estimatedPages: 12,
  intro: `ISPS kapsamında gemi ile liman tesisi (PFSO) arasında güvenlik bilgisi ve gerektiğinde Declaration of Security (DoS) paylaşılır; güvenlik seviyeleri eşgüdümlenir. Bu bölüm sahil güvenlik bildirimini ele alır.`,
  sources: ["ISPS Code", "SOLAS XI-2", "Ship Security Plan"],
  chapters: [
    {
      heading: "1. Bildirim",
      sections: [
        {
          subheading: "1.1 PFSO ve DoS",
          paragraphs: [
            `Pre-arrival güvenlik bilgisi PFSO ile paylaşılır; güvenlik seviyesi farkı veya özel durumda Declaration of Security düzenlenir. Access control eşgüdümlenir.`,
          ],
          bullets: [`Pre-arrival security info`, `DoS (gerekirse)`, `Güvenlik seviyesi eşgüdümü`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`PFSO ile bilgi paylaşıldı mı?`, `DoS gerekiyor mu/düzenlendi mi?`, `Seviyeler uyumlu mu?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
