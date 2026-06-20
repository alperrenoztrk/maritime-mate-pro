import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Şiddetli hava koşullarında güverte güvenlik önlemleri",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 16,
  estimatedPages: 14,
  intro: `Ağır havada açık güvertelerin kapatılması, dış aktivitelerin kısıtlanması ve yolcu uyarıları, yaralanmayı önler. Bu bölüm ağır hava güverte önlemlerini ele alır.`,
  sources: ["SOLAS V", "Company heavy weather procedures"],
  chapters: [
    {
      heading: "1. Önlemler",
      sections: [
        {
          subheading: "1.1 Güverte kapatma ve uyarı",
          paragraphs: [
            `Ağır hava beklentisinde açık güverteler/havuzlar kapatılır; outdoor aktiviteler durdurulur. Yolculara anonsla uyarı yapılır, hareketli eşyalar emniyete alınır.`,
          ],
          bullets: [`Açık güverte/havuz kapatma`, `Outdoor restriction`, `Yolcu uyarısı`, `Eşya emniyeti`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Güverteler kapatıldı mı?`, `Aktiviteler durduruldu mu?`, `Yolcular uyarıldı mı?`, `Eşyalar emniyete alındı mı?`],
        },
      ],
    },
  ],
};

export default content;
