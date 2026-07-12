import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "ECR-DP kontrol merkezi bakım ve izin koordinasyonu",
  shipType: "offshore",
  dept: "makine",
  opIndex: 8,
  estimatedPages: 18,
  intro: `Online güç, propulsion veya kontrol sisteminde yapılacak her müdahale, DP kabiliyeti üzerindeki etkisi işlem öncesi ortak değerlendirilmeden başlatılamaz. Tek bir local-control seçimi ASOG'u Yellow/Red yapabilir; "bakım tamamlandı" kabulü gerçek function test olmadan verilmemelidir. Bu bölüm ECR-DP izin koordinasyonunu ele alır.`,
  sources: [
    "ISM Code",
    "IMCA M220",
    "Vessel PTW/LOTO procedure",
    "Vessel CAMO",
  ],
  chapters: [
    {
      heading: "1. İş Öncesi Değerlendirme",
      sections: [
        {
          subheading: "1.1 Etki ve pencere",
          bullets: [
            `İş kapsamını, izole edilecek ekipmanı ve failure effect'i FMEA/CAMO üzerinden belirle`,
            `DPO, Chief Engineer ve görev sorumlusuyla ASOG statüsü ve uygun iş penceresini mutabık kal`,
            `PTW/LOTO, test ve geri dönüş planını hazırla`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tek local seçimi",
              text: `Bridge izni olmadan online ekipman local/stop konumuna alınmaz; tek bir local-control seçimi ASOG'u Yellow/Red yapabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. İş Sırası ve Geri Dönüş",
      sections: [
        {
          subheading: "2.1 Bildirim ve function test",
          paragraphs: [
            `İş sırasında yeni alarm veya konfigürasyon değişikliği anında DP control'e bildirilir. İş bitiminde function testi yapılır, tüm bypass/isolasyonlar kaldırılır ve consequence analysis doğrulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Function test şart",
              text: `Bakım tamamlandı kabulü, gerçek function test olmadan verilmemelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Bakım koordinasyonu son kontrol",
          bullets: [
            `Failure effect FMEA/CAMO ile belirlendi mi?`,
            `ASOG statüsü ve iş penceresi mutabık mı?`,
            `PTW/LOTO ve bridge izni alındı mı?`,
            `Return-to-service function test yapıldı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
