import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Vapour recovery sistemi bağlantısı",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 21,
  estimatedPages: 16,
  intro: `Vapour recovery (VR), yükleme sırasında tanktan çıkan VOC buharını kıyıya geri gönDeren sistemdir; emisyonu azaltır ve birçok terminalde zorunludur. Bağlantı, bonding, flame arrester ve shore acceptance gerektirir. Bu bölüm VR bağlantısını ele alır.`,
  sources: ["MARPOL Annex VI Reg. 15 (VOC)", "USCG 33 CFR 154", "ISGOTT"],
  chapters: [
    {
      heading: "1. VR Bağlantısı",
      sections: [
        {
          subheading: "1.1 Coupling ve flame arrester",
          paragraphs: [
            `VR return line, vapour coupling ile bağlanır; bonding sağlanır ve hatta flame arrester bulunur. Flame arrester, kıyıdan gemiye flashback (geri tutuşma) ihtimalini engeller.`,
          ],
          bullets: [
            `VR coupling + bonding`,
            `Flame arrester + P/V koruması`,
            `Shore acceptance teyidi`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Flashback önleme",
          paragraphs: [
            `Vapour line patlayıcı karışım taşır; flame arrester ve basınç yönetimi kritiktir. Rate, VR hattı kapasitesini aşmamalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Flashback",
              text: `Flame arrester olmadan VR bağlantısı geri tutuşma riski taşır; bağlantı öncesi mutlaka doğrulanır.`,
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
            `VR coupling + bonding doğru mu?`,
            `Flame arrester yerinde mi?`,
            `Shore acceptance alındı mı?`,
            `VR connection log dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
