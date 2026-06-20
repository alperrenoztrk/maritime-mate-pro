import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Dalgıç kargo pompası (submerged/deepwell) bakımı",
  shipType: "tanker",
  dept: "makine",
  opIndex: 1,
  estimatedPages: 16,
  intro: `Ürün/kimyasal tankerlerde her tankın kendi dalgıç (deepwell/submerged) pompası bulunur; hidrolik motor + impeller + seal yapısı kargo kontaminasyonu açısından kritiktir. Bu bölüm dalgıç pompa bakımını ele alır.`,
  sources: ["Class Rules", "Pump maker manuals"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Hidrolik ve seal",
          paragraphs: [
            `Hidrolik yağ analiz edilir; seal sızıntısı (cofferdam drain) izlenir çünkü hidrolik yağın kargoya karışması kontaminasyon yaratır. Motor insulation periyodik ölçülür.`,
          ],
          bullets: [
            `Hidrolik yağ analizi`,
            `Seal/cofferdam drain izleme`,
            `Motor insulation ölçümü`,
          ],
        },
      ],
    },
    {
      heading: "2. Kontaminasyon Riski",
      sections: [
        {
          subheading: "2.1 İzleme",
          paragraphs: [
            `Cofferdam drain'de hidrolik yağ tespiti seal arızasının erken işaretidir; ihmal kargo claim'e yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kargo kontaminasyonu",
              text: `Seal arızasında hidrolik yağ kargoya karışabilir; cofferdam drain düzenli kontrol edilir.`,
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
            `Hidrolik yağ analiz edildi mi?`,
            `Cofferdam drain temiz mi?`,
            `Motor insulation uygun mu?`,
            `PMS report dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
