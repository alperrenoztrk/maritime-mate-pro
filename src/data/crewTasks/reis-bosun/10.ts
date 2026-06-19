import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Cargo hold preparation ve temizlik operasyonu liderliği",
  roleSlug: "reis-bosun",
  taskIndex: 10,
  estimatedPages: 24,
  intro: `Dökme yük gemilerinde yükleme öncesi ambar hazırlığı (hold preparation), bir sonraki yükün güvenliği ve charter party uyumu için kritik bir operasyondur; yanlış hazırlanan bir ambar yük reddine, kontaminasyona ve büyük tazminata yol açar. Reis (Bosun), bu temizlik operasyonunu ekiple birlikte yönetir: süpürme, yıkama, kurutma, hatch coaming/track temizliği ve önceki yük artıklarının (taint) tamamen giderilmesi. Farklı yükler (tahıl, konsantre, kömür, demir cevheri) farklı temizlik standartları ister. Bu bölüm hold preparation liderliğini ele alır.`,
  sources: [
    "IMSBC Code — katı dökme yükler",
    "Charter party hold cleanliness standartları (grain/hospital clean)",
    "Enclosed space entry — IMO Res. A.1050(27)",
    "Code of Safe Working Practices (COSWP)",
    "Thomas' Stowage — hold preparation",
  ],
  chapters: [
    {
      heading: "1. Hold Hazırlığının Önemi",
      sections: [
        {
          subheading: "1.1 Yük güvenliği ve charter uyumu",
          paragraphs: [
            `Ambar, bir sonraki yüke uygun temizlik seviyesinde teslim edilmelidir; aksi halde önceki yük artığı (taint), nem veya koku yeni yükü bozar. Tahıl yüklerinde bağımsız denetim yapılır; başarısız hold inspection yükleme reddine ve büyük gecikme/maliyete yol açar. Reis bu standartları bilir ve uygular.`,
          ],
          table: {
            caption: "Hold temizlik seviyeleri",
            headers: ["Seviye", "Tanım"],
            rows: [
              ["Load-ready / swept", "Süpürülmüş, görünür kalıntı yok"],
              ["Shovel-clean", "Kalıntı yok, gözle temiz"],
              ["Grain-clean", "Tahıla uygun, kuru, kokusuz, boya sağlam"],
              ["Hospital-clean", "Laboratuvar standardı, hassas yük"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Temizlik Aşamaları",
      sections: [
        {
          subheading: "2.1 Süpürme, yıkama, kurutma",
          paragraphs: [
            `Operasyon; süpürme, deniz suyu yıkama, tatlı su durulama (özellikle tuz/koku için), kurutma ve gerekirse boya rötuşundan oluşur. Reis, ekibi yönlendirir, sıralamayı belirler ve her aşamanın tamamlandığını doğrular. Kuruluk, özellikle tahıl/çelik yüklerde kritiktir.`,
          ],
          bullets: [
            `Süpürme ve kalıntı toplama`,
            `Deniz suyu yıkama (yüksek basınç)`,
            `Tatlı su durulama (tuz/koku)`,
            `Kurutma ve nem kontrolü`,
            `Boya rötuşu (gerekiyorsa)`,
          ],
        },
        {
          subheading: "2.2 Detay noktalar",
          paragraphs: [
            `Hatch coaming, track, bilge well, hold ladder ve light fixture'lar ayrıca temizlenir; bu detaylar çoğu zaman denetimde fark yaratır. Bilge well ve süzgeçlerin temizliği, su tahliyesi ve yük güvenliği için önemlidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Yüke Göre Standart",
      sections: [
        {
          subheading: "3.1 Farklı yük, farklı standart",
          paragraphs: [
            `Tahıl/konsantre hassas ve yüksek temizlik isterken; kömür sonrası demir cevheri yüklenecekse farklı, hassas gıda yükü için "hospital clean" gerekir. Reis, hangi yükün hangi seviyeyi gerektirdiğini bilir ve ekibi buna göre yönlendirir. Önceki yükün kalıntısı (taint), uyumsuz bir sonraki yükü kontamine edebilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Taint riski",
              text: `Kömür artığı kalmış bir ambara tahıl yüklenirse yük kontamine olur ve reddedilir. Önceki yükü tam gidermek, sadece temizlik değil, yükü kurtarmaktır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Güvenlik",
      sections: [
        {
          subheading: "4.1 Enclosed space ve yüksekte çalışma",
          paragraphs: [
            `Ambar kapalı mekandır; giriş enclosed space entry permit ve atmosfer testi ile yapılır. Yüksek basınçlı yıkama, kaygan zemin ve yüksekte çalışma (hold ladder, kenarlar) ek risklerdir. Reis, KKD, gözetim ve güvenli çalışma pratiğini sağlar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ambar = kapalı mekan",
              text: `Görünüşte havadar bir ambar bile düşük oksijenli olabilir (bazı yük kalıntıları oksijen tüketir). Giriş, atmosfer testi ve izin olmadan yapılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Doğrulama ve Kayıt",
      sections: [
        {
          subheading: "5.1 Hazırlık denetimi",
          paragraphs: [
            `Hazırlık tamamlanınca Reis, ambarın istenen standartta olduğunu kontrol eder ve Birinci Zabite raporlar. Durum fotoğraf/video ile belgelenir; bu kayıt, bir yük anlaşmazlığında ambarın temiz teslim edildiğinin kanıtıdır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Hold preparation kontrolü",
          bullets: [
            `Gerekli temizlik seviyesi (yüke göre) belirlendi mi?`,
            `Süpürme/yıkama/durulama/kurutma tamamlandı mı?`,
            `Hatch coaming/track, bilge well, ladder, fixture temiz mi?`,
            `Önceki yük artığı (taint) ve koku tam giderildi mi?`,
            `Ambara giriş enclosed space permit/atmosfer testi ile mi yapıldı?`,
            `KKD ve güvenli çalışma sağlandı mı?`,
            `Durum belgelendi, Birinci Zabite raporlandı mı?`,
          ],
          paragraphs: [
            `Cargo hold preparation liderliği, Reisin hem teknik bilgi hem ekip yönetimi hem güvenlik bilincini birlikte kullandığı bir operasyondur. Doğru temizlik standardı, detay noktalara özen ve güvenli çalışma; ambarın yükü güvenle taşıyacak şekilde teslim edilmesini ve maliyetli yük anlaşmazlıklarının önlenmesini sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
