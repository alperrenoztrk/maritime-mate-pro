import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Kargo Pompaları (Cargo / Stripping / Booster)",
  sectionId: "cargo-systems",
  topicIndex: 0,
  estimatedPages: 25,
  intro: `Tanker kargo pompaları, sıvı yükü tanktan terminale yüksek debide aktaran ana elleçleme makineleridir. Sistem; ana kargo pompaları, son kalıntıyı alan stripping (sıyırma) pompaları ve gerektiğinde basıncı artıran booster pompalardan oluşur. Bu bölüm; kargo pompası tiplerini (santrifüj/deepwell/framo, pistonlu stripping), tahrik yöntemlerini (steam turbine, hidrolik/elektrik deepwell), kargo manifoldu ve hat düzenini, stripping ve drenaj mantığını, kavitasyon/gas-binding sorununu ve emniyet (overpressure, ESD) ile bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "ISGOTT 6th edition — cargo operations",
    "SOLAS Ch. II-2 — pump room safety",
    "Framo / cargo pump üretici el kitapları",
    "OCIMF / SIRE kargo sistem kriterleri",
  ],
  chapters: [
    {
      heading: "1. Pompa Tipleri ve Tahrik",
      sections: [
        {
          subheading: "1.1 Santrifüj, deepwell, framo",
          paragraphs: [
            `Geleneksel tankerlerde pompa dairesinde (pump room) santrifüj kargo pompaları bulunur; tahrik makine dairesinden şaftla veya buhar türbiniyle gelir. Modern ürün/kimyasal tankerlerde her tankın dibinde ayrı bir deepwell/hidrolik tahrikli (örn. Framo) pompa vardır; segregation (ayrım) ve verim üstündür, pump room ortadan kalkar.`,
          ],
          table: {
            headers: ["Tip", "Yerleşim", "Avantaj"],
            rows: [
              ["Santrifüj (pump room)", "Merkezi pompa dairesi", "Yüksek debi, basit"],
              ["Deepwell/Framo", "Her tank dibinde", "Segregation, verim, pump room yok"],
              ["Stripping (pistonlu)", "Son kalıntı", "Düşük seviyede sıyırma"],
            ],
          },
        },
        {
          subheading: "1.2 Booster ve stripping",
          paragraphs: [
            `Booster pompa, uzun hat veya yüksek terminal karşı basıncında debiyi korumak için ana pompaya seri eklenir. Stripping pompası ise tank dibindeki son sıvıyı (santrifüj pompanın alamadığı düşük seviye) sıyırarak alır; genelde pozitif deplasmanlı/eductor ile çalışır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Hat Düzeni ve Manifold",
      sections: [
        {
          subheading: "2.1 Manifold ve segregation",
          paragraphs: [
            `Kargo manifoldu, gemi hatlarının terminal kollarına (loading arm/hose) bağlandığı orta noktadır. Çoklu parsel (multi-grade) yüklerde her parsel ayrı pompa/hat/valf seti ile taşınmalı (segregation); karışma (commingling) kabul edilmez. Valf düzeni ve hat haritası operasyon öncesi netleşir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Drip tray ve SOPEP",
              text: `Manifold altında damlama tepsisi (drip tray) ve uygun tıkaçlar bulunur; sızıntı denize ulaşmadan toplanır. SOPEP ekipmanı hazır tutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Operasyon ve Sorunlar",
      sections: [
        {
          subheading: "3.1 Kavitasyon ve gas-binding",
          paragraphs: [
            `Santrifüj kargo pompası, tank seviyesi düşünce yetersiz emiş (düşük NPSH) nedeniyle kavitasyona girer; ayrıca uçucu yüklerde pompa içinde gaz birikip (gas-binding/vapour lock) debi kesilebilir. Bu durumda debi düşürülür, stripping moduna geçilir veya pompa primingi yenilenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Düşük seviye yönetimi",
              text: `Tank tabanına yaklaşıldığında ana pompa hava/gaz çeker; verim düşer. Doğru zamanda stripping pompasına geçilerek tank temiz boşaltılır.`,
            },
          ],
        },
        {
          subheading: "3.2 Emniyet: ESD ve overpressure",
          paragraphs: [
            `Acil durdurma (ESD — Emergency Shutdown) sistemi, terminalle senkron çalışıp tehlikede pompaları/valfleri güvenli sırada durdurur. Kapalı valfe karşı pompalama hattı aşırı basınçlar; bu yüzden valf sırası ve basınç izleme kritiktir. Pump room gaz algılama ve havalandırması zorunludur.`,
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım",
          paragraphs: [
            `Bakım; mekanik salmastra ve sızdırmazlık (cofferdam izleme), rulman/yatak, hidrolik sistem (Framo) yağ ve basınç, manifold valf ve aşınma halkalarını kapsar. Pump room gaz dedektörleri ve bilge alarmı düzenli test edilir.`,
          ],
          bullets: [
            `Framo hidrolik yağ ve cofferdam izleme`,
            `Mekanik salmastra sızıntı kontrolü`,
            `Pump room gaz/bilge alarm testi`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Debi düşük/kesik", "Kavitasyon/gas-binding", "Seviye/debi yönet, stripping'e geç"],
              ["Pompa basmıyor", "Priming/valf sırası", "Hat ve valf düzenini doğrula"],
              ["Salmastra sızıntısı", "Seal aşınması", "Seal değişimi, cofferdam kontrol"],
              ["Framo basınç düşük", "Hidrolik sistem", "Hidrolik basınç/yağ kontrolü"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
