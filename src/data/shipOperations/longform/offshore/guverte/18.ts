import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "S-lay, J-lay ve reel-lay boru döşeme",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 18,
  estimatedPages: 22,
  intro: `Boru döşemede gemi, boru hattındaki overbend, sagbend ve touchdown gerilmelerini koruyacak şekilde önceden belirlenmiş bir koridorda kontrollü ilerletilir. Ani surge veya hız değişimi pipe buckle ve abandonment riski yaratır; bu yüzden DP setpoint hareketi firing line ve tensioner ekibiyle teyitli yürütülür. Bu bölüm S-lay, J-lay ve reel-lay yöntemlerinin DP tarafını ele alır.`,
  sources: [
    "IMCA M253 (Pipelay)",
    "IMCA M103",
    "Project pipelay manual",
    "Vessel ASOG",
  ],
  chapters: [
    {
      heading: "1. Rota ve Ekipman",
      sections: [
        {
          subheading: "1.1 Koridor ve tension",
          bullets: [
            `Route, bathymetry, crossing, lay direction ve corridor/heading limitlerini yükle`,
            `Tensioner, stinger, A&R winch ve load-cell verisini DP/operasyon ekranıyla doğrula`,
            `Lay tension ve touchdown point limitlerini ASOG ile ilişkilendir`,
          ],
        },
      ],
    },
    {
      heading: "2. Yönteme Göre İlerleme",
      sections: [
        {
          subheading: "2.1 S-lay / J-lay / reel-lay",
          paragraphs: [
            `S-lay'de joint boyuna uygun incremental move; J-lay ve reel-lay'de onaylı düşük hız auto-track uygulanır. Kaynak/üretim gecikmesi, tension kaybı, DP excursion veya WCF halinde hold, laydown ya da abandon prosedürü başlatılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ani surge = buckle",
              text: `Ani surge veya hız değişimi pipe buckle ve abandonment riski yaratır; DP setpoint hareketi firing line ve tensioner ekibiyle teyitsiz yapılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Pipelay son kontrol",
          bullets: [
            `Koridor/heading limitleri yüklü ve tension ASOG'a bağlı mı?`,
            `Tensioner/stinger/A&R load-cell doğrulandı mı?`,
            `Yönteme uygun move/auto-track modu seçildi mi?`,
            `Laydown/abandon checklist hazır mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
