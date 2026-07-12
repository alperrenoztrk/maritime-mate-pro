import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Accommodation vessel ve walk-to-work gangway",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 22,
  estimatedPages: 20,
  intro: `Walk-to-work operasyonunda personel, hareket kompanzasyonlu bir gangway ile sabit veya hareketli tesise geçirilir. Gemi, gangway'in hareket ve yük limitleri içinde kalacak güvenli relative position'da tutulmalıdır; gangway bağlıyken kontrolsüz excursion ciddi personel yaralanması ve yapısal hasar yapar. Bu bölüm gangway transferinin DP tarafını ele alır.`,
  sources: [
    "IMCA M254",
    "IMCA M103",
    "Walk-to-work operations manual",
    "Project ASOG",
  ],
  chapters: [
    {
      heading: "1. Kurulum ve Limitler",
      sections: [
        {
          subheading: "1.1 Landing point ve stroke",
          bullets: [
            `Gangway landing point'ini DP center of rotation ve tesis hareketiyle tanımla`,
            `Relative PRS, heave compensation, gangway stroke ve warning/trip limitlerini test et`,
            `Facility footprint ile gemi watch circle'ını ve WCF sonrası hareketi karşılaştır`,
          ],
        },
      ],
    },
    {
      heading: "2. Transfer Sırasında Kontrol",
      sections: [
        {
          subheading: "2.1 İletişim ve limit yaklaşımı",
          paragraphs: [
            `Transfer boyunca DPO, gangway operator ve tesis kontrol odası arasında kesintisiz haberleşme sağlanır. Limit yaklaşımında yeni geçiş durdurulur; Yellow/Red veya gangway trip halinde planlı disconnect/recovery uygulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Bağlıyken excursion",
              text: `Gangway bağlıyken kontrolsüz excursion ciddi personel yaralanmasına ve yapısal hasara yol açar. Tesisin hareketi relative PRS ve gangway sensörlerinde ortak hata oluşturabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Gangway son kontrol",
          bullets: [
            `Landing point ve stroke/trip limitleri test edildi mi?`,
            `Watch circle facility footprint ile uyumlu mu?`,
            `DPO–gangway operator–tesis iletişimi kesintisiz mi?`,
            `Personnel transfer log ve relative PRS check tutuluyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
