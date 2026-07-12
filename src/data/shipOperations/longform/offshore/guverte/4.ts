import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Mobilizasyon, saha varış ve pre-DP kontrolleri",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 4,
  estimatedPages: 20,
  intro: `Liman çıkışı, proje değişimi veya uzun bakım sonrası DP sisteminin göreve hazır olduğu, kutu işaretlemeyle değil kontrollü testlerle doğrulanır. Field arrival trials ve pre-DP checklist, gizli arızaların 500 m bölgesine girmeden önce yakalandığı son güvenlik ağıdır. Bu bölüm mobilizasyondan permit to commence operations aşamasına kadar olan doğrulamayı ele alır.`,
  sources: [
    "IMO MSC.1/Circ.1580",
    "IMCA M190 (Annual DP Trials)",
    "IMCA M220",
  ],
  chapters: [
    {
      heading: "1. Mobilizasyon ve Saha Varış",
      sections: [
        {
          subheading: "1.1 Mobilizasyon checklist",
          paragraphs: [
            `Proje, müşteri veya uzun bakım sonrası mobilizasyon checklisti tamamlanır; kurulan görev ekipmanı, PRS eklemeleri ve yazılım değişiklikleri kayıt altına alınır.`,
          ],
        },
        {
          subheading: "1.2 Field arrival trials",
          bullets: [
            `Güç, thruster ve kontrol zincirini gerçek fonksiyonla doğrula`,
            `PRS, sensör, alarm ve haberleşmeyi test et`,
            `Son FMEA, annual trials ve defect listesindeki açık kısıtları oku`,
          ],
        },
      ],
    },
    {
      heading: "2. Pre-DP Kontrolleri",
      sections: [
        {
          subheading: "2.1 Konfigürasyon eşleşmesi",
          paragraphs: [
            `Pre-DP checklistte mevcut konfigürasyonun CAMO/TAM ve ASOG ile eşleştiği kontrol edilir. Master ve Chief Engineer onayı olmadan permit to commence operations verilmez.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Self-test yeterli değil",
              text: `Yalnızca self-test sonucu, itki ve güç zincirinin gerçek yük altındaki performansını kanıtlamaz; checklist kutu işaretleme değil fiziksel doğrulama sürecidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Pre-DP son kontrol",
          bullets: [
            `Mobilisation checklist tamamlandı mı?`,
            `Field arrival trials tüm fonksiyonlarda başarılı mı?`,
            `Konfigürasyon CAMO/TAM ve ASOG ile eşleşiyor mu?`,
            `Master + Chief Engineer permit to commence operations verdi mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
