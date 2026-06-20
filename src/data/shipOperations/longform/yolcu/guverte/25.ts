import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Muster list güncelleme (her yolculuk)",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 25,
  estimatedPages: 12,
  intro: `Yolcu gemilerinde mürettebat ve cruise staff sık değiştiğinden muster list her sefer revize edilir; yolcu yönlendirme/sayım görevleri net atanır. Bu bölüm muster list yönetimini ele alır.`,
  sources: ["SOLAS III/8, III/37", "LSA Code"],
  chapters: [
    {
      heading: "1. Muster List",
      sections: [
        {
          subheading: "1.1 Görev atama",
          paragraphs: [
            `Acil durum ve yolcu yönlendirme görevleri her sefer atanır; crew/cruise staff değişiminde güncellenir ve familiarization yapılır.`,
          ],
          bullets: [`Görev/istasyon atama`, `Yolcu yönlendirme görevleri`, `Her sefer revizyon`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Muster list güncel mi?`, `Görevler atandı mı?`, `Yeni personel familiarize edildi mi?`, `İlan edildi mi?`],
        },
      ],
    },
  ],
};

export default content;
