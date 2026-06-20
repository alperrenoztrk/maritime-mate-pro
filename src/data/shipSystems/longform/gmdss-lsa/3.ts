import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Inmarsat-C / Mini-C Sistemi",
  sectionId: "gmdss-lsa",
  topicIndex: 3,
  estimatedPages: 22,
  intro: `Inmarsat-C / Mini-C, GMDSS'in A3 deniz alanında uydu üzerinden tehlike uyarısı, mesaj (store-and-forward) haberleşmesi ve MSI (SafetyNET) alımı sağlayan sistemidir. Düşük veri hızlı ama güvenilir, küçük omni-direksiyonel antenli ve sesli değil veri (telex/email benzeri) tabanlıdır. Bu bölüm; Inmarsat sistem mimarisini (uydu, LES/NCS) ve kapsama alanını (A3), distress alerting ve mesajlaşmayı, SafetyNET / EGC ile MSI alımını, GPS entegrasyonu ve yedekliliği, modern uydu sistemleriyle ilişkisini (Fleet/Iridium) ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. IV — satellite EPIRB & Inmarsat",
    "IMO GMDSS Manual — Inmarsat-C",
    "Inmarsat maritime safety services",
    "IMO Res. — Enhanced Group Call (EGC)",
  ],
  chapters: [
    {
      heading: "1. Sistem ve Kapsama",
      sections: [
        {
          subheading: "1.1 Uydu, LES, NCS",
          paragraphs: [
            `Inmarsat-C, jeostatik (GEO) uydular üzerinden çalışır; gemi terminali uyduya, uydu da kara istasyonuna (LES — Land Earth Station) bağlanır. NCS (Network Coordination Station) ağ trafiğini yönetir. GEO uyduları ~70°K ile ~70°G arasını kapsar (A3); kutuplar (A4) kapsam dışıdır.`,
          ],
          bullets: [
            `Gemi → GEO uydu → LES → karasal ağ`,
            `A3 kapsama (~70°K-70°G)`,
            `Kutuplarda (A4) çalışmaz → HF gerekir`,
          ],
        },
        {
          subheading: "1.2 Store-and-forward",
          paragraphs: [
            `Inmarsat-C gerçek zamanlı ses taşımaz; mesajları paketleyip "store-and-forward" (depola-ilet) yöntemiyle gönderir/alır. Düşük veri hızı yeterlidir çünkü tehlike uyarısı ve telex/email tipi metin için tasarlanmıştır. Anten küçük ve omni-direksiyoneldir (yön gerektirmez).`,
          ],
        },
      ],
    },
    {
      heading: "2. Tehlike, Mesaj ve MSI",
      sections: [
        {
          subheading: "2.1 Distress alerting",
          paragraphs: [
            `Korumalı distress butonu, GPS konumu ve gemi kimliğiyle tehlike uyarısını seçili LES üzerinden ilgili MRCC'ye (kurtarma koordinasyon merkezi) iletir. Uyarı, tehlike türü ve konumu içerdiğinden SAR hızlı başlatılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "GPS bağlantısı",
              text: `Inmarsat-C distress'in doğru konum taşıması için GPS terminale beslenmelidir; konum güncel değilse uyarı yanlış yere yönlendirir.`,
            },
          ],
        },
        {
          subheading: "2.2 SafetyNET / EGC",
          paragraphs: [
            `EGC (Enhanced Group Call) üzerinden SafetyNET servisi, açık denizde (A3) seyir uyarıları, hava tahmini ve SAR bilgisini otomatik gemiye iletir; FleetNET ticari grup mesajları içindir. Bu MSI yayınları otomatik alınır ve kaydedilir; NAVTEX'in açık deniz tamamlayıcısıdır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Yedeklilik ve Modern Sistemler",
      sections: [
        {
          subheading: "3.1 Yedeklilik",
          paragraphs: [
            `A3 gemisi GMDSS yedekliliğini Inmarsat + MF/HF kombinasyonu veya çift Inmarsat ile sağlar. GMDSS artık çok-sağlayıcılı hale gelmektedir; Iridium gibi alçak yörünge (LEO) sistemleri kutuplar dahil küresel kapsama sunarak A4'ü de karşılayabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Çoklu sağlayıcı",
              text: `GMDSS, Inmarsat'ın yanına Iridium gibi sağlayıcıların eklenmesiyle genişliyor; LEO sistemleri kutup kapsaması sağlayarak A4 ihtiyacını da karşılayabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım ve test",
          paragraphs: [
            `Performans testi (LES üzerinden), anten görüş hattı ve kablo kontrolü, GPS besleme, EGC alım doğrulaması ve yedek akü testi yapılır. EGC mesajlarının kesintisiz alındığı izlenir.`,
          ],
          bullets: [
            `LES test çağrısı`,
            `Anten görüş hattı / engel kontrolü`,
            `EGC/SafetyNET alım doğrulama`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Senkron/login yok", "Anten engeli/uydu görüşü", "Anten konumu/engel kontrolü"],
              ["Mesaj gitmiyor", "LES seçimi/abonelik", "LES ve konfig kontrol"],
              ["Distress konum yanlış", "GPS besleme yok", "GPS girişini kontrol et"],
              ["EGC almıyor", "Alan/konfig", "Ocean region ve EGC ayarı"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
