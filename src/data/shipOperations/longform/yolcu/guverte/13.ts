import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yangın algılama ve söndürme sistemi kontrolü",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 13,
  estimatedPages: 16,
  intro: `Yolcu gemilerinde yangın algılama, A-class bölmeler, sprinkler ve fire detection geniş kapsamlıdır; yüksek yolcu yoğunluğu nedeniyle erken algılama ve bölmelendirme hayatidir. Bu bölüm yangın sistemini ele alır.`,
  sources: ["SOLAS II-2", "FSS Code"],
  chapters: [
    {
      heading: "1. Kontrol",
      sections: [
        {
          subheading: "1.1 Detection/sprinkler/bölme",
          paragraphs: [
            `Smoke/heat dedektörleri, sprinkler ve A-class boundary/fire door sistemleri test edilir; alarm panelinde zone gösterimi doğrulanır. Yolcu mahallerinde kapsama tam olmalıdır.`,
          ],
          bullets: [`Detection test`, `Sprinkler sistemi`, `A-class boundary/fire door`, `Zone gösterimi`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Detection çalışıyor mu?`, `Sprinkler hazır mı?`, `Fire door'lar kapanıyor mu?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Yolcu gemisi yangınında erken algılama ve bölmelendirme toplu kaybı önler.`],
        },
      ],
    },
  ],
};

export default content;
