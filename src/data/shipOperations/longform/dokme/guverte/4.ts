import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Grain stability hesabı (doldurulmamış ambarlı yük)",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 4,
  estimatedPages: 18,
  intro: `Tahıl (grain) yükü kayabilir; slack (tam dolmamış) hold'larda yük kayması (grain shift) heeling moment yaratır. International Grain Code, volumetric heeling moment hesabı ve stabilite kriterlerini zorunlu kılar. Bu bölüm grain stability'yi ele alır.`,
  sources: ["International Grain Code (SOLAS VI)", "Grain loading manual", "NCB requirements"],
  chapters: [
    {
      heading: "1. Grain Shift Riski",
      sections: [
        {
          subheading: "1.1 Heeling moment",
          paragraphs: [
            `Slack hold'larda tahıl yüzeyi kayarak heeling moment üretir; bu moment grain stability kriterleriyle (GZ alanı, heel açısı) karşılaştırılır. Trimming/securing ile kayma azaltılır.`,
          ],
          bullets: [`Volumetric heeling moment`, `Slack hold sınırlandırma`, `Trimming/securing`],
        },
      ],
    },
    {
      heading: "2. Uygunluk ve Onay",
      sections: [
        {
          subheading: "2.1 Grain Code kriterleri",
          paragraphs: [
            `Hesap, onaylı grain loading booklet ile yapılır; bazı limanlarda NCB inspection gerekir. Kriterler sağlanmadan grain yüklenmez.`,
          ],
          callouts: [
            { type: "regulation", title: "Grain Code", text: `Heel açısı ve residual GZ alanı kriterleri sağlanmalı; aksi halde yükleme uygun değildir.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Heeling moment hesaplandı mı?`, `Kriterler sağlandı mı?`, `Slack hold'lar sınırlı mı?`, `Onay/booklet mevcut mu?`],
        },
      ],
    },
  ],
};

export default content;
