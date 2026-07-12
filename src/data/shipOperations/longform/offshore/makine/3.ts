import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Switchboard ve bus-tie konfigürasyon yönetimi",
  shipType: "offshore",
  dept: "makine",
  opIndex: 3,
  estimatedPages: 20,
  intro: `Açık (open) veya kapalı (closed) bus işletmesi, FMEA ile kanıtlanmış sınırlar içinde kalmalı ve bir arıza yedek gruplar arasında yayılmamalıdır. Onaysız bir bus-tie değişikliği WCF'yi ve DP sınıfını anında değiştirebilir; protection seçicilik hatası tüm plant blackout'una dönüşebilir. Bu bölüm switchboard/bus-tie konfigürasyon yönetimini ele alır.`,
  sources: [
    "IMCA M206",
    "IMCA M166",
    "Class rules",
    "Approved switching procedure",
  ],
  chapters: [
    {
      heading: "1. Topoloji ve Koruma",
      sections: [
        {
          subheading: "1.1 Onaylı bus konfigürasyonu",
          bullets: [
            `Operasyon için onaylı bus topolojisini CAMO ve single-line diagramdan doğrula`,
            `Bus-tie breaker protection, interlock, differential protection ve blackout prevention'ı kontrol et`,
            `Closed-bus'ta FMEA/proving trials fault ride-through ve isolation varsayımını sağladığını teyit et`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Closed-bus varsayımı",
              text: `Closed-bus, ancak proving trials fault ride-through ve isolation'ı kanıtladıysa güvenlidir; protection ayarındaki seçicilik hatası tüm plant blackout'una dönüşebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Switching Yönetimi",
      sections: [
        {
          subheading: "2.1 Planlı değişiklik",
          paragraphs: [
            `Planlı switching için risk değerlendirmesi yapılır, DPO/Master izni alınır ve mümkünse kritik faaliyet durdurulur. Switching sonrası PMS/DP mimic, load sharing, consequence analysis ve alarm durumu çapraz kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Onaysız değişiklik",
              text: `Onaysız bus-tie değişikliği WCF'yi ve DP sınıfını anında değiştirebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Switchboard son kontrol",
          bullets: [
            `Bus topolojisi onaylı ve CAMO ile uyumlu mu?`,
            `Protection/interlock/differential fonksiyonları test edildi mi?`,
            `Switching risk değerlendirmesi ve izni var mı?`,
            `Switching sonrası consequence analysis doğrulandı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
