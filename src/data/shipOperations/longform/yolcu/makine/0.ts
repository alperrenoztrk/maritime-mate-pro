import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Büyük kapasiteli tatlı su üretimi (FWG ve RO sistemi)",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 0,
  estimatedPages: 16,
  intro: `Yolcu/cruise gemilerinde tatlı su talebi çok yüksektir; FWG (evaporator) ve RO sistemleri birlikte büyük kapasite sağlar. İçme suyu kalitesi ve sürekli üretim kritiktir. Bu bölüm büyük kapasiteli su üretimini ele alır.`,
  sources: ["WHO Guidelines for Drinking-water Quality", "Maker manuals"],
  chapters: [
    {
      heading: "1. Üretim",
      sections: [
        {
          subheading: "1.1 FWG + RO ve kalite",
          paragraphs: [
            `FWG ve RO birlikte çalıştırılarak yüksek talep karşılanır; salinite/iletkenlik izlenir, kıyı/limanda üretim durdurulur. Dezenfeksiyon (klor/UV) ve mineralizasyon uygulanır.`,
          ],
          bullets: [`FWG + RO koordinasyonu`, `Salinite/iletkenlik`, `Kıyıda üretim YAPMA`, `Dezenfeksiyon`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Kapasite talebi karşılıyor mu?`, `Su kalitesi uygun mu?`, `Kıyıda durduruldu mu?`, `Bakteriyolojik test yapıldı mı?`],
          paragraphs: [`Yolcu gemisinde su kaynaklı salgın (örn. Legionella) riski nedeniyle kalite kritik izlenir.`],
        },
      ],
    },
  ],
};

export default content;
