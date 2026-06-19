import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Tehlikeli yük (IMDG/IMSBC) operasyonları yönetimi",
  roleSlug: "birinci-zabit",
  taskIndex: 15,
  estimatedPages: 26,
  intro: `Tehlikeli yükler — paketli (IMDG Code) ve katı dökme (IMSBC Code) — yanlış elleçlendiğinde yangın, patlama, zehirlenme, korozyon ve sıvılaşma (liquefaction) gibi felaketlere yol açabilir. Birinci Zabit; yükün sınıf, UN numarası, ambalaj grubu ve segregasyon tablosuna uygun istif edilmesini, gerekli belgelerin (DG Manifest, MFAG, EmS) köprüüstünde bulunmasını ve self-heating yükler için sıcaklık/oksijen izlemesini sağlamaktan sorumludur. Bu bölüm tehlikeli yük operasyonlarının yönetimini ele alır.`,
  sources: [
    "IMDG Code (International Maritime Dangerous Goods Code)",
    "IMSBC Code (International Maritime Solid Bulk Cargoes Code)",
    "SOLAS Chapter VI & VII — yük ve tehlikeli yük taşıma",
    "MFAG — Medical First Aid Guide",
    "EmS — Emergency Response Procedures for Ships Carrying Dangerous Goods",
    "CINS (Cargo Incident Notification System) sirkülerleri",
  ],
  chapters: [
    {
      heading: "1. Tehlikeli Yük Çerçevesi",
      sections: [
        {
          subheading: "1.1 IMDG vs IMSBC",
          paragraphs: [
            `IMDG Code paketli tehlikeli yükleri (konteyner, varil, IBC) düzenlerken, IMSBC Code katı dökme yükleri (cevher, kömür, tahıl) düzenler. Birinci Zabit her iki rejimi de bilir ve yük tipine göre doğru kuralları uygular. Yanlış sınıflandırma veya beyan, en ağır deniz kazalarının nedenidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS VI/2 — yük bilgisi",
              text: `Shipper, yük hakkında doğru ve yeterli bilgi (sınıf, UN no, MSDS, IMSBC grubu, TML/nem) vermek zorundadır. Bu bilgi olmadan yükleme yapılamaz; eksik/yanlış beyan reddedilir.`,
            },
          ],
        },
        {
          subheading: "1.2 IMDG 9 sınıf",
          paragraphs: [
            `IMDG, yükleri 9 ana sınıfa ayırır (patlayıcı, gaz, yanıcı sıvı, yanıcı katı, oksitleyici, zehirli, radyoaktif, korozif, muhtelif). Her sınıfın kendine özgü elleçleme, istif ve acil müdahale gereksinimi vardır.`,
          ],
          table: {
            caption: "IMDG sınıfları (özet)",
            headers: ["Sınıf", "Tür"],
            rows: [
              ["1", "Patlayıcılar"],
              ["2", "Gazlar"],
              ["3", "Yanıcı sıvılar"],
              ["4", "Yanıcı katılar / kendiliğinden tutuşan"],
              ["5", "Oksitleyiciler / organik peroksitler"],
              ["6", "Zehirli ve bulaşıcı maddeler"],
              ["7", "Radyoaktif maddeler"],
              ["8", "Korozifler"],
              ["9", "Muhtelif tehlikeli maddeler"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Segregasyon ve İstif",
      sections: [
        {
          subheading: "2.1 Segregation table",
          paragraphs: [
            `Segregasyon tablosu, hangi sınıfların yan yana, üst üste veya komşu bölmede bulunabileceğini düzenler. Birinci Zabit; uyumsuz yüklerin (örn. oksitleyici + yanıcı) güvenli mesafede ayrılmasını sağlar. Konteyner gemilerinde bay-row-tier planı bu kurallara göre kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış segregasyon = felaket",
              text: `Uyumsuz tehlikeli yüklerin yan yana istifi, küçük bir kaçakta zincirleme reaksiyona ve büyük yangına yol açabilir. Segregasyon kuralı pazarlık konusu değildir.`,
            },
          ],
        },
        {
          subheading: "2.2 CTU packing ve doğrulama",
          paragraphs: [
            `Cargo Transport Unit (CTU) packing certificate, konteyner içi istif ve emniyetlemenin doğru yapıldığını belgeler. Birinci Zabit, DG konteynerlerin doğru etiketli/plakart'lı ve hasarsız olduğunu, sızıntı/koku olmadığını kontrol eder.`,
          ],
        },
      ],
    },
    {
      heading: "3. Belgeler: DG Manifest, MFAG, EmS",
      sections: [
        {
          subheading: "3.1 Köprüüstü belgeleri",
          paragraphs: [
            `Dangerous Goods Manifest, geminin taşıdığı tüm DG'yi ve konumlarını listeler; MFAG tıbbi ilk yardımı, EmS ise acil müdahale prosedürlerini verir. Bu belgeler köprüüstünde, acil durumda hızla erişilebilir olmalıdır. Birinci Zabit bunların güncel ve eksiksiz olmasını sağlar.`,
          ],
          bullets: [
            `DG Manifest: yük, sınıf, UN no, konum`,
            `MFAG: maddeye özgü tıbbi ilk yardım`,
            `EmS: yangın ve dökülme müdahale rehberi`,
            `Stowage plan ve segregasyon kaydı`,
          ],
        },
      ],
    },
    {
      heading: "4. IMSBC — Dökme Yük Tehlikeleri",
      sections: [
        {
          subheading: "4.1 Grup A/B/C ve sıvılaşma",
          paragraphs: [
            `IMSBC, dökme yükleri sıvılaşabilir (Group A), kimyasal tehlikeli (Group B) ve düşük riskli (Group C) olarak ayırır. Group A yüklerde (nikel cevheri, demir cevheri ince, boksit ince) nem TML'in (Transportable Moisture Limit) üzerindeyse yük sıvılaşıp gemiyi alabora edebilir. Birinci Zabit TML/nem beyanını sorgular; şüphede yükleme reddedilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Bulk Jupiter (2015)",
              text: `Boksit yükü TML üzerinde yüklendi ve sıvılaşma sonucu gemi alabora oldu, 18 kişi öldü. Ders: shipper'ın nem beyanına körü körüne güvenilmez; can test yapılır, gerekirse yükleme durdurulur.`,
            },
          ],
        },
        {
          subheading: "4.2 Self-heating ve off-gassing",
          paragraphs: [
            `Kömür, DRI gibi Group B yükler kendiliğinden ısınabilir (self-heating), oksijen tüketebilir ve tehlikeli gaz (metan, CO) yayabilir. Birinci Zabit; hold sıcaklık izleme, oksijen/gaz ölçümü ve havalandırma planını uygular. Ölçüm değerleri kayıt altına alınır.`,
          ],
          table: {
            caption: "Self-heating yük izleme",
            headers: ["Parametre", "Neden", "Aksiyon"],
            rows: [
              ["Hold sıcaklığı ↑", "Self-heating", "İzle, havalandırma planı"],
              ["O2 ↓", "Oksijen tüketimi", "Enclosed space riski, giriş yasak"],
              ["CO/metan ↑", "Off-gassing", "Gaz ölçüm, ateş kaynağı uzak"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Acil Müdahale Hazırlığı",
      sections: [
        {
          subheading: "5.1 Yangın ve dökülme",
          paragraphs: [
            `DG operasyonunda özel PPE, hazır yangın hortumu, alan kordonu ve yetkili gözetmen şarttır. Bir kaçak/yangın durumunda EmS rehberine göre müdahale edilir. Birinci Zabit, ekibin ilgili senaryolara hazır olmasını ve DG drill yapılmasını sağlar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Mis-declared DG",
              text: `Yanlış beyan edilmiş DG, sektör çapında ciddi bir tehlikedir (ör. Maersk Honam yangını). CINS sirkülerleri takip edilir; şüpheli yükte ekstra dikkat ve doğrulama uygulanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Tehlikeli yük kontrolü",
          bullets: [
            `Sınıf/UN no/ambalaj grubu ve segregasyon doğru mu?`,
            `CTU packing certificate, plakart ve etiketler tam mı?`,
            `DG Manifest, MFAG, EmS köprüüstünde güncel mi?`,
            `IMSBC Group A için TML/nem doğrulandı mı?`,
            `Self-heating yükte sıcaklık/O2/gaz izleme planı uygulanıyor mu?`,
            `Özel PPE, yangın ekipmanı ve alan kordonu hazır mı?`,
            `DG drill yapıldı, ekip senaryolara hazır mı?`,
          ],
          paragraphs: [
            `Tehlikeli yük yönetimi, Birinci Zabitin en yüksek sorumluluk taşıyan görevlerindendir; küçük bir ihmal büyük bir felakete dönüşebilir. Doğru sınıflandırma, sıkı segregasyon, eksiksiz belgeler ve disiplinli izleme; gemiyi, mürettebatı ve çevreyi tehlikeli yükün risklerinden korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
