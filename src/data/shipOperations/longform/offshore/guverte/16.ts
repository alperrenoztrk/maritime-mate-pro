import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "PSV platform ikmal operasyonu",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 16,
  estimatedPages: 20,
  intro: `Platform Supply Vessel (PSV) ikmali, platforma yakın açık güverte ve bulk kargo transferini kısa terminate time ve açık kaçış hattı korunarak yürütür. Bağlı bulk hose veya askıdaki yük geminin kaçış manevrasını sınırlayabilir; açık güvertedeki serbest sıvı stabiliteyi hızla etkiler. Bu bölüm PSV ikmalinin DP tarafını ele alır.`,
  sources: [
    "MSF 182 Rev. 4 (OSV Marine Ops)",
    "IMCA M103",
    "IMCA M220",
    "Platform marine procedures",
  ],
  chapters: [
    {
      heading: "1. Yaklaşım ve Sektör Seçimi",
      sections: [
        {
          subheading: "1.1 Blow-off çalışma sektörü",
          bullets: [
            `Kargo planı, hortum/loose cargo düzeni, platform crane planı ve iletişim kanalını teyit et`,
            `Mümkünse drift-off/blow-off çalışma sektörü seç`,
            `Kaçış yönünü kargo hortumu ve tesis engelleriyle birlikte değerlendir`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kaçışı sınırlayan bağlantı",
              text: `Bağlı bulk hose veya askıdaki yük geminin kaçış manevrasını sınırlayabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Transfer Kontrolü",
      sections: [
        {
          subheading: "2.1 Referans ve marj izleme",
          paragraphs: [
            `Final mevkide relative ve absolute referanslar karşılaştırılır; çevresel limit ve thrust marjı ASOG'a göre izlenir. Hortum, crane load ve personel güvertedeyken izinsiz setpoint/heading değişikliği yapılmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Serbest sıvı",
              text: `Açık güvertedeki serbest sıvı ve yük kayması stabiliteyi hızla etkileyebilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Durdurma kriteri",
          paragraphs: [
            `Hava, güç, thruster, PRS veya hortum gerilimi limiti aşılırsa transfer durdurulur, hatlar ayrılır ve güvenli mesafeye çıkılır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 PSV ikmal son kontrol",
          bullets: [
            `500 m entry ve OSV pre-work checklist tamam mı?`,
            `Blow-off sektörü ve açık kaçış hattı var mı?`,
            `Relative + absolute PRS karşılaştırılıyor mu?`,
            `Cargo transfer log ve weather/DP log tutuluyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
