import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP alarm, PMS/VMS trend ve failure teşhisi",
  shipType: "offshore",
  dept: "makine",
  opIndex: 9,
  estimatedPages: 20,
  intro: `Bir teknik arıza drive-off, drift-off veya blackout'a dönüşmeden önce, ilk alarm ile sonraki alarm zinciri ayrıştırılarak gerçek neden teşhis edilmelidir. Alarm selinde son alarmı neden sanmak yanlış müdahaleye yol açar; kayıt alınmadan reset/reboot olay kanıtını yok eder. Bu bölüm alarm analizi ve failure teşhisini ele alır.`,
  sources: [
    "IMCA M247 (DP Incident Analysis / Components)",
    "IMCA M166",
    "IMCA M206",
    "Company incident procedure",
  ],
  chapters: [
    {
      heading: "1. Zaman Ekseninde Ayrıştırma",
      sections: [
        {
          subheading: "1.1 Sequence of events",
          bullets: [
            `DP, PMS, IAS/VMS ve switchboard alarm saatlerini aynı zaman kaynağına göre karşılaştır`,
            `İlk alarm, breaker hareketi, generator/thruster trip ve control mode değişimini sequence halinde çıkar`,
            `Frekans, voltaj, kW/kVAr, thrust feedback, cooling ve network trendlerini incele`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Alarm seli tuzağı",
              text: `Alarm selinde son alarmı neden sanmak yanlış müdahaleye yol açar; ilk (initiating) alarm aranır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Neden ve Kalıcı Düzeltme",
      sections: [
        {
          subheading: "2.1 Common-cause ve reset disiplini",
          paragraphs: [
            `Failure mode FMEA ve IMCA M247 component listesiyle eşleştirilir; common-cause ihtimali araştırılır. Geçici reset yerine güvenli konfigürasyon, ASOG statüsü ve kalıcı düzeltici faaliyet belirlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kayıtsız reset",
              text: `Kayıt alınmadan reset/reboot yapmak olay kanıtını yok edebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Teşhis son kontrol",
          bullets: [
            `Alarm saatleri ortak zamana göre hizalandı mı?`,
            `İlk alarm ve sequence of events çıkarıldı mı?`,
            `Common-cause ihtimali değerlendirildi mi?`,
            `Reset öncesi kayıt/export alındı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
