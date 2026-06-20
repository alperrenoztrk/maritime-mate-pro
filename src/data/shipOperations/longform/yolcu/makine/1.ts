import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Atık su arıtma sistemi (STP - Sewage Treatment Plant) operasyonu",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 1,
  estimatedPages: 16,
  intro: `Yolcu gemilerinde yüksek atık su hacmi STP (Sewage Treatment Plant) ile MARPOL Annex IV'e uygun arıtılır; deşarj bölge ve kalite kurallarına tabidir. Bu bölüm STP operasyonunu ele alır.`,
  sources: ["MARPOL Annex IV", "STP maker manuals", "IMO MEPC.227(64)"],
  chapters: [
    {
      heading: "1. Operasyon",
      sections: [
        {
          subheading: "1.1 Arıtma ve deşarj",
          paragraphs: [
            `STP biyolojik/kimyasal arıtma ile çıkış suyunu standartlara getirir; deşarj mesafe/bölge kurallarına uyar. Özel bölgelerde (special area) deşarj kısıtlıdır.`,
          ],
          bullets: [`Biyolojik/kimyasal arıtma`, `Çıkış kalitesi (coliform vb.)`, `Deşarj bölge/mesafe`, `Holding tank yönetimi`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Arıtma çalışıyor mu?`, `Çıkış kalitesi uygun mu?`, `Deşarj bölgesi uygun mu?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Yetersiz arıtmayla deşarj çevre ihlali ve halk sağlığı riski yaratır.`],
        },
      ],
    },
  ],
};

export default content;
