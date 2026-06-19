import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bunkering operasyonu — yakıt kabulü, ullage ve ORB II kaydı",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 2,
  estimatedPages: 18,
  intro: `Bunkering; pre-bunker toplantısı, safety checklist, kontrollü rate, mühürlü numune ve BDN disiplinini gerektirir. Dökülme ve yanlış miktar başlıca risklerdir; tüm hareketler ORB'a kaydedilir. Bu bölüm bunker operasyonunu ele alır.`,
  sources: ["MARPOL Annex VI Reg. 18", "ISO 8217", "SOPEP/SMPEP"],
  chapters: [
    {
      heading: "1. Yürütme",
      sections: [
        {
          subheading: "1.1 Hazırlık ve rate",
          paragraphs: [
            `Pre-bunker meeting yapılır; scupper plug, drip tray ve SOPEP hazır tutulur. İlk akış yavaş, topping-up el ile yönetilir. Tank ullage'leri takip edilir.`,
          ],
          bullets: [`Pre-bunker meeting + checklist`, `Scupper plug + SOPEP`, `Initial slow, topping-up el ile`],
        },
      ],
    },
    {
      heading: "2. Numune ve Kayıt",
      sections: [
        {
          subheading: "2.1 BDN ve numune",
          paragraphs: [
            `Mühürlü MARPOL numunesi alınır ve saklanır; BDN doğrulanır ve uygun deftere (ORB) işlenir. Kükürt içeriği kullanım bölgesine uygun olmalıdır.`,
          ],
          callouts: [
            { type: "warning", title: "Dökülme", text: `Overflow başlıca kirlilik nedenidir; topping-up el ile ve sürekli gözlemle yapılır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Checklist tamam mı?`, `SOPEP hazır mı?`, `Mühürlü numune alındı mı?`, `BDN + defter kaydı yapıldı mı?`],
        },
      ],
    },
  ],
};

export default content;
