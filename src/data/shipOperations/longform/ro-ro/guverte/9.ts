import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yük listesi (cargo manifest) hazırlama",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 9,
  estimatedPages: 12,
  intro: `Cargo manifest; araç/trailer listesi, ağırlıkları, tehlikeli yük beyanları ve çıkış limanı bilgilerini içerir. Doğru manifest, stabilite hesabı ve gümrük/liman süreçleri için esastır. Bu bölüm manifest hazırlığını ele alır.`,
  sources: ["SOLAS VI/2", "Customs/port requirements"],
  chapters: [
    {
      heading: "1. Hazırlık",
      sections: [
        {
          subheading: "1.1 İçerik ve doğrulama",
          paragraphs: [
            `Araç ağırlıkları, DG beyanları ve çıkış limanı manifeste işlenir; fiili yük ile tutarlılık doğrulanır. DG araçlar ayrıca segregation açısından kontrol edilir.`,
          ],
          bullets: [`Araç ağırlıkları`, `DG beyanı`, `Fiili yükle tutarlılık`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Manifest tam mı?`, `Ağırlıklar doğru mu?`, `DG beyanı var mı?`, `Fiili yükle uyumlu mu?`],
        },
      ],
    },
  ],
};

export default content;
