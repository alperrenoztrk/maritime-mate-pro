import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Shuttle tanker ve offshore loading",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 20,
  estimatedPages: 22,
  intro: `SPM, SAL, OLS, STL veya tandem loading sırasında shuttle tanker, terminale göre emniyetli sektör, mesafe ve hawser/hortum yüklerini korumalıdır. Tek bir göreceli hedef hatası gemiyi terminale doğru sürebilir; hawser tension ve hose limiti aşılırsa kargo sızıntısı ile çarpışma aynı anda gelişebilir. Bu bölüm offshore loading'in DP tarafını ele alır.`,
  sources: [
    "IMCA M103",
    "IMCA M159",
    "Terminal loading manual",
    "Vessel ASOG",
  ],
  chapters: [
    {
      heading: "1. Loading Konsepti",
      sections: [
        {
          subheading: "1.1 Sektör ve referans ihtiyacı",
          bullets: [
            `Loading konsepti, weather-vaning merkezi, yaklaşma sektörü`,
            `Absolute/relative PRS ihtiyacı (ör. DARPS) belirle`,
            `Hawser tension, hose envelope, terminal ofseti ve ESD/ERS fonksiyonlarını test et`,
          ],
        },
      ],
    },
    {
      heading: "2. Divergence İzleme ve Ayrılma",
      sections: [
        {
          subheading: "2.1 FSO/FPSO hareketi ile birlikte",
          paragraphs: [
            `FSO/FPSO hareketi ve geminin coğrafi mevkisi birlikte izlenir; divergence alarm limitleri doğrulanır. Drive-off/drift-off, hawser overload veya relative PRS kaybı alarmları ASOG aksiyonlarıyla eşleştirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tek göreceli hedef hatası",
              text: `Tek bir göreceli hedef hatası gemiyi terminale doğru sürebilir; mutlak mevkiyle çapraz kontrol gerekir.`,
            },
          ],
        },
        {
          subheading: "2.2 ESD/ERS sırası",
          paragraphs: [
            `Yellow/Red durumda transfer durdurulur; ESD/ERS ve ayrılma sırası onaylı terminal prosedürüne göre uygulanır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Offshore loading son kontrol",
          bullets: [
            `Absolute + relative PRS ile çapraz kontrol var mı?`,
            `Divergence alarm limitleri doğrulandı mı?`,
            `ESD/ERS test edildi ve sırası biliniyor mu?`,
            `Hawser/hose log ve DARPS/PRS record tutuluyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
