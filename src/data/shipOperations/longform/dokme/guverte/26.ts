import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Tahtakurusu (rat) ve zararlı kontrolü",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 26,
  estimatedPages: 12,
  intro: `Kemirgen ve haşere kontrolü; özellikle gıda/tahıl yüklerinde hijyen ve halk sağlığı açısından kritiktir. Deratting/Sanitation sertifikası ve rat guard uygulaması liman gerekliliğidir. Bu bölüm zararlı kontrolünü ele alır.`,
  sources: ["IHR 2005 (Ship Sanitation Certificate)", "Port health requirements"],
  chapters: [
    {
      heading: "1. Kontrol",
      sections: [
        {
          subheading: "1.1 Önlemler",
          paragraphs: [
            `Rat guard halatlara takılır; yemleme istasyonları ve hijyen önlemleri uygulanır. Ship Sanitation Certificate geçerli tutulur.`,
          ],
          bullets: [`Rat guard`, `Yemleme istasyonları`, `Hijyen önlemleri`, `Sanitation certificate`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Rat guard takıldı mı?`, `Yemleme/izleme yapılıyor mu?`, `Sertifika geçerli mi?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Zararlı bulgusu gıda yüklerinde reddedilmeye ve karantinaya yol açabilir.`],
        },
      ],
    },
  ],
};

export default content;
