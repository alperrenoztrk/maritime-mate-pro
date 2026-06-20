import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Dizel Jeneratörler",
  sectionId: "auxiliary",
  topicIndex: 0,
  estimatedPages: 25,
  intro: `Dizel jeneratörler (diesel generators / D/G), geminin elektrik enerjisini üreten ana güç kaynağıdır; bir dört zamanlı dizel motor ile alternatörün eşleşmesinden oluşur ve ana panoya (main switchboard) güç verir. Gemi şebekesinin kararlılığı, jeneratörlerin paralel çalışması (synchronization), yük paylaşımı (load sharing) ve blackout korumasıyla sağlanır. Bu bölüm; jeneratör seti mimarisini, alternatör ve voltaj regülasyonunu (AVR), senkronizasyon ve paralel çalışmayı, yük paylaşımı ve preferential trip'i, blackout/black start senaryosunu ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. II-1 — electrical installations",
    "IACS UR E — electrical & PMS",
    "Klas kuralları — power generation & switchboard",
    "Üretici el kitapları (Wärtsilä, MAN, Caterpillar)",
  ],
  chapters: [
    {
      heading: "1. Jeneratör Seti ve Alternatör",
      sections: [
        {
          subheading: "1.1 Motor + alternatör eşleşmesi",
          paragraphs: [
            `Bir D/G seti; sabit devirde çalışan bir dizel motor ve ona kaplinli senkron alternatörden oluşur. Frekans (50/60 Hz) motor devrine bağlı olduğundan governor devri sabit tutar. Alternatör manyetik alanını uyartım (excitation) ile üretir; çıkış gerilimi AVR ile sabitlenir.`,
          ],
          bullets: [
            `Motor sabit devir → sabit frekans`,
            `Senkron alternatör + uyartım`,
            `AVR gerilimi yük değişse de sabit tutar`,
          ],
        },
        {
          subheading: "1.2 AVR ve gerilim regülasyonu",
          paragraphs: [
            `AVR (Automatic Voltage Regulator), yük değiştikçe alternatör uyartımını ayarlayarak terminal gerilimini sabit tutar. Reaktif yük paylaşımı (paralel çalışmada) AVR droop ayarıyla yönetilir; arızalı AVR aşırı/düşük gerilim ve yük paylaşım sorunu yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Senkronizasyon ve Paralel Çalışma",
      sections: [
        {
          subheading: "2.1 Senkronizasyon şartları",
          paragraphs: [
            `Bir jeneratörü çalışan şebekeye almak (paralelleme) için dört şart sağlanmalı: aynı gerilim, aynı frekans, aynı faz sırası ve faz uyumu. Senkronoskop ve check-synch rölesi bu şartları doğrular; yanlış paralelleme büyük akım darbesi ve hasar yaratır.`,
          ],
          table: {
            headers: ["Şart", "Araç", "Hatanın sonucu"],
            rows: [
              ["Eşit gerilim", "Voltmetre/AVR", "Reaktif akım darbesi"],
              ["Eşit frekans", "Senkronoskop", "Aktif güç salınımı"],
              ["Faz sırası", "Phase sequence", "Kısa devre/hasar"],
              ["Faz uyumu", "Senkronoskop 12 yön", "Mekanik şok"],
            ],
          },
        },
        {
          subheading: "2.2 Yük paylaşımı",
          paragraphs: [
            `Paralel jeneratörlerde aktif yük (kW) governor ile, reaktif yük (kVAr) AVR ile paylaştırılır. Dengesiz paylaşım bir setin aşırı yüklenmesine yol açar. Modern PMS (Power Management System) yük paylaşımını, otomatik start/stop ve standby setin devreye girmesini yönetir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "PMS faydası",
              text: `PMS, yük arttığında standby jeneratörü otomatik devreye alır ve yük düşünce çıkarır; böylece blackout önlenir ve yakıt optimize edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Koruma ve Blackout",
      sections: [
        {
          subheading: "3.1 Preferential trip ve korumalar",
          paragraphs: [
            `Şebeke aşırı yüklenince blackout'u önlemek için preferential trip, önemsiz yükleri (HVAC, ısıtıcı vb.) önceden tanımlı sırayla devre dışı bırakır. Jeneratör korumaları; ters güç (reverse power), aşırı akım, düşük/aşırı gerilim ve frekans rölelerini içerir.`,
          ],
          bullets: [
            `Reverse power: motorlaşan jeneratörü ayırır`,
            `Overcurrent / short circuit koruması`,
            `Preferential trip: kademeli yük atma`,
          ],
        },
        {
          subheading: "3.2 Blackout ve black start",
          paragraphs: [
            `Tüm jeneratörler durursa blackout oluşur; gemi karanlık ve tahriksiz kalır. Emergency generator otomatik devreye girerek temel emniyet yüklerini besler. Black start; emergency güç, basınçlı hava ile bir ana jeneratörün start edilmesi ve şebekenin yeniden kurulmasıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Acil jeneratör",
              text: `SOLAS, blackout'ta otomatik (≤45 sn) devreye giren acil jeneratör ister; dümen, seyir feneri, haberleşme ve acil yangın pompası gibi yükleri besler.`,
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
            `Bakım; motor tarafında supap/enjektör/yağ-filtre işlemleri, alternatör tarafında izolasyon direnci (megger), rulman ve fırça/diyot (varsa) kontrolünü kapsar. Düzenli test çalıştırması ve koruma rölesi testleri yapılır.`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Paralele alınamıyor", "Frekans/gerilim/faz uyumsuz", "Senkron şartlarını sağla"],
              ["Yük paylaşımı dengesiz", "Governor/AVR ayarı", "Droop ve set ayarı"],
              ["Reverse power trip", "Yakıt kesik/motor zayıf", "Yakıt sistemi kontrol"],
              ["Gerilim düşük/yüksek", "AVR/uyartım", "AVR test/servis"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
