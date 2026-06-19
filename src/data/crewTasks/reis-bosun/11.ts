import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Hatch cover ve weather deck sızdırmazlık bakımı",
  roleSlug: "reis-bosun",
  taskIndex: 11,
  estimatedPages: 23,
  intro: `Ambar kapakları (hatch cover) ve hava güvertesi (weather deck) açıklıklarının sızdırmazlığı, yükün deniz suyundan korunmasının ve geminin su geçmezliğinin temelidir; sızdıran bir hatch cover, yük hasarı, stabilite sorunu ve büyük tazminat anlamına gelir. Reis (Bosun); rubber gasket temizliği, drain channel açıklığı, cleating mekanizması yağlaması, compression bar kontrolü ve tank vent/sounding pipe/manhole gibi güverte açıklıklarının bütünlüğünden sorumludur. Bu bölüm hatch cover ve weather deck sızdırmazlık bakımını ele alır.`,
  sources: [
    "SOLAS Chapter II-1 — watertight/weathertight integrity",
    "International Load Line Convention — hatch cover/openings",
    "Üretici hatch cover (MacGregor vb.) bakım el kitapları",
    "Ultrasonic / hose test prosedürleri",
    "P&I — yük hasarı ve hatch cover claim'leri",
  ],
  chapters: [
    {
      heading: "1. Sızdırmazlığın Önemi",
      sections: [
        {
          subheading: "1.1 Yük ve gemi güvenliği",
          paragraphs: [
            `Hatch cover sızdırmazlığı, ambardaki yükü deniz suyundan ve geminin su geçmezliğini korur. Sızdıran bir kapak; yük hasarı (özellikle tahıl, çelik, hassas yük), küf/ıslanma ve büyük tazminat doğurur. Reis, bu sızdırmazlığı koruyan bakımın doğrudan yük güvenliği olduğunu bilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Load Line ve weathertight",
              text: `Hatch cover ve güverte açıklıkları, Load Line Convention kapsamında hava ve su geçmezliği (weathertight) sağlamalıdır. Bütünlük, geminin yükleme sınırı ve emniyeti için yasal bir gerekliliktir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Hatch Cover Bakımı",
      sections: [
        {
          subheading: "2.1 Gasket, compression bar, drain",
          paragraphs: [
            `Reis; rubber gasket'lerin temiz, esnek ve hasarsız olmasını, compression bar'ın gasket'e düzgün baskı yapmasını ve drain channel'ların (su tahliye kanalları) açık tutulmasını sağlar. Tıkalı bir drain, içeri su sızdırır; ezilmiş/kalıcı deforme gasket sızdırmazlığı bozar.`,
          ],
          bullets: [
            `Rubber gasket: temiz, esnek, hasarsız`,
            `Compression bar: düzgün, pas/çentik yok`,
            `Drain channel ve non-return valve: açık`,
            `Cleating/securing mekanizması: yağlı, çalışır`,
          ],
        },
        {
          subheading: "2.2 Cleating ve yağlama",
          paragraphs: [
            `Kapağı kapalı tutan cleating/securing mekanizması (cleats, wedges, hydraulic) yağlanır ve çalışır tutulur. Tutmayan bir cleating, ağır havada kapağın açılmasına ve ambar su almasına yol açabilir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Sızdırmazlık Testi",
      sections: [
        {
          subheading: "3.1 Hose test ve ultrasonik test",
          paragraphs: [
            `Sızdırmazlık; hose test (yüksek basınçlı su) veya ultrasonik test ile doğrulanır. Reis, test öncesi kapakların hazırlığını yapar (gasket/drain temiz, kapak doğru oturmuş). Ultrasonik test, sızıntı noktasını sayısal olarak gösterir ve yükleme öncesi güvence sağlar.`,
          ],
          table: {
            caption: "Sızdırmazlık testleri",
            headers: ["Test", "Yöntem"],
            rows: [
              ["Hose test", "Yüksek basınçlı su, içeriden gözlem"],
              ["Ultrasonik test", "Verici/alıcı ile kaçak ölçümü"],
              ["Chalk test", "Compression bar temas izi"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Weather Deck Açıklıkları",
      sections: [
        {
          subheading: "4.1 Vent, sounding pipe, manhole",
          paragraphs: [
            `Tank vent head, sounding pipe head ve manhole cover gibi güverte açıklıkları periyodik kontrol edilir; vent head'in float/flame screen'i, sounding pipe kapağı ve manhole conta/cıvataları su geçmezliği sağlar. Bunlardaki bir kusur, tanka/voide su girişine yol açabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Küçük açıklık, büyük risk",
              text: `Bozuk bir vent head veya açık bırakılan bir sounding pipe kapağı, ağır havada tanka su alarak stabiliteyi ve yükü tehlikeye atabilir. Bu küçük açıklıklar düzenli kontrol edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Korozyon ve Bütünlük",
      sections: [
        {
          subheading: "5.1 Pas ve deformasyon",
          paragraphs: [
            `Hatch cover panelleri, coaming ve güverte açıklıkları korozyona karşı izlenir; ileri korozyon hem yapısal hem sızdırmazlık riski yaratır. Reis, korozyon noktalarını boya programına alır ve ciddi deformasyonu Birinci Zabite raporlar.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Sızdırmazlık bakım kontrolü",
          bullets: [
            `Gasket temiz, esnek ve hasarsız mı?`,
            `Compression bar düzgün, pas/çentik yok mu?`,
            `Drain channel ve non-return valve açık mı?`,
            `Cleating/securing yağlı ve çalışır mı?`,
            `Hose/ultrasonik test öncesi hazırlık yapıldı mı?`,
            `Vent head/sounding pipe/manhole bütünlüğü kontrol edildi mi?`,
            `Korozyon noktaları boya programına alındı mı?`,
          ],
          paragraphs: [
            `Hatch cover ve weather deck sızdırmazlık bakımı, Reisin yükü ve gemiyi denizden koruyan en somut görevlerindendir. Temiz gasket, açık drain, çalışan cleating ve sağlam güverte açıklıkları; ağır havada bile ambarların kuru kalmasını ve yükün güvenle taşınmasını sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
