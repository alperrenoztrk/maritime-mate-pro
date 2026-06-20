import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Stern tube yağlama sistemi (lub oil / water-lubricated) kontrolü",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 12,
  estimatedPages: 14,
  intro: `Stern tube, şaftın gemiden çıktığı yataktır; yağ kaçağı hem çevre kirliliği hem yatak hasarı yaratır. Yağlamalı veya su yağlamalı tipler farklı izleme gerektirir. Bu bölüm stern tube kontrolünü ele alır.`,
  sources: ["VGP (US) — stern tube EAL", "Maker manuals"],
  chapters: [
    {
      heading: "1. İzleme",
      sections: [
        {
          subheading: "1.1 Yağ seviyesi ve sıcaklık",
          paragraphs: [
            `Yağlamalı tipte header tank seviyesi ve yatak sıcaklığı izlenir; seviye düşüşü deniz tarafı seal kaçağına işaret eder. EAL (environmentally acceptable lubricant) kullanımı bazı bölgelerde zorunludur.`,
          ],
          bullets: [`Header tank seviyesi`, `Yatak sıcaklığı`, `EAL gerekliliği`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Seviye normal mi?`, `Sıcaklık normal mi?`, `Seal kaçağı var mı?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Stern tube yağ kaçağı görünür deniz kirliliği yaratır ve raporlanması gerekir.`],
        },
      ],
    },
  ],
};

export default content;
