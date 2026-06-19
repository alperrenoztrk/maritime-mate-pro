import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yangın ve duman algılama sistemi kontrolü",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 23,
  estimatedPages: 14,
  intro: `Cargo deck ve accommodation yangın/duman algılama sistemleri, erken müdahalenin temelidir. Düzenli fonksiyon testi ve sahte alarm analizleri sistemin güvenilirliğini korur. Bu bölüm algılama sistemi kontrolünü ele alır.`,
  sources: ["SOLAS II-2 Reg. 7 (Detection and alarm)"],
  chapters: [
    {
      heading: "1. Test ve Bakım",
      sections: [
        {
          subheading: "1.1 Fonksiyon testi",
          paragraphs: [
            `Smoke ve heat dedektörleri ile sample extraction (cargo hold) sistemleri periyodik test edilir; alarm panelinde doğru zone gösterimi doğrulanır.`,
          ],
          bullets: [
            `Periyodik fonksiyon testi`,
            `Zone gösterimi doğrulama`,
            `Sample extraction hat kontrolü`,
          ],
        },
      ],
    },
    {
      heading: "2. Sahte Alarm",
      sections: [
        {
          subheading: "2.1 Desensitization riski",
          paragraphs: [
            `Tekrarlayan sahte alarmlar personeli duyarsızlaştırır; kök neden (toz, nem, sensör yaşı) analiz edilip giderilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kök neden analizi",
              text: `Sahte alarmlar göz ardı edilmez; her biri kaydedilir ve nedeni giderilir.`,
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
            `Fonksiyon testi yapıldı mı?`,
            `Zone gösterimi doğru mu?`,
            `Sahte alarm nedenleri analiz edildi mi?`,
            `Fire detection log güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
