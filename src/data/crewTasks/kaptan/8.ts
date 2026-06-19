import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Pilot ve kılavuz kaptan koordinasyonu",
  roleSlug: "kaptan",
  taskIndex: 8,
  estimatedPages: 23,
  intro: `Kılavuz kaptan (pilot) gemiye çıktığında geminin komutası devredilmez; kaptan her zaman geminin emniyetinden nihai sorumlu kişidir. Pilot, yerel sular hakkındaki uzmanlığıyla "tavsiye" verir; kaptan ve vardiya zabiti bu tavsiyeyi değerlendirir, izler ve gerektiğinde reddeder. Master-Pilot Exchange (MPX), köprüüstü ekip çalışması (BTM) ve ekipman/mürettebat hazırlığı bu koordinasyonun temelidir. Bu bölüm pilotaj sürecini emniyet ve sorumluluk ekseninde ele alır.`,
  sources: [
    "SOLAS Chapter V Regulation 23 — pilot transfer arrangements",
    "STCW — Bridge Resource Management / Bridge Team Management",
    "IMO Resolution A.960 — pilotage ve Master/Pilot information exchange",
    "ICS Bridge Procedures Guide",
    "ISM Code — köprüüstü prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Pilotajda Sorumluluk İlkesi",
      sections: [
        {
          subheading: "1.1 Komuta devredilmez",
          paragraphs: [
            `Pilotun gemiye çıkması, kaptanın sorumluluğunu ortadan kaldırmaz. Pilot yerel uzmanlık sağlar; ancak geminin manevra karakteristiği, durumu ve nihai emniyeti kaptanın bilgisi ve yetkisindedir. Kaptan, pilotun bir tavsiyesinin gemiyi tehlikeye attığını düşünürse müdahale eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IMO Res. A.960",
              text: `Pilot ile kaptan arasında, geminin manevra özellikleri ve planlanan geçiş hakkında bilgi alışverişi (MPX) yapılması beklenir. Pilotun varlığı, kaptan ve vardiya zabitinin seyir görevini ve gözetimini sürdürme yükümlülüğünü kaldırmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Master-Pilot Exchange (MPX)",
      sections: [
        {
          subheading: "2.1 Bilgi alışverişi kartı",
          paragraphs: [
            `Pilot köprüüstüne geldiğinde MPX kartı doldurulur: geçiş planı, hız profili, beklenen manevralar, römorkör kullanımı, rıhtım/demir bilgisi, UKC, hava/akıntı ve acil durum/abort planı paylaşılır. Kaptan, geminin manevra verilerini (dönüş çapı, durma mesafesi, draft, pervane/dümen özelliği) pilota sunar.`,
          ],
          bullets: [
            `Geçiş planı ve hız profili`,
            `Römorkör sayısı/bağlama ve kullanım planı`,
            `UKC, akıntı, rüzgâr ve beklenen koşullar`,
            `Abort point ve acil durum planı`,
            `Haberleşme dili ve ekip görev dağılımı`,
          ],
        },
        {
          subheading: "2.2 Plan uyumsuzluğu",
          paragraphs: [
            `Pilotun planı ile geminin passage plan'ı arasında önemli fark varsa, manevra başlamadan netleştirilir. "Konuşmadan başlamak", köprüüstü kaza incelemelerinde tekrar eden bir hata kalıbıdır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Köprüüstü Ekip Çalışması",
      sections: [
        {
          subheading: "3.1 İzleme ve çapraz kontrol",
          paragraphs: [
            `Vardiya zabiti, pilotaj boyunca geminin konumunu bağımsız izler (pozisyon, hız, dönüş hızı, UKC) ve plandan sapmayı kaptana bildirir. Pilotun verdiği dümen/makine komutları tekrarlanır (closed-loop) ve uygulanması teyit edilir. Ekip, pilotu "kör güven"le değil, aktif gözetimle destekler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sessiz şüphe tehlikelidir",
              text: `Ekip üyeleri bir tehlike sezdiğinde çekinmeden seslenmelidir (challenge & response). Hiyerarşi veya pilota duyulan saygı, emniyet uyarısını bastırmamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Pilot Transferi (Embarkation/Disembarkation)",
      sections: [
        {
          subheading: "4.1 Güvenli pilot ladder",
          paragraphs: [
            `Pilot biniş/inişi, SOLAS V/23 ve ilgili düzenlemelere uygun pilot ladder/combination ladder ile yapılır. Kaptan, donanımın doğru kurulduğunu, ışıklandırma, can simidi, halat ve gözetmen personelin hazır olduğunu doğrular. Hatalı pilot ladder düzeni, pilot ölümlerinin gerçek ve sürekli bir nedenidir.`,
          ],
          table: {
            caption: "Pilot transfer kontrol noktaları",
            headers: ["Öğe", "Kontrol"],
            rows: [
              ["Pilot ladder", "Sertifikalı, hasarsız, doğru yükseklik"],
              ["Aydınlatma", "Yeterli, göz kamaştırmasız"],
              ["Can kurtarma", "Can simidi+ışık, heaving line hazır"],
              ["Gözetmen", "Sorumlu zabit + tayfa, telsiz"],
              ["Kombinasyon", "Accommodation ladder ile güvenli geçiş"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Ekipman ve Mürettebat Hazırlığı",
      sections: [
        {
          subheading: "5.1 Manevra öncesi teyit",
          paragraphs: [
            `Pilotaj/manevra öncesi steering gear testi, makine manevraya hazır, demir stations hazır, römorkör bağlama ekibi ve haberleşme doğrulanır. Kaptan, köprüüstü ekibinin ve baş/kıç istasyonlarının görevlerini bildiğini ve dinlenmiş olduğunu teyit eder.`,
          ],
        },
      ],
    },
    {
      heading: "6. Anlaşmazlık ve Müdahale",
      sections: [
        {
          subheading: "6.1 Kaptanın araya girmesi",
          paragraphs: [
            `Kaptan, pilotun bir hareketinin gemiyi tehlikeye attığına kanaat getirirse derhal müdahale eder ve gerekiyorsa komutayı doğrudan yönetir. Bu, pilotaja saygısızlık değil, kaptanın yasal görevidir. Olay kayıt altına alınır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Geç müdahalenin bedeli",
              text: `Birçok dar su kazasında kaptan tehlikeyi fark etmiş ama "pilot bilir" diyerek geç müdahale etmiştir. Erken, kararlı müdahale; kaptanın nihai sorumluluğunun pratikteki karşılığıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Pilotaj koordinasyon kontrolü",
          bullets: [
            `MPX kartı dolduruldu, plan ve manevra özellikleri paylaşıldı mı?`,
            `Pilot planı ile passage plan arasında fark netleştirildi mi?`,
            `Vardiya zabiti bağımsız izlemeyi sürdürüyor mu?`,
            `Komutlar closed-loop tekrarlanıp teyit ediliyor mu?`,
            `Pilot ladder/transfer SOLAS V/23'e uygun ve gözetimli mi?`,
            `Steering test, makine, demir ve römorkör ekibi hazır mı?`,
            `Abort point ve acil plan üzerinde anlaşıldı mı?`,
          ],
          paragraphs: [
            `Pilotaj, uzmanlık ile nihai sorumluluğun el ele çalıştığı hassas bir süreçtir. Kaptanın MPX disiplini, aktif köprüüstü gözetimi ve gerektiğinde kararlı müdahalesi; pilotun yerel bilgisini emniyetli bir geçişe dönüştürür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
