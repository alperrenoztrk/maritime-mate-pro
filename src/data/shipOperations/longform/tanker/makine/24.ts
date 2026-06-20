import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Alarm ve otomasyon sistemi kontrolü",
  shipType: "tanker",
  dept: "makine",
  opIndex: 24,
  estimatedPages: 14,
  intro: `Alarm Monitoring System (AMS) ve otomasyon, özellikle UMS (unmanned machinery space) modunda emniyetin temelidir; sensör kalibrasyonu ve alarm testleri düzenli yapılır. Sahte alarmlar duyarsızlaşmaya yol açar. Bu bölüm AMS kontrolünü ele alır.`,
  sources: ["Class Rules (automation/UMS)", "Maker manuals"],
  chapters: [
    {
      heading: "1. Kontrol",
      sections: [
        {
          subheading: "1.1 Kalibrasyon ve test",
          paragraphs: [
            `Sensörler periyodik kalibre edilir; alarm noktaları ve dead-man alarm test edilir. UMS modunda bridge/cabin alarm aktarımı doğrulanır.`,
          ],
          bullets: [
            `Sensör kalibrasyonu`,
            `Alarm noktası testi`,
            `Dead-man / UMS aktarımı`,
          ],
        },
      ],
    },
    {
      heading: "2. Sahte Alarm",
      sections: [
        {
          subheading: "2.1 Desensitization",
          paragraphs: [
            `Tekrarlayan sahte alarmlar gerçek alarmın atlanmasına yol açar; kök neden giderilir, alarm bastırma (suppress) kayıt altına alınır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Alarm hijyeni",
              text: `Sahte alarmlar giderilmeli; gereksiz alarm bastırma güvenliği zayıflatır.`,
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
            `Sensörler kalibre mi?`,
            `Alarm noktaları test edildi mi?`,
            `UMS aktarımı çalışıyor mu?`,
            `Alarm test log güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
