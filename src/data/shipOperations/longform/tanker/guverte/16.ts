import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Passage plan oluşturma ve ECDIS güncelleme",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 16,
  estimatedPages: 18,
  intro: `Passage plan, berth-to-berth (rıhtımdan rıhtıma) seyrin appraisal-planning-execution-monitoring döngüsüyle hazırlanmasıdır. Tanker rotalarında TSS, VTS, reporting point ve UKC yönetimi özel önem taşır. Bu bölüm planın hazırlığı ve ECDIS güncelliğini ele alır.`,
  sources: ["SOLAS V/34 (Voyage planning)", "IMO Res. A.893(21)", "SOLAS V/27 (charts up to date)"],
  chapters: [
    {
      heading: "1. Appraisal ve Planning",
      sections: [
        {
          subheading: "1.1 ENC güncelliği ve safety parametreleri",
          paragraphs: [
            `ENC kataloğu güncellenir (NtM, T&P), safety contour, safety depth ve shallow contour gemi draftı + UKC'ye göre ayarlanır. Check route ile no-go area, sığlık ve yasak bölge uyarıları tek tek değerlendirilir.`,
          ],
          bullets: [
            `ENC update + NtM`,
            `Safety contour/depth, UKC payı`,
            `Pilot boarding + reporting point`,
            `TSS/VTS uyum`,
          ],
        },
      ],
    },
    {
      heading: "2. Execution ve Monitoring",
      sections: [
        {
          subheading: "2.1 İzleme",
          paragraphs: [
            `Seyir boyunca XTD (cross-track distance), wheel-over noktaları ve UKC izlenir; sapmalarda erken düzeltme yapılır. Plan Master onaylı olur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Berth-to-berth",
              text: `Plan pilotaj sahasını ve manevra bölgelerini de kapsamalı; pilot varlığı plan sorumluluğunu kaldırmaz.`,
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
            `ENC güncel, check route koşuldu mu?`,
            `Safety parametreleri drafta göre ayarlandı mı?`,
            `TSS/VTS/reporting noktaları işlendi mi?`,
            `Plan Master onaylı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
