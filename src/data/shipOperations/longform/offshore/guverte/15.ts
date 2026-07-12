import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "ROV ve survey desteği",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 15,
  estimatedPages: 18,
  intro: `ROV/survey desteğinde gemi ya sabit mevkide tutulur ya da tanımlı bir track üzerinde yumuşak ve öngörülebilir hareket ettirilir; amaç ROV/TMS/umbilical geometrisini korumaktır. Ani baş değişimi umbilical'i thruster akımına veya yapıya sürükleyebilir. Bu bölüm ROV ile eşgüdümlü DP kontrolünü ele alır.`,
  sources: [
    "IMCA M103",
    "IMCA M252",
    "Project ROV/survey procedures",
  ],
  chapters: [
    {
      heading: "1. Planlama ve Çakışma Kontrolü",
      sections: [
        {
          subheading: "1.1 Güzergâh ve interference",
          bullets: [
            `Launch/recovery, çalışma mevkii, TMS ve umbilical güzergâhını ROV control ile planla`,
            `Taut wire, acoustic transducer, dalış hattı ve over-side ekipmanla çakışmayı kontrol et`,
            `ROV acoustic responder ile gemi PRS kaynaklarının frekans/güncelleme uyumunu doğrula`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Acoustic girişim",
              text: `Acoustic sistemlerin birbirini girişimle bozması ortak pozisyon hatası oluşturabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Hareket Yönetimi",
      sections: [
        {
          subheading: "2.1 Küçük artışlar",
          paragraphs: [
            `Move/heading change talepleri küçük artışlarla uygulanır ve ROV control'den her adımda teyit alınır. Kayıp telemetry, aşırı umbilical tension veya DP bozulmasında recovery/abandon kriteri uygulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ani baş değişimi",
              text: `Ani baş değişimi umbilical'i thruster akımına veya yapıya sürükleyebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 ROV desteği son kontrol",
          bullets: [
            `Umbilical güzergâhı ve over-side çakışması planlandı mı?`,
            `Acoustic frekans uyumu doğrulandı mı?`,
            `Hareketler küçük artışlarla ve teyitli mi?`,
            `Recovery/abandon kriteri tanımlı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
