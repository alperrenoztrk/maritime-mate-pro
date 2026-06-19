import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Gas freeing prosedürü",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 8,
  estimatedPages: 20,
  intro: `Gas freeing, tank temizliği sonrası tankın insan girişine uygun hale getirilmesi için yapılan kontrollü ventilasyon işlemidir. Doğru sıra (inert → purge → gas free) izlenmezse ventilasyon sırasında patlayıcı atmosfer (kritik dilüsyon bölgesi) oluşabilir. Bu bölüm güvenli gas freeing ve enclosed space entry öncesi şartları ele alır.`,
  sources: [
    "ISGOTT 6th edition",
    "IMO MSC.1/Circ.1401 (tank cleaning/gas freeing)",
    "SOLAS III/19 — Enclosed space entry drills",
  ],
  chapters: [
    {
      heading: "1. Gas Freeing Mantığı",
      sections: [
        {
          subheading: "1.1 Neden önce purge?",
          paragraphs: [
            `Inert (oksijensiz, HC'li) bir tank doğrudan hava ile ventile edilirse, HC konsantrasyonu zenginden fakire geçerken patlayıcı aralıktan (kritik dilüsyon hattı) geçer ve oksijen de girdiğinden patlayıcı atmosfer oluşur. Bunu önlemek için önce inert gaz ile purge yapılarak HC, alev alma sınırının çok altına (örn. hacimce < %2) indirilir; ancak ardından hava verilir.`,
          ],
          bullets: [
            `İnert + HC zengin → doğrudan hava VERME`,
            `Önce purge: HC'yi kritik dilüsyon altına indir`,
            `Sonra gas free: O2 %21, HC < LFL %1`,
          ],
        },
      ],
    },
    {
      heading: "2. Aşamalar ve Ölçüm",
      sections: [
        {
          subheading: "2.1 Inert → Purge → Gas free",
          paragraphs: [
            `Purge aşamasında inert gaz ile HC seyreltilir; ardından hava ventilasyonu ile O2 %21'e, HC ise LFL'nin altına (%1 LFL) çekilir. Tüm aşamalarda çoklu noktadan sürekli gaz ölçümü (O2, HC/LEL, gerekirse H2S, benzen) yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kritik dilüsyon bölgesi",
              text: `Doğrudan hava ile ventilasyon HC'yi patlayıcı aralıktan geçirir. Sıra (inert→purge→gas free) atlanamaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Enclosed Space Entry",
      sections: [
        {
          subheading: "3.1 Giriş izni ve önlemler",
          paragraphs: [
            `Gas free certificate alınmadan tanka giriş yapılmaz. Enclosed space entry permit; sürekli gaz ölçümü, standby personel, haberleşme, kurtarma planı ve ventilasyonun sürmesi şartlarını içerir. SOLAS III/19 kapsamında düzenli enclosed space entry/rescue drill yapılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/19",
              text: `Kapalı alana giriş ve kurtarma tatbikatları düzenli yapılmalı; gaz testi olmadan giriş kesinlikle yasaktır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kontrol Listesi",
      sections: [
        {
          subheading: "4.1 Son kontrol",
          bullets: [
            `Purge tamamlandı, HC kritik seviye altında mı?`,
            `O2 %21, HC < %1 LFL doğrulandı mı?`,
            `Gas free certificate düzenlendi mi?`,
            `Enclosed space entry permit + standby + rescue plan hazır mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
