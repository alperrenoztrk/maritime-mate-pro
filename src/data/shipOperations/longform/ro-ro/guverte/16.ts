import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Personel ve yük güvenliği kontrol listeleri",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 16,
  estimatedPages: 12,
  intro: `Ro-Ro operasyonlarında yoğun araç trafiği ve personel hareketi kaza riskini artırır; standart kontrol listeleri (PPE, trafik yönetimi, lashing) güvenliği sistematik kılar. Bu bölüm güvenlik kontrol listelerini ele alır.`,
  sources: ["ISM Code", "Company safety procedures"],
  chapters: [
    {
      heading: "1. Kontrol Listeleri",
      sections: [
        {
          subheading: "1.1 Trafik ve PPE",
          paragraphs: [
            `Araç güvertesinde yaya-araç ayrımı, PPE (hi-vis, baret), egzoz/CO yönetimi ve lashing kontrolü standart listelerle uygulanır.`,
          ],
          bullets: [`Yaya-araç ayrımı`, `PPE (hi-vis)`, `CO/egzoz yönetimi`, `Lashing kontrolü`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Trafik yönetimi uygulandı mı?`, `PPE kullanılıyor mu?`, `Ventilasyon yeterli mi?`, `Listeler imzalandı mı?`],
        },
      ],
    },
  ],
};

export default content;
