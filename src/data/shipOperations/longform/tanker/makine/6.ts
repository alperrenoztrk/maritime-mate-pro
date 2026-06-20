import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Isı eşanjörü temizliği ve bakımı",
  shipType: "tanker",
  dept: "makine",
  opIndex: 6,
  estimatedPages: 14,
  intro: `Cargo heater ve LO/FW cooler gibi ısı eşanjörleri, ısı transfer verimini korumak için periyodik temizlik (CIP) gerektirir. Kirlenmiş plakalar verim kaybı ve aşırı ısınma yapar. Bu bölüm eşanjör bakımını ele alır.`,
  sources: ["Maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. Temizlik ve Kontrol",
      sections: [
        {
          subheading: "1.1 CIP ve plaka kontrolü",
          paragraphs: [
            `CIP (cleaning in place) periyodik yapılır; plate tipi eşanjörlerde plakalar aşınma/çatlak açısından denetlenir. CIP kimyasalları için uygun PPE şarttır.`,
          ],
          bullets: [
            `Periyodik CIP`,
            `Plate aşınma/çatlak kontrolü`,
            `Conta yenileme`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Kimyasal güvenliği",
          paragraphs: [
            `CIP kimyasalları aşındırıcıdır; SDS'e göre PPE ve havalandırma sağlanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "CIP kimyasalı",
              text: `Aşındırıcı CIP kimyasalı için eldiven/gözlük/önlük zorunludur; SDS okunur.`,
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
            `CIP yapıldı mı?`,
            `Plakalar denetlendi mi?`,
            `PPE kullanıldı mı?`,
            `Heat exchanger PMS dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
