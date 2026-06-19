import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Statik elektrik (earthing) önlemi ve kontrol",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 22,
  estimatedPages: 16,
  intro: `Statik elektrik; splashing, free fall ve filtre yükü (filter charge) gibi nedenlerle birikir ve patlayıcı atmosferde kıvılcımla ateşleme yapabilir. Önlem; düşük başlangıç rate'i, bonding ve uygun ekipman seçimidir. Bu bölüm statik elektrik kontrolünü ele alır.`,
  sources: ["ISGOTT 6th edition — Ch. 3 (Static electricity)"],
  chapters: [
    {
      heading: "1. Statik Birikim Mekanizmaları",
      sections: [
        {
          subheading: "1.1 Risk kaynakları",
          paragraphs: [
            `Sıvının türbülanslı akışı, serbest düşüş (free fall), su damlacıkları ve filtreler statik yük üretir. Özellikle ilk yükleme dakikalarında düşük rate ile çalışmak birikimi sınırlar.`,
          ],
          bullets: [
            `İlk 30 dk düşük rate`,
            `Free fall önleme (splash filling yasağı)`,
            `Bonding cable bağlı`,
            `Non-conductive hose kullanımı yasak`,
          ],
        },
      ],
    },
    {
      heading: "2. Önlemler",
      sections: [
        {
          subheading: "2.1 Bekleme süreleri",
          paragraphs: [
            `Statik biriktiren kargolarda ölçüm/örnekleme öncesi belirlenen bekleme (settling) sürelerine uyulur; metalik aletler tanka indirilmeden önce bonding kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Static spark",
              text: `Patlayıcı atmosferde tek bir statik kıvılcım yeterlidir; bonding ve rate kontrolü atlanmaz.`,
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
            `İlk akış düşük rate mı?`,
            `Bonding/insulating flange uygun mu?`,
            `Settling süreleri uygulandı mı?`,
            `Pre-transfer checklist'te statik maddeleri işaretli mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
