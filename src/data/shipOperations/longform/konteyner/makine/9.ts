import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Reefer plug paneli ve soğutma (refrigerant) kompresör bakımı",
  shipType: "konteyner",
  dept: "makine",
  opIndex: 9,
  estimatedPages: 14,
  intro: `Reefer plug panelleri yüksek elektrik yükü taşır; bağlantı güvenliği, ısınma ve refrigerant sistemleri makine ekibinin sorumluluğundadır. Bu bölüm reefer elektrik/soğutma bakımını ele alır.`,
  sources: ["Maker manuals", "Electrical safety procedures"],
  chapters: [
    {
      heading: "1. Plug Paneli",
      sections: [
        {
          subheading: "1.1 Bağlantı ve ısınma",
          paragraphs: [
            `Plug ve soketler ısınma/oksitlenme açısından (gerekirse termal kamera) denetlenir; gevşek bağlantı ark/yangın riski yaratır. Yük dağılımı izlenir.`,
          ],
          bullets: [`Soket ısınma kontrolü`, `Gevşek bağlantı taraması`, `Yük dağılımı`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Elektrik güvenliği",
          paragraphs: [
            `Plug çalışmalarında uygun izolasyon/LOTO uygulanır; refrigerant kaçağı tespiti yapılır.`,
          ],
          callouts: [
            { type: "warning", title: "Gevşek soket", text: `Yüksek akımda gevşek bağlantı ısınıp yangın çıkarabilir; düzenli kontrol kritiktir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Soketler ısınma açısından kontrol edildi mi?`, `Yük dağılımı normal mi?`, `Refrigerant kaçağı var mı?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
