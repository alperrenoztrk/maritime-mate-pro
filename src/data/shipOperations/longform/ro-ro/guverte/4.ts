import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Güverte geçirgenlik ve yangın kapısı kontrolü",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 4,
  estimatedPages: 16,
  intro: `Ro-Ro araç güverteleri büyük açık hacimlerdir; yangın bölmelendirmesi (fire door, drencher) ve su geçirmez kapılar yangının/su girişinin yayılmasını sınırlar. Bu bölüm güverte bölmelendirme ve yangın kapısı kontrolünü ele alır.`,
  sources: ["SOLAS II-2 (fire), II-1 (subdivision)", "FSS Code"],
  chapters: [
    {
      heading: "1. Kontrol",
      sections: [
        {
          subheading: "1.1 Yangın/su geçirmez kapı",
          paragraphs: [
            `Fire door ve watertight door'ların kapanması ve kilidi test edilir; drencher/sprinkler sistemi (araç güvertesi) hazır olmalıdır. Indicator panelden durum izlenir.`,
          ],
          bullets: [`Fire/watertight door testi`, `Drencher/sprinkler hazır`, `Indicator panel`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Kapılar kapanıyor/kilitleniyor mu?`, `Drencher hazır mı?`, `Indicator doğru mu?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Araç güvertesi yangını hızla yayılır; bölmelendirme ve drencher kritik savunmadır.`],
        },
      ],
    },
  ],
};

export default content;
