import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Reefer Container Plug ve Soğutma Devresi",
  sectionId: "cargo-systems",
  topicIndex: 5,
  estimatedPages: 22,
  intro: `Reefer (soğutmalı) konteynerler, soğuk zincir kargosunu (gıda, ilaç) kontrollü sıcaklıkta taşır; gemi, bu konteynerlere elektrik beslemesi (reefer plug), izleme ve yeterli güç altyapısı sağlamalıdır. Bu bölüm; reefer konteyner soğutma devresini (kompresör-kondenser-evaporatör), gemi reefer soketi ve güç dağıtımını (440V/3-faz), set sıcaklığı izleme ve kayıt (PTI/monitoring) gereksinimini, controlled atmosphere ve havalandırma kavramını, güç yükü ve emniyet (yalıtım/topraklama) ile bakım/arızayı ele alır.`,
  sources: [
    "IIR / reefer container handbook",
    "Klas kuralları — reefer power & monitoring",
    "Üretici el kitapları (Carrier, Thermo King, Daikin)",
    "Soğuk zincir kargo taşıma kılavuzları",
  ],
  chapters: [
    {
      heading: "1. Soğutma Devresi",
      sections: [
        {
          subheading: "1.1 Kompresör-kondenser-evaporatör",
          paragraphs: [
            `Reefer ünitesi standart soğutma çevrimiyle çalışır: kompresör soğutucu gazı sıkıştırır, kondenser (hava soğutmalı) ısıyı dışarı atar, genleşme valfi basıncı düşürür ve evaporatör konteyner içinden ısı çekerek yükü soğutur. Set sıcaklığı (örn. -18 °C donmuş, +2 °C taze) mikrokontrolör ile korunur.`,
          ],
          bullets: [
            `Kompresör → kondenser → genleşme → evaporatör`,
            `Set sıcaklığı kontrolörle korunur`,
            `Frozen vs chilled farklı set/kontrol`,
          ],
        },
        {
          subheading: "1.2 Havalandırma ve controlled atmosphere",
          paragraphs: [
            `Taze meyve/sebze solunum yapar (CO₂/etilen üretir); fresh air vent havalandırma ayarı bu gazları kontrol eder. Controlled atmosphere (CA) reefer'larda O₂/CO₂ oranı aktif yönetilir, olgunlaşma yavaşlatılır. Bu ayarlar kargo talimatına (carrying instructions) göre yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Gemi Güç Altyapısı",
      sections: [
        {
          subheading: "2.1 Reefer plug ve güç dağıtımı",
          paragraphs: [
            `Gemi, reefer alanlarında standart 440V/3-faz soketler (reefer plug) sağlar. Toplam reefer sayısı geminin reefer güç kapasitesini (kVA) belirler; jeneratör yükü buna göre planlanır. Soketler suya/korozyona dayanıklı, topraklı ve devre korumalı olmalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Güç planlaması",
              text: `Çok sayıda reefer aynı anda devreye girince elektrik yükü ani artar; jeneratör kapasitesi ve preferential trip dikkate alınmazsa blackout riski oluşur.`,
            },
          ],
        },
        {
          subheading: "2.2 İzleme ve PTI",
          paragraphs: [
            `Reefer'lar düzenli olarak fiziksel veya uzaktan izlenir; set sıcaklığı, gerçek sıcaklık, alarm ve besleme durumu kayda geçer (reefer monitoring). Yükleme öncesi PTI (Pre-Trip Inspection) ünitenin sağlamlığını doğrular. Sıcaklık kaydı kargo iddialarında kanıttır.`,
          ],
          table: {
            headers: ["İzlenen", "Neden"],
            rows: [
              ["Set vs gerçek sıcaklık", "Kargo bütünlüğü"],
              ["Besleme/akım", "Plug/güç sorunu"],
              ["Alarm durumu", "Arıza erken tespit"],
              ["Havalandırma/CA ayarı", "Kargo talimatı uyumu"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Emniyet",
      sections: [
        {
          subheading: "3.1 Elektrik emniyeti",
          paragraphs: [
            `Reefer soketleri ıslak güverte ortamında çalışır; topraklama, izolasyon izleme ve devre kesici koruması şarttır. Plug bağlantısı enerji kesikken yapılmalı; hasarlı kablo/soket kullanılmamalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Enerjisiz bağlantı",
              text: `Reefer plug takma/çıkarma işlemi mümkünse devre enerjisizken yapılır; ark ve çarpılma riskini azaltır. Hasarlı soket derhal işaretlenir.`,
            },
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
            `Gemi tarafında bakım; soket/kablo bütünlüğü, devre kesici ve topraklama testi, izleme sistemi ve güç dağıtım panosu kontrolünü kapsar. Ünite içi soğutma bakımı genelde kara servisidir; gemide arıza tespiti ve kayıt yapılır.`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Reefer beslenmiyor", "Plug/soket/devre kesici", "Soket ve devre kontrolü"],
              ["Sıcaklık set'i tutmuyor", "Ünite arızası/havalandırma", "PTI, ayar, servis"],
              ["Sık devre atması", "İzolasyon/aşırı akım", "İzolasyon ölçümü, kablo kontrol"],
              ["İzleme verisi yok", "Monitoring/iletişim", "İzleme sistemi kontrolü"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
