import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Passage plan oluşturma ve ECDIS güncelleme",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 9,
  estimatedPages: 16,
  intro: `Dökme yük gemileri uzun ore/grain koridorlarında seyreder; berth-to-berth passage plan UKC (özellikle derin draftlı cevher yüklerinde) ve hava yönetimini içerir. Bu bölüm passage plan hazırlığını ele alır.`,
  sources: ["SOLAS V/34", "IMO Res. A.893(21)", "SOLAS V/27"],
  chapters: [
    {
      heading: "1. Plan",
      sections: [
        {
          subheading: "1.1 UKC ve ENC",
          paragraphs: [
            `ENC güncellenir; safety contour/depth derin draft + UKC payına göre ayarlanır. Cevher yüklü gemide UKC marjı dar olabileceğinden gel-git penceresi planlanır.`,
          ],
          bullets: [`ENC update + NtM`, `UKC payı (derin draft)`, `Gel-git penceresi`, `TSS/VTS`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`ENC güncel mi?`, `UKC payı yeterli mi?`, `Check route koşuldu mu?`, `Master onaylı mı?`],
        },
      ],
    },
  ],
};

export default content;
