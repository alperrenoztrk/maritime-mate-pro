import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Hava raporu takibi (yükleme/boşaltma sürecinde)",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 26,
  estimatedPages: 14,
  intro: `Yükleme/boşaltma sırasında hava koşulları, özellikle yıldırım (lightning) ve fırtına, transfer güvenliğini doğrudan etkiler. Yıldırım, açığa çıkan kargo buharını ateşleyebilir. Bu bölüm hava takibi ve transfer durdurma kriterlerini ele alır.`,
  sources: ["ISGOTT 6th edition", "Terminal weather criteria"],
  chapters: [
    {
      heading: "1. Hava İzleme",
      sections: [
        {
          subheading: "1.1 Yıldırım ve rüzgar",
          paragraphs: [
            `Yıldırım radarı ve hava raporları izlenir; yıldırım belirlenen mesafeye (örn. < 5 NM) yaklaşırsa transfer durdurulur. Güçlü rüzgar (gust) mooring ve hortum gerginliği açısından değerlendirilir.`,
          ],
          bullets: [
            `Yıldırım < eşik mesafe → stop transfer`,
            `Gust > eşik → değerlendirme`,
            `Sis/görüş → manevra etkisi`,
          ],
        },
      ],
    },
    {
      heading: "2. Durdurma Kriterleri",
      sections: [
        {
          subheading: "2.1 Karar ve koordinasyon",
          paragraphs: [
            `Transfer durdurma kararı terminal ile koordineli alınır; venting ve manifold açıkken yıldırım en yüksek risktir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yıldırım + buhar",
              text: `Açık venting/manifold ile yıldırım patlama riski yaratır; eşik aşıldığında derhal durdurulur.`,
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
            `Yıldırım/hava izleniyor mu?`,
            `Durdurma eşikleri tanımlı mı?`,
            `Terminal ile koordinasyon var mı?`,
            `Weather log tutuluyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
