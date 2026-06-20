import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Rampa hidrolik sistemi bakımı ve testi",
  shipType: "ro-ro",
  dept: "makine",
  opIndex: 0,
  estimatedPages: 16,
  intro: `Rampa ve bow/stern door hidrolik sistemi; silindir, pompa, hortum ve kilit aktüatörlerinin bakımıyla güvenli ve sızdırmaz çalışır. Hidrolik arızası yük operasyonunu durdurur ve sızdırmazlığı bozar. Bu bölüm rampa hidroliğini ele alır.`,
  sources: ["Rampa maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Silindir/kilit aktüatör",
          paragraphs: [
            `Silindir ve hortumlar sızıntı açısından denetlenir; kilit (locking) aktüatörlerinin tam kapanma/açılma sırası test edilir. Hidrolik yağ temizliği ve basınç testi yapılır.`,
          ],
          bullets: [`Silindir/hortum sızıntı`, `Kilit aktüatör testi`, `Hidrolik yağ + basınç testi`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Sızdırmazlık ile bağ",
          paragraphs: [
            `Rampa kilitleri tam kapanmazsa sızdırmazlık ve gemi güvenliği bozulur; hidrolik bakım, kapı sızdırmazlığının ayrılmaz parçasıdır.`,
          ],
          callouts: [
            { type: "warning", title: "Kilit arızası", text: `Kilit aktüatörü tam çalışmazsa kapı denizde açılabilir; test atlanmaz.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Sızıntı var mı?`, `Kilit aktüatörleri test edildi mi?`, `Basınç testi geçti mi?`, `Kayıt tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
