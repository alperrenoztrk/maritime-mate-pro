import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP drilling, FPSO ve riser izleme",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 21,
  estimatedPages: 22,
  intro: `DP drilling ve FPSO operasyonlarında gemi, riser/flex-joint açıları, watch circle ve disconnect kriterleri içinde tutularak uzun süreli station-keeping sağlar. Mevki toleransı içinde kalmak riser açısının güvenli olduğu anlamına gelmeyebilir; disconnect için gereken süre çevre ve WCF senaryosundan uzunsa operasyon zarfı uygun değildir. Bu bölüm riser izleme ve disconnect yönetimini ele alır.`,
  sources: [
    "IMCA M103",
    "IMCA M160",
    "Vessel CAMO/ASOG",
    "Drilling/FPSO operations manual",
  ],
  chapters: [
    {
      heading: "1. Zarf ve Limitler",
      sections: [
        {
          subheading: "1.1 Koordinat ve açı limitleri",
          bullets: [
            `Wellhead, riser, flex-joint ve seabed yapılarının koordinatını/datumunu doğrula`,
            `İzin verilen riser angle, watch circle, excursion ve emergency disconnect limitlerini ASOG'a gir`,
            `Deepwater için bağımsız surface ve subsea PRS kombinasyonu, acoustic geometri ve common-mode hatayı değerlendir`,
          ],
        },
      ],
    },
    {
      heading: "2. İzleme ve Disconnect",
      sections: [
        {
          subheading: "2.1 Riser açısı + DP trendi",
          paragraphs: [
            `Riser angle monitoring ile DP pozisyon trendi birlikte izlenir; relaxed position/heading yalnızca onaylı zarf içinde kullanılır. WCF, drive-off/drift-off veya çevresel limitte secure well, disconnect ve escape route sırası uygulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tolerans ≠ güvenli açı",
              text: `Mevki toleransı içinde kalmak, riser açısının güvenli olduğu anlamına gelmeyebilir; disconnect süresi çevre/WCF'den uzunsa zarf uygun değildir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Drilling/FPSO son kontrol",
          bullets: [
            `Riser angle, watch circle ve disconnect limitleri ASOG'da mı?`,
            `Bağımsız surface + subsea PRS ve common-mode değerlendirmesi yapıldı mı?`,
            `Disconnect süresi çevre/WCF senaryosuyla uyumlu mu?`,
            `Riser angle log ve disconnect readiness checklist hazır mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
