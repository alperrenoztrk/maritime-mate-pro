import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Muster list (station bill) güncelleme ve tatbikat organizasyonu",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 26,
  estimatedPages: 12,
  intro: `Muster list (station bill), her mürettebatın acil durumdaki görev ve istasyonunu tanımlar; personel değişikliklerinde güncellenir ve tatbikatlar buna göre organize edilir. Bu bölüm muster list yönetimini ele alır.`,
  sources: ["SOLAS III/8, III/37", "LSA Code"],
  chapters: [
    {
      heading: "1. Muster List",
      sections: [
        {
          subheading: "1.1 Görev atama ve güncelleme",
          paragraphs: [
            `Her acil durum görevi (yangın ekibi, filika, ilk yardım) ve istasyon atanır; crew change'de muster list güncellenir ve ilan edilir. Familiarization yapılır.`,
          ],
          bullets: [`Görev/istasyon atama`, `Crew change güncelleme`, `Familiarization`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Muster list güncel mi?`, `Yeni personel familiarize edildi mi?`, `İlan edildi mi?`, `Tatbikat buna göre mi?`],
        },
      ],
    },
  ],
};

export default content;
