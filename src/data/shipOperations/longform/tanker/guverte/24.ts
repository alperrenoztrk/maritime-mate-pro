import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "P/V valf ve IGS baskı/vakum ayarı",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 24,
  estimatedPages: 14,
  intro: `Pressure/Vacuum (P/V) valfleri ve IGS basınç kontrolü, tankı hem aşırı basınca hem vakuma karşı korur. Setpoint hatası veya tıkalı flame screen tank rupture/implozyon riskini doğurur. Bu bölüm P/V ve IGS basınç ayarını ele alır.`,
  sources: ["SOLAS II-2", "ISGOTT 6th edition"],
  chapters: [
    {
      heading: "1. P/V Valf",
      sections: [
        {
          subheading: "1.1 Setpoint ve flame screen",
          paragraphs: [
            `P/V valf setpoint'i (yay gerginliği) periyodik test edilir; flame screen temizliği yapılır. Stuck-closed bir P/V valf, basınç birikiminde tank rupture'a yol açar.`,
          ],
          bullets: [
            `Set-point/yay gerginliği testi`,
            `Flame screen temizliği`,
            `Stuck valve kontrolü`,
          ],
        },
      ],
    },
    {
      heading: "2. IGS Basınç Kontrolü",
      sections: [
        {
          subheading: "2.1 Auto-control kalibrasyonu",
          paragraphs: [
            `IGS otomatik basınç kontrolü kalibre edilir; tank daima pozitif basınçta tutulur. Sensör/aktüatör arızası alarmla bildirilmeli.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tank rupture/implozyon",
              text: `P/V valf arızası aşırı basınçta rupture, vakumda implozyon yapar; test atlanmaz.`,
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
            `P/V setpoint test edildi mi?`,
            `Flame screen temiz mi?`,
            `IGS auto pressure kalibre mi?`,
            `P/V valve test record dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
