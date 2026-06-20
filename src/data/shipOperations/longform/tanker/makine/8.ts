import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Kargo ısıtma (tank heating) sistemi kontrolü",
  shipType: "tanker",
  dept: "makine",
  opIndex: 8,
  estimatedPages: 16,
  intro: `Ağır kargolar (fuel oil, asfalt) belirli sıcaklıkta tutulmazsa pompalanamaz; steam coil/heating ile kontrollü ısıtma yapılır. Aşırı ısıtma flashpoint ve kargo bozulma riski yaratır. Bu bölüm tank heating kontrolünü ele alır.`,
  sources: ["IBC Code (chemicals)", "ISGOTT", "Cargo heating instructions"],
  chapters: [
    {
      heading: "1. Isıtma Yönetimi",
      sections: [
        {
          subheading: "1.1 Coil ve heat-up rate",
          paragraphs: [
            `Heating coil sızıntı testi yapılır (kargoya su/buhar kaçağı kontaminasyon yaratır). Heat-up rate, kargo talimatına göre kontrollü uygulanır; sıcaklık hedef aralıkta tutulur.`,
          ],
          bullets: [
            `Coil sızıntı testi`,
            `Heat-up rate plana göre`,
            `Hedef sıcaklık takibi`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Aşırı ısıtma",
          paragraphs: [
            `Aşırı ısıtma kargonun flashpoint'ine yaklaşmasına ve bozulmasına yol açar; sıcaklık üst sınırı izlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Flashpoint riski",
              text: `Aşırı ısıtma kargo flashpoint'ine yaklaştırır; hedef aralık aşılmaz.`,
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
            `Coil sızıntı testi yapıldı mı?`,
            `Heat-up rate plana uygun mu?`,
            `Sıcaklık hedef aralıkta mı?`,
            `Cargo heating log güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
