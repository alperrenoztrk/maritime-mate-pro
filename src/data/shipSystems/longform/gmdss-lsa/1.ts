import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "VHF / DSC Telsizi",
  sectionId: "gmdss-lsa",
  topicIndex: 1,
  estimatedPages: 22,
  intro: `VHF (Very High Frequency) deniz telsizi, kısa menzilli (görüş hattı, ~20-30 mil) ses haberleşmesinin ve A1 deniz alanında tehlike uyarısının temelidir; DSC (Digital Selective Calling) entegrasyonu ile dijital tehlike çağrısı sağlar. Köprü-köprü, köprü-liman (VTS), gemi-gemi ve tehlike haberleşmesi VHF üzerinden yürür. Bu bölüm; VHF kanal düzenini ve önemli kanalları (16, 70, 13, 06), DSC çağrı mantığını ve önceliği, simpleks/dupleks ve güç ayarını, anten ve menzili, taşınabilir survival craft VHF'i ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. IV — VHF radio installation",
    "ITU Radio Regulations — VHF marine band",
    "ITU-R M.493 — DSC",
    "IMO GMDSS Manual",
  ],
  chapters: [
    {
      heading: "1. Kanallar ve Kullanım",
      sections: [
        {
          subheading: "1.1 Önemli kanallar",
          paragraphs: [
            `VHF deniz bandı belirli kanallara ayrılmıştır. Kanal 16 (156.8 MHz) tehlike, emniyet ve çağrı kanalıdır; sürekli dinlenir. Kanal 70 DSC içindir (sesli kullanılmaz). Kanal 13 köprü-köprü (manevra emniyeti), kanal 06 gemi-gemi, diğer kanallar liman/VTS ve genel haberleşme içindir.`,
          ],
          table: {
            headers: ["Kanal", "Kullanım"],
            rows: [
              ["16", "Tehlike/emniyet/çağrı (sesli)"],
              ["70", "DSC (dijital, sesli değil)"],
              ["13", "Köprü-köprü, manevra"],
              ["06", "Gemi-gemi (SAR dahil)"],
            ],
          },
        },
        {
          subheading: "1.2 Simpleks/dupleks ve güç",
          paragraphs: [
            `Simpleks kanalda aynı frekansta sırayla konuşulur (gemi-gemi); dupleks kanalda iki frekans (telefon bağlantısı) kullanılır. Çıkış gücü yüksek (25 W) veya düşük (1 W) seçilebilir; yakın haberleşmede ve gereksiz parazitten kaçınmak için düşük güç tercih edilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Düşük güç nezaketi",
              text: `Yakındaki gemiyle konuşurken 1 W yeterlidir; gereksiz 25 W kullanımı uzak istasyonları paraziter etkiler ve kanalı meşgul eder.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. DSC ve Tehlike Çağrısı",
      sections: [
        {
          subheading: "2.1 DSC distress",
          paragraphs: [
            `DSC distress butonu (korumalı kapak altında), tek hareketle MMSI, konum (GPS bağlıysa) ve tehlike türünü kanal 70'ten gönderir. Çağrı alındığında ilgili istasyonlar otomatik alarm verir ve kanal 16'da sesli takip yapılır. Çağrı 4-5 sn basılı tutularak gönderilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Konum güncel olmalı",
              text: `DSC distress'in işe yaraması için GPS konumu telsize beslenmeli ve güncel olmalı; aksi halde SAR konumu el ile girilir veya çağrı eksik olur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Anten, Menzil ve Survival Craft VHF",
      sections: [
        {
          subheading: "3.1 Anten ve menzil",
          paragraphs: [
            `VHF görüş hattı (line of sight) ile çalışır; menzil anten yüksekliğine bağlıdır. Yüksek anten daha uzak menzil verir. Anten konumu, gölgeleme ve diğer antenlerle parazit dikkate alınarak seçilir. Hasarlı anten/koaksiyel menzili ciddi düşürür.`,
          ],
        },
        {
          subheading: "3.2 Taşınabilir (survival craft) VHF",
          paragraphs: [
            `Filika/sallarda kullanılmak üzere taşınabilir GMDSS VHF telsizleri (genelde sarı/turuncu, su geçirmez) bulundurulur; can kurtarma sırasında SAR ve gemiyle haberleşmeyi sağlar. Bunlar ayrı (yedek) bataryalı ve düzenli test edilir.`,
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
            `Günlük DSC testi (kıyı/başka istasyonla veya self-test), anten/koaksiyel kontrolü, batarya ve taşınabilir VHF testi yapılır; radyo log tutulur. Test sırasında gerçek distress butonuna yanlışlıkla basılmamasına dikkat edilir.`,
          ],
          bullets: [
            `Günlük DSC ve fonksiyon testi`,
            `Anten/koaksiyel kontrolü`,
            `Taşınabilir survival VHF batarya/test`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Menzil çok kısa", "Anten/koaksiyel hasarı", "Anten ve kablo kontrolü"],
              ["DSC çağrı gitmiyor", "MMSI/konfig/güç", "Konfig ve güç kontrolü"],
              ["Parazit/gürültü", "Squelch/anten/parazit", "Squelch ayarı, parazit kaynağı"],
              ["Taşınabilir VHF ölü", "Batarya bitik", "Batarya değişim/test"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
