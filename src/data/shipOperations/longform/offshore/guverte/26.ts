import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP olayı, near-miss ve station-keeping raporu",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 26,
  estimatedPages: 20,
  intro: `Loss of position, loss of automatic control, undesired event ve downtime olaylarının kök nedenleri, kanıt korunarak araştırılmalıdır. Restart baskısı altında elektronik kayıtların üzerine yazılmasına izin verilmez; sadece son arızalı parçayı bulmak kök neden analizi değildir. Bu bölüm olay müdahalesi, kanıt koruma ve station-keeping raporlamayı ele alır.`,
  sources: [
    "ISM Code",
    "IMCA Station-Keeping Event Reporting",
    "IMCA M166",
    "Company incident procedure",
  ],
  chapters: [
    {
      heading: "1. İlk Müdahale ve Kanıt",
      sections: [
        {
          subheading: "1.1 Önce güvenlik, sonra kanıt",
          bullets: [
            `Önce insanları ve görevi güvenli duruma al; gerekli dış bildirimleri Master/şirket zinciriyle başlat`,
            `DP, PMS/VMS, alarm, trend, VDR, iletişim ve ekran görüntülerini zaman damgasıyla koru`,
            `Olay anındaki iş, çevre, control mode, switchboard, DG, thruster, PRS ve sensör durumunu kaydet`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Restart baskısı",
              text: `Restart baskısı altında elektronik kayıtların üzerine yazılmasına izin verilmemelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kök Neden ve Raporlama",
      sections: [
        {
          subheading: "2.1 Sequence of events",
          paragraphs: [
            `Sequence of events ile initiating event, hidden failure, human factor ve bariyer başarısızlıkları ayrıştırılır. Düzeltici/önleyici faaliyetler sorumlu ve terminle belirlenir; FMEA, ASOG, prosedür ve eğitim ihtiyacı güncellenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sektörel paylaşım",
              text: `Şirket sürecine göre IMCA station-keeping event paylaşımı değerlendirilir; sektör benzer olaylardan öğrenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Olay raporu son kontrol",
          bullets: [
            `İnsan/görev güvenli duruma alındı ve bildirim yapıldı mı?`,
            `Elektronik kayıtlar zaman damgasıyla korundu mu?`,
            `Sequence of events ve kök neden ayrıştırıldı mı?`,
            `Corrective action tracker ve station-keeping event form dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
