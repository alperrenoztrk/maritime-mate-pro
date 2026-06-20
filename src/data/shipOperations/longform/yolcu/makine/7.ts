import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bunker operasyonu planlaması ve yürütme",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 7,
  estimatedPages: 18,
  intro: `Bunker; pre-bunker toplantısı, safety checklist, kontrollü rate, mühürlü numune ve BDN disiplinini gerektirir. Yolcu varken bunker yapılıyorsa ek güvenlik önlemleri alınır. Bu bölüm bunker operasyonunu ele alır.`,
  sources: ["MARPOL Annex VI Reg. 18", "ISO 8217", "SOPEP"],
  chapters: [
    {
      heading: "1. Yürütme",
      sections: [
        {
          subheading: "1.1 Hazırlık ve rate",
          paragraphs: [`Pre-bunker meeting yapılır; scupper plug ve SOPEP hazır. İlk akış yavaş, topping-up el ile. Yolcu varken ek güvenlik/iletişim önlemleri uygulanır.`],
          bullets: [`Pre-bunker meeting + checklist`, `Scupper plug + SOPEP`, `Initial slow, topping-up el ile`, `Yolcu güvenliği önlemleri`],
        },
      ],
    },
    {
      heading: "2. Numune ve Kayıt",
      sections: [
        {
          subheading: "2.1 BDN ve numune",
          paragraphs: [`Mühürlü MARPOL numunesi alınır ve saklanır; BDN doğrulanır, deftere işlenir.`],
          callouts: [
            { type: "warning", title: "Dökülme", text: `Overflow başlıca kirlilik nedenidir; topping-up el ile ve gözlemle yapılır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Checklist tamam mı?`, `SOPEP hazır mı?`, `Numune alındı mı?`, `BDN + defter kaydı yapıldı mı?`],
        },
      ],
    },
  ],
};

export default content;
