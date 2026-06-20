import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yük dağılımı ve gerilim/bükülme (SF/BM) hesabı",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 3,
  estimatedPages: 16,
  intro: `Dökme yük gemilerinde ağır yoğunluklu yükler (cevher) hold tabanına yoğun yük bindirir; shear force ve bending moment limitleri her aşamada korunmalıdır. Bu bölüm SF/BM yönetimini ele alır.`,
  sources: ["Loading manual", "Class hull strength limits", "IMSBC Code"],
  chapters: [
    {
      heading: "1. Mukavemet",
      sections: [
        {
          subheading: "1.1 Sagging/hogging",
          paragraphs: [
            `Yük dağılımı sagging/hogging dengesini belirler; cevher gibi yüksek yoğunluklu yüklerde tank top yük yoğunluğu (load density) sınırları da kontrol edilir.`,
          ],
          bullets: [`SF/BM %100 altında`, `Tank top load density limiti`, `%85 üzeri revizyon`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`SF/BM limit içinde mi?`, `Load density aşıldı mı?`, `Ara adımlar doğrulandı mı?`, `Çıktı saklandı mı?`],
          paragraphs: [`Aşırı lokal yük yoğunluğu çift dip yapısında hasara yol açabilir.`],
        },
      ],
    },
  ],
};

export default content;
