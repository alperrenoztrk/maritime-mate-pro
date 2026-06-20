import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yolcu ambarku/disbarku (embarkation/debarkation) yönetimi",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 0,
  estimatedPages: 18,
  intro: `Yolcu gemilerinde embarkation/debarkation; boarding pass, ISPS güvenlik taraması, manifesto kontrolü ve düzenli yolcu akışını içerir. Doğru sayım ve manifest, acil durumda kimin gemide olduğunun bilinmesi açısından hayatidir. Bu bölüm yolcu giriş/çıkış yönetimini ele alır.`,
  sources: ["SOLAS III", "ISPS Code", "EU Directive 98/41 (passenger registration)"],
  chapters: [
    {
      heading: "1. Akış ve Güvenlik",
      sections: [
        {
          subheading: "1.1 Boarding ve tarama",
          paragraphs: [
            `Yolcular boarding pass ve ISPS güvenlik taramasından geçirilir; manifeste işlenir. Giriş/çıkış akışı gangway güvenliği ve kalabalık yönetimiyle düzenlenir.`,
          ],
          bullets: [`Boarding pass + tarama`, `Manifesto kayıt`, `Gangway güvenliği`, `Kalabalık yönetimi`],
        },
      ],
    },
    {
      heading: "2. Sayım ve Manifest",
      sections: [
        {
          subheading: "2.1 Doğru sayım",
          paragraphs: [
            `Gemideki yolcu/personel sayısı her zaman güncel ve doğru olmalıdır; acil durumda manifest, arama-kurtarmanın temelidir (özel ihtiyaç sahipleri işaretlenir).`,
          ],
          callouts: [
            { type: "regulation", title: "Yolcu kaydı", text: `Gemideki tüm kişilerin kaydı doğru tutulmalı; acil durumda eksik/yanlış sayım can kaybı riskini artırır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Boarding pass/tarama yapıldı mı?`, `Manifest güncel mi?`, `Özel ihtiyaç işaretlendi mi?`, `Sayım doğru mu?`],
        },
      ],
    },
  ],
};

export default content;
