import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "IGS fanı ve kompresör bakımı",
  shipType: "tanker",
  dept: "makine",
  opIndex: 2,
  estimatedPages: 16,
  intro: `Inert gas blower (fan), scrubber ve deck seal, IGS'in makine tarafı bakımının odağıdır. IGS arızası tüm kargo operasyonunu durdurur. Bu bölüm IGS makine bakımını ele alır.`,
  sources: ["SOLAS II-2 Reg. 4", "IGS maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Scrubber ve deck seal",
          paragraphs: [
            `Scrubber temizliği, deck seal su seviyesi ve O2 analyzer kalibrasyonu düzenli yapılır. Blower bearing/vibration izlenir.`,
          ],
          bullets: [
            `Scrubber temizliği`,
            `Deck seal su seviyesi`,
            `O2 analyzer kalibrasyonu`,
            `Blower bearing/vibration`,
          ],
        },
      ],
    },
    {
      heading: "2. Operasyonel Etki",
      sections: [
        {
          subheading: "2.1 Durdurucu arıza",
          paragraphs: [
            `IGS düzgün çalışmadan kargo operasyonu yapılamaz; bakım planı kargo programıyla eşgüdümlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Operasyon durur",
              text: `IGS arızası yükleme/boşaltmayı durdurur; kritik yedek parça stokta tutulur.`,
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
            `Scrubber temiz mi?`,
            `Deck seal seviyesi normal mi?`,
            `O2 analyzer kalibre mi?`,
            `IGS PMS report dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
