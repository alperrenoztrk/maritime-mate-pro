import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bunker operasyonu planlaması ve yürütme",
  shipType: "tanker",
  dept: "makine",
  opIndex: 9,
  estimatedPages: 18,
  intro: `Bunker (yakıt ikmali); pre-bunker toplantısı, safety checklist, kontrollü rate, mühürlü numune ve BDN (Bunker Delivery Note) disiplinini gerektirir. Dökülme ve yanlış miktar başlıca risklerdir. Bu bölüm bunker operasyonunu ele alır.`,
  sources: ["MARPOL Annex VI Reg. 18 (fuel quality/BDN)", "ISO 8217", "SOPEP"],
  chapters: [
    {
      heading: "1. Hazırlık ve Yürütme",
      sections: [
        {
          subheading: "1.1 Pre-bunker meeting ve rate",
          paragraphs: [
            `Operasyon öncesi pre-bunker toplantısı yapılır; sıralı tank planı, rate ve acil durdurma mutabık kalınır. İlk akış yavaş başlatılır, topping-up el ile yönetilir. Scupper plug ve bonding sağlanır.`,
          ],
          bullets: [
            `Pre-bunker meeting + checklist`,
            `Initial slow, topping-up el ile`,
            `Scupper plug + SOPEP hazır`,
          ],
        },
      ],
    },
    {
      heading: "2. Numune ve BDN",
      sections: [
        {
          subheading: "2.1 Mühürlü numune",
          paragraphs: [
            `MARPOL numunesi mühürlü olarak alınır ve belirlenen süre (örn. 12 ay) saklanır. BDN içeriği doğrulanır ve ORB I'a uygun kod (Code H) ile işlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Dökülme",
              text: `Bunkerde overflow yaygın bir kirlilik nedenidir; topping-up el ile ve sürekli gözlemle yapılır.`,
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
            `Pre-bunker checklist tamam mı?`,
            `Scupper plug + SOPEP hazır mı?`,
            `Mühürlü numune alındı mı?`,
            `BDN + ORB I (Code H) işlendi mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
