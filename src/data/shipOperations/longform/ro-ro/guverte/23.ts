import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Muster list güncelleme",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 23,
  estimatedPages: 12,
  intro: `Muster list, acil durumda her mürettebatın görev ve istasyonunu tanımlar; yolcu gemilerinde yolcu yönlendirme görevleri de eklenir. Personel değişiminde güncellenir. Bu bölüm muster list yönetimini ele alır.`,
  sources: ["SOLAS III/8, III/37", "LSA Code"],
  chapters: [
    {
      heading: "1. Muster List",
      sections: [
        {
          subheading: "1.1 Görev/istasyon ve yolcu",
          paragraphs: [`Acil durum görevleri ve istasyonlar atanır; yolcu gemilerinde yolcu yönlendirme/sayım görevleri eklenir. Crew change'de güncellenir ve familiarization yapılır.`],
          bullets: [`Görev/istasyon atama`, `Yolcu yönlendirme görevleri`, `Crew change güncelleme`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Muster list güncel mi?`, `Yolcu görevleri tanımlı mı?`, `Yeni personel familiarize edildi mi?`, `İlan edildi mi?`],
        },
      ],
    },
  ],
};

export default content;
