import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Klima (HVAC) sistemi bakımı ve kabin sıcaklık yönetimi",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 2,
  estimatedPages: 16,
  intro: `Yolcu gemilerinde HVAC, konfor ve sağlık (hava kalitesi, Legionella önleme) açısından kritiktir; chiller, hava işleme üniteleri ve filtrelerin bakımı düzenli yapılır. Bu bölüm HVAC bakımını ele alır.`,
  sources: ["Maker manuals", "WHO/Legionella guidance", "ISO HVAC standards"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Chiller/filtre/Legionella",
          paragraphs: [
            `Chiller ve hava işleme üniteleri bakıma alınır; filtreler temizlenir/değiştirilir. Soğutma kuleleri ve nemlendiriciler Legionella riski açısından dezenfekte edilir.`,
          ],
          bullets: [`Chiller bakımı`, `Filtre temizlik/değişim`, `Legionella önleme (dezenfeksiyon)`, `Kabin sıcaklık kontrolü`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Hava kalitesi",
          paragraphs: [`Kötü bakımlı HVAC, hava kalitesi sorunları ve Legionella salgını riski yaratır; dezenfeksiyon ihmal edilmez.`],
          callouts: [
            { type: "warning", title: "Legionella", text: `Su/hava sistemlerinde Legionella üreyebilir; dezenfeksiyon programı titiz uygulanır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Chiller/filtre bakımı yapıldı mı?`, `Dezenfeksiyon uygulandı mı?`, `Sıcaklık kontrolü çalışıyor mu?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
