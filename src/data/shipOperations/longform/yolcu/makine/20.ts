import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Alarm ve otomasyon (AMS) sistemi kontrolü",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 20,
  estimatedPages: 14,
  intro: `Alarm Monitoring System (AMS) ve otomasyon, özellikle UMS modunda emniyetin temelidir; sensör kalibrasyonu ve alarm testleri düzenli yapılır. Sahte alarmlar duyarsızlaşmaya yol açar. Bu bölüm AMS kontrolünü ele alır.`,
  sources: ["Class Rules (automation/UMS)", "Maker manuals"],
  chapters: [
    {
      heading: "1. Kontrol",
      sections: [
        {
          subheading: "1.1 Kalibrasyon/test",
          paragraphs: [`Sensörler kalibre edilir; alarm noktaları ve dead-man test edilir. UMS modunda bridge/cabin aktarımı doğrulanır.`],
          bullets: [`Sensör kalibrasyonu`, `Alarm noktası testi`, `Dead-man/UMS aktarımı`],
        },
      ],
    },
    {
      heading: "2. Sahte Alarm ve Kontrol",
      sections: [
        {
          subheading: "2.1 Desensitization",
          paragraphs: [`Tekrarlayan sahte alarmlar gerçek alarmın atlanmasına yol açar; kök neden giderilir.`],
          callouts: [
            { type: "tip", title: "Alarm hijyeni", text: `Sahte alarmlar giderilmeli; gereksiz suppress güvenliği zayıflatır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Sensörler kalibre mi?`, `Alarmlar test edildi mi?`, `UMS aktarımı çalışıyor mu?`, `Test log güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
